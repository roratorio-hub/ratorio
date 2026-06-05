import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ================================================================
// チューニングパラメータ（ここを編集するだけで挙動を調整できる）
// ================================================================

// --- RAG スコア閾値 ---
// シナジー（セット効果・共に装備時）へのスコアウェイト。値が大きいほど連携装備を強く優先。
const SYNERGY_WEIGHT           = 2.0;
// カードの最低採用スコア。これ未満はポリンカード等の弱カードとして除外。
// カードはクエリにスキル名を含めたJOB_STAT_KEYWORDS全体でなくステータス専用のJOB_STAT_BASE_KEYWORDSで採点するため、閾値を下げる。
// Fix A(extractNonSetText適用後)のスコア: DR815=0.1607, ホワイトアイスウィンド=0.1786
// 0.17: DR815(0.1607)・セット条件依存カードを除外、ホワイトアイスウィンド(0.1786)等は通過
const MIN_CARD_SCORE           = 0.17;
// フォールバック補填でジョブ専用がない場合に許容する最低スコア。低すぎる汎用装備は除外。
const MIN_FALLBACK_SCORE       = 0.12;
// フォールバック補填で reqLvBonus/jobSpecBonus 等の補正前の本体コンテンツ関連性スコアの最低値。
// これにより MaxHP/MaxSP のみの汎用アイテム（グレイウルフシューズ等）が reqLvBonus(+0.20) で
// 最低スコアを超えて採用されるのを防ぐ。ジョブ専用アイテムはこのチェックをスキップする。
const MIN_FALLBACK_CONTENT_SCORE = 0.10;
// Phase1の汎用装備（ジョブ専用なし）に許容する最低スコア。低すぎる場合はフォールバックに任せる。
const MIN_GENERIC_EQUIP_SCORE  = 0.18;

// --- RAG 検索件数 ---
// 通常検索：スロットごとの候補数／全スロット合算の上限。
const RAG_TOP_PER_SLOT         = 2;
const RAG_MAX_TOTAL            = 28;
// エンチャント特化モードでの候補数／上限。
const RAG_ENCHANT_TOP_PER_SLOT = 4;
const RAG_ENCHANT_MAX_TOTAL    = 16;

// --- スロット別最大提案数 ---
// アクセサリー2枠・カード6枚など複数枠を持つスロットの上限。
const MULTI_SLOT_MAX           = { "アクセサリー": 2, "カード": 8 };

// --- LLM パラメータ ---
// LLMによるカード絞り込み時の最大トークン数。
const LLM_MAX_TOKENS_CARD      = 220;
// LLMによるクエリ拡張時の最大トークン数。
const LLM_MAX_TOKENS_QUERY     = 50;

// --- コンテキスト生成 ---
// RAGコンテキストに含める説明文の最大文字数。
const DESC_MAX_LEN             = 80;
// RAGコンテキスト全体の最大文字数。
const CTX_MAX_LEN              = 2000;

// --- シナジーパートナーボーナス ---
// synergy_textの「[XXX]と共に装備時」のパートナー装備の説明文をクエリと照合しスコアに加算する重み。
// エンチャント・カードとのシナジーが強い装備を優先選択するための全体最適化係数。
const SYNERGY_PARTNER_WEIGHT   = 0.5;

// シナジーキーワード（これらを含む説明文はシナジー効果を持つ可能性が高いため、RAGコンテキストに優先的に含める）
const SYNERGY_KEYWORDS = ["リフレッシュ", "インスピレーション", "再生の炎", "天地崩壊", "王家の栄光", "詠唱妨害不可", "限界突破", "王の神威", "潜在覚醒", "潜在解放", "極限の魔力", "悠遠なる天上の都", "厄災の魔将", "時間の注視者", "起源の王", "異境の統轄者", "豊穣の女神", "英雄の凱歌", "殺意の怨念", "星雲の精髄"]; // 全職業向け
const SYNERGY_KEYWORDS_MAGIC = ["根源への到達", "星界の暴君", "真理の解放", "暴走した魔力"];                // 魔法職向け
const SYNERGY_KEYWORDS_PHYSICAL = ["魔獣の爪牙", "蒼穹の覇者", "死の欲動", "覇王", "豪傑"];     // 物理職向け
const SYNERGY_KEYWORDS_ASSISTANCE = ["天与の才", "森羅万象"];       // 支援職向け

// シナジーキーワード1件ヒットにつきスコアに加算するボーナス
const SYNERGY_KW_BONUS = 0.15;

/**
 * ジョブキーワード文字列からジョブカテゴリを判定し、適用すべきシナジーキーワード配列を返す。
 * （SYNERGY_KEYWORDS_MAGIC / PHYSICAL / ASSISTANCE は jobKeywords の内容から自動選択）
 * @param {string} jobKeywords - JOB_STAT_KEYWORDS[jobName]
 * @returns {string[]}
 */
function getActiveSynergyKeywords(jobKeywords) {
    const kw = jobKeywords || "";
    // タブ等の余分な空白を除去して返す（定義時のタイポ対策）
    const kws = SYNERGY_KEYWORDS.map(k => k.trim());
    const isMagic    = kw.includes("Matk") || kw.includes("Spl");
    const isPhysical = !isMagic && (kw.includes("Atk") || kw.includes("Pow"));
    if (isMagic)         kws.push(...SYNERGY_KEYWORDS_MAGIC);
    else if (isPhysical) kws.push(...SYNERGY_KEYWORDS_PHYSICAL);
    else                 kws.push(...SYNERGY_KEYWORDS_ASSISTANCE);
    return kws;
}

// ================================================================

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
// displayname → item の Map（シナジーパートナーボーナス計算用）
let itemNameMap = new Map();

// シナジーペアインデックス（items 読み込み後に遅延構築）
// Map<displayname, partnerNames[]>
let synergyPairIndex = null;

// 3段シナジーインデックス（カード ↔ エンチャント ↔ 装備）
let cardToEnchantIndex = null;      // Map<cardName, enchantName[]>
let enchantToCardIndex = null;      // Map<enchantName, cardName[]>
let enchantEquipSynergyIndex = null;  // Map<enchantName, item[]> ポジティブ参照のみ
let enchantEquipConflictIndex = null; // Map<enchantName, item[]> ネガティブ参照（発動しない等）

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
        // シナジーパートナーボーナス計算用の Map を構築する
        itemNameMap = new Map(items.map(it => [it.displayname, it]));
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
    const t = (text || "").replace(/\s+/g, "");
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
 * スコアリング用: 真のシナジーブロック（他アイテム/カード/エンチャントとの連携効果）のみを抽出。
 * extractSetEffectText より厳格で、「共に装備時」「セット効果」「カードセット」「コンボ」を含むブロックのみ対象。
 * @param {string} description
 * @returns {string} シナジーテキスト（なければ空文字）
 */
function extractSynergyTextStrict(description) {
    if (!description) return "";
    const sections = description.split(/―{3,}/);
    const blocks = sections.filter(s =>
        s.includes("共に装備時") ||
        s.includes("セット効果") ||
        s.includes("カードセット") ||
        s.includes("コンボ")
    );
    return blocks.join(" ");
}

/** description からセット条件（[XXX]と共に装備時）セクションを除いた本体テキストを返す。
 * セット条件付き効果のEM向けキーワードによるbase score過大評価を防ぐ。
 * （例: ニーヴバレッタの「ニーヴ武器と共に装備時: Matk+20」はEM向けではないが除外しなければ高スコアになる）
 * また「メモリアルダンジョン」等の特定ダンジョン限定効果も除外し、場所特化アイテムの
 * 不当な高スコアを防ぐ（例: ディアボロスウィングの「魔神殿ダメ+30%」が「魔法攻撃」にヒットする問題）*/
function extractNonSetText(description) {
    if (!description) return "";
    const sections = description.split(/[―─]{3,}/);
    return sections
        // セット条件（「[XXX]と共に装備時」）・精錬条件（「の精錬値」）・スキル条件（「の習得Lv」）を除外。
        // ※ブラケットを含むセクション全体は除外しない: 「[コンフラグレーション]で与えるダメージ+5%」のような
        //   スキル効果行はスコア計算に必要（EM専用アクセサリー等でEM スキル名が含まれる場合に正しく高スコアを得るため）。
        //   除外するのは「共に装備時」「の精錬値」「の習得Lv」キーワードを含む条件付きセクションのみ。
        // 「系列 :」を含むセクションはメタデータ（系列/位置/属性/スロット/Def/Mdef/重量/要求レベル/装備）→ 除外。
        .filter(s => !s.includes("共に装備時") && !s.includes("の習得Lv") && !s.includes("習得時") && !s.includes("系列 :") && !s.includes("連れている時"))
        // 「の精錬値」は除外しない: 自己参照精錬ボーナス（スキルディレイ/ダメージ+等）を
        // スコアに反映させるため。アーリースカイ等の精錬値依存主力効果が正しく評価される。
        .map(s => {
            // 「メモリアルダンジョン」を含む行はダンジョン特化効果 → 汎用評価には不要
            return s.replace(/[^\n]*メモリアルダンジョン[^\n]*/g, "");
        })
        .join(" ");
}

/** synergy_text から「[XXX]と共に装備時」の XXX 部分（パートナー名）を抽出して返す。
 * 同じ synergy_text に複数のパートナーがある場合は全て返す。 */
function extractSynergyPartnerNames(synergyText) {
    if (!synergyText) return [];
    const normalized = normalizeParens(synergyText);
    // Pattern 1: [XXX]と（...）共に装備時 — 単独アイテム条件
    const matches1 = [...normalized.matchAll(/\[([^\]]+)\]と[\s\S]*?共に装備時/g)];
    // Pattern 2: [A]、[B]...のいずれかと共に装備時 — 複数候補アイテム条件
    // 捕捉グループ1 = [XXX] リスト部分のみ（共に装備時より後の [リフレッシュ] 等を除外するため）
    const iSections = [...normalized.matchAll(/((?:\[[^\]]+\][\s、\n]*)+)\s*の\s*いずれかと[\s\S]*?共に装備時/g)];
    const names2 = [];
    for (const im of iSections) {
        for (const bm of im[1].matchAll(/\[([^\]]+)\]/g)) names2.push(bm[1]);
    }
    return [...new Set([...matches1.map(m => m[1]), ...names2])];
}

/**
 * synergy_text が全てセット条件付き（「[XXX]と共に装備時」）かどうかを判定。
 * 独立した無条件効果がない場合は true を返す。
 * → スコア計算でウェイトを削減し、パートナー装備なしでは得られないセット効果による
 *    過大評価（ディアボロスウィング等）を防ぐ。
 */
function isAllSetConditionSynergy(synergyText) {
    if (!synergyText) return false;
    // セット条件（[XXX]と共に装備時）・精錬条件（[XXX]の精錬値が）・スキル条件（[XXX]の習得Lvが）
    // の全セクションを除去した後の残りテキストが短い場合 → 全て条件付きとみなしてウェイトを削減。
    // 「[A]、 [B]と共に装備時」のように複数装備をカンマ区切りで並べた後に条件が来る形式にも対応:
    //   先に「[XXX][、 ]*」形式のプレフィックスを除去してから条件セクションを除去する。
    const stripped = synergyText
        // 複数アイテムのカンマ区切りプレフィックス: 「[A]、 [B]と共に装備時」の先頭 [A]、 部分を除去
        .replace(/(?:\[[^\]]+\][、,\s]*)+(?=\[[^\]]+\](?:と\s*共に装備時|の\s*精錬値|の\s*習得Lv))/g, '')
        .replace(/\[[^\]]+\]と\s*共に装備時[\s\S]*?(?=\[[^\]]+\](?:と\s*共に装備時|の\s*精錬値|の\s*習得Lv)|$)/g, '')
        .replace(/\[[^\]]+\]の\s*精錬値[\s\S]*?(?=\[[^\]]+\](?:と\s*共に装備時|の\s*精錬値|の\s*習得Lv)|$)/g, '')
        .replace(/\[[^\]]+\]の\s*習得Lv[\s\S]*?(?=\[[^\]]+\](?:と\s*共に装備時|の\s*精錬値|の\s*習得Lv)|$)/g, '')
        .replace(/[\s\d%+\-,.、。=:()【】]/g, '')
        .trim();
    return stripped.length < 10;
}

/**
 * description から「要求レベル : X」を抽出して返す。
 * 高要求レベルアイテムは高ティアであることが多いため、スコアボーナスに使用。
 * @param {string} description
 * @returns {number} 要求レベル。見つからなければ 0
 */
function parseRequiredLevel(description) {
    if (!description) return 0;
    const m = description.match(/要求レベル\s*[：:]\s*(\d+)/);
    return m ? parseInt(m[1]) : 0;
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
    if (equip.includes("下段")) return "OBJID_HEAD_UNDER";
    if (equip.includes("中段")) return "OBJID_HEAD_MID";
    if (equip.includes("上段") || equip.includes("兜")) return "OBJID_HEAD_TOP";
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

/**
 * items全体から指定スロット向けカードをスコア順で1件返す（スロット別カード最終フォールバック）。
 * RAG候補に存在しないスロットを持つカードを行道検索する。
 */
function searchCardsForSlotFromItems(targetObjId, jobKeywords, excludeNames) {
    const qGrams = toBigrams(jobKeywords || "Matk INT 魔法攻撃");
    let bestScore = MIN_CARD_SCORE;  // itemsディープ検索も通常のカードと同じ閾値を適用
    let best = null;
    for (const it of items) {
        if (it.type !== "カード" || it.is_enchant) continue;
        if (excludeNames.has(it.displayname)) continue;
        const equip = getCardEquipObjId(it.description || "");
        if (equip !== targetObjId && equip !== "__ALL__") continue;
        // カードはセット条件テキストに核心の効果が含まれるためフルテキストで評価する
        const tGrams = toBigrams(`${it.displayname} ${it.description || ""}`);
        let overlap = 0;
        for (const g of qGrams) if (tGrams.has(g)) overlap++;
        const score = qGrams.size ? overlap / qGrams.size : 0;
        if (score > bestScore) {
            bestScore = score;
            best = { score, contentScore: score, item: it };
        }
    }
    return best;
}

/** シナジーペアインデックスを遅延構築する（items 読み込み後に初回呼び出し時に実行）。 */
function ensureSynergyIndex() {
    if (synergyPairIndex) return;
    synergyPairIndex = new Map();
    for (const it of items) {
        const partners = extractSynergyPartnerNames(it.synergy_text || it.description || "");
        if (partners.length > 0) synergyPairIndex.set(it.displayname, partners);
    }
    aiLog(`[シナジーインデックス] ${synergyPairIndex.size} アイテムのシナジーペアを構築`);
}

/**
 * synergy_text を「と共に装備時」で句に分割し、各句の[アイテム名]参照とネガティブ判定を返す。
 * ネガティブ判定: 句の効果部分に「発動しない」「無効」等の否定語が含まれる場合。
 * @param {string} synText
 * @returns {Array<{names: string[], isNegative: boolean}>}
 */
function parseEnchantRefClauses(synText) {
    if (!synText) return [];
    const NEG_PAT = /発動しない|無効|得られない|発動しなくなる/;
    const parts = synText.split(/と\s*共に\s*装備\s*時/);
    const clauses = [];
    for (let i = 0; i < parts.length - 1; i++) {
        const names = (parts[i].match(/\[([^\]]+)\]/g) || []).map(m => m.slice(1, -1));
        if (names.length === 0) continue;
        const effectSnip = (parts[i + 1] || "").slice(0, 150);
        const isNegative = NEG_PAT.test(effectSnip);
        clauses.push({ names, isNegative });
    }
    return clauses;
}

/**
 * 3段シナジーインデックスを構築する。
 * - cardToEnchantIndex: カードの synergy_text に[E]と共に装備時が含まれるエンチャントEのインデックス
 * - enchantToCardIndex: 逆引き
 * - enchantEquipSynergyIndex: 装備の synergy_text がポジティブに[E]を参照するエンチャントEの逆引き
 * - enchantEquipConflictIndex: 装備の synergy_text がネガティブに[E]を参照する（発動しない等）逆引き
 */
function buildSynergyChainIndexes() {
    if (cardToEnchantIndex) return;
    const enchantNameSet = new Set(items.filter(x => x.is_enchant).map(x => x.displayname));
    cardToEnchantIndex       = new Map();
    enchantToCardIndex       = new Map();
    enchantEquipSynergyIndex = new Map();
    enchantEquipConflictIndex = new Map();
    for (const it of items) {
        if (it.type === "カード" && !it.is_enchant) {
            const syn = it.synergy_text || it.description || "";
            const partners = extractSynergyPartnerNames(syn);
            const enchPartners = partners.filter(p => enchantNameSet.has(p));
            if (enchPartners.length > 0) {
                cardToEnchantIndex.set(it.displayname, enchPartners);
                for (const ep of enchPartners) {
                    if (!enchantToCardIndex.has(ep)) enchantToCardIndex.set(ep, []);
                    enchantToCardIndex.get(ep).push(it.displayname);
                }
            }
        } else if (!it.is_enchant && it.type !== "カード" && EQUIP_SLOT_TYPES.has(it.type)) {
            const syn = it.synergy_text || "";
            if (!syn) continue;
            const clauses = parseEnchantRefClauses(syn);
            for (const clause of clauses) {
                for (const p of clause.names) {
                    if (!enchantNameSet.has(p)) continue;
                    if (clause.isNegative) {
                        // ネガティブ: 発動しない等 → conflictIndexへ
                        if (!enchantEquipConflictIndex.has(p)) enchantEquipConflictIndex.set(p, []);
                        if (!enchantEquipConflictIndex.get(p).some(e => e.displayname === it.displayname))
                            enchantEquipConflictIndex.get(p).push(it);
                    } else {
                        // ポジティブ: 追加効果あり → synergyIndexへ
                        if (!enchantEquipSynergyIndex.has(p)) enchantEquipSynergyIndex.set(p, []);
                        if (!enchantEquipSynergyIndex.get(p).some(e => e.displayname === it.displayname))
                            enchantEquipSynergyIndex.get(p).push(it);
                    }
                }
            }
        }
    }
    aiLog(`[3段インデックス] カード→エンチャント:${cardToEnchantIndex.size}件, エンチャント→装備シナジー(ポジ):${enchantEquipSynergyIndex.size}件, コンフリクト:${enchantEquipConflictIndex.size}件`);
}

/**
 * 選択済みカードとエンチャントのチェーンを検査し、どちらかのぴの片方が欠けている場合にカバーする装備を提案する。
 * @param {Array} finalCards        - 選択済みカード
 * @param {Array} enchantResults   - 選択済みエンチャント
 * @param {Array} equipResults     - 提案局装備（冊書済み）
 * @param {string|null} allowedJobName
 * @param {number|null} budget
 * @returns {Array} 新たに追加する装備候補の配列
 */
