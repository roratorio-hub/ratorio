/**
 * スキル定義 archer/4a-ranger（24 件 / SKILL_ID 495〜795 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../../mobconfplayer.js';
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_ARROW_STORM, SKILL_ID_AUTO_WUG, SKILL_ID_CAMOUFLAGE, SKILL_ID_CLUSTER_BOMB,
    SKILL_ID_COBALT_TRAP, SKILL_ID_DETONATOR, SKILL_ID_EIBINNA_KYUKAKU, SKILL_ID_ELECTRIC_SHOCKER,
    SKILL_ID_FEAR_BLEATH, SKILL_ID_FIRING_TRAP, SKILL_ID_ICEBOUND_TRAP, SKILL_ID_MAGENTA_TRAP, SKILL_ID_MAZE_TRAP,
    SKILL_ID_RANGER_MAIN, SKILL_ID_TOOTH_OF_WUG, SKILL_ID_TRAP_KENKYU, SKILL_ID_UNLIMIT, SKILL_ID_VERDURE_TRAP,
    SKILL_ID_WUG_BITE, SKILL_ID_WUG_DASH, SKILL_ID_WUG_MASTERY, SKILL_ID_WUG_RIDER, SKILL_ID_WUG_STRIKE
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// レンジャーメイン
		// ----------------------------------------------------------------
		// SKILL_ID_RANGER_MAIN
		defineSkill(SKILL_ID_RANGER_MAIN, function() {

			this.name = "レンジャーメイン";
			this.kana = "レンシヤアメイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カモフラージュ
		// ----------------------------------------------------------------
		// SKILL_ID_CAMOUFLAGE
		defineSkill(SKILL_ID_CAMOUFLAGE, function() {

			this.name = "カモフラージュ";
			this.kana = "カモフラアシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		}),

		// ----------------------------------------------------------------
		// エイムドボルト
		// ----------------------------------------------------------------
		// SKILL_ID_AIMED_BOLT
		defineSkill(SKILL_ID_AIMED_BOLT, function() {

			this.name = "エイムドボルト";
			this.kana = "エイムトホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (5500 - 400 * skillLv) : 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (1750 - 150 * skillLv) : 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (1500 - 100 * skillLv) : 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (750 - 50 * skillLv) : 500;
			}

		}),

		// ----------------------------------------------------------------
		// アローストーム
		// ----------------------------------------------------------------
		// SKILL_ID_ARROW_STORM
		defineSkill(SKILL_ID_ARROW_STORM, function() {

			this.name = "アローストーム";
			this.kana = "アロオストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 1000 + 80 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 7000 - 400 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// フィアーブリーズ
		// ----------------------------------------------------------------
		// SKILL_ID_FEAR_BLEATH
		defineSkill(SKILL_ID_FEAR_BLEATH, function() {

			this.name = "フィアーブリーズ";
			this.kana = "フイアアフリイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 90000, 120000, 150000, 180000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// トラップ研究
		// ----------------------------------------------------------------
		// SKILL_ID_TRAP_KENKYU
		defineSkill(SKILL_ID_TRAP_KENKYU, function() {

			this.name = "トラップ研究";
			this.kana = "トラツフケンキユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// マゼンタトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_MAGENTA_TRAP
		defineSkill(SKILL_ID_MAGENTA_TRAP, function() {

			this.name = "マゼンタトラップ";
			this.kana = "マセンタトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// コバルトトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_COBALT_TRAP
		defineSkill(SKILL_ID_COBALT_TRAP, function() {

			this.name = "コバルトトラップ";
			this.kana = "コハルトトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ヴェルデュールトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_VERDURE_TRAP
		defineSkill(SKILL_ID_VERDURE_TRAP, function() {

			this.name = "ヴェルデュールトラップ";
			this.kana = "ウエルテユウルトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// メイズトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_MAZE_TRAP
		defineSkill(SKILL_ID_MAZE_TRAP, function() {

			this.name = "メイズトラップ";
			this.kana = "メイストラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// クラスターボム
		// ----------------------------------------------------------------
		// SKILL_ID_CLUSTER_BOMB
		defineSkill(SKILL_ID_CLUSTER_BOMB, function() {

			this.name = "クラスターボム";
			this.kana = "クラスタアホム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 15000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// デトネイター
		// ----------------------------------------------------------------
		// SKILL_ID_DETONATOR
		defineSkill(SKILL_ID_DETONATOR, function() {

			this.name = "デトネイター";
			this.kana = "テトネイタア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアリングトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_FIRING_TRAP
		defineSkill(SKILL_ID_FIRING_TRAP, function() {

			this.name = "ファイアリングトラップ";
			this.kana = "フアイアリンクトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 15000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// アイスバウンドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_ICEBOUND_TRAP
		defineSkill(SKILL_ID_ICEBOUND_TRAP, function() {

			this.name = "アイスバウンドトラップ";
			this.kana = "アイフハウントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 15000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// エレクトリックショッカー
		// ----------------------------------------------------------------
		// SKILL_ID_ELECTRIC_SHOCKER
		defineSkill(SKILL_ID_ELECTRIC_SHOCKER, function() {

			this.name = "エレクトリックショッカー";
			this.kana = "エレクトリツクシヨツカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 15000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ウォーグマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_WUG_MASTERY
		defineSkill(SKILL_ID_WUG_MASTERY, function() {

			this.name = "ウォーグマスタリー";
			this.kana = "ウオオクマスタリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ウォーグバイト
		// ----------------------------------------------------------------
		// SKILL_ID_WUG_BITE
		defineSkill(SKILL_ID_WUG_BITE, function() {

			this.name = "ウォーグバイト";
			this.kana = "ウオオクハイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2500 + 500 * skillLv;

				}

				return 2000 + 2000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// トゥースオブウォーグ
		// ----------------------------------------------------------------
		// SKILL_ID_TOOTH_OF_WUG
		defineSkill(SKILL_ID_TOOTH_OF_WUG, function() {

			this.name = "トゥースオブウォーグ";
			this.kana = "トウウスオフウオオク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウォーグストライク
		// ----------------------------------------------------------------
		// SKILL_ID_WUG_STRIKE
		defineSkill(SKILL_ID_WUG_STRIKE, function() {

			this.name = "ウォーグストライク";
			this.kana = "ウオオクストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 250 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 鋭敏な嗅覚
		// ----------------------------------------------------------------
		// SKILL_ID_EIBINNA_KYUKAKU
		defineSkill(SKILL_ID_EIBINNA_KYUKAKU, function() {

			this.name = "鋭敏な嗅覚";
			this.kana = "エイヒンナキユウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 + 1000 * skillLv;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ウォーグライダー
		// ----------------------------------------------------------------
		// SKILL_ID_WUG_RIDER
		defineSkill(SKILL_ID_WUG_RIDER, function() {

			this.name = "ウォーグライダー";
			this.kana = "ウオオクライタア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ウォーグダッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_WUG_DASH
		defineSkill(SKILL_ID_WUG_DASH, function() {

			this.name = "ウォーグダッシュ";
			this.kana = "ウオオクタツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300;
			}

		}),

		// ----------------------------------------------------------------
		// 自動狼
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_WUG
		defineSkill(SKILL_ID_AUTO_WUG, function() {

			this.name = "自動狼";
			this.kana = "シトウオオカミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アンリミット
		// ----------------------------------------------------------------
		// SKILL_ID_UNLIMIT
		defineSkill(SKILL_ID_UNLIMIT, function() {

			this.name = "アンリミット";
			this.kana = "アンリミツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 * skillLv;

				}

				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				return 60000;
			}

		}),

];
