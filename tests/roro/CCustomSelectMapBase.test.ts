import { describe, it, expect, beforeEach } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';
import { CCustomSelectMapBase } from '@roro/CCustomSelectMapBase.js';

describe('CCustomSelectMapBase.js', () => {
    describe('エクスポート確認', () => {
        it('CCustomSelectMapBase が関数（コンストラクタ）', () => {
            expect(typeof CCustomSelectMapBase).toBe('function');
        });
        it('CCustomSelectBase を継承している', () => {
            const obj = new CCustomSelectMapBase();
            expect(obj).toBeInstanceOf(CCustomSelectBase);
        });
    });

    describe('インスタンスメソッド存在確認', () => {
        let obj: any;
        beforeEach(() => { obj = new CCustomSelectMapBase(); });
        const methods = [
            'Initialize',
            'RebuildSelectDataSub', 'RebuildSelectDataSubGetDataArray', 'RebuildSelectDataSubDataFilter',
            'RebuildSelectSortSub',
            'RebuildSearchResultSub',
        ];
        for (const m of methods) {
            it(`インスタンスメソッド ${m} が関数`, () => {
                expect(typeof obj[m]).toBe('function');
            });
        }
        it('RebuildSelectDataSubGetDataArray は空配列を返す（デフォルト実装）', () => {
            expect(obj.RebuildSelectDataSubGetDataArray()).toEqual([]);
        });
        it('RebuildSelectDataSubDataFilter は true を返す（デフォルト実装）', () => {
            expect(obj.RebuildSelectDataSubDataFilter({})).toBe(true);
        });
    });

    describe('静的メソッド確認', () => {
        it('SortByName が関数', () => {
            expect(typeof CCustomSelectMapBase.SortByName).toBe('function');
        });
        it('SortById が関数', () => {
            expect(typeof CCustomSelectMapBase.SortById).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CCustomSelectMapBase が設定されている', () => {
            expect((window as any).CCustomSelectMapBase).toBe(CCustomSelectMapBase);
        });
    });
});
