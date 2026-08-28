/**
 * スキル定義 thief/2a-assassin（12 件 / SKILL_ID 79〜381 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ELM_ID_POISON } from "../../const/EnumElmId.js";
import { MONSTER_DATA_INDEX_ELEMENT } from "../../const/EnumMonsterDataIndex.js";
import { GetMonseterElmBasicType } from "../../monster.h.js";
import {
    SKILL_ID_CLOAKING, SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_ENCHANT_POISON, SKILL_ID_GRIM_TOOTH,
    SKILL_ID_HIDARITE_SHUREN, SKILL_ID_KATAR_SHUREN, SKILL_ID_MIGITE_SHUREN, SKILL_ID_POISON_REACT,
    SKILL_ID_SONIC_ACCELERATION, SKILL_ID_SONIC_BLOW, SKILL_ID_VENOM_DUST, SKILL_ID_VENOM_KNIFE,
    SKILL_ID_VENOM_SPLASHER, SKILL_ID_SONIC_BLOW_TAMASHI
} from "../skill.dat.js";

export const skills = [
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
		// ソニックブロー(SL魂版)
		// ----------------------------------------------------------------
		// SKILL_ID_SONIC_BLOW_TAMASHI
		defineSkill(SKILL_ID_SONIC_BLOW_TAMASHI, function() {
			this.refId = SKILL_ID_SONIC_BLOW;
			this.name = "ソニックブロー(SL魂版)";
			this.kana = "ソニツクフロオソウルリンカアタマシイハン";
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
				// 魂効果
				pow *= (charaDataManger.IsSeedsMode()) ? 1.25 : 2;
				return pow;
			}
			this.dispHitCount = function(skillLv, charaDataManger) {
				return 8;
			}
			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return (charaDataManger.IsSeedsMode()) ? 2000 : 1;
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
		// ベナムナイフ
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_KNIFE
		defineSkill(SKILL_ID_VENOM_KNIFE, function() {

			this.name = "ベナムナイフ";
			this.kana = "ヘナムナイフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// ソニックアクセラレーション
		// ----------------------------------------------------------------
		// SKILL_ID_SONIC_ACCELERATION
		defineSkill(SKILL_ID_SONIC_ACCELERATION, function() {

			this.name = "ソニックアクセラレーション";
			this.kana = "ソニツクアクセラレエシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
