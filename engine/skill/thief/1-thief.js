/**
 * スキル定義 thief/1-thief（10 件 / SKILL_ID 13〜22 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_BACKSTEP, SKILL_ID_DOUBLE_ATTACK, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU, SKILL_ID_HIDING,
    SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL, SKILL_ID_SUNAMAKI
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ダブルアタック
		// ----------------------------------------------------------------
		// SKILL_ID_DOUBLE_ATTACK
		defineSkill(SKILL_ID_DOUBLE_ATTACK, function() {

			this.name = "ダブルアタック";
			this.kana = "タフルアタツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;


			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// 回避率増加
		// ----------------------------------------------------------------
		// SKILL_ID_KAIHIRITSU_ZOKA
		defineSkill(SKILL_ID_KAIHIRITSU_ZOKA, function() {

			this.name = "回避率増加";
			this.kana = "カイヒリツソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スティール
		// ----------------------------------------------------------------
		// SKILL_ID_STEAL
		defineSkill(SKILL_ID_STEAL, function() {

			this.name = "スティール";
			this.kana = "ステイイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// ハイディング
		// ----------------------------------------------------------------
		// SKILL_ID_HIDING
		defineSkill(SKILL_ID_HIDING, function() {

			this.name = "ハイディング";
			this.kana = "ハイテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// インベナム
		// ----------------------------------------------------------------
		// SKILL_ID_ENVENOM
		defineSkill(SKILL_ID_ENVENOM, function() {

			this.name = "インベナム";
			this.kana = "インヘナム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// 解毒
		// ----------------------------------------------------------------
		// SKILL_ID_GEDOKU
		defineSkill(SKILL_ID_GEDOKU, function() {

			this.name = "解毒";
			this.kana = "ケトク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// 砂まき
		// ----------------------------------------------------------------
		// SKILL_ID_SUNAMAKI
		defineSkill(SKILL_ID_SUNAMAKI, function() {

			this.name = "砂まき";
			this.kana = "スナマキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 130;
			}

		}),

		// ----------------------------------------------------------------
		// バックステップ
		// ----------------------------------------------------------------
		// SKILL_ID_BACKSTEP
		defineSkill(SKILL_ID_BACKSTEP, function() {

			this.name = "バックステップ";
			this.kana = "ハツクステツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7;
			}
		}),

		// ----------------------------------------------------------------
		// 石拾い
		// ----------------------------------------------------------------
		// SKILL_ID_ISHIHIROI
		defineSkill(SKILL_ID_ISHIHIROI, function() {

			this.name = "石拾い";
			this.kana = "イシヒロイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 石投げ
		// ----------------------------------------------------------------
		// SKILL_ID_ISHINAGE
		defineSkill(SKILL_ID_ISHINAGE, function() {

			this.name = "石投げ";
			this.kana = "イシナケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

];
