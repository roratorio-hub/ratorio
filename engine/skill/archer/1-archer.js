/**
 * スキル定義 archer/1-archer（7 件 / SKILL_ID 38〜44 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW, SKILL_ID_DOUBLE_STRAFING, SKILL_ID_FUKURONO_ME,
    SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_WASHINO_ME, SKILL_ID_YA_SAKUSEI
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ふくろうの目
		// ----------------------------------------------------------------
		// SKILL_ID_FUKURONO_ME
		defineSkill(SKILL_ID_FUKURONO_ME, function() {

			this.name = "ふくろうの目";
			this.kana = "フクロウノメ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ワシの目
		// ----------------------------------------------------------------
		// SKILL_ID_WASHINO_ME
		defineSkill(SKILL_ID_WASHINO_ME, function() {

			this.name = "ワシの目";
			this.kana = "ワシノメ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ダブルストレイフィング
		// ----------------------------------------------------------------
		// SKILL_ID_DOUBLE_STRAFING
		defineSkill(SKILL_ID_DOUBLE_STRAFING, function() {

			this.name = "ダブルストレイフィング";
			this.kana = "タフルストレイフインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 90 + 10 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// アローシャワー
		// ----------------------------------------------------------------
		// SKILL_ID_ARROW_SHOWER
		defineSkill(SKILL_ID_ARROW_SHOWER, function() {

			this.name = "アローシャワー";
			this.kana = "アロオシヤワア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150 + 10 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 集中力向上
		// ----------------------------------------------------------------
		// SKILL_ID_SHUCHURYOKU_KOZYO
		defineSkill(SKILL_ID_SHUCHURYOKU_KOZYO, function() {

			this.name = "集中力向上";
			this.kana = "シユウチユウリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// 矢作成
		// ----------------------------------------------------------------
		// SKILL_ID_YA_SAKUSEI
		defineSkill(SKILL_ID_YA_SAKUSEI, function() {

			this.name = "矢作成";
			this.kana = "ヤサクセイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// チャージアロー
		// ----------------------------------------------------------------
		// SKILL_ID_CHARGE_ARROW
		defineSkill(SKILL_ID_CHARGE_ARROW, function() {

			this.name = "チャージアロー";
			this.kana = "チヤアシアロオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

];
