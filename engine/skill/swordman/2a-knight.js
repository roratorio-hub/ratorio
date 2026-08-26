/**
 * スキル定義 swordman/2a-knight（11 件 / SKILL_ID 69〜308 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { MOB_CONF_DEBUF_ID_LEX_AETERNA } from "../../mobconfdebuf.js";
import {
    SKILL_ID_AUTO_COUNTER, SKILL_ID_BOWLING_BASH, SKILL_ID_BRANDISH_SPEAR, SKILL_ID_CHARGE_ATTACK,
    SKILL_ID_KIHE_SHUREN, SKILL_ID_PIERCE, SKILL_ID_RIDING, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_SPEAR_STUB,
    SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_YARI_SHUREN, SKILL_ID_ONEHAND_QUICKEN
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 槍修練
		// ----------------------------------------------------------------
		// SKILL_ID_YARI_SHUREN
		defineSkill(SKILL_ID_YARI_SHUREN, function() {

			this.name = "槍修練";
			this.kana = "ヤリシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ピアース
		// ----------------------------------------------------------------
		// SKILL_ID_PIERCE
		defineSkill(SKILL_ID_PIERCE, function() {
			this.name = "ピアース";
			this.kana = "ヒアアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 7;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 100 + 10 * skillLv;
				// チャージングピアースがONの時、与えるダメージ + 150% x スキルレベル
				ratio *= 1 + 1.5 * option.GetOptionValue(0);
				return ratio;
			}
		}),

		// ----------------------------------------------------------------
		// スピアスタブ
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_STUB
		defineSkill(SKILL_ID_SPEAR_STUB, function() {

			this.name = "スピアスタブ";
			this.kana = "スヒアスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スピアブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_BOOMERANG
		defineSkill(SKILL_ID_SPEAR_BOOMERANG, function() {

			this.name = "スピアブーメラン";
			this.kana = "スヒアフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ブランディッシュスピア
		// ----------------------------------------------------------------
		// SKILL_ID_BRANDISH_SPEAR
		defineSkill(SKILL_ID_BRANDISH_SPEAR, function() {

			this.name = "ブランディッシュスピア";
			this.kana = "フランテイツシユスヒア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powBase = 0;

				powBase = 100 + 20 * skillLv;

				pow = powBase;
				pow += (skillLv >= 4) ? powBase / 2 : 0;
				pow += (skillLv >= 7) ? powBase / 4 : 0;
				pow += (skillLv >= 10) ? powBase / 8 : 0;

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ツーハンドクイッケン
		// ----------------------------------------------------------------
		// SKILL_ID_TWOHAND_QUICKEN
		defineSkill(SKILL_ID_TWOHAND_QUICKEN, function() {

			this.name = "ツーハンドクイッケン";
			this.kana = "ツウハントクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ワンハンドクイッケン(SL魂)
		// ----------------------------------------------------------------
		// SKILL_ID_ONEHAND_QUICKEN
		defineSkill(SKILL_ID_ONEHAND_QUICKEN, function() {

			this.name = "ワンハンドクイッケン(SL魂)";
			this.kana = "ワンハントクイツケンソウルリンカアタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}
		}),

		// ----------------------------------------------------------------
		// オートカウンター
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_COUNTER
		defineSkill(SKILL_ID_AUTO_COUNTER, function() {

			this.name = "オートカウンター";
			this.kana = "オオトカウンタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}

		}),

		// ----------------------------------------------------------------
		// ボウリングバッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_BOWLING_BASH
		defineSkill(SKILL_ID_BOWLING_BASH, function() {

			this.name = "ボウリングバッシュ";
			this.kana = "ホウリンクハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var hitcnt = 2;

				if (skillLv == 1) {
					hitcnt -= 1;
				}

				if (charaDataManger.GetMonsterDebuf(MOB_CONF_DEBUF_ID_LEX_AETERNA) > 0) {
					hitcnt += 1;
				}

				return hitcnt;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ライディング
		// ----------------------------------------------------------------
		// SKILL_ID_RIDING
		defineSkill(SKILL_ID_RIDING, function() {

			this.name = "ライディング";
			this.kana = "ライテインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 騎兵修練
		// ----------------------------------------------------------------
		// SKILL_ID_KIHE_SHUREN
		defineSkill(SKILL_ID_KIHE_SHUREN, function() {

			this.name = "騎兵修練";
			this.kana = "キヘイシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// チャージアタック
		// ----------------------------------------------------------------
		// SKILL_ID_CHARGE_ATTACK
		defineSkill(SKILL_ID_CHARGE_ATTACK, function() {

			this.name = "チャージアタック";
			this.kana = "チヤアシアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

];
