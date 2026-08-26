/**
 * スキル定義 archer/2a-hunter（19 件 / SKILL_ID 105〜391 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ANKLESNARE, SKILL_ID_BEAST_BANE, SKILL_ID_BEAST_STRAIFING, SKILL_ID_BLAST_MINE, SKILL_ID_BLITZ_BEAT,
    SKILL_ID_CLAYMORE_TRAP, SKILL_ID_DETECTING, SKILL_ID_FALCON_MASTERY, SKILL_ID_FANTASMIC_ARROW, SKILL_ID_FLASHER,
    SKILL_ID_FREEZING_TRAP, SKILL_ID_LAND_MINE, SKILL_ID_REMOVE_TRAP, SKILL_ID_SANDMAN, SKILL_ID_SHOCKWAVE_TRAP,
    SKILL_ID_SKID_TRAP, SKILL_ID_SPRING_TRAP, SKILL_ID_STEEL_CROW, SKILL_ID_TALKIE_BOX
} from "../../skill.dat.js";

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
		// ビーストストレイフィング
		// ----------------------------------------------------------------
		// SKILL_ID_BEAST_STRAIFING
		defineSkill(SKILL_ID_BEAST_STRAIFING, function() {

			this.name = "ビーストストレイフィング";
			this.kana = "ヒイストストレイフインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 8 * charaDataManger.GetCharaStr();
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

];
