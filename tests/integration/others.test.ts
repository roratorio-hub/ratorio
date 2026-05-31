/**
 * roro/other/ 各ページの起動統合テスト
 *
 * 対象: itemlist.html, petlist.html, monsterlist.html, exp.html, jobb.html, element.html
 * 目的: ESM 移行によって window グローバルが壊れていないかを検出する。
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
    // jQuery CDN の読み込み失敗は対象外
    /Failed to load resource/i,
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

const PAGES = [
    'roro/other/itemlist.html',
    'roro/other/petlist.html',
    'roro/other/monsterlist.html',
    'roro/other/exp.html',
    'roro/other/jobb.html',
    'roro/other/element.html',
];

describe('roro/other/ ページ起動テスト', () => {
    for (const page of PAGES) {
        it(`${page} — 未捕捉 JS 例外が発生しない`, async () => {
            const context = await browser.newContext();
            const pg = await context.newPage();

            const pageErrors: string[] = [];

            pg.on('pageerror', (err) => {
                if (!isSuppressed(err.message)) {
                    pageErrors.push(`[pageerror] ${err.message}`);
                }
            });

            await pg.addInitScript(() => {
                (window as any).__pendingRejections = [];
                window.addEventListener('unhandledrejection', (event) => {
                    const msg = (event.reason as any)?.message ?? String(event.reason);
                    (window as any).__pendingRejections.push(msg);
                });
            });

            await pg.goto(`${baseUrl}/${page}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });

            await pg.waitForTimeout(500);

            const rejections: string[] = await pg.evaluate(
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
                `${page} — ${pageErrors.length} 件の未捕捉 JS 例外:\n` +
                    pageErrors.join('\n')
            ).toHaveLength(0);
        });
    }
});
