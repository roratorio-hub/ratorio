/**
 * ro4/m/calcx.html 起動統合テスト
 *
 * 目的:
 *   ESM 移行によって window.XXX グローバルへの依存が壊れていないかを検出する。
 *   例) file1.js を ESM 化したことで file2.js が参照しているグローバルが消え、
 *       `ReferenceError: SomeGlobal is not defined` が発生するケースを捕捉する。
 *
 * 検出対象:
 *   - 未捕捉 JavaScript 例外 (pageerror)
 *     = `ReferenceError` / `TypeError` 等の ESM グローバル破壊を直接示すエラー
 *   - 未処理 Promise rejection (unhandledrejection)
 *     = Promise チェーン内で発生した ReferenceError 等。Playwright の pageerror
 *       では拾えない場合があるため、addInitScript で直接収集する。
 *
 * 検出対象外 (意図的に除外):
 *   - console.error() ログ (エラー処理コードが意図的に出力するものが多く誤検知が多い)
 *   - ネットワークリソースの読み込み失敗 (CDN 等のサービス状態に依存するため)
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── 静的ファイルサーバー ────────────────────────────────────────────────────
// <base href="../../roro/m/"> に対応するため、プロジェクトルートを配信する。
// file:// では ESM type="module" の CORS 制限が発生するため HTTP サーバーが必須。

const __dirname = fileURLToPath(new URL('.', import.meta.url));
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
        // パストラバーサル防止
        const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
        const filePath = join(root, safe);

        if (!filePath.startsWith(root) || !existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Not found: ${urlPath}`);
            return;
        }

        const ext = extname(filePath).toLowerCase();
        const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        createReadStream(filePath).pipe(res);
    });
}

// ─── 既知エラーの抑制 ────────────────────────────────────────────────────────
// ESM 移行とは無関係な既知エラーを除外するパターン。
// 新しい既知エラーを見つけたらコメント付きで追加すること。
const SUPPRESSED_ERROR_PATTERNS: RegExp[] = [
    // 例: /some known non-esm error/i,
];

function isSuppressed(message: string): boolean {
    return SUPPRESSED_ERROR_PATTERNS.some((re) => re.test(message));
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

// ─── テスト本体 ──────────────────────────────────────────────────────────────

describe('ro4/m/calcx.html 起動テスト', () => {
    it('スクリプト読み込みと初期化で未捕捉 JS 例外が発生しない', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const pageErrors: string[] = [];

        // 未捕捉例外を収集 (ReferenceError: X is not defined 等)
        page.on('pageerror', (err) => {
            if (!isSuppressed(err.message)) {
                pageErrors.push(`[pageerror] ${err.message}`);
            }
        });

        // Promise 内の未処理 rejection を直接収集する。
        // Playwright の pageerror は networkidle 解決後に非同期発生する unhandledrejection を
        // 拾えない場合があるため、addInitScript でページ内リスナーを埋め込む。
        await page.addInitScript(() => {
            (window as any).__pendingRejections = [];
            window.addEventListener('unhandledrejection', (event) => {
                const msg = (event.reason as any)?.message ?? String(event.reason);
                (window as any).__pendingRejections.push(msg);
            });
        });

        // networkidle: type="module" と defer スクリプトの混在 + CDN リソース。
        // すべて完了(または失敗)し、500ms ネットワーク無通信になるまで待つ。
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
            waitUntil: 'networkidle',
            timeout: 60000,
        });

        // networkidle 解決後に非同期発生するエラー (unhandledrejection 等) を待つ。
        await page.waitForTimeout(500);

        // ページ内で収集した unhandledrejection を pageErrors にマージ
        const rejections: string[] = await page.evaluate(
            () => (window as any).__pendingRejections ?? []
        );
        for (const msg of rejections) {
            if (!isSuppressed(msg)) {
                pageErrors.push(`[unhandledrejection] ${msg}`);
            }
        }

        await context.close();

        expect(
            pageErrors,
            `ページロード中に未捕捉 JS 例外が ${pageErrors.length} 件発生しました:\n` +
                pageErrors.join('\n')
        ).toHaveLength(0);
    });
});
