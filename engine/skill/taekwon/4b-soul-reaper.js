/**
 * スキル定義 taekwon/4b-soul-reaper（26 件 / SKILL_ID 967〜998 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    SKILL_ID_COUNT_OF_SOUL_ENERGY, SKILL_ID_CRITICAL_WOUNDS, SKILL_ID_ESFU, SKILL_ID_ESHA, SKILL_ID_ESPA,
    SKILL_ID_GOLEMNO_TAMASHI, SKILL_ID_KAGENO_TAMASHI, SKILL_ID_KAUTO, SKILL_ID_ODINNO_CHIKARA, SKILL_ID_PEONY_MAMY,
    SKILL_ID_PISHARI_HERB, SKILL_ID_SEKAIZYUNO_HOKORI, SKILL_ID_SHIRYO_BAKUHATSU, SKILL_ID_SHIRYO_HYOI,
    SKILL_ID_SNOW_FLIP, SKILL_ID_SOUL_ENERGY_KENKYU, SKILL_ID_STONE_SKIN, SKILL_ID_TAKANO_TAMASHI,
    SKILL_ID_TAMASHINO_BUNRETSU, SKILL_ID_TAMASHINO_CHIKUSEKI, SKILL_ID_TAMASHINO_HOKAI, SKILL_ID_TAMASHINO_RENKETSU,
    SKILL_ID_TAMASHINO_SHUKAKU, SKILL_ID_TAMASHINO_ZYUNKAN, SKILL_ID_VAMPIRE_GIFT, SKILL_ID_YOSENO_TAMASHI
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// エスハ
		// ----------------------------------------------------------------
		// SKILL_ID_ESHA
		defineSkill(SKILL_ID_ESHA, function() {

			this.name = "エスハ";
			this.kana = "エスハ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 2000 + (100 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エスパ
		// ----------------------------------------------------------------
		// SKILL_ID_ESPA
		defineSkill(SKILL_ID_ESPA, function() {

			this.name = "エスパ";
			this.kana = "エスパ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// エスフ
		// ----------------------------------------------------------------
		// SKILL_ID_ESFU
		defineSkill(SKILL_ID_ESFU, function() {

			this.name = "エスフ";
			this.kana = "エスフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// カウト
		// ----------------------------------------------------------------
		// SKILL_ID_KAUTO
		defineSkill(SKILL_ID_KAUTO, function() {

			this.name = "カウト";
			this.kana = "カウト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 魂の蓄積
		// ----------------------------------------------------------------
		// SKILL_ID_TAMASHINO_CHIKUSEKI
		defineSkill(SKILL_ID_TAMASHINO_CHIKUSEKI, function() {

			this.name = "魂の蓄積";
			this.kana = "タマシイノチクセキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 魂の収穫
		// ----------------------------------------------------------------
		// SKILL_ID_TAMASHINO_SHUKAKU
		defineSkill(SKILL_ID_TAMASHINO_SHUKAKU, function() {

			this.name = "魂の収穫";
			this.kana = "タマシイノシユウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 魂の循環
		// ----------------------------------------------------------------
		// SKILL_ID_TAMASHINO_ZYUNKAN
		defineSkill(SKILL_ID_TAMASHINO_ZYUNKAN, function() {

			this.name = "魂の循環";
			this.kana = "タマシイノシユンカン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4500 - 1500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4500 - 1500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 魂の連結
		// ----------------------------------------------------------------
		// SKILL_ID_TAMASHINO_RENKETSU
		defineSkill(SKILL_ID_TAMASHINO_RENKETSU, function() {

			this.name = "魂の連結";
			this.kana = "タマシイノレンケツ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルエナジー研究
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_ENERGY_KENKYU
		defineSkill(SKILL_ID_SOUL_ENERGY_KENKYU, function() {

			this.name = "ソウルエナジー研究";
			this.kana = "ソウルエナシイケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 死霊憑依
		// ----------------------------------------------------------------
		// SKILL_ID_SHIRYO_HYOI
		defineSkill(SKILL_ID_SHIRYO_HYOI, function() {

			this.name = "死霊憑依";
			this.kana = "シリヨウヒヨウイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 死霊爆発
		// ----------------------------------------------------------------
		// SKILL_ID_SHIRYO_BAKUHATSU
		defineSkill(SKILL_ID_SHIRYO_BAKUHATSU, function() {

			this.name = "死霊爆発";
			this.kana = "シリヨウハクハツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 魂の分裂
		// ----------------------------------------------------------------
		// SKILL_ID_TAMASHINO_BUNRETSU
		defineSkill(SKILL_ID_TAMASHINO_BUNRETSU, function() {

			this.name = "(×)魂の分裂";
			this.kana = "タマシイノフンレツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 鷹の魂
		// ----------------------------------------------------------------
		// SKILL_ID_TAKANO_TAMASHI
		defineSkill(SKILL_ID_TAKANO_TAMASHI, function() {

			this.name = "鷹の魂";
			this.kana = "タカノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 妖精の魂
		// ----------------------------------------------------------------
		// SKILL_ID_YOSENO_TAMASHI
		defineSkill(SKILL_ID_YOSENO_TAMASHI, function() {

			this.name = "妖精の魂";
			this.kana = "ヨウセイノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 影の魂
		// ----------------------------------------------------------------
		// SKILL_ID_KAGENO_TAMASHI
		defineSkill(SKILL_ID_KAGENO_TAMASHI, function() {

			this.name = "影の魂";
			this.kana = "カケノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ゴーレムの魂
		// ----------------------------------------------------------------
		// SKILL_ID_GOLEMNO_TAMASHI
		defineSkill(SKILL_ID_GOLEMNO_TAMASHI, function() {

			this.name = "ゴーレムの魂";
			this.kana = "コオレムノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 魂の崩壊
		// ----------------------------------------------------------------
		// SKILL_ID_TAMASHINO_HOKAI
		defineSkill(SKILL_ID_TAMASHINO_HOKAI, function() {

			this.name = "(×)魂の崩壊";
			this.kana = "タマシイノホウカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルエナジーの個数
		// ----------------------------------------------------------------
		// SKILL_ID_COUNT_OF_SOUL_ENERGY
		defineSkill(SKILL_ID_COUNT_OF_SOUL_ENERGY, function() {

			this.name = "ソウルエナジーの個数";
			this.kana = "ソウルエナシイノコスウ";
			this.maxLv = 20;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
