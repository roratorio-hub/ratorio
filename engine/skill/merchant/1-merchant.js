/**
 * スキル定義 merchant/1-merchant（11 件 / SKILL_ID 59〜990 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_ActiveSkill, w_DMG } from "../../runtime/ro4-state.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyElementRatio, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange, BuildBattleResultHtml,
    BuildCastAndDelayHtml, GetFixedAppendAtk
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_CART_KAIZO, SKILL_ID_CART_REVOLUTION, SKILL_ID_CHANGE_CART, SKILL_ID_DISCOUNT, SKILL_ID_ITEM_KANTE,
    SKILL_ID_LOUD_VOICE,
    SKILL_ID_MAMMONITE, SKILL_ID_OVER_CHARGE, SKILL_ID_PUSH_CART, SKILL_ID_ROTEN_KAISETSU,
    SKILL_ID_SHOZIGENKAIRYO_ZOKA
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 所持限界量増加
		// ----------------------------------------------------------------
		// SKILL_ID_SHOZIGENKAIRYO_ZOKA
		defineSkill(SKILL_ID_SHOZIGENKAIRYO_ZOKA, function() {

			this.name = "所持限界量増加";
			this.kana = "シヨシケンカイリヨウソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ディスカウント
		// ----------------------------------------------------------------
		// SKILL_ID_DISCOUNT
		defineSkill(SKILL_ID_DISCOUNT, function() {

			this.name = "ディスカウント";
			this.kana = "テイスカウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オーバーチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_CHARGE
		defineSkill(SKILL_ID_OVER_CHARGE, function() {

			this.name = "オーバーチャージ";
			this.kana = "オオハアチヤアシ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// プッシュカート
		// ----------------------------------------------------------------
		// SKILL_ID_PUSH_CART
		defineSkill(SKILL_ID_PUSH_CART, function() {

			this.name = "プッシュカート";
			this.kana = "フツシユカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アイテム鑑定
		// ----------------------------------------------------------------
		// SKILL_ID_ITEM_KANTE
		defineSkill(SKILL_ID_ITEM_KANTE, function() {

			this.name = "アイテム鑑定";
			this.kana = "アイテムカンテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 露店開設
		// ----------------------------------------------------------------
		// SKILL_ID_ROTEN_KAISETSU
		defineSkill(SKILL_ID_ROTEN_KAISETSU, function() {

			this.name = "露店開設";
			this.kana = "ロテンカイセツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// メマーナイト
		// ----------------------------------------------------------------
		// SKILL_ID_MAMMONITE
		defineSkill(SKILL_ID_MAMMONITE, function() {

			this.name = "メマーナイト";
			this.kana = "メマアナイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// カートレボリューション
		// ----------------------------------------------------------------
		// SKILL_ID_CART_REVOLUTION
		defineSkill(SKILL_ID_CART_REVOLUTION, function() {

			this.name = "カートレボリューション";
			this.kana = "カアトレホリユウシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, GetAttackMethodOptionValue, AS_PLUS } = env;
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				const cart_kaizo_lv = Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				const cart_weight_max = 8000 + 500 * cart_kaizo_lv;
				const CRbai = GetAttackMethodOptionValue(attackMethodConfArray, 0, cart_weight_max) / cart_weight_max * 100;

				for(var i=0;i<=2;i++){
					w_DMG[i] = ROUNDDOWN(CS.n_A_DMG[i] * 150 / 100);
					w_DMG[i] += ROUNDDOWN(CS.n_A_DMG[i] * CRbai / 100);
					w_DMG[i] -= CS.B_Total_DEF;
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
					if(w_DMG[i] <0) w_DMG[i] = 0;
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// チェンジカート
		// ----------------------------------------------------------------
		// SKILL_ID_CHANGE_CART
		defineSkill(SKILL_ID_CHANGE_CART, function() {

			this.name = "チェンジカート";
			this.kana = "チエンシカアト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		}),

		// ----------------------------------------------------------------
		// ラウドボイス
		// ----------------------------------------------------------------
		// SKILL_ID_LOUD_VOICE
		defineSkill(SKILL_ID_LOUD_VOICE, function() {

			this.name = "ラウドボイス";
			this.kana = "ラウトホイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

		}),

];
