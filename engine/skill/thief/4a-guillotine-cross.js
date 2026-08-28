/**
 * スキル定義 thief/4a-guillotine-cross（18 件 / SKILL_ID 459〜797 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    SKILL_ID_ANTIDOTE, SKILL_ID_CLOAKING_EXCEED, SKILL_ID_COUNTER_SLASH, SKILL_ID_CROSS_IMPACT,
    SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_DARK_CRAW, SKILL_ID_DARK_ILLUSION, SKILL_ID_ENCHANT_DEADLY_POISON,
    SKILL_ID_HALLUCINATION_WALK, SKILL_ID_PHANTOM_MENUS, SKILL_ID_POISONING_WEAPON, SKILL_ID_POISON_SMOKE,
    SKILL_ID_ROLLING_CUTTER, SKILL_ID_SHINDOKU_KENKYU, SKILL_ID_SHINDOKU_SEIZO, SKILL_ID_VENOM_IMPRESS,
    SKILL_ID_VENOM_PRESSURE, SKILL_ID_WEAPON_BLOCKING, SKILL_ID_WEAPON_CRUSH
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ベナムインプレス
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_IMPRESS
		defineSkill(SKILL_ID_VENOM_IMPRESS, function() {

			this.name = "ベナムインプレス";
			this.kana = "ヘナムインフレス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// クロスインパクト
		// ----------------------------------------------------------------
		// SKILL_ID_CROSS_IMPACT
		defineSkill(SKILL_ID_CROSS_IMPACT, function() {

			this.name = "クロスインパクト";
			this.kana = "クロスインハクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_UNKNOWN_DELAY_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 1000 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ダークイリュージョン
		// ----------------------------------------------------------------
		// SKILL_ID_DARK_ILLUSION
		defineSkill(SKILL_ID_DARK_ILLUSION, function() {

			this.name = "ダークイリュージョン";
			this.kana = "タアクイリユウシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 新毒研究
		// ----------------------------------------------------------------
		// SKILL_ID_SHINDOKU_KENKYU
		defineSkill(SKILL_ID_SHINDOKU_KENKYU, function() {

			this.name = "新毒研究";
			this.kana = "シントクケンキユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 新毒製造
		// ----------------------------------------------------------------
		// SKILL_ID_SHINDOKU_SEIZO
		defineSkill(SKILL_ID_SHINDOKU_SEIZO, function() {

			this.name = "新毒製造";
			this.kana = "シントクセイソウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// アンチドート
		// ----------------------------------------------------------------
		// SKILL_ID_ANTIDOTE
		defineSkill(SKILL_ID_ANTIDOTE, function() {

			this.name = "アンチドート";
			this.kana = "アンチトオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// ポイズニングウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_POISONING_WEAPON
		defineSkill(SKILL_ID_POISONING_WEAPON, function() {

			this.name = "ポイズニングウェポン";
			this.kana = "ホイスニンクウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ベナムプレッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_PRESSURE
		defineSkill(SKILL_ID_VENOM_PRESSURE, function() {

			this.name = "ベナムプレッシャー";
			this.kana = "ヘナムフレツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ポイズンスモーク
		// ----------------------------------------------------------------
		// SKILL_ID_POISON_SMOKE
		defineSkill(SKILL_ID_POISON_SMOKE, function() {

			this.name = "ポイズンスモーク";
			this.kana = "ホイスンスモオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ウェポンブロッキング
		// ----------------------------------------------------------------
		// SKILL_ID_WEAPON_BLOCKING
		defineSkill(SKILL_ID_WEAPON_BLOCKING, function() {

			this.name = "(×)ウェポンブロッキング";
			this.kana = "ウエホンフロツキンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 - 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// カウンタースラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_COUNTER_SLASH
		defineSkill(SKILL_ID_COUNTER_SLASH, function() {

			this.name = "(△)カウンタースラッシュ";
			this.kana = "カウンタアスラツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 300 + 150 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// ステータス補正
				pow += 2 * charaDataManger.GetCharaAgi();
				pow += 4 * charaDataManger.GetCharaJobLv();

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ウェポンクラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_WEAPON_CRUSH
		defineSkill(SKILL_ID_WEAPON_CRUSH, function() {

			this.name = "ウェポンクラッシュ";
			this.kana = "ウエホンクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// クローキングエクシード
		// ----------------------------------------------------------------
		// SKILL_ID_CLOAKING_EXCEED
		defineSkill(SKILL_ID_CLOAKING_EXCEED, function() {

			this.name = "クローキングエクシード";
			this.kana = "クロオキンクエクシイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// ファントムメナス
		// ----------------------------------------------------------------
		// SKILL_ID_PHANTOM_MENUS
		defineSkill(SKILL_ID_PHANTOM_MENUS, function() {

			this.name = "ファントムメナス";
			this.kana = "フアントムメナス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ハルシネーションウォーク
		// ----------------------------------------------------------------
		// SKILL_ID_HALLUCINATION_WALK
		defineSkill(SKILL_ID_HALLUCINATION_WALK, function() {

			this.name = "ハルシネーションウォーク";
			this.kana = "ハルシネエシヨンウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 180000;
			}

		}),

		// ----------------------------------------------------------------
		// ローリングカッター
		// ----------------------------------------------------------------
		// SKILL_ID_ROLLING_CUTTER
		defineSkill(SKILL_ID_ROLLING_CUTTER, function() {

			this.name = "ローリングカッター";
			this.kana = "ロオリンクカツタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 50 + 50 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// クロスリッパースラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_CROSS_RIPPER_SLASHER
		defineSkill(SKILL_ID_CROSS_RIPPER_SLASHER, function() {

			this.name = "クロスリッパースラッシャー";
			this.kana = "クロスリツハアスラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ダーククロー
		// ----------------------------------------------------------------
		// SKILL_ID_DARK_CRAW
		defineSkill(SKILL_ID_DARK_CRAW, function() {

			this.name = "ダーククロー";
			this.kana = "タアククロオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 12 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 60000;
			}

		}),

];
