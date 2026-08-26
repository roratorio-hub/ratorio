/**
 * スキル定義 magician/4b-sorcerer（27 件 / SKILL_ID 658〜895 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ARRULLO, SKILL_ID_CLOUD_KILL, SKILL_ID_DIAMOND_DUST, SKILL_ID_EARTH_GRAVE, SKILL_ID_EARTH_INSIGNIA,
    SKILL_ID_ELECTRIC_WALK, SKILL_ID_ELEMENTAL_ACTION, SKILL_ID_ELEMENTAL_ANALYSIS, SKILL_ID_ELEMENTAL_CONTROL,
    SKILL_ID_ELEMENTAL_CURE, SKILL_ID_ELEMENTAL_SHIELD, SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_FIRE_INSIGNIA,
    SKILL_ID_FIRE_WALK, SKILL_ID_POISON_BUSTER, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_SERE_SUPPORT_SKILL,
    SKILL_ID_SPELL_FIST, SKILL_ID_STRIKING, SKILL_ID_SUMMON_AGNI, SKILL_ID_SUMMON_AQUA, SKILL_ID_SUMMON_TERA,
    SKILL_ID_SUMMON_VENTOS, SKILL_ID_VACUUM_EXTREME, SKILL_ID_VERATURE_SPEAR, SKILL_ID_WARMER,
    SKILL_ID_WATER_INSIGNIA, SKILL_ID_WIND_INSIGNIA
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ファイアーウォーク
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_WALK
		defineSkill(SKILL_ID_FIRE_WALK, function() {

			this.name = "ファイアーウォーク";
			this.kana = "フアイアアウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 60 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 4) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 2);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エレクトリックウォーク
		// ----------------------------------------------------------------
		// SKILL_ID_ELECTRIC_WALK
		defineSkill(SKILL_ID_ELECTRIC_WALK, function() {

			this.name = "エレクトリックウォーク";
			this.kana = "エレクトリツクウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 60 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 22) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 2);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// スペルフィスト
		// ----------------------------------------------------------------
		// SKILL_ID_SPELL_FIST
		defineSkill(SKILL_ID_SPELL_FIST, function() {

			this.name = "(△)スペルフィスト";
			this.kana = "スヘルフイスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// バキュームエクストリーム
		// ----------------------------------------------------------------
		// SKILL_ID_VACUUM_EXTREME
		defineSkill(SKILL_ID_VACUUM_EXTREME, function() {

			this.name = "バキュームエクストリーム";
			this.kana = "ハキユウムエクストリイム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 8 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 4000, 6000, 8000, 10000, 12000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サイキックウェーブ
		// ----------------------------------------------------------------
		// SKILL_ID_PSYCHIC_WAVE
		defineSkill(SKILL_ID_PSYCHIC_WAVE, function() {

			this.name = "サイキックウェーブ";
			this.kana = "サイキツクウエエフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
			}

			//this.Power = function(skillLv, charaDataManger) {
			//	var pow = 0;
			//	var seirei = 0;

				// 基本式
			//	pow = 70 * skillLv + 3 * charaDataManger.GetCharaInt();

				// ベースレベル補正
			//	pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

			//	return pow;
			//}

			//this.hitCount = function(skillLv, charaDataManger) {
			//	return 2 + skillLv;
			//}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2750 + 1250 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1500, 2000, 2500, 3000, 3500])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// クラウドキル
		// ----------------------------------------------------------------
		// SKILL_ID_CLOUD_KILL
		defineSkill(SKILL_ID_CLOUD_KILL, function() {
			this.name = "クラウドキル";
			this.kana = "クラウトキル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_POISON;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1750 - 250 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 8000, 10000, 12000, 14000, 16000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ポイズンバスター
		// ----------------------------------------------------------------
		// SKILL_ID_POISON_BUSTER
		defineSkill(SKILL_ID_POISON_BUSTER, function() {

			this.name = "ポイズンバスター";
			this.kana = "ホイスンハスタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_POISON;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 1000 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 31) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() * 5);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -750 + 1250 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1750 - 250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ストライキング
		// ----------------------------------------------------------------
		// SKILL_ID_STRIKING
		defineSkill(SKILL_ID_STRIKING, function() {

			this.name = "ストライキング";
			this.kana = "ストライキンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 60000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// アースグレイヴ
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_GRAVE
		defineSkill(SKILL_ID_EARTH_GRAVE, function() {

			this.name = "アースグレイヴ";
			this.kana = "アアスクレイウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 54 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 8000, 11000, 14000, 17000, 20000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ダイヤモンドダスト
		// ----------------------------------------------------------------
		// SKILL_ID_DIAMOND_DUST
		defineSkill(SKILL_ID_DIAMOND_DUST, function() {

			this.name = "ダイヤモンドダスト";
			this.kana = "タイヤモントタスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 6 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 12000, 14000, 16000, 18000, 20000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ウォーマー
		// ----------------------------------------------------------------
		// SKILL_ID_WARMER
		defineSkill(SKILL_ID_WARMER, function() {

			this.name = "ウォーマー";
			this.kana = "ウオオマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 12 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 + 5000 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 20000, 30000, 40000, 50000, 60000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ヴェラチュールスピアー
		// ----------------------------------------------------------------
		// SKILL_ID_VERATURE_SPEAR
		defineSkill(SKILL_ID_VERATURE_SPEAR, function() {

			this.name = "(△)ヴェラチュールスピアー";
			this.kana = "ウエラチユウルスヒアア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 48 + 7 * skillLv + (skillLv >= 8 ? 10 : 0);
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(3000, 2000 + 200 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.max(1000, 2000 - 200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// アルージョ
		// ----------------------------------------------------------------
		// SKILL_ID_ARRULLO
		defineSkill(SKILL_ID_ARRULLO, function() {

			this.name = "アルージョ";
			this.kana = "アルウシヨ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000 + 1000 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 8000, 10000, 12000, 14000, 16000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンアグニ
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_AGNI
		defineSkill(SKILL_ID_SUMMON_AGNI, function() {

			this.name = "サモンアグニ";
			this.kana = "サモンアクニ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 300000, 600000, 900000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンアクア
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_AQUA
		defineSkill(SKILL_ID_SUMMON_AQUA, function() {

			this.name = "サモンアクア";
			this.kana = "サモンアクア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 300000, 600000, 900000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンベントス
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_VENTOS
		defineSkill(SKILL_ID_SUMMON_VENTOS, function() {

			this.name = "サモンベントス";
			this.kana = "サモンヘントス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 300000, 600000, 900000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンテラ
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_TERA
		defineSkill(SKILL_ID_SUMMON_TERA, function() {

			this.name = "サモンテラ";
			this.kana = "サモンテラ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 300000, 600000, 900000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// エレメンタルコントロール
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_CONTROL
		defineSkill(SKILL_ID_ELEMENTAL_CONTROL, function() {

			this.name = "エレメンタルコントロール";
			this.kana = "エレメンタルコントロオル";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 - 2000 * Math.floor((skillLv + 1) / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000 - 5000 * Math.floor((skillLv + 1) / 2);
			}

		}),

		// ----------------------------------------------------------------
		// エレメンタルアクション
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_ACTION
		defineSkill(SKILL_ID_ELEMENTAL_ACTION, function() {

			this.name = "エレメンタルアクション";
			this.kana = "エレメンタルアクシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
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
		// エレメンタルアナライシス
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_ANALYSIS
		defineSkill(SKILL_ID_ELEMENTAL_ANALYSIS, function() {

			this.name = "エレメンタルアナライシス";
			this.kana = "エレメンタルアナライシス";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// エレメンタルシンパシー
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_SYMPASY
		defineSkill(SKILL_ID_ELEMENTAL_SYMPASY, function() {

			this.name = "エレメンタルシンパシー";
			this.kana = "エレメンタルシンハシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// エレメンタルキュアー
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_CURE
		defineSkill(SKILL_ID_ELEMENTAL_CURE, function() {

			this.name = "エレメンタルキュアー";
			this.kana = "エレメンタルキユアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10;
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
		// ファイアーインシグニア
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_INSIGNIA
		defineSkill(SKILL_ID_FIRE_INSIGNIA, function() {

			this.name = "ファイアーインシグニア";
			this.kana = "フアイアアインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウォーターインシグニア
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_INSIGNIA
		defineSkill(SKILL_ID_WATER_INSIGNIA, function() {

			this.name = "ウォーターインシグニア";
			this.kana = "ウオオタアインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウィンドインシグニア
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_INSIGNIA
		defineSkill(SKILL_ID_WIND_INSIGNIA, function() {

			this.name = "ウィンドインシグニア";
			this.kana = "ウイントインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アースインシグニア
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_INSIGNIA
		defineSkill(SKILL_ID_EARTH_INSIGNIA, function() {

			this.name = "アースインシグニア";
			this.kana = "アアスインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// エレメンタルシールド
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_SHIELD
		defineSkill(SKILL_ID_ELEMENTAL_SHIELD, function() {

			this.name = "エレメンタルシールド";
			this.kana = "エレメンタルシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
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

];
