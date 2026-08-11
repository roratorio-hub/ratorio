/**
 * スキル定義 28-legacy-class-extra（SKILL_ID 859–901 / 43 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../mobconfplayer.js';
import {
    SKILL_ID_ALCHEMISTNO_TAMASHI, SKILL_ID_ANSOKU, SKILL_ID_ASSASINNO_TAMASHI, SKILL_ID_BARDTO_DANCERNO_TAMASHI,
    SKILL_ID_BLACKSMITHNO_TAMASHI, SKILL_ID_BUKISEIREN, SKILL_ID_CALL_HOMUNCULUS,
    SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT, SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE, SKILL_ID_CRUSADERNO_TAMASHI,
    SKILL_ID_DARK_CROSS, SKILL_ID_ELEMENTAL_SHIELD, SKILL_ID_ESCAPE, SKILL_ID_FLIP_THE_COIN, SKILL_ID_FRIGNO_UTA,
    SKILL_ID_FULLSLOT, SKILL_ID_FULL_CHEMICAL_CHARGE, SKILL_ID_FULL_STRIP, SKILL_ID_GANBANTEIN,
    SKILL_ID_HELLMODENO_TUE, SKILL_ID_HUNTERNO_TAMASHI, SKILL_ID_ILLUSION_DOOPING, SKILL_ID_INTIMIDATE,
    SKILL_ID_INTIMIDATE_FOR_CLONE, SKILL_ID_KENSENO_TAMASHI, SKILL_ID_KINGS_GRACE, SKILL_ID_KNIGHTNO_TAMASHI,
    SKILL_ID_MONKNO_TAMASHI, SKILL_ID_PRESERVE, SKILL_ID_PRESSURE_MISS, SKILL_ID_PRIESTNO_TAMASHI,
    SKILL_ID_RESURRECTION_HOMUNCULUS, SKILL_ID_ROGUENO_TAMASHI, SKILL_ID_SAGENO_TAMASHI, SKILL_ID_SEIMEIRYOKU_HENKAN,
    SKILL_ID_SEIMEI_RINRI, SKILL_ID_SHOKUBUTSU_SAIBAI, SKILL_ID_SLIMPOTION_PITCHER, SKILL_ID_SOULLINKERNO_TAMASHI,
    SKILL_ID_SPIDER_WEB, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_WALL_OF_FOG, SKILL_ID_WATASHIWO_SHIBARANAIDE,
    SKILL_ID_WIZARDNO_TAMASHI
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 生命倫理
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEI_RINRI
		defineSkill(SKILL_ID_SEIMEI_RINRI, function() {

			this.name = "生命倫理";
			this.kana = "セイメイリンリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 安息
		// ----------------------------------------------------------------
		// SKILL_ID_ANSOKU
		defineSkill(SKILL_ID_ANSOKU, function() {

			this.name = "安息";
			this.kana = "アンソク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

		// ----------------------------------------------------------------
		// コールホムンクルス
		// ----------------------------------------------------------------
		// SKILL_ID_CALL_HOMUNCULUS
		defineSkill(SKILL_ID_CALL_HOMUNCULUS, function() {

			this.name = "コールホムンクルス";
			this.kana = "コオルホムンクルス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// リザレクションホムンクルス
		// ----------------------------------------------------------------
		// SKILL_ID_RESURRECTION_HOMUNCULUS
		defineSkill(SKILL_ID_RESURRECTION_HOMUNCULUS, function() {

			this.name = "リザレクションホムンクルス";
			this.kana = "リサレクシヨンホムンクルス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// ガンバンテイン
		// ----------------------------------------------------------------
		// SKILL_ID_GANBANTEIN
		defineSkill(SKILL_ID_GANBANTEIN, function() {

			this.name = "ガンバンテイン";
			this.kana = "カンハンテイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 武器精錬
		// ----------------------------------------------------------------
		// SKILL_ID_BUKISEIREN
		defineSkill(SKILL_ID_BUKISEIREN, function() {

			this.name = "武器精錬";
			this.kana = "フキセイレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// プレッシャー（重複）
		// ----------------------------------------------------------------
		// SKILL_ID_PRESSURE_MISS
		defineSkill(SKILL_ID_PRESSURE_MISS, function() {

			this.name = "プレッシャー（重複）";
			this.kana = "フレツシヤアチヨウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// フルストリップ
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_STRIP
		defineSkill(SKILL_ID_FULL_STRIP, function() {

			this.name = "フルストリップ";
			this.kana = "フルストリツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

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
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// プリザーブ
		// ----------------------------------------------------------------
		// SKILL_ID_PRESERVE
		defineSkill(SKILL_ID_PRESERVE, function() {

			this.name = "プリザーブ";
			this.kana = "フリサアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 音楽専門家の熟練
		// ----------------------------------------------------------------
		// SKILL_ID_WATASHIWO_SHIBARANAIDE
		defineSkill(SKILL_ID_WATASHIWO_SHIBARANAIDE, function() {
			this.name = "音楽専門家の熟練";
			this.kana = "オンガクセンモンカのジュクレン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}
			this.CoolTime = function(skillLv, charaData) {
				return 10000;
			}
		}),

		// ----------------------------------------------------------------
		// ヘルモードの杖
		// ----------------------------------------------------------------
		// SKILL_ID_HELLMODENO_TUE
		defineSkill(SKILL_ID_HELLMODENO_TUE, function() {

			this.name = "ヘルモードの杖";
			this.kana = "ヘルモオトノツエ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 月明かりの下で
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKIAKARINO_SHITADE
		defineSkill(SKILL_ID_TSUKIAKARINO_SHITADE, function() {

			this.name = "月明かりの下で";
			this.kana = "ツキアカリノシタテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 生命力変換
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEIRYOKU_HENKAN
		defineSkill(SKILL_ID_SEIMEIRYOKU_HENKAN, function() {

			this.name = "生命力変換";
			this.kana = "セイメイリヨクヘンカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スパイダーウェブ
		// ----------------------------------------------------------------
		// SKILL_ID_SPIDER_WEB
		defineSkill(SKILL_ID_SPIDER_WEB, function() {

			this.name = "スパイダーウェブ";
			this.kana = "スハイタアウエフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// ウォールオブフォグ
		// ----------------------------------------------------------------
		// SKILL_ID_WALL_OF_FOG
		defineSkill(SKILL_ID_WALL_OF_FOG, function() {

			this.name = "ウォールオブフォグ";
			this.kana = "ウオオルオフフオク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = 20000;//デリュージ上では４０秒になるが、デリュージ上の場合は対応しない。
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// スリムポーションピッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_SLIMPOTION_PITCHER
		defineSkill(SKILL_ID_SLIMPOTION_PITCHER, function() {

			this.name = "スリムポーションピッチャー";
			this.kana = "スリムホオシヨンヒツチヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// フルケミカルチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_FULL_CHEMICAL_CHARGE
		defineSkill(SKILL_ID_FULL_CHEMICAL_CHARGE, function() {

			this.name = "フルケミカルチャージ";
			this.kana = "フルケミカルチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 植物栽培
		// ----------------------------------------------------------------
		// SKILL_ID_SHOKUBUTSU_SAIBAI
		defineSkill(SKILL_ID_SHOKUBUTSU_SAIBAI, function() {

			this.name = "植物栽培";
			this.kana = "シヨクフツサイハイ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

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

		// ----------------------------------------------------------------
		// フリップザコイン
		// ----------------------------------------------------------------
		// SKILL_ID_FLIP_THE_COIN
		defineSkill(SKILL_ID_FLIP_THE_COIN, function() {

			this.name = "フリップザコイン";
			this.kana = "フリツフサコイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// キングスグレイス
		// ----------------------------------------------------------------
		// SKILL_ID_KINGS_GRACE
		defineSkill(SKILL_ID_KINGS_GRACE, function() {

			this.name = "キングスグレイス";
			this.kana = "キンクスクレイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 220 - 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 110000 - 10000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// エスケープ
		// ----------------------------------------------------------------
		// SKILL_ID_ESCAPE
		defineSkill(SKILL_ID_ESCAPE, function() {

			this.name = "エスケープ";
			this.kana = "エスケエフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 1 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// フリッグの歌
		// ----------------------------------------------------------------
		// SKILL_ID_FRIGNO_UTA
		defineSkill(SKILL_ID_FRIGNO_UTA, function() {

			this.name = "フリッグの歌";
			this.kana = "フリツクノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 170 + 30 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// エレメンタルシールド
		// ----------------------------------------------------------------
		// SKILL_ID_ELEMENTAL_SHIELD
		defineSkill(SKILL_ID_ELEMENTAL_SHIELD, function() {

			this.name = "エレメンタルシールド";
			this.kana = "エレメンタルシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
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
		// イリュージョンドーピング
		// ----------------------------------------------------------------
		// SKILL_ID_ILLUSION_DOOPING
		defineSkill(SKILL_ID_ILLUSION_DOOPING, function() {

			this.name = "イリュージョンドーピング";
			this.kana = "イリユウシヨントオヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv;

				}

				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ダーククロス
		// ----------------------------------------------------------------
		// SKILL_ID_DARK_CROSS
		defineSkill(SKILL_ID_DARK_CROSS, function() {

			this.name = "ダーククロス";
			this.kana = "タアククロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// インティミデイト(盗作用Ex)
		// ----------------------------------------------------------------
		// SKILL_ID_INTIMIDATE_FOR_CLONE
		defineSkill(SKILL_ID_INTIMIDATE_FOR_CLONE, function() {

			this.refId = SKILL_ID_INTIMIDATE;
			this.name = "インティミデイト(盗作用Ex)";
			this.kana = "インテイミテイトトウサクヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT
		defineSkill(SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT, function() {

			this.name = "(仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)";
			this.kana = "コンホケイサンシヨイント";
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
		// (仮)コンボ計算(SpP→ｿﾆｯｸ)
		// ----------------------------------------------------------------
		// SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE
		defineSkill(SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE, function() {

			this.name = "(仮)コンボ計算(SpP→ｿﾆｯｸ)";
			this.kana = "コンホケイサンスハイラルヒアアス";
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
		// フルスロットル
		// ----------------------------------------------------------------
		// SKILL_ID_FULLSLOT
		defineSkill(SKILL_ID_FULLSLOT, function() {
			this.name = "フルスロットル";
			this.kana = "フルスロツトル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 1;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 600 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 40 * 1000;
			}
		}),

];
