/**
 * スキル定義 archer/3a-sniper（4 件 / SKILL_ID 270〜273 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_FALCON_ASSALT, SKILL_ID_SHARP_SHOOTING, SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// トゥルーサイト
		// ----------------------------------------------------------------
		// SKILL_ID_TRUE_SIGHT
		defineSkill(SKILL_ID_TRUE_SIGHT, function() {

			this.name = "トゥルーサイト";
			this.kana = "トウルウサイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 2);
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 30000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ファルコンアサルト
		// ----------------------------------------------------------------
		// SKILL_ID_FALCON_ASSALT
		defineSkill(SKILL_ID_FALCON_ASSALT, function() {

			this.name = "ファルコンアサルト";
			this.kana = "フアルコンアサルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// シャープシューティング
		// ----------------------------------------------------------------
		// SKILL_ID_SHARP_SHOOTING
		defineSkill(SKILL_ID_SHARP_SHOOTING, function() {

			this.name = "シャープシューティング";
			this.kana = "シヤアフシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// ウィンドウォーク
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_WALK
		defineSkill(SKILL_ID_WIND_WALK, function() {

			this.name = "ウィンドウォーク";
			this.kana = "ウイントウオオク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1600 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 130000, 160000, 190000, 220000, 250000, 280000, 310000, 340000, 370000, 400000])[skillLv];
				return nLifeTime;
			}
		}),

];
