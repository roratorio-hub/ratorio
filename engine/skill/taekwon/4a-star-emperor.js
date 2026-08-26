/**
 * スキル定義 taekwon/4a-star-emperor（22 件 / SKILL_ID 947〜1282 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../mobconfplayer.js";
import {
    SKILL_ID_HOSHINO_HIKARI, SKILL_ID_HOSHINO_KAMAE, SKILL_ID_KOEN_KYAKU, SKILL_ID_MANGETSU_KYAKU,
    SKILL_ID_RYUSE_RAKKA, SKILL_ID_RYUSE_RAKKA_MODE, SKILL_ID_RYUSE_RAKKA_TSUIGEKI, SKILL_ID_SAKUGETSU_KYAKU,
    SKILL_ID_SEITE_KORIN, SKILL_ID_SENKO_KYAKU, SKILL_ID_SHINSE_BAKUHATSU, SKILL_ID_SOSENO_SHO,
    SKILL_ID_TAIYONO_HIKARI, SKILL_ID_TAIYONO_KAMAE, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA, SKILL_ID_TAIYO_BAKUHATSU, SKILL_ID_TSUKINO_HIKARI,
    SKILL_ID_TSUKINO_KAMAE, SKILL_ID_UCHUNO_KAMAE, SKILL_ID_ZIGENNO_SHO, SKILL_ID_ZYURYOKU_CHOSE
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// 太陽と月と星の記録
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU, function() {

			this.name = "太陽と月と星の記録";
			this.kana = "タイヨウトツキトホシノキロク";
			this.maxLv = 3;
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
		// 太陽と月と星の浄化
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA, function() {

			this.name = "太陽と月と星の浄化";
			this.kana = "タイヨウトツキトホシノシヨウカ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽の構え
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_KAMAE
		defineSkill(SKILL_ID_TAIYONO_KAMAE, function() {

			this.name = "太陽の構え";
			this.kana = "タイヨウノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		}),

		// ----------------------------------------------------------------
		// 紅焔脚
		// ----------------------------------------------------------------
		// SKILL_ID_KOEN_KYAKU
		defineSkill(SKILL_ID_KOEN_KYAKU, function() {

			this.name = "紅焔脚";
			this.kana = "コウエンキヤク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 50 + 80 * skillLv + 40 * Math.floor(skillLv / 2);
			}

		}),

		// ----------------------------------------------------------------
		// 太陽爆発
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYO_BAKUHATSU
		defineSkill(SKILL_ID_TAIYO_BAKUHATSU, function() {

			this.name = "太陽爆発";
			this.kana = "タイヨウハクハツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽の光
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_HIKARI
		defineSkill(SKILL_ID_TAIYONO_HIKARI, function() {

			this.name = "太陽の光";
			this.kana = "タイヨウノヒカリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 月の構え
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_KAMAE
		defineSkill(SKILL_ID_TSUKINO_KAMAE, function() {

			this.name = "月の構え";
			this.kana = "ツキノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 朔月脚
		// ----------------------------------------------------------------
		// SKILL_ID_SAKUGETSU_KYAKU
		defineSkill(SKILL_ID_SAKUGETSU_KYAKU, function() {

			this.name = "朔月脚";
			this.kana = "サクケツキヤク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 250 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 満月脚
		// ----------------------------------------------------------------
		// SKILL_ID_MANGETSU_KYAKU
		defineSkill(SKILL_ID_MANGETSU_KYAKU, function() {

			this.name = "満月脚";
			this.kana = "マンケツキヤク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
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
		// 月の光
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_HIKARI
		defineSkill(SKILL_ID_TSUKINO_HIKARI, function() {

			this.name = "月の光";
			this.kana = "ツキノヒカリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 星の構え
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_KAMAE
		defineSkill(SKILL_ID_HOSHINO_KAMAE, function() {

			this.name = "星の構え";
			this.kana = "ホシノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 閃光脚
		// ----------------------------------------------------------------
		// SKILL_ID_SENKO_KYAKU
		defineSkill(SKILL_ID_SENKO_KYAKU, function() {

			this.name = "閃光脚";
			this.kana = "センコウキヤク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 流星落下
		// ----------------------------------------------------------------
		// SKILL_ID_RYUSE_RAKKA
		defineSkill(SKILL_ID_RYUSE_RAKKA, function() {
			this.name = "流星落下";
			this.kana = "リユウセイラツカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * ((skillLv - 1) % 5);
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (skillLv > 5) ? 120000 : 240000;
			}
		}),

		// ----------------------------------------------------------------
		// 星の光
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_HIKARI
		defineSkill(SKILL_ID_HOSHINO_HIKARI, function() {

			this.name = "星の光";
			this.kana = "ホシノヒカリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 宇宙の構え
		// ----------------------------------------------------------------
		// SKILL_ID_UCHUNO_KAMAE
		defineSkill(SKILL_ID_UCHUNO_KAMAE, function() {

			this.name = "宇宙の構え";
			this.kana = "ウチユウノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 重力調節
		// ----------------------------------------------------------------
		// SKILL_ID_ZYURYOKU_CHOSE
		defineSkill(SKILL_ID_ZYURYOKU_CHOSE, function() {

			this.name = "重力調節";
			this.kana = "シユウリヨクチヨウセイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 新星爆発
		// ----------------------------------------------------------------
		// SKILL_ID_SHINSE_BAKUHATSU
		defineSkill(SKILL_ID_SHINSE_BAKUHATSU, function() {

			this.name = "新星爆発";
			this.kana = "シンセイハクハツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 星帝降臨
		// ----------------------------------------------------------------
		// SKILL_ID_SEITE_KORIN
		defineSkill(SKILL_ID_SEITE_KORIN, function() {

			this.name = "星帝降臨";
			this.kana = "セイテイコウリン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 160;
			}

			this.Power = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2250 + 750 * skillLv;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 創星の書
		// ----------------------------------------------------------------
		// SKILL_ID_SOSENO_SHO
		defineSkill(SKILL_ID_SOSENO_SHO, function() {
			this.name = "創星の書";
			this.kana = "ソウセイノシヨ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}
		}),

		// ----------------------------------------------------------------
		// 次元の書
		// ----------------------------------------------------------------
		// SKILL_ID_ZIGENNO_SHO
		defineSkill(SKILL_ID_ZIGENNO_SHO, function() {

			this.name = "次元の書";
			this.kana = "シケンノシヨ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 22500 - 2500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 流星落下の計算方法
		// ----------------------------------------------------------------
		// SKILL_ID_RYUSE_RAKKA_MODE
		defineSkill(SKILL_ID_RYUSE_RAKKA_MODE, function() {

			this.name = "流星落下の計算方法";
			this.kana = "リユウセイラツカノケイサンホウホウ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 流星落下(周辺追撃)
		// ----------------------------------------------------------------
		// SKILL_ID_RYUSE_RAKKA_TSUIGEKI
		defineSkill(SKILL_ID_RYUSE_RAKKA_TSUIGEKI, function() {
			this.name = "流星落下 周辺追撃";
			this.kana = "リユウセイラツカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
