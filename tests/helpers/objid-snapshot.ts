/**
 * integration テスト共有ヘルパー: 静的ファイルサーバー・全 OBJID_* スナップショット・差分整形。
 *
 * 出自: integration/calcx.test.ts のスイート3（セーブデータ復元比較・本番 vs ローカル）で
 * 実装されたロジックを、巨大ファイル分割（foot.js/head.js）の before/after 差分ハーネス
 * （integration/split-regression.test.ts）でも再利用するために切り出したもの。
 * ロジック自体は変更していない（コピー＋ import 差し替えのみ）。
 *
 * 参照: .claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」
 */
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import type { Page } from 'playwright';

// ─── 静的ファイルサーバー ────────────────────────────────────────────────────

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

/** root 配下を配信する静的ファイルサーバーを作る（listen はしない）。 */
export function createStaticServer(root: string): Server {
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

/** root 配下を配信する静的ファイルサーバーを起動し、baseUrl を返す。 */
export async function startStaticServer(root: string): Promise<{ server: Server; baseUrl: string }> {
    const server = createStaticServer(root);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const addr = server.address();
    const port = typeof addr === 'object' && addr !== null ? addr.port : 0;
    return { server, baseUrl: `http://127.0.0.1:${port}` };
}

/** listen 済みサーバーを閉じる（beforeAll/afterAll でのエラー握りつぶし用）。 */
export function closeServer(server: Server | undefined): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!server) { resolve(); return; }
        server.close((err) => (err ? reject(err) : resolve()));
    });
}

// ─── セーブデータフィクスチャ読み込み ───────────────────────────────────────────

export type FixtureEntry = { label: string; url: string; query: string };

/** フィクスチャファイル（1行1URL、#はコメント）から本番URLのリストを読み込む。 */
export function loadSaveDataEntries(filePath: string, prefix: string): FixtureEntry[] {
    if (!existsSync(filePath)) return [];
    return readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'))
        .map((url, i) => {
            const qi = url.indexOf('?');
            return { label: `${prefix}[${i}]`, url, query: qi >= 0 ? url.slice(qi + 1) : '' };
        })
        .filter(({ query }) => query.length > 0);
}

// ─── 全 OBJID_* スナップショット ────────────────────────────────────────────────

/**
 * 全セクション・全設定欄を展開する。
 *
 * Pass 1–2: folding-switch-MIG（calcx.html にハードコードされた CSS折りたたみ開閉スイッチ）
 *   - 2パス実行でネストしたセクション（OBJID_SWITCH_CONFIRM_DIALOG 等）も確実に開く
 *   - 装備スロット・スキルスイッチ等の計算値に直結するチェックボックスは含まない
 * Pass 3: OBJID_CONTROL_CONF_*_SWITCH / OBJID_CONTROL_CONF2_*_SWITCH
 *   - CConfBase / CConfBase2 が BuildUpSelectArea() で動的生成するスイッチ
 *   - onclick="CConfBase.OnClickSwitchHandler(...)" をグローバルスコープで評価するため
 *     window.CConfBase が未登録の場合は ReferenceError が発生する
 *   - このパスを実行することで設定欄の子要素（OBJID_CONTROL_CONF_*_ID_*）が DOM に生成される
 */
export async function expandAllSections(page: Page): Promise<void> {
    page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

    // Pass 1 & 2: CSS 折りたたみセクション（folding-switch-MIG）
    for (let pass = 0; pass < 2; pass++) {
        await page.evaluate(() => {
            document.querySelectorAll<HTMLInputElement>(
                'input[type="checkbox"].folding-switch-MIG:not(:checked)'
            ).forEach((cb) => cb.click());
        });
        await page.waitForTimeout(300);
    }

    // Pass 3: CConfBase / CConfBase2 設定欄スイッチ
    await page.evaluate(() => {
        document.querySelectorAll<HTMLInputElement>(
            '[id^="OBJID_CONTROL_CONF_"][id$="_SWITCH"]:not(:checked), ' +
            '[id^="OBJID_CONTROL_CONF2_"][id$="_SWITCH"]:not(:checked)'
        ).forEach((cb) => cb.click());
    });
    await page.waitForTimeout(500); // BuildUpSelectArea の DOM 再構築を待つ
}

