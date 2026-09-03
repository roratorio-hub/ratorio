/**
 * スキル定義 archer/5a-windhawk（15 件 / SKILL_ID 1040〜1291 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../bridge/hmjob-bridge.js";
import { n_A_BaseLV } from "../../runtime/ro4-state.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ELM_ID_VANITY } from "../../const/EnumElmId.js";
import { ITEM_KIND_BOW } from "../../const/EnumItemKind.js";
import { ITEM_SP_ELEMENTAL } from "../../const/EnumItemSpId.js";
import { MIG_PARAM_ID_CON } from "../../const/EnumMigItemParamId.js";
import { MONSTER_DATA_INDEX_RACE } from "../../const/EnumMonsterDataIndex.js";
import { RACE_ID_ANIMAL, RACE_ID_FISH } from "../../const/EnumRaceId.js";
import { GetEquippedTotalSPArrow } from "../../bridge/stallcalc-bridge.js";
import { n_A_WeaponZokusei } from "../../runtime/roro-state.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import {
    SKILL_ID_ADVANCED_TRAP, SKILL_ID_CALAMITY_GALE, SKILL_ID_CRESSIVE_VOLT,
    SKILL_ID_DEEP_BLIND_TRAP, SKILL_ID_FLAME_TRAP, SKILL_ID_GALE_STORM, SKILL_ID_HAWK_BOOMERANG,
    SKILL_ID_HAWK_MASTERY, SKILL_ID_HAWK_RUSH, SKILL_ID_SHIZEN_SHINWA, SKILL_ID_SOLID_TRAP, SKILL_ID_STEEL_CROW,
    SKILL_ID_SWIFT_TRAP, SKILL_ID_WILD_WALK, SKILL_ID_WIND_SIGN
} from "../skill.dat.js";

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

		/** ワイルドウォーク */
		// SKILL_ID_WILD_WALK
		defineSkill(SKILL_ID_WILD_WALK, function() {
			this.name = "ワイルドウォーク";
			this.kana = "ワイルドウォーク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				// 属性付与を優先する（OBJID_SELECT_ARMS_ELEMENT と同じ select を
				// HydrateFromModel() 経由で既に読んでいる n_A_WeaponZokusei を使う）
				let value = n_A_WeaponZokusei;
				if (value === ELM_ID_VANITY) {
					// 付与されていなければ矢の属性を適用する
					value = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
				}
				return value;
			}
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = -500 + 1000 * skillLv;
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				const shizen_shinwa_lv = Math.max(LearnedSkillSearch(SKILL_ID_SHIZEN_SHINWA), UsedSkillSearch(SKILL_ID_SHIZEN_SHINWA));
				const steel_crow_lv = Math.max(LearnedSkillSearch(SKILL_ID_STEEL_CROW), UsedSkillSearch(SKILL_ID_STEEL_CROW));
				ratio += 300 * (shizen_shinwa_lv + steel_crow_lv);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
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
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000 * skillLv;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
