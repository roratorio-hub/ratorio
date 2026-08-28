/**
 * スキル定義 swordman/5a-dragon-knight（14 件 / SKILL_ID 1002〜1295 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../bridge/hmjob-bridge.js";
import { n_A_BaseLV } from "../../runtime/ro4-state.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from "../../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ARMS } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT, ITEM_DATA_INDEX_WPNLV } from "../../const/EnumItemDataIndex.js";
import {
    ITEM_KIND_AXE_2HAND, ITEM_KIND_SPEAR_2HAND, ITEM_KIND_SWORD_2HAND
} from "../../const/EnumItemKind.js";
import { MIG_PARAM_ID_POW } from "../../const/EnumMigItemParamId.js";
import { ItemObjNew } from "../../item.dat.js";
import { n_A_Equip } from "../../runtime/roro-state.js";
import { UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_CHARGING_PIERCE, SKILL_ID_DRAGONIC_AURA, SKILL_ID_DRAGONIC_AURA_STATE, SKILL_ID_DRAGONIC_BREATH,
    SKILL_ID_DRAGONIC_PIERCE, SKILL_ID_DRAGON_TRAINING, SKILL_ID_GIANT_GROWTH, SKILL_ID_HACK_AND_SLASHER,
    SKILL_ID_MADNESS_CRUSHER, SKILL_ID_SERVANT_WEAPON, SKILL_ID_SERVANT_WEAPON_DEMOLISION,
    SKILL_ID_SERVANT_WEAPON_PHANTOM, SKILL_ID_SERVANT_WEAPON_SIGN, SKILL_ID_STORM_SLASH, SKILL_ID_TWOHAND_DEFENDING,
    SKILL_ID_VIGOR
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// サーヴァントウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_SERVANT_WEAPON
		defineSkill(SKILL_ID_SERVANT_WEAPON, function() {
			this.name = "サーヴァントウェポン";	// 公式サイトでは「武器体攻撃」と表記
			this.kana = "サアウアントウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.hitCount = function(skillLv) {							// ヒット数
				return 3;
			}
			this.Power = function(skillLv, charaData) {       			// スキル倍率
				let ratio = 0;
				ratio = 1250 + (50 * skillLv);
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 60 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 240, 180, 120, 90, 60][skillLv] * 1000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// サーヴァントウェポン：サイン
		// ----------------------------------------------------------------
		// SKILL_ID_SERVANT_WEAPON_SIGN
		defineSkill(SKILL_ID_SERVANT_WEAPON_SIGN, function() {
			this.name = "サーヴァントウェポン：サイン";
			this.kana = "サアウアントウエホンサイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData) {       			// スキル倍率
				return 0;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
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
				return 3500 + 500 * skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// サーヴァントウェポン：ファントム
		// ----------------------------------------------------------------
		// SKILL_ID_SERVANT_WEAPON_PHANTOM
		defineSkill(SKILL_ID_SERVANT_WEAPON_PHANTOM, function() {
			this.name = "サーヴァントウェポン：ファントム";
			this.kana = "サアウアントウエホンファントム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.hitCount = function(skillLv, option) {	// ヒット数
				return option.GetOptionValue(0);
			}
			this.Power = function(skillLv, charaData) {      		 	// スキル倍率
				let ratio = 0;
				ratio += 1250 + 50 * skillLv;
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return 2000;
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
		// サーヴァントウェポン：デモリッション
		// ----------------------------------------------------------------
		// SKILL_ID_SERVANT_WEAPON_DEMOLISION
		defineSkill(SKILL_ID_SERVANT_WEAPON_DEMOLISION, function() {
			this.name = "サーヴァントウェポン：デモリッション";
			this.kana = "サアウアントウエホンテモリツシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.hitCount = function(skillLv, option) {	// ヒット数
				return option.GetOptionValue(0);
			}
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = 0;
				ratio += 1250 + 50 * skillLv;
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return 500 * skillLv;
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
		// チャージングピアース
		// ----------------------------------------------------------------
		// SKILL_ID_CHARGING_PIERCE
		defineSkill(SKILL_ID_CHARGING_PIERCE, function() {
			this.name = "チャージングピアース";
			this.kana = "チヤアシンクヒアアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 200 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 60 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (250 - 10 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ツーハンドディフェンディング
		// ----------------------------------------------------------------
		// SKILL_ID_TWOHAND_DEFENDING
		defineSkill(SKILL_ID_TWOHAND_DEFENDING, function() {
			this.name = "(△)ツーハンドディフェンディング";
			this.kana = "ツウハントテイフエンテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ハックアンドスラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_HACK_AND_SLASHER
		defineSkill(SKILL_ID_HACK_AND_SLASHER, function() {
			this.name = "ハックアンドスラッシャー";
			this.kana = "ハツクアントスラツシヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return (weapon === ITEM_KIND_SWORD_2HAND) ? CSkillData.RANGE_SHORT : CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_SWORD_2HAND, ITEM_KIND_SPEAR_2HAND].includes(weapon);
			}
			this.hitCount = function(skillLv) {							// ヒット数
				return 2;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) { // スキル倍率
				let ratio = 0;
				ratio = 2400 + 300 * skillLv;
				ratio += 18 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 200 * skillLv;
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
		// ドラゴニックオーラ
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGONIC_AURA
		defineSkill(SKILL_ID_DRAGONIC_AURA, function() {
			this.name = "ドラゴニックオーラ";
			this.kana = "トラコニツクオオラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.Power = function(skillLv, charaData) {					// スキル倍率
				let ratio = 0;
				ratio = 10000 + 2900 * skillLv;
				ratio += 130 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// マッドネスクラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_MADNESS_CRUSHER
		defineSkill(SKILL_ID_MADNESS_CRUSHER, function() {
			this.name = "マッドネスクラッシャー";
			this.kana = "マツトネスクラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_SWORD_2HAND, ITEM_KIND_SPEAR_2HAND].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option) {					// スキル倍率
				let ratio = 0;
				const wpnLv = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WPNLV] % 10;
				const weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
				ratio += 3850 + 3250 * skillLv;
				ratio += weight * wpnLv;
				ratio += (12 + 11 * skillLv) * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				// チャージングピアースがONの時、与えるダメージ + 10% x スキルレベル
				ratio = ratio * (1 + 0.1 * option.GetOptionValue(0));
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return 200 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ヴィゴール
		// ----------------------------------------------------------------
		// SKILL_ID_VIGOR
		defineSkill(SKILL_ID_VIGOR, function() {
			this.name = "ヴィゴール";
			this.kana = "ウイコオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 320;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 20 + 3 * skillLv;
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
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ストームスラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_STORM_SLASH
		defineSkill(SKILL_ID_STORM_SLASH, function() {
			this.name = "ストームスラッシュ";
			this.kana = "ストオムスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_SWORD_2HAND, ITEM_KIND_AXE_2HAND].includes(weapon);
			}
			this.hitCount = function(skillLv, charaDataManger) {       	// ヒット数
				return skillLv;
			}
			this.Power = function(skillLv, charaDataManger, option) {       	// スキル倍率
				let ratio = 0;
				// ジャイアントグロース(スリサズルーンストーン)はスキル倍率だけでなく基礎ステータスにも影響を与えるので職固有自己支援で設定する
				const state_giant_growth = UsedSkillSearch(SKILL_ID_GIANT_GROWTH) === 1;
				ratio += 1850 + 50 * skillLv;
				ratio += 7 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				if (state_giant_growth) {
					ratio *= 2;
				}
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
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
				return 500 + (500 * skillLv);
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

		// ----------------------------------------------------------------
		// ドラゴニックブレス
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGONIC_BREATH
		defineSkill(SKILL_ID_DRAGONIC_BREATH, function() {
			this.name = "ドラゴニックブレス";
			this.kana = "トラコニツクフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				// 武器種ではなく騎乗状態によって判定される
				// トレーニング未習得でもドラゴンに乗れるので LearnedSkillSearch に置き換えられない
				return UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) > 0;
			}
			this.Power = function(skillLv, charaData) {					// スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE) > 1) {
					// ドラゴニックオーラ時
					ratio = 3500 + 400 * skillLv;
					ratio += 25 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
					ratio += charaData[CHARA_DATA_INDEX_MAXHP] / 24
					ratio += charaData[CHARA_DATA_INDEX_MAXSP] / 2;
				} else {
					// 通常時
					ratio = 2750 + 325 * skillLv;
					ratio += 20 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
					ratio += charaData[CHARA_DATA_INDEX_MAXHP] / 30
					ratio += charaData[CHARA_DATA_INDEX_MAXSP] / 2.5;
				}
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 3500;
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
		}),

		/** ドラゴニックピアース */
		// SKILL_ID_DRAGONIC_PIERCE
		defineSkill(SKILL_ID_DRAGONIC_PIERCE, function() {
			this.name = "ドラゴニックピアース";
			this.kana = "ドラゴニックピアース";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = ITEM_KIND_SPEAR_2HAND === weapon;
				return mutch_weapon;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const state_dragonic_aura = option.GetOptionValue(0);
				if (state_dragonic_aura == 0) {
					ratio += 5450 + 2150 * skillLv;
					ratio += 54 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				} else {
					ratio += 6900 + 2700 * skillLv;
					ratio += 68 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
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
				return 400 * skillLv;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
