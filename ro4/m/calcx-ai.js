import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ===============================
// AI ラトリオ RAG ロジック（キーワード検索版）
// ===============================

// このスクリプト自身のディレクトリを基準にURLを解決する
// （本番・staging など環境によらず正しいパスになる）
const BASE_URL = new URL(".", import.meta.url).href;

console.log("calcx-ai.js 読み込み完了");

// ===============================
// RAG 用データ
// ===============================
let items = [];

// 最後の RAG 結果（装備反映ボタン用）
let lastRagSuggestions = [];

// 最後のユーザークエリ（ジョブ自動検出用）
let lastUserQuery = "";

// 最後に検出したジョブ名（buildApplyPreviewText で武器フィルタに使用）
let lastAllowedJobName = null;

// ===============================
// ログ出力
// ===============================
function aiLog(msg) {
    const el = document.getElementById("ai-log");
    if (!el) return;
    el.textContent += msg + "\n";
    el.scrollTop = el.scrollHeight;
}

/** 全角括弧を半角に正規化する（ItemObjNew と items.json の表記差を吸収） */
function normalizeParens(name) {
    return name ? name.replace(/（/g, '(').replace(/）/g, ')') : name;
}

// ===============================
// items データの読み込み（分割ファイル対応）
// ===============================
async function loadRagData() {
    aiLog("items データを読み込み中…");
    try {
        // マニフェストから分割ファイルのリストを取得する
        const manifestRes = await fetch(`${BASE_URL}items_manifest.json`);
        if (!manifestRes.ok) {
            throw new Error(`マニフェスト取得失敗: ${manifestRes.status}`);
        }
        const manifest = await manifestRes.json();
        aiLog(`${manifest.parts.length} ファイルを並列読み込み中…`);

        // 全パーツを並列取得して結合する
        const parts = await Promise.all(
            manifest.parts.map(async (fname) => {
                const res = await fetch(`${BASE_URL}${fname}`);
                if (!res.ok) throw new Error(`${fname} の取得失敗: ${res.status}`);
                return res.json();
            })
        );

        items = parts.flat();
        aiLog(`読み込み完了（${items.length} 件）`);
    } catch (e) {
        aiLog("items データの読み込みに失敗: " + e);
    }
}

// ===============================
// RAG 検索（日本語バイグラム対応）
// ===============================

/** テキストをバイグラム（2文字）の Set に変換する。
 *  全ひらがな2文字（助詞・助動詞ノイズ）は除外する。 */
function toBigrams(text) {
    const grams = new Set();
    const t = text.replace(/\s+/g, "");
    const HIRAGANA = /^[\u3040-\u309F]{2}$/;
    for (let i = 0; i < t.length - 1; i++) {
        const gram = t.substring(i, i + 2);
        if (HIRAGANA.test(gram)) continue; // 全ひらがなbigram除外
        grams.add(gram);
    }
    return grams;
}
// 装備スロットに該当するタイプ
const EQUIP_SLOT_TYPES = new Set([
    "兜","鎧","靴","肩にかける物","盾",
    "短剣","片手杖","弓","鈍器","両手剣","片手剣","本","カタール","鞭","楽器","爪",
    "片手槍","投擲","槍","剣","両手槍","両手斧","ライフル","ハンドガン","風魔手裏剣",
    "片手斧","両手杖","杖","ショットガン","斧","ガトリングガン","グレネードガン","手裏剣",
    "アクセサリー","アクセサリー(1)","アクセサリー(2)","アクセサリー ",
    "カード", // カードもRAG提案対象
]);
// 武器タイプの分類（スロット多様化のためのグループ化）
const WEAPON_TYPES = new Set([
    "短剣","片手杖","弓","鈍器","両手剣","片手剣","本","カタール","鞭","楽器","爪",
    "片手槍","投擲","槍","剣","両手槍","両手斧","ライフル","ハンドガン","風魔手裏剣",
    "片手斧","両手杖","杖","ショットガン","斧","ガトリングガン","グレネードガン","手裏剣",
]);
const ACCESSORY_TYPES = new Set(["アクセサリー","アクセサリー(1)","アクセサリー(2)","アクセサリー "]);

/**
 * アイテムの description からセット効果・条件付き効果テキストを抽出する。
 * 「――――」で区切られたブロックのうち、他装備との組み合わせ効果や
 * 精錬・ステータス条件付きの効果ブロックを返す（エンチャント選択の文脈として使用）。
 * @param {string} description
 * @returns {string} セット効果テキスト（なければ description 全体を返す）
 */
function extractSetEffectText(description) {
    if (!description) return "";
    const sections = description.split(/―{3,}/);
    // 他装備名・ステータス条件・精錬条件に言及するブロックをセット効果として扱う
    const setBlocks = sections.filter(s =>
        s.includes("共に装備時") ||
        s.includes("セット効果") ||
        s.includes("精錬値") ||
        /[A-Z][a-z]?[a-z]?\s*\+\s*\d/.test(s) // Atk+XX, Matk+XX など
    );
    return setBlocks.length ? setBlocks.join(" ") : description;
}

/**
 * クエリ文字列から予算（z単位）を解析する。
 * 例: "1G" → 1000000000, "10億" → 1000000000, "100M" → 100000000
 * @param {string} query
 * @returns {number|null} z単位の予算。指定なし or 解析失敗は null
 */
function extractBudget(query) {
    if (!query) return null;
    let m;
    m = query.match(/(\d+(?:\.\d+)?)\s*G(?!B)/i);  // G（ギガ = 10億）
    if (m) return parseFloat(m[1]) * 1e9;
    m = query.match(/(\d+(?:\.\d+)?)\s*億/);
    if (m) return parseFloat(m[1]) * 1e8;
    m = query.match(/(\d+(?:\.\d+)?)\s*M(?![あ-ん])/i);  // M（ミリオン = 100万）
    if (m) return parseFloat(m[1]) * 1e6;
    m = query.match(/(\d+(?:\.\d+)?)\s*万/);
    if (m) return parseFloat(m[1]) * 1e4;
    m = query.match(/(\d+(?:\.\d+)?)\s*[kk]/);
    if (m) return parseFloat(m[1]) * 1e3;
    return null;
}

/**
 * CardObjNew を名前で検索してカードIDを返す。
 * @param {string} name
 * @returns {number|null}
 */
function findCardIdByName(name) {
    const cardDb = window.CardObjNew;
    if (!cardDb) return null;
    const CARD_NAME_IDX = 2;
    // CardObjNew のカード名は「カード」サフィックスなし（例: "アクアエレメンタル"）
    // items.json のカード名はサフィックスあり（例: "アクアエレメンタルカード"）なので除去して比較
    const nameTrimmed = name.replace(/カード$/, '');
    for (let i = 0; i < cardDb.length; i++) {
        const card = cardDb[i];
        if (!card) continue;
        const cardName = String(card[CARD_NAME_IDX]);
        if (cardName === name || cardName === nameTrimmed) return i;
    }
    return null;
}