function completeSynergyChains(finalCards, enchantResults, equipResults, allowedJobName, budget) {
    buildSynergyChainIndexes();
    const cardNames    = new Set(finalCards.map(r => r.item.displayname));
    const enchantNames = new Set(enchantResults.map(r => r.item.displayname));
    const equipNames   = new Set(equipResults.map(r => r.item.displayname));
    const equipSlots   = new Map(equipResults.map(r => [slotGroup(r.item.type||"", r.item.position), r]));
    const added = [];
    const addedNames = new Set();

    // 1. エンチャント → 装備シナジー補完（2段・3段両対応）
    // カードなしの2段シナジー（例: 王家の栄光(エンチャント)→アーリースカイ(靴)）も補完する。
    for (const [enchName, equipList] of enchantEquipSynergyIndex) {
        if (!enchantNames.has(enchName)) continue; // エンチャントが提案されていない
        const chainCards = (enchantToCardIndex.get(enchName) || []).filter(cn => cardNames.has(cn));
        // chainCards.length === 0 でも「エンチャント→装備」2段シナジー補完を行う
        // 装備がビルド内にあるか確認
        const inBuild = equipList.filter(eq => equipNames.has(eq.displayname));
        if (inBuild.length > 0) {
            if (chainCards.length > 0) aiLog(`[チェーン完成✓] ${chainCards.join(",")} + ${enchName} + ${inBuild[0].displayname}`);
            else aiLog(`[2段シナジー完成✓] ${enchName} + ${inBuild[0].displayname}`);
            continue;
        }
        // 装備が欠けている → 最適候補を提案
        const candidates = equipList.filter(eq => {
            if (addedNames.has(eq.displayname)) return false;
            if (eq.jobs && eq.jobs.length > 0 && !eq.jobs.includes("全ての職業")
                && !(allowedJobName && eq.jobs.includes(allowedJobName))) return false;
            if (budget !== null && eq.price && eq.price > budget) return false;
            return true;
        });
        if (candidates.length === 0) {
            if (chainCards.length > 0) aiLog(`[チェーン未完] ${chainCards.join(",")} + ${enchName} → 装備候補なし`);
            continue;
        }
        const best = candidates[0];
        const slot = slotGroup(best.type||"", best.position);
        const occupant = equipSlots.get(slot);
        if (occupant) {
            // スロット済占有: 占有者に別シナジーがない場合のみ置換
            const occPartners = extractSynergyPartnerNames(
                occupant.item.synergy_text || occupant.item.description || ""
            );
            const hasActiveSyn = occPartners.some(p => enchantNames.has(p) || cardNames.has(p) || equipNames.has(p));
            if (!hasActiveSyn) {
                // 占有者スコアが高い装備はチェーン補完による置換を抑制（Fix C）
                // フォールバック補填(score≈MIN_FALLBACK_CONTENT_SCORE≈0.10)のみ置換対象。
                // ティルナノーグ(score≈2.20)・セレスティアルブーツ(score≈1.36)等は置換しない。
                const CHAIN_REPLACE_MAX_SCORE = 0.50;
                // Fix IDR: 占有者の contentScore が高い場合（RAG で高関連性と評価された装備）も置換を抑制。
                // 例: IDR(contentScore≈0.23)がRAGで選ばれた後にアルカナ+プレミアメロンヘッドフォンの
                // シナジーで置き換えられる問題を修正。
                // リーブラオブジャッジメント等のフォールバック補填アイテムは、長いスキル名込みクエリで
                // contentScoreが低く計算される（0.11程度）ため、閾値を MIN_FALLBACK_CONTENT_SCORE(0.10) と
                // 同じ 0.10 に設定して「フォールバック最低基準を満たす装備は置換しない」とする。
                const CHAIN_REPLACE_MAX_CONTENT_SCORE = 0.10;
                const occContentScore = occupant.contentScore ?? 0;
                if (occupant.score > CHAIN_REPLACE_MAX_SCORE) {
                    aiLog(`[チェーンスキップ] ${slot}: ${occupant.item.displayname}(score=${occupant.score.toFixed(2)})は高スコア装備のため置換抑制（${enchName}チェーン）`);
                } else if (occContentScore >= CHAIN_REPLACE_MAX_CONTENT_SCORE) {
                    aiLog(`[チェーンスキップ] ${slot}: ${occupant.item.displayname}(contentScore=${occContentScore.toFixed(2)})は高contentScore装備のため置換抑制（${enchName}チェーン）`)
                } else {
                    const synScore = 0.35;
                    const entry = { score: synScore, contentScore: synScore, item: best };
                    added.push(entry);
                    addedNames.add(best.displayname);
                    equipSlots.set(slot, entry);
                    aiLog(`[チェーン補完] ${slot}: ${occupant.item.displayname} → ${best.displayname}（${chainCards.join(",")}+${enchName}ペア完成）`);
                }
            } else {
                aiLog(`[チェーンスキップ] ${slot}: ${occupant.item.displayname}は別シナジー有効、${best.displayname}と置換不可`);
            }
        } else {
            // スロット空き → 直接追加
            const synScore = 0.35;
            const entry = { score: synScore, contentScore: synScore, item: best };
            added.push(entry);
            addedNames.add(best.displayname);
            equipSlots.set(slot, entry);
            aiLog(`[チェーン補完] ${slot}に ${best.displayname} 追加（${chainCards.join(",")}+${enchName}ペア）`);
        }
    }
    return added;
}

/**
 * ジョブキーワードに対してスコアが高いカード↔エンチャントシナジーペアを top-N 返す。
 * スコア = (カードスコア + エンチャントスコア) / 2
 * 結果に enchEquips（そのエンチャントを synergy_text で参照する装備リスト）を含む。
 * @param {string} jobKeywords
 * @param {number} topN
 * @param {string|null} allowedJobName
 * @returns {Array<{cardItem, enchItem, score, cardTargetObjId, enchEquips, cardName, enchName}>}
 */
function discoverTopCardEnchantSynergies(jobKeywords, topN = 8, allowedJobName = null) {
    buildSynergyChainIndexes();
    const qGrams = toBigrams(jobKeywords);
    if (!qGrams.size || !cardToEnchantIndex) return [];
    const antiGrams = allowedJobName && JOB_ANTI_KEYWORDS[allowedJobName]
        ? toBigrams(JOB_ANTI_KEYWORDS[allowedJobName]) : null;
    const rawResults = [];
    const activeSynKws = getActiveSynergyKeywords(jobKeywords);
    for (const [cardName, enchNames] of cardToEnchantIndex) {
        const cardItem = itemNameMap.get(cardName);
        if (!cardItem) continue;
        // 封印カードはPhase0候補から除外（非封印版と重複しスロットを無駄遣いするため）
        if (cardItem.displayname.startsWith('封印された')) continue;
        const cardText = `${cardItem.displayname} ${cardItem.description || ""}`;
        const cardGrams = toBigrams(cardText);
        let cardOverlap = 0;
        for (const g of qGrams) if (cardGrams.has(g)) cardOverlap++;
        const cardScore = cardOverlap / qGrams.size;
        if (cardScore <= 0) continue;
        for (const enchName of enchNames) {
            const enchItem = itemNameMap.get(enchName);
            if (!enchItem || !enchItem.is_enchant) continue;
            // スキルオーブ / 潜在覚醒 / 潜在解放はジョブ一致チェック
            if (enchItem.displayname.startsWith('スキルオーブ(') && allowedJobName
                && !enchItem.displayname.includes(allowedJobName)) continue;
            if (enchItem.displayname.startsWith('潜在覚醒(') && allowedJobName
                && JOB_STAT_KEYWORDS[allowedJobName]) {
                const mSkill = enchItem.displayname.match(/^潜在覚醒\(([^)]+)\)/);
                if (mSkill && !JOB_STAT_KEYWORDS[allowedJobName].includes(mSkill[1])) continue;
            }
            // 潜在解放(ジョブ名I~XX): ジョブ名先頭マッチで他ジョブのものを除外
            if (enchItem.displayname.startsWith('潜在解放(') && allowedJobName) {
                const mPr = enchItem.displayname.match(/^潜在解放\((.+)\)$/);
                if (mPr) {
                    const inner = mPr[1];
                    const knownJobs = Object.keys(JOB_STAT_KEYWORDS);
                    const matchedJob = knownJobs.find(j => inner.startsWith(j));
                    if (!matchedJob || matchedJob !== allowedJobName) continue;
                }
            }
            // 他ジョブ専用スキル強化エンチャント除外: description 先頭の [スキル名]の 詠唱時間/ディレイ/消費SP
            // 例: 治癒1=[ハイネスヒール]の詠唱時間-100% はEMには不要
            if (allowedJobName && JOB_STAT_KEYWORDS[allowedJobName]) {
                const mSkDes = (enchItem.description || '').match(/^\[([^\]]+)\]の\s*(?:詠唱時間|再使用待機時間|消費SP)/);
                if (mSkDes && !JOB_STAT_KEYWORDS[allowedJobName].includes(mSkDes[1])) continue;
            }
            let enchText = `${enchItem.displayname} ${enchItem.description || ""}`;
            if (enchItem.injection_name?.suffix) enchText += ` ${enchItem.injection_name.suffix}`;
            const enchGrams = toBigrams(enchText);
            let enchOverlap = 0;
            for (const g of qGrams) if (enchGrams.has(g)) enchOverlap++;
            const enchScore = enchOverlap / qGrams.size;
            // anti-keyword ペナルティ
            // カードスコアが高い（≥0.3）場合はスキップ: 関連カードが明示するシナジーエンチャントは
            // 「物理・魔法攻撃」等の混在テキストで不当に除外されないようにする（王家の栄光等）
            if (antiGrams && antiGrams.size && cardScore < 0.3) {
                let antiHit = 0;
                for (const g of antiGrams) if (enchGrams.has(g)) antiHit++;
                if (antiHit / antiGrams.size > 0.08) continue;
            }
            const combined = (cardScore + enchScore) / 2;
            // シナジーキーワードボーナス: 既知のセット効果名・シナジー効果名を含む場合に加算
            let kwBonus = 0;
            const synKwText = cardText + " " + enchText;
            for (const kw of activeSynKws) {
                if (synKwText.includes(kw)) kwBonus += SYNERGY_KW_BONUS;
            }
            const finalScore = combined + kwBonus;
            // 閾値: キーワードボーナスなし → 0.12、あり → 0.03（低関係ペアの完全除外は維持）
            if (finalScore < 0.12 && (kwBonus === 0 || combined < 0.03)) continue;
            const cardTargetObjId = getCardEquipObjId(cardItem.description || "");
            const enchEquips = enchantEquipSynergyIndex
                ? (enchantEquipSynergyIndex.get(enchName) || []) : [];
            rawResults.push({ cardItem, enchItem, score: finalScore,
                cardTargetObjId, enchEquips, cardName, enchName });
        }
    }
    rawResults.sort((a, b) => b.score - a.score);
    const top = rawResults.slice(0, topN);

    // 装備ごとに「何件のtopペアとシナジーを持つか」をカウント → enchEquips に multiSynergyCount を付加
    const equipSynCount = new Map(); // equipName → count
    for (const syn of top) {
        for (const eq of syn.enchEquips) {
            equipSynCount.set(eq.displayname, (equipSynCount.get(eq.displayname) || 0) + 1);
        }
    }
    // enchEquips をマルチシナジーカウント降順でソートして返す
    for (const syn of top) {
        syn.enchEquips = syn.enchEquips
            .map(eq => ({ eq, cnt: equipSynCount.get(eq.displayname) || 1 }))
            .sort((a, b) => b.cnt - a.cnt)
            .map(x => x.eq);
        syn.equipSynCount = equipSynCount; // 注入スコア計算用に共有
    }
    return top;
}

/**
 * ジョブ向けの相互シナジーセット（装備ペア）をスコア降順でtop-N返す。
 * スコア = 両アイテムのシナジーテキストとジョブキーワードのバイグラム一致度の合計。
 * @param {string} jobKeywords - JOB_STAT_KEYWORDS[jobName]
 * @param {number} topN
 * @param {string|null} allowedJobName
 * @returns {Array<{itemA, itemB, score, slotA, slotB}>}
 */
function discoverTopSynergySetsForJob(jobKeywords, topN = 10, allowedJobName = null) {
    ensureSynergyIndex();
    const qGrams = toBigrams(jobKeywords);
    const seenPairs = new Set();
    const results = [];
    const activeSynKws = getActiveSynergyKeywords(jobKeywords);
    for (const [nameA, partnersA] of synergyPairIndex) {
        const itemA = itemNameMap.get(nameA);
        if (!itemA || !EQUIP_SLOT_TYPES.has(itemA.type) || itemA.type === "カード") continue;
        if (allowedJobName && itemA.jobs && itemA.jobs.length > 0
            && !itemA.jobs.includes("全ての職業")
            && !itemA.jobs.some(j => j.endsWith("系") || j.includes("を除く全ての職業"))
            && !itemA.jobs.includes(allowedJobName)) continue;
        for (const nameB of partnersA) {
            const itemB = itemNameMap.get(nameB);
            if (!itemB || !EQUIP_SLOT_TYPES.has(itemB.type) || itemB.type === "カード") continue;
            const slotA = slotGroup(itemA.type, itemA.position);
            const slotB = slotGroup(itemB.type, itemB.position);
            if (slotA === slotB) continue; // 同スロットペアは作れない
            const pairKey = [nameA, nameB].sort().join("|");
            if (seenPairs.has(pairKey)) continue;
            seenPairs.add(pairKey);
            const synA = itemA.synergy_text || extractSynergyTextStrict(itemA.description || "");
            const synB = itemB.synergy_text || extractSynergyTextStrict(itemB.description || "");
            const sGramsA = synA ? toBigrams(synA) : new Set();
            const sGramsB = synB ? toBigrams(synB) : new Set();
            let scoreA = 0, scoreB = 0;
            for (const g of qGrams) {
                if (sGramsA.has(g)) scoreA++;
                if (sGramsB.has(g)) scoreB++;
            }
            const combined = qGrams.size ? (scoreA + scoreB) / (qGrams.size * 2) : 0;
            // シナジーキーワードボーナス: ペアの synergy_text に既知のキーワードが含まれる場合に加算
            let kwBonusPair = 0;
            const synTextPair = `${synA || ""} ${synB || ""}`;
            for (const kw of activeSynKws) {
                if (synTextPair.includes(kw)) kwBonusPair += SYNERGY_KW_BONUS;
            }
            const finalScorePair = combined + kwBonusPair;
            if (finalScorePair >= 0.04) results.push({ itemA, itemB, score: finalScorePair, slotA, slotB });
        }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topN);
}

/**
 * 提案装備スロット別に最適なカードを1枚ずつ選択する。
 * LLM/RAGフィルタ済みの「品質プール」を優先し、カバーできないスロットはfullCardPoolで補填。
 * @param {Array} qualityCards  - LLM/RAGフィルタ済みカード（品質優先候補）
 * @param {Array} fullCardPool  - 全カード候補（スロット補填用フォールバック）
 * @param {Array} selectedEquip - 提案装備リスト（どのスロットが使われるか）
 * @param {string[]} allEquippedNames - 既装備名＋提案装備名（シナジーボーナス計算用）
 * @returns {Array} スロット別に選んだカードの配列（重複なし）
 */
function selectBestCardsPerSlot(qualityCards, fullCardPool, selectedEquip, allEquippedNames, jobKeywords, proposedEnchantNames = null) {
    // 提案装備スロット → OBJID の列挙（重複なし・順序保持）
    const appliedObjIds = [];
    const usedObjIds = new Set();
    let accIdx = 0;
    const accObjIds = ["OBJID_ACCESSORY_1", "OBJID_ACCESSORY_2"];
    for (const r of selectedEquip) {
        let objId = null;
        if (r.item.type === "アクセサリー(1)") objId = "OBJID_ACCESSORY_1";
        else if (r.item.type === "アクセサリー(2)") objId = "OBJID_ACCESSORY_2";
        else if (ACCESSORY_TYPES.has(r.item.type)) {
            // 汎用アクセサリー: 空きスロットを順番に使用
            while (accIdx < accObjIds.length && usedObjIds.has(accObjIds[accIdx])) accIdx++;
            if (accIdx < accObjIds.length) objId = accObjIds[accIdx++];
        } else {
            const slot = slotGroup(r.item.type || "", r.item.position);
            objId = SLOT_TO_OBJID[slot] || null;
        }
        if (objId && !usedObjIds.has(objId)) {
            appliedObjIds.push(objId);
            usedObjIds.add(objId);
        }
    }
    if (appliedObjIds.length === 0) return qualityCards.slice(); // スロット不明はそのまま返す

    // 全提案・既装備名のバイグラム（シナジーボーナス計算用）
    const allEquipGrams = allEquippedNames.length ? toBigrams(allEquippedNames.join(" ")) : null;

    function scoreCardForSlot(r) {
        let s = r.score;
        if (allEquipGrams && allEquipGrams.size) {
            const synText = extractSynergyTextStrict(r.item.description || "");
            if (synText) {
                const synGrams = toBigrams(synText);
                let overlap = 0;
                for (const g of allEquipGrams) if (synGrams.has(g)) overlap++;
                if (overlap > 0) s += (overlap / allEquipGrams.size) * SYNERGY_WEIGHT;
            }
        }
        // エンチャント→カードチェーンボーナス:
        // 提案エンチャントのいずれかが「[this card]と共に装備時」のシナジーを持つ → 大幅ブース
        if (proposedEnchantNames && proposedEnchantNames.size) {
            buildSynergyChainIndexes();
            const enchPartners = cardToEnchantIndex ? (cardToEnchantIndex.get(r.item.displayname) || []) : [];
            const matched = enchPartners.filter(ep => proposedEnchantNames.has(ep));
            if (matched.length > 0) {
                s += matched.length * SYNERGY_WEIGHT;
                aiLog(`[エンチャント→カードチェーン] ${r.item.displayname} +${(matched.length*SYNERGY_WEIGHT).toFixed(2)} (ペア: ${matched.join(", ")})`);
            }
        }
        return s;
    }

    // カードをターゲットスロット別に分類してスコア降順ソート
    function groupByTargetSlot(cardList) {
        const bySlot = {};
        for (const r of cardList) {
            const targetObjId = getCardEquipObjId(r.item.description || "");
            if (!targetObjId) continue;
            const slotScore = scoreCardForSlot(r);
            if (targetObjId === "__ALL__") {
                for (const objId of appliedObjIds) {
                    if (!bySlot[objId]) bySlot[objId] = [];
                    bySlot[objId].push({ ...r, slotScore });
                }
            } else {
                if (!bySlot[targetObjId]) bySlot[targetObjId] = [];
                bySlot[targetObjId].push({ ...r, slotScore });
            }
        }
        for (const objId of Object.keys(bySlot)) {
            bySlot[objId].sort((a, b) => b.slotScore - a.slotScore);
        }
        return bySlot;
    }

    const qualityBySlot = groupByTargetSlot(qualityCards);
    const fullBySlot    = groupByTargetSlot(fullCardPool);

    const selected = [];
    const selectedNames = new Set();

    for (const objId of appliedObjIds) {
        // 1. 品質プール（LLM/RAGフィルタ済み）から最良カードを選択
        const qCands = (qualityBySlot[objId] || []).filter(r => !selectedNames.has(r.item.displayname));
        if (qCands.length > 0) {
            selected.push(qCands[0]);
            selectedNames.add(qCands[0].item.displayname);
            aiLog(`[スロット別カード] ${objId} ← ${qCands[0].item.displayname} (品質プール, slotScore=${qCands[0].slotScore.toFixed(3)})`);
        } else {
            // 2. フォールバック: 全候補プールから補填
            const fCands = (fullBySlot[objId] || []).filter(r => !selectedNames.has(r.item.displayname));
            if (fCands.length > 0) {
                selected.push(fCands[0]);
                selectedNames.add(fCands[0].item.displayname);
                aiLog(`[スロット別カード] ${objId} ← ${fCands[0].item.displayname} (RAGフォールバック, slotScore=${fCands[0].slotScore.toFixed(3)})`);
            } else {
                // フォールバックなし: 品質プール・全候補プールにもカードがない場合はそのスロットを空白にする。
                // items全体からのディープ検索はゲームUI上で「エンチャント非対応」エラーになるカードを
                // 返す場合があるため（装備種別の制限）廃止。
                aiLog(`[スロット別カード] ${objId}: 候補なし（カードスロット空白）`);
            }
        }
    }
    aiLog(`[スロット別カード選択] ${selected.length}枚 / 装備スロット数=${appliedObjIds.length}`);
    return selected;
}

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

