/**
 * スキル定義 36-elemental-master-biolo（SKILL_ID 1142–1172 / 31 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { MIG_PARAM_ID_SPL } from '../const/EnumMigItemParamId.js';
import { UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_ACIDIFIED_ZONE_CHI, SKILL_ID_ACIDIFIED_ZONE_HI, SKILL_ID_ACIDIFIED_ZONE_KAZE,
    SKILL_ID_ACIDIFIED_ZONE_MIZU, SKILL_ID_ACTIVITY_BURN, SKILL_ID_BIONICS_MASTERY, SKILL_ID_BIONIC_PHARMACY,
    SKILL_ID_CONFLAGRATION, SKILL_ID_CREATE_CREAPER, SKILL_ID_CREATE_HELL_TREE, SKILL_ID_CREATE_WOODEN_FAIRY,
    SKILL_ID_CREATE_WOODEN_WARRIER, SKILL_ID_DIAMOND_STORM, SKILL_ID_DRAGONIC_AURA_STATE, SKILL_ID_ELEMENTAL_BASTER,
    SKILL_ID_ELEMENTAL_SPIRIT_MASTERY, SKILL_ID_ELEMENTAL_VEIL, SKILL_ID_FULL_SHADOW_CHARGE,
    SKILL_ID_HALL_FULL_CHEMICAL_CHARGE, SKILL_ID_INCREASING_ACTIVITY, SKILL_ID_LIGHTNING_LAND,
    SKILL_ID_MAHO_HON_SHUREN, SKILL_ID_RESEARCH_REPORT, SKILL_ID_SERE, SKILL_ID_SPELL_ENCHANTING,
    SKILL_ID_SUMMON_ALDOR, SKILL_ID_SUMMON_DILBIO, SKILL_ID_SUMMON_PROCERA, SKILL_ID_SUMMON_SERPENSE,
    SKILL_ID_SUMMON_TELEMOTUS, SKILL_ID_TERA_DRIVE, SKILL_ID_VENOM_SWAMP
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 魔法本修練
		// ----------------------------------------------------------------
		// SKILL_ID_MAHO_HON_SHUREN
		defineSkill(SKILL_ID_MAHO_HON_SHUREN, function() {
			this.name = "魔法本修練";
			this.kana = "マホウホンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スペルエンチャンティング
		// ----------------------------------------------------------------
		// SKILL_ID_SPELL_ENCHANTING
		defineSkill(SKILL_ID_SPELL_ENCHANTING, function() {

			this.name = "(×)スペルエンチャンティング";
			this.kana = "スヘルエンチヤンテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;


			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 90000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// アクティビティバーン
		// ----------------------------------------------------------------
		// SKILL_ID_ACTIVITY_BURN
		defineSkill(SKILL_ID_ACTIVITY_BURN, function() {

			this.name = "アクティビティバーン";
			this.kana = "アクテイヒテイハアン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return [0, 60, 80, 110, 150, 200][skillLv];
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// インクリーシングアクティビティ
		// ----------------------------------------------------------------
		// SKILL_ID_INCREASING_ACTIVITY
		defineSkill(SKILL_ID_INCREASING_ACTIVITY, function() {

			this.name = "インクリーシングアクティビティ";
			this.kana = "インクリイシンクアクテイヒテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50 + 10 * skillLv;
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
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ダイヤモンドストーム
		// ----------------------------------------------------------------
		// SKILL_ID_DIAMOND_STORM
		defineSkill(SKILL_ID_DIAMOND_STORM, function() {
			this.name = "ダイヤモンドストーム";
			this.kana = "タイヤモントストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// ダメージ倍率
				if (UsedSkillSearch(SKILL_ID_SERE) == 14) { // 14: 水 ディルビオ
					// 四次精霊あり
					ratio = 6000 + 1500 * skillLv;
					ratio += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				} else {
					// 四次精霊なし
					ratio = 4000 + 1000 * skillLv;
					ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 400;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ライトニングランド
		// ----------------------------------------------------------------
		// SKILL_ID_LIGHTNING_LAND
		defineSkill(SKILL_ID_LIGHTNING_LAND, function() {

			this.name = "ライトニングランド";
			this.kana = "ライトニンクラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 440;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 + (200 * skillLv));
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 3000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ベナムスワンプ
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_SWAMP
		defineSkill(SKILL_ID_VENOM_SWAMP, function() {

			this.name = "ベナムスワンプ";
			this.kana = "ヘナムスワンフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_POISON;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 350;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 + (200 * skillLv));
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 3000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// コンフラグレーション
		// ----------------------------------------------------------------
		// SKILL_ID_CONFLAGRATION
		defineSkill(SKILL_ID_CONFLAGRATION, function() {
			this.name = "コンフラグレーション";
			this.kana = "コンフラクレエシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 440;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 + (200 * skillLv));
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 3000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// テラドライブ
		// ----------------------------------------------------------------
		// SKILL_ID_TERA_DRIVE
		defineSkill(SKILL_ID_TERA_DRIVE, function() {
			this.name = "テラドライブ";
			this.kana = "テラトライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// ダメージ倍率
				if (UsedSkillSearch(SKILL_ID_SERE) == 16) { // 16: 地 テレモトゥス
					// 四次精霊あり
					ratio = 6000 + 1500 * skillLv;
					ratio += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				} else {
					// 四次精霊なし
					ratio = 4000 + 1000 * skillLv;
					ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 400;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// エレメンタルスピリットマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_SPIRIT_MASTERY
		defineSkill(SKILL_ID_ELEMENTAL_SPIRIT_MASTERY, function() {
			this.name = "(×)エレメンタルスピリットマスタリー";
			this.kana = "エレメンタルスヒリツトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// サモンアルドール
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_ALDOR
		defineSkill(SKILL_ID_SUMMON_ALDOR, function() {

			this.name = "サモンアルドール";
			this.kana = "サモンアルトオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
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
				return 500;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 1200000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンディルビオ
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_DILBIO
		defineSkill(SKILL_ID_SUMMON_DILBIO, function() {

			this.name = "サモンディルビオ";
			this.kana = "サモンテイルヒオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
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
				return 500;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 1200000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンプロセラ
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_PROCERA
		defineSkill(SKILL_ID_SUMMON_PROCERA, function() {

			this.name = "サモンプロセラ";
			this.kana = "サモンフロセラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
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
				return 500;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 1200000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンテレモトゥス
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_TELEMOTUS
		defineSkill(SKILL_ID_SUMMON_TELEMOTUS, function() {

			this.name = "サモンテレモトゥス";
			this.kana = "サモンテレモトウス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
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
				return 500;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 1200000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サモンサーペンス
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_SERPENSE
		defineSkill(SKILL_ID_SUMMON_SERPENSE, function() {

			this.name = "サモンサーペンス";
			this.kana = "サモンサアヘンス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 260;
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
				return 500;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 1200000;
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// エレメンタルバスター
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_BASTER
		defineSkill(SKILL_ID_ELEMENTAL_BASTER, function() {

			this.name = "エレメンタルバスター";
			this.kana = "エレメンタルハスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 530;
			}
			this.CostAP = function(skillLv, charaDataManger) {
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// エレメンタルヴェール
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_VEIL
		defineSkill(SKILL_ID_ELEMENTAL_VEIL, function() {

			this.name = "エレメンタルヴェール";
			this.kana = "エレメンタルウエエル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 10000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 90000, 120000, 180000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

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
		// ドラゴニックオーラ状態
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGONIC_AURA_STATE
		defineSkill(SKILL_ID_DRAGONIC_AURA_STATE, function() {

			this.name = "ドラゴニックオーラ状態";
			this.kana = "トラコニツクオオラシヨウタイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
