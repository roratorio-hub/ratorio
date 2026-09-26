/**
 * スキル定義 ninja/1-ninja（24 件 / SKILL_ID 393〜438 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { ApplyG7KunaiNageFormula } from "../skill-formula-shared.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { ELM_ID_FIRE, ELM_ID_WATER, ELM_ID_WIND } from "../../const/EnumElmId.js";
import { CHARA_DATA_INDEX_MAXHP } from "../../const/EnumCharaDataIndex.js";
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, w_DMG, set_n_Enekyori, set_n_A_Weapon_zokusei
} from "../../runtime/ro4-state.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    GetBattlerAtkPercentUp, ATKbaiJYOUSAN, ApplyPhysicalDamageRatio, ApplyMonsterDefence, GetFixedAppendAtk,
    ApplyPhysicalSkillDamageRatioChange, ApplyElementRatio, ApplyHitJudgeElementRatio, GetPerfectHitDamage,
    BuildCastAndDelayHtml, BuildBattleResultHtml
} from "../../bridge/battlecalc-bridge.js";
import {
    SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_FUZIN, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU,
    SKILL_ID_HYOSENSO, SKILL_ID_ISSEN, SKILL_ID_ISSEN_MAX, SKILL_ID_KAENZIN, SKILL_ID_KAGEBUNSHIN, SKILL_ID_KAGEKIRI,
    SKILL_ID_KAGETOBI, SKILL_ID_KASUMIGIRI, SKILL_ID_KOUENKA, SKILL_ID_KUNAI_NAGE, SKILL_ID_NEN,
    SKILL_ID_NINPO_SHUREN, SKILL_ID_RAIGEKISAI, SKILL_ID_RYUENZIN, SKILL_ID_SAKUFU, SKILL_ID_SHURIKEN_NAGE,
    SKILL_ID_SUITON, SKILL_ID_TATAMI_GAESHI, SKILL_ID_TOTEKI_SHUREN, SKILL_ID_TSURARAOTOSHI, SKILL_ID_UTSUSEMI,
    SKILL_ID_ZENI_NAGE
} from "../skill.dat.js";

/** 一閃／一閃(限界突破)共通のダメージ計算式。 */
function ApplyIssenFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
    CS.w_HIT = 100;
    CS.w_HIT_HYOUJI = 100;
    CS.n_PerfectHIT_DMG = 0;
    set_n_A_Weapon_zokusei(0);
    set_n_Enekyori(1);
    var w_1senHP;
    if(n_A_ActiveSkill==SKILL_ID_ISSEN) {
        w_1senHP = attackMethodConfArray[0].GetOptionValue(0);
        if (w_1senHP == 0) {
            w_1senHP = charaData[CHARA_DATA_INDEX_MAXHP];
        }
    }
    else {
        w_1senHP = charaData[CHARA_DATA_INDEX_MAXHP];
    }
    CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
    var wKageBai = 100;
    if(attackMethodConfArray[0].GetOptionValue(1)){
        wKageBai = 120 + 20 * attackMethodConfArray[0].GetOptionValue(1);
    }
    for(var i=0;i<=2;i++){
        w_DMG[i] = CS.n_A_DMG[i] * n_A_ActiveSkillLV + w_1senHP;
        w_DMG[i] = Math.floor(w_DMG[i] * wKageBai / 100);
        w_DMG[i] = w_DMG[i] - CS.B_Total_DEF;
        if(w_DMG[i] <0) w_DMG[i] = 0;
        w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
        w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
        w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
        if(mobData[20] == 1) w_DMG[i] = Math.floor(w_DMG[i] / 2);
        if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
    }
    for(var i=0;i<=2;i++){
        CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
    }
    BuildCastAndDelayHtml(mobData);
    BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
}

