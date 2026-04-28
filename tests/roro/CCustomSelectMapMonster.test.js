import { describe, it, expect } from 'vitest';
import { CCustomSelectBase } from '../../roro/m/js/CCustomSelectBase.js';
import { CCustomSelectMapMonster } from '../../roro/m/js/CCustomSelectMapMonster.js';

describe('CCustomSelectMapMonster', () => {
    it('CCustomSelectMapMonster を export する', () => {
        expect(typeof CCustomSelectMapMonster).toBe('function');
    });

    it('window compat ブロックで window.CCustomSelectMapMonster が設定される', () => {
        expect(window.CCustomSelectMapMonster).toBe(CCustomSelectMapMonster);
    });

    it('prototype が CCustomSelectBase のインスタンスである', () => {
        expect(CCustomSelectMapMonster.prototype).toBeInstanceOf(CCustomSelectBase);
    });

    it('コンストラクタ内にインスタンスメソッドが定義されている', () => {
        const src = CCustomSelectMapMonster.toString();
        expect(src).toContain('this.RebuildSelectDataSub');
        expect(src).toContain('this.RebuildSelectSortSub');
        expect(src).toContain('this.RebuildSearchResultSub');
        expect(src).toContain('this.RebuildHelpAreaSub');
    });

    it('RebuildSelectDataSub: sortKeyIndex / funcGetLabel 宣言漏れの回帰確認', () => {
        const src = CCustomSelectMapMonster.toString();
        expect(src).toContain('var sortKeyIndex');
        expect(src).toContain('var funcGetLabel');
    });
});