// ジョブ別の主要ステータス・スキル・特性キーワード（「強い」「おすすめ」クエリの拡張用）
// 4次職魔法職: Spl が最重要（INT・Matkも継続重要）
// 4次職物理職: Pow が最重要（STR・Atkも継続重要）
// 3次職以下はそれぞれ INT・Matk / STR・Atk が中心
// カード採点用: スキル名なしの短いstat-keywordsのみ。
// スキル名を含む長いクエリでカードを採点するとbigram分母が増大し、魔法活性系カードがMIN_CARD_SCORE以下になるのを防ぐ。
const JOB_STAT_BASE_KEYWORDS = {
    "エレメンタルマスター": "Spl Matk INT Int SP 属性 詠唱 魔法攻撃 スキルディレイ 詠唱時間 リフレッシュ インスピレーション",
    "アークメイジ":         "Spl Matk INT Int SP 魔法 詠唱 召喚",
    "インペリアルガード":  "Pow Atk STR Str DEX Dex VIT Vit 盾 神聖 槍",
    "ドラゴンナイト":      "Pow Atk STR Str DEX Dex 剣 HP",
    "ウィンドホーク":      "Pow Atk DEX Dex AGI Agi 弓",
    "ナイトウォッチ":       "Pow Atk DEX Dex AGI Agi 銃 射撃",
    "シャドウクロス":       "Pow Atk STR Str AGI Agi DEX Dex 暗黒 短剣",
    "カーディナル":         "Spl Matk INT Int VIT Vit SP 魔法 神聖 回復 詠唱",
    "天帝":                "Spl Matk INT Int SP 魔法 詠唱",
    "インクイジター":       "Pow Atk STR Str DEX Dex VIT Vit 神聖",
    "アビスチェイサー":     "Pow Atk DEX Dex AGI Agi",
    "マイスター":           "Pow Atk STR Str DEX Dex",
    "バイオロ":             "Pow Atk STR Str DEX Dex",
    "スピリットハンドラー": "Pow Atk STR Str AGI Agi DEX Dex",
};

const JOB_STAT_KEYWORDS = {
    // ジョブ固有スキル名を含めることで、そのスキルを強化するカード・装備のスコアが上昇する
    // （例: オーレリー・プティカードはEMスキル名をセット効果に持つためスコアが大幅上昇）
    "エレメンタルマスター": "Spl Matk INT Int SP 属性 詠唱 魔法攻撃 スキルディレイ 詠唱時間 リフレッシュ インスピレーション コンフラグレーション ダイヤモンドストーム ライトニングランド テラドライブ ベナムスワンプ エレメンタルバスター サイキックストリーム アースグレイヴ ヴェラチュールスピアー サイキックウェーブ ダイヤモンドダスト 固定詠唱時間短縮 特性ステータス 豊穣の女神",
    "ウィザード":           "Matk INT Int SP 魔法 詠唱 属性 火 水 風 土",
    "ハイウィザード":        "Matk INT Int SP 魔法 詠唱 属性",
    "ウォーロック":          "Matk INT Int SP 魔法 詠唱",
    "ソーサラー":           "Matk INT Int SP 魔法 詠唱 召喚",
    "アークビショップ":     "Matk INT Int SP 回復 神聖 VIT Vit",
    "修羅":                 "Atk STR Str HP 気功 必殺",
    "ジェネティック":        "Atk STR Str DEX Dex 調薬 植物",
    "ルーンナイト":        "Atk STR Str DEX Dex 剣 精鍜 ルーン HP",
    "インペリアルガード":  "Pow Atk STR Str DEX Dex VIT Vit 盾 神聖 槍 インペリアルクロス インペリアルプレッシャー グランドジャッジメント シールドシューティング レイディアントスピア オーバースラッシュ",
    "ドラゴンナイト":      "Pow Atk STR Str DEX Dex 剣 精鍜 HP ドラゴニックオーラ ドラゴニックピアース ドラゴニックブレス ストームスラッシュ マッドネスクラッシャー",
    "ギロチンクロス":      "Atk STR Str DEX Dex AGI Agi 暗黒 短剣 毒",
    "レンジャー":           "Atk DEX Dex AGI Agi 弓",
    "ウィンドホーク":      "Pow Atk DEX Dex AGI Agi 弓 ゲイルストーム ホークブーメラン クレッシブボルト ホークラッシュ",
    "シャドウチェイサー":   "Atk DEX Dex AGI Agi 暗黒 コピー",
    "トルヴェール":         "Pow Atk DEX Dex AGI Agi 楽器 歌",
    "トルバドゥール":       "Pow Atk DEX Dex AGI Agi 楽器 歌",
    "ナイトウォッチ":       "Pow Atk DEX Dex AGI Agi 銃 射撃 ワイルドショット ワイルドファイア スパイラルシューティング オンリーワンバレット",
    "蜃気楼":              "Pow Atk DEX Dex AGI Agi 忍術",
    "不知火":              "Pow Atk DEX Dex AGI Agi 忍術",
    "アークメイジ":         "Spl Matk INT Int SP 魔法 詠唱 召喚 フローラルフレアロード クリムゾンアロー レインオブクリスタル フローズンスラッシュ トルネードストーム ストームキャノン アストラルストライク ソウルバルカンストライク",
    // 以下: 未定義だった4次職を追加
    "シャドウクロス":       "Pow Atk STR Str AGI Agi DEX Dex 暗黒 短剣 クリティカル ダークイリュージョン ダーククロー ダンシングナイフ シャドウスタブ エターナルスラッシュ フェイタルシャドウクロー クロススラッシュ インパクトクレーター サベージインパクト",
    // カーディナル: 神聖魔法/支援がメイン。物理ビルドも存在するが一般的ではないため魔法/支援系キーワードを採用
    "カーディナル":         "Spl Matk INT Int VIT Vit SP 魔法 神聖 回復 詠唱 オラティオ アルビトリウム ニューマティックプロセラ フレーメン ディヴィヌスフロス ペティティオ エフィリゴ",
    "天帝":                "Spl Matk INT Int SP 魔法 詠唱 太陽 月 星 太陽の温もり 月の温もり 星の温もり 天地一陽 天陽 天地一月 天月 天羅万象",
    "インクイジター":       "Pow Atk STR Str DEX Dex VIT Vit 神聖 盾 槍 潜龍昇天 第二撃 第三撃",
    "アビスチェイサー":     "Pow Atk DEX Dex AGI Agi 暗黒 コピー オートシャドウスペル アビス球体攻撃 アビススクエア オメガアビスストライク アビスフレイム",
    "マイスター":           "Pow Atk STR Str DEX Dex アックストルネード アックスストンプ マイティスマッシュ ラッシュクエイク ラッシュストライク パワフルスイング",
    "バイオロ":             "Pow Atk STR Str DEX Dex 植物 調薬 クレイジーウィード デモニックファイアー カートトルネード メイヘミックソーンズ",
    "スピリットハンドラー": "Pow Atk STR Str AGI Agi DEX Dex タイガースラッシュ タイガーハウリング タイガーストライク タイガーバトリング タロウの傷 群れの力",
};

// ジョブ別「職業適性の低いステータス・スキルキーワード」。
// エンチャントの説明文にこれらが含まれる場合、スコアにペナルティを与えて不適切な提案を抑制する。
// 魔法職: Pow（4次職物理専用）や物理攻撃系キーワードにペナルティ
// 物理職: Spl（4次職魔法専用）や魔法攻撃系キーワードにペナルティ

// ジョブが属するクラスタグ（「XXX系が装備時」条件の装備スロットへのカード提案時に使用）。
// エンチャント/カード説明文中の「XXX系が装備時」がそのジョブに適用されるかを判定する。
// 例: サーペンタリウス「サモナー系が装備時 詠唱時間 - 1%」→ EM はサモナー系でないので除外対象。
const JOB_CLASS_TAGS = {
    "エレメンタルマスター": new Set(["エレメンタルマスター", "ソーサラー", "魔法", "4次職", "拡張4次職", "全て"]),
    "アークメイジ":         new Set(["アークメイジ", "ウィザード", "ハイウィザード", "魔法", "4次職", "拡張4次職", "全て"]),
    "ウォーロック":          new Set(["ウォーロック", "ウィザード", "ハイウィザード", "魔法", "4次職", "拡張4次職", "全て"]),
    "ソーサラー":           new Set(["ソーサラー", "ウィザード", "魔法", "3次職", "全て"]),
    "修羅":                 new Set(["修羅", "インクイジター", "物理", "4次職", "拡張4次職", "全て"]),
    "ルーンナイト":          new Set(["ルーンナイト", "ナイト", "剣", "物理", "4次職", "拡張4次職", "全て"]),
    "ドラゴンナイト":        new Set(["ドラゴンナイト", "ナイト", "剣", "物理", "4次職", "拡張4次職", "全て"]),
    "ギロチンクロス":        new Set(["ギロチンクロス", "アサシン", "暗黒", "物理", "4次職", "拡張4次職", "全て"]),
    "レンジャー":            new Set(["レンジャー", "ハンター", "弓", "物理", "4次職", "拡張4次職", "全て"]),
    "ウィンドホーク":        new Set(["ウィンドホーク", "ハンター", "弓", "物理", "4次職", "拡張4次職", "全て"]),
    "シャドウチェイサー":    new Set(["シャドウチェイサー", "チェイサー", "物理", "4次職", "拡張4次職", "全て"]),
    "シャドウクロス":        new Set(["シャドウクロス", "ギロチンクロス", "アサシン", "暗黒", "物理", "4次職", "拡張4次職", "全て"]),
    "カーディナル":          new Set(["カーディナル", "アークビショップ", "プリースト", "神聖", "魔法", "4次職", "拡張4次職", "全て"]),
    "天帝":                  new Set(["天帝", "星帝", "魔法", "4次職", "拡張4次職", "全て"]),
    "インクイジター":         new Set(["インクイジター", "インペリアルガード", "ロイヤルガード", "神聖", "物理", "4次職", "拡張4次職", "全て"]),
    "アビスチェイサー":       new Set(["アビスチェイサー", "シャドウチェイサー", "チェイサー", "物理", "4次職", "拡張4次職", "全て"]),
    "マイスター":             new Set(["マイスター", "メカニック", "物理", "4次職", "拡張4次職", "全て"]),
    "バイオロ":               new Set(["バイオロ", "ジェネティック", "物理", "4次職", "拡張4次職", "全て"]),
    "スピリットハンドラー":   new Set(["スピリットハンドラー", "ソウルリンカー", "サモナー", "物理", "4次職", "拡張4次職", "全て"]),
};

const JOB_ANTI_KEYWORDS = {
    // 注意: "Atk" はスペース区切りのbigramが "BaseLvが2上がる度にAtk+1,Matk+1" 等を持つ汎用カード
    //       (オーレリー・プティカード等) に偽陽性でマッチするため削除。
    //       また displayname の "プティカード" が "クリティカル" のbigram "ティ""ィカ" にマッチする偽陽性を防ぐため
    //       anti-keywordチェックは description のnon-set textのみを使用（displayname除外）。
    // toBigrams() は大文字小文字をそのまま扱うため、"STR" と "Str" は別bigramになる。
    // ゲーム内descriptionは "純粋なStrが..." のように先頭大文字が混在するため両方を記載する。
    "エレメンタルマスター": "Pow STR Str AGI Agi 物理攻撃 近接 クリティカル 黒武器 投擲 射撃",
    "ウィザード":           "Pow STR Str AGI Agi 物理攻撃 近接 クリティカル",
    "ハイウィザード":        "Pow STR Str AGI Agi 物理攻撃 近接 クリティカル",
    "ウォーロック":          "Pow STR Str AGI Agi 物理攻撃 近接",
    "ソーサラー":           "Pow STR Str AGI Agi 物理攻撃 近接",
    "アークビショップ":     "Pow STR Str 物理攻撃 近接",
    "修羅":             "Spl Matk INT Int SP 魔法 詠唱",
    "ジェネティック":        "Spl Matk INT Int SP 魔法",
    "ルーンナイト":        "Spl Matk INT Int SP 魔法 詠唱",
    "インペリアルガード":  "Spl Matk INT Int SP 魔法 詠唱",
    "ドラゴンナイト":      "Spl Matk INT Int SP 魔法 詠唱",
    "ギロチンクロス":      "Spl Matk INT Int SP 魔法 詠唱",
    "レンジャー":           "Spl Matk INT Int SP 魔法 詠唱",
    "ウィンドホーク":      "Spl Matk INT Int SP 魔法 詠唱 盾",
    "シャドウチェイサー":   "Spl Matk INT Int SP 魔法 詠唱",
    "トルヴェール":         "Spl Matk INT Int SP 魔法 詠唱",
    "トルバドゥール":       "Spl Matk INT Int SP 魔法 詠唱",
    "ナイトウォッチ":       "Spl Matk INT Int SP 魔法 詠唱",
    "蜃気楼":              "Spl Matk INT Int SP 魔法 詠唱",
    "不知火":              "Spl Matk INT Int SP 魔法 詠唱",
    "アークメイジ":         "Pow STR Str AGI Agi 物理攻撃 近接 盾",
    "シャドウクロス":       "Spl Matk INT Int SP 魔法 詠唱",
    // カーディナルは物理ビルドも存在するため Pow/STR は除外しない（魔法特化のみペナルティ対象外）
    "カーディナル":         "Pow STR Str 物理攻撃 近接",
    "天帝":                "Pow STR Str AGI Agi DEX Dex 物理攻撃 近接",
    "インクイジター":       "Spl Matk INT Int SP 魔法 詠唱",
    "アビスチェイサー":     "Spl Matk INT Int SP 魔法",
    "マイスター":           "Spl Matk INT Int SP 魔法 詠唱",
    "バイオロ":             "Spl INT Int SP 魔法 詠唱",
    "スピリットハンドラー": "Spl Matk INT Int SP 魔法 詠唱",
};

/**
 * 指定スロットにマッチするアイテムをスロット固有クエリで検索して1件返す（フォールバック用）。
 * ジョブフィルタ・予算フィルタも適用する。
 */
