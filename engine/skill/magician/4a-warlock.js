/**
 * スキル定義 magician/4a-warlock（24 件 / SKILL_ID 517〜798 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import {
    SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_COMMET, SKILL_ID_CRYMSON_ROCK, SKILL_ID_DRAIN_LIFE, SKILL_ID_EARTH_STRAIN,
    SKILL_ID_FREEZING_SPELL, SKILL_ID_FROST_MISTY, SKILL_ID_HELL_INFERNO, SKILL_ID_JACK_FROST,
    SKILL_ID_MARSH_OF_ABYSS, SKILL_ID_RADIUS, SKILL_ID_READING_SPELLBOOK, SKILL_ID_RECOGNIZED_SPELL,
    SKILL_ID_RELEASE, SKILL_ID_SIENNA_EXEXRATE, SKILL_ID_SOUL_EXPANSION, SKILL_ID_STASIS, SKILL_ID_SUMMON_FIRE_BALL,
    SKILL_ID_SUMMON_LIGHTNING_BALL, SKILL_ID_SUMMON_STONE, SKILL_ID_SUMMON_WATER_BALL,
    SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TETRA_BOLTEX, SKILL_ID_WHITE_IN_PRISON
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ホワイトインプリズン
		// ----------------------------------------------------------------
		// SKILL_ID_WHITE_IN_PRISON
		defineSkill(SKILL_ID_WHITE_IN_PRISON, function() {

			this.name = "ホワイトインプリズン";
			this.kana = "ホワイトインフリスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルエクスパンション
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_EXPANSION
		defineSkill(SKILL_ID_SOUL_EXPANSION, function() {

			this.name = "ソウルエクスパンション";
			this.kana = "ソウルエクスハンシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 400 + 100 * skillLv + charaDataManger.GetCharaInt();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// フロストミスティ
		// ----------------------------------------------------------------
		// SKILL_ID_FROST_MISTY
		defineSkill(SKILL_ID_FROST_MISTY, function() {

			this.name = "フロストミスティ";
			this.kana = "フロストミステイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1200 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// ジャックフロスト
		// ----------------------------------------------------------------
		// SKILL_ID_JACK_FROST
		defineSkill(SKILL_ID_JACK_FROST, function() {

			this.name = "ジャックフロスト";
			this.kana = "シヤツクフロスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// マーシュオブアビス
		// ----------------------------------------------------------------
		// SKILL_ID_MARSH_OF_ABYSS
		defineSkill(SKILL_ID_MARSH_OF_ABYSS, function() {

			this.name = "マーシュオブアビス";
			this.kana = "マアシユオフアヒス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv + 500 * Math.max(0, skillLv - 3);

				}

				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// リコグナイズドスペル
		// ----------------------------------------------------------------
		// SKILL_ID_RECOGNIZED_SPELL
		defineSkill(SKILL_ID_RECOGNIZED_SPELL, function() {

			this.name = "リコグナイズドスペル";
			this.kana = "リコクナイストスヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 90 : (200 - 20 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -5000 + 35000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シエナエクセクレイト
		// ----------------------------------------------------------------
		// SKILL_ID_SIENNA_EXEXRATE
		defineSkill(SKILL_ID_SIENNA_EXEXRATE, function() {

			this.name = "シエナエクセクレイト";
			this.kana = "シエナエクセクレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ラディウス
		// ----------------------------------------------------------------
		// SKILL_ID_RADIUS
		defineSkill(SKILL_ID_RADIUS, function() {
			this.name = "ラディウス";
			this.kana = "ラテイウス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ステイシス
		// ----------------------------------------------------------------
		// SKILL_ID_STASIS
		defineSkill(SKILL_ID_STASIS, function() {

			this.name = "ステイシス";
			this.kana = "ステイシス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000 + 5000 * skillLv;

				}

				return 300000;
			}

		}),

		// ----------------------------------------------------------------
		// ドレインライフ
		// ----------------------------------------------------------------
		// SKILL_ID_DRAIN_LIFE
		defineSkill(SKILL_ID_DRAIN_LIFE, function() {

			this.name = "ドレインライフ";
			this.kana = "トレインライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv + charaDataManger.GetCharaInt();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// クリムゾンロック
		// ----------------------------------------------------------------
		// SKILL_ID_CRYMSON_ROCK
		defineSkill(SKILL_ID_CRYMSON_ROCK, function() {

			this.name = "クリムゾンロック";
			this.kana = "クリムソンロツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// ベースレベル補正がかからない威力
				pow += 1300;

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ヘルインフェルノ
		// ----------------------------------------------------------------
		// SKILL_ID_HELL_INFERNO
		defineSkill(SKILL_ID_HELL_INFERNO, function() {

			this.name = "ヘルインフェルノ";
			this.kana = "ヘルインフエルノ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// コメット
		// ----------------------------------------------------------------
		// SKILL_ID_COMMET
		defineSkill(SKILL_ID_COMMET, function() {

			this.name = "コメット";
			this.kana = "コメツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 400 + 80 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 8500 + 1500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 120000;
			}

		}),

		// ----------------------------------------------------------------
		// チェーンライトニング
		// ----------------------------------------------------------------
		// SKILL_ID_CHAIN_LIGHTNING
		defineSkill(SKILL_ID_CHAIN_LIGHTNING, function() {

			this.name = "チェーンライトニング";
			this.kana = "チエエンライトニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アースストレイン
		// ----------------------------------------------------------------
		// SKILL_ID_EARTH_STRAIN
		defineSkill(SKILL_ID_EARTH_STRAIN, function() {

			this.name = "アースストレイン";
			this.kana = "アアスストレイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 62 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 2000 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 600 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// テトラボルテックス
		// ----------------------------------------------------------------
		// SKILL_ID_TETRA_BOLTEX
		defineSkill(SKILL_ID_TETRA_BOLTEX, function() {

			this.name = "テトラボルテックス";
			this.kana = "テトラホルテツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90 + 30 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(9000, 4000 + 1000 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.max(1000, 6000 - 1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// サモンファイアーボール
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_FIRE_BALL
		defineSkill(SKILL_ID_SUMMON_FIRE_BALL, function() {

			this.name = "サモンファイアーボール";
			this.kana = "サモンフアイアアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サモンウォーターボール
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_WATER_BALL
		defineSkill(SKILL_ID_SUMMON_WATER_BALL, function() {

			this.name = "サモンウォーターボール";
			this.kana = "サモンウオオタアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サモンボールライトニング
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_LIGHTNING_BALL
		defineSkill(SKILL_ID_SUMMON_LIGHTNING_BALL, function() {

			this.name = "サモンボールライトニング";
			this.kana = "サモンホオルライトニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サモンストーン
		// ----------------------------------------------------------------
		// SKILL_ID_SUMMON_STONE
		defineSkill(SKILL_ID_SUMMON_STONE, function() {

			this.name = "サモンストーン";
			this.kana = "サモンストオン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リリース
		// ----------------------------------------------------------------
		// SKILL_ID_RELEASE
		defineSkill(SKILL_ID_RELEASE, function() {

			this.name = "リリース";
			this.kana = "リリイス";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -14 + 17 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リーディングスペルブック
		// ----------------------------------------------------------------
		// SKILL_ID_READING_SPELLBOOK
		defineSkill(SKILL_ID_READING_SPELLBOOK, function() {

			this.name = "リーディングスペルブック";
			this.kana = "リイテインクスヘルフツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 250;
			}

		}),

		// ----------------------------------------------------------------
		// フリージングスペル
		// ----------------------------------------------------------------
		// SKILL_ID_FREEZING_SPELL
		defineSkill(SKILL_ID_FREEZING_SPELL, function() {
			this.name = "フリージングスペル";
			this.kana = "フリイシンクスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// テレキネシスインテンス
		// ----------------------------------------------------------------
		// SKILL_ID_TELECHINESIS_INSTENCE
		defineSkill(SKILL_ID_TELECHINESIS_INSTENCE, function() {

			this.name = "テレキネシスインテンス";
			this.kana = "テレキネシスインテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolAry = [ 120000, 170000, 210000, 240000, 260000 ];

				return coolAry[skillLv - 1];
			}

		}),

];
