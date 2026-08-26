/**
 * スキル定義 acolyte/3a-high-priest（4 件 / SKILL_ID 267〜757 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ASSUMPTIO, SKILL_ID_BASILICA, SKILL_ID_MANA_RECHARGE, SKILL_ID_MEDITATIO
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// アスムプティオ
		// ----------------------------------------------------------------
		// SKILL_ID_ASSUMPTIO
		defineSkill(SKILL_ID_ASSUMPTIO, function() {

			this.name = "アスムプティオ";
			this.kana = "アスムフテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// バジリカ
		// ----------------------------------------------------------------
		// SKILL_ID_BASILICA
		defineSkill(SKILL_ID_BASILICA, function() {

			this.name = "バジリカ";
			this.kana = "ハシリカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 + 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メディタティオ
		// ----------------------------------------------------------------
		// SKILL_ID_MEDITATIO
		defineSkill(SKILL_ID_MEDITATIO, function() {

			this.name = "メディタティオ";
			this.kana = "メテイタテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// マナリチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_MANA_RECHARGE
		defineSkill(SKILL_ID_MANA_RECHARGE, function() {

			this.name = "マナリチャージ";
			this.kana = "マナリチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
