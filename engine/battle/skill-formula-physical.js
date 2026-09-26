/**
 * BattleCalc999Core「物理スキル　基本計算式」ブロックの分割（Phase 3b）。
 *
 * スキル固有の計算式は engine/skill/<職業>/*.js の PhysicalFormula slot、
 * および PhysicalHitCountArray/PhysicalDamageUnit slot（汎用計算パスへの
 * 拡張ポイント）へ全て移行済み（Phase 8）。このファイルは振り分けと、
 * genericFormula スキル共通の汎用計算式（ApplyGenericPhysicalFormula）・
 * ダメージ計算本体のみを持つ。該当スキルが無い場合は undefined を返す
 * （呼び出し側の BattleCalc999Core が undefined なら次のブロックを試す）。
 */
import { CSkillData } from "../skill/CSkillManager.js";
import { n_A_WeaponType } from "../runtime/roro-state.js";
import { g_skillManager } from "../runtime/global.js";
import { ATKbaiJYOUSAN, BattleCalcSubDamagePhysicalCommon, GetBattlerAtkPercentUp } from "../bridge/battlecalc-bridge.js";
import { CS } from "./calc-state.js";
import { CreateSkillFormulaEnv } from "./skill-formula-env.js";
import { g_bDefinedDamageIntervals, n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, set_g_bDefinedDamageIntervals, set_n_Enekyori, set_w_DMG, w_DMG } from "../runtime/ro4-state.js";
/**
 * 汎用計算式（genericFormula=true スキル）のパラメータ設定. HasPhysicalFormula 済みでない
 * スキルにのみ呼ばれる（呼び出し前に IsGenericFormula/TYPE_PHYSICAL のチェックが必須）。
 * @returns {number[]|null} hitCountArray（スキル固有の上書きが無ければ null）
 */
function ApplyGenericPhysicalFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray) {
	// 属性は BattleCalc999Body() で設定済み。ここで設定しても、
	// 物理の属性倍率は BattleCalc999Body() 内で先に適用されているため間に合わない
	// （BattleCalcSubDamagePhysicalCommon() は ApplyElementRatio を呼ばない）。
	// スキル使用条件の判定
	CS.n_Buki_Muri = !g_skillManager.MatchWeaponCondition(n_A_ActiveSkill, n_A_WeaponType);
	if (CS.n_Buki_Muri) {
		CS.wbairitu = 0;
		return null;
	}
	// 詠唱などの情報
	CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
	n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	// ダメージ算出に関する情報
	CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
	set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
	// ヒット数に関する情報
	CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
	CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV ,charaData, attackMethodConfArray[0], battleCalcInfo.parentSkillId);
	let hitCountArray = null;
	if (g_skillManager.HasPhysicalHitCountArray(n_A_ActiveSkill)) {
		hitCountArray = g_skillManager.ApplyPhysicalHitCountArray(n_A_ActiveSkill, CreateSkillFormulaEnv());
	}
	// 地面設置スキルの情報
	set_g_bDefinedDamageIntervals(g_skillManager.IsGroundInstallation(n_A_ActiveSkill, attackMethodConfArray[0]));
	if (g_bDefinedDamageIntervals) {
		n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);
		n_Delay[6] = g_skillManager.GetLifeTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
	}
	// 100%ヒット・特殊な戦闘時間区分・強制ディレイの情報
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_100HIT) {
		CS.w_HIT = 100;
		CS.w_HIT_HYOUJI = 100;
	}
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_IRREGULAR_BATTLE_TIME) {
		n_Delay[0] = 1;
	} else if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_UNKNOWN_DELAY_TIME) {
		n_Delay[0] = 2;
	}
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_CAST_KOTEI) {
		CS.cast_kotei = true;
	}
	// モーションディレイの強制上書き（未オーバーライドなら null なので ASPD 由来の既定値を維持する）
	var delayForceMotion = g_skillManager.GetDelayTimeForceMotion(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
	if (delayForceMotion !== null) {
		n_Delay[1] = delayForceMotion;
	}
	n_Delay[3] = g_skillManager.GetDelayTimeSkillTiming(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
	return hitCountArray;
}

export function ApplyPhysicalSkillFormulaBasic(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    let ret = null;
    let hitCountArray = null;

		// engine/skill/<職業>/*.js の PhysicalFormula slot へ移行済みのスキルはそちらを呼ぶ
		// （呼び出し後は後続の共通物理ダメージ計算をそのまま通す）
		if (g_skillManager.HasPhysicalFormula(n_A_ActiveSkill)) {
			g_skillManager.ApplyPhysicalFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
		} else {
			// engine/skill/<職業>/*.js の Power 等の slot へ移行済みのスキルはここで汎用計算式を適用する
			if (!g_skillManager.IsGenericFormula(n_A_ActiveSkill) || (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_PHYSICAL) !== CSkillData.TYPE_PHYSICAL) {
				return undefined;
			}
			hitCountArray = ApplyGenericPhysicalFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);
		}

		//----------------------------------------------------------------
		//
		// ダメージ計算（物理基本式）
		//
		//----------------------------------------------------------------

		//--------------------------------
		// スキルダメージ倍率の補正を計算
		//--------------------------------
		CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
		CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

		//--------------------------------
		// 参照するＡＴＫを特定
		//--------------------------------
		if (g_skillManager.HasPhysicalDamageUnit(n_A_ActiveSkill)) {
			dmgUnit = g_skillManager.ApplyPhysicalDamageUnit(n_A_ActiveSkill, CreateSkillFormulaEnv(), dmgUnit);
		}

		//--------------------------------
		// ヒット数配列を用意
		//--------------------------------
		if (!hitCountArray) {
			hitCountArray = [CS.wHITsuu, CS.wHITsuu, CS.wHITsuu];
		}
		CS.g_wHITsuu_Array = hitCountArray.slice();

		//--------------------------------
		// ダメージ計算本体
		//--------------------------------
		// 通常ダメージ計算
		ret = BattleCalcSubDamagePhysicalCommon(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, n_A_ActiveSkill, dmgUnit, CS.wbairitu, CS.wActiveHitNum, bCri, bLeft);
		// 暫定互換性対応
		set_w_DMG(ret[0].slice());
		CS.n_PerfectHIT_DMG = ret[1];

		//--------------------------------
		// オートスペルのダメージ計算処理中の場合は、処理打ち切り
		//--------------------------------

		if (CS.n_AS_MODE) {
			return w_DMG;
		}

/*
	★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	★
	★ TODO: 下記の命中率を加味する処理、表示上の変数にとどめておくべき？
	★		→AS_PLUS() の中で参照されていないか？
	★
	★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

*/

/*
		//--------------------------------
		// 平均ダメージに命中率を適用する
		//--------------------------------
		w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100 - w_HIT)) / 100;

		// ↑おそらく、別の場所で処理可能

		//--------------------------------
		// オートスペルの発動を適用
		//--------------------------------
		AS_PLUS();

		// ↑の AS_PLUS() は、単純にオートスペルのダメージを足しているだけ。
		// 特殊な処理もなく、グローバル空間にダメージデータの変数を持っているので、別の場所で処理可能
*/

		// 処理終了
		return w_DMG;
}