/**
 * カードの description から「装備 : xxx」を抽出し、対応する装備スロットの OBJID を返す。
 * 「全ての部位」の場合は "__ALL__" を返す。判定不能な場合は null を返す。
 * @param {string} desc
 * @returns {string|null}
 */
function getCardEquipObjId(desc) {
    if (!desc) return null;
    const m = desc.match(/装備\s*:\s*([^\s<\n]+(?:[^\n<]{0,20})?)/u);
    if (!m) return null;
    const equip = m[1].trim();
    if (equip.includes("全") || equip.includes("全部")) return "__ALL__";
    if (equip.includes("盾")) return "OBJID_SHIELD";
    if (equip.includes("鎧")) return "OBJID_BODY";
    if (equip.includes("靴")) return "OBJID_SHOES";
    if (equip.includes("肩")) return "OBJID_SHOULDER";
    if (equip.includes("上段") || equip === "兜") return "OBJID_HEAD_TOP";
    if (equip.includes("中段")) return "OBJID_HEAD_MID";
    if (equip.includes("下段")) return "OBJID_HEAD_UNDER";
    if (equip.includes("アクセサリー")) return "OBJID_ACCESSORY_1";
    // 武器系は type 文字列が含まれる場合に合致
    const weaponKeywords = ["武器","短剣","片手杖","弓","鈍器","両手剣","片手剣","本","カタール",
        "鞭","楽器","爪","片手槍","投擲","槍","剣","両手槍","両手斧","ライフル",
        "ハンドガン","風魔手裏剣","片手斧","両手杖","杖","ショットガン","斧"];
    if (weaponKeywords.some(k => equip.includes(k))) return "OBJID_ARMS_RIGHT";
    return null;
}

/**
 * アイテムのtype（とpositionフィールド）からスロットグループ名を返す。
 * 兜はpositionで頭上段/中段/下段を判別する。
 * @param {string} type
 * @param {string|null} position - items.json の position フィールド（兜のみ使用）
 */
function slotGroup(type, position = null) {
    if (WEAPON_TYPES.has(type)) return "武器";
    if (ACCESSORY_TYPES.has(type)) return "アクセサリー";
    if (type === "カード") return "カード";
    if (type === "兜") {
        if (position) {
            const p = String(position);
            // 上段を含む場合は頭上段優先（上中段・上中下段なども上段に分類）
            if (p.includes("上")) return "頭上段";
            if (p.includes("中")) return "頭中段";
            if (p.includes("下")) return "頭下段";
        }
        return "頭上段"; // position なし → デフォルト上段
    }
    return type; // 鎧, 靴, 肩にかける物, 盾 はそのまま
}

// 各スロットから均等にアイテムを返す（スロット多様化検索）

// 空きスロット補填用：スロット固有キーワードでビッグラム検索して最上位1件を返す
const SLOT_FALLBACK_KEYWORDS = {
    "武器":       "武器 Matk 魔法攻撃 本 片手杖",
    "頭上段":     "兜 頭 帽子 冠 ヘルム",
    "頭中段":     "眼鏡 目元 マスク ゴーグル ヘッドバンド",
    "頭下段":     "口元 マフラー ひげ フード",
    "鎧":         "鎧 ローブ 服 防具 アーマー",
    "靴":         "靴 ブーツ シューズ サンダル",
    "肩にかける物": "マント 肩 ショール ケープ",
    "盾":         "盾 シールド バックラー",
    "アクセサリー": "アクセサリー 指輪 ネックレス ブローチ",
};

const ALL_EQUIP_SLOTS = Object.keys(SLOT_FALLBACK_KEYWORDS);

/**
 * 指定スロットにマッチするアイテムをスロット固有クエリで検索して1件返す（フォールバック用）。
 * ジョブフィルタ・予算フィルタも適用する。
 */
function searchFallbackForSlot(slot, jobName, budget) {
    const kwBase = SLOT_FALLBACK_KEYWORDS[slot] || slot;
    const query  = jobName ? `${jobName} ${kwBase}` : kwBase;
    const qGrams = toBigrams(query);

    const scored = items
        .filter(it => {
            if (!EQUIP_SLOT_TYPES.has(it.type)) return false;
            if ((it.displayname || "").startsWith("[レンタル]")) return false;
            if (slotGroup(it.type, it.position) !== slot) return false;
            if (budget !== null && it.price && it.price > budget) return false;
            if (slot === "武器" && jobName) {
                const jobRestricted = it.jobs && it.jobs.length > 0;
                if (jobRestricted && !it.jobs.includes(jobName)) return false;
            }
            return true;
        })
        .map(it => {
            const text = `${it.displayname} ${it.description}`;
            const tGrams = toBigrams(text);
            let overlap = 0;
            for (const g of qGrams) if (tGrams.has(g)) overlap++;
            // ジョブ専用アイテムにボーナス
            const bonus = (it.jobs && jobName && it.jobs.includes(jobName)) ? 0.3 : 0;
            return { score: (qGrams.size ? overlap / qGrams.size : 0) + bonus, item: it };
        })
        .sort((a, b) => b.score - a.score);

    return scored[0] || null;
}
// includeEnchant=false の場合はエンチャントを除外（Phase 1 の装備提案辺り）
function searchSimilarItemsDiversified(query, topPerSlot = 1, maxTotal = 10, allowedJobName = null, includeEnchant = false) {
    if (!items.length) return [];
    const queryGrams = toBigrams(query);
    if (!queryGrams.size) return [];

    const scored = items
        .map(it => {
            let text = `${it.displayname} ${it.description}`;
            // エンチャントは injection_name.suffix もビッグラム対象に加える（"Str+1" "魔力4" 等の短名補強）
            if (it.is_enchant && it.injection_name && it.injection_name.suffix) {
                text += ` ${it.injection_name.suffix}`;
            }
            const textGrams = toBigrams(text);
            let overlap = 0;
            for (const g of queryGrams) if (textGrams.has(g)) overlap++;
            return { score: overlap / queryGrams.size, item: it };
        })
        .filter(r =>
            r.score > 0 &&
            (EQUIP_SLOT_TYPES.has(r.item.type) || (includeEnchant && r.item.is_enchant)) &&
            !(r.item.displayname || "").startsWith("[レンタル]") // レンタルアイテムを除外
        )
        .sort((a, b) => b.score - a.score);

    // スロットごとに上位 topPerSlot 件を選択（全スロット統一、武器も複数候補を確保）
    const bySlot = {};
    for (const r of scored) {
        const slot = r.item.is_enchant ? "エンチャント" : slotGroup(r.item.type || "", r.item.position);
        // 武器フィルタ: items.json の jobs フィールドでジョブ制限チェック
        // jobs が空 = 全ジョブ共通、jobs に値がある = そのジョブのみ
        if (slot === "武器" && allowedJobName) {
            const jobRestricted = r.item.jobs && r.item.jobs.length > 0;
            if (jobRestricted && !r.item.jobs.includes(allowedJobName)) continue;
        }
        // ジョブ専用武器（jobs フィールドにジョブ名が含まれる）にスコアボーナスを与えて優先度を上げる
        if (slot === "武器" && allowedJobName) {
            const jobSpecific = r.item.jobs && r.item.jobs.includes(allowedJobName);
            if (jobSpecific) r.score = r.score * 1.5;
        }
        if (!bySlot[slot]) bySlot[slot] = [];
        if (bySlot[slot].length < topPerSlot) bySlot[slot].push(r);
    }

    return Object.values(bySlot)
        .flat()
        .sort((a, b) => {
            // スコア優先、同点の場合は武器を先頭に（maxTotal でのカットアウトを防ぐ）
            if (b.score !== a.score) return b.score - a.score;
            const aW = WEAPON_TYPES.has(a.item.type || "");
            const bW = WEAPON_TYPES.has(b.item.type || "");
            return aW ? -1 : bW ? 1 : 0;
        })
        .slice(0, maxTotal);
}

