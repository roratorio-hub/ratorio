import { describe, it, expect } from 'vitest';
import { CBattleCalcInfo } from '@ro4/CBattleCalcInfo.js';

describe('CBattleCalcInfo.js', () => {
    describe('エクスポート確認', () => {
        it('CBattleCalcInfo がエクスポートされている', () => {
            expect(CBattleCalcInfo).toBeDefined();
            expect(typeof CBattleCalcInfo).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CBattleCalcInfo が設定されている', () => {
            expect((window as any).CBattleCalcInfo).toBe(CBattleCalcInfo);
        });
    });

    describe('インスタンス動作', () => {
        it('インスタンスが生成できる', () => {
            const info = new (CBattleCalcInfo as any)();
            expect(info).toBeDefined();
        });

        it('数値フィールドの初期値が正しい', () => {
            const info = new (CBattleCalcInfo as any)();
            expect(info.skillId).toBe(0);
            expect(info.skillLv).toBe(0);
            expect(info.actRate).toBe(0);
            expect(info.hitRate).toBe(0);
            expect(info.criRate).toBe(0);
            expect(info.statusAtk).toBe(0);
            expect(info.masteryAtk).toBe(0);
            expect(info.dmgAmpRate).toBe(0);
            expect(info.bAutoSpell).toBe(false);
            expect(info.parentSkillId).toBeUndefined();
        });

        it('atkUnitArrayWpn の初期値は [[0,0,0],[0,0,0]]', () => {
            const info = new (CBattleCalcInfo as any)();
            expect(info.atkUnitArrayWpn).toEqual([[0, 0, 0], [0, 0, 0]]);
        });

        it('atkUnitArrayCri の初期値は [[0,0,0],[0,0,0]]', () => {
            const info = new (CBattleCalcInfo as any)();
            expect(info.atkUnitArrayCri).toEqual([[0, 0, 0], [0, 0, 0]]);
        });

        it('atkUnitArrayWug の初期値は [[0,0,0]]', () => {
            const info = new (CBattleCalcInfo as any)();
            expect(info.atkUnitArrayWug).toEqual([[0, 0, 0]]);
        });

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
