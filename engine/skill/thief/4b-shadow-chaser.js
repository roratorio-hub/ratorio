/**
 * スキル定義 thief/4b-shadow-chaser（24 件 / SKILL_ID 588〜893 の中から職業ツリーで再抽出）
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
import {
    SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_BLOODY_LAST, SKILL_ID_BODY_PAINTING, SKILL_ID_CHAOS_PANIC,
    SKILL_ID_DEADLY_INEFFECT, SKILL_ID_DEMENSION_DOOR, SKILL_ID_ESCAPE, SKILL_ID_FAINT_BOMB, SKILL_ID_FATAL_MENUS,
    SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO, SKILL_ID_INVISIBILITY, SKILL_ID_MAELSTORM,
    SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL, SKILL_ID_MANHOLE, SKILL_ID_MASKARADE_GLOOMY,
    SKILL_ID_MASKARADE_IGNORANCE, SKILL_ID_MASKARADE_INOVATION, SKILL_ID_MASKARADE_RAGENESS,
    SKILL_ID_MASKARADE_UNLUCKY, SKILL_ID_MASKARADE_WEEKNESS, SKILL_ID_REPORDUCE, SKILL_ID_SHADOW_FORM,
    SKILL_ID_STRIP_ACCESSORY, SKILL_ID_TRIANGLE_SHOT
} from "../skill.dat.js";

export const skills = [
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
		// エスケープ
		// ----------------------------------------------------------------
		// SKILL_ID_ESCAPE
		defineSkill(SKILL_ID_ESCAPE, function() {

			this.name = "エスケープ";
			this.kana = "エスケエフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 1 * skillLv;
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

				return 2000;
			}

		}),

];
