/**
 * スキル定義 thief/3a-assassin-cross（6 件 / SKILL_ID 262〜752 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_CANCEL_EDP_POISON_ATTACK, SKILL_ID_CREATE_DEADLY_POISON, SKILL_ID_ENCHANT_DEADLY_POISON,
    SKILL_ID_KATAR_KENKYU, SKILL_ID_METEOR_ASSALT, SKILL_ID_SOUL_BREAKER
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// カタール研究
		// ----------------------------------------------------------------
		// SKILL_ID_KATAR_KENKYU
		defineSkill(SKILL_ID_KATAR_KENKYU, function() {

			this.name = "カタール研究";
			this.kana = "カタアルケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ソウルブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_BREAKER
		defineSkill(SKILL_ID_SOUL_BREAKER, function() {

			this.name = "ソウルブレイカー";
			this.kana = "ソウルフレイカア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 300 + 50 * skillLv;

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メテオアサルト
		// ----------------------------------------------------------------
		// SKILL_ID_METEOR_ASSALT
		defineSkill(SKILL_ID_METEOR_ASSALT, function() {

			this.name = "メテオアサルト";
			this.kana = "メテオアサルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// クリエイトデッドリーポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_DEADLY_POISON
		defineSkill(SKILL_ID_CREATE_DEADLY_POISON, function() {

			this.name = "クリエイトデッドリーポイズン";
			this.kana = "クリエイトテツトリイホイスン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)エンチャントデッドリーポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_ENCHANT_DEADLY_POISON
		defineSkill(SKILL_ID_ENCHANT_DEADLY_POISON, function() {

			this.name = "(仮)エンチャントデッドリーポイズン";
			this.kana = "エンチヤントテツトリイホイスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// (特殊)EDP毒部分を消す[通常はoff]
		// ----------------------------------------------------------------
		// SKILL_ID_CANCEL_EDP_POISON_ATTACK
		defineSkill(SKILL_ID_CANCEL_EDP_POISON_ATTACK, function() {

			this.name = "(特殊)EDP毒部分を消す[通常はoff]";
			this.kana = "エンチヤントテツトリイホイスントクフフンヲケス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
