import { describe, it, expect } from 'vitest';
import { CCustomSelectBase } from '../../roro/m/js/CCustomSelectBase.js';
import { CCustomSelectMapBase } from '../../roro/m/js/CCustomSelectMapBase.js';

describe('CCustomSelectMapBase', () => {
    it('CCustomSelectMapBase を export する', () => {
        expect(typeof CCustomSelectMapBase).toBe('function');
    });

    it('window compat ブロックで window.CCustomSelectMapBase が設定される', () => {
        expect(window.CCustomSelectMapBase).toBe(CCustomSelectMapBase);
    });

    it('prototype が CCustomSelectBase のインスタンスである', () => {
        expect(CCustomSelectMapBase.prototype).toBeInstanceOf(CCustomSelectBase);
    });

    it('静的ソートメソッドが定義されている', () => {
        expect(typeof CCustomSelectMapBase.SortByName).toBe('function');
        expect(typeof CCustomSelectMapBase.SortById).toBe('function');
    });

    it('インスタンスメソッドが定義されている', () => {
        const inst = new CCustomSelectMapBase();
        expect(typeof inst.RebuildSelectDataSub).toBe('function');
        expect(typeof inst.RebuildSelectDataSubGetDataArray).toBe('function');
        expect(typeof inst.RebuildSelectDataSubDataFilter).toBe('function');
        expect(typeof inst.RebuildSelectSortSub).toBe('function');
        expect(typeof inst.RebuildSearchResultSub).toBe('function');
    });
});
