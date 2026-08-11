/**
 * スキル定義 19-royal-guard-shadow-chaser（SKILL_ID 569–608 / 40 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../mobconfplayer.js';
import {
    SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_BANDING, SKILL_ID_BANISHING_POINT, SKILL_ID_BLOODY_LAST,
    SKILL_ID_BODY_PAINTING, SKILL_ID_CANNON_SPEAR, SKILL_ID_CHAOS_PANIC, SKILL_ID_DEADLY_INEFFECT,
    SKILL_ID_DEMENSION_DOOR, SKILL_ID_EARTH_DRIVE, SKILL_ID_EXCEED_BREAK, SKILL_ID_FAINT_BOMB, SKILL_ID_FATAL_MENUS,
    SKILL_ID_FORCE_OF_BANGUARD, SKILL_ID_HESPERUS_SLIT, SKILL_ID_INSPIRATION, SKILL_ID_INVISIBILITY,
    SKILL_ID_MAELSTORM, SKILL_ID_MANHOLE, SKILL_ID_MASKARADE_GLOOMY, SKILL_ID_MASKARADE_IGNORANCE,
    SKILL_ID_MASKARADE_INOVATION, SKILL_ID_MASKARADE_RAGENESS, SKILL_ID_MASKARADE_UNLUCKY,
    SKILL_ID_MASKARADE_WEEKNESS, SKILL_ID_MOON_SLUSHER, SKILL_ID_OVER_BLAND, SKILL_ID_PIETY,
    SKILL_ID_PINGPOINT_ATTACK, SKILL_ID_PRESTAGE, SKILL_ID_RAGE_BURST_ATTACK, SKILL_ID_RAY_OF_GENESIS,
    SKILL_ID_REFLECT_DAMAGE, SKILL_ID_REPORDUCE, SKILL_ID_SHADOW_FORM, SKILL_ID_SHIELD_PRESS, SKILL_ID_SHIELD_SPELL,
    SKILL_ID_STRIP_ACCESSORY, SKILL_ID_TRIANGLE_SHOT, SKILL_ID_TRUMPLE
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// キャノンスピア
		// ----------------------------------------------------------------
		// SKILL_ID_CANNON_SPEAR
		defineSkill(SKILL_ID_CANNON_SPEAR, function() {

			this.name = "キャノンスピア";
			this.kana = "キヤノンスヒア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = (50 + charaDataManger.GetCharaStr()) * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// バニシングポイント
		// ----------------------------------------------------------------
		// SKILL_ID_BANISHING_POINT
		defineSkill(SKILL_ID_BANISHING_POINT, function() {

			this.name = "バニシングポイント";
			this.kana = "ハニシンクホイント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// トランプル
		// ----------------------------------------------------------------
		// SKILL_ID_TRUMPLE
		defineSkill(SKILL_ID_TRUMPLE, function() {

			this.name = "トランプル";
			this.kana = "トランフル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 15 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// シールドプレス
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_PRESS
		defineSkill(SKILL_ID_SHIELD_PRESS, function() {

			this.name = "(△)シールドプレス";
			this.kana = "シイルトフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// リフレクトダメージ
		// ----------------------------------------------------------------
		// SKILL_ID_REFLECT_DAMAGE
		defineSkill(SKILL_ID_REFLECT_DAMAGE, function() {

			this.name = "リフレクトダメージ";
			this.kana = "リフレクトタメエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		}),

		// ----------------------------------------------------------------
		// ピンポイントアタック
		// ----------------------------------------------------------------
		// SKILL_ID_PINGPOINT_ATTACK
		defineSkill(SKILL_ID_PINGPOINT_ATTACK, function() {

			this.name = "ピンポイントアタック";
			this.kana = "ヒンホイントアタツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 * skillLv;
				pow += 5 * charaDataManger.GetCharaAgi();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return 100;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// フォースオブバンガード
		// ----------------------------------------------------------------
		// SKILL_ID_FORCE_OF_BANGUARD
		defineSkill(SKILL_ID_FORCE_OF_BANGUARD, function() {

			this.name = "フォースオブバンガード";
			this.kana = "フオオスオフハンカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// レイジバーストアタック
		// ----------------------------------------------------------------
		// SKILL_ID_RAGE_BURST_ATTACK
		defineSkill(SKILL_ID_RAGE_BURST_ATTACK, function() {

			this.name = "レイジバーストアタック";
			this.kana = "レイシハアストアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// シールドスペル
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SPELL
		defineSkill(SKILL_ID_SHIELD_SPELL, function() {

			this.name = "シールドスペル";
			this.kana = "シイルトスヘル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// イクシードブレイク
		// ----------------------------------------------------------------
		// SKILL_ID_EXCEED_BREAK
		defineSkill(SKILL_ID_EXCEED_BREAK, function() {

			this.name = "イクシードブレイク";
			this.kana = "イクシイトフレイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 12 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// オーバーブランド
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_BLAND
		defineSkill(SKILL_ID_OVER_BLAND, function() {

			this.name = "オーバーブランド";
			this.kana = "オオハアフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// プレスティージ
		// ----------------------------------------------------------------
		// SKILL_ID_PRESTAGE
		defineSkill(SKILL_ID_PRESTAGE, function() {

			this.name = "プレスティージ";
			this.kana = "フレステイイシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 60000;
			}

		}),

		// ----------------------------------------------------------------
		// バンディング
		// ----------------------------------------------------------------
		// SKILL_ID_BANDING
		defineSkill(SKILL_ID_BANDING, function() {

			this.name = "バンディング";
			this.kana = "ハンテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 6 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ムーンスラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_MOON_SLUSHER
		defineSkill(SKILL_ID_MOON_SLUSHER, function() {

			this.name = "ムーンスラッシャー";
			this.kana = "ムウンスラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// レイオブジェネシス
		// ----------------------------------------------------------------
		// SKILL_ID_RAY_OF_GENESIS
		defineSkill(SKILL_ID_RAY_OF_GENESIS, function() {

			this.name = "(△)レイオブジェネシス";
			this.kana = "レイオフシエネシス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// パイエティ
		// ----------------------------------------------------------------
		// SKILL_ID_PIETY
		defineSkill(SKILL_ID_PIETY, function() {

			this.name = "パイエティ";
			this.kana = "ハイエテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アースドライブ
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_DRIVE
		defineSkill(SKILL_ID_EARTH_DRIVE, function() {

			this.name = "アースドライブ";
			this.kana = "アアストライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 8000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)ヘスペルスリット
		// ----------------------------------------------------------------
		// SKILL_ID_HESPERUS_SLIT
		defineSkill(SKILL_ID_HESPERUS_SLIT, function() {

			this.name = "(仮)ヘスペルスリット";
			this.kana = "ヘスヘルスリツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
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
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)インスピレーション
		// ----------------------------------------------------------------
		// SKILL_ID_INSPIRATION
		defineSkill(SKILL_ID_INSPIRATION, function() {

			this.name = "インスピレーション";
			this.kana = "インスヒレエシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 + 6000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ボディペインティング
		// ----------------------------------------------------------------
		// SKILL_ID_BODY_PAINTING
		defineSkill(SKILL_ID_BODY_PAINTING, function() {

			this.name = "ボディペインティング";
			this.kana = "ホテイヘインテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マスカレード-エナベーション
		// ----------------------------------------------------------------
		// SKILL_ID_MASKARADE_INOVATION
		defineSkill(SKILL_ID_MASKARADE_INOVATION, function() {

			this.name = "マスカレード-エナベーション";
			this.kana = "マスカレエトエナヘエシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マスカレード-グルーミー
		// ----------------------------------------------------------------
		// SKILL_ID_MASKARADE_GLOOMY
		defineSkill(SKILL_ID_MASKARADE_GLOOMY, function() {

			this.name = "マスカレード-グルーミー";
			this.kana = "マスカレエトクルウミイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マスカレード-イグノアランス
		// ----------------------------------------------------------------
		// SKILL_ID_MASKARADE_IGNORANCE
		defineSkill(SKILL_ID_MASKARADE_IGNORANCE, function() {

			this.name = "マスカレード-イグノアランス";
			this.kana = "マスカレエトイクノアランス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マスカレード-レイジネス
		// ----------------------------------------------------------------
		// SKILL_ID_MASKARADE_RAGENESS
		defineSkill(SKILL_ID_MASKARADE_RAGENESS, function() {

			this.name = "マスカレード-レイジネス";
			this.kana = "マスカレエトレイシネス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マスカレード-ウィークネス
		// ----------------------------------------------------------------
		// SKILL_ID_MASKARADE_WEEKNESS
		defineSkill(SKILL_ID_MASKARADE_WEEKNESS, function() {

			this.name = "マスカレード-ウィークネス";
			this.kana = "マスカレエトウイイクネス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マスカレード-アンラッキー
		// ----------------------------------------------------------------
		// SKILL_ID_MASKARADE_UNLUCKY
		defineSkill(SKILL_ID_MASKARADE_UNLUCKY, function() {

			this.name = "マスカレード-アンラッキー";
			this.kana = "マスカレエトアンラツキイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// リプロデュース
		// ----------------------------------------------------------------
		// SKILL_ID_REPORDUCE
		defineSkill(SKILL_ID_REPORDUCE, function() {

			this.name = "リプロデュース";
			this.kana = "リフロテユウス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)オートシャドウスペル
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_SHADOW_SPELL
		defineSkill(SKILL_ID_AUTO_SHADOW_SPELL, function() {

			this.name = "(仮)オートシャドウスペル";
			this.kana = "オオトシヤトウスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// シャドウフォーム
		// ----------------------------------------------------------------
		// SKILL_ID_SHADOW_FORM
		defineSkill(SKILL_ID_SHADOW_FORM, function() {

			this.name = "シャドウフォーム";
			this.kana = "シヤトウフオオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000 - 1000 * skillLv;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// デッドリーインフェクト
		// ----------------------------------------------------------------
		// SKILL_ID_DEADLY_INEFFECT
		defineSkill(SKILL_ID_DEADLY_INEFFECT, function() {

			this.name = "デッドリーインフェクト";
			this.kana = "テツトリイインフエクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000 + 1000 * skillLv;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)インビジビリティ
		// ----------------------------------------------------------------
		// SKILL_ID_INVISIBILITY
		defineSkill(SKILL_ID_INVISIBILITY, function() {

			this.name = "(仮)インビジビリティ";
			this.kana = "インヒシヒリテイ";
			this.maxLv = 5;
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
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000 + 10000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// マンホール
		// ----------------------------------------------------------------
		// SKILL_ID_MANHOLE
		defineSkill(SKILL_ID_MANHOLE, function() {

			this.name = "マンホール";
			this.kana = "マンホオル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000 + 2000 * skillLv;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ディメンションドア
		// ----------------------------------------------------------------
		// SKILL_ID_DEMENSION_DOOR
		defineSkill(SKILL_ID_DEMENSION_DOOR, function() {

			this.name = "ディメンションドア";
			this.kana = "テイメンシヨントア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ブラッディラスト
		// ----------------------------------------------------------------
		// SKILL_ID_BLOODY_LAST
		defineSkill(SKILL_ID_BLOODY_LAST, function() {

			this.name = "ブラッディラスト";
			this.kana = "フラツテイラスト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// フェイントボム
		// ----------------------------------------------------------------
		// SKILL_ID_FAINT_BOMB
		defineSkill(SKILL_ID_FAINT_BOMB, function() {

			this.name = "(△)フェイントボム";
			this.kana = "フエイントホム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var ratio = 0;

				ratio = 1 + (skillLv == 1 ? 2 : 3) + Math.floor((skillLv - 1) / 3);

				// 基本式
				pow = ratio * (charaDataManger.GetCharaDex() / 2)
						* (charaDataManger.GetCharaJobLv() / 10);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(0, 1000 * Math.floor((skillLv - 4) / 3));
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// カオスパニック
		// ----------------------------------------------------------------
		// SKILL_ID_CHAOS_PANIC
		defineSkill(SKILL_ID_CHAOS_PANIC, function() {

			this.name = "カオスパニック";
			this.kana = "カオスハニツク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// メイルストーム
		// ----------------------------------------------------------------
		// SKILL_ID_MAELSTORM
		defineSkill(SKILL_ID_MAELSTORM, function() {

			this.name = "メイルストーム";
			this.kana = "メイルストオム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 * skillLv;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// フェイタルメナス
		// ----------------------------------------------------------------
		// SKILL_ID_FATAL_MENUS
		defineSkill(SKILL_ID_FATAL_MENUS, function() {

			this.name = "フェイタルメナス";
			this.kana = "フエイタルメナス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップアクセサリー
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_ACCESSORY
		defineSkill(SKILL_ID_STRIP_ACCESSORY, function() {

			this.name = "ストリップアクセサリー";
			this.kana = "ストリツフアクセサリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// トライアングルショット
		// ----------------------------------------------------------------
		// SKILL_ID_TRIANGLE_SHOT
		defineSkill(SKILL_ID_TRIANGLE_SHOT, function() {

			this.name = "トライアングルショット";
			this.kana = "トライアンクルシヨツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + (skillLv - 1) * (charaDataManger.GetCharaAgi() / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 - 50 * skillLv;
			}

		}),

];
