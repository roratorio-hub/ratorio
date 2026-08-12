/**
 * スキル定義 magician/1-magician（14 件 / SKILL_ID 45〜58 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_COLD_BOLT, SKILL_ID_ENERGY_COAT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_WALL,
    SKILL_ID_FROST_DIVER, SKILL_ID_LIGHTNING_BOLT, SKILL_ID_NAPALM_BEAT, SKILL_ID_SAFETY_WALL,
    SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SIGHT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
    SKILL_ID_STONE_CURSE, SKILL_ID_THUNDER_STORM
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// SP回復力向上
		// ----------------------------------------------------------------
		// SKILL_ID_SP_KAIFUKURYOKU_KOZYO
		defineSkill(SKILL_ID_SP_KAIFUKURYOKU_KOZYO, function() {

			this.name = "SP回復力向上";
			this.kana = "スヒリチユアルハワアカイフクリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ナパームビート
		// ----------------------------------------------------------------
		// SKILL_ID_NAPALM_BEAT
		defineSkill(SKILL_ID_NAPALM_BEAT, function() {

			this.name = "ナパームビート";
			this.kana = "ナハアムヒイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 3 * Math.floor((skillLv - 1) / 3);
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				switch (skillLv) {
				case 1:
				case 2:
				case 3:
					return 1000;
				case 4:
				case 5:
					return 900;
				case 6:
				case 7:
					return 800;
				case 8:
					return 700;
				case 9:
					return 600;
				case 10:
					return 500;
				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルストライク
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_STRIKE
		defineSkill(SKILL_ID_SOUL_STRIKE, function() {

			this.name = "ソウルストライク";
			this.kana = "ソウルストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 6 * Math.floor((skillLv + 1) / 2) - 4
						* ((skillLv + 1) % 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * Math.floor((skillLv + 1) / 2) - 200
						* ((skillLv + 1) % 2);
			}

		}),

		// ----------------------------------------------------------------
		// セイフティウォール
		// ----------------------------------------------------------------
		// SKILL_ID_SAFETY_WALL
		defineSkill(SKILL_ID_SAFETY_WALL, function() {

			this.name = "セイフティウォール";
			this.kana = "セイフテイウオオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 10) ? 40 : 30 + 5 * Math
						.floor((skillLv - 1) / 3);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4400 - 400 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ストーンカース
		// ----------------------------------------------------------------
		// SKILL_ID_STONE_CURSE
		defineSkill(SKILL_ID_STONE_CURSE, function() {

			this.name = "ストーンカース";
			this.kana = "ストオンカアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 - skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// サイト
		// ----------------------------------------------------------------
		// SKILL_ID_SIGHT
		defineSkill(SKILL_ID_SIGHT, function() {

			this.name = "サイト";
			this.kana = "サイト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 10000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ファイアーボルト
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_BOLT
		defineSkill(SKILL_ID_FIRE_BOLT, function() {

			this.name = "ファイアーボルト";
			this.kana = "フアイアアホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

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
				if (seirei == 1) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアーボール
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_BALL
		defineSkill(SKILL_ID_FIRE_BALL, function() {

			this.name = "ファイアーボール";
			this.kana = "フアイアアホオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 140 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1500 : 150;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1500 : 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアーウォール
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_WALL
		defineSkill(SKILL_ID_FIRE_WALL, function() {

			this.name = "ファイアーウォール";
			this.kana = "フアイアアウオオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 50;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 1) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 4 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2150 - 150 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// コールドボルト
		// ----------------------------------------------------------------
		// SKILL_ID_COLD_BOLT
		defineSkill(SKILL_ID_COLD_BOLT, function() {

			this.name = "コールドボルト";
			this.kana = "コオルトホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

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
				if (seirei == 10) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// フロストダイバー
		// ----------------------------------------------------------------
		// SKILL_ID_FROST_DIVER
		defineSkill(SKILL_ID_FROST_DIVER, function() {

			this.name = "フロストダイバー";
			this.kana = "フロストタイハア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 - skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100 + 10 * skillLv;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 10) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// ライトニングボルト
		// ----------------------------------------------------------------
		// SKILL_ID_LIGHTNING_BOLT
		defineSkill(SKILL_ID_LIGHTNING_BOLT, function() {

			this.name = "ライトニングボルト";
			this.kana = "ライトニンクホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

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
				if (seirei == 19) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サンダーストーム
		// ----------------------------------------------------------------
		// SKILL_ID_THUNDER_STORM
		defineSkill(SKILL_ID_THUNDER_STORM, function() {

			this.name = "サンダーストーム";
			this.kana = "サンタアストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 19) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// エナジーコート
		// ----------------------------------------------------------------
		// SKILL_ID_ENERGY_COAT
		defineSkill(SKILL_ID_ENERGY_COAT, function() {

			this.name = "エナジーコート";
			this.kana = "エナシイコオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 - skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 300000;
				return nLifeTime;
			}
		}),

];
