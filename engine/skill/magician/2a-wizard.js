/**
 * スキル定義 magician/2a-wizard（14 件 / SKILL_ID 122〜848 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, n_Heal_MATK, n_tok,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_JobLV, n_A_WeaponType } from "../../runtime/roro-state.js";
import { ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON } from "../../const/EnumItemSpId.js";
import { UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerMatkPercentUp
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_EARTH_SPIKE, SKILL_ID_FIRE_PILLAR, SKILL_ID_FROST_NOVA, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_ICE_WALL,
    SKILL_ID_JUPITER_THUNDER, SKILL_ID_LORD_OF_VERMILLION, SKILL_ID_METEOR_STORM, SKILL_ID_MONSTER_ZYOHO,
    SKILL_ID_QUAGMIRE, SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SIGHT_BLASTER, SKILL_ID_SIGHT_RASHER,
    SKILL_ID_STORM_GUST, SKILL_ID_WATER_BALL, SERE_SUPPORT_SKILL_ID_PETROLOGY, SERE_SUPPORT_SKILL_ID_EARTH_CARE
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ファイアーピラー
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_PILLAR
		defineSkill(SKILL_ID_FIRE_PILLAR, function() {

			this.name = "ファイアーピラー";
			this.kana = "フアイアアヒラア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3300 - 300 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, AS_PLUS } = env;
				let w_MATK = [0,0,0];
				CS.n_PerfectHIT_DMG = 0;
				set_n_Enekyori(2);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.directSubtractionMdef = true;
				CS.n_bunkatuHIT = 1;
				set_n_A_Weapon_zokusei(3);
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_Heal_MATK[i];
					w_MATK[i] = Math.floor(w_MATK[i] * (40 + 20 * n_A_ActiveSkillLV) / 100) + 100 + 50 * n_A_ActiveSkillLV;
					w_MATK[i] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
					w_MATK[i] = Math.floor(w_MATK[i] * (100+GetEquippedTotalSPEquip(5122) + GetEquippedTotalSPCardAndElse(5122)) / 100);
				}
				CS.wbairitu += GetBattlerMatkPercentUp();
				for(var b=0;b<=2;b++){
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100) / CS.wHITsuu);
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu;

					// TODO: ダメージ表示方式変更対応
					// w_DMG[b] *= wHITsuu;
				}
				if(CS.n_AS_MODE) return w_DMG;
				CS.w_HIT_HYOUJI = 100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// モンスター情報
		// ----------------------------------------------------------------
		// SKILL_ID_MONSTER_ZYOHO
		defineSkill(SKILL_ID_MONSTER_ZYOHO, function() {

			this.name = "モンスター情報";
			this.kana = "モンスタアシヨウホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// サイトラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_SIGHT_RASHER
		defineSkill(SKILL_ID_SIGHT_RASHER, function() {

			this.name = "サイトラッシャー";
			this.kana = "サイトラツシヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 33 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// メテオストーム
		// ----------------------------------------------------------------
		// SKILL_ID_METEOR_STORM
		defineSkill(SKILL_ID_METEOR_STORM, function() {

			this.name = "メテオストーム";
			this.kana = "メテオストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv - 1 * ((skillLv + 1) % 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 + 1000 * Math.floor(skillLv / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, g_VariableCastTimeRate } = env;
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				set_n_A_Weapon_zokusei(3);
				if(!CS.n_AS_MODE) CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2) * attackMethodConfArray[0].GetOptionValue(0);
				else CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2) * (Math.floor(n_A_ActiveSkillLV / 2) + 2);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				if(g_VariableCastTimeRate == 0) n_Delay[1] = n_Delay[1] / 2;
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}
		}),

		// ----------------------------------------------------------------
		// ユピテルサンダー
		// ----------------------------------------------------------------
		// SKILL_ID_JUPITER_THUNDER
		defineSkill(SKILL_ID_JUPITER_THUNDER, function() {

			this.name = "ユピテルサンダー";
			this.kana = "ユヒテルサンタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1600 + 400 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ロードオブヴァーミリオン
		// ----------------------------------------------------------------
		// SKILL_ID_LORD_OF_VERMILLION
		defineSkill(SKILL_ID_LORD_OF_VERMILLION, function() {
			this.name = "ロードオブヴァーミリオン";
			this.kana = "ロオトオフウアアミリオン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 56 + 4 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12400 - 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.ground_installation = true;
			this.damageInterval = 1000;
			this.LifeTime = function(skillLv, charaDataManger) {
				return 3100;
			}
			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 3100;
			}
			this.Power = function(skillLv, charaDataManger) {
				return [0,100,105,115,130,150,175,205,240,280,330][skillLv];
			}
			this.dispHitCount = 10;
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ウォーターボール
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_BALL
		defineSkill(SKILL_ID_WATER_BALL, function() {

			this.name = "ウォーターボール";
			this.kana = "ウオオタアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_SG_SPECIAL_HITNUM;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var hitcnt = 0;

				if (skillLv >= 4) {
					hitcnt = 25;
				} else if (skillLv >= 2) {
					hitcnt = 9;
				} else {
					hitcnt = 1;
				}

				return hitcnt;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 0.1 * this.hitCount(skillLv);
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// アイスウォール
		// ----------------------------------------------------------------
		// SKILL_ID_ICE_WALL
		defineSkill(SKILL_ID_ICE_WALL, function() {

			this.name = "アイスウォール";
			this.kana = "アイスウオオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// フロストノヴァ
		// ----------------------------------------------------------------
		// SKILL_ID_FROST_NOVA
		defineSkill(SKILL_ID_FROST_NOVA, function() {

			this.name = "フロストノヴァ";
			this.kana = "フロストノウア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 47 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ストームガスト
		// ----------------------------------------------------------------
		// SKILL_ID_STORM_GUST
		defineSkill(SKILL_ID_STORM_GUST, function() {
			this.name = "ストームガスト";
			this.kana = "ストオムカスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 78;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 + 800 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {	// 強制ディレイ（オブジェクト発生中は別のSGを重ねられないため）
				return 4500;
			}
			this.damageInterval = function(skillLv) {	// ダメージ間隔
				return 450;
			}
			this.Power = function(skillLv, charaDataManger) {
				return 70 + 50 * skillLv;
			}

			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, GetAttackMethodOptionValue } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[3] = g_skillManager.GetDelayTimeSkillTiming(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);	// 強制ディレイ（オブジェクト発生中は別のSGを重ねられないため）
				// 設置スキル設定
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = g_skillManager.GetDamageInterval(battleCalcInfo.skillId, battleCalcInfo.skillLv);	// ダメージ間隔
				// 「3hitで凍った場合のダメージを算出したいニーズ」を切り捨てない苦肉の策でオブジェクト存続時間を調整する
				n_Delay[6] = 450 * GetAttackMethodOptionValue(attackMethodConfArray, 0, 3);	// オブジェクト存続時間
				// 属性
				set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
				// ダメージ倍率
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			}
		}),

		// ----------------------------------------------------------------
		// アーススパイク
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_SPIKE
		defineSkill(SKILL_ID_EARTH_SPIKE, function() {

			this.name = "アーススパイク";
			this.kana = "アアススハイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == SERE_SUPPORT_SKILL_ID_PETROLOGY) {
					pow += Math.floor(n_A_JobLV / 3);
				} else if (seirei == SERE_SUPPORT_SKILL_ID_EARTH_CARE) {
					pow += 75;
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 560 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ヘヴンズドライブ
		// ----------------------------------------------------------------
		// SKILL_ID_HEAVENS_DRIVE
		defineSkill(SKILL_ID_HEAVENS_DRIVE, function() {

			this.name = "ヘヴンズドライブ";
			this.kana = "ヘウンストライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 125;

				// 「ソーサラー 精霊スキル」の効果
				seirei = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == SERE_SUPPORT_SKILL_ID_PETROLOGY) {
					pow += Math.floor(n_A_JobLV / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// クァグマイア
		// ----------------------------------------------------------------
		// SKILL_ID_QUAGMIRE
		defineSkill(SKILL_ID_QUAGMIRE, function() {

			this.name = "クァグマイア";
			this.kana = "クアクマイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// サイトブラスター
		// ----------------------------------------------------------------
		// SKILL_ID_SIGHT_BLASTER
		defineSkill(SKILL_ID_SIGHT_BLASTER, function() {

			this.name = "サイトブラスター";
			this.kana = "サイトフラスタア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

];
