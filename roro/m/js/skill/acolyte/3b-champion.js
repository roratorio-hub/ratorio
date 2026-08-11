/**
 * スキル定義 acolyte/3b-champion（6 件 / SKILL_ID 288〜801 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_BUKKOKEN, SKILL_ID_COMBO_SANDAN_CHAMP, SKILL_ID_MOKOKOHAZAN, SKILL_ID_RENCHUHOGEKI, SKILL_ID_RENKIKO,
    SKILL_ID_SOUL_COLECT
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 猛虎硬爬山
		// ----------------------------------------------------------------
		// SKILL_ID_MOKOKOHAZAN
		defineSkill(SKILL_ID_MOKOKOHAZAN, function() {

			this.name = "猛虎硬爬山";
			this.kana = "モウココウハサン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 伏虎拳
		// ----------------------------------------------------------------
		// SKILL_ID_BUKKOKEN
		defineSkill(SKILL_ID_BUKKOKEN, function() {

			this.name = "伏虎拳";
			this.kana = "フツコケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 100 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 700 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		}),

		// ----------------------------------------------------------------
		// 連柱崩撃
		// ----------------------------------------------------------------
		// SKILL_ID_RENCHUHOGEKI
		defineSkill(SKILL_ID_RENCHUHOGEKI, function() {

			this.name = "連柱崩撃";
			this.kana = "レンチユウホウケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 + 100 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return Math.floor((skillLv + 1) / 2);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

		}),

		// ----------------------------------------------------------------
		// ソウルコレクト
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_COLECT
		defineSkill(SKILL_ID_SOUL_COLECT, function() {

			this.name = "ソウルコレクト";
			this.kana = "ソウルコレクト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 練気功
		// ----------------------------------------------------------------
		// SKILL_ID_RENKIKO
		defineSkill(SKILL_ID_RENKIKO, function() {

			this.name = "練気功";
			this.kana = "レンキコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(三段～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SANDAN_CHAMP
		defineSkill(SKILL_ID_COMBO_SANDAN_CHAMP, function() {

			this.name = "(仮)コンボ計算(三段～)";
			this.kana = "コンホケイサンチヤンヒオン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

];
