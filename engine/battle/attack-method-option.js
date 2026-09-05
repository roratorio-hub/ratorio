import { CS } from "./calc-state.js";

/**
 * 攻撃手段のオプション値を取得する.
 *
 * オートスペルの計算には主撃の攻撃手段設定がそのまま渡る（battlecalc.js の
 * オートスペルループ）。オートスペル自身は攻撃手段設定を持たないため、
 * そのままオプション値を読むと別スキルの設定値を誤用することになる。
 * オートスペル計算中は、呼び出し側が指定した既定値を返す。
 *
 * @param {Array} attackMethodConfArray 攻撃手段設定配列
 * @param {number} optionIndex オプションのインデックス
 * @param {number} autoSpellValue オートスペル計算中に用いる値
 * @return {number} オプション値
 */
export function GetAttackMethodOptionValue(attackMethodConfArray, optionIndex, autoSpellValue) {
    if (CS.n_AS_MODE) {
        return autoSpellValue;
    }
    return attackMethodConfArray[0].GetOptionValue(optionIndex);
}
