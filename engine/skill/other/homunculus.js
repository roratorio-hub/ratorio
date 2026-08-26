/**
 * スキル定義 other/homunculus（8 件 / SKILL_ID 815〜1289 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_DEFENCE, SKILL_ID_GOLDENE_TONE, SKILL_ID_GRANITIC_ARMOR, SKILL_ID_HOMLV_FOR_PYROCLASTIC,
    SKILL_ID_OVERED_BOOST, SKILL_ID_PAIN_KILLER, SKILL_ID_PYROCLASTIC, SKILL_ID_TEMPERING
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// SホムのLv(パイロ用)
		// ----------------------------------------------------------------
		// SKILL_ID_HOMLV_FOR_PYROCLASTIC
		defineSkill(SKILL_ID_HOMLV_FOR_PYROCLASTIC, function() {

			this.name = "SホムのLv(パイロ用)";
			this.kana = "エスホムノレヘル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// パイロクラスティック(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_PYROCLASTIC
		defineSkill(SKILL_ID_PYROCLASTIC, function() {

			this.name = "パイロクラスティック(Sホム)";
			this.kana = "ハイロクラステイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 8 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// オーバードブースト(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_OVERED_BOOST
		defineSkill(SKILL_ID_OVERED_BOOST, function() {

			this.name = "オーバードブースト(Sホム)";
			this.kana = "オオハアトフウスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)グラニティックアーマー(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_GRANITIC_ARMOR
		defineSkill(SKILL_ID_GRANITIC_ARMOR, function() {

			this.name = "(仮)グラニティックアーマー(Sホム)";
			this.kana = "クラニテイツクアアマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)ペインキラー(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_PAIN_KILLER
		defineSkill(SKILL_ID_PAIN_KILLER, function() {

			this.name = "(仮)ペインキラー(Sホム)";
			this.kana = "ヘインキラア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * Math.floor(skillLv / 2);
			}

		}),

		// ----------------------------------------------------------------
		// ディフェンス(ホム)
		// ----------------------------------------------------------------
		// SKILL_ID_DEFENCE
		defineSkill(SKILL_ID_DEFENCE, function() {

			this.name = "ディフェンス(ホム)";
			this.kana = "テイフエンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

		}),

		/** ゴールデントーン */
		// SKILL_ID_GOLDENE_TONE
		defineSkill(SKILL_ID_GOLDENE_TONE, function() {
			this.name = "ゴールデントーン";
			this.kana = "ゴールデントーン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 115 + 9 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 120 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (10 + 5 * skillLv) * 1000;
			}
		}),

		/** テンパリング */
		// SKILL_ID_TEMPERING
		defineSkill(SKILL_ID_TEMPERING, function() {
			this.name = "テンパリング";
			this.kana = "テンパリング";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 75 + 8 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (10 + 5 * skillLv) * 1000;
			}
		}),

];
