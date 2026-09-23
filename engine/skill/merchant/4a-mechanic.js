/**
 * スキル定義 merchant/4a-mechanic（32 件 / SKILL_ID 540〜811 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_DEX, n_A_Equip, n_A_STR, n_A_VIT, n_A_WeaponType } from "../../runtime/roro-state.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from "../../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ARMS } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT } from "../../const/EnumItemDataIndex.js";
import { SIZE_ID_LARGE, SIZE_ID_MEDIUM, SIZE_ID_SMALL } from "../../const/EnumSizeId.js";
import { ItemObjNew } from "../../equip/item.dat.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ATKbaiJYOUSAN, ApplyAttackDamageAmplify, ApplyElementRatio, ApplyHitJudgeElementRatio, ApplyMonsterDefence,
    ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange, BuildBattleResultHtml, BuildCastAndDelayHtml,
    GetBattlerAtkPercentUp, GetFixedAppendAtk, GetPerfectHitDamage
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    SKILL_ID_ACCELARATION, SKILL_ID_ANALYZE, SKILL_ID_ARMS_CANNON, SKILL_ID_AXE_BOOMERANG, SKILL_ID_AXE_TORNADE,
    SKILL_ID_BOOST_KNUCKLE, SKILL_ID_BUKI_KENKYU, SKILL_ID_COLD_THROWER, SKILL_ID_EMERGENCY_COOL, SKILL_ID_FAW_KAIZYO,
    SKILL_ID_FAW_MAGIC_DECOY, SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FLAME_THROWER, SKILL_ID_FRONTSIDE_SLIDE,
    SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_HOVERING, SKILL_ID_INFRARED_SCAN, SKILL_ID_MADOGEAR,
    SKILL_ID_MADOGEAR_LICENSE, SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_MAGNETIC_FIELD, SKILL_ID_MAINFRAME_KAIZO,
    SKILL_ID_NUTRAL_BARRIER, SKILL_ID_ONO_SHUREN_MECHANIC, SKILL_ID_PILE_BUNKER, SKILL_ID_POWER_SWING,
    SKILL_ID_REARSIDE_SLIDE, SKILL_ID_REPEAR, SKILL_ID_SELF_DESTRUCTION, SKILL_ID_SELF_DESTRUCTION_MAX,
    SKILL_ID_SHAPE_SHIFT, SKILL_ID_STEALTH_FIELD, SKILL_ID_VULCAN_ARM, SKILL_ID_ABR_DUAL_CANNON
} from "../skill.dat.js";

/** セルフデストラクション・セルフデストラクション(限界突破)共通のダメージ計算式。 */
function ApplySelfDestructionFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;

			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);

			var w_HP;
			var w_SP;
			if(n_A_ActiveSkill == SKILL_ID_SELF_DESTRUCTION){
				w_HP = attackMethodConfArray[0].GetOptionValue(0);
				if (w_HP == 0) {
					w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
				}
				w_SP = attackMethodConfArray[0].GetOptionValue(1);
			}else{
				w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
				w_SP = charaData[CHARA_DATA_INDEX_MAXSP];
			}
			var mainF = Math.max(LearnedSkillSearch(SKILL_ID_MAINFRAME_KAIZO), UsedSkillSearch(SKILL_ID_MAINFRAME_KAIZO));
			if(mainF <2) mainF = 2;
			set_n_A_Weapon_zokusei(0);
			var w = (n_A_ActiveSkillLV + 1) * (mainF + 8) * (w_SP + n_A_VIT);
			w = Math.floor(w * n_A_BaseLV / 100);
			w += w_HP;
			w -= CS.B_Total_DEF;
			w = ApplyElementRatio(mobData, w,0);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
}