export const skills = [
		// ----------------------------------------------------------------
		// 投擲修練
		// ----------------------------------------------------------------
		// SKILL_ID_TOTEKI_SHUREN
		defineSkill(SKILL_ID_TOTEKI_SHUREN, function() {
			this.name = "投擲修練";
			this.kana = "トウテキシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 手裏剣投げ
		// ----------------------------------------------------------------
		// SKILL_ID_SHURIKEN_NAGE
		defineSkill(SKILL_ID_SHURIKEN_NAGE, function() {

			this.name = "(△)手裏剣投げ";
			this.kana = "シユリケンナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 5 * skillLv;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, SyurikenOBJ } = env;
				set_n_Enekyori(this.range);
							CS.n_PerfectHIT_DMG = 0;
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData);
				// 投擲修練Lv
				const toteki_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_TOTEKI_SHUREN), UsedSkillSearch(SKILL_ID_TOTEKI_SHUREN));
				for(let i = 0; i <= 2; i++){
					w_DMG[i] = CS.n_A_DMG[i] + SyurikenOBJ[attackMethodConfArray[0].GetOptionValue(0)][0] + 3 * toteki_shuren_lv + 4 * n_A_ActiveSkillLV;
					w_DMG[i] = ROUNDDOWN(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] -= CS.B_Total_DEF;
					if(w_DMG[i] <0) w_DMG[i] = 0;
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 苦無投げ
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_NAGE
		defineSkill(SKILL_ID_KUNAI_NAGE, function() {

			this.name = "(△)苦無投げ";
			this.kana = "クナイナケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.SpecialFormula = ApplyG7KunaiNageFormula;
		}),

		// ----------------------------------------------------------------
		// 風魔手裏剣投げ
		// ----------------------------------------------------------------
		// SKILL_ID_FUMASHURIKEN_NAGE
		defineSkill(SKILL_ID_FUMASHURIKEN_NAGE, function() {

			this.name = "(△)風魔手裏剣投げ";
			this.kana = "フウマシユリケンナケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -50 + 250 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3 + 1 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu += this.Power(n_A_ActiveSkillLV, charaData);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				set_n_Enekyori(this.range);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				CS.wActiveHitNum = this.dispHitCount(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], battleCalcInfo.parentSkillId);
				for(var i=0;i<=2;i++){
					w_DMG[i] = Math.floor(CS.n_A_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				CS.n_PerfectHIT_DMG = ApplyElementRatio(mobData, ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData), 0);
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 銭投げ
		// ----------------------------------------------------------------
		// SKILL_ID_ZENI_NAGE
		defineSkill(SKILL_ID_ZENI_NAGE, function() {

			this.name = "銭投げ";
			this.kana = "セニナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
				set_n_Enekyori(this.range);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				for(var i=0;i<=2;i++){
					var dm = [500,750,1000];
					w_DMG[i] = Math.floor(dm[i] * n_A_ActiveSkillLV);
					w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 畳返し
		// ----------------------------------------------------------------
		// SKILL_ID_TATAMI_GAESHI
		defineSkill(SKILL_ID_TATAMI_GAESHI, function() {

			this.name = "畳返し";
			this.kana = "タタミカエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 影跳び
		// ----------------------------------------------------------------
		// SKILL_ID_KAGETOBI
		defineSkill(SKILL_ID_KAGETOBI, function() {

			this.name = "影跳び";
			this.kana = "カケトヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 霞斬り
		// ----------------------------------------------------------------
		// SKILL_ID_KASUMIGIRI
		defineSkill(SKILL_ID_KASUMIGIRI, function() {

			this.name = "(△)霞斬り";
			this.kana = "カスミキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 影斬り
		// ----------------------------------------------------------------
		// SKILL_ID_KAGEKIRI
		defineSkill(SKILL_ID_KAGEKIRI, function() {

			this.name = "(△)影斬り";
			this.kana = "カケキリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 150 * skillLv;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 空蝉
		// ----------------------------------------------------------------
		// SKILL_ID_UTSUSEMI
		defineSkill(SKILL_ID_UTSUSEMI, function() {

			this.name = "空蝉";
			this.kana = "ウツセミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// 影分身
		// ----------------------------------------------------------------
		// SKILL_ID_KAGEBUNSHIN
		defineSkill(SKILL_ID_KAGEBUNSHIN, function() {

			this.name = "影分身";
			this.kana = "カケフンシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv >= 7) ? 1000 : (4500 - 500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 念
		// ----------------------------------------------------------------
		// SKILL_ID_NEN
		defineSkill(SKILL_ID_NEN, function() {

			this.name = "念";
			this.kana = "ネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 一閃
		// ----------------------------------------------------------------
		// SKILL_ID_ISSEN
		defineSkill(SKILL_ID_ISSEN, function() {

			this.name = "一閃";
			this.kana = "イツセン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger, option) {
				return option.GetOptionValue(1) ? 2 + option.GetOptionValue(1) : 0;
			}

			this.SpecialFormula = ApplyIssenFormula;
		}),

		// ----------------------------------------------------------------
		// 忍法修練
		// ----------------------------------------------------------------
		// SKILL_ID_NINPO_SHUREN
		defineSkill(SKILL_ID_NINPO_SHUREN, function() {
			this.name = "忍法修練";
			this.kana = "ニンホウシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 紅炎華
		// ----------------------------------------------------------------
		// SKILL_ID_KOUENKA
		defineSkill(SKILL_ID_KOUENKA, function() {

			this.name = "紅炎華";
			this.kana = "コウエンカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 90;

				// 「影狼・朧 火符：炎天」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 火炎陣
		// ----------------------------------------------------------------
		// SKILL_ID_KAENZIN
		defineSkill(SKILL_ID_KAENZIN, function() {

			this.name = "火炎陣";
			this.kana = "カエンシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 50;

				// 「影狼・朧 火符：炎天」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5 + 1 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 龍炎陣
		// ----------------------------------------------------------------
		// SKILL_ID_RYUENZIN
		defineSkill(SKILL_ID_RYUENZIN, function() {

			this.name = "龍炎陣";
			this.kana = "リユウエンシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150 + 150 * skillLv;

				// 「影狼・朧 火符：炎天」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 氷閃槍
		// ----------------------------------------------------------------
		// SKILL_ID_HYOSENSO
		defineSkill(SKILL_ID_HYOSENSO, function() {

			this.name = "氷閃槍";
			this.kana = "ヒヨウセンソウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 70;

				// 「影狼・朧 氷符：吹雪」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WATER) {
					pow += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 水遁
		// ----------------------------------------------------------------
		// SKILL_ID_SUITON
		defineSkill(SKILL_ID_SUITON, function() {

			this.name = "水遁";
			this.kana = "スイトン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 氷柱落し
		// ----------------------------------------------------------------
		// SKILL_ID_TSURARAOTOSHI
		defineSkill(SKILL_ID_TSURARAOTOSHI, function() {

			this.name = "(△)氷柱落し";
			this.kana = "ツララオトシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150 + 150 * skillLv;

				// 「影狼・朧 氷符：吹雪」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WATER) {
					pow += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 風刃
		// ----------------------------------------------------------------
		// SKILL_ID_FUZIN
		defineSkill(SKILL_ID_FUZIN, function() {

			this.name = "風刃";
			this.kana = "フウシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150;

				// 「影狼・朧 風符：青嵐」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + 1 * Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 1000 * Math.floor(skillLv / 2);
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 雷撃砕
		// ----------------------------------------------------------------
		// SKILL_ID_RAIGEKISAI
		defineSkill(SKILL_ID_RAIGEKISAI, function() {

			this.name = "(△)雷撃砕";
			this.kana = "ライケキサイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// 「影狼・朧 風符：青嵐」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 朔風
		// ----------------------------------------------------------------
		// SKILL_ID_SAKUFU
		defineSkill(SKILL_ID_SAKUFU, function() {

			this.name = "(△)朔風";
			this.kana = "サクフウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// 「影狼・朧 風符：青嵐」の効果
				if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 一閃(MaxHP固定)
		// ----------------------------------------------------------------
		// SKILL_ID_ISSEN_MAX
		defineSkill(SKILL_ID_ISSEN_MAX, function() {

			this.refId = SKILL_ID_ISSEN;
			this.name = "一閃(MaxHP固定)";
			this.kana = "イツセンマツクスヒツトホイントコテイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger, option) {
				return option.GetOptionValue(1) ? 2 + option.GetOptionValue(1) : 0;
			}

			this.SpecialFormula = ApplyIssenFormula;
		}),

];
