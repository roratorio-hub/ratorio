import { describe, it, expect } from 'vitest';
import { CBattleCalcResult } from '@ro4/CBattleCalcResult.js';

describe('CBattleCalcResult.js', () => {
    describe('エクスポート確認', () => {
        it('CBattleCalcResult が関数（コンストラクタ）', () => {
            expect(typeof CBattleCalcResult).toBe('function');
        });
    });

    describe('インスタンス初期値確認', () => {
        let obj: any;
        beforeEach(() => { obj = new CBattleCalcResult(); });

        it('skillId が 0', () => { expect(obj.skillId).toBe(0); });
        it('skillLv が 0', () => { expect(obj.skillLv).toBe(0); });
        it('childResultArray が配列', () => {
            expect(Array.isArray(obj.childResultArray)).toBe(true);
        });
    });

    describe('インスタンスメソッド存在確認', () => {
        let obj: any;
        beforeEach(() => { obj = new CBattleCalcResult(); });

        const methods = ['Clone'];
        for (const m of methods) {
            it(`${m} が関数`, () => {
                expect(typeof obj[m]).toBe('function');
            });
        }

        it('Clone が新しいインスタンスを返す', () => {
            const clone = obj.Clone();
            expect(clone).not.toBe(obj);
            expect(clone).toBeInstanceOf(CBattleCalcResult);
        });
    });
});
