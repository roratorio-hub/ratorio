/**
 * スキル定義 acolyte/2b-monk（20 件 / SKILL_ID 183〜853 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CCharaConfNizi } from '../../CCharaConfNizi.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_ASHURA_HAOKEN, SKILL_ID_ASHURA_HAOKEN_SPKOTEI, SKILL_ID_BAKURETSU_HADO, SKILL_ID_COMBO_SANDAN_MONK,
    SKILL_ID_HAKKEI, SKILL_ID_IBUKI, SKILL_ID_KIDATSU, SKILL_ID_KIKO, SKILL_ID_KIKO_TENI, SKILL_ID_KONGO,
    SKILL_ID_MIKIRI, SKILL_ID_MORYUKEN, SKILL_ID_RENDASHO, SKILL_ID_SANDANSHO, SKILL_ID_SANDAN_DELAY_ZOKA,
    SKILL_ID_SHIDAN, SKILL_ID_SHIRAHADORI, SKILL_ID_SUNKEI, SKILL_ID_TEKKEN, SKILL_ID_ZANEI
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 鉄拳
		// ----------------------------------------------------------------
		// SKILL_ID_TEKKEN
		defineSkill(SKILL_ID_TEKKEN, function() {

			this.name = "鉄拳";
			this.kana = "テツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 息吹
		// ----------------------------------------------------------------
		// SKILL_ID_IBUKI
		defineSkill(SKILL_ID_IBUKI, function() {

			this.name = "息吹";
			this.kana = "イフキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 気功(気弾数)
		// ----------------------------------------------------------------
		// SKILL_ID_KIKO
		defineSkill(SKILL_ID_KIKO, function() {

			this.name = "気功(気弾数)";
			this.kana = "キコウキタンスウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 気奪
		// ----------------------------------------------------------------
		// SKILL_ID_KIDATSU
		defineSkill(SKILL_ID_KIDATSU, function() {

			this.name = "気奪";
			this.kana = "キタツ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 三段掌
		// ----------------------------------------------------------------
		// SKILL_ID_SANDANSHO
		defineSkill(SKILL_ID_SANDANSHO, function() {

			this.name = "三段掌";
			this.kana = "サンタンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 連打掌
		// ----------------------------------------------------------------
		// SKILL_ID_RENDASHO
		defineSkill(SKILL_ID_RENDASHO, function() {

			this.name = "連打掌";
			this.kana = "レンタシヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 250 + 50 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 4;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		}),

		// ----------------------------------------------------------------
		// 猛龍拳
		// ----------------------------------------------------------------
		// SKILL_ID_MORYUKEN
		defineSkill(SKILL_ID_MORYUKEN, function() {

			this.name = "猛龍拳";
			this.kana = "モウリユウケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 450 + 50 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 700 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		}),

		// ----------------------------------------------------------------
		// 残影
		// ----------------------------------------------------------------
		// SKILL_ID_ZANEI
		defineSkill(SKILL_ID_ZANEI, function() {

			this.name = "残影";
			this.kana = "サンエイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 14;
			}

		}),

		// ----------------------------------------------------------------
		// 見切り
		// ----------------------------------------------------------------
		// SKILL_ID_MIKIRI
		defineSkill(SKILL_ID_MIKIRI, function() {

			this.name = "見切り";
			this.kana = "ミキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 指弾(Hit数=気功)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIDAN
		defineSkill(SKILL_ID_SHIDAN, function() {

			this.name = "指弾(Hit数=気功)";
			this.kana = "シタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125 + 25 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var kidan = 0;

				// 気弾数
				kidan = this.CountOfKidan(charaDataManger);

				// 補正
				if (kidan > skillLv) {
					kidan = skillLv;
				}

				return kidan;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				var kidan = 0;

				// 気弾数
				kidan = this.CountOfKidan(charaDataManger);

				// 補正
				if (kidan > skillLv) {
					kidan = skillLv;
				}

				return 1000 + 1000 * kidan;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CountOfKidan = function(charaDataManger) {
				var kidan = 0;

				// モンク系の自己支援
				kidan = charaDataManger.UsedSkillSearch(SKILL_ID_KIKO);

				// 気功転移等による二次職支援
				if (kidan == 0) {
					kidan = charaDataManger
							.GetCharaConfNizi(CCharaConfNizi.CONF_ID_KIKO);
				}

				return kidan;
			}

		}),

		// ----------------------------------------------------------------
		// 発勁
		// ----------------------------------------------------------------
		// SKILL_ID_HAKKEI
		defineSkill(SKILL_ID_HAKKEI, function() {

			this.name = "発勁";
			this.kana = "ハツケイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 75 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 白刃取り
		// ----------------------------------------------------------------
		// SKILL_ID_SHIRAHADORI
		defineSkill(SKILL_ID_SHIRAHADORI, function() {

			this.name = "白刃取り";
			this.kana = "シラハトリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 爆裂波動
		// ----------------------------------------------------------------
		// SKILL_ID_BAKURETSU_HADO
		defineSkill(SKILL_ID_BAKURETSU_HADO, function() {

			this.name = "爆裂波動";
			this.kana = "ハクレツハトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// 金剛
		// ----------------------------------------------------------------
		// SKILL_ID_KONGO
		defineSkill(SKILL_ID_KONGO, function() {

			this.name = "金剛";
			this.kana = "コンコウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 阿修羅覇凰拳(SP調整可)
		// ----------------------------------------------------------------
		// SKILL_ID_ASHURA_HAOKEN
		defineSkill(SKILL_ID_ASHURA_HAOKEN, function() {

			this.name = "阿修羅覇凰拳(SP調整可)";
			this.kana = "アシユラハオウケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 連打掌修得時の三段掌ディレイ増加
		// ----------------------------------------------------------------
		// SKILL_ID_SANDAN_DELAY_ZOKA
		defineSkill(SKILL_ID_SANDAN_DELAY_ZOKA, function() {

			this.name = "連打掌修得時の三段掌ディレイ増加";
			this.kana = "レンタシヨウシユウトクシノサンタンシヨウテイレイソウカ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 阿修羅覇凰拳(MaxSP-1固定)
		// ----------------------------------------------------------------
		// SKILL_ID_ASHURA_HAOKEN_SPKOTEI
		defineSkill(SKILL_ID_ASHURA_HAOKEN_SPKOTEI, function() {

			this.refId = SKILL_ID_ASHURA_HAOKEN;
			this.name = "阿修羅覇凰拳(MaxSP-1固定)";
			this.kana = "アシユラハオウケンスヒリチユアルホイントコテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 寸勁
		// ----------------------------------------------------------------
		// SKILL_ID_SUNKEI
		defineSkill(SKILL_ID_SUNKEI, function() {

			this.name = "寸勁";
			this.kana = "スンケイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(三段～)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_SANDAN_MONK
		defineSkill(SKILL_ID_COMBO_SANDAN_MONK, function() {

			this.name = "(仮)コンボ計算(三段～)";
			this.kana = "コンホケイサンモンク";
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
		// 気功転移
		// ----------------------------------------------------------------
		// SKILL_ID_KIKO_TENI
		defineSkill(SKILL_ID_KIKO_TENI, function() {

			this.name = "気功転移";
			this.kana = "キコウテンイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

];
