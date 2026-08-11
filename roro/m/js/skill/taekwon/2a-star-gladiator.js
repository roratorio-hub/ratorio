/**
 * スキル定義 taekwon/2a-star-gladiator（22 件 / SKILL_ID 347〜1260 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { MONSTER_BOSSTYPE_BOSS } from '../../const/EnumMonsterBossType.js';
import {
    SKILL_ID_HOSHINO_ANRAKU, SKILL_ID_HOSHINO_IKARI, SKILL_ID_HOSHINO_NUKUMORI, SKILL_ID_HOSHINO_SHUKUFUKU,
    SKILL_ID_SHUKUFUKU, SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TAIYONO_IKARI, SKILL_ID_TAIYONO_NUKUMORI,
    SKILL_ID_TAIYONO_SHUKUFUKU, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, SKILL_ID_TSUKINO_ANRAKU, SKILL_ID_TSUKINO_IKARI,
    SKILL_ID_TSUKINO_NUKUMORI, SKILL_ID_TSUKUNO_SHUKUFUKU
} from '../../skill.dat.js';

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

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
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

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
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

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
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