function searchFallbackForSlot(slot, jobName, budget, excludeNames = null, selectedItemNames = "", excludeTypes = null, minReqLevel = 0) {
    const kwBase = SLOT_FALLBACK_KEYWORDS[slot] || slot;
    // ジョブ固有ステータスキーワードもフォールバッククエリに加えて、ジョブ向きの強い装備を優先する
    const kwStat = (jobName && JOB_STAT_KEYWORDS[jobName]) ? JOB_STAT_KEYWORDS[jobName] : "";
    const query  = jobName ? `${jobName} ${kwBase} ${kwStat}`.trim() : kwBase;
    const qGrams = toBigrams(query);
    // 既選択装備名のバイグラム（セット効果テキストとのマッチングに使用）
    const synergyQGrams = selectedItemNames ? toBigrams(selectedItemNames) : null;

    const scored = items
        .filter(it => {
            if (!EQUIP_SLOT_TYPES.has(it.type)) return false;
            if ((it.displayname || "").startsWith("[レンタル]")) return false;
            if (slotGroup(it.type, it.position) !== slot) return false;
            if (excludeNames && excludeNames.has(it.displayname)) return false;
            // アクセサリー(1)/(2) 重複防止: 既に同一サブ種別が選ばれている場合は除外
            if (excludeTypes && excludeTypes.has(it.type)) return false;
            if (budget !== null && it.price && it.price > budget) return false;
            if (slot === "武器" && jobName) {
                const jobRestricted = it.jobs && it.jobs.length > 0;
                if (jobRestricted && !it.jobs.includes(jobName)) return false;
            }
            // 最強クエリ(minReqLevel>0)時: reqLv不足装備を除外（カードは要求Lvなしのため対象外）
            // anti-keywordが低い(魔法系)場合は除外しない
            if (minReqLevel > 0 && it.type !== "カード") {
                const isTargetJobSpec = !!(jobName && it.jobs && it.jobs.includes(jobName));
                if (!isTargetJobSpec) {
                    const reqLvFlt = parseRequiredLevel(it.description || "");
                    if (reqLvFlt < minReqLevel) {
                        // 要求Lv下限チェック: minReqLevel/2 未満の低レベル装備を除外
                        // 例: マジカルブースター(reqLv=30) < 120/2=60 → 除外
                        if (reqLvFlt < minReqLevel / 2) return false;
                        // anti-keyword閾値0.10: インターディメンショナルリフト(0.091)通過、ヘヴンリーオーダー(0.121)除外
                        const antiGramsFb = jobName && JOB_ANTI_KEYWORDS[jobName]
                            ? toBigrams(JOB_ANTI_KEYWORDS[jobName]) : null;
                        const allowLow = antiGramsFb && antiGramsFb.size > 0 && (() => {
                            const tG = toBigrams(`${it.displayname} ${it.description || ""}`);
                            let antiOvl = 0;
                            for (const g of antiGramsFb) if (tG.has(g)) antiOvl++;
                            return (antiOvl / antiGramsFb.size) <= 0.10;
                        })();
                        if (!allowLow) return false;
                    }
                }
            }
            return true;
        })
        .map(it => {
            // セット条件（[XXX]と共に装備時）を除いた本体テキストでbase scoreを計算
            // → セット条件付きEM向けキーワードによる過大評価を防ぐ
            const text = `${it.displayname} ${extractNonSetText(it.description)}`;
            const tGrams = toBigrams(text);
            let overlap = 0;
            for (const g of qGrams) if (tGrams.has(g)) overlap++;
            let score = qGrams.size ? overlap / qGrams.size : 0;
            // contentScore: アイテム自身の説明/名称とクエリのバイグラム一致度のみ（シナジー・reqLvBonus除外）
            // ジョブ専用外アイテムの関連性ゲートに使用（グレイウルフシューズ/ネックレス等の除外）
            const contentScore = score;
            // シナジーボーナス: Jaccard係数で計算（長大なsynergy_textの偽陽性ボーナスを抑制）
            // synergy_textが存在する場合はブラケット含むセクション（条件付き効果）のみを評価対象にする
            // （基本効果・非条件テキストが混入した場合の偽陽性を防ぐ）
            const rawSynergy0 = it.synergy_text
                ? it.synergy_text.split(/[―─]{3,}/).filter(s => /\[[^\]]+\]/.test(s)).join(" ")
                : null;
            const synergyText = rawSynergy0 || extractSynergyTextStrict(it.description);
            if (synergyText) {
                const sGrams = toBigrams(synergyText);
                let sOverlap = 0;
                for (const g of qGrams) if (sGrams.has(g)) sOverlap++;
                const union = qGrams.size + sGrams.size - sOverlap;
                // セット・精錬・スキル条件のみのsynergy_textはウェイトを削減（過大評価防止）
                const synergyW = isAllSetConditionSynergy(synergyText) ? SYNERGY_WEIGHT * 0.3 : SYNERGY_WEIGHT;
                score += (union > 0 ? sOverlap / union : 0) * synergyW;
                // 既選択装備名がシナジーテキストに含まれる場合（セット効果）に追加ボーナス
                if (synergyQGrams && synergyQGrams.size) {
                    let synergyNameOverlap = 0;
                    for (const g of synergyQGrams) if (sGrams.has(g)) synergyNameOverlap++;
                    score += (synergyQGrams.size ? synergyNameOverlap / synergyQGrams.size : 0) * SYNERGY_WEIGHT;
                }
            }
            // シナジーパートナーボーナス: 「[XXX]と共に装備時」のパートナーの説明文とクエリの類似度を加算。
            // → エンチャント・カードとのシナジーが強い装備を優先選択（全体最適化）。
            if (SYNERGY_PARTNER_WEIGHT > 0 && it.synergy_text) {
                // ブラケット含むセクションのみで全条件付き判定（基本効果混入によるウェイト誤判定防止）
                const rawSyn0ForPartner = rawSynergy0 || it.synergy_text;
                const partnerW = isAllSetConditionSynergy(rawSyn0ForPartner) ? SYNERGY_PARTNER_WEIGHT * 0.3 : SYNERGY_PARTNER_WEIGHT;
                for (const name of extractSynergyPartnerNames(it.synergy_text)) {
                    const partner = itemNameMap.get(name);
                    if (!partner) continue;
                    // パートナーが別ジョブ専用（対象ジョブで装備不可）ならボーナスをスキップ
                    if (partner.jobs && partner.jobs.length > 0
                        && !partner.jobs.includes("全ての職業")
                        && !(jobName && partner.jobs.includes(jobName))) continue;
                    const pGrams = toBigrams(`${partner.displayname} ${extractNonSetText(partner.description)}`);
                    let pOverlap = 0;
                    for (const g of qGrams) if (pGrams.has(g)) pOverlap++;
                    const pUnion = qGrams.size + pGrams.size - pOverlap;
                    score += (pUnion > 0 ? pOverlap / pUnion : 0) * partnerW;
                }
            }
            // ジョブ専用アイテムにボーナス
            const isJobSpecFallback = !!(it.jobs && jobName && it.jobs.includes(jobName));
            const bonus = isJobSpecFallback ? 0.3 : 0;
            // 高要求レベルアイテムにスコアボーナス（4次職エンドゲームアイテムを優先）
            const reqLvFb = parseRequiredLevel(it.description || "");
            const reqLvBonusFb = reqLvFb >= 200 ? 0.20 : reqLvFb >= 175 ? 0.15 : reqLvFb >= 150 ? 0.10 : reqLvFb >= 100 ? 0.03 : 0;
            // 重大なペナルティ効果（MaxSP/MaxHP 30%以上減少）を含むアイテムのスコアを抑制
            const rawDescFb = it.description || "";
            const penaltyFb = /MaxSP\s*[-－]\s*[3-9]\d%|MaxHP\s*[-－]\s*[3-9]\d%/.test(rawDescFb) ? 0.25 : 0;
            return { score: score + bonus + reqLvBonusFb - penaltyFb, contentScore, item: it };
        })
        .sort((a, b) => b.score - a.score);

    // ジョブ専用装備が存在すれば最優先で返す（スコアが低くても専用を優先）
    if (jobName) {
        const jobSpecific = scored.filter(r => r.item.jobs && r.item.jobs.includes(jobName));
        if (jobSpecific.length > 0) return jobSpecific[0];
    }
    // ジョブ専用がない場合は最低スコア以上のもののみ返す（弱い汎用装備の混入を防ぐ）
    // contentScore ゲート: reqLvBonus等で補正前のコンテンツ関連性が MIN_FALLBACK_CONTENT_SCORE 未満の
    // アイテムを除外（例: グレイウルフシューズ/ネックレスは MaxHP/MaxSP のみで EM 関連性が低い）
    return scored.find(r => r.score >= MIN_FALLBACK_SCORE && r.contentScore >= MIN_FALLBACK_CONTENT_SCORE) || null;
}
// includeEnchant=false の場合はエンチャントを除外（Phase 1 の装備提案辺り）
// minReqLevel>0 の場合は要求レベルが低すぎる装備を除外（最強クエリで ヘヴンリーオーダー等を弾く）
// currentEquipGrams が渡された場合、候補アイテムのシナジーテキストに既装備名がマッチしたらボーナスを加算（セット効果発動候補を優先）
function searchSimilarItemsDiversified(query, topPerSlot = 1, maxTotal = 10, allowedJobName = null, includeEnchant = false, minReqLevel = 0, currentEquipGrams = null) {
    if (!items.length) return [];
    const queryGrams = toBigrams(query);
    if (!queryGrams.size) return [];
    // ジョブ不適性キーワードのバイグラム（カードのペナルティ計算に使用）
    const antiGramsDiv = (allowedJobName && JOB_ANTI_KEYWORDS[allowedJobName])
        ? toBigrams(JOB_ANTI_KEYWORDS[allowedJobName]) : null;
    // カード採点用: スキル名なしの短いstat-keywordsのみ。
    // スキル名入りの長いクエリだとbigram分母が増大し、魔法系カードがMIN_CARD_SCORE以下になるため分離する。
    const cardQueryGrams = (allowedJobName && JOB_STAT_BASE_KEYWORDS[allowedJobName])
        ? toBigrams(JOB_STAT_BASE_KEYWORDS[allowedJobName])
        : queryGrams;

    const scored = items
        .filter(it => {
            // 最強クエリ(minReqLevel>0)時: reqLv不足の装備を除外
            // ただし anti-keyword比率が低い(魔法系アイテム)場合は許容する
            // 例: ヘヴンリーオーダー(antiRatio≈0.091) → 除外
            // 例: インターディメンショナルリフト(antiRatio≈0.061) → 通過
            if (minReqLevel > 0 && !it.is_enchant && it.type !== "カード") {
                const isTargetJobSpec = !!(allowedJobName && it.jobs && it.jobs.includes(allowedJobName));
                if (!isTargetJobSpec) {
                    const reqLv = parseRequiredLevel(it.description || "");
                    if (reqLv < minReqLevel) {
                        // 要求Lv下限チェック: minReqLevel/2 未満の低レベル装備は anti-keyword に関わらず除外
                        // 例: マジカルブースター(reqLv=30) < 120/2=60 → 除外
                        // 例: インターディメンショナルリフト(reqLv=100) >= 60 → anti-keyword チェックへ
                        if (reqLv < minReqLevel / 2) return false;
                        // anti-keyword閾値0.10: インターディメンショナルリフト(0.091)通過、ヘヴンリーオーダー(0.121)除外
                        const allowLowReq = antiGramsDiv && antiGramsDiv.size > 0 && (() => {
                            const tG = toBigrams(`${it.displayname} ${it.description || ""}`);
                            let antiOvl = 0;
                            for (const g of antiGramsDiv) if (tG.has(g)) antiOvl++;
                            return (antiOvl / antiGramsDiv.size) <= 0.10;
                        })();
                        if (!allowLowReq) return false;
                    }
                }
            }
            return true;
        })
        .map(it => {
            // 装備はセット条件（[XXX]と共に装備時）を除いた本体テキストでbase scoreを計算
            // → セット条件付きEM向けキーワードによる過大評価を防ぐ（エンチャントはそのまま）
            // エンチャントはフルテキスト、装備・カードともextractNonSetTextベースでcontentScoreを計算。
            // カードもextractNonSetTextを使うことで、セット条件テキスト（[XXX]と共に装備時の効果）を
            // contentScoreから除外し、synergyBonusとして別途正確に評価する。
            // 例: DR815カードの「[GC109カード]と共に装備時 詠唱時間-2% スキルディレイ-2%」が
            // contentScoreに混入してホワイトアイスウィンドカード等より不当に高スコアになる問題を修正。
            // オーレリー・プティカードはEMスキル名がセット条件テキストにあるため
            // contentScoreは低くなるが、synergyBonusで正当に評価される。
            let text = it.is_enchant
                ? `${it.displayname} ${it.description}`
                : `${it.displayname} ${extractNonSetText(it.description)}`
            // エンチャントは injection_name.suffix もビッグラム対象に加える（"Str+1" "魔力4" 等の短名補強）
            if (it.is_enchant && it.injection_name && it.injection_name.suffix) {
                text += ` ${it.injection_name.suffix}`;
            }
            const textGrams = toBigrams(text);
            // カードはstat-keywordsのみで採点（スキル名を含む長クエリによるbigram希釈を回避）
            const scoreGrams = (it.type === "カード") ? cardQueryGrams : queryGrams;
            let overlap = 0;
            for (const g of scoreGrams) if (textGrams.has(g)) overlap++;
            let score = scoreGrams.size ? overlap / scoreGrams.size : 0;
            // contentScore: アイテム自身の説明/名称とクエリのバイグラム一致度のみ（シナジー・reqLvBonus除外）。
            // bySlotJobGroup/bySlotGeneric の「低関連性アイテム除外ゲート」に使用。
            // シナジーボーナスやreqLvBonusで水増しされたMaxHP/MaxSP型アイテムを弾く
            // （例: グレイウルフシューズ/ネックレス main≈0.061、コル・コアヘッドフォン main≈0.087）。
            // jobSpecアイテム（bySlotJobSpec経由）はこのゲートを通らないので問題なし。
            const contentScore = score;
            // シナジーボーナス: Jaccard係数で計算（長大なsynergy_textの偽陽性ボーナスを抑制）
            // synergy_textが存在する場合はブラケット含むセクション（条件付き効果）のみを評価対象にする
            const rawSynergy1 = it.synergy_text
                ? it.synergy_text.split(/[―─]{3,}/).filter(s => /\[[^\]]+\]/.test(s)).join(" ")
                : null;
            const synergyText = rawSynergy1 || extractSynergyTextStrict(it.description);
            if (synergyText) {
                const sGrams = toBigrams(synergyText);
                let sOverlap = 0;
                for (const g of queryGrams) if (sGrams.has(g)) sOverlap++;
                const union = queryGrams.size + sGrams.size - sOverlap;
                // セット・精錬・スキル条件のみのsynergy_textはウェイトを削減（過大評価防止）
                const synergyW = isAllSetConditionSynergy(synergyText) ? SYNERGY_WEIGHT * 0.3 : SYNERGY_WEIGHT;
                score += (union > 0 ? sOverlap / union : 0) * synergyW;
                // 既装備名がシナジーテキストにマッチ = ユーザーの今の装備とセット効果が発動する組み合わせ
                // → クエリキーワードに関係なくボーナスを与えて組み合わせ候補を優先的に引き上げる
                if (currentEquipGrams && currentEquipGrams.size) {
                    let equipOverlap = 0;
                    for (const g of currentEquipGrams) if (sGrams.has(g)) equipOverlap++;
                    if (equipOverlap > 0) score += (equipOverlap / currentEquipGrams.size) * SYNERGY_WEIGHT;
                }
            }
            // シナジーパートナーボーナス: 「[XXX]と共に装備時」のパートナーの説明文とクエリの類似度を加算。
            // → エンチャント・カードとのシナジーが強い装備を優先選択（全体最適化）。
            if (SYNERGY_PARTNER_WEIGHT > 0 && it.synergy_text) {
                // ブラケット含むセクションのみで全条件付き判定（基本効果混入によるウェイト誤判定防止）
                const rawSyn1ForPartner = rawSynergy1 || it.synergy_text;
                const partnerW = isAllSetConditionSynergy(rawSyn1ForPartner) ? SYNERGY_PARTNER_WEIGHT * 0.3 : SYNERGY_PARTNER_WEIGHT;
                for (const name of extractSynergyPartnerNames(it.synergy_text)) {
                    const partner = itemNameMap.get(name);
                    if (!partner) continue;
                    // パートナーが別ジョブ専用（対象ジョブで装備不可）ならボーナスをスキップ
                    if (partner.jobs && partner.jobs.length > 0
                        && !partner.jobs.includes("全ての職業")
                        && !(allowedJobName && partner.jobs.includes(allowedJobName))) continue;
                    const pGrams = toBigrams(`${partner.displayname} ${extractNonSetText(partner.description)}`);
                    let pOverlap = 0;
                    for (const g of queryGrams) if (pGrams.has(g)) pOverlap++;
                    const pUnion = queryGrams.size + pGrams.size - pOverlap;
                    score += (pUnion > 0 ? pOverlap / pUnion : 0) * partnerW;
                }
            }
            // ジョブ専用アイテムにボーナス（汎用装備より優先して選ばれるよう職業適性を強化）
            if (it.jobs && allowedJobName && it.jobs.includes(allowedJobName) && !it.jobs.includes("全ての職業")) {
                score += 0.3;
            }
            // 高要求レベルアイテムにスコアボーナス（4次職エンドゲームアイテムを優先）
            const reqLv = parseRequiredLevel(it.description || "");
            score += reqLv >= 200 ? 0.20 : reqLv >= 175 ? 0.15 : reqLv >= 150 ? 0.10 : reqLv >= 100 ? 0.03 : 0;
            // Spl依存Mdef完全無視効果ボーナス（星座の印章(魔力)等 — EMなどSplベース魔法職向け）
            // 高Spl時に全種族Mdef100%無視 → EM等の主力スキルが全モンスターに通る最重要強化
            // 例: 星座の印章(魔力)「純粋なSplが100以上の時、全ての種族のMdef 100%無視」
            if (it.type !== "カード" && allowedJobName && JOB_STAT_BASE_KEYWORDS[allowedJobName]
                    && JOB_STAT_BASE_KEYWORDS[allowedJobName].includes('Spl')) {
                const nonSetMdef = extractNonSetText(it.description || "");
                if (/Mdef\s*100\s*%?\s*無視|全ての種族.*Mdef.*無視/.test(nonSetMdef)) {
                    score += 0.10;
                }
            }
            // 重大なペナルティ効果（MaxSP/MaxHP 30%以上減少）を含むアイテムのスコアを抑制
            const rawDesc = it.description || "";
            if (/MaxSP\s*[-－]\s*[3-9]\d%|MaxHP\s*[-－]\s*[3-9]\d%/.test(rawDesc)) {
                score -= 0.25;
            }
            // カードにジョブ不適性ペナルティを適用（物理向けカードを魔法職に提案しない等）
            // non-set テキストを使用: セット条件テキスト（[XXX]と共に装備時）の物理・魔法攻撃等による
            // 偽陽性 anti-match を防ぐ（例: DR815カードの[GC109]セット条件に「物理・魔法攻撃」）
            if (antiGramsDiv && antiGramsDiv.size && it.type === "カード") {
                // displayname を除いて description の non-set text のみを使う:
                // カード名 ("プティカード" の "ティ""ィカ" が "クリティカル" のbigramに偽陽性でマッチするのを防ぐ)
                const tGramsCard = toBigrams(extractNonSetText(it.description || ""));
                let antiOverlapCard = 0;
                for (const g of antiGramsDiv) if (tGramsCard.has(g)) antiOverlapCard++;
                const antiRatioCard = antiOverlapCard / antiGramsDiv.size;
                // antiRatioCard > 0.08: 物理専用カード（GC109等）を完全排除（filter(r.score>0)で除去）
                // 0.08: RAGフォールバックのカード除外閾値と統一し、LLM候補にも上がらなくする
                if (antiRatioCard > 0.08) score = 0;
                else if (antiRatioCard > 0.03) score *= Math.max(0.05, 1 - antiRatioCard * 3.5);
            }
            // 種族限定ダメージのみのカードに大幅ペナルティ
            // 非セットテキストが「〇〇モンスターへのダメージ」のみで汎用強化効果がない場合に除外
            // 例: グレイヴミミックカード「動物・不死形モンスターへのダメージ + 5%」→ EM汎用性なし
            if (it.type === "カード" && score > 0) {
                const nonSetForCard = extractNonSetText(it.description || "");
                const RACE_ONLY_PAT = /(?:動物|不死形|植物|昆虫|魚族|天使|悪魔|人間|水中)(?:[・、][^\s]+)*(?:形)?モンスター(?:へ|に)/;
                const HAS_GENERAL   = /(?:Matk|Spl|MaxHP\s*[+＋]|MaxSP\s*[+＋]|詠唱時間\s*-\s*[0-9]|固定詠唱時間|魔法攻撃で与える)/;
                if (RACE_ONLY_PAT.test(nonSetForCard) && !HAS_GENERAL.test(nonSetForCard)) {
                    score *= 0.15; // 種族限定のみ → MIN_CARD_SCORE 未満に確実に落とす
                }
            }
            // 魔法職向け重要効果カードにスコアボーナス
            // 「魔法攻撃で与えるダメージ+X%」効果はEM等の魔法職の最重要強化効果のため加点
            // 「物理・魔法攻撃で与えるダメージ」の複合効果は対象外（物理職にも有効な汎用カードのため）
            // 例: 得体の知れない生命体カード「魔法攻撃で与えるダメージ+10%（精錬10で+20%）」
            if (it.type === "カード" && score > 0) {
                const MAGIC_BONUS_JOBS = new Set(["エレメンタルマスター","ウィザード","ハイウィザード","ウォーロック","ソーサラー","アークビショップ","アークメイジ"]);
                if (MAGIC_BONUS_JOBS.has(allowedJobName)) {
                    const nonSetBonus = extractNonSetText(it.description || "");
                    // 「物理・魔法攻撃で与えるダメージ」は除外し、「魔法攻撃で与えるダメージ」のみに適用
                    const MAGIC_ONLY_DMG = /魔法攻撃で\s*与えるダメージ\s*[+＋]\s*\d/;
                    const PHYS_MAGIC_DMG = /物理[・,、]?\s*魔法攻撃で|物理・魔法/;
                    if (MAGIC_ONLY_DMG.test(nonSetBonus) && !PHYS_MAGIC_DMG.test(nonSetBonus)) {
                        // 魔法攻撃ダメージ増加カードはEM等の最優先強化効果。
                        // 加算ではなく下限値を保証して、base scoreが低い得体の知れない生命体カード等を
                        // slotTopN=10の候補圏内に確実に引き上げる。
                        score = Math.max(score + 0.10, 0.36);
                    }
                }
            }
            // 大幅MaxHP増加カードにスコアボーナス（生存力強化の核として全ジョブ共通で有用）
            // 「MaxHP+50%以上」は生存力に直結する強力な効果のため加点
            // 例: タオグンカカード「MaxHP+100% Def-50 Mdef-50」→ デメリットはあるが生存力は高い
            if (it.type === "カード" && score > 0) {
                const nonSetHP = extractNonSetText(it.description || "");
                const LARGE_HP_PAT = /MaxHP\s*[+＋]\s*([0-9]+)%/;
                const m = nonSetHP.match(LARGE_HP_PAT);
                if (m && parseInt(m[1]) >= 50) {
                    score += 0.12; // 大幅MaxHP増加カードをRAG通過ラインまで引き上げ
                }
            }
            return { score, contentScore, item: it };
        })
        .filter(r =>
            r.score > 0 &&
            !r.item.is_enchant && // is_enchant アイテムはエンチャント Phase2 で処理するため除外（サーペンタリウス等の混入防止）
            EQUIP_SLOT_TYPES.has(r.item.type) &&
            !(r.item.displayname || "").startsWith("[レンタル]") // レンタルアイテムを除外
        )
        .sort((a, b) => b.score - a.score);

    // 3パス方式: ジョブ完全一致 > 限定ジョブグループ（4次職等）> 全ての職業 の優先順位で選択。
    // 「4次職」専用装備が存在するスロットは「全ての職業」汎用装備を除外し、
    // 関係の薄い汎用装備（ルイーゼの赤い靴・ディアボロスウィング等）の混入を防ぐ。
    const bySlotJobSpec  = {};  // ジョブ完全一致（エレメンタルマスター専用等）
    const bySlotJobGroup = {};  // 限定ジョブ（4次職・ジョブ系列等。「全ての職業」は除く）
    const bySlotGeneric  = {};  // 全アイテム（全ての職業含む）
    for (const r of scored) {
        const slot = r.item.is_enchant ? "エンチャント" : slotGroup(r.item.type || "", r.item.position);
        // アクセサリー(1)/(2)サブ種別ごとに独立してTopN収集（Phase1で各サブ種別から最低1件保証する）
        // 例: 星座の印章(集中)と星座の印章(魔力)が両方アクセサリー(1)の場合、(2)種別が第一候補に入るよう分離
        const collectSlot = (slot === "アクセサリー" &&
            (r.item.type === "アクセサリー(1)" || r.item.type === "アクセサリー(2)"))
            ? r.item.type : slot;
        // 武器フィルタ: items.json の jobs フィールドでジョブ制限チェック
        if (slot === "武器" && allowedJobName) {
            const jobRestricted = r.item.jobs && r.item.jobs.length > 0;
            if (jobRestricted && !r.item.jobs.includes(allowedJobName)) continue;
        }
        // ジョブ専用アイテムにスコアボーナス（武器 1.5x、他 1.3x）
        const isJobSpec = !!(allowedJobName && r.item.jobs && r.item.jobs.includes(allowedJobName));
        if (isJobSpec) r.score = r.score * (slot === "武器" ? 1.5 : 1.3);
        // カードは最大40件（均一化スコアの中で得体の知れない生命体等のカードをLLM候補圏内に引き上げるため）、MIN_CARD_SCORE 未満は除外
        // アクセサリー(1)/(2)サブ枠はDOM除外バックアップ確保のため収集上限を増やす
        const slotTopN = (slot === "カード") ? 40 : (collectSlot !== slot) ? topPerSlot + 2 : topPerSlot;
        // Fix DR815-v2: contentScore（synBonus加算前の純粋bigramスコア）でフィルタ。
        // r.scoreはsynergyBonusが加算されるため、DR815のようにsynergy_textに「詠唱時間」等が
        // 含まれているとcontentScore=0.063でもr.score=0.27でMIN_CARD_SCOREを通過してしまう問題を修正。
        if (slot === "カード" && (r.contentScore ?? r.score) < MIN_CARD_SCORE) continue;
        // 「全ての職業」ではない限定ジョブ指定（4次職・拡張4次職等の狭義グループ）かを判定。
        // 「マジシャン系」など「〜系」は広範すぎる（エレメンタルマスターも含む）ため汎用扱い。
        // 「ノービスを除く全ての職業」「ノービス系を除く全ての職業」「アコライト系を除く全ての職業」等も
        // 実質ほぼ全職業対象のため汎用扱い。
        const isJobGroup = !isJobSpec && !!(r.item.jobs && r.item.jobs.length > 0 &&
            !r.item.jobs.includes("全ての職業") &&
            !r.item.jobs.some(j => j.endsWith("系") || j.includes("を除く全ての職業")));
        // ジョブ完全一致コレクション
        if (isJobSpec) {
            if (!bySlotJobSpec[collectSlot]) bySlotJobSpec[collectSlot] = [];
            if (bySlotJobSpec[collectSlot].length < slotTopN &&
                !bySlotJobSpec[collectSlot].some(e => e.item.displayname === r.item.displayname)) bySlotJobSpec[collectSlot].push(r);
        }
        // 限定ジョブグループコレクション（4次職等）
        if (isJobGroup) {
            // Fix E: allowedJobNameが指定されている場合、現ジョブで装備不可なjobGroupアイテムをスキップ。
            // 例: アポテオシス(jobs=["カーディナル"])がEM用のアクセサリー(2)枠を占有して
            // オーバードライブランページエコーズが4件枠に入れない問題を修正。
            // 4次職/拡張4次職グループアイテムは現ジョブの4次職タグで判定して通過させる。
            let skipJobGroup = false;
            if (allowedJobName) {
                const itemJobs = r.item.jobs || [];
                const fitCurrentJob = itemJobs.includes(allowedJobName);
                const is4th = itemJobs.includes("4次職") || itemJobs.includes("拡張4次職");
                const currentJobTags = JOB_CLASS_TAGS[allowedJobName] || new Set();
                const currentJobIs4th = currentJobTags.has("4次職") || currentJobTags.has("拡張4次職");
                if (!fitCurrentJob && !(is4th && currentJobIs4th)) skipJobGroup = true;
            }
            if (!skipJobGroup) {
                if (!bySlotJobGroup[collectSlot]) bySlotJobGroup[collectSlot] = [];
                if (bySlotJobGroup[collectSlot].length < slotTopN &&
                    !bySlotJobGroup[collectSlot].some(e => e.item.displayname === r.item.displayname)) bySlotJobGroup[collectSlot].push(r);
            }
        }
        // 全候補コレクション（汎用含む）
        if (!bySlotGeneric[collectSlot]) bySlotGeneric[collectSlot] = [];
        if (bySlotGeneric[collectSlot].length < slotTopN &&
            !bySlotGeneric[collectSlot].some(e => e.item.displayname === r.item.displayname)) bySlotGeneric[collectSlot].push(r);
    }
    // 優先度: ジョブ完全一致 > 限定ジョブグループ > 全ての職業（汎用）
    const allSlots = new Set([
        ...Object.keys(bySlotJobSpec),
        ...Object.keys(bySlotJobGroup),
        ...Object.keys(bySlotGeneric)
    ]);
    const bySlot = {};
    for (const slot of allSlots) {
        if (bySlotJobSpec[slot] && bySlotJobSpec[slot].length > 0) {
            bySlot[slot] = bySlotJobSpec[slot];  // ジョブ完全一致
        } else if (bySlotJobGroup[slot] && bySlotJobGroup[slot].length > 0) {
            // 汎用の最高スコアが限定ジョブグループより高い場合は汎用を優先
            // （EM向けにディアボロスマント等の物理向け限定装備が混入するのを防ぐ）
            // contentScore ゲート: reqLvBonus 水増しによる低関連性アイテムを JobGroup からも除外
            // （例: グレイウルフシューズ/ネックレスは jobs=['4次職','拡張4次職'] で JobGroup に入るが
            //   contentScore(base≈0.061)が閾値未満のため除外し、より適切な汎用装備を優先する）
            // アクセサリースロットは閾値を 0.75 倍に緩和:
            // 主要効果が「[豊穣の女神]と共に装備時」等のセットテキストにあるため non-set text が少なく
            // contentScore が低くなりやすい（例: コンセクレイト・フィデス・モニーレ ≈ 0.077）。
            const isAccSlot = slot === "アクセサリー" || slot === "アクセサリー(1)" || slot === "アクセサリー(2)";
            const jobGroupThreshold = isAccSlot ? MIN_FALLBACK_CONTENT_SCORE * 0.75 : MIN_FALLBACK_CONTENT_SCORE;
            const jobGroupFiltered = bySlotJobGroup[slot].filter(r => r.contentScore >= jobGroupThreshold);
            const jobGroupMaxScore = jobGroupFiltered.length > 0 ? jobGroupFiltered[0].score : 0;
            const genericFiltered = (bySlotGeneric[slot] || []).filter(r => r.score >= MIN_GENERIC_EQUIP_SCORE && r.contentScore >= MIN_FALLBACK_CONTENT_SCORE);
            if (jobGroupFiltered.length === 0) {
                // JobGroup 候補がすべて低関連性 → 汎用を使用（なければフォールバックに任せる）
                bySlot[slot] = genericFiltered;
            } else if (isAccSlot) {
                // アクセサリースロット: jobGroup（4次職等）と汎用の両方をRAG候補に含める。
                // メンタルコンデンサー/フォースコンデンサー等が synergy_text の EM キーワードで
                // 高スコアを取り jobGroup を上書きするのを防ぎ、エコーズ/星座の印章(魔力)等の
                // 4次職アクセサリーが preJobBoosted(+0.80) を受けて最終的に選ばれるようにする。
                const seen = new Set(jobGroupFiltered.map(r => r.item.displayname));
                const genericAdd = genericFiltered.filter(r => !seen.has(r.item.displayname));
                bySlot[slot] = [...jobGroupFiltered, ...genericAdd]
                    .sort((a, b) => b.score - a.score)
                    .slice(0, topPerSlot + 2);
            } else if (genericFiltered.length > 0 && genericFiltered[0].score > jobGroupMaxScore + 0.05) {
                // 汎用が jobGroup を明確に上回る（差 > 0.05）場合のみ汎用を優先（アクセサリー以外）。
                bySlot[slot] = genericFiltered; // 汎用の方が明確に高スコア → 汎用を優先
            } else {
                bySlot[slot] = jobGroupFiltered; // 限定ジョブグループ（contentScore 閾値以上のみ）
            }
        } else {
            // 汎用のみ：低スコアは排除してフォールバックに任せる（contentScore ゲートも適用）
            bySlot[slot] = (bySlotGeneric[slot] || []).filter(r => r.score >= MIN_GENERIC_EQUIP_SCORE && r.contentScore >= MIN_FALLBACK_CONTENT_SCORE);
        }
    }

    // アクセサリーの枠別最適割り当て（合計2枠: 枠1にアクセサリー(1)優先、枠2にアクセサリー(2)優先）
    // ゲーム仕様: 枠1 = type=アクセサリーまたはアクセサリー(1)、枠2 = type=アクセサリーまたはアクセサリー(2)
    // (1)/(2)専用装備が両方ある場合: 汎用アクセサリーは除外（ロードオブエレメンタル等が枠を占有するのを防ぐ）
    // (1)/(2)のどちらかが0件の場合: 汎用アクセサリーをバックアップとして追加
    {
        const accType1List = bySlot["アクセサリー(1)"] || [];
        const accType2List = bySlot["アクセサリー(2)"] || [];
        const accGenericList = bySlot["アクセサリー"] || [];
        // (1)/(2)どちらかが空の場合のみ汎用バックアップを追加
        const needGenericBackup = accType1List.length === 0 || accType2List.length === 0;
        const acc1Names = new Set(accType1List.map(r => r.item.displayname));
        const acc2Names = new Set(accType2List.map(r => r.item.displayname));
        const accGenericUniq = accGenericList.filter(r =>
            !acc1Names.has(r.item.displayname) && !acc2Names.has(r.item.displayname)
        );
        const seenNames = new Set();
        const accPicks = [];
        for (const p of [...accType1List, ...accType2List, ...(needGenericBackup ? accGenericUniq : [])]) {
            if (!seenNames.has(p.item.displayname)) {
                seenNames.add(p.item.displayname);
                accPicks.push(p);
            }
        }
        // bySlot を統合（アクセサリー(1)/(2)キーを "アクセサリー" に集約）
        delete bySlot["アクセサリー(1)"];
        delete bySlot["アクセサリー(2)"];
        bySlot["アクセサリー"] = accPicks;
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
function fetchEnchantSuggestionsForEquips(equipResults, query, jobName = null, cardCandidateNames = null) {
    const queryGrams = toBigrams(query);
    // ジョブ不適性キーワードのバイグラム（装備禁止ステータスにマッチした場合にペナルティ）
    const antiGrams = (jobName && JOB_ANTI_KEYWORDS[jobName])
        ? toBigrams(JOB_ANTI_KEYWORDS[jobName]) : null;
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

        // items.json のエンチャントデータと照合（is_enchant=true のみ）
        // is_enchant=false の通常カードは searchSimilarItemsDiversified 経由で提案されるため除外。
        // これにより「装備:武器」等の通常カード（グレイヴミミックカード等）がエンチャント候補に
        // 混入するのを防ぐ。
        const enchItems = items.filter(it =>
            it.is_enchant &&
            enchNameMap.has(it.displayname)
        );

        // スコアリング: クエリ + 装備セット効果 + 提案中アイテムへのリンク
        const setEffectText = extractSetEffectText(r.item.description || "");
        // Fix F: setEffectTextからアイテム名参照[XXX]を除去してsetEffectGramsを計算。
        // 例: 星座の印章(魔力)のsetEffectTextに「[星雲の精髄(体力3)]と共に装備時」が含まれると
        // 体力3が自分自身の名前bigramsでsetScoreが高くなり、知力3より不当に高く評価される問題を修正。
        // アイテム名参照を除去することで純粋な効果キーワード（リフレッシュ・魔法攻撃等）のみで評価する。
        const setEffectTextClean = setEffectText.replace(/\[[^\]]+\]/g, '');
        const setEffectGrams = toBigrams(setEffectTextClean);

        const scoreMap = new Map();
        for (const it of enchItems) {
            // スキルオーブ/潜在覚醒はジョブ専用スキル付与アイテム。対象ジョブのスキルでないものは除外
            if (it.displayname.startsWith('スキルオーブ(') && jobName && !it.displayname.includes(jobName)) continue;
            // 潜在覚醒(スキル名): JOB_STAT_KEYWORDS[jobName]にスキル名がない場合は除外
            // 例: 潜在覚醒(シビアレインストーム) → EMには不要（詠唱時間-100%でも対象スキルを持たないため）
            if (it.displayname.startsWith('潜在覚醒(') && jobName && JOB_STAT_KEYWORDS[jobName]) {
                const mSkill = it.displayname.match(/^潜在覚醒\(([^)]+)\)/);
                if (mSkill && !JOB_STAT_KEYWORDS[jobName].includes(mSkill[1])) continue;
            }
            // 潜在解放(ジョブ名I~XX): ジョブ名先頭マッチで他ジョブのものを除外
            if (it.displayname.startsWith('潜在解放(') && jobName) {
                const mPr = it.displayname.match(/^潜在解放\((.+)\)$/);
                if (mPr) {
                    const inner = mPr[1];
                    const knownJobs = Object.keys(JOB_STAT_KEYWORDS);
                    const matchedJob = knownJobs.find(j => inner.startsWith(j));
                    if (!matchedJob || matchedJob !== jobName) continue;
                }
            }
            // 他ジョブ専用スキル強化エンチャント除外: description 先頭の [スキル名]の 詠唱時間/ディレイ/消費SP
            if (jobName && JOB_STAT_KEYWORDS[jobName]) {
                const mSkDes = (it.description || '').match(/^\[([^\]]+)\]の\s*(?:詠唱時間|再使用待機時間|消費SP)/);
                if (mSkDes && !JOB_STAT_KEYWORDS[jobName].includes(mSkDes[1])) continue;
            }
            let text = `${it.displayname} ${it.description}`;
            if (it.injection_name && it.injection_name.suffix) text += ` ${it.injection_name.suffix}`;
            const tGrams = toBigrams(text);
            // anti-keyword チェックはセット効果テキストを除いた本体テキストで行う。
            // エンチャントの description には [オーレリー・プティカード]等の他カード名が含まれるため
            // フルテキストでは偽陽性バイグラムが大量に発生する（例:「プティカード」→「ィカ」→「クリティカル」に誤ヒット）
            const tGramsForAnti = toBigrams(`${it.displayname} ${extractNonSetText(it.description || "")}`);

            // クエリスコア
            let qOverlap = 0;
            if (queryGrams.size) {
                for (const g of queryGrams) if (tGrams.has(g)) qOverlap++;
            }
            let qScore = queryGrams.size ? qOverlap / queryGrams.size : 0;
            // JOB_STAT_KEYWORDS ボーナス: EM向けなら Spl/Matk/詠唱等のキーワードに一致するエンチャントを優遇
            if (jobName && JOB_STAT_KEYWORDS[jobName]) {
                const jobKwGrams = toBigrams(JOB_STAT_KEYWORDS[jobName]);
                let jkOverlap = 0;
                for (const g of jobKwGrams) if (tGrams.has(g)) jkOverlap++;
                qScore = Math.min(1.0, qScore + (jobKwGrams.size ? (jkOverlap / jobKwGrams.size) * 0.25 : 0));
            }

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
            // カード→エンチャントチェーンボーナス:
            // 提案カードのいずれかが「[this enchant]と共に装備時」のシナジーを持つ → 大幅ブース
            if (cardCandidateNames && cardCandidateNames.size) {
                buildSynergyChainIndexes();
                const chainCards = (enchantToCardIndex ? enchantToCardIndex.get(it.displayname) || [] : []);
                const matched = chainCards.filter(cn => cardCandidateNames.has(cn));
                if (matched.length > 0) {
                    linkBonus = Math.min(linkBonus + matched.length * 0.45, 1.2);
                    aiLog(`[カード→エンチャントチェーン] ${it.displayname} +${(matched.length*0.45).toFixed(2)} (ペアカード: ${matched.join(", ")})`);
                }
            }

            // クエリ 50% + セット効果 20% + リンク 30%
            // linkBonus: description リンク(+0.25/件), カード→エンチャントチェーン(+0.45/件, max1.2)
            let total = qScore * 0.50 + setScore * 0.20 + linkBonus * 0.30;
            // カード→エンチャントチェーンが成立している場合はミニマムスコアを保証:
            // qScore競争に負けてもシナジーチェーンエンチャント（王家の栄光等）は必ず選ばれるようにする
            if (linkBonus >= 0.45) total = Math.max(total, 0.35);
            // ジョブ不適性ペナルティ（STR上昇エンチャントを魔法職に提案しない等）
            // tGramsForAnti（本体テキストのみ）で判定: セット効果テキスト中の他カード名による偽陽性を防ぐ
            if (antiGrams && antiGrams.size) {
                let antiOverlap = 0;
                for (const g of antiGrams) if (tGramsForAnti.has(g)) antiOverlap++;
                const antiRatio = antiOverlap / antiGrams.size;
                // antiRatio > 0.08: 物理専用エンチャント（覇王・豪傑・大鷲の眼光等）を完全排除
                // 覇王・豪傑: antiRatio≈0.13 、 大鷲の眼光: antiRatio≈0.091 → 両方の閾値をカバー
                if (antiRatio > 0.08) continue; // scoreMapに追加しない → 提案候補から除外
                if (antiRatio > 0.03) total *= Math.max(0.02, 1 - antiRatio * 3.5);
            }
            // ジョブクラス不一致ペナルティ: type=カード で「XXX系が装備時」が現在のジョブに
            // 適用されない場合（例: サーペンタリウス「サモナー系が装備時 詠唱時間 - 1%」をEM提案から除外）
            if (jobName && it.type === "カード" && JOB_CLASS_TAGS[jobName]) {
                const compatibleClasses = JOB_CLASS_TAGS[jobName];
                const jobCondMatches = [...(enchDesc.matchAll(/([^\s　]+)系が装備時/g))].map(m => m[1]);
                if (jobCondMatches.length > 0) {
                    const anyCompatible = jobCondMatches.some(jc => compatibleClasses.has(jc));
                    if (!anyCompatible) {
                        // 全てのジョブ系条件が現在のジョブに適用されない → 完全除外
                        // （×0.15 ペナルティでは高qScoreのカードが 0.04 を超えて残るため continue に変更）
                        continue;
                    }
                }
            }
            if (total <= 0) continue; // 有用スコアゼロ以下のエンチャントをスキップ
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
            if (!sm || sm.score <= 0.04) continue; // 有用スコアが低すぎるエンチャントはスキップ (Cri+50等を除外)
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
            let score = queryGrams.size ? overlap / queryGrams.size : 0;
            // シナジーボーナス: Jaccard係数で計算（長大なsynergy_textの偽陽性ボーナスを抑制）
            const synergyText = it.synergy_text || extractSynergyTextStrict(it.description);
            if (synergyText) {
                const sGrams = toBigrams(synergyText);
                let sOverlap = 0;
                for (const g of queryGrams) if (sGrams.has(g)) sOverlap++;
                const union = queryGrams.size + sGrams.size - sOverlap;
                // セット条件のみのsynergy_textはウェイトを削減（単独では恩恵なし→過大評価防止）
                const synergyW = isAllSetConditionSynergy(synergyText) ? SYNERGY_WEIGHT * 0.3 : SYNERGY_WEIGHT;
                score += (union > 0 ? sOverlap / union : 0) * synergyW;
            }
            return { score, item: it };
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
}

