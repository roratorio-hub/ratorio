import { describe, it, expect } from 'vitest';
import { CSkillData, CSkillManager } from '@roro/CSkillManager.js';

describe('CSkillManager.js', () => {
    describe('エクスポート確認', () => {
        it('CSkillData が関数', () => expect(typeof CSkillData).toBe('function'));
        it('CSkillManager が関数', () => expect(typeof CSkillManager).toBe('function'));
    });

    describe('window互換確認', () => {
        it('window.CSkillData が設定されている', () => expect((window as any).CSkillData).toBe(CSkillData));
        it('window.CSkillManager が設定されている', () => expect((window as any).CSkillManager).toBe(CSkillManager));
    });

    describe('CSkillData 静的プロパティ（インスタンス生成後に確定）', () => {
        // new CSkillData() を呼ぶことでコンストラクタ内の静的代入が実行される
        const _dummy = new CSkillData();
        it('TYPE_PASSIVE が 1',             () => expect(CSkillData.TYPE_PASSIVE).toBe(1));
        it('TYPE_ACTIVE が 2',              () => expect(CSkillData.TYPE_ACTIVE).toBe(2));
        it('TYPE_PHYSICAL が 4',            () => expect(CSkillData.TYPE_PHYSICAL).toBe(4));
        it('TYPE_MAGICAL が 8',             () => expect(CSkillData.TYPE_MAGICAL).toBe(8));
        it('TYPE_100HIT が 16',             () => expect(CSkillData.TYPE_100HIT).toBe(16));
        it('TYPE_DIVHIT_FORMULA が 128',    () => expect(CSkillData.TYPE_DIVHIT_FORMULA).toBe(128));
        it('RANGE_SHORT が 0',              () => expect(CSkillData.RANGE_SHORT).toBe(0));
        it('RANGE_LONG が 1',               () => expect(CSkillData.RANGE_LONG).toBe(1));
        it('RANGE_MAGIC が 2',              () => expect(CSkillData.RANGE_MAGIC).toBe(2));
        it('RANGE_SPECIAL が 3',            () => expect(CSkillData.RANGE_SPECIAL).toBe(3));
        it('ELEMENT_VOID が -1',            () => expect(CSkillData.ELEMENT_VOID).toBe(-1));
        it('ELEMENT_FORCE_VANITY が 0',     () => expect(CSkillData.ELEMENT_FORCE_VANITY).toBe(0));
        it('ELEMENT_SPECIAL が 10',         () => expect(CSkillData.ELEMENT_SPECIAL).toBe(10));
    });

    describe('CSkillData インスタンス初期値', () => {
        const sd = new CSkillData();
        it('id が 0',                       () => expect(sd.id).toBe(0));
        it('refId が -1',                   () => expect(sd.refId).toBe(-1));
        it('name が空文字',                  () => expect(sd.name).toBe(''));
        it('maxLv が 0',                    () => expect(sd.maxLv).toBe(0));
        it('StackLimit が -1',              () => expect(sd.StackLimit).toBe(-1));
        it('StackIncrement が 0',           () => expect(sd.StackIncrement).toBe(0));
        it('ground_installation が false',  () => expect(sd.ground_installation).toBe(false));
        it('range メソッドが存在する',        () => expect(typeof sd.range).toBe('function'));
        it('Power メソッドが存在する',        () => expect(typeof sd.Power).toBe('function'));
        it('hitCount メソッドが存在する',     () => expect(typeof sd.hitCount).toBe('function'));
        it('hitCount デフォルトが 1',        () => expect(sd.hitCount(1, null, 0)).toBe(1));
        it('WeaponCondition デフォルトが true', () => expect(sd.WeaponCondition(0)).toBe(true));
    });

    describe('CSkillManager インスタンスとスキルデータ', () => {
        const sm = new CSkillManager();

        it('dataArray が配列', () => expect(Array.isArray(sm.dataArray)).toBe(true));
        it('dataArray が 1000 件超', () => expect(sm.dataArray.length).toBeGreaterThan(1000));
        it('GetDataCount が正の整数', () => expect(sm.GetDataCount()).toBeGreaterThan(1000));

        it('skillId=0 が通常攻撃', () => expect(sm.GetSkillName(0)).toBe('通常攻撃'));
        it('skillId=1 が応急手当', () => expect(sm.GetSkillName(1)).toBe('応急手当'));
        it('skillId=0 の maxLv が 1', () => expect(sm.GetMaxLv(0)).toBe(1));

        it('GetSkillIdByName で通常攻撃を検索', () => expect(sm.GetSkillIdByName('通常攻撃')).toBe(0));
        it('GetSkillIdByName で存在しない名前は -1', () => expect(sm.GetSkillIdByName('存在しないスキル')).toBe(-1));

        it('skillId=0 のタイプが ACTIVE|PHYSICAL',
            () => expect(sm.GetSkillType(0) & (CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL)).toBeTruthy());

        it('GetBaseSkillId が skillId を返す（refId なし）', () => expect(sm.GetBaseSkillId(0)).toBe(0));

        it('GetSkillRange が呼び出し可能', () => expect(() => sm.GetSkillRange(0, 0)).not.toThrow());
        it('GetElement が呼び出し可能',    () => expect(() => sm.GetElement(0, null, null)).not.toThrow());
        it('GetHitCount が呼び出し可能',   () => expect(() => sm.GetHitCount(0, 1, null, 0)).not.toThrow());

        it('window.SKILL_ID_TUZYO_KOGEKI が 0 に設定される',
            () => expect((window as any).SKILL_ID_TUZYO_KOGEKI).toBe(0));
        it('window.SKILL_ID_OKYU_TEATE が 1 に設定される',
            () => expect((window as any).SKILL_ID_OKYU_TEATE).toBe(1));
    });
});
