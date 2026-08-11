/**
 * スキル定義 32-dragon-knight-shadow-cross-cardinal（SKILL_ID 1002–1039 / 38 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { EQUIP_REGION_ID_ARMS } from '../const/EnumEquipRegionId.js';
import { ITEM_DATA_INDEX_WEIGHT, ITEM_DATA_INDEX_WPNLV } from '../const/EnumItemDataIndex.js';
import {
    ITEM_KIND_AXE_2HAND, ITEM_KIND_BOOK, ITEM_KIND_CLUB, ITEM_KIND_KATAR, ITEM_KIND_KNIFE, ITEM_KIND_SPEAR_2HAND,
    ITEM_KIND_SWORD_2HAND
} from '../const/EnumItemKind.js';
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from '../const/EnumMigItemParamId.js';
import { ItemObjNew } from '../item.dat.js';
import { n_A_Equip } from '../roro-state.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_ARBITRIUM, SKILL_ID_ARUGUTUS_TERUM, SKILL_ID_ARUGUTUS_VITA, SKILL_ID_BENEDICTUM,
    SKILL_ID_CHARGING_PIERCE, SKILL_ID_CONPETENTIA, SKILL_ID_DANCING_KNIFE, SKILL_ID_DILECTIO_HEAL,
    SKILL_ID_DONKI_HON_SHUREN, SKILL_ID_DRAGONIC_AURA, SKILL_ID_EFIRIGO, SKILL_ID_ENCHANTING_SHADOW,
    SKILL_ID_ETERNAL_SLASH, SKILL_ID_FATAL_SHADOW_CRAW, SKILL_ID_FIDOS_ANIMUS, SKILL_ID_GIANT_GROWTH,
    SKILL_ID_HACK_AND_SLASHER, SKILL_ID_IMPACT_CRATER, SKILL_ID_MADNESS_CRUSHER, SKILL_ID_MEDIA_REBOTUM,
    SKILL_ID_NUMATIC_PROCERA, SKILL_ID_PETITIO, SKILL_ID_PETITIO_LEARNED, SKILL_ID_PHREMEN, SKILL_ID_POTENT_VENOM,
    SKILL_ID_PRESENSE_AKYACE, SKILL_ID_REPARATIO, SKILL_ID_RERIGIO, SKILL_ID_SAVAGE_IMPACT, SKILL_ID_SERVANT_WEAPON,
    SKILL_ID_SERVANT_WEAPON_DEMOLISION, SKILL_ID_SERVANT_WEAPON_PHANTOM, SKILL_ID_SERVANT_WEAPON_SIGN,
    SKILL_ID_SHADOW_EXCEED, SKILL_ID_SHADOW_SENSE, SKILL_ID_SHADOW_STAB, SKILL_ID_STORM_SLASH,
    SKILL_ID_TWOHAND_DEFENDING, SKILL_ID_VIGOR
} from '../skill.dat.js';

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

];
