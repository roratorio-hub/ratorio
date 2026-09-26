/**
 * スキル定義 ninja/4-kagerou-oboro（34 件 / SKILL_ID 760〜793 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { ApplyG7KunaiNageFormula } from "../skill-formula-shared.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    n_A_BaseLV, n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, w_DMG,
    set_n_Enekyori, set_g_bDefinedDamageIntervals
} from "../../runtime/ro4-state.js";
import { n_A_DEX, n_A_JobLV, n_A_STR, n_A_WeaponType, n_A_LUK } from "../../runtime/roro-state.js";
import {
    GetBattlerAtkPercentUp, ATKbaiJYOUSAN, GetPerfectHitDamage, ApplyPhysicalDamageRatio,
    ApplyMonsterDefence, GetFixedAppendAtk, ApplyHitJudgeElementRatio, ApplyPhysicalSkillDamageRatioChange,
    ApplyElementRatio, BuildCastAndDelayHtml, BuildBattleResultHtml
} from "../../bridge/battlecalc-bridge.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    SKILL_ID_BAKURETSU_KUNAI, SKILL_ID_DOFU_GOKAI,
    SKILL_ID_FUFU_SEIRAN, SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_FU_COUNT_OF_FU,
    SKILL_ID_FU_ELEMENT_OF_FU,
    SKILL_ID_GENZYUTSU_BUNSHIN, SKILL_ID_GENZYUTSU_GENWAKU, SKILL_ID_GENZYUTSU_KAGEFUMI,
    SKILL_ID_GENZYUTSU_KAGEMUSHA, SKILL_ID_GENZYUTSU_KOUGETSU, SKILL_ID_GENZYUTSU_KYOGAKU,
    SKILL_ID_GENZYUTSU_KYOMUNOKAGE, SKILL_ID_GENZYUTSU_OBOROGENSO, SKILL_ID_GENZYUTSU_ZANGETSU,
    SKILL_ID_GENZYUTSU_ZYUSATSU, SKILL_ID_HAPPO_KUNAI, SKILL_ID_HIDARITE_TANREN,
    SKILL_ID_HIFU_ENTEN, SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU, SKILL_ID_HYOFU_FUBUKI, SKILL_ID_IZAYOI,
    SKILL_ID_MAKIBISHI, SKILL_ID_MEIKYO_SHISUI, SKILL_ID_MIGITE_TANREN, SKILL_ID_MUCHANAGE, SKILL_ID_TOTEKI_SHUREN,
    SKILL_ID_YAMIKUMO, SKILL_ID_YOMIGAESHI, SKILL_ID_ZYUMONZIGIRI, SKILL_ID_ZYUTSUSHIKI_KAIHO,
    SKILL_ID_ZYUTSUSHIKI_TENKAI
} from "../skill.dat.js";

export const skills = [

		// ----------------------------------------------------------------
		// 闇雲
		// ----------------------------------------------------------------
		// SKILL_ID_YAMIKUMO
		defineSkill(SKILL_ID_YAMIKUMO, function() {

			this.name = "闇雲";
			this.kana = "ヤミクモ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 右手鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_MIGITE_TANREN
		defineSkill(SKILL_ID_MIGITE_TANREN, function() {

			this.name = "右手鍛錬";
			this.kana = "ミキテタンレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 左手鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_HIDARITE_TANREN
		defineSkill(SKILL_ID_HIDARITE_TANREN, function() {

			this.name = "左手鍛錬";
			this.kana = "ヒタリテタンレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 十文字斬り
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUMONZIGIRI
		defineSkill(SKILL_ID_ZYUMONZIGIRI, function() {

			this.name = "(△)十文字斬り";
			this.kana = "シユウモンシキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 4 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(600, 6100 - 1100 * skillLv);
			}

			this.Power = function(skillLv, charaDataManger) {
				return ROUNDDOWN(200 * skillLv * n_A_BaseLV / 120);
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, AS_PLUS } = env;
				set_n_Enekyori(1);
				CS.wActiveHitNum = this.dispHitCount(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData);
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

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
					if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
				}
				if(CS.n_AS_MODE) return w_DMG;
				if(attackMethodConfArray[0].GetOptionValue(0) >= 1){
					var wjyuu = [0,0,0];
					for(var i=0;i<=2;i++) wjyuu[i] = w_DMG[i];
					CS.wbairitu = 150 * n_A_ActiveSkillLV;
					CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
					CS.wbairitu += n_A_BaseLV * n_A_ActiveSkillLV;
					CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
					CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
					n_Delay[0] = 1;
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
						if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
					}
					for(var i=0;i<=2;i++){
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = wjyuu[i] + w_DMG[i] * attackMethodConfArray[0].GetOptionValue(0);
						w_DMG[i] = CS.Last_DMG_A[i];
					}

					// 改めて必中ダメージを計算
					CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
					CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
					CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
					w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
				}
				else{
					for(var i=0;i<=2;i++){
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					}

					// 改めて必中ダメージを計算
					CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
					CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
					CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
					w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
				}
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 黄泉返し
		// ----------------------------------------------------------------
		// SKILL_ID_YOMIGAESHI
		defineSkill(SKILL_ID_YOMIGAESHI, function() {

			this.name = "黄泉返し";
			this.kana = "ヨミカエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 55 - 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				var pow = 0;

				pow = (100 + 20 * option.GetOptionValue(0)) * skillLv;
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 爆裂苦無
		// ----------------------------------------------------------------
		// SKILL_ID_BAKURETSU_KUNAI
		defineSkill(SKILL_ID_BAKURETSU_KUNAI, function() {

			this.name = "(△)爆裂苦無";
			this.kana = "ハクレツクナイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -800 + 800 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 800;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.Power = function(skillLv, charaDataManger) {
				const toteki_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_TOTEKI_SHUREN), UsedSkillSearch(SKILL_ID_TOTEKI_SHUREN));
				return skillLv * (50 + Math.floor(n_A_DEX / 4)) * toteki_shuren_lv * 0.4 * n_A_BaseLV / 100 + 10 * n_A_JobLV;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.n_PerfectHIT_DMG = 0;
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
				set_n_Enekyori(1);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = this.CastTimeFixed(n_A_ActiveSkillLV, charaData);
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData);
				var wKUNAI = 0;
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i] + wKUNAI;
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] -= CS.B_Total_DEF;
					if(w_DMG[i] <0) w_DMG[i] = 0;
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
					CS.Last_DMG_B[i] = w_DMG[i];
					CS.Last_DMG_A[i] = w_DMG[i];
					w_DMG[i] = CS.Last_DMG_A[i];
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 八方苦無
		// ----------------------------------------------------------------
		// SKILL_ID_HAPPO_KUNAI
		defineSkill(SKILL_ID_HAPPO_KUNAI, function() {

			this.name = "八方苦無";
			this.kana = "ハツホウクナイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 60 * skillLv;
			}

			this.SpecialFormula = ApplyG7KunaiNageFormula;
		}),

		// ----------------------------------------------------------------
		// 風魔手裏剣 -乱華-
		// ----------------------------------------------------------------
		// SKILL_ID_FUMASHURIKEN_RANKA
		defineSkill(SKILL_ID_FUMASHURIKEN_RANKA, function() {

			this.name = "風魔手裏剣 -乱華-";
			this.kana = "フウマシユリケンランカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				// 風魔手裏剣投げの習得Lv
				const fumashuriken_nage_lv = Math.max(LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_NAGE), option.GetOptionValue(0));
				const wbairitu = 150 * skillLv + n_A_STR + 100 * fumashuriken_nage_lv;
				return ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(1200, 2200 - 200 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.min(1800, 800 + 200 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				set_n_Enekyori(1);
				CS.wActiveHitNum = this.dispHitCount(n_A_ActiveSkillLV, charaData);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = this.CastTimeFixed(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				if(!CS.n_AS_MODE && n_A_WeaponType != 16) CS.n_Buki_Muri = true;
			}
		}),

		// ----------------------------------------------------------------
		// 撒菱
		// ----------------------------------------------------------------
		// SKILL_ID_MAKIBISHI
		defineSkill(SKILL_ID_MAKIBISHI, function() {

			this.name = "撒菱";
			this.kana = "マキヒシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)無茶投げ
		// ----------------------------------------------------------------
		// SKILL_ID_MUCHANAGE
		defineSkill(SKILL_ID_MUCHANAGE, function() {

			this.name = "(仮)無茶投げ";
			this.kana = "ムチヤナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.w_HIT = Math.floor((10 - (1 / (n_A_DEX + n_A_LUK)) * 500) * (n_A_ActiveSkillLV / 2 + 5));
				if(CS.w_HIT > 100) CS.w_HIT = 100;
				if(CS.w_HIT <0) CS.w_HIT = 0;
				CS.w_HIT_HYOUJI = CS.w_HIT;
				set_n_Enekyori(1);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
				for(var i=0;i<=2;i++){
					var dm = [5000,7500,10000];
					w_DMG[i] = Math.floor(dm[i] * n_A_ActiveSkillLV);
					var wBunsan = attackMethodConfArray[0].GetOptionValue(0);
					if(wBunsan >= 2) w_DMG[i] = ROUNDDOWN(w_DMG[i] / wBunsan);
					if(mobData[20]==1) w_DMG[i] = w_DMG[i] / 2;
					w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
					w_DMG[i] = Math.floor(w_DMG[i] / 10);
					CS.Last_DMG_B[i] = w_DMG[i];
					CS.Last_DMG_A[i] = w_DMG[i] * 10;
					w_DMG[i] = CS.Last_DMG_A[i];
				}
				w_DMG[1] = (w_DMG[1] * CS.w_HIT)/100;
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 明鏡止水
		// ----------------------------------------------------------------
		// SKILL_ID_MEIKYO_SHISUI
		defineSkill(SKILL_ID_MEIKYO_SHISUI, function() {

			this.name = "明鏡止水";
			this.kana = "メイキヨウシスイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-影武者-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KAGEMUSHA
		defineSkill(SKILL_ID_GENZYUTSU_KAGEMUSHA, function() {

			this.name = "幻術-影武者-";
			this.kana = "ケンシユツカケムシヤ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 135000 - 15000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-驚愕-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KYOGAKU
		defineSkill(SKILL_ID_GENZYUTSU_KYOGAKU, function() {

			this.name = "幻術-驚愕-";
			this.kana = "ケンシユツキヨウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return (7000 - 1000 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-呪殺-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_ZYUSATSU
		defineSkill(SKILL_ID_GENZYUTSU_ZYUSATSU, function() {

			this.name = "幻術-呪殺-";
			this.kana = "ケンシユツシユサツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-幻惑-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_GENWAKU
		defineSkill(SKILL_ID_GENZYUTSU_GENWAKU, function() {

			this.name = "幻術-幻惑-";
			this.kana = "ケンシユツケンワク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 十六夜
		// ----------------------------------------------------------------
		// SKILL_ID_IZAYOI
		defineSkill(SKILL_ID_IZAYOI, function() {

			this.name = "十六夜";
			this.kana = "イサヨイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 火符：炎天
		// ----------------------------------------------------------------
		// SKILL_ID_HIFU_ENTEN
		defineSkill(SKILL_ID_HIFU_ENTEN, function() {

			this.name = "(×)火符：炎天";
			this.kana = "ヒフエンテン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 氷符：吹雪
		// ----------------------------------------------------------------
		// SKILL_ID_HYOFU_FUBUKI
		defineSkill(SKILL_ID_HYOFU_FUBUKI, function() {

			this.name = "(×)氷符：吹雪";
			this.kana = "ヒヨウフフフキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 風符：青嵐
		// ----------------------------------------------------------------
		// SKILL_ID_FUFU_SEIRAN
		defineSkill(SKILL_ID_FUFU_SEIRAN, function() {

			this.name = "(×)風符：青嵐";
			this.kana = "フウフセイラン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 土符：剛塊
		// ----------------------------------------------------------------
		// SKILL_ID_DOFU_GOKAI
		defineSkill(SKILL_ID_DOFU_GOKAI, function() {

			this.name = "(×)土符：剛塊";
			this.kana = "トフコウカイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 術式-解放-
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUTSUSHIKI_KAIHO
		defineSkill(SKILL_ID_ZYUTSUSHIKI_KAIHO, function() {

			this.name = "術式-解放-";
			this.kana = "シユツシキカイホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function() {
				return UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU);
			}

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 術式-展開-
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUTSUSHIKI_TENKAI
		defineSkill(SKILL_ID_ZYUTSUSHIKI_TENKAI, function() {

			this.name = "術式-展開-";
			this.kana = "シユツシキテンカイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 幻術-影踏み-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KAGEFUMI
		defineSkill(SKILL_ID_GENZYUTSU_KAGEFUMI, function() {

			this.name = "幻術-影踏み-";
			this.kana = "ケンシユツカケフミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-虚無の影-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KYOMUNOKAGE
		defineSkill(SKILL_ID_GENZYUTSU_KYOMUNOKAGE, function() {

			this.name = "幻術-虚無の影-";
			this.kana = "ケンシユツキヨムノカケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-分身-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_BUNSHIN
		defineSkill(SKILL_ID_GENZYUTSU_BUNSHIN, function() {

			this.name = "(×)幻術-分身-";
			this.kana = "ケンシユツフンシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 175000 - 25000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-残月-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_ZANGETSU
		defineSkill(SKILL_ID_GENZYUTSU_ZANGETSU, function() {

			this.name = "幻術-残月-";
			this.kana = "ケンシユツサンケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-紅月-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KOUGETSU
		defineSkill(SKILL_ID_GENZYUTSU_KOUGETSU, function() {

			this.name = "幻術-紅月-";
			this.kana = "ケンシユツコウケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 35000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-朧幻想-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_OBOROGENSO
		defineSkill(SKILL_ID_GENZYUTSU_OBOROGENSO, function() {

			this.name = "幻術-朧幻想-";
			this.kana = "ケンシユツオホロケンソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 60000;
			}

		}),

		// ----------------------------------------------------------------
		// 符の属性
		// ----------------------------------------------------------------
		// SKILL_ID_FU_ELEMENT_OF_FU
		defineSkill(SKILL_ID_FU_ELEMENT_OF_FU, function() {

			this.name = "符の属性";
			this.kana = "フノソクセイ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 符の数
		// ----------------------------------------------------------------
		// SKILL_ID_FU_COUNT_OF_FU
		defineSkill(SKILL_ID_FU_COUNT_OF_FU, function() {

			this.name = "符の数";
			this.kana = "フノカス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)
		// ----------------------------------------------------------------
		// SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU
		defineSkill(SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU, function() {

			this.name = "残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)";
			this.kana = "サンケツヨウセツテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
