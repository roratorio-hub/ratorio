import { describe, it, expect } from 'vitest';
import { CBattleCalcInfo } from '@ro4/CBattleCalcInfo.js';

describe('CBattleCalcInfo.js', () => {
    describe('インスタンス動作', () => {
        it('Clone がプリミティブフィールドを正しくコピーする', () => {
            const info = new (CBattleCalcInfo as any)();
            info.skillId = 42;
            const clone = info.Clone();
            expect(clone.skillId).toBe(42);
            expect(clone).not.toBe(info);
        });

        it('Clone は atkUnitArrayWpn をディープコピーする', () => {
            const info = new (CBattleCalcInfo as any)();
            info.atkUnitArrayWpn[0][0] = 999;
            const clone = info.Clone();
            expect(clone.atkUnitArrayWpn[0][0]).toBe(999);
            clone.atkUnitArrayWpn[0][0] = 0;
            expect(info.atkUnitArrayWpn[0][0]).toBe(999);
        });
    });
});
