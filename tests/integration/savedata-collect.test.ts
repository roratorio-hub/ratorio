/**
 * savedata-collect.js の差分オラクル（残件台帳 B-11 Phase 0）。
 *
 * `CSaveDataManager.encodeToURL()` は現在、最新形式のセーブを作るのに旧形式の保存処理
 * （`SaveSystem()` → `translateFromOldFormat()`）を経由している。`buildSaveDataUnitsFromState()`
 * （`engine/savedata/savedata-collect.js`）はその迂回を経ずに状態から直接ユニットを組み立てる
 * 並行実装で、`MIGRATED_SAVE_DATA_UNITS`（`isMigratedSaveDataUnit()`）に載ったユニットだけを対象とする。
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

/**
 * キー挿入順を無視して比較するための正規化文字列（ソート専用。比較そのものは
 * toEqual の構造的等価性に任せる）。
 *
 * `setProp()` で組み立てたユニットは `doCompaction()` が `parseCtrlFlag` を最後に
 * 上書きするため、実パース経由のユニット（`propNames` 宣言順）とキー挿入順が
 * 一致しない（プロジェクト全体の `#collectDataXxx()` 系に共通する挙動であり、
 * `encodeToURL()` は `propNames` の配列順で読むためバイト出力には影響しない）。
 * そのため JSON文字列の直接比較ではなく、キーをソートしてから比較する。
 */
function canonicalize(obj: Record<string, unknown>): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
}

/** type ごとにグルーピングし、各グループ内は正規化キーでソートして配列順序に依存しないようにする */
function groupByType(units: UnitJson[]): Record<number, Record<string, unknown>[]> {
    const map = new Map<number, Record<string, unknown>[]>();
    for (const unit of units) {
        const type = Number(unit.parsedMap.type);
        const list = map.get(type) ?? [];
        list.push(unit.parsedMap);
        map.set(type, list);
    }
    for (const list of map.values()) list.sort((a, b) => canonicalize(a).localeCompare(canonicalize(b)));
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
                    const { buildSaveDataUnitsFromState, isMigratedSaveDataUnit } =
                        await dynamicImport('/engine/savedata/savedata-collect.js');
                    const reg = (globalThis as any)._ratorioReg;
                    const mgr = reg.CSaveController.getSaveDataManagerCur();
                    // 保存直前の状態採取（history_clip クリック時と同じ呼び出し。CSaveController.js 参照）
                    mgr.ReCalcManager();
                    const legacyAll = JSON.parse(mgr.encodeToJSON());
                    const builderAll = JSON.parse(serializeSaveDataUnitsToJSON(buildSaveDataUnitsFromState()));
                    const filterMigrated = (units: any[]) => units.filter((u) => isMigratedSaveDataUnit(u.parsedMap));
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
