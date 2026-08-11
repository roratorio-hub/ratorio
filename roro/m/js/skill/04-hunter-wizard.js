/**
 * スキル定義 04-hunter-wizard（SKILL_ID 105–134 / 30 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    SKILL_ID_ANKLESNARE, SKILL_ID_BEAST_BANE, SKILL_ID_BLAST_MINE, SKILL_ID_BLITZ_BEAT, SKILL_ID_CLAYMORE_TRAP,
    SKILL_ID_DETECTING, SKILL_ID_EARTH_SPIKE, SKILL_ID_FALCON_MASTERY, SKILL_ID_FIRE_PILLAR, SKILL_ID_FLASHER,
    SKILL_ID_FREEZING_TRAP, SKILL_ID_FROST_NOVA, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_ICE_WALL, SKILL_ID_JUPITER_THUNDER,
    SKILL_ID_LAND_MINE, SKILL_ID_LORD_OF_VERMILLION, SKILL_ID_METEOR_STORM, SKILL_ID_MONSTER_ZYOHO,
    SKILL_ID_QUAGMIRE, SKILL_ID_REMOVE_TRAP, SKILL_ID_SANDMAN, SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SHOCKWAVE_TRAP,
    SKILL_ID_SIGHT_RASHER, SKILL_ID_SKID_TRAP, SKILL_ID_SPRING_TRAP, SKILL_ID_STEEL_CROW, SKILL_ID_STORM_GUST,
    SKILL_ID_TALKIE_BOX, SKILL_ID_WATER_BALL
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// スキッドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_SKID_TRAP
		defineSkill(SKILL_ID_SKID_TRAP, function() {

			this.name = "スキッドトラップ";
			this.kana = "スキツトトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 300000, 240000, 180000, 120000, 60000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ランドマイン
		// ----------------------------------------------------------------
		// SKILL_ID_LAND_MINE
		defineSkill(SKILL_ID_LAND_MINE, function() {

			this.name = "(仮)ランドマイン";
			this.kana = "ラントマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 200000, 160000, 120000, 80000, 40000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// アンクルスネア
		// ----------------------------------------------------------------
		// SKILL_ID_ANKLESNARE
		defineSkill(SKILL_ID_ANKLESNARE, function() {

			this.name = "アンクルスネア";
			this.kana = "アンクルスネア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 250000, 200000, 150000, 100000, 50000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// フラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_FLASHER
		defineSkill(SKILL_ID_FLASHER, function() {

			this.name = "フラッシャー";
			this.kana = "フラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 150000, 120000, 90000, 60000, 30000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ショックウェーブトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_SHOCKWAVE_TRAP
		defineSkill(SKILL_ID_SHOCKWAVE_TRAP, function() {

			this.name = "ショックウェーブトラップ";
			this.kana = "シヨツクウエエフトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 200000, 160000, 120000, 80000, 40000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サンドマン
		// ----------------------------------------------------------------
		// SKILL_ID_SANDMAN
		defineSkill(SKILL_ID_SANDMAN, function() {

			this.name = "サンドマン";
			this.kana = "サントマン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 150000, 120000, 90000, 60000, 30000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// フリージングトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_FREEZING_TRAP
		defineSkill(SKILL_ID_FREEZING_TRAP, function() {

			this.name = "フリージングトラップ";
			this.kana = "フリイシンクトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 150000, 120000, 90000, 60000, 30000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ブラストマイン
		// ----------------------------------------------------------------
		// SKILL_ID_BLAST_MINE
		defineSkill(SKILL_ID_BLAST_MINE, function() {

			this.name = "(？)ブラストマイン";
			this.kana = "フラストマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 25000, 20000, 15000, 10000, 5000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// クレイモアトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_CLAYMORE_TRAP
		defineSkill(SKILL_ID_CLAYMORE_TRAP, function() {

			this.name = "(？)クレイモアトラップ";
			this.kana = "クレイモアトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 20000, 40000, 60000, 80000, 100000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// リムーブトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_REMOVE_TRAP
		defineSkill(SKILL_ID_REMOVE_TRAP, function() {

			this.name = "リムーブトラップ";
			this.kana = "リムウフトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// トーキーボックス
		// ----------------------------------------------------------------
		// SKILL_ID_TALKIE_BOX
		defineSkill(SKILL_ID_TALKIE_BOX, function() {

			this.name = "トーキーボックス";
			this.kana = "トオキイホツクス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// ビーストベイン
		// ----------------------------------------------------------------
		// SKILL_ID_BEAST_BANE
		defineSkill(SKILL_ID_BEAST_BANE, function() {

			this.name = "ビーストベイン";
			this.kana = "ヒイストヘイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファルコンマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_FALCON_MASTERY
		defineSkill(SKILL_ID_FALCON_MASTERY, function() {

			this.name = "ファルコンマスタリー";
			this.kana = "フアルコンマスタリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ブリッツビート
		// ----------------------------------------------------------------
		// SKILL_ID_BLITZ_BEAT
		defineSkill(SKILL_ID_BLITZ_BEAT, function() {

			this.name = "ブリッツビート";
			this.kana = "フリツツヒイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
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
		// スチールクロウ
		// ----------------------------------------------------------------
		// SKILL_ID_STEEL_CROW
		defineSkill(SKILL_ID_STEEL_CROW, function() {

			this.name = "スチールクロウ";
			this.kana = "スチイルクロウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ディテクティング
		// ----------------------------------------------------------------
		// SKILL_ID_DETECTING
		defineSkill(SKILL_ID_DETECTING, function() {

			this.name = "ディテクティング";
			this.kana = "テイテクテインク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

		}),

		// ----------------------------------------------------------------
		// スプリングトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_SPRING_TRAP
		defineSkill(SKILL_ID_SPRING_TRAP, function() {

			this.name = "スプリングトラップ";
			this.kana = "スフリンクトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

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
				return -1;
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
			this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ウォーターボール
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_BALL
		defineSkill(SKILL_ID_WATER_BALL, function() {

			this.name = "ウォーターボール";
			this.kana = "ウオオタアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
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

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 100 * this.hitCount(skillLv, charaDataManger);
			}

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
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 28) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
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
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 28) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
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

];
