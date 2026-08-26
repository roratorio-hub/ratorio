/**
 * スキル定義 novice/1-super-novice（6 件 / SKILL_ID 1〜946 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_BAKURETSU_HADO, SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, SKILL_ID_BREAK_THROUGH,
    SKILL_ID_SUPER_NOVICE_NODEAD_BONUS, SKILL_ID_TENSHISAMA_TASUKETE, SKILL_ID_TRANSCENDENCE
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 爆裂波動(Sノビ)
		// ----------------------------------------------------------------
		// SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE
		defineSkill(SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, function() {

			this.refId = SKILL_ID_BAKURETSU_HADO;
			this.name = "爆裂波動(Sノビ)";
			this.kana = "ハクレツハトウスウハアノオヒス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// 無死亡ボーナス
		// ----------------------------------------------------------------
		// SKILL_ID_SUPER_NOVICE_NODEAD_BONUS
		defineSkill(SKILL_ID_SUPER_NOVICE_NODEAD_BONUS, function() {

			this.name = "無死亡ボーナス";
			this.kana = "ムシホウホウナス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ブレイクスルー
		// ----------------------------------------------------------------
		// SKILL_ID_BREAK_THROUGH
		defineSkill(SKILL_ID_BREAK_THROUGH, function() {

			this.name = "ブレイクスルー";
			this.kana = "フレイクスルウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// トランセンデンス
		// ----------------------------------------------------------------
		// SKILL_ID_TRANSCENDENCE
		defineSkill(SKILL_ID_TRANSCENDENCE, function() {

			this.name = "トランセンデンス";
			this.kana = "トランセンテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 天使さま助けて
		// ----------------------------------------------------------------
		// SKILL_ID_TENSHISAMA_TASUKETE
		defineSkill(SKILL_ID_TENSHISAMA_TASUKETE, function() {

			this.name = "天使さま助けて";
			this.kana = "テンシサマタスケテ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		}),

];
