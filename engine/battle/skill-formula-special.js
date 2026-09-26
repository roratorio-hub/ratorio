/**
 * BattleCalc999Core「物理スキル　特殊計算式」ブロックの分割（Phase 3b）。
 *
 * 物理基本計算式（skill-formula-physical.js）で該当スキルが無かった場合に
 * 呼ばれる。スキル固有の計算式は engine/skill/<職業>/*.js の SpecialFormula
 * slot へ全て移行済み（Phase 8）で、このファイルは振り分けのみを行う。
 */
import { g_skillManager } from "../runtime/global.js";
import { CreateSkillFormulaEnv } from "./skill-formula-env.js";
import { n_A_ActiveSkill, w_DMG } from "../runtime/ro4-state.js";

export function ApplyPhysicalSkillFormulaSpecial(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
		// engine/skill/<職業>/*.js の SpecialFormula slot へ移行済みのスキルはそちらを呼ぶ
		// （呼び出し後は後続の共通末尾処理〔return w_DMG〕をそのまま通す。
		//   hook 本体内の return は hook 自身を抜けるだけで、CS・w_DMG への書き込みは
		//   共有された参照を直接書き換えるため、ここでの return 有無は結果に影響しない）
		if (g_skillManager.HasSpecialFormula(n_A_ActiveSkill)) {
			g_skillManager.ApplySpecialFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
			return w_DMG;
		}
		// 物理判定スキルでなければ別処理へ
		return undefined;
}
