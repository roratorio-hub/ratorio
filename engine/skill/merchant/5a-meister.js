/**
 * スキル定義 merchant/5a-meister（19 件 / SKILL_ID 1072〜1294 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND } from "../../const/EnumItemKind.js";
import { MIG_PARAM_ID_POW } from "../../const/EnumMigItemParamId.js";
import { UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_ABR_BATTLE_WARRIER, SKILL_ID_ABR_DUAL_CANNON, SKILL_ID_ABR_INFINITY, SKILL_ID_ABR_MASTERY,
    SKILL_ID_ABR_MOTHER_NET, SKILL_ID_AXE_STOMP, SKILL_ID_AXE_STOMP_STATUS, SKILL_ID_BOGYO_SOCHI_YUKOKA,
    SKILL_ID_ENERGY_CANNONADE, SKILL_ID_KOGEKI_SOCHI_YUKOKA, SKILL_ID_MADOGEAR, SKILL_ID_MIGHTY_SMASH,
    SKILL_ID_POWERFUL_SWING, SKILL_ID_RUSH_QUAKE, SKILL_ID_RUSH_STATE, SKILL_ID_RUSH_STRIKE, SKILL_ID_SOCHI_SEIZO,
    SKILL_ID_SPARK_BLASTER, SKILL_ID_TRIPLE_LASER, SKILL_ID_TWO_AXE_DEFENDING
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// アックスストンプ
		// ----------------------------------------------------------------
		// SKILL_ID_AXE_STOMP
		defineSkill(SKILL_ID_AXE_STOMP, function() {

			this.name = "アックスストンプ";
			this.kana = "アツクスストンフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND].includes(weapon);
			}
			this.hitCount = function(skillLv, option, weapon) {
				return (weapon === ITEM_KIND_AXE_2HAND) ? 2 : 1;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}
			this.Power = function(skillLv, charaDataManger) {
				let ratio = 0;
				// 基本倍率
				ratio = 4900 + 1000 * skillLv;
				// POW補正
				ratio += 33 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = 10 * 1000;
		}),

		// ----------------------------------------------------------------
		// ラッシュクエイク
		// ----------------------------------------------------------------
		// SKILL_ID_RUSH_QUAKE
		defineSkill(SKILL_ID_RUSH_QUAKE, function() {
			this.name = "ラッシュクエイク";
			this.kana = "ラツシユクエイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData) {
				let ratio = 0;
				// 基本倍率
				ratio = 3900 * skillLv;
				// POW補正
				ratio += 130 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow補正
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 440;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
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
				return 6 * skillLv * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ラッシュ状態
		// ----------------------------------------------------------------
		// SKILL_ID_RUSH_STATE
		defineSkill(SKILL_ID_RUSH_STATE, function() {

			this.name = "ラッシュ状態";
			this.kana = "ラツシユシヨウタイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 装置製造
		// ----------------------------------------------------------------
		// SKILL_ID_SOCHI_SEIZO
		defineSkill(SKILL_ID_SOCHI_SEIZO, function() {
			this.name = "装置製造";
			this.kana = "ソウチセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 70;
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
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 攻撃装置有効化
		// ----------------------------------------------------------------
		// SKILL_ID_KOGEKI_SOCHI_YUKOKA
		defineSkill(SKILL_ID_KOGEKI_SOCHI_YUKOKA, function() {
			this.name = "攻撃装置有効化";
			this.kana = "コウケキソウチユウコウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = CSkillData.RANGE_LONG;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 3300 + 1500 * skillLv;
				// POW補正
				ratio += 36 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000 + 400 * skillLv;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 防御装置有効化
		// ----------------------------------------------------------------
		// SKILL_ID_BOGYO_SOCHI_YUKOKA
		defineSkill(SKILL_ID_BOGYO_SOCHI_YUKOKA, function() {
			this.name = "防御装置有効化";
			this.kana = "コウケキソウチユウコウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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
				return 45000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,240,180,120,90,60][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ツーアックスディフェンディング
		// ----------------------------------------------------------------
		// SKILL_ID_TWO_AXE_DEFENDING
		defineSkill(SKILL_ID_TWO_AXE_DEFENDING, function() {
			this.name = "ツーアックスディフェンディング";
			this.kana = "ツウアツクステイフエンテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ABRマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_ABR_MASTERY
		defineSkill(SKILL_ID_ABR_MASTERY, function() {
			this.name = "ABRマスタリー";
			this.kana = "エイヒイアアルマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ABR バトルウォリアー
		// ----------------------------------------------------------------
		// SKILL_ID_ABR_BATTLE_WARRIER
		defineSkill(SKILL_ID_ABR_BATTLE_WARRIER, function() {
			this.name = "ABR バトルウォリアー";
			this.kana = "エイヒイアアル　ハトルウオリアア";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,30,60,120,300][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ABR デュアルキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_ABR_DUAL_CANNON
		defineSkill(SKILL_ID_ABR_DUAL_CANNON, function() {
			this.name = "ABR デュアルキャノン";
			this.kana = "エイヒイアアル　テユアルキヤノン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,30,60,120,300][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ABR マザーネット
		// ----------------------------------------------------------------
		// SKILL_ID_ABR_MOTHER_NET
		defineSkill(SKILL_ID_ABR_MOTHER_NET, function() {
			this.name = "ABR マザーネット";
			this.kana = "エイヒイアアル　マサアネツト";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 310;
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
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,30,60,120,300][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ABR インフィニティ
		// ----------------------------------------------------------------
		// SKILL_ID_ABR_INFINITY
		defineSkill(SKILL_ID_ABR_INFINITY, function() {
			this.name = "ABR インフィニティ";
			this.kana = "エイヒイアアル　インフイニテイ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 440;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 59 - 9 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
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
				return [0,30,60,120,300][skillLv] * 1000;
			}
		}),


		// ----------------------------------------------------------------
		// スパークブラスター
		// ----------------------------------------------------------------
		// SKILL_ID_SPARK_BLASTER
		defineSkill(SKILL_ID_SPARK_BLASTER, function() {
			this.name = "スパークブラスター";
			this.kana = "スハアクフラスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return (UsedSkillSearch(SKILL_ID_MADOGEAR) > 0);
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// スキル倍率
				ratio = 5200 + 800 * skillLv;							// 基礎倍率
				ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);		// 特性ステータス補正
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.dispHitCount = function(skillLv) {
				return 2;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
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
		}),

		// ----------------------------------------------------------------
		// トリプルレーザー
		// ----------------------------------------------------------------
		// SKILL_ID_TRIPLE_LASER
		defineSkill(SKILL_ID_TRIPLE_LASER, function() {
			this.name = "トリプルレーザー";
			this.kana = "トリフルレエサア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(skillLv) {
				return (UsedSkillSearch(SKILL_ID_MADOGEAR) > 0);
			}
			this.hitCount = function(skillLv) {
				return 3;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				ratio = 1100 + 500 * skillLv;						// 基礎倍率
				ratio += 12 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				return Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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

		// ----------------------------------------------------------------
		// マイティスマッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_MIGHTY_SMASH
		defineSkill(SKILL_ID_MIGHTY_SMASH, function() {
			this.name = "マイティスマッシュ";
			this.kana = "マイテイスマツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND].includes(weapon);
			}
			this.dispHitCount = function(skillLv) {
				return 1;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				const state_axe_stomp = option.GetOptionValue(0);
				// 基本倍率
				if (state_axe_stomp === 1) {
					// アックスストンプ状態の場合
					ratio = 9000 + 750 * skillLv;						// 基礎倍率
					ratio += 55 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				} else {
					// 通常時
					ratio = 6700 + 650 * skillLv;						// 基礎倍率
					ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				}
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
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
		// アックスストンプ状態
		// ----------------------------------------------------------------
		// SKILL_ID_AXE_STOMP_STATUS
		defineSkill(SKILL_ID_AXE_STOMP_STATUS, function() {

			this.name = "アックスストンプ状態";
			this.kana = "アツクスストンフジヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ラッシュストライク */
		// SKILL_ID_RUSH_STRIKE
		defineSkill(SKILL_ID_RUSH_STRIKE, function() {
			this.name = "ラッシュストライク";
			this.kana = "ラッシュストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return ITEM_KIND_AXE_2HAND === weapon;
			}
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = 9800 + 2000 * skillLv;
				ratio += 66 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
			}
		}),

		/** パワフルスイング */
		// SKILL_ID_POWERFUL_SWING
		defineSkill(SKILL_ID_POWERFUL_SWING, function() {
			this.name = "パワフルスイング";
			this.kana = "パワフルスイング";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return ITEM_KIND_AXE_2HAND === weapon;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const state_axe_stomp = option.GetOptionValue(0); 
				if (state_axe_stomp === 1) {
					ratio += 11100 + 2700 * skillLv;
					ratio += 82 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				} else {
					ratio += 8800 + 2200 * skillLv;
					ratio += 66 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
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
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
			}
		}),

		/** エナジーキャノネード */
		// SKILL_ID_ENERGY_CANNONADE
		defineSkill(SKILL_ID_ENERGY_CANNONADE, function() {
			this.name = "エナジーキャノネード";
			this.kana = "エナジーキャノネード";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			// Def無視設定は head.js の _SUB_ApplyMonsterDefence にある
			this.WeaponCondition = function(weapon) {
				// 魔導ギア搭乗はスキル倍率以外に追加ATKへの補正があるので職固有自己支援で設定する
				const armed_gear = UsedSkillSearch(SKILL_ID_MADOGEAR) === 1;
				return armed_gear;
			}
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = 7000 + 2500 * skillLv;
				ratio += 65 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000 + 400 * skillLv;
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
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
			}
		}),

];
