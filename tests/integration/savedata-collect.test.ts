/**
 * savedata-collect.js の差分オラクル（残件台帳 B-11 Phase 0）。
 *
 * `CSaveDataManager.encodeToURL()` は現在、最新形式のセーブを作るのに旧形式の保存処理
 * （`SaveSystem()` → `translateFromOldFormat()`）を経由している。`buildSaveDataUnitsFromState()`
 * （`engine/savedata/savedata-collect.js`）はその迂回を経ずに状態から直接ユニットを組み立てる
 * 並行実装で、`MIGRATED_SAVE_DATA_UNIT_TYPES` に載った型だけを対象とする。
 *
 * 比較単位はユニット1件ずつ（type + parsedMap の完全一致）。URL全体のバイト比較ではなく
 * prop単位で差分が出るため、Phase A の各コミットで移植ミスの原因を局所化できる。
 * 本番経路（CSaveDataManager 本体）は一切変更しない——このテストは新旧2つの組み立て結果を
 * 突き合わせるだけで、既存の calcx.test.ts の役割（本番との出力比較）とは独立している。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries, waitForBattleResultRendered } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

const entries = [
    ...loadSaveDataEntries(join(__dirname, 'fixtures/sample-savedata-new.md'), 'new'),
    ...loadSaveDataEntries(join(__dirname, 'fixtures/sample-savedata-old.md'), 'old'),
];

let server: Awaited<ReturnType<typeof startStaticServer>>['server'];
let baseUrl: string;
let browser: Browser;

beforeAll(async () => {
    ({ server, baseUrl } = await startStaticServer(PROJECT_ROOT));
    browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
    await browser?.close();
    await closeServer(server);
});

type UnitJson = { parsedMap: Record<string, unknown> };

/** type ごとにグルーピングし、各グループ内は JSON文字列でソートして配列順序に依存しないようにする */
function groupByType(units: UnitJson[]): Record<number, string[]> {
    const map = new Map<number, string[]>();
    for (const unit of units) {
        const type = Number(unit.parsedMap.type);
        const list = map.get(type) ?? [];
        list.push(JSON.stringify(unit.parsedMap));
        map.set(type, list);
    }
    for (const list of map.values()) list.sort();
    return Object.fromEntries(map);
}

describe('savedata-collect.js 差分オラクル（残件台帳 B-11 Phase 0）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-{new,old}.md に URL を追加してください）', () => {
            console.warn('sample-savedata-{new,old}.md にエントリがないためスキップ');
        });
        return;
    }

    for (const { label, query } of entries) {
        it(`${label}: 移植済み型のユニットが現行経路（CSaveDataManager）と新builderで一致する`, async () => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const qi = query.indexOf('?');
            const q = qi >= 0 ? query.slice(qi) : `?${query}`;
            try {
                await page.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
                await waitForBattleResultRendered(page);

                const { legacyUnits, builderUnits } = await page.evaluate(async () => {
                    const dynamicImport = new Function('specifier', 'return import(specifier);') as
                        (specifier: string) => Promise<Record<string, any>>;
                    const { serializeSaveDataUnitsToJSON } = await dynamicImport('/engine/savedata/CSaveDataUnitJsonCodec.js');
                    const { buildSaveDataUnitsFromState, MIGRATED_SAVE_DATA_UNIT_TYPES } =
                        await dynamicImport('/engine/savedata/savedata-collect.js');
                    const reg = (globalThis as any)._ratorioReg;
                    const mgr = reg.CSaveController.getSaveDataManagerCur();
                    // 保存直前の状態採取（history_clip クリック時と同じ呼び出し。CSaveController.js 参照）
                    mgr.ReCalcManager();
                    const legacyAll = JSON.parse(mgr.encodeToJSON());
                    const builderAll = JSON.parse(serializeSaveDataUnitsToJSON(buildSaveDataUnitsFromState()));
                    const migratedSet = new Set(MIGRATED_SAVE_DATA_UNIT_TYPES as number[]);
                    const filterMigrated = (units: any[]) => units.filter((u) => migratedSet.has(Number(u.parsedMap.type)));
                    return {
                        legacyUnits: filterMigrated(legacyAll),
                        builderUnits: filterMigrated(builderAll),
                    };
                });

                expect(groupByType(builderUnits)).toEqual(groupByType(legacyUnits));
            } finally {
                await context.close();
            }
        });
    }
});