/**
 * 装備のゲームIDから、計算機内部データを使って
 * 「実際に差せるエンチャント」をスロット番号とカードID付きで返す。
 * @param {string|number} gameId - ゲーム内部ID（ItemObjNewのID）
 * @returns {{name:string, cardId:number, slotIndex:number}[]} 空配列になる場合は取得不能
 */
function fetchAvailableEnchants(gameId) {
    const dm = window.g_constDataManager;
    const cardDb = window.CardObjNew;
    const rebuildFn = window.RebuildCardSelectSubCollectEnchListData;
    if (!dm || !cardDb || !rebuildFn) return [];

    try {
        const ENCHANT_LIST_KIND = 6; // エンチャントリスト種別定数
        // enchInfo 構造: [enchListId, cardId, params]（hmcard.js resultF.push より）
        const ENCH_INFO_CARD_ID_IDX = 1; // enchInfo[1] がカードID
        const CARD_NAME_IDX = 2;         // CardObjNew[cardId][2] が名前

        const enchDm = dm.GetDataManger(ENCHANT_LIST_KIND);
        if (!enchDm) return [];

        const enchListIds = enchDm.GetEnchListIdArrayByItemId(parseInt(gameId));
        if (!enchListIds || !enchListIds.length) return [];

        // hmitemlist.js と同じパターンで累積収集
        const resultSlots = [[], [], [], []];
        for (const enchListId of enchListIds) {
            const slotData = rebuildFn(enchListId, resultSlots);
            for (let i = 0; i < slotData.length; i++) {
                if (slotData[i]) resultSlots[i] = resultSlots[i].concat(slotData[i]);
            }
        }

        // 同一カードIDは最初のスロットだけ登録（重複除去）
        const seen = new Set();
        const result = [];
        for (let si = 0; si < resultSlots.length; si++) {
            for (const enchInfo of resultSlots[si]) {
                const cardId = enchInfo[ENCH_INFO_CARD_ID_IDX];
                if (seen.has(cardId)) continue;
                seen.add(cardId);
                const card = cardDb[cardId];
                if (card) result.push({ name: card[CARD_NAME_IDX], cardId, slotIndex: si + 1 });
            }
        }
        return result;
    } catch (e) {
        aiLog(`[エンチャント取得エラー] ${e}`);
        return [];
    }
}

/**
 * 装備提案リストの各アイテムに差せるエンチャントを計算機データから取得し、
 * items.json でクエリスコアリングした上位エンチャントを返す。
 * @param {Array} equipResults - searchSimilarItemsDiversified の結果
 * @param {string} query - エンチャント選択用クエリ
 * @param {number} maxEnchPerItem - 1装備あたりの最大提案数
 * @returns {Array} RAG 形式のエンチャント案（{ score, item }）
 */
function fetchEnchantSuggestionsForEquips(equipResults, query) {
    const queryGrams = toBigrams(query);
    const suggestions = [];
    const seenEnchNames = new Set();

    // 提案中の全アイテム名セット（カードサフィックスなし版も含める）→ description リンクボーナス用
    const proposedNames = new Set();
    for (const r of equipResults) {
        const n = r.item.displayname || "";
        proposedNames.add(n);
        proposedNames.add(n.replace(/カード$/, ""));
    }

    for (const r of equipResults) {
        const gameId = findGameItemIdByName(r.item.displayname);
        if (!gameId) continue;

        const enchData = fetchAvailableEnchants(gameId); // [{name, cardId, slotIndex}]
        if (!enchData.length) continue;
        aiLog(`[エンチャント候補] ${r.item.displayname}: ${enchData.length}件`);

        // name → {cardId, slotIndex} のマップを作成
        const enchNameMap = new Map(enchData.map(e => [e.name, e]));

        // slotIndex ごとの候補リスト（各スロットから1件ずつ選ぶため）
        const enchBySlot = {};
        for (const e of enchData) {
            if (!enchBySlot[e.slotIndex]) enchBySlot[e.slotIndex] = [];
            enchBySlot[e.slotIndex].push(e);
        }

        // items.json のエンチャントデータと照合
        const enchItems = items.filter(it =>
            it.is_enchant &&
            it.type !== "カード" &&
            enchNameMap.has(it.displayname)
        );

        // スコアリング: クエリ + 装備セット効果 + 提案中アイテムへのリンク
        const setEffectText = extractSetEffectText(r.item.description || "");
        const setEffectGrams = toBigrams(setEffectText);

        const scoreMap = new Map();
        for (const it of enchItems) {
            let text = `${it.displayname} ${it.description}`;
            if (it.injection_name && it.injection_name.suffix) text += ` ${it.injection_name.suffix}`;
            const tGrams = toBigrams(text);

            // クエリスコア
            let qOverlap = 0;
            if (queryGrams.size) {
                for (const g of queryGrams) if (tGrams.has(g)) qOverlap++;
            }
            const qScore = queryGrams.size ? qOverlap / queryGrams.size : 0;

            // 装備のセット効果テキストとの一致ボーナス
            let setOverlap = 0;
            if (setEffectGrams.size) {
                for (const g of setEffectGrams) if (tGrams.has(g)) setOverlap++;
            }
            const setScore = setEffectGrams.size ? setOverlap / setEffectGrams.size : 0;

            // 提案中アイテムへの description リンクボーナス
            // エンチャントの description に「[提案中アイテム名]と共に装備時」等が含まれる場合
            let linkBonus = 0;
            const enchDesc = it.description || "";
            for (const pname of proposedNames) {
                if (pname && enchDesc.includes(pname)) {
                    linkBonus = Math.min(linkBonus + 0.25, 0.5); // 最大 +0.5
                }
            }

            // クエリ 60% + セット効果 25% + リンク 15%
            const total = qScore * 0.6 + setScore * 0.25 + linkBonus * 0.15;
            scoreMap.set(it.displayname, { score: total, item: it });
        }

        // for_equip_objid: この装備の OBJID を特定（エンチャントセット先の決定に使う）
        const equipSlot = slotGroup(r.item.type || "", r.item.position);
        const forEquipObjId = SLOT_TO_OBJID[equipSlot] || null;

        // 各スロットから最高スコアのエンチャントを1件ずつ選択
        const slotIndices = Object.keys(enchBySlot).map(Number).sort((a, b) => a - b);
        for (const si of slotIndices) {
            const candidates = enchBySlot[si]
                .filter(e => scoreMap.has(e.name) && !seenEnchNames.has(e.name))
                .sort((a, b) => (scoreMap.get(b.name)?.score || 0) - (scoreMap.get(a.name)?.score || 0));
            if (!candidates.length) continue;
            const best = candidates[0];
            const sm = scoreMap.get(best.name);
            seenEnchNames.add(best.name);
            suggestions.push({
                score: sm ? sm.score : 0,
                item: sm ? sm.item : { displayname: best.name, description: "" },
                for_equip: r.item.displayname,
                for_equip_objid: forEquipObjId,
                game_card_id: best.cardId,
                card_slot_index: best.slotIndex,
            });
        }
    }
    return suggestions;
}

