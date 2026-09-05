#!/usr/bin/env node
/**
 * 職業×攻撃手段のセーブデータURLコーパスを生成する（テストオラクル拡張・Phase 0）。
 *
 * 背景: .claude/context/remaining-work.md 系「UI/ロジック分離」リファクタリング計画。
 * 既存の integration フィクスチャ（fixtures/sample-savedata-new.md / -old.md）は
 * 本番URLを手作業で集めた 14〜15件のみで、89職業中ごく一部しかカバーしていない。
 * 本スクリプトは実際にローカルの calcx.html を操作して「職業を変更 → セーブURLを出力」を
 * 全89職業分繰り返し、代表職業では追加でスキル攻撃手段も選択することで、
 * 職業依存の分岐（BuffOtherCategory.js の `if(41 <= n_A_JOB && n_A_JOB <= 43)` 等）を
 * 広くカバーするセーブデータURLコーパスを機械的に作る。
 *
 * これらはローカルで生成した自己無矛盾なURLであり、本番の実データではないため、
 * 既存の「本番 vs ローカル」比較フィクスチャ（sample-savedata-*.md）には混ぜない。
 * integration/job-corpus-snapshot.test.ts が読み込み、結果をローカルのゴールデンスナップショット
 * として固定する（ローカル内の自己回帰検出が目的。本番比較ではない）。
 *
 * Pass C（残件台帳 B-32）: Pass A/B は装備・ステータス・対象モンスターを設定しないため
 * 与ダメージ・DPSが大半0だった。5次職代表12職業に装備・合法配分ステータス・弱いモンスター
 * を設定し、実際に非ゼロの与ダメージ・詠唱時間を持つセーブデータを追加する。
 *
 * 実行: cd tests && node generate-job-corpus.mjs
 * 出力: tests/integration/fixtures/generated-job-corpus.md（コミット対象）
 *
 * 再生成が必要になるタイミング: 職業一覧・スキル一覧・セーブデータのエンコード形式が変わったとき。
 * 通常のリファクタリング作業では再生成不要（一度生成したURLをそのままゴールデンの入力として使い続ける）。
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { createReadStream, existsSync, writeFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const OUTPUT_PATH = join(__dirname, 'integration/fixtures/generated-job-corpus.md');

// helpers/objid-snapshot.ts の createStaticServer と同等（TS ヘルパーは vitest 経由でしか
// 読めないため、素の node で動くこのスクリプト用に最小構成でインライン化してある。
// ロジックを変えたら両方に反映すること）。
const CONTENT_TYPES = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml',
};
function createStaticServer(root) {
    return createServer((req, res) => {
        const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
        const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
        const filePath = join(root, safe);
        if (!filePath.startsWith(root) || !existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Not found: ${urlPath}`);
            return;
        }
        const ext = extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] ?? 'application/octet-stream' });
        createReadStream(filePath).pipe(res);
    });
}

// architecture.md の職業ツリー12系統から代表職を1つずつ選び、通常攻撃に加えて
// スキル攻撃手段（攻撃手段セレクトの2番目の option）も選んだURLを追加生成する対象。
// ラベルは job select の表示名と一致させる。
const SKILL_ATTACK_REPRESENTATIVES = new Set([
    'ルーンナイト',       // swordman
    'ウォーロック',       // magician
    'スナイパー',         // archer
    'ホワイトスミス',     // merchant
    'アサシンクロス',     // thief
    'ハイプリースト',     // acolyte
    'テコンキッド',       // taekwon
    '忍者',               // ninja
    'ガンスリンガー',     // gunslinger
    'ドルイド',           // druid
    'スーパーノービス',   // novice
    'サモナー',           // summoner
]);

// Pass C（残件台帳 B-32）: 装備・ステータス・対象モンスターを設定し、実際に非ゼロの
// 与ダメージ・詠唱時間を持つセーブデータを追加生成する。Pass A/B（既存101件）はダメージ
// 計算に必要な入力が空のままのため、job-corpus-snapshot.test.ts は詠唱時間・ディレイ・
// ASPD・命中/回避/クリ率・被ダメージの回帰は検出できても、与ダメージの大きさそのものの
// 回帰は検出できなかった（本番比較フィクスチャ17件のみが担っていた）。
// architecture.md の職業ツリー12系統の最上位（5次職）を対象に、通常攻撃/スキル攻撃の
// 2バリアントずつ生成する。既存の Pass A/B の生成ロジック・出力には一切触れず、末尾に
// 追記するのみ（ゴールデンの差分を純増にするため。B-29と同じ運用）。
const PASS_C_WEAK_MONSTERS = ['ポリン', 'ルナティック', 'ファブル', 'ポポリン', 'ドロップス', 'コンドル'];

// 職業アーキタイプ別のステータス配分の重み。コスト表自体はエンジン自身
// （hmjob.js の GetStatusTotalCost 等）を使うため、ここでは優先度の比率のみ持つ。
const PASS_C_STAT_WEIGHTS = {
    physical: { STR: 3, AGI: 1, VIT: 1, INT: 0, DEX: 2, LUK: 1 },
    magic:    { STR: 0, AGI: 1, VIT: 1, INT: 3, DEX: 2, LUK: 1 },
    ranged:   { STR: 1, AGI: 2, VIT: 1, INT: 0, DEX: 3, LUK: 1 },
};

// Pass B の代表12職業（中位職）とは重複しない、各系統最上位の職業。
const PASS_C_TARGET_JOBS = [
    ['ドラゴンナイト', 'physical'], ['アークメイジ', 'magic'], ['ウィンドホーク', 'ranged'],
    ['マイスター', 'physical'], ['シャドウクロス', 'ranged'], ['カーディナル', 'magic'],
    ['天帝', 'physical'], ['蜃気楼', 'ranged'], ['ナイトウォッチ', 'ranged'],
    ['アリテア', 'physical'], ['ハイパーノービス', 'physical'], ['スピリットハンドラー', 'magic'],
];

/**
 * 武器種別（素手以外の最後）→ 武器・防具・カード（各セレクトの最小 item ID）→
 * 精錬最大、の順に装備する。「装備なし」センチネルは選択前の値と一致するため、
 * それを除外することで自然に弾ける（実測確認済み。生の item ID をベタ書きしない）。
 */
