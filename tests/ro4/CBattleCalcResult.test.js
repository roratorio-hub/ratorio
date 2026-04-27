import { describe, it, expect } from 'vitest';
import { CBattleCalcResult } from '../../ro4/m/js/CBattleCalcResult.js';

describe('CBattleCalcResult', () => {
    it('CBattleCalcResult を export する', () => {
        expect(typeof CBattleCalcResult).toBe('function');
    });

    it('window compat ブロックで window.CBattleCalcResult が設定される', () => {
        expect(window.CBattleCalcResult).toBe(CBattleCalcResult);
    });

    it('インスタンスを生成できる', () => {
        const result = new CBattleCalcResult();
        expect(result).toBeInstanceOf(CBattleCalcResult);
    });

    it('インスタンスメソッド Clone が定義される', () => {
        const result = new CBattleCalcResult();
        expect(typeof result.Clone).toBe('function');
    });
});
