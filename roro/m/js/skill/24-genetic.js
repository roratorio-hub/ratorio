/**
 * スキル定義 24-genetic（SKILL_ID 720–756 / 37 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP } from '../const/EnumItemKind.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, n_B_TAISEI
} from '../mobconfplayer.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_AUTO_WUG, SKILL_ID_BAKUDAN_SEIZO, SKILL_ID_BLOOD_SUCKER, SKILL_ID_CANCEL_EDP_POISON_ATTACK,
    SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_CART_CANNON, SKILL_ID_CART_KAIZO, SKILL_ID_CART_TORNADO,
    SKILL_ID_CHANGE_MATERIAL, SKILL_ID_COUNT_OF_RG_FOR_BANDING, SKILL_ID_CRAZY_WEED, SKILL_ID_DEMONIC_FIRE,
    SKILL_ID_DOUBLE_CASTING, SKILL_ID_FIRE_EXPANSION, SKILL_ID_GRAHAM_LIGHT,
    SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO, SKILL_ID_HELLS_PLANT, SKILL_ID_HOWLING_OF_MANDRAGORA,
    SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_MADOGEAR, SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL,
    SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, SKILL_ID_MIRIAM_LIGHT, SKILL_ID_MIX_COOKING,
    SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL, SKILL_ID_SELF_DESTRUCTION, SKILL_ID_SELF_DESTRUCTION_MAX,
    SKILL_ID_SEVERE_RAINSTORM, SKILL_ID_SEVERE_RAINSTORM_EX, SKILL_ID_SHIELD_SPELL_ATK_PLUS,
    SKILL_ID_SHIELD_SPELL_DEF_PLUS, SKILL_ID_SHIELD_SPELL_REFLECT, SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE,
    SKILL_ID_SLING_ITEM, SKILL_ID_SPECIAL_PHARMACY, SKILL_ID_SPORE_EXPLOSION, SKILL_ID_THORN_TRAP,
    SKILL_ID_THORN_WALL, SKILL_ID_ZENKI_CHUNYU
} from '../skill.dat.js';

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
		// 魔導ギア
		// ----------------------------------------------------------------
		// SKILL_ID_MADOGEAR
		defineSkill(SKILL_ID_MADOGEAR, function() {

			this.name = "魔導ギア";
			this.kana = "マトウキア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// セルフディストラクション(HPSP固定)
		// ----------------------------------------------------------------
		// SKILL_ID_SELF_DESTRUCTION_MAX
		defineSkill(SKILL_ID_SELF_DESTRUCTION_MAX, function() {

			this.refId = SKILL_ID_SELF_DESTRUCTION;
			this.name = "セルフディストラクション(HPSP固定)";
			this.kana = "セルフテイストラクシヨンコテイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// デュプレライト(物理) グレイアムライト
		// ----------------------------------------------------------------
		// SKILL_ID_GRAHAM_LIGHT
		defineSkill(SKILL_ID_GRAHAM_LIGHT, function() {

			this.name = "グレイアムライト";
			this.kana = "クレイアムライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// デュプレライト(魔法) ミリアムライト
		// ----------------------------------------------------------------
		// SKILL_ID_MIRIAM_LIGHT
		defineSkill(SKILL_ID_MIRIAM_LIGHT, function() {

			this.name = "ミリアムライト";
			this.kana = "ミリアムライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// AS用設定魔法
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL
		defineSkill(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, function() {

			this.name = "AS用設定魔法";
			this.kana = "オウトスヘルヨウセツテイマホウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シールドスペル(ATK+)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SPELL_ATK_PLUS
		defineSkill(SKILL_ID_SHIELD_SPELL_ATK_PLUS, function() {

			this.name = "シールドスペル(ATK+)";
			this.kana = "シイルトスヘルアタツクフラス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シールドスペル(DEF+)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SPELL_DEF_PLUS
		defineSkill(SKILL_ID_SHIELD_SPELL_DEF_PLUS, function() {

			this.name = "シールドスペル(DEF+)";
			this.kana = "シイルトスヘルテフフラス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ディフェンダーの習得Lv(プレスティージ用)
		// ----------------------------------------------------------------
		// SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE
		defineSkill(SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE, function() {

			this.name = "ディフェンダーの習得Lv(プレスティージ用)";
			this.kana = "テイフエンタアノシユウトクレヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ASS用設定魔法
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL
		defineSkill(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL, function() {

			this.name = "ASS用設定魔法";
			this.kana = "オウトシヤトウスヘルヨウセツテイマホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 全気注入
		// ----------------------------------------------------------------
		// SKILL_ID_ZENKI_CHUNYU
		defineSkill(SKILL_ID_ZENKI_CHUNYU, function() {

			this.name = "全気注入";
			this.kana = "センキチユウニユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// セージの魂(魔法の習得Lv)
		// ----------------------------------------------------------------
		// SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL
		defineSkill(SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL, function() {

			this.name = "セージの魂(魔法の習得Lv)";
			this.kana = "セエシノタマシイマホウノシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ハルシネーション効果後のASPD減
		// ----------------------------------------------------------------
		// SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO
		defineSkill(SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO, function() {

			this.name = "ハルシネーション効果後のASPD減";
			this.kana = "ハルシネエシヨンコウカコノアタツクスヒイトケン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 自動狼
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_WUG
		defineSkill(SKILL_ID_AUTO_WUG, function() {

			this.name = "自動狼";
			this.kana = "シトウオオカミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// (特殊)EDP毒部分を消す[通常はoff]
		// ----------------------------------------------------------------
		// SKILL_ID_CANCEL_EDP_POISON_ATTACK
		defineSkill(SKILL_ID_CANCEL_EDP_POISON_ATTACK, function() {

			this.name = "(特殊)EDP毒部分を消す[通常はoff]";
			this.kana = "エンチヤントテツトリイホイスントクフフンヲケス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シビアレインストーム(特殊)
		// ----------------------------------------------------------------
		// SKILL_ID_SEVERE_RAINSTORM_EX
		defineSkill(SKILL_ID_SEVERE_RAINSTORM_EX, function() {
			this.refId = SKILL_ID_SEVERE_RAINSTORM;
			this.name = "シビアレインストーム(特殊)";
			this.kana = "シヒアレインストオムトクシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL, ITEM_KIND_BOW].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				if ([ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon)) {
					ratio = 200 * skillLv;
				} else {
					ratio = 100 * skillLv;
				}
				ratio += Math.floor((option.GetOptionValue(0) + option.GetOptionValue(1)) / 2);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.ground_installation = true;
			this.LifeTime = function(skillLv, charaData) {
				return 3600;
			}
			this.damageInterval = function(skillLv) {
				return 300;
			}
		}),

		// ----------------------------------------------------------------
		// ロイヤルガードの人数(バンディング用)
		// ----------------------------------------------------------------
		// SKILL_ID_COUNT_OF_RG_FOR_BANDING
		defineSkill(SKILL_ID_COUNT_OF_RG_FOR_BANDING, function() {

			this.name = "ロイヤルガードの人数(バンディング用)";
			this.kana = "ロイヤルカアトノニンスウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ダブルキャスティング
		// ----------------------------------------------------------------
		// SKILL_ID_DOUBLE_CASTING
		defineSkill(SKILL_ID_DOUBLE_CASTING, function() {

			this.name = "ダブルキャスティング";
			this.kana = "タフルキヤステインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 90000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// シールドスペル(反射)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SPELL_REFLECT
		defineSkill(SKILL_ID_SHIELD_SPELL_REFLECT, function() {

			this.name = "シールドスペル(反射)";
			this.kana = "シイルトスヘルハンシヤ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
