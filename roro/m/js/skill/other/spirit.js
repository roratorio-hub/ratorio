/**
 * スキル定義 other/spirit（36 件 / SKILL_ID 684〜719 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_AQUA_PLAY, SKILL_ID_BLAST, SKILL_ID_CHILLY_AIR, SKILL_ID_CIRCLE_OF_FIRE, SKILL_ID_COOLER,
    SKILL_ID_CURSED_SOIL, SKILL_ID_FIRE_ARROW, SKILL_ID_FIRE_BOMB, SKILL_ID_FIRE_CLOAK, SKILL_ID_FIRE_MANTLE,
    SKILL_ID_FIRE_WAVE, SKILL_ID_GAST, SKILL_ID_HEATER, SKILL_ID_HURRICANE_RAGE, SKILL_ID_ICE_NEEDLE,
    SKILL_ID_PETROLOGY, SKILL_ID_PILO_TECHNIC, SKILL_ID_POWER_OF_GAIA, SKILL_ID_ROCK_CRUSHER, SKILL_ID_SOLID_SKIN,
    SKILL_ID_STONE_HUMMER, SKILL_ID_STONE_RAIN, SKILL_ID_STONE_SHIELD, SKILL_ID_TAIDAL_WEAPON,
    SKILL_ID_TAYPHOON_MISSILE, SKILL_ID_TOROPIC, SKILL_ID_UP_HIEBAL, SKILL_ID_WATER_BARRIER, SKILL_ID_WATER_DROP,
    SKILL_ID_WATER_SCREEN, SKILL_ID_WATER_SCREW, SKILL_ID_WILD_STORM, SKILL_ID_WIND_CURTAIN, SKILL_ID_WIND_SLASH,
    SKILL_ID_WIND_STEP, SKILL_ID_XEPHER
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// パイロテクニック
		// ----------------------------------------------------------------
		// SKILL_ID_PILO_TECHNIC
		defineSkill(SKILL_ID_PILO_TECHNIC, function() {

			this.name = "パイロテクニック";
			this.kana = "ハイロテクニツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// サークルオブファイアー
		// ----------------------------------------------------------------
		// SKILL_ID_CIRCLE_OF_FIRE
		defineSkill(SKILL_ID_CIRCLE_OF_FIRE, function() {

			this.name = "サークルオブファイアー";
			this.kana = "サアクルオフフアイアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイアーアロー
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_ARROW
		defineSkill(SKILL_ID_FIRE_ARROW, function() {

			this.name = "ファイアーアロー";
			this.kana = "フアイアアアロオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヒーター
		// ----------------------------------------------------------------
		// SKILL_ID_HEATER
		defineSkill(SKILL_ID_HEATER, function() {

			this.name = "ヒーター";
			this.kana = "ヒイタア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイアークローク
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_CLOAK
		defineSkill(SKILL_ID_FIRE_CLOAK, function() {

			this.name = "ファイアークローク";
			this.kana = "フアイアアクロオク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイアーボム
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_BOMB
		defineSkill(SKILL_ID_FIRE_BOMB, function() {

			this.name = "ファイアーボム";
			this.kana = "フアイアアホム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// トロピック
		// ----------------------------------------------------------------
		// SKILL_ID_TOROPIC
		defineSkill(SKILL_ID_TOROPIC, function() {

			this.name = "トロピック";
			this.kana = "トロヒツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイアーマントル
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_MANTLE
		defineSkill(SKILL_ID_FIRE_MANTLE, function() {

			this.name = "ファイアーマントル";
			this.kana = "フアイアアマントル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイアーウェーブ
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_WAVE
		defineSkill(SKILL_ID_FIRE_WAVE, function() {

			this.name = "ファイアーウェーブ";
			this.kana = "フアイアアウエエフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アクアプレイ
		// ----------------------------------------------------------------
		// SKILL_ID_AQUA_PLAY
		defineSkill(SKILL_ID_AQUA_PLAY, function() {

			this.name = "アクアプレイ";
			this.kana = "アクアフレイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウォータースクリーン
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_SCREEN
		defineSkill(SKILL_ID_WATER_SCREEN, function() {

			this.name = "ウォータースクリーン";
			this.kana = "ウオオタアスクリイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アイスニードル
		// ----------------------------------------------------------------
		// SKILL_ID_ICE_NEEDLE
		defineSkill(SKILL_ID_ICE_NEEDLE, function() {

			this.name = "アイスニードル";
			this.kana = "アイスニイトル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// クーラー
		// ----------------------------------------------------------------
		// SKILL_ID_COOLER
		defineSkill(SKILL_ID_COOLER, function() {

			this.name = "クーラー";
			this.kana = "クウラア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウォータードロップ
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_DROP
		defineSkill(SKILL_ID_WATER_DROP, function() {

			this.name = "ウォータードロップ";
			this.kana = "ウオオタアトロツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウォータースクリュー
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_SCREW
		defineSkill(SKILL_ID_WATER_SCREW, function() {

			this.name = "ウォータースクリュー";
			this.kana = "ウオオタアスクリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// チリエア
		// ----------------------------------------------------------------
		// SKILL_ID_CHILLY_AIR
		defineSkill(SKILL_ID_CHILLY_AIR, function() {

			this.name = "チリエア";
			this.kana = "チリエア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウォーターバリア
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_BARRIER
		defineSkill(SKILL_ID_WATER_BARRIER, function() {

			this.name = "ウォーターバリア";
			this.kana = "ウオオタアハリア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// タイダルウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_TAIDAL_WEAPON
		defineSkill(SKILL_ID_TAIDAL_WEAPON, function() {

			this.name = "タイダルウェポン";
			this.kana = "タイタルウエホン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ガスト
		// ----------------------------------------------------------------
		// SKILL_ID_GAST
		defineSkill(SKILL_ID_GAST, function() {

			this.name = "ガスト";
			this.kana = "カスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウィンドステップ
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_STEP
		defineSkill(SKILL_ID_WIND_STEP, function() {

			this.name = "ウィンドステップ";
			this.kana = "ウイントステツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウィンドスラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_SLASH
		defineSkill(SKILL_ID_WIND_SLASH, function() {

			this.name = "ウィンドスラッシュ";
			this.kana = "ウイントスラツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ブラスト
		// ----------------------------------------------------------------
		// SKILL_ID_BLAST
		defineSkill(SKILL_ID_BLAST, function() {

			this.name = "ブラスト";
			this.kana = "フラスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウィンドカーテン
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_CURTAIN
		defineSkill(SKILL_ID_WIND_CURTAIN, function() {

			this.name = "ウィンドカーテン";
			this.kana = "ウイントカアテン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ハリケーンレイジ
		// ----------------------------------------------------------------
		// SKILL_ID_HURRICANE_RAGE
		defineSkill(SKILL_ID_HURRICANE_RAGE, function() {

			this.name = "ハリケーンレイジ";
			this.kana = "ハリケエンレイシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ワイルドストーム
		// ----------------------------------------------------------------
		// SKILL_ID_WILD_STORM
		defineSkill(SKILL_ID_WILD_STORM, function() {

			this.name = "ワイルドストーム";
			this.kana = "ワイルトストオム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ゼファー
		// ----------------------------------------------------------------
		// SKILL_ID_XEPHER
		defineSkill(SKILL_ID_XEPHER, function() {

			this.name = "ゼファー";
			this.kana = "セフアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// タイフーンミサイル
		// ----------------------------------------------------------------
		// SKILL_ID_TAYPHOON_MISSILE
		defineSkill(SKILL_ID_TAYPHOON_MISSILE, function() {

			this.name = "タイフーンミサイル";
			this.kana = "タイフウンミサイル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ペトロロジー
		// ----------------------------------------------------------------
		// SKILL_ID_PETROLOGY
		defineSkill(SKILL_ID_PETROLOGY, function() {

			this.name = "ペトロロジー";
			this.kana = "ヘトロロシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ソリッドスキン
		// ----------------------------------------------------------------
		// SKILL_ID_SOLID_SKIN
		defineSkill(SKILL_ID_SOLID_SKIN, function() {

			this.name = "ソリッドスキン";
			this.kana = "ソリツトスキン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ストーンハンマー
		// ----------------------------------------------------------------
		// SKILL_ID_STONE_HUMMER
		defineSkill(SKILL_ID_STONE_HUMMER, function() {

			this.name = "ストーンハンマー";
			this.kana = "ストオンハンマア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カーズドソイル
		// ----------------------------------------------------------------
		// SKILL_ID_CURSED_SOIL
		defineSkill(SKILL_ID_CURSED_SOIL, function() {

			this.name = "カーズドソイル";
			this.kana = "カアストソイル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ストーンシールド
		// ----------------------------------------------------------------
		// SKILL_ID_STONE_SHIELD
		defineSkill(SKILL_ID_STONE_SHIELD, function() {

			this.name = "ストーンシールド";
			this.kana = "ストオンシイルト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ロッククラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_ROCK_CRUSHER
		defineSkill(SKILL_ID_ROCK_CRUSHER, function() {

			this.name = "ロッククラッシャー";
			this.kana = "ロツククラツシヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アップヒーバル
		// ----------------------------------------------------------------
		// SKILL_ID_UP_HIEBAL
		defineSkill(SKILL_ID_UP_HIEBAL, function() {

			this.name = "アップヒーバル";
			this.kana = "アツフヒイハル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// パワーオブガイア
		// ----------------------------------------------------------------
		// SKILL_ID_POWER_OF_GAIA
		defineSkill(SKILL_ID_POWER_OF_GAIA, function() {

			this.name = "パワーオブガイア";
			this.kana = "ハワアオフカイア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ストーンレイン
		// ----------------------------------------------------------------
		// SKILL_ID_STONE_RAIN
		defineSkill(SKILL_ID_STONE_RAIN, function() {

			this.name = "ストーンレイン";
			this.kana = "ストオンレイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
