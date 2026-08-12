/**
 * スキル定義 taekwon/5b-soul-ascetic（17 件 / SKILL_ID 1187〜1203 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from '../../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { MIG_PARAM_ID_SPL } from '../../const/EnumMigItemParamId.js';
import { MOB_CONF_DEBUF_ID_SHIRYO_HYOI, n_B_IJYOU } from '../../mobconfdebuf.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_BUSHI_FU, SKILL_ID_BYAKKO_FU, SKILL_ID_COUNT_OF_SOUL_ENERGY, SKILL_ID_GENBU_FU, SKILL_ID_GOFU_SHUREN,
    SKILL_ID_GOGYO_FU, SKILL_ID_GOKON_ISSHIN, SKILL_ID_HOSHI_FU, SKILL_ID_REIDOZYUTSU_SHUREN, SKILL_ID_REIDO_FU,
    SKILL_ID_SEIRYU_FU, SKILL_ID_SHIHOZIN_FU, SKILL_ID_SHIHO_FU_ZYOTAI, SKILL_ID_SHIHO_GOGYO_ZIN, 
    SKILL_ID_SHIRYO_ZYOKA, SKILL_ID_SHUGO_FU, SKILL_ID_SUZAKU_FU, SKILL_ID_TENCHI_SHINRE, SKILL_ID_ZYOKODO
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 護符修練
		// ----------------------------------------------------------------
		// SKILL_ID_GOFU_SHUREN
		defineSkill(SKILL_ID_GOFU_SHUREN, function() {
			this.name = "護符修練";
			this.kana = "コフシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 霊道術修練
		// ----------------------------------------------------------------
		// SKILL_ID_REIDOZYUTSU_SHUREN
		defineSkill(SKILL_ID_REIDOZYUTSU_SHUREN, function() {
			this.name = "霊道術修練";
			this.kana = "レイトウシユツシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 守護符
		// ----------------------------------------------------------------
		// SKILL_ID_SHUGO_FU
		defineSkill(SKILL_ID_SHUGO_FU, function() {
			this.name = "(×)守護符";
			this.kana = "シユコフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// 武士符
		// ----------------------------------------------------------------
		// SKILL_ID_BUSHI_FU
		defineSkill(SKILL_ID_BUSHI_FU, function() {
			this.name = "武士符";
			this.kana = "フシフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 800;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// 法師符
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHI_FU
		defineSkill(SKILL_ID_HOSHI_FU, function() {
			this.name = "法師符";
			this.kana = "ホウシフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 800;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}			
		}),

		// ----------------------------------------------------------------
		// 護魂一身
		// ----------------------------------------------------------------
		// SKILL_ID_GOKON_ISSHIN
		defineSkill(SKILL_ID_GOKON_ISSHIN, function() {
			this.name = "護魂一身";
			this.kana = "ココンイツシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5500 - 500 * skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// 城隍堂
		// ----------------------------------------------------------------
		// SKILL_ID_ZYOKODO
		defineSkill(SKILL_ID_ZYOKODO, function() {
			this.name = "(×)城隍堂";
			this.kana = "シヨウコウトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 570;
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
				return 14000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 12 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 五行符
		// ----------------------------------------------------------------
		// SKILL_ID_GOGYO_FU
		defineSkill(SKILL_ID_GOGYO_FU, function() {
			this.name = "五行符";
			this.kana = "コキヨウフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 800;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 霊道符
		// ----------------------------------------------------------------
		// SKILL_ID_REIDO_FU
		defineSkill(SKILL_ID_REIDO_FU, function() {
			this.name = "霊道符";
			this.kana = "レイトウフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio = 8250 + 750 * skillLv;
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 275パッチでは基礎倍率以外に変更無しを確認済み
				const gofu_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				const reidozyutsu_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN), UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN));
				ratio += 7 * skillLv * ( gofu_shuren_lv + reidozyutsu_shuren_lv );
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// 死霊浄化
		// ----------------------------------------------------------------
		// SKILL_ID_SHIRYO_ZYOKA
		defineSkill(SKILL_ID_SHIRYO_ZYOKA, function() {
			this.name = "死霊浄化";
			this.kana = "シリヨウシヨウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.dispHitCount = function(skillLv) {
				return 5;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SHIRYO_HYOI]) {
					ratio = 400 + 100 * skillLv;
				} else {
					ratio = 350 + 50 * skillLv;
				}
				ratio += GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				const reidozyutsu_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN), UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN));
				ratio += 2 * reidozyutsu_shuren_lv;
				ratio = ratio * UsedSkillSearch(SKILL_ID_COUNT_OF_SOUL_ENERGY);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 1400 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// 青龍符
		// ----------------------------------------------------------------
		// SKILL_ID_SEIRYU_FU
		defineSkill(SKILL_ID_SEIRYU_FU, function() {
			this.name = "青龍符";
			this.kana = "セイリユウフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.Power = function(skillLv, charaData, option) {			// スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
					ratio = 11000 + 750 * skillLv;
				} else {
					ratio = 7750 + 750 * skillLv;
				}
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio += 15 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
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
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 白虎符
		// ----------------------------------------------------------------
		// SKILL_ID_BYAKKO_FU
		defineSkill(SKILL_ID_BYAKKO_FU, function() {
			this.name = "白虎符";
			this.kana = "ヒヤツコフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.dispHitCount = function(skillLv) {
				return 2;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
					ratio = 7750 + 750 * skillLv;
				} else {
					ratio = 6500 + 500 * skillLv;
				}
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio += 15 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
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
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 朱雀符
		// ----------------------------------------------------------------
		// SKILL_ID_SUZAKU_FU
		defineSkill(SKILL_ID_SUZAKU_FU, function() {
			this.name = "朱雀符";
			this.kana = "スサクフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.dispHitCount = function(skillLv) {
				return 3;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
					ratio = 9250 + 750 * skillLv;
				} else {
					ratio = 7500 + 500 * skillLv;
				}
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio += 15 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
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
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 玄武符
		// ----------------------------------------------------------------
		// SKILL_ID_GENBU_FU
		defineSkill(SKILL_ID_GENBU_FU, function() {
			this.name = "玄武符";
			this.kana = "ケンフフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.dispHitCount = function(skillLv) {
				return 3;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
					ratio = 7750 + 750 * skillLv;
				} else {
					ratio = 6500 + 500 * skillLv;
				}
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio += 15 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
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
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 四方神符
		// ----------------------------------------------------------------
		// SKILL_ID_SHIHOZIN_FU
		defineSkill(SKILL_ID_SHIHOZIN_FU, function() {
			this.name = "四方神符";
			this.kana = "シホウシンフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				return option.GetOptionValue(0);
			}
			this.hitCount = function(skillLv) {
				return 1 + Math.min(5, UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI));
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio = 500 + 50 * skillLv;
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio += 15 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// 四方五行陣
		// ----------------------------------------------------------------
		// SKILL_ID_SHIHO_GOGYO_ZIN
		defineSkill(SKILL_ID_SHIHO_GOGYO_ZIN, function() {
			this.name = "四方五行陣";
			this.kana = "シホウコキヨウシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = function(skillLv) {
				return 5;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				ratio = 4280 + 600 * skillLv;
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				const gofu_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN));
				const reidozyutsu_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN), UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN));
				ratio += 15 * skillLv * ( gofu_shuren_lv + reidozyutsu_shuren_lv );
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 四方符状態
		// ----------------------------------------------------------------
		// SKILL_ID_SHIHO_FU_ZYOTAI
		defineSkill(SKILL_ID_SHIHO_FU_ZYOTAI, function() {

			this.name = "四方符状態";
			this.kana = "シホウフシヨウタイ";
			this.maxLv = 6;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 天地神霊
		// ----------------------------------------------------------------
		// SKILL_ID_TENCHI_SHINRE
		defineSkill(SKILL_ID_TENCHI_SHINRE, function() {
			this.name = "天地神霊";
			this.kana = "テンチシンレイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 680;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10 + 12 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 100 * skillLv;
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

];
