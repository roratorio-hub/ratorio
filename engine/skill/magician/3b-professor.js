/**
 * スキル定義 magician/3b-professor（9 件 / SKILL_ID 295〜873 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_DOUBLE_CASTING, SKILL_ID_LIFE_CONVERSION, SKILL_ID_MEMORIZE, SKILL_ID_MIND_BREAKER,
    SKILL_ID_SEIMEIRYOKU_HENKAN, SKILL_ID_SOUL_BURN, SKILL_ID_SOUL_CHANGE, SKILL_ID_SPIDER_WEB, SKILL_ID_WALL_OF_FOG
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ライフコンバージョン #未実装
		// ----------------------------------------------------------------
		// SKILL_ID_LIFE_CONVERSION
		defineSkill(SKILL_ID_LIFE_CONVERSION, function() {

			this.name = "ライフコンバージョン";
			this.kana = "ライフコンハアシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ソウルチェンジ
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_CHANGE
		defineSkill(SKILL_ID_SOUL_CHANGE, function() {

			this.name = "ソウルチェンジ";
			this.kana = "ソウルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルバーン
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_BURN
		defineSkill(SKILL_ID_SOUL_BURN, function() {

			this.name = "ソウルバーン";
			this.kana = "ソウルハアン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 15000 : 10000;
			}

		}),

		// ----------------------------------------------------------------
		// マインドブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_MIND_BREAKER
		defineSkill(SKILL_ID_MIND_BREAKER, function() {

			this.name = "マインドブレイカー";
			this.kana = "マイントフレイカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 3 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700 + 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メモライズ(5回制限未計算)
		// ----------------------------------------------------------------
		// SKILL_ID_MEMORIZE
		defineSkill(SKILL_ID_MEMORIZE, function() {

			this.name = "メモライズ(5回制限未計算)";
			this.kana = "メモライス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// ダブルキャスティング
		// ----------------------------------------------------------------
		// SKILL_ID_DOUBLE_CASTING
		defineSkill(SKILL_ID_DOUBLE_CASTING, function() {

			this.name = "ダブルキャスティング";
			this.kana = "タフルキヤステインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 90000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// 生命力変換
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEIRYOKU_HENKAN
		defineSkill(SKILL_ID_SEIMEIRYOKU_HENKAN, function() {

			this.name = "生命力変換";
			this.kana = "セイメイリヨクヘンカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スパイダーウェブ
		// ----------------------------------------------------------------
		// SKILL_ID_SPIDER_WEB
		defineSkill(SKILL_ID_SPIDER_WEB, function() {

			this.name = "スパイダーウェブ";
			this.kana = "スハイタアウエフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// ウォールオブフォグ
		// ----------------------------------------------------------------
		// SKILL_ID_WALL_OF_FOG
		defineSkill(SKILL_ID_WALL_OF_FOG, function() {

			this.name = "ウォールオブフォグ";
			this.kana = "ウオオルオフフオク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 20000;//デリュージ上では４０秒になるが、デリュージ上の場合は対応しない。
				return nLifeTime;
			}
		}),

];
