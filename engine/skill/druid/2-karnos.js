/**
 * スキル定義 druid/2-karnos（22 件 / SKILL_ID 1344〜1365 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { n_A_DEX, n_A_INT, n_A_STR } from "../../roro-state.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_CHOP_CHOP, SKILL_ID_CLAW_WAVE, SKILL_ID_DOUBLE_SLASH, SKILL_ID_EARTH_BUD, SKILL_ID_EARTH_DRILL,
    SKILL_ID_EARTH_STAMP, SKILL_ID_ENRAGE_RAPTOR, SKILL_ID_ENRAGE_WOLF, SKILL_ID_FEATHER_SPRINKLE,
    SKILL_ID_ICE_PILLAR, SKILL_ID_ICE_SPLASH, SKILL_ID_IRON_HOWLING, SKILL_ID_NASTY_SLASH,
    SKILL_ID_NATURE_PROTECTION, SKILL_ID_NATURE_VIGOUR, SKILL_ID_RAPTORIAL_INSTINCT, SKILL_ID_SHARPEN_GUST,
    SKILL_ID_SHARPEN_HAIL, SKILL_ID_THUNDERING_CALL, SKILL_ID_THUNDERING_FOCUS, SKILL_ID_THUNDERING_ORB,
    SKILL_ID_TRUTH_OF_EARTH, SKILL_ID_TRUTH_OF_ICE, SKILL_ID_TRUTH_OF_WIND, SKILL_ID_TYPHOON_WING,
    SKILL_ID_WIND_VEIL, SKILL_ID_WOLF_INSTINCT
} from "../../skill.dat.js";

export const skills = [
		/** ダブルスラッシュ */
		// SKILL_ID_DOUBLE_SLASH
		defineSkill(SKILL_ID_DOUBLE_SLASH, function() {
			this.name = "(△)ダブルスラッシュ";
			this.kana = "ダブルスラッシュ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 1000 + 100 * skillLv;
				} else {
					ratio += 750 + 75 * skillLv;
				}
				ratio += n_A_STR;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
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
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** シャープンガスト */
		// SKILL_ID_SHARPEN_GUST
		defineSkill(SKILL_ID_SHARPEN_GUST, function() {
			this.name = "(△)シャープンガスト";
			this.kana = "シャャプンガスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 1000 + 100 * skillLv;
				} else {
					ratio += 750 + 75 * skillLv;
				}
					ratio += n_A_DEX;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ウルフインスティンクト */
		// SKILL_ID_WOLF_INSTINCT
		defineSkill(SKILL_ID_WOLF_INSTINCT, function() {
			this.name = "ウルフインスティンクト";
			this.kana = "ウルフインスティンクト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** アイスピラー */
		// SKILL_ID_ICE_PILLAR
		defineSkill(SKILL_ID_ICE_PILLAR, function() {
			this.name = "(△)アイスピラー";
			this.kana = "アイスピラア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.ground_installation = function(option) {
				return (option.GetOptionValue(0) == 1);
			}
			this.damageInterval = 1000;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) == 0) {
					// 初撃
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
						ratio += 2400 + 240 * skillLv;
					} else {
						ratio += 1840 + 200 * skillLv;
					}
				} else {
					// 設置ダメージ
					ratio += 2400 + 240 * skillLv;
				}
				ratio += 2 * n_A_INT;
				return Math.floor(ratio * n_A_BaseLV / 100);
				// 設置
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 54;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 8000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 7000;
			}
		}),

		/** サンダリングフォーカス */
		// SKILL_ID_THUNDERING_FOCUS
		defineSkill(SKILL_ID_THUNDERING_FOCUS, function() {
			this.name = "(△)サンダリングフォーカス";
			this.kana = "サンダリングフォォカス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) == 1) {
					ratio += 3000 + 300 * skillLv;
					ratio += 5 * n_A_INT;
				} else {
					ratio += 2400 + 240 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 4 * n_A_INT;
					}
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 200;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** アースバド */
		// SKILL_ID_EARTH_BUD
		defineSkill(SKILL_ID_EARTH_BUD, function() {
			this.name = "アースバド";
			this.kana = "アアスバド";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ナスティスラッシュ */
		// SKILL_ID_NASTY_SLASH
		defineSkill(SKILL_ID_NASTY_SLASH, function() {
			this.name = "(△)ナスティスラッシュ";
			this.kana = "ナスティスラッシュ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 1000 + 200 * skillLv;
				} else {
					ratio += 750 + 150 * skillLv;
				}
				ratio += n_A_STR;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 40;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** シャープンヘイル */
		// SKILL_ID_SHARPEN_HAIL
		defineSkill(SKILL_ID_SHARPEN_HAIL, function() {
			this.name = "(△)シャープンヘイル";
			this.kana = "シャャプンヘイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 1000 + 100 * skillLv;
				} else {
					ratio += 750 + 75 * skillLv;
				}
					ratio += n_A_DEX;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ラプトリアルインスティンクト */
		// SKILL_ID_RAPTORIAL_INSTINCT
		defineSkill(SKILL_ID_RAPTORIAL_INSTINCT, function() {
			this.name = "ラプトリアルインスティンクト";
			this.kana = "ラプトリアルインスティンクト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		/** アイススプラッシュ */
		// SKILL_ID_ICE_SPLASH
		defineSkill(SKILL_ID_ICE_SPLASH, function() {
			this.name = "(△)アイススプラッシュ";
			this.kana = "アイススプラッシュ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 2400 + 240 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
					ratio += 4 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);

			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 54;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** サンダリングオーブ */
		// SKILL_ID_THUNDERING_ORB
		defineSkill(SKILL_ID_THUNDERING_ORB, function() {
			this.name = "(△)サンダリングオーブ";
			this.kana = "サンダリングオオブ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) == 1) {
					ratio += 3000 + 300 * skillLv;
					ratio += 5 * n_A_INT;
				} else {
					ratio += 2400 + 240 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 4 * n_A_INT;
					}
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** アースドリル */
		// SKILL_ID_EARTH_DRILL
		defineSkill(SKILL_ID_EARTH_DRILL, function() {
			this.name = "(△)アースドリル";
			this.kana = "アアスドリル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 2400 + 240 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
					ratio += 4 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackIncrement = 1;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 54;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** クローウェーブ */
		// SKILL_ID_CLAW_WAVE
		defineSkill(SKILL_ID_CLAW_WAVE, function() {
			this.name = "(△)クローウェーブ";
			this.kana = "クロオウェェブ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 1000 + 100 * skillLv;
				} else {
					ratio += 750 + 75 * skillLv;
				}
				ratio += n_A_STR;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** フェザースプリンクル */
		// SKILL_ID_FEATHER_SPRINKLE
		defineSkill(SKILL_ID_FEATHER_SPRINKLE, function() {
			this.name = "(△)フェザースプリンクル";
			this.kana = "フェザザスプリンクル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 1000 + 200 * skillLv;
				} else {
					ratio += 750 + 150 * skillLv;
				}
					ratio += n_A_DEX;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** サンダリングコール */
		// SKILL_ID_THUNDERING_CALL
		defineSkill(SKILL_ID_THUNDERING_CALL, function() {
			this.name = "(△)サンダリングコール";
			this.kana = "サンダリングコオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) == 1) {
					ratio += 3000 + 300 * skillLv;
					ratio += 5 * n_A_INT;
				} else {
					ratio += 2400 + 240 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 4 * n_A_INT;
					}
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** アーススタンプ */
		// SKILL_ID_EARTH_STAMP
		defineSkill(SKILL_ID_EARTH_STAMP, function() {
			this.name = "(△)アーススタンプ";
			this.kana = "アアススタンプ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 2400 + 240 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
					ratio += 4 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackIncrement = 1;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 54;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** チョップチョップ */
		// SKILL_ID_CHOP_CHOP
		defineSkill(SKILL_ID_CHOP_CHOP, function() {
			this.name = "(△)チョップチョップ";
			this.kana = "チョップチョップ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 1000 + 100 * skillLv;
				} else {
					ratio += 750 + 75 * skillLv;
				}
				ratio += n_A_STR;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 30;
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
				return 200;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** タイフーンウィング */
		// SKILL_ID_TYPHOON_WING
		defineSkill(SKILL_ID_TYPHOON_WING, function() {
			this.name = "(△)タイフーンウィング";
			this.kana = "タイフフンウィング";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 1000 + 100 * skillLv;
				} else {
					ratio += 750 + 75 * skillLv;
				}
					ratio += n_A_DEX;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 40;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ネイチャーヴィゴール */
		// SKILL_ID_NATURE_VIGOUR
		defineSkill(SKILL_ID_NATURE_VIGOUR, function() {
			this.name = "ネイチャーヴィゴール";
			this.kana = "ネイチャャヴィゴゴル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ネイチャープロテクション */
		// SKILL_ID_NATURE_PROTECTION
		defineSkill(SKILL_ID_NATURE_PROTECTION, function() {
			this.name = "ネイチャープロテクション";
			this.kana = "ネイチャャプロテクション";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 500, 1000, 1500, 2000, 5000][skillLv];
			}
		}),

		/** アイアンハウリング */
		// SKILL_ID_IRON_HOWLING
		defineSkill(SKILL_ID_IRON_HOWLING, function() {
			this.name = "アイアンハウリング";
			this.kana = "アイアンハウリング";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 50;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		/** ウィンドヴェール */
		// SKILL_ID_WIND_VEIL
		defineSkill(SKILL_ID_WIND_VEIL, function() {
			this.name = "ウィンドヴェール";
			this.kana = "ウィンドヴェェル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 50;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

];
