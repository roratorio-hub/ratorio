/**
 * スキル定義 archer/4b-minstrel-wanderer（29 件 / SKILL_ID 631〜894 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_BaseLV } from "../../ro4-state.js";
import { HtmlGetObjectValueByIdAsInteger } from '../../../roro/common/js/util.js';
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { ELM_ID_VANITY } from "../../const/EnumElmId.js";
import { ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP } from "../../const/EnumItemKind.js";
import { ITEM_SP_ELEMENTAL } from "../../const/EnumItemSpId.js";
import { GetEquippedTotalSPArrow } from "../../foot-bridge.js";
import { MOB_CONF_DEBUF_ID_SUIMIN } from "../../mobconfdebuf.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../../mobconfplayer.js";
import { n_A_AGI, n_A_DEX } from "../../roro-state.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_BEYOND_OF_WARCRY, SKILL_ID_DANCE_WITH_WUG, SKILL_ID_DOMINION_IMPULSE, SKILL_ID_ECHONO_UTA,
    SKILL_ID_ENDLESS_HUMMING_VOICE, SKILL_ID_FRIDAY_NIGHT_FEVER, SKILL_ID_FRIGNO_UTA, SKILL_ID_FUKAKUTEYOSONO_GENGO,
    SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI, SKILL_ID_GREAT_ECHO, SKILL_ID_HARMONIZE,
    SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY, SKILL_ID_LERAORNO_TSUYU, SKILL_ID_LESSON, SKILL_ID_MANANO_UTA,
    SKILL_ID_MELANCHOLY, SKILL_ID_MELODY_OF_THINK, SKILL_ID_METALIC_SOUND, SKILL_ID_SEISHINO_SAKAIDE,
    SKILL_ID_SEVERE_RAINSTORM, SKILL_ID_SEVERE_RAINSTORM_EX, SKILL_ID_SHINDOZANKYO, SKILL_ID_SIRENNO_KOE,
    SKILL_ID_SOUND_OF_DESTRUCTION, SKILL_ID_SWING_DANCE, SKILL_ID_TSUKIAKARINO_SERENADE,
    SKILL_ID_YASURAGINO_KOMORIUTA, SKILL_ID_ZIGOKUNO_UTA, SKILL_ID_ZYUNKANSURU_SIZENNO_OTO
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// レッスン
		// ----------------------------------------------------------------
		// SKILL_ID_LESSON
		defineSkill(SKILL_ID_LESSON, function() {

			this.name = "レッスン";
			this.kana = "レツスン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 安らぎの子守唄
		// ----------------------------------------------------------------
		// SKILL_ID_YASURAGINO_KOMORIUTA
		defineSkill(SKILL_ID_YASURAGINO_KOMORIUTA, function() {

			this.name = "安らぎの子守唄";
			this.kana = "ヤスラキノコモリウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
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
				return 10000;
			}

		}),

		// ----------------------------------------------------------------
		// 地獄の歌
		// ----------------------------------------------------------------
		// SKILL_ID_ZIGOKUNO_UTA
		defineSkill(SKILL_ID_ZIGOKUNO_UTA, function() {

			this.name = "地獄の歌";
			this.kana = "シコクノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
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
		// 不確定要素の言語
		// ----------------------------------------------------------------
		// SKILL_ID_FUKAKUTEYOSONO_GENGO
		defineSkill(SKILL_ID_FUKAKUTEYOSONO_GENGO, function() {

			this.name = "不確定要素の言語";
			this.kana = "フカクテイヨウソノケンコ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
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
		// メランコリー
		// ----------------------------------------------------------------
		// SKILL_ID_MELANCHOLY
		defineSkill(SKILL_ID_MELANCHOLY, function() {

			this.name = "メランコリー";
			this.kana = "メランコリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
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
		// セイレーンの声
		// ----------------------------------------------------------------
		// SKILL_ID_SIRENNO_KOE
		defineSkill(SKILL_ID_SIRENNO_KOE, function() {

			this.name = "セイレーンの声";
			this.kana = "セイレエンノコエ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
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
		// 循環する自然の音
		// ----------------------------------------------------------------
		// SKILL_ID_ZYUNKANSURU_SIZENNO_OTO
		defineSkill(SKILL_ID_ZYUNKANSURU_SIZENNO_OTO, function() {

			this.name = "循環する自然の音";
			this.kana = "シユンカンスルシセンノオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 4 * skillLv;
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
		// 生死の境で
		// ----------------------------------------------------------------
		// SKILL_ID_SEISHINO_SAKAIDE
		defineSkill(SKILL_ID_SEISHINO_SAKAIDE, function() {

			this.name = "生死の境で";
			this.kana = "セイシノサカイテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 47 + 3 * skillLv;
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
		// 振動残響
		// ----------------------------------------------------------------
		// SKILL_ID_SHINDOZANKYO
		defineSkill(SKILL_ID_SHINDOZANKYO, function() {
			this.name = "振動残響";
			this.kana = "シントウサンキヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option, mobData) {
				// 属性付与を優先する
				let value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", ELM_ID_VANITY);
				if (value === ELM_ID_VANITY) {
					// 付与されていなければ矢の属性を適用する
					value = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL, mobData);
				}
				return value;
			}
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL].includes(weapon);
			}
			this.dispHitCount = function(skillLv, charaData) {
				return 10;
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 0;
				if (option.GetOptionValue(0) === 1) {
					// サウンドブレンド状態 ON
					ratio = 1000 + 400 * skillLv;
				} else {
					// サウンドブレンド状態 OFF
					ratio = 1000 + 200 * skillLv;
				}
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}
		}),

		// ----------------------------------------------------------------
		// ドミニオンインパルス
		// ----------------------------------------------------------------
		// SKILL_ID_DOMINION_IMPULSE
		defineSkill(SKILL_ID_DOMINION_IMPULSE, function() {

			this.name = "ドミニオンインパルス";
			this.kana = "トミニオンインハルス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
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
		// メタリックサウンド
		// ----------------------------------------------------------------
		// SKILL_ID_METALIC_SOUND
		defineSkill(SKILL_ID_METALIC_SOUND, function() {

			this.name = "(△)メタリックサウンド";
			this.kana = "メタリツクサウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				// 基本式
				pow = 120 * skillLv;
				// 「ミンストレル・ワンダラー レッスン」の習得レベルによる補正
				pow += 60 * Math.max(LearnedSkillSearch(SKILL_ID_LESSON), UsedSkillSearch(SKILL_ID_LESSON));
				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);
				// 「モンスター状態異常 睡眠」による補正
				if (charaDataManger.GetMobDebuf(MOB_CONF_DEBUF_ID_SUIMIN)) {
					pow = Math.floor(pow * 150 / 100);
				}
				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + Math.floor((skillLv + 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(3000, 500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		}),

		// ----------------------------------------------------------------
		// シビアレインストーム
		// ----------------------------------------------------------------
		// SKILL_ID_SEVERE_RAINSTORM
		defineSkill(SKILL_ID_SEVERE_RAINSTORM, function() {
			this.name = "シビアレインストーム";
			this.kana = "シヒアレインストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL, ITEM_KIND_BOW].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				if ([ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon)) {
					ratio = 200 * skillLv;
				} else {
					ratio = 100 * skillLv;
				}
				ratio += Math.floor((n_A_DEX + n_A_AGI) / 2);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.ground_installation = true;
			this.LifeTime = function(skillLv, charaData) {
				return 3600;
			}
			this.damageInterval = function(skillLv) {
				return 300;
			}
		}),

		// ----------------------------------------------------------------
		// 風車に向かって突撃
		// ----------------------------------------------------------------
		// SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI
		defineSkill(SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI, function() {

			this.name = "風車に向かって突撃";
			this.kana = "フウシヤニムカツテトツケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 76 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// エコーの歌
		// ----------------------------------------------------------------
		// SKILL_ID_ECHONO_UTA
		defineSkill(SKILL_ID_ECHONO_UTA, function() {

			this.name = "エコーの歌";
			this.kana = "エコオノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// ハーモナイズ
		// ----------------------------------------------------------------
		// SKILL_ID_HARMONIZE
		defineSkill(SKILL_ID_HARMONIZE, function() {

			this.name = "ハーモナイズ";
			this.kana = "ハアモナイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 65 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 月明かりのセレナーデ
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKIAKARINO_SERENADE
		defineSkill(SKILL_ID_TSUKIAKARINO_SERENADE, function() {

			this.name = "月明かりのセレナーデ";
			this.kana = "ツキアカリノセレナアテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 72 + 12 * skillLv;
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
		// 恋人たちの為のシンフォニー
		// ----------------------------------------------------------------
		// SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY
		defineSkill(SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY, function() {

			this.name = "恋人たちの為のシンフォニー";
			this.kana = "コイヒトタチノタメノシンフオニイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 51 + 9 * skillLv;
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
		// スイングダンス
		// ----------------------------------------------------------------
		// SKILL_ID_SWING_DANCE
		defineSkill(SKILL_ID_SWING_DANCE, function() {

			this.name = "スイングダンス";
			this.kana = "スインクタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 16 * skillLv;
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
		// レーラズの霧
		// ----------------------------------------------------------------
		// SKILL_ID_LERAORNO_TSUYU
		defineSkill(SKILL_ID_LERAORNO_TSUYU, function() {

			this.name = "レーラズの霧";
			this.kana = "レエラスノツユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
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
		// ビヨンドオブウォークライ
		// ----------------------------------------------------------------
		// SKILL_ID_BEYOND_OF_WARCRY
		defineSkill(SKILL_ID_BEYOND_OF_WARCRY, function() {

			this.name = "ビヨンドオブウォークライ";
			this.kana = "ヒヨントオフウオオクライ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
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
		// マナの歌
		// ----------------------------------------------------------------
		// SKILL_ID_MANANO_UTA
		defineSkill(SKILL_ID_MANANO_UTA, function() {

			this.name = "マナの歌";
			this.kana = "マナノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
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
		// メロディーオブシンク
		// ----------------------------------------------------------------
		// SKILL_ID_MELODY_OF_THINK
		defineSkill(SKILL_ID_MELODY_OF_THINK, function() {

			this.name = "メロディーオブシンク";
			this.kana = "メロテイイオフシンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
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
		// ダンスウィズウォーグ
		// ----------------------------------------------------------------
		// SKILL_ID_DANCE_WITH_WUG
		defineSkill(SKILL_ID_DANCE_WITH_WUG, function() {

			this.name = "ダンスウィズウォーグ";
			this.kana = "タンスウイスウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
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
		// フライデーナイトフィーバー
		// ----------------------------------------------------------------
		// SKILL_ID_FRIDAY_NIGHT_FEVER
		defineSkill(SKILL_ID_FRIDAY_NIGHT_FEVER, function() {

			this.name = "フライデーナイトフィーバー";
			this.kana = "フライテエナイトフイイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 140 + 10 * skillLv;
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
		// サウンドオブディストラクション
		// ----------------------------------------------------------------
		// SKILL_ID_SOUND_OF_DESTRUCTION
		defineSkill(SKILL_ID_SOUND_OF_DESTRUCTION, function() {

			this.name = "サウンドオブディストラクション";
			this.kana = "サウントオフテイストラクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
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
		// エンドレスハミングボイス
		// ----------------------------------------------------------------
		// SKILL_ID_ENDLESS_HUMMING_VOICE
		defineSkill(SKILL_ID_ENDLESS_HUMMING_VOICE, function() {

			this.name = "エンドレスハミングボイス";
			this.kana = "エントレスハミンクホイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 100000 + 10000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// グレートエコー
		// ----------------------------------------------------------------
		// SKILL_ID_GREAT_ECHO
		defineSkill(SKILL_ID_GREAT_ECHO, function() {
			this.name = "グレートエコー";
			this.kana = "クレエトエコオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL].includes(weapon);
			}
			this.Power = function(skillLv, charaDataManger, option) {
				let ratio = 0;
				ratio = 250 + 500 * skillLv;
				if (option.GetOptionValue(0) > 0) {
					// パートナーがいる場合
					ratio *= 2;
				}
				ratio += 50 * Math.max(LearnedSkillSearch(SKILL_ID_LESSON), UsedSkillSearch(SKILL_ID_LESSON));
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// シビアレインストーム(特殊)
		// ----------------------------------------------------------------
		// SKILL_ID_SEVERE_RAINSTORM_EX
		defineSkill(SKILL_ID_SEVERE_RAINSTORM_EX, function() {
			this.refId = SKILL_ID_SEVERE_RAINSTORM;
			this.name = "シビアレインストーム(特殊)";
			this.kana = "シヒアレインストオムトクシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL, ITEM_KIND_BOW].includes(weapon);
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon) {
				let ratio = 0;
				if ([ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(weapon)) {
					ratio = 200 * skillLv;
				} else {
					ratio = 100 * skillLv;
				}
				ratio += Math.floor((option.GetOptionValue(0) + option.GetOptionValue(1)) / 2);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 500 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000;
			}
			this.ground_installation = true;
			this.LifeTime = function(skillLv, charaData) {
				return 3600;
			}
			this.damageInterval = function(skillLv) {
				return 300;
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

];