function searchSimilarItems(query, topN = 10) {
    if (!items.length) return [];

    const queryGrams = toBigrams(query);
    if (!queryGrams.size) return [];

    return items
        .map(it => {
            const text = `${it.displayname} ${it.description}`;
            const textGrams = toBigrams(text);
            let overlap = 0;
            for (const g of queryGrams) {
                if (textGrams.has(g)) overlap++;
            }
            const score = overlap / queryGrams.size;
            return { score, item: it };
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
}

// ===============================
// RAG コンテキスト生成
// ===============================
const DESC_MAX_LEN = 80;   // 説明文の最大文字数
const CTX_MAX_LEN  = 2000; // コンテキスト全体の最大文字数（10件分を網羅）

/** 価格を人間が読みやすい形式に変換する */
function formatPrice(rawPrice) {
    if (rawPrice === null || rawPrice === undefined || rawPrice === "不明" || rawPrice === "") {
        return "不明（売買不能または未調査）";
    }
    const n = Number(rawPrice);
    if (isNaN(n)) return String(rawPrice) + "z";
    if (n >= 100000000) return `${(n / 100000000).toFixed(1)}億z`;
    if (n >= 10000)     return `${Math.floor(n / 10000)}万z`;
    return `${n}z`;
}

function buildRagContext(results) {
    let ctx = "";
    for (const r of results) {
        const it = r.item;
        if (!it) continue;
        const desc = it.description.length > DESC_MAX_LEN
            ? it.description.substring(0, DESC_MAX_LEN) + "…"
            : it.description;
        const price = formatPrice(it.price);
        const slot = it.is_enchant ? "エンチャント" : slotGroup(it.type || "", it.position);
        ctx += `【装備スロット】${slot}\n`;
        ctx += `【アイテム名】${it.displayname}\n`;
        ctx += `【説明】${desc}\n`;
        ctx += `【カテゴリ】${it.type}\n`;
        ctx += `【価格】${price}\n`;
        ctx += `------------------------------\n`;
        if (ctx.length >= CTX_MAX_LEN) break; // 上限に達したら打ち切り
    }
    return ctx;
}

// ===============================
// RO通貨表記の展開（1G=10億z、500M=5億z 等）
// ===============================
function expandROCurrency(text) {
    // XG → X×10億z
    text = text.replace(/(\d+(?:\.\d+)?)\s*[Gg]/g, (_, n) => {
        const z = Math.round(parseFloat(n) * 1000000000);
        const formatted = z >= 100000000
            ? `${(z / 100000000).toFixed(1)}億z`
            : `${Math.floor(z / 10000)}万z`;
        return `${n}G (=${formatted})`;
    });
    // XM → X×100万z
    text = text.replace(/(\d+(?:\.\d+)?)\s*[Mm]/g, (_, n) => {
        const z = Math.round(parseFloat(n) * 1000000);
        const formatted = z >= 100000000
            ? `${(z / 100000000).toFixed(1)}億z`
            : `${Math.floor(z / 10000)}万z`;
        return `${n}M (=${formatted})`;
    });
    return text;
}
const MODEL_ID_MAP = {
    "Qwen2.5-1.5B-Instruct":  "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
    "Qwen2.5-3B-Instruct":    "Qwen2.5-3B-Instruct-q4f16_1-MLC",
    "Llama-3.2-3B-Instruct":  "Llama-3.2-3B-Instruct-q4f16_1-MLC",
};

// ===============================
// WebLLM: モデル初期化
// ===============================
let chatModel = null;

async function initChatModel() {
    const select = document.getElementById("model-select");
    const uiModelName = select ? select.value : "Qwen2.5-1.5B-Instruct";
    const modelId = MODEL_ID_MAP[uiModelName];

    if (!modelId) {
        aiLog(`モデル ${uiModelName} は WebLLM 未対応です`);
        return;
    }

    aiLog(`モデル ${modelId} をロード中… (初回は数分かかります)`);
    const progEl = document.getElementById("model-recommendation");

    try {
        chatModel = await CreateMLCEngine(modelId, {
            initProgressCallback: (p) => {
                const pct = p.progress != null ? Math.floor(p.progress * 100) : 0;
                const msg = `${p.text || p.stage || ""} ${pct}%`;
                aiLog(msg);
                if (progEl) progEl.textContent = msg;
            },
        });

        aiLog(`モデルのロード完了`);
        if (progEl) progEl.textContent = `モデル ${uiModelName} を正常にロードしました`;
    } catch (e) {
        aiLog("モデルロードに失敗: " + e);
        if (progEl) progEl.textContent = `モデル ${uiModelName} をロードできませんでした`;
    }
}

// ===============================
// JavaScript による装備提案テキスト生成（LLM 不使用）
// ===============================
/**
 * RAG 結果からスロット別に整形した装備提案テキストを生成する。
 * @param {Array} results - searchSimilarItemsDiversified の戻り値
 * @param {string|null} jobName - 検出したジョブ名
 * @returns {string}
 */
function buildFormattedAnswer(results, jobName) {
    if (!results.length) return "装備提案が見つかりませんでした。別のキーワードで試してください。";
    const slotOrder = ["武器", "頭上段", "頭中段", "頭下段", "鎧", "盾", "靴", "肩にかける物", "アクセサリー", "カード", "エンチャント"];
    const grouped = {};
    for (const r of results) {
        const slot = r.item.is_enchant ? "エンチャント" : slotGroup(r.item.type || "", r.item.position);
        if (!grouped[slot]) grouped[slot] = [];
        grouped[slot].push(r);
    }
    const header = jobName ? `${jobName}向け装備提案` : "装備提案";
    const lines = [header];
    const orderedSlots = [
        ...slotOrder.filter(s => grouped[s]),
        ...Object.keys(grouped).filter(s => !slotOrder.includes(s)),
    ];
    for (const slot of orderedSlots) {
        lines.push(`\n【${slot}】`);
        for (const r of grouped[slot]) {
            const price = formatPrice(r.item.price);
            let suffix = "";
            if (r.item.is_enchant) {
                suffix = r.for_equip ? ` ※「${r.for_equip}」に差せるエンチャント` : " ※カードスロットから装備";
            } else if (r.item.type === "カード") {
                suffix = " ※カードスロットから装備";
            }
            lines.push(`・${r.item.displayname}（${price}）${suffix}`);
        }
    }
    return lines.join("\n");
}

/**
 * OBJID_SELECT_JOB の現在選択値からジョブ情報を取得する。
 * detectJobFromQuery が失敗した場合（クエリにジョブ名なし）のフォールバック。
 */
function detectCurrentJob() {
    const sel = document.getElementById("OBJID_SELECT_JOB");
    if (!sel) return null;
    const opt = sel.options[sel.selectedIndex];
    if (!opt || !opt.value) return null;
    return { jobId: opt.value, jobName: opt.text.trim() };
}

/**
 * 現在の装備欄から装備中のアイテム名一覧を取得する（ItemObjNew 逆引き）。
 * ITEM_DATA_INDEX_NAME=8
 */
function readCurrentEquipNames() {
    const db = window.ItemObjNew;
    if (!db) return [];
    const objIds = [
        "OBJID_ARMS_RIGHT", "OBJID_HEAD_TOP", "OBJID_HEAD_MID", "OBJID_HEAD_UNDER",
        "OBJID_BODY", "OBJID_SHIELD", "OBJID_SHOES", "OBJID_SHOULDER",
        "OBJID_ACCESSORY_1", "OBJID_ACCESSORY_2",
    ];
    const names = [];
    for (const objId of objIds) {
        const el = document.getElementById(objId);
        if (!el || !el.value) continue;
        const gameId = parseInt(el.value);
        if (!gameId) continue;
        const item = db[gameId];
        if (item && item[8]) names.push(item[8]);
    }
    return names;
}

// ===============================
// AI に質問 → RAG → 回答生成
// ===============================
async function askAI(userQuery) {
    lastUserQuery = userQuery;
    aiLog(`ユーザー質問: ${userQuery}`);

    // RAG 前にジョブを変更し、装備可能な武器フィルタ用ジョブ名を取得する
    // （items.json の jobs フィールドを使用してジョブ制限チェック）
    // クエリにジョブ名がない場合は現在の SELECT_JOB の値を使う
    let preDetectedJob = detectJobFromQuery(userQuery);
    if (!preDetectedJob) {
        preDetectedJob = detectCurrentJob();
        if (preDetectedJob) aiLog(`[ジョブ自動検出] 現在選択中: ${preDetectedJob.jobName}`);
    }
    const allowedJobName = preDetectedJob ? preDetectedJob.jobName : null;
    if (preDetectedJob) {
        const jobSelect = document.getElementById("OBJID_SELECT_JOB");
        if (jobSelect && jobSelect.value !== preDetectedJob.jobId) {
            aiLog(`[ジョブ変更（RAG前）] ${preDetectedJob.jobName}（${preDetectedJob.jobId}）`);
            if (window.$) {
                window.$(jobSelect).val(preDetectedJob.jobId).trigger("change");
            } else {
                jobSelect.value = preDetectedJob.jobId;
                if (window.OnChangeJob) window.OnChangeJob(preDetectedJob.jobId);
            }
            await new Promise(r => setTimeout(r, 300));
        }
        aiLog(`[武器フィルタ] jobs フィールドによる ${preDetectedJob.jobName} 専用武器チェックを適用`);
    }
    lastAllowedJobName = allowedJobName; // buildApplyPreviewText で使用

    // 「今の装備」「アップグレード」等のキーワードがある場合、現在の装備名をクエリに付加して
    // RAG が現在のスロットと近いアイテムを返しやすくする
    let ragQuery = userQuery;
    const CURRENT_EQUIP_KEYWORDS = /今の装備|現在の装備|アップグレード|強化|更新|入れ替え/;
    if (CURRENT_EQUIP_KEYWORDS.test(userQuery)) {
        const equipNames = readCurrentEquipNames();
        if (equipNames.length > 0) {
            ragQuery = `${userQuery} ${equipNames.join(" ")}`;
            aiLog(`[現在の装備付加] ${equipNames.join(", ")}`);
        }
    }
    // ジョブ名もクエリに付加（ジョブ固有装備のスコアを上げる）
    if (allowedJobName && !userQuery.includes(allowedJobName)) {
        ragQuery = `${allowedJobName} ${ragQuery}`;
    }

    // エンチャント関連クエリの場合はエンチャントを多めに返す
    // またジョブ名（長い名前）を含むとエンチャントのbigram検索が汚染されるため、
    // エンチャント専用クエリではジョブ名を取り除いたクエリを使う
    const ENCHANT_QUERY_RE = /エンチャント|強化スロット|刻印|エンチャ/;
    const isEnchantQuery = ENCHANT_QUERY_RE.test(userQuery);
    const topPerSlot = isEnchantQuery ? 4 : 2;  // 各スロット2件取得→フィルタ後に1件に絞る
    const maxTotal   = isEnchantQuery ? 16 : 18;
    let finalRagQuery = ragQuery;
    if (isEnchantQuery && allowedJobName) {
        // ジョブ名をクエリから除去してエンチャント検索の精度を上げる
        finalRagQuery = ragQuery.replace(allowedJobName, "").trim();
        aiLog(`[エンチャント特化検索] topPerSlot=4 maxTotal=16 クエリ: ${finalRagQuery}`);
    }

    // 予算フィルタ: クエリから予算を解析して price 超過アイテムを除外
    const budget = extractBudget(userQuery);
    if (budget !== null) aiLog(`[予算フィルタ] 上限: ${(budget / 1e8).toFixed(2)}億z`);

    // Phase 1: 装備のみ提案（エンチャント・カードを除外）
    const equipResultsRaw = searchSimilarItemsDiversified(finalRagQuery, topPerSlot, maxTotal, allowedJobName, false);
    // 予算フィルタ適用（price が設定されていて予算超過のものを除外、price=0/null は売買不能として残す）
    const budgetFiltered = budget !== null
        ? equipResultsRaw.filter(r => !r.item.price || r.item.price <= budget)
        : equipResultsRaw;
    const budgetRemovedCount = equipResultsRaw.length - budgetFiltered.length;
    if (budgetRemovedCount > 0) aiLog(`[予算フィルタ] ${budgetRemovedCount} 件を除外（予算超過）`);
    // hmitemlist.js の IsMatchJobRestrict と同等の DOM 確認で、現在のジョブで装備できないものを除外
    const jobFiltered = filterEquippableByCurrentJob(budgetFiltered);
    const filteredCount = budgetFiltered.length - jobFiltered.length;
    if (filteredCount > 0) aiLog(`[ジョブ装備フィルタ] ${filteredCount} 件を除外（装備不可）`);
    // 各スロット最上位1件に絞る（topPerSlot=2 で取得した候補をフィルタ後にスロット重複排除）
    const slotSeen = new Set();
    const equipResults = jobFiltered.filter(r => {
        const slot = slotGroup(r.item.type || "", r.item.position);
        if (slotSeen.has(slot)) return false;
        slotSeen.add(slot);
        return true;
    });

    // 空きスロットをフォールバック検索で補填（全スロットを均等に埋める）
    for (const slot of ALL_EQUIP_SLOTS) {
        if (slotSeen.has(slot)) continue;
        const fb = searchFallbackForSlot(slot, allowedJobName, budget);
        if (fb) {
            equipResults.push(fb);
            aiLog(`[フォールバック補填] ${slot} ← ${fb.item.displayname}`);
        } else {
            aiLog(`[フォールバック補填] ${slot}: 条件に合うアイテムなし`);
        }
    }

    aiLog(`RAG 検索完了: ${equipResults.length} 件ヒット（装備のみ、ジョブ制限フィルタ済み）`);

    // Phase 2: 計算機内部データから実際に差せるエンチャントを取得してアップ
    const enchantQuery = isEnchantQuery ? finalRagQuery : userQuery;
    const enchantResults = fetchEnchantSuggestionsForEquips(equipResults, enchantQuery);
    if (enchantResults.length) {
        aiLog(`[エンチャントPhase2] ${enchantResults.length} 件取得`);
    } else {
        aiLog("[エンチャントPhase2] 計算機データ操作が未利用のためエンチャント提案なし");
    }

    const results = [...equipResults, ...enchantResults];
    lastRagSuggestions = results;
    aiLog(`RAG 検索完了: 合計 ${results.length} 件（装備+エンチャント）`);

    aiLog("装備提案を生成中…");
    const baseList = buildFormattedAnswer(results, preDetectedJob ? preDetectedJob.jobName : null);

    // LLM が未ロードなら自動初期化を試みる
    if (!chatModel) {
        aiLog("モデルが未ロードのため初期化します…");
        try { await initChatModel(); } catch (e) { aiLog("モデルロードに失敗: " + e); }
    }

    // LLM が利用可能ならリストを渡して回答させる（失敗時は JavaScript 生成で代替）
    if (chatModel) {
        try {
            const response = await chatModel.chat.completions.create({
                messages: [
                    { role: "system", content: "日本語のみ。入力されたリストをそのまま出力してください。中文不可。" },
                    { role: "user",   content: baseList },
                ],
                temperature: 0.1,
                max_tokens: 800,
                repetition_penalty: 1.1,
            });
            aiLog("LLM 応答完了");
            return response.choices[0].message.content;
        } catch (e) {
            aiLog("LLM エラー（JavaScript 生成で代替）: " + e);
        }
    }

    return baseList;
}

// ===============================
// ページ読み込み時の初期化
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    loadRagData();
});

