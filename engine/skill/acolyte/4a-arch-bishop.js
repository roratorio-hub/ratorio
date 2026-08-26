/**
 * スキル定義 acolyte/4a-arch-bishop（22 件 / SKILL_ID 476〜796 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    n_B_TAISEI
} from "../../mobconfplayer.js";
import {
    SKILL_ID_ADORAMUS, SKILL_ID_ANCILLA, SKILL_ID_CANTOCANDIDUS, SKILL_ID_CLEARANCE, SKILL_ID_CLEMENTIA,
    SKILL_ID_COLUCEO_HEAL, SKILL_ID_DUPLELIGHT, SKILL_ID_EPICLESIS, SKILL_ID_EUCHARISTICA, SKILL_ID_EXPIATIO,
    SKILL_ID_GRAHAM_LIGHT, SKILL_ID_HIGHNESS_HEAL, SKILL_ID_JUDEX, SKILL_ID_LAUDAAGNUS, SKILL_ID_LAUDARAMUS,
    SKILL_ID_MIRIAM_LIGHT, SKILL_ID_OFFERTORIUM, SKILL_ID_ORATIO, SKILL_ID_PRAEFATIO, SKILL_ID_RENOVATIO,
    SKILL_ID_SECRAMENT, SKILL_ID_SILENTIUM
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ジュデックス
		// ----------------------------------------------------------------
		// SKILL_ID_JUDEX
		defineSkill(SKILL_ID_JUDEX, function() {
			this.name = "ジュデックス";
			this.kana = "シユテツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
			this.range = function(weapon) {
				return CSkillData.RANGE_MAGIC;
			}
			this.dispHitCount = function(skillLv) {
				return 3;
			}
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
					case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
						ratio = 300 + 70 * skillLv;
						ratio = Math.floor(ratio * n_A_BaseLV / 100);
						break;
					default:
						ratio = 300 + 70 * skillLv;
						ratio = Math.floor(ratio * n_A_BaseLV / 100);
						break;
				}
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// アンシラ
		// ----------------------------------------------------------------
		// SKILL_ID_ANCILLA
		defineSkill(SKILL_ID_ANCILLA, function() {

			this.name = "アンシラ";
			this.kana = "アンシラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// アドラムス
		// ----------------------------------------------------------------
		// SKILL_ID_ADORAMUS
		defineSkill(SKILL_ID_ADORAMUS, function() {
			this.name = "アドラムス";
			this.kana = "アトラムス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.element = function(option) {
				if (option.GetOptionValue(0) === 1) {
					// アンシラ状態のとき
					return CSkillData.ELEMENT_FORCE_VANITY;
				} else {
					return CSkillData.ELEMENT_FORCE_HOLY;
				}
			}
			this.range = function(weapon) {
				return CSkillData.RANGE_MAGIC;
			}
			this.Power = function(skillLv, charaDataManger) {
				let ratio = 0;
				ratio = 500 + 100 * skillLv;
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.dispHitCount = function(skillLv) {
				return 10;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
					case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
						return 5000 - 500 * skillLv;
					}
				return 0;
			}
			this.LifeTime = function(skillLv, charaData) {
				return (10 + 5 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// クレメンティア
		// ----------------------------------------------------------------
		// SKILL_ID_CLEMENTIA
		defineSkill(SKILL_ID_CLEMENTIA, function() {

			this.name = "クレメンティア";
			this.kana = "クレメンテイア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 64 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// カントキャンディダス
		// ----------------------------------------------------------------
		// SKILL_ID_CANTOCANDIDUS
		defineSkill(SKILL_ID_CANTOCANDIDUS, function() {

			this.name = "カントキャンディダス";
			this.kana = "カントキヤンテイタス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// コルセオヒール
		// ----------------------------------------------------------------
		// SKILL_ID_COLUCEO_HEAL
		defineSkill(SKILL_ID_COLUCEO_HEAL, function() {

			this.name = "コルセオヒール";
			this.kana = "コルセオヒイル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// エピクレシス
		// ----------------------------------------------------------------
		// SKILL_ID_EPICLESIS
		defineSkill(SKILL_ID_EPICLESIS, function() {

			this.name = "エピクレシス";
			this.kana = "エヒクレシス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// プラエファティオ
		// ----------------------------------------------------------------
		// SKILL_ID_PRAEFATIO
		defineSkill(SKILL_ID_PRAEFATIO, function() {

			this.name = "プラエファティオ";
			this.kana = "フラエファテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// オラティオ
		// ----------------------------------------------------------------
		// SKILL_ID_ORATIO
		defineSkill(SKILL_ID_ORATIO, function() {

			this.name = "オラティオ";
			this.kana = "オラテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 32 + 3 * skillLv;
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
		// ラウダアグヌス
		// ----------------------------------------------------------------
		// SKILL_ID_LAUDAAGNUS
		defineSkill(SKILL_ID_LAUDAAGNUS, function() {
			this.name = "ラウダアグヌス";
			this.kana = "ラウタアクヌス";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ラウダラムス
		// ----------------------------------------------------------------
		// SKILL_ID_LAUDARAMUS
		defineSkill(SKILL_ID_LAUDARAMUS, function() {
			this.name = "ラウダラムス";
			this.kana = "ラウタラムス";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// (仮)エウカリスティカ
		// ----------------------------------------------------------------
		// SKILL_ID_EUCHARISTICA
		defineSkill(SKILL_ID_EUCHARISTICA, function() {

			this.name = "(廃止)エウカリスティカ";
			this.kana = "エウカリステイカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// レノヴァティオ
		// ----------------------------------------------------------------
		// SKILL_ID_RENOVATIO
		defineSkill(SKILL_ID_RENOVATIO, function() {

			this.name = "レノヴァティオ";
			this.kana = "レノウアテイオ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ハイネスヒール
		// ----------------------------------------------------------------
		// SKILL_ID_HIGHNESS_HEAL
		defineSkill(SKILL_ID_HIGHNESS_HEAL, function() {

			this.name = "ハイネスヒール";
			this.kana = "ハイネスヒイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 2000 : (100 + 400 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// クリアランス
		// ----------------------------------------------------------------
		// SKILL_ID_CLEARANCE
		defineSkill(SKILL_ID_CLEARANCE, function() {

			this.name = "クリアランス";
			this.kana = "クリアランス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 48 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エクスピアティオ
		// ----------------------------------------------------------------
		// SKILL_ID_EXPIATIO
		defineSkill(SKILL_ID_EXPIATIO, function() {
			this.name = "エクスピアティオ";
			this.kana = "エクスヒアテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.LifeTime = function(skillLv, charaData) {
				return (5 + 5 * skillLv) * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// デュプレライト
		// ----------------------------------------------------------------
		// SKILL_ID_DUPLELIGHT
		defineSkill(SKILL_ID_DUPLELIGHT, function() {

			this.name = "デュプレライト";
			this.kana = "テユフレライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
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
		// シレンティウム
		// ----------------------------------------------------------------
		// SKILL_ID_SILENTIUM
		defineSkill(SKILL_ID_SILENTIUM, function() {

			this.name = "シレンティウム";
			this.kana = "シレンテイウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

		}),

		// ----------------------------------------------------------------
		// サクラメント
		// ----------------------------------------------------------------
		// SKILL_ID_SECRAMENT
		defineSkill(SKILL_ID_SECRAMENT, function() {

			this.name = "サクラメント";
			this.kana = "サクラメント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// デュプレライト(物理) グレイアムライト
		// ----------------------------------------------------------------
		// SKILL_ID_GRAHAM_LIGHT
		defineSkill(SKILL_ID_GRAHAM_LIGHT, function() {

			this.name = "グレイアムライト";
			this.kana = "クレイアムライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// デュプレライト(魔法) ミリアムライト
		// ----------------------------------------------------------------
		// SKILL_ID_MIRIAM_LIGHT
		defineSkill(SKILL_ID_MIRIAM_LIGHT, function() {

			this.name = "ミリアムライト";
			this.kana = "ミリアムライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// オフェルトリウム
		// ----------------------------------------------------------------
		// SKILL_ID_OFFERTORIUM
		defineSkill(SKILL_ID_OFFERTORIUM, function() {

			this.name = "オフェルトリウム";
			this.kana = "オフエルトリウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
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

];
