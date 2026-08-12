/**
 * スキル定義 ninja/5-shinkiro-shiranui（22 件 / SKILL_ID 1225〜1316 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from '../../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from '../../const/EnumMigItemParamId.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_AKUMU_KESHI, SKILL_ID_ANTEN_HOU, SKILL_ID_ANTEN_HOU_LEARNED_LEVEL, SKILL_ID_FOUR_CHARM,
    SKILL_ID_FUMASHURIKEN_KOUCHIKU, SKILL_ID_FUMASHURIKEN_SHOUAKU, SKILL_ID_GENJUTSU_KAGE_NUI,
    SKILL_ID_GENJUTSU_KUNAI, SKILL_ID_GENZYUTSU_ANKOKURYUU, SKILL_ID_KAGEMOGURI, SKILL_ID_KAGETOKI,
    SKILL_ID_KAGE_GARI, SKILL_ID_KAGE_ISSEN, SKILL_ID_KAGE_NO_MAI, SKILL_ID_KINNRYUU_HOU, SKILL_ID_KUNAI_KAITEN,
    SKILL_ID_KUNAI_KUSSETSU, SKILL_ID_KUNAI_WAIKYOKU, SKILL_ID_RAIDEN_HOU, SKILL_ID_REIKETSU_HOU,
    SKILL_ID_SEKIEN_HOU, SKILL_ID_SHINKIRO_BUNSHIN
} from '../../skill.dat.js';

export const skills = [
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
		// 赤炎砲
		// ----------------------------------------------------------------
		// SKILL_ID_SEKIEN_HOU
		defineSkill(SKILL_ID_SEKIEN_HOU, function() {
			this.name = "赤炎砲";
			this.kana = "セキエンホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
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
		// 冷血砲
		// ----------------------------------------------------------------
		// SKILL_ID_REIKETSU_HOU
		defineSkill(SKILL_ID_REIKETSU_HOU, function() {

			this.name = "冷血砲";
			this.kana = "レイケツホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
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
		// 雷電砲
		// ----------------------------------------------------------------
		// SKILL_ID_RAIDEN_HOU
		defineSkill(SKILL_ID_RAIDEN_HOU, function() {

			this.name = "雷電砲";
			this.kana = "ライテンホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
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
		// 金龍砲
		// ----------------------------------------------------------------
		// SKILL_ID_KINNRYUU_HOU
		defineSkill(SKILL_ID_KINNRYUU_HOU, function() {

			this.name = "金龍砲";
			this.kana = "キンリユウホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
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
		// 暗転砲
		// ----------------------------------------------------------------
		// SKILL_ID_ANTEN_HOU
		defineSkill(SKILL_ID_ANTEN_HOU, function() {
			this.name = "暗転砲";
			this.kana = "アンテンホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (parentSkillId == undefined) {
					// 本体の攻撃
					ratio = 5750 + 350 * skillLv;						// 基本倍率
					ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// spl補正
					ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
				} else {
					// 暗転砲の習得Lv
					const anten_hou_lv = Math.max(LearnedSkillSearch(SKILL_ID_ANTEN_HOU), UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL), skillLv);
					// 分身の追撃
					if (anten_hou_lv == 0) {
						ratio = 0;
					} else {
						ratio = 5750 + 350 * anten_hou_lv;					// 基本倍率
						ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// spl補正
						ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
						ratio = Math.floor(ratio * 30 / 100);				// 分身の威力は30%
						ratio *= option.GetOptionValue(0);					// 分身の数
					}
				}
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
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
		// 幻術 -暗黒龍-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_ANKOKURYUU
		defineSkill(SKILL_ID_GENZYUTSU_ANKOKURYUU, function() {
			this.name = "幻術 -暗黒龍-";
			this.kana = "ケンシユツアンコクリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.dispHitCount = 4;	// 分割ヒット4
			this.element = function(option, mobData, parentSkillId) {
				if (parentSkillId == undefined) {
					// 初撃
					return CSkillData.ELEMENT_FORCE_DARK;
				} else {
					// 追撃
					return CSkillData.ELEMENT_FORCE_FIRE;
				}
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (parentSkillId == undefined) {
					// 初撃
					ratio = 27000;
				} else {
					// 追撃 
					ratio = 17000;
				}
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 410;
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
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 暗転砲の習得Lv
		// ----------------------------------------------------------------
		// SKILL_ID_ANTEN_HOU_LEARNED_LEVEL
		defineSkill(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL, function() {
			this.name = "暗転砲の習得Lv";
			this.kana = "アンテンホウノシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 影潜り
		// ----------------------------------------------------------------
		// SKILL_ID_KAGEMOGURI
		defineSkill(SKILL_ID_KAGEMOGURI, function() {
			this.name = "影潜り";
			this.kana = "カケモクリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 130;
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
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 影溶き
		// ----------------------------------------------------------------
		// SKILL_ID_KAGETOKI
		defineSkill(SKILL_ID_KAGETOKI, function() {
			this.name = "影溶き";
			this.kana = "カケトキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
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
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 苦無 -歪曲-
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_WAIKYOKU
		defineSkill(SKILL_ID_KUNAI_WAIKYOKU, function() {
			this.name = "苦無 -歪曲-";
			this.kana = "クナイワイキヨク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = function(skillLv, charaDataManger, option, parentSkillId) {
				// 本体 分割2Hit 分身 分割3Hit
				return parentSkillId == undefined ? 2 : 3;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 苦無 -屈折-の習得Lv
				const kunai_kussetsu_lv = Math.max(LearnedSkillSearch(SKILL_ID_KUNAI_KUSSETSU), option.GetOptionValue(1));
				// ダメージ倍率
				ratio = 6700 + 100 * skillLv;						// 基本倍率
				ratio += 77 * skillLv * kunai_kussetsu_lv;			// 参照スキル習得Lv補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
				if (parentSkillId == undefined) {
					// 本体
					return ratio;
				} else {
					// 分身
					ratio = Math.floor(ratio * 30 / 100);
					return ratio * option.GetOptionValue(0);
				}
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
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
		// 苦無 -回転-
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_KAITEN
		defineSkill(SKILL_ID_KUNAI_KAITEN, function() {
			this.name = "苦無 -回転-";
			this.kana = "クナイカイテン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 3;
			this.ground_installation = true;
			this.damageInterval = 500;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 苦無 -歪曲-の習得Lv
				const kunai_waikyoku_lv = Math.max(LearnedSkillSearch(SKILL_ID_KUNAI_WAIKYOKU), option.GetOptionValue(0));
				// ダメージ倍率
				ratio = 2300 + 200 * skillLv;							// 基本倍率
				ratio += 66 * skillLv * kunai_waikyoku_lv;				// 参照スキル習得Lv補正
				ratio += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);		// 特性ステータス補正
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 苦無 -屈折-
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_KUSSETSU
		defineSkill(SKILL_ID_KUNAI_KUSSETSU, function() {
			this.name = "苦無 -屈折-";
			this.kana = "クナイクツセツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.ground_installation = true;
			this.damageInterval = 250;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 750 + 50 * skillLv;							// 基本倍率
				ratio += 25 * skillLv * 5;							// 参照スキル習得Lv補正（前提スキル条件につき 5 で固定）
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
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 幻術 -苦無-
		// ----------------------------------------------------------------
		// SKILL_ID_GENJUTSU_KUNAI
		defineSkill(SKILL_ID_GENJUTSU_KUNAI, function() {
			this.name = "幻術 -苦無-";
			this.kana = "ケンシユツクナイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 8;	// 分割ヒット8
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 52000;
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				// 悪夢の場合
				if (option.GetOptionValue(0) == 1) {
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
		// 蜃気楼分身
		// ----------------------------------------------------------------
		// SKILL_ID_SHINKIRO_BUNSHIN
		defineSkill(SKILL_ID_SHINKIRO_BUNSHIN, function() {

			this.name = "蜃気楼分身";
			this.kana = "シンキロウフンシン";
			this.maxLv = 1;
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
				return 1000;
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
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 悪夢消し
		// ----------------------------------------------------------------
		// SKILL_ID_AKUMU_KESHI
		defineSkill(SKILL_ID_AKUMU_KESHI, function() {

			this.name = "悪夢消し";
			this.kana = "アクムケシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
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
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
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

];
