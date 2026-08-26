/**
 * スキル定義 thief/5a-shadow-cross（11 件 / SKILL_ID 1013〜1312 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { ITEM_KIND_KATAR, ITEM_KIND_KNIFE } from "../../const/EnumItemKind.js";
import { MIG_PARAM_ID_POW } from "../../const/EnumMigItemParamId.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_CROSS_SLASH, SKILL_ID_DANCING_KNIFE, SKILL_ID_ENCHANTING_SHADOW, SKILL_ID_ETERNAL_SLASH,
    SKILL_ID_FATAL_SHADOW_CRAW, SKILL_ID_IMPACT_CRATER, SKILL_ID_POTENT_VENOM, SKILL_ID_SAVAGE_IMPACT,
    SKILL_ID_SHADOW_EXCEED, SKILL_ID_SHADOW_SENSE, SKILL_ID_SHADOW_STAB
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ダンシングナイフ
		// ----------------------------------------------------------------
		// SKILL_ID_DANCING_KNIFE
		defineSkill(SKILL_ID_DANCING_KNIFE, function() {
			this.name = "ダンシングナイフ";
			this.kana = "タンシンクナイフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.ground_installation = true;	// 自キャラを中心にした地面設置スキルとして計算する
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.WeaponCondition = function(weapon) {
				return (weapon === ITEM_KIND_KNIFE);
			}
			this.Power = function(skillLv, charaData, option) {       	// スキル倍率
				// Lv1 と Lv3 で +6 程度の誤差がありますが計算式に問題はないと判断しています
				let ratio = 0;
				ratio = 100 + 100 * skillLv;
				ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 290;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 240, 180, 120, 90, 60][skillLv] * 1000;
			}
			this.damageInterval = function(skillLv) {
				return 300;
			}
		}),

		// ----------------------------------------------------------------
		// サベージインパクト
		// ----------------------------------------------------------------
		// SKILL_ID_SAVAGE_IMPACT
		defineSkill(SKILL_ID_SAVAGE_IMPACT, function() {
			this.name = "サベージインパクト";
			this.kana = "サヘエシインハクト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.WeaponCondition = function(weapon) {
				return (weapon === ITEM_KIND_KATAR);
			}
			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(0) + 1;
			}
			this.Power = function(skillLv, charaData, option) {			// スキル倍率
				let ratio = 0;
				ratio = 500 + 100 * skillLv;
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				if (UsedSkillSearch(SKILL_ID_SHADOW_EXCEED) > 0) {
					ratio *= 2;
				}
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// シャドウセンス
		// ----------------------------------------------------------------
		// SKILL_ID_SHADOW_SENSE
		defineSkill(SKILL_ID_SHADOW_SENSE, function() {
			this.name = "シャドウセンス";
			this.kana = "シヤトウセンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// エターナルスラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_ETERNAL_SLASH
		defineSkill(SKILL_ID_ETERNAL_SLASH, function() {
			this.name = "エターナルスラッシュ";
			this.kana = "エタアナルスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.hitCount = function(skillLv, option) {
				return option.GetOptionValue(0);
			}
			this.Power = function(skillLv, charaData, option) {       	// スキル倍率
				// Lv1 と Lv3 のとき +4 の誤差がありますがスキル倍率以外の計算に起因するものだと判断しています
				let ratio = 0;
				ratio = 50 + 50 * skillLv;
				ratio += 1 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				if (UsedSkillSearch(SKILL_ID_SHADOW_EXCEED) > 0) {
					// シャドウエクシード状態時、倍率２倍
					ratio *= 2;
				}
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 120;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				// エターナルカウンターの持続時間 3秒
				return 3000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// エンチャンティングシャドウ
		// ----------------------------------------------------------------
		// SKILL_ID_ENCHANTING_SHADOW
		defineSkill(SKILL_ID_ENCHANTING_SHADOW, function() {
			this.name = "(×)エンチャンティングシャドウ";
			this.kana = "エンチヤンテインクシヤトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ポテントベナム
		// ----------------------------------------------------------------
		// SKILL_ID_POTENT_VENOM
		defineSkill(SKILL_ID_POTENT_VENOM, function() {
			this.name = "ポテントベナム";
			this.kana = "ホテントヘナム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (25 + 5 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// シャドウエクシード
		// ----------------------------------------------------------------
		// SKILL_ID_SHADOW_EXCEED
		defineSkill(SKILL_ID_SHADOW_EXCEED, function() {
			this.name = "シャドウエクシード";
			this.kana = "シヤトウエクシイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 290;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 53 - 3 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (50 + 10 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// フェイタルシャドウクロー
		// ----------------------------------------------------------------
		// SKILL_ID_FATAL_SHADOW_CRAW
		defineSkill(SKILL_ID_FATAL_SHADOW_CRAW, function() {
			this.name = "フェイタルシャドウクロー";
			this.kana = "フエイタルシヤトウクロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {			// スキル倍率
				// Lv1 で +35 の誤差があるが Lv2 は誤差ゼロ
				// スキル倍率とは異なる根本的な計算部分で誤差が生じている可能性がある
				let ratio = 0;
				ratio = 600 + 150 * skillLv;
				ratio += 7 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 310;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 15 + skillLv;
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
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return 10000;	// 100%
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// シャドウスタブ
		// ----------------------------------------------------------------
		// SKILL_ID_SHADOW_STAB
		defineSkill(SKILL_ID_SHADOW_STAB, function() {
			this.name = "シャドウスタブ";
			this.kana = "シヤトウスタフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {			// スキル倍率
				// +6程度の誤差があるためスキル計算式以外の場所に問題があると考えられます
				let ratio = 0;
				ratio = 500 + 500 * skillLv;
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 100;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 300 * skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// インパクトクレーター
		// ----------------------------------------------------------------
		// SKILL_ID_IMPACT_CRATER
		defineSkill(SKILL_ID_IMPACT_CRATER, function() {
			this.name = "インパクトクレーター";
			this.kana = "インハクトクレエタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {			// スキル倍率
				let ratio = 0;
				ratio = 500 + 200 * skillLv;
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData, option, weapon) => {
				if (weapon === ITEM_KIND_KATAR) {
					return this._CriActRate100(skillLv, charaData, specData, mobData) / 2;
				} else {
					return 0;
				}
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** クロススラッシュ */
		// SKILL_ID_CROSS_SLASH
		defineSkill(SKILL_ID_CROSS_SLASH, function() {
			this.name = "クロススラッシュ";
			this.kana = "クロススラッシュ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: シャドウエクシード状態はスキル倍率のみに影響するため職固有自己支援から攻撃オプションへ移行する
				const state_shadow_exceed = Math.max(UsedSkillSearch(SKILL_ID_SHADOW_EXCEED), option.GetOptionValue(0)) > 0;
				ratio += 50 + 50 * skillLv;
				ratio += 1 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				if (state_shadow_exceed) {
					ratio *= 2;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0 * skillLv;
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
				return 10 * 1000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
