/**
 * スキル定義 magician/2b-sage（23 件 / SKILL_ID 224〜858 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ABRACADABRA, SKILL_ID_ADVANCED_BOOK, SKILL_ID_AUTO_MAGICIAN_SPELL, SKILL_ID_CAST_CANCEL,
    SKILL_ID_CREATE_CONVERTER, SKILL_ID_DELUGE, SKILL_ID_DISPELL, SKILL_ID_DRAGONOLOGY,
    SKILL_ID_EARTH_ELEMENTAL_CHANGE, SKILL_ID_FIRE_ELEMENTAL_CHANGE, SKILL_ID_FLAME_LAUNCHER, SKILL_ID_FREE_CAST,
    SKILL_ID_FROST_WEAPON, SKILL_ID_LAND_PROTECTOR, SKILL_ID_LIGHTNING_LOADER, SKILL_ID_MAGIC_ROD,
    SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, SKILL_ID_SEISMIC_WEAPON, SKILL_ID_SPELL_BREAKER, SKILL_ID_VIOLENT_GALE,
    SKILL_ID_VOLCANO, SKILL_ID_WATER_ELEMENTAL_CHANGE, SKILL_ID_WIND_ELEMENTAL_CHANGE
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// アドバンスドブック
		// ----------------------------------------------------------------
		// SKILL_ID_ADVANCED_BOOK
		defineSkill(SKILL_ID_ADVANCED_BOOK, function() {

			this.name = "アドバンスドブック";
			this.kana = "アトハンストフツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// キャストキャンセル
		// ----------------------------------------------------------------
		// SKILL_ID_CAST_CANCEL
		defineSkill(SKILL_ID_CAST_CANCEL, function() {

			this.name = "キャストキャンセル";
			this.kana = "キヤストキヤンセル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// マジックロッド
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_ROD
		defineSkill(SKILL_ID_MAGIC_ROD, function() {

			this.name = "マジックロッド";
			this.kana = "マシツクロツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 400, 600, 800, 1000, 1200])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// スペルブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_SPELL_BREAKER
		defineSkill(SKILL_ID_SPELL_BREAKER, function() {

			this.name = "スペルブレイカー";
			this.kana = "スヘルフレイカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// フリーキャスト
		// ----------------------------------------------------------------
		// SKILL_ID_FREE_CAST
		defineSkill(SKILL_ID_FREE_CAST, function() {

			this.name = "フリーキャスト";
			this.kana = "フリイキヤスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オートマジシャンスペル
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_MAGICIAN_SPELL
		defineSkill(SKILL_ID_AUTO_MAGICIAN_SPELL, function() {

			this.name = "(仮)オートマジシャンスペル";
			this.kana = "オオトスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 120000, 150000, 180000, 210000, 240000, 270000, 300000, 330000, 360000, 390000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// フレイムランチャー
		// ----------------------------------------------------------------
		// SKILL_ID_FLAME_LAUNCHER
		defineSkill(SKILL_ID_FLAME_LAUNCHER, function() {

			this.name = "フレイムランチャー";
			this.kana = "フレイムランチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// フロストウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_FROST_WEAPON
		defineSkill(SKILL_ID_FROST_WEAPON, function() {

			this.name = "フロストウェポン";
			this.kana = "フロストウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ライトニングローダー
		// ----------------------------------------------------------------
		// SKILL_ID_LIGHTNING_LOADER
		defineSkill(SKILL_ID_LIGHTNING_LOADER, function() {

			this.name = "ライトニングローダー";
			this.kana = "ライトニンクロオタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サイズミックウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_SEISMIC_WEAPON
		defineSkill(SKILL_ID_SEISMIC_WEAPON, function() {

			this.name = "サイズミックウェポン";
			this.kana = "サイスミツクウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ドラゴノロジー
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGONOLOGY
		defineSkill(SKILL_ID_DRAGONOLOGY, function() {

			this.name = "ドラゴノロジー";
			this.kana = "トラコノロシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ボルケーノ
		// ----------------------------------------------------------------
		// SKILL_ID_VOLCANO
		defineSkill(SKILL_ID_VOLCANO, function() {

			this.name = "ボルケーノ";
			this.kana = "ホルケエノ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 120000, 180000, 240000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// デリュージ
		// ----------------------------------------------------------------
		// SKILL_ID_DELUGE
		defineSkill(SKILL_ID_DELUGE, function() {

			this.name = "デリュージ";
			this.kana = "テリユウシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 120000, 180000, 240000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// バイオレントゲイル
		// ----------------------------------------------------------------
		// SKILL_ID_VIOLENT_GALE
		defineSkill(SKILL_ID_VIOLENT_GALE, function() {

			this.name = "バイオレントゲイル";
			this.kana = "ハイオレントケイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 120000, 180000, 240000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ランドプロテクター
		// ----------------------------------------------------------------
		// SKILL_ID_LAND_PROTECTOR
		defineSkill(SKILL_ID_LAND_PROTECTOR, function() {

			this.name = "ランドプロテクター";
			this.kana = "ラントフロテクタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 - 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 120000, 165000, 210000, 255000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ディスペル
		// ----------------------------------------------------------------
		// SKILL_ID_DISPELL
		defineSkill(SKILL_ID_DISPELL, function() {

			this.name = "ディスペル";
			this.kana = "テイスヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// アブラカタブラ
		// ----------------------------------------------------------------
		// SKILL_ID_ABRACADABRA
		defineSkill(SKILL_ID_ABRACADABRA, function() {

			this.name = "アブラカタブラ";
			this.kana = "アフラカタフラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

		// ----------------------------------------------------------------
		// AS用設定魔法
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL
		defineSkill(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, function() {

			this.name = "AS用設定魔法";
			this.kana = "オウトスヘルヨウセツテイマホウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// クリエイトコンバータ
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_CONVERTER
		defineSkill(SKILL_ID_CREATE_CONVERTER, function() {

			this.name = "クリエイトコンバータ";
			this.kana = "クリエイトコンハアタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアーエレメンタルチェンジ
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_ELEMENTAL_CHANGE
		defineSkill(SKILL_ID_FIRE_ELEMENTAL_CHANGE, function() {

			this.name = "ファイアーエレメンタルチェンジ";
			this.kana = "フアイアアエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ウォーターエレメンタルチェンジ
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_ELEMENTAL_CHANGE
		defineSkill(SKILL_ID_WATER_ELEMENTAL_CHANGE, function() {

			this.name = "ウォーターエレメンタルチェンジ";
			this.kana = "ウオオタアエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ウィンドエレメンタルチェンジ
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_ELEMENTAL_CHANGE
		defineSkill(SKILL_ID_WIND_ELEMENTAL_CHANGE, function() {

			this.name = "ウィンドエレメンタルチェンジ";
			this.kana = "ウイントエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アースエレメンタルチェンジ
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_ELEMENTAL_CHANGE
		defineSkill(SKILL_ID_EARTH_ELEMENTAL_CHANGE, function() {

			this.name = "アースエレメンタルチェンジ";
			this.kana = "アアスエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

];