// ===============================
// 装備欄への反映
// ===============================

// アイテムタイプ → 装備欄 select ID のマッピング
const SLOT_TO_OBJID = {
    "頭上段":     "OBJID_HEAD_TOP",
    "頭中段":     "OBJID_HEAD_MID",
    "頭下段":     "OBJID_HEAD_UNDER",
    "鎧":        "OBJID_BODY",
    "靴":        "OBJID_SHOES",
    "肩にかける物": "OBJID_SHOULDER",
    "盾":        "OBJID_SHIELD",
    "アクセサリー":  "OBJID_ACCESSORY_1",
    "武器":      "OBJID_ARMS_RIGHT",
    // カード・エンチャントは反映先スロットが装備ごとに異なるため SLOT_TO_OBJID に含めない
};

/**
 * window.IsMatchJobRestrict（mig.job.h.js 公開済み）を使って
 * 現在のジョブ（window.n_A_JOB）でアイテムを装備できるか判定する。
 * @param {string|number} gameId ItemObjNew の ID
 * @returns {boolean} 装備可能なら true
 */
function isEquippableByCurrentJob(gameId) {
    const fn  = window.IsMatchJobRestrict;
    const jobId = window.n_A_JOB;
    const db  = window.ItemObjNew;
    if (!fn || jobId === undefined || jobId === null || !db) return true;
    try {
        const numId = parseInt(gameId);
        if (!db[numId]) return true; // DB 未収録 → 制限なし扱い
        return fn(numId, jobId);
    } catch (e) {
        aiLog(`[装備可否チェックエラー] ${e}`);
        return true;
    }
}

