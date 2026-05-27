import { describe, it, expect, beforeAll, vi } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';
import { CCustomSelectMapBase } from '@roro/CCustomSelectMapBase.js';
import { CCustomSelectMapMap } from '@roro/CCustomSelectMapMap.js';

function makeMockCategorySelect() {
    return {
        AddOnChangeSelectDataExtraHandller: vi.fn(),
        GetSelectedDataId: vi.fn().mockReturnValue(0),
    };
}

beforeAll(() => {
    (globalThis as any).HtmlCreateElement = (tag: string, root: any) => {
        const el = document.createElement(tag);
        if (root) root.appendChild(el);
        return el;
    };
    (globalThis as any).HtmlRemoveOptionAll = () => {};
    (globalThis as any).HtmlCreateElementOption = () => {};
    (globalThis as any).TranslateAlias = () => '';
    (globalThis as any).g_MonsterMapDataArray = [];
    (globalThis as any).g_MonsterMapCategoryDataArray = [
        { 0: 99999 }, // index 0 = MONSTER_MAP_DATA_INDEX_ID → MONSTER_MAP_ID_CATEGORY_ALL相当
    ];
    (globalThis as any).MONSTER_MAP_ID_CATEGORY_ALL = 99999;
    (globalThis as any).MONSTER_MAP_DATA_INDEX_ID = 0;
    (globalThis as any).MONSTER_MAP_DATA_INDEX_DATA_ARRAY = 1;
    (globalThis as any).MONSTER_MAP_DATA_INDEX_KIND = 2;
    (globalThis as any).MONSTER_MAP_KIND_MEMORIAL_DUNGEON = 1;
    (globalThis as any).MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON = 99998;
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

    describe('window互換確認', () => {
        it('window.CCustomSelectMapMap が設定されている', () => {
            expect((window as any).CCustomSelectMapMap).toBe(CCustomSelectMapMap);
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
            (globalThis as any).g_MonsterMapDataArray = [];
            const result = obj.RebuildSelectDataSubGetDataArray();
            expect(Array.isArray(result)).toBe(true);
        });
        it('RebuildSelectDataSubDataFilter: 全地域カテゴリの場合は true を返す', () => {
            const dataObj = { 0: 10, 1: [], 2: 0 }; // ID=10
            const result = obj.RebuildSelectDataSubDataFilter(dataObj);
            expect(result).toBe(true);
        });
    });
});
