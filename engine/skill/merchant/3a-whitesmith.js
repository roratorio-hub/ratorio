/**
 * スキル定義 merchant/3a-whitesmith（5 件 / SKILL_ID 278〜864 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_BUKISEIREN, SKILL_ID_CART_BOOST_WS, SKILL_ID_CART_TERMINATION, SKILL_ID_MELTDOWN,
    SKILL_ID_OVER_TRUST_MAX
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// メルトダウン
		// ----------------------------------------------------------------
		// SKILL_ID_MELTDOWN
		defineSkill(SKILL_ID_MELTDOWN, function() {

			this.name = "メルトダウン";
			this.kana = "メルトタウン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// カートブースト
		// ----------------------------------------------------------------
		// SKILL_ID_CART_BOOST_WS
		defineSkill(SKILL_ID_CART_BOOST_WS, function() {

			this.name = "カートブースト";
			this.kana = "カアトフウスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// カートターミネーション
		// ----------------------------------------------------------------
		// SKILL_ID_CART_TERMINATION
		defineSkill(SKILL_ID_CART_TERMINATION, function() {

			this.name = "カートターミネーション";
			this.kana = "カアトタアミネエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// オーバートラストマックス
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_TRUST_MAX
		defineSkill(SKILL_ID_OVER_TRUST_MAX, function() {

			this.name = "オーバートラストマックス";
			this.kana = "オオハアトラストマツクス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// 武器精錬
		// ----------------------------------------------------------------
		// SKILL_ID_BUKISEIREN
		defineSkill(SKILL_ID_BUKISEIREN, function() {

			this.name = "武器精錬";
			this.kana = "フキセイレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

];