/**
 * RAG 結果から、現在のジョブで装備できないアイテムを除外する。
 * window.IsMatchJobRestrict（hmitemlist.js と同じ仕組み）で全装備スロットを検証。
 * エンチャント・カードはジョブ制限がないためスキップ。
 * @param {Array} results searchSimilarItemsDiversified の戻り値
 * @returns {Array} ジョブで装備可能なものだけを残した配列
 */
function filterEquippableByCurrentJob(results) {
    const fn    = window.IsMatchJobRestrict;
    const jobId = window.n_A_JOB;
    if (!fn) {
        aiLog("[ジョブフィルタ] window.IsMatchJobRestrict が未定義のためスキップ");
        return results;
    }
    if (jobId === undefined || jobId === null) {
        aiLog("[ジョブフィルタ] window.n_A_JOB が未定義のためスキップ");
        return results;
    }
    aiLog(`[ジョブフィルタ] n_A_JOB=${jobId} で ${results.length} 件をチェック`);
    return results.filter(r => {
        if (r.item.is_enchant || (r.item.type || "") === "カード") return true;
        const gameId = findGameItemIdByName(r.item.displayname);
        if (!gameId) {
            aiLog(`[ジョブフィルタ] ${r.item.displayname}: DB未収録のためスキップ`);
            return true; // DB 未収録 → 制限なし扱い
        }
        const canEquip = isEquippableByCurrentJob(gameId);
        if (!canEquip) aiLog(`[ジョブ制限除外] ${r.item.displayname} は現在のジョブで装備不可 (gameId=${gameId})`);
        return canEquip;
    });
}

