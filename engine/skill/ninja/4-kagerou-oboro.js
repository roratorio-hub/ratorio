/**
 * スキル定義 ninja/4-kagerou-oboro（34 件 / SKILL_ID 760〜793 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../mobconfplayer.js";
import {
    SKILL_ID_BAKURETSU_KUNAI, SKILL_ID_DOFU_GOKAI,
    SKILL_ID_FUFU_SEIRAN, SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU,
    SKILL_ID_GENZYUTSU_BUNSHIN, SKILL_ID_GENZYUTSU_GENWAKU, SKILL_ID_GENZYUTSU_KAGEFUMI,
    SKILL_ID_GENZYUTSU_KAGEMUSHA, SKILL_ID_GENZYUTSU_KOUGETSU, SKILL_ID_GENZYUTSU_KYOGAKU,
    SKILL_ID_GENZYUTSU_KYOMUNOKAGE, SKILL_ID_GENZYUTSU_OBOROGENSO, SKILL_ID_GENZYUTSU_ZANGETSU,
    SKILL_ID_GENZYUTSU_ZYUSATSU, SKILL_ID_HAPPO_KUNAI, SKILL_ID_HIDARITE_TANREN,
    SKILL_ID_HIFU_ENTEN, SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU, SKILL_ID_HYOFU_FUBUKI, SKILL_ID_IZAYOI,
    SKILL_ID_MAKIBISHI, SKILL_ID_MEIKYO_SHISUI, SKILL_ID_MIGITE_TANREN, SKILL_ID_MUCHANAGE, SKILL_ID_TOTEKI_SHUREN,
    SKILL_ID_YAMIKUMO, SKILL_ID_YOMIGAESHI, SKILL_ID_ZYUMONZIGIRI, SKILL_ID_ZYUTSUSHIKI_KAIHO,
    SKILL_ID_ZYUTSUSHIKI_TENKAI
} from "../../skill.dat.js";

export const skills = [

		// ----------------------------------------------------------------
		// 闇雲
		// ----------------------------------------------------------------
		// SKILL_ID_YAMIKUMO
		defineSkill(SKILL_ID_YAMIKUMO, function() {

			this.name = "闇雲";
			this.kana = "ヤミクモ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 右手鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_MIGITE_TANREN
		defineSkill(SKILL_ID_MIGITE_TANREN, function() {

			this.name = "右手鍛錬";
			this.kana = "ミキテタンレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 左手鍛錬
		// ----------------------------------------------------------------
		// SKILL_ID_HIDARITE_TANREN
		defineSkill(SKILL_ID_HIDARITE_TANREN, function() {

			this.name = "左手鍛錬";
			this.kana = "ヒタリテタンレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 十文字斬り
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUMONZIGIRI
		defineSkill(SKILL_ID_ZYUMONZIGIRI, function() {

			this.name = "(△)十文字斬り";
			this.kana = "シユウモンシキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(600, 6100 - 1100 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// 黄泉返し
		// ----------------------------------------------------------------
		// SKILL_ID_YOMIGAESHI
		defineSkill(SKILL_ID_YOMIGAESHI, function() {

			this.name = "黄泉返し";
			this.kana = "ヨミカエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 55 - 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 爆裂苦無
		// ----------------------------------------------------------------
		// SKILL_ID_BAKURETSU_KUNAI
		defineSkill(SKILL_ID_BAKURETSU_KUNAI, function() {

			this.name = "(△)爆裂苦無";
			this.kana = "ハクレツクナイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = (50 + Math.floor(charaDataManger.GetCharaDex() / 4)) * skillLv;
				pow *= 0.4 * charaDataManger.UsedSkillSearch(SKILL_ID_TOTEKI_SHUREN);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// ベースレベル補正がかからない威力
				pow += 10 * charaDataManger.GetCharaJobLv();

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -800 + 800 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 八方苦無
		// ----------------------------------------------------------------
		// SKILL_ID_HAPPO_KUNAI
		defineSkill(SKILL_ID_HAPPO_KUNAI, function() {

			this.name = "八方苦無";
			this.kana = "ハツホウクナイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 60 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 風魔手裏剣 -乱華-
		// ----------------------------------------------------------------
		// SKILL_ID_FUMASHURIKEN_RANKA
		defineSkill(SKILL_ID_FUMASHURIKEN_RANKA, function() {

			this.name = "風魔手裏剣 -乱華-";
			this.kana = "フウマシユリケンランカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(1200, 2200 - 200 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.min(1800, 800 + 200 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 撒菱
		// ----------------------------------------------------------------
		// SKILL_ID_MAKIBISHI
		defineSkill(SKILL_ID_MAKIBISHI, function() {

			this.name = "撒菱";
			this.kana = "マキヒシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)無茶投げ
		// ----------------------------------------------------------------
		// SKILL_ID_MUCHANAGE
		defineSkill(SKILL_ID_MUCHANAGE, function() {

			this.name = "(仮)無茶投げ";
			this.kana = "ムチヤナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 明鏡止水
		// ----------------------------------------------------------------
		// SKILL_ID_MEIKYO_SHISUI
		defineSkill(SKILL_ID_MEIKYO_SHISUI, function() {

			this.name = "明鏡止水";
			this.kana = "メイキヨウシスイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-影武者-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KAGEMUSHA
		defineSkill(SKILL_ID_GENZYUTSU_KAGEMUSHA, function() {

			this.name = "幻術-影武者-";
			this.kana = "ケンシユツカケムシヤ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 135000 - 15000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-驚愕-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KYOGAKU
		defineSkill(SKILL_ID_GENZYUTSU_KYOGAKU, function() {

			this.name = "幻術-驚愕-";
			this.kana = "ケンシユツキヨウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return (7000 - 1000 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-呪殺-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_ZYUSATSU
		defineSkill(SKILL_ID_GENZYUTSU_ZYUSATSU, function() {

			this.name = "幻術-呪殺-";
			this.kana = "ケンシユツシユサツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-幻惑-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_GENWAKU
		defineSkill(SKILL_ID_GENZYUTSU_GENWAKU, function() {

			this.name = "幻術-幻惑-";
			this.kana = "ケンシユツケンワク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 十六夜
		// ----------------------------------------------------------------
		// SKILL_ID_IZAYOI
		defineSkill(SKILL_ID_IZAYOI, function() {

			this.name = "十六夜";
			this.kana = "イサヨイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 火符：炎天
		// ----------------------------------------------------------------
		// SKILL_ID_HIFU_ENTEN
		defineSkill(SKILL_ID_HIFU_ENTEN, function() {

			this.name = "(×)火符：炎天";
			this.kana = "ヒフエンテン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 氷符：吹雪
		// ----------------------------------------------------------------
		// SKILL_ID_HYOFU_FUBUKI
		defineSkill(SKILL_ID_HYOFU_FUBUKI, function() {

			this.name = "(×)氷符：吹雪";
			this.kana = "ヒヨウフフフキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 風符：青嵐
		// ----------------------------------------------------------------
		// SKILL_ID_FUFU_SEIRAN
		defineSkill(SKILL_ID_FUFU_SEIRAN, function() {

			this.name = "(×)風符：青嵐";
			this.kana = "フウフセイラン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 土符：剛塊
		// ----------------------------------------------------------------
		// SKILL_ID_DOFU_GOKAI
		defineSkill(SKILL_ID_DOFU_GOKAI, function() {

			this.name = "(×)土符：剛塊";
			this.kana = "トフコウカイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 術式-解放-
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUTSUSHIKI_KAIHO
		defineSkill(SKILL_ID_ZYUTSUSHIKI_KAIHO, function() {

			this.name = "術式-解放-";
			this.kana = "シユツシキカイホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

		}),

		// ----------------------------------------------------------------
		// 術式-展開-
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUTSUSHIKI_TENKAI
		defineSkill(SKILL_ID_ZYUTSUSHIKI_TENKAI, function() {

			this.name = "術式-展開-";
			this.kana = "シユツシキテンカイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 幻術-影踏み-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KAGEFUMI
		defineSkill(SKILL_ID_GENZYUTSU_KAGEFUMI, function() {

			this.name = "幻術-影踏み-";
			this.kana = "ケンシユツカケフミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-虚無の影-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KYOMUNOKAGE
		defineSkill(SKILL_ID_GENZYUTSU_KYOMUNOKAGE, function() {

			this.name = "幻術-虚無の影-";
			this.kana = "ケンシユツキヨムノカケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-分身-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_BUNSHIN
		defineSkill(SKILL_ID_GENZYUTSU_BUNSHIN, function() {

			this.name = "(×)幻術-分身-";
			this.kana = "ケンシユツフンシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 175000 - 25000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-残月-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_ZANGETSU
		defineSkill(SKILL_ID_GENZYUTSU_ZANGETSU, function() {

			this.name = "幻術-残月-";
			this.kana = "ケンシユツサンケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-紅月-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_KOUGETSU
		defineSkill(SKILL_ID_GENZYUTSU_KOUGETSU, function() {

			this.name = "幻術-紅月-";
			this.kana = "ケンシユツコウケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 35000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幻術-朧幻想-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_OBOROGENSO
		defineSkill(SKILL_ID_GENZYUTSU_OBOROGENSO, function() {

			this.name = "幻術-朧幻想-";
			this.kana = "ケンシユツオホロケンソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 60000;
			}

		}),

		// ----------------------------------------------------------------
		// 符の属性
		// ----------------------------------------------------------------
		// SKILL_ID_FU_ELEMENT_OF_FU
		defineSkill(SKILL_ID_FU_ELEMENT_OF_FU, function() {

			this.name = "符の属性";
			this.kana = "フノソクセイ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 符の数
		// ----------------------------------------------------------------
		// SKILL_ID_FU_COUNT_OF_FU
		defineSkill(SKILL_ID_FU_COUNT_OF_FU, function() {

			this.name = "符の数";
			this.kana = "フノカス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)
		// ----------------------------------------------------------------
		// SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU
		defineSkill(SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU, function() {

			this.name = "残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)";
			this.kana = "サンケツヨウセツテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
