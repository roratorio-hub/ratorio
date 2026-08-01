/**
 * DefineEnum が実行時生成する定数を、実ブラウザで calcx.html を開いて抽出する.
 *
 * CGlobalConstManager.DefineEnumSubCommon は
 *   Function(name + " = " + value + ";")()
 * でグローバルへ直接定数を生やすため、静的解析では値が一切分からない。
 *
 * node + happy-dom で個別 import する方式も試したが、
 *   - CConfBase 系は InitData() 実行時に SetEnumName で動的登録するため import だけでは登録されない
 *   - head.js 等は module 評価が完了せずハングする
 * という二重の問題があるため、**実際のページを開いて採取する**方式を正とする。
 * これなら「本番で定義されているもの」と定義上一致する。
 *
 * この抽出結果が const 化の正解値であり、変換前後で完全一致することが
 * 移行の安全性の根拠になる（値がズレるとセーブデータとアイテムデータが壊れる）。
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO = join(__dirname, '..', '..');

const CONTENT_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.yaml': 'text/yaml; charset=utf-8',
    '.yml': 'text/yaml; charset=utf-8',
    '.png': 'image/png', '.gif': 'image/gif', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
};

function createStaticServer(root) {
    return createServer((req, res) => {
        const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
        const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
        const filePath = join(root, safe);
        if (!filePath.startsWith(root) || !existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            return;
        }
        res.writeHead(200, {
            'Content-Type': CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
        });
        createReadStream(filePath).pipe(res);
    });
}

/**
 * calcx.html を実ブラウザで開き、CGlobalConstManager の管理マップから全定数を抽出する。
 * @returns {Promise<{constants: Record<string, {value: number|string, enumName: string, index: number, pseudo: boolean}>,
 *                    enums: Array<{name: string, members: Array, pseudo: Array}>}>}
 */
export async function extractEnums() {
    const require = createRequire(join(REPO, 'tests', 'package.json'));
    const { chromium } = require('playwright');

    const server = createStaticServer(REPO);
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    const port = server.address().port;

    const browser = await chromium.launch();
    try {
        const page = await browser.newPage();
        const errors = [];
        page.on('pageerror', (e) => errors.push(String(e.message).split('\n')[0]));

        // CDN 依存をローカルへ差し替える。
        // 特に Chart.js は CSaveController.js / calchistory.js が ESM import しており、
        // ここが解決できないと **head.js を含むモジュールグラフ全体が評価されず**、
        // BATTLE_DATA_INDEX_* 等の DefineEnum が走らないまま採取してしまう（実害のある取りこぼし）。
        const chartStub = readFileSync(join(REPO, 'tests/helpers/chart-stub.js'), 'utf8');
        await page.route('**://cdn.jsdelivr.net/npm/chart.js@**', (route) =>
            route.fulfill({ status: 200, contentType: 'text/javascript; charset=utf-8', body: chartStub }));
        await page.route('**://cdnjs.cloudflare.com/**', (route) => {
            const url = route.request().url();
            const css = url.endsWith('.css');
            return route.fulfill({
                status: 200,
                contentType: css ? 'text/css; charset=utf-8' : 'text/javascript; charset=utf-8',
                body: css ? '' : '/* CDN stub */',
            });
        });
        await page.goto(`http://127.0.0.1:${port}/ro4/m/calcx.html`, {
            waitUntil: 'networkidle', timeout: 120000,
        });
        // 折りたたみセクションの中身は InitData() 実行時に enum 登録されるものがあるため、
        // 全セクションを展開してから採取する（integration テストと同じ考え方）。
        await page.evaluate(() => {
            document.querySelectorAll('details').forEach((d) => { d.open = true; });
            document.querySelectorAll('[onclick*="Open"],[onclick*="Toggle"]').forEach((el) => {
                try { el.click(); } catch { /* noop */ }
            });
        });
        await page.waitForTimeout(1500);

        const dumped = await page.evaluate(async () => {
            // CGlobalConstManager は const 化完了に伴い削除済み。
            // 実行時に生成される定数はもう存在しないので、モジュールが無ければ空で返す。
            // （DefineEnum を誰かが復活させた場合だけ、ここに定数が現れる）
            let mgr = null;
            try {
                mgr = (await import('/roro/m/js/CGlobalConstManager.js')).CGlobalConstManager;
            } catch {
                return { constants: {}, enums: [] };
            }
            if (!mgr || !mgr.managementMap) return { constants: {}, enums: [] };
            const constants = {};
            const enums = [];
            const norm = (v) => (typeof v === 'bigint' ? `${v}n` : v);
            for (const unit of mgr.managementMap) {
                const m = unit.value;
                const rec = { name: unit.name, members: [], pseudo: [] };
                (m.enumArray ?? []).forEach((e, i) => {
                    constants[e.name] = { value: norm(e.value), enumName: unit.name, index: i, pseudo: false };
                    rec.members.push([e.name, norm(e.value)]);
                });
                (m.pseudoArray ?? []).forEach((e, i) => {
                    constants[e.name] = { value: norm(e.value), enumName: unit.name, index: i, pseudo: true };
                    rec.pseudo.push([e.name, norm(e.value)]);
                });
                enums.push(rec);
            }
            return { constants, enums };
        });

        if (dumped.error) throw new Error(dumped.error);
        return { ...dumped, pageErrors: errors };
    } finally {
        await browser.close();
        await new Promise((r) => server.close(r));
    }
}