/**
 * hmitemlist.js と同じ方式で ItemObjNew をアイテム名で検索し、ゲーム内部 ID を返す。
 * items.json の ID 体系と ItemObjNew の ID 体系は異なるため、この変換が必要。
 * @param {string} name items.json の displayname
 * @returns {string|null} ゲーム内部 ID（文字列）、見つからなければ null
 */
function findGameItemIdByName(name) {
    const db = window.ItemObjNew;
    // ITEM_DATA_INDEX_NAME=8, ITEM_DATA_INDEX_ID=0（item.h.js の EnumItemDataIndex による）
    const NAME_IDX = 8;
    const ID_IDX   = 0;
    if (!db) return null;
    for (let i = 0; i < db.length; i++) {
        const item = db[i];
        if (item && normalizeParens(item[NAME_IDX]) === normalizeParens(name)) return String(item[ID_IDX]);
    }
    return null;
}

/**
 * クエリ文字列から OBJID_SELECT_JOB の option テキストを照合してジョブ ID を検出する。
 * @param {string} query
 * @returns {{jobId: string, jobName: string}|null}
 */
function detectJobFromQuery(query) {
    const sel = document.getElementById("OBJID_SELECT_JOB");
    if (!sel || !query) return null;
    for (const opt of Array.from(sel.options)) {
        const name = opt.text && opt.text.trim();
        if (name && query.includes(name)) {
            return { jobId: opt.value, jobName: name };
        }
    }
    return null;
}

/**
 * RAG 結果を装備欄に反映する（武器も含む）。
 * クエリにジョブ名が含まれている場合は装備前に自動でジョブを切り替える。
 * @returns {Promise<number>} 反映できた件数
 */
async function applyEquipmentSuggestions() {
    if (!lastRagSuggestions.length) {
        aiLog("反映できるアイテムがありません");
        return 0;
    }

    // ジョブ自動変更: クエリにジョブ名が含まれていれば装備前に切り替える
    const detectedJob = detectJobFromQuery(lastUserQuery);
    if (detectedJob) {
        const jobSelect = document.getElementById("OBJID_SELECT_JOB");
        if (jobSelect && jobSelect.value !== detectedJob.jobId) {
            aiLog(`[ジョブ変更] ${detectedJob.jobName}（id=${detectedJob.jobId}）に切り替えます`);
            if (jobSelect.tomselect) {
                jobSelect.tomselect.setValue(detectedJob.jobId);
            } else {
                jobSelect.value = detectedJob.jobId;
                jobSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }
            // 装備 select の再構築（changeJobSettings / Init）を待つ
            await new Promise(r => setTimeout(r, 150));
        } else {
            aiLog(`[ジョブ確認] 既に ${detectedJob.jobName} が選択されています`);
        }
    }

    // アクセサリーは 2 スロット用に順番管理
    let accessorySlotIndex = 0;
    const accessoryObjIds = ["OBJID_ACCESSORY_1", "OBJID_ACCESSORY_2"];
    // スロット重複防止
    const appliedSlots = new Set();
    const appliedItemNames = new Set(); // 反映された装備名（enchantQueue の for_equip チェックに使用）
    let applied = 0;
    // エンチャント/カードの後処理キュー（装備反映後にカードスロットへセット）
    const enchantQueue = [];

    for (const r of lastRagSuggestions) {
        const type = r.item.type || "";
        // エンチャントは後処理キューに積んで装備スロット反映後に処理
        if (r.item.is_enchant) {
            if (r.for_equip_objid && r.game_card_id !== null) {
                enchantQueue.push(r);
            } else {
                aiLog(`[提案のみ] ${r.item.displayname}（スロット情報なし）`);
            }
            continue;
        }
        // カード（通常カード）: description の「装備 : xxx」から装備先を判定して enchantQueue に追加
        if (type === "カード") {
            const cardId = findCardIdByName(r.item.displayname);
            if (cardId == null) {
                aiLog(`[提案のみ] ${r.item.displayname}（CardObjNew未収録）`);
                continue;
            }
            const equipObjId = getCardEquipObjId(r.item.description || "");
            if (!equipObjId) {
                aiLog(`[提案のみ] ${r.item.displayname}（装備先を判定できません）`);
                continue;
            }
            enchantQueue.push({
                ...r,
                for_equip: null,         // OBJID ベースで判定
                for_equip_objid: equipObjId,   // "__ALL__" または特定スロット
                game_card_id: cardId,
                card_slot_index: 1,      // 通常カードは CARD_1
            });
            continue;
        }
        const slot = slotGroup(type, r.item.position);

        let objId;
        if (ACCESSORY_TYPES.has(type)) {
            if (accessorySlotIndex >= accessoryObjIds.length) continue;
            objId = accessoryObjIds[accessorySlotIndex++];
        } else {
            objId = SLOT_TO_OBJID[slot];
            if (!objId) continue;
            if (appliedSlots.has(objId)) continue; // 同スロット重複防止
        }

        const el = document.getElementById(objId);
        if (!el) {
            aiLog(`[skip] ${objId} が見つかりません`);
            continue;
        }
        // ItemObjNew を名前で検索してゲーム内部 ID を取得（hmitemlist.js と同方式）
        const gameId = findGameItemIdByName(r.item.displayname);
        if (!gameId) {
            aiLog(`[未収録] ${r.item.displayname} は計算機のアイテムDBに存在しません`);
            continue;
        }
        // 武器スロットの場合: OBJID_ARMS_RIGHT は現在選択中の武器タイプしか持たないため、
        // 武器の KIND に合わせて OnChangeArmsTypeRight を呼んで options を再構築する
        if (objId === "OBJID_ARMS_RIGHT" && window.OnChangeArmsTypeRight && window.ItemObjNew) {
            const itemData = window.ItemObjNew[parseInt(gameId)];
            if (itemData) {
                const kind = itemData[1]; // ITEM_DATA_INDEX_KIND = 1
                aiLog(`[武器タイプ変更] KIND=${kind} に設定して ${r.item.displayname} を装備可能にします`);
                window.OnChangeArmsTypeRight(kind);
                // options の再構築を待つ
                await new Promise(res => setTimeout(res, 50));
            }
        }

        // select の option に存在するか確認（装備制限で現在のジョブが装備不可の場合はスキップ）
        const optionExists = Array.from(el.options).some(opt => opt.value === gameId);
        if (!optionExists) {
            aiLog(`[装備不可] ${r.item.displayname} は現在のジョブで装備制限あり (gameId=${gameId})`);
            continue;
        }
        if (el.tomselect) {
            el.tomselect.setValue(gameId);
        } else {
            el.value = gameId;
            el.dispatchEvent(new Event("change", { bubbles: true }));
        }
        appliedSlots.add(objId);
        appliedItemNames.add(r.item.displayname); // 反映された装備名を記録
        applied++;
        aiLog(`[反映] ${objId} ← ${r.item.displayname} (gameId=${gameId})`);
    }

    // Phase 2: エンチャントをカードスロットに反映
    // 装備変更後に equip.js が RebuildCardSelect を呼んでカードスロット <select> を再構築するのを待つ
    if (enchantQueue.length) {
        await new Promise(r => setTimeout(r, 120));
        const appliedEnchantSlots = new Set(); // 同一スロットへの重複防止
        for (const r of enchantQueue) {
            // 対応する装備が実際に反映済みでない場合はスキップ
            // for_equip（装備名）優先、なければ for_equip_objid（OBJID）でフォールバック
            const forEquipReflected = r.for_equip
                ? appliedItemNames.has(r.for_equip)
                : (r.for_equip_objid ? appliedSlots.has(r.for_equip_objid) : true);
            if (!forEquipReflected) {
                aiLog(`[エンチャントスキップ] ${r.item.displayname} → 「${r.for_equip || r.for_equip_objid}」が未反映のためスキップ`);
                continue;
            }
            // "__ALL__"（全ての部位）カード: 反映済みスロットから空いているCARD_1を探す
            let resolvedObjId = r.for_equip_objid;
            if (resolvedObjId === "__ALL__") {
                resolvedObjId = null;
                for (const objId of appliedSlots) {
                    const cSlot = `${objId}_CARD_1`;
                    if (!appliedEnchantSlots.has(cSlot) && document.getElementById(cSlot)) {
                        resolvedObjId = objId;
                        break;
                    }
                }
                if (!resolvedObjId) {
                    aiLog(`[カードスキップ] ${r.item.displayname}：空きCARD_1スロットが見つかりません`);
                    continue;
                }
            }
            const slotId = `${resolvedObjId}_CARD_${r.card_slot_index}`;
            // 同じカードスロットへの重複セット防止（2件目以降は別スロット番号を持つはずなので通常は不要だが安全策）
            if (appliedEnchantSlots.has(slotId)) {
                aiLog(`[エンチャント重複スキップ] ${slotId} には既にエンチャントがセット済み`);
                continue;
            }
            const cardSel = document.getElementById(slotId);
            if (!cardSel) {
                aiLog(`[カードスロット未検出] ${slotId}（装備が反映されていないか未対応スロット）`);
                continue;
            }
            const cardIdStr = String(r.game_card_id);
            const optExists = Array.from(cardSel.options).some(o => o.value === cardIdStr);
            if (!optExists) {
                aiLog(`[エンチャント非対応] ${r.item.displayname} → ${slotId} に該当オプションなし`);
                continue;
            }
            if (window.$) {
                window.$(cardSel).val(cardIdStr).trigger("change");
            } else {
                cardSel.value = cardIdStr;
                cardSel.dispatchEvent(new Event("change", { bubbles: true }));
            }
            appliedEnchantSlots.add(slotId);
            applied++;
            aiLog(`[反映] ${slotId} ← ${r.item.displayname} (cardId=${r.game_card_id})`);
        }
    }

    aiLog(`装備欄に ${applied} 件を反映しました`);
    return applied;
}

