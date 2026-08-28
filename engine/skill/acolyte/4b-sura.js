/**
 * スキル定義 acolyte/4b-sura（26 件 / SKILL_ID 609〜821 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ELM_ID_WIND } from "../../const/EnumElmId.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, SKILL_ID_BAKKISANDAN, SKILL_ID_COMBO_SORYUKYAKU, SKILL_ID_DAITENHOSUI,
    SKILL_ID_GOHO, SKILL_ID_HASAICHU, SKILL_ID_KYUKIKO, SKILL_ID_RAIKODAN, SKILL_ID_RASETSU_HAOGEKI,
    SKILL_ID_RASETSU_HAOGEKI_MAX, SKILL_ID_SENDENPO, SKILL_ID_SENKO_RENGEKI, SKILL_ID_SENPUTAI,
    SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SHURASHINDAN, SKILL_ID_SISIKO, SKILL_ID_SORYUKYAKU, SKILL_ID_TENKETSU_HAN,
    SKILL_ID_TENKETSU_KAI, SKILL_ID_TENKETSU_KATSU, SKILL_ID_TENKETSU_KYU, SKILL_ID_TENKETSU_MOKU,
    SKILL_ID_TENRACHIMO, SKILL_ID_ZENKI_CHUNYU, SKILL_ID_ZIRAISHIN, SKILL_ID_ZYUBAKUZIN
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 双龍脚
		// ----------------------------------------------------------------
		// SKILL_ID_SORYUKYAKU
		defineSkill(SKILL_ID_SORYUKYAKU, function() {

			this.name = "双龍脚";
			this.kana = "ソウリユウキヤク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					pow = 50 + 20 * skillLv;
					break;

				default:
					pow = 100 + 40 * skillLv;
					break;

				}

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// 天羅地網
		// ----------------------------------------------------------------
		// SKILL_ID_TENRACHIMO
		defineSkill(SKILL_ID_TENRACHIMO, function() {

			this.name = "天羅地網";
			this.kana = "テンラチモウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// 地雷震
		// ----------------------------------------------------------------
		// SKILL_ID_ZIRAISHIN
		defineSkill(SKILL_ID_ZIRAISHIN, function() {

			this.name = "地雷震";
			this.kana = "シライシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 32 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 爆気散弾
		// ----------------------------------------------------------------
		// SKILL_ID_BAKKISANDAN
		defineSkill(SKILL_ID_BAKKISANDAN, function() {

			this.name = "爆気散弾";
			this.kana = "ハクキサンタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 修羅身弾
		// ----------------------------------------------------------------
		// SKILL_ID_SHURASHINDAN
		defineSkill(SKILL_ID_SHURASHINDAN, function() {

			this.name = "(△)修羅身弾";
			this.kana = "シユラシンタン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 500 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(200, 1200 - 200 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// 大纏崩捶
		// ----------------------------------------------------------------
		// SKILL_ID_DAITENHOSUI
		defineSkill(SKILL_ID_DAITENHOSUI, function() {

			this.name = "(△)大纏崩捶";
			this.kana = "タイテンホウスイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 250 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// 號砲
		// ----------------------------------------------------------------
		// SKILL_ID_GOHO
		defineSkill(SKILL_ID_GOHO, function() {

			this.name = "號砲";
			this.kana = "コウホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 5 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 羅刹破凰撃(HPSP固定)
		// ----------------------------------------------------------------
		// SKILL_ID_RASETSU_HAOGEKI_MAX
		defineSkill(SKILL_ID_RASETSU_HAOGEKI_MAX, function() {

			this.refId = SKILL_ID_RASETSU_HAOGEKI;
			this.name = "羅刹破凰撃(HPSP固定)";
			this.kana = "ラセツハオウケキコテイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 羅刹破凰撃(HPSP変動可)
		// ----------------------------------------------------------------
		// SKILL_ID_RASETSU_HAOGEKI
		defineSkill(SKILL_ID_RASETSU_HAOGEKI, function() {

			this.name = "羅刹破凰撃(HPSP変動可)";
			this.kana = "ラセツハオウケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 旋風腿
		// ----------------------------------------------------------------
		// SKILL_ID_SENPUTAI
		defineSkill(SKILL_ID_SENPUTAI, function() {

			this.name = "旋風腿";
			this.kana = "センフウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = charaDataManger.GetCharaBaseLv() + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 呪縛陣
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUBAKUZIN
		defineSkill(SKILL_ID_ZYUBAKUZIN, function() {

			this.name = "呪縛陣";
			this.kana = "シユハクシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 閃電歩
		// ----------------------------------------------------------------
		// SKILL_ID_SENDENPO
		defineSkill(SKILL_ID_SENDENPO, function() {

			this.name = "閃電歩";
			this.kana = "センテンホ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 潜龍昇天(HPSP+爆裂状態)
		// ----------------------------------------------------------------
		// SKILL_ID_SENRYU_SHOTEN
		defineSkill(SKILL_ID_SENRYU_SHOTEN, function() {

			this.name = "潜龍昇天(HPSP+爆裂状態)";
			this.kana = "センリユウシヨウテン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		}),

		// ----------------------------------------------------------------
		// 獅子吼
		// ----------------------------------------------------------------
		// SKILL_ID_SISIKO
		defineSkill(SKILL_ID_SISIKO, function() {

			this.name = "獅子吼";
			this.kana = "シシコウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 雷光弾
		// ----------------------------------------------------------------
		// SKILL_ID_RAIKODAN
		defineSkill(SKILL_ID_RAIKODAN, function() {

			this.name = "雷光弾";
			this.kana = "ライコウタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 武器属性による補正
				if (charaDataManger.GetCharaAttackElement() == ELM_ID_WIND) {
					pow = Math.floor(pow * 125 / 100);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -黙-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_MOKU
		defineSkill(SKILL_ID_TENKETSU_MOKU, function() {

			this.name = "点穴 -黙-";
			this.kana = "テンケツモク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 22 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 * skillLv + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -快-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_KAI
		defineSkill(SKILL_ID_TENKETSU_KAI, function() {

			this.name = "点穴 -快-";
			this.kana = "テンケツカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 700 + 300 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -球-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_KYU
		defineSkill(SKILL_ID_TENKETSU_KYU, function() {

			this.name = "点穴 -球-";
			this.kana = "テンケツキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -反-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_HAN
		defineSkill(SKILL_ID_TENKETSU_HAN, function() {

			this.name = "点穴 -反-";
			this.kana = "テンケツハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 点穴 -活-
		// ----------------------------------------------------------------
		// SKILL_ID_TENKETSU_KATSU
		defineSkill(SKILL_ID_TENKETSU_KATSU, function() {

			this.name = "点穴 -活-";
			this.kana = "テンケツカツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 吸気功
		// ----------------------------------------------------------------
		// SKILL_ID_KYUKIKO
		defineSkill(SKILL_ID_KYUKIKO, function() {

			this.name = "吸気功";
			this.kana = "キユウキコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 破碎柱
		// ----------------------------------------------------------------
		// SKILL_ID_HASAICHU
		defineSkill(SKILL_ID_HASAICHU, function() {

			this.name = "破碎柱";
			this.kana = "ハサイチユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5500 - 500 * skillLv;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 + 1000 * skillLv;

				}

				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 全気注入
		// ----------------------------------------------------------------
		// SKILL_ID_ZENKI_CHUNYU
		defineSkill(SKILL_ID_ZENKI_CHUNYU, function() {

			this.name = "全気注入";
			this.kana = "センキチユウニユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 閃光連撃
		// ----------------------------------------------------------------
		// SKILL_ID_SENKO_RENGEKI
		defineSkill(SKILL_ID_SENKO_RENGEKI, function() {

			this.name = "閃光連撃";
			this.kana = "センコウレンケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 65;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 2350;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 14000 - 2000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(双龍～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SORYUKYAKU
		defineSkill(SKILL_ID_COMBO_SORYUKYAKU, function() {

			this.name = "(仮)コンボ計算(双龍～)";
			this.kana = "コンホケイサンソウリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// 閃光連撃終了直後状態(約1.6秒のATK+状態)
		// ----------------------------------------------------------------
		// SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI
		defineSkill(SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, function() {

			this.name = "閃光連撃終了直後状態(ATK+状態)";
			this.kana = "センコウレンケキシユウリヨウチヨクコシヨウタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
