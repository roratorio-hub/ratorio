/**
 * スキル定義 03-knight-assassin-priest（SKILL_ID 69–104 / 36 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ELM_ID_POISON } from '../const/EnumElmId.js';
import { MONSTER_DATA_INDEX_ELEMENT } from '../const/EnumMonsterDataIndex.js';
import { MOB_CONF_DEBUF_ID_LEX_AETERNA } from '../mobconfdebuf.js';
import { GetMonseterElmBasicType } from '../monster.h.js';
import {
    SKILL_ID_ASPERSIO, SKILL_ID_AUTO_COUNTER, SKILL_ID_BOWLING_BASH, SKILL_ID_BRANDISH_SPEAR, SKILL_ID_CLOAKING,
    SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_ENCHANT_POISON, SKILL_ID_GLORIA, SKILL_ID_GRIM_TOOTH,
    SKILL_ID_HIDARITE_SHUREN, SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_KATAR_SHUREN, SKILL_ID_KIHE_SHUREN,
    SKILL_ID_KYRIE_ELEISON, SKILL_ID_LEX_AETERNA, SKILL_ID_LEX_DIVINA, SKILL_ID_MACE_SHUREN, SKILL_ID_MAGNIFICAT,
    SKILL_ID_MAGNUS_EXORCISMUS, SKILL_ID_MIGITE_SHUREN, SKILL_ID_PIERCE, SKILL_ID_POISON_REACT, SKILL_ID_RECOVERY,
    SKILL_ID_RESURRECTION, SKILL_ID_RIDING, SKILL_ID_SANCTUARY, SKILL_ID_SEITAI_KOFUKU, SKILL_ID_SLOW_POISON,
    SKILL_ID_SONIC_BLOW, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_SPEAR_STUB, SKILL_ID_SUFFRAGIUM, SKILL_ID_TURN_UNDEAD,
    SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_VENOM_DUST, SKILL_ID_VENOM_SPLASHER, SKILL_ID_YARI_SHUREN
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 槍修練
		// ----------------------------------------------------------------
		// SKILL_ID_YARI_SHUREN
		defineSkill(SKILL_ID_YARI_SHUREN, function() {

			this.name = "槍修練";
			this.kana = "ヤリシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ピアース
		// ----------------------------------------------------------------
		// SKILL_ID_PIERCE
		defineSkill(SKILL_ID_PIERCE, function() {
			this.name = "ピアース";
			this.kana = "ヒアアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 7;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 100 + 10 * skillLv;
				// チャージングピアースがONの時、与えるダメージ + 150% x スキルレベル
				ratio *= 1 + 1.5 * option.GetOptionValue(0);
				return ratio;
			}
		}),

		// ----------------------------------------------------------------
		// スピアスタブ
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_STUB
		defineSkill(SKILL_ID_SPEAR_STUB, function() {

			this.name = "スピアスタブ";
			this.kana = "スヒアスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スピアブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_BOOMERANG
		defineSkill(SKILL_ID_SPEAR_BOOMERANG, function() {

			this.name = "スピアブーメラン";
			this.kana = "スヒアフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ブランディッシュスピア
		// ----------------------------------------------------------------
		// SKILL_ID_BRANDISH_SPEAR
		defineSkill(SKILL_ID_BRANDISH_SPEAR, function() {

			this.name = "ブランディッシュスピア";
			this.kana = "フランテイツシユスヒア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powBase = 0;

				powBase = 100 + 20 * skillLv;

				pow = powBase;
				pow += (skillLv >= 4) ? powBase / 2 : 0;
				pow += (skillLv >= 7) ? powBase / 4 : 0;
				pow += (skillLv >= 10) ? powBase / 8 : 0;

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ツーハンドクイッケン
		// ----------------------------------------------------------------
		// SKILL_ID_TWOHAND_QUICKEN
		defineSkill(SKILL_ID_TWOHAND_QUICKEN, function() {

			this.name = "ツーハンドクイッケン";
			this.kana = "ツウハントクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// オートカウンター
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_COUNTER
		defineSkill(SKILL_ID_AUTO_COUNTER, function() {

			this.name = "オートカウンター";
			this.kana = "オオトカウンタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}

		}),

		// ----------------------------------------------------------------
		// ボウリングバッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_BOWLING_BASH
		defineSkill(SKILL_ID_BOWLING_BASH, function() {

			this.name = "ボウリングバッシュ";
			this.kana = "ホウリンクハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var hitcnt = 2;

				if (skillLv == 1) {
					hitcnt -= 1;
				}

				if (charaDataManger.GetMonsterDebuf(MOB_CONF_DEBUF_ID_LEX_AETERNA) > 0) {
					hitcnt += 1;
				}

				return hitcnt;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ライディング
		// ----------------------------------------------------------------
		// SKILL_ID_RIDING
		defineSkill(SKILL_ID_RIDING, function() {

			this.name = "ライディング";
			this.kana = "ライテインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 騎兵修練
		// ----------------------------------------------------------------
		// SKILL_ID_KIHE_SHUREN
		defineSkill(SKILL_ID_KIHE_SHUREN, function() {

			this.name = "騎兵修練";
			this.kana = "キヘイシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 右手修練
		// ----------------------------------------------------------------
		// SKILL_ID_MIGITE_SHUREN
		defineSkill(SKILL_ID_MIGITE_SHUREN, function() {

			this.name = "右手修練";
			this.kana = "ミキテシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 左手修練
		// ----------------------------------------------------------------
		// SKILL_ID_HIDARITE_SHUREN
		defineSkill(SKILL_ID_HIDARITE_SHUREN, function() {

			this.name = "左手修練";
			this.kana = "ヒタリテシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カタール修練
		// ----------------------------------------------------------------
		// SKILL_ID_KATAR_SHUREN
		defineSkill(SKILL_ID_KATAR_SHUREN, function() {

			this.name = "カタール修練";
			this.kana = "カタアルシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// クローキング
		// ----------------------------------------------------------------
		// SKILL_ID_CLOAKING
		defineSkill(SKILL_ID_CLOAKING, function() {

			this.name = "クローキング";
			this.kana = "クロオキンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// ソニックブロー
		// ----------------------------------------------------------------
		// SKILL_ID_SONIC_BLOW
		defineSkill(SKILL_ID_SONIC_BLOW, function() {

			this.name = "ソニックブロー";
			this.kana = "ソニツクフロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 14 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 400 + 40 * skillLv;

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 8;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// グリムトゥース
		// ----------------------------------------------------------------
		// SKILL_ID_GRIM_TOOTH
		defineSkill(SKILL_ID_GRIM_TOOTH, function() {

			this.name = "グリムトゥース";
			this.kana = "クリムトウウス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// エンチャントポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_ENCHANT_POISON
		defineSkill(SKILL_ID_ENCHANT_POISON, function() {

			this.name = "エンチャントポイズン";
			this.kana = "エンチヤントホイスン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// ポイズンリアクト(反撃)
		// ----------------------------------------------------------------
		// SKILL_ID_POISON_REACT
		defineSkill(SKILL_ID_POISON_REACT, function() {

			this.name = "ポイズンリアクト(反撃)";
			this.kana = "ホイスンリアクトハンケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_POISON) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}

				return 0;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_POISON) {
					return this._CriDamageRate100(skillLv, charaData, specData, mobData);
				}

				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ベナムダスト
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_DUST
		defineSkill(SKILL_ID_VENOM_DUST, function() {

			this.name = "ベナムダスト";
			this.kana = "ヘナムタスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// ベナムスプラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_SPLASHER
		defineSkill(SKILL_ID_VENOM_SPLASHER, function() {

			this.name = "ベナムスプラッシャー";
			this.kana = "ヘナムスフラツシヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 75 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// メイス修練
		// ----------------------------------------------------------------
		// SKILL_ID_MACE_SHUREN
		defineSkill(SKILL_ID_MACE_SHUREN, function() {

			this.name = "メイス修練";
			this.kana = "メイスシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// イムポシティオマヌス
		// ----------------------------------------------------------------
		// SKILL_ID_IMPOSITIO_MANUS
		defineSkill(SKILL_ID_IMPOSITIO_MANUS, function() {

			this.name = "イムポシティオマヌス";
			this.kana = "イムホシテイオマヌス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// サフラギウム
		// ----------------------------------------------------------------
		// SKILL_ID_SUFFRAGIUM
		defineSkill(SKILL_ID_SUFFRAGIUM, function() {

			this.name = "サフラギウム";
			this.kana = "サフラキウム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// アスペルシオ
		// ----------------------------------------------------------------
		// SKILL_ID_ASPERSIO
		defineSkill(SKILL_ID_ASPERSIO, function() {

			this.name = "アスペルシオ";
			this.kana = "アスヘルシオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 聖体降福
		// ----------------------------------------------------------------
		// SKILL_ID_SEITAI_KOFUKU
		defineSkill(SKILL_ID_SEITAI_KOFUKU, function() {

			this.name = "聖体降福";
			this.kana = "セイタイコウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// サンクチュアリ
		// ----------------------------------------------------------------
		// SKILL_ID_SANCTUARY
		defineSkill(SKILL_ID_SANCTUARY, function() {

			this.name = "サンクチュアリ";
			this.kana = "サンクチユアリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// リカバリー
		// ----------------------------------------------------------------
		// SKILL_ID_RECOVERY
		defineSkill(SKILL_ID_RECOVERY, function() {

			this.name = "リカバリー";
			this.kana = "リカハリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// スローポイズン
		// ----------------------------------------------------------------
		// SKILL_ID_SLOW_POISON
		defineSkill(SKILL_ID_SLOW_POISON, function() {

			this.name = "スローポイズン";
			this.kana = "スロオホイスン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// リザレクション
		// ----------------------------------------------------------------
		// SKILL_ID_RESURRECTION
		defineSkill(SKILL_ID_RESURRECTION, function() {

			this.name = "(×)リザレクション";
			this.kana = "リサレクシヨン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 8000 - 2000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -1000 + 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// キリエエレイソン
		// ----------------------------------------------------------------
		// SKILL_ID_KYRIE_ELEISON
		defineSkill(SKILL_ID_KYRIE_ELEISON, function() {

			this.name = "キリエエレイソン";
			this.kana = "キリエエレイソン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 3);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マグニフィカート
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNIFICAT
		defineSkill(SKILL_ID_MAGNIFICAT, function() {

			this.name = "マグニフィカート";
			this.kana = "マクニフイカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// グロリア
		// ----------------------------------------------------------------
		// SKILL_ID_GLORIA
		defineSkill(SKILL_ID_GLORIA, function() {

			this.name = "グロリア";
			this.kana = "クロリア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// レックスディビーナ
		// ----------------------------------------------------------------
		// SKILL_ID_LEX_DIVINA
		defineSkill(SKILL_ID_LEX_DIVINA, function() {

			this.name = "レックスディビーナ";
			this.kana = "レツクステイヒイナ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 20 : 20 - 2 * (skillLv - 5);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// ターンアンデッド
		// ----------------------------------------------------------------
		// SKILL_ID_TURN_UNDEAD
		defineSkill(SKILL_ID_TURN_UNDEAD, function() {

			this.name = "(×)ターンアンデッド";
			this.kana = "タアンアンテツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// レックスエーテルナ
		// ----------------------------------------------------------------
		// SKILL_ID_LEX_AETERNA
		defineSkill(SKILL_ID_LEX_AETERNA, function() {

			this.name = "レックスエーテルナ";
			this.kana = "レツクスエエテルナ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// マグヌスエクソシズム
		// ----------------------------------------------------------------
		// SKILL_ID_MAGNUS_EXORCISMUS
		defineSkill(SKILL_ID_MAGNUS_EXORCISMUS, function() {
			this.name = "マグヌスエクソシズム";
			this.kana = "マクヌスエクソシスム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 15000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
		}),

];
