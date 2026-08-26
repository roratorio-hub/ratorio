/**
 * スキル定義 druid/1-druid（25 件 / SKILL_ID 1319〜1343 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { n_A_DEX, n_A_INT, n_A_STR } from "../../roro-state.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_AROUND_FLOWER, SKILL_ID_BEASTY_NOSE, SKILL_ID_BLOOD_HOWLING, SKILL_ID_CRUEL_BITE, SKILL_ID_CUTTING_WIND,
    SKILL_ID_EARTH_FLOWER, SKILL_ID_ENRAGE_RAPTOR, SKILL_ID_ENRAGE_WOLF, SKILL_ID_FLICKING_TONADO, SKILL_ID_HUNGER,
    SKILL_ID_ICE_CLOUD, SKILL_ID_ICE_TOTEM, SKILL_ID_LOW_FLIGHT, SKILL_ID_NATURE_LOGIC, SKILL_ID_NATURE_SHIELD,
    SKILL_ID_NOMERCY_CLAW, SKILL_ID_PREENING, SKILL_ID_SHARPE_EYES, SKILL_ID_SHOOTING_FEATHER,
    SKILL_ID_TRUTH_OF_EARTH, SKILL_ID_TRUTH_OF_ICE, SKILL_ID_TRUTH_OF_WIND, SKILL_ID_WERERAPTOR, SKILL_ID_WEREWOLF,
    SKILL_ID_WIND_BOMB
} from "../../skill.dat.js";

export const skills = [
		/** シェイプシフト：ウェアウルフ */
		// SKILL_ID_WEREWOLF
		defineSkill(SKILL_ID_WEREWOLF, function() {
			this.name = "シェイプシフト：ウェアウルフ";
			this.kana = "シェイプシフトウェアウルフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
			}
		}),

		/** シェイプシフト：ウェアラプター */
		// SKILL_ID_WERERAPTOR
		defineSkill(SKILL_ID_WERERAPTOR, function() {
			this.name = "シェイプシフト：ウェアラプター";
			this.kana = "シェイプシフトウェアラプタタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
			}
		}),

		/** ビースティノーズ */
		// SKILL_ID_BEASTY_NOSE
		defineSkill(SKILL_ID_BEASTY_NOSE, function() {
			this.name = "ビースティノーズ";
			this.kana = "ビビスティノノズ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** トゥルースオブアイス */
		// SKILL_ID_TRUTH_OF_ICE
		defineSkill(SKILL_ID_TRUTH_OF_ICE, function() {
			this.name = "トゥルースオブアイス";
			this.kana = "トゥルルスオブアイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		/** トゥルースオブウィンド */
		// SKILL_ID_TRUTH_OF_WIND
		defineSkill(SKILL_ID_TRUTH_OF_WIND, function() {
			this.name = "トゥルースオブウィンド";
			this.kana = "トゥルルスオブウィンド";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		/** トゥルースオブアース */
		// SKILL_ID_TRUTH_OF_EARTH
		defineSkill(SKILL_ID_TRUTH_OF_EARTH, function() {
			this.name = "トゥルースオブアース";
			this.kana = "トゥルルスオブアアス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}

		}),

		/** ブラッドハウリング */
		// SKILL_ID_BLOOD_HOWLING
		defineSkill(SKILL_ID_BLOOD_HOWLING, function() {
			this.name = "ブラッドハウリング";
			this.kana = "ブラッドハウリング";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 30;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (40 + 40 * skillLv) * 1000;
			}
		}),

		/** プリーニング */
		// SKILL_ID_PREENING
		defineSkill(SKILL_ID_PREENING, function() {
			this.name = "プリーニング";
			this.kana = "プリリニング";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 30;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (40 + 40 * skillLv) * 1000;
			}
		}),

		/** シャープアイズ */
		// SKILL_ID_SHARPE_EYES
		defineSkill(SKILL_ID_SHARPE_EYES, function() {
			this.name = "シャープアイズ";
			this.kana = "シャャプアイズ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** アイストーテム */
		// SKILL_ID_ICE_TOTEM
		defineSkill(SKILL_ID_ICE_TOTEM, function() {
			this.name = "(△)アイストーテム";
			this.kana = "アイストオテム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 80 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
					ratio += 2 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 13;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** カッティングウィンド */
		// SKILL_ID_CUTTING_WIND
		defineSkill(SKILL_ID_CUTTING_WIND, function() {
			this.name = "(△)カッティングウィンド";
			this.kana = "カッティングウィンド";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 80 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
					ratio += 2 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 15;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** アースフラワー */
		// SKILL_ID_EARTH_FLOWER
		defineSkill(SKILL_ID_EARTH_FLOWER, function() {
			this.name = "(△)アースフラワー";
			this.kana = "アアスフラワア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 80 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
					ratio += 2 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 13;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** エンレイジウルフ */
		// SKILL_ID_ENRAGE_WOLF
		defineSkill(SKILL_ID_ENRAGE_WOLF, function() {
			this.name = "エンレイジウルフ";
			this.kana = "エンレイジウルフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (40 + 40 * skillLv) * 1000;
			}
		}),

		/** エンレイジラプター */
		// SKILL_ID_ENRAGE_RAPTOR
		defineSkill(SKILL_ID_ENRAGE_RAPTOR, function() {
			this.name = "エンレイジラプター";
			this.kana = "エンレイジラプタタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (40 + 40 * skillLv) * 1000;
			}
		}),

		/** アイスクラウド */
		// SKILL_ID_ICE_CLOUD
		defineSkill(SKILL_ID_ICE_CLOUD, function() {
			this.name = "(△)アイスクラウド";
			this.kana = "アイスクラウド";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 80 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
					ratio += 2 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 27;
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ウィンドボム */
		// SKILL_ID_WIND_BOMB
		defineSkill(SKILL_ID_WIND_BOMB, function() {
			this.name = "(△)ウィンドボム";
			this.kana = "ウィンドボム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 80 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
					ratio += 2 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 30;
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** アラウンドフラワー */
		// SKILL_ID_AROUND_FLOWER
		defineSkill(SKILL_ID_AROUND_FLOWER, function() {
			this.name = "(△)アラウンドフラワー";
			this.kana = "アラウンドフラワワ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 80 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
					ratio += 2 * n_A_INT;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 30;
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ノーマーシークロー */
		// SKILL_ID_NOMERCY_CLAW
		defineSkill(SKILL_ID_NOMERCY_CLAW, function() {
			this.name = "(△)ノーマーシークロー";
			this.kana = "ノオマアシイクロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 100 + 20 * skillLv;
				} else {
					ratio += 90 + 15 * skillLv;
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
				return 300;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** シューティングフェザー */
		// SKILL_ID_SHOOTING_FEATHER
		defineSkill(SKILL_ID_SHOOTING_FEATHER, function() {
			this.name = "(△)シューティングフェザー";
			this.kana = "シユウテイングフエザア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 200 + 20 * skillLv;
				} else {
					ratio += 170 + 15 * skillLv;
				}
				ratio += n_A_DEX;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 15;
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
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ネイチャーシールド */
		// SKILL_ID_NATURE_SHIELD
		defineSkill(SKILL_ID_NATURE_SHIELD, function() {
			this.name = "ネイチャーシールド";
			this.kana = "ネイチャャシシルド";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 30;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		/** ネイチャーロジック */
		// SKILL_ID_NATURE_LOGIC
		defineSkill(SKILL_ID_NATURE_LOGIC, function() {
			this.name = "ネイチャーロジック";
			this.kana = "ネイチャャロジック";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** クルーエルバイト */
		// SKILL_ID_CRUEL_BITE
		defineSkill(SKILL_ID_CRUEL_BITE, function() {
			this.name = "(△)クルーエルバイト";
			this.kana = "クルルエルバイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 200 + 20 * skillLv;
				} else {
					ratio += 170 + 15 * skillLv;
				}
				ratio += n_A_STR;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 15;
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
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ローフライト */
		// SKILL_ID_LOW_FLIGHT
		defineSkill(SKILL_ID_LOW_FLIGHT, function() {
			this.name = "(△)ローフライト";
			this.kana = "ロオフライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 200 + 20 * skillLv;
				} else {
					ratio += 170 + 15 * skillLv;
				}
				ratio += n_A_DEX;
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
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ハンガー */
		// SKILL_ID_HUNGER
		defineSkill(SKILL_ID_HUNGER, function() {
			this.name = "(△)ハンガー";
			this.kana = "ハンガア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 1;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_WOLF) > 0) {
					ratio += 400 + 40 * skillLv;
				} else {
					ratio += 340 + 30 * skillLv;
				}
				ratio += n_A_STR;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
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
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** フリッキングトルネード */
		// SKILL_ID_FLICKING_TONADO
		defineSkill(SKILL_ID_FLICKING_TONADO, function() {
			this.name = "(△)フリッキングトルネード";
			this.kana = "フリッキングトルネネド";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR) > 0) {
					ratio += 200 + 20 * skillLv;
				} else {
					ratio += 170 + 15 * skillLv;
				}
				ratio += n_A_DEX;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

];
