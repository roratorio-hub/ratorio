import { describe, it, expect } from 'vitest';
import { CBattleCalcResultAll, instobject } from '../../ro4/m/js/CBattleCalcResultAll.js';

describe('CBattleCalcResultAll', () => {
    it('CBattleCalcResultAll を export する', () => {
        expect(typeof CBattleCalcResultAll).toBe('function');
    });

    it('instobject を export する', () => {
        expect(typeof instobject).toBe('function');
    });

    it('window compat ブロックで window.CBattleCalcResultAll が設定される', () => {
        expect(window.CBattleCalcResultAll).toBe(CBattleCalcResultAll);
    });

    it('instobject インスタンスを生成できる', () => {
        const obj = new instobject();
        expect(typeof obj.init).toBe('function');
        expect(typeof obj.getHitCount).toBe('function');
    });

    it('CBattleCalcResultAll インスタンスを生成できる', () => {
        const result = new CBattleCalcResultAll();
        expect(result).toBeInstanceOf(CBattleCalcResultAll);
    });
});