// ===============================
// RAG コンテキスト生成
// ===============================

/** 価格を人間が読みやすい形式に変換する */
function formatPrice(rawPrice) {
    if (rawPrice === null || rawPrice === undefined || rawPrice === "不明" || rawPrice === "") {
        return "不明（売買不能または未調査）";
    }
    const n = Number(rawPrice);
    if (isNaN(n)) return String(rawPrice) + "z";
    if (n >= 1000000000) return `${(n / 1000000000).toFixed(2)}Gz`;
    if (n >= 1000000)    return `${(n / 1000000).toFixed(2)}Mz`;
    if (n >= 1000)       return `${(n / 1000).toFixed(1)}Kz`;
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
let llmLoading = false; // ロード中の二重起動を防ぐフラグ
let loadedModelName = null; // 現在ロード済みのモデル名

async function initChatModel() {
    const select = document.getElementById("model-select");
    const uiModelName = select ? select.value : "Qwen2.5-1.5B-Instruct";
    // ロード中または同じモデルが既にロード済みの場合は何もしない
    if (llmLoading || (chatModel && loadedModelName === uiModelName)) return;
    const modelId = MODEL_ID_MAP[uiModelName];

    if (!modelId) {
        aiLog(`モデル ${uiModelName} は WebLLM 未対応です`);
        llmLoading = false;
        return;
    }

    chatModel = null; // 新モデルロード前に古いモデルをリセット
    loadedModelName = null;
    llmLoading = true;
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
        loadedModelName = uiModelName;
        llmLoading = false;
    } catch (e) {
        aiLog("モデルロードに失敗: " + e);
        if (progEl) progEl.textContent = `モデル ${uiModelName} をロードできませんでした`;
        llmLoading = false;
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
        const slotItems = grouped[slot];
        // アクセサリーが2件ある場合は (1)/(2) に分けて表示
        if (slot === "アクセサリー" && slotItems.length > 1) {
            slotItems.forEach((r, i) => {
                lines.push(`\n【アクセサリー(${i + 1})】`);
                lines.push(`・${r.item.displayname}（${formatPrice(r.item.price)}）`);
            });
            continue;
        }
        lines.push(`\n【${slot}】`);
        for (const r of slotItems) {
            const price = formatPrice(r.item.price);
            let suffix = "";
            if (r.item.is_enchant) {
                suffix = r.for_equip ? ` ※「${r.for_equip}」に差せるエンチャント` : " ※カードスロットから装備";
            } else if (r.item.type === "カード") {
                suffix = r.for_equip ? ` ※「${r.for_equip}」に差せるカード` : " ※カードスロットから装備";
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

/**
 * ロード済みLLMでカード候補をジョブ向けに絞り込む。
 * 候補名のリストを渡して「最大4枚選んで」と指示。
 * 出力に候補以外の名前がまじり込んだ場合は破棄しnullを返す。
 */
async function filterCardsWithLLM(cardCandidates, jobName, equippedNames = []) {
    if (!chatModel || !cardCandidates.length) return null;
    try {
        const names = cardCandidates.map(r => r.item.displayname);
        // カード名＋非セット効果テキスト（先頭80文字）＋セット効果パートナー名をLLMに渡す
        // 番号付きリストで候補を提示（LLMが番号で回答→ハルシネーション防止）
        const cardList = cardCandidates.map((r, i) => {
            const raw = extractNonSetText(r.item.description || "").replace(/\s+/g, " ").substring(0, 80);
            // セット効果があれば「(セット: XX, YYと装備時)」を末尾に追加してLLMがシナジーを判断できるようにする
            const partners = extractSynergyPartnerNames(r.item.synergy_text || r.item.description || "");
            const setHint = partners.length ? ` (セット: ${partners.join(", ")}と装備時)` : "";
            return `${i + 1}. ${r.item.displayname}: ${raw || "(効果なし)"}${setHint}`;
        }).join('\n');
        const MAGIC_JOBS_FOR_CARD = new Set(["エレメンタルマスター","ウィザード","ハイウィザード","ウォーロック","ソーサラー","アークビショップ","アークメイジ"]);
        const isMagicJobForCard = MAGIC_JOBS_FOR_CARD.has(jobName);
        // 現在の装備情報をプロンプトに追加（セット効果シナジーの判断に使用）
        const equippedHint = equippedNames.length
            ? `\n現在の装備: ${equippedNames.join(", ")}\n上記の装備とセット効果・シナジーが発動するカードがあれば優先的に選ぶこと。`
            : "";
        const jobRoleHint = isMagicJobForCard
            ? `以下をバランスよく選ぶこと:
攻撃強化: Spl・Matk上昇、詠唱時間/固定詠唱時間短縮、SP・INT上昇、魔法スキルダメージ増加
生存強化: MaxHP大幅増加（+50%以上）、属性ダメージ耐性、スタン/沈黙/石化耐性
デバフ解除: リフレッシュ・インスピレーション等のスキル使用可能効果、絶対に状態異常にならない効果
物理攻撃のみ強化するカードは除外。全部を攻撃強化カードで埋めず、生存・耐性カードも1〜2枚選ぶこと。`
            : `物理攻撃ダメージ増加・攻撃速度・DEX/STR上昇に効果があるカードを優先。MaxHP大幅増加や耐性カードも必要に応じて1枚選ぶこと。`;
        const prompt = `${jobName}向けに最も役立つカードを最大4枚選んでください。
${jobRoleHint}${equippedHint}
注意:
① MaxHP・MaxSPへの大きなマイナス効果（-30%以上）を持つカードでも、インデュアやノックバック無効等の強力な生存・戦術効果がある場合は選択を検討すること
② 「動物モンスターへのダメージ」「不死形モンスターへのダメージ」など特定モンスター種族のみへのダメージが主な効果のカードは選ばないこと
③ 単独では効果が非常に弱く、他カードとのセット効果にほぼ依存するカードは選ばないこと
${cardList}
上記リストから最大4枚の番号をカンマ区切りで選んでください（例: 1,3,4）。番号のみ返答してください。`;
        const response = await chatModel.chat.completions.create({
            messages: [
                // 番号のみ回答させることでハルシネーションを防止
                { role: "system", content: "候補リストの番号のみカンマ区切りで出力せよ。カード名・説明・改行は不要。例: 1,3,4" },
                { role: "user",   content: prompt },
            ],
            temperature: 0.1,
            max_tokens: LLM_MAX_TOKENS_CARD,
        });
        const output = (response.choices[0].message.content || "").trim();
        // 番号形式の回答をパース: "1,3,4" → カード名に変換（ハルシネーション防止）
        const nums = output.split(/[,、\s]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 1 && n <= names.length);
        let validNames = [...new Set(nums.map(n => names[n - 1]).filter(Boolean))];
        // フォールバック: 番号が取れなかった場合はカード名マッチも試みる
        if (!validNames.length) {
            const parts = output.split(/[,、\n]/).map(s =>
                s.trim()
                 .replace(/^\*+\s*/, '')
                 .replace(/^[-・•]\s*/, '')
                 .replace(/^\[/, '')
                 .replace(/\]$/, '')
                 .replace(/^[^:：]+[:：]\s*/, '')
                 .trim()
            ).filter(Boolean);
            const bracketMatches = output.match(/[（(]([^）)]+)[）)]/g) || [];
            for (const m of bracketMatches) {
                const inner = m.replace(/^[（(]/, '').replace(/[）)]$/, '').trim();
                if (inner) parts.push(inner);
            }
            validNames = parts.filter(p =>
                names.some(n => n === p || n.startsWith(p) || p.startsWith(n.replace(/カード$/, "")))
            );
        }
        if (!validNames.length) {
            aiLog(`[LLMカードフィルタ] 有効選択なし→山小なし: ${output}`);
            return null;
        }
        aiLog(`[LLMカードフィルタ] 選択: ${validNames.join(", ")}`);
        return validNames;
    } catch (e) {
        aiLog(`[LLMカードフィルタ失敗] ${e}`);
        return null;
    }
}
async function expandQueryWithLLM(query, jobName) {
    if (!chatModel) return null;
    try {
        const prompt = `「${query}」という質問で検索するのに有効な、${jobName ? jobName + "向け" : ""}装備のステータス・スキル・特性キーワードを最大8個スペース区切りで。キーワードのみ。`;
        const response = await chatModel.chat.completions.create({
            messages: [
                { role: "system", content: "日本語のキーワードのみ返す。説明・改行不要。中国語不可。" },
                { role: "user",   content: prompt },
            ],
            temperature: 0.1,
            max_tokens: LLM_MAX_TOKENS_QUERY,
        });
        let expansion = (response.choices[0].message.content || "").trim();
        // マークダウン箇条書き（* - • 等）と改行を除去してスペース区切りのキーワード列に正規化
        expansion = expansion.replace(/^[\*\-•→▶#]+\s*/gm, "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
        // 見出し語・長すぎる語を除去（「装備の強さを高めるキーワード」のようなヘッダー行の排除）
        expansion = expansion.split(/\s+/)
            .filter(w => w.length >= 2 && w.length <= 12 && !w.includes("キーワード"))
            .join(" ").trim();
        // 検証: 短さ・日本語文字の割合チェック
        if (!expansion || expansion.length > 80) return null;
        const jpChars = (expansion.match(/[぀-鿿＀-￯]/g) || []).length;
        const nonSpace = expansion.replace(/\s/g, "").length;
        if (nonSpace === 0 || jpChars / nonSpace < 0.35) {
            aiLog(`[LLMクエリ拡張] 日本語比率不足のため破棄: ${expansion}`);
            return null;
        }
        aiLog(`[LLMクエリ拡張] 追加キーワード: ${expansion}`);
        return expansion;
    } catch (e) {
        aiLog(`[LLMクエリ拡張失敗] ${e}`);
        return null;
    }
}
async function askAI(userQuery) {
    lastUserQuery = userQuery;
    aiLog(`ユーザー質問: ${userQuery}`);

    // LLMが未ロードまたはモデル変更後は、ロード完了を待ってから処理（カード絞り込み・クエリ拡張を有効にするため）
    const select = document.getElementById("model-select");
    const selectedModel = select ? select.value : "Qwen2.5-1.5B-Instruct";
    if (!chatModel || loadedModelName !== selectedModel) {
        if (!llmLoading) {
            aiLog(`LLM ロード開始: ${selectedModel}`);
            initChatModel(); // ロード開始（即時returnするのでawaitしない）
        }
        aiLog(`LLM ロード完了を待機中…`);
        while (llmLoading) await new Promise(r => setTimeout(r, 300));
    }
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
            // Tom Select は jQuery 合成 change を観測しないため select2 由来の .val().trigger("change") は不可。
            // setValue() が native change を発火し OnChangeJob（eventsetup）まで駆動する（apply 側と統一）。
            if (jobSelect.tomselect) {
                jobSelect.tomselect.setValue(preDetectedJob.jobId);
            } else {
                jobSelect.value = preDetectedJob.jobId;
                jobSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }
            await new Promise(r => setTimeout(r, 300));
        }
        aiLog(`[武器フィルタ] jobs フィールドによる ${preDetectedJob.jobName} 専用武器チェックを適用`);
    }
    lastAllowedJobName = allowedJobName; // buildApplyPreviewText で使用

    // 常に現在の装備を取得（セット効果シナジーボーナス・カードLLM選択に使用）
    const currentEquipNames = readCurrentEquipNames();
    const currentEquipGrams = currentEquipNames.length ? toBigrams(currentEquipNames.join(" ")) : null;
    if (currentEquipNames.length > 0) aiLog(`[現在の装備] ${currentEquipNames.join(", ")}`);
    // 既装備のセット効果パートナー名を収集（カード候補の強制補填に使用）
    const synergyPartnerNamesFromEquip = new Set();
    for (const name of currentEquipNames) {
        const equipItem = itemNameMap.get(name);
        if (!equipItem) continue;
        for (const p of extractSynergyPartnerNames(equipItem.synergy_text || equipItem.description || "")) {
            synergyPartnerNamesFromEquip.add(p);
        }
    }
    if (synergyPartnerNamesFromEquip.size > 0) aiLog(`[セット効果パートナー] ${[...synergyPartnerNamesFromEquip].join(", ")}`);
    // 「今の装備」「アップグレード」等のキーワードがある場合、現在の装備名をクエリに付加して
    // RAG が現在のスロットと近いアイテムを返しやすくする
    let ragQuery = userQuery;
    const CURRENT_EQUIP_KEYWORDS = /今の装備|現在の装備|アップグレード|強化|更新|入れ替え/;
    if (CURRENT_EQUIP_KEYWORDS.test(userQuery) && currentEquipNames.length > 0) {
        ragQuery = `${userQuery} ${currentEquipNames.join(" ")}`;
        aiLog(`[現在の装備付加] ${currentEquipNames.join(", ")}`);
    }
    // ジョブ名もクエリに付加（ジョブ固有装備のスコアを上げる）
    if (allowedJobName && !userQuery.includes(allowedJobName)) {
        ragQuery = `${allowedJobName} ${ragQuery}`;
    }

    // 「より強い」「最強」「おすすめ」等のクエリはジョブ固有ステータスキーワードで補強する
    const STRONG_RE = /より強|最強|おすすめ|強い|強化したい|最高|最適|ビルド|火力アップ|メインビルド|汎用ビルド/;
    if (STRONG_RE.test(userQuery) && allowedJobName && JOB_STAT_KEYWORDS[allowedJobName]) {
        ragQuery = `${ragQuery} ${JOB_STAT_KEYWORDS[allowedJobName]}`;
        aiLog(`[ステータスキーワード補強] ${allowedJobName}: ${JOB_STAT_KEYWORDS[allowedJobName]}`);
    }

    // ロード済みLLMでクエリを拡張（検索キーワード抽出）
    // 「最強」等のクエリは JOB_STAT_KEYWORDS 補強済みのため LLM 拡張をスキップ（無関係語混入防止）
    const llmExpansion = STRONG_RE.test(userQuery) ? null : await expandQueryWithLLM(userQuery, allowedJobName);
    if (llmExpansion) {
        ragQuery = `${ragQuery} ${llmExpansion}`;
    }

    // エンチャント関連クエリの場合はエンチャントを多めに返す
    // またジョブ名（長い名前）を含むとエンチャントのbigram検索が汚染されるため、
    // エンチャント専用クエリではジョブ名を取り除いたクエリを使う
    const ENCHANT_QUERY_RE = /エンチャント|強化スロット|刻印|エンチャ/;
    const isEnchantQuery = ENCHANT_QUERY_RE.test(userQuery);
    const topPerSlot = isEnchantQuery ? RAG_ENCHANT_TOP_PER_SLOT : RAG_TOP_PER_SLOT;
    const maxTotal   = isEnchantQuery ? RAG_ENCHANT_MAX_TOTAL    : RAG_MAX_TOTAL;
    let finalRagQuery = ragQuery;
    if (isEnchantQuery && allowedJobName) {
        // ジョブ名をクエリから除去してエンチャント検索の精度を上げる
        finalRagQuery = ragQuery.replace(allowedJobName, "").trim();
        aiLog(`[エンチャント特化検索] topPerSlot=${RAG_ENCHANT_TOP_PER_SLOT} maxTotal=${RAG_ENCHANT_MAX_TOTAL} クエリ: ${finalRagQuery}`);
    }

    // 予算フィルタ: クエリから予算を解析して price 超過アイテムを除外
    const budget = extractBudget(userQuery);
    if (budget !== null) aiLog(`[予算フィルタ] 上限: ${(budget / 1e8).toFixed(2)}億z`);

    // 最強・おすすめクエリ判定（Phase1のminReqLvおよびDOMスキップに使用）
    const isMaxStrengthQuery = STRONG_RE.test(userQuery);
    if (isMaxStrengthQuery) aiLog(`[最強クエリ] DOM レベルチェックをスキップ（高レベルアイテムを候補に含める）`);

    // Phase 0: カード↔エンチャントシナジーを先にスコアリング
    // → 強いペアから逆引きした装備を Phase1 RAG に注入する「シナジー優先フロー」の起点
    let topCardEnchSyns = [];
    const synPriorityCardNames = new Set();
    if (allowedJobName && JOB_STAT_KEYWORDS[allowedJobName]) {
        topCardEnchSyns = discoverTopCardEnchantSynergies(JOB_STAT_KEYWORDS[allowedJobName], 8, allowedJobName);
        for (const syn of topCardEnchSyns) synPriorityCardNames.add(syn.cardName);
        if (topCardEnchSyns.length > 0) {
            aiLog(`[Phase0 カード↔エンチャシナジー top${topCardEnchSyns.length}] ` +
                topCardEnchSyns.slice(0, 4).map(s =>
                    `${s.cardItem.displayname}+${s.enchItem.displayname}(${s.score.toFixed(2)})` +
                    (s.enchEquips.length ? `→装備${s.enchEquips.length}件` : "")
                ).join(", ") + " …");
        }
    }

    // Phase 1: 装備のみ提案（エンチャント・カードを除外）
    // 最強クエリでは要求レベル120未満の装備を除外
    // ヘヴンリーオーダー(reqLv=100) < 120 → 除外。要求レベルテキストなし(reqLv=0) < 120 → 除外。
    const minReqLv = isMaxStrengthQuery ? 120 : 0;
    const equipResultsRaw = searchSimilarItemsDiversified(finalRagQuery, topPerSlot, maxTotal, allowedJobName, false, minReqLv, currentEquipGrams);

    // シナジー優先フロー: ジョブ向け強力シナジーペアをRAG候補に強制追加
    // （RAGスコアが低くてもシナジーが強い装備ペアを候補に昇格させる）
    let topSynSets = [];
    if (allowedJobName && JOB_STAT_KEYWORDS[allowedJobName]) {
        topSynSets = discoverTopSynergySetsForJob(JOB_STAT_KEYWORDS[allowedJobName], 12, allowedJobName);
        if (topSynSets.length > 0) {
            aiLog(`[シナジー優先] top-${topSynSets.length}ペア: ${topSynSets.slice(0, 3).map(s => `${s.itemA.displayname}+${s.itemB.displayname}(${s.score.toFixed(2)})`).join(", ")} …`);
            const existingNames = new Set(equipResultsRaw.map(r => r.item.displayname));
            for (const syn of topSynSets) {
                for (const synItem of [syn.itemA, syn.itemB]) {
                    if (existingNames.has(synItem.displayname)) continue;
                    if (synItem.jobs && synItem.jobs.length > 0
                        && !synItem.jobs.includes("全ての職業")
                        // 「マジシャン系」等「～系」ジョブはDOMフィルタに委こんで強制除外しない
                        && !synItem.jobs.some(j => j.endsWith("系") || j.includes("を除く全ての職業"))
                        && !(allowedJobName && synItem.jobs.includes(allowedJobName))) continue;
                    if (budget !== null && synItem.price && synItem.price > budget) continue;
                    const synScore = syn.score + 0.25;
                    equipResultsRaw.push({ score: synScore, contentScore: synScore, item: synItem });
                    existingNames.add(synItem.displayname);
                    aiLog(`[シナジー優先追加] ${synItem.displayname} (score=${synScore.toFixed(2)}, ペア: ${synItem === syn.itemA ? syn.itemB.displayname : syn.itemA.displayname})`);
                }
            }
            equipResultsRaw.sort((a, b) => b.score - a.score);
        }
    }

    // Phase 0 逆引き装備注入: カード↔エンチャントシナジーから逆引きした装備を強制追加
    // enchantEquipSynergyIndex[enchant] = そのエンチャントを synergy_text で参照する装備
    if (topCardEnchSyns.length > 0) {
        const existingEquipNames = new Set(equipResultsRaw.map(r => r.item.displayname));
        // conflictIndex: topカード↔エンチャントペアのいずれかとネガティブシナジーを持つ装備名
        const conflictEquipNames = new Set();
        if (enchantEquipConflictIndex) {
            for (const syn of topCardEnchSyns) {
                for (const eq of (enchantEquipConflictIndex.get(syn.enchName) || [])) {
                    conflictEquipNames.add(eq.displayname);
                }
            }
        }
        const equipSynCount = topCardEnchSyns[0]?.equipSynCount || new Map();
        for (const syn of topCardEnchSyns) {
            for (const anchEq of syn.enchEquips) {
                if (existingEquipNames.has(anchEq.displayname)) continue;
                if (conflictEquipNames.has(anchEq.displayname)) {
                    aiLog(`[Phase0スキップ] ${anchEq.displayname}: ${syn.enchName}とのコンフリクト装備`);
                    continue;
                }
                // Fix Phase0-job: 4次職グループ（アーリースカイ等）もPhase0注入対象に含める。
                // 旧コードはanchEq.jobs.includes(allowedJobName)のみチェックしていたため
                // jobs=["4次職","拡張4次職"]のアーリースカイがEMのPhase0から除外されていた問題を修正。
                if (anchEq.jobs && anchEq.jobs.length > 0 && !anchEq.jobs.includes("全ての職業")) {
                    const _p0JobTags = JOB_CLASS_TAGS[allowedJobName] || new Set();
                    const _p0JobOk = (allowedJobName && anchEq.jobs.includes(allowedJobName))
                        || anchEq.jobs.some(j => _p0JobTags.has(j));
                    if (!_p0JobOk) continue;
                }
                if (budget !== null && anchEq.price && anchEq.price > budget) continue;
                if (isMaxStrengthQuery) {
                    const anchReqLv = parseRequiredLevel(anchEq.description || '');
                    // reqLv が明示されていて minReqLv/2 未満の装備のみ除外（高レベル不明はスルー）
                    if (anchReqLv > 0 && anchReqLv < minReqLv / 2) continue;
                }
                // 複数のエンチャントシナジーを持つ装備にボーナス
                const multiBonus = ((equipSynCount.get(anchEq.displayname) || 1) - 1) * 0.15;
                // Fix G: Phase0注入スコアを+0.50に増量（旧0.30）。
                // 「全ての職業」のシナジー装備（スターリースカイ等）がjobBonus(+0.80)を持つ
                // 4次職向け装備（セレスティアルブーツ等）に負けてしまう問題を緩和。
                // Phase0注入はEM対応装備のみ通過しているため副作用リスクは低い。
                const injScore = syn.score + 0.50 + multiBonus;
                equipResultsRaw.push({ score: injScore, contentScore: injScore, item: anchEq });
                existingEquipNames.add(anchEq.displayname);
                aiLog(`[Phase0→装備注入] ${anchEq.displayname}` +
                    ` (${syn.cardItem.displayname}+${syn.enchItem.displayname}チェーン` +
                    `, synCount=${equipSynCount.get(anchEq.displayname)||1}, score=${injScore.toFixed(2)})`);
            }
        }
        equipResultsRaw.sort((a, b) => b.score - a.score);
    }

    // Step1: ジョブ専用ボーナスのみ先に適用（シナジーボーナスはjobフィルタ後に計算）
    // ※シナジーグループボーナスをjobフィルタ前に計算するとEM装備不可のグレース系が
    //   ノブレスオブリージュとシナジーパートナーとして加点し、フィルタ後も不当に高スコアが残る問題を防ぐ
    const preJobBoosted = equipResultsRaw.map(r => {
        let score = r.score;
        // ジョブ専用アイテムボーナス: 現在のジョブに専用なアイテム（jobs=["ジョブ名"]等、"全ての職業"を一切含まない）は大幅アップ
        // 例: ティルナノーグ(jobs=["EM"])がグレースサイキックローブ(全職業+シナジーブースト)に負けないようにする
        if (allowedJobName && r.item.jobs && r.item.jobs.length > 0) {
            const hasCurrentJob = r.item.jobs.includes(allowedJobName);
            const hasAllJobs = r.item.jobs.includes("全ての職業");
            const has4th = r.item.jobs.includes("4次職") || r.item.jobs.includes("拡張4次職");
            // 4次職グループアイテム（jobs=["4次職","拡張4次職"]等）への追加判定:
            // JOB_CLASS_TAGS で現在ジョブが "4次職" タグを持つ場合、4次職共通アイテムも jobBonus 対象とする。
            // 例: コンセクレイト・フィデス・モニーレ(4次職) は EM(4次職タグ有) から見て専用アイテム扱い。
            const currentJobTags = JOB_CLASS_TAGS[allowedJobName] || new Set();
            const currentJobIs4th = currentJobTags.has("4次職") || currentJobTags.has("拡張4次職");
            if ((hasCurrentJob || (has4th && currentJobIs4th)) && !hasAllJobs) {
                // 職業完全一致アイテム（EM専用等）は+1.50、4次職共通アイテムは+0.80
                const jobBonus = (hasCurrentJob && !has4th) ? 1.50 : 0.80;
                // isAllSetConditionSynergy が正しく機能（|$ で文字列末尾マッチ）しているため、
                // synergy_text が全てセット条件のアイテム（ODR 等）の synBonus は 0.3 倍に抑制される。
                // contentScore + jobBonus による上書きは不要（ragScore + jobBonus でも ODR より
                // エコーズが高く正しく選ばれる）。4次職グループも全て score += jobBonus で統一。
                score += jobBonus;
                aiLog(`[ジョブ専用ボーナス] ${r.item.displayname} +${jobBonus.toFixed(2)} (${r.item.jobs.join(",")})`)
            }
        }
        return { ...r, score };
    }).sort((a, b) => b.score - a.score);

    // 予算フィルタ適用（price が設定されていて予算超過のものを除外、price=0/null は売買不能として残す）
    const budgetFiltered = budget !== null
        ? preJobBoosted.filter(r => !r.item.price || r.item.price <= budget)
        : preJobBoosted;
    const budgetRemovedCount = preJobBoosted.length - budgetFiltered.length;
    if (budgetRemovedCount > 0) aiLog(`[予算フィルタ] ${budgetRemovedCount} 件を除外（予算超過）`);
    // hmitemlist.js の IsMatchJobRestrict と同等の DOM 確認で、現在のジョブで装備できないものを除外
    // 最強・おすすめクエリでは BaseLV 不足による高レベルアイテム除外を回避する（skipDomCheck=true）
    const jobFiltered = filterEquippableByCurrentJob(budgetFiltered, isMaxStrengthQuery);
    const filteredCount = budgetFiltered.length - jobFiltered.length;
    if (filteredCount > 0) aiLog(`[ジョブ装備フィルタ] ${filteredCount} 件を除外（装備不可）`);

    // Step2: jobフィルタ後の候補同士でのみシナジーグループボーナスを計算
    // （EM装備不可グレース系がノブレスオブリージュのシナジーパートナーに加算されてしまう問題を防ぐ）
    const jobFilteredNames = new Set(jobFiltered.map(r => r.item.displayname));
    const synergyGroupBoosted = jobFiltered.map(r => {
        const partners = extractSynergyPartnerNames(r.item.synergy_text || r.item.description || "");
        const inPool = partners.filter(p => jobFilteredNames.has(p));
        if (inPool.length > 0) {
            const boost = inPool.length * SYNERGY_WEIGHT * 0.5;
            aiLog(`[シナジーグループ] ${r.item.displayname} +${boost.toFixed(2)} (${inPool.join(", ")}と相互候補)`);
            return { ...r, score: r.score + boost };
        }
        return r;
    }).sort((a, b) => b.score - a.score);

    // アクセサリーは2枠（左右）あるため最大2件まで許容、他スロットは1件（上部定数 MULTI_SLOT_MAX を参照）
    const slotCount = {};
    const accTypeCount = {}; // アクセサリー(1)/(2) サブ種別カウント（各1枠まで）
    const equipResults = synergyGroupBoosted.filter(r => {
        const slot = slotGroup(r.item.type || "", r.item.position);
        const max = MULTI_SLOT_MAX[slot] || 1;
        // アクセサリー(1)/(2) 限定装備は同一サブスロット1枠のみ許容
        // （例: 星座の印章(集中) + 星座の印章(魔力) がどちらも アクセサリー(1) の場合、高スコア1件のみ選択）
        const itemType = r.item.type || "";
        if (itemType === "アクセサリー(1)" || itemType === "アクセサリー(2)") {
            accTypeCount[itemType] = (accTypeCount[itemType] || 0) + 1;
            if (accTypeCount[itemType] > 1) return false;
            // アクセサリー(1)/(2) も slotCount に加算して合計2件上限を守る
            // （searchSimilarItemsDiversified で枠別最適割り当て済みのため、
            //   ここに来るのは最大 アクセサリー(1)×1 + アクセサリー(2)×1 = 2件）
        }
        slotCount[slot] = (slotCount[slot] || 0) + 1;
        return slotCount[slot] <= max;
    });

    // 空きスロットをフォールバック検索で補填（全スロットを均等に埋める）
    for (const slot of ALL_EQUIP_SLOTS) {
        const maxForSlot = MULTI_SLOT_MAX[slot] || 1;
        const needed = maxForSlot - (slotCount[slot] || 0);
        for (let i = 0; i < needed; i++) {
            // 既に提案済みのアイテムを除外して次の候補を探す
            const excludeNames = new Set(
                equipResults
                    .filter(r => slotGroup(r.item.type || "", r.item.position) === slot)
                    .map(r => r.item.displayname)
            );
            // Phase1で選ばれた装備名をシナジー補強クエリに使う（セット効果記述のある装備を優先）
            const selectedItemNames = equipResults.map(r => r.item.displayname).join(" ");
            // 装備不可アイテムが返ってきた場合は除外して再試行（最大5回）
            let fb = null;
            for (let retry = 0; retry < 5; retry++) {
                // アクセサリーフォールバック: 既に確定済みの(1)/(2)サブ種別を除外して残りのサブ枠を探す
            const excludeTypes = new Set(
                ["アクセサリー(1)", "アクセサリー(2)"].filter(t => (accTypeCount[t] || 0) >= 1)
            );
            const candidate = searchFallbackForSlot(slot, allowedJobName, budget, excludeNames, selectedItemNames, excludeTypes.size ? excludeTypes : null, minReqLv);
                if (!candidate) break;
                const equippable = filterEquippableByCurrentJob([candidate], isMaxStrengthQuery);
                if (equippable.length > 0) { fb = candidate; break; }
                aiLog(`[フォールバック補填] ${candidate.item.displayname} は装備不可、次候補を探索`);
                excludeNames.add(candidate.item.displayname);
            }
            if (fb) {
                equipResults.push(fb);
                slotCount[slot] = (slotCount[slot] || 0) + 1;
                aiLog(`[フォールバック補填] ${slot}(${slotCount[slot]}) ← ${fb.item.displayname}`);
            } else {
                aiLog(`[フォールバック補填] ${slot}(${(slotCount[slot] || 0) + 1}): 条件に合うアイテムなし`);
                break;
            }
        }
    }

    aiLog(`RAG 検索完了: ${equipResults.length} 件ヒット（装備のみ、ジョブ制限フィルタ済み）`);

    // シナジー補完ステップ:
    // topSynSetsのペアで「片方のみが最終ビルドに入っている」場合、もう片方を強制追加または置換する。
    // これにより「セレスティアルブーツ・セレスティアルピース」のようなペアがどちらも最終ビルドに含まれることを保証する。
    if (topSynSets.length > 0) {
        const resultNamesForSyn = new Set(equipResults.map(r => r.item.displayname));
        const slotOf = r => slotGroup(r.item.type || "", r.item.position);
        // 2パス: 1パス目の補完が2パス目のシナジーを解決する連鎖シナジーに対応
        for (let pass = 0; pass < 2; pass++) {
            for (const syn of topSynSets) {
                const hasA = resultNamesForSyn.has(syn.itemA.displayname);
                const hasB = resultNamesForSyn.has(syn.itemB.displayname);
                if (hasA && hasB) continue; // 既にペア完成
                if (!hasA && !hasB) continue; // 両方ない → スキップ（単一アイテムの強制追加はビルド失敗のリスクがある）
                const missing  = hasA ? syn.itemB : syn.itemA;
                const present  = hasA ? syn.itemA : syn.itemB;
                const missingSlot = hasA ? syn.slotB : syn.slotA;
                // ジョブ・予算チェック
                if (missing.jobs && missing.jobs.length > 0
                    && !missing.jobs.includes("全ての職業")
                    && !(allowedJobName && missing.jobs.includes(allowedJobName))) continue;
                if (budget !== null && missing.price && missing.price > budget) continue;
                const slotOccupants = equipResults.filter(r => slotOf(r) === missingSlot);
                if (slotOccupants.length === 0) {
                    // スロット未使用 → 直接追加
                    const maxForSlot = MULTI_SLOT_MAX[missingSlot] || 1;
                    if ((slotCount[missingSlot] || 0) < maxForSlot) {
                        const synScore = syn.score + 0.25;
                        equipResults.push({ score: synScore, contentScore: synScore, item: missing });
                        slotCount[missingSlot] = (slotCount[missingSlot] || 0) + 1;
                        resultNamesForSyn.add(missing.displayname);
                        aiLog(`[シナジー補完] ${missingSlot}に ${missing.displayname} 追加（${present.displayname}とのペア完成）`);
                    }
                } else {
                    // スロット占有済み → 現在の占有アイテムに自身のアクティブシナジーがない場合のみ置換
                    const occupant = slotOccupants[0];
                    const occupantPartners = extractSynergyPartnerNames(
                        occupant.item.synergy_text || occupant.item.description || ""
                    );
                    const occupantActiveSyn = occupantPartners.some(p => resultNamesForSyn.has(p));
                    if (!occupantActiveSyn) {
                        const idx = equipResults.indexOf(occupant);
                        const synScore = syn.score + 0.25;
                        equipResults[idx] = { score: synScore, contentScore: synScore, item: missing };
                        resultNamesForSyn.delete(occupant.item.displayname);
                        resultNamesForSyn.add(missing.displayname);
                        aiLog(`[シナジー補完] ${missingSlot}: ${occupant.item.displayname} → ${missing.displayname}（${present.displayname}とのシナジーペア完成）`);
                    } else {
                        aiLog(`[シナジー補完スキップ] ${missingSlot}: ${occupant.item.displayname} は別シナジー有効（${occupantPartners.find(p => resultNamesForSyn.has(p))}）、${missing.displayname}との置換は不可`);
                    }
                }
            }
        }
    }

    // Phase 2: 計算機内部データから実際に差せるエンチャントを取得してアップ
    // 最強クエリ時はJOB_STAT_KEYWORDSでenchantQueryを補強してEM向エンチャントを優先
    const enchantQuery = isEnchantQuery
        ? finalRagQuery
        : (isMaxStrengthQuery && allowedJobName && JOB_STAT_KEYWORDS[allowedJobName])
            ? `${userQuery} ${JOB_STAT_KEYWORDS[allowedJobName]} 固定詠唱時間`
            : userQuery;
    const enchantResults = fetchEnchantSuggestionsForEquips(equipResults, enchantQuery, allowedJobName,
        new Set(equipResults.filter(r => r.item.type === "カード" && !r.item.is_enchant).map(r => r.item.displayname)));
    if (enchantResults.length) {
        aiLog(`[エンチャントPhase2] ${enchantResults.length} 件取得: ${enchantResults.map(r => `${r.item.displayname}(→${r.for_equip}, CARD_${r.card_slot_index}, score=${r.score.toFixed(3)})`).join(", ")}`);
    } else {
        aiLog("[エンチャントPhase2] 計算機データ操作が未利用のためエンチャント提案なし");
    }

    const results = [...equipResults, ...enchantResults];
    aiLog(`RAG 検索完了: 合計 ${results.length} 件（装備+エンチャント）`);

    // 封印されたカード除去: LLMフィルタに関わらず常時適用
    // 「封印された○○」と「○○」が両方候補にある場合、効果の弱い封印版を除外して通常版を優先する
    // 通常版がRAG結果に存在しない場合は items(全データ)から検索して置換する
    const rawCardNamesSet = new Set(
        results.filter(r => r.item.type === "カード" && !r.item.is_enchant).map(r => r.item.displayname)
    );
    const nonSealedRawNames = new Set([...rawCardNamesSet].filter(n => !n.startsWith("封印された")));
    // 通常版が存在しない場合に items から探して注入（封印版のみ候補にある状況を解消）
    const sealedOnlyNames = [...rawCardNamesSet].filter(n =>
        n.startsWith("封印された") && !nonSealedRawNames.has(n.replace(/^封印された/, ""))
    );
    const extraNonSealed = [];
    for (const sealedName of sealedOnlyNames) {
        const baseName = sealedName.replace(/^封印された/, "");
        const found = items.find(it => it.displayname === baseName && it.type === "カード" && !it.is_enchant);
        if (found) {
            // RAG結果から封印版のスコアを引き継いで通常版として追加
            const sealedEntry = results.find(r => r.item.displayname === sealedName);
            extraNonSealed.push({ score: sealedEntry?.score ?? 0.1, item: found });
            aiLog(`[封印カード置換] ${sealedName} → ${baseName} (items から取得)`);
        }
    }
    const resultsWithSwap = extraNonSealed.length ? [...results, ...extraNonSealed] : results;
    // 非封印版セットを再構築（追加分を含む）
    const nonSealedFinal = new Set(
        resultsWithSwap.filter(r => r.item.type === "カード" && !r.item.is_enchant && !r.item.displayname.startsWith("封印された")).map(r => r.item.displayname)
    );
    const sealedDeduped = resultsWithSwap.filter(r => {
        if (r.item.type === "カード" && !r.item.is_enchant && r.item.displayname.startsWith("封印された")) {
            const baseName = r.item.displayname.replace(/^封印された/, "");
            return !nonSealedFinal.has(baseName); // 通常版が存在するなら封印版を除外
        }
        return true;
    });

    // LLMによるカード候補の絞り込み（カード候補が3件以上かつLLMロード済みの場合のみ）
    let finalResults = sealedDeduped;
    const cardCandidates = sealedDeduped.filter(r => r.item.type === "カード" && !r.item.is_enchant);
    // カード用anti-keywordバイグラム（LLM失敗時のフォールバックフィルタ用）
    const antiGramsCard = (allowedJobName && JOB_ANTI_KEYWORDS[allowedJobName])
        ? toBigrams(JOB_ANTI_KEYWORDS[allowedJobName]) : null;
    // 既装備のセット効果パートナー（カード）がRAG候補に入っていなければ強制補填
    if (synergyPartnerNamesFromEquip.size > 0) {
        for (const partnerName of synergyPartnerNamesFromEquip) {
            const partnerItem = itemNameMap.get(partnerName);
            if (!partnerItem || partnerItem.type !== "カード" || partnerItem.is_enchant) continue;
            if (cardCandidates.some(r => r.item.displayname === partnerName)) continue;
            const synScore = MIN_CARD_SCORE + 0.15;
            cardCandidates.push({ score: synScore, contentScore: synScore, item: partnerItem });
            aiLog(`[シナジー補填] ${partnerName} を既装備とのセット効果カード候補として追加`);
        }
    }
    // Phase 0 シナジーカード強制追加:
    // discoverTopCardEnchantSynergies で選ばれたカードが MIN_CARD_SCORE 未満でRAG候補に入っていない場合も
    // 強制的にカードプールに追加する（エンチャントとの具体的なシナジーを持つカードを確実に選択対象にする）
    if (synPriorityCardNames.size > 0) {
        const existingCardNames = new Set(cardCandidates.map(r => r.item.displayname));
        for (const syn of topCardEnchSyns) {
            if (existingCardNames.has(syn.cardName)) continue;
            // 封印カードは強制追加対象から除外
            if (syn.cardItem.displayname.startsWith('封印された')) continue;
            const injScore = Math.max(syn.score + 0.30, MIN_CARD_SCORE + 0.10);
            cardCandidates.push({ score: injScore, contentScore: injScore, item: syn.cardItem });
            existingCardNames.add(syn.cardName);
            aiLog(`[Phase0シナジーカード追加] ${syn.cardName} (${syn.enchName}とのペア, score=${injScore.toFixed(2)})`);
        }
    }
    if (cardCandidates.length > 2 && chatModel && allowedJobName) {
        const llmSelectedNames = await filterCardsWithLLM(cardCandidates, allowedJobName, currentEquipNames);
        if (llmSelectedNames && llmSelectedNames.length > 0) {
            let filteredCards = cardCandidates.filter(r =>
                llmSelectedNames.some(fn => r.item.displayname === fn ||
                    r.item.displayname.startsWith(fn) ||
                    fn.startsWith(r.item.displayname.replace(/カード$/, "")))
            );
            // LLM選択後も anti-keyword でフィルタ（LLMが物理専用カードを誤選択した場合の安全網）
            if (antiGramsCard && antiGramsCard.size > 0) {
                const beforeAnti = filteredCards.length;
                filteredCards = filteredCards.filter(r => {
                    // displayname除外: カード名のカタカナが anti-keyword と偽陽性マッチするのを防ぐ
                    const tG = toBigrams(extractNonSetText(r.item.description || ""));
                    let anti = 0;
                    for (const g of antiGramsCard) if (tG.has(g)) anti++;
                    return (anti / antiGramsCard.size) <= 0.08;
                });
                if (filteredCards.length < beforeAnti) aiLog(`[LLMカードフィルタ] anti-keyword除外: ${beforeAnti}→${filteredCards.length}件`);
            }
            if (filteredCards.length > 0) {
                // LLM選択数が少なすぎる場合（2件以下）はRAGスコア上位で補完（最大4件まで）
                // LLMが保守的すぎる・出力が短い場合でも適切な数のカードを提案する
                if (filteredCards.length < 3) {
                    const alreadyNames = new Set(filteredCards.map(r => r.item.displayname));
                    const supplement = cardCandidates
                        .filter(r => !alreadyNames.has(r.item.displayname))
                        .filter(r => {
                            // 補完候補も anti-keyword チェック（displayname除外でカード名の偽陽性を防ぐ）
                            if (!antiGramsCard || !antiGramsCard.size) return true;
                            const tG = toBigrams(extractNonSetText(r.item.description || ""));
                            let anti = 0;
                            for (const g of antiGramsCard) if (tG.has(g)) anti++;
                            return (anti / antiGramsCard.size) <= 0.08;
                        })
                        .slice(0, 4 - filteredCards.length);
                    if (supplement.length > 0) {
                        aiLog(`[LLMカードフィルタ] 選択数不足(${filteredCards.length}件)→RAGスコア上位で${supplement.length}件補完`);
                        filteredCards = [...filteredCards, ...supplement];
                    }
                }
                // LLMフィルタ済みカードで最終結果を更新（封印dedup済みbaseを使用）
                aiLog(`[LLMカードフィルタ] ${cardCandidates.length}件 → LLM選択${filteredCards.length}件`);
                const nonCards0 = sealedDeduped.filter(r => !(r.item.type === "カード" && !r.item.is_enchant));
                finalResults = [...nonCards0, ...filteredCards];
            }
        } else if (antiGramsCard && antiGramsCard.size && cardCandidates.length > 0) {
            // LLM失敗フォールバック: anti-keyword RAGフィルタで物理専用カードを除外
            const ragFilteredCards = cardCandidates.filter(r => {
                // displayname除外: カード名のカタカナが anti-keyword と偽陽性マッチするのを防ぐ
                const tG = toBigrams(extractNonSetText(r.item.description || ""));
                let anti = 0;
                for (const g of antiGramsCard) if (tG.has(g)) anti++;
                return (anti / antiGramsCard.size) <= 0.08;
            });
            if (ragFilteredCards.length > 0) {
                aiLog(`[RAGカードフィルタ] LLM失敗→RAGフォールバック: ${cardCandidates.length}件 → ${ragFilteredCards.length}件`);
                const nonCards1 = sealedDeduped.filter(r => !(r.item.type === "カード" && !r.item.is_enchant));
                finalResults = [...nonCards1, ...ragFilteredCards];
            }
        }
    }

    // スロット別カード選択: 提案装備の各スロットに1枚ずつ最適カードを割り当てる
    // LLM/RAGフィルタ結果を「品質プール」として優先し、カバーできないスロットはcardCandidatesで補填
    {
        const finalCards = finalResults.filter(r => r.item.type === "カード" && !r.item.is_enchant);
        if (finalCards.length > 0 && equipResults.length > 0) {
            const allEquippedForCards = [
                ...currentEquipNames,
                ...equipResults.map(r => r.item.displayname)
            ];
            const jobKW = allowedJobName && JOB_STAT_BASE_KEYWORDS[allowedJobName]
                ? JOB_STAT_BASE_KEYWORDS[allowedJobName]
                : (allowedJobName && JOB_STAT_KEYWORDS[allowedJobName] ? JOB_STAT_KEYWORDS[allowedJobName] : null);
            const proposedEnchantNamesSet = new Set(enchantResults.map(r => r.item.displayname));
            const perSlotCards = selectBestCardsPerSlot(finalCards, cardCandidates, equipResults, allEquippedForCards, jobKW, proposedEnchantNamesSet);
            const nonCardsF = finalResults.filter(r => !(r.item.type === "カード" && !r.item.is_enchant));
            finalResults = [...nonCardsF, ...perSlotCards];
            aiLog(`[スロット別カード最終] ${perSlotCards.map(r => r.item.displayname).join(", ")}`);
        }
    }

    // 3段シナジーチェーン補完:
    // 選択済みカード↔エンチャントのペアを検査し、両方がビルド内にあるのにリンクアイテムがない場合に補完
    const chainAdded = completeSynergyChains(
        finalResults.filter(r => r.item.type === "カード" && !r.item.is_enchant),
        finalResults.filter(r => r.item.is_enchant),
        equipResults,
        allowedJobName,
        budget
    );
    if (chainAdded.length > 0) {
        // 補完装備でスロット占有を入れ替え
        const finalEquipNames = new Set(equipResults.map(r => r.item.displayname));
        for (const added of chainAdded) {
            const addedSlot = slotGroup(added.item.type||"", added.item.position);
            const idx = equipResults.findIndex(r => slotGroup(r.item.type||"",r.item.position) === addedSlot);
            if (idx >= 0) {
                aiLog(`[チェーン入替反映] ${equipResults[idx].item.displayname} → ${added.item.displayname}`);
                equipResults[idx] = added;
            } else {
                equipResults.push(added);
            }
        }
        // finalResultsも更新
        const finalEquipNamesUpd = new Set(equipResults.map(r => r.item.displayname));
        const nonEquipFinal = finalResults.filter(r =>
            r.item.type === "カード" || r.item.is_enchant
        );
        finalResults = [...equipResults, ...nonEquipFinal];
        // 3段チェーン補完で置換された装備へのエンチャント提案を除外
        // （例: ティルナノーグが置換された後もそのエンチャントが残る問題を防ぐ）
        finalResults = finalResults.filter(r => {
            if (!r.item.is_enchant || !r.for_equip) return true;
            return finalEquipNamesUpd.has(r.for_equip);
        });
        aiLog(`[3段チェーン補完] ${chainAdded.length}件の装備を入れ替え`);
    }

    lastRagSuggestions = finalResults;
    aiLog("装備提案を生成中…");
    const baseList = buildFormattedAnswer(finalResults, preDetectedJob ? preDetectedJob.jobName : null);

    // 装備提案リストは JavaScript 生成結果をそのまま返す。
    // 小規模 LLM（1.5B〜3B）はリストを忠実に再現できず、日本語数値の改変・
    // 中国語混入・エントリの重複・切り捨てが発生するため経由しない。
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
function filterEquippableByCurrentJob(results, skipDomCheck = false) {
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
            if (window.ItemObjNew) {
                aiLog(`[ジョブフィルタ] ${r.item.displayname}: DB未収録のため除外`);
                return false; // ItemObjNew 読込済みだがDBに存在しない → 装備不可扱いで除外
            }
            aiLog(`[ジョブフィルタ] ${r.item.displayname}: ItemObjNew未ロードのためスキップ`);
            return true; // ItemObjNew 未ロード → 制限なし扱い
        }
        const canEquip = isEquippableByCurrentJob(gameId);
        if (!canEquip) {
            aiLog(`[ジョブ制限除外] ${r.item.displayname} は現在のジョブで装備不可 (gameId=${gameId})`);
            return false;
        }
        // IsMatchJobRestrict が通った場合でも、実際の DOM select の option に存在するか確認する。
        // calcx.html 側の独自フィルタ（装備レベル条件等）で option が絞られている場合の補完チェック。
        const itemType = r.item.type || "";
        const slot = slotGroup(itemType, r.item.position);
        // アクセサリー(1)はACCESSORY_1のみ、アクセサリー(2)はACCESSORY_2のみに存在するため厳密にチェック
        let objIds;
        if (itemType === "アクセサリー(1)") {
            objIds = ["OBJID_ACCESSORY_1"];
        } else if (itemType === "アクセサリー(2)") {
            objIds = ["OBJID_ACCESSORY_2"];
        } else if (ACCESSORY_TYPES.has(itemType)) {
            objIds = ["OBJID_ACCESSORY_1", "OBJID_ACCESSORY_2"];
        } else {
            objIds = [SLOT_TO_OBJID[slot]].filter(Boolean);
        }
        // 武器スロットは OnChangeArmsTypeRight で options が動的に切り替わるため DOM チェックをスキップ。
        // skipDomCheck=true（最強クエリ等）の場合は BaseLV 不足による除外を回避し、
        // エンドゲームアイテムを候補に含めるため DOM オプションチェックをスキップする。
        if (!skipDomCheck && objIds.length > 0 && !objIds.includes("OBJID_ARMS_RIGHT")) {
            const existsInAny = objIds.some(objId => {
                const el = document.getElementById(objId);
                return el && Array.from(el.options).some(opt => opt.value === gameId);
            });
            if (!existsInAny) {
                aiLog(`[DOM装備不可] ${r.item.displayname} は現在のselectに存在しない (gameId=${gameId})`);
                return false;
            }
        }
        return true;
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
            // アクセサリー(1)→ACCESSORY_1、アクセサリー(2)→ACCESSORY_2に固定。汎用は空きスロットへ。
            if (type === "アクセサリー(1)") {
                objId = "OBJID_ACCESSORY_1";
            } else if (type === "アクセサリー(2)") {
                objId = "OBJID_ACCESSORY_2";
            } else {
                // 汎用アクセサリー：既反映済スロットをスキップして空きスロットへ
                objId = null;
                while (accessorySlotIndex < accessoryObjIds.length) {
                    const cand = accessoryObjIds[accessorySlotIndex++];
                    if (!appliedSlots.has(cand)) { objId = cand; break; }
                }
                if (!objId) continue;
            }
            if (appliedSlots.has(objId)) continue; // アクセサリー(1)/(2)固定割り当ての重複防止
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
        if (objId === "OBJID_ARMS_RIGHT" && window.ItemObjNew) {
            const itemData = window.ItemObjNew[parseInt(gameId)];
            if (itemData) {
                const kind = itemData[1]; // ITEM_DATA_INDEX_KIND = 1
                aiLog(`[武器タイプ変更] KIND=${kind} に設定して ${r.item.displayname} を装備可能にします`);
                // 武器タイプ select に change を発火。eventsetup の OnChangeArmsTypeRight が options を
                // 再構築し、INIT_TRIGGER 経由で Tom Select も再初期化される（dewindow: window 直呼び廃止）。
                const armsTypeSel = document.getElementById("OBJID_ARMS_TYPE_RIGHT");
                if (armsTypeSel) {
                    armsTypeSel.value = String(kind);
                    armsTypeSel.dispatchEvent(new Event("change", { bubbles: true }));
                }
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
        const appliedCardIds = new Set();       // 同一 cardId の重複装備防止（同一カードが複数スロットに入る問題）
        for (const r of enchantQueue) {
            // 対応する装備が実際に反映済みでない場合はスキップ
            // for_equip（装備名）優先、なければ for_equip_objid（OBJID）でフォールバック
            // __ALL__ カードは全スロット共通なので反映済みチェックをスキップ
            const forEquipReflected = r.for_equip
                ? appliedItemNames.has(r.for_equip)
                : (!r.for_equip_objid || r.for_equip_objid === "__ALL__"
                    ? true
                    : appliedSlots.has(r.for_equip_objid));
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
            // 同一 cardId の重複防止: カードは1枚しか存在しないため実際のゲームでは同一カードを複数装備に入れられない
            if (r.game_card_id !== null && appliedCardIds.has(r.game_card_id)) {
                aiLog(`[カード重複スキップ] ${r.item.displayname} (cardId=${r.game_card_id}) は既に別スロットに入れ済み`);
                continue;
            }
            const cardIdStr = String(r.game_card_id);
            const optExists = Array.from(cardSel.options).some(o => o.value === cardIdStr);
            if (!optExists) {
                aiLog(`[エンチャント非対応] ${r.item.displayname} → ${slotId} に該当オプションなし`);
                continue;
            }
            // Tom Select は jQuery 合成 change を観測しないため setValue() を使う（装備反映側と統一）
            if (cardSel.tomselect) {
                cardSel.tomselect.setValue(cardIdStr);
            } else {
                cardSel.value = cardIdStr;
                cardSel.dispatchEvent(new Event("change", { bubbles: true }));
            }
            appliedEnchantSlots.add(slotId);
            if (r.game_card_id !== null) appliedCardIds.add(r.game_card_id);
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
window.resetChatModel = () => { chatModel = null; llmLoading = false; loadedModelName = null; };
window.buildApplyPreviewText = buildApplyPreviewText;

// 「装備欄に反映する」ボタンを配線（dewindow: calcx-ai.html の旧 onclick="window.applyEquipmentSuggestions()" の置換）。
// calcx.html の eventsetup と同様に addEventListener で接続し、window 露出への依存を解消する。
document.getElementById("ai-apply")?.addEventListener("click", () => applyEquipmentSuggestions());
