/**
 * スキル定義 thief/3b-chaser（4 件 / SKILL_ID 286〜867 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../mobconfplayer.js";
import {
    SKILL_ID_CHASEWALK, SKILL_ID_FULL_STRIP, SKILL_ID_PRESERVE, SKILL_ID_REJECT_SWORD
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// チェイスウォーク(STR+)
		// ----------------------------------------------------------------
		// SKILL_ID_CHASEWALK
		defineSkill(SKILL_ID_CHASEWALK, function() {

			this.name = "チェイスウォーク(STR+)";
			this.kana = "チエイスウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// リジェクトソード
		// ----------------------------------------------------------------
		// SKILL_ID_REJECT_SWORD
		defineSkill(SKILL_ID_REJECT_SWORD, function() {

			this.name = "リジェクトソード";
			this.kana = "リシエクトソオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// フルストリップ
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_STRIP
		defineSkill(SKILL_ID_FULL_STRIP, function() {

			this.name = "フルストリップ";
			this.kana = "フルストリツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// プリザーブ
		// ----------------------------------------------------------------
		// SKILL_ID_PRESERVE
		defineSkill(SKILL_ID_PRESERVE, function() {

			this.name = "プリザーブ";
			this.kana = "フリサアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

];
