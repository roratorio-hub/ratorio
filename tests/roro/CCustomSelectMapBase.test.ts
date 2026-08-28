import { describe, it, expect, beforeEach } from 'vitest';
import { CCustomSelectBase } from '@engine/monster/CCustomSelectBase.js';
import { CCustomSelectMapBase } from '@engine/monster/CCustomSelectMapBase.js';

describe('CCustomSelectMapBase.js', () => {
    describe('エクスポート確認', () => {
        it('CCustomSelectBase を継承している', () => {
            const obj = new CCustomSelectMapBase();
            expect(obj).toBeInstanceOf(CCustomSelectBase);
        });
    });

    describe('インスタンスメソッド動作確認', () => {
        let obj: any;
        beforeEach(() => { obj = new CCustomSelectMapBase(); });
        it('RebuildSelectDataSubGetDataArray は空配列を返す（デフォルト実装）', () => {
            expect(obj.RebuildSelectDataSubGetDataArray()).toEqual([]);
        });
        it('RebuildSelectDataSubDataFilter は true を返す（デフォルト実装）', () => {
            expect(obj.RebuildSelectDataSubDataFilter({})).toBe(true);
        });
    });
});
