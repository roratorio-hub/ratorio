/**
 * スキル定義 druid/5-alitea（30 件 / SKILL_ID 1366〜1395 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    MIG_PARAM_ID_CON, MIG_PARAM_ID_INT, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL
} from "../../const/EnumMigItemParamId.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_AERO_SYNC, SKILL_ID_ALPHA_CLAW, SKILL_ID_ALPHA_PHASE, SKILL_ID_APEX_PHASE, SKILL_ID_CHILLING_BLAST,
    SKILL_ID_FERAL_CLAW, SKILL_ID_FLIP_FLAP, SKILL_ID_FRENZY_FANG, SKILL_ID_FURIOS_STORM, SKILL_ID_GLACIER_MONOLITH,
    SKILL_ID_GLACIER_NOVA, SKILL_ID_GLACIER_SHARD, SKILL_ID_GLACIER_STOMP, SKILL_ID_GRAVITY_HOLE,
    SKILL_ID_GROUND_BLOOM, SKILL_ID_NATURE_AID, SKILL_ID_NATURE_HARMONY, SKILL_ID_PINION_SHOT, SKILL_ID_PRIMAL_CLAW,
    SKILL_ID_PULSE_OF_MADNESS, SKILL_ID_QUILL_SPEAR, SKILL_ID_ROARING_CHARGE, SKILL_ID_ROARING_PIERCER,
    SKILL_ID_SAVAGE_LUNGE, SKILL_ID_SIXTH_SENSE, SKILL_ID_SOLID_STOMP, SKILL_ID_TEMPEST_FLAP, SKILL_ID_TERRA_HARVEST,
    SKILL_ID_TERRA_WAVE, SKILL_ID_TRUTH_OF_EARTH, SKILL_ID_TRUTH_OF_ICE, SKILL_ID_TRUTH_OF_WIND,
    SKILL_ID_ZEPHYR_LINK
} from "../../skill.dat.js";

export const skills = [
		/** パルスオブマッドネス */
		// SKILL_ID_PULSE_OF_MADNESS
		defineSkill(SKILL_ID_PULSE_OF_MADNESS, function() {
			this.name = "パルスオブマッドネス";
			this.kana = "パルスオブマッドネス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		/** フリップフラップ */
		// SKILL_ID_FLIP_FLAP
		defineSkill(SKILL_ID_FLIP_FLAP, function() {
			this.name = "フリップフラップ";
			this.kana = "フリップフラップ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		/** シックスセンス */
		// SKILL_ID_SIXTH_SENSE
		defineSkill(SKILL_ID_SIXTH_SENSE, function() {
			this.name = "シックスセンス";
			this.kana = "シックスセンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** グレイシアモノリス */
		// SKILL_ID_GLACIER_MONOLITH
		defineSkill(SKILL_ID_GLACIER_MONOLITH, function() {
			this.name = "(△)グレイシアモノリス";
			this.kana = "グレイシアモノリス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 5600 + 520 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
					ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 20 * 1000;
			}
		}),

		/** ロアリングチャージ */
		// SKILL_ID_ROARING_CHARGE
		defineSkill(SKILL_ID_ROARING_CHARGE, function() {
			this.name = "(△)ロアリングチャージ";
			this.kana = "ロアリングチャャジ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) > 0) {
					// サンダリングロッドマックス状態
					ratio += 6500 + 1400 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					}
				} else {
					// 通常状態
					ratio += 4800 + 1200 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					}
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1300;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		/** テラハーベスト */
		// SKILL_ID_TERRA_HARVEST
		defineSkill(SKILL_ID_TERRA_HARVEST, function() {
			this.name = "(△)テラハーベスト";
			this.kana = "テラハハベスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 5600 + 520 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
					ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackIncrement = 2;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		/** プライマルクロー */
		// SKILL_ID_PRIMAL_CLAW
		defineSkill(SKILL_ID_PRIMAL_CLAW, function() {
			this.name = "(△)プライマルクロー";
			this.kana = "プライマルクロロ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) > 0) {
					// 狂気I 以上
					ratio += 2500 + 1000 * skillLv;
				} else {
					ratio += 2000 + 800 * skillLv;
				}
				ratio += 25 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
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
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 2) {
					// 狂気III
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** ピニオンショット */
		// SKILL_ID_PINION_SHOT
		defineSkill(SKILL_ID_PINION_SHOT, function() {
			this.name = "ピニオンショット";
			this.kana = "ピニオンショット";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 6350 + 925 * skillLv;
				ratio += 52 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 130;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 1) {
					// エイペックスフェーズ状態
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** アルファフェーズ */
		// SKILL_ID_ALPHA_PHASE
		defineSkill(SKILL_ID_ALPHA_PHASE, function() {
			this.name = "アルファフェーズ";
			this.kana = "アルファフェェズ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 320;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 56 - 6 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * skillLv;
			}
		}),

		/** グレイシアシャード */
		// SKILL_ID_GLACIER_SHARD
		defineSkill(SKILL_ID_GLACIER_SHARD, function() {
			this.name = "(△)グレイシアシャード";
			this.kana = "グレイシアシャャド";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 5600 + 520 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
					ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackIncrement = 1;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** ロアリングピアサー */
		// SKILL_ID_ROARING_PIERCER
		defineSkill(SKILL_ID_ROARING_PIERCER, function() {
			this.name = "(△)ロアリングピアサー";
			this.kana = "ロアリングピアササ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) > 0) {
					// サンダリングロッドマックス状態
					ratio += 7000 + 650 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					}
				} else {
					// 通常状態
					ratio += 5600 + 520 * skillLv;
					if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
						ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					}
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		/** テラウェーブ */
		// SKILL_ID_TERRA_WAVE
		defineSkill(SKILL_ID_TERRA_WAVE, function() {
			this.name = "(△)テラウェーブ";
			this.kana = "テラウェェブ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 5600 + 520 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
					ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackIncrement = 2;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		/** フェラルクロー */
		// SKILL_ID_FERAL_CLAW
		defineSkill(SKILL_ID_FERAL_CLAW, function() {
			this.name = "(△)フェラルクロー";
			this.kana = "フェラルクロロ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) > 0) {
					// 狂気I 以上
					ratio += 4000 + 1000 * skillLv;
				} else {
					ratio += 3200 + 800 * skillLv;
				}
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
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
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 2) {
					// 狂気III
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** クイールスピア */
		// SKILL_ID_QUILL_SPEAR
		defineSkill(SKILL_ID_QUILL_SPEAR, function() {
			this.name = "クイールスピア";
			this.kana = "クイイルスピア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 4250 + 625 * skillLv;
				ratio += 35 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 1) {
					// エイペックスフェーズ状態
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** エイペックスフェーズ */
		// SKILL_ID_APEX_PHASE
		defineSkill(SKILL_ID_APEX_PHASE, function() {
			this.name = "エイペックスフェーズ";
			this.kana = "エイペックスフェェズ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 320;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 56 - 6 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		/** グレイシアストンプ */
		// SKILL_ID_GLACIER_STOMP
		defineSkill(SKILL_ID_GLACIER_STOMP, function() {
			this.name = "(△)グレイシアストンプ";
			this.kana = "グレイシアストンプ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 4800 + 1200 * skillLv;
				if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
					ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** フューリアスストーム */
		// SKILL_ID_FURIOS_STORM
		defineSkill(SKILL_ID_FURIOS_STORM, function() {
			this.name = "(△)フューリアスストーム";
			this.kana = "フュュリアスストトム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.WeaponCondition = function(weapon) {
				return (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0);
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 4500 + 4500 * skillLv;
				ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
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

		/** ソリッドストンプ */
		// SKILL_ID_SOLID_STOMP
		defineSkill(SKILL_ID_SOLID_STOMP, function() {
			this.name = "(△)ソリッドストンプ";
			this.kana = "ソリッドストンプ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.WeaponCondition = function(weapon) {
				return (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0);
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 4500 + 4500 * skillLv;
				ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackIncrement = 2;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		/** アルファクロー */
		// SKILL_ID_ALPHA_CLAW
		defineSkill(SKILL_ID_ALPHA_CLAW, function() {
			this.name = "(△)アルファクロー";
			this.kana = "アルファクロロ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) > 0) {
					// 狂気I 以上
					ratio += 5500 + 1000 * skillLv;
				} else {
					ratio += 4400 + 800 * skillLv;
				}
				ratio += 35 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
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
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 2) {
					// 狂気III
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** テンペストフラップ */
		// SKILL_ID_TEMPEST_FLAP
		defineSkill(SKILL_ID_TEMPEST_FLAP, function() {
			this.name = "テンペストフラップ";
			this.kana = "テンペストフラップ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 9000 + 2250 * skillLv;
				ratio += 105 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 1) {
					// エイペックスフェーズ状態
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** チリングブラスト */
		// SKILL_ID_CHILLING_BLAST
		defineSkill(SKILL_ID_CHILLING_BLAST, function() {
			this.name = "(△)チリングブラスト";
			this.kana = "チリングブラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.WeaponCondition = function(weapon) {
				return (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0);
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 4500 + 4500 * skillLv;
				ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
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

		/** フレンジファング */
		// SKILL_ID_FRENZY_FANG
		defineSkill(SKILL_ID_FRENZY_FANG, function() {
			this.name = "(△)フレンジファング";
			this.kana = "フレンジファング";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				switch (option.GetOptionValue(0)) {
					case 0: // 狂気 無し
						ratio += 4500 + 1125 * skillLv;
						break;
					case 1: // 狂気I
						ratio += 4900 + 1250 * skillLv;
						break;
					case 2: // 狂気II
						ratio += 5500 + 1350 * skillLv;
						break;
					case 3: // 狂気III
						ratio += 6000 + 1500 * skillLv;
				}
				ratio += 45 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 110;
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
				return 500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 3) {
					// 狂気III
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** エアロシンク */
		// SKILL_ID_AERO_SYNC
		defineSkill(SKILL_ID_AERO_SYNC, function() {
			this.name = "エアロシンク";
			this.kana = "エアロシンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
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
				return (15 + 15 * skillLv) * 1000;
			}
		}),

		/** ネイチャーエイド */
		// SKILL_ID_NATURE_AID
		defineSkill(SKILL_ID_NATURE_AID, function() {
			this.name = "ネイチャーエイド";
			this.kana = "ネイチャャエイド";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ネイチャーハーモニー */
		// SKILL_ID_NATURE_HARMONY
		defineSkill(SKILL_ID_NATURE_HARMONY, function() {
			this.name = "ネイチャーハーモニー";
			this.kana = "ネイチャャハハモニニ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 320;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 20 + 6 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		/** グラビティホール */
		// SKILL_ID_GRAVITY_HOLE
		defineSkill(SKILL_ID_GRAVITY_HOLE, function() {
			this.name = "(△)グラビティホール";
			this.kana = "グラビティホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 10500 + 6000 * skillLv;
				ratio += 135 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 16000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		/** サベージランジ */
		// SKILL_ID_SAVAGE_LUNGE
		defineSkill(SKILL_ID_SAVAGE_LUNGE, function() {
			this.name = "(△)サベージランジ";
			this.kana = "サベベジランジ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (option.GetOptionValue(0) > 0) {
					// 狂気I 以上
					ratio += 7000 + 2000 * skillLv;
				} else {
					ratio += 5600 + 1600 * skillLv;
				}
				ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option) => {              // クリティカル発生率
				if (option.GetOptionValue(0) == 2) {
					// 狂気III
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),
		
		/** グレイシアノヴァ */
		// SKILL_ID_GLACIER_NOVA
		defineSkill(SKILL_ID_GLACIER_NOVA, function() {
			this.name = "(△)グレイシアノヴァ";
			this.kana = "グレイシアノヴァ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 10800;
				ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackLimit = 0;
		}),

		/** グラウンドブルーム */
		// SKILL_ID_GROUND_BLOOM
		defineSkill(SKILL_ID_GROUND_BLOOM, function() {
			this.name = "(△)グラウンドブルーム";
			this.kana = "グラウンドブルーム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 4500 + 4500 * skillLv;
				ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_INT);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.StackLimit = 12;
		}),

		/** ゼファーリンク */
		// SKILL_ID_ZEPHYR_LINK
		defineSkill(SKILL_ID_ZEPHYR_LINK, function() {
			this.name = "ゼファーリンク";
			this.kana = "ゼファーリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 10000;
			}
		}),

];
