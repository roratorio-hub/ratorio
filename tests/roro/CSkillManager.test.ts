import { describe, it, expect } from 'vitest';
import { CSkillData, CSkillManager } from '@roro/CSkillManager.js';
import {
    SKILL_ID_TUZYO_KOGEKI,
    SKILL_ID_OKYU_TEATE,
    SKILL_ID_GLACIER_NOVA,
} from '@roro/skill.dat.js';

describe('CSkillManager.js', () => {
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
        it('hitCount デフォルトが 1',        () => expect(sd.hitCount(1, null, 0)).toBe(1));
        it('WeaponCondition デフォルトが true', () => expect(sd.WeaponCondition(0)).toBe(true));
    });

    describe('CSkillManager インスタンスとスキルデータ', () => {
        const sm = new CSkillManager();

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

        // 3e-2: skill.dat.js の const が Init の登録位置と一致することを動作で検証
        it('import した SKILL_ID_TUZYO_KOGEKI が通常攻撃の登録位置を指す',
            () => expect(sm.GetSkillName(SKILL_ID_TUZYO_KOGEKI)).toBe('通常攻撃'));
        it('import した SKILL_ID_OKYU_TEATE が応急手当の登録位置を指す',
            () => expect(sm.GetSkillName(SKILL_ID_OKYU_TEATE)).toBe('応急手当'));
        it('3e-2 で追加した const（SKILL_ID_GLACIER_NOVA）が正しい登録位置を指す',
            () => expect(sm.GetSkillName(SKILL_ID_GLACIER_NOVA)).toBe('(△)グレイシアノヴァ'));
    });
});
