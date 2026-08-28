/**
 * スキル定義 acolyte/1-acolyte（15 件 / SKILL_ID 23〜37 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_ANGELUS, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_BLESSING, SKILL_ID_CURE, SKILL_ID_DEMON_BANE,
    SKILL_ID_DIVINE_PROTECTION, SKILL_ID_HEAL, SKILL_ID_HOLY_LIGHT, SKILL_ID_PNEUMA, SKILL_ID_RUWACH,
    SKILL_ID_SIGNUM_CRUCIS, SKILL_ID_SOKUDO_GENSHO, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
	SKILL_ID_HOLY_LIGHT_TAMASHI
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ディバインプロテクション
		// ----------------------------------------------------------------
		// SKILL_ID_DIVINE_PROTECTION
		defineSkill(SKILL_ID_DIVINE_PROTECTION, function() {

			this.name = "ディバインプロテクション";
			this.kana = "テイハインフロテクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// デーモンベイン
		// ----------------------------------------------------------------
		// SKILL_ID_DEMON_BANE
		defineSkill(SKILL_ID_DEMON_BANE, function() {

			this.name = "デーモンベイン";
			this.kana = "テエモンヘイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヒール
		// ----------------------------------------------------------------
		// SKILL_ID_HEAL
		defineSkill(SKILL_ID_HEAL, function() {

			this.name = "ヒール";
			this.kana = "ヒイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// キュアー
		// ----------------------------------------------------------------
		// SKILL_ID_CURE
		defineSkill(SKILL_ID_CURE, function() {

			this.name = "キュアー";
			this.kana = "キユアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 速度増加
		// ----------------------------------------------------------------
		// SKILL_ID_SOKUDO_ZOKA
		defineSkill(SKILL_ID_SOKUDO_ZOKA, function() {

			this.name = "速度増加";
			this.kana = "ソクトソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 速度減少
		// ----------------------------------------------------------------
		// SKILL_ID_SOKUDO_GENSHO
		defineSkill(SKILL_ID_SOKUDO_GENSHO, function() {

			this.name = "速度減少";
			this.kana = "ソクトケンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 13 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// シグナムクルシス
		// ----------------------------------------------------------------
		// SKILL_ID_SIGNUM_CRUCIS
		defineSkill(SKILL_ID_SIGNUM_CRUCIS, function() {

			this.name = "シグナムクルシス";
			this.kana = "シクナムクルシス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// エンジェラス
		// ----------------------------------------------------------------
		// SKILL_ID_ANGELUS
		defineSkill(SKILL_ID_ANGELUS, function() {

			this.name = "エンジェラス";
			this.kana = "エンシエラス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500;
			}

		}),

		// ----------------------------------------------------------------
		// ブレッシング
		// ----------------------------------------------------------------
		// SKILL_ID_BLESSING
		defineSkill(SKILL_ID_BLESSING, function() {

			this.name = "ブレッシング";
			this.kana = "フレツシンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ニューマ
		// ----------------------------------------------------------------
		// SKILL_ID_PNEUMA
		defineSkill(SKILL_ID_PNEUMA, function() {

			this.name = "ニューマ";
			this.kana = "ニユウマ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// アクアベネディクタ
		// ----------------------------------------------------------------
		// SKILL_ID_AQUA_BENEDICTA
		defineSkill(SKILL_ID_AQUA_BENEDICTA, function() {

			this.name = "アクアベネディクタ";
			this.kana = "アクアヘネテイクタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ルアフ
		// ----------------------------------------------------------------
		// SKILL_ID_RUWACH
		defineSkill(SKILL_ID_RUWACH, function() {

			this.name = "ルアフ";
			this.kana = "ルアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// テレポート
		// ----------------------------------------------------------------
		// SKILL_ID_TELEPORT
		defineSkill(SKILL_ID_TELEPORT, function() {

			this.name = "テレポート";
			this.kana = "テレホオト";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 11 - 1 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ワープポータル
		// ----------------------------------------------------------------
		// SKILL_ID_WARP_PORTAL
		defineSkill(SKILL_ID_WARP_PORTAL, function() {

			this.name = "ワープポータル";
			this.kana = "ワアフホオタル";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 - 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ホーリーライト
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_LIGHT
		defineSkill(SKILL_ID_HOLY_LIGHT, function() {

			this.name = "ホーリーライト";
			this.kana = "ホオリイライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// ホーリーライト(SL魂版)
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_LIGHT_TAMASHI
		defineSkill(SKILL_ID_HOLY_LIGHT_TAMASHI, function() {

			this.refId = SKILL_ID_HOLY_LIGHT;
			this.name = "ホーリーライト(SL魂版)";
			this.kana = "ホオリイライトソウルリンカアタマシイハン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 625;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

];
