/**
 * roro/other/cardlist.html 起動統合テスト
 *
 * 目的:
 *   ESM 移行によって window.XXX グローバルへの依存が壊れていないかを検出する。
 *   calcx.html とは異なる HTML (base href なし) でも ESM 移行が正常に動作するか確認する。
 *
 * 検出対象:
 *   - 未捕捉 JavaScript 例外 (pageerror)
 *   - 未処理 Promise rejection (unhandledrejection)
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

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
        const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        createReadStream(filePath).pipe(res);
    });
}

const SUPPRESSED_ERROR_PATTERNS: RegExp[] = [
    // 例: /some known non-esm error/i,
];

function isSuppressed(message: string): boolean {
    return SUPPRESSED_ERROR_PATTERNS.some((re) => re.test(message));
}

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

describe('roro/other/cardlist.html 起動テスト', () => {
    it('スクリプト読み込みと初期化で未捕捉 JS 例外が発生しない', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const pageErrors: string[] = [];

        page.on('pageerror', (err) => {
            if (!isSuppressed(err.message)) {
                pageErrors.push(`[pageerror] ${err.message}`);
            }
        });

        await page.addInitScript(() => {
            (window as any).__pendingRejections = [];
            window.addEventListener('unhandledrejection', (event) => {
                const msg = (event.reason as any)?.message ?? String(event.reason);
                (window as any).__pendingRejections.push(msg);
            });
        });

        await page.goto(`${baseUrl}/roro/other/cardlist.html`, {
            waitUntil: 'networkidle',
            timeout: 60000,
        });

        await page.waitForTimeout(500);

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
