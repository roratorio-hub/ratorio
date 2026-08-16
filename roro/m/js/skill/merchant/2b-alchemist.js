/**
 * スキル定義 merchant/2b-alchemist（17 件 / SKILL_ID 241〜862 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_ACID_TERROR, SKILL_ID_ANSOKU, SKILL_ID_BERSERK_PITCHER, SKILL_ID_BIOPLANT, SKILL_ID_CALL_HOMUNCULUS,
    SKILL_ID_CHEMICAL_ARMER_CHARGE, SKILL_ID_CHEMICAL_HELM_CHARGE, SKILL_ID_CHEMICAL_SHIELD_CHARGE,
    SKILL_ID_CHEMICAL_WEAPON_CHARGE, SKILL_ID_DEMONSTRATION, SKILL_ID_LEARNING_POTION, SKILL_ID_ONO_SHUREN,
    SKILL_ID_PHARMACY, SKILL_ID_POTION_PITCHER, SKILL_ID_RESURRECTION_HOMUNCULUS, SKILL_ID_SEIMEI_RINRI,
    SKILL_ID_SPHERE_MINE
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 斧修練
		// ----------------------------------------------------------------
		// SKILL_ID_ONO_SHUREN
		defineSkill(SKILL_ID_ONO_SHUREN, function() {

			this.name = "斧修練";
			this.kana = "オノシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ラーニングポーション
		// ----------------------------------------------------------------
		// SKILL_ID_LEARNING_POTION
		defineSkill(SKILL_ID_LEARNING_POTION, function() {

			this.name = "ラーニングポーション";
			this.kana = "ラアニンクホオシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファーマシー
		// ----------------------------------------------------------------
		// SKILL_ID_PHARMACY
		defineSkill(SKILL_ID_PHARMACY, function() {

			this.name = "ファーマシー";
			this.kana = "フアアマシイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// アシッドテラー
		// ----------------------------------------------------------------
		// SKILL_ID_ACID_TERROR
		defineSkill(SKILL_ID_ACID_TERROR, function() {

			this.name = "アシッドテラー";
			this.kana = "アシツトテラア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ポーションピッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_POTION_PITCHER
		defineSkill(SKILL_ID_POTION_PITCHER, function() {

			this.name = "ポーションピッチャー";
			this.kana = "ホオシヨンヒツチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// バイオプラント
		// ----------------------------------------------------------------
		// SKILL_ID_BIOPLANT
		defineSkill(SKILL_ID_BIOPLANT, function() {

			this.name = "バイオプラント";
			this.kana = "ハイオフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// スフィアーマイン
		// ----------------------------------------------------------------
		// SKILL_ID_SPHERE_MINE
		defineSkill(SKILL_ID_SPHERE_MINE, function() {

			this.name = "スフィアーマイン";
			this.kana = "スフイアアマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// デモンストレーション
		// ----------------------------------------------------------------
		// SKILL_ID_DEMONSTRATION
		defineSkill(SKILL_ID_DEMONSTRATION, function() {
			this.name = "デモンストレーション";
			this.kana = "テモンストレエシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL | CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
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
		// ケミカルウェポンチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_CHEMICAL_WEAPON_CHARGE
		defineSkill(SKILL_ID_CHEMICAL_WEAPON_CHARGE, function() {

			this.name = "ケミカルウェポンチャージ";
			this.kana = "ケミカルウエホンチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ケミカルシールドチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_CHEMICAL_SHIELD_CHARGE
		defineSkill(SKILL_ID_CHEMICAL_SHIELD_CHARGE, function() {

			this.name = "ケミカルシールドチャージ";
			this.kana = "ケミカルシイルトチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ケミカルアーマーチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_CHEMICAL_ARMER_CHARGE
		defineSkill(SKILL_ID_CHEMICAL_ARMER_CHARGE, function() {

			this.name = "ケミカルアーマーチャージ";
			this.kana = "ケミカルアアマアチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ケミカルヘルムチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_CHEMICAL_HELM_CHARGE
		defineSkill(SKILL_ID_CHEMICAL_HELM_CHARGE, function() {

			this.name = "ケミカルヘルムチャージ";
			this.kana = "ケミカルヘルムチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// バーサクピッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_BERSERK_PITCHER
		defineSkill(SKILL_ID_BERSERK_PITCHER, function() {

			this.name = "バーサークピッチャー";
			this.kana = "ハアサアクヒツチヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 生命倫理
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEI_RINRI
		defineSkill(SKILL_ID_SEIMEI_RINRI, function() {

			this.name = "生命倫理";
			this.kana = "セイメイリンリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 安息
		// ----------------------------------------------------------------
		// SKILL_ID_ANSOKU
		defineSkill(SKILL_ID_ANSOKU, function() {

			this.name = "安息";
			this.kana = "アンソク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

		// ----------------------------------------------------------------
		// コールホムンクルス
		// ----------------------------------------------------------------
		// SKILL_ID_CALL_HOMUNCULUS
		defineSkill(SKILL_ID_CALL_HOMUNCULUS, function() {

			this.name = "コールホムンクルス";
			this.kana = "コオルホムンクルス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// リザレクションホムンクルス
		// ----------------------------------------------------------------
		// SKILL_ID_RESURRECTION_HOMUNCULUS
		defineSkill(SKILL_ID_RESURRECTION_HOMUNCULUS, function() {

			this.name = "リザレクションホムンクルス";
			this.kana = "リサレクシヨンホムンクルス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

];
