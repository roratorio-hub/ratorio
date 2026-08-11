/**
 * スキル定義 26-third-class-extra（SKILL_ID 797–821 / 25 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, SKILL_ID_COMBO_RESERVED_803, SKILL_ID_COMBO_RESERVED_804,
    SKILL_ID_COMBO_RESERVED_805, SKILL_ID_COMBO_RESERVED_806, SKILL_ID_COMBO_RESERVED_807,
    SKILL_ID_COMBO_RESERVED_808, SKILL_ID_COMBO_RESERVED_809, SKILL_ID_COMBO_SANDAN_CHAMP,
    SKILL_ID_COMBO_SANDAN_MONK, SKILL_ID_COMBO_SORYUKYAKU, SKILL_ID_DARK_CRAW, SKILL_ID_DEFENCE,
    SKILL_ID_EARTH_QUAKE, SKILL_ID_GRANITIC_ARMOR, SKILL_ID_HOMLV_FOR_PYROCLASTIC, SKILL_ID_MAGMA_ILLUPTION,
    SKILL_ID_OVERED_BOOST, SKILL_ID_PAIN_KILLER, SKILL_ID_PYROCLASTIC, SKILL_ID_SENKO_RENGEKI, SKILL_ID_SERE,
    SKILL_ID_SERE_MODE, SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_TELECHINESIS_INSTENCE
} from '../skill.dat.js';

export const skills = [
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

		// ----------------------------------------------------------------
		// テレキネシスインテンス
		// ----------------------------------------------------------------
		// SKILL_ID_TELECHINESIS_INSTENCE
		defineSkill(SKILL_ID_TELECHINESIS_INSTENCE, function() {

			this.name = "テレキネシスインテンス";
			this.kana = "テレキネシスインテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolAry = [ 120000, 170000, 210000, 240000, 260000 ];

				return coolAry[skillLv - 1];
			}

		}),

		// ----------------------------------------------------------------
		// 閃光連撃
		// ----------------------------------------------------------------
		// SKILL_ID_SENKO_RENGEKI
		defineSkill(SKILL_ID_SENKO_RENGEKI, function() {

			this.name = "閃光連撃";
			this.kana = "センコウレンケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 65;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 2350;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 14000 - 2000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(三段～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SANDAN_MONK
		defineSkill(SKILL_ID_COMBO_SANDAN_MONK, function() {

			this.name = "(仮)コンボ計算(三段～)";
			this.kana = "コンホケイサンモンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(三段～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SANDAN_CHAMP
		defineSkill(SKILL_ID_COMBO_SANDAN_CHAMP, function() {

			this.name = "(仮)コンボ計算(三段～)";
			this.kana = "コンホケイサンチヤンヒオン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(双龍～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SORYUKYAKU
		defineSkill(SKILL_ID_COMBO_SORYUKYAKU, function() {

			this.name = "(仮)コンボ計算(双龍～)";
			this.kana = "コンホケイサンソウリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_803
		defineSkill(SKILL_ID_COMBO_RESERVED_803, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_804
		defineSkill(SKILL_ID_COMBO_RESERVED_804, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_805
		defineSkill(SKILL_ID_COMBO_RESERVED_805, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_806
		defineSkill(SKILL_ID_COMBO_RESERVED_806, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_807
		defineSkill(SKILL_ID_COMBO_RESERVED_807, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_808
		defineSkill(SKILL_ID_COMBO_RESERVED_808, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_RESERVED_809
		defineSkill(SKILL_ID_COMBO_RESERVED_809, function() {

			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)アースクエイク
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_QUAKE
		defineSkill(SKILL_ID_EARTH_QUAKE, function() {

			this.name = "(仮)アースクエイク";
			this.kana = "アアスクエイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

		}),

		// ----------------------------------------------------------------
		// マグマイラプション
		// ----------------------------------------------------------------
		// SKILL_ID_MAGMA_ILLUPTION
		defineSkill(SKILL_ID_MAGMA_ILLUPTION, function() {

			this.name = "マグマイラプション";
			this.kana = "マクマイラフシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 450 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 11000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)精霊
		// ----------------------------------------------------------------
		// SKILL_ID_SERE
		defineSkill(SKILL_ID_SERE, function() {

			this.name = "(仮)精霊";
			this.kana = "セイレイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 精霊(モード)
		// ----------------------------------------------------------------
		// SKILL_ID_SERE_MODE
		defineSkill(SKILL_ID_SERE_MODE, function() {

			this.name = "精霊(モード)";
			this.kana = "セイレイモオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// (仮)精霊(補助スキル)
		// ----------------------------------------------------------------
		// SKILL_ID_SERE_SUPPORT_SKILL
		defineSkill(SKILL_ID_SERE_SUPPORT_SKILL, function() {

			this.name = "(仮)精霊(補助スキル)";
			this.kana = "セイレイホシヨスキル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// SホムのLv(パイロ用)
		// ----------------------------------------------------------------
		// SKILL_ID_HOMLV_FOR_PYROCLASTIC
		defineSkill(SKILL_ID_HOMLV_FOR_PYROCLASTIC, function() {

			this.name = "SホムのLv(パイロ用)";
			this.kana = "エスホムノレヘル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// パイロクラスティック(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_PYROCLASTIC
		defineSkill(SKILL_ID_PYROCLASTIC, function() {

			this.name = "パイロクラスティック(Sホム)";
			this.kana = "ハイロクラステイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 8 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// オーバードブースト(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_OVERED_BOOST
		defineSkill(SKILL_ID_OVERED_BOOST, function() {

			this.name = "オーバードブースト(Sホム)";
			this.kana = "オオハアトフウスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)グラニティックアーマー(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_GRANITIC_ARMOR
		defineSkill(SKILL_ID_GRANITIC_ARMOR, function() {

			this.name = "(仮)グラニティックアーマー(Sホム)";
			this.kana = "クラニテイツクアアマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)ペインキラー(Sホム)
		// ----------------------------------------------------------------
		// SKILL_ID_PAIN_KILLER
		defineSkill(SKILL_ID_PAIN_KILLER, function() {

			this.name = "(仮)ペインキラー(Sホム)";
			this.kana = "ヘインキラア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * Math.floor(skillLv / 2);
			}

		}),

		// ----------------------------------------------------------------
		// ディフェンス(ホム)
		// ----------------------------------------------------------------
		// SKILL_ID_DEFENCE
		defineSkill(SKILL_ID_DEFENCE, function() {

			this.name = "ディフェンス(ホム)";
			this.kana = "テイフエンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

		}),

		// ----------------------------------------------------------------
		// 閃光連撃終了直後状態(約1.6秒のATK+状態)
		// ----------------------------------------------------------------
		// SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI
		defineSkill(SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, function() {

			this.name = "閃光連撃終了直後状態(ATK+状態)";
			this.kana = "センコウレンケキシユウリヨウチヨクコシヨウタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