async function equipGearForPassC(page) {
    await page.evaluate(() => {
        const armsType = document.getElementById('OBJID_ARMS_TYPE_RIGHT');
        if (armsType.options.length > 1) {
            const o = armsType.options[armsType.options.length - 1];
            armsType.value = o.value;
            armsType.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    await page.waitForTimeout(400);

    await page.evaluate(() => {
        const pickMinId = (id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const excludeValue = el.value; // 「装備なし」センチネルは常にこの初期値と一致する
            const candidates = Array.from(el.options)
                .map((o) => ({ value: o.value, text: o.text }))
                .filter((o) => o.value !== excludeValue && Number.isFinite(Number(o.value)) && Number(o.value) > 0)
                .sort((a, b) => Number(a.value) - Number(b.value));
            if (!candidates.length) return;
            const picked = candidates[0];
            if (el.tomselect) el.tomselect.setValue(picked.value);
            else { el.value = picked.value; el.dispatchEvent(new Event('change', { bubbles: true })); }
        };
        pickMinId('OBJID_ARMS_RIGHT');
        for (const id of ['OBJID_BODY', 'OBJID_HEAD_TOP', 'OBJID_SHIELD', 'OBJID_SHOES', 'OBJID_ACCESSORY_1']) pickMinId(id);
        pickMinId('OBJID_ARMS_RIGHT_CARD_1');
        for (const id of ['OBJID_ARMS_RIGHT_REFINE', 'OBJID_BODY_REFINE']) {
            const el = document.getElementById(id);
            if (el && el.options.length) {
                el.value = el.options[el.options.length - 1].value;
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    });
    await page.waitForTimeout(600);
}

/**
 * ステータスポイント予算内で合法配分する。予算式・コストテーブルは hmjob.js /
 * mig.job.h.js を動的 import して使う（CalcStatusPoint() の bIgnoreAutoCalc 経路と同一）。
 * ポイントキャップを ON にして反映することで、超過ビルドが差し戻されないことを兼ねて検査する。
 */
async function allocateLegalStatsForPassC(page, weights) {
    await page.evaluate(() => {
        const cb = document.getElementById('OBJID_CHECK_POINT_CAP');
        if (cb && !cb.checked) cb.click();
    });
    await page.waitForTimeout(150);
    await page.evaluate(async (weightsArg) => {
        const dynamicImport = new Function('specifier', 'return import(specifier);');
        const hm = await dynamicImport('/engine/chara/hmjob.js');
        const jb = await dynamicImport('/engine/data/mig.job.h.js');
        const g = (id) => document.getElementById(id);
        const migId = parseInt(g('OBJID_SELECT_JOB').value, 10);
        const blvMax = jb.GetBaseLevelMax(migId);
        const jlvMax = jb.GetJobLevelMax(migId);
        const statMax = jb.GetStatusMax(migId, 0);

        let budget = jb.IsReincarnatedJob(migId) ? 100 : 48;
        for (let lv = 1; lv <= blvMax; lv++) budget += hm.GetEarningStatusPoint(lv);

        const names = ['STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK'];
        const val = Object.fromEntries(names.map((n) => [n, 1]));
        let spent = names.length * hm.GetStatusTotalCost(1);
        let progress = true;
        while (progress) {
            progress = false;
            for (const n of names) {
                for (let k = 0; k < weightsArg[n]; k++) {
                    if (val[n] >= statMax) break;
                    const inc = hm.GetStatusTotalCost(val[n] + 1) - hm.GetStatusTotalCost(val[n]);
                    if (spent + inc > budget) continue;
                    val[n]++; spent += inc; progress = true;
                }
            }
        }

        // 4次職以上のみ特性ステータス（POW/STA/WIS/SPL/CON/CRT）を持つ
        const trait = { POW: 0, STA: 0, WIS: 0, SPL: 0, CON: 0, CRT: 0 };
        if (jb.IsYojiJob(migId)) {
            let tsBudget = Math.max(7, hm.GetEarningTSStatusPoint(blvMax));
            const traitNames = ['POW', 'CON', 'CRT', 'STA', 'WIS', 'SPL'];
            for (const n of traitNames) {
                const take = Math.min(110, Math.floor(tsBudget / traitNames.length));
                trait[n] = take; tsBudget -= take;
            }
        }

        g('OBJID_SELECT_BASE_LEVEL').value = blvMax;
        g('OBJID_SELECT_BASE_LEVEL').dispatchEvent(new Event('change', { bubbles: true }));
        g('OBJID_SELECT_JOB_LEVEL').value = jlvMax;
        g('OBJID_SELECT_JOB_LEVEL').dispatchEvent(new Event('change', { bubbles: true }));
        // 全入力へ値を書いてから最後の1つだけ change を発火する。1つずつ発火すると
        // 中間状態がポイント超過と判定され、CalcStatusPoint() が全体を差し戻すことがある。
        for (const n of names) g('OBJID_SELECT_STATUS_' + n).value = val[n];
        for (const n of Object.keys(trait)) {
            const el = g('OBJID_SELECT_STATUS_' + n);
            if (el) el.value = trait[n];
        }
        g('OBJID_SELECT_STATUS_LUK').dispatchEvent(new Event('change', { bubbles: true }));
    }, weights);
    await page.waitForTimeout(500);
}

/**
 * 弱いモンスタープールから1体を名前で選ぶ（DOM操作のみ、判定は行わない）。
 * 既に同じ値が選択済みの場合、同じ値への再選択は TomSelect が change イベントを抑制し
 * 再計算が走らないため、別の値へ一度逃がしてから戻すことで確実に change を発火させる。
 * 見つからなければ false を返す。
 */
async function selectMonsterByNameForPassC(page, name) {
    const found = await page.evaluate((monsterName) => {
        const sel = document.querySelector('select.OBJID_MONSTER_MAP_MONSTER');
        const o = Array.from(sel.options).find((x) => x.text === monsterName);
        if (!o) return false;
        const other = Array.from(sel.options).find((x) => x.value !== o.value);
        if (sel.tomselect) {
            if (other) sel.tomselect.setValue(other.value);
            sel.tomselect.setValue(o.value);
        } else {
            sel.value = o.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
    }, name);
    if (found) await page.waitForTimeout(400);
    return found;
}

/** URL出力パネルを開いて出力欄の値を取得する。 */
async function exportCurrentUrlForPassC(page) {
    await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
    await page.waitForSelector('#OBJID_INPUT_URL_OUT_MIG', { state: 'visible', timeout: 5000 });
    await page.click('#OBJID_BUTTON_URL_OUT_MIG');
    return page.inputValue('#OBJID_INPUT_URL_OUT_MIG');
}

/**
 * 実際に URL を新規ページで復元し、与ダメージが非ゼロであることを確認する。
 *
 * 当初はライブDOMの MinATKnum を読んで非ゼロ判定していたが、実測でカーディナル×ヒールの
 * 組み合わせにおいて「ライブDOM上は非ゼロに見えるのに、URL復元後は0ダメージ」という
 * 食い違いが確認された（TomSelectの同値再選択によるchange抑制を疑い対策したが、
 * 対策後も再発した——根本原因は未特定だが、ライブDOM読み取りは信頼できないと判断した）。
 * そのため判定は必ずこの関数（URL復元後の再計算）で行う。ライブDOM読み取りは使わない。
 *
 * MinATKnum は常時display:noneの旧戦闘結果テーブルの要素だったため削除済み。
 * 現在は簡易表示（OBJID_DIV_BATTLE_RESULT_TINY。ラベルspan・値spanが交互に並ぶ）の
 * 「平均」ダメージを同じ判定に使う。
 */
async function verifyUrlNonZero(page, baseUrl, url) {
    const q = url.slice(url.indexOf('?'));
    const verifyPage = await page.context().newPage();
    try {
        await verifyPage.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
        await verifyPage.waitForTimeout(800);
        const ave = await verifyPage.evaluate(() => {
            const tiny = document.getElementById('OBJID_DIV_BATTLE_RESULT_TINY');
            if (!tiny) return '';
            const children = Array.from(tiny.children);
            const idx = children.findIndex((el) => (el.textContent ?? '').trim() === '平均');
            return idx >= 0 ? (children[idx + 1]?.textContent ?? '').trim() : '';
        });
        return !!ave && ave !== '0';
    } finally {
        await verifyPage.close();
    }
}

/**
 * 通常攻撃の1エントリを生成する。弱モンスタープールを順に試し、URL復元後も非ゼロダメージ
 * になる組み合わせが見つかった時点でその URL を返す。全滅時は null。
 */
async function buildNormalAttackUrlForPassC(page, baseUrl) {
    for (const name of PASS_C_WEAK_MONSTERS) {
        if (!(await selectMonsterByNameForPassC(page, name))) continue;
        const url = await exportCurrentUrlForPassC(page);
        if (await verifyUrlNonZero(page, baseUrl, url)) return url;
    }
    return null;
}

/**
 * 攻撃手段セレクトの2番目以降の option を順に試し、URL復元後も非ゼロダメージになる
 * スキルを選ぶ（option[1] が必ずしも攻撃スキルとは限らない。例: カーディナル/ハイプリースト
 * の先頭候補はヒール）。判定は必ず verifyUrlNonZero（URL復元後の再計算）で行う
 * （ライブDOM読み取りを信頼しない理由は verifyUrlNonZero のコメント参照）。
 * 同じスキルで複数モンスターも試す（弱モンスタープール全体）。レベルは常に最大を選ぶ。
 * 見つからなければ null を返す。
 */
async function selectSkillAttackForPassC(page, baseUrl) {
    const optionCount = await page.evaluate(
        () => document.querySelector('#ID_ATTACK_METHOD_AREA select')?.options.length ?? 0
    );
    for (let i = 1; i < Math.min(optionCount, 8); i++) {
        await page.evaluate((idx) => {
            const s = document.querySelector('#ID_ATTACK_METHOD_AREA select');
            s.value = s.options[idx].value;
            s.dispatchEvent(new Event('change', { bubbles: true }));
        }, i);
        await page.waitForTimeout(400);
        await page.evaluate(() => {
            const selects = document.querySelectorAll('#ID_ATTACK_METHOD_AREA select');
            if (selects.length < 2) return;
            const lvSelect = selects[1];
            lvSelect.value = lvSelect.options[lvSelect.options.length - 1].value;
            lvSelect.dispatchEvent(new Event('change', { bubbles: true }));
        });
        await page.waitForTimeout(400);

        for (const monsterName of PASS_C_WEAK_MONSTERS) {
            if (!(await selectMonsterByNameForPassC(page, monsterName))) continue;
            const url = await exportCurrentUrlForPassC(page);
            if (await verifyUrlNonZero(page, baseUrl, url)) return url;
        }
    }
    return null;
}

/**
 * Pass C の1エントリを生成する。装備・合法配分ステータスを設定した上で、URL復元後も
 * 非ゼロダメージになる対象モンスター（・スキル攻撃の場合はスキルも）の組み合わせを探し、
 * その URL を返す。想定と異なる状態（職業が見つからない・全滅）は警告ではなく
 * 異常終了させる（無言でカバレッジが欠けるのを防ぐ）。
 */
async function exportUrlForJobPassC(page, baseUrl, jobText, archetype, useSkillAttack) {
    await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    const jobs = await page.evaluate(() =>
        Array.from(document.getElementById('OBJID_SELECT_JOB').options).map((o) => ({ value: o.value, text: o.text }))
    );
    const job = jobs.find((j) => j.text === jobText);
    if (!job) throw new Error(`Pass C: 職業が見つかりません: ${jobText}`);
    await page.selectOption('#OBJID_SELECT_JOB', { value: job.value });
    await page.waitForTimeout(400);

    await equipGearForPassC(page);
    await allocateLegalStatsForPassC(page, PASS_C_STAT_WEIGHTS[archetype]);

    if (!useSkillAttack) {
        const url = await buildNormalAttackUrlForPassC(page, baseUrl);
        if (!url) throw new Error(`Pass C: ${jobText} — 通常攻撃で弱モンスタープール全滅（URL復元後も0ダメージ）`);
        return url;
    }

    const url = await selectSkillAttackForPassC(page, baseUrl);
    if (!url) throw new Error(`Pass C: ${jobText} — スキル攻撃でURL復元後も非ゼロダメージにできる組み合わせが見つかりません`);
    return url;
}

// 生成時は一時ローカルサーバー（ポート乱数）で export するため、出力そのままだと
// 無意味な localhost:xxxxx URL がコミットされてしまう。他のフィクスチャファイル
// （sample-savedata-new.md 等）と同じ本番ホスト表記に正規化する。
// クエリ文字列（セーブデータのエンコード自体）はローカル生成でも本番でも同一形式なので、
// この正規化後の URL は実際に本番サイトへ貼り付けても読み込める。
const CANONICAL_HOST = 'https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html';
function canonicalizeUrl(localUrl) {
    const qi = localUrl.indexOf('?');
    return qi >= 0 ? `${CANONICAL_HOST}${localUrl.slice(qi)}` : localUrl;
}

async function exportUrlForJob(page, baseUrl, jobValue) {
    await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    await page.selectOption('#OBJID_SELECT_JOB', { value: jobValue });
    await page.waitForTimeout(400);
    await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
    await page.waitForSelector('#OBJID_INPUT_URL_OUT_MIG', { state: 'visible', timeout: 5000 });
    await page.click('#OBJID_BUTTON_URL_OUT_MIG');
    const outputUrl = await page.inputValue('#OBJID_INPUT_URL_OUT_MIG');
    return outputUrl;
}

async function exportUrlForJobWithSkillAttack(page, baseUrl, jobValue) {
    await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    await page.selectOption('#OBJID_SELECT_JOB', { value: jobValue });
    await page.waitForTimeout(400);

    // 攻撃手段セレクト（#ID_ATTACK_METHOD_AREA 配下、id なし）の2番目の option
    // （index 0 = 通常攻撃固定）を選ぶ。選択肢が無い職業は null を返して呼び出し側でスキップする。
    const picked = await page.evaluate(() => {
        const select = document.querySelector('#ID_ATTACK_METHOD_AREA select');
        if (!select || select.options.length < 2) return null;
        const value = select.options[1].value;
        select.value = value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        return value;
    });
    if (picked === null) return null;
    await page.waitForTimeout(400);

    await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
    await page.waitForSelector('#OBJID_INPUT_URL_OUT_MIG', { state: 'visible', timeout: 5000 });
    await page.click('#OBJID_BUTTON_URL_OUT_MIG');
    return page.inputValue('#OBJID_INPUT_URL_OUT_MIG');
}

async function main() {
    const server = createStaticServer(PROJECT_ROOT);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const addr = server.address();
    const baseUrl = `http://127.0.0.1:${addr.port}`;
    const browser = await chromium.launch({ headless: true });

    const lines = [
        '# 職業×攻撃手段 生成コーパス（Phase 0 テストオラクル拡張）',
        '#',
        '# generate-job-corpus.mjs で機械生成。手動編集しない（再生成で上書きされる）。',
        '# 対象テスト: integration/job-corpus-snapshot.test.ts（ローカル内自己回帰検出。本番比較ではない）',
        '#',
        '# 使い方は他のフィクスチャファイルと同じ（1行1URL、空行・#行はスキップ）。',
        '',
    ];

    try {
        const context = await browser.newContext();
        const page = await context.newPage();

        // 職業一覧を取得（先頭の goto で1回だけ）
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);
        const jobs = await page.evaluate(() =>
            Array.from(document.getElementById('OBJID_SELECT_JOB').options).map((o) => ({
                value: o.value,
                text: o.text,
            }))
        );
        console.log(`職業数: ${jobs.length}`);

        // Pass A: 全職業 × 通常攻撃
        lines.push('# Pass A: 全職業（通常攻撃・デフォルトステータス）');
        let count = 0;
        for (const job of jobs) {
            const url = await exportUrlForJob(page, baseUrl, job.value);
            if (!url) {
                console.warn(`  [skip] ${job.text}: URL出力が空`);
                continue;
            }
            lines.push(`# ${job.text}`);
            lines.push(canonicalizeUrl(url));
            count++;
            if (count % 10 === 0) console.log(`  ${count}/${jobs.length} 完了`);
        }
        console.log(`Pass A 完了: ${count}件`);

        // Pass B: 代表職業 × スキル攻撃手段
        lines.push('');
        lines.push('# Pass B: 代表職業（スキル攻撃手段選択）');
        let countB = 0;
        for (const job of jobs) {
            if (!SKILL_ATTACK_REPRESENTATIVES.has(job.text)) continue;
            const url = await exportUrlForJobWithSkillAttack(page, baseUrl, job.value);
            if (!url) {
                console.warn(`  [skip] ${job.text}: スキル攻撃手段の選択肢なし、またはURL出力が空`);
                continue;
            }
            lines.push(`# ${job.text}（スキル攻撃）`);
            lines.push(canonicalizeUrl(url));
            countB++;
        }
        console.log(`Pass B 完了: ${countB}件`);

        // Pass C: 5次職代表12職業 × 2バリアント（通常攻撃/スキル攻撃）。装備・合法配分
        // ステータス・弱モンスターを設定し、実際に非ゼロの与ダメージ・詠唱時間を持つ
        // セーブデータを生成する（残件台帳 B-32）。Pass A/B の101件は一切変更しない。
        lines.push('');
        lines.push('# Pass C: 5次職代表12職業（装備・ステータス・対象モンスター設定込み。残件台帳 B-32）');
        let countC = 0;
        for (const [jobText, archetype] of PASS_C_TARGET_JOBS) {
            const urlNormal = await exportUrlForJobPassC(page, baseUrl, jobText, archetype, false);
            lines.push(`# ${jobText}（Pass C 通常攻撃）`);
            lines.push(canonicalizeUrl(urlNormal));
            countC++;

            const urlSkill = await exportUrlForJobPassC(page, baseUrl, jobText, archetype, true);
            lines.push(`# ${jobText}（Pass C 技能攻撃）`);
            lines.push(canonicalizeUrl(urlSkill));
            countC++;

            console.log(`  Pass C: ${jobText} 完了（${countC}件）`);
        }
        console.log(`Pass C 完了: ${countC}件`);

        await context.close();
        console.log(`合計: ${count + countB + countC}件`);
    } finally {
        await browser.close();
        await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
    }

    writeFileSync(OUTPUT_PATH, lines.join('\n') + '\n');
    console.log(`書き出し: ${OUTPUT_PATH}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
