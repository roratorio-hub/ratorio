/**
 * スキル定義 swordman/3b-paladin（5 件 / SKILL_ID 283〜865 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_GOSPEL, SKILL_ID_PRESSURE, SKILL_ID_PRESSURE_MISS, SKILL_ID_SACRIFICE, SKILL_ID_SHIELD_CHAIN
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// プレッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_PRESSURE
		defineSkill(SKILL_ID_PRESSURE, function() {

			this.name = "プレッシャー";
			this.kana = "フレツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サクリファイス
		// ----------------------------------------------------------------
		// SKILL_ID_SACRIFICE
		defineSkill(SKILL_ID_SACRIFICE, function() {

			this.name = "サクリファイス";
			this.kana = "サクリファイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// ゴスペル
		// ----------------------------------------------------------------
		// SKILL_ID_GOSPEL
		defineSkill(SKILL_ID_GOSPEL, function() {

			this.name = "ゴスペル";
			this.kana = "コスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * Math.floor((skillLv - 1) / 5);
			}

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
		// プレッシャー（重複）
		// ----------------------------------------------------------------
		// SKILL_ID_PRESSURE_MISS
		defineSkill(SKILL_ID_PRESSURE_MISS, function() {

			this.name = "プレッシャー（重複）";
			this.kana = "フレツシヤアチヨウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		}),

];
