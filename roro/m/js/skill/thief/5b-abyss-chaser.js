/**
 * スキル定義 thief/5b-abyss-chaser（18 件 / SKILL_ID 1097〜1308 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from '../../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { ITEM_KIND_BOW, ITEM_KIND_KNIFE, ITEM_KIND_SWORD } from '../../const/EnumItemKind.js';
import {
    MIG_PARAM_ID_CON, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL
} from '../../const/EnumMigItemParamId.js';
import { n_A_WeaponType } from '../../roro-state.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_ABYSS_DAGGER, SKILL_ID_ABYSS_DAGGER_STATE, SKILL_ID_ABYSS_FLAME, SKILL_ID_ABYSS_SLAYER,
    SKILL_ID_ABYSS_SQUARE, SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL, SKILL_ID_CHAIN_REACTION_SHOT, SKILL_ID_CHASING_BREAK,
    SKILL_ID_CHASING_SHOT, SKILL_ID_DEFT_STAB, SKILL_ID_FLANGE_SHOT, SKILL_ID_FROM_THE_ABYSS,
    SKILL_ID_HIT_AND_SLIDING, SKILL_ID_MAHOKEN_SHUREN, SKILL_ID_OMEGA_ABYSS_STRIKE, SKILL_ID_STRIP_SHADOW,
    SKILL_ID_TANKEN_YUMI_SHUREN, SKILL_ID_UNLUCKY_RUSH
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 短剣＆弓修練
		// ----------------------------------------------------------------
		// SKILL_ID_TANKEN_YUMI_SHUREN
		defineSkill(SKILL_ID_TANKEN_YUMI_SHUREN, function() {
			this.name = "短剣＆弓修練";
			this.kana = "タンケンユミシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 魔法剣修練
		// ----------------------------------------------------------------
		// SKILL_ID_MAHOKEN_SHUREN
		defineSkill(SKILL_ID_MAHOKEN_SHUREN, function() {
			this.name = "魔法剣修練";
			this.kana = "マホウケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ストリップシャドウ
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_SHADOW
		defineSkill(SKILL_ID_STRIP_SHADOW, function() {
			this.name = "ストリップシャドウ";
			this.kana = "ストリツフシヤトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 90;
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
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 5000 + 2000 * skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// アビスダガー
		// ----------------------------------------------------------------
		// SKILL_ID_ABYSS_DAGGER
		defineSkill(SKILL_ID_ABYSS_DAGGER, function() {
			this.name = "アビスダガー";
			this.kana = "アヒスタカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.dispHitCount = 2;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = CSkillData.RANGE_SHORT;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_KNIFE, ITEM_KIND_SWORD].includes(n_A_WeaponType);
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 5700 + 1500 * skillLv;
				// POW補正
				ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// アンラッキーラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_UNLUCKY_RUSH
		defineSkill(SKILL_ID_UNLUCKY_RUSH, function() {
			this.name = "アンラッキーラッシュ";
			this.kana = "アンラツキイラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 3100 + 700 * skillLv;
				// POW補正 未検証
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
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
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500 * skillLv;
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
		// チェーンリアクションショット
		// ----------------------------------------------------------------
		// SKILL_ID_CHAIN_REACTION_SHOT
		defineSkill(SKILL_ID_CHAIN_REACTION_SHOT, function() {
			this.name = "チェーンリアクションショット";
			this.kana = "チエエンリアクシヨンショヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return (ITEM_KIND_BOW === weapon);
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 2275 + 625 * skillLv;
				// CON補正
				ratio += 18 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
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
				return 1500 + 500 * skillLv;
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
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// フロムジアビス
		// ----------------------------------------------------------------
		// SKILL_ID_FROM_THE_ABYSS
		defineSkill(SKILL_ID_FROM_THE_ABYSS, function() {
			this.name = "フロムジアビス";	// 公式サイトでは「アビス球体攻撃」と表記される
			this.kana = "フロムシアヒス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 60000;
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
		// アビススレイヤー
		// ----------------------------------------------------------------
		// SKILL_ID_ABYSS_SLAYER
		defineSkill(SKILL_ID_ABYSS_SLAYER, function() {
			this.name = "アビススレイヤー";
			this.kana = "アヒススレイヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
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
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// オメガアビスストライク
		// ----------------------------------------------------------------
		// SKILL_ID_OMEGA_ABYSS_STRIKE
		defineSkill(SKILL_ID_OMEGA_ABYSS_STRIKE, function() {
			this.name = "オメガアビスストライク";
			this.kana = "オメカアヒスストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
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
		// デフトスタブ
		// ----------------------------------------------------------------
		// SKILL_ID_DEFT_STAB
		defineSkill(SKILL_ID_DEFT_STAB, function() {
			this.name = "デフトスタブ";
			this.kana = "テフトスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.dispHitCount = 2;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 5700 + 750 * skillLv;
				// POW補正
				ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
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
				return 200 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// アビススクエア
		// ----------------------------------------------------------------
		// SKILL_ID_ABYSS_SQUARE
		defineSkill(SKILL_ID_ABYSS_SQUARE, function() {
			this.name = "アビススクエア";
			this.kana = "アヒススクエア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5500 + 800 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
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
		// アビススクエア習得Lv
		// ----------------------------------------------------------------
		// SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL
		defineSkill(SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL, function() {
			this.name = "アビススクエア習得Lv";
			this.kana = "アヒススクエアシユウトクレヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// フレンジショット
		// ----------------------------------------------------------------
		// SKILL_ID_FLANGE_SHOT
		defineSkill(SKILL_ID_FLANGE_SHOT, function() {
			this.name = "フレンジショット";
			this.kana = "フレンシシヨツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return (ITEM_KIND_BOW === weapon);
			}
			this.hitCount = function(skillLv) {
				return 1 + (5 * skillLv / 100) * 2;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 1100 + 100 * skillLv;
				// CON補正
				ratio += 7 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.element = CSkillData.ELEMENT_VOID;
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
				return 200 * skillLv;
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
		// アビスダガー状態
		// ----------------------------------------------------------------
		// SKILL_ID_ABYSS_DAGGER_STATE
		defineSkill(SKILL_ID_ABYSS_DAGGER_STATE, function() {
			this.name = "アビスダガー状態";
			this.kana = "アビスダガー";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ヒットアンドスライディング */
		// SKILL_ID_HIT_AND_SLIDING
		defineSkill(SKILL_ID_HIT_AND_SLIDING, function() {
			this.name = "ヒットアンドスライディング";
			this.kana = "ヒットアンドスライディング";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				if (weapon === ITEM_KIND_BOW) {
					return CSkillData.RANGE_LONG;
				} else {
					return CSkillData.RANGE_SHORT;
				}
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 3250 + 850 * skillLv;
				ratio += 25 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 110;
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
				return 0 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return 0;
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** チェイシングブレイク */
		// SKILL_ID_CHASING_BREAK
		defineSkill(SKILL_ID_CHASING_BREAK, function() {
			this.name = "チェイシングブレイク";
			this.kana = "チェイシングブレイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const state_hit_and_sliding = option.GetOptionValue(0) === 1;
				if (state_hit_and_sliding) {
					ratio += 7750 + 1750 * skillLv;
					ratio += 55 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				} else {
					ratio += 5700 + 1500 * skillLv;
					ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
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
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return 0;
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** チェイシングショット */
		// SKILL_ID_CHASING_SHOT
		defineSkill(SKILL_ID_CHASING_SHOT, function() {
			this.name = "チェイシングショット";
			this.kana = "チェイシングショット";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = weapon === ITEM_KIND_BOW;
				return mutch_weapon;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const state_hit_and_sliding = option.GetOptionValue(0) === 1;
				if (state_hit_and_sliding) {
					ratio += 1250 + 350 * skillLv;
					ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// Con係数
				} else {
					ratio += 1150 + 250 * skillLv;
					ratio += 8 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// Con係数
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
				return 1500 + 500 * skillLv;
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

		/** アビスフレイム */
		// SKILL_ID_ABYSS_FLAME
		defineSkill(SKILL_ID_ABYSS_FLAME, function() {
			this.name = "アビスフレイム";
			this.kana = "アビスフレイム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const attack_area = option.GetOptionValue(0);
				const mahoken_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_MAHOKEN_SHUREN), LearnedSkillSearch(SKILL_ID_MAHOKEN_SHUREN));
				switch (attack_area) {
					case 0:	// 対象周辺
						ratio += 750 * skillLv;
						ratio += 75 * mahoken_shuren_lv;	// 修練係数
						ratio += 25 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// Spl係数
						break;
					case 1:	// 自身周辺
						ratio += 600 * skillLv;
						ratio += 60 * mahoken_shuren_lv;	// 修練係数
						ratio += 20 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// Spl係数
						break;
					case 2:	// 両方
						ratio += (750 + 600) * skillLv;
						ratio += (75 + 60) * mahoken_shuren_lv;
						ratio += (25 + 20) * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
						break;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5500 + 800 * skillLv;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return 0;
				// return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
				// return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
