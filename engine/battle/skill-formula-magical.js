/**
 * BattleCalc999Core「魔法判定スキル」ブロックの分割（Phase 3b）。
 *
 * 物理基本/特殊計算式のいずれにも該当しなかった場合に呼ばれる最後のブロック。
 * スキル固有の計算式は engine/skill/<職業>/*.js の MagicalFormula slot、
 * および MagicalMatkFilter/MagicalSingleHitLoop/MagicalDividedHitFormula slot
 * （汎用計算パスへの拡張ポイント）へ全て移行済み（Phase 8）。該当なしなら
 * 何もせず w_DMG をそのまま返す無条件 return は変わらない。
 */
import { CSkillData } from "../skill/CSkillManager.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";
import { n_A_MATK, n_A_WeaponType } from "../runtime/roro-state.js";
import { SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT } from "../skill/skill.dat.js";
import { AS_PLUS } from "../skill/calcautospell.js";
import { __DIG3, g_skillManager } from "../runtime/global.js";
import {
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerMatkPercentUp
} from "../bridge/battlecalc-bridge.js";
import { CS } from "./calc-state.js";
import { CreateSkillFormulaEnv } from "./skill-formula-env.js";
import { g_bDefinedDamageIntervals, n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG } from "../runtime/ro4-state.js";
/**
 * 汎用計算式（genericFormula=true スキル）のパラメータ設定. HasMagicalFormula 済みでない
 * スキルにのみ呼ばれる（呼び出し前に IsGenericFormula/TYPE_MAGICAL のチェックが必須）。
 */
function ApplyGenericMagicalFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray) {
	// スキル使用条件の判定
	CS.n_Buki_Muri = !g_skillManager.MatchWeaponCondition(n_A_ActiveSkill, n_A_WeaponType);
	if (CS.n_Buki_Muri) {
		CS.wbairitu = 0;
		return;
	}
	// 詠唱などの情報
	CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
	n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	// ダメージ算出に関する情報
	// ※このブロックは attackMethodConfArray[0] を常に渡す（オートスペルでも main の conf を使う、
	//   従来どおりの挙動）。アドラムス等 option 依存の 999 未満スキルは main の conf で評価しないと
	//   ダメージが変わってしまうため、ここでは bAutoSpell による null 化は行わない。
	//   四次スキル（ID>=999）の強制属性は BattleCalc999Body() で決定済みなのでここでは基本上書きされない。
	var elmWork = g_skillManager.GetForcedElement(battleCalcInfo.skillId, attackMethodConfArray[0], mobData, battleCalcInfo.parentSkillId);
	if (elmWork != CSkillData.ELEMENT_VOID) {
		set_n_A_Weapon_zokusei(elmWork);
	}
	CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
	CS.g_bSkillNoDamage = (CS.wbairitu == 0);
	set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
	// ヒット数に関する情報
	CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType, battleCalcInfo.parentSkillId);
	CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill,n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
	// 地面設置スキルの情報
	set_g_bDefinedDamageIntervals(g_skillManager.IsGroundInstallation(n_A_ActiveSkill, attackMethodConfArray[0]));
	if (g_bDefinedDamageIntervals) {
		n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);
		n_Delay[6] = g_skillManager.GetLifeTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
	}
	// 100%ヒット・特殊な戦闘時間区分・分割ヒット式・強制ディレイの情報
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_100HIT) {
		CS.w_HIT = 100;
		CS.w_HIT_HYOUJI = 100;
	}
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_IRREGULAR_BATTLE_TIME) {
		n_Delay[0] = 1;
	} else if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_UNKNOWN_DELAY_TIME) {
		n_Delay[0] = 2;
	}
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_DIVHIT_FORMULA) {
		CS.n_bunkatuHIT = 1;
	}
	if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_SG_SPECIAL_HITNUM) {
		CS.SG_Special_HITnum = CS.wHITsuu;
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
}

export function ApplyMagicalSkillFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    let w_MATK = [0,0,0];

		CS.n_PerfectHIT_DMG = 0;
		set_n_Enekyori(2);
		CS.directSubtractionMdef = false;
		CS.wbairitu = 100;
		CS.n_bunkatuHIT = 0;

		// 四次スキル以降の属性設定共通処理
		if (battleCalcInfo.skillId >= SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) {
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId, attackMethodConfArray[0]));
		}

		// engine/skill/<職業>/*.js の MagicalFormula slot へ移行済みのスキルはそちらを呼ぶ
		// （呼び出し後は後続の共通魔法ダメージ計算をそのまま通す）
		if (g_skillManager.HasMagicalFormula(n_A_ActiveSkill)) {
			g_skillManager.ApplyMagicalFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
		} else if (g_skillManager.IsGenericFormula(n_A_ActiveSkill) && (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_MAGICAL) === CSkillData.TYPE_MAGICAL) {
			// engine/skill/<職業>/*.js の Power 等の slot へ移行済みのスキルはここで汎用計算式を適用する
			ApplyGenericMagicalFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);
		}

		if (CS.g_bSkillNoDamage) {
			return [0, 0, 0];
		}
		for(var i = 0; i <= 2; i++){
			// 各ＭＡＴＫを取得
			w_MATK[i] = n_A_MATK[i];
			// モンスター特化を適用
			w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
			// 属性耐性を適用
			w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			// 対プレイヤー一般耐性を適用
			w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
		}
		// マグヌスエクソシズム、かつ、モンスターが対象外の場合、ＭＡＴＫを０で計算する
		if (g_skillManager.HasMagicalMatkFilter(n_A_ActiveSkill)) {
			g_skillManager.ApplyMagicalMatkFilter(n_A_ActiveSkill, CreateSkillFormulaEnv(), mobData, w_MATK);
		}
		// ＭＡＴＫ％強化倍率を取得
		CS.wbairitu += GetBattlerMatkPercentUp(mobData);
		// 単発スキルの場合
		if(CS.n_bunkatuHIT == 0){
			for(var b = 0; b <= 2; b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100);
				if(CS.SG_Special_HITnum != 0){
					CS.SG_Special_DMG[b] = w_DMG[b];
				}
				CS.Last_DMG_B[b] = w_DMG[b];
				if (g_skillManager.HasMagicalSingleHitLoop(n_A_ActiveSkill)) {
					g_skillManager.ApplyMagicalSingleHitLoop(n_A_ActiveSkill, CreateSkillFormulaEnv(), b, attackMethodConfArray);
				}
				CS.Last_DMG_A[b] = ROUNDDOWN(w_DMG[b] * CS.wHITsuu);
				// TODO: 四次データ形式変更対応
				// w_DMG[b] = Last_DMG_A[b];
			}

		}
		// 分割ＨＩＴの場合
		else{
			var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
			if (!(g_skillManager.HasMagicalDividedHitFormula(n_A_ActiveSkill) && g_skillManager.ApplyMagicalDividedHitFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK, subnumvalue))){
				for(var b=0;b<=2;b++){
					// TODO: 2020年スキル修正に伴う変更（元からこの計算式だったかは不明）
					// w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100) / wHITsuu);
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * Math.floor(CS.wbairitu / CS.wHITsuu) * CS.wHITsuu / 100) / CS.wHITsuu);
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu;
					// TODO: 四次データ形式変更対応
					// w_DMG[b] *= wHITsuu;
				}
			}
		}
		if(CS.n_AS_MODE){
			CS.SG_Special_HITnum = 0;
			return w_DMG;
		}
		CS.w_HIT_HYOUJI = 100;
		AS_PLUS();
		BuildCastAndDelayHtml(mobData);
		BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
		return w_DMG;
}
