/**
 * スキル定義 magician/3a-high-wizard（6 件 / SKILL_ID 274〜863 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_GANBANTEIN, SKILL_ID_GRAVITATION_FIELD, SKILL_ID_MAGIC_CRUSHER, SKILL_ID_MAHORYOKU_ZOFUKU,
    SKILL_ID_NAPALM_VULKAN, SKILL_ID_SOUL_DRAIN
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ソウルドレイン
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_DRAIN
		defineSkill(SKILL_ID_SOUL_DRAIN, function() {

			this.name = "ソウルドレイン";
			this.kana = "ソウルトレイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// マジッククラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_CRUSHER
		defineSkill(SKILL_ID_MAGIC_CRUSHER, function() {

			this.name = "マジッククラッシャー";
			this.kana = "マシツククラツシヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

		}),

		// ----------------------------------------------------------------
		// 魔法力増幅
		// ----------------------------------------------------------------
		// SKILL_ID_MAHORYOKU_ZOFUKU
		defineSkill(SKILL_ID_MAHORYOKU_ZOFUKU, function() {

			this.name = "魔法力増幅";
			this.kana = "マホウリヨクソウフク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ナパームバルカン
		// ----------------------------------------------------------------
		// SKILL_ID_NAPALM_VULKAN
		defineSkill(SKILL_ID_NAPALM_VULKAN, function() {

			this.name = "ナパームバルカン";
			this.kana = "ナハアムハルカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// グラビテーションフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_GRAVITATION_FIELD
		defineSkill(SKILL_ID_GRAVITATION_FIELD, function() {
			this.name = "グラビテーションフィールド";
			this.kana = "クラヒテエシヨンフイイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ガンバンテイン
		// ----------------------------------------------------------------
		// SKILL_ID_GANBANTEIN
		defineSkill(SKILL_ID_GANBANTEIN, function() {

			this.name = "ガンバンテイン";
			this.kana = "カンハンテイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

];
