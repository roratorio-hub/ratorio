/**
 * スキル定義 ninja/1-ninja（24 件 / SKILL_ID 393〜438 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { ELM_ID_FIRE, ELM_ID_WATER, ELM_ID_WIND } from '../../const/EnumElmId.js';
import {
    SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_FUZIN, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU,
    SKILL_ID_HYOSENSO, SKILL_ID_ISSEN, SKILL_ID_ISSEN_MAX, SKILL_ID_KAENZIN, SKILL_ID_KAGEBUNSHIN, SKILL_ID_KAGEKIRI,
    SKILL_ID_KAGETOBI, SKILL_ID_KASUMIGIRI, SKILL_ID_KOUENKA, SKILL_ID_KUNAI_NAGE, SKILL_ID_NEN,
    SKILL_ID_NINPO_SHUREN, SKILL_ID_RAIGEKISAI, SKILL_ID_RYUENZIN, SKILL_ID_SAKUFU, SKILL_ID_SHURIKEN_NAGE,
    SKILL_ID_SUITON, SKILL_ID_TATAMI_GAESHI, SKILL_ID_TOTEKI_SHUREN, SKILL_ID_TSURARAOTOSHI, SKILL_ID_UTSUSEMI,
    SKILL_ID_ZENI_NAGE
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 投擲修練
		// ----------------------------------------------------------------
		// SKILL_ID_TOTEKI_SHUREN
		defineSkill(SKILL_ID_TOTEKI_SHUREN, function() {
			this.name = "投擲修練";
			this.kana = "トウテキシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 手裏剣投げ
		// ----------------------------------------------------------------
		// SKILL_ID_SHURIKEN_NAGE
		defineSkill(SKILL_ID_SHURIKEN_NAGE, function() {

			this.name = "(△)手裏剣投げ";
			this.kana = "シユリケンナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 苦無投げ
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_NAGE
		defineSkill(SKILL_ID_KUNAI_NAGE, function() {

			this.name = "(△)苦無投げ";
			this.kana = "クナイナケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 風魔手裏剣投げ
		// ----------------------------------------------------------------
		// SKILL_ID_FUMASHURIKEN_NAGE
		defineSkill(SKILL_ID_FUMASHURIKEN_NAGE, function() {

			this.name = "(△)風魔手裏剣投げ";
			this.kana = "フウマシユリケンナケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -50 + 250 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3 + 1 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 銭投げ
		// ----------------------------------------------------------------
		// SKILL_ID_ZENI_NAGE
		defineSkill(SKILL_ID_ZENI_NAGE, function() {

			this.name = "銭投げ";
			this.kana = "セニナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 畳返し
		// ----------------------------------------------------------------
		// SKILL_ID_TATAMI_GAESHI
		defineSkill(SKILL_ID_TATAMI_GAESHI, function() {

			this.name = "畳返し";
			this.kana = "タタミカエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 影跳び
		// ----------------------------------------------------------------
		// SKILL_ID_KAGETOBI
		defineSkill(SKILL_ID_KAGETOBI, function() {

			this.name = "影跳び";
			this.kana = "カケトヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 霞斬り
		// ----------------------------------------------------------------
		// SKILL_ID_KASUMIGIRI
		defineSkill(SKILL_ID_KASUMIGIRI, function() {

			this.name = "(△)霞斬り";
			this.kana = "カスミキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 影斬り
		// ----------------------------------------------------------------
		// SKILL_ID_KAGEKIRI
		defineSkill(SKILL_ID_KAGEKIRI, function() {

			this.name = "(△)影斬り";
			this.kana = "カケキリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 150 * skillLv;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// 空蝉
		// ----------------------------------------------------------------
		// SKILL_ID_UTSUSEMI
		defineSkill(SKILL_ID_UTSUSEMI, function() {

			this.name = "空蝉";
			this.kana = "ウツセミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// 影分身
		// ----------------------------------------------------------------
		// SKILL_ID_KAGEBUNSHIN
		defineSkill(SKILL_ID_KAGEBUNSHIN, function() {

			this.name = "影分身";
			this.kana = "カケフンシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv >= 7) ? 1000 : (4500 - 500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 念
		// ----------------------------------------------------------------
		// SKILL_ID_NEN
		defineSkill(SKILL_ID_NEN, function() {

			this.name = "念";
			this.kana = "ネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 一閃
		// ----------------------------------------------------------------
		// SKILL_ID_ISSEN
		defineSkill(SKILL_ID_ISSEN, function() {

			this.name = "一閃";
			this.kana = "イツセン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// 忍法修練
		// ----------------------------------------------------------------
		// SKILL_ID_NINPO_SHUREN
		defineSkill(SKILL_ID_NINPO_SHUREN, function() {
			this.name = "忍法修練";
			this.kana = "ニンホウシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 紅炎華
		// ----------------------------------------------------------------
		// SKILL_ID_KOUENKA
		defineSkill(SKILL_ID_KOUENKA, function() {

			this.name = "紅炎華";
			this.kana = "コウエンカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 90;

				// 「影狼・朧 火符：炎天」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 火炎陣
		// ----------------------------------------------------------------
		// SKILL_ID_KAENZIN
		defineSkill(SKILL_ID_KAENZIN, function() {

			this.name = "火炎陣";
			this.kana = "カエンシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 50;

				// 「影狼・朧 火符：炎天」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5 + 1 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 龍炎陣
		// ----------------------------------------------------------------
		// SKILL_ID_RYUENZIN
		defineSkill(SKILL_ID_RYUENZIN, function() {

			this.name = "龍炎陣";
			this.kana = "リユウエンシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150 + 150 * skillLv;

				// 「影狼・朧 火符：炎天」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 氷閃槍
		// ----------------------------------------------------------------
		// SKILL_ID_HYOSENSO
		defineSkill(SKILL_ID_HYOSENSO, function() {

			this.name = "氷閃槍";
			this.kana = "ヒヨウセンソウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 70;

				// 「影狼・朧 氷符：吹雪」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WATER) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 水遁
		// ----------------------------------------------------------------
		// SKILL_ID_SUITON
		defineSkill(SKILL_ID_SUITON, function() {

			this.name = "水遁";
			this.kana = "スイトン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 氷柱落し
		// ----------------------------------------------------------------
		// SKILL_ID_TSURARAOTOSHI
		defineSkill(SKILL_ID_TSURARAOTOSHI, function() {

			this.name = "(△)氷柱落し";
			this.kana = "ツララオトシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150 + 150 * skillLv;

				// 「影狼・朧 氷符：吹雪」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WATER) {
					pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 風刃
		// ----------------------------------------------------------------
		// SKILL_ID_FUZIN
		defineSkill(SKILL_ID_FUZIN, function() {

			this.name = "風刃";
			this.kana = "フウシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150;

				// 「影狼・朧 風符：青嵐」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + 1 * Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 1000 * Math.floor(skillLv / 2);
			}

		}),

		// ----------------------------------------------------------------
		// 雷撃砕
		// ----------------------------------------------------------------
		// SKILL_ID_RAIGEKISAI
		defineSkill(SKILL_ID_RAIGEKISAI, function() {

			this.name = "(△)雷撃砕";
			this.kana = "ライケキサイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// 「影狼・朧 風符：青嵐」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// 朔風
		// ----------------------------------------------------------------
		// SKILL_ID_SAKUFU
		defineSkill(SKILL_ID_SAKUFU, function() {

			this.name = "(△)朔風";
			this.kana = "サクフウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// 「影狼・朧 風符：青嵐」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// 一閃(MaxHP固定)
		// ----------------------------------------------------------------
		// SKILL_ID_ISSEN_MAX
		defineSkill(SKILL_ID_ISSEN_MAX, function() {

			this.refId = SKILL_ID_ISSEN;
			this.name = "一閃(MaxHP固定)";
			this.kana = "イツセンマツクスヒツトホイントコテイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

];
