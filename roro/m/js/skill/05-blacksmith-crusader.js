/**
 * スキル定義 05-blacksmith-crusader（SKILL_ID 135–166 / 32 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    SKILL_ID_ADRENALINE_RUSH, SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_BUKI_KENKYU, SKILL_ID_BUKI_SHURI, SKILL_ID_DEBOTION,
    SKILL_ID_DEFENDER, SKILL_ID_FAITH, SKILL_ID_GRAND_CROSS, SKILL_ID_HAMMER_FALL, SKILL_ID_HILT_BINDING,
    SKILL_ID_HOLY_CROSS, SKILL_ID_KEN_SEISAKU, SKILL_ID_KNUCKLE_SEISAKU, SKILL_ID_KOSEKI_HAKKEN,
    SKILL_ID_KOTETSU_SEIZO, SKILL_ID_MACE_SEISAKU, SKILL_ID_MAXIMIZE_POWER, SKILL_ID_ONO_SEISAKU,
    SKILL_ID_ORIDEOCON_KENKYU, SKILL_ID_OVER_TRUST, SKILL_ID_PROVIDENCE, SKILL_ID_REFLECT_SHIELD,
    SKILL_ID_RYOTEKEN_SEISAKU, SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_SHIELD_CHARGE, SKILL_ID_SKIN_TEMPERING,
    SKILL_ID_SPEAR_QUICKEN, SKILL_ID_TANKEN_SEISAKU, SKILL_ID_TETSU_SEIZO, SKILL_ID_WEAPON_PERFECTION,
    SKILL_ID_YARI_SEISAKU, SKILL_ID_ZOKUSEISEKI_SEIZO
} from '../skill.dat.js';

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
		// フェイス
		// ----------------------------------------------------------------
		// SKILL_ID_FAITH
		defineSkill(SKILL_ID_FAITH, function() {

			this.name = "フェイス";
			this.kana = "フエイス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オートガード
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_GUARD_OLD
		defineSkill(SKILL_ID_AUTO_GUARD_OLD, function() {

			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シールドチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHARGE
		defineSkill(SKILL_ID_SHIELD_CHARGE, function() {

			this.name = "シールドチャージ";
			this.kana = "シイルトチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シールドブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_BOOMERANG
		defineSkill(SKILL_ID_SHIELD_BOOMERANG, function() {

			this.name = "シールドブーメラン";
			this.kana = "シイルトフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// リフレクトシールド
		// ----------------------------------------------------------------
		// SKILL_ID_REFLECT_SHIELD
		defineSkill(SKILL_ID_REFLECT_SHIELD, function() {

			this.name = "リフレクトシールド";
			this.kana = "リフレクトシイルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ホーリークロス
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_CROSS
		defineSkill(SKILL_ID_HOLY_CROSS, function() {

			this.name = "ホーリークロス";
			this.kana = "ホオリイクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// グランドクロス
		// ----------------------------------------------------------------
		// SKILL_ID_GRAND_CROSS
		defineSkill(SKILL_ID_GRAND_CROSS, function() {

			this.name = "グランドクロス";
			this.kana = "クラントクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 7 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// ディボーション
		// ----------------------------------------------------------------
		// SKILL_ID_DEBOTION
		defineSkill(SKILL_ID_DEBOTION, function() {

			this.name = "ディボーション";
			this.kana = "テイホオシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// プロヴィデンス
		// ----------------------------------------------------------------
		// SKILL_ID_PROVIDENCE
		defineSkill(SKILL_ID_PROVIDENCE, function() {

			this.name = "プロヴィデンス";
			this.kana = "フロウイテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// ディフェンダー
		// ----------------------------------------------------------------
		// SKILL_ID_DEFENDER
		defineSkill(SKILL_ID_DEFENDER, function() {

			this.name = "ディフェンダー";
			this.kana = "テイフエンタア";
			this.maxLv = 5;
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
		// スピアクイッケン
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_QUICKEN
		defineSkill(SKILL_ID_SPEAR_QUICKEN, function() {

			this.name = "スピアクイッケン";
			this.kana = "スヒアクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

		}),

];
