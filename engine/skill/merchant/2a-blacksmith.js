/**
 * スキル定義 merchant/2a-blacksmith（25 件 / SKILL_ID 135〜850 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_ADRENALINE_RUSH, SKILL_ID_BUKI_KENKYU, SKILL_ID_BUKI_SHURI, SKILL_ID_FAKE_ZENY,
    SKILL_ID_FULL_ADRENALINE_RUSH, SKILL_ID_GREED, SKILL_ID_HAMMER_FALL, SKILL_ID_HILT_BINDING, SKILL_ID_KEN_SEISAKU,
    SKILL_ID_KNUCKLE_SEISAKU, SKILL_ID_KOSEKI_HAKKEN, SKILL_ID_KOTETSU_SEIZO, SKILL_ID_MACE_SEISAKU,
    SKILL_ID_MAXIMIZE_POWER, SKILL_ID_ONO_SEISAKU, SKILL_ID_ORIDEOCON_KENKYU, SKILL_ID_OVER_TRUST,
    SKILL_ID_RYOTEKEN_SEISAKU, SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER, SKILL_ID_SKIN_TEMPERING,
    SKILL_ID_TANKEN_SEISAKU, SKILL_ID_TETSU_SEIZO, SKILL_ID_WEAPON_PERFECTION, SKILL_ID_YARI_SEISAKU,
    SKILL_ID_ZOKUSEISEKI_SEIZO
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 鉄製造
		// ----------------------------------------------------------------
		// SKILL_ID_TETSU_SEIZO
		defineSkill(SKILL_ID_TETSU_SEIZO, function() {

			this.name = "鉄製造";
			this.kana = "テツセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 鋼鉄製造
		// ----------------------------------------------------------------
		// SKILL_ID_KOTETSU_SEIZO
		defineSkill(SKILL_ID_KOTETSU_SEIZO, function() {

			this.name = "鋼鉄製造";
			this.kana = "コウテツセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 属性石製造
		// ----------------------------------------------------------------
		// SKILL_ID_ZOKUSEISEKI_SEIZO
		defineSkill(SKILL_ID_ZOKUSEISEKI_SEIZO, function() {

			this.name = "属性石製造";
			this.kana = "ソクセイセキセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オリデオコン研究
		// ----------------------------------------------------------------
		// SKILL_ID_ORIDEOCON_KENKYU
		defineSkill(SKILL_ID_ORIDEOCON_KENKYU, function() {

			this.name = "オリデオコン研究";
			this.kana = "オリテオコンケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 短剣製作
		// ----------------------------------------------------------------
		// SKILL_ID_TANKEN_SEISAKU
		defineSkill(SKILL_ID_TANKEN_SEISAKU, function() {

			this.name = "短剣製作";
			this.kana = "タンケンセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 剣製作
		// ----------------------------------------------------------------
		// SKILL_ID_KEN_SEISAKU
		defineSkill(SKILL_ID_KEN_SEISAKU, function() {

			this.name = "剣製作";
			this.kana = "ケンセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 両手剣製作
		// ----------------------------------------------------------------
		// SKILL_ID_RYOTEKEN_SEISAKU
		defineSkill(SKILL_ID_RYOTEKEN_SEISAKU, function() {

			this.name = "両手剣製作";
			this.kana = "リヨウテケンセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 斧製作
		// ----------------------------------------------------------------
		// SKILL_ID_ONO_SEISAKU
		defineSkill(SKILL_ID_ONO_SEISAKU, function() {

			this.name = "斧製作";
			this.kana = "オノセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// メイス製作
		// ----------------------------------------------------------------
		// SKILL_ID_MACE_SEISAKU
		defineSkill(SKILL_ID_MACE_SEISAKU, function() {

			this.name = "メイス製作";
			this.kana = "メイスセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ナックル製作
		// ----------------------------------------------------------------
		// SKILL_ID_KNUCKLE_SEISAKU
		defineSkill(SKILL_ID_KNUCKLE_SEISAKU, function() {

			this.name = "ナックル製作";
			this.kana = "ナツクルセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 槍製作
		// ----------------------------------------------------------------
		// SKILL_ID_YARI_SEISAKU
		defineSkill(SKILL_ID_YARI_SEISAKU, function() {

			this.name = "槍製作";
			this.kana = "ヤリセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヒルトバインディング
		// ----------------------------------------------------------------
		// SKILL_ID_HILT_BINDING
		defineSkill(SKILL_ID_HILT_BINDING, function() {

			this.name = "ヒルトバインディング";
			this.kana = "ヒルトハインテインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 鉱石発見
		// ----------------------------------------------------------------
		// SKILL_ID_KOSEKI_HAKKEN
		defineSkill(SKILL_ID_KOSEKI_HAKKEN, function() {

			this.name = "鉱石発見";
			this.kana = "コウセキハツケン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 武器研究
		// ----------------------------------------------------------------
		// SKILL_ID_BUKI_KENKYU
		defineSkill(SKILL_ID_BUKI_KENKYU, function() {

			this.name = "武器研究";
			this.kana = "フキケンキユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 武器修理
		// ----------------------------------------------------------------
		// SKILL_ID_BUKI_SHURI
		defineSkill(SKILL_ID_BUKI_SHURI, function() {

			this.name = "武器修理";
			this.kana = "フキシユウリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// スキンテンパリング
		// ----------------------------------------------------------------
		// SKILL_ID_SKIN_TEMPERING
		defineSkill(SKILL_ID_SKIN_TEMPERING, function() {

			this.name = "スキンテンパリング";
			this.kana = "スキンテンハリンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ハンマーフォール
		// ----------------------------------------------------------------
		// SKILL_ID_HAMMER_FALL
		defineSkill(SKILL_ID_HAMMER_FALL, function() {

			this.name = "ハンマーフォール";
			this.kana = "ハンマアフオオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// アドレナリンラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_ADRENALINE_RUSH
		defineSkill(SKILL_ID_ADRENALINE_RUSH, function() {

			this.name = "アドレナリンラッシュ";
			this.kana = "アトレナリンラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ウェポンパーフェクション
		// ----------------------------------------------------------------
		// SKILL_ID_WEAPON_PERFECTION
		defineSkill(SKILL_ID_WEAPON_PERFECTION, function() {

			this.name = "ウェポンパーフェクション";
			this.kana = "ウエホンハアフエクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 - 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// オーバートラスト
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_TRUST
		defineSkill(SKILL_ID_OVER_TRUST, function() {

			this.name = "オーバートラスト";
			this.kana = "オオハアトラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 - 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// マキシマイズパワー
		// ----------------------------------------------------------------
		// SKILL_ID_MAXIMIZE_POWER
		defineSkill(SKILL_ID_MAXIMIZE_POWER, function() {

			this.name = "マキシマイズパワー";
			this.kana = "マキシマイスハワア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 製作スキルマスター数(達人の斧用)
		// ----------------------------------------------------------------
		// SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER
		defineSkill(SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER, function() {

			this.name = "製作スキルマスター数(達人の斧用)";
			this.kana = "セイサクスキルマスタアスウタツシンノオノヨウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// フルアドレナリンラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_ADRENALINE_RUSH
		defineSkill(SKILL_ID_FULL_ADRENALINE_RUSH, function() {

			this.name = "フルアドレナリンラッシュ";
			this.kana = "フルアトレナリンラツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 64;
			}

		}),

		// ----------------------------------------------------------------
		// グリード
		// ----------------------------------------------------------------
		// SKILL_ID_GREED
		defineSkill(SKILL_ID_GREED, function() {

			this.name = "グリード";
			this.kana = "クリイト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// フェイクゼニー
		// ----------------------------------------------------------------
		// SKILL_ID_FAKE_ZENY
		defineSkill(SKILL_ID_FAKE_ZENY, function() {

			this.name = "フェイクゼニー";
			this.kana = "フエイクセニイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
