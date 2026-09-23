/**
 * スキル定義 acolyte/4b-sura（26 件 / SKILL_ID 609〜821 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ELM_ID_WIND } from "../../const/EnumElmId.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_AGI, n_A_DEX, n_A_INT } from "../../runtime/roro-state.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from "../../const/EnumCharaDataIndex.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import { UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { TimeItemNumSearch } from "../../bridge/chara-search-bridge.js";
import {
    GetBattlerAtkPercentUp, ATKbaiJYOUSAN, ApplyPhysicalDamageRatio, ApplyMonsterDefence,
    ApplyPhysicalSkillDamageRatioChange, ApplyHitJudgeElementRatio, GetPerfectHitDamage,
    BuildCastAndDelayHtml, BuildBattleResultHtml
} from "../../bridge/battlecalc-bridge.js";
import { ApplyG2CommonTailFormula } from "../skill-formula-shared.js";
import {
    SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, SKILL_ID_BAKKISANDAN, SKILL_ID_BAKURETSU_HADO,
    SKILL_ID_COMBO_SORYUKYAKU, SKILL_ID_DAITENHOSUI,
    SKILL_ID_GOHO, SKILL_ID_HASAICHU, SKILL_ID_KYUKIKO, SKILL_ID_RAIKODAN, SKILL_ID_RASETSU_HAOGEKI,
    SKILL_ID_RASETSU_HAOGEKI_MAX, SKILL_ID_SENDENPO, SKILL_ID_SENKO_RENGEKI, SKILL_ID_SENPUTAI,
    SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SHURASHINDAN, SKILL_ID_SISIKO, SKILL_ID_SORYUKYAKU, SKILL_ID_TENKETSU_HAN,
    SKILL_ID_TENKETSU_KAI, SKILL_ID_TENKETSU_KATSU, SKILL_ID_TENKETSU_KYU, SKILL_ID_TENKETSU_MOKU,
    SKILL_ID_TENRACHIMO, SKILL_ID_ZENKI_CHUNYU, SKILL_ID_ZIRAISHIN, SKILL_ID_ZYUBAKUZIN
} from "../skill.dat.js";

/** 羅刹破凰撃(HPSP固定)・羅刹破凰撃(HPSP変動可)共通の物理基本計算式（パラメータ設定）。 */
function ApplyRasetsuHaogekiFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
			CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], battleCalcInfo.parentSkillId);
			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.wbairitu = 500 * n_A_ActiveSkillLV;
			if(!CS.n_AS_MODE){
				if(attackMethodConfArray[0].GetOptionValue(0) == 1) {
					CS.wbairitu = 800 * n_A_ActiveSkillLV;
				}
			}
			else {
				CS.wbairitu = 800 * n_A_ActiveSkillLV;
			}
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
}

