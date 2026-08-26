/**
 * スキル定義 swordman/2b-crusader（13 件 / SKILL_ID 156〜852 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_AUTO_GUARD, SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_DEBOTION, SKILL_ID_DEFENDER, SKILL_ID_FAITH,
    SKILL_ID_GRAND_CROSS, SKILL_ID_HOLY_CROSS, SKILL_ID_PROVIDENCE, SKILL_ID_REFLECT_SHIELD,
    SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHRINK, SKILL_ID_SPEAR_QUICKEN,
	SKILL_ID_SHIELD_BOOMERANG_TAMASHI
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// フェイス
		// ----------------------------------------------------------------
		// SKILL_ID_FAITH
		defineSkill(SKILL_ID_FAITH, function() {

			this.name = "フェイス";
			this.kana = "フエイス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シールドチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHARGE
		defineSkill(SKILL_ID_SHIELD_CHARGE, function() {

			this.name = "シールドチャージ";
			this.kana = "シイルトチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シールドブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_BOOMERANG
		defineSkill(SKILL_ID_SHIELD_BOOMERANG, function() {

			this.name = "シールドブーメラン";
			this.kana = "シイルトフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// シールドブーメラン(SL魂版)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_BOOMERANG_TAMASHI
		defineSkill(SKILL_ID_SHIELD_BOOMERANG_TAMASHI, function() {

			this.refId = SKILL_ID_SHIELD_BOOMERANG;
			this.name = "シールドブーメラン(SL魂版)";
			this.kana = "シイルトフウメランソウルリンカアタマシイハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 60 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 350;
			}

		}),

		// ----------------------------------------------------------------
		// リフレクトシールド
		// ----------------------------------------------------------------
		// SKILL_ID_REFLECT_SHIELD
		defineSkill(SKILL_ID_REFLECT_SHIELD, function() {

			this.name = "リフレクトシールド";
			this.kana = "リフレクトシイルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ホーリークロス
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_CROSS
		defineSkill(SKILL_ID_HOLY_CROSS, function() {

			this.name = "ホーリークロス";
			this.kana = "ホオリイクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// グランドクロス
		// ----------------------------------------------------------------
		// SKILL_ID_GRAND_CROSS
		defineSkill(SKILL_ID_GRAND_CROSS, function() {

			this.name = "グランドクロス";
			this.kana = "クラントクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 7 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// ディボーション
		// ----------------------------------------------------------------
		// SKILL_ID_DEBOTION
		defineSkill(SKILL_ID_DEBOTION, function() {

			this.name = "ディボーション";
			this.kana = "テイホオシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// プロヴィデンス
		// ----------------------------------------------------------------
		// SKILL_ID_PROVIDENCE
		defineSkill(SKILL_ID_PROVIDENCE, function() {

			this.name = "プロヴィデンス";
			this.kana = "フロウイテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// ディフェンダー
		// ----------------------------------------------------------------
		// SKILL_ID_DEFENDER
		defineSkill(SKILL_ID_DEFENDER, function() {

			this.name = "ディフェンダー";
			this.kana = "テイフエンタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// スピアクイッケン
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_QUICKEN
		defineSkill(SKILL_ID_SPEAR_QUICKEN, function() {

			this.name = "スピアクイッケン";
			this.kana = "スヒアクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// オートガード
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_GUARD
		defineSkill(SKILL_ID_AUTO_GUARD, function() {

			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// オートガード（ダミー　※多重定義ミス）
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_GUARD_OLD
		defineSkill(SKILL_ID_AUTO_GUARD_OLD, function() {

			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シュリンク
		// ----------------------------------------------------------------
		// SKILL_ID_SHRINK
		defineSkill(SKILL_ID_SHRINK, function() {

			this.name = "シュリンク";
			this.kana = "シユリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

];
