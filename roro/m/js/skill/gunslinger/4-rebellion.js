/**
 * スキル定義 gunslinger/4-rebellion（25 件 / SKILL_ID 822〜846 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_AS_QUICKDRAW, SKILL_ID_BIND_TRAP, SKILL_ID_BUNISHING_BASTER, SKILL_ID_CRYMSON_MARKER,
    SKILL_ID_DRAGON_TAIL, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_FALLIN_ANGEL, SKILL_ID_FIRE_DANCE, SKILL_ID_FIRE_RAIN,
    SKILL_ID_FRICKER, SKILL_ID_HAMMER_OF_GOD, SKILL_ID_HEAT_BARREL, SKILL_ID_HEAT_BARREL_COIN_COUNT,
    SKILL_ID_HOWLING_MINE, SKILL_ID_HOWLING_MINE_APPEND, SKILL_ID_MASS_SPIRAL,
    SKILL_ID_PLATINUM_ALTER, SKILL_ID_PLATINUM_ALTER_COIN_COUNT, SKILL_ID_QUICKDRAW_SHOT, SKILL_ID_RICHS_COIN,
    SKILL_ID_ROUND_TRIP, SKILL_ID_SHUTTER_STORM, SKILL_ID_SLUG_SHOT, SKILL_ID_UNTIMATERIAL_BLAST
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// リッチズコイン
		// ----------------------------------------------------------------
		// SKILL_ID_RICHS_COIN
		defineSkill(SKILL_ID_RICHS_COIN, function() {

			this.name = "リッチズコイン";
			this.kana = "リツチスコイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// フォーリンエンジェル
		// ----------------------------------------------------------------
		// SKILL_ID_FALLIN_ANGEL
		defineSkill(SKILL_ID_FALLIN_ANGEL, function() {

			this.name = "フォーリンエンジェル";
			this.kana = "フオオリンエンシエル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// シャッターストーム
		// ----------------------------------------------------------------
		// SKILL_ID_SHUTTER_STORM
		defineSkill(SKILL_ID_SHUTTER_STORM, function() {

			this.name = "シャッターストーム";
			this.kana = "シヤツタアストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1700 + 200 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マススパイラル
		// ----------------------------------------------------------------
		// SKILL_ID_MASS_SPIRAL
		defineSkill(SKILL_ID_MASS_SPIRAL, function() {

			this.name = "マススパイラル";
			this.kana = "マススハイラル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// エターナルチェーン
		// ----------------------------------------------------------------
		// SKILL_ID_ETERNAL_CHAIN
		defineSkill(SKILL_ID_ETERNAL_CHAIN, function() {

			this.name = "エターナルチェーン";
			this.kana = "エタアナルチエエン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// ハウリングマイン
		// ----------------------------------------------------------------
		// SKILL_ID_HOWLING_MINE
		defineSkill(SKILL_ID_HOWLING_MINE, function() {

			this.name = "ハウリングマイン";
			this.kana = "ハウリンクマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアーレイン
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_RAIN
		defineSkill(SKILL_ID_FIRE_RAIN, function() {

			this.name = "ファイアーレイン";
			this.kana = "フアイアアレイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// フリッカー
		// ----------------------------------------------------------------
		// SKILL_ID_FRICKER
		defineSkill(SKILL_ID_FRICKER, function() {

			this.name = "フリッカー";
			this.kana = "フリツカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアーダンス
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_DANCE
		defineSkill(SKILL_ID_FIRE_DANCE, function() {

			this.name = "ファイアーダンス";
			this.kana = "フアイアアタンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// バニシングバスター
		// ----------------------------------------------------------------
		// SKILL_ID_BUNISHING_BASTER
		defineSkill(SKILL_ID_BUNISHING_BASTER, function() {

			this.name = "バニシングバスター";
			this.kana = "ハニシンクハスタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アンチマテリアルブラスト
		// ----------------------------------------------------------------
		// SKILL_ID_UNTIMATERIAL_BLAST
		defineSkill(SKILL_ID_UNTIMATERIAL_BLAST, function() {

			this.name = "アンチマテリアルブラスト";
			this.kana = "アンチマテリアルフラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 76 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1500 + 300 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// クイックドローショット
		// ----------------------------------------------------------------
		// SKILL_ID_QUICKDRAW_SHOT
		defineSkill(SKILL_ID_QUICKDRAW_SHOT, function() {

			this.name = "クイックドローショット";
			this.kana = "クイツクトロオシヨツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + Math.floor(charaDataManger.GetCharaJobLv() / 20);
			}

		}),

		// ----------------------------------------------------------------
		// ドラゴンテイル
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGON_TAIL
		defineSkill(SKILL_ID_DRAGON_TAIL, function() {

			this.name = "ドラゴンテイル";
			this.kana = "トラコンテイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(2000, 1000 + 200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// ラウンドトリップ
		// ----------------------------------------------------------------
		// SKILL_ID_ROUND_TRIP
		defineSkill(SKILL_ID_ROUND_TRIP, function() {

			this.name = "ラウンドトリップ";
			this.kana = "ラウントトリツフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 40 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(200, 1200 - 200 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// ヒートバレル
		// ----------------------------------------------------------------
		// SKILL_ID_HEAT_BARREL
		defineSkill(SKILL_ID_HEAT_BARREL, function() {

			this.name = "ヒートバレル";
			this.kana = "ヒイトハレル";
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
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 105000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ヒートバレルのコイン枚数
		// ----------------------------------------------------------------
		// SKILL_ID_HEAT_BARREL_COIN_COUNT
		defineSkill(SKILL_ID_HEAT_BARREL_COIN_COUNT, function() {

			this.name = "ヒートバレルのコイン枚数";
			this.kana = "ヒイトハレルノコインマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スラッグショット
		// ----------------------------------------------------------------
		// SKILL_ID_SLUG_SHOT
		defineSkill(SKILL_ID_SLUG_SHOT, function() {

			this.name = "スラッグショット";
			this.kana = "スラツクシヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

		}),

		// ----------------------------------------------------------------
		// ハンマーオブゴッド
		// ----------------------------------------------------------------
		// SKILL_ID_HAMMER_OF_GOD
		defineSkill(SKILL_ID_HAMMER_OF_GOD, function() {

			this.name = "ハンマーオブゴッド";
			this.kana = "ハンマアオフコツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		}),

		// ----------------------------------------------------------------
		// クリムゾンマーカー
		// ----------------------------------------------------------------
		// SKILL_ID_CRYMSON_MARKER
		defineSkill(SKILL_ID_CRYMSON_MARKER, function() {

			this.name = "クリムゾンマーカー";
			this.kana = "クリムソンマアカア";
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
		// プラチナムアルター
		// ----------------------------------------------------------------
		// SKILL_ID_PLATINUM_ALTER
		defineSkill(SKILL_ID_PLATINUM_ALTER, function() {

			this.name = "プラチナムアルター";
			this.kana = "フラチナムアルタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// プラチナムのコイン枚数
		// ----------------------------------------------------------------
		// SKILL_ID_PLATINUM_ALTER_COIN_COUNT
		defineSkill(SKILL_ID_PLATINUM_ALTER_COIN_COUNT, function() {

			this.name = "プラチナムのコイン枚数";
			this.kana = "フラチナムノコインマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// バインドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_BIND_TRAP
		defineSkill(SKILL_ID_BIND_TRAP, function() {

			this.name = "バインドトラップ";
			this.kana = "ハイントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		}),

		// ----------------------------------------------------------------
		// ハウリングマイン追撃
		// ----------------------------------------------------------------
		// SKILL_ID_HOWLING_MINE_APPEND
		defineSkill(SKILL_ID_HOWLING_MINE_APPEND, function() {

			this.refId = SKILL_ID_HOWLING_MINE;
			this.name = "ハウリングマイン追撃";
			this.kana = "ハウリンクマインツイケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.Power = function(skillLv, charaDataManger) {
				return 1000 + 400 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// クイックドローショットの全追撃
		// ----------------------------------------------------------------
		// SKILL_ID_AS_QUICKDRAW
		defineSkill(SKILL_ID_AS_QUICKDRAW, function() {

			this.name = "クイックドローショットの全追撃";
			this.kana = "クイツクトロオシヨツトノセンツイケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
