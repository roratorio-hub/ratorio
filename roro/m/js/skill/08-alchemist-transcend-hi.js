/**
 * スキル定義 08-alchemist-transcend-hi（SKILL_ID 241–277 / 37 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    SKILL_ID_ACID_TERROR, SKILL_ID_ASSUMPTIO, SKILL_ID_AURA_BLADE, SKILL_ID_BAKURETSU_HADO,
    SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, SKILL_ID_BASILICA, SKILL_ID_BERSERK, SKILL_ID_BIOPLANT,
    SKILL_ID_CHEMICAL_ARMER_CHARGE, SKILL_ID_CHEMICAL_HELM_CHARGE, SKILL_ID_CHEMICAL_SHIELD_CHARGE,
    SKILL_ID_CHEMICAL_WEAPON_CHARGE, SKILL_ID_CONCENTRATION, SKILL_ID_CREATE_DEADLY_POISON, SKILL_ID_DEMONSTRATION,
    SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_FALCON_ASSALT, SKILL_ID_HEAD_CRUSH, SKILL_ID_JOINT_BEAT,
    SKILL_ID_KATAR_KENKYU, SKILL_ID_LEARNING_POTION, SKILL_ID_MAGIC_CRUSHER, SKILL_ID_MAHORYOKU_ZOFUKU,
    SKILL_ID_MEDITATIO, SKILL_ID_METEOR_ASSALT, SKILL_ID_NAPALM_VULKAN, SKILL_ID_ONO_SHUREN, SKILL_ID_PARIYING,
    SKILL_ID_PHARMACY, SKILL_ID_POTION_PITCHER, SKILL_ID_SHARP_SHOOTING, SKILL_ID_SOUL_BREAKER, SKILL_ID_SOUL_DRAIN,
    SKILL_ID_SPHERE_MINE, SKILL_ID_SPIRAL_PIERCE, SKILL_ID_TENTION_RELAX, SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK
} from '../skill.dat.js';

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
		// 爆裂波動(Sノビ)
		// ----------------------------------------------------------------
		// SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE
		defineSkill(SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, function() {

			this.refId = SKILL_ID_BAKURETSU_HADO;
			this.name = "爆裂波動(Sノビ)";
			this.kana = "ハクレツハトウスウハアノオヒス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// オーラブレイド
		// ----------------------------------------------------------------
		// SKILL_ID_AURA_BLADE
		defineSkill(SKILL_ID_AURA_BLADE, function() {

			this.name = "オーラブレイド";
			this.kana = "オオラフレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// パリイング
		// ----------------------------------------------------------------
		// SKILL_ID_PARIYING
		defineSkill(SKILL_ID_PARIYING, function() {

			this.name = "パリイング";
			this.kana = "ハリインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

		// ----------------------------------------------------------------
		// コンセントレイション
		// ----------------------------------------------------------------
		// SKILL_ID_CONCENTRATION
		defineSkill(SKILL_ID_CONCENTRATION, function() {

			this.name = "コンセントレイション";
			this.kana = "コンセントレイシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// テンションリラックス
		// ----------------------------------------------------------------
		// SKILL_ID_TENTION_RELAX
		defineSkill(SKILL_ID_TENTION_RELAX, function() {

			this.name = "テンションリラックス";
			this.kana = "テンシヨンリラツクス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// バーサーク
		// ----------------------------------------------------------------
		// SKILL_ID_BERSERK
		defineSkill(SKILL_ID_BERSERK, function() {

			this.name = "バーサーク";
			this.kana = "ハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// スパイラルピアース
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_PIERCE
		defineSkill(SKILL_ID_SPIRAL_PIERCE, function() {
			this.name = "スパイラルピアース";
			this.kana = "スハイラルヒアアス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 0;
				ratio += 100 + 50 * skillLv;
				// チャージングピアースがONの時、与えるダメージ + 100% x スキルレベル
				ratio = ratio * (1 + option.GetOptionValue(0));
				return ratio;
			}
			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? (1000) : (100 + 200 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ヘッドクラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_HEAD_CRUSH
		defineSkill(SKILL_ID_HEAD_CRUSH, function() {

			this.name = "ヘッドクラッシュ";
			this.kana = "ヘツトクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 23;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ジョイントビート
		// ----------------------------------------------------------------
		// SKILL_ID_JOINT_BEAT
		defineSkill(SKILL_ID_JOINT_BEAT, function() {

			this.name = "ジョイントビート";
			this.kana = "シヨイントヒイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * Math.floor((skillLv + 1) / 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

		}),

		// ----------------------------------------------------------------
		// カタール研究
		// ----------------------------------------------------------------
		// SKILL_ID_KATAR_KENKYU
		defineSkill(SKILL_ID_KATAR_KENKYU, function() {

			this.name = "カタール研究";
			this.kana = "カタアルケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ソウルブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_BREAKER
		defineSkill(SKILL_ID_SOUL_BREAKER, function() {

			this.name = "ソウルブレイカー";
			this.kana = "ソウルフレイカア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 300 + 50 * skillLv;

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メテオアサルト
		// ----------------------------------------------------------------
		// SKILL_ID_METEOR_ASSALT
		defineSkill(SKILL_ID_METEOR_ASSALT, function() {

			this.name = "メテオアサルト";
			this.kana = "メテオアサルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// クリエイトデッドリーポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_DEADLY_POISON
		defineSkill(SKILL_ID_CREATE_DEADLY_POISON, function() {

			this.name = "クリエイトデッドリーポイズン";
			this.kana = "クリエイトテツトリイホイスン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)エンチャントデッドリーポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_ENCHANT_DEADLY_POISON
		defineSkill(SKILL_ID_ENCHANT_DEADLY_POISON, function() {

			this.name = "(仮)エンチャントデッドリーポイズン";
			this.kana = "エンチヤントテツトリイホイスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// アスムプティオ
		// ----------------------------------------------------------------
		// SKILL_ID_ASSUMPTIO
		defineSkill(SKILL_ID_ASSUMPTIO, function() {

			this.name = "アスムプティオ";
			this.kana = "アスムフテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// バジリカ
		// ----------------------------------------------------------------
		// SKILL_ID_BASILICA
		defineSkill(SKILL_ID_BASILICA, function() {

			this.name = "バジリカ";
			this.kana = "ハシリカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 + 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メディタティオ
		// ----------------------------------------------------------------
		// SKILL_ID_MEDITATIO
		defineSkill(SKILL_ID_MEDITATIO, function() {

			this.name = "メディタティオ";
			this.kana = "メテイタテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// トゥルーサイト
		// ----------------------------------------------------------------
		// SKILL_ID_TRUE_SIGHT
		defineSkill(SKILL_ID_TRUE_SIGHT, function() {

			this.name = "トゥルーサイト";
			this.kana = "トウルウサイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 2);
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 30000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ファルコンアサルト
		// ----------------------------------------------------------------
		// SKILL_ID_FALCON_ASSALT
		defineSkill(SKILL_ID_FALCON_ASSALT, function() {

			this.name = "ファルコンアサルト";
			this.kana = "フアルコンアサルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
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
		// シャープシューティング
		// ----------------------------------------------------------------
		// SKILL_ID_SHARP_SHOOTING
		defineSkill(SKILL_ID_SHARP_SHOOTING, function() {

			this.name = "シャープシューティング";
			this.kana = "シヤアフシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// ウィンドウォーク
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_WALK
		defineSkill(SKILL_ID_WIND_WALK, function() {

			this.name = "ウィンドウォーク";
			this.kana = "ウイントウオオク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1600 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 130000, 160000, 190000, 220000, 250000, 280000, 310000, 340000, 370000, 400000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ソウルドレイン
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_DRAIN
		defineSkill(SKILL_ID_SOUL_DRAIN, function() {

			this.name = "ソウルドレイン";
			this.kana = "ソウルトレイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// マジッククラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_CRUSHER
		defineSkill(SKILL_ID_MAGIC_CRUSHER, function() {

			this.name = "マジッククラッシャー";
			this.kana = "マシツククラツシヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

		}),

		// ----------------------------------------------------------------
		// 魔法力増幅
		// ----------------------------------------------------------------
		// SKILL_ID_MAHORYOKU_ZOFUKU
		defineSkill(SKILL_ID_MAHORYOKU_ZOFUKU, function() {

			this.name = "魔法力増幅";
			this.kana = "マホウリヨクソウフク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ナパームバルカン
		// ----------------------------------------------------------------
		// SKILL_ID_NAPALM_VULKAN
		defineSkill(SKILL_ID_NAPALM_VULKAN, function() {

			this.name = "ナパームバルカン";
			this.kana = "ナハアムハルカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

];
