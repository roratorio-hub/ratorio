/**
 * スキル定義 taekwon/1-taekwon（23 件 / SKILL_ID 305〜380 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from '../../CSkillData.js';
import {
    SKILL_ID_APUCHAORURIGI, SKILL_ID_APUCHAORURIGINO_KAMAE, SKILL_ID_ATATAKAI_KAZE, SKILL_ID_FEORICHAGI,
    SKILL_ID_FEORICHAGINO_KAMAE, SKILL_ID_FIGHT, SKILL_ID_NERYOCHAGI, SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_NOPITIGI,
    SKILL_ID_NUKUMORI, SKILL_ID_NUKUMORI_KABE, SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_RAKHO, SKILL_ID_SPURT_ZYOTAI,
    SKILL_ID_TAEGWON_MISSION, SKILL_ID_TAEGWON_RANKER, SKILL_ID_TAIRIGI, SKILL_ID_TANOSHI_KYUSOKU,
    SKILL_ID_TEIOAPUCHAGI, SKILL_ID_TEIOAPUCHAGI_IN_DASH, SKILL_ID_TORURYOCHAGI, SKILL_ID_TORURYOCHAGINO_KAMAE,
    SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// ティオアプチャギ(ダッシュ中)
		// ----------------------------------------------------------------
		// SKILL_ID_TEIOAPUCHAGI_IN_DASH
		defineSkill(SKILL_ID_TEIOAPUCHAGI_IN_DASH, function() {

			this.refId = SKILL_ID_TEIOAPUCHAGI;
			this.name = "ティオアプチャギ(ダッシュ中)";
			this.kana = "テイオアフチヤキタツシユチユウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var spurt = 0;
				var wpn = 0;

				// 基本式
				pow = 4 * charaDataManger.GetCharaBaseLv();

				// 「テコンキッド スパート状態」の効果
				spurt = charaDataManger.UsedSkillSearch(SKILL_ID_SPURT_ZYOTAI);
				wpn = charaDataManger.GetWeaponType();
				if ((spurt > 0) && (wpn == 0)) {
					pow *= 2;
				}

				return pow;
			}

		}),

		// ----------------------------------------------------------------
		// 温もり
		// ----------------------------------------------------------------
		// SKILL_ID_NUKUMORI
		defineSkill(SKILL_ID_NUKUMORI, function() {
			this.name = "温もり";
			this.kana = "ヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL | CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 温もり(壁押付)
		// ----------------------------------------------------------------
		// SKILL_ID_NUKUMORI_KABE
		defineSkill(SKILL_ID_NUKUMORI_KABE, function() {
			this.refId = SKILL_ID_NUKUMORI;
			this.name = "温もり(壁押付)";
			this.kana = "ヌクモリカヘオシツケ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// タイリギ(蹴威力UP)
		// ----------------------------------------------------------------
		// SKILL_ID_TAIRIGI
		defineSkill(SKILL_ID_TAIRIGI, function() {

			this.name = "タイリギ(蹴威力UP)";
			this.kana = "タイリキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv >= 7) ? 0 : (7000 - 1000 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// フェオリチャギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_FEORICHAGINO_KAMAE
		defineSkill(SKILL_ID_FEORICHAGINO_KAMAE, function() {

			this.name = "フェオリチャギの構え";
			this.kana = "フエオリチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// フェオリチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_FEORICHAGI
		defineSkill(SKILL_ID_FEORICHAGI, function() {

			this.name = "フェオリチャギ";
			this.kana = "フエオリチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 160 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ネリョチャギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_NERYOCHAGINO_KAMAE
		defineSkill(SKILL_ID_NERYOCHAGINO_KAMAE, function() {

			this.name = "ネリョチャギの構え";
			this.kana = "ネリヨチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// ネリョチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_NERYOCHAGI
		defineSkill(SKILL_ID_NERYOCHAGI, function() {

			this.name = "ネリョチャギ";
			this.kana = "ネリヨチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 160 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// トルリョチャギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_TORURYOCHAGINO_KAMAE
		defineSkill(SKILL_ID_TORURYOCHAGINO_KAMAE, function() {

			this.name = "トルリョチャギの構え";
			this.kana = "トルリヨチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// トルリョチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_TORURYOCHAGI
		defineSkill(SKILL_ID_TORURYOCHAGI, function() {

			this.name = "トルリョチャギ";
			this.kana = "トルリヨチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 190 + 30 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アプチャオルリギの構え
		// ----------------------------------------------------------------
		// SKILL_ID_APUCHAORURIGINO_KAMAE
		defineSkill(SKILL_ID_APUCHAORURIGINO_KAMAE, function() {

			this.name = "アプチャオルリギの構え";
			this.kana = "アフチヤオルリキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// アプチャオルリギ
		// ----------------------------------------------------------------
		// SKILL_ID_APUCHAORURIGI
		defineSkill(SKILL_ID_APUCHAORURIGI, function() {

			this.name = "アプチャオルリギ";
			this.kana = "アフチヤオルリキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 190 + 30 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 落法(調整中)
		// ----------------------------------------------------------------
		// SKILL_ID_RAKHO
		defineSkill(SKILL_ID_RAKHO, function() {

			this.name = "落法(調整中)";
			this.kana = "ラクホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// ティオアプチャギ
		// ----------------------------------------------------------------
		// SKILL_ID_TEIOAPUCHAGI
		defineSkill(SKILL_ID_TEIOAPUCHAGI, function() {

			this.name = "ティオアプチャギ";
			this.kana = "テイオアフチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 穏やかな休息
		// ----------------------------------------------------------------
		// SKILL_ID_ODAYAKANA_KYUSOKU
		defineSkill(SKILL_ID_ODAYAKANA_KYUSOKU, function() {

			this.name = "穏やかな休息";
			this.kana = "オタヤカナキユウソク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 楽しい休息
		// ----------------------------------------------------------------
		// SKILL_ID_TANOSHI_KYUSOKU
		defineSkill(SKILL_ID_TANOSHI_KYUSOKU, function() {

			this.name = "楽しい休息";
			this.kana = "タノシイキユウソク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイト
		// ----------------------------------------------------------------
		// SKILL_ID_FIGHT
		defineSkill(SKILL_ID_FIGHT, function() {

			this.name = "ファイト";
			this.kana = "フアイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ノピティギ
		// ----------------------------------------------------------------
		// SKILL_ID_NOPITIGI
		defineSkill(SKILL_ID_NOPITIGI, function() {

			this.name = "ノピティギ";
			this.kana = "ノヒテイキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// テコンミッション
		// ----------------------------------------------------------------
		// SKILL_ID_TAEGWON_MISSION
		defineSkill(SKILL_ID_TAEGWON_MISSION, function() {

			this.name = "テコンミッション";
			this.kana = "テコンミツシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// テコンランカー状態
		// ----------------------------------------------------------------
		// SKILL_ID_TAEGWON_RANKER
		defineSkill(SKILL_ID_TAEGWON_RANKER, function() {

			this.name = "テコンランカー状態";
			this.kana = "テコンランカアシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 暖かい風
		// ----------------------------------------------------------------
		// SKILL_ID_ATATAKAI_KAZE
		defineSkill(SKILL_ID_ATATAKAI_KAZE, function() {

			this.name = "暖かい風";
			this.kana = "アタタカイカセ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv <= 4) ? 20 : 50;
			}

		}),

		// ----------------------------------------------------------------
		// タイリギスパート状態(STR+状態)
		// ----------------------------------------------------------------
		// SKILL_ID_SPURT_ZYOTAI
		defineSkill(SKILL_ID_SPURT_ZYOTAI, function() {

			this.name = "タイリギスパート状態(STR+状態)";
			this.kana = "タイリキスハアトシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 自分以外のPT人数(ファイト用)
		// ----------------------------------------------------------------
		// SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT
		defineSkill(SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT, function() {

			this.name = "自分以外のPT人数(ファイト用)";
			this.kana = "シフンイカイノハアテイイニンスウフアイトヨウ";
			this.maxLv = 11;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
