import { vi, describe, it, expect, beforeAll } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';
import { CCustomSelectMapBase } from '@roro/CCustomSelectMapBase.js';
import { CCustomSelectMapMap } from '@roro/CCustomSelectMapMap.js';

const mockMapRefs = vi.hoisted(() => ({
    categoryArr: [] as any[],
    mapArr: [] as any[],
}));

vi.mock('@roro/monstermap.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return {
        ...actual,
        get g_MonsterMapCategoryDataArray() { return mockMapRefs.categoryArr; },
        get g_MonsterMapDataArray() { return mockMapRefs.mapArr; },
    };
});

function makeMockCategorySelect() {
    return {
        AddOnChangeSelectDataExtraHandller: vi.fn(),
        GetSelectedDataId: vi.fn().mockReturnValue(0),
    };
}

beforeAll(() => {
    (globalThis as any).TranslateAlias = () => '';
    // MONSTER_MAP_ID_CATEGORY_ALL=0, MONSTER_MAP_DATA_INDEX_ID=0 はDefineEnumで定義済み
    mockMapRefs.categoryArr = [[0]]; // categoryArr[0][MONSTER_MAP_DATA_INDEX_ID=0] = 0 = MONSTER_MAP_ID_CATEGORY_ALL
});

describe('CCustomSelectMapMap.js', () => {
    describe('エクスポート確認', () => {
        it('CCustomSelectMapMap が関数（コンストラクタ）', () => {
            expect(typeof CCustomSelectMapMap).toBe('function');
        });
        it('CCustomSelectMapBase を継承している', () => {
            expect(CCustomSelectMapMap.prototype).toBeInstanceOf(CCustomSelectMapBase);
        });
        it('CCustomSelectBase を継承している', () => {
            expect(CCustomSelectMapMap.prototype).toBeInstanceOf(CCustomSelectBase);
        });
    });

    describe('インスタンスメソッド確認', () => {
        let obj: any;
        beforeAll(() => {
            obj = new CCustomSelectMapMap('TEST_MAP', makeMockCategorySelect());
        });

        it('GetMonsterMapData が関数', () => {
            expect(typeof obj.GetMonsterMapData).toBe('function');
        });
        it('RebuildSelectDataSubGetDataArray が関数', () => {
            expect(typeof obj.RebuildSelectDataSubGetDataArray).toBe('function');
        });
        it('RebuildSelectDataSubDataFilter が関数', () => {
            expect(typeof obj.RebuildSelectDataSubDataFilter).toBe('function');
        });
        it('RebuildHelpAreaSub が関数', () => {
            expect(typeof obj.RebuildHelpAreaSub).toBe('function');
        });
        it('Initialize が関数', () => {
            expect(typeof obj.Initialize).toBe('function');
        });
        it('Initialize 後に instanceIdName が設定されている', () => {
            expect(obj.instanceIdName).toBe('TEST_MAP');
        });
        it('categorySelect が保持されている', () => {
            expect(obj.categorySelect).not.toBeNull();
        });
        it('RebuildSelectDataSubGetDataArray は配列を返す', () => {
            const result = obj.RebuildSelectDataSubGetDataArray();
            expect(Array.isArray(result)).toBe(true);
        });
        it('RebuildSelectDataSubDataFilter: 全地域カテゴリの場合は true を返す', () => {
            // categoryArr[0][0] = 0 = MONSTER_MAP_ID_CATEGORY_ALL → 無条件 true
            const dataObj = [10]; // dataObj[MONSTER_MAP_DATA_INDEX_ID=0] = 10
            const result = obj.RebuildSelectDataSubDataFilter(dataObj);
            expect(result).toBe(true);
        });
    });
});
