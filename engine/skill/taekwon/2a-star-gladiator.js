/**
 * スキル定義 taekwon/2a-star-gladiator（22 件 / SKILL_ID 347〜1260 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei
} from "../../runtime/ro4-state.js";
import { MONSTER_BOSSTYPE_BOSS } from "../../const/EnumMonsterBossType.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
	SKILL_ID_NUKUMORI, SKILL_ID_NUKUMORI_KABE,
    SKILL_ID_HOSHINO_ANRAKU, SKILL_ID_HOSHINO_IKARI, SKILL_ID_HOSHINO_NUKUMORI, SKILL_ID_HOSHINO_SHUKUFUKU,
    SKILL_ID_SHUKUFUKU, SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TAIYONO_IKARI, SKILL_ID_TAIYONO_NUKUMORI,
    SKILL_ID_TAIYONO_SHUKUFUKU, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, SKILL_ID_TSUKINO_ANRAKU, SKILL_ID_TSUKINO_IKARI,
    SKILL_ID_TSUKINO_NUKUMORI, SKILL_ID_TSUKUNO_SHUKUFUKU
} from "../skill.dat.js";

/** ＊＊の温もり／壁版共通のダメージ計算式（設置対象の属性のみ異なる）。 */
function ApplyNukumoriFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			// ダメージ間隔
			if (mobData[20] == MONSTER_BOSSTYPE_BOSS) {
				n_Delay[5] = 100;
			} else if (n_A_ActiveSkill == SKILL_ID_NUKUMORI) {
				n_Delay[5] = 50;
			} else {
				n_Delay[5] = 20;
			}
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);	// オブジェクト存続時間
			n_Delay[3] = g_skillManager.GetDelayTimeSkillTiming(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData); 	// 重複設置はできない
			// 属性
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// ダメージ倍率
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
}

export const skills = [
		// ----------------------------------------------------------------
		// 太陽と月と星の感情
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO, function() {

			this.name = "太陽と月と星の感情";
			this.kana = "タイヨウトツキトホシノカンシヨウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 温もり
		// ----------------------------------------------------------------
		// SKILL_ID_NUKUMORI
		defineSkill(SKILL_ID_NUKUMORI, function() {
			this.name = "温もり";
			this.kana = "ヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL | CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {	// オブジェクト存続時間
				return [0,10,20,60][skillLv] * 1000;
			}
			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {	// 重複設置はできない
				return [0,10,20,60][skillLv] * 1000;
			}
			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}
			this.PhysicalFormula = ApplyNukumoriFormula;
		}),

		// ----------------------------------------------------------------
		// 温もり(壁押付)
		// ----------------------------------------------------------------
		// SKILL_ID_NUKUMORI_KABE
		defineSkill(SKILL_ID_NUKUMORI_KABE, function() {
			this.refId = SKILL_ID_NUKUMORI;
			this.name = "温もり(壁押付)";
			this.kana = "ヌクモリカヘオシツケ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.LifeTime = function(skillLv, charaDataManger) {	// オブジェクト存続時間
				return [0,10,20,60][skillLv] * 1000;
			}
			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {	// 重複設置はできない
				return [0,10,20,60][skillLv] * 1000;
			}
			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}
			this.PhysicalFormula = ApplyNukumoriFormula;
		}),

		// ----------------------------------------------------------------
		// 太陽の温もり
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_NUKUMORI
		defineSkill(SKILL_ID_TAIYONO_NUKUMORI, function() {

			this.name = "太陽の温もり";
			this.kana = "タイヨウノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// 月の温もり
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_NUKUMORI
		defineSkill(SKILL_ID_TSUKINO_NUKUMORI, function() {

			this.name = "月の温もり";
			this.kana = "ツキノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// 星の温もり
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_NUKUMORI
		defineSkill(SKILL_ID_HOSHINO_NUKUMORI, function() {

			this.name = "星の温もり";
			this.kana = "ホシノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の憎しみ
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI, function() {

			this.name = "太陽と月と星の憎しみ";
			this.kana = "タイヨウトツキトホシノニクシミ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽の怒り
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_IKARI
		defineSkill(SKILL_ID_TAIYONO_IKARI, function() {

			this.name = "太陽の怒り";
			this.kana = "タイヨウノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 月の怒り
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_IKARI
		defineSkill(SKILL_ID_TSUKINO_IKARI, function() {

			this.name = "月の怒り";
			this.kana = "ツキノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 星の怒り
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_IKARI
		defineSkill(SKILL_ID_HOSHINO_IKARI, function() {

			this.name = "星の怒り";
			this.kana = "ホシノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽の安楽
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_ANRAKU
		defineSkill(SKILL_ID_TAIYONO_ANRAKU, function() {

			this.name = "太陽の安楽";
			this.kana = "タイヨウノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 月の安楽
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_ANRAKU
		defineSkill(SKILL_ID_TSUKINO_ANRAKU, function() {

			this.name = "月の安楽";
			this.kana = "ツキノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 星の安楽
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_ANRAKU
		defineSkill(SKILL_ID_HOSHINO_ANRAKU, function() {

			this.name = "星の安楽";
			this.kana = "ホシノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽の祝福
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_SHUKUFUKU
		defineSkill(SKILL_ID_TAIYONO_SHUKUFUKU, function() {

			this.name = "太陽の祝福";
			this.kana = "タイヨウノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 月の祝福
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKUNO_SHUKUFUKU
		defineSkill(SKILL_ID_TSUKUNO_SHUKUFUKU, function() {

			this.name = "月の祝福";
			this.kana = "ツキノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 星の祝福
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_SHUKUFUKU
		defineSkill(SKILL_ID_HOSHINO_SHUKUFUKU, function() {

			this.name = "星の祝福";
			this.kana = "ホシノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の悪魔
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, function() {

			this.name = "太陽と月と星の悪魔";
			this.kana = "タイヨウトツキトホシノアクマ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の友
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO, function() {

			this.name = "太陽と月と星の友";
			this.kana = "タイヨウトツキトホシノトモ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の知識
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI, function() {

			this.name = "太陽と月と星の知識";
			this.kana = "タイヨウトツキトホシノチシキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の融合
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, function() {

			this.name = "太陽と月と星の融合";
			this.kana = "タイヨウトツキトホシノユウコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の奇跡
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, function() {

			this.name = "太陽と月と星の奇跡";
			this.kana = "タイヨウトツキトホシノキセキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の天使
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI, function() {

			this.name = "太陽と月と星の天使";
			this.kana = "タイヨウトツキトホシノテンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ～の祝福(経験値増加率)
		// ----------------------------------------------------------------
		// SKILL_ID_SHUKUFUKU
		defineSkill(SKILL_ID_SHUKUFUKU, function() {

			this.name = "～の祝福(経験値増加率)";
			this.kana = "シユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の日 判定用
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, function() {

			this.name = "太陽と月と星の日";
			this.kana = "タイヨウトツキトホシノヒ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
