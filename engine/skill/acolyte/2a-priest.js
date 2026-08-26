/**
 * スキル定義 acolyte/2a-priest（17 件 / SKILL_ID 89〜847 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_ASPERSIO, SKILL_ID_GLORIA, SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_KYRIE_ELEISON, SKILL_ID_LEX_AETERNA,
    SKILL_ID_LEX_DIVINA, SKILL_ID_MACE_SHUREN, SKILL_ID_MAGNIFICAT, SKILL_ID_MAGNUS_EXORCISMUS, SKILL_ID_RECOVERY,
    SKILL_ID_REDEMPTIO, SKILL_ID_RESURRECTION, SKILL_ID_SANCTUARY, SKILL_ID_SEITAI_KOFUKU, SKILL_ID_SLOW_POISON,
    SKILL_ID_SUFFRAGIUM, SKILL_ID_TURN_UNDEAD
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// メイス修練
		// ----------------------------------------------------------------
		// SKILL_ID_MACE_SHUREN
		defineSkill(SKILL_ID_MACE_SHUREN, function() {

			this.name = "メイス修練";
			this.kana = "メイスシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// イムポシティオマヌス
		// ----------------------------------------------------------------
		// SKILL_ID_IMPOSITIO_MANUS
		defineSkill(SKILL_ID_IMPOSITIO_MANUS, function() {

			this.name = "イムポシティオマヌス";
			this.kana = "イムホシテイオマヌス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// サフラギウム
		// ----------------------------------------------------------------
		// SKILL_ID_SUFFRAGIUM
		defineSkill(SKILL_ID_SUFFRAGIUM, function() {

			this.name = "サフラギウム";
			this.kana = "サフラキウム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// アスペルシオ
		// ----------------------------------------------------------------
		// SKILL_ID_ASPERSIO
		defineSkill(SKILL_ID_ASPERSIO, function() {

			this.name = "アスペルシオ";
			this.kana = "アスヘルシオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 聖体降福
		// ----------------------------------------------------------------
		// SKILL_ID_SEITAI_KOFUKU
		defineSkill(SKILL_ID_SEITAI_KOFUKU, function() {

			this.name = "聖体降福";
			this.kana = "セイタイコウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// サンクチュアリ
		// ----------------------------------------------------------------
		// SKILL_ID_SANCTUARY
		defineSkill(SKILL_ID_SANCTUARY, function() {

			this.name = "サンクチュアリ";
			this.kana = "サンクチユアリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// リカバリー
		// ----------------------------------------------------------------
		// SKILL_ID_RECOVERY
		defineSkill(SKILL_ID_RECOVERY, function() {

			this.name = "リカバリー";
			this.kana = "リカハリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// スローポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_SLOW_POISON
		defineSkill(SKILL_ID_SLOW_POISON, function() {

			this.name = "スローポイズン";
			this.kana = "スロオホイスン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リザレクション
		// ----------------------------------------------------------------
		// SKILL_ID_RESURRECTION
		defineSkill(SKILL_ID_RESURRECTION, function() {

			this.name = "(×)リザレクション";
			this.kana = "リサレクシヨン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 8000 - 2000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -1000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// キリエエレイソン
		// ----------------------------------------------------------------
		// SKILL_ID_KYRIE_ELEISON
		defineSkill(SKILL_ID_KYRIE_ELEISON, function() {

			this.name = "キリエエレイソン";
			this.kana = "キリエエレイソン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 3);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マグニフィカート
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNIFICAT
		defineSkill(SKILL_ID_MAGNIFICAT, function() {

			this.name = "マグニフィカート";
			this.kana = "マクニフイカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// グロリア
		// ----------------------------------------------------------------
		// SKILL_ID_GLORIA
		defineSkill(SKILL_ID_GLORIA, function() {

			this.name = "グロリア";
			this.kana = "クロリア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// レックスディビーナ
		// ----------------------------------------------------------------
		// SKILL_ID_LEX_DIVINA
		defineSkill(SKILL_ID_LEX_DIVINA, function() {

			this.name = "レックスディビーナ";
			this.kana = "レツクステイヒイナ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 20 : 20 - 2 * (skillLv - 5);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// ターンアンデッド
		// ----------------------------------------------------------------
		// SKILL_ID_TURN_UNDEAD
		defineSkill(SKILL_ID_TURN_UNDEAD, function() {

			this.name = "(×)ターンアンデッド";
			this.kana = "タアンアンテツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// レックスエーテルナ
		// ----------------------------------------------------------------
		// SKILL_ID_LEX_AETERNA
		defineSkill(SKILL_ID_LEX_AETERNA, function() {

			this.name = "レックスエーテルナ";
			this.kana = "レツクスエエテルナ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// マグヌスエクソシズム
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNUS_EXORCISMUS
		defineSkill(SKILL_ID_MAGNUS_EXORCISMUS, function() {
			this.name = "マグヌスエクソシズム";
			this.kana = "マクヌスエクソシスム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 15000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// レディムプティオ
		// ----------------------------------------------------------------
		// SKILL_ID_REDEMPTIO
		defineSkill(SKILL_ID_REDEMPTIO, function() {

			this.name = "レディムプティオ";
			this.kana = "レテイムフテイオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 400;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 4000;
			}

		}),

];
