import { describe, it, expect } from 'vitest';
import { CCustomSelectMapBase } from '../../roro/m/js/CCustomSelectMapBase.js';
import { CCustomSelectMapCategory } from '../../roro/m/js/CCustomSelectMapCategory.js';

describe('CCustomSelectMapCategory', () => {
    it('CCustomSelectMapCategory を export する', () => {
        expect(typeof CCustomSelectMapCategory).toBe('function');
    });

    it('window compat ブロックで window.CCustomSelectMapCategory が設定される', () => {
        expect(window.CCustomSelectMapCategory).toBe(CCustomSelectMapCategory);
    });

    it('prototype が CCustomSelectMapBase のインスタンスである', () => {
        expect(CCustomSelectMapCategory.prototype).toBeInstanceOf(CCustomSelectMapBase);
    });

    it('コンストラクタ内にインスタンスメソッドが定義されている', () => {
        const src = CCustomSelectMapCategory.toString();
        expect(src).toContain('this.GetMonsterMapData');
        expect(src).toContain('this.RebuildSelectDataSubGetDataArray');
        expect(src).toContain('this.RebuildHelpAreaSub');
    });
});
