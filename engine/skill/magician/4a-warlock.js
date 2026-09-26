/**
 * スキル定義 magician/4a-warlock（24 件 / SKILL_ID 517〜798 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_INT, n_A_JobLV, n_A_MATK, BK_n_A_MATK } from "../../runtime/roro-state.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import { UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { n_B_KYOUKA } from "../../monster/mobconfbuf.js";
import {
    MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE, MOB_CONF_DEBUF_ID_LEX_AETERNA, MOB_CONF_DEBUF_ID_SEKIKA,
    MOB_CONF_DEBUF_ID_TOUKETSU, n_B_IJYOU
} from "../../monster/mobconfdebuf.js";
import { MonsterObjNew } from "../../monster/monster.dat.js";
import {
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerMatkPercentUp
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_COMMET, SKILL_ID_CRYMSON_ROCK, SKILL_ID_DRAIN_LIFE, SKILL_ID_EARTH_STRAIN,
    SKILL_ID_FREEZING_SPELL, SKILL_ID_FROST_MISTY, SKILL_ID_HELL_INFERNO, SKILL_ID_JACK_FROST,
    SKILL_ID_MARSH_OF_ABYSS, SKILL_ID_RADIUS, SKILL_ID_READING_SPELLBOOK, SKILL_ID_RECOGNIZED_SPELL,
    SKILL_ID_RELEASE, SKILL_ID_SIENNA_EXEXRATE, SKILL_ID_SOUL_EXPANSION, SKILL_ID_STASIS, SKILL_ID_SUMMON_FIRE_BALL,
    SKILL_ID_SUMMON_LIGHTNING_BALL, SKILL_ID_SUMMON_STONE, SKILL_ID_SUMMON_WATER_BALL,
    SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TETRA_BOLTEX, SKILL_ID_WHITE_IN_PRISON
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ホワイトインプリズン
		// ----------------------------------------------------------------
		// SKILL_ID_WHITE_IN_PRISON
		defineSkill(SKILL_ID_WHITE_IN_PRISON, function() {

			this.name = "ホワイトインプリズン";
			this.kana = "ホワイトインフリスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルエクスパンション
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_EXPANSION
		defineSkill(SKILL_ID_SOUL_EXPANSION, function() {

			this.name = "ソウルエクスパンション";
			this.kana = "ソウルエクスハンシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 400 + 100 * skillLv + n_A_INT;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.genericFormula = true;
			this.MagicalDividedHitFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK, subnumvalue) {
				const { CS } = env;
				if(subnumvalue >= 1 && mobData[20] == 0){
					for(var b=0;b<=2;b++){
						w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100) / CS.wHITsuu);
						var KoteiDMG = 400 * subnumvalue;
						KoteiDMG = KoteiDMG * ROUNDDOWN((100 + 40 * UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) / 100);
						CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu + KoteiDMG;
						// TODO: 四次データ形式変更対応
						// w_DMG[b] *= wHITsuu;
					}
					return true;
				}
				return false;
			}
		}),

		// ----------------------------------------------------------------
		// フロストミスティ
		// ----------------------------------------------------------------
		// SKILL_ID_FROST_MISTY
		defineSkill(SKILL_ID_FROST_MISTY, function() {

			this.name = "フロストミスティ";
			this.kana = "フロストミステイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1200 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ジャックフロスト
		// ----------------------------------------------------------------
		// SKILL_ID_JACK_FROST
		defineSkill(SKILL_ID_JACK_FROST, function() {

			this.name = "ジャックフロスト";
			this.kana = "シヤツクフロスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				var pow = 0;

				if (option.GetOptionValue(0) == 1) {
					pow = 1000 + 300 * skillLv;
					pow = Math.floor(pow * n_A_BaseLV / 100);
				} else {
					pow = 500 + 100 * skillLv;
					pow = Math.floor(pow * n_A_BaseLV / 150);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// マーシュオブアビス
		// ----------------------------------------------------------------
		// SKILL_ID_MARSH_OF_ABYSS
		defineSkill(SKILL_ID_MARSH_OF_ABYSS, function() {

			this.name = "マーシュオブアビス";
			this.kana = "マアシユオフアヒス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv + 500 * Math.max(0, skillLv - 3);

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// リコグナイズドスペル
		// ----------------------------------------------------------------
		// SKILL_ID_RECOGNIZED_SPELL
		defineSkill(SKILL_ID_RECOGNIZED_SPELL, function() {

			this.name = "リコグナイズドスペル";
			this.kana = "リコクナイストスヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 90 : (200 - 20 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -5000 + 35000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シエナエクセクレイト
		// ----------------------------------------------------------------
		// SKILL_ID_SIENNA_EXEXRATE
		defineSkill(SKILL_ID_SIENNA_EXEXRATE, function() {

			this.name = "シエナエクセクレイト";
			this.kana = "シエナエクセクレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ラディウス
		// ----------------------------------------------------------------
		// SKILL_ID_RADIUS
		defineSkill(SKILL_ID_RADIUS, function() {
			this.name = "ラディウス";
			this.kana = "ラテイウス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ステイシス
		// ----------------------------------------------------------------
		// SKILL_ID_STASIS
		defineSkill(SKILL_ID_STASIS, function() {

			this.name = "ステイシス";
			this.kana = "ステイシス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000 + 5000 * skillLv;

				}

				return 300000;
			}

		}),

		// ----------------------------------------------------------------
		// ドレインライフ
		// ----------------------------------------------------------------
		// SKILL_ID_DRAIN_LIFE
		defineSkill(SKILL_ID_DRAIN_LIFE, function() {

			this.name = "ドレインライフ";
			this.kana = "トレインライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv + n_A_INT;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// クリムゾンロック
		// ----------------------------------------------------------------
		// SKILL_ID_CRYMSON_ROCK
		defineSkill(SKILL_ID_CRYMSON_ROCK, function() {

			this.name = "クリムゾンロック";
			this.kana = "クリムソンロツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				// ベースレベル補正がかからない威力
				pow += 1300;

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ヘルインフェルノ
		// ----------------------------------------------------------------
		// SKILL_ID_HELL_INFERNO
		defineSkill(SKILL_ID_HELL_INFERNO, function() {

			this.name = "ヘルインフェルノ";
			this.kana = "ヘルインフエルノ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				let w_MATK = [0,0,0];
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				CS.wLAch = true;
				CS.n_PerfectHIT_DMG = 0;
				set_n_Enekyori(2);
				CS.directSubtractionMdef = false;
				CS.wbairitu = 100;
				CS.n_bunkatuHIT = 0;
				var wBai = new Array();
				wBai[0] = 60 * n_A_ActiveSkillLV;
				wBai[0] = Math.floor(wBai[0] * n_A_BaseLV / 100);
				wBai[1] = 240 * n_A_ActiveSkillLV;
				wBai[1] = Math.floor(wBai[1] * n_A_BaseLV / 100);
				wBai[0] += GetBattlerMatkPercentUp();
				wBai[1] += GetBattlerMatkPercentUp();
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				var wHell_DMG1 = [0,0,0];
				var wHell_DMG2 = [0,0,0];
				set_n_A_Weapon_zokusei(3);
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				}
				wHell_DMG1[0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wBai[0] / 100);
				wHell_DMG1[1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wBai[0] / 100);
				wHell_DMG1[2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wBai[0] / 100);
				set_n_A_Weapon_zokusei(7);
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				}
				wHell_DMG2[0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wBai[1] / 100);
				wHell_DMG2[1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wBai[1] / 100);
				wHell_DMG2[2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wBai[1] / 100);
				for(var i=0;i<=2;i++){
					if(wHell_DMG1[i] <0) wHell_DMG1[i] = 0;
					if(wHell_DMG2[i] <0) wHell_DMG2[i] = 0;
				}
				if(CS.n_AS_MODE){
					for(var i=0;i<=2;i++) w_DMG[i] = wHell_DMG1[i] + wHell_DMG2[i];
					return w_DMG;
				}
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wHell_DMG1[i] + wHell_DMG2[i];
					if(!(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0)){
						var w = wHell_DMG1[i] * 2;
						var w2 = w + wHell_DMG2[i];
						CS.Last_DMG_B[i] = w2;
					}
				}
				CS.n_PerfectHIT_DMG = 0;
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// コメット
		// ----------------------------------------------------------------
		// SKILL_ID_COMMET
		defineSkill(SKILL_ID_COMMET, function() {

			this.name = "コメット";
			this.kana = "コメツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 400 + 80 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				var pow = 0;
				var wDistance = option.GetOptionValue(0);

				switch (wDistance) {

				case 0:
					pow = 2500 + 500 * skillLv;
					break;

				case 1:
					pow = 1600 + 400 * skillLv;
					break;

				case 2:
					pow = 1200 + 300 * skillLv;
					break;

				case 3:
					pow = 800 + 200 * skillLv;
					break;

				case 4:	// 協力発動
					pow = Math.floor(2500 + 400 * skillLv * n_A_BaseLV / 120);
					break;
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 8500 + 1500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 120000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// チェーンライトニング
		// ----------------------------------------------------------------
		// SKILL_ID_CHAIN_LIGHTNING
		defineSkill(SKILL_ID_CHAIN_LIGHTNING, function() {

			this.name = "チェーンライトニング";
			this.kana = "チエエンライトニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				let w_MATK = [0,0,0];
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				set_n_Enekyori(2);
				set_n_A_Weapon_zokusei(4);
				if(!CS.n_AS_MODE) CS.wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
				else CS.wHITsuu = 4;
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				var wC_DMG = new Array();
				for(var i=0;i<=5;i++) wC_DMG[i] = [0,0,0];
				var wBK_MATK = [0,0,0];
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
					wBK_MATK[i] = BK_n_A_MATK[i];
					wBK_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, wBK_MATK[i]);
					wBK_MATK[i] = ApplyResistElement(mobData, wBK_MATK[i]);
					wBK_MATK[i] = ApplyRegistPVPNormal(mobData, wBK_MATK[i]);
				}
				var T_check = -1;
				for(var i=0;i<=(CS.wHITsuu-1);i++){
					CS.wbairitu = 100 * n_A_ActiveSkillLV + 500;
					CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
					CS.wbairitu += (300 + 100 * n_A_ActiveSkillLV - i * 100);
					CS.wbairitu += GetBattlerMatkPercentUp();

					var ampHit = 1;
					if(!CS.n_AS_MODE) ampHit = attackMethodConfArray[0].GetOptionValue(1);

					if(i <= ampHit){
						wC_DMG[i][0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * CS.wbairitu / 100);
						wC_DMG[i][1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * CS.wbairitu / 100);
						wC_DMG[i][2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * CS.wbairitu / 100);
					}else{
						wC_DMG[i][0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[0] * CS.wbairitu / 100);
						wC_DMG[i][1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[1] * CS.wbairitu / 100);
						wC_DMG[i][2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[2] * CS.wbairitu / 100);
					}
					if(i==0){
						if(n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU] || n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]){
							T_check = mobData[18];
							mobData[18] = MonsterObjNew[mobData[0]][18];
							if(n_B_KYOUKA[6]) T_check = n_B_KYOUKA[6];
							if(n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE]) T_check = n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE] * 10 + (T_check % 10);
						}
					}
				}
				if(T_check != -1) mobData[18] = T_check;
				if(CS.n_AS_MODE){

					for(var i=0;i<=2;i++) {
						w_DMG[i] = wC_DMG[0][i] + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

						// TODO: ダメージ表示方式変更対応
						w_DMG[i] = Math.floor(w_DMG[i] / CS.wHITsuu);
					}

					return w_DMG;
				}
				for(var i=0;i<=2;i++){
					if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0){

						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wC_DMG[0][i] + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

						// TODO: ダメージ表示方式変更対応
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = Math.floor(w_DMG[i] / CS.wHITsuu);
					}else{

						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = (wC_DMG[0][i] * 2) + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

						// TODO: ダメージ表示方式変更対応
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = Math.floor(w_DMG[i] / CS.wHITsuu);
					}
				}
				CS.n_PerfectHIT_DMG = 0;
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// アースストレイン
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_STRAIN
		defineSkill(SKILL_ID_EARTH_STRAIN, function() {

			this.name = "アースストレイン";
			this.kana = "アアスストレイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 62 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 2000 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 600 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// テトラボルテックス
		// ----------------------------------------------------------------
		// SKILL_ID_TETRA_BOLTEX
		defineSkill(SKILL_ID_TETRA_BOLTEX, function() {

			this.name = "テトラボルテックス";
			this.kana = "テトラホルテツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90 + 30 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(9000, 4000 + 1000 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.max(1000, 6000 - 1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				let w_MATK = [0,0,0];
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				set_n_Enekyori(2);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu += GetBattlerMatkPercentUp();
				var wT_DMG1 = [0,0,0];
				var wT_DMG2 = [0,0,0];
				var wT_DMG3 = [0,0,0];
				var wT_DMG4 = [0,0,0];
				set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(0) / 10));
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
					wT_DMG1[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
				}
				set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(0) % 10));
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
					wT_DMG2[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
				}
				set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(1) / 10));
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
					wT_DMG3[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
				}
				set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(1) % 10));
				var T_check = -1;
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU] || n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]){
					T_check = mobData[3];
					mobData[18] = MonsterObjNew[mobData[0]][18];
					if(n_B_KYOUKA[6]) T_check = n_B_KYOUKA[6];
					if(n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE]) T_check = n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE] * 10 + (T_check % 10);
				}
				for(var i=0;i<=2;i++){
					w_MATK[i] = n_A_MATK[i];
					w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
					w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
					w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
					wT_DMG4[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
				}
				if(T_check != -1) mobData[18] = T_check;
				for(var i=0;i<=2;i++){
					if(wT_DMG1[i] <0) wT_DMG1[i] = 0;
					if(wT_DMG2[i] <0) wT_DMG2[i] = 0;
					if(wT_DMG3[i] <0) wT_DMG3[i] = 0;
					if(wT_DMG4[i] <0) wT_DMG4[i] = 0;
				}
				if(CS.n_AS_MODE){
					for(var i=0;i<=2;i++) w_DMG[i] = wT_DMG1[i] + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
					return w_DMG;
				}
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wT_DMG1[i] + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
					if(!(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0)){
						var w = wT_DMG1[i] * 2;
						var w2 = w + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = w2;
					}
				}
				CS.n_PerfectHIT_DMG = 0;
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// サモンファイアーボール
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_FIRE_BALL
		defineSkill(SKILL_ID_SUMMON_FIRE_BALL, function() {

			this.name = "サモンファイアーボール";
			this.kana = "サモンフアイアアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = n_A_BaseLV + n_A_JobLV;
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(0);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// サモンウォーターボール
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_WATER_BALL
		defineSkill(SKILL_ID_SUMMON_WATER_BALL, function() {

			this.name = "サモンウォーターボール";
			this.kana = "サモンウオオタアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = n_A_BaseLV + n_A_JobLV;
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(0);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// サモンボールライトニング
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_LIGHTNING_BALL
		defineSkill(SKILL_ID_SUMMON_LIGHTNING_BALL, function() {

			this.name = "サモンボールライトニング";
			this.kana = "サモンホオルライトニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = n_A_BaseLV + n_A_JobLV;
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(0);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// サモンストーン
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_STONE
		defineSkill(SKILL_ID_SUMMON_STONE, function() {

			this.name = "サモンストーン";
			this.kana = "サモンストオン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = n_A_BaseLV + n_A_JobLV;
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(0);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// リリース
		// ----------------------------------------------------------------
		// SKILL_ID_RELEASE
		defineSkill(SKILL_ID_RELEASE, function() {

			this.name = "リリース";
			this.kana = "リリイス";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -14 + 17 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リーディングスペルブック
		// ----------------------------------------------------------------
		// SKILL_ID_READING_SPELLBOOK
		defineSkill(SKILL_ID_READING_SPELLBOOK, function() {

			this.name = "リーディングスペルブック";
			this.kana = "リイテインクスヘルフツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 250;
			}

		}),

		// ----------------------------------------------------------------
		// フリージングスペル
		// ----------------------------------------------------------------
		// SKILL_ID_FREEZING_SPELL
		defineSkill(SKILL_ID_FREEZING_SPELL, function() {
			this.name = "フリージングスペル";
			this.kana = "フリイシンクスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// テレキネシスインテンス
		// ----------------------------------------------------------------
		// SKILL_ID_TELECHINESIS_INSTENCE
		defineSkill(SKILL_ID_TELECHINESIS_INSTENCE, function() {

			this.name = "テレキネシスインテンス";
			this.kana = "テレキネシスインテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolAry = [ 120000, 170000, 210000, 240000, 260000 ];

				return coolAry[skillLv - 1];
			}

		}),

];
