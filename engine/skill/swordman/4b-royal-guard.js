/**
 * スキル定義 swordman/4b-royal-guard（27 件 / SKILL_ID 569〜892 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_BANDING, SKILL_ID_BANISHING_POINT, SKILL_ID_CANNON_SPEAR, SKILL_ID_COUNT_OF_RG_FOR_BANDING,
    SKILL_ID_EARTH_DRIVE, SKILL_ID_EXCEED_BREAK, SKILL_ID_FORCE_OF_BANGUARD, SKILL_ID_HESPERUS_SLIT,
    SKILL_ID_INSPIRATION, SKILL_ID_KINGS_GRACE, SKILL_ID_MOON_SLUSHER, SKILL_ID_OVER_BLAND, SKILL_ID_PIETY,
    SKILL_ID_PINGPOINT_ATTACK, SKILL_ID_PRESTAGE, SKILL_ID_RAGE_BURST_ATTACK, SKILL_ID_RAY_OF_GENESIS,
    SKILL_ID_REFLECT_DAMAGE, SKILL_ID_SHIELD_PRESS, SKILL_ID_SHIELD_SPELL, SKILL_ID_SHIELD_SPELL_ATK_PLUS,
    SKILL_ID_SHIELD_SPELL_DEF_PLUS, SKILL_ID_SHIELD_SPELL_LV_1, SKILL_ID_SHIELD_SPELL_LV_2,
    SKILL_ID_SHIELD_SPELL_REFLECT, SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE, SKILL_ID_TRUMPLE
} from "../../skill.dat.js";

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

		// ----------------------------------------------------------------
		// シールドスペルLv1(物理)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SPELL_LV_1
		defineSkill(SKILL_ID_SHIELD_SPELL_LV_1, function() {

			this.name = "シールドスペルLv1(物理)";
			this.kana = "シイルトスヘルレヘルイチフツリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
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
		// シールドスペルLv2(魔法)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SPELL_LV_2
		defineSkill(SKILL_ID_SHIELD_SPELL_LV_2, function() {

			this.name = "シールドスペルLv2(魔法)";
			this.kana = "シイルトスヘルレヘルニマホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
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
		// キングスグレイス
		// ----------------------------------------------------------------
		// SKILL_ID_KINGS_GRACE
		defineSkill(SKILL_ID_KINGS_GRACE, function() {

			this.name = "キングスグレイス";
			this.kana = "キンクスクレイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 220 - 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 110000 - 10000 * skillLv;
			}

		}),

];
