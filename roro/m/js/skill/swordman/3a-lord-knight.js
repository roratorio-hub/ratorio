/**
 * スキル定義 swordman/3a-lord-knight（8 件 / SKILL_ID 254〜261 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_AURA_BLADE, SKILL_ID_BERSERK, SKILL_ID_CONCENTRATION, SKILL_ID_HEAD_CRUSH, SKILL_ID_JOINT_BEAT,
    SKILL_ID_PARIYING, SKILL_ID_SPIRAL_PIERCE, SKILL_ID_TENTION_RELAX
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// オーラブレイド
		// ----------------------------------------------------------------
		// SKILL_ID_AURA_BLADE
		defineSkill(SKILL_ID_AURA_BLADE, function() {

			this.name = "オーラブレイド";
			this.kana = "オオラフレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// パリイング
		// ----------------------------------------------------------------
		// SKILL_ID_PARIYING
		defineSkill(SKILL_ID_PARIYING, function() {

			this.name = "パリイング";
			this.kana = "ハリインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

		// ----------------------------------------------------------------
		// コンセントレイション
		// ----------------------------------------------------------------
		// SKILL_ID_CONCENTRATION
		defineSkill(SKILL_ID_CONCENTRATION, function() {

			this.name = "コンセントレイション";
			this.kana = "コンセントレイシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// テンションリラックス
		// ----------------------------------------------------------------
		// SKILL_ID_TENTION_RELAX
		defineSkill(SKILL_ID_TENTION_RELAX, function() {

			this.name = "テンションリラックス";
			this.kana = "テンシヨンリラツクス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// バーサーク
		// ----------------------------------------------------------------
		// SKILL_ID_BERSERK
		defineSkill(SKILL_ID_BERSERK, function() {

			this.name = "バーサーク";
			this.kana = "ハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// スパイラルピアース
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_PIERCE
		defineSkill(SKILL_ID_SPIRAL_PIERCE, function() {
			this.name = "スパイラルピアース";
			this.kana = "スハイラルヒアアス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 0;
				ratio += 100 + 50 * skillLv;
				// チャージングピアースがONの時、与えるダメージ + 100% x スキルレベル
				ratio = ratio * (1 + option.GetOptionValue(0));
				return ratio;
			}
			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? (1000) : (100 + 200 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ヘッドクラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_HEAD_CRUSH
		defineSkill(SKILL_ID_HEAD_CRUSH, function() {

			this.name = "ヘッドクラッシュ";
			this.kana = "ヘツトクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 23;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ジョイントビート
		// ----------------------------------------------------------------
		// SKILL_ID_JOINT_BEAT
		defineSkill(SKILL_ID_JOINT_BEAT, function() {

			this.name = "ジョイントビート";
			this.kana = "シヨイントヒイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * Math.floor((skillLv + 1) / 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

		}),

];
