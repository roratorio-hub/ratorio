import { describe, it, expect } from 'vitest';
import { CCustomSelectMapBase } from '../../roro/m/js/CCustomSelectMapBase.js';
import { CCustomSelectMapMap } from '../../roro/m/js/CCustomSelectMapMap.js';

describe('CCustomSelectMapMap', () => {
    it('CCustomSelectMapMap を export する', () => {
        expect(typeof CCustomSelectMapMap).toBe('function');
    });

    it('window compat ブロックで window.CCustomSelectMapMap が設定される', () => {
        expect(window.CCustomSelectMapMap).toBe(CCustomSelectMapMap);
    });

    it('prototype が CCustomSelectMapBase のインスタンスである', () => {
        expect(CCustomSelectMapMap.prototype).toBeInstanceOf(CCustomSelectMapBase);
    });

    it('コンストラクタ内にインスタンスメソッドが定義されている', () => {
        const src = CCustomSelectMapMap.toString();
        expect(src).toContain('this.GetMonsterMapData');
        expect(src).toContain('this.RebuildSelectDataSubGetDataArray');
        expect(src).toContain('this.RebuildSelectDataSubDataFilter');
        expect(src).toContain('this.RebuildHelpAreaSub');
    });
});
