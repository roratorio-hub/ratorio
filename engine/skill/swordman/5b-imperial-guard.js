/**
 * スキル定義 swordman/5b-imperial-guard（18 件 / SKILL_ID 1084〜1311 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../bridge/hmjob-bridge.js";
import { n_A_BaseLV } from "../../runtime/ro4-state.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { EQUIP_REGION_ID_SHIELD } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT } from "../../const/EnumItemDataIndex.js";
import { ITEM_KIND_SPEAR, ITEM_KIND_SPEAR_2HAND } from "../../const/EnumItemKind.js";
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from "../../const/EnumMigItemParamId.js";
import { ITEM_ID_NOEQUIP_SHIELD, ItemObjNew } from "../../equip/item.dat.js";
import { n_A_Equip, n_A_SHIELD_DEF_PLUS, n_A_WeaponType } from "../../runtime/roro-state.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_ATTACK_STANCE, SKILL_ID_CROSS_RAIN, SKILL_ID_GRAND_JUDGEMENT, SKILL_ID_GRAND_JUDGEMENT_STATE,
    SKILL_ID_GUARDIAN_SHIELD, SKILL_ID_GUARD_STANCE, SKILL_ID_HOLY_SHIELD, SKILL_ID_IMPERIAL_CROSS,
    SKILL_ID_IMPERIAL_PRESSURE, SKILL_ID_JUDGEMENT_CROSS, SKILL_ID_OVER_SLASH, SKILL_ID_RADIANT_SPEAR,
    SKILL_ID_REBOUND_SHIELD, SKILL_ID_SHIELD_SHOOTING, SKILL_ID_SHIELD_SHOOTING_STATE, SKILL_ID_TATE_SHUREN,
    SKILL_ID_ULTIMATE_SACRIFICE, SKILL_ID_YARI_KATATE_KEN_SHUREN
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ガードスタンス
		// ----------------------------------------------------------------
		// SKILL_ID_GUARD_STANCE
		defineSkill(SKILL_ID_GUARD_STANCE, function() {
			this.name = "ガードスタンス";
			this.kana = "カアトスタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
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
				return 10 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ガーディアンシールド
		// ----------------------------------------------------------------
		// SKILL_ID_GUARDIAN_SHIELD
		defineSkill(SKILL_ID_GUARDIAN_SHIELD, function() {
			this.name = "ガーディアンシールド";
			this.kana = "カアテイアンシイルト";
			this.maxLv = 5;
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
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,240,90,30,10,2][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// リバウンドシールド
		// ----------------------------------------------------------------
		// SKILL_ID_REBOUND_SHIELD
		defineSkill(SKILL_ID_REBOUND_SHIELD, function() {
			this.name = "リバウンドシールド";
			this.kana = "リハウントシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 35 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (40 - 5 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 盾修練
		// ----------------------------------------------------------------
		// SKILL_ID_TATE_SHUREN
		defineSkill(SKILL_ID_TATE_SHUREN, function() {

			this.name = "盾修練";
			this.kana = "タテシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 槍＆片手剣修練
		// ----------------------------------------------------------------
		// SKILL_ID_YARI_KATATE_KEN_SHUREN
		defineSkill(SKILL_ID_YARI_KATATE_KEN_SHUREN, function() {

			this.name = "槍＆片手剣修練";
			this.kana = "ヤリカタテケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アタックスタンス
		// ----------------------------------------------------------------
		// SKILL_ID_ATTACK_STANCE
		defineSkill(SKILL_ID_ATTACK_STANCE, function() {
			this.name = "アタックスタンス";
			this.kana = "アタツクスタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
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
				return 10 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// アルティメットサクリファイス
		// ----------------------------------------------------------------
		// SKILL_ID_ULTIMATE_SACRIFICE
		defineSkill(SKILL_ID_ULTIMATE_SACRIFICE, function() {
			this.name = "アルティメットサクリファイス";
			this.kana = "アルテイメツトサクリフアイス";
			this.maxLv = 5;
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
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 30 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ホーリーシールド
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_SHIELD
		defineSkill(SKILL_ID_HOLY_SHIELD, function() {
			this.name = "ホーリーシールド";
			this.kana = "ホオリイシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
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
				return 30 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,240,120,90,60,30][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// グランドジャッジメント
		// ----------------------------------------------------------------
		// SKILL_ID_GRAND_JUDGEMENT
		defineSkill(SKILL_ID_GRAND_JUDGEMENT, function() {
			this.name = "グランドジャッジメント";
			this.kana = "クラントシヤツシメント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const state_attack_stance = UsedSkillSearch(SKILL_ID_ATTACK_STANCE) > 0;
				const mutch_weapon = [ITEM_KIND_SPEAR,ITEM_KIND_SPEAR_2HAND].includes(n_A_WeaponType);
				return state_attack_stance && mutch_weapon;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 10000 + 2900 * skillLv;
				// POW補正
				ratio += 130 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 430;
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
				return (10 + 5 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ジャッジメントクロス
		// ----------------------------------------------------------------
		// SKILL_ID_JUDGEMENT_CROSS
		defineSkill(SKILL_ID_JUDGEMENT_CROSS, function() {
			this.name = "ジャッジメントクロス";
			this.kana = "シヤツシメントクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 5;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
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
		}),

		// ----------------------------------------------------------------
		// シールドシューティング
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SHOOTING
		defineSkill(SKILL_ID_SHIELD_SHOOTING, function() {
			this.name = "シールドシューティング";
			this.kana = "シイルトシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 7;
			this.WeaponCondition = function(weapon) {
				return n_A_Equip[EQUIP_REGION_ID_SHIELD] !== ITEM_ID_NOEQUIP_SHIELD;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 2600 + 800 * skillLv;
				// 修練補正
				ratio += 66 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TATE_SHUREN), UsedSkillSearch(SKILL_ID_TATE_SHUREN));
				// 盾の精錬値・重量補正
				ratio += n_A_SHIELD_DEF_PLUS * 330;
				ratio += ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT];
				// POW補正
				ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 160;
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
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// オーバースラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_OVER_SLASH
		defineSkill(SKILL_ID_OVER_SLASH, function() {
			this.name = "オーバースラッシュ";
			this.kana = "オオハアスラツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const state_attack_stance = UsedSkillSearch(SKILL_ID_ATTACK_STANCE) > 0;
				return state_attack_stance;
			}
			this.hitCount = function(skillLv, option, weapon) {
				return [3,5,7][option.GetOptionValue(0)];
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 130 * skillLv;
				// 修練補正
				ratio += 12 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN), UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN));
				// POW補正 
				ratio += 7 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 240;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 300 * skillLv;
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
		// クロスレイン
		// ----------------------------------------------------------------
		// SKILL_ID_CROSS_RAIN
		defineSkill(SKILL_ID_CROSS_RAIN, function() {
			this.name = "クロスレイン";
			this.kana = "クロスレイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				const state_holy_shield = UsedSkillSearch(SKILL_ID_HOLY_SHIELD) > 0;
				const yari_katate_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN), UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN));
				if (state_holy_shield) {
					ratio = 150 * skillLv;
					ratio += 15 * skillLv * yari_katate_shuren_lv;
					ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				} else {
					ratio = 120 * skillLv;
					ratio += 12 * skillLv * yari_katate_shuren_lv;
					ratio += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	
				}
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 430;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 100 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// シールドシューティング状態
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_SHOOTING_STATE
		defineSkill(SKILL_ID_SHIELD_SHOOTING_STATE, function() {

			this.name = "シールドシューティング状態";
			this.kana = "シイルトシユウテインクジヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// グランドジャッジメント状態
		// ----------------------------------------------------------------
		// SKILL_ID_GRAND_JUDGEMENT_STATE
		defineSkill(SKILL_ID_GRAND_JUDGEMENT_STATE, function() {
			this.name = "グランドジャッジメント状態";
			this.kana = "クラントシヤツシメントジヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** レイディアントスピア */
		// SKILL_ID_RADIANT_SPEAR
		defineSkill(SKILL_ID_RADIANT_SPEAR, function() {
			this.name = "レイディアントスピア";
			this.kana = "レイディアントスピア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = weapon === ITEM_KIND_SPEAR;
				const state_attack_stance = UsedSkillSearch(SKILL_ID_ATTACK_STANCE) > 0;
				return mutch_weapon && state_attack_stance;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: グランドジャッジメント状態はスキル倍率のみに影響するため職固有自己支援から攻撃オプションへ移行する
				const state_grand_judgement = Math.max(UsedSkillSearch(SKILL_ID_GRAND_JUDGEMENT_STATE), option.GetOptionValue(0)) === 1;
				const yari_katate_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN), LearnedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN));
				if (state_grand_judgement) {
					ratio += 1200 + 450 * skillLv;
					ratio += 32 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				} else {
					ratio += -100 + 400 * skillLv;
					ratio += 26 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				}
				ratio += 390 * yari_katate_shuren_lv; // 修練係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 240;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 300 * skillLv;
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

		/** インペリアルクロス */
		// SKILL_ID_IMPERIAL_CROSS
		defineSkill(SKILL_ID_IMPERIAL_CROSS, function() {
			this.name = "インペリアルクロス";
			this.kana = "インペリアルクロス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const state_attack_stance = UsedSkillSearch(SKILL_ID_ATTACK_STANCE) > 0;
				return state_attack_stance;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: グランドジャッジメント状態はスキル倍率のみに影響するため職固有自己支援から攻撃オプションへ移行する
				const state_grand_judgement = Math.max(UsedSkillSearch(SKILL_ID_GRAND_JUDGEMENT_STATE), option.GetOptionValue(0)) === 1;
				const yari_katate_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN), LearnedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN));
				if (state_grand_judgement) {
					ratio += 1500 + 2700 * skillLv;
					ratio += 82 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				} else {
					ratio += -800 + 2200 * skillLv;
					ratio += 66 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				}
				ratio += 960 * yari_katate_shuren_lv; // 修練係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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
				return 500 + 500 * skillLv;
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

		/** インペリアルプレッシャー */
		// SKILL_ID_IMPERIAL_PRESSURE
		defineSkill(SKILL_ID_IMPERIAL_PRESSURE, function() {
			this.name = "インペリアルプレッシャー";
			this.kana = "インペリアルプレッシャー";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.dispHitCount = 2;
			this.element = function(option) {
				const state_guard_stance = UsedSkillSearch(SKILL_ID_GUARD_STANCE) > 0;
				if (state_guard_stance) {
					return CSkillData.ELEMENT_FORCE_HOLY;
				} else {
					return CSkillData.ELEMENT_FORCE_VANITY;
				}
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const yari_katate_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN), LearnedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN));
				ratio += -500 + 1000 * skillLv;
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// Spl係数
				ratio += 450 * yari_katate_shuren_lv;	// 修練係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 350;
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
