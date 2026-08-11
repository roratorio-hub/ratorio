/**
 * スキル定義 40-fourth-class-extra（SKILL_ID 1292–1318 / 27 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { HtmlGetObjectValueByIdAsInteger } from '../../../common/js/util.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ELM_ID_VANITY } from '../const/EnumElmId.js';
import {
    ITEM_KIND_AXE_2HAND, ITEM_KIND_BOW, ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN,
    ITEM_KIND_MUSICAL, ITEM_KIND_RIFLE, ITEM_KIND_SHOTGUN, ITEM_KIND_SPEAR, ITEM_KIND_SPEAR_2HAND, ITEM_KIND_WHIP
} from '../const/EnumItemKind.js';
import { ITEM_SP_ELEMENTAL } from '../const/EnumItemSpId.js';
import {
    MIG_PARAM_ID_CON, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL
} from '../const/EnumMigItemParamId.js';
import { GetEquippedTotalSPArrow } from '../foot-bridge.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_ABYSS_FLAME, SKILL_ID_ATTACK_STANCE, SKILL_ID_BAKURETSU_HADO, SKILL_ID_BLAZING_FLAME_BLAST,
    SKILL_ID_CHASING_BREAK, SKILL_ID_CHASING_SHOT, SKILL_ID_CHUL_HO_BATTERING, SKILL_ID_CROSS_SLASH,
    SKILL_ID_DIVINUS_FLOS, SKILL_ID_DRAGONIC_PIERCE, SKILL_ID_DUST_EXPLOSION, SKILL_ID_ENERGY_CANNONADE,
    SKILL_ID_ENERGY_CONVERSION, SKILL_ID_FIDOS_ANIMUS, SKILL_ID_FOUR_CHARM, SKILL_ID_GRAND_JUDGEMENT_STATE,
    SKILL_ID_GUARD_STANCE, SKILL_ID_HIDDEN_CARD, SKILL_ID_HIT_AND_SLIDING, SKILL_ID_HYUN_ROK_SPIRIT_POWER,
    SKILL_ID_IMPERIAL_CROSS, SKILL_ID_IMPERIAL_PRESSURE, SKILL_ID_MADOGEAR, SKILL_ID_MAHOKEN_SHUREN,
    SKILL_ID_MIDNIGHT_FALLEN, SKILL_ID_MYSTERY_POWDER, SKILL_ID_MYSTIC_SYMPHONY, SKILL_ID_OVERCOMING_CRISIS,
    SKILL_ID_POWERFUL_SWING, SKILL_ID_RADIANT_SPEAR, SKILL_ID_RESEARCH_REPORT, SKILL_ID_RHYTHMICAL_WAVE,
    SKILL_ID_RUSH_STRIKE, SKILL_ID_SHADOW_EXCEED, SKILL_ID_SKY_MOON, SKILL_ID_SKY_SUN, SKILL_ID_SPIRIT_MASTERY,
    SKILL_ID_STAGE_MANNER, SKILL_ID_STAR_LIGHT_KICK, SKILL_ID_TENKI_SHUREN, SKILL_ID_WILD_SHOT,
    SKILL_ID_YARI_KATATE_KEN_SHUREN
} from '../skill.dat.js';

export const skills = [
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

		/** ワイルドショット */
		// SKILL_ID_WILD_SHOT
		defineSkill(SKILL_ID_WILD_SHOT, function() {
			this.name = "ワイルドショット";
			this.kana = "ワイルドショット";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = [ITEM_KIND_HANDGUN, ITEM_KIND_RIFLE].includes(weapon);
				return mutch_weapon;
			}
			this.hitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// ヒドゥンカードはスキル倍率だけでなくP.Atkと遠距離ダメージに影響するので職固有自己支援で設定する
				const state_hidden_card = Math.max(UsedSkillSearch(SKILL_ID_HIDDEN_CARD));
				if (state_hidden_card > 0) {
					ratio += 475 + 205 * skillLv;
				} else {
					ratio += 475 + 125 * skillLv;
				}
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// Con係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 220;
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
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** ミッドナイトフォーリン */
		// SKILL_ID_MIDNIGHT_FALLEN
		defineSkill(SKILL_ID_MIDNIGHT_FALLEN, function() {
			this.name = "ミッドナイトフォーリン";
			this.kana = "ミッドナイトフォーリン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = [ITEM_KIND_SHOTGUN, ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN].includes(weapon);
				return mutch_weapon;
			}
			this.hitCount = 3;
			// Def無視設定は head.js の _SUB_ApplyMonsterDefence にある
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// ヒドゥンカードはスキル倍率だけでなくP.Atkと遠距離ダメージに影響するので職固有自己支援で設定する
				const state_hidden_card = Math.max(UsedSkillSearch(SKILL_ID_HIDDEN_CARD));
				if (state_hidden_card > 0) {
					ratio += 925 + 235 * skillLv;
				} else {
					ratio += 925 + 125 * skillLv;
				}
				ratio += 7 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// Con係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
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
				//return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				//return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

		/** リズミカルウェーブ */
		// SKILL_ID_RHYTHMICAL_WAVE
		defineSkill(SKILL_ID_RHYTHMICAL_WAVE, function() {
			this.name = "リズミカルウェーブ";
			this.kana = "リズミカルウェーブ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option) {
				// 属性付与を優先する
				let value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", ELM_ID_VANITY);
				if (value === ELM_ID_VANITY) {
					// 付与されていなければ矢の属性を適用する
					value = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
				}
				return value;
			}
			this.WeaponCondition = function(weapon) {
				const mutch_weapon = [ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon);
				return mutch_weapon;
			}
			// 分割2ヒット
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: ミスティックシンフォニーはスキル倍率だけに影響するので職固有自己支援から攻撃方法オプションに移行する
				const state_mystic_symphony = Math.max(UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY), option.GetOptionValue(0));
				const stage_manner_lv = Math.max(UsedSkillSearch(SKILL_ID_STAGE_MANNER), LearnedSkillSearch(SKILL_ID_STAGE_MANNER));
				if (state_mystic_symphony === 1) {
					ratio += 4000 + 1000 * skillLv;
					ratio += 6 * GetTotalSpecStatus(MIG_PARAM_ID_SPL) * stage_manner_lv;	// Spl係数 検証済み
				} else {
					ratio += 2250 + 750 * skillLv;
					ratio += 4 * GetTotalSpecStatus(MIG_PARAM_ID_SPL) * stage_manner_lv;	// Spl係数 検証済み
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
				//return this._CriActRate100(skillLv, charaData, specData, mobData);
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				//return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				return 0;
			}
		}),

		/** 天気身陽 */
		// SKILL_ID_SKY_SUN
		defineSkill(SKILL_ID_SKY_SUN, function() {
			this.name = "天気身陽";
			this.kana = "天気身陽";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;			
			this.element = CSkillData.ELEMENT_VOID;
			// 天気の身はスキルの使用可否だけに影響するので制約条件をチェックしない
			// Def無視設定は head.js の _SUB_ApplyMonsterDefence にある
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const tenki_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_TENKI_SHUREN), LearnedSkillSearch(SKILL_ID_TENKI_SHUREN));
				ratio += 1250 + 50 * skillLv;
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				ratio += 30 * skillLv * tenki_shuren_lv;	// 修練係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
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
				return 500;
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

		/** 天気身月 */
		// SKILL_ID_SKY_MOON
		defineSkill(SKILL_ID_SKY_MOON, function() {
			this.name = "天気身月";
			this.kana = "天気身月";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;			
			this.element = CSkillData.ELEMENT_VOID;
			// 分割2ヒット
			this.dispHitCount = 2;
			// 天気の身はスキルの使用可否だけに影響するので制約条件をチェックしない
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const tenki_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_TENKI_SHUREN), LearnedSkillSearch(SKILL_ID_TENKI_SHUREN));
				ratio += 3100 + 50 * skillLv;
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				ratio += 66 * skillLv * tenki_shuren_lv;	// 修練係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
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
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
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

		/** 天星の行 */
		// SKILL_ID_STAR_LIGHT_KICK
		defineSkill(SKILL_ID_STAR_LIGHT_KICK, function() {
			this.name = "天星の行";
			this.kana = "天星の行";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;			
			this.element = CSkillData.ELEMENT_VOID;
			// 天気の身はスキルの使用可否だけに影響するので制約条件をチェックしない
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const tenki_shuren_lv = Math.max(UsedSkillSearch(SKILL_ID_TENKI_SHUREN), LearnedSkillSearch(SKILL_ID_TENKI_SHUREN));
				ratio += 3100 + 50 * skillLv;
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数
				ratio += 66 * skillLv * tenki_shuren_lv;	// 修練係数
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
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
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
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

		/** タイガーバトリング */
		// SKILL_ID_CHUL_HO_BATTERING
		defineSkill(SKILL_ID_CHUL_HO_BATTERING, function() {
			this.name = "タイガーバトリング";
			this.kana = "タイガーバトリング";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const spirit_mastery_lv = Math.max(UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY), LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				ratio += 1475 + 325 * skillLv;
				ratio += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数未検証
				ratio += 75 * spirit_mastery_lv;	// 修練係数未検証
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 600 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1500 + 500 * skillLv;
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

		/** ディアースピリットパワー */
		// SKILL_ID_HYUN_ROK_SPIRIT_POWER
		defineSkill(SKILL_ID_HYUN_ROK_SPIRIT_POWER, function() {
			this.name = "ディアースピリットパワー";
			this.kana = "ディアースピリットパワー";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;			
			this.element = function(option) {
				const rainbow_horn_lv = option.GetOptionValue(0);
				return rainbow_horn_lv;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const spirit_mastery_lv = Math.max(UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY), LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				ratio += 2650 + 650 * skillLv;
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// Spl係数未検証
				ratio += 180 * spirit_mastery_lv;	// 修練係数未検証
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
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

		/** クロススラッシュ */
		// SKILL_ID_CROSS_SLASH
		defineSkill(SKILL_ID_CROSS_SLASH, function() {
			this.name = "クロススラッシュ";
			this.kana = "クロススラッシュ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: シャドウエクシード状態はスキル倍率のみに影響するため職固有自己支援から攻撃オプションへ移行する
				const state_shadow_exceed = Math.max(UsedSkillSearch(SKILL_ID_SHADOW_EXCEED), option.GetOptionValue(0)) > 0;
				ratio += 50 + 50 * skillLv;
				ratio += 1 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				if (state_shadow_exceed) {
					ratio *= 2;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
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
				return 10 * 1000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
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

		/** ミステリーパウダー */
		// SKILL_ID_MYSTERY_POWDER
		defineSkill(SKILL_ID_MYSTERY_POWDER, function() {
			this.name = "ミステリーパウダー";
			this.kana = "ミステリーパウダー";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio += 5950 + 1450 * skillLv;
				ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
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

		/** ダストエクスプロージョン */
		// SKILL_ID_DUST_EXPLOSION
		defineSkill(SKILL_ID_DUST_EXPLOSION, function() {
			this.name = "ダストエクスプロージョン";
			this.kana = "ダストエクスプロージョン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			// ミステリーパウダー状態の制約をかけるメリットはないので無条件で計算可能とする
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				// TODO: リサーチレポートはスキル倍率のみに影響するので職固有自己支援から攻撃オプションへ移行する
				const state_research_report = Math.max(UsedSkillSearch(SKILL_ID_RESEARCH_REPORT), option.GetOptionValue(0)) === 1;
				if (state_research_report) {
					ratio += 7000 + 1900 * skillLv;
					ratio += 55 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				} else {
					ratio += 5950 + 1450 * skillLv;
					ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数 検証済み
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
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

		/** 四色符 */
		// SKILL_ID_FOUR_CHARM
		defineSkill(SKILL_ID_FOUR_CHARM, function() {
			this.name = "四色符";
			this.kana = "四色符";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 320;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0 * skillLv;
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

		/** オーバーカミングクライシス */
		// SKILL_ID_OVERCOMING_CRISIS
		defineSkill(SKILL_ID_OVERCOMING_CRISIS, function() {
			this.name = "オーバーカミングクライシス";
			this.kana = "オーバーカミングクライシス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 110;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10 + 20 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0 * skillLv;
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

		/** エナジーコンバージョン */
		// SKILL_ID_ENERGY_CONVERSION
		defineSkill(SKILL_ID_ENERGY_CONVERSION, function() {
			this.name = "エナジーコンバージョン";
			this.kana = "エナジーコンバージョン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return skillLv;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000 + 200 * skillLv;
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
		}),

];
