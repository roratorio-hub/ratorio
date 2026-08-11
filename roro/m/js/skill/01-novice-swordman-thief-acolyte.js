/**
 * スキル定義 01-novice-swordman-thief-acolyte（SKILL_ID 0–37 / 38 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    SKILL_ID_ANGELUS, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_AUTO_BERSERK, SKILL_ID_BACKSTEP, SKILL_ID_BASH,
    SKILL_ID_BLESSING, SKILL_ID_CURE, SKILL_ID_DEMON_BANE, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DOUBLE_ATTACK,
    SKILL_ID_ENDURE, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU, SKILL_ID_HEAL, SKILL_ID_HIDING, SKILL_ID_HOLY_LIGHT,
    SKILL_ID_HP_KAIFUKURYOKU_KOZYO, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
    SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_KEN_SHUREN, SKILL_ID_KYUSHO_KOGEKI, SKILL_ID_MAGNUM_BREAK,
    SKILL_ID_OKYU_TEATE, SKILL_ID_PNEUMA, SKILL_ID_PROVOKE, SKILL_ID_RUWACH, SKILL_ID_RYOUTKEN_SHUREN,
    SKILL_ID_SHINDAFURI, SKILL_ID_SIGNUM_CRUCIS, SKILL_ID_SOKUDO_GENSHO, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_STEAL,
    SKILL_ID_SUNAMAKI, SKILL_ID_TELEPORT, SKILL_ID_TUZYO_KOGEKI, SKILL_ID_WARP_PORTAL
} from '../skill.dat.js';

export const skills = [
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
		// 剣修練
		// ----------------------------------------------------------------
		// SKILL_ID_KEN_SHUREN
		defineSkill(SKILL_ID_KEN_SHUREN, function() {

			this.name = "剣修練";
			this.kana = "ケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 両手剣修練
		// ----------------------------------------------------------------
		// SKILL_ID_RYOUTKEN_SHUREN
		defineSkill(SKILL_ID_RYOUTKEN_SHUREN, function() {

			this.name = "両手剣修練";
			this.kana = "リヨウテケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// HP回復力向上
		// ----------------------------------------------------------------
		// SKILL_ID_HP_KAIFUKURYOKU_KOZYO
		defineSkill(SKILL_ID_HP_KAIFUKURYOKU_KOZYO, function() {

			this.name = "HP回復力向上";
			this.kana = "ヒツトホイントカイフクリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// バッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_BASH
		defineSkill(SKILL_ID_BASH, function() {

			this.name = "バッシュ";
			this.kana = "ハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 7 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// マグナムブレイク
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNUM_BREAK
		defineSkill(SKILL_ID_MAGNUM_BREAK, function() {

			this.name = "マグナムブレイク";
			this.kana = "マクナムフレイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// プロボック
		// ----------------------------------------------------------------
		// SKILL_ID_PROVOKE
		defineSkill(SKILL_ID_PROVOKE, function() {

			this.name = "プロボック";
			this.kana = "フロホツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 + skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// インデュア
		// ----------------------------------------------------------------
		// SKILL_ID_ENDURE
		defineSkill(SKILL_ID_ENDURE, function() {

			this.name = "インデュア";
			this.kana = "インテユア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 3 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}
		}),

		// ----------------------------------------------------------------
		// 移動時HP回復
		// ----------------------------------------------------------------
		// SKILL_ID_IDOZI_HP_KAIFUKU
		defineSkill(SKILL_ID_IDOZI_HP_KAIFUKU, function() {

			this.name = "移動時HP回復";
			this.kana = "イトウシヒツトホイントカイフク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 急所攻撃
		// ----------------------------------------------------------------
		// SKILL_ID_KYUSHO_KOGEKI
		defineSkill(SKILL_ID_KYUSHO_KOGEKI, function() {

			this.name = "急所攻撃";
			this.kana = "キユウシヨコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オートバーサーク
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_BERSERK
		defineSkill(SKILL_ID_AUTO_BERSERK, function() {

			this.name = "オートバーサーク";
			this.kana = "オオトハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ダブルアタック
		// ----------------------------------------------------------------
		// SKILL_ID_DOUBLE_ATTACK
		defineSkill(SKILL_ID_DOUBLE_ATTACK, function() {

			this.name = "ダブルアタック";
			this.kana = "タフルアタツク";
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
		// 回避率増加
		// ----------------------------------------------------------------
		// SKILL_ID_KAIHIRITSU_ZOKA
		defineSkill(SKILL_ID_KAIHIRITSU_ZOKA, function() {

			this.name = "回避率増加";
			this.kana = "カイヒリツソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スティール
		// ----------------------------------------------------------------
		// SKILL_ID_STEAL
		defineSkill(SKILL_ID_STEAL, function() {

			this.name = "スティール";
			this.kana = "ステイイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// ハイディング
		// ----------------------------------------------------------------
		// SKILL_ID_HIDING
		defineSkill(SKILL_ID_HIDING, function() {

			this.name = "ハイディング";
			this.kana = "ハイテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// インベナム
		// ----------------------------------------------------------------
		// SKILL_ID_ENVENOM
		defineSkill(SKILL_ID_ENVENOM, function() {

			this.name = "インベナム";
			this.kana = "インヘナム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// 解毒
		// ----------------------------------------------------------------
		// SKILL_ID_GEDOKU
		defineSkill(SKILL_ID_GEDOKU, function() {

			this.name = "解毒";
			this.kana = "ケトク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// 砂まき
		// ----------------------------------------------------------------
		// SKILL_ID_SUNAMAKI
		defineSkill(SKILL_ID_SUNAMAKI, function() {

			this.name = "砂まき";
			this.kana = "スナマキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 130;
			}

		}),

		// ----------------------------------------------------------------
		// バックステップ
		// ----------------------------------------------------------------
		// SKILL_ID_BACKSTEP
		defineSkill(SKILL_ID_BACKSTEP, function() {

			this.name = "バックステップ";
			this.kana = "ハツクステツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7;
			}
		}),

		// ----------------------------------------------------------------
		// 石拾い
		// ----------------------------------------------------------------
		// SKILL_ID_ISHIHIROI
		defineSkill(SKILL_ID_ISHIHIROI, function() {

			this.name = "石拾い";
			this.kana = "イシヒロイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 石投げ
		// ----------------------------------------------------------------
		// SKILL_ID_ISHINAGE
		defineSkill(SKILL_ID_ISHINAGE, function() {

			this.name = "石投げ";
			this.kana = "イシナケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// ディバインプロテクション
		// ----------------------------------------------------------------
		// SKILL_ID_DIVINE_PROTECTION
		defineSkill(SKILL_ID_DIVINE_PROTECTION, function() {

			this.name = "ディバインプロテクション";
			this.kana = "テイハインフロテクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// デーモンベイン
		// ----------------------------------------------------------------
		// SKILL_ID_DEMON_BANE
		defineSkill(SKILL_ID_DEMON_BANE, function() {

			this.name = "デーモンベイン";
			this.kana = "テエモンヘイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヒール
		// ----------------------------------------------------------------
		// SKILL_ID_HEAL
		defineSkill(SKILL_ID_HEAL, function() {

			this.name = "ヒール";
			this.kana = "ヒイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// キュアー
		// ----------------------------------------------------------------
		// SKILL_ID_CURE
		defineSkill(SKILL_ID_CURE, function() {

			this.name = "キュアー";
			this.kana = "キユアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 速度増加
		// ----------------------------------------------------------------
		// SKILL_ID_SOKUDO_ZOKA
		defineSkill(SKILL_ID_SOKUDO_ZOKA, function() {

			this.name = "速度増加";
			this.kana = "ソクトソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 速度減少
		// ----------------------------------------------------------------
		// SKILL_ID_SOKUDO_GENSHO
		defineSkill(SKILL_ID_SOKUDO_GENSHO, function() {

			this.name = "速度減少";
			this.kana = "ソクトケンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 13 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// シグナムクルシス
		// ----------------------------------------------------------------
		// SKILL_ID_SIGNUM_CRUCIS
		defineSkill(SKILL_ID_SIGNUM_CRUCIS, function() {

			this.name = "シグナムクルシス";
			this.kana = "シクナムクルシス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// エンジェラス
		// ----------------------------------------------------------------
		// SKILL_ID_ANGELUS
		defineSkill(SKILL_ID_ANGELUS, function() {

			this.name = "エンジェラス";
			this.kana = "エンシエラス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500;
			}

		}),

		// ----------------------------------------------------------------
		// ブレッシング
		// ----------------------------------------------------------------
		// SKILL_ID_BLESSING
		defineSkill(SKILL_ID_BLESSING, function() {

			this.name = "ブレッシング";
			this.kana = "フレツシンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ニューマ
		// ----------------------------------------------------------------
		// SKILL_ID_PNEUMA
		defineSkill(SKILL_ID_PNEUMA, function() {

			this.name = "ニューマ";
			this.kana = "ニユウマ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// アクアベネディクタ
		// ----------------------------------------------------------------
		// SKILL_ID_AQUA_BENEDICTA
		defineSkill(SKILL_ID_AQUA_BENEDICTA, function() {

			this.name = "アクアベネディクタ";
			this.kana = "アクアヘネテイクタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ルアフ
		// ----------------------------------------------------------------
		// SKILL_ID_RUWACH
		defineSkill(SKILL_ID_RUWACH, function() {

			this.name = "ルアフ";
			this.kana = "ルアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// テレポート
		// ----------------------------------------------------------------
		// SKILL_ID_TELEPORT
		defineSkill(SKILL_ID_TELEPORT, function() {

			this.name = "テレポート";
			this.kana = "テレホオト";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 11 - 1 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ワープポータル
		// ----------------------------------------------------------------
		// SKILL_ID_WARP_PORTAL
		defineSkill(SKILL_ID_WARP_PORTAL, function() {

			this.name = "ワープポータル";
			this.kana = "ワアフホオタル";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 - 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ホーリーライト
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_LIGHT
		defineSkill(SKILL_ID_HOLY_LIGHT, function() {

			this.name = "ホーリーライト";
			this.kana = "ホオリイライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

];
