import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import { CAttackMethodConf } from '@roro/CAttackMethodConf.js';

describe('CAttackMethodConf.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('ATTACK_METHOD_SOURCE_TYPE_JOB_LEARN が 0 に定義される', () => {
            expect((globalThis as any).ATTACK_METHOD_SOURCE_TYPE_JOB_LEARN).toBe(0);
        });
        it('ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL が 1 に定義される', () => {
            expect((globalThis as any).ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL).toBe(1);
        });
        it('ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL が 2 に定義される', () => {
            expect((globalThis as any).ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL).toBe(2);
        });
        it('ATTACK_METHOD_BY_MIG_EQUIPABLE_SP_EFFECT が 3 に定義される', () => {
            expect((globalThis as any).ATTACK_METHOD_BY_MIG_EQUIPABLE_SP_EFFECT).toBe(3);
        });
    });

    describe('インスタンスメソッド確認', () => {
        it('SetSkillId / GetSkillId が動作する', () => {
            const obj = new CAttackMethodConf();
            obj.SetSkillId('42');
            expect(obj.GetSkillId()).toBe(42);
        });
        it('SetSourceType / GetSourceType が動作する', () => {
            const obj = new CAttackMethodConf();
            obj.SetSourceType(2);
            expect(obj.GetSourceType()).toBe(2);
        });
        it('SetSkillLv / GetSkillLv が動作する', () => {
            const obj = new CAttackMethodConf();
            obj.SetSkillLv('5');
            expect(obj.GetSkillLv()).toBe(5);
        });
        it('SetOptionValue / GetOptionValue が動作する', () => {
            const obj = new CAttackMethodConf();
            obj.SetOptionValue(0, '10');
            expect(obj.GetOptionValue(0)).toBe(10);
        });
        it('GetOptionValue は範囲外インデックスで 0 を返す', () => {
            const obj = new CAttackMethodConf();
            expect(obj.GetOptionValue(99)).toBe(0);
        });
        it('GetOptionValueCount が配列長を返す', () => {
            const obj = new CAttackMethodConf();
            obj.SetOptionValueArray([1, 2, 3]);
            expect(obj.GetOptionValueCount()).toBe(3);
        });
        it('SetOptionValueArray / GetOptionValueArray が動作する', () => {
            const obj = new CAttackMethodConf();
            obj.SetOptionValueArray(['1', '2', '3']);
            expect(obj.GetOptionValueArray()).toEqual([1, 2, 3]);
        });
    });

    describe('Clone 確認', () => {
        it('Clone でディープコピーされる', () => {
            const obj = new CAttackMethodConf();
            obj.SetSkillId(10);
            obj.SetSourceType(1);
            obj.SetSkillLv(3);
            obj.SetOptionValueArray([5, 6]);
            const clone = obj.Clone();
            expect(clone.GetSkillId()).toBe(10);
            expect(clone.GetSourceType()).toBe(1);
            expect(clone.GetSkillLv()).toBe(3);
            expect(clone.GetOptionValueArray()).toEqual([5, 6]);
        });
        it('Clone はoptionValueArrayを独立してコピーする', () => {
            const obj = new CAttackMethodConf();
            obj.SetOptionValueArray([1, 2]);
            const clone = obj.Clone();
            clone.SetOptionValue(0, 99);
            expect(obj.GetOptionValue(0)).toBe(1);
        });
    });
});
