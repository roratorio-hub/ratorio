/**
 * スキル定義 swordman/3a-lord-knight（8 件 / SKILL_ID 254〜261 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, set_n_Enekyori, w_DMG } from "../../runtime/ro4-state.js";
import { n_A_Equip, n_A_WeaponType } from "../../runtime/roro-state.js";
import { EQUIP_REGION_ID_ARMS } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT } from "../../const/EnumItemDataIndex.js";
import { ItemObjNew } from "../../equip/item.dat.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ATKbaiJYOUSAN, ApplyMonsterDefence, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerAtkPercentUp, GetFixedAppendAtk, TYPE_SYUUREN
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_AURA_BLADE, SKILL_ID_BERSERK, SKILL_ID_CONCENTRATION, SKILL_ID_HEAD_CRUSH, SKILL_ID_JOINT_BEAT,
    SKILL_ID_PARIYING, SKILL_ID_SPIRAL_PIERCE, SKILL_ID_TENTION_RELAX
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// オーラブレイド
		// ----------------------------------------------------------------
		// SKILL_ID_AURA_BLADE
		defineSkill(SKILL_ID_AURA_BLADE, function() {

			this.name = "オーラブレイド";
			this.kana = "オオラフレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// パリイング
		// ----------------------------------------------------------------
		// SKILL_ID_PARIYING
		defineSkill(SKILL_ID_PARIYING, function() {

			this.name = "パリイング";
			this.kana = "ハリインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

		// ----------------------------------------------------------------
		// コンセントレイション
		// ----------------------------------------------------------------
		// SKILL_ID_CONCENTRATION
		defineSkill(SKILL_ID_CONCENTRATION, function() {

			this.name = "コンセントレイション";
			this.kana = "コンセントレイシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// テンションリラックス
		// ----------------------------------------------------------------
		// SKILL_ID_TENTION_RELAX
		defineSkill(SKILL_ID_TENTION_RELAX, function() {

			this.name = "テンションリラックス";
			this.kana = "テンシヨンリラツクス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// バーサーク
		// ----------------------------------------------------------------
		// SKILL_ID_BERSERK
		defineSkill(SKILL_ID_BERSERK, function() {

			this.name = "バーサーク";
			this.kana = "ハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// スパイラルピアース
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_PIERCE
		defineSkill(SKILL_ID_SPIRAL_PIERCE, function() {
			this.name = "スパイラルピアース";
			this.kana = "スハイラルヒアアス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 0;
				ratio += 100 + 50 * skillLv;
				// チャージングピアースがONの時、与えるダメージ + 100% x スキルレベル
				ratio = ratio * (1 + option.GetOptionValue(0));
				return ratio;
			}
			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? (1000) : (100 + 200 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, AS_PLUS } = env;
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = this.CastTimeFixed(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
				set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				var wSYUUREN = TYPE_SYUUREN(mobData, attackMethodConfArray, false);
				for(var i=0;i<=2;i++){
					var wSPP;
					wSPP = ROUNDDOWN((CS.n_A_DMG[i] - wSYUUREN) * 70 / 100) + ROUNDDOWN(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] * 70 / 100);
					if(mobData[17] == 0) wSPP = ROUNDDOWN(wSPP * 115 / 100);
					if(mobData[17] == 2) wSPP = ROUNDDOWN(wSPP * 85 / 100);
					wSPP += wSYUUREN;
					wSPP = Math.floor(wSPP * CS.wbairitu / 100);
					wSPP = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, wSPP);
					wSPP = ApplyMonsterDefence(mobData, wSPP,0);
					w_DMG[i] = wSPP;
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				}
				for(var i=0;i<=2;i++){
					CS.Last_DMG_B[i] = w_DMG[i];
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] * 5;
					if(!CS.n_AS_MODE) {
					}
					w_DMG[i] = CS.Last_DMG_A[i];
				}
				w_DMG[1] = w_DMG[1] * CS.w_HIT /100 + CS.n_PerfectHIT_DMG * (100- CS.w_HIT)/100;
				if(CS.n_AS_MODE) return w_DMG;

				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// ヘッドクラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_HEAD_CRUSH
		defineSkill(SKILL_ID_HEAD_CRUSH, function() {

			this.name = "ヘッドクラッシュ";
			this.kana = "ヘツトクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 23;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ジョイントビート
		// ----------------------------------------------------------------
		// SKILL_ID_JOINT_BEAT
		defineSkill(SKILL_ID_JOINT_BEAT, function() {

			this.name = "ジョイントビート";
			this.kana = "シヨイントヒイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * Math.floor((skillLv + 1) / 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

			this.genericFormula = true;
		}),

];
