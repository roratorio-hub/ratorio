/**
 * ro4/m/calcx.html 統合テスト
 *
 * テストスイート:
 *   1. 起動テスト         — ページロード・ユーザー操作で未捕捉 JS 例外が発生しないことを確認
 *   2. セーブデータ復元   — 本番（GitHub Pages）と同一セーブデータを読み込み UI 値を比較
 *
 * セーブデータ復元テストで検出できる主なバグ:
 *   - Pattern A バリアント: let X（classic script）と window.X の乖離
 *     例: n_A_Arrow が head.js の let バインディングを読んで矢の選択値がズレる
 *   - Pattern B: 非ESMスクリプトが export let 配列を差し替えて習得スキル表示が消える
 *
 * 本番サイトへのアクセスが必要なテストはオフライン環境では自動スキップされる。
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright';
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// ─── 静的ファイルサーバー ────────────────────────────────────────────────────

const PROJECT_ROOT = join(__dirname, '../..');

const CONTENT_TYPES: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'text/javascript; charset=utf-8',
    '.mjs':  'text/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.yaml': 'text/yaml; charset=utf-8',
    '.yml':  'text/yaml; charset=utf-8',
    '.png':  'image/png',
    '.gif':  'image/gif',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ttf':  'font/ttf',
};

function createStaticServer(root: string): Server {
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

// ─── セーブデータフィクスチャ ─────────────────────────────────────────────────

const PRODUCTION_BASE = 'https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html';
const FIXTURES_PATH = join(__dirname, 'fixtures/sample-savedata.md');

/** フィクスチャファイルから本番URLのリストを読み込む */
function loadSaveDataEntries(): Array<{ label: string; prodUrl: string; query: string }> {
    if (!existsSync(FIXTURES_PATH)) return [];
    return readFileSync(FIXTURES_PATH, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'))
        .map((url, i) => {
            const qi = url.indexOf('?');
            return {
                label: `fixture[${i}]`,
                prodUrl: url,
                query: qi >= 0 ? url.slice(qi + 1) : '',
            };
        })
        .filter(({ query }) => query.length > 0);
}

// ─── UI スナップショット ───────────────────────────────────────────────────────
/**
 * セーブデータ復元後のキー要素の値を一括取得する。
 *
 * フィールドと検出対象バグの対応:
 *   job, baseLv, jobLv  — sanity check（save data がそもそも読み込まれたか）
 *   str〜luk            — 基本ステータス（save data 復元の広域カバレッジ）
 *   arrow               — Pattern A: n_A_Arrow の window.X / bare X 乖離を検出
 *   learnedSkillHeaderBg— Pattern B: n_A_LearnedSkill 配列差し替えを検出
 *                         "#ddddff"=スキル未設定（全0）/ "#ff7777"=スキル設定あり
 */
type UiSnapshot = {
    job: string;
    baseLv: string;
    jobLv: string;
    str: string;
    agi: string;
    vit: string;
    int: string;
    dex: string;
    luk: string;
    arrow: string;
    learnedSkillHeaderBg: string;
};

async function captureUiSnapshot(page: Page): Promise<UiSnapshot> {
    // セーブデータ復元は networkidle 後も数フレーム遅延する場合があるため、
    // 職業値がデフォルト（"0"）から変化するまで最大 3 秒待つ。
    await page.waitForFunction(
        () => {
            const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
            return job !== null && job.value !== '' && job.value !== '0';
        },
        { timeout: 3000 }
    ).catch(() => { /* タイムアウト時はそのまま読む（データなし URL の場合も想定） */ });

    return page.evaluate((): UiSnapshot => {
        const val = (id: string): string =>
            (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null)?.value ?? '';
        const attr = (id: string, a: string): string =>
            document.getElementById(id)?.getAttribute(a) ?? '';
        return {
            job:   val('OBJID_SELECT_JOB'),
            baseLv: val('OBJID_SELECT_BASE_LEVEL'),
            jobLv:  val('OBJID_SELECT_JOB_LEVEL'),
            str:   val('OBJID_SELECT_STATUS_STR'),
            agi:   val('OBJID_SELECT_STATUS_AGI'),
            vit:   val('OBJID_SELECT_STATUS_VIT'),
            int:   val('OBJID_SELECT_STATUS_INT'),
            dex:   val('OBJID_SELECT_STATUS_DEX'),
            luk:   val('OBJID_SELECT_STATUS_LUK'),
            // 矢: CCustomSelectBase が動的生成する <select id="OBJID_SELECT_ARROW">
            arrow: val('OBJID_SELECT_ARROW'),
            // 習得スキルヘッダ: learnedskill.js が RefreshSkillColumnHeaderLearned で設定
            learnedSkillHeaderBg: attr('OBJID_SKILL_COLUMN_HEADER_LEARNED', 'bgcolor'),
        };
    });
}

// ─── 例外収集ヘルパー ─────────────────────────────────────────────────────────

const SUPPRESSED_ERROR_PATTERNS: RegExp[] = [
    // ESM 移行と無関係な既知エラーをここに追加する（コメント必須）
];

function isSuppressed(message: string): boolean {
    return SUPPRESSED_ERROR_PATTERNS.some((re) => re.test(message));
}

/**
 * ページを開いて setupFn を実行し、発生した未捕捉 JS 例外をすべて返す。
 * pageerror と unhandledrejection の両方を収集する。
 */
async function collectPageErrors(
    browser: Browser,
    setupFn: (page: Page) => Promise<void>
): Promise<string[]> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors: string[] = [];

    page.on('pageerror', (err) => {
        if (!isSuppressed(err.message)) errors.push(`[pageerror] ${err.message}`);
    });

    // Playwright の pageerror では拾えない unhandledrejection をページ内で直接収集する
    await page.addInitScript(() => {
        (window as any).__pendingRejections = [];
        window.addEventListener('unhandledrejection', (event) => {
            const msg = (event.reason as any)?.message ?? String(event.reason);
            (window as any).__pendingRejections.push(msg);
        });
    });

    await setupFn(page);

    const rejections: string[] = await page.evaluate(
        () => (window as any).__pendingRejections ?? []
    );
    for (const msg of rejections) {
        if (!isSuppressed(msg)) errors.push(`[unhandledrejection] ${msg}`);
    }

    await context.close();
    return errors;
}

