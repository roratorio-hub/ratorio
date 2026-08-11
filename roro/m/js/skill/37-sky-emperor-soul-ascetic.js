/**
 * スキル定義 37-sky-emperor-soul-ascetic（SKILL_ID 1173–1212 / 40 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from '../const/EnumMigItemParamId.js';
import { MOB_CONF_DEBUF_ID_SHIRYO_HYOI, n_B_IJYOU } from '../mobconfdebuf.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_BUSHI_FU, SKILL_ID_BYAKKO_FU, SKILL_ID_COUNT_OF_SOUL_ENERGY, SKILL_ID_DOKUGAKU_MADOGAKU,
    SKILL_ID_DOKUGAKU_SENTOGAKU, SKILL_ID_GENBU_FU, SKILL_ID_GOFU_SHUREN, SKILL_ID_GOGYO_FU, SKILL_ID_GOKON_ISSHIN,
    SKILL_ID_HOSHI_FU, SKILL_ID_HYOHO_SHUREN, SKILL_ID_MARIN_FESTIVAL, SKILL_ID_NYAN_BRESSING, SKILL_ID_PFI,
    SKILL_ID_REIDOZYUTSU_SHUREN, SKILL_ID_REIDO_FU, SKILL_ID_SAND_FESTIVAL, SKILL_ID_SANREI_ITTAI,
    SKILL_ID_SEIRYU_FU, SKILL_ID_SHIHOZIN_FU, SKILL_ID_SHIHO_FU_ZYOTAI, SKILL_ID_SHIHO_GOGYO_ZIN,
    SKILL_ID_SHIRYO_ZYOKA, SKILL_ID_SHUGO_FU, SKILL_ID_SPIRIT_MASTERY, SKILL_ID_SUZAKU_FU, SKILL_ID_TAITEN_ICHIGETSU,
    SKILL_ID_TAITEN_ICHIYO, SKILL_ID_TENCHI_BANSE, SKILL_ID_TENCHI_ICHIGETSU, SKILL_ID_TENCHI_ICHIYO,
    SKILL_ID_TENCHI_SHINRE, SKILL_ID_TENGETSU, SKILL_ID_TENKINO_MI, SKILL_ID_TENKI_SHUREN, SKILL_ID_TENME_RAKUSE,
    SKILL_ID_TENRA_BANSHO, SKILL_ID_TENSE, SKILL_ID_TENYO, SKILL_ID_UNKONO_ZYOTAI, SKILL_ID_ZYOKODO
} from '../skill.dat.js';

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

		// ----------------------------------------------------------------
		// スピリットマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRIT_MASTERY
		defineSkill(SKILL_ID_SPIRIT_MASTERY, function() {

			this.name = "スピリットマスタリー";
			this.kana = "スヒリツトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 三霊一体
		// ----------------------------------------------------------------
		// SKILL_ID_SANREI_ITTAI
		defineSkill(SKILL_ID_SANREI_ITTAI, function() {
			this.name = "三霊一体";
			this.kana = "サンレイイツタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10 + 20 * skillLv;
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
		// にゃんブレッシング
		// ----------------------------------------------------------------
		// SKILL_ID_NYAN_BRESSING
		defineSkill(SKILL_ID_NYAN_BRESSING, function() {

			this.name = "にゃんブレッシング";
			this.kana = "ニヤンフレツシンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 70000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// マリンフェスティバル
		// ----------------------------------------------------------------
		// SKILL_ID_MARIN_FESTIVAL
		defineSkill(SKILL_ID_MARIN_FESTIVAL, function() {

			this.name = "マリンフェスティバル";
			this.kana = "マリンフエステイハル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
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
		// サンドフェスティバル
		// ----------------------------------------------------------------
		// SKILL_ID_SAND_FESTIVAL
		defineSkill(SKILL_ID_SAND_FESTIVAL, function() {
			this.name = "サンドフェスティバル";
			this.kana = "サントフエステイハル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
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
		// P.F.I
		// ----------------------------------------------------------------
		// SKILL_ID_PFI
		defineSkill(SKILL_ID_PFI, function() {
			this.name = "P.F.I";
			this.kana = "ヒイエフアイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;			
		}),

];
