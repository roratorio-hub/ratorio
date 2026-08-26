/**
 * スキル定義 acolyte/5b-inquisitor（18 件 / SKILL_ID 1110〜1302 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { CHARA_DATA_INDEX_MAXHP } from "../../const/EnumCharaDataIndex.js";
import { MIG_PARAM_ID_POW } from "../../const/EnumMigItemParamId.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_BAKKA_SHINDAN, SKILL_ID_BAKURETSU_HADO, SKILL_ID_BLAZING_FLAME_BLAST, SKILL_ID_CHUZITSUNA_SHINNEN,
    SKILL_ID_DAIICHIGEKI_RAKUIN, SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA, SKILL_ID_DAINIGEKI_METSUMANO_HI,
    SKILL_ID_DAINIGEKI_SHINNEN, SKILL_ID_DAINIGEKI_SHINPAN, SKILL_ID_DAINISHO_SHIPANSHA, SKILL_ID_DAISANGEKI_DANZAI,
    SKILL_ID_DAISANGEKI_MEKKAGEKI, SKILL_ID_DAISANGEKI_ZYOKA, SKILL_ID_ENKA_METSUMA_SHINDAN,
    SKILL_ID_KENKONA_SHINNEN, SKILL_ID_KIKO, SKILL_ID_KYOZINNA_SHINNEN, SKILL_ID_SAISHUSHO_METSUMANO_HONO,
    SKILL_ID_SEYU_SENRE, SKILL_ID_SHINKONO_ISHI
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 強靭な信念
		// ----------------------------------------------------------------
		// SKILL_ID_KYOZINNA_SHINNEN
		defineSkill(SKILL_ID_KYOZINNA_SHINNEN, function() {

			this.name = "強靭な信念";
			this.kana = "キヨウシンナシンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return [0, 240, 180, 120, 90, 60][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 堅固な信念
		// ----------------------------------------------------------------
		// SKILL_ID_KENKONA_SHINNEN
		defineSkill(SKILL_ID_KENKONA_SHINNEN, function() {

			this.name = "堅固な信念";
			this.kana = "ケンコナシンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return [0, 240, 180, 120, 90, 60][skillLv] * 1000;
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
		// 信仰の意志
		// ----------------------------------------------------------------
		// SKILL_ID_SHINKONO_ISHI
		defineSkill(SKILL_ID_SHINKONO_ISHI, function() {

			this.name = "信仰の意志";
			this.kana = "シンコウノイシ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 聖油洗礼
		// ----------------------------------------------------------------
		// SKILL_ID_SEYU_SENRE
		defineSkill(SKILL_ID_SEYU_SENRE, function() {
			this.name = "聖油洗礼";
			this.kana = "セイユセンレイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 2000 + 500 * skillLv;
				// POW補正
				ratio += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
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
				return 1000;
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
		// 忠実な信念
		// ----------------------------------------------------------------
		// SKILL_ID_CHUZITSUNA_SHINNEN
		defineSkill(SKILL_ID_CHUZITSUNA_SHINNEN, function() {

			this.name = "忠実な信念";
			this.kana = "チユウシツナシンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return [0, 240, 180, 120, 90, 60][skillLv] * 1000;
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
		// 第一撃：烙印
		// ----------------------------------------------------------------
		// SKILL_ID_DAIICHIGEKI_RAKUIN
		defineSkill(SKILL_ID_DAIICHIGEKI_RAKUIN, function() {
			this.name = "第一撃：烙印";
			this.kana = "タイ１ケキ　ラクイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 2900 + 500 * skillLv;
				// POW補正
				ratio += 18 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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
				return 5000;
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
		// 第一章：信念の力
		// ----------------------------------------------------------------
		// SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA
		defineSkill(SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA, function() {

			this.name = "第一章：信念の力";
			this.kana = "タイ１シヨウ　シンネンノチカラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 220;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
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
				return [0, 120000, 90000, 60000, 3000, 500][skillLv];
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
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
		// 第三撃：断罪
		// ----------------------------------------------------------------
		// SKILL_ID_DAISANGEKI_DANZAI
		defineSkill(SKILL_ID_DAISANGEKI_DANZAI, function() {
			this.name = "第三撃：断罪";
			this.kana = "タイ３ケキ　タンサイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skilLLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 7000 + 1000 * skilLLv;
				// POW補正
				ratio += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 第三撃：滅火撃
		// ----------------------------------------------------------------
		// SKILL_ID_DAISANGEKI_MEKKAGEKI
		defineSkill(SKILL_ID_DAISANGEKI_MEKKAGEKI, function() {
			this.name = "第三撃：滅火撃";
			this.kana = "タイ３ケキ　メツカケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.hitCount = function(skillLv) {
				const count = Math.ceil(UsedSkillSearch(SKILL_ID_KIKO) / 5);
				return Math.max(1, count);
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 7000 + 1000 * skillLv;
				// POW補正
				ratio += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// MaxHP補正
				ratio += charaData[CHARA_DATA_INDEX_MAXHP] / 100;
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
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
		// 第三撃：浄化
		// ----------------------------------------------------------------
		// SKILL_ID_DAISANGEKI_ZYOKA
		defineSkill(SKILL_ID_DAISANGEKI_ZYOKA, function() {
			this.name = "第三撃：浄化";
			this.kana = "タイ３ケキ　シヨウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.hitCount = function(skillLv) {
				return 2;
			}
			this.Power= function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 7000 + 1000 * skillLv;
				// POW補正
				ratio += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
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
		// 第二撃：滅魔の火
		// ----------------------------------------------------------------
		// SKILL_ID_DAINIGEKI_METSUMANO_HI
		defineSkill(SKILL_ID_DAINIGEKI_METSUMANO_HI, function() {
			this.name = "第二撃：滅魔の火";
			this.kana = "タイ２ケキ　メツマノヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 5750 + 1250 * skillLv;
				// POW補正
				ratio += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
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
				return 500 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 5000;
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
		// 第二撃：信念
		// ----------------------------------------------------------------
		// SKILL_ID_DAINIGEKI_SHINNEN
		defineSkill(SKILL_ID_DAINIGEKI_SHINNEN, function() {
			this.name = "第二撃：信念";
			this.kana = "タイ２ケキ　シンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 3950 + 1250 * skillLv;
				// POW補正
				ratio += 34 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.dispHitCount = function(skillLv) {
				return 2;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
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
				return 500 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 5000;
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
		// 第二撃：審判
		// ----------------------------------------------------------------
		// SKILL_ID_DAINIGEKI_SHINPAN
		defineSkill(SKILL_ID_DAINIGEKI_SHINPAN, function() {
			this.name = "第二撃：審判";
			this.kana = "タイ２ケキ　シンハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 4850 + 1250 * skillLv;
				// POW補正
				ratio += 37 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.dispHitCount = function(skillLv) {
				return 3;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
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
				return 500 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 5000;
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
		// 爆火神弾
		// ----------------------------------------------------------------
		// SKILL_ID_BAKKA_SHINDAN
		defineSkill(SKILL_ID_BAKKA_SHINDAN, function() {
			this.name = "爆火神弾";
			this.kana = "ハツカシンタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 2000 + 500 * skillLv;
				// 特性ステータス補正
				ratio += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
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
				return 300;
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
		// 炎火滅魔神弾
		// ----------------------------------------------------------------
		// SKILL_ID_ENKA_METSUMA_SHINDAN
		defineSkill(SKILL_ID_ENKA_METSUMA_SHINDAN, function() {
			this.name = "炎火滅魔神弾";
			this.kana = "エンカメツマシンタン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 3500 + 1000 * skillLv;
				// POW補正
				ratio += 45 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 第二章：審判者
		// ----------------------------------------------------------------
		// SKILL_ID_DAINISHO_SHIPANSHA
		defineSkill(SKILL_ID_DAINISHO_SHIPANSHA, function() {
			this.name = "第二章：審判者";
			this.kana = "タイ２シヨウ　シンハンシヤ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 70 - 10 * skillLv;
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
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 最終章：滅魔の炎
		// ----------------------------------------------------------------
		// SKILL_ID_SAISHUSHO_METSUMANO_HONO
		defineSkill(SKILL_ID_SAISHUSHO_METSUMANO_HONO, function() {
			this.name = "最終章：滅魔の炎";
			this.kana = "サイシユウシヨウ　メツマノホノオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 180 - 30 * skillLv;
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
				return 120 * 1000;
			}
		}),

		/** 烈火気弾 */
		// SKILL_ID_BLAZING_FLAME_BLAST
		defineSkill(SKILL_ID_BLAZING_FLAME_BLAST, function() {
			this.name = "烈火気弾";
			this.kana = "烈火気弾";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				// 爆裂波動状態はスキル倍率だけでなくCriにも影響するので職固有自己支援で設定する
				const state_bakuretsu_hado = UsedSkillSearch(SKILL_ID_BAKURETSU_HADO) > 0;
				return state_bakuretsu_hado;
			}
			// Def無視設定は _SUB_ApplyMonsterDefence にある
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const state_enka_metsuma_shindan = option.GetOptionValue(0);
				if (state_enka_metsuma_shindan === 1) {
					ratio += 3150 + 750 * skillLv;
					ratio += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				} else {
					ratio += 2400 + 600 * skillLv;
					ratio += 18 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 110;
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

];
