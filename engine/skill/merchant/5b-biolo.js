/**
 * スキル定義 merchant/5b-biolo（17 件 / SKILL_ID 1159〜1315 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { MIG_PARAM_ID_POW } from "../../const/EnumMigItemParamId.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_ACIDIFIED_ZONE_CHI, SKILL_ID_ACIDIFIED_ZONE_HI, SKILL_ID_ACIDIFIED_ZONE_KAZE,
    SKILL_ID_ACIDIFIED_ZONE_MIZU, SKILL_ID_BIONICS_MASTERY, SKILL_ID_BIONIC_PHARMACY, SKILL_ID_CREATE_CREAPER,
    SKILL_ID_CREATE_HELL_TREE, SKILL_ID_CREATE_WOODEN_FAIRY, SKILL_ID_CREATE_WOODEN_WARRIER, SKILL_ID_DUST_EXPLOSION,
    SKILL_ID_EXPLOSIVE_POWDER, SKILL_ID_FULL_SHADOW_CHARGE, SKILL_ID_HALL_FULL_CHEMICAL_CHARGE,
    SKILL_ID_MEYHEMIC_THORNS, SKILL_ID_MYSTERY_POWDER, SKILL_ID_RESEARCH_REPORT
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// バイオニックファーマシー
		// ----------------------------------------------------------------
		// SKILL_ID_BIONIC_PHARMACY
		defineSkill(SKILL_ID_BIONIC_PHARMACY, function() {
			this.name = "バイオニックファーマシー";
			this.kana = "ハイオニツクフアアマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 90;
			}
		}),

		// ----------------------------------------------------------------
		// バイオニックスマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_BIONICS_MASTERY
		defineSkill(SKILL_ID_BIONICS_MASTERY, function() {

			this.name = "バイオニックスマスタリー";
			this.kana = "ハイオニツクマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ホールフルケミカルチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_HALL_FULL_CHEMICAL_CHARGE
		defineSkill(SKILL_ID_HALL_FULL_CHEMICAL_CHARGE, function() {
			this.name = "ホールフルケミカルチャージ";
			this.kana = "ホオルフルケミカルチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 370;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * skillLv * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// フルシャドウチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_SHADOW_CHARGE
		defineSkill(SKILL_ID_FULL_SHADOW_CHARGE, function() {
			this.name = "フルシャドウチャージ";
			this.kana = "フルシヤトウチヤアシ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (120 + 120 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// アシディファイドゾーン(水)
		// ----------------------------------------------------------------
		// SKILL_ID_ACIDIFIED_ZONE_MIZU
		defineSkill(SKILL_ID_ACIDIFIED_ZONE_MIZU, function() {

			this.name = "アシディファイドゾーン(水)";
			this.kana = "アシテイフアイトソオン　ミス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 480;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// アシディファイドゾーン(地)
		// ----------------------------------------------------------------
		// SKILL_ID_ACIDIFIED_ZONE_CHI
		defineSkill(SKILL_ID_ACIDIFIED_ZONE_CHI, function() {

			this.name = "アシディファイドゾーン(地)";
			this.kana = "アシテイフアイトソオン　チ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 480;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// アシディファイドゾーン(火)
		// ----------------------------------------------------------------
		// SKILL_ID_ACIDIFIED_ZONE_HI
		defineSkill(SKILL_ID_ACIDIFIED_ZONE_HI, function() {

			this.name = "アシディファイドゾーン(火)";
			this.kana = "アシテイフアイトソオン　ヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 540;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// アシディファイドゾーン(風)
		// ----------------------------------------------------------------
		// SKILL_ID_ACIDIFIED_ZONE_KAZE
		defineSkill(SKILL_ID_ACIDIFIED_ZONE_KAZE, function() {
			this.name = "アシディファイドゾーン(風)";
			this.kana = "アシテイフアイトソオン　カセ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 540;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// クリエイトウドゥンウォリアー
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_WOODEN_WARRIER
		defineSkill(SKILL_ID_CREATE_WOODEN_WARRIER, function() {
			this.name = "クリエイトウドゥンウォリアー";
			this.kana = "クリエイトウトウンウオリアア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 30, 60, 90, 120, 300][skillLv] * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// クリエイトウドゥンフェアリー
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_WOODEN_FAIRY
		defineSkill(SKILL_ID_CREATE_WOODEN_FAIRY, function() {
			this.name = "クリエイトウドゥンフェアリー";
			this.kana = "クリエイトウトウンフエアリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 400;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 30, 60, 90, 120, 300][skillLv] * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// クリエイトクリーパー
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_CREAPER
		defineSkill(SKILL_ID_CREATE_CREAPER, function() {
			this.name = "クリエイトクリーパー";
			this.kana = "クリエイトクリイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 150;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 30, 60, 90, 120, 300][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// リサーチレポート
		// ----------------------------------------------------------------
		// SKILL_ID_RESEARCH_REPORT
		defineSkill(SKILL_ID_RESEARCH_REPORT, function() {
			this.name = "リサーチレポート";
			this.kana = "リサアチレホオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 610;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
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
		// クリエイトヘルツリー
		// ----------------------------------------------------------------
		// SKILL_ID_CREATE_HELL_TREE
		defineSkill(SKILL_ID_CREATE_HELL_TREE, function() {
			this.name = "クリエイトヘルツリー";
			this.kana = "クリエイトヘルツリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 810;
			}
			this.CostAP = function(skillLv, charaDataManger) {       	// 消費AP
				return 57 - 7 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 30, 60, 90, 120, 300][skillLv] * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// エクスプロッシブパウダー
		// ----------------------------------------------------------------
		// SKILL_ID_EXPLOSIVE_POWDER
		defineSkill(SKILL_ID_EXPLOSIVE_POWDER, function() {
			this.name = "エクスプロッシブパウダー";
			this.kana = "エクスフロツシフハウタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// TODO: リサーチレポートはスキル倍率のみに影響を与えるので職固有自己支援からオプションへ移行する
				const state_research_report = Math.max(UsedSkillSearch(SKILL_ID_RESEARCH_REPORT),option.GetOptionValue(0)) > 0;
				if (state_research_report) {
					ratio = 7750 + 1750 * skillLv;
					ratio += 55 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				} else {
					ratio = 5700 + 1500 * skillLv;
					ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				}
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000 + 200 * skillLv;
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
		}),

		// ----------------------------------------------------------------
		// メイヘミックソーンズ
		// ----------------------------------------------------------------
		// SKILL_ID_MEYHEMIC_THORNS
		defineSkill(SKILL_ID_MEYHEMIC_THORNS, function() {
			this.name = "メイヘミックソーンズ";
			this.kana = "メイヘミツクソオンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = 2;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_RESEARCH_REPORT) > 0) {
					// レポートあり
					ratio = 3200 + 400 * skillLv;
					// 特性ステータス補正
					ratio += 24 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				} else {
					// レポートなし
					ratio = 2700 + 300 * skillLv;
					// 特性ステータス補正
					ratio += 19 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				}
				// BaseLv補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** ミステリーパウダー */
		// SKILL_ID_MYSTERY_POWDER
		defineSkill(SKILL_ID_MYSTERY_POWDER, function() {
			this.name = "ミステリーパウダー";
			this.kana = "ミステリーパウダー";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 5950 + 1450 * skillLv;
				ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000 + 200 * skillLv;
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
				return 0;
				//return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
				//return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** ダストエクスプロージョン */
		// SKILL_ID_DUST_EXPLOSION
		defineSkill(SKILL_ID_DUST_EXPLOSION, function() {
			this.name = "ダストエクスプロージョン";
			this.kana = "ダストエクスプロージョン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			// ミステリーパウダー状態の制約をかけるメリットはないので無条件で計算可能とする
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: リサーチレポートはスキル倍率のみに影響するので職固有自己支援から攻撃オプションへ移行する
				const state_research_report = Math.max(UsedSkillSearch(SKILL_ID_RESEARCH_REPORT), option.GetOptionValue(0)) === 1;
				if (state_research_report) {
					ratio += 7000 + 1900 * skillLv;
					ratio += 55 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				} else {
					ratio += 5950 + 1450 * skillLv;
					ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000 + 200 * skillLv;
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
				return 0;
				//return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
				//return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
