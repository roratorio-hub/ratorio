/**
 * 職業変更「維持ON」× 壊れたエンチャント定義セーブデータ の回帰テスト
 *
 * 背景（Issue #1562）:
 *   グリンカムビ／ハルピュイアのスロット2・4のエンチャント候補リストが入れ替わっていた
 *   （84eddb8d で修正済み）。壊れた定義下で作られたセーブデータは既に流通しており、
 *   それをロードするとスロット2/4のエンチャント欄が空欄になる。
 *   さらにその状態で「職業変更時に装備等を維持する」をONにして職業変更すると、
 *   本来空欄になるだけで済むはずが**全装備がリセットされる**。
 *
 * 原因（調査ログより）:
 *   壊れた定義下のセーブデータは cardCategoryID が 0 のまま cardID だけ非0で残る
 *   不整合ペアを含む。ロード側の funcLoadAndSetCard（CSaveDataManager.js）は
 *   enchListId（カテゴリ）が 0 のときオプション存在検証を素通りし、存在しない
 *   cardID をステートフルデータへそのまま書き戻す。維持ONの職業変更は
 *   encodeToURL()→loadFromURL() の往復で実装されており（B-11 Phase A5-2以前は
 *   SaveSystem()→loadFromURL()）、Init() が装備を全消去した後に壊れたステートフルデータを
 *   再投入することで、装備の再構築に支障が出る。
 *
 * 本テストで検証すること:
 *   1. 壊れた定義下のセーブデータ（フィクスチャ、ユーザー提供の実データ）を読み込むと
 *      装備（盾・鎧など）が正しく復元されること
 *   2. 「維持ON」でスピリットハンドラーへ職業変更した後も、盾など無関係の装備が
 *      維持されること（現状は全滅する）
 *
 * 参照: fixtures/broken-enchant-migrate-jobchange.md
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';
import { type Server } from 'node:http';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

const FIXTURE_PATH = join(__dirname, 'fixtures/broken-enchant-migrate-jobchange.md');
const entries = loadSaveDataEntries(FIXTURE_PATH, 'broken-enchant');

// MIG_JOB_ID_SPIRIT_HANDLER（engine/data/mig.job.id.js）
const MIG_JOB_ID_SPIRIT_HANDLER = 85;

// 装備欄の OBJID（衣装を除く全箇所）
const EQUIP_OBJIDS = [
    'OBJID_ARMS_RIGHT', 'OBJID_SHIELD',
    'OBJID_HEAD_TOP', 'OBJID_HEAD_MID', 'OBJID_HEAD_UNDER',
    'OBJID_BODY', 'OBJID_SHOULDER', 'OBJID_SHOES',
    'OBJID_ACCESSORY_1', 'OBJID_ACCESSORY_2',
] as const;

async function readEquipSnapshot(page: Page): Promise<Record<string, string>> {
    return page.evaluate((ids) => {
        const out: Record<string, string> = {};
        for (const id of ids) {
            const el = document.getElementById(id) as HTMLSelectElement | null;
            out[id] = el ? el.value : '(要素なし)';
        }
        return out;
    }, EQUIP_OBJIDS);
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

describe('職業変更「維持ON」× 壊れたエンチャント定義セーブデータ', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（fixtures/broken-enchant-migrate-jobchange.md に URL がありません）', () => {
            console.warn('broken-enchant-migrate-jobchange.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];

    it('壊れた定義下のセーブデータをロードすると装備が復元される（前提確認）', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
            waitUntil: 'networkidle',
            timeout: 60000,
        });

        // ロード完了を待機（職業値がデフォルト "0" から変化するまで）
        await page.waitForFunction(
            () => {
                const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                return job !== null && job.value !== '' && job.value !== '0';
            },
            { timeout: 10000 },
        );

        const snapshot = await readEquipSnapshot(page);

        // 職業「アリテア」・盾「アイアンシールド」(itemID 2241)・鎧「グリンカムビ」(itemID 5784)
        expect(snapshot['OBJID_SHIELD'], JSON.stringify(snapshot)).toBe('2241');
        expect(snapshot['OBJID_BODY'], JSON.stringify(snapshot)).toBe('5784');

        await context.close();
    });

    it('「維持ON」で職業をスピリットハンドラーへ変更しても、無関係の装備（盾）が残る', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

        await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
            waitUntil: 'networkidle',
            timeout: 60000,
        });

        await page.waitForFunction(
            () => {
                const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                return job !== null && job.value !== '' && job.value !== '0';
            },
            { timeout: 10000 },
        );

        // 前提: 盾が装備されている（アイアンシールド）
        const before = await readEquipSnapshot(page);
        expect(before['OBJID_SHIELD'], JSON.stringify(before)).toBe('2241');

        // 「職業変更時に装備等を維持する」をON
        await page.check('#OBJID_CHK_MIGRATE_SETTING');

        // 職業をスピリットハンドラーへ変更（migrateOtherJob 内部は setTimeout(…, 0) を
        // 2段挟むため、変更完了を職業値そのもので待つ）
        await page.selectOption('#OBJID_SELECT_JOB', String(MIG_JOB_ID_SPIRIT_HANDLER));
        await page.waitForFunction(
            (expected) => {
                const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                return job !== null && job.value === expected;
            },
            String(MIG_JOB_ID_SPIRIT_HANDLER),
            { timeout: 10000 },
        );
        // インジケーター非表示・DOM再構築の完了を少し待つ
        await page.waitForTimeout(500);

        const after = await readEquipSnapshot(page);

        // 盾はスピリットハンドラーでも装備制限に引っかからない部位のはずであり、
        // 「維持する」設定なら残っているべき。壊れたエンチャント定義の後始末に
        // よって全装備リセットが起きていないかを見る代表指標として使う。
        expect(errors, `職業変更操作中に未捕捉例外:\n${errors.join('\n')}`).toHaveLength(0);
        expect(
            after['OBJID_SHIELD'],
            `維持ONでの職業変更後、盾（アイアンシールド想定）が消えている。\n` +
            `変更前: ${JSON.stringify(before)}\n変更後: ${JSON.stringify(after)}`,
        ).toBe('2241');

        await context.close();
    });
});
