/**
 * スキル定義 merchant/4b-genetic（20 件 / SKILL_ID 720〜896 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, n_Enekyori, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_DEX, n_A_INT, n_A_JobLV, n_A_STR, n_A_WeaponType, SU_STR } from "../../runtime/roro-state.js";
import { ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND, ITEM_KIND_KNIFE, ITEM_KIND_SWORD } from "../../const/EnumItemKind.js";
import { n_B_KYOUKA } from "../../monster/mobconfbuf.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyAttackDamageAmplify, ApplyElementRatio, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetFixedAppendAtk
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_BAKUDAN_SEIZO, SKILL_ID_BIOPLANT, SKILL_ID_BLOOD_SUCKER,
    SKILL_ID_CART_BOOST_GENETIC,
    SKILL_ID_CART_CANNON, SKILL_ID_CART_KAIZO, SKILL_ID_CART_TORNADO, SKILL_ID_CHANGE_MATERIAL, SKILL_ID_CRAZY_WEED,
    SKILL_ID_DEMONIC_FIRE,
    SKILL_ID_FIRE_EXPANSION, SKILL_ID_HELLS_PLANT, SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_ILLUSION_DOOPING,
    SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_MIX_COOKING, SKILL_ID_ONO_SHUREN, SKILL_ID_SLING_ITEM,
    SKILL_ID_SPECIAL_PHARMACY, SKILL_ID_SPORE_EXPLOSION, SKILL_ID_THORN_TRAP, SKILL_ID_THORN_WALL
} from "../skill.dat.js";

/** ブラッドサッカー・ソーントラップ共通のダメージ計算式（戦闘エリア補正の式が異なる）。 */
function ApplyBloodSuckerFamilyFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(0);

			var w;

			if (n_A_ActiveSkill == SKILL_ID_BLOOD_SUCKER) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					w = 15000 + 3000 * n_A_ActiveSkillLV + n_A_INT;
					n_Delay[7] = 4500 + 500 * n_A_ActiveSkillLV;
					break;

				default:
					w = 200 + 100 * n_A_ActiveSkillLV + n_A_INT;
					break;

				}
			}

			else if (n_A_ActiveSkill == SKILL_ID_THORN_TRAP) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					w = 25000 + 5000 * n_A_ActiveSkillLV + n_A_INT;
					break;

				default:
					w = 100 + 200 * n_A_ActiveSkillLV + n_A_INT;
					break;

				}
			}

			w_DMG[0] = w_DMG[1] = w_DMG[2] = w;
			for(var i=0;i<=2;i++){

				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);

				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
}

