/**
 * スキル定義 merchant/4a-mechanic（32 件 / SKILL_ID 540〜811 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { SIZE_ID_LARGE, SIZE_ID_MEDIUM, SIZE_ID_SMALL } from '../../const/EnumSizeId.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, n_B_TAISEI
} from '../../mobconfplayer.js';
import {
    SKILL_ID_ACCELARATION, SKILL_ID_ANALYZE, SKILL_ID_ARMS_CANNON, SKILL_ID_AXE_BOOMERANG, SKILL_ID_AXE_TORNADE,
    SKILL_ID_BOOST_KNUCKLE, SKILL_ID_COLD_THROWER, SKILL_ID_EMERGENCY_COOL, SKILL_ID_FAW_KAIZYO,
    SKILL_ID_FAW_MAGIC_DECOY, SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FLAME_THROWER, SKILL_ID_FRONTSIDE_SLIDE,
    SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_HOVERING, SKILL_ID_INFRARED_SCAN, SKILL_ID_MADOGEAR,
    SKILL_ID_MADOGEAR_LICENSE, SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_MAGNETIC_FIELD, SKILL_ID_MAINFRAME_KAIZO,
    SKILL_ID_NUTRAL_BARRIER, SKILL_ID_ONO_SHUREN_MECHANIC, SKILL_ID_PILE_BUNKER, SKILL_ID_POWER_SWING,
    SKILL_ID_REARSIDE_SLIDE, SKILL_ID_REPEAR, SKILL_ID_SELF_DESTRUCTION, SKILL_ID_SELF_DESTRUCTION_MAX,
    SKILL_ID_SHAPE_SHIFT, SKILL_ID_STEALTH_FIELD, SKILL_ID_VULCAN_ARM
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 斧鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_ONO_SHUREN_MECHANIC
		defineSkill(SKILL_ID_ONO_SHUREN_MECHANIC, function() {

			this.name = "斧鍛錬";
			this.kana = "オノタンレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アックストルネード
		// ----------------------------------------------------------------
		// SKILL_ID_AXE_TORNADE
		defineSkill(SKILL_ID_AXE_TORNADE, function() {

			this.name = "アックストルネード";
			this.kana = "アツクストルネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 6;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アックスブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_AXE_BOOMERANG
		defineSkill(SKILL_ID_AXE_BOOMERANG, function() {

			this.name = "アックスブーメラン";
			this.kana = "アツクスフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// パワースイング
		// ----------------------------------------------------------------
		// SKILL_ID_POWER_SWING
		defineSkill(SKILL_ID_POWER_SWING, function() {

			this.name = "(△)パワースイング";
			this.kana = "ハワアスインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = charaDataManger.GetCharaStr() + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// ベースレベル補正がかからない威力
				pow += 300 + 100 * skillLv;

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(0, 1000 - 200 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// 火と大地の研究
		// ----------------------------------------------------------------
		// SKILL_ID_HITO_DAICHINO_KENKYU
		defineSkill(SKILL_ID_HITO_DAICHINO_KENKYU, function() {

			this.name = "火と大地の研究";
			this.kana = "ヒトタイチノケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// FAW シルバースナイパー
		// ----------------------------------------------------------------
		// SKILL_ID_FAW_SILVER_SNIPER
		defineSkill(SKILL_ID_FAW_SILVER_SNIPER, function() {

			this.name = "FAW シルバースナイパー";
			this.kana = "エフエエタフリユウシルハアスナイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// FAW マジックデコイ
		// ----------------------------------------------------------------
		// SKILL_ID_FAW_MAGIC_DECOY
		defineSkill(SKILL_ID_FAW_MAGIC_DECOY, function() {

			this.name = "FAW マジックデコイ";
			this.kana = "エフエエタフリユウマシツクテコイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv >= 4) ? (45 + 5 * skillLv) : (35 + 5 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// FAW 解体
		// ----------------------------------------------------------------
		// SKILL_ID_FAW_KAIZYO
		defineSkill(SKILL_ID_FAW_KAIZYO, function() {

			this.name = "FAW解体";
			this.kana = "エフエエタフリユウカイタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 魔導ギアライセンス
		// ----------------------------------------------------------------
		// SKILL_ID_MADOGEAR_LICENSE
		defineSkill(SKILL_ID_MADOGEAR_LICENSE, function() {

			this.name = "魔導ギアライセンス";
			this.kana = "マトウキアライセンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ブーストナックル
		// ----------------------------------------------------------------
		// SKILL_ID_BOOST_KNUCKLE
		defineSkill(SKILL_ID_BOOST_KNUCKLE, function() {

			this.name = "ブーストナックル";
			this.kana = "フウストナツクル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 + 100 * skillLv + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// パイルバンカー
		// ----------------------------------------------------------------
		// SKILL_ID_PILE_BUNKER
		defineSkill(SKILL_ID_PILE_BUNKER, function() {

			this.name = "パイルバンカー";
			this.kana = "ハイルハンカア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 100 * skillLv + charaDataManger.GetCharaStr();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7500 - 2500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// バルカンアーム
		// ----------------------------------------------------------------
		// SKILL_ID_VULCAN_ARM
		defineSkill(SKILL_ID_VULCAN_ARM, function() {

			this.name = "バルカンアーム";
			this.kana = "ハルカンアアム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 70 * skillLv + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -1000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// フレイムスローワー
		// ----------------------------------------------------------------
		// SKILL_ID_FLAME_THROWER
		defineSkill(SKILL_ID_FLAME_THROWER, function() {

			this.name = "フレイムスローワー";
			this.kana = "フレイムスロオワア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// コールドスローワー
		// ----------------------------------------------------------------
		// SKILL_ID_COLD_THROWER
		defineSkill(SKILL_ID_COLD_THROWER, function() {

			this.name = "コールドスローワー";
			this.kana = "コオルトスロオワア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アームズキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_ARMS_CANNON
		defineSkill(SKILL_ID_ARMS_CANNON, function() {

			this.name = "(△)アームズキャノン";
			this.kana = "アアムスキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				switch (charaDataManger.GetMobSize()) {
				case SIZE_ID_SMALL:
					pow = 300 + 400 * skillLv;
					break;
				case SIZE_ID_MEDIUM:
					pow = 300 + 350 * skillLv;
					break;
				case SIZE_ID_LARGE:
					pow = 300 + 300 * skillLv;
					break;
				}

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(2000, 500 + 500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return Math.max(500, 2000 - 500 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// アクセラレーション
		// ----------------------------------------------------------------
		// SKILL_ID_ACCELARATION
		defineSkill(SKILL_ID_ACCELARATION, function() {

			this.name = "アクセラレーション";
			this.kana = "アクセラレエシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ホバーリング
		// ----------------------------------------------------------------
		// SKILL_ID_HOVERING
		defineSkill(SKILL_ID_HOVERING, function() {

			this.name = "ホバーリング";
			this.kana = "ホハアリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

		}),

		// ----------------------------------------------------------------
		// フロントサイドスライド
		// ----------------------------------------------------------------
		// SKILL_ID_FRONTSIDE_SLIDE
		defineSkill(SKILL_ID_FRONTSIDE_SLIDE, function() {

			this.name = "フロントサイドスライド";
			this.kana = "フロントサイトスライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// リアサイドスライド
		// ----------------------------------------------------------------
		// SKILL_ID_REARSIDE_SLIDE
		defineSkill(SKILL_ID_REARSIDE_SLIDE, function() {

			this.name = "リアサイドスライド";
			this.kana = "リアサイトスライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		}),

		// ----------------------------------------------------------------
		// メインフレーム改造
		// ----------------------------------------------------------------
		// SKILL_ID_MAINFRAME_KAIZO
		defineSkill(SKILL_ID_MAINFRAME_KAIZO, function() {

			this.name = "メインフレーム改造";
			this.kana = "メインフレエムカイソウ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シェイプシフト
		// ----------------------------------------------------------------
		// SKILL_ID_SHAPE_SHIFT
		defineSkill(SKILL_ID_SHAPE_SHIFT, function() {

			this.name = "シェイプシフト";
			this.kana = "シエイフシフト";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// インフラレッドスキャン
		// ----------------------------------------------------------------
		// SKILL_ID_INFRARED_SCAN
		defineSkill(SKILL_ID_INFRARED_SCAN, function() {

			this.name = "インフラレッドスキャン";
			this.kana = "インフラレツトスキヤン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アナライズ
		// ----------------------------------------------------------------
		// SKILL_ID_ANALYZE
		defineSkill(SKILL_ID_ANALYZE, function() {

			this.name = "アナライズ";
			this.kana = "アナライス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// セルフディストラクション
		// ----------------------------------------------------------------
		// SKILL_ID_SELF_DESTRUCTION
		defineSkill(SKILL_ID_SELF_DESTRUCTION, function() {

			this.name = "セルフディストラクション";
			this.kana = "セルフテイストラクシヨン";
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
		// エマージェンシークール
		// ----------------------------------------------------------------
		// SKILL_ID_EMERGENCY_COOL
		defineSkill(SKILL_ID_EMERGENCY_COOL, function() {

			this.name = "エマージェンシークール";
			this.kana = "エマアシエンシイクウル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// マグネティックフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNETIC_FIELD
		defineSkill(SKILL_ID_MAGNETIC_FIELD, function() {

			this.name = "マグネティックフィールド";
			this.kana = "マクネテイツクフイイルト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ニュートラルバリアー
		// ----------------------------------------------------------------
		// SKILL_ID_NUTRAL_BARRIER
		defineSkill(SKILL_ID_NUTRAL_BARRIER, function() {

			this.name = "ニュートラルバリアー";
			this.kana = "ニユウトラルハリアア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ステルスフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_STEALTH_FIELD
		defineSkill(SKILL_ID_STEALTH_FIELD, function() {

			this.name = "ステルスフィールド";
			this.kana = "ステルスフイイルト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リペア
		// ----------------------------------------------------------------
		// SKILL_ID_REPEAR
		defineSkill(SKILL_ID_REPEAR, function() {

			this.name = "リペア";
			this.kana = "リヘア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 3) ? 20 : (10 + 5 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
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

];
