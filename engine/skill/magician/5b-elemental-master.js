/**
 * スキル定義 magician/5b-elemental-master（18 件 / SKILL_ID 1142〜1290 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { MIG_PARAM_ID_SPL } from "../../const/EnumMigItemParamId.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_ACTIVITY_BURN, SKILL_ID_CONFLAGRATION, SKILL_ID_DIAMOND_STORM, SKILL_ID_ELEMENTAL_BASTER,
    SKILL_ID_ELEMENTAL_SPIRIT_MASTERY, SKILL_ID_ELEMENTAL_VEIL, SKILL_ID_INCREASING_ACTIVITY,
    SKILL_ID_LIGHTNING_LAND, SKILL_ID_MAHO_HON_SHUREN, SKILL_ID_PSYCHIC_STREAM, SKILL_ID_SERE,
    SKILL_ID_SPELL_ENCHANTING, SKILL_ID_SUMMON_ALDOR, SKILL_ID_SUMMON_DILBIO, SKILL_ID_SUMMON_PROCERA,
    SKILL_ID_SUMMON_SERPENSE, SKILL_ID_SUMMON_TELEMOTUS, SKILL_ID_TERA_DRIVE, SKILL_ID_VENOM_SWAMP
} from "../../skill.dat.js";

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

		/** サイキックストリーム */
		// SKILL_ID_PSYCHIC_STREAM
		defineSkill(SKILL_ID_PSYCHIC_STREAM, function() {
			this.name = "サイキックストリーム";
			this.kana = "サイキックストリーム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			// 「使用条件 : 「エナジーコート」状態 ではない」を厳密に処理するメリットがないと思うので無条件使用可
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = 4500 + 4500 * skillLv;
				ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 420;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5500 + 800 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
		}),

];