export const skills = [
		// ----------------------------------------------------------------
		// 剣鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_KEN_SHUREN_GENETIC
		defineSkill(SKILL_ID_KEN_SHUREN_GENETIC, function() {

			this.name = "剣鍛錬";
			this.kana = "ケンシユウレンシエネテイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カート改造
		// ----------------------------------------------------------------
		// SKILL_ID_CART_KAIZO
		defineSkill(SKILL_ID_CART_KAIZO, function() {

			this.name = "カート改造";
			this.kana = "カアトカイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カートトルネード
		// ----------------------------------------------------------------
		// SKILL_ID_CART_TORNADO
		defineSkill(SKILL_ID_CART_TORNADO, function() {
			this.name = "カートトルネード";
			this.kana = "カアトトルネエト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 1000, 1000, 500, 500, 200, 200, 200, 200, 200, 200][skillLv];
			}

			this.Power = function(skillLv, charaDataManger, option) {
				let wbairitu = 100 * skillLv;					// 基本倍率
				wbairitu += 100 * skillLv * option.GetOptionValue(1);		// ウドゥンウォリアー補正
				const cart_kaizo_lv = Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				wbairitu += 50 * cart_kaizo_lv;				// 修練補正
				wbairitu += Math.floor(option.GetOptionValue(0) / (150 - SU_STR));	// カート重量・純粋STR補正
				return wbairitu;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { g_skillManager, CS } = env;
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, attackMethodConfArray[0]);
				// 分割ヒット
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, attackMethodConfArray[0]);
			}
		}),

		// ----------------------------------------------------------------
		// カートキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_CART_CANNON
		defineSkill(SKILL_ID_CART_CANNON, function() {

			this.name = "カートキャノン";
			this.kana = "カアトキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				const cart_kaizo_lv = Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				return 60 * skillLv + Math.floor(cart_kaizo_lv * 50 * n_A_INT / 40);
			}

			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(1) == 1 ? 2 : 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, CanonOBJ } = env;
				CS.n_PerfectHIT_DMG = 0;
				// 必中処理
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
				// 遠距離
				set_n_Enekyori(1);
				// 詠唱など
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				// ウドゥンウォリアー補正
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				// 基本倍率＋カート改造補正
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				// 倍率補正
				var wMADO = 0;
				// 斧修練
				if ([ITEM_KIND_SWORD, ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND].includes(n_A_WeaponType)) {
					wMADO += 3 * Math.max(LearnedSkillSearch(SKILL_ID_ONO_SHUREN), UsedSkillSearch(SKILL_ID_ONO_SHUREN));
				}
				// 剣修練
				if ([ITEM_KIND_KNIFE, ITEM_KIND_SWORD].includes(n_A_WeaponType)) {
					wMADO += 10 * Math.max(LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC), UsedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC));
				}
				// 改造カートブースト補正
				wMADO += 10 * UsedSkillSearch(SKILL_ID_CART_BOOST_GENETIC);
				// 属性キャノンボール補正
				wMADO += ApplyElementRatio(mobData, CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][0],CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
				// ダメージ算出
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i] + wMADO;
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] -= CS.B_Total_DEF;
					if(w_DMG[i] <0) w_DMG[i] = 0;
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				// ダメージ表示（不要な可能性あり）
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 改造カートブースト
		// ----------------------------------------------------------------
		// SKILL_ID_CART_BOOST_GENETIC
		defineSkill(SKILL_ID_CART_BOOST_GENETIC, function() {

			this.name = "改造カートブースト";
			this.kana = "カアトフウストシエネテイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4 + 16 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// チェンジマテリアル
		// ----------------------------------------------------------------
		// SKILL_ID_CHANGE_MATERIAL
		defineSkill(SKILL_ID_CHANGE_MATERIAL, function() {

			this.name = "チェンジマテリアル";
			this.kana = "チエンシマテリアル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// スリングアイテム
		// ----------------------------------------------------------------
		// SKILL_ID_SLING_ITEM
		defineSkill(SKILL_ID_SLING_ITEM, function() {

			this.name = "スリングアイテム";
			this.kana = "スリンクアイテム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				const kihon_bairitu = [300, 800, 800, 500, 877];
				return ROUNDDOWN((kihon_bairitu[option.GetOptionValue(0)] + n_A_STR + n_A_DEX) * n_A_BaseLV / 100);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 1000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// スペシャルファーマシー
		// ----------------------------------------------------------------
		// SKILL_ID_SPECIAL_PHARMACY
		defineSkill(SKILL_ID_SPECIAL_PHARMACY, function() {

			this.name = "スペシャルファーマシー";
			this.kana = "スヘシヤルフアアマシイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

		}),

		// ----------------------------------------------------------------
		// ミックスクッキング
		// ----------------------------------------------------------------
		// SKILL_ID_MIX_COOKING
		defineSkill(SKILL_ID_MIX_COOKING, function() {

			this.name = "ミックスクッキング";
			this.kana = "ミツクスクツキンク";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -30 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 爆弾製造
		// ----------------------------------------------------------------
		// SKILL_ID_BAKUDAN_SEIZO
		defineSkill(SKILL_ID_BAKUDAN_SEIZO, function() {

			this.name = "爆弾製造";
			this.kana = "ハクタンセイソウ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -30 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ソーントラップ
		// ----------------------------------------------------------------
		// SKILL_ID_THORN_TRAP
		defineSkill(SKILL_ID_THORN_TRAP, function() {

			this.name = "ソーントラップ";
			this.kana = "ソオントラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.damageInterval = function(skillLv) {
				return 1000;
			}

			this.SpecialFormula = ApplyBloodSuckerFamilyFormula;
		}),

		// ----------------------------------------------------------------
		// ソーンウォール
		// ----------------------------------------------------------------
		// SKILL_ID_THORN_WALL
		defineSkill(SKILL_ID_THORN_WALL, function() {

			this.name = "ソーンウォール";
			this.kana = "ソオンウオオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// クレイジーウィード
		// ----------------------------------------------------------------
		// SKILL_ID_CRAZY_WEED
		defineSkill(SKILL_ID_CRAZY_WEED, function() {

			this.name = "クレイジーウィード";
			this.kana = "クレイシイウイイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 100 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 500 * Math.floor((skillLv - 1) / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// ブラッドサッカー
		// ----------------------------------------------------------------
		// SKILL_ID_BLOOD_SUCKER
		defineSkill(SKILL_ID_BLOOD_SUCKER, function() {

			this.name = "ブラッドサッカー";
			this.kana = "フタツトサツカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.damageInterval = function(skillLv) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return 0;
			}

			this.SpecialFormula = ApplyBloodSuckerFamilyFormula;
		}),

		// ----------------------------------------------------------------
		// ヘルズプラント
		// ----------------------------------------------------------------
		// SKILL_ID_HELLS_PLANT
		defineSkill(SKILL_ID_HELLS_PLANT, function() {

			this.name = "ヘルズプラント";
			this.kana = "ヘルスフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC; // なぜか魔法フラグ
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				var w;
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				set_n_Enekyori(2);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_PerfectHIT_DMG = 0;
				set_n_A_Weapon_zokusei(0);
				w = n_A_ActiveSkillLV * mobData[2] * 10;
				w += Math.floor(n_A_INT * 7 / 2) * Math.floor(18 + n_A_JobLV / 4);
				// バイオプラント習得Lv補正
				const bioplant_lv = LearnedSkillSearch(SKILL_ID_BIOPLANT);
				w *= (5 / (10 - Math.max(bioplant_lv, attackMethodConfArray[0].GetOptionValue(0))));
				w = ApplyElementRatio(mobData, w,0);
				w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
				if(n_B_KYOUKA[7] && n_Enekyori == 2) w += Math.floor(w * (20 * n_B_KYOUKA[7]) / 100);
				w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// ハウリングオブマンドラゴラ
		// ----------------------------------------------------------------
		// SKILL_ID_HOWLING_OF_MANDRAGORA
		defineSkill(SKILL_ID_HOWLING_OF_MANDRAGORA, function() {

			this.name = "ハウリングオブマンドラゴラ";
			this.kana = "ハウリンクオフマントラコラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12000 - 2000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 * Math.floor(skillLv / 2);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -4000 + 4000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スポアエクスプロージョン
		// ----------------------------------------------------------------
		// SKILL_ID_SPORE_EXPLOSION
		defineSkill(SKILL_ID_SPORE_EXPLOSION, function() {

			this.name = "スポアエクスプロージョン";
			this.kana = "スホアエクスフロオシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				var pow = 0;

				// 基本倍率
				pow = 150 * skillLv;

				// ウドゥンフェアリー補正
				pow += 100 * skillLv * option.GetOptionValue(0);

				// INT補正
				pow += 200 + n_A_INT;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// デモニックファイアー
		// ----------------------------------------------------------------
		// SKILL_ID_DEMONIC_FIRE
		defineSkill(SKILL_ID_DEMONIC_FIRE, function() {
			this.name = "デモニックファイアー";
			this.kana = "テモニツクフアイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.ground_installation = true;
			this.damageInterval = 2000;
			this.LifeTime = function(skillLv, charaDataManger) {
				return 8001 + 2000 * skillLv;
			}
			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 8001 + 2000 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// (仮)ファイアーエクスパンション(Lv5)
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_EXPANSION
		defineSkill(SKILL_ID_FIRE_EXPANSION, function() {

			this.name = "(×)ファイアーエクスパンション(Lv5)";
			this.kana = "フアイアエクスハンシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, option) {
				const acid_demonstration_lv = LearnedSkillSearch(SKILL_ID_ACID_DEMONSTRATION);
				let h = Math.max(acid_demonstration_lv, option.GetOptionValue(0));
				if (h < 5) h = 5;
				return h;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// イリュージョンドーピング
		// ----------------------------------------------------------------
		// SKILL_ID_ILLUSION_DOOPING
		defineSkill(SKILL_ID_ILLUSION_DOOPING, function() {

			this.name = "イリュージョンドーピング";
			this.kana = "イリユウシヨントオヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv;

				}

				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

];
