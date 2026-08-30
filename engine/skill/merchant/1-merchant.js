/**
 * スキル定義 merchant/1-merchant（11 件 / SKILL_ID 59〜990 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_CART_REVOLUTION, SKILL_ID_CHANGE_CART, SKILL_ID_DISCOUNT, SKILL_ID_ITEM_KANTE, SKILL_ID_LOUD_VOICE,
    SKILL_ID_MAMMONITE, SKILL_ID_OVER_CHARGE, SKILL_ID_PUSH_CART, SKILL_ID_ROTEN_KAISETSU,
    SKILL_ID_SHOZIGENKAIRYO_ZOKA
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 所持限界量増加
		// ----------------------------------------------------------------
		// SKILL_ID_SHOZIGENKAIRYO_ZOKA
		defineSkill(SKILL_ID_SHOZIGENKAIRYO_ZOKA, function() {

			this.name = "所持限界量増加";
			this.kana = "シヨシケンカイリヨウソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ディスカウント
		// ----------------------------------------------------------------
		// SKILL_ID_DISCOUNT
		defineSkill(SKILL_ID_DISCOUNT, function() {

			this.name = "ディスカウント";
			this.kana = "テイスカウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オーバーチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_CHARGE
		defineSkill(SKILL_ID_OVER_CHARGE, function() {

			this.name = "オーバーチャージ";
			this.kana = "オオハアチヤアシ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// プッシュカート
		// ----------------------------------------------------------------
		// SKILL_ID_PUSH_CART
		defineSkill(SKILL_ID_PUSH_CART, function() {

			this.name = "プッシュカート";
			this.kana = "フツシユカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アイテム鑑定
		// ----------------------------------------------------------------
		// SKILL_ID_ITEM_KANTE
		defineSkill(SKILL_ID_ITEM_KANTE, function() {

			this.name = "アイテム鑑定";
			this.kana = "アイテムカンテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 露店開設
		// ----------------------------------------------------------------
		// SKILL_ID_ROTEN_KAISETSU
		defineSkill(SKILL_ID_ROTEN_KAISETSU, function() {

			this.name = "露店開設";
			this.kana = "ロテンカイセツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// メマーナイト
		// ----------------------------------------------------------------
		// SKILL_ID_MAMMONITE
		defineSkill(SKILL_ID_MAMMONITE, function() {

			this.name = "メマーナイト";
			this.kana = "メマアナイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// カートレボリューション
		// ----------------------------------------------------------------
		// SKILL_ID_CART_REVOLUTION
		defineSkill(SKILL_ID_CART_REVOLUTION, function() {

			this.name = "カートレボリューション";
			this.kana = "カアトレホリユウシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// チェンジカート
		// ----------------------------------------------------------------
		// SKILL_ID_CHANGE_CART
		defineSkill(SKILL_ID_CHANGE_CART, function() {

			this.name = "チェンジカート";
			this.kana = "チエンシカアト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		}),

		// ----------------------------------------------------------------
		// ラウドボイス
		// ----------------------------------------------------------------
		// SKILL_ID_LOUD_VOICE
		defineSkill(SKILL_ID_LOUD_VOICE, function() {

			this.name = "ラウドボイス";
			this.kana = "ラウトホイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

		}),

];
