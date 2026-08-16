/**
 * スキル定義 swordman/1-swordman（10 件 / SKILL_ID 3〜12 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_AUTO_BERSERK, SKILL_ID_BASH, SKILL_ID_ENDURE, SKILL_ID_HP_KAIFUKURYOKU_KOZYO, SKILL_ID_IDOZI_HP_KAIFUKU,
    SKILL_ID_KEN_SHUREN, SKILL_ID_KYUSHO_KOGEKI, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE, SKILL_ID_RYOUTKEN_SHUREN
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 剣修練
		// ----------------------------------------------------------------
		// SKILL_ID_KEN_SHUREN
		defineSkill(SKILL_ID_KEN_SHUREN, function() {

			this.name = "剣修練";
			this.kana = "ケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 両手剣修練
		// ----------------------------------------------------------------
		// SKILL_ID_RYOUTKEN_SHUREN
		defineSkill(SKILL_ID_RYOUTKEN_SHUREN, function() {

			this.name = "両手剣修練";
			this.kana = "リヨウテケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// HP回復力向上
		// ----------------------------------------------------------------
		// SKILL_ID_HP_KAIFUKURYOKU_KOZYO
		defineSkill(SKILL_ID_HP_KAIFUKURYOKU_KOZYO, function() {

			this.name = "HP回復力向上";
			this.kana = "ヒツトホイントカイフクリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// バッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_BASH
		defineSkill(SKILL_ID_BASH, function() {

			this.name = "バッシュ";
			this.kana = "ハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 7 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// マグナムブレイク
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNUM_BREAK
		defineSkill(SKILL_ID_MAGNUM_BREAK, function() {

			this.name = "マグナムブレイク";
			this.kana = "マクナムフレイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// プロボック
		// ----------------------------------------------------------------
		// SKILL_ID_PROVOKE
		defineSkill(SKILL_ID_PROVOKE, function() {

			this.name = "プロボック";
			this.kana = "フロホツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 + skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// インデュア
		// ----------------------------------------------------------------
		// SKILL_ID_ENDURE
		defineSkill(SKILL_ID_ENDURE, function() {

			this.name = "インデュア";
			this.kana = "インテユア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 3 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}
		}),

		// ----------------------------------------------------------------
		// 移動時HP回復
		// ----------------------------------------------------------------
		// SKILL_ID_IDOZI_HP_KAIFUKU
		defineSkill(SKILL_ID_IDOZI_HP_KAIFUKU, function() {

			this.name = "移動時HP回復";
			this.kana = "イトウシヒツトホイントカイフク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 急所攻撃
		// ----------------------------------------------------------------
		// SKILL_ID_KYUSHO_KOGEKI
		defineSkill(SKILL_ID_KYUSHO_KOGEKI, function() {

			this.name = "急所攻撃";
			this.kana = "キユウシヨコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オートバーサーク
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_BERSERK
		defineSkill(SKILL_ID_AUTO_BERSERK, function() {

			this.name = "オートバーサーク";
			this.kana = "オオトハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
