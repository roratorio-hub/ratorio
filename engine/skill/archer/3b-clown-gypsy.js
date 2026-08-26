/**
 * スキル定義 archer/3b-clown-gypsy（6 件 / SKILL_ID 282〜870 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { ITEM_KIND_MUSICAL, ITEM_KIND_WHIP } from "../../const/EnumItemKind.js";
import { ITEM_SP_ELEMENTAL } from "../../const/EnumItemSpId.js";
import { GetEquippedTotalSPArrow } from "../../foot-bridge.js";
import {
    SKILL_ID_ARRAW_VULKAN, SKILL_ID_HELLMODENO_TUE, SKILL_ID_MARIONET_CONTROL, SKILL_ID_TSUKIAKARINO_SHITADE,
    SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_WATASHIWO_SHIBARANAIDE
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 運命のタロットカード
		// ----------------------------------------------------------------
		// SKILL_ID_UNMEINO_TALOTCARD
		defineSkill(SKILL_ID_UNMEINO_TALOTCARD, function() {

			this.name = "運命のタロットカード";
			this.kana = "ウンメイノタロツトカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		}),

		// ----------------------------------------------------------------
		// アローバルカン
		// ----------------------------------------------------------------
		// SKILL_ID_ARRAW_VULKAN
		defineSkill(SKILL_ID_ARRAW_VULKAN, function() {
			this.name = "アローバルカン";
			this.kana = "アロオハルカン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL].includes(weapon);
			}
			this.element = function(option) {
				return GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger) {
				let ratio = 500 + 100 * skillLv;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.dispHitCount = function(skillLv, charaDataManger) {
				return 9;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1800 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 300;
			}
			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// マリオネットコントロール
		// ----------------------------------------------------------------
		// SKILL_ID_MARIONET_CONTROL
		defineSkill(SKILL_ID_MARIONET_CONTROL, function() {

			this.name = "マリオネットコントロール";
			this.kana = "マリオネツトコントロオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// 音楽専門家の熟練
		// ----------------------------------------------------------------
		// SKILL_ID_WATASHIWO_SHIBARANAIDE
		defineSkill(SKILL_ID_WATASHIWO_SHIBARANAIDE, function() {
			this.name = "音楽専門家の熟練";
			this.kana = "オンガクセンモンカのジュクレン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}
			this.CoolTime = function(skillLv, charaData) {
				return 10000;
			}
		}),

		// ----------------------------------------------------------------
		// ヘルモードの杖
		// ----------------------------------------------------------------
		// SKILL_ID_HELLMODENO_TUE
		defineSkill(SKILL_ID_HELLMODENO_TUE, function() {

			this.name = "ヘルモードの杖";
			this.kana = "ヘルモオトノツエ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 月明かりの下で
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKIAKARINO_SHITADE
		defineSkill(SKILL_ID_TSUKIAKARINO_SHITADE, function() {

			this.name = "月明かりの下で";
			this.kana = "ツキアカリノシタテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

		}),

];
