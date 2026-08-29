/**
 * スキル定義 taekwon/2b-soul-linker（33 件 / SKILL_ID 368〜890 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import { SIZE_ID_SMALL } from "../../const/EnumSizeId.js";
import { MONSTER_ID_PLAYER } from "../../monster/monster.dat.js";
import {
    SKILL_ID_ALCHEMISTNO_TAMASHI, SKILL_ID_ASSASINNO_TAMASHI, SKILL_ID_BARDTO_DANCERNO_TAMASHI,
    SKILL_ID_BLACKSMITHNO_TAMASHI, SKILL_ID_CRUSADERNO_TAMASHI, SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_ESKA,
    SKILL_ID_ESKU, SKILL_ID_ESMA, SKILL_ID_ESTIN, SKILL_ID_ESTON, SKILL_ID_ESU, 
	SKILL_ID_HUNTERNO_TAMASHI, SKILL_ID_HUNTERNO_TAMASHI_KOKA, SKILL_ID_KAAHI,
    SKILL_ID_KAINA, SKILL_ID_KAISEL, SKILL_ID_KAITO, SKILL_ID_KAUPU, SKILL_ID_KENSENO_TAMASHI,
    SKILL_ID_KNIGHTNO_TAMASHI, SKILL_ID_MONKNO_TAMASHI, SKILL_ID_PRIESTNO_TAMASHI,
    SKILL_ID_ROGUENO_TAMASHI, SKILL_ID_SAGENO_TAMASHI, SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL,
    SKILL_ID_SOULLINKERNO_TAMASHI, SKILL_ID_SUPER_NOVICENO_TAMASHI, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
    SKILL_ID_WIZARDNO_TAMASHI
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// カイゼル
		// ----------------------------------------------------------------
		// SKILL_ID_KAISEL
		defineSkill(SKILL_ID_KAISEL, function() {

			this.name = "カイゼル";
			this.kana = "カイセル";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 130 - 10 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return (skillLv >= 5) ? 2500 : (5000 - 500 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// カアヒ
		// ----------------------------------------------------------------
		// SKILL_ID_KAAHI
		defineSkill(SKILL_ID_KAAHI, function() {

			this.name = "カアヒ";
			this.kana = "カアヒ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// カウプ
		// ----------------------------------------------------------------
		// SKILL_ID_KAUPU
		defineSkill(SKILL_ID_KAUPU, function() {

			this.name = "カウプ";
			this.kana = "カウフ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// カイト
		// ----------------------------------------------------------------
		// SKILL_ID_KAITO
		defineSkill(SKILL_ID_KAITO, function() {

			this.name = "カイト";
			this.kana = "カイト";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// カイナ
		// ----------------------------------------------------------------
		// SKILL_ID_KAINA
		defineSkill(SKILL_ID_KAINA, function() {
			this.name = "カイナ";
			this.kana = "カイナ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// エスティン
		// ----------------------------------------------------------------
		// SKILL_ID_ESTIN
		defineSkill(SKILL_ID_ESTIN, function() {

			this.name = "エスティン";
			this.kana = "エステイン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 10 * skillLv;

				// 小型以外には効果激減
				if (charaDataManger.GetMobSize() != SIZE_ID_SMALL) {
					pow = 1;
				}

				// プレイヤーには効果なし
				if (charaDataManger.GetMobId() == MONSTER_ID_PLAYER) {
					pow = 0;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// エストン
		// ----------------------------------------------------------------
		// SKILL_ID_ESTON
		defineSkill(SKILL_ID_ESTON, function() {

			this.name = "エストン";
			this.kana = "エストン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 5 * skillLv;

				// プレイヤーには効果なし
				if (charaDataManger.GetMobId() == MONSTER_ID_PLAYER) {
					pow = 0;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// エスマ
		// ----------------------------------------------------------------
		// SKILL_ID_ESMA
		defineSkill(SKILL_ID_ESMA, function() {

			this.name = "エスマ";
			this.kana = "エスマ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + charaDataManger.GetCharaBaseLv();
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// エスウ
		// ----------------------------------------------------------------
		// SKILL_ID_ESU
		defineSkill(SKILL_ID_ESU, function() {

			this.name = "エスウ";
			this.kana = "エスウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 85 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エスカ
		// ----------------------------------------------------------------
		// SKILL_ID_ESKA
		defineSkill(SKILL_ID_ESKA, function() {

			this.name = "エスカ";
			this.kana = "エスカ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エスク
		// ----------------------------------------------------------------
		// SKILL_ID_ESKU
		defineSkill(SKILL_ID_ESKU, function() {

			this.name = "エスク";
			this.kana = "エスク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スーパーノービスの魂
		// ----------------------------------------------------------------
		// SKILL_ID_SUPER_NOVICENO_TAMASHI
		defineSkill(SKILL_ID_SUPER_NOVICENO_TAMASHI, function() {

			this.name = "スーパーノービスの魂";
			this.kana = "スウハアノオヒスノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ハンターの魂
		// ----------------------------------------------------------------
		// SKILL_ID_HUNTERNO_TAMASHI_KOKA
		defineSkill(SKILL_ID_HUNTERNO_TAMASHI_KOKA, function() {

			this.name = "ハンターの魂";
			this.kana = "ハンタアノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 転生一次職の魂
		// ----------------------------------------------------------------
		// SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI
		defineSkill(SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI, function() {

			this.name = "転生一次職の魂";
			this.kana = "テンセイイチシシヨクノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// セージの魂(魔法の習得Lv)
		// ----------------------------------------------------------------
		// SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL
		defineSkill(SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL, function() {

			this.name = "セージの魂(魔法の習得Lv)";
			this.kana = "セエシノタマシイマホウノシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ナイトの魂
		// ----------------------------------------------------------------
		// SKILL_ID_KNIGHTNO_TAMASHI
		defineSkill(SKILL_ID_KNIGHTNO_TAMASHI, function() {

			this.name = "ナイトの魂";
			this.kana = "ナイトノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アサシンの魂
		// ----------------------------------------------------------------
		// SKILL_ID_ASSASINNO_TAMASHI
		defineSkill(SKILL_ID_ASSASINNO_TAMASHI, function() {

			this.name = "アサシンの魂";
			this.kana = "アサシンノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// プリーストの魂
		// ----------------------------------------------------------------
		// SKILL_ID_PRIESTNO_TAMASHI
		defineSkill(SKILL_ID_PRIESTNO_TAMASHI, function() {

			this.name = "プリーストの魂";
			this.kana = "フリイストノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ハンターの魂
		// ----------------------------------------------------------------
		// SKILL_ID_HUNTERNO_TAMASHI
		defineSkill(SKILL_ID_HUNTERNO_TAMASHI, function() {

			this.name = "ハンターの魂";
			this.kana = "ハンタアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ウィザードの魂
		// ----------------------------------------------------------------
		// SKILL_ID_WIZARDNO_TAMASHI
		defineSkill(SKILL_ID_WIZARDNO_TAMASHI, function() {

			this.name = "ウィザードの魂";
			this.kana = "ウイサアトノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ブラックスミスの魂
		// ----------------------------------------------------------------
		// SKILL_ID_BLACKSMITHNO_TAMASHI
		defineSkill(SKILL_ID_BLACKSMITHNO_TAMASHI, function() {

			this.name = "ブラックスミスの魂";
			this.kana = "フラツクスミスノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// クルセイダーの魂
		// ----------------------------------------------------------------
		// SKILL_ID_CRUSADERNO_TAMASHI
		defineSkill(SKILL_ID_CRUSADERNO_TAMASHI, function() {

			this.name = "クルセイダーの魂";
			this.kana = "クルセイタアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ローグの魂
		// ----------------------------------------------------------------
		// SKILL_ID_ROGUENO_TAMASHI
		defineSkill(SKILL_ID_ROGUENO_TAMASHI, function() {

			this.name = "ローグの魂";
			this.kana = "ロオクノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// モンクの魂
		// ----------------------------------------------------------------
		// SKILL_ID_MONKNO_TAMASHI
		defineSkill(SKILL_ID_MONKNO_TAMASHI, function() {

			this.name = "モンクの魂";
			this.kana = "モンクノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// バードとダンサーの魂
		// ----------------------------------------------------------------
		// SKILL_ID_BARDTO_DANCERNO_TAMASHI
		defineSkill(SKILL_ID_BARDTO_DANCERNO_TAMASHI, function() {

			this.name = "バードとダンサーの魂";
			this.kana = "ハアトトタンサアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// セージの魂
		// ----------------------------------------------------------------
		// SKILL_ID_SAGENO_TAMASHI
		defineSkill(SKILL_ID_SAGENO_TAMASHI, function() {

			this.name = "セージの魂";
			this.kana = "セエシノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アルケミストの魂
		// ----------------------------------------------------------------
		// SKILL_ID_ALCHEMISTNO_TAMASHI
		defineSkill(SKILL_ID_ALCHEMISTNO_TAMASHI, function() {

			this.name = "アルケミストの魂";
			this.kana = "アルケミストノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 拳聖の魂
		// ----------------------------------------------------------------
		// SKILL_ID_KENSENO_TAMASHI
		defineSkill(SKILL_ID_KENSENO_TAMASHI, function() {

			this.name = "拳聖の魂";
			this.kana = "ケンセイノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルリンカーの魂
		// ----------------------------------------------------------------
		// SKILL_ID_SOULLINKERNO_TAMASHI
		defineSkill(SKILL_ID_SOULLINKERNO_TAMASHI, function() {

			this.name = "ソウルリンカーの魂";
			this.kana = "ソウルリンカアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

];
