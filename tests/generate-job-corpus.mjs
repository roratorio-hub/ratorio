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

        await context.close();
        console.log(`合計: ${count + countB}件`);
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
