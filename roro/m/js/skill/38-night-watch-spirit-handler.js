/**
 * スキル定義 38-night-watch-spirit-handler（SKILL_ID 1213–1252 / 40 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_ActiveSkillLV, n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from '../const/EnumCharaDataIndex.js';
import {
    ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_RIFLE, ITEM_KIND_SHOTGUN
} from '../const/EnumItemKind.js';
import {
    MIG_PARAM_ID_CON, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL
} from '../const/EnumMigItemParamId.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_AXE_STOMP_STATUS, SKILL_ID_BASIC_GRENADE, SKILL_ID_BREAKING_LIMIT_STATE, SKILL_ID_DEER_BREEZE,
    SKILL_ID_DEER_CANON, SKILL_ID_DOKUGAKU_SENTOGAKU, SKILL_ID_DOUBLE_BOWLING_BASH, SKILL_ID_DRAGONIC_AURA_STATE,
    SKILL_ID_DRAGONIC_BREATH, SKILL_ID_DRAGON_TRAINING, SKILL_ID_EXPLOSIVE_POWDER, SKILL_ID_FUMASHURIKEN_KOUCHIKU,
    SKILL_ID_FUMASHURIKEN_SHOUAKU, SKILL_ID_GENJUTSU_KAGE_NUI, SKILL_ID_GRAND_JUDGEMENT_STATE,
    SKILL_ID_GRENADES_DROPPING, SKILL_ID_GRENADE_MASTERY, SKILL_ID_HASTY_FIRE_IN_THE_HOLE, SKILL_ID_HELLS_DRIVE,
    SKILL_ID_HIDDEN_CARD, SKILL_ID_INTENSIVE_AIM, SKILL_ID_JUPITER_THUNDER_STORM, SKILL_ID_KAGE_GARI,
    SKILL_ID_KAGE_ISSEN, SKILL_ID_KAGE_NO_MAI, SKILL_ID_MADOGEAR, SKILL_ID_MAGAZIN_FOR_ONE, SKILL_ID_MEGA_SONIC_BLOW,
    SKILL_ID_METEOR_STORM_BUSTER, SKILL_ID_MEYHEMIC_THORNS, SKILL_ID_MIGHTY_SMASH, SKILL_ID_MISSION_BOMBARD,
    SKILL_ID_NAPALM_VULKAN_STRIKE, SKILL_ID_NYANTOMO_KENROKU, SKILL_ID_NYANTOMO_TEKKO, SKILL_ID_ONLY_ONE_BULLET,
    SKILL_ID_RESEARCH_REPORT, SKILL_ID_SANREI_ITTAI, SKILL_ID_SHIELD_SHOOTING_STATE, SKILL_ID_SPARK_BLASTER,
    SKILL_ID_SPIRAL_SHOOTING, SKILL_ID_SPIRIT_MASTERY, SKILL_ID_TIGER_HOWLING, SKILL_ID_TIGER_SLASH,
    SKILL_ID_TIGER_STRIKE, SKILL_ID_TRIPLE_LASER, SKILL_ID_VIGILANT_AT_NIGHT, SKILL_ID_WILD_FIRE
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// グレネードマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADE_MASTERY
		defineSkill(SKILL_ID_GRENADE_MASTERY, function() {
			this.name = "グレネードマスタリー";
			this.kana = "クレネエトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// インテンシブエイム
		// ----------------------------------------------------------------
		// SKILL_ID_INTENSIVE_AIM
		defineSkill(SKILL_ID_INTENSIVE_AIM, function() {
			this.name = "インテンシブエイム";
			this.kana = "インテンシフエイム";
			this.maxLv = 1;
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
		}),

		// ----------------------------------------------------------------
		// ヒドゥンカード
		// ----------------------------------------------------------------
		// SKILL_ID_HIDDEN_CARD
		defineSkill(SKILL_ID_HIDDEN_CARD, function() {
			this.name = "ヒドゥンカード";
			this.kana = "ヒトウンカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// オンリーワンバレット
		// ----------------------------------------------------------------
		// SKILL_ID_ONLY_ONE_BULLET
		defineSkill(SKILL_ID_ONLY_ONE_BULLET, function() {
			this.name = "オンリーワンバレット";
			this.kana = "オンリイワンハレツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_HANDGUN,ITEM_KIND_RIFLE].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				if (weapon == ITEM_KIND_HANDGUN) {
					ratio = 6500 + 1000 * skillLv;
				}
				else if (weapon == ITEM_KIND_RIFLE) {
					ratio = 3250 + 550 * skillLv;
				}
				// CON補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// 照準カウンター補正
				ratio += (950 + 150 * skillLv) * option.GetOptionValue(0);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 100;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 300 * skillLv;
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
			this.CriActRate = (skillLv, charaData, specData, mobData, option, weapon) => {              // クリティカル発生率
				if (weapon == ITEM_KIND_RIFLE) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// スパイラルシューティング
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_SHOOTING
		defineSkill(SKILL_ID_SPIRAL_SHOOTING, function() {
			this.name = "スパイラルシューティング";
			this.kana = "スハイラルシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
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

		// ----------------------------------------------------------------
		// マガジンフォーワン
		// ----------------------------------------------------------------
		// SKILL_ID_MAGAZIN_FOR_ONE
		defineSkill(SKILL_ID_MAGAZIN_FOR_ONE, function() {
			this.name = "マガジンフォーワン";
			this.kana = "マカシンフオオワン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 100;
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
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// ビジラントアットナイト
		// ----------------------------------------------------------------
		// SKILL_ID_VIGILANT_AT_NIGHT
		defineSkill(SKILL_ID_VIGILANT_AT_NIGHT, function() {
			this.name = "ビジラントアットナイト";
			this.kana = "ヒシラントアツトナイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 300 * skillLv;
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
		}),

		// ----------------------------------------------------------------
		// ワイルドファイア
		// ----------------------------------------------------------------
		// SKILL_ID_WILD_FIRE
		defineSkill(SKILL_ID_WILD_FIRE, function() {
			this.name = "ワイルドファイア";
			this.kana = "ワイルトフアイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 3;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_SHOTGUN,ITEM_KIND_GRENADEGUN].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				ratio += 4150 + 650 * skillLv;
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				ratio += (950 + 150 * n_A_ActiveSkillLV) * option.GetOptionValue(0);
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
		}),

		// ----------------------------------------------------------------
		// タイガースラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_TIGER_SLASH
		defineSkill(SKILL_ID_TIGER_SLASH, function() {
			this.name = "タイガースラッシュ";
			this.kana = "タイカアスラツシユ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				const state_sanrei_ittai = UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0;
				const state_tekko = Math.max(UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO),LearnedSkillSearch(SKILL_ID_NYANTOMO_TEKKO)) > 0;
				if (state_sanrei_ittai || state_tekko) {
					ratio = 5800 + 500 * skillLv;
					ratio += 200 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				} else {
					ratio = 4400 + 400 * skillLv;
					ratio += 160 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				}
				// POW補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				const state_sanrei_ittai = UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0;
				const state_tekko = Math.max(UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO),LearnedSkillSearch(SKILL_ID_NYANTOMO_TEKKO)) > 0;
				if (state_sanrei_ittai || state_tekko) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// タイガーハウリング
		// ----------------------------------------------------------------
		// SKILL_ID_TIGER_HOWLING
		defineSkill(SKILL_ID_TIGER_HOWLING, function() {
			this.name = "タイガーハウリング";
			this.kana = "タイカアハウリンク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + (skillLv-1)*200;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 + (skillLv-1)*500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// タイガーストライク
		// ----------------------------------------------------------------
		// SKILL_ID_TIGER_STRIKE
		defineSkill(SKILL_ID_TIGER_STRIKE, function() {
			this.name = "タイガーストライク";
			this.kana = "タイカアストライク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 600 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// にゃん友 -鉄虎-
		// ----------------------------------------------------------------
		// SKILL_ID_NYANTOMO_TEKKO
		defineSkill(SKILL_ID_NYANTOMO_TEKKO, function() {

			this.name = "にゃん友 -鉄虎-";
			this.kana = "ニヤントモテツコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 影の舞
		// ----------------------------------------------------------------
		// SKILL_ID_KAGE_NO_MAI
		defineSkill(SKILL_ID_KAGE_NO_MAI, function() {
			this.name = "影の舞";
			this.kana = "カケノマイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID; 
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 影狩りの習得Lv
				const kage_gari_lv = option.GetOptionValue(1);
				// ダメージ倍率
				ratio = 4600 + 100 * skillLv;						// 基礎倍率
				ratio += 56 * skillLv * kage_gari_lv;				// 修練係数 検証済み
				ratio += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
				if (parentSkillId == SKILL_ID_KAGE_NO_MAI) {
					// 分身の攻撃
					ratio = Math.floor(ratio * 30 / 100);			// 分身の威力は30%
					ratio *= option.GetOptionValue(0);				// 分身の数
				}
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
		// 影一閃
		// ----------------------------------------------------------------
		// SKILL_ID_KAGE_ISSEN
		defineSkill(SKILL_ID_KAGE_ISSEN, function() {
			this.name = "影一閃";
			this.kana = "カケイツセン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = 4;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 影の舞の習得Lv
				const kage_no_mai_lv = Math.max(LearnedSkillSearch(SKILL_ID_KAGE_NO_MAI), option.GetOptionValue(0));
				// ダメージ倍率
				ratio = 500 + 50 * skillLv;				// 基礎倍率
				ratio += 5 * skillLv * kage_no_mai_lv;	// 修練係数 検証済み
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				return Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
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
		// 影狩り
		// ----------------------------------------------------------------
		// SKILL_ID_KAGE_GARI
		defineSkill(SKILL_ID_KAGE_GARI, function() {
			this.name = "影狩り";
			this.kana = "カケカリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 7700 + 100 * skillLv;					// 基礎倍率
				// 影一閃の習得Lv
				const kage_issen_lv = Math.max(LearnedSkillSearch(SKILL_ID_KAGE_ISSEN), option.GetOptionValue(0));
				ratio += 87 * skillLv * kage_issen_lv;			// 修練係数 検証済み
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);		// 特性ステータス
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
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
				return 200 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 5000;
			}
		}),

		// ----------------------------------------------------------------
		// 幻術 -影縫い-
		// ----------------------------------------------------------------
		// SKILL_ID_GENJUTSU_KAGE_NUI
		defineSkill(SKILL_ID_GENJUTSU_KAGE_NUI, function() {
			this.name = "幻術 -影縫い-";
			this.kana = "ケンシユツカケヌイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 4;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 52000;										// 基礎倍率
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
				// 悪夢の場合
				if (option.GetOptionValue(0) === 1) {
					ratio *= 1.5;
				}
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
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
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 風魔手裏剣 -掌握-
		// ----------------------------------------------------------------
		// SKILL_ID_FUMASHURIKEN_SHOUAKU
		defineSkill(SKILL_ID_FUMASHURIKEN_SHOUAKU, function() {
			this.name = "風魔手裏剣 -掌握-";
			this.kana = "フウマシユリケンシヨウアク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
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
				return 5000;
			}
		}),

		// ----------------------------------------------------------------
		// 風魔手裏剣 -構築-
		// ----------------------------------------------------------------
		// SKILL_ID_FUMASHURIKEN_KOUCHIKU
		defineSkill(SKILL_ID_FUMASHURIKEN_KOUCHIKU, function() {
			this.name = "風魔手裏剣 -構築-";
			this.kana = "フウマシユリケンコウチク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
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
		// ユピテルサンダーストーム
		// ----------------------------------------------------------------
		// SKILL_ID_JUPITER_THUNDER_STORM
		defineSkill(SKILL_ID_JUPITER_THUNDER_STORM, function() {

			this.name = "ユピテルサンダーストーム";
			this.kana = "ユヒテルサンタアストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ヘルズドライブ
		// ----------------------------------------------------------------
		// SKILL_ID_HELLS_DRIVE
		defineSkill(SKILL_ID_HELLS_DRIVE, function() {

			this.name = "ヘルズドライブ";
			this.kana = "ヘルストライフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ナパームバルカンストライク
		// ----------------------------------------------------------------
		// SKILL_ID_NAPALM_VULKAN_STRIKE
		defineSkill(SKILL_ID_NAPALM_VULKAN_STRIKE, function() {

			this.name = "ナパームバルカンストライク";
			this.kana = "ナハアムハルカンストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// メテオストームバスター
		// ----------------------------------------------------------------
		// SKILL_ID_METEOR_STORM_BUSTER
		defineSkill(SKILL_ID_METEOR_STORM_BUSTER, function() {

			this.name = "メテオストームバスター";
			this.kana = "メテオストオムハスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 150 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0,1500,2000,2000,2500,2500,3000,3000,3500,3500,4000][skillLv];
			}
		}),

		// ----------------------------------------------------------------
		// ダブルボウリングバッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_DOUBLE_BOWLING_BASH
		defineSkill(SKILL_ID_DOUBLE_BOWLING_BASH, function() {
			this.name = "ダブルボウリングバッシュ";
			this.kana = "タフルホウリンクハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = function(skillLv, option) {
				const enemy_scope = option.GetOptionValue(0); // 巻き込み数補正
				return [3,4,5][enemy_scope];
			}
			this.Power = function(skillLv, charaData, option) {
				// 基本倍率
				const sentogaku_lv = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU));
				const braking_limit_lv = UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE);
				let ratio = 1350 + 50 * skillLv;																			// 基礎倍率
				ratio += 3 * skillLv * sentogaku_lv;		// 習得済みスキル条件
				ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				ratio *= n_A_BaseLV / 100;	// BaseLv補正
				ratio = Math.floor(ratio);
				// 最終倍率
				ratio *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][sentogaku_lv] / 100;	// 独学補正
				ratio = Math.floor(ratio);
				ratio *= [100, 150][braking_limit_lv] / 100; // ブレイキングリミット補正
				return Math.floor(ratio);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 300 * skillLv;
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
		}),

		// ----------------------------------------------------------------
		// メガソニックブロー
		// ----------------------------------------------------------------
		// SKILL_ID_MEGA_SONIC_BLOW
		defineSkill(SKILL_ID_MEGA_SONIC_BLOW, function() {
			this.name = "メガソニックブロー";
			this.kana = "メカソニツクフロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 8;
			this.Power = function(skillLv, charaData, option) {
				// 基本倍率
				const sentogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU));
				const breaking_limit_lv = UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE);
				const state_enemy_hp_half = option.GetOptionValue(0) === 1; // 敵の残りHPが半分以下
				let ratio = 4500 + 100 * skillLv;												// 基礎倍率
				ratio += 5 * skillLv * sentogaku;		// 習得済みスキル条件
				ratio += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);									// 特性ステータス補正
				ratio *= n_A_BaseLV / 100;															// BaseLv補正
				ratio = Math.floor(ratio);
				// 最終倍率
				ratio *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][sentogaku] / 100;	// 独学補正
				ratio = Math.floor(ratio);
				ratio *= [100, 150][breaking_limit_lv] / 100;												// ブレイキングリミット補正
				ratio = Math.floor(ratio);
				// 敵のHPが50%未満の場合ダメージ2倍
				if (state_enemy_hp_half) {
					ratio *= 2;
				}
				return ratio;

			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
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
		// エクスプロッシブパウダー
		// ----------------------------------------------------------------
		// SKILL_ID_EXPLOSIVE_POWDER
		defineSkill(SKILL_ID_EXPLOSIVE_POWDER, function() {
			this.name = "エクスプロッシブパウダー";
			this.kana = "エクスフロツシフハウタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// TODO: リサーチレポートはスキル倍率のみに影響を与えるので職固有自己支援からオプションへ移行する
				const state_research_report = Math.max(UsedSkillSearch(SKILL_ID_RESEARCH_REPORT),option.GetOptionValue(0)) > 0;
				if (state_research_report) {
					ratio = 7750 + 1750 * skillLv;
					ratio += 55 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				} else {
					ratio = 5700 + 1500 * skillLv;
					ratio += 44 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
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
		// メイヘミックソーンズ
		// ----------------------------------------------------------------
		// SKILL_ID_MEYHEMIC_THORNS
		defineSkill(SKILL_ID_MEYHEMIC_THORNS, function() {
			this.name = "メイヘミックソーンズ";
			this.kana = "メイヘミツクソオンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = 2;
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_RESEARCH_REPORT) > 0) {
					// レポートあり
					ratio = 3200 + 400 * skillLv;
					// 特性ステータス補正
					ratio += 24 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				} else {
					// レポートなし
					ratio = 2700 + 300 * skillLv;
					// 特性ステータス補正
					ratio += 19 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				}
				// BaseLv補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 300;
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
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
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

		// ----------------------------------------------------------------
		// にゃん友 -賢鹿-
		// ----------------------------------------------------------------
		// SKILL_ID_NYANTOMO_KENROKU
		defineSkill(SKILL_ID_NYANTOMO_KENROKU, function() {

			this.name = "にゃん友 -賢鹿-";
			this.kana = "ニヤントモケンロク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ディアーキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_DEER_CANON
		defineSkill(SKILL_ID_DEER_CANON, function() {
			this.name = "ディアーキャノン";
			this.kana = "テイアアキヤノン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option, mobData, parentSkillId) {
				const rainbow_horn = option.GetOptionValue(0);
				return rainbow_horn;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				const condition_powerup = UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0
										|| UsedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0
										|| LearnedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0;
				if (condition_powerup) {
					// 強化状態
					ratio = 6400 + 800 * skillLv;
					ratio += 350 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				} else {
					// 通常時
					ratio = 4350 + 750 * skillLv;
					ratio += 280 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				}
				// SPL補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 110;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ディアーブリーズ
		// ----------------------------------------------------------------
		// SKILL_ID_DEER_BREEZE
		defineSkill(SKILL_ID_DEER_BREEZE, function() {
			this.name = "ディアーブリーズ";
			this.kana = "テイアアフリイス";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// ベーシックグレネード
		// ----------------------------------------------------------------
		// SKILL_ID_BASIC_GRENADE
		defineSkill(SKILL_ID_BASIC_GRENADE, function() {
			this.name = "ベーシックグレネード";
			this.kana = "ヘエシツククレネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 5450 + 600 * skillLv;					// 基本
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				ratio += 50 * grenade_mastery_lv;
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 180;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 500 + 300 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 200;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ヘイスティファイアインザホール
		// ----------------------------------------------------------------
		/*
			実際には
			指定セルの周辺5x5セルに2hit → 0.3秒後さらに2hit → 0.3秒後さらに2hit
			なのでいまのダメージの表示方法は厳密ではないかもしれない
		*/
		// SKILL_ID_HASTY_FIRE_IN_THE_HOLE
		defineSkill(SKILL_ID_HASTY_FIRE_IN_THE_HOLE, function() {
			this.name = "ヘイスティファイアインザホール";
			this.kana = "ヘイステイフアイアインサホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = 2;
			this.hitCount = 3;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 6250 + 600 * skillLv;							// 基本
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				ratio += 20 * grenade_mastery_lv;					 	// グレネードマスタリー補正
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
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
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// グレネーズドロッピング
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADES_DROPPING
		defineSkill(SKILL_ID_GRENADES_DROPPING, function() {
			this.name = "グレネーズドロッピング";
			this.kana = "クレネエストロツヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.ground_installation = true;
			this.damageInterval = 250;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 2450 + 300 * skillLv;				// 基本
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);	// 特性ステータス補正
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				ratio += 30 * grenade_mastery_lv;					// グレネードマスタリー補正
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 3500 + 400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 4 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ミッションボンバード
		// ----------------------------------------------------------------
		// SKILL_ID_MISSION_BOMBARD
		defineSkill(SKILL_ID_MISSION_BOMBARD, function() {
			this.name = "ミッションボンバード";
			this.kana = "ミツシヨンホンハアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.ground_installation = function(option) {
				return option.GetOptionValue(1) == 1;
			}
			this.damageInterval = 250;
			this.element = function(option) {
				const bullet_element = option.GetOptionValue(0);
				return bullet_element > 0 ? bullet_element : CSkillData.ELEMENT_VOID;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// グレネードマスタリー補正
				const grenade_mastery_lv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY));
				if (option.GetOptionValue(1) === 0) {
					// 初撃
					ratio = 17000 + 1150 * skillLv;						// 基本
					ratio += 100 * grenade_mastery_lv;					// グレネードマスタリー補正
				} else {
					// 追撃
					ratio = 14250 + 900 * skillLv;						// 基本
					ratio += 30 * grenade_mastery_lv;					// グレネードマスタリー補正
				}
				// 特性ステータス補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// BaseLv補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 15 + skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 16000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 4000;
			}
		}),

];
