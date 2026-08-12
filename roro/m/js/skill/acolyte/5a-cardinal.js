/**
 * スキル定義 acolyte/5a-cardinal（18 件 / SKILL_ID 1023〜1313 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from '../../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { ITEM_KIND_BOOK, ITEM_KIND_CLUB } from '../../const/EnumItemKind.js';
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from '../../const/EnumMigItemParamId.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_ARBITRIUM, SKILL_ID_ARUGUTUS_TERUM, SKILL_ID_ARUGUTUS_VITA, SKILL_ID_BENEDICTUM, SKILL_ID_CONPETENTIA,
    SKILL_ID_DILECTIO_HEAL, SKILL_ID_DIVINUS_FLOS, SKILL_ID_DONKI_HON_SHUREN, SKILL_ID_EFIRIGO,
    SKILL_ID_FIDOS_ANIMUS, SKILL_ID_MEDIA_REBOTUM, SKILL_ID_NUMATIC_PROCERA, SKILL_ID_PETITIO,
    SKILL_ID_PETITIO_LEARNED, SKILL_ID_PHREMEN, SKILL_ID_PRESENSE_AKYACE, SKILL_ID_REPARATIO, SKILL_ID_RERIGIO
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// レパラティオ
		// ----------------------------------------------------------------
		// SKILL_ID_REPARATIO
		defineSkill(SKILL_ID_REPARATIO, function() {

			this.name = "レパラティオ";
			this.kana = "レハラテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5500 - 500 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// メディアリボトゥム
		// ----------------------------------------------------------------
		// SKILL_ID_MEDIA_REBOTUM
		defineSkill(SKILL_ID_MEDIA_REBOTUM, function() {
			this.name = "メディアリボトゥム";
			this.kana = "メテイアリホトウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 460;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return [0, 80, 60, 45, 45, 30][skillLv] * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 240, 150, 90, 60, 30][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 鈍器＆本修練
		// ----------------------------------------------------------------
		// SKILL_ID_DONKI_HON_SHUREN
		defineSkill(SKILL_ID_DONKI_HON_SHUREN, function() {
			this.name = "鈍器＆本修練";
			this.kana = "トンキホンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アルグトゥスヴィタ
		// ----------------------------------------------------------------
		// SKILL_ID_ARUGUTUS_VITA
		defineSkill(SKILL_ID_ARUGUTUS_VITA, function() {
			this.name = "アルグトゥスヴィタ";
			this.kana = "アルクトウスウイタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 90 * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// アルグトゥステルム
		// ----------------------------------------------------------------
		// SKILL_ID_ARUGUTUS_TERUM
		defineSkill(SKILL_ID_ARUGUTUS_TERUM, function() {
			this.name = "アルグトゥステルム";
			this.kana = "アルクトウステルム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 90 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// アルビトリウム
		// ----------------------------------------------------------------
		// SKILL_ID_ARBITRIUM
		defineSkill(SKILL_ID_ARBITRIUM, function() {
			this.name = "アルビトリウム";
			this.kana = "アルヒトリウム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				ratio = 3000 + 300 * skillLv;
				// SPL補正
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// フィドスアニムス補正
				const fidos_animus_lv = Math.max(LearnedSkillSearch(SKILL_ID_FIDOS_ANIMUS), UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS));
				ratio += 300 * fidos_animus_lv;
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 440;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5500 + 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1500;
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

		// ----------------------------------------------------------------
		// プレセンスアキエース
		// ----------------------------------------------------------------
		// SKILL_ID_PRESENSE_AKYACE
		defineSkill(SKILL_ID_PRESENSE_AKYACE, function() {
			this.name = "プレセンスアキエース";
			this.kana = "フレセンスアキエエス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
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
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// フィドスアニムス
		// ----------------------------------------------------------------
		// SKILL_ID_FIDOS_ANIMUS
		defineSkill(SKILL_ID_FIDOS_ANIMUS, function() {
			this.name = "フィドスアニムス";
			this.kana = "フイトスアニムス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// エフィリゴ
		// ----------------------------------------------------------------
		// SKILL_ID_EFIRIGO
		defineSkill(SKILL_ID_EFIRIGO, function() {
			this.name = "エフィリゴ";
			this.kana = "エフイリコ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return (weapon === ITEM_KIND_CLUB) ? CSkillData.RANGE_LONG : CSkillData.RANGE_SHORT;
			}
			this.dispHitCount = 7;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_CLUB, ITEM_KIND_BOOK].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData) {			// スキル倍率
				let ratio = 0;
				// 鈍器＆本修練の補正Lv
				const donki_hon_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_DONKI_HON_SHUREN), UsedSkillSearch(SKILL_ID_DONKI_HON_SHUREN));
				ratio = 4000 + 500 * skillLv;							// 基本倍率
				ratio += 60 * GetTotalSpecStatus(MIG_PARAM_ID_POW);		// POW補正
				ratio += (400 + 50 * skillLv) * donki_hon_shuren_lv;	// 鈍器＆本修練 補正
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 310;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 5;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// コンペテンティア
		// ----------------------------------------------------------------
		// SKILL_ID_CONPETENTIA
		defineSkill(SKILL_ID_CONPETENTIA, function() {
			this.name = "コンペテンティア";
			this.kana = "コンヘテンテイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 690;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 20 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ニューマティックプロセラ
		// ----------------------------------------------------------------
		// SKILL_ID_NUMATIC_PROCERA
		defineSkill(SKILL_ID_NUMATIC_PROCERA, function() {
			this.name = "ニューマティックプロセラ";
			this.kana = "ニユウマテイツクフロセラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 660;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 15;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 19000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 12000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 12000;
			}
		}),

		// ----------------------------------------------------------------
		// ディレクティオヒール
		// ----------------------------------------------------------------
		// SKILL_ID_DILECTIO_HEAL
		defineSkill(SKILL_ID_DILECTIO_HEAL, function() {
			this.name = "ディレクティオヒール";
			this.kana = "テイレクテイオヒイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 380;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 3000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// レリギオ
		// ----------------------------------------------------------------
		// SKILL_ID_RERIGIO
		defineSkill(SKILL_ID_RERIGIO, function() {
			this.name = "(△)レリギオ";
			this.kana = "レリキオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
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
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ベネディクトゥム
		// ----------------------------------------------------------------
		// SKILL_ID_BENEDICTUM
		defineSkill(SKILL_ID_BENEDICTUM, function() {

			this.name = "(△)ベネディクトゥム";
			this.kana = "ヘネテイクトウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
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
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ペティティオ
		// ----------------------------------------------------------------
		// SKILL_ID_PETITIO
		defineSkill(SKILL_ID_PETITIO, function() {
			this.name = "ペティティオ";
			this.kana = "ヘテイテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_CLUB, ITEM_KIND_BOOK].includes(weapon);
			}
			this.range = function(weapon) {
				return (weapon === ITEM_KIND_BOOK) ? CSkillData.RANGE_SHORT : CSkillData.RANGE_LONG;
			}
			this.Power = function(skillLv, charaData, option, mobData) { // スキル倍率
				// 計算式はこれで良いと判断しているが Lv1, 5, 10 のとき僅かな誤差があり小数点以下の扱いに未知のルールがありそう
				let ratio = 0;
				const donki_hon_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_DONKI_HON_SHUREN), UsedSkillSearch(SKILL_ID_DONKI_HON_SHUREN));
				// 基本倍率
				ratio = 350 * skillLv;
				// POW補正 検証済み
				ratio += 20 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 鈍器・本修練補正 検証済み
				ratio += 25 * skillLv * donki_hon_shuren_lv;
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
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
		// ペティティオ習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_PETITIO_LEARNED
		defineSkill(SKILL_ID_PETITIO_LEARNED, function() {

			this.name = "ペティティオ習得レベル";
			this.kana = "ヘテイテイオシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// フレーメン
		// ----------------------------------------------------------------
		// SKILL_ID_PHREMEN
		defineSkill(SKILL_ID_PHREMEN, function() {
			this.name = "フレーメン";
			this.kana = "フレエメン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 440;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500 * skillLv;
			}
		}),

		/** ディヴィヌスフロス */
		// SKILL_ID_DIVINUS_FLOS
		defineSkill(SKILL_ID_DIVINUS_FLOS, function() {
			this.name = "ディヴィヌスフロス";
			this.kana = "ディヴィヌスフロス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option) {
				const state_ancilla = option.GetOptionValue(0) === 1;
				if (state_ancilla) {
					return CSkillData.ELEMENT_FORCE_VANITY;
				} else {
					return CSkillData.ELEMENT_FORCE_HOLY;
				}
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const fidos_animus_lv = Math.max(UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS), LearnedSkillSearch(SKILL_ID_FIDOS_ANIMUS));
				ratio += 1000 + 1000 * skillLv;
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// Spl係数 検証済み
				ratio += 300 * fidos_animus_lv;	// 修練係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 440;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5500 + 800 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1500;
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