// ─── テストセットアップ ──────────────────────────────────────────────────────

let server: Server;
let browser: Browser;
let baseUrl: string;

beforeAll(async () => {
    server = createStaticServer(PROJECT_ROOT);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const addr = server.address();
    const port = typeof addr === 'object' && addr !== null ? addr.port : 0;
    baseUrl = `http://127.0.0.1:${port}`;
    browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
    await browser?.close();
    await new Promise<void>((resolve, reject) =>
        server?.close((err) => (err ? reject(err) : resolve()))
    );
});

// ─── スイート 1: 起動テスト ──────────────────────────────────────────────────

describe('ro4/m/calcx.html 起動テスト', () => {
    it('スクリプト読み込みと初期化で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);
        });
        expect(errors, formatErrorMsg('ページロード中', errors)).toHaveLength(0);
    });

    // 職業変更は equip.js・learnedskill.js 等の初期化コードをトリガーする。
    // ESM 移行で壊れた場合に ReferenceError として現れることがあるため検出する。
    it('職業変更操作で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.selectOption('#OBJID_SELECT_JOB', { index: 1 });
            await page.waitForTimeout(500);
            await page.selectOption('#OBJID_SELECT_JOB', { index: 0 });
            await page.waitForTimeout(300);
        });
        expect(errors, formatErrorMsg('職業変更操作中', errors)).toHaveLength(0);
    });

    // セーブデータを URL から読み込む操作をトリガーする。
    // fixtures に URL がある場合のみ実行する（1 件目を代表として使用）。
    it('セーブデータ URL 読み込みで未捕捉 JS 例外が発生しない', async () => {
        const entries = loadSaveDataEntries();
        if (entries.length === 0) {
            console.warn('fixtures/sample-savedata.md にエントリがないためスキップ');
            return;
        }
        const { query } = entries[0];
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);
        });
        expect(errors, formatErrorMsg('セーブデータ読み込み中', errors)).toHaveLength(0);
    });
});

// ─── スイート 2: セーブデータ復元精度テスト ──────────────────────────────────
//
// 手動テスト手順（本番 URL → ローカル URL → 目視比較）を自動化したもの。
// フィクスチャの各 URL について本番とローカルの UI 値を比較する。
// 本番サイトへのアクセスが不可な場合は自動スキップ。

