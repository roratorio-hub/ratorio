/**
 * スキル定義 33-wind-hawk-arch-mage（SKILL_ID 1040–1071 / 32 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ITEM_KIND_BOW } from '../const/EnumItemKind.js';
import { MIG_PARAM_ID_CON, MIG_PARAM_ID_SPL } from '../const/EnumMigItemParamId.js';
import { MONSTER_DATA_INDEX_RACE } from '../const/EnumMonsterDataIndex.js';
import { RACE_ID_ANIMAL, RACE_ID_FISH } from '../const/EnumRaceId.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_ADVANCED_TRAP, SKILL_ID_ALL_BLOOM, SKILL_ID_ASTRAL_STRIKE, SKILL_ID_CALAMITY_GALE, SKILL_ID_CLIMAX,
    SKILL_ID_CLIMAX_HURRICANE_STATE, SKILL_ID_CRESSIVE_VOLT, SKILL_ID_CRYMSON_ARROW, SKILL_ID_CRYSTAL_IMPACT,
    SKILL_ID_DEADLY_PROJECTION, SKILL_ID_DEEP_BLIND_TRAP, SKILL_ID_DESTRACTIVE_HURRICANE, SKILL_ID_FLAME_TRAP,
    SKILL_ID_FLORAL_FLARE_ROAD, SKILL_ID_FROZEN_SLASH, SKILL_ID_GALE_STORM, SKILL_ID_HAWK_BOOMERANG,
    SKILL_ID_HAWK_MASTERY, SKILL_ID_HAWK_RUSH, SKILL_ID_MYSTERY_ILLUSION, SKILL_ID_RAIN_OF_CRYSTAL,
    SKILL_ID_ROCK_DOWN, SKILL_ID_RYOTETUSE_SHUREN, SKILL_ID_SHIZEN_SHINWA, SKILL_ID_SOLID_TRAP,
    SKILL_ID_SOUL_VULKUN_STRIKE, SKILL_ID_STORM_CANNON, SKILL_ID_STRATUM_TREAMER, SKILL_ID_SWIFT_TRAP,
    SKILL_ID_TORNADE_STORM, SKILL_ID_VIOLENT_QUAKE, SKILL_ID_WIND_SIGN
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// アドバンスドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_ADVANCED_TRAP
		defineSkill(SKILL_ID_ADVANCED_TRAP, function() {
			this.name = "アドバンスドトラップ";
			this.kana = "アトハンストトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ウィンドサイン
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_SIGN
		defineSkill(SKILL_ID_WIND_SIGN, function() {
			this.name = "ウィンドサイン";
			this.kana = "ウイントサイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
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
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0, 90, 72, 54, 36, 30][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 自然親和
		// ----------------------------------------------------------------
		// SKILL_ID_SHIZEN_SHINWA
		defineSkill(SKILL_ID_SHIZEN_SHINWA, function() {
			this.name = "(×)自然親和";
			this.kana = "シセンシンワ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ホークラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_HAWK_RUSH
		defineSkill(SKILL_ID_HAWK_RUSH, function() {
			this.name = "ホークラッシュ";
			this.kana = "ホオクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.WeaponCondition = function(weapon) {
				return (weapon === ITEM_KIND_BOW);
			}
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.dispHitCount = function(skillLv) {
				return 2;
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
				let ratio = 0;
				// 基本倍率
				ratio = 1000 + 100 * skillLv;
				// CON補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// 自然親和補正
				const shizen_shinwa_lv = Math.max(LearnedSkillSearch(SKILL_ID_SHIZEN_SHINWA), UsedSkillSearch(SKILL_ID_SHIZEN_SHINWA));
				ratio *= (1 + 0.2 * shizen_shinwa_lv);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 4;
			}
		}),

		// ----------------------------------------------------------------
		// ホークマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_HAWK_MASTERY
		defineSkill(SKILL_ID_HAWK_MASTERY, function() {
			this.name = "ホークマスタリー";
			this.kana = "ホオクマスタリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}
		}),

		// ----------------------------------------------------------------
		// カラミティゲイル
		// ----------------------------------------------------------------
		// SKILL_ID_CALAMITY_GALE
		defineSkill(SKILL_ID_CALAMITY_GALE, function() {
			this.name = "カラミティゲイル";
			this.kana = "カラミテイケイル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 350;
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
		// ホークブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_HAWK_BOOMERANG
		defineSkill(SKILL_ID_HAWK_BOOMERANG, function() {
			this.name = "ホークブーメラン";
			this.kana = "ホオクフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return (weapon === ITEM_KIND_BOW);
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
				let ratio = 0;
				// 基本倍率
				ratio = 2000 + 200 * skillLv;
				// CON補正
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// 自然親和補正
				const shizen_shinwa_lv = Math.max(LearnedSkillSearch(SKILL_ID_SHIZEN_SHINWA), UsedSkillSearch(SKILL_ID_SHIZEN_SHINWA));
				ratio *= (1 + 0.2 * shizen_shinwa_lv);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);	
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {
				return 5;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) * 0.5;
			}
		}),

		// ----------------------------------------------------------------
		// ゲイルストーム
		// ----------------------------------------------------------------
		// SKILL_ID_GALE_STORM
		defineSkill(SKILL_ID_GALE_STORM, function() {
			this.name = "ゲイルストーム";
			this.kana = "ケイルストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return (weapon === ITEM_KIND_BOW);
			}
			this.dispHitCount = function(skillLv) {
				return 5;
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 0;
				// 基本倍率
				ratio = 1000 + 200 * skillLv;
				// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
				// CON補正
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				// カラミティゲイル状態は小数点以下に掛からない
				// カラミティゲイル状態で Mob の種族が動物・魚介の場合ダメージ２倍
				if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
					if ([RACE_ID_FISH, RACE_ID_ANIMAL].includes(mobData[MONSTER_DATA_INDEX_RACE])) {
						ratio = Math.floor(ratio * 2.00);
					}
				}
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				} else {
					return 0;
				}
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
					return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				} else {
					return 0;
				}
			}
		}),

		// ----------------------------------------------------------------
		// ディープブラインドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_DEEP_BLIND_TRAP
		defineSkill(SKILL_ID_DEEP_BLIND_TRAP, function() {
			this.name = "ディープブラインドトラップ";
			this.kana = "テイイフフライントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.ground_installation = true;
			this.damageInterval = function(skillLv) {
				return [0, 1300, 900, 600, 400, 300][skillLv];
			}
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 0;
				// 基本倍率
				ratio = 3600 + 600 * skillLv;
				// トラップ研究は射程が伸びるだけでダメージには寄与しない
				// CON補正
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				ratio = ratio * n_A_BaseLV / 100;
				// アドバンスドトラップ研究は小数点以下にも掛かる
				// アドバンスドトラップ研究補正
				const advanced_trap_lv = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				ratio = Math.floor(ratio * (1 + 0.2 * advanced_trap_lv));
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 250;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 57000, 27700, 12100, 5500, 3100])[skillLv];
				// 補助スキルレベル取得
				var sklLvSub = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				if (sklLvSub > 0) {
					nLifeTime += 500 + (500 * sklLvSub);
				}
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ソリッドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_SOLID_TRAP
		defineSkill(SKILL_ID_SOLID_TRAP, function() {
			this.name = "ソリッドトラップ";
			this.kana = "ソリツトトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.ground_installation = true;
			this.damageInterval = function(skillLv) {
				return [0, 1300, 900, 600, 400, 300][skillLv];
			}
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 0;
				// 基本倍率
				ratio = 3600 + 600 * skillLv;
				// トラップ研究は射程が伸びるだけでダメージには寄与しない
				// CON補正
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				ratio = ratio * n_A_BaseLV / 100;
				// アドバンスドトラップ研究は小数点以下にも掛かる
				// アドバンスドトラップ研究補正
				const advanced_trap_lv = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				ratio = Math.floor(ratio * (1 + 0.2 * advanced_trap_lv));
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 180;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 57000, 27700, 12100, 5500, 3100])[skillLv];
				// 補助スキルレベル取得
				var sklLvSub = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				if (sklLvSub > 0) {
					nLifeTime += 500 + (500 * sklLvSub);
				}
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// スイフトトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_SWIFT_TRAP
		defineSkill(SKILL_ID_SWIFT_TRAP, function() {
			this.name = "スイフトトラップ";
			this.kana = "スイフトトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.ground_installation = true;
			this.damageInterval = function(skillLv) {
				return [0, 1300, 900, 600, 400, 300][skillLv];
			}
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 0;
				// 基本倍率
				ratio = 3600 + 600 * skillLv;
				// トラップ研究は射程が伸びるだけでダメージには寄与しない
				// CON補正
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				ratio = ratio * n_A_BaseLV / 100;
				// アドバンスドトラップ研究は小数点以下にも掛かる
				// アドバンスドトラップ研究補正
				const advanced_trap_lv = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				ratio = Math.floor(ratio * (1 + 0.2 * advanced_trap_lv));
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 57000, 27700, 12100, 5500, 3100])[skillLv];
				// 補助スキルレベル取得
				var sklLvSub = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				if (sklLvSub > 0) {
					nLifeTime += 500 + (500 * sklLvSub);
				}
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// クレッシブボルト
		// ----------------------------------------------------------------
		// SKILL_ID_CRESSIVE_VOLT
		defineSkill(SKILL_ID_CRESSIVE_VOLT, function() {
			this.name = "クレッシブボルト";
			this.kana = "クレツシフホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.WeaponCondition = function(weapon) {
				return (weapon === ITEM_KIND_BOW);
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
				let ratio = 0;
				// 基本倍率
				ratio = 1000 + 200 * skillLv;
				// CON補正
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				// クレッシブボルト状態は小数点以下にも掛かるのでここではfloorしない
				ratio *= n_A_BaseLV / 100;
				// クレッシブボルト状態による増幅をかけてからfloorする
				ratio = Math.floor(ratio * [1.00, 1.10, 1.25, 1.50][option.GetOptionValue(0)]);
				// カラミティゲイル状態は小数点以下に掛からないのでfloorのあとに計算する
				// カラミティゲイル状態で 1.25 倍
				if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
					ratio = Math.floor(ratio * 1.25);
					// Mob の種族が魚介または動物の場合さらに 2.00 倍
					if ([RACE_ID_FISH, RACE_ID_ANIMAL].includes(mobData[MONSTER_DATA_INDEX_RACE])) {
						ratio = Math.floor(ratio * 2.00);
					}
				}
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// フレイムトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_FLAME_TRAP
		defineSkill(SKILL_ID_FLAME_TRAP, function() {
			this.name = "フレイムトラップ";
			this.kana = "フレイムトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.ground_installation = true;
			this.damageInterval = function(skillLv) {
				return [0, 1300, 900, 600, 400, 300][skillLv];
			}
			this.range = function(weapon) {
				return CSkillData.RANGE_SHORT;
			}
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 0;
				// 基本倍率
				ratio = 3600 + 600 * skillLv;
				// トラップ研究は射程が伸びるだけでダメージには寄与しない
				// CON補正
				ratio += 22 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// ベースレベル補正
				ratio = ratio * n_A_BaseLV / 100;
				// アドバンスドトラップ研究は小数点以下にも掛かる
				// アドバンスドトラップ研究補正
				const advanced_trap_lv = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				ratio = Math.floor(ratio * (1 + 0.2 * advanced_trap_lv));
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 57000, 27700, 12100, 5500, 3100])[skillLv];
				// 補助スキルレベル取得
				var sklLvSub = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_TRAP), UsedSkillSearch(SKILL_ID_ADVANCED_TRAP));
				if (sklLvSub > 0) {
					nLifeTime += 500 + (500 * sklLvSub);
				}
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// デッドリープロジェクション
		// ----------------------------------------------------------------
		// SKILL_ID_DEADLY_PROJECTION
		defineSkill(SKILL_ID_DEADLY_PROJECTION, function() {
			this.name = "デッドリープロジェクション";
			this.kana = "テツトリイフロシエクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_UNDEAD;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 160;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 5000 + 1000 * skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// ディストラクティブハリケーン
		// ----------------------------------------------------------------
		// SKILL_ID_DESTRACTIVE_HURRICANE
		defineSkill(SKILL_ID_DESTRACTIVE_HURRICANE, function() {
			this.name = "ディストラクティブハリケーン";
			this.kana = "テイストラクテイフハリケエン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_CLIMAX) == 4) {
					return 0;
				}
				if (parentSkillId === undefined) {
					// 初段ＨＩＴの場合
					ratio = 4500 + 4500 * skillLv;
					ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					ratio = Math.floor(ratio * n_A_BaseLV / 100);
				} else {
					// クライマックスLv1 追撃の場合
					// SPL補正とベースレベル補正は乗らない
					ratio = 5000;
				}
				return ratio;
			}			
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// クライマックスハリケーン状態
		// ----------------------------------------------------------------
		// SKILL_ID_CLIMAX_HURRICANE_STATE
		defineSkill(SKILL_ID_CLIMAX_HURRICANE_STATE, function() {

			this.name = "クライマックスハリケーン状態";
			this.kana = "クライマツクスハリケエンシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// レインオブクリスタル
		// ----------------------------------------------------------------
		// SKILL_ID_RAIN_OF_CRYSTAL
		defineSkill(SKILL_ID_RAIN_OF_CRYSTAL, function() {
			this.name = "レインオブクリスタル";
			this.kana = "レインオフクリスタル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 4000;
			}
		}),

		// ----------------------------------------------------------------
		// ミステリーイリュージョン
		// ----------------------------------------------------------------
		// SKILL_ID_MYSTERY_ILLUSION
		defineSkill(SKILL_ID_MYSTERY_ILLUSION, function() {
			this.name = "ミステリーイリュージョン";
			this.kana = "ミステリイイリユウシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 基本倍率
				ratio = 1000 + 400 * skillLv;
				// SPL補正
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 450;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
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
		}),

		// ----------------------------------------------------------------
		// バイオレントクエイク
		// ----------------------------------------------------------------
		// SKILL_ID_VIOLENT_QUAKE
		defineSkill(SKILL_ID_VIOLENT_QUAKE, function() {
			this.name = "バイオレントクエイク";
			this.kana = "ハイオレントクエイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_CLIMAX) == 4) {
					return 0;
				}
				// 基本倍率
				ratio = 6000 + 600 * skillLv;
				// SPL補正
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 410;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// ソウルバルカンストライク
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_VULKUN_STRIKE
		defineSkill(SKILL_ID_SOUL_VULKUN_STRIKE, function() {
			this.name = "ソウルバルカンストライク";
			this.kana = "ソウルハルカンストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 330;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ストラタムトレマー
		// ----------------------------------------------------------------
		// SKILL_ID_STRATUM_TREAMER
		defineSkill(SKILL_ID_STRATUM_TREAMER, function() {
			this.name = "ストラタムトレマー";
			this.kana = "ストラタムトレマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// オールブルーム
		// ----------------------------------------------------------------
		// SKILL_ID_ALL_BLOOM
		defineSkill(SKILL_ID_ALL_BLOOM, function() {
			this.name = "オールブルーム";
			this.kana = "オオルフルウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.ground_installation = function(option) {
				const NotClimax5 = UsedSkillSearch(SKILL_ID_CLIMAX) != 5;
				const groundDamage = option.GetOptionValue(0) == 0;
				return NotClimax5 || groundDamage;
			}
			this.damageInterval = function(skillLv) {
				const climaxLv = UsedSkillSearch(SKILL_ID_CLIMAX);
				return climaxLv == 1 ? 150: 300;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				const climaxLv = UsedSkillSearch(SKILL_ID_CLIMAX);
				const additionalDamage = option.GetOptionValue(0) == 1;
				if (climaxLv == 4) {
					return 0;
				}
				if (climaxLv == 5 && additionalDamage) {
					// 追撃ダメージ
					return 50000 + 10000 * skillLv;
				} else {
					// 設置ダメージ
					let ratio = 0;
					ratio = 6000 + 600 * skillLv;
					ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					return Math.floor(ratio * n_A_BaseLV / 100);
				}
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 450;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// クリスタルインパクト
		// ----------------------------------------------------------------
		// SKILL_ID_CRYSTAL_IMPACT
		defineSkill(SKILL_ID_CRYSTAL_IMPACT, function() {
			this.name = "クリスタルインパクト";
			this.kana = "クリスタルインハクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.hitCount = function(skillLv, option, weapon, parentSkillId) {
				const climax2 = (UsedSkillSearch(SKILL_ID_CLIMAX) == 2);
				const firstDamage = (parentSkillId == undefined);
				return (firstDamage && climax2) ? 2: 1;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (parentSkillId == undefined) {
					// 初撃
					ratio = 4500 + 4500 * skillLv;
					ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				} else {
					// 追撃
					ratio = 1500;
					ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// トルネードストーム
		// ----------------------------------------------------------------
		// SKILL_ID_TORNADE_STORM
		defineSkill(SKILL_ID_TORNADE_STORM, function() {
			this.name = "トルネードストーム";
			this.kana = "トルネエトストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 380;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// フローラルフレアロード
		// ----------------------------------------------------------------
		// SKILL_ID_FLORAL_FLARE_ROAD
		defineSkill(SKILL_ID_FLORAL_FLARE_ROAD, function() {
			this.name = "フローラルフレアロード";
			this.kana = "フロオラルフレアロオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 380;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// クライマックス
		// ----------------------------------------------------------------
		// SKILL_ID_CLIMAX
		defineSkill(SKILL_ID_CLIMAX, function() {
			this.name = "クライマックス";
			this.kana = "クライマツクス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 610;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 20 + 10 * skillLv;
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
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// アストラルストライク
		// ----------------------------------------------------------------
		// SKILL_ID_ASTRAL_STRIKE
		defineSkill(SKILL_ID_ASTRAL_STRIKE, function() {
			this.name = "アストラルストライク";
			this.kana = "アストラルストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 680;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 16000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 100 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// ロックダウン
		// ----------------------------------------------------------------
		// SKILL_ID_ROCK_DOWN
		defineSkill(SKILL_ID_ROCK_DOWN, function() {
			this.name = "ロックダウン";
			this.kana = "ロツクタウン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ストームキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_STORM_CANNON
		defineSkill(SKILL_ID_STORM_CANNON, function() {
			this.name = "ストームキャノン";
			this.kana = "ストオムキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// クリムゾンアロー
		// ----------------------------------------------------------------
		// SKILL_ID_CRYMSON_ARROW
		defineSkill(SKILL_ID_CRYMSON_ARROW, function() {
			this.name = "クリムゾンアロー";
			this.kana = "クリムソンアロオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// フローズンスラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_FROZEN_SLASH
		defineSkill(SKILL_ID_FROZEN_SLASH, function() {
			this.name = "フローズンスラッシュ";
			this.kana = "フロオスンスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 両手杖修練
		// ----------------------------------------------------------------
		// SKILL_ID_RYOTETUSE_SHUREN
		defineSkill(SKILL_ID_RYOTETUSE_SHUREN, function() {
			this.name = "両手杖修練";
			this.kana = "リヨウテツエシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