// ===============================
// グローバル公開（inline script から呼び出し可能にする）
// ===============================

/**
 * RAG 結果から「反映予定アイテム一覧」テキストを生成する。
 * AI の回答とは別に、items.json の正確なデータを表示する。
 */
function buildApplyPreviewText() {
    if (!lastRagSuggestions.length) return "";
    const lines = ["【反映予定アイテム（※AI回答と一致しない場合があります）】"];
    // applyEquipmentSuggestions と同じ de-dup ロジックで表示
    let accessorySlotIndex = 0;
    const seenObjIds = new Set();
    for (const r of lastRagSuggestions) {
        const type = r.item.type || "";
        const slot = r.item.is_enchant ? "エンチャント" : slotGroup(type, r.item.position);
        const price = formatPrice(r.item.price);
        // カード・エンチャントの表示
        if (r.item.is_enchant || type === "カード") {
            let note = "";
            if (r.item.is_enchant) {
                if (r.for_equip_objid && r.card_slot_index !== null) {
                    note = ` ※「${r.for_equip}」の第${r.card_slot_index}エンチャントに反映`;
                } else if (r.for_equip) {
                    note = ` ※「${r.for_equip}」向け（スロット情報なし）`;
                }
            } else {
                if (r.for_equip) {
                    note = ` ※通常カード（「${r.for_equip}」に自動反映）`;
                } else {
                    note = " ※通常カード（対象装備情報なし）";
                }
            }
            lines.push(`・[${slot}] ${r.item.displayname}（${price}）${note}`);
            continue;
        }
        // 武器: 装備可能なものを1件表示（ゲームDB未収録・装備不可はスキップして次候補へ）
        if (WEAPON_TYPES.has(type)) {
            if (!seenObjIds.has("武器")) {
                // IsMatchJobRestrict で装備可否チェック（武器の種類・転生・三次職制限を含む）
                const gameId = findGameItemIdByName(r.item.displayname);
                if (gameId && !isEquippableByCurrentJob(gameId)) continue;
                const note = r.item.id > 4993 ? " ※計算機DB未収録の可能性" : "";
                lines.push(`・[${slot}] ${r.item.displayname}（${price}）${note}`);
                seenObjIds.add("武器");
            }
            continue;
        }
        // アクセサリー
        let objId;
        if (ACCESSORY_TYPES.has(type)) {
            if (accessorySlotIndex >= 2) continue;
            objId = ["OBJID_ACCESSORY_1", "OBJID_ACCESSORY_2"][accessorySlotIndex++];
        } else {
            objId = SLOT_TO_OBJID[slot];
            if (!objId) continue;
            if (seenObjIds.has(objId)) continue; // 同スロット重複スキップ
        }
        seenObjIds.add(objId);
        // ID 体系の違いによる未対応アイテムを注記（items.json ID が 4993 超 = 計算機DBに未収録の可能性）
        const note = r.item.id > 4993 ? " ※計算機DB未収録の可能性" : "";
        lines.push(`・[${slot}] ${r.item.displayname}（${price}）${note}`);
    }
    return lines.join("\n");
}


window.askAI = askAI;
window.initChatModel = initChatModel;
window.applyEquipmentSuggestions = applyEquipmentSuggestions;
window.buildApplyPreviewText = buildApplyPreviewText;
