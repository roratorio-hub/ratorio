/**
 * スキル定義 10-transcend-taekwon（SKILL_ID 307–346 / 40 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    SKILL_ID_313, SKILL_ID_314, SKILL_ID_315, SKILL_ID_316, SKILL_ID_323, SKILL_ID_ACID_DEMONSTRATION,
    SKILL_ID_APUCHAORURIGI, SKILL_ID_APUCHAORURIGINO_KAMAE, SKILL_ID_ASHURA_HAOKEN, SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
    SKILL_ID_ATATAKAI_KAZE, SKILL_ID_CART_TERMINATION, SKILL_ID_CHARGE_ATTACK, SKILL_ID_DARK_STRIKE,
    SKILL_ID_FANTASMIC_ARROW, SKILL_ID_FEORICHAGI, SKILL_ID_FEORICHAGINO_KAMAE, SKILL_ID_FIGHT,
    SKILL_ID_GRAVITATION_FIELD, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_HEAVENS_DRIVE_FOR_CLONE, SKILL_ID_MARIAGE_STATUS,
    SKILL_ID_MEMORIZE, SKILL_ID_NERYOCHAGI, SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_NOPITIGI, SKILL_ID_NUKUMORI,
    SKILL_ID_NUKUMORI_KABE, SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_OVER_TRUST_MAX, SKILL_ID_RAKHO,
    SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SHIELD_CHAIN, SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER,
    SKILL_ID_SUPER_NOVICE_NODEAD_BONUS, SKILL_ID_TAEGWON_MISSION, SKILL_ID_TAEGWON_RANKER, SKILL_ID_TAIRIGI,
    SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_TORURYOCHAGI, SKILL_ID_TORURYOCHAGINO_KAMAE,
    SKILL_ID_WATER_BALL, SKILL_ID_WATER_BALL_FOR_CLONE
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// ファンタズミックアロー
		// ----------------------------------------------------------------
		// SKILL_ID_FANTASMIC_ARROW
		defineSkill(SKILL_ID_FANTASMIC_ARROW, function() {

			this.name = "ファンタズミックアロー";
			this.kana = "フアンタスミツクアロオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150;
			}

		}),

		// ----------------------------------------------------------------
		// チャージアタック
		// ----------------------------------------------------------------
		// SKILL_ID_CHARGE_ATTACK
		defineSkill(SKILL_ID_CHARGE_ATTACK, function() {

			this.name = "チャージアタック";
			this.kana = "チヤアシアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// 無死亡ボーナス
		// ----------------------------------------------------------------
		// SKILL_ID_SUPER_NOVICE_NODEAD_BONUS
		defineSkill(SKILL_ID_SUPER_NOVICE_NODEAD_BONUS, function() {

			this.name = "無死亡ボーナス";
			this.kana = "ムシホウホウナス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 結婚ステータス-1付与
		// ----------------------------------------------------------------
		// SKILL_ID_MARIAGE_STATUS
		defineSkill(SKILL_ID_MARIAGE_STATUS, function() {

			this.name = "結婚ステータス-1付与";
			this.kana = "ケツコンステエタスフヨ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 製作スキルマスター数(達人の斧用)
		// ----------------------------------------------------------------
		// SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER
		defineSkill(SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER, function() {

			this.name = "製作スキルマスター数(達人の斧用)";
			this.kana = "セイサクスキルマスタアスウタツシンノオノヨウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ダークストライク
		// ----------------------------------------------------------------
		// SKILL_ID_DARK_STRIKE
		defineSkill(SKILL_ID_DARK_STRIKE, function() {

			this.name = "ダークストライク";
			this.kana = "タアクストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

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
		// 予約313
		// ----------------------------------------------------------------
		// SKILL_ID_313
		defineSkill(SKILL_ID_313, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約314
		// ----------------------------------------------------------------
		// SKILL_ID_314
		defineSkill(SKILL_ID_314, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約315
		// ----------------------------------------------------------------
		// SKILL_ID_315
		defineSkill(SKILL_ID_315, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約316
		// ----------------------------------------------------------------
		// SKILL_ID_316
		defineSkill(SKILL_ID_316, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 温もり
		// ----------------------------------------------------------------
		// SKILL_ID_NUKUMORI
		defineSkill(SKILL_ID_NUKUMORI, function() {
			this.name = "温もり";
			this.kana = "ヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL | CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 温もり(壁押付)
		// ----------------------------------------------------------------
		// SKILL_ID_NUKUMORI_KABE
		defineSkill(SKILL_ID_NUKUMORI_KABE, function() {
			this.refId = SKILL_ID_NUKUMORI;
			this.name = "温もり(壁押付)";
			this.kana = "ヌクモリカヘオシツケ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ヘヴンズドライブ(盗作用Ex)
		// ----------------------------------------------------------------
		// SKILL_ID_HEAVENS_DRIVE_FOR_CLONE
		defineSkill(SKILL_ID_HEAVENS_DRIVE_FOR_CLONE, function() {

			this.refId = SKILL_ID_HEAVENS_DRIVE;
			this.name = "ヘヴンズドライブ(盗作用Ex)";
			this.kana = "ヘウンストライフトウサクヨウ";
			this.maxLv = 10;
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
		// ウォーターボール(盗作用Ex)
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_BALL_FOR_CLONE
		defineSkill(SKILL_ID_WATER_BALL_FOR_CLONE, function() {

			this.refId = SKILL_ID_WATER_BALL;
			this.name = "ウォーターボール(盗作用Ex)";
			this.kana = "ウオオタアホオルトウサクヨウ";
			this.maxLv = 10;
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
		// 阿修羅覇凰拳(MaxSP-1固定)
		// ----------------------------------------------------------------
		// SKILL_ID_ASHURA_HAOKEN_SPKOTEI
		defineSkill(SKILL_ID_ASHURA_HAOKEN_SPKOTEI, function() {

			this.refId = SKILL_ID_ASHURA_HAOKEN;
			this.name = "阿修羅覇凰拳(MaxSP-1固定)";
			this.kana = "アシユラハオウケンスヒリチユアルホイントコテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メモライズ(5回制限未計算)
		// ----------------------------------------------------------------
		// SKILL_ID_MEMORIZE
		defineSkill(SKILL_ID_MEMORIZE, function() {

			this.name = "メモライズ(5回制限未計算)";
			this.kana = "メモライス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 予約323
		// ----------------------------------------------------------------
		// SKILL_ID_323
		defineSkill(SKILL_ID_323, function() {

			this.name = "(現在この欄は未使用)";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// シールドチェーン
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHAIN
		defineSkill(SKILL_ID_SHIELD_CHAIN, function() {

			this.name = "(△)シールドチェーン";
			this.kana = "シイルトチエエン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
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
		// グラビテーションフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_GRAVITATION_FIELD
		defineSkill(SKILL_ID_GRAVITATION_FIELD, function() {
			this.name = "グラビテーションフィールド";
			this.kana = "クラヒテエシヨンフイイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// カートターミネーション
		// ----------------------------------------------------------------
		// SKILL_ID_CART_TERMINATION
		defineSkill(SKILL_ID_CART_TERMINATION, function() {

			this.name = "カートターミネーション";
			this.kana = "カアトタアミネエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// オーバートラストマックス
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_TRUST_MAX
		defineSkill(SKILL_ID_OVER_TRUST_MAX, function() {

			this.name = "オーバートラストマックス";
			this.kana = "オオハアトラストマツクス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)アシッドデモンストレーション
		// ----------------------------------------------------------------
		// SKILL_ID_ACID_DEMONSTRATION
		defineSkill(SKILL_ID_ACID_DEMONSTRATION, function() {

			this.name = "(仮)アシッドデモンストレーション";
			this.kana = "アシツトテモンストレエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// タイリギ(蹴威力UP)
		// ----------------------------------------------------------------
		// SKILL_ID_TAIRIGI
		defineSkill(SKILL_ID_TAIRIGI, function() {

			this.name = "タイリギ(蹴威力UP)";
			this.kana = "タイリキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv >= 7) ? 0 : (7000 - 1000 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// フェオリチャギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_FEORICHAGINO_KAMAE
		defineSkill(SKILL_ID_FEORICHAGINO_KAMAE, function() {

			this.name = "フェオリチャギの構え";
			this.kana = "フエオリチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// フェオリチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_FEORICHAGI
		defineSkill(SKILL_ID_FEORICHAGI, function() {

			this.name = "フェオリチャギ";
			this.kana = "フエオリチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 160 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ネリョチャギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_NERYOCHAGINO_KAMAE
		defineSkill(SKILL_ID_NERYOCHAGINO_KAMAE, function() {

			this.name = "ネリョチャギの構え";
			this.kana = "ネリヨチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// ネリョチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_NERYOCHAGI
		defineSkill(SKILL_ID_NERYOCHAGI, function() {

			this.name = "ネリョチャギ";
			this.kana = "ネリヨチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 160 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// トルリョチャギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_TORURYOCHAGINO_KAMAE
		defineSkill(SKILL_ID_TORURYOCHAGINO_KAMAE, function() {

			this.name = "トルリョチャギの構え";
			this.kana = "トルリヨチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// トルリョチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_TORURYOCHAGI
		defineSkill(SKILL_ID_TORURYOCHAGI, function() {

			this.name = "トルリョチャギ";
			this.kana = "トルリヨチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 190 + 30 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アプチャオルリギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_APUCHAORURIGINO_KAMAE
		defineSkill(SKILL_ID_APUCHAORURIGINO_KAMAE, function() {

			this.name = "アプチャオルリギの構え";
			this.kana = "アフチヤオルリキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// アプチャオルリギ
		// ----------------------------------------------------------------
		// SKILL_ID_APUCHAORURIGI
		defineSkill(SKILL_ID_APUCHAORURIGI, function() {

			this.name = "アプチャオルリギ";
			this.kana = "アフチヤオルリキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 190 + 30 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 落法(調整中)
		// ----------------------------------------------------------------
		// SKILL_ID_RAKHO
		defineSkill(SKILL_ID_RAKHO, function() {

			this.name = "落法(調整中)";
			this.kana = "ラクホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// ティオアプチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_TEIOAPUCHAGI
		defineSkill(SKILL_ID_TEIOAPUCHAGI, function() {

			this.name = "ティオアプチャギ";
			this.kana = "テイオアフチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 穏やかな休息
		// ----------------------------------------------------------------
		// SKILL_ID_ODAYAKANA_KYUSOKU
		defineSkill(SKILL_ID_ODAYAKANA_KYUSOKU, function() {

			this.name = "穏やかな休息";
			this.kana = "オタヤカナキユウソク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 楽しい休息
		// ----------------------------------------------------------------
		// SKILL_ID_TANOSHI_KYUSOKU
		defineSkill(SKILL_ID_TANOSHI_KYUSOKU, function() {

			this.name = "楽しい休息";
			this.kana = "タノシイキユウソク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイト
		// ----------------------------------------------------------------
		// SKILL_ID_FIGHT
		defineSkill(SKILL_ID_FIGHT, function() {

			this.name = "ファイト";
			this.kana = "フアイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ノピティギ
		// ----------------------------------------------------------------
		// SKILL_ID_NOPITIGI
		defineSkill(SKILL_ID_NOPITIGI, function() {

			this.name = "ノピティギ";
			this.kana = "ノヒテイキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// テコンミッション
		// ----------------------------------------------------------------
		// SKILL_ID_TAEGWON_MISSION
		defineSkill(SKILL_ID_TAEGWON_MISSION, function() {

			this.name = "テコンミッション";
			this.kana = "テコンミツシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// テコンランカー状態
		// ----------------------------------------------------------------
		// SKILL_ID_TAEGWON_RANKER
		defineSkill(SKILL_ID_TAEGWON_RANKER, function() {

			this.name = "テコンランカー状態";
			this.kana = "テコンランカアシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 暖かい風
		// ----------------------------------------------------------------
		// SKILL_ID_ATATAKAI_KAZE
		defineSkill(SKILL_ID_ATATAKAI_KAZE, function() {

			this.name = "暖かい風";
			this.kana = "アタタカイカセ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv <= 4) ? 20 : 50;
			}

		}),

];
