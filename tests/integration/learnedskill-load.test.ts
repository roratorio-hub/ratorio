/**
 * 習得スキル「URL入力」/「クリア」ボタンの状態反映テスト
 *
 * 回帰対象バグ:
 *   learnedskill.js の load ハンドラが各 select を `$(this).val(x).change()` で更新していたが、
 *   jQuery 3.x の .change() はネイティブ addEventListener('change') ハンドラを発火させない。
 *   そのため RefreshSkillColumnHeaderLearned が呼ばれず、
 *     - n_A_LearnedSkill が更新されない（→ 計算に反映されない）
 *     - ヘッダの着色 / 「設定中」表示が更新されない
 *   という不具合があった。見た目の select 値だけは変わるため動作確認では気付きにくい。
 *
 * 本テストは DOM 観測可能なプロキシ（ヘッダ bgcolor / 「設定中」テキスト）で状態反映を検証する。
 * これらは RefreshSkillColumnHeaderLearned でのみ更新されるため、バグの有無を直接区別できる。
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
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.yaml': 'text/yaml; charset=utf-8',
    '.yml': 'text/yaml; charset=utf-8',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
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

describe('習得スキル URL入力/クリアの状態反映', () => {
    it('「クリア」で習得スキルの内部状態（ヘッダ着色・設定中表示）がリセットされる', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        page.on('dialog', (d) => d.dismiss().catch(() => {}));
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
            waitUntil: 'networkidle',
            timeout: 60000,
        });

        // 習得スキル欄が未展開なら展開する
        const expandLearned = async () => {
            await page.evaluate(() => {
                const cb = document.getElementById(
                    'OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX'
                ) as HTMLInputElement | null;
                if (cb && !cb.checked) cb.click();
            });
        };

        // 習得スキル（レベル選択肢が複数ある select）を持つ職業を探す
        let target: { id: string; nonZeroValue: string } | null = null;
        for (const jobIdx of [1, 2, 3, 4, 5]) {
            await page.selectOption('#OBJID_SELECT_JOB', { index: jobIdx });
            await page.waitForTimeout(700);
            await expandLearned();
            await page.waitForTimeout(400);
            target = await page.evaluate(() => {
                const sels = Array.from(
                    document.querySelectorAll<HTMLSelectElement>(
                        '[id^="OBJID_SELECT_LEARNED_SKILL_LEVEL_"]'
                    )
                );
                const s = sels.find((el) => el.options.length > 1);
                return s ? { id: s.id, nonZeroValue: s.options[1].value } : null;
            });
            if (target) break;
        }
        expect(
            target,
            '習得スキル select が見つからない（職業データ前提が崩れている）'
        ).not.toBeNull();

        // 習得スキルを非ゼロに設定 → ネイティブ change が発火し「設定中」状態になる
        await page.selectOption('#' + target!.id, target!.nonZeroValue);
        await page.waitForTimeout(300);

        const readHeader = () =>
            page.evaluate(() => {
                const h = document.getElementById('OBJID_SKILL_COLUMN_HEADER_LEARNED');
                const u = document.getElementById('OBJID_SKILL_COLUMN_USEDTEXT_LEARNED');
                return {
                    bg: h?.getAttribute('bgcolor') ?? null,
                    used: u?.textContent ?? '',
                };
            });

        // セットアップ確認：習得スキル設定中の着色になっている
        const afterSet = await readHeader();
        expect(afterSet.bg).toBe('#ff7777');
        expect(afterSet.used).toContain('設定中');

        // 「クリア」ボタン押下（URL 空 → load ハンドラ起動 → 全 select 0 化）
        await page.evaluate(() => {
            (document.getElementById('ID_SKILL_LEARNED_URL_CLEAR') as HTMLButtonElement | null)?.click();
        });
        await page.waitForTimeout(600); // load ハンドラは setTimeout(...,0) で非同期

        // ★ バグありの場合: .change() がネイティブハンドラを発火しないため
        //   n_A_LearnedSkill が stale のまま → ヘッダは #ff7777 / 設定中 のまま（FAIL）
        // ★ 修正後: RefreshSkillColumnHeaderLearned が直接呼ばれ状態がリセットされる（PASS）
        const afterClear = await readHeader();
        expect(afterClear.bg).toBe('#ddddff');
        expect(afterClear.used).not.toContain('設定中');

        await context.close();
    }, 120000);
});
