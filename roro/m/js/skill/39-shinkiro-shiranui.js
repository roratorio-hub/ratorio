/**
 * スキル定義 39-shinkiro-shiranui（SKILL_ID 1253–1291 / 39 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { GetTotalSpecStatus } from '../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { HtmlGetObjectValueByIdAsInteger } from '../../../common/js/util.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ELM_ID_VANITY } from '../const/EnumElmId.js';
import { ITEM_SP_ELEMENTAL } from '../const/EnumItemSpId.js';
import {
    MIG_PARAM_ID_CON, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL
} from '../const/EnumMigItemParamId.js';
import { MONSTER_DATA_INDEX_SIZE } from '../const/EnumMonsterDataIndex.js';
import { SIZE_ID_LARGE, SIZE_ID_MEDIUM, SIZE_ID_SMALL } from '../const/EnumSizeId.js';
import { GetEquippedTotalSPArrow } from '../foot-bridge.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../skill-search-bridge.js';
import {
    SKILL_ID_ABYSS_DAGGER_STATE, SKILL_ID_AKUMU_KESHI, SKILL_ID_ANTEN_HOU, SKILL_ID_ANTEN_HOU_LEARNED_LEVEL,
    SKILL_ID_AUTO_FIRING_LAUNCHER, SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL, SKILL_ID_BREAKING_LIMIT,
    SKILL_ID_BREAKING_LIMIT_STATE, SKILL_ID_DOKUGAKU_MADOGAKU, SKILL_ID_DOKUGAKU_SENTOGAKU, SKILL_ID_GENJUTSU_KUNAI,
    SKILL_ID_GENZYUTSU_ANKOKURYUU, SKILL_ID_GOLDENE_TONE, SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL,
    SKILL_ID_GRENADE_FRAGMENT, SKILL_ID_GROUND_GRAVITATION, SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL,
    SKILL_ID_JACK_FROST_NOVA, SKILL_ID_KAGEMOGURI, SKILL_ID_KAGETOKI, SKILL_ID_KINNRYUU_HOU, SKILL_ID_KUNAI_KAITEN,
    SKILL_ID_KUNAI_KUSSETSU, SKILL_ID_KUNAI_WAIKYOKU, SKILL_ID_NYANTOMO_KAMESETSU, SKILL_ID_PSYCHIC_STREAM,
    SKILL_ID_RAIDEN_HOU, SKILL_ID_RAINBOW_HORN, SKILL_ID_REIKETSU_HOU, SKILL_ID_RULE_BREAK,
    SKILL_ID_RULE_BREAK_STATE, SKILL_ID_RURTLE_RAMPAGE, SKILL_ID_RYUSE_RAKKA_TSUIGEKI, SKILL_ID_SEKIEN_HOU,
    SKILL_ID_SHIELD_CHAIN_RUSH, SKILL_ID_SHINKIRO_BUNSHIN, SKILL_ID_SHIZEN_SHINWA, SKILL_ID_SPIRAL_PIERCE_MAX,
    SKILL_ID_STEEL_CROW, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, SKILL_ID_TEMPERING, SKILL_ID_TURTLE_SPRINKLER,
    SKILL_ID_WILD_WALK
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 赤炎砲
		// ----------------------------------------------------------------
		// SKILL_ID_SEKIEN_HOU
		defineSkill(SKILL_ID_SEKIEN_HOU, function() {
			this.name = "赤炎砲";
			this.kana = "セキエンホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 冷血砲
		// ----------------------------------------------------------------
		// SKILL_ID_REIKETSU_HOU
		defineSkill(SKILL_ID_REIKETSU_HOU, function() {

			this.name = "冷血砲";
			this.kana = "レイケツホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 250;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 雷電砲
		// ----------------------------------------------------------------
		// SKILL_ID_RAIDEN_HOU
		defineSkill(SKILL_ID_RAIDEN_HOU, function() {

			this.name = "雷電砲";
			this.kana = "ライテンホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 金龍砲
		// ----------------------------------------------------------------
		// SKILL_ID_KINNRYUU_HOU
		defineSkill(SKILL_ID_KINNRYUU_HOU, function() {

			this.name = "金龍砲";
			this.kana = "キンリユウホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 暗転砲
		// ----------------------------------------------------------------
		// SKILL_ID_ANTEN_HOU
		defineSkill(SKILL_ID_ANTEN_HOU, function() {
			this.name = "暗転砲";
			this.kana = "アンテンホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (parentSkillId == undefined) {
					// 本体の攻撃
					ratio = 5750 + 350 * skillLv;						// 基本倍率
					ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// spl補正
					ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
				} else {
					// 暗転砲の習得Lv
					const anten_hou_lv = Math.max(LearnedSkillSearch(SKILL_ID_ANTEN_HOU), UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL), skillLv);
					// 分身の追撃
					if (anten_hou_lv == 0) {
						ratio = 0;
					} else {
						ratio = 5750 + 350 * anten_hou_lv;					// 基本倍率
						ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// spl補正
						ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
						ratio = Math.floor(ratio * 30 / 100);				// 分身の威力は30%
						ratio *= option.GetOptionValue(0);					// 分身の数
					}
				}
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 幻術 -暗黒龍-
		// ----------------------------------------------------------------
		// SKILL_ID_GENZYUTSU_ANKOKURYUU
		defineSkill(SKILL_ID_GENZYUTSU_ANKOKURYUU, function() {
			this.name = "幻術 -暗黒龍-";
			this.kana = "ケンシユツアンコクリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.dispHitCount = 4;	// 分割ヒット4
			this.element = function(option, mobData, parentSkillId) {
				if (parentSkillId == undefined) {
					// 初撃
					return CSkillData.ELEMENT_FORCE_DARK;
				} else {
					// 追撃
					return CSkillData.ELEMENT_FORCE_FIRE;
				}
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (parentSkillId == undefined) {
					// 初撃
					ratio = 27000;
				} else {
					// 追撃 
					ratio = 17000;
				}
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 410;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 暗転砲の習得Lv
		// ----------------------------------------------------------------
		// SKILL_ID_ANTEN_HOU_LEARNED_LEVEL
		defineSkill(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL, function() {
			this.name = "暗転砲の習得Lv";
			this.kana = "アンテンホウノシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の日 判定用
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, function() {

			this.name = "太陽と月と星の日";
			this.kana = "タイヨウトツキトホシノヒ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 影潜り
		// ----------------------------------------------------------------
		// SKILL_ID_KAGEMOGURI
		defineSkill(SKILL_ID_KAGEMOGURI, function() {
			this.name = "影潜り";
			this.kana = "カケモクリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 130;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 影溶き
		// ----------------------------------------------------------------
		// SKILL_ID_KAGETOKI
		defineSkill(SKILL_ID_KAGETOKI, function() {
			this.name = "影溶き";
			this.kana = "カケトキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
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
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 苦無 -歪曲-
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_WAIKYOKU
		defineSkill(SKILL_ID_KUNAI_WAIKYOKU, function() {
			this.name = "苦無 -歪曲-";
			this.kana = "クナイワイキヨク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = function(skillLv, charaDataManger, option, parentSkillId) {
				// 本体 分割2Hit 分身 分割3Hit
				return parentSkillId == undefined ? 2 : 3;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 苦無 -屈折-の習得Lv
				const kunai_kussetsu_lv = Math.max(LearnedSkillSearch(SKILL_ID_KUNAI_KUSSETSU), option.GetOptionValue(1));
				// ダメージ倍率
				ratio = 6700 + 100 * skillLv;						// 基本倍率
				ratio += 77 * skillLv * kunai_kussetsu_lv;			// 参照スキル習得Lv補正
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				ratio = Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
				if (parentSkillId == undefined) {
					// 本体
					return ratio;
				} else {
					// 分身
					ratio = Math.floor(ratio * 30 / 100);
					return ratio * option.GetOptionValue(0);
				}
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 5000;
			}
		}),

		// ----------------------------------------------------------------
		// 苦無 -回転-
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_KAITEN
		defineSkill(SKILL_ID_KUNAI_KAITEN, function() {
			this.name = "苦無 -回転-";
			this.kana = "クナイカイテン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 3;
			this.ground_installation = true;
			this.damageInterval = 500;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 苦無 -歪曲-の習得Lv
				const kunai_waikyoku_lv = Math.max(LearnedSkillSearch(SKILL_ID_KUNAI_WAIKYOKU), option.GetOptionValue(0));
				// ダメージ倍率
				ratio = 2300 + 200 * skillLv;							// 基本倍率
				ratio += 66 * skillLv * kunai_waikyoku_lv;				// 参照スキル習得Lv補正
				ratio += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);		// 特性ステータス補正
				return Math.floor(ratio * n_A_BaseLV / 100);			// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
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
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 苦無 -屈折-
		// ----------------------------------------------------------------
		// SKILL_ID_KUNAI_KUSSETSU
		defineSkill(SKILL_ID_KUNAI_KUSSETSU, function() {
			this.name = "苦無 -屈折-";
			this.kana = "クナイクツセツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.ground_installation = true;
			this.damageInterval = 250;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// ダメージ倍率
				ratio = 750 + 50 * skillLv;							// 基本倍率
				ratio += 25 * skillLv * 5;							// 参照スキル習得Lv補正（前提スキル条件につき 5 で固定）
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
				return Math.floor(ratio * n_A_BaseLV / 100);		// BaseLv補正
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
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
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 2000;
			}
		}),

		// ----------------------------------------------------------------
		// 幻術 -苦無-
		// ----------------------------------------------------------------
		// SKILL_ID_GENJUTSU_KUNAI
		defineSkill(SKILL_ID_GENJUTSU_KUNAI, function() {
			this.name = "幻術 -苦無-";
			this.kana = "ケンシユツクナイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 8;	// 分割ヒット8
			this.Power = function(skillLv, charaData, option, mobData) {
				let ratio = 52000;
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				ratio = Math.floor(ratio * n_A_BaseLV / 100);
				// 悪夢の場合
				if (option.GetOptionValue(0) == 1) {
					ratio *= 1.5;
				}				
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 280;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),
		
		// ----------------------------------------------------------------
		// シールドチェーンラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHAIN_RUSH
		defineSkill(SKILL_ID_SHIELD_CHAIN_RUSH, function() {
			this.name = "シールドチェーンラッシュ";
			this.kana = "シイルトチエエンラツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 5;
			this.Power = function(skillLv, charaData, option) {
				// 基本倍率
				const sentogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU));
				const breaking_limit_lv = UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE);
				let ratio = 9250 + 300 * skillLv;											// 基礎倍率
				ratio += 3 * skillLv * sentogaku;											// 習得済みスキル条件
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);							// 特性ステータス補正
				ratio *= n_A_BaseLV / 100;													// BaseLv補正
				ratio = Math.floor(ratio);
				// 最終倍率
				ratio *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][sentogaku] / 100;	// 独学補正
				ratio = Math.floor(ratio);
				ratio *= [100, 150][breaking_limit_lv] / 100;			// ブレイキングリミット補正
				return Math.floor(ratio);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// スパイラルピアースマックス
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRAL_PIERCE_MAX
		defineSkill(SKILL_ID_SPIRAL_PIERCE_MAX, function() {
			this.name = "スパイラルピアースマックス";
			this.kana = "スハイラルヒアアスマツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.element = CSkillData.ELEMENT_VOID;
			this.range = CSkillData.RANGE_LONG;
			this.dispHitCount = 5;
			this.Power = function(skillLv, charaData, option, mobData) {
				// 基本倍率
				let ratio = 10750 + 350 * skillLv;
				const sentogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU));
				ratio += 3 * skillLv * sentogaku;
				// サイズ補正 (POWには掛からない)
				const size_ratio = [
					{ id: SIZE_ID_LARGE, ratio: 1.2 },
					{ id: SIZE_ID_MEDIUM, ratio: 1.3 },
					{ id: SIZE_ID_SMALL, ratio: 1.5 },
				];
				ratio *= size_ratio.find(item => item.id === mobData[MONSTER_DATA_INDEX_SIZE]).ratio;
				ratio += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);																		// 特性ステータス補正
				ratio *= n_A_BaseLV / 100;																								// BaseLv補正
				ratio = Math.floor(ratio);
				// 最終倍率
				ratio *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][sentogaku] / 100;	// 独学補正
				ratio = Math.floor(ratio);
				const breaking_limit_lv = UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE);
				ratio *= [100, 150][breaking_limit_lv] / 100;	// ブレイキングリミット補正
				return Math.floor(ratio);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ジャックフロストノヴァ
		// ----------------------------------------------------------------
		// SKILL_ID_JACK_FROST_NOVA
		defineSkill(SKILL_ID_JACK_FROST_NOVA, function() {

			this.name = "ジャックフロストノヴァ";
			this.kana = "シヤツクフロストノウア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 150 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// グラウンドグラビテーション
		// ----------------------------------------------------------------
		// SKILL_ID_GROUND_GRAVITATION
		defineSkill(SKILL_ID_GROUND_GRAVITATION, function() {
			this.name = "グラウンドグラビテーション";
			this.kana = "クラウントクラヒテエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.dispHitCount = function(skillLv, charaData, option) {
				// 初撃なら分割2Hit
				return option.GetOptionValue(0) == 0 ? 2 : 1;
			}
			this.ground_installation = function(option) {
				return option.GetOptionValue(0) == 1;
			}
			this.damageInterval = 500;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				// ダメージ計算
				let ratio = 0;
				let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
				if (option.GetOptionValue(0) === 0) {
					// 初撃ダメージ計算が指定された場合 (独学補正は掛からない)
					ratio = 850 + 50 * skillLv;											// 基礎倍率
					ratio += 4 * skillLv * madogaku;										// 習得済みスキル条件
					ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);						// 特性ステータス補正
					ratio = Math.floor(ratio * n_A_BaseLV / 100);
				} else {
					// 基本倍率
					ratio = 400 + 10 * skillLv;											// 基礎倍率
					ratio += 2 * skillLv * madogaku;										// 習得済みスキル条件
					ratio += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);						// 特性ステータス補正
					ratio = Math.floor(ratio * n_A_BaseLV / 100);
					ratio = Math.floor(ratio * [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100);	// 独学補正
				}
				if (UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE) > 0) {
					ratio *= 3;
				}
				return Math.floor(ratio);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 700 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 150 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.LifeTime = function(skillLv, charaData) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// ブレイキングリミット状態
		// ----------------------------------------------------------------
		// SKILL_ID_BREAKING_LIMIT_STATE
		defineSkill(SKILL_ID_BREAKING_LIMIT_STATE, function() {

			this.name = "(×)ブレイキングリミット状態";
			this.kana = "フレイキンクリミツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ルールブレイク状態
		// ----------------------------------------------------------------
		// SKILL_ID_RULE_BREAK_STATE
		defineSkill(SKILL_ID_RULE_BREAK_STATE, function() {

			this.name = "(×)ルールブレイク状態";
			this.kana = "ルウルフレイク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アビスダガー状態
		// ----------------------------------------------------------------
		// SKILL_ID_ABYSS_DAGGER_STATE
		defineSkill(SKILL_ID_ABYSS_DAGGER_STATE, function() {
			this.name = "アビスダガー状態";
			this.kana = "アビスダガー";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// レインボーホーン
		// ----------------------------------------------------------------
		// SKILL_ID_RAINBOW_HORN
		defineSkill(SKILL_ID_RAINBOW_HORN, function() {
			this.name = "レインボーホーン";
			this.kana = "レインボーホーン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				if (skillLv == 7) {
					return 0;
				}
				return 10000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// タートルスプリンクラー
		// ----------------------------------------------------------------
		// SKILL_ID_TURTLE_SPRINKLER
		defineSkill(SKILL_ID_TURTLE_SPRINKLER, function() {
			this.name = "タートルスプリンクラー";
			this.kana = "タートルスプリンクラー";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 3000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// タートルランページ
		// ----------------------------------------------------------------
		// SKILL_ID_RURTLE_RAMPAGE
		defineSkill(SKILL_ID_RURTLE_RAMPAGE, function() {
			this.name = "タートルランページ";
			this.kana = "タートルランページ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {		// 持続時間
				return [0, 1, 1, 2, 2, 3, 3, 4][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// にゃん友 -亀設-
		// ----------------------------------------------------------------
		// SKILL_ID_NYANTOMO_KAMESETSU
		defineSkill(SKILL_ID_NYANTOMO_KAMESETSU, function() {

			this.name = "にゃん友 -亀設-";
			this.kana = "ニヤントモカメセツ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 蜃気楼分身
		// ----------------------------------------------------------------
		// SKILL_ID_SHINKIRO_BUNSHIN
		defineSkill(SKILL_ID_SHINKIRO_BUNSHIN, function() {

			this.name = "蜃気楼分身";
			this.kana = "シンキロウフンシン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 60;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// 悪夢消し
		// ----------------------------------------------------------------
		// SKILL_ID_AKUMU_KESHI
		defineSkill(SKILL_ID_AKUMU_KESHI, function() {

			this.name = "悪夢消し";
			this.kana = "アクムケシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 10;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ブレイキングリミット
		// ----------------------------------------------------------------
		// SKILL_ID_BREAKING_LIMIT
		defineSkill(SKILL_ID_BREAKING_LIMIT, function() {
			this.name = "ブレイキングリミット";
			this.kana = "フレイキンクリミツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),


		// ----------------------------------------------------------------
		// ルールブレイク
		// ----------------------------------------------------------------
		// SKILL_ID_RULE_BREAK
		defineSkill(SKILL_ID_RULE_BREAK, function() {
			this.name = "ルールブレイク";
			this.kana = "ルウルフレイク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 140;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
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

		// ----------------------------------------------------------------
		// オートファイアリングランチャー
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_FIRING_LAUNCHER
		defineSkill(SKILL_ID_AUTO_FIRING_LAUNCHER, function() {
			this.name = "オートファイアリングランチャー";
			this.kana = "オオトフアイアリンクランチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 200;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return [0,240,180,120,90,60][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// ベーシックグレネード 習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL
		defineSkill(SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL, function() {
			this.name = "ベーシックグレネード習得レベル";
			this.kana = "ヘエシツククレネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ヘイスティファイアインザホール 習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL
		defineSkill(SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL, function() {
			this.name = "ヘイスティファイアインザホール習得レベル";
			this.kana = "ヘイステイフアイアインサホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// グレネーズドロッピング 習得レベル
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL
		defineSkill(SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL, function() {
			this.name = "グレネーズドロッピング習得レベル";
			this.kana = "クレネエストロツヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// グレネードフラグメント
		// ----------------------------------------------------------------
		// SKILL_ID_GRENADE_FRAGMENT
		defineSkill(SKILL_ID_GRENADE_FRAGMENT, function() {
			this.name = "グレネードフラグメント";
			this.kana = "クレネエトフラクメント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** ゴールデントーン */
		// SKILL_ID_GOLDENE_TONE
		defineSkill(SKILL_ID_GOLDENE_TONE, function() {
			this.name = "ゴールデントーン";
			this.kana = "ゴールデントーン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 115 + 9 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 120 * 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (10 + 5 * skillLv) * 1000;
			}
		}),

		/** テンパリング */
		// SKILL_ID_TEMPERING
		defineSkill(SKILL_ID_TEMPERING, function() {
			this.name = "テンパリング";
			this.kana = "テンパリング";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 75 + 8 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return (10 + 5 * skillLv) * 1000;
			}
		}),

		/** サイキックストリーム */
		// SKILL_ID_PSYCHIC_STREAM
		defineSkill(SKILL_ID_PSYCHIC_STREAM, function() {
			this.name = "サイキックストリーム";
			this.kana = "サイキックストリーム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			// 「使用条件 : 「エナジーコート」状態 ではない」を厳密に処理するメリットがないと思うので無条件使用可
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = 4500 + 4500 * skillLv;
				ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 420;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 5500 + 800 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
		}),

		/** ワイルドウォーク */
		// SKILL_ID_WILD_WALK
		defineSkill(SKILL_ID_WILD_WALK, function() {
			this.name = "ワイルドウォーク";
			this.kana = "ワイルドウォーク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = function(option) {
				// 属性付与を優先する
				let value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", ELM_ID_VANITY);
				if (value === ELM_ID_VANITY) {
					// 付与されていなければ矢の属性を適用する
					value = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
				}
				return value;
			}
			this.Power = function(skillLv, charaData) {       // スキル倍率
				let ratio = -500 + 1000 * skillLv;
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				const shizen_shinwa_lv = Math.max(LearnedSkillSearch(SKILL_ID_SHIZEN_SHINWA), UsedSkillSearch(SKILL_ID_SHIZEN_SHINWA));
				const steel_crow_lv = Math.max(LearnedSkillSearch(SKILL_ID_STEEL_CROW), UsedSkillSearch(SKILL_ID_STEEL_CROW));
				ratio += 300 * (shizen_shinwa_lv + steel_crow_lv);
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 5;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000 * skillLv;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
