/**
 * スキル定義 novice/5-hyper-novice（17 件 / SKILL_ID 1210〜1317 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../bridge/hmjob-bridge.js";
import {
    n_A_BaseLV, n_Delay, set_g_bDefinedDamageIntervals
} from "../../runtime/ro4-state.js";
import { n_A_WeaponType } from "../../runtime/roro-state.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from "../../const/EnumMigItemParamId.js";
import { MONSTER_DATA_INDEX_SIZE } from "../../const/EnumMonsterDataIndex.js";
import { SIZE_ID_LARGE, SIZE_ID_MEDIUM, SIZE_ID_SMALL } from "../../const/EnumSizeId.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_BREAKING_LIMIT, SKILL_ID_BREAKING_LIMIT_STATE, SKILL_ID_DOKUGAKU_MADOGAKU, SKILL_ID_DOKUGAKU_SENTOGAKU,
    SKILL_ID_DOUBLE_BOWLING_BASH, SKILL_ID_GROUND_GRAVITATION, SKILL_ID_HELLS_DRIVE, SKILL_ID_JACK_FROST_NOVA,
    SKILL_ID_JUPITER_THUNDER_STORM, SKILL_ID_MEGA_SONIC_BLOW, SKILL_ID_METEOR_STORM_BUSTER,
    SKILL_ID_NAPALM_VULKAN_STRIKE, SKILL_ID_OVERCOMING_CRISIS, SKILL_ID_RULE_BREAK, SKILL_ID_RULE_BREAK_STATE,
    SKILL_ID_SHIELD_CHAIN_RUSH, SKILL_ID_SPIRAL_PIERCE_MAX
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 独学 -戦闘学-
		// ----------------------------------------------------------------
		// SKILL_ID_DOKUGAKU_SENTOGAKU
		defineSkill(SKILL_ID_DOKUGAKU_SENTOGAKU, function() {

			this.name = "独学 -戦闘学-";
			this.kana = "トクカクセントウカク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 独学 -魔導学-
		// ----------------------------------------------------------------
		// SKILL_ID_DOKUGAKU_MADOGAKU
		defineSkill(SKILL_ID_DOKUGAKU_MADOGAKU, function() {

			this.name = "独学 -魔導学-";
			this.kana = "トクカクマトウカク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
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
			this.Power = function(skillLv, charaDataManger) {
				const madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				let wbairitu = 2700 + (150 * skillLv);
				wbairitu += 3 * skillLv * madogaku;			// 習得済みスキル条件
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
				return Math.floor(wbairitu);
			}
			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
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
			this.dispHitCount = 3;
			this.Power = function(skillLv, charaDataManger) {
				const madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				let wbairitu = 2600 + (150 * skillLv);			// 基礎倍率
				wbairitu += 4 * skillLv * madogaku;			// 習得済みスキル条件
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
				return Math.floor(wbairitu);
			}
			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 分割Hit数
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
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
			this.dispHitCount = 7;
			this.Power = function(skillLv, charaDataManger) {
				const madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				let wbairitu = 2600 + (150 * skillLv);			// 基礎倍率
				wbairitu += 4 * skillLv * madogaku;			// 習得済みスキル条件
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
				return Math.floor(wbairitu);
			}
			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 分割Hit数
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
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
			this.LifeTime = function(skillLv, charaDataManger) {	// オブジェクト生存期間
				return [0,1500,2000,2000,2500,2500,3000,3000,3500,3500,4000][skillLv];
			}
			this.damageInterval = function(skillLv) {	// ダメージ発生間隔
				return 500;
			}
			this.dispHitCount = function(skillLv, charaDataManger, option, parentSkillId) {
				return parentSkillId === undefined ? 3 : 1;	// 隕石 1 つあたり見た目 3 Hit
			}
			this.Power = function(skillLv, charaDataManger, option, mobData, weapon, parentSkillId) {
				const madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				let wbairitu;
				// 隕石
				if (parentSkillId === undefined) {
					wbairitu = 1750 + 50 * skillLv;				// 基礎倍率
					wbairitu += 5 * skillLv * madogaku;			// 習得済みスキル条件
					wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
					wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
					wbairitu = Math.floor(wbairitu);
					wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
					wbairitu = Math.floor(wbairitu);
					wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
				}
				// 爆発
				else {
					wbairitu = 1175 + 25 * skillLv;				// 基礎倍率
					wbairitu += 5 * skillLv * madogaku;			// 習得済みスキル条件
					wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
					// 爆発には独学補正が掛からない
					wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
					wbairitu = Math.floor(wbairitu);
					wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
				}
				return Math.floor(wbairitu);
			}
			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置スキル
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = g_skillManager.GetDamageInterval(battleCalcInfo.skillId, battleCalcInfo.skillLv); // ダメージ発生間隔
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);	// オブジェクト生存期間
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, attackMethodConfArray[0], battleCalcInfo.parentSkillId);	// 隕石 1 つあたり見た目 3 Hit
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
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
			this.genericFormula = true;
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
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// シールドチェーンラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHAIN_RUSH
		defineSkill(SKILL_ID_SHIELD_CHAIN_RUSH, function() {
			this.name = "シールドチェーンラッシュ";
			this.kana = "シイルトチエエンラツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 5;
			this.Power = function(skillLv, charaData, option) {
				// 基本倍率
				const sentogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU));
				const breaking_limit_lv = UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE);
				let ratio = 9250 + 300 * skillLv;											// 基礎倍率
				ratio += 3 * skillLv * sentogaku;											// 習得済みスキル条件
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);							// 特性ステータス補正
				ratio *= n_A_BaseLV / 100;													// BaseLv補正
				ratio = Math.floor(ratio);
				// 最終倍率
				ratio *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][sentogaku] / 100;	// 独学補正
				ratio = Math.floor(ratio);
				ratio *= [100, 150][breaking_limit_lv] / 100;			// ブレイキングリミット補正
				return Math.floor(ratio);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
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
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// スパイラルピアースマックス
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_PIERCE_MAX
		defineSkill(SKILL_ID_SPIRAL_PIERCE_MAX, function() {
			this.name = "スパイラルピアースマックス";
			this.kana = "スハイラルヒアアスマツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = 5;
			this.Power = function(skillLv, charaData, option, mobData) {
				// 基本倍率
				let ratio = 10750 + 350 * skillLv;
				const sentogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU));
				ratio += 3 * skillLv * sentogaku;
				// サイズ補正 (POWには掛からない)
				const size_ratio = [
					{ id: SIZE_ID_LARGE, ratio: 1.2 },
					{ id: SIZE_ID_MEDIUM, ratio: 1.3 },
					{ id: SIZE_ID_SMALL, ratio: 1.5 },
				];
				ratio *= size_ratio.find(item => item.id === mobData[MONSTER_DATA_INDEX_SIZE]).ratio;
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);																		// 特性ステータス補正
				ratio *= n_A_BaseLV / 100;																								// BaseLv補正
				ratio = Math.floor(ratio);
				// 最終倍率
				ratio *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][sentogaku] / 100;	// 独学補正
				ratio = Math.floor(ratio);
				const breaking_limit_lv = UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE);
				ratio *= [100, 150][breaking_limit_lv] / 100;	// ブレイキングリミット補正
				return Math.floor(ratio);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
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
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ジャックフロストノヴァ
		// ----------------------------------------------------------------
		// SKILL_ID_JACK_FROST_NOVA
		defineSkill(SKILL_ID_JACK_FROST_NOVA, function() {

			this.name = "ジャックフロストノヴァ";
			this.kana = "シヤツクフロストノウア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
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
				return 3000;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				const madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				let wbairitu;
				if (option.GetOptionValue(0) === 0) {
					// 初撃ダメージ計算が指定された場合 (独学補正は掛からない)
					wbairitu = 100 + (20 * skillLv);											// 基礎倍率
					wbairitu += 3 * skillLv * madogaku;										// 習得済みスキル条件
					wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);								// 特性ステータス補正
					wbairitu *= n_A_BaseLV / 100;														// BaseLv補正
					wbairitu = Math.floor(wbairitu);
					wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;			// ルールブレイク補正
				} else {
					// 設置ダメージ計算が指定された場合
					wbairitu = 650 + (25 * skillLv);							// 基礎倍率
					wbairitu += 3 * skillLv * madogaku;						// 習得済みスキル条件
					wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);				// 特性ステータス補正
					wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
					wbairitu = Math.floor(wbairitu);
					wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
					wbairitu = Math.floor(wbairitu);
					wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
				}
				return Math.floor(wbairitu);
			}
			this.dispHitCount = function(skillLv, charaDataManger, option) {
				return option.GetOptionValue(0) === 0 ? 1 : 2;
			}
			this.MagicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// ダメージ計算
				if (attackMethodConfArray[0].GetOptionValue(0) !== 0) {
					// 設置ダメージ計算が指定された場合
					set_g_bDefinedDamageIntervals(true);
					n_Delay[5] = 500;	// ダメージ間隔
					n_Delay[6] = 3000;	// オブジェクト存続時間
				}
				// 分割Hit数
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, attackMethodConfArray[0]);
				CS.wbairitu = g_skillManager.GetPower(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, attackMethodConfArray[0]);
			}
		}),

		// ----------------------------------------------------------------
		// グラウンドグラビテーション
		// ----------------------------------------------------------------
		// SKILL_ID_GROUND_GRAVITATION
		defineSkill(SKILL_ID_GROUND_GRAVITATION, function() {
			this.name = "グラウンドグラビテーション";
			this.kana = "クラウントクラヒテエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.dispHitCount = function(skillLv, charaData, option) {
				// 初撃なら分割2Hit
				return option.GetOptionValue(0) == 0 ? 2 : 1;
			}
			this.ground_installation = function(option) {
				return option.GetOptionValue(0) == 1;
			}
			this.damageInterval = 500;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				// ダメージ計算
				let ratio = 0;
				let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				if (option.GetOptionValue(0) === 0) {
					// 初撃ダメージ計算が指定された場合 (独学補正は掛からない)
					ratio = 850 + 50 * skillLv;											// 基礎倍率
					ratio += 4 * skillLv * madogaku;										// 習得済みスキル条件
					ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);						// 特性ステータス補正
					ratio = Math.floor(ratio * n_A_BaseLV / 100);
				} else {
					// 基本倍率
					ratio = 400 + 10 * skillLv;											// 基礎倍率
					ratio += 2 * skillLv * madogaku;										// 習得済みスキル条件
					ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);						// 特性ステータス補正
					ratio = Math.floor(ratio * n_A_BaseLV / 100);
					ratio = Math.floor(ratio * [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100);	// 独学補正
				}
				if (UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE) > 0) {
					ratio *= 3;
				}
				return Math.floor(ratio);
			}
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
				return 3000;
			}
			this.LifeTime = function(skillLv, charaData) {
				return 3000;
			}
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ブレイキングリミット状態
		// ----------------------------------------------------------------
		// SKILL_ID_BREAKING_LIMIT_STATE
		defineSkill(SKILL_ID_BREAKING_LIMIT_STATE, function() {

			this.name = "(×)ブレイキングリミット状態";
			this.kana = "フレイキンクリミツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ルールブレイク状態
		// ----------------------------------------------------------------
		// SKILL_ID_RULE_BREAK_STATE
		defineSkill(SKILL_ID_RULE_BREAK_STATE, function() {

			this.name = "(×)ルールブレイク状態";
			this.kana = "ルウルフレイク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ブレイキングリミット
		// ----------------------------------------------------------------
		// SKILL_ID_BREAKING_LIMIT
		defineSkill(SKILL_ID_BREAKING_LIMIT, function() {
			this.name = "ブレイキングリミット";
			this.kana = "フレイキンクリミツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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
				return 60 * 1000;
			}
		}),


		// ----------------------------------------------------------------
		// ルールブレイク
		// ----------------------------------------------------------------
		// SKILL_ID_RULE_BREAK
		defineSkill(SKILL_ID_RULE_BREAK, function() {
			this.name = "ルールブレイク";
			this.kana = "ルウルフレイク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
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

];
