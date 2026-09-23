/**
 * engine/skill/<職業>/*.js のスキル固有計算式（PhysicalFormula/SpecialFormula/MagicalFormula）へ
 * 注入する依存の入れ物.
 *
 * engine/skill/ から engine/battle/ を直接 import すると循環依存になるもの
 * （global.js#g_skillManager・calcautospell.js#AS_PLUS は推移閉包が CSkillManager.js に到達する）、
 * および engine/battle/ にあるため「engine/skill/ → engine/battle/ の直接 import 禁止」規約に
 * 抵触するもの（calc-state.js・attack-method-option.js・attackmethod.dat.js）をここへ集約する。
 *
 * 収録した各値は計算中に再代入されないため、呼び出しのたびに生成しても
 * 直接 import していた場合と等価（CS は const オブジェクト、g_skillManager は再代入なし、
 * g_VariableCastTimeRate は UI 設定値でスキル計算式自身が書き換えることはない）。
 * ライブバインディングの状態変数（n_Enekyori・n_A_Weapon_zokusei 等）はここに含めない
 * ——分割代入でスナップショットすると set_XXX() 直後の読み取りがずれるため、各職業ファイルが
 * runtime/ro4-state.js・runtime/roro-state.js から直接 import すること。
 */
import { CS } from "./calc-state.js";
import { g_skillManager, g_VariableCastTimeRate, __DIG3 } from "../runtime/global.js";
import { AS_PLUS } from "../skill/calcautospell.js";
import { GetAttackMethodOptionValue } from "./attack-method-option.js";
import { CanonOBJ, KunaiOBJ, SyurikenOBJ } from "./attackmethod.dat.js";
import { SubName } from "./sub-name.js";

/** @returns {object} スキル固有計算式へ渡す env */
export function CreateSkillFormulaEnv() {
    return { CS, g_skillManager, AS_PLUS, GetAttackMethodOptionValue, __DIG3, g_VariableCastTimeRate,
             CanonOBJ, KunaiOBJ, SyurikenOBJ, SubName };
}