export const skills = [
		// ----------------------------------------------------------------
		// 双龍脚
		// ----------------------------------------------------------------
		// SKILL_ID_SORYUKYAKU
		defineSkill(SKILL_ID_SORYUKYAKU, function() {

			this.name = "双龍脚";
			this.kana = "ソウリユウキヤク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					pow = 50 + 20 * skillLv;
					break;

				default:
					pow = 100 + 40 * skillLv;
					break;

				}

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger, option) {
				// 詠唱シミュレータ（castsim.js）は option を渡さない。戦闘コンテキストが
				// 無いと「呼び出し元の現在値をそのまま返す」(w==0)分岐は無意味な値になる
				// ため、option 無しは 0 を返す。
				if (!option) {
					return 0;
				}

				var w = option.GetOptionValue(0);

				if (w == 0) {
					// 単発時はディレイを変更しない（呼び出し元の現在値をそのまま返す）
					return n_Delay[2];
				}

				var d = n_Delay[2];
				if (w == 1) d = 1000 - n_A_AGI * 4 - n_A_DEX * 2;
				if (w == 2) d = 300 + (1000 - n_A_AGI * 4 - n_A_DEX * 2);
				if (d < 0) d = 0;

				return d;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 天羅地網
		// ----------------------------------------------------------------
		// SKILL_ID_TENRACHIMO
		defineSkill(SKILL_ID_TENRACHIMO, function() {

			this.name = "天羅地網";
			this.kana = "テンラチモウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { g_skillManager, CS } = env;
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], battleCalcInfo.parentSkillId);
				if(!CS.n_AS_MODE){
					if(attackMethodConfArray[0].GetOptionValue(0) == 0) {
						// 単発の場合
						CS.wbairitu = 80 * n_A_ActiveSkillLV + n_A_AGI;
					} else {
						// コンボの場合
						CS.wbairitu = 100 * n_A_ActiveSkillLV + n_A_AGI + 150;
					}
				} else {
					if(attackMethodConfArray[0].GetSkillId() == SKILL_ID_SENKO_RENGEKI){
						// 閃光連撃から呼ばれた場合
						CS.wbairitu = 80 * n_A_ActiveSkillLV + n_A_AGI;
					} else {
						// それ以外
						CS.wbairitu = 100 * n_A_ActiveSkillLV + n_A_AGI + 150;
					}
				}
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			}
		}),

		// ----------------------------------------------------------------
		// 地雷震
		// ----------------------------------------------------------------
		// SKILL_ID_ZIRAISHIN
		defineSkill(SKILL_ID_ZIRAISHIN, function() {

			this.name = "地雷震";
			this.kana = "シライシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 32 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				if (option.GetOptionValue(0) == 0) {
					return ((50 * skillLv) * n_A_BaseLV / 100) + n_A_INT * 2;
				}
				return ((150 * skillLv) * n_A_BaseLV / 100) + n_A_INT * 3;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.genericFormula = true;

		}),

		// ----------------------------------------------------------------
		// 爆気散弾
		// ----------------------------------------------------------------
		// SKILL_ID_BAKKISANDAN
		defineSkill(SKILL_ID_BAKKISANDAN, function() {

			this.name = "爆気散弾";
			this.kana = "ハクキサンタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			// TODO 爆裂波動の習得Lvがスキル倍率に影響する可能性がある
			this.Power = function(skillLv, charaDataManger, option) {
				const w = option.GetOptionValue(0);
				if (UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN) || UsedSkillSearch(SKILL_ID_BAKURETSU_HADO) || TimeItemNumSearch(34)) {
					return ROUNDDOWN((125 + 25 * skillLv) * n_A_BaseLV / 150 * w);
				}
				return ROUNDDOWN(20 * skillLv * n_A_BaseLV / 150 * w);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { g_skillManager, CS } = env;
				set_n_Enekyori(1);
				n_Delay[0] = 1;
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
			}
		}),

		// ----------------------------------------------------------------
		// 修羅身弾
		// ----------------------------------------------------------------
		// SKILL_ID_SHURASHINDAN
		defineSkill(SKILL_ID_SHURASHINDAN, function() {

			this.name = "(△)修羅身弾";
			this.kana = "シユラシンタン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(200, 1200 - 200 * skillLv);
			}

			this.Power = function(skillLv, charaDataManger) {
				return ROUNDDOWN((500 + 100 * skillLv) * n_A_BaseLV / 100);
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, AS_PLUS } = env;
				set_n_Enekyori(1);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				}
				var w2hit = [0,0,0];
				CS.wLAch = true;
				for(var i=0;i<=2;i++){
					if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] != 1){
						var w = GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
						w += 150 * n_A_ActiveSkillLV;
						w += ROUNDDOWN(mobData[2] * 5 * n_A_BaseLV / 150);
						if(mobData[0] == 787 && n_B_TAISEI[37] != 0) w += ROUNDDOWN(1000 * n_B_TAISEI[36] / n_B_TAISEI[37]);
						w = ATKbaiJYOUSAN(w);
						w = Math.floor(CS.n_A_DMG[i] * w / 100);
						w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
						w = ApplyMonsterDefence(mobData, w, 0);
						if(i == 0 && CS.w_HIT <100) w = 0;
						if(i == 1) w = w * CS.w_HIT / 100;
						if(w_DMG[i] <= 0) w = 0;
						w2hit[i] += w;
					}
					w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[i]);
					w_DMG[i] += w2hit[i] }
				if(CS.n_AS_MODE) return w_DMG;
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					if(attackMethodConfArray[0].GetOptionValue(0) == 1){
						var w = w2hit[i];
						if(w == 0) w = "Miss";
					}
				}
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-CS.w_HIT))/100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// 大纏崩捶
		// ----------------------------------------------------------------
		// SKILL_ID_DAITENHOSUI
		defineSkill(SKILL_ID_DAITENHOSUI, function() {

			this.name = "(△)大纏崩捶";
			this.kana = "タイテンホウスイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 250 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 150);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				// ディレイを変更しない（呼び出し元の現在値をそのまま返す）
				return n_Delay[2];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				// クールタイムを変更しない（呼び出し元の現在値をそのまま返す）
				return n_Delay[7];
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 號砲
		// ----------------------------------------------------------------
		// SKILL_ID_GOHO
		defineSkill(SKILL_ID_GOHO, function() {

			this.name = "號砲";
			this.kana = "コウホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 5 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { g_skillManager, CS } = env;
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				var w1 = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXHP] * (10 + 2 * n_A_ActiveSkillLV) / 100);
				var w2 = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXSP] * (5 + n_A_ActiveSkillLV) / 100);
				if(!CS.n_AS_MODE){
					// 手動時
					if(attackMethodConfArray[0].GetOptionValue(0) == 0) {
						// 単発
						CS.wCast = 1000 + 100 * n_A_ActiveSkillLV;
						CS.wbairitu = (w1 + w2) / 4;
					}
					if(attackMethodConfArray[0].GetOptionValue(0) == 1) {
						// コンボ
						n_Delay[0] = 1;
						CS.wbairitu = (w1 + w2) / 1.5;
					}
				} else {
					// オートスペル時（攻撃手段が閃光連撃なら単発扱い、それ以外＝双龍コンボならコンボ扱い。
					// battlecalc.js の GetPerfectHitDamage() 側の號砲分岐と同じ判定）
					if(attackMethodConfArray[0].GetSkillId() == SKILL_ID_SENKO_RENGEKI) {
						CS.wbairitu = (w1 + w2) / 4;
					} else {
						CS.wbairitu = (w1 + w2) / 1.5;
					}
				}
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			}
		}),

		// ----------------------------------------------------------------
		// 羅刹破凰撃(HPSP固定)
		// ----------------------------------------------------------------
		// SKILL_ID_RASETSU_HAOGEKI_MAX
		defineSkill(SKILL_ID_RASETSU_HAOGEKI_MAX, function() {

			this.refId = SKILL_ID_RASETSU_HAOGEKI;
			this.name = "羅刹破凰撃(HPSP固定)";
			this.kana = "ラセツハオウケキコテイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.PhysicalFormula = ApplyRasetsuHaogekiFormula;
		}),

		// ----------------------------------------------------------------
		// 羅刹破凰撃(HPSP変動可)
		// ----------------------------------------------------------------
		// SKILL_ID_RASETSU_HAOGEKI
		defineSkill(SKILL_ID_RASETSU_HAOGEKI, function() {

			this.name = "羅刹破凰撃(HPSP変動可)";
			this.kana = "ラセツハオウケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.PhysicalFormula = ApplyRasetsuHaogekiFormula;
		}),

		// ----------------------------------------------------------------
		// 旋風腿
		// ----------------------------------------------------------------
		// SKILL_ID_SENPUTAI
		defineSkill(SKILL_ID_SENPUTAI, function() {

			this.name = "旋風腿";
			this.kana = "センフウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = n_A_BaseLV + n_A_DEX;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				// ディレイを変更しない（呼び出し元の現在値をそのまま返す）
				return n_Delay[2];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 呪縛陣
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUBAKUZIN
		defineSkill(SKILL_ID_ZYUBAKUZIN, function() {

			this.name = "呪縛陣";
			this.kana = "シユハクシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 閃電歩
		// ----------------------------------------------------------------
		// SKILL_ID_SENDENPO
		defineSkill(SKILL_ID_SENDENPO, function() {

			this.name = "閃電歩";
			this.kana = "センテンホ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 潜龍昇天(HPSP+爆裂状態)
		// ----------------------------------------------------------------
		// SKILL_ID_SENRYU_SHOTEN
		defineSkill(SKILL_ID_SENRYU_SHOTEN, function() {

			this.name = "潜龍昇天(HPSP+爆裂状態)";
			this.kana = "センリユウシヨウテン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		}),

		// ----------------------------------------------------------------
		// 獅子吼
		// ----------------------------------------------------------------
		// SKILL_ID_SISIKO
		defineSkill(SKILL_ID_SISIKO, function() {

			this.name = "獅子吼";
			this.kana = "シシコウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				// ディレイを変更しない（呼び出し元の現在値をそのまま返す）
				return n_Delay[2];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// 雷光弾
		// ----------------------------------------------------------------
		// SKILL_ID_RAIKODAN
		defineSkill(SKILL_ID_RAIKODAN, function() {

			this.name = "雷光弾";
			this.kana = "ライコウタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				set_n_Enekyori(1);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = 200 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				if(CS.BK_Weapon_zokusei == 4) CS.wbairitu = ROUNDDOWN(CS.wbairitu * 125 / 100);
			}
		}),

		// ----------------------------------------------------------------
		// 点穴 -黙-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_MOKU
		defineSkill(SKILL_ID_TENKETSU_MOKU, function() {

			this.name = "点穴 -黙-";
			this.kana = "テンケツモク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 22 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return ROUNDDOWN((100 * skillLv + n_A_DEX) * n_A_BaseLV / 100);
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.w_HIT = Math.floor(CS.w_HIT * (5 * n_A_ActiveSkillLV + (n_A_DEX + n_A_BaseLV) / 10) / 100);
				CS.w_HIT_HYOUJI = CS.w_HIT;
			}
		}),

		// ----------------------------------------------------------------
		// 点穴 -快-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_KAI
		defineSkill(SKILL_ID_TENKETSU_KAI, function() {

			this.name = "点穴 -快-";
			this.kana = "テンケツカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 700 + 300 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -球-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_KYU
		defineSkill(SKILL_ID_TENKETSU_KYU, function() {

			this.name = "点穴 -球-";
			this.kana = "テンケツキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -反-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_HAN
		defineSkill(SKILL_ID_TENKETSU_HAN, function() {

			this.name = "点穴 -反-";
			this.kana = "テンケツハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -活-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_KATSU
		defineSkill(SKILL_ID_TENKETSU_KATSU, function() {

			this.name = "点穴 -活-";
			this.kana = "テンケツカツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 吸気功
		// ----------------------------------------------------------------
		// SKILL_ID_KYUKIKO
		defineSkill(SKILL_ID_KYUKIKO, function() {

			this.name = "吸気功";
			this.kana = "キユウキコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 破碎柱
		// ----------------------------------------------------------------
		// SKILL_ID_HASAICHU
		defineSkill(SKILL_ID_HASAICHU, function() {

			this.name = "破碎柱";
			this.kana = "ハサイチユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5500 - 500 * skillLv;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 + 1000 * skillLv;

				}

				return 5000;
			}

			this.Power = function(skillLv, charaDataManger, option, mobData) {
				let wEHP = option.GetOptionValue(1);
				if (wEHP == 0) {
					wEHP = mobData[3];
					if (wEHP >= 100000) wEHP = 100000;
				}
				return Math.floor((wEHP / 100) * skillLv * n_A_BaseLV / 125);
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, __DIG3, AS_PLUS } = env;
				if(CS.n_DEATH_BOUND[3] == 0){
					w_DMG[0] = 1;
					w_DMG[1] = 1;
					w_DMG[2] = 1;
					BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				}else{
					n_Delay[0] = 1;
					n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
					CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
					n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);

					CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData);
					CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
					CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
					for(var i=0;i<=2;i++){
						w_DMG[i] = CS.n_A_DMG[i];
						w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
						w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
						w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
						w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					}
					w_DMG[0] += CS.n_DEATH_BOUND[0];
					w_DMG[1] += CS.n_DEATH_BOUND[1];
					w_DMG[2] += CS.n_DEATH_BOUND[2];
					var w2hit = [0,0,0];
					CS.wLAch = true;
					for(var i=0;i<=2;i++){
						if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] == 0){
							var w = GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
							w += 200 * n_A_ActiveSkillLV;
							w = ATKbaiJYOUSAN(w);
							w = Math.floor(CS.n_A_DMG[i] * w / 100);
							w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
							w = ApplyMonsterDefence(mobData, w, 0);
							w2hit[i] += w;
						}
						w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[i]);
						w_DMG[i] += w2hit[i] }
					if(CS.n_AS_MODE) return w_DMG;
					for(var i=0;i<=2;i++){
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
						if(attackMethodConfArray[0].GetOptionValue(0) == 1){
							var w = w2hit[i];
							if(w == 0) w = "Miss";
						}
					}
					CS.n_PerfectHIT_DMG = 0;
					if(CS.w_HIT_HYOUJI <100){
						if(attackMethodConfArray[0].GetOptionValue(0) == 0 && mobData[20] == 0) CS.str_PerfectHIT_DMG = __DIG3(CS.n_DEATH_BOUND[0]) +"～"+ __DIG3(CS.n_DEATH_BOUND[2]);
						else CS.str_PerfectHIT_DMG = __DIG3(CS.n_DEATH_BOUND[0]) +"+"+ __DIG3(w2hit[0]) +"～"+ __DIG3(CS.n_DEATH_BOUND[2]) +"+"+ __DIG3(w2hit[2]);
						CS.n_PerfectHIT_DMG = CS.n_DEATH_BOUND[1] + w2hit[1];
					}
					w_DMG[1] = (w_DMG[1] * CS.w_HIT + (ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) + CS.n_DEATH_BOUND[1] + w2hit[1]) *(100-CS.w_HIT))/100;
					AS_PLUS();
					BuildCastAndDelayHtml(mobData);
					BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
					/*
						w_DMG[0] = n_DEATH_BOUND[0];
						w_DMG[1] = n_DEATH_BOUND[1];
						w_DMG[2] = n_DEATH_BOUND[2];
						for(var i=0;i<=2;i++){
						Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
						g_damageTextArray[i].push(Last_DMG_A[i]);
						}
						w_HIT_HYOUJI = 100;
						BuildCastAndDelayHtml(mobData);
						BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
					*/
				}
			}
		}),

		// ----------------------------------------------------------------
		// 全気注入
		// ----------------------------------------------------------------
		// SKILL_ID_ZENKI_CHUNYU
		defineSkill(SKILL_ID_ZENKI_CHUNYU, function() {

			this.name = "全気注入";
			this.kana = "センキチユウニユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 閃光連撃
		// ----------------------------------------------------------------
		// SKILL_ID_SENKO_RENGEKI
		defineSkill(SKILL_ID_SENKO_RENGEKI, function() {

			this.name = "閃光連撃";
			this.kana = "センコウレンケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 65;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 2.35;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 14000 - 2000 * skillLv;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { g_skillManager } = env;
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[3] = g_skillManager.GetDelayTimeSkillTiming(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				return ApplyG2CommonTailFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
			}
		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(双龍～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SORYUKYAKU
		defineSkill(SKILL_ID_COMBO_SORYUKYAKU, function() {

			this.name = "(仮)コンボ計算(双龍～)";
			this.kana = "コンホケイサンソウリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				n_Delay[0] = 1;
				return ApplyG2CommonTailFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
			}
		}),

		// ----------------------------------------------------------------
		// 閃光連撃終了直後状態(約1.6秒のATK+状態)
		// ----------------------------------------------------------------
		// SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI
		defineSkill(SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, function() {

			this.name = "閃光連撃終了直後状態(ATK+状態)";
			this.kana = "センコウレンケキシユウリヨウチヨクコシヨウタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
