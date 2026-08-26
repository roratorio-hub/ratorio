import { describe, it, expect, beforeAll } from 'vitest';

// CSkillManager.js.test.ts と同じ TDZ 回避順（skill.dat.js → global.js → CSkillManager.js）。
// battle-element.js も CSkillManager.js を import するため、静的 import で先頭に置くと
// global.js より先に評価されてしまい TDZ になる。動的 import で順序を強制する。
// 詳細は tests/roro/CSkillManager.test.ts の先頭コメント参照。
let CSkillData: any;
let CSkillManager: any;
let CAttackMethodConf: any;
let GetForcedElementForCalc: any;
let SKILL_ID_HAWK_RUSH: number;
let SKILL_ID_DRAGON_TAIL: number;
let SKILL_ID_PETITIO: number;
let SKILL_ID_DEER_CANON: number;
let SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT: number;
let SKILL_ID_TUZYO_KOGEKI_CALC_LEFT: number;
let SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND: number;
let sm: any;
let mainConf: any;

beforeAll(async () => {
    const skillDat = await import('@engine/skill.dat.js');
    SKILL_ID_HAWK_RUSH = skillDat.SKILL_ID_HAWK_RUSH;
    SKILL_ID_DRAGON_TAIL = skillDat.SKILL_ID_DRAGON_TAIL;
    SKILL_ID_PETITIO = skillDat.SKILL_ID_PETITIO;
    SKILL_ID_DEER_CANON = skillDat.SKILL_ID_DEER_CANON;
    SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT = skillDat.SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT;
    SKILL_ID_TUZYO_KOGEKI_CALC_LEFT = skillDat.SKILL_ID_TUZYO_KOGEKI_CALC_LEFT;
    SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND = skillDat.SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND;
    await import('@engine/global.js');
    const mod = await import('@engine/CSkillManager.js');
    CSkillData = mod.CSkillData;
    CSkillManager = mod.CSkillManager;
    const conf = await import('@engine/CAttackMethodConf.js');
    CAttackMethodConf = conf.CAttackMethodConf;
    const battleElement = await import('@engine/battle-element.js');
    GetForcedElementForCalc = battleElement.GetForcedElementForCalc;
    sm = new CSkillManager();
    mainConf = new CAttackMethodConf();
});

describe('battle-element.js', () => {
    describe('GetForcedElementForCalc（本件のバグ: オートスペルの四次スキル強制属性）', () => {
        it('オートスペルのホークラッシュは強制無属性を返す（本件のバグ）', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_HAWK_RUSH, bAutoSpell: true }, mainConf, null))
                .toBe(CSkillData.ELEMENT_FORCE_VANITY));

        it('主撃のホークラッシュも同じ値を返す（主撃とオートスペルで差が出ない）', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_HAWK_RUSH, bAutoSpell: false }, mainConf, null))
                .toBe(CSkillData.ELEMENT_FORCE_VANITY));

        it('999 未満のスキルは対象外（skillId < SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT）', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_DRAGON_TAIL, bAutoSpell: true }, mainConf, null))
                .toBe(CSkillData.ELEMENT_VOID));

        it('強制属性を持たない四次スキルは属性を変えない', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_PETITIO, bAutoSpell: true }, mainConf, null))
                .toBe(CSkillData.ELEMENT_VOID));

        it('オートスペルでは option 依存属性スキルを評価しない（主撃の設定を誤用しない）', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_DEER_CANON, bAutoSpell: true }, mainConf, null))
                .toBe(CSkillData.ELEMENT_VOID));
    });

    describe('GetForcedElementForCalc（通常攻撃のダミー定義スキルを誤判定しない）', () => {
        // battleCalcInfo.skillId は「通常攻撃」の内部分解処理中、999/1000/1001
        // （通常攻撃右手・左手・カタール追撃のダミー定義スキル、実在の四次スキルではない）を
        // 取ることがある。これらは element を明示していないため既定値
        // ELEMENT_FORCE_VANITY(0) を持ってしまい、除外しないと「属性矢を装備した通常攻撃」が
        // 強制無属性になる（実際に発生した回帰: ウィンドホーク+弓+属性矢+通常攻撃で無属性化）。
        it('通常攻撃右手ダミー(999)は強制属性なしとして扱う', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT, bAutoSpell: false }, mainConf, null))
                .toBe(CSkillData.ELEMENT_VOID));
        it('通常攻撃左手ダミー(1000)は強制属性なしとして扱う', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_TUZYO_KOGEKI_CALC_LEFT, bAutoSpell: false }, mainConf, null))
                .toBe(CSkillData.ELEMENT_VOID));
        it('カタール追撃ダミー(1001)は強制属性なしとして扱う', () =>
            expect(GetForcedElementForCalc(sm, { skillId: SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND, bAutoSpell: false }, mainConf, null))
                .toBe(CSkillData.ELEMENT_VOID));
        // ダミー範囲の直後（1002・実在の四次スキル）は、強制属性を持つ場合は通常どおり評価される。
        // ホークラッシュ(1043)は上の describe で強制無属性を返すことを確認済み＝
        // ダミー範囲より上の実在スキルは除外されずに正しく判定されている。
    });
});
