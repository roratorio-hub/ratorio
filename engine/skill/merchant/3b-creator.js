/**
 * スキル定義 merchant/3b-creator（4 件 / SKILL_ID 328〜876 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_FULL_CHEMICAL_CHARGE, SKILL_ID_SHOKUBUTSU_SAIBAI,
    SKILL_ID_SLIMPOTION_PITCHER
} from "../../skill.dat.js";

export const skills = [
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
		// スリムポーションピッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_SLIMPOTION_PITCHER
		defineSkill(SKILL_ID_SLIMPOTION_PITCHER, function() {

			this.name = "スリムポーションピッチャー";
			this.kana = "スリムホオシヨンヒツチヤア";
			this.maxLv = 10;
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
		// フルケミカルチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_CHEMICAL_CHARGE
		defineSkill(SKILL_ID_FULL_CHEMICAL_CHARGE, function() {

			this.name = "フルケミカルチャージ";
			this.kana = "フルケミカルチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 植物栽培
		// ----------------------------------------------------------------
		// SKILL_ID_SHOKUBUTSU_SAIBAI
		defineSkill(SKILL_ID_SHOKUBUTSU_SAIBAI, function() {

			this.name = "植物栽培";
			this.kana = "シヨクフツサイハイ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

];
