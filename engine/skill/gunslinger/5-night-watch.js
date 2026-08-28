/**
 * スキル定義 gunslinger/5-night-watch（20 件 / SKILL_ID 1212〜1297 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../bridge/hmjob-bridge.js";
import { n_A_ActiveSkillLV, n_A_BaseLV } from "../../runtime/ro4-state.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_RIFLE, ITEM_KIND_SHOTGUN
} from "../../const/EnumItemKind.js";
import { MIG_PARAM_ID_CON } from "../../const/EnumMigItemParamId.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_AUTO_FIRING_LAUNCHER, SKILL_ID_BASIC_GRENADE, SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL,
    SKILL_ID_GRENADES_DROPPING, SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL, SKILL_ID_GRENADE_FRAGMENT,
    SKILL_ID_GRENADE_MASTERY, SKILL_ID_HASTY_FIRE_IN_THE_HOLE, SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL,
    SKILL_ID_HIDDEN_CARD, SKILL_ID_INTENSIVE_AIM, SKILL_ID_MAGAZIN_FOR_ONE, SKILL_ID_MIDNIGHT_FALLEN,
    SKILL_ID_MISSION_BOMBARD, SKILL_ID_ONLY_ONE_BULLET, SKILL_ID_PFI, SKILL_ID_SPIRAL_SHOOTING,
    SKILL_ID_VIGILANT_AT_NIGHT, SKILL_ID_WILD_FIRE, SKILL_ID_WILD_SHOT
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// P.F.I
		// ----------------------------------------------------------------
		// SKILL_ID_PFI
		defineSkill(SKILL_ID_PFI, function() {
			this.name = "P.F.I";
			this.kana = "ヒイエフアイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;			
		}),

		// ----------------------------------------------------------------
		// グレネードマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADE_MASTERY
		defineSkill(SKILL_ID_GRENADE_MASTERY, function() {
			this.name = "グレネードマスタリー";
			this.kana = "クレネエトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// インテンシブエイム
		// ----------------------------------------------------------------
		// SKILL_ID_INTENSIVE_AIM
		defineSkill(SKILL_ID_INTENSIVE_AIM, function() {
			this.name = "インテンシブエイム";
			this.kana = "インテンシフエイム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 240;
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

		// ----------------------------------------------------------------
		// ヒドゥンカード
		// ----------------------------------------------------------------
		// SKILL_ID_HIDDEN_CARD
		defineSkill(SKILL_ID_HIDDEN_CARD, function() {
			this.name = "ヒドゥンカード";
			this.kana = "ヒトウンカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 20 + 3 * skillLv;
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

		// ----------------------------------------------------------------
		// オンリーワンバレット
		// ----------------------------------------------------------------
		// SKILL_ID_ONLY_ONE_BULLET
		defineSkill(SKILL_ID_ONLY_ONE_BULLET, function() {
			this.name = "オンリーワンバレット";
			this.kana = "オンリイワンハレツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_HANDGUN,ITEM_KIND_RIFLE].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				if (weapon == ITEM_KIND_HANDGUN) {
					ratio = 6500 + 1000 * skillLv;
				}
				else if (weapon == ITEM_KIND_RIFLE) {
					ratio = 3250 + 550 * skillLv;
				}
				// CON補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// 照準カウンター補正
				ratio += (950 + 150 * skillLv) * option.GetOptionValue(0);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 100;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option, weapon) => {              // クリティカル発生率
				if (weapon == ITEM_KIND_RIFLE) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// スパイラルシューティング
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_SHOOTING
		defineSkill(SKILL_ID_SPIRAL_SHOOTING, function() {
			this.name = "スパイラルシューティング";
			this.kana = "スハイラルシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// マガジンフォーワン
		// ----------------------------------------------------------------
		// SKILL_ID_MAGAZIN_FOR_ONE
		defineSkill(SKILL_ID_MAGAZIN_FOR_ONE, function() {
			this.name = "マガジンフォーワン";
			this.kana = "マカシンフオオワン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 100;
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
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// ビジラントアットナイト
		// ----------------------------------------------------------------
		// SKILL_ID_VIGILANT_AT_NIGHT
		defineSkill(SKILL_ID_VIGILANT_AT_NIGHT, function() {
			this.name = "ビジラントアットナイト";
			this.kana = "ヒシラントアツトナイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ワイルドファイア
		// ----------------------------------------------------------------
		// SKILL_ID_WILD_FIRE
		defineSkill(SKILL_ID_WILD_FIRE, function() {
			this.name = "ワイルドファイア";
			this.kana = "ワイルトフアイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 3;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_SHOTGUN,ITEM_KIND_GRENADEGUN].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				ratio += 4150 + 650 * skillLv;
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				ratio += (950 + 150 * n_A_ActiveSkillLV) * option.GetOptionValue(0);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ベーシックグレネード
		// ----------------------------------------------------------------
		// SKILL_ID_BASIC_GRENADE
		defineSkill(SKILL_ID_BASIC_GRENADE, function() {
			this.name = "ベーシックグレネード";
			this.kana = "ヘエシツククレネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 5450 + 600 * skillLv;					// 基本
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				ratio += 50 * grenade_mastery_lv;
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 200;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ヘイスティファイアインザホール
		// ----------------------------------------------------------------
		/*
			実際には
			指定セルの周辺5x5セルに2hit → 0.3秒後さらに2hit → 0.3秒後さらに2hit
			なのでいまのダメージの表示方法は厳密ではないかもしれない
		*/
		// SKILL_ID_HASTY_FIRE_IN_THE_HOLE
		defineSkill(SKILL_ID_HASTY_FIRE_IN_THE_HOLE, function() {
			this.name = "ヘイスティファイアインザホール";
			this.kana = "ヘイステイフアイアインサホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = 2;
			this.hitCount = 3;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 6250 + 600 * skillLv;							// 基本
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				ratio += 20 * grenade_mastery_lv;					 	// グレネードマスタリー補正
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// グレネーズドロッピング
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADES_DROPPING
		defineSkill(SKILL_ID_GRENADES_DROPPING, function() {
			this.name = "グレネーズドロッピング";
			this.kana = "クレネエストロツヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.ground_installation = true;
			this.damageInterval = 250;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 2450 + 300 * skillLv;				// 基本
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// 特性ステータス補正
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				ratio += 30 * grenade_mastery_lv;					// グレネードマスタリー補正
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 3500 + 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 4 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ミッションボンバード
		// ----------------------------------------------------------------
		// SKILL_ID_MISSION_BOMBARD
		defineSkill(SKILL_ID_MISSION_BOMBARD, function() {
			this.name = "ミッションボンバード";
			this.kana = "ミツシヨンホンハアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.ground_installation = function(option) {
				return option.GetOptionValue(1) == 1;
			}
			this.damageInterval = 250;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				if (option.GetOptionValue(1) === 0) {
					// 初撃
					ratio = 17000 + 1150 * skillLv;						// 基本
					ratio += 100 * grenade_mastery_lv;					// グレネードマスタリー補正
				} else {
					// 追撃
					ratio = 14250 + 900 * skillLv;						// 基本
					ratio += 30 * grenade_mastery_lv;					// グレネードマスタリー補正
				}
				// 特性ステータス補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// BaseLv補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 15 + skillLv;
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
				return 4500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 4000;
			}
		}),

		// ----------------------------------------------------------------
		// オートファイアリングランチャー
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_FIRING_LAUNCHER
		defineSkill(SKILL_ID_AUTO_FIRING_LAUNCHER, function() {
			this.name = "オートファイアリングランチャー";
			this.kana = "オオトフアイアリンクランチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,240,180,120,90,60][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ベーシックグレネード 習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL
		defineSkill(SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL, function() {
			this.name = "ベーシックグレネード習得レベル";
			this.kana = "ヘエシツククレネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヘイスティファイアインザホール 習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL
		defineSkill(SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL, function() {
			this.name = "ヘイスティファイアインザホール習得レベル";
			this.kana = "ヘイステイフアイアインサホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// グレネーズドロッピング 習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL
		defineSkill(SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL, function() {
			this.name = "グレネーズドロッピング習得レベル";
			this.kana = "クレネエストロツヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// グレネードフラグメント
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADE_FRAGMENT
		defineSkill(SKILL_ID_GRENADE_FRAGMENT, function() {
			this.name = "グレネードフラグメント";
			this.kana = "クレネエトフラクメント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ワイルドショット */
		// SKILL_ID_WILD_SHOT
		defineSkill(SKILL_ID_WILD_SHOT, function() {
			this.name = "ワイルドショット";
			this.kana = "ワイルドショット";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = [ITEM_KIND_HANDGUN, ITEM_KIND_RIFLE].includes(weapon);
				return mutch_weapon;
			}
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// ヒドゥンカードはスキル倍率だけでなくP.Atkと遠距離ダメージに影響するので職固有自己支援で設定する
				const state_hidden_card = Math.max(UsedSkillSearch(SKILL_ID_HIDDEN_CARD));
				if (state_hidden_card > 0) {
					ratio += 475 + 205 * skillLv;
				} else {
					ratio += 475 + 125 * skillLv;
				}
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// Con係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 220;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** ミッドナイトフォーリン */
		// SKILL_ID_MIDNIGHT_FALLEN
		defineSkill(SKILL_ID_MIDNIGHT_FALLEN, function() {
			this.name = "ミッドナイトフォーリン";
			this.kana = "ミッドナイトフォーリン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = [ITEM_KIND_SHOTGUN, ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN].includes(weapon);
				return mutch_weapon;
			}
			this.hitCount = 3;
			// Def無視設定は head.js の _SUB_ApplyMonsterDefence にある
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// ヒドゥンカードはスキル倍率だけでなくP.Atkと遠距離ダメージに影響するので職固有自己支援で設定する
				const state_hidden_card = Math.max(UsedSkillSearch(SKILL_ID_HIDDEN_CARD));
				if (state_hidden_card > 0) {
					ratio += 925 + 235 * skillLv;
				} else {
					ratio += 925 + 125 * skillLv;
				}
				ratio += 7 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// Con係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				//return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				//return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

];
