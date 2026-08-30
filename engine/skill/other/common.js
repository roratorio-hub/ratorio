/**
 * スキル定義 other/common（33 件 / SKILL_ID 0〜1001 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
	SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_SHOZIGENKAIRYO_ZOKA_R,
	SKILL_ID_CHIMEITEKINA_KIZU, SKILL_ID_ATK_FOR_IRON_NAIL, SKILL_ID_HELL_JUDGEMENT,
    SKILL_ID_313, SKILL_ID_314, SKILL_ID_315, SKILL_ID_316, SKILL_ID_323, SKILL_ID_ALCHEMY,
    SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT, SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE, SKILL_ID_COMBO_RESERVED_803,
    SKILL_ID_COMBO_RESERVED_804, SKILL_ID_COMBO_RESERVED_805, SKILL_ID_COMBO_RESERVED_806,
    SKILL_ID_COMBO_RESERVED_807, SKILL_ID_COMBO_RESERVED_808, SKILL_ID_COMBO_RESERVED_809, SKILL_ID_DARK_CROSS,
    SKILL_ID_DARK_STRIKE, SKILL_ID_EARTH_QUAKE, SKILL_ID_FULLSLOT, SKILL_ID_KATAMARI_SEIZO, SKILL_ID_MARIAGE_STATUS,
    SKILL_ID_OKANE_SEIZO, SKILL_ID_POTION_SYNAPSE, SKILL_ID_PULSE_STRIKE, SKILL_ID_SERE, SKILL_ID_SERE_MODE,
    SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SHINDAFURI, SKILL_ID_TOMAHAWKNAGE, SKILL_ID_TUZYO_KOGEKI,
    SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND, SKILL_ID_TUZYO_KOGEKI_CALC_LEFT, SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT,
	SKILL_ID_ODINNO_CHIKARA, SKILL_ID_CRITICAL_WOUNDS, SKILL_ID_STONE_SKIN, SKILL_ID_VAMPIRE_GIFT,
	SKILL_ID_SNOW_FLIP, SKILL_ID_SEKAIZYUNO_HOKORI, SKILL_ID_PISHARI_HERB, SKILL_ID_PEONY_MAMY
} from "../skill.dat.js";

export const skills = [

		// ----------------------------------------------------------------
		// ピオニーマミー
		// ----------------------------------------------------------------
		// SKILL_ID_PEONY_MAMY
		defineSkill(SKILL_ID_PEONY_MAMY, function() {

			this.name = "ピオニーマミー";
			this.kana = "ヒオニイマミイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

		// ----------------------------------------------------------------
		// ぴしゃりハーブ
		// ----------------------------------------------------------------
		// SKILL_ID_PISHARI_HERB
		defineSkill(SKILL_ID_PISHARI_HERB, function() {

			this.name = "ぴしゃりハーブ";
			this.kana = "ヒシヤリハアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

		// ----------------------------------------------------------------
		// 世界樹のほこり
		// ----------------------------------------------------------------
		// SKILL_ID_SEKAIZYUNO_HOKORI
		defineSkill(SKILL_ID_SEKAIZYUNO_HOKORI, function() {

			this.name = "世界樹のほこり";
			this.kana = "セカイシユノホコリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

		// ----------------------------------------------------------------
		// スノーフリップ
		// ----------------------------------------------------------------
		// SKILL_ID_SNOW_FLIP
		defineSkill(SKILL_ID_SNOW_FLIP, function() {

			this.name = "スノーフリップ";
			this.kana = "スノオフリツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

		// ----------------------------------------------------------------
		// ヴァンパイアギフト
		// ----------------------------------------------------------------
		// SKILL_ID_VAMPIRE_GIFT
		defineSkill(SKILL_ID_VAMPIRE_GIFT, function() {

			this.name = "(△)ヴァンパイアギフト";
			this.kana = "ウアンハイアキフト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ストーンスキン
		// ----------------------------------------------------------------
		// SKILL_ID_STONE_SKIN
		defineSkill(SKILL_ID_STONE_SKIN, function() {

			this.name = "ストーンスキン";
			this.kana = "ストオンスキン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

		// ----------------------------------------------------------------
		// クリティカルウーンズ
		// ----------------------------------------------------------------
		// SKILL_ID_CRITICAL_WOUNDS
		defineSkill(SKILL_ID_CRITICAL_WOUNDS, function() {

			this.name = "クリティカルウーンズ";
			this.kana = "クリテイカルウウンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

		// ----------------------------------------------------------------
		// オーディンの力
		// ----------------------------------------------------------------
		// SKILL_ID_ODINNO_CHIKARA
		defineSkill(SKILL_ID_ODINNO_CHIKARA, function() {

			this.name = "オーディンの力";
			this.kana = "オオテインノチカラ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (40 + 30 * skillLv);
			}
		}),

		// ----------------------------------------------------------------
		// 致命的な傷
		// ----------------------------------------------------------------
		// SKILL_ID_CHIMEITEKINA_KIZU
		defineSkill(SKILL_ID_CHIMEITEKINA_KIZU, function() {

			this.name = "致命的な傷";
			this.kana = "チメイテキナキス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// アイアンネイル用ATK+
		// ----------------------------------------------------------------
		// SKILL_ID_ATK_FOR_IRON_NAIL
		defineSkill(SKILL_ID_ATK_FOR_IRON_NAIL, function() {

			this.name = "アイアンネイル用ATK+";
			this.kana = "アイアンネイルヨウアタツクフラス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヘルジャッジメント
		// ----------------------------------------------------------------
		// SKILL_ID_HELL_JUDGEMENT
		defineSkill(SKILL_ID_HELL_JUDGEMENT, function() {

			this.name = "ヘルジャッジメント";
			this.kana = "ヘルシヤツシメント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 基本スキル
		// ----------------------------------------------------------------
		// SKILL_ID_KIHON_SKILL
		defineSkill(SKILL_ID_KIHON_SKILL, function() {

			this.name = "基本スキル";
			this.kana = "キホンスキル";
			this.maxLv = 9;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 通常攻撃
		// ----------------------------------------------------------------
		// SKILL_ID_TUZYO_KOGEKI
		defineSkill(SKILL_ID_TUZYO_KOGEKI, function() {

			this.name = "通常攻撃";
			this.kana = "ツウシヨウコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
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
		// 死んだふり
		// ----------------------------------------------------------------
		// SKILL_ID_SHINDAFURI
		defineSkill(SKILL_ID_SHINDAFURI, function() {

			this.name = "死んだふり";
			this.kana = "シンタフリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}
		}),

		// ----------------------------------------------------------------
		// 応急手当
		// ----------------------------------------------------------------
		// SKILL_ID_OKYU_TEATE
		defineSkill(SKILL_ID_OKYU_TEATE, function() {

			this.name = "応急手当";
			this.kana = "オウキユウテアテ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}
		}),

		// ----------------------------------------------------------------
		// 所持限界量増加Ｒ
		// ----------------------------------------------------------------
		// SKILL_ID_SHOZIGENKAIRYO_ZOKA_R
		defineSkill(SKILL_ID_SHOZIGENKAIRYO_ZOKA_R, function() {

			this.refId = SKILL_ID_SHOZIGENKAIRYO_ZOKA;
			this.name = "所持限界量増加Ｒ";
			this.kana = "シヨシケンカイリヨウソウカアアル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// お金製造 #未実装スキル
		// ----------------------------------------------------------------
		// SKILL_ID_OKANE_SEIZO
		defineSkill(SKILL_ID_OKANE_SEIZO, function() {

			this.name = "お金製造";
			this.kana = "オカネセイソウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 塊製造 #未実装スキル
		// ----------------------------------------------------------------
		// SKILL_ID_KATAMARI_SEIZO
		defineSkill(SKILL_ID_KATAMARI_SEIZO, function() {

			this.name = "塊製造";
			this.kana = "カタマリセイソウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// アルケミー #未実装スキル
		// ----------------------------------------------------------------
		// SKILL_ID_ALCHEMY
		defineSkill(SKILL_ID_ALCHEMY, function() {

			this.name = "アルケミー";
			this.kana = "アルケミイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ポーションシノプス #未実装スキル
		// ----------------------------------------------------------------
		// SKILL_ID_POTION_SYNAPSE
		defineSkill(SKILL_ID_POTION_SYNAPSE, function() {

			this.name = "ポーションシノプス";
			this.kana = "ホオシヨンシノフス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// トマホーク投げ
		// ----------------------------------------------------------------
		// SKILL_ID_TOMAHAWKNAGE
		defineSkill(SKILL_ID_TOMAHAWKNAGE, function() {

			this.name = "トマホーク投げ";
			this.kana = "トマホオクナケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// パルスストライク
		// ----------------------------------------------------------------
		// SKILL_ID_PULSE_STRIKE
		defineSkill(SKILL_ID_PULSE_STRIKE, function() {

			this.name = "パルスストライク";
			this.kana = "ハルスストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 結婚ステータス-1付与
		// ----------------------------------------------------------------
		// SKILL_ID_MARIAGE_STATUS
		defineSkill(SKILL_ID_MARIAGE_STATUS, function() {

			this.name = "結婚ステータス-1付与";
			this.kana = "ケツコンステエタスフヨ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ダークストライク
		// ----------------------------------------------------------------
		// SKILL_ID_DARK_STRIKE
		defineSkill(SKILL_ID_DARK_STRIKE, function() {

			this.name = "ダークストライク";
			this.kana = "タアクストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 6 * Math.floor((skillLv + 1) / 2) - 4
						* ((skillLv + 1) % 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * Math.floor((skillLv + 1) / 2) - 200
						* ((skillLv + 1) % 2);
			}

		}),

		// ----------------------------------------------------------------
		// 予約313
		// ----------------------------------------------------------------
		// SKILL_ID_313
		defineSkill(SKILL_ID_313, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約314
		// ----------------------------------------------------------------
		// SKILL_ID_314
		defineSkill(SKILL_ID_314, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約315
		// ----------------------------------------------------------------
		// SKILL_ID_315
		defineSkill(SKILL_ID_315, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約316
		// ----------------------------------------------------------------
		// SKILL_ID_316
		defineSkill(SKILL_ID_316, function() {

			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 予約323
		// ----------------------------------------------------------------
		// SKILL_ID_323
		defineSkill(SKILL_ID_323, function() {

			this.name = "(現在この欄は未使用)";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

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
		// ダーククロス
		// ----------------------------------------------------------------
		// SKILL_ID_DARK_CROSS
		defineSkill(SKILL_ID_DARK_CROSS, function() {

			this.name = "ダーククロス";
			this.kana = "タアククロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT
		defineSkill(SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT, function() {

			this.name = "(仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)";
			this.kana = "コンホケイサンシヨイント";
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
		// (仮)コンボ計算(SpP→ｿﾆｯｸ)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE
		defineSkill(SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE, function() {

			this.name = "(仮)コンボ計算(SpP→ｿﾆｯｸ)";
			this.kana = "コンホケイサンスハイラルヒアアス";
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
		// フルスロットル
		// ----------------------------------------------------------------
		// SKILL_ID_FULLSLOT
		defineSkill(SKILL_ID_FULLSLOT, function() {
			this.name = "フルスロットル";
			this.kana = "フルスロツトル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 1;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 600 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 40 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 通常攻撃右手（ダメージ計算用ダミー定義）
		// ----------------------------------------------------------------
		// SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT
		defineSkill(SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT, function() {

			this.name = "通常攻撃";
			this.kana = "ツウシヨウコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// 通常攻撃左手（ダメージ計算用ダミー定義）
		// ----------------------------------------------------------------
		// SKILL_ID_TUZYO_KOGEKI_CALC_LEFT
		defineSkill(SKILL_ID_TUZYO_KOGEKI_CALC_LEFT, function() {

			this.name = "通常攻撃";
			this.kana = "ツウシヨウコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// カタール追撃（ダメージ計算用ダミー定義）
		// ----------------------------------------------------------------
		// SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND
		defineSkill(SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND, function() {

			this.name = "x";
			this.kana = "ン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

];