export const skills = [
		// ----------------------------------------------------------------
		// 斧鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_ONO_SHUREN_MECHANIC
		defineSkill(SKILL_ID_ONO_SHUREN_MECHANIC, function() {

			this.name = "斧鍛錬";
			this.kana = "オノタンレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アックストルネード
		// ----------------------------------------------------------------
		// SKILL_ID_AXE_TORNADE
		defineSkill(SKILL_ID_AXE_TORNADE, function() {

			this.name = "アックストルネード";
			this.kana = "アツクストルネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 0;
				if (option.GetOptionValue(0) === 1) {
					// アックスストンプ状態の場合
					ratio = 230 + 230 * skillLv;
					ratio += n_A_VIT * 2;
				} else {
					ratio = 200 + 180 * skillLv;
					ratio += n_A_VIT;
				}
				return ROUNDDOWN(ratio * n_A_BaseLV / 100);
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 6;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// アックスブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_AXE_BOOMERANG
		defineSkill(SKILL_ID_AXE_BOOMERANG, function() {

			this.name = "アックスブーメラン";
			this.kana = "アツクスフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				const w_Weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
				return ROUNDDOWN((250 + 50 * skillLv + w_Weight) * n_A_BaseLV / 100);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// パワースイング
		// ----------------------------------------------------------------
		// SKILL_ID_POWER_SWING
		defineSkill(SKILL_ID_POWER_SWING, function() {

			this.name = "(△)パワースイング";
			this.kana = "ハワアスインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(0, 1000 - 200 * skillLv);
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, GetAttackMethodOptionValue } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				if (GetAttackMethodOptionValue(attackMethodConfArray, 1, 0) == 1) {
					// ABRバトルウォリアー状態の場合
					CS.wActiveHitNum = 2;
					CS.wbairitu = 500 + 150 * n_A_ActiveSkillLV;
				} else {
					// 通常時
					CS.wbairitu = 300 + 100 * n_A_ActiveSkillLV;
				}
				CS.wbairitu += ROUNDDOWN((n_A_STR + n_A_DEX) * n_A_BaseLV / 100);
			}
		}),

		// ----------------------------------------------------------------
		// 火と大地の研究
		// ----------------------------------------------------------------
		// SKILL_ID_HITO_DAICHINO_KENKYU
		defineSkill(SKILL_ID_HITO_DAICHINO_KENKYU, function() {

			this.name = "火と大地の研究";
			this.kana = "ヒトタイチノケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// FAW シルバースナイパー
		// ----------------------------------------------------------------
		// SKILL_ID_FAW_SILVER_SNIPER
		defineSkill(SKILL_ID_FAW_SILVER_SNIPER, function() {

			this.name = "FAW シルバースナイパー";
			this.kana = "エフエエタフリユウシルハアスナイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// FAW マジックデコイ
		// ----------------------------------------------------------------
		// SKILL_ID_FAW_MAGIC_DECOY
		defineSkill(SKILL_ID_FAW_MAGIC_DECOY, function() {

			this.name = "FAW マジックデコイ";
			this.kana = "エフエエタフリユウマシツクテコイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv >= 4) ? (45 + 5 * skillLv) : (35 + 5 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// FAW 解体
		// ----------------------------------------------------------------
		// SKILL_ID_FAW_KAIZYO
		defineSkill(SKILL_ID_FAW_KAIZYO, function() {

			this.name = "FAW解体";
			this.kana = "エフエエタフリユウカイタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 魔導ギアライセンス
		// ----------------------------------------------------------------
		// SKILL_ID_MADOGEAR_LICENSE
		defineSkill(SKILL_ID_MADOGEAR_LICENSE, function() {

			this.name = "魔導ギアライセンス";
			this.kana = "マトウキアライセンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ブーストナックル
		// ----------------------------------------------------------------
		// SKILL_ID_BOOST_KNUCKLE
		defineSkill(SKILL_ID_BOOST_KNUCKLE, function() {

			this.name = "ブーストナックル";
			this.kana = "フウストナツクル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				const pow = 200 + 100 * skillLv + n_A_DEX;
				return ROUNDDOWN(pow * n_A_BaseLV / 120);
			}

			this.hitCount = function(skillLv, option) {
				return UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON) ? 2 : 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				set_n_Enekyori(1);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[1] = n_Delay[1] / 2;
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}
		}),

		// ----------------------------------------------------------------
		// パイルバンカー
		// ----------------------------------------------------------------
		// SKILL_ID_PILE_BUNKER
		defineSkill(SKILL_ID_PILE_BUNKER, function() {

			this.name = "パイルバンカー";
			this.kana = "ハイルハンカア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 100 * skillLv + n_A_STR;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7500 - 2500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// バルカンアーム
		// ----------------------------------------------------------------
		// SKILL_ID_VULCAN_ARM
		defineSkill(SKILL_ID_VULCAN_ARM, function() {

			this.name = "バルカンアーム";
			this.kana = "ハルカンアアム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 70 * skillLv + n_A_DEX;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 120);

				return pow;
			}

			this.hitCount = function(skillLv, option) {
				return UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON) ? 2 : 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -1000 + 1000 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// フレイムスローワー
		// ----------------------------------------------------------------
		// SKILL_ID_FLAME_THROWER
		defineSkill(SKILL_ID_FLAME_THROWER, function() {

			this.name = "フレイムスローワー";
			this.kana = "フレイムスロオワア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 - 500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// コールドスローワー
		// ----------------------------------------------------------------
		// SKILL_ID_COLD_THROWER
		defineSkill(SKILL_ID_COLD_THROWER, function() {

			this.name = "コールドスローワー";
			this.kana = "コオルトスロオワア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 - 500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// アームズキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_ARMS_CANNON
		defineSkill(SKILL_ID_ARMS_CANNON, function() {

			this.name = "(△)アームズキャノン";
			this.kana = "アアムスキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option, mobData) {
				let pow;
				switch (mobData[17]) {
					case SIZE_ID_SMALL:
						pow = 300 + 400 * skillLv;
						break;
					case SIZE_ID_MEDIUM:
						pow = 300 + 350 * skillLv;
						break;
					case SIZE_ID_LARGE:
						pow = 300 + 300 * skillLv;
						break;
				}
				return ROUNDDOWN(pow * n_A_BaseLV / 120);
			}

			this.hitCount = function(skillLv, option) {
				return UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON) ? 2 : 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(2000, 500 + 500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return Math.max(500, 2000 - 500 * skillLv);
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, CanonOBJ } = env;
				CS.n_PerfectHIT_DMG = 0;
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
				var wMADO = 0;
				set_n_Enekyori(1);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData);
				wMADO += 2 * Math.max(LearnedSkillSearch(SKILL_ID_BUKI_KENKYU), UsedSkillSearch(SKILL_ID_BUKI_KENKYU));
				if(n_A_WeaponType == 6 || n_A_WeaponType == 7) {
					wMADO += 5 * Math.max(LearnedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC), UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC));
				}
				if(n_A_WeaponType == 8) {
					wMADO += 4 * Math.max(LearnedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC), UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC));
				}
				if((20 <= mobData[18] && mobData[18] <= 29) || (30 <= mobData[18] && mobData[18] <= 39)) {
					wMADO += 10 * Math.max(LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU), UsedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU));
				}
				if(UsedSkillSearch(SKILL_ID_MADOGEAR)) {
					wMADO += 20 * Math.max(LearnedSkillSearch(SKILL_ID_MADOGEAR_LICENSE), UsedSkillSearch(SKILL_ID_MADOGEAR_LICENSE));
				}
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				wMADO += ApplyElementRatio(mobData, CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][0],CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
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
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// アクセラレーション
		// ----------------------------------------------------------------
		// SKILL_ID_ACCELARATION
		defineSkill(SKILL_ID_ACCELARATION, function() {

			this.name = "アクセラレーション";
			this.kana = "アクセラレエシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ホバーリング
		// ----------------------------------------------------------------
		// SKILL_ID_HOVERING
		defineSkill(SKILL_ID_HOVERING, function() {

			this.name = "ホバーリング";
			this.kana = "ホハアリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

		}),

		// ----------------------------------------------------------------
		// フロントサイドスライド
		// ----------------------------------------------------------------
		// SKILL_ID_FRONTSIDE_SLIDE
		defineSkill(SKILL_ID_FRONTSIDE_SLIDE, function() {

			this.name = "フロントサイドスライド";
			this.kana = "フロントサイトスライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// リアサイドスライド
		// ----------------------------------------------------------------
		// SKILL_ID_REARSIDE_SLIDE
		defineSkill(SKILL_ID_REARSIDE_SLIDE, function() {

			this.name = "リアサイドスライド";
			this.kana = "リアサイトスライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// メインフレーム改造
		// ----------------------------------------------------------------
		// SKILL_ID_MAINFRAME_KAIZO
		defineSkill(SKILL_ID_MAINFRAME_KAIZO, function() {

			this.name = "メインフレーム改造";
			this.kana = "メインフレエムカイソウ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シェイプシフト
		// ----------------------------------------------------------------
		// SKILL_ID_SHAPE_SHIFT
		defineSkill(SKILL_ID_SHAPE_SHIFT, function() {

			this.name = "シェイプシフト";
			this.kana = "シエイフシフト";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// インフラレッドスキャン
		// ----------------------------------------------------------------
		// SKILL_ID_INFRARED_SCAN
		defineSkill(SKILL_ID_INFRARED_SCAN, function() {

			this.name = "インフラレッドスキャン";
			this.kana = "インフラレツトスキヤン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アナライズ
		// ----------------------------------------------------------------
		// SKILL_ID_ANALYZE
		defineSkill(SKILL_ID_ANALYZE, function() {

			this.name = "アナライズ";
			this.kana = "アナライス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// セルフディストラクション
		// ----------------------------------------------------------------
		// SKILL_ID_SELF_DESTRUCTION
		defineSkill(SKILL_ID_SELF_DESTRUCTION, function() {

			this.name = "セルフディストラクション";
			this.kana = "セルフテイストラクシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 3500 - 500 * skillLv;
			}

			this.SpecialFormula = ApplySelfDestructionFormula;
		}),

		// ----------------------------------------------------------------
		// エマージェンシークール
		// ----------------------------------------------------------------
		// SKILL_ID_EMERGENCY_COOL
		defineSkill(SKILL_ID_EMERGENCY_COOL, function() {

			this.name = "エマージェンシークール";
			this.kana = "エマアシエンシイクウル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// マグネティックフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNETIC_FIELD
		defineSkill(SKILL_ID_MAGNETIC_FIELD, function() {

			this.name = "マグネティックフィールド";
			this.kana = "マクネテイツクフイイルト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ニュートラルバリアー
		// ----------------------------------------------------------------
		// SKILL_ID_NUTRAL_BARRIER
		defineSkill(SKILL_ID_NUTRAL_BARRIER, function() {

			this.name = "ニュートラルバリアー";
			this.kana = "ニユウトラルハリアア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ステルスフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_STEALTH_FIELD
		defineSkill(SKILL_ID_STEALTH_FIELD, function() {

			this.name = "ステルスフィールド";
			this.kana = "ステルスフイイルト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リペア
		// ----------------------------------------------------------------
		// SKILL_ID_REPEAR
		defineSkill(SKILL_ID_REPEAR, function() {

			this.name = "リペア";
			this.kana = "リヘア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 3) ? 20 : (10 + 5 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 魔導ギア
		// ----------------------------------------------------------------
		// SKILL_ID_MADOGEAR
		defineSkill(SKILL_ID_MADOGEAR, function() {

			this.name = "魔導ギア";
			this.kana = "マトウキア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// セルフディストラクション(HPSP固定)
		// ----------------------------------------------------------------
		// SKILL_ID_SELF_DESTRUCTION_MAX
		defineSkill(SKILL_ID_SELF_DESTRUCTION_MAX, function() {

			this.refId = SKILL_ID_SELF_DESTRUCTION;
			this.name = "セルフディストラクション(HPSP固定)";
			this.kana = "セルフテイストラクシヨンコテイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 3500 - 500 * skillLv;
			}

			this.SpecialFormula = ApplySelfDestructionFormula;
		}),

		// ----------------------------------------------------------------
		// マグマイラプション
		// ----------------------------------------------------------------
		// SKILL_ID_MAGMA_ILLUPTION
		defineSkill(SKILL_ID_MAGMA_ILLUPTION, function() {

			this.name = "マグマイラプション";
			this.kana = "マクマイラフシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 450 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 11000 - 1000 * skillLv;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, AS_PLUS } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

				var MAGUMA = 0;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					MAGUMA = (25000 + 5000 * n_A_ActiveSkillLV);
					break;

				default:
					MAGUMA = (800 + 200 * n_A_ActiveSkillLV);
					break;

				}

				// ダメージ増減適用
				MAGUMA = ApplyAttackDamageAmplify(mobData, MAGUMA);

				// 必中ダメージのみ仮計算（属性倍率未適用）
				CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += CS.n_PerfectHIT_DMG;
					w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] += MAGUMA * 10;
				}
				if(CS.n_AS_MODE){
					return w_DMG;
				}
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}

				// 改めて必中ダメージ計算
				CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
				CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
				CS.n_PerfectHIT_DMG += MAGUMA * 10;
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

];
