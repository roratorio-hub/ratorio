/**
 * スキル定義 thief/2b-rogue（20 件 / SKILL_ID 167〜898 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../../mobconfplayer.js';
import {
    SKILL_ID_BACK_STAB, SKILL_ID_CLEANER, SKILL_ID_CLONE_SKILL, SKILL_ID_CLOSE_CONFINE, SKILL_ID_COMPULSION_DISCOUNT,
    SKILL_ID_FLAG_GRAPHITY, SKILL_ID_GANGSTAR_PARADISE, SKILL_ID_GRAPHITY, SKILL_ID_HEAVENS_DRIVE,
    SKILL_ID_HEAVENS_DRIVE_FOR_CLONE, SKILL_ID_INTIMIDATE, SKILL_ID_INTIMIDATE_FOR_CLONE,
    SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN, SKILL_ID_STRIP_ARMER, SKILL_ID_STRIP_HELM,
    SKILL_ID_STRIP_SHIELD, SKILL_ID_STRIP_WEAPON, SKILL_ID_SURPRISE_ATTACK, SKILL_ID_TUNNEL_DRIVE,
    SKILL_ID_WATER_BALL, SKILL_ID_WATER_BALL_FOR_CLONE
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// スナッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_SNATCHER
		defineSkill(SKILL_ID_SNATCHER, function() {

			this.name = "スナッチャー";
			this.kana = "スナツチヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スティールコイン
		// ----------------------------------------------------------------
		// SKILL_ID_STEAL_COIN
		defineSkill(SKILL_ID_STEAL_COIN, function() {

			this.name = "スティールコイン";
			this.kana = "ステイイルコイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// バックスタブ
		// ----------------------------------------------------------------
		// SKILL_ID_BACK_STAB
		defineSkill(SKILL_ID_BACK_STAB, function() {

			this.name = "バックスタブ";
			this.kana = "ハツクスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// トンネルドライブ
		// ----------------------------------------------------------------
		// SKILL_ID_TUNNEL_DRIVE
		defineSkill(SKILL_ID_TUNNEL_DRIVE, function() {

			this.name = "トンネルドライブ";
			this.kana = "トンネルトライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// サプライズアタック
		// ----------------------------------------------------------------
		// SKILL_ID_SURPRISE_ATTACK
		defineSkill(SKILL_ID_SURPRISE_ATTACK, function() {

			this.name = "サプライズアタック";
			this.kana = "サフライスアタツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 80 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_WEAPON
		defineSkill(SKILL_ID_STRIP_WEAPON, function() {

			this.name = "ストリップウェポン";
			this.kana = "ストリツフウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

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
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップシールド
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_SHIELD
		defineSkill(SKILL_ID_STRIP_SHIELD, function() {

			this.name = "ストリップシールド";
			this.kana = "ストリツフシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

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
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップアーマー
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_ARMER
		defineSkill(SKILL_ID_STRIP_ARMER, function() {

			this.name = "ストリップアーマー";
			this.kana = "ストリツフアアマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

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
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップヘルム
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_HELM
		defineSkill(SKILL_ID_STRIP_HELM, function() {

			this.name = "ストリップヘルム";
			this.kana = "ストリツフヘルム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

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
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// インティミデイト
		// ----------------------------------------------------------------
		// SKILL_ID_INTIMIDATE
		defineSkill(SKILL_ID_INTIMIDATE, function() {

			this.name = "インティミデイト";
			this.kana = "インテイミテイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// グラフィティ
		// ----------------------------------------------------------------
		// SKILL_ID_GRAPHITY
		defineSkill(SKILL_ID_GRAPHITY, function() {

			this.name = "グラフィティ";
			this.kana = "クラフイテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// フラッググラフィティ
		// ----------------------------------------------------------------
		// SKILL_ID_FLAG_GRAPHITY
		defineSkill(SKILL_ID_FLAG_GRAPHITY, function() {

			this.name = "フラッググラフィティ";
			this.kana = "フラツククラフイテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// クリーナー
		// ----------------------------------------------------------------
		// SKILL_ID_CLEANER
		defineSkill(SKILL_ID_CLEANER, function() {

			this.name = "クリーナー";
			this.kana = "クリイナア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ギャングスターパラダイス
		// ----------------------------------------------------------------
		// SKILL_ID_GANGSTAR_PARADISE
		defineSkill(SKILL_ID_GANGSTAR_PARADISE, function() {

			this.name = "ギャングスターパラダイス";
			this.kana = "キヤンクスタアハラタイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// コンパルションディスカウント
		// ----------------------------------------------------------------
		// SKILL_ID_COMPULSION_DISCOUNT
		defineSkill(SKILL_ID_COMPULSION_DISCOUNT, function() {

			this.name = "コンパルションディスカウント";
			this.kana = "コンハルシヨンテイスカウント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// クローンスキル
		// ----------------------------------------------------------------
		// SKILL_ID_CLONE_SKILL
		defineSkill(SKILL_ID_CLONE_SKILL, function() {

			this.name = "クローンスキル";
			this.kana = "クロオンスキル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
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
		// クローズコンファイン
		// ----------------------------------------------------------------
		// SKILL_ID_CLOSE_CONFINE
		defineSkill(SKILL_ID_CLOSE_CONFINE, function() {

			this.name = "クローズコンファイン";
			this.kana = "クロオスコンフアイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

		}),

		// ----------------------------------------------------------------
		// インティミデイト(盗作用Ex)
		// ----------------------------------------------------------------
		// SKILL_ID_INTIMIDATE_FOR_CLONE
		defineSkill(SKILL_ID_INTIMIDATE_FOR_CLONE, function() {

			this.refId = SKILL_ID_INTIMIDATE;
			this.name = "インティミデイト(盗作用Ex)";
			this.kana = "インテイミテイトトウサクヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

];
