/**
 * スキル定義 swordman/3b-paladin（5 件 / SKILL_ID 283〜865 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_Equip, n_A_SHIELD_DEF_PLUS } from "../../runtime/roro-state.js";
import { CHARA_DATA_INDEX_MAXHP } from "../../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_SHIELD } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT } from "../../const/EnumItemDataIndex.js";
import { ItemObjNew } from "../../equip/item.dat.js";
import { n_B_KYOUKA } from "../../monster/mobconfbuf.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyElementRatio, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange, BuildBattleResultHtml,
    BuildCastAndDelayHtml, GetFixedAppendAtk
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_GOSPEL, SKILL_ID_PRESSURE, SKILL_ID_PRESSURE_MISS, SKILL_ID_SACRIFICE, SKILL_ID_SHIELD_CHAIN
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// プレッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_PRESSURE
		defineSkill(SKILL_ID_PRESSURE, function() {

			this.name = "プレッシャー";
			this.kana = "フレツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				CS.n_PerfectHIT_DMG = 0;
				w_DMG[2] = 500 + 300 * n_A_ActiveSkillLV;
				if(5 <= mobData[21] && mobData[21] <= 9) w_DMG[2] = 1;
				w_DMG[0] = w_DMG[1] = w_DMG[2];
				if(CS.n_AS_MODE) return w_DMG;
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}

		}),

		// ----------------------------------------------------------------
		// サクリファイス
		// ----------------------------------------------------------------
		// SKILL_ID_SACRIFICE
		defineSkill(SKILL_ID_SACRIFICE, function() {

			this.name = "サクリファイス";
			this.kana = "サクリファイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				CS.n_PerfectHIT_DMG = 0;
				set_n_A_Weapon_zokusei(0);
				w_DMG[2] = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * 0.09 * (0.9 + 0.1 * n_A_ActiveSkillLV));
				w_DMG[2] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[2]);
				w_DMG[2] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[2]);
				w_DMG[2] = ApplyElementRatio(mobData, w_DMG[2],0);
				w_DMG[0] = w_DMG[1] = w_DMG[2];
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}

		}),

		// ----------------------------------------------------------------
		// ゴスペル
		// ----------------------------------------------------------------
		// SKILL_ID_GOSPEL
		defineSkill(SKILL_ID_GOSPEL, function() {

			this.name = "ゴスペル";
			this.kana = "コスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * Math.floor((skillLv - 1) / 5);
			}

		}),

		// ----------------------------------------------------------------
		// シールドチェーン
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHAIN
		defineSkill(SKILL_ID_SHIELD_CHAIN, function() {

			this.name = "(△)シールドチェーン";
			this.kana = "シイルトチエエン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger) {
				// 通常スキル倍率
				const SdCBAI = [0,130,160,190,220,250];
				/*
				実測確認出来るまでコメントアウト

				if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
					return [0,360,420,480,540,600][skillLv];
				}
				*/
				return SdCBAI[skillLv];
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.n_PerfectHIT_DMG = 0;
				set_n_Enekyori(1);
				set_n_A_Weapon_zokusei(0);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				var w_Weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT];
				var wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i] + w_Weight + n_A_SHIELD_DEF_PLUS * 4;
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = ROUNDDOWN(w_DMG[i] * wbairitu / 100);
					w_DMG[i] -= CS.B_Total_DEF;
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(n_B_KYOUKA[10]){
						if(n_B_KYOUKA[10] == 6) w_DMG[i] = Math.floor(w_DMG[i] *12.5 / 100);
						else w_DMG[i] -= Math.floor(w_DMG[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
					}
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
					if(w_DMG[i] <0) w_DMG[i] = 0;
				}
				for(var i=0;i<=2;i++){
					CS.Last_DMG_B[i] = w_DMG[i];
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] * 5;
					w_DMG[i] = CS.Last_DMG_A[i];
				}
				w_DMG[1] = w_DMG[1] * CS.w_HIT /100;
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}

		}),

		// ----------------------------------------------------------------
		// プレッシャー（重複）
		// ----------------------------------------------------------------
		// SKILL_ID_PRESSURE_MISS
		defineSkill(SKILL_ID_PRESSURE_MISS, function() {

			this.name = "プレッシャー（重複）";
			this.kana = "フレツシヤアチヨウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		}),

];
