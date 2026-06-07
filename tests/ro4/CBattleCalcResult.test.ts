import { describe, it, expect, beforeEach } from 'vitest';
import { CBattleCalcResult } from '@ro4/CBattleCalcResult.js';

describe('CBattleCalcResult.js', () => {
    let obj: any;
    beforeEach(() => { obj = new CBattleCalcResult(); });

    it('Clone は元と別の独立したインスタンスを返す', () => {
        obj.skillId = 42;
        const clone = obj.Clone();
        expect(clone).not.toBe(obj);
        expect(clone).toBeInstanceOf(CBattleCalcResult);
        expect(clone.skillId).toBe(42);
        // 独立性: clone を変更しても元に影響しない
        clone.skillId = 99;
        expect(obj.skillId).toBe(42);
    });
});
