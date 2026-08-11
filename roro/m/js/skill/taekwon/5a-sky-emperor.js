/**
 * スキル定義 taekwon/5a-sky-emperor（18 件 / SKILL_ID 1173〜1301 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from '../../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { MIG_PARAM_ID_POW } from '../../const/EnumMigItemParamId.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_HYOHO_SHUREN, SKILL_ID_SHIHO_FU_ZYOTAI, SKILL_ID_SKY_MOON, SKILL_ID_SKY_SUN, SKILL_ID_STAR_LIGHT_KICK,
    SKILL_ID_TAITEN_ICHIGETSU, SKILL_ID_TAITEN_ICHIYO, SKILL_ID_TENCHI_BANSE, SKILL_ID_TENCHI_ICHIGETSU,
    SKILL_ID_TENCHI_ICHIYO, SKILL_ID_TENGETSU, SKILL_ID_TENKINO_MI, SKILL_ID_TENKI_SHUREN, SKILL_ID_TENME_RAKUSE,
    SKILL_ID_TENRA_BANSHO, SKILL_ID_TENSE, SKILL_ID_TENYO, SKILL_ID_UNKONO_ZYOTAI
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 天気修練
		// ----------------------------------------------------------------
		// SKILL_ID_TENKI_SHUREN
		defineSkill(SKILL_ID_TENKI_SHUREN, function() {
			this.name = "天気修練";
			this.kana = "テンキシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 兵法修練
		// ----------------------------------------------------------------
		// SKILL_ID_HYOHO_SHUREN
		defineSkill(SKILL_ID_HYOHO_SHUREN, function() {
			this.name = "兵法修練";
			this.kana = "ヒヨウホウシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 天地一陽
		// ----------------------------------------------------------------
		// SKILL_ID_TENCHI_ICHIYO
		defineSkill(SKILL_ID_TENCHI_ICHIYO, function() {
			this.name = "天地一陽";
			this.kana = "テンチイチヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 800 + 100 * skillLv;
				// POW補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				ratio += 5 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// 太天一陽
		// ----------------------------------------------------------------
		// SKILL_ID_TAITEN_ICHIYO
		defineSkill(SKILL_ID_TAITEN_ICHIYO, function() {
			this.name = "太天一陽";
			this.kana = "タイテンイチヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 230;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				// 正午、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				// 正午、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 天陽
		// ----------------------------------------------------------------
		// SKILL_ID_TENYO
		defineSkill(SKILL_ID_TENYO, function() {
			this.name = "天陽";
			this.kana = "テンヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 230;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				// 日没、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 3) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				// 日没、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 3) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 天地一月
		// ----------------------------------------------------------------
		// SKILL_ID_TENCHI_ICHIGETSU
		defineSkill(SKILL_ID_TENCHI_ICHIGETSU, function() {
			this.name = "天地一月";
			this.kana = "テンチイチケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// 基本倍率
				ratio = 1000 + 100 * skillLv;
				// POW補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				ratio += 5 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 270;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// 太天一月
		// ----------------------------------------------------------------
		// SKILL_ID_TAITEN_ICHIGETSU
		defineSkill(SKILL_ID_TAITEN_ICHIGETSU, function() {
			this.name = "太天一月";
			this.kana = "タイテンイチケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			// 使用条件の「月出・正子・天気の身」を厳密に再現するメリットがないので無条件で計算させる
			this.Power = function(skillLv, charaData, option) {
				// TODO: 正子、天気の身はスキル倍率だけに影響するので職固有自己支援から攻撃オプションへ移行する
				const state_tenki_buff = option.GetOptionValue(0) === 1;
				// 基本倍率
				let ratio = 1475 + 225 * skillLv;
				// 正子、天気の身状態なら、倍率２倍
				if (state_tenki_buff) {
					ratio *= 2;
				}
				// POW補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				ratio += 5 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 230;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 天月
		// ----------------------------------------------------------------
		// SKILL_ID_TENGETSU
		defineSkill(SKILL_ID_TENGETSU, function() {
			this.name = "天月";
			this.kana = "テンケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			// 使用条件の「正子・月没・天気の身」を厳密に再現するメリットがないので無条件で計算させる
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				// TODO: 月没・天気の身はスキル倍率だけに影響するので職固有自己支援から攻撃オプションへ移行する
				const state_tenki_buff = option.GetOptionValue(0) === 1;
				// 基本倍率
				if (state_tenki_buff) {
					ratio = 4000 + 550 * skillLv;
				} else {
					ratio = 2000 + 275 * skillLv;
				}
				// POW補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				ratio += 5 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 230;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 天地万星
		// ----------------------------------------------------------------
		// SKILL_ID_TENCHI_BANSE
		defineSkill(SKILL_ID_TENCHI_BANSE, function() {
			this.name = "天地万星";
			this.kana = "テンチバンセイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 270;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5500 + 800 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3250 - 250 * skillLv;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// 天命落星
		// ----------------------------------------------------------------
		// SKILL_ID_TENME_RAKUSE
		defineSkill(SKILL_ID_TENME_RAKUSE, function() {
			this.name = "天命落星";
			this.kana = "テンメイラクセイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 2400 + 200 * skillLv;
				// POW補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				ratio += 5 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 270;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// 天星
		// ----------------------------------------------------------------
		// SKILL_ID_TENSE
		defineSkill(SKILL_ID_TENSE, function() {
			this.name = "天星";
			this.kana = "テンセイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.hitCount = function(skillLv, option) {
				// 全弾命中ならx2倍
				return option.GetOptionValue(0) == 0 ? 2 : 1;
			}
			this.dispHitCount = 3;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option) {
				// 基本倍率
				let ratio = 1050 + 150 * skillLv;
				// 天気修練 補正
				ratio += 5 * skillLv * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// POW補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 270;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// 天羅万象
		// ----------------------------------------------------------------
		// SKILL_ID_TENRA_BANSHO
		defineSkill(SKILL_ID_TENRA_BANSHO, function() {
			this.name = "天羅万象";
			this.kana = "テンラハンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {
				return 15 + skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 天気の身
		// ----------------------------------------------------------------
		// SKILL_ID_TENKINO_MI
		defineSkill(SKILL_ID_TENKINO_MI, function() {
			this.name = "天気の身";
			this.kana = "テンキノミ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 380;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 100 - 5 * skillLv;
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
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 運行の状態
		// ----------------------------------------------------------------
		// SKILL_ID_UNKONO_ZYOTAI
		defineSkill(SKILL_ID_UNKONO_ZYOTAI, function() {

			this.name = "(×)運行の状態";
			this.kana = "ウンコウノシヨウタイ";
			this.maxLv = 6;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 四方五行陣状態
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

];