describe('セーブデータ復元精度テスト（本番 vs ESM移行環境）', () => {
    const entries = loadSaveDataEntries();

    if (entries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata.md に URL を追加してください）', () => {
            console.warn('sample-savedata.md にエントリがないためスキップ');
        });
    }

    for (const { label, prodUrl, query } of entries) {
        it(`${label}: 本番と同一の UI 値が復元される`, async () => {
            // ── 本番から期待値を取得 ─────────────────────────────────────
            let prodSnapshot: UiSnapshot;
            try {
                const prodContext = await browser.newContext();
                const prodPage = await prodContext.newPage();
                await prodPage.goto(prodUrl, { waitUntil: 'networkidle', timeout: 30000 });
                prodSnapshot = await captureUiSnapshot(prodPage);
                await prodContext.close();
            } catch {
                console.warn(`本番サイトへのアクセスに失敗したためスキップ: ${label}`);
                return;
            }

            // ── ローカルで同一セーブデータを読み込み ─────────────────────
            const localContext = await browser.newContext();
            const localPage = await localContext.newPage();
            await localPage.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            const localSnapshot = await captureUiSnapshot(localPage);
            await localContext.close();

            // ── 比較 ─────────────────────────────────────────────────────
            expect(localSnapshot, [
                `ESM移行環境のUI値が本番と異なります (${label})`,
                '考えられる原因:',
                '  Pattern A バリアント — window.X と bare X の乖離（例: n_A_Arrow）',
                '  Pattern B — 非ESMスクリプトによる配列差し替え（例: n_A_LearnedSkill）',
                `本番:   ${JSON.stringify(prodSnapshot!)}`,
                `ローカル: ${JSON.stringify(localSnapshot)}`,
            ].join('\n')).toEqual(prodSnapshot);
        });
    }
});

// ─── スイート 3: URL セーブ/ロード 往復テスト ─────────────────────────────────
//
// テスト手順:
//   1. OBJID_INPUT_URL_IN_MIG にセーブデータURLを入力
//   2. OBJID_BUTTON_URL_IN_MIG をクリック（ロード）
//   3. OBJID_BUTTON_URL_OUT_MIG をクリック（URL出力）
//   4. OBJID_INPUT_URL_OUT_MIG の出力クエリが入力クエリと一致するか確認
//
// このテストで検出できる主なバグ:
//   - encodeToURL が失敗して空文字を返す（try/catch で飲み込まれたエラー）
//   - セーブデータの一部が欠損・変質してエンコード結果が変わる
//   - import 漏れにより CSaveDataUnitXxx が undefined になる

describe('URL セーブ/ロード 往復テスト', () => {
    const entries = loadSaveDataEntries();

    if (entries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata.md に URL を追加してください）', () => {
            console.warn('sample-savedata.md にエントリがないためスキップ');
        });
    }

    for (const { label, query } of entries) {
        it(`${label}: URL入力 → URL出力 でクエリ文字列が変質しない`, async () => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const errors: string[] = [];

            page.on('pageerror', (err) => {
                if (!isSuppressed(err.message)) errors.push(`[pageerror] ${err.message}`);
            });

            // クリップデータ保存の confirm ダイアログを自動キャンセル
            page.on('dialog', async (dialog) => { await dialog.dismiss(); });

            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });

            // セーブ/ロードセクションを展開（折りたたみチェックボックス）
            await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
            await page.waitForSelector('#OBJID_INPUT_URL_IN_MIG', { state: 'visible', timeout: 5000 });

            // 1. URL入力欄にセーブデータURLをセット
            await page.fill(
                '#OBJID_INPUT_URL_IN_MIG',
                `${baseUrl}/ro4/m/calcx.html?${query}`,
            );

            // 2. URL入力ボタンをクリック（内部で setTimeout を使用）
            await page.click('#OBJID_BUTTON_URL_IN_MIG');

            // ロード完了を待機（職業値がデフォルト "0" から変化するまで）
            await page.waitForFunction(
                () => {
                    const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                    return job !== null && job.value !== '' && job.value !== '0';
                },
                { timeout: 10000 },
            ).catch(() => { /* 職業未設定のセーブデータの場合はそのまま続行 */ });

            // 3. URL出力ボタンをクリック
            await page.click('#OBJID_BUTTON_URL_OUT_MIG');

            // 出力URLを取得
            const outputUrl = await page.inputValue('#OBJID_INPUT_URL_OUT_MIG');
            const outputQuery = outputUrl.split('?')[1] ?? '';

            await context.close();

            // JS例外がないことを確認
            expect(errors, formatErrorMsg('URL往復テスト中', errors)).toHaveLength(0);

            // 出力クエリが空でないことを確認（encodeToURL の失敗を検出）
            expect(
                outputQuery,
                'URL出力が空です（encodeToURL が失敗した可能性 — ブラウザコンソールのエラーを確認してください）',
            ).not.toBe('');

            // 入力クエリと出力クエリが一致することを確認
            expect(outputQuery, [
                `セーブデータが変質しています (${label})`,
                `入力: ${query.slice(0, 80)}...`,
                `出力: ${outputQuery.slice(0, 80)}...`,
            ].join('\n')).toBe(query);
        });
    }
});

// ─── ユーティリティ ───────────────────────────────────────────────────────────

function formatErrorMsg(context: string, errors: string[]): string {
    return `${context}に未捕捉 JS 例外が ${errors.length} 件発生しました:\n${errors.join('\n')}`;
}
