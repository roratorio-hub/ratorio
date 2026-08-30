/**
 * スキル定義 merchant/4b-genetic（20 件 / SKILL_ID 720〜896 の中から職業ツリーで再抽出）
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
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_BAKUDAN_SEIZO, SKILL_ID_BLOOD_SUCKER, SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_CART_CANNON,
    SKILL_ID_CART_KAIZO, SKILL_ID_CART_TORNADO, SKILL_ID_CHANGE_MATERIAL, SKILL_ID_CRAZY_WEED, SKILL_ID_DEMONIC_FIRE,
    SKILL_ID_FIRE_EXPANSION, SKILL_ID_HELLS_PLANT, SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_ILLUSION_DOOPING,
    SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_MIX_COOKING, SKILL_ID_SLING_ITEM, SKILL_ID_SPECIAL_PHARMACY,
    SKILL_ID_SPORE_EXPLOSION, SKILL_ID_THORN_TRAP, SKILL_ID_THORN_WALL
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 剣鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_KEN_SHUREN_GENETIC
		defineSkill(SKILL_ID_KEN_SHUREN_GENETIC, function() {

			this.name = "剣鍛錬";
			this.kana = "ケンシユウレンシエネテイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カート改造
		// ----------------------------------------------------------------
		// SKILL_ID_CART_KAIZO
		defineSkill(SKILL_ID_CART_KAIZO, function() {

			this.name = "カート改造";
			this.kana = "カアトカイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カートトルネード
		// ----------------------------------------------------------------
		// SKILL_ID_CART_TORNADO
		defineSkill(SKILL_ID_CART_TORNADO, function() {
			this.name = "カートトルネード";
			this.kana = "カアトトルネエト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 1000, 1000, 500, 500, 200, 200, 200, 200, 200, 200][skillLv];
			}

		}),

		// ----------------------------------------------------------------
		// カートキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_CART_CANNON
		defineSkill(SKILL_ID_CART_CANNON, function() {

			this.name = "カートキャノン";
			this.kana = "カアトキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powCart = 0;
				var powInt = 0;

				// 基本式
				pow = 60 * skillLv;
				powCart = 50 * Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				powInt = charaDataManger.GetCharaInt() / 40;
				pow += Math.floor(powCart * powInt);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 改造カートブースト
		// ----------------------------------------------------------------
		// SKILL_ID_CART_BOOST_GENETIC
		defineSkill(SKILL_ID_CART_BOOST_GENETIC, function() {

			this.name = "改造カートブースト";
			this.kana = "カアトフウストシエネテイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4 + 16 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// チェンジマテリアル
		// ----------------------------------------------------------------
		// SKILL_ID_CHANGE_MATERIAL
		defineSkill(SKILL_ID_CHANGE_MATERIAL, function() {

			this.name = "チェンジマテリアル";
			this.kana = "チエンシマテリアル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// スリングアイテム
		// ----------------------------------------------------------------
		// SKILL_ID_SLING_ITEM
		defineSkill(SKILL_ID_SLING_ITEM, function() {

			this.name = "スリングアイテム";
			this.kana = "スリンクアイテム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// スペシャルファーマシー
		// ----------------------------------------------------------------
		// SKILL_ID_SPECIAL_PHARMACY
		defineSkill(SKILL_ID_SPECIAL_PHARMACY, function() {

			this.name = "スペシャルファーマシー";
			this.kana = "スヘシヤルフアアマシイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

		}),

		// ----------------------------------------------------------------
		// ミックスクッキング
		// ----------------------------------------------------------------
		// SKILL_ID_MIX_COOKING
		defineSkill(SKILL_ID_MIX_COOKING, function() {

			this.name = "ミックスクッキング";
			this.kana = "ミツクスクツキンク";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -30 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 爆弾製造
		// ----------------------------------------------------------------
		// SKILL_ID_BAKUDAN_SEIZO
		defineSkill(SKILL_ID_BAKUDAN_SEIZO, function() {

			this.name = "爆弾製造";
			this.kana = "ハクタンセイソウ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -30 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ソーントラップ
		// ----------------------------------------------------------------
		// SKILL_ID_THORN_TRAP
		defineSkill(SKILL_ID_THORN_TRAP, function() {

			this.name = "ソーントラップ";
			this.kana = "ソオントラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ソーンウォール
		// ----------------------------------------------------------------
		// SKILL_ID_THORN_WALL
		defineSkill(SKILL_ID_THORN_WALL, function() {

			this.name = "ソーンウォール";
			this.kana = "ソオンウオオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// クレイジーウィード
		// ----------------------------------------------------------------
		// SKILL_ID_CRAZY_WEED
		defineSkill(SKILL_ID_CRAZY_WEED, function() {

			this.name = "クレイジーウィード";
			this.kana = "クレイシイウイイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 100 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 500 * Math.floor((skillLv - 1) / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// ブラッドサッカー
		// ----------------------------------------------------------------
		// SKILL_ID_BLOOD_SUCKER
		defineSkill(SKILL_ID_BLOOD_SUCKER, function() {

			this.name = "ブラッドサッカー";
			this.kana = "フタツトサツカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ヘルズプラント
		// ----------------------------------------------------------------
		// SKILL_ID_HELLS_PLANT
		defineSkill(SKILL_ID_HELLS_PLANT, function() {

			this.name = "ヘルズプラント";
			this.kana = "ヘルスフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC; // なぜか魔法フラグ
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ハウリングオブマンドラゴラ
		// ----------------------------------------------------------------
		// SKILL_ID_HOWLING_OF_MANDRAGORA
		defineSkill(SKILL_ID_HOWLING_OF_MANDRAGORA, function() {

			this.name = "ハウリングオブマンドラゴラ";
			this.kana = "ハウリンクオフマントラコラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12000 - 2000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 * Math.floor(skillLv / 2);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -4000 + 4000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スポアエクスプロージョン
		// ----------------------------------------------------------------
		// SKILL_ID_SPORE_EXPLOSION
		defineSkill(SKILL_ID_SPORE_EXPLOSION, function() {

			this.name = "スポアエクスプロージョン";
			this.kana = "スホアエクスフロオシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// デモニックファイアー
		// ----------------------------------------------------------------
		// SKILL_ID_DEMONIC_FIRE
		defineSkill(SKILL_ID_DEMONIC_FIRE, function() {
			this.name = "デモニックファイアー";
			this.kana = "テモニツクフアイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)ファイアーエクスパンション(Lv5)
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_EXPANSION
		defineSkill(SKILL_ID_FIRE_EXPANSION, function() {

			this.name = "(×)ファイアーエクスパンション(Lv5)";
			this.kana = "フアイアエクスハンシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// イリュージョンドーピング
		// ----------------------------------------------------------------
		// SKILL_ID_ILLUSION_DOOPING
		defineSkill(SKILL_ID_ILLUSION_DOOPING, function() {

			this.name = "イリュージョンドーピング";
			this.kana = "イリユウシヨントオヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv;

				}

				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

];
