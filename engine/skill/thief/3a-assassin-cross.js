/**
 * スキル定義 thief/3a-assassin-cross（6 件 / SKILL_ID 262〜752 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_Weapon_zokusei, n_Delay, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_MATK, n_B_DEF2, n_B_MDEF2 } from "../../runtime/roro-state.js";
import {
    ApplyMagicalSpecializeMonster, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange, ApplyResistElement,
    BaiTaisei_C, BuildBattleResultHtml, BuildCastAndDelayHtml
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import { UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_CANCEL_EDP_POISON_ATTACK, SKILL_ID_CREATE_DEADLY_POISON, SKILL_ID_ENCHANT_DEADLY_POISON,
    SKILL_ID_KATAR_KENKYU, SKILL_ID_METEOR_ASSALT, SKILL_ID_SOUL_BREAKER
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// カタール研究
		// ----------------------------------------------------------------
		// SKILL_ID_KATAR_KENKYU
		defineSkill(SKILL_ID_KATAR_KENKYU, function() {

			this.name = "カタール研究";
			this.kana = "カタアルケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ソウルブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_BREAKER
		defineSkill(SKILL_ID_SOUL_BREAKER, function() {

			this.name = "ソウルブレイカー";
			this.kana = "ソウルフレイカア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * Math.floor((skillLv - 1) / 5);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				let wbai = 300 + 50 * skillLv;
				if (UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbai = ROUNDDOWN(wbai / 2);
				return wbai;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				let w_MATK = [0,0,0];
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				set_n_Enekyori(this.range);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				var wbai = this.Power(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					var BK_X = n_A_Weapon_zokusei;
					set_n_A_Weapon_zokusei(0);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					set_n_A_Weapon_zokusei(BK_X);
					w_MATK[i] = BaiTaisei_C(mobData, w_MATK[i]);
				}
				for(var i=0;i<=2;i++){
					w_DMG[i] = ROUNDDOWN(CS.n_A_DMG[i] * wbai / 100);
					w_DMG[i] += ROUNDDOWN(w_MATK[i] * wbai / 100);
					w_DMG[i] -= (mobData[13] + mobData[14] + n_B_MDEF2 + n_B_DEF2[0]);
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(w_DMG[i] <0) w_DMG[i] = 0;
				}
				if(CS.n_AS_MODE) return w_DMG;
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				if(5 <= mobData[21] && mobData[21] <= 9){
					for(var i=0;i<=2;i++){
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = 1;
					}
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// メテオアサルト
		// ----------------------------------------------------------------
		// SKILL_ID_METEOR_ASSALT
		defineSkill(SKILL_ID_METEOR_ASSALT, function() {

			this.name = "メテオアサルト";
			this.kana = "メテオアサルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// クリエイトデッドリーポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_DEADLY_POISON
		defineSkill(SKILL_ID_CREATE_DEADLY_POISON, function() {

			this.name = "クリエイトデッドリーポイズン";
			this.kana = "クリエイトテツトリイホイスン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)エンチャントデッドリーポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_ENCHANT_DEADLY_POISON
		defineSkill(SKILL_ID_ENCHANT_DEADLY_POISON, function() {

			this.name = "(仮)エンチャントデッドリーポイズン";
			this.kana = "エンチヤントテツトリイホイスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// (特殊)EDP毒部分を消す[通常はoff]
		// ----------------------------------------------------------------
		// SKILL_ID_CANCEL_EDP_POISON_ATTACK
		defineSkill(SKILL_ID_CANCEL_EDP_POISON_ATTACK, function() {

			this.name = "(特殊)EDP毒部分を消す[通常はoff]";
			this.kana = "エンチヤントテツトリイホイスントクフフンヲケス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
