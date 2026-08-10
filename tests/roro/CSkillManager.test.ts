import { describe, it, expect, beforeAll } from 'vitest';

// global.js はモジュール評価時に new CSkillManager() を実行し、その内部で skill.dat.js の
// SKILL_ID_* を読む。CSkillManager.js を先に評価すると skill.dat.js が未初期化のまま参照され
// 「Cannot access ... before initialization」(TDZ) になる（reference.md「global.js の module-level Init」）。
// そこで skill.dat（import ゼロの自己完結モジュール）を先に完全評価してから
// CSkillManager を読み込む。
let CSkillData: any;
let CSkillManager: any;
let CAttackMethodConf: any;
let SKILL_ID_TUZYO_KOGEKI: number;
let SKILL_ID_OKYU_TEATE: number;
let SKILL_ID_GLACIER_NOVA: number;
let SKILL_ID_HAWK_RUSH: number;
let SKILL_ID_HAWK_BOOMERANG: number;
let SKILL_ID_LIGHTNING_LAND: number;
let SKILL_ID_PETITIO: number;
let SKILL_ID_ELEMENTAL_BASTER: number;
let SKILL_ID_ADORAMUS: number;
let AutoSpellSkill: any[];
let sm: any;
let sd: any;

beforeAll(async () => {
    const skillDat = await import('@roro/skill.dat.js');
    SKILL_ID_TUZYO_KOGEKI = skillDat.SKILL_ID_TUZYO_KOGEKI;
    SKILL_ID_OKYU_TEATE = skillDat.SKILL_ID_OKYU_TEATE;
    SKILL_ID_GLACIER_NOVA = skillDat.SKILL_ID_GLACIER_NOVA;
    SKILL_ID_HAWK_RUSH = skillDat.SKILL_ID_HAWK_RUSH;
    SKILL_ID_HAWK_BOOMERANG = skillDat.SKILL_ID_HAWK_BOOMERANG;
    SKILL_ID_LIGHTNING_LAND = skillDat.SKILL_ID_LIGHTNING_LAND;
    SKILL_ID_PETITIO = skillDat.SKILL_ID_PETITIO;
    SKILL_ID_ELEMENTAL_BASTER = skillDat.SKILL_ID_ELEMENTAL_BASTER;
    SKILL_ID_ADORAMUS = skillDat.SKILL_ID_ADORAMUS;
    const autospellDat = await import('@roro/autospell.dat.js');
    AutoSpellSkill = autospellDat.AutoSpellSkill;
    // global.js を CSkillManager.js より先に評価する。global.js は top-level import を
    // すべて解決してから（＝CSkillManager.js を完全に評価してから）body の new CSkillManager() を
    // 走らせるため、ここで安全に Init が完了する。CSkillManager.js を直接先に import すると
    // global.js:53 が CSkillManager.js の評価途中に再入し import #11 の TDZ になる。
    await import('@ro4/global.js');
    const mod = await import('@roro/CSkillManager.js');
    CSkillData = mod.CSkillData;
    CSkillManager = mod.CSkillManager;
    const conf = await import('@roro/CAttackMethodConf.js');
    CAttackMethodConf = conf.CAttackMethodConf;
    sd = new CSkillData();
    sm = new CSkillManager();
});

describe('CSkillManager.js', () => {
    describe('CSkillData の既定挙動', () => {
        it('hitCount デフォルトが 1',           () => expect(sd.hitCount(1, null, 0)).toBe(1));
        it('WeaponCondition デフォルトが true', () => expect(sd.WeaponCondition(0)).toBe(true));
    });

    describe('CSkillManager インスタンスとスキルデータ', () => {
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

    describe('GetForcedElement（強制属性の判定）', () => {
        it('ホークラッシュは強制無属性を返す',
            () => expect(sm.GetForcedElement(SKILL_ID_HAWK_RUSH, null)).toBe(CSkillData.ELEMENT_FORCE_VANITY));
        it('ホークブーメランは強制無属性を返す',
            () => expect(sm.GetForcedElement(SKILL_ID_HAWK_BOOMERANG, null)).toBe(CSkillData.ELEMENT_FORCE_VANITY));
        it('ライトニングランドは強制風属性を返す',
            () => expect(sm.GetForcedElement(SKILL_ID_LIGHTNING_LAND, null)).toBe(CSkillData.ELEMENT_FORCE_WIND));
        it('強制属性を持たないスキルは ELEMENT_VOID を返す',
            () => expect(sm.GetForcedElement(SKILL_ID_PETITIO, null)).toBe(CSkillData.ELEMENT_VOID));
        it('複合属性スキルは ELEMENT_VOID を返す（範囲外を弾く）',
            () => expect(sm.GetForcedElement(SKILL_ID_ELEMENTAL_BASTER, null)).toBe(CSkillData.ELEMENT_VOID));

        // option 依存属性のガード（null で例外を出さず VOID を返すこと）
        it('option 依存属性スキルは option 未指定なら ELEMENT_VOID を返す',
            () => expect(sm.GetForcedElement(SKILL_ID_ADORAMUS, null)).toBe(CSkillData.ELEMENT_VOID));
        it('option 依存属性スキルは option があれば評価される', () => {
            const conf = new CAttackMethodConf();
            conf.SetOptionValue(0, 1);   // アンシラ状態
            expect(sm.GetForcedElement(SKILL_ID_ADORAMUS, conf)).toBe(CSkillData.ELEMENT_FORCE_VANITY);
        });

        // 報告されたバグに最も近い単体レベルの検証：AS テーブルの行 → 強制属性
        it('オートスペル一覧のホークラッシュ(AS_ID 236)は強制無属性と判定される',
            () => expect(sm.GetForcedElement(AutoSpellSkill[236][2], null)).toBe(CSkillData.ELEMENT_FORCE_VANITY));
        it('オートスペル一覧のホークブーメラン(AS_ID 247)は強制無属性と判定される',
            () => expect(sm.GetForcedElement(AutoSpellSkill[247][2], null)).toBe(CSkillData.ELEMENT_FORCE_VANITY));
    });
});
