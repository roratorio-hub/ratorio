import { describe, it, expect, beforeAll } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';
import { CCustomSelectMapBase } from '@roro/CCustomSelectMapBase.js';
import { CCustomSelectMapCategory } from '@roro/CCustomSelectMapCategory.js';

beforeAll(() => {
    (globalThis as any).HtmlCreateElement = (tag: string, root: any) => {
        const el = document.createElement(tag);
        if (root) root.appendChild(el);
        return el;
    };
    (globalThis as any).HtmlRemoveOptionAll = () => {};
    (globalThis as any).HtmlCreateElementOption = () => {};
    (globalThis as any).TranslateAlias = () => '';
    (globalThis as any).g_MonsterMapCategoryDataArray = [];
});

describe('CCustomSelectMapCategory.js', () => {
    describe('エクスポート確認', () => {
        it('CCustomSelectMapCategory が関数（コンストラクタ）', () => {
            expect(typeof CCustomSelectMapCategory).toBe('function');
        });
        it('CCustomSelectMapBase を継承している', () => {
            expect(CCustomSelectMapCategory.prototype).toBeInstanceOf(CCustomSelectMapBase);
        });
        it('CCustomSelectBase を継承している', () => {
            expect(CCustomSelectMapCategory.prototype).toBeInstanceOf(CCustomSelectBase);
        });
    });

    describe('window互換確認', () => {
        it('window.CCustomSelectMapCategory が設定されている', () => {
            expect((window as any).CCustomSelectMapCategory).toBe(CCustomSelectMapCategory);
        });
    });

    describe('インスタンスメソッド確認', () => {
        let obj: any;
        beforeAll(() => {
            obj = new CCustomSelectMapCategory('TEST_CATEGORY');
        });

        it('GetMonsterMapData が関数', () => {
            expect(typeof obj.GetMonsterMapData).toBe('function');
        });
        it('RebuildSelectDataSubGetDataArray が関数', () => {
            expect(typeof obj.RebuildSelectDataSubGetDataArray).toBe('function');
        });
        it('RebuildHelpAreaSub が関数', () => {
            expect(typeof obj.RebuildHelpAreaSub).toBe('function');
        });
        it('Initialize 後に instanceIdName が設定されている', () => {
            expect(obj.instanceIdName).toBe('TEST_CATEGORY');
        });
        it('RebuildSelectDataSubGetDataArray は g_MonsterMapCategoryDataArray を複製して返す', () => {
            (globalThis as any).g_MonsterMapCategoryDataArray = [{ id: 1 }, { id: 2 }];
            const result = obj.RebuildSelectDataSubGetDataArray();
            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(2);
            (globalThis as any).g_MonsterMapCategoryDataArray = [];
        });
        it('RebuildSelectDataSubDataFilter はデフォルトで true を返す', () => {
            expect(obj.RebuildSelectDataSubDataFilter({})).toBe(true);
        });
    });
});