// 本番と意図的に乖離している要素（ローカル側で機能削除済み・仕様差分）。
// calcx.test.ts のスイート3で運用してきた除外リストをそのまま引き継ぐ。
const INTENTIONAL_DIVERGENCE_IDS = new Set([
    'OBJID_CHECK_A3_SKILLSW',
    'OBJID_SELECT_JOB',
    'OBJID_DIV_BATTLE_RESULT_TINY',
]);

/** 全 OBJID_* 要素の値を DOM から直接評価して返す（副作用なし）。 */
export function evalObjidSnapshot(page: Page): Promise<Record<string, string>> {
    return page.evaluate((excludeIds: string[]): Record<string, string> => {
        const snapshot: Record<string, string> = {};
        const exclude = new Set(excludeIds);
        document.querySelectorAll<HTMLElement>('[id^="OBJID_"]').forEach((el) => {
            const id = el.id;
            if (exclude.has(id)) return;
            if (el instanceof HTMLInputElement) {
                if (el.type === 'checkbox' || el.type === 'radio') {
                    snapshot[id] = el.checked ? 'true' : 'false';
                } else {
                    snapshot[id] = el.value;
                }
            } else if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
                snapshot[id] = el.value;
            } else {
                // コンテナ要素（子に OBJID_* を持つ）は除外。葉要素のみ記録する。
                const hasObjidChild = el.querySelector('[id^="OBJID_"]') !== null;
                if (!hasObjidChild) {
                    snapshot[id] = el.textContent?.trim() ?? '';
                }
            }
            // bgcolor 属性（スキルヘッダ等の色表現）は常に記録
            const bg = el.getAttribute('bgcolor');
            if (bg !== null) snapshot[`${id}:bgcolor`] = bg;
        });
        return snapshot;
    }, [...INTENTIONAL_DIVERGENCE_IDS]);
}

/**
 * セーブデータ復元完了まで待ち、全セクションを展開してから全 OBJID_* 要素を取得する。
 */
export async function captureFullObjidSnapshot(page: Page): Promise<Record<string, string>> {
    await page.waitForFunction(
        () => {
            const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
            return job !== null && job.value !== '' && job.value !== '0';
        },
        { timeout: 5000 }
    ).catch(() => { /* 職業未設定のセーブデータはそのまま続行 */ });
    await expandAllSections(page);
    await page.waitForTimeout(200);
    return evalObjidSnapshot(page);
}

/**
 * 期待値スナップショットをベースに、実際値との差分を整形して返す。
 * 期待値にしか存在しないキーのみ比較する（実際値側だけの新規要素は報告しない）。
 * 差分が多い場合は先頭 20 件のみ表示する。
 */
export function buildObjidDiffMessage(
    label: string,
    expected: Record<string, string>,
    actual: Record<string, string>,
    expectedLabel = '本番',
    actualLabel = 'ローカル',
): string {
    const diffs: string[] = [];
    for (const key of Object.keys(expected).sort()) {
        const ev = expected[key];
        const av = actual[key] ?? '(なし)';
        if (ev !== av) {
            diffs.push(`  ${key}:\n    ${expectedLabel}:     ${ev}\n    ${actualLabel}: ${av}`);
        }
    }
    const header = `リグレッション検出 (${label}) — ${diffs.length} 項目（${expectedLabel}にある要素が${actualLabel}と一致しない）:`;
    const body   = diffs.slice(0, 20).join('\n');
    const tail   = diffs.length > 20 ? `\n  ...他 ${diffs.length - 20} 件（全差分はスタックトレースを参照）` : '';
    return [header, body, tail].filter(Boolean).join('\n');
}
