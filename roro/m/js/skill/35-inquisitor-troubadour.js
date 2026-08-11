/**
 * スキル定義 35-inquisitor-troubadour（SKILL_ID 1110–1141 / 32 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { HtmlGetObjectValueByIdAsInteger } from '../../../common/js/util.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { CHARA_DATA_INDEX_MAXHP } from '../const/EnumCharaDataIndex.js';
import { ELM_ID_VANITY } from '../const/EnumElmId.js';
import { ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP } from '../const/EnumItemKind.js';
import { ITEM_SP_ELEMENTAL } from '../const/EnumItemSpId.js';
import {
    MIG_PARAM_ID_CON, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL
} from '../const/EnumMigItemParamId.js';
import { GetEquippedTotalSPArrow } from '../foot-bridge.js';
import { MOB_CONF_DEBUF_ID_SOUND_BLEND, n_B_IJYOU } from '../mobconfdebuf.js';
import { n_A_WeaponType } from '../roro-state.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_BAKKA_SHINDAN, SKILL_ID_CHUZITSUNA_SHINNEN, SKILL_ID_DAIICHIGEKI_RAKUIN,
    SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA, SKILL_ID_DAINIGEKI_METSUMANO_HI, SKILL_ID_DAINIGEKI_SHINNEN,
    SKILL_ID_DAINIGEKI_SHINPAN, SKILL_ID_DAINISHO_SHIPANSHA, SKILL_ID_DAISANGEKI_DANZAI,
    SKILL_ID_DAISANGEKI_MEKKAGEKI, SKILL_ID_DAISANGEKI_ZYOKA, SKILL_ID_ENKA_METSUMA_SHINDAN,
    SKILL_ID_GEFFENIA_NOCTURNE, SKILL_ID_KAISO, SKILL_ID_KENKONA_SHINNEN, SKILL_ID_KIKO, SKILL_ID_KOINNO_RHAPSODY,
    SKILL_ID_KYOZINNA_SHINNEN, SKILL_ID_LOKINO_KIMAGURE, SKILL_ID_METALIC_FURY, SKILL_ID_MUSICAL_INTERLUDE,
    SKILL_ID_MYSTIC_SYMPHONY, SKILL_ID_PRONTERA_MARCH, SKILL_ID_RHYTHM_SHOOTING, SKILL_ID_ROSE_BLOSSOM,
    SKILL_ID_SAISHUSHO_METSUMANO_HONO, SKILL_ID_SEYU_SENRE, SKILL_ID_SHINKONO_ISHI, SKILL_ID_SHISHATACHIHENO_REQUIEM,
    SKILL_ID_SONATA_OF_KUVASIL, SKILL_ID_SOUND_BLEND, SKILL_ID_STAGE_MANNER, SKILL_ID_YUYAKENO_SERENADE
} from '../skill.dat.js';

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

		// ----------------------------------------------------------------
		// ステージマナー
		// ----------------------------------------------------------------
		// SKILL_ID_STAGE_MANNER
		defineSkill(SKILL_ID_STAGE_MANNER, function() {
			this.name = "ステージマナー";
			this.kana = "ステエシマナア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 回想
		// ----------------------------------------------------------------
		// SKILL_ID_KAISO
		defineSkill(SKILL_ID_KAISO, function() {
			this.name = "回想";
			this.kana = "カイソウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 1;
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
		// ミスティックシンフォニー
		// ----------------------------------------------------------------
		// SKILL_ID_MYSTIC_SYMPHONY
		defineSkill(SKILL_ID_MYSTIC_SYMPHONY, function() {

			this.name = "ミスティックシンフォニー";
			this.kana = "ミステイツクシンフオニイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 390;
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
				return 60000;
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
		// ソナタオブクヴァシル
		// ----------------------------------------------------------------
		// SKILL_ID_SONATA_OF_KUVASIL
		defineSkill(SKILL_ID_SONATA_OF_KUVASIL, function() {
			this.name = "ソナタオブクヴァシル";
			this.kana = "ソナタオフクウアシル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
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
				return 60000;
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
		// ロゼブロッサム
		// ----------------------------------------------------------------
		// SKILL_ID_ROSE_BLOSSOM
		defineSkill(SKILL_ID_ROSE_BLOSSOM, function() {
			this.name = "ロゼブロッサム";
			this.kana = "ロセフロツサム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = function(skillLv, charaDataManger, option, parentSkillId) {
				// 初撃 分割2Hit 追撃 分割なし
				return parentSkillId == undefined ? 2 : 0;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// ステージマナー習得Lv
				const stage_manner_lv = Math.max(LearnedSkillSearch(SKILL_ID_STAGE_MANNER), UsedSkillSearch(SKILL_ID_STAGE_MANNER));
				if (parentSkillId === undefined) {
					// 初段ＨＩＴの場合
					if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
						// サウンドブレンド 有り
						ratio = 1250 + 350 * skillLv;
					} else {
						// サウンドブレンド 無し
						ratio = 750 + 150 * skillLv;
					}
					ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON) * stage_manner_lv;
				} else {
					// 追撃の場合
					if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
						// サウンドブレンド 有り
						ratio = 2500 + 700 * skillLv;
					} else {
						// サウンドブレンド 無し
						ratio = 1250 + 350 * skillLv;
					}
					ratio += 4 * GetTotalSpecStatus(MIG_PARAM_ID_CON) * stage_manner_lv;
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
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// リズムシューティング
		// ----------------------------------------------------------------
		// SKILL_ID_RHYTHM_SHOOTING
		defineSkill(SKILL_ID_RHYTHM_SHOOTING, function() {
			this.name = "リズムシューティング";
			this.kana = "リスムシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.hitCount = 3;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(n_A_WeaponType);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// ステージマナー習得Lv
				const stage_manner_lv = Math.max(LearnedSkillSearch(SKILL_ID_STAGE_MANNER), UsedSkillSearch(SKILL_ID_STAGE_MANNER));
				// 基本倍率
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
					// サウンドブレンド 有り
					ratio = 1250 + 350 * skillLv;
				} else {
					// サウンドブレンド 無し
					ratio = 750 + 150 * skillLv;
				}
				ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON) * stage_manner_lv;
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {    // 消費SP
				return 110;
			}
			this.CostAP = function(skillLv, charaDataManger) {      // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {  // 変動詠唱
				return 500 + 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {  // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {  // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {    // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {	// 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {  // クリティカル発生率
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {  // クリティカルダメージ倍率
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),
		

		// ----------------------------------------------------------------
		// メタリックフューリー
		// ----------------------------------------------------------------
		// SKILL_ID_METALIC_FURY
		defineSkill(SKILL_ID_METALIC_FURY, function() {
			this.name = "メタリックフューリー";
			this.kana = "メタリツクフユウリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option, mobData) {
				// 属性付与を優先する
				let value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", ELM_ID_VANITY);
				if (value === ELM_ID_VANITY) {
					// 付与されていなければ矢の属性を適用する
					value = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL, mobData);
				}
				return value;
			}			
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon);
			}
			this.Power = function(skillLv) {
				let ratio = 0;
				// ステージマナー習得Lv
				const stage_manner_lv = Math.max(LearnedSkillSearch(SKILL_ID_STAGE_MANNER), UsedSkillSearch(SKILL_ID_STAGE_MANNER));
				// 基本倍率
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
					// サウンドブレンド 有り
					ratio = 4000 + 1000 * skillLv;
					ratio += 6 * GetTotalSpecStatus(MIG_PARAM_ID_SPL) * stage_manner_lv;
				} else {
					// サウンドブレンド 無し
					ratio = 1250 + 350 * skillLv;
					ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL) * stage_manner_lv;
				}
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 130;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 500 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// サウンドブレンド
		// ----------------------------------------------------------------
		// SKILL_ID_SOUND_BLEND
		defineSkill(SKILL_ID_SOUND_BLEND, function() {
			this.name = "サウンドブレンド";
			this.kana = "サウントフレント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option, mobData) {
				// 属性付与を優先する
				let value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", ELM_ID_VANITY);
				if (value === ELM_ID_VANITY) {
					// 付与されていなければ矢の属性を適用する
					value = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL, mobData);
				}
				return value;
			}			
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon);
			}
			this.ground_installation = true;
			this.damageInterval = function(skillLv) {
				return [0, 1, 3, 8, 15, 30][skillLv] * 1000 - 200;
			}
			this.Power = function(skillLv) {
				// 基本倍率
				let ratio = 2000 + 500 * skillLv;
				// ステージマナー習得Lv
				const stage_manner_lv = Math.max(LearnedSkillSearch(SKILL_ID_STAGE_MANNER), UsedSkillSearch(SKILL_ID_STAGE_MANNER));
				// SPL補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL) * stage_manner_lv;
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 55;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 1, 3, 8, 15, 30][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ゲフェニアノクターン
		// ----------------------------------------------------------------
		// SKILL_ID_GEFFENIA_NOCTURNE
		defineSkill(SKILL_ID_GEFFENIA_NOCTURNE, function() {
			this.name = "(×)ゲフェニアノクターン";
			this.kana = "ケフエニアノクタアン";
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
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 30000;
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
		// ロキの気まぐれ
		// ----------------------------------------------------------------
		// SKILL_ID_LOKINO_KIMAGURE
		defineSkill(SKILL_ID_LOKINO_KIMAGURE, function() {
			this.name = "(×)ロキの気まぐれ";
			this.kana = "ロキノキマクレ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
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
		// 鉱員のラプソディ
		// ----------------------------------------------------------------
		// SKILL_ID_KOINNO_RHAPSODY
		defineSkill(SKILL_ID_KOINNO_RHAPSODY, function() {
			this.name = "(×)鉱員のラプソディ";
			this.kana = "コウインノラフソテイ";
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
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 30000;
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
		// ミュージカルインタールード
		// ----------------------------------------------------------------
		// SKILL_ID_MUSICAL_INTERLUDE
		defineSkill(SKILL_ID_MUSICAL_INTERLUDE, function() {
			this.name = "(△)ミュージカルインタールード";
			this.kana = "ミユウシカルインタアルウト";
			this.maxLv = 5;
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
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 25000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 240, 150, 90, 60, 30][skillLv] * 1000;
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
		// 夕焼けのセレナーデ
		// ----------------------------------------------------------------
		// SKILL_ID_YUYAKENO_SERENADE
		defineSkill(SKILL_ID_YUYAKENO_SERENADE, function() {
			this.name = "(△)夕焼けのセレナーデ";
			this.kana = "ユウヤケノセレナアテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 290;
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 25000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 240, 150, 90, 60, 30][skillLv] * 1000;
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
		// 死者たちへのレクイエム
		// ----------------------------------------------------------------
		// SKILL_ID_SHISHATACHIHENO_REQUIEM
		defineSkill(SKILL_ID_SHISHATACHIHENO_REQUIEM, function() {
			this.name = "(×)死者たちへのレクイエム";
			this.kana = "シシヤタチヘノレクイエム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
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
		// プロンテラマーチ
		// ----------------------------------------------------------------
		// SKILL_ID_PRONTERA_MARCH
		defineSkill(SKILL_ID_PRONTERA_MARCH, function() {
			this.name = "(△)プロンテラマーチ";
			this.kana = "フロンテラマアチ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 290;
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 25000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 240, 150, 90, 60, 30][skillLv] * 1000;
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

];
