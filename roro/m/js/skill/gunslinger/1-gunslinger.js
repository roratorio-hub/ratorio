/**
 * スキル定義 gunslinger/1-gunslinger（23 件 / SKILL_ID 416〜891 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { ITEM_KIND_HANDGUN, ITEM_KIND_RIFLE } from '../../const/EnumItemKind.js';
import { RACE_ID_ANIMAL, RACE_ID_HUMAN } from '../../const/EnumRaceId.js';
import {
    SKILL_ID_ADJUSTMENT, SKILL_ID_BULLS_EYE, SKILL_ID_CHAIN_ACTION, SKILL_ID_COUNT_OF_COIN, SKILL_ID_CRACKER,
    SKILL_ID_DEATHPERAD, SKILL_ID_DISARM, SKILL_ID_DUST, SKILL_ID_FLIP_THE_COIN, SKILL_ID_FLYING,
    SKILL_ID_FULL_BASTER, SKILL_ID_GATLING_FEVER, SKILL_ID_GROUND_DRIFT, SKILL_ID_INCREASING_ACCURACY,
    SKILL_ID_MADNESSS_CANCELER, SKILL_ID_MAGICAL_BARRET, SKILL_ID_PIERCING_SHOT, SKILL_ID_RAPID_SHOWER,
    SKILL_ID_SINGLE_ACTION, SKILL_ID_SNAKE_EYE, SKILL_ID_SPREAD_ATTACK, SKILL_ID_TRACKING, SKILL_ID_TRIPLE_ACTION
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// コインの枚数
		// ----------------------------------------------------------------
		// SKILL_ID_COUNT_OF_COIN
		defineSkill(SKILL_ID_COUNT_OF_COIN, function() {

			this.name = "コインの枚数";
			this.kana = "コインノマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// フライング
		// ----------------------------------------------------------------
		// SKILL_ID_FLYING
		defineSkill(SKILL_ID_FLYING, function() {

			this.name = "フライング";
			this.kana = "フラインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// トリプルアクション
		// ----------------------------------------------------------------
		// SKILL_ID_TRIPLE_ACTION
		defineSkill(SKILL_ID_TRIPLE_ACTION, function() {

			this.name = "トリプルアクション";
			this.kana = "トリフルアクシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ブルズアイ
		// ----------------------------------------------------------------
		// SKILL_ID_BULLS_EYE
		defineSkill(SKILL_ID_BULLS_EYE, function() {

			this.name = "ブルズアイ";
			this.kana = "フルスアイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var race = 0;

				// 基本式
				pow = 100;

				// 人間形と動物形には500%
				race = charaDataManger.GetMobRace();
				if ((race == RACE_ID_HUMAN) || (race == RACE_ID_ANIMAL)) {
					pow = 500;
				}

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// マッドネスキャンセラー
		// ----------------------------------------------------------------
		// SKILL_ID_MADNESSS_CANCELER
		defineSkill(SKILL_ID_MADNESSS_CANCELER, function() {

			this.name = "マッドネスキャンセラー";
			this.kana = "マツトネスキヤンセラア";
			this.maxLv = 1;
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
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// アジャストメント
		// ----------------------------------------------------------------
		// SKILL_ID_ADJUSTMENT
		defineSkill(SKILL_ID_ADJUSTMENT, function() {

			this.name = "アジャストメント";
			this.kana = "アシヤストメント";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// インクリージングアキュラシー
		// ----------------------------------------------------------------
		// SKILL_ID_INCREASING_ACCURACY
		defineSkill(SKILL_ID_INCREASING_ACCURACY, function() {

			this.name = "インクリージングアキュラシー";
			this.kana = "インクリイシンクアキユラシイ";
			this.maxLv = 1;
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
		// マジカルバレット
		// ----------------------------------------------------------------
		// SKILL_ID_MAGICAL_BARRET
		defineSkill(SKILL_ID_MAGICAL_BARRET, function() {

			this.name = "マジカルバレット";
			this.kana = "マシカルハレツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// クラッカー
		// ----------------------------------------------------------------
		// SKILL_ID_CRACKER
		defineSkill(SKILL_ID_CRACKER, function() {

			this.name = "クラッカー";
			this.kana = "クラツカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// シングルアクション
		// ----------------------------------------------------------------
		// SKILL_ID_SINGLE_ACTION
		defineSkill(SKILL_ID_SINGLE_ACTION, function() {

			this.name = "シングルアクション";
			this.kana = "シンクルアクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スネークアイ
		// ----------------------------------------------------------------
		// SKILL_ID_SNAKE_EYE
		defineSkill(SKILL_ID_SNAKE_EYE, function() {

			this.name = "スネークアイ";
			this.kana = "スネエクアイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// チェーンアクション
		// ----------------------------------------------------------------
		// SKILL_ID_CHAIN_ACTION
		defineSkill(SKILL_ID_CHAIN_ACTION, function() {

			this.name = "チェーンアクション";
			this.kana = "チエエンアクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// ラピッドシャワー
		// ----------------------------------------------------------------
		// SKILL_ID_RAPID_SHOWER
		defineSkill(SKILL_ID_RAPID_SHOWER, function() {

			this.name = "ラピッドシャワー";
			this.kana = "ラヒツトシヤワア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 50 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1700;
			}

		}),

		// ----------------------------------------------------------------
		// デスペラード
		// ----------------------------------------------------------------
		// SKILL_ID_DEATHPERAD
		defineSkill(SKILL_ID_DEATHPERAD, function() {

			this.name = "デスペラード";
			this.kana = "テスヘラアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// トラッキング
		// ----------------------------------------------------------------
		// SKILL_ID_TRACKING
		defineSkill(SKILL_ID_TRACKING, function() {

			this.name = "トラッキング";
			this.kana = "トラツキンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 500 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ディスアーム
		// ----------------------------------------------------------------
		// SKILL_ID_DISARM
		defineSkill(SKILL_ID_DISARM, function() {

			this.name = "ディスアーム";
			this.kana = "テイスアアム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ピアーシングショット
		// ----------------------------------------------------------------
		// SKILL_ID_PIERCING_SHOT
		defineSkill(SKILL_ID_PIERCING_SHOT, function() {

			this.name = "ピアーシングショット";
			this.kana = "ヒアアシンクシヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 武器の種類によって威力が変化
				switch (charaDataManger.GetCharaArmsType()) {

				case ITEM_KIND_HANDGUN:
					pow = 100 + 20 * skillLv;
					break;

				case ITEM_KIND_RIFLE:
					pow = 150 + 30 * skillLv;
					break;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ガトリングフィーバー
		// ----------------------------------------------------------------
		// SKILL_ID_GATLING_FEVER
		defineSkill(SKILL_ID_GATLING_FEVER, function() {

			this.name = "ガトリングフィーバー";
			this.kana = "カトリンクフィイハア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ダスト
		// ----------------------------------------------------------------
		// SKILL_ID_DUST
		defineSkill(SKILL_ID_DUST, function() {

			this.name = "ダスト";
			this.kana = "タスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// フルバスター
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_BASTER
		defineSkill(SKILL_ID_FULL_BASTER, function() {

			this.name = "フルバスター";
			this.kana = "フルハスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スプレッドアタック
		// ----------------------------------------------------------------
		// SKILL_ID_SPREAD_ATTACK
		defineSkill(SKILL_ID_SPREAD_ATTACK, function() {

			this.name = "スプレッドアタック";
			this.kana = "スフレツトアタツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// グラウンドドリフト
		// ----------------------------------------------------------------
		// SKILL_ID_GROUND_DRIFT
		defineSkill(SKILL_ID_GROUND_DRIFT, function() {

			this.name = "グラウンドドリフト";
			this.kana = "クラウントトリフト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// フリップザコイン
		// ----------------------------------------------------------------
		// SKILL_ID_FLIP_THE_COIN
		defineSkill(SKILL_ID_FLIP_THE_COIN, function() {

			this.name = "フリップザコイン";
			this.kana = "フリツフサコイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

];
