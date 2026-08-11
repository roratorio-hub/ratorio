/**
 * スキル定義 magician/2a-wizard（14 件 / SKILL_ID 122〜848 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_EARTH_SPIKE, SKILL_ID_FIRE_PILLAR, SKILL_ID_FROST_NOVA, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_ICE_WALL,
    SKILL_ID_JUPITER_THUNDER, SKILL_ID_LORD_OF_VERMILLION, SKILL_ID_METEOR_STORM, SKILL_ID_MONSTER_ZYOHO,
    SKILL_ID_QUAGMIRE, SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SIGHT_BLASTER, SKILL_ID_SIGHT_RASHER,
    SKILL_ID_STORM_GUST, SKILL_ID_WATER_BALL
} from '../../skill.dat.js';

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
