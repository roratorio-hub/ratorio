/**
 * ダメージ計算における「四次スキルの強制属性」の決定処理.
 *
 * head.js は vitest から import できない（依存ゼロの葉モジュールではないため。
 * ro4/hmjob.test.ts 等が exclude されている理由と同じ save-data 循環 import に触れる）。
 * そこでこの判定ロジックだけを head.js の外へ切り出し、ユニットテスト可能にする。
 * head.js 側は本モジュールが返した値を set_n_A_Weapon_zokusei() に渡すだけの薄い層になる。
 */

import { CSkillData } from "./CSkillManager.js";
import { SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND } from "./skill.dat.js";

/**
 * ダメージ計算 1 回分に適用する四次スキルの強制属性を決める.
 *
 * 物理は BattleCalc999Body() の属性倍率適用（ApplyElementRatio）、
 * 魔法は BattleCalc999Core() 内の ApplyMagicalSkillDamageRatioChange() と、
 * 属性倍率が効く段が異なる。両方を支配する BattleCalc999Body() の先頭から呼ぶこと.
 *
 * オートスペルは自分自身の攻撃手段設定を持たない（主撃の設定しか無い）ため、
 * option 依存で属性が決まるスキルは評価せず「強制属性なし」として扱う.
 *
 * battleCalcInfo.skillId は 999(SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) /
 * 1000(_CALC_LEFT) / 1001(_CALC_KATAR_APPEND) を取ることがある。これらは
 * 「通常攻撃」の右手・左手・カタール追撃をダメージ計算パイプライン上で扱うための
 * ダミー定義スキル（CSkillManager.js 参照）であり、実在の四次スキルではない。
 * element を明示していないため既定値 ELEMENT_FORCE_VANITY(0) を持ってしまい、
 * 除外しないと「属性矢を装備した通常攻撃」が強制無属性になってしまう。
 *
 * @param {Object} skillManager g_skillManager
 * @param {Object} battleCalcInfo skillId / bAutoSpell / parentSkillId を持つ
 * @param {CAttackMethodConf} attackMethodConf 主撃の攻撃手段設定
 * @param {Array} mobData
 * @returns {Number} 強制属性ID、または CSkillData.ELEMENT_VOID（＝属性を変更しない）
 */
export function GetForcedElementForCalc(skillManager, battleCalcInfo, attackMethodConf, mobData) {
    if (battleCalcInfo.skillId <= SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND) {
        return CSkillData.ELEMENT_VOID;
    }
    const option = battleCalcInfo.bAutoSpell ? null : attackMethodConf;
    return skillManager.GetForcedElement(
        battleCalcInfo.skillId, option, mobData, battleCalcInfo.parentSkillId);
}
