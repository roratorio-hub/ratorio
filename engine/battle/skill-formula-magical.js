/**
 * BattleCalc999Core「魔法判定スキル」ブロックの分割（Phase 3b）。
 *
 * 物理基本/特殊計算式のいずれにも該当しなかった場合に呼ばれる最後のブロック。
 * 元のコードにも switch に default 節が無く「該当なしなら何もせず w_DMG を
 * そのまま返す」という無条件 return だったため、他の2ブロックと違って
 * undefined センチネルへの変換は不要（バイト単位で完全に不変）。
 */
import { CSkillData } from "../skill/CSkillManager.js";
import {
    ELM_ID_DARK, ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_POISON, ELM_ID_PSYCO, ELM_ID_VANITY, ELM_ID_WATER, ELM_ID_WIND
} from "../const/EnumElmId.js";
import { EQUIP_REGION_ID_SHIELD } from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_SPBEGIN } from "../const/EnumItemDataIndex.js";
import { MIG_PARAM_ID_CON, MIG_PARAM_ID_SPL } from "../const/EnumMigItemParamId.js";
import { MONSTER_DATA_INDEX_RACE } from "../const/EnumMonsterDataIndex.js";
import { RACE_ID_DEMON, RACE_ID_UNDEAD } from "../const/EnumRaceId.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";
import { ItemObjNew } from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_DEBUF_ID_SHIRYO_HYOI, MOB_CONF_DEBUF_ID_SOUND_BLEND, MOB_CONF_DEBUF_ID_SUIMIN, n_B_IJYOU
} from "../monster/mobconfdebuf.js";
import { n_A_Equip, n_A_INT, n_A_JobLV, n_A_MATK, n_A_WeaponType } from "../runtime/roro-state.js";
import {
    SERE_SUPPORT_SKILL_ID_AQUA_PLAY, SERE_SUPPORT_SKILL_ID_COLD_FORCE, SERE_SUPPORT_SKILL_ID_CURSED_SOIL,
    SERE_SUPPORT_SKILL_ID_DEEP_POISONING, SERE_SUPPORT_SKILL_ID_EARTH_CARE, SERE_SUPPORT_SKILL_ID_FLAME_TECHNIQUE,
    SERE_SUPPORT_SKILL_ID_GRACE_BREEZE, SERE_SUPPORT_SKILL_ID_GUST, SERE_SUPPORT_SKILL_ID_PETROLOGY,
    SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC, SKILL_ID_ABYSS_FLAME, SKILL_ID_ABYSS_SQUARE, SKILL_ID_ADORAMUS,
    SKILL_ID_ALL_BLOOM, SKILL_ID_ANTEN_HOU, SKILL_ID_ANTEN_HOU_LEARNED_LEVEL, SKILL_ID_ARBITRIUM,
    SKILL_ID_AROUND_FLOWER, SKILL_ID_ASTRAL_STRIKE, SKILL_ID_BYAKKO_FU, SKILL_ID_CHILLING_BLAST, SKILL_ID_CLIMAX,
    SKILL_ID_CLOUD_KILL, SKILL_ID_COLD_BOLT, SKILL_ID_COMMET, SKILL_ID_CONFLAGRATION, SKILL_ID_CROSS_RAIN,
    SKILL_ID_CRYMSON_ARROW, SKILL_ID_CRYMSON_ROCK, SKILL_ID_CRYSTAL_IMPACT, SKILL_ID_CUTTING_WIND,
    SKILL_ID_DARK_STRIKE, SKILL_ID_DEADLY_PROJECTION, SKILL_ID_DEER_BREEZE, SKILL_ID_DEER_CANON,
    SKILL_ID_DEMONIC_FIRE, SKILL_ID_DESTRACTIVE_HURRICANE, SKILL_ID_DIAMOND_DUST, SKILL_ID_DIAMOND_STORM,
    SKILL_ID_DIVINUS_FLOS, SKILL_ID_DOKUGAKU_MADOGAKU, SKILL_ID_DRAIN_LIFE, SKILL_ID_EARTH_DRILL,
    SKILL_ID_EARTH_FLOWER, SKILL_ID_EARTH_GRAVE, SKILL_ID_EARTH_SPIKE, SKILL_ID_EARTH_STAMP, SKILL_ID_EARTH_STRAIN,
    SKILL_ID_ELECTRIC_WALK, SKILL_ID_ELEMENTAL_BASTER, SKILL_ID_ESFU, SKILL_ID_ESHA, SKILL_ID_ESMA, SKILL_ID_ESPA,
    SKILL_ID_ESTIN, SKILL_ID_ESTON, SKILL_ID_FIDOS_ANIMUS, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_BOLT,
    SKILL_ID_FIRE_WALK, SKILL_ID_FIRE_WALL, SKILL_ID_FLORAL_FLARE_ROAD, SKILL_ID_FROM_THE_ABYSS,
    SKILL_ID_FROST_DIVER, SKILL_ID_FROST_MISTY, SKILL_ID_FROST_NOVA, SKILL_ID_FROST_WEAPON, SKILL_ID_FROZEN_SLASH,
    SKILL_ID_FUKYOWAON,
    SKILL_ID_FURIOS_STORM, SKILL_ID_FUZIN, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU, SKILL_ID_GENBU_FU,
    SKILL_ID_GENZYUTSU_ANKOKURYUU, SKILL_ID_GLACIER_MONOLITH, SKILL_ID_GLACIER_NOVA, SKILL_ID_GLACIER_SHARD,
    SKILL_ID_GLACIER_STOMP, SKILL_ID_GRAVITY_HOLE, SKILL_ID_GROUND_BLOOM, SKILL_ID_GROUND_GRAVITATION,
    SKILL_ID_HEAVENS_DRIVE, SKILL_ID_HEAVENS_DRIVE_FOR_CLONE, SKILL_ID_HELLS_DRIVE, SKILL_ID_HOLY_LIGHT,
    SKILL_ID_HOLY_LIGHT_TAMASHI, SKILL_ID_HYOSENSO, SKILL_ID_HYUN_ROK_SPIRIT_POWER, SKILL_ID_ICE_CLOUD,
    SKILL_ID_ICE_PILLAR, SKILL_ID_ICE_SPLASH, SKILL_ID_ICE_TOTEM, SKILL_ID_IMPERIAL_PRESSURE,
    SKILL_ID_INUHAKKA_METEOR, SKILL_ID_JACK_FROST, SKILL_ID_JACK_FROST_NOVA, SKILL_ID_JUDEX,
    SKILL_ID_JUDGEMENT_CROSS, SKILL_ID_JUPITER_THUNDER, SKILL_ID_JUPITER_THUNDER_STORM, SKILL_ID_KAENZIN,
    SKILL_ID_KAGETOKI, SKILL_ID_KINNRYUU_HOU, SKILL_ID_KOUENKA, SKILL_ID_LESSON, SKILL_ID_LIGHTNING_BOLT,
    SKILL_ID_LIGHTNING_LAND, SKILL_ID_LIGHTNING_LOADER, SKILL_ID_LORD_OF_VERMILLION, SKILL_ID_MAGNUS_EXORCISMUS,
    SKILL_ID_MAHOKEN_SHUREN,
    SKILL_ID_MATATABI_LANCE, SKILL_ID_METALIC_FURY, SKILL_ID_METALIC_SOUND, SKILL_ID_METEOR_STORM,
    SKILL_ID_METEOR_STORM_BUSTER, SKILL_ID_MIRIAM_LIGHT, SKILL_ID_MYSTERY_ILLUSION, SKILL_ID_NAPALM_VULKAN_STRIKE,
    SKILL_ID_NUMATIC_PROCERA, SKILL_ID_NYANTOMO_KENROKU, SKILL_ID_OMEGA_ABYSS_STRIKE, SKILL_ID_PHREMEN,
    SKILL_ID_POISON_BUSTER, SKILL_ID_PSYCHIC_STREAM, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_RAIDEN_HOU, SKILL_ID_RAIGEKISAI,
    SKILL_ID_RAIN_OF_CRYSTAL, SKILL_ID_RAY_OF_GENESIS, SKILL_ID_REIDO_FU, SKILL_ID_REIKETSU_HOU,
    SKILL_ID_RHYTHMICAL_WAVE, SKILL_ID_ROARING_CHARGE, SKILL_ID_ROARING_PIERCER, SKILL_ID_ROCK_DOWN,
    SKILL_ID_RULE_BREAK_STATE, SKILL_ID_RUWACH, SKILL_ID_RYUENZIN, SKILL_ID_SAKUFU, SKILL_ID_SANREI_ITTAI,
    SKILL_ID_SEIRYU_FU, SKILL_ID_SEISMIC_WEAPON, SKILL_ID_SEKIEN_HOU, SKILL_ID_SERE, SKILL_ID_SERE_SUPPORT_SKILL,
    SKILL_ID_SHIELD_SPELL_LV_2,
    SKILL_ID_SHIHOZIN_FU, SKILL_ID_SHIHO_FU_ZYOTAI, SKILL_ID_SHIHO_GOGYO_ZIN, SKILL_ID_SHINDOZANKYO,
    SKILL_ID_SHIRYO_BAKUHATSU, SKILL_ID_SHIRYO_ZYOKA, SKILL_ID_SIGHT_RASHER, SKILL_ID_SOLID_STOMP,
    SKILL_ID_SOUL_EXPANSION, SKILL_ID_SOUL_STRIKE, SKILL_ID_SOUL_VULKUN_STRIKE, SKILL_ID_SOUND_BLEND,
    SKILL_ID_SPELL_FIST, SKILL_ID_SPIRIT_MASTERY, SKILL_ID_STORM_CANNON, SKILL_ID_STORM_GUST,
    SKILL_ID_STRATUM_TREAMER, SKILL_ID_STRIKING, SKILL_ID_SUMMON_FIRE_BALL, SKILL_ID_SUMMON_LIGHTNING_BALL,
    SKILL_ID_SUMMON_STONE,
    SKILL_ID_SUMMON_WATER_BALL, SKILL_ID_SUZAKU_FU, SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TERA_DRIVE,
    SKILL_ID_TERRA_HARVEST, SKILL_ID_TERRA_WAVE, SKILL_ID_THUNDERING_CALL, SKILL_ID_THUNDERING_FOCUS,
    SKILL_ID_THUNDERING_ORB, SKILL_ID_THUNDER_STORM, SKILL_ID_TORNADE_STORM, SKILL_ID_TSURARAOTOSHI,
    SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT, SKILL_ID_VENOM_SWAMP, SKILL_ID_VERATURE_SPEAR, SKILL_ID_VIOLENT_QUAKE,
    SKILL_ID_WATER_BALL, SKILL_ID_WATER_BALL_FOR_CLONE, SKILL_ID_WIND_BOMB, SKILL_ID_ZYUTSUSHIKI_KAIHO
} from "../skill/skill.dat.js";
import { AS_PLUS } from "../skill/calcautospell.js";
import { __DIG3, g_VariableCastTimeRate, g_skillManager } from "../runtime/global.js";
import {
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerMatkPercentUp
} from "../bridge/battlecalc-bridge.js";
import { GetAttackMethodOptionValue } from "./attack-method-option.js";
import { SubName } from "./sub-name.js";
import { CS } from "./calc-state.js";
import { GetTotalSpecStatus } from "../chara/hmjob.js";
import {
    g_bDefinedDamageIntervals, n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../runtime/ro4-state.js";
import { UsedSkillSearch } from "../skill/skillstate.js";
import { n_A_WeaponZokusei } from "../runtime/roro-state.js";

export function ApplyMagicalSkillFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    let w_MATK = [0,0,0];
    let bMatchCond = false;

		CS.n_PerfectHIT_DMG = 0;
		set_n_Enekyori(2);
		CS.directSubtractionMdef = false;
		CS.wbairitu = 100;
		CS.n_bunkatuHIT = 0;


		// 四次スキル以降の属性設定共通処理
		if (battleCalcInfo.skillId >= SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) {
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId, attackMethodConfArray[0]));
		}

		switch (n_A_ActiveSkill) {

		// 「マジシャン」スキル「ファイアーボルト」
		case SKILL_ID_FIRE_BOLT:
			set_n_A_Weapon_zokusei(3);
			// スペルフィストの中身として呼ばれている場合
			if (battleCalcInfo.parentSkillId == SKILL_ID_SPELL_FIST) {
				// 倍率計算の中の処理を正しく分岐させるために、遠距離判定フラグを調整
				set_n_Enekyori(0);
				// ヒット数を 1 に補正
				CS.wHITsuu = 1;
				// 詠唱とディレイを 0 にしておく
				CS.wCast = 0;
				n_Delay[2] = 0;
			}
			// 上記以外の場合
			else {
				CS.wHITsuu = n_A_ActiveSkillLV;
				CS.wCast = 560 * n_A_ActiveSkillLV;
				n_Delay[2] = 800 + n_A_ActiveSkillLV * 200;
			}
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC: 
					CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_FLAME_TECHNIQUE:
					CS.wbairitu += 75;
					break;
			}
			break;

		// 「マジシャン」スキル「コールドボルト」
		case SKILL_ID_COLD_BOLT:
			set_n_A_Weapon_zokusei(1);
			// スペルフィストの中身として呼ばれている場合
			if (battleCalcInfo.parentSkillId == SKILL_ID_SPELL_FIST) {
				// 倍率計算の中の処理を正しく分岐させるために、遠距離判定フラグを調整
				set_n_Enekyori(0);
				// ヒット数を 1 に補正
				CS.wHITsuu = 1;
				// 詠唱とディレイを 0 にしておく
				CS.wCast = 0;
				n_Delay[2] = 0;
			}
			// 上記以外の場合
			else {
				CS.wHITsuu = n_A_ActiveSkillLV;
				CS.wCast = 560 * n_A_ActiveSkillLV;
				n_Delay[2] = 800 + n_A_ActiveSkillLV * 200;
			}
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_AQUA_PLAY:
					CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_COLD_FORCE:
					CS.wbairitu += 75;
					break;
			}
			break;

		// 「マジシャン」スキル「ライトニングボルト」
		case SKILL_ID_LIGHTNING_BOLT:
			set_n_A_Weapon_zokusei(4);
			// スペルフィストの中身として呼ばれている場合
			if (battleCalcInfo.parentSkillId == SKILL_ID_SPELL_FIST) {
				// 倍率計算の中の処理を正しく分岐させるために、遠距離判定フラグを調整
				set_n_Enekyori(0);
				// ヒット数を 1 に補正
				CS.wHITsuu = 1;
				// 詠唱とディレイを 0 にしておく
				CS.wCast = 0;
				n_Delay[2] = 0;
			}
			// 上記以外の場合
			else {
				CS.wHITsuu = n_A_ActiveSkillLV;
				CS.wCast = 560 * n_A_ActiveSkillLV;
				n_Delay[2] = 800 + n_A_ActiveSkillLV * 200;
			}
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_GUST:
					CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_GRACE_BREEZE:
					CS.wbairitu += 75;
					break;
			}
			break;

		case SKILL_ID_FIRE_BALL:
			set_n_A_Weapon_zokusei(3);
			if(n_A_ActiveSkillLV <=5){
				CS.wCast = 1500;
				n_Delay[2] = 1500;
			}else{
				CS.wCast = 150;
				n_Delay[2] = 1000;
			}
			CS.wbairitu = (70 + n_A_ActiveSkillLV * 10) * 2;
			break;

		case SKILL_ID_FIRE_WALL:
			set_n_A_Weapon_zokusei(3);
			CS.wHITsuu = 4 + n_A_ActiveSkillLV;
			CS.wCast = 2150 - (n_A_ActiveSkillLV * 150);
			n_Delay[2] = 100;
			CS.wbairitu = 50;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 1) CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			break;

		case SKILL_ID_FROST_DIVER:
			set_n_A_Weapon_zokusei(1);
			CS.wCast = 800;
			n_Delay[2] = 1500;
			CS.wbairitu = 100 + 10 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 10) CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			break;

		case SKILL_ID_THUNDER_STORM:
			set_n_A_Weapon_zokusei(4);
			CS.wHITsuu = n_A_ActiveSkillLV;
			CS.wCast = 800 * n_A_ActiveSkillLV;
			n_Delay[2] = 2000;
			CS.wbairitu = 100;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 19) CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			break;

		case SKILL_ID_SOUL_STRIKE:
			set_n_A_Weapon_zokusei(8);
			CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2);
			CS.wCast = 500;
			if(n_A_ActiveSkillLV % 2 == 0) n_Delay[2] = 800 + n_A_ActiveSkillLV / 2 * 200;
			else n_Delay[2] = 1000 + (n_A_ActiveSkillLV+1) / 2 * 200;
			break;

		case SKILL_ID_SIGHT_RASHER:
			set_n_A_Weapon_zokusei(3);
			CS.wCast = 700;
			n_Delay[2] = 2000;
			CS.wbairitu = 100 + 20 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_METEOR_STORM:
			CS.wbairitu = 125;
			set_n_A_Weapon_zokusei(3);
			if(!CS.n_AS_MODE) CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2) * attackMethodConfArray[0].GetOptionValue(0);
			else CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2) * (Math.floor(n_A_ActiveSkillLV / 2) + 2);
			CS.wCast = 12000;
			if(g_VariableCastTimeRate == 0) n_Delay[1] = n_Delay[1] / 2;
			n_Delay[2] = Math.floor(n_A_ActiveSkillLV / 2) * 1000 + 2000;
			break;

		case SKILL_ID_JUPITER_THUNDER:
			set_n_A_Weapon_zokusei(4);
			CS.wHITsuu = n_A_ActiveSkillLV + 2;
			CS.wCast = 1600 + n_A_ActiveSkillLV * 400;
			break;


		//「ウィザード」スキル「ロードオブヴァーミリオン」
		case SKILL_ID_LORD_OF_VERMILLION:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 1000;	// ダメージ間隔
			n_Delay[6] = 3100;	// オブジェクト存続時間
			n_Delay[3] = 3100;	// 強制ディレイ（オブジェクト発生中は別のLoVオブジェクトのダメージが発生しないため）
			// 属性
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// ダメージ倍率
			CS.wbairitu = [0,100,105,115,130,150,175,205,240,280,330][n_A_ActiveSkillLV];
			// 見た目 10 hit * hit数
			CS.wActiveHitNum = 10;
			break;


		case SKILL_ID_WATER_BALL:
		case SKILL_ID_WATER_BALL_FOR_CLONE:
			set_n_A_Weapon_zokusei(1);
			if(n_A_ActiveSkillLV >= 4) CS.wHITsuu = 25;
			else if(n_A_ActiveSkillLV >= 2) CS.wHITsuu = 9;
			CS.SG_Special_HITnum = CS.wHITsuu;
			CS.wCast = 1000 * n_A_ActiveSkillLV;
			CS.wbairitu = 100 + 30 * n_A_ActiveSkillLV;
			n_Delay[3] = 0.1 * CS.wHITsuu;
			break;

		case SKILL_ID_FROST_NOVA:
			CS.wbairitu = 100 + 10 * n_A_ActiveSkillLV;
			set_n_A_Weapon_zokusei(1);
			CS.wCast = 1000;
			break;

		// 「ウィザード」スキル「ストームガスト」
		case SKILL_ID_STORM_GUST:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[3] = 4500 // 強制ディレイ（オブジェクト発生中は別のSGを重ねられないため）
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 450;	// ダメージ間隔
			// 「3hitで凍った場合のダメージを算出したいニーズ」を切り捨てない苦肉の策でオブジェクト存続時間を調整する
			n_Delay[6] = 450 * attackMethodConfArray[0].GetOptionValue(0);;	// オブジェクト存続時間
			// 属性
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// ダメージ倍率
			CS.wbairitu = 70 + 50 * n_A_ActiveSkillLV;
			break;

		// 「ウィザード」スキル「アーススパイク」
		case SKILL_ID_EARTH_SPIKE:
			set_n_A_Weapon_zokusei(2);
			CS.wHITsuu = n_A_ActiveSkillLV;
			CS.wCast = 560 * n_A_ActiveSkillLV;
			n_Delay[2] = 800 + 200 * n_A_ActiveSkillLV;
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_PETROLOGY:
					CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_EARTH_CARE:
					CS.wbairitu += 75;
					break;
			}
			break;

		// 「ウィザード」スキル「ヘヴンズドライブ」			
		case SKILL_ID_HEAVENS_DRIVE:
		case SKILL_ID_HEAVENS_DRIVE_FOR_CLONE:
			set_n_A_Weapon_zokusei(2);
			CS.wHITsuu = n_A_ActiveSkillLV;
			CS.wbairitu = 125;
			CS.wCast = 1000 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == SERE_SUPPORT_SKILL_ID_PETROLOGY) {
				CS.wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			}
			break;

		case SKILL_ID_RUWACH:
			set_n_A_Weapon_zokusei(6);
			CS.wHITsuu = 1;
			CS.wbairitu = 145;
			if(attackMethodConfArray[0].GetOptionValue(0) == 0) CS.wbairitu = 0;
			break;

		case SKILL_ID_HOLY_LIGHT:
		case SKILL_ID_HOLY_LIGHT_TAMASHI:
			set_n_A_Weapon_zokusei(6);
			CS.wCast = 2000;
			CS.wbairitu = 125;
			if(n_A_ActiveSkill==SKILL_ID_HOLY_LIGHT_TAMASHI) CS.wbairitu += 500;
			break;

		// 「プリースト」スキル「マグヌスエクソシズム」
		case SKILL_ID_MAGNUS_EXORCISMUS:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 3000;								// ダメージ間隔
			n_Delay[6] = 4000 + 1000 * n_A_ActiveSkillLV;	// オブジェクト存続時間
			n_Delay[3] = n_Delay[6];						// 複数展開しても多重Hitしないスキル
			// 属性
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// ダメージ倍率
			CS.wbairitu = 100;
			// ヒット数
			CS.wHITsuu = n_A_ActiveSkillLV;
			break;

		case SKILL_ID_DARK_STRIKE:
			set_n_A_Weapon_zokusei(7);
			CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2);
			CS.wCast = 500;
			if(n_A_ActiveSkillLV % 2 == 0) n_Delay[2] = 800 + n_A_ActiveSkillLV / 2 * 200;
			else n_Delay[2] = 1000 + (n_A_ActiveSkillLV+1) / 2 * 200;
			break;

		case SKILL_ID_ESTIN:
			set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
			CS.wCast = 100;
			n_Delay[2] = 500;
			if(mobData[17] == 0) CS.wbairitu = 10 * n_A_ActiveSkillLV;
			else CS.wbairitu = 1;
			break;

		case SKILL_ID_ESTON:
			set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
			CS.wCast = 100;
			n_Delay[2] = 500;
			CS.wbairitu = 5 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_ESMA:
			set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
			n_Delay[0] = 1;
			CS.wHITsuu = n_A_ActiveSkillLV;
			CS.wCast = 2000;
			n_Delay[2] = 500;
			CS.wbairitu = 40 + n_A_BaseLV;
			break;

		case SKILL_ID_KOUENKA:
			set_n_A_Weapon_zokusei(3);
			CS.wbairitu = 90;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==3) CS.wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = n_A_ActiveSkillLV;
			CS.wCast = 700 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_KAENZIN:
			set_n_A_Weapon_zokusei(3);
			CS.wbairitu = 50;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==3) CS.wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = Math.round(n_A_ActiveSkillLV / 2) +4 ;
			CS.wCast = 6500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Delay[0] = 1;
			break;

		case SKILL_ID_RYUENZIN:
			CS.n_bunkatuHIT = 1;
			set_n_A_Weapon_zokusei(3);
			CS.wbairitu = 150 + 150 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==3) CS.wbairitu += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = 3;
			CS.wCast = 3000;
			n_Delay[2] = 3000;
			break;

		case SKILL_ID_HYOSENSO:
			set_n_A_Weapon_zokusei(1);
			CS.wbairitu = 70;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==1) CS.wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = n_A_ActiveSkillLV + 2;
			CS.wCast = 700 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_TSURARAOTOSHI:
			set_n_A_Weapon_zokusei(1);
			CS.wbairitu = 150 + 150 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==1) CS.wbairitu += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = 1;
			CS.wCast = 1500 + 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 2000;
			break;

		case SKILL_ID_FUZIN:
			set_n_A_Weapon_zokusei(4);
			CS.wbairitu = 150;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==4) CS.wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = Math.floor(n_A_ActiveSkillLV / 2) +1;
			CS.wCast = 1000 + 1000 * Math.floor(n_A_ActiveSkillLV / 2);
			break;

		case SKILL_ID_RAIGEKISAI:
			set_n_A_Weapon_zokusei(4);
			CS.wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==4) CS.wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = 1;
			CS.wCast = 4000;
			break;

		case SKILL_ID_SAKUFU:
			set_n_A_Weapon_zokusei(4);
			CS.wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==4) CS.wbairitu += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wHITsuu = 1;
			CS.wCast = 4000;
			break;

		case SKILL_ID_SOUL_EXPANSION:
			set_n_A_Weapon_zokusei(8);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 2;
			CS.wCast = 2000;
			n_Delay[2] = 500;
			CS.wbairitu = 400 + 100 * n_A_ActiveSkillLV + n_A_INT;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_FROST_MISTY:
			set_n_A_Weapon_zokusei(1);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 2 + n_A_ActiveSkillLV;
			CS.wCast = 500 + 500 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 1200 - 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			n_Delay[7] = 200;
			CS.wbairitu = 200 + 100 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_JACK_FROST:
			set_n_A_Weapon_zokusei(1);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 5;
			CS.n_KoteiCast = 1000;
			CS.wCast = 1000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			n_Delay[7] = 200;
			if(attackMethodConfArray[0].GetOptionValue(0) == 1){
				CS.wbairitu = 1000 + 300 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			}else{
				CS.wbairitu = 500 + 100 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 150);
			}
			break;

		case SKILL_ID_DRAIN_LIFE:
			set_n_A_Weapon_zokusei(0);
			CS.wHITsuu = 1;
			CS.n_KoteiCast = 1000;
			CS.wCast = 4000;
			n_Delay[2] = 0;
			n_Delay[7] = 2000;
			CS.wbairitu = 200 * n_A_ActiveSkillLV + n_A_INT;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_CRYMSON_ROCK:
			set_n_A_Weapon_zokusei(3);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 7;
			CS.n_KoteiCast = 500;
			CS.wCast = 1000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			n_Delay[7] = 2000;
			CS.wbairitu = 300 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			CS.wbairitu += 1300;
			break;

		case SKILL_ID_COMMET:
			set_n_A_Weapon_zokusei(0);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 20;
			CS.n_KoteiCast = 1500 + 500 * n_A_ActiveSkillLV;
			CS.wCast = 8500 + 1500 * n_A_ActiveSkillLV;
			n_Delay[2] = 2000;
			n_Delay[7] = 120000;

			var wDistance = attackMethodConfArray[0].GetOptionValue(0);

			switch (wDistance) {

			case 0:
				CS.wbairitu = 2500 + 500 * n_A_ActiveSkillLV;
				break;

			case 1:
				CS.wbairitu = 1600 + 400 * n_A_ActiveSkillLV;
				break;

			case 2:
				CS.wbairitu = 1200 + 300 * n_A_ActiveSkillLV;
				break;

			case 3:
				CS.wbairitu = 800 + 200 * n_A_ActiveSkillLV;
				break;

			case 4:	// 協力発動
				CS.wbairitu = Math.floor(2500 + 400 * n_A_ActiveSkillLV * n_A_BaseLV / 120);
				break;
			}
			break;

		case SKILL_ID_EARTH_STRAIN:
			set_n_A_Weapon_zokusei(2);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 2;
			CS.wCast = 1500 + 500 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 500;
			n_Delay[2] = 500;
			n_Delay[7] = 600 * n_A_ActiveSkillLV;
			CS.wbairitu = 2000 + 100 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_SUMMON_FIRE_BALL:
		case SKILL_ID_SUMMON_WATER_BALL:
		case SKILL_ID_SUMMON_LIGHTNING_BALL:
		case SKILL_ID_SUMMON_STONE:
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_FIRE_BALL) set_n_A_Weapon_zokusei(3);
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_WATER_BALL) set_n_A_Weapon_zokusei(1);
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_LIGHTNING_BALL) set_n_A_Weapon_zokusei(4);
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_STONE) set_n_A_Weapon_zokusei(2);
			CS.wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			CS.wCast = 6000 - 1000 * n_A_ActiveSkillLV;

			CS.wbairitu = (n_A_BaseLV + n_A_JobLV) * Math.round(n_A_ActiveSkillLV / 2);
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// メタリックサウンド
		case SKILL_ID_METALIC_SOUND:
			set_n_A_Weapon_zokusei(0);
			CS.n_bunkatuHIT = 1;
			CS.wCast = Math.min(3000, 500 + 500 * n_A_ActiveSkillLV);
			n_Delay[7] = 200;
			// 基本倍率
			CS.wbairitu = 120 * n_A_ActiveSkillLV
			// サウンドブレンド補正
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND] > 0) {
				CS.wbairitu *= 2;
			}
			// レッスン補正
			CS.wbairitu += 60 * Math.max(LearnedSkillSearch(SKILL_ID_LESSON), UsedSkillSearch(SKILL_ID_LESSON));
			// BaseLv補正
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			// 睡眠補正
			if(n_B_IJYOU[MOB_CONF_DEBUF_ID_SUIMIN]) {
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * 150 / 100);
			}
			break;

		case SKILL_ID_FIRE_WALK:
		case SKILL_ID_ELECTRIC_WALK:
			if(n_A_ActiveSkill==SKILL_ID_FIRE_WALK) set_n_A_Weapon_zokusei(3);
			else set_n_A_Weapon_zokusei(4);
			CS.wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			CS.wCast = 1000;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			CS.wbairitu = 60 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			if(n_A_ActiveSkill==SKILL_ID_FIRE_WALK && UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 4) {
				CS.wbairitu += ROUNDDOWN(n_A_JobLV / 2);
			}
			if(n_A_ActiveSkill==SKILL_ID_ELECTRIC_WALK && UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 22) {
				CS.wbairitu += ROUNDDOWN(n_A_JobLV / 2);
			}
			break;

		// 「ソーサラー」スキル「サイキックウェーブ」
		case SKILL_ID_PSYCHIC_WAVE:

			set_g_bDefinedDamageIntervals(true);

			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//2750 + 1250 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//2250 - 250 * n_A_ActiveSkillLV;
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//1000
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//5000

			// ダメージ間隔
			n_Delay[5] = 500;

			// オブジェクト存続時間
			n_Delay[6] = 1000 + (n_A_ActiveSkillLV * 500);

			// 属性の設定
			if(!CS.n_AS_MODE) set_n_A_Weapon_zokusei(attackMethodConfArray[0].GetOptionValue(0));
			else set_n_A_Weapon_zokusei(0);

			// 2025-03-29 SIAさんの検証により n_A_INT による倍率補正が実態と異なる可能性が示唆されている
			CS.wbairitu = 70 * n_A_ActiveSkillLV + 3 * n_A_INT;

			// ベースレベル補正
			CS.wbairitu *= n_A_BaseLV / 100;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu);
			break;

		//「ソーサラー」スキル「クラウドキル」
		case SKILL_ID_CLOUD_KILL:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 500;								// ダメージ間隔
			n_Delay[6] = 6000 + 2000 * n_A_ActiveSkillLV;	// オブジェクト存続時間
			n_Delay[3] = n_Delay[6]; 						// 重複設置はできない
			// 属性
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// ダメージ倍率
			CS.wbairitu = 40 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			// 精霊補正
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_CURSED_SOIL:
					CS.wbairitu += n_A_JobLV;
					break;
				case SERE_SUPPORT_SKILL_ID_DEEP_POISONING:
					CS.wbairitu += 200;
					break;
			}				
			break;

		case SKILL_ID_POISON_BUSTER:
			set_n_A_Weapon_zokusei(5);
			CS.n_KoteiCast = 1750 - 250 * n_A_ActiveSkillLV;
			CS.wCast = 1250 * n_A_ActiveSkillLV - 750;
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			CS.wbairitu = 1000 + 300 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 31) CS.wbairitu += ROUNDDOWN(n_A_JobLV * 5);
			break;

		case SKILL_ID_EARTH_GRAVE:
			set_n_A_Weapon_zokusei(2);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 3;
			CS.n_KoteiCast = 2000 - 200 * n_A_ActiveSkillLV;
			CS.wCast = 2000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			const seismic_weapon_lv = Math.max(LearnedSkillSearch(SKILL_ID_SEISMIC_WEAPON), UsedSkillSearch(SKILL_ID_SEISMIC_WEAPON));
			var subnumvalue = GetAttackMethodOptionValue(attackMethodConfArray, 0, seismic_weapon_lv);
			CS.wbairitu = 200 * subnumvalue + n_A_INT * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 31) CS.wbairitu += ROUNDDOWN(n_A_JobLV * 5);
			break;

		case SKILL_ID_DIAMOND_DUST:
			set_n_A_Weapon_zokusei(1);
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 5;
			CS.wCast = 2000 + 200 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 2000 - 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			const frost_weapon_lv = Math.max(LearnedSkillSearch(SKILL_ID_FROST_WEAPON), UsedSkillSearch(SKILL_ID_FROST_WEAPON));
			CS.wbairitu = 200 * GetAttackMethodOptionValue(attackMethodConfArray, 0, frost_weapon_lv) + n_A_INT * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 13) CS.wbairitu += ROUNDDOWN(n_A_JobLV * 5);
			break;

		// 「ジェネティック」スキル「デモニックファイアー」
		case SKILL_ID_DEMONIC_FIRE:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 2000;								// ダメージ間隔
			n_Delay[6] = 8001 + 2000 * n_A_ActiveSkillLV;	// オブジェクト存続時間 8000 だと発動回数が現実と合わないため 8001
			n_Delay[3] = n_Delay[6]; 						// 現実的な状況では重複設置はできない
			// 属性
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// ダメージ倍率
			CS.wbairitu = 200 * n_A_ActiveSkillLV;
			break;

		// 「アークビショップ」スキル「ミリアムライト」
		case SKILL_ID_MIRIAM_LIGHT:
			set_n_A_Weapon_zokusei(0);
			CS.wbairitu = 200 + 20 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SHIELD_SPELL_LV_2:
			set_n_A_Weapon_zokusei(6);
			CS.wCast = 1000;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			var wX = 0;
			for(var i=ITEM_DATA_INDEX_SPBEGIN;ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][i] != 0;i += 2) if(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][i] == 19) wX += ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][i+1];
			CS.wbairitu = n_A_BaseLV * 4 + wX * 100 + n_A_INT * 2;
			break;

		case SKILL_ID_ZYUTSUSHIKI_KAIHO:
			set_n_A_Weapon_zokusei(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU));
			CS.wbairitu = 200 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「サモナー」スキル「マタタビランス」
		case SKILL_ID_MATATABI_LANCE:
			// レベルによって属性が変化する
			set_n_A_Weapon_zokusei(ELM_ID_PSYCO);
			switch (n_A_ActiveSkillLV) {
			case 1:
				break;
			case 2:
				set_n_A_Weapon_zokusei(ELM_ID_WATER);
				break;
			case 3:
				set_n_A_Weapon_zokusei(ELM_ID_WIND);
				break;
			case 4:
				set_n_A_Weapon_zokusei(ELM_ID_EARTH);
				break;
			case 5:
				set_n_A_Weapon_zokusei(ELM_ID_FIRE);
				break;
			}

			CS.wbairitu = 5000;
			CS.wCast = 2000;
			n_Delay[2] = 0;
			n_Delay[7] = 0;
			break;

		case SKILL_ID_INUHAKKA_METEOR:
//			wActiveHitNum = 7;	// 分割ダメージを削除

			// スピリットハンドラーのレインボーホーン追加に伴い任意の属性を取れるように変更
			if (attackMethodConfArray[0].optionValueArray.length == 1) {
				// 属性未定義の場合
				set_n_A_Weapon_zokusei(ELM_ID_VANITY);
			} else {
				set_n_A_Weapon_zokusei(attackMethodConfArray[0].GetOptionValue(1));
			};

//			wbairitu = 700;		// 旧仕様
			CS.wbairitu = 400;		// 新仕様
			if(n_A_BaseLV >= 100) {
				// Base100以上の場合BaseLvが影響するように変更
				CS.wbairitu = CS.wbairitu * (n_A_BaseLV / 100);
			}
			CS.wHITsuu = attackMethodConfArray[0].GetOptionValue(0) / 2;
			CS.wCast = 2000;
			n_Delay[2] = 3000;
			var aDelay = [1000, 500, 500, 0, 0];
			n_Delay[7] = aDelay[n_A_ActiveSkillLV - 1];
			break;

		case SKILL_ID_VERATURE_SPEAR:
			CS.wCast = Math.min(3000, 2000 + 200 * n_A_ActiveSkillLV);
			CS.n_KoteiCast = Math.max(1000, 2000 - 200 * n_A_ActiveSkillLV);
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			set_n_A_Weapon_zokusei(4);

			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 3;

			const lightning_loader_lv = Math.max(LearnedSkillSearch(SKILL_ID_LIGHTNING_LOADER), UsedSkillSearch(SKILL_ID_LIGHTNING_LOADER));
			const striking_lv = Math.max(LearnedSkillSearch(SKILL_ID_STRIKING), UsedSkillSearch(SKILL_ID_STRIKING));
			var subnumvalue = GetAttackMethodOptionValue(attackMethodConfArray, 0, lightning_loader_lv);
			var subnumvalue2 = GetAttackMethodOptionValue(attackMethodConfArray, 1, striking_lv);
			CS.wbairitu = ROUNDDOWN((120 * (subnumvalue + subnumvalue2) + n_A_INT * (n_A_ActiveSkillLV / 2)) * n_A_BaseLV / 100);

			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 22) CS.wbairitu += ROUNDDOWN(n_A_JobLV * 5);

			break;

		case SKILL_ID_RAY_OF_GENESIS:
			CS.wCast = 2000;
			n_Delay[2] = 1000;
			CS.wbairitu = 200 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);

			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 7;

			break;

		case SKILL_ID_ESHA:
			set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
			CS.wCast = 200 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 200 * n_A_ActiveSkillLV;
			n_Delay[7] = 1000;
			CS.wbairitu = 2000 + (100 * n_A_ActiveSkillLV);

			break;

		case SKILL_ID_ESPA:
			set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
			CS.wCast = 100 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 100 * n_A_ActiveSkillLV;
			CS.wbairitu = 500 + (250 * n_A_ActiveSkillLV);
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);

			break;

		case SKILL_ID_ESFU:
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 5;
			set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
			CS.wCast = 100 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 100 * n_A_ActiveSkillLV;
			CS.wbairitu = 1500 + (250 * n_A_ActiveSkillLV);
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);

			break;

		case SKILL_ID_SHIRYO_BAKUHATSU:
			CS.n_bunkatuHIT = 1;
			CS.wHITsuu = 7;
			set_n_A_Weapon_zokusei(ELM_ID_DARK);
			CS.wCast = 2000;
			n_Delay[2] = 1000;
			n_Delay[7] = 1000;
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SHIRYO_HYOI]) {
				CS.wbairitu = 2500 + (250 * n_A_ActiveSkillLV);
			}
			else {
				CS.wbairitu = 2300 + (50 * n_A_ActiveSkillLV);
			}
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);

			break;

		//----------------------------------------------------------------
		//
		// 魔法ここから
		//
		//----------------------------------------------------------------

		//----------------------------------------------------------------
		// 計算式を CSkillManager.js へ移動させ battlecalc.js をスリム化する対応を進めています
		//----------------------------------------------------------------
		/* バード */
		case SKILL_ID_FUKYOWAON:	// 不協和音
		/* ミンストレル・ワンダラー */
		case SKILL_ID_SHINDOZANKYO:	// 振動残響
		/* アークビショップ */
		case SKILL_ID_JUDEX:	// ジュデックス
		case SKILL_ID_ADORAMUS:	// アドラムス
		case SKILL_ID_ARBITRIUM: 
		/** トルヴェール・トルバドゥール */
		case SKILL_ID_RHYTHMICAL_WAVE: // リズミカルウェーブ
		case SKILL_ID_SOUND_BLEND:	// サウンドブレンド
		case SKILL_ID_METALIC_FURY: // メタリックフューリー
		/** エレメンタルマスター */
		case SKILL_ID_PSYCHIC_STREAM: // サイキックストリーム
		case SKILL_ID_DIAMOND_STORM: 
		case SKILL_ID_TERA_DRIVE:
		/** アークメイジ */
		case SKILL_ID_MYSTERY_ILLUSION:
		case SKILL_ID_DESTRACTIVE_HURRICANE:
		case SKILL_ID_VIOLENT_QUAKE:
		case SKILL_ID_ALL_BLOOM:
		case SKILL_ID_CRYSTAL_IMPACT:
		/** ソウルアセティック */
		case SKILL_ID_SEIRYU_FU:	// 青龍符
		case SKILL_ID_BYAKKO_FU:	// 白虎符
		case SKILL_ID_SUZAKU_FU:	// 朱雀符
		case SKILL_ID_GENBU_FU:		// 玄武符
		case SKILL_ID_SHIRYO_ZYOKA:	// 死霊浄化
		case SKILL_ID_SHIHOZIN_FU:	// 四方神符
		case SKILL_ID_REIDO_FU:		// 霊道符
		/** スピリットハンドラー */
		case SKILL_ID_HYUN_ROK_SPIRIT_POWER: // ディアースピリットパワー
		case SKILL_ID_DEER_CANON:
		/** アビスチェイサー */
		case SKILL_ID_ABYSS_FLAME: // アビスフレイム
		/** インペリアルガード */
		case SKILL_ID_CROSS_RAIN:
		case SKILL_ID_IMPERIAL_PRESSURE: // インペリアルプレッシャー
		/** カーディナル */
		case SKILL_ID_DIVINUS_FLOS:	// ディヴィヌスフロス
		/** アリテア */
		case SKILL_ID_GLACIER_MONOLITH:
		case SKILL_ID_GLACIER_SHARD:
		case SKILL_ID_GLACIER_STOMP:
		case SKILL_ID_ROARING_CHARGE:
		case SKILL_ID_ROARING_PIERCER:
		case SKILL_ID_FURIOS_STORM:
		case SKILL_ID_TERRA_HARVEST:
		case SKILL_ID_TERRA_WAVE:
		case SKILL_ID_SOLID_STOMP:
		case SKILL_ID_CHILLING_BLAST:
		case SKILL_ID_GRAVITY_HOLE:
		case SKILL_ID_GLACIER_NOVA:
		/** ドルイド */
		case SKILL_ID_ICE_TOTEM:
		case SKILL_ID_ICE_CLOUD:
		case SKILL_ID_CUTTING_WIND:
		case SKILL_ID_WIND_BOMB:
		case SKILL_ID_EARTH_FLOWER:
		case SKILL_ID_AROUND_FLOWER:
		/** カルノス */
		case SKILL_ID_ICE_PILLAR:
		case SKILL_ID_ICE_SPLASH:
		case SKILL_ID_THUNDERING_FOCUS:
		case SKILL_ID_THUNDERING_ORB:
		case SKILL_ID_THUNDERING_CALL:
		case SKILL_ID_EARTH_DRILL:
		case SKILL_ID_EARTH_STAMP:
		case SKILL_ID_GROUND_BLOOM:
		/** 蜃気楼・不知火 */
		case SKILL_ID_GENZYUTSU_ANKOKURYUU:
		case SKILL_ID_ANTEN_HOU:
		/** ハイパーノービス */
		case SKILL_ID_GROUND_GRAVITATION:

			// スキル使用条件の判定
			CS.n_Buki_Muri = !g_skillManager.MatchWeaponCondition(n_A_ActiveSkill, n_A_WeaponType);
			if (CS.n_Buki_Muri) {
				CS.wbairitu = 0;
				break;
			}
			// 詠唱などの情報
			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			// ダメージ算出に関する情報
			// ※このブロックは attackMethodConfArray[0] を常に渡す（オートスペルでも main の conf を使う、
			//   従来どおりの挙動）。アドラムス等 option 依存の 999 未満スキルは main の conf で評価しないと
			//   ダメージが変わってしまうため、ここでは bAutoSpell による null 化は行わない。
			//   四次スキル（ID>=999）の強制属性は BattleCalc999Body() で決定済みなのでここでは基本上書きされない。
			var elmWork = g_skillManager.GetForcedElement(battleCalcInfo.skillId, attackMethodConfArray[0], mobData, battleCalcInfo.parentSkillId);
			if (elmWork != CSkillData.ELEMENT_VOID) {
				set_n_A_Weapon_zokusei(elmWork);
			}
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
			CS.g_bSkillNoDamage = (CS.wbairitu == 0);
			set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
			// ヒット数に関する情報
			CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType, battleCalcInfo.parentSkillId);
			CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill,n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
			// 地面設置スキルの情報
			set_g_bDefinedDamageIntervals(g_skillManager.IsGroundInstallation(n_A_ActiveSkill, attackMethodConfArray[0]));
			if (g_bDefinedDamageIntervals) {
				n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);
				n_Delay[6] = g_skillManager.GetLifeTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}
			break;

		// 「カーディナル」スキル「ニューマティックプロセラ」
		// 2025-01-17 もなこさんから連携して頂いた情報との一致を確認
		case SKILL_ID_NUMATIC_PROCERA: {
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			set_g_bDefinedDamageIntervals(true);
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 3000;
			// フィドスアニムス習得Lv
			const fidos_animus_lv = Math.max(LearnedSkillSearch(SKILL_ID_FIDOS_ANIMUS), UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS));
			// 不死・悪魔の場合
			if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_UNDEAD || mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON) {
				CS.wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;				// 基本倍率
				CS.wbairitu += 5 * fidos_animus_lv;						// フィドスアニムス補正
				CS.wbairitu += 70 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// SPL補正
			}
			// それ以外の場合
			else {
				CS.wbairitu = 5500 + 1250 * n_A_ActiveSkillLV;				// 基本倍率
				CS.wbairitu += 3 * fidos_animus_lv;						// フィドスアニムス補正
				CS.wbairitu += 60 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// SPL補正
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			// 見た目10hitで最大40hit
			CS.wActiveHitNum = 10;
			break;
		}
		// 「カーディナル」スキル「フレーメン」
		// 2025-01-27 もなこさんから連携して頂いた情報との一致を確認
		case SKILL_ID_PHREMEN: {
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// フィドスアニムス習得Lv
			const fidos_animus_lv = Math.max(LearnedSkillSearch(SKILL_ID_FIDOS_ANIMUS), UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS));
			// 不死・悪魔の場合
			if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_UNDEAD || mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON) {
				// 基本倍率
				CS.wbairitu = (900 * n_A_ActiveSkillLV);
				// フィドスアニムス補正
				CS.wbairitu += 60 * n_A_ActiveSkillLV * fidos_animus_lv;
				// SPL補正
				CS.wbairitu += 50 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// それ以外の場合
			else {
				// 基本倍率
				CS.wbairitu = (600 * n_A_ActiveSkillLV);
				// フィドスアニムス補正
				CS.wbairitu += 30 * n_A_ActiveSkillLV * fidos_animus_lv;
				// SPL補正
				CS.wbairitu += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;
		}
		// 「アークメイジ」スキル「デッドリープロジェクション」
		case SKILL_ID_DEADLY_PROJECTION:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			CS.wbairitu = 2000 + 500 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「レインオブクリスタル」
		case SKILL_ID_RAIN_OF_CRYSTAL:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			set_g_bDefinedDamageIntervals(true);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 500;
			// 基本倍率
			CS.wbairitu = 2000 + 200 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「ソウルバルカンストライク」
		case SKILL_ID_SOUL_VULKUN_STRIKE:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			CS.wbairitu = 350 + 50 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			// ヒット数
			CS.wHITsuu = 2 + n_A_ActiveSkillLV;
			break;

		// 「アークメイジ」スキル「ストラタムトレマー」
		case SKILL_ID_STRATUM_TREAMER:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			set_g_bDefinedDamageIntervals(true);
			// 基本倍率
			CS.wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			// 分割Hit数
			CS.wActiveHitNum = 2;
			break;

		// 「アークメイジ」スキル「トルネードストーム」
		case SKILL_ID_TORNADE_STORM:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			set_g_bDefinedDamageIntervals(true);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			// 基本倍率
			CS.wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「フローラルフレアロード」
		case SKILL_ID_FLORAL_FLARE_ROAD:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			set_g_bDefinedDamageIntervals(true);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			// 基本倍率
			CS.wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「アストラルストライク」
		case SKILL_ID_ASTRAL_STRIKE:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 初段ダメージの場合
			if (attackMethodConfArray[0].GetOptionValue(0) == 0) {
				// 基本倍率
				CS.wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 設置持続ダメージの場合
			else {
				set_g_bDefinedDamageIntervals(true);
				// オブジェクト存続時間
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// ダメージ間隔
				n_Delay[5] = 300;
				// 基本倍率
				CS.wbairitu = 200 + 100 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「ロックダウン」
		case SKILL_ID_ROCK_DOWN:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// クライマックス時
			if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
				// 基本倍率
				CS.wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 通常時
			else {
				// 基本倍率
				CS.wbairitu = 4250 + 1250 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			// 分割Hit
			CS.wActiveHitNum = 5;
			break;

		// 「アークメイジ」スキル「ストームキャノン」
		case SKILL_ID_STORM_CANNON:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// クライマックス時
			if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
				// 基本倍率
				CS.wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 通常時
			else {
				// 基本倍率
				CS.wbairitu = 4250 + 1250 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		//「アークメイジ」スキル「クリムゾンアロー」
		case SKILL_ID_CRYMSON_ARROW:
			// 初段ＨＩＴの場合
			if (battleCalcInfo.parentSkillId === undefined) {
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				CS.wbairitu = 100 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 追撃の場合
			else {
				// 基本倍率
				CS.wbairitu = 1500 + 500 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// 攻撃回数
				if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
					CS.wHITsuu = 3;
				} else {
					CS.wHITsuu = 2;
				}
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		//「アークメイジ」スキル「フローズンスラッシュ」
		case SKILL_ID_FROZEN_SLASH:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// クライマックス時
			if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
				// 基本倍率
				CS.wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 通常時
			} else {
				// 基本倍率
				CS.wbairitu = 4250 + 1250 * n_A_ActiveSkillLV;
				// SPL補正
				CS.wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「インペリアルガード」スキル「ジャッジメントクロス」
		// 2025/03/02 もなこさんから連携して頂いた情報に合わせてあります
		case SKILL_ID_JUDGEMENT_CROSS:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			CS.wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			// 見た目10hit
			CS.wActiveHitNum = 10;
			break;

		// 「アビスチェイサー」スキル「フロムジアビス」
		// 2024/10/24 提供データとのほぼ誤差無しを確認
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断
		case SKILL_ID_FROM_THE_ABYSS:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			CS.wbairitu = 1500 + 1500 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「オメガアビスストライク」
		// 2024/10/24 提供データとのほぼ誤差無しを確認済み
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断
		case SKILL_ID_OMEGA_ABYSS_STRIKE:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			CS.wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「アビススクエア」
		// 2024/10/24 提供データとのほぼ誤差無しを確認済み
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断
		// 参考: ragna-promenade様
		case SKILL_ID_ABYSS_SQUARE: {
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			set_g_bDefinedDamageIntervals(true);
			// 基本倍率
			CS.wbairitu = 150 * n_A_ActiveSkillLV;
			// SPL補正
			CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 魔法剣修練補正
			const mahoken_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_MAHOKEN_SHUREN), UsedSkillSearch(SKILL_ID_MAHOKEN_SHUREN));
			CS.wbairitu += 15 * n_A_ActiveSkillLV * mahoken_shuren_lv;
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			// 攻撃回数（既定=範囲内=2Hit）
			if (GetAttackMethodOptionValue(attackMethodConfArray, 0, 1) >= 1) {
				CS.wHITsuu = 2;
			}
			break;
		}
			
		//「エレメンタルマスター」スキル「ライトニングランド」
		case SKILL_ID_LIGHTNING_LAND:
			// 2024/08/27 実測
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 300;	// ダメージ間隔
			n_Delay[6] = 3000;	// オブジェクト存続時間
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 15) {	// 15: 風 プロセラ
				// 四次精霊あり
				CS.wbairitu = [0,1400,1800,2200,2600,3000][n_A_ActiveSkillLV];
				CS.wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				CS.wbairitu = [0,1200,1500,1800,2100,2400][n_A_ActiveSkillLV];
				CS.wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu *= n_A_BaseLV / 100;
			break;
			
		//「エレメンタルマスター」スキル「コンフラグレーション」
		case SKILL_ID_CONFLAGRATION:
			// 2024/08/27 実測
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 300;	// ダメージ間隔
			n_Delay[6] = 3000;	// オブジェクト存続時間
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 13) {	// 13: 火 アルドール
				// 四次精霊あり
				CS.wbairitu = [0,1400,1800,2200,2600,3000][n_A_ActiveSkillLV];
				CS.wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				CS.wbairitu = [0,1200,1500,1800,2100,2400][n_A_ActiveSkillLV];
				CS.wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu *= n_A_BaseLV / 100;
			break;
			
		//「エレメンタルマスター」スキル「ベナムスワンプ」
		case SKILL_ID_VENOM_SWAMP:
			// 2024/08/27 実測
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 300;	// ダメージ間隔
			n_Delay[6] = 3000;	// オブジェクト存続時間
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 17) {	// 17: 毒 サーペンス
				// 四次精霊あり
				CS.wbairitu = [0,1400,1800,2200,2600,3000][n_A_ActiveSkillLV];
				CS.wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				CS.wbairitu = [0,1200,1500,1800,2100,2400][n_A_ActiveSkillLV];
				CS.wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			CS.wbairitu *= n_A_BaseLV / 100;
			break;

		//「エレメンタルマスター」スキル「エレメンタルバスター」
		case SKILL_ID_ELEMENTAL_BASTER:
			bMatchCond = false;
			// 属性設定
			switch (UsedSkillSearch(SKILL_ID_SERE)) {
				case 13:
					set_n_A_Weapon_zokusei(ELM_ID_FIRE);
					bMatchCond = true;
					break;
				case 14:
					set_n_A_Weapon_zokusei(ELM_ID_WATER);
					bMatchCond = true;
					break;
				case 15:
					set_n_A_Weapon_zokusei(ELM_ID_WIND);
					bMatchCond = true;
					break;
				case 16:
					set_n_A_Weapon_zokusei(ELM_ID_EARTH);
					bMatchCond = true;
					break;
				case 17:
					set_n_A_Weapon_zokusei(ELM_ID_POISON);
					bMatchCond = true;
					break;
			}
			// 使用可否判定
			if (bMatchCond) {
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				CS.wbairitu = 10500 + (3000 * n_A_ActiveSkillLV);
				// SPL補正
				CS.wbairitu += 135 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				CS.wbairitu *= n_A_BaseLV / 100;
			}
			// 使用不可
			else {
				CS.wbairitu = 0;
				CS.n_Buki_Muri = true;
			}
			break;

		// 「ソウルアセティック」スキル「四方五行陣」
		case SKILL_ID_SHIHO_GOGYO_ZIN:
			// 使用条件は 玄武符 or 四方五行陣 状態であること
			if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) < 4) {
				CS.n_Buki_Muri = true;
				break;
			}
			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
			CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill,n_A_ActiveSkillLV);
			CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill,n_A_ActiveSkillLV, attackMethodConfArray[0]);
			set_n_A_Weapon_zokusei(attackMethodConfArray[0].GetOptionValue(0));
			break;

		// 「ハイパーノービス」スキル「ユピテルサンダーストーム」
		case SKILL_ID_JUPITER_THUNDER_STORM: {
			// 2024/09/19 実測値との誤差無しを確認済み
			// 詠唱時間など
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
			CS.wbairitu = 2700 + (150 * n_A_ActiveSkillLV);
			CS.wbairitu += 3 * n_A_ActiveSkillLV * madogaku;			// 習得済みスキル条件
			CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
			// 最終倍率
			CS.wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			CS.wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			break;
		}
		// 「ハイパーノービス」スキル「ヘルズドライブ」
		case SKILL_ID_HELLS_DRIVE: {
			// 2024/09/19 実測値との誤差無しを確認済み
			// 詠唱時間など
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 分割Hit数
			CS.wActiveHitNum = 3;
			// 基本倍率
			let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
			CS.wbairitu = 2600 + (150 * n_A_ActiveSkillLV);			// 基礎倍率
			CS.wbairitu += 4 * n_A_ActiveSkillLV * madogaku;			// 習得済みスキル条件
			CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
			// 最終倍率
			CS.wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			CS.wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			break;
		}
		// 「ハイパーノービス」スキル「ナパームバルカンストライク」
		case SKILL_ID_NAPALM_VULKAN_STRIKE: {
			// 2024/09/19 実測値との誤差無しまたは誤差1を確認済み
			// スキル計算式の問題ではなく後続の計算式の丸め誤差と判断しています
			// 詠唱時間など
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 分割Hit数
			CS.wActiveHitNum = 7;
			// 基本倍率
			let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
			CS.wbairitu = 2600 + (150 * n_A_ActiveSkillLV);			// 基礎倍率
			CS.wbairitu += 4 * n_A_ActiveSkillLV * madogaku;			// 習得済みスキル条件
			CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
			// 最終倍率
			CS.wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			CS.wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
			CS.wbairitu = Math.floor(CS.wbairitu);
			break;
		}
		// 「ハイパーノービス」スキル「メテオストームバスター」
		case SKILL_ID_METEOR_STORM_BUSTER: {
			// 詠唱時間など
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 500; // ダメージ発生間隔
			n_Delay[6] = [0,1500,2000,2000,2500,2500,3000,3000,3500,3500,4000][n_A_ActiveSkillLV];	// オブジェクト生存期間
			let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
			// 隕石
			if (battleCalcInfo.parentSkillId === undefined) {
				CS.wActiveHitNum = 3;	// 隕石 1 つあたり見た目 3 Hit
				CS.wbairitu = 1750 + 50 * n_A_ActiveSkillLV;				// 基礎倍率
				CS.wbairitu += 5 * n_A_ActiveSkillLV * madogaku;			// 習得済みスキル条件
				CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
				// 最終倍率
				CS.wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
				CS.wbairitu = Math.floor(CS.wbairitu);
				CS.wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
				CS.wbairitu = Math.floor(CS.wbairitu);
				CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
			}
			// 爆発
			else {
				CS.wbairitu = 1175 + 25 * n_A_ActiveSkillLV;				// 基礎倍率
				CS.wbairitu += 5 * n_A_ActiveSkillLV * madogaku;			// 習得済みスキル条件
				CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// 特性ステータス補正
				// 最終倍率 (爆発には独学補正が掛からない)
				CS.wbairitu *= n_A_BaseLV / 100;												// BaseLv補正
				CS.wbairitu = Math.floor(CS.wbairitu);
				CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
			}
			CS.wbairitu = Math.floor(CS.wbairitu);
			break;
		}

		/*
			「スピリットハンドラー」スキル「ディアーブリーズ」
		*/
		case SKILL_ID_DEER_BREEZE:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			set_g_bDefinedDamageIntervals(true);
			// スピリットハンドラーのレインボーホーン追加に伴い任意の属性を取れるように変更
			if (attackMethodConfArray[0].optionValueArray.length == 0) {
				// 属性未定義の場合
				set_n_A_Weapon_zokusei(ELM_ID_VANITY);
			} else {
				set_n_A_Weapon_zokusei(attackMethodConfArray[0].GetOptionValue(0));
			};
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 
				|| UsedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0
				|| LearnedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0
				) {
				// 基礎倍率
				CS.wbairitu = 1600 + 200 * n_A_ActiveSkillLV;
				// スピリットマスタリー補正
				CS.wbairitu += 40 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
			} else {
				// 基礎倍率
				CS.wbairitu = 800 + 100 * n_A_ActiveSkillLV;
				// スピリットマスタリー補正
				CS.wbairitu += 20 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
			}
			// SPL補正
			CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			break;

		/**
		 * 「蜃気楼　不知火」スキル「赤炎砲」「冷血砲」「雷電砲」「金龍砲」
		 */
		case SKILL_ID_SEKIEN_HOU:
		case SKILL_ID_REIKETSU_HOU:
		case SKILL_ID_RAIDEN_HOU:
		case SKILL_ID_KINNRYUU_HOU:{
			// 詠唱時間など
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 暗転砲の習得Lv
			const anten_hou_lv = Math.max(LearnedSkillSearch(SKILL_ID_ANTEN_HOU), UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL));
			if (battleCalcInfo.parentSkillId === undefined) {
				// 本体の攻撃
				const yonshoku_fu = attackMethodConfArray[0].GetOptionValue(1);
				if (yonshoku_fu === 0) {
					CS.wbairitu = 4000 + 300 * n_A_ActiveSkillLV;
				} else {
					// 四色符 は4属性部分の基本倍率のみに影響する
					CS.wbairitu = 7500 + 300 * n_A_ActiveSkillLV;
				}
				CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);		// spl補正
				CS.wbairitu += 70 * n_A_ActiveSkillLV * anten_hou_lv;			// 習得済みスキル条件
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			} else {
				// 分身の追撃 暗転砲
				set_n_A_Weapon_zokusei(ELM_ID_DARK);							// 属性は闇固定
				if (anten_hou_lv == 0) {
					CS.wbairitu = 0;
				} else {
					CS.wbairitu = 5750 + 350 * anten_hou_lv;					// 基本倍率
					CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// spl補正
					CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);		// BaseLv補正
					CS.wbairitu = Math.floor(CS.wbairitu * 30 / 100);				// 分身の威力は30%
					CS.wbairitu *= attackMethodConfArray[0].GetOptionValue(0);	// 分身の数
					// 分割ヒット
					CS.wActiveHitNum = 4;
				}
			}
			break;
		}

		// 「蜃気楼　不知火」スキル「影溶き」
		// 2024/12/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_KAGETOKI:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			CS.wbairitu = 3200 + 500 * n_A_ActiveSkillLV;											// 基本倍率
			CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);								// 特性ステータス補正
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			// 分割ヒット
			CS.wActiveHitNum = 2;
			break;

		// 「ハイパーノービス」スキル「ジャックフロストノヴァ」
		case SKILL_ID_JACK_FROST_NOVA: {
			// 2024/09/19 実測値との誤差1を確認済み
			// 後続の計算式による丸め誤差と判断しています
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ計算
			let madogaku = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU));
			if (attackMethodConfArray[0].GetOptionValue(0) === 0) {
				// 初撃ダメージ計算が指定された場合 (独学補正は掛からない)
				CS.wbairitu = 100 + (20 * n_A_ActiveSkillLV);											// 基礎倍率
				CS.wbairitu += 3 * n_A_ActiveSkillLV * madogaku;										// 習得済みスキル条件
				CS.wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);								// 特性ステータス補正
				CS.wbairitu *= n_A_BaseLV / 100;														// BaseLv補正
				CS.wbairitu = Math.floor(CS.wbairitu);
				CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;			// ルールブレイク補正
			} else {
				// 設置ダメージ計算が指定された場合
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = 500;	// ダメージ間隔
				n_Delay[6] = 3000;	// オブジェクト存続時間
				// 分割Hit数
				CS.wActiveHitNum = 2;
				// 基本倍率
				CS.wbairitu = 650 + (25 * n_A_ActiveSkillLV);							// 基礎倍率
				CS.wbairitu += 3 * n_A_ActiveSkillLV * madogaku;						// 習得済みスキル条件
				CS.wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);				// 特性ステータス補正
				CS.wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
				CS.wbairitu = Math.floor(CS.wbairitu);
				CS.wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][madogaku] / 100;	// 独学補正
				CS.wbairitu = Math.floor(CS.wbairitu);
				CS.wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;	// ルールブレイク補正
			}
			CS.wbairitu = Math.floor(CS.wbairitu);
			break;
		}
		
/*
		case SKILL_ID_DUMMY:
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_SHOTGUN) {
				wbairitu = 0;
				break;
			}

			set_n_Enekyori(1);	// 遠距離フラグ
			wHITsuu = 3;	// 多段ヒット数

			// CSkillManager.js で定義された詠唱時間などを取得する
			g_bUnknownCasts = true;	// 詠唱時間など未計測フラグ
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 設置型の場合
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 500;	// ダメージ間隔
			n_Delay[6] = 5000;	// オブジェクト存続時間

			// CAttackMethodAreaComponentManager.js で定義されたオプションを取得する
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (950 + (150 * n_A_ActiveSkillLV));

			// 習得済みスキル条件
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0) {
				wbairitu = 650 + (150 * n_A_ActiveSkillLV);
			} else {
				wbairitu = 400 + (100 * n_A_ActiveSkillLV);
				bCri = false;										// クリティカルしない場合
			}
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正

			// 種族特攻
			switch (parseInt(mobData[MONSTER_DATA_INDEX_RACE], 10)) {
				case RACE_ID_DEMON:
					wHITsuu = 3;
			}

			wbairitu *= n_A_BaseLV / 100;							// BaseLv補正
			break;
*/

/* --------------------------------------------------
↑ 魔法攻撃スキル追加位置
-------------------------------------------------- */
		}

		if (CS.g_bSkillNoDamage) {
			return [0, 0, 0];
		}
		for(var i = 0; i <= 2; i++){
			// 各ＭＡＴＫを取得
			w_MATK[i] = n_A_MATK[i];
			// モンスター特化を適用
			w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
			// 属性耐性を適用
			w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			// 対プレイヤー一般耐性を適用
			w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
		}
		// マグヌスエクソシズム、かつ、モンスターが対象外の場合、ＭＡＴＫを０で計算する
		if(n_A_ActiveSkill==104){
			if(mobData[19] != 6 && mobData[18] <90){
				w_MATK[0]=0;
				w_MATK[1]=0;
				w_MATK[2]=0;
			}
		}
		// ＭＡＴＫ％強化倍率を取得
		CS.wbairitu += GetBattlerMatkPercentUp(mobData);
		// 単発スキルの場合
		if(CS.n_bunkatuHIT == 0){
			for(var b = 0; b <= 2; b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100);
				if(CS.SG_Special_HITnum != 0){
					CS.SG_Special_DMG[b] = w_DMG[b];
				}
				CS.Last_DMG_B[b] = w_DMG[b];
				if(n_A_ActiveSkill==658 || n_A_ActiveSkill==659){
					if(b==1) CS.wHITsuu = 2 * attackMethodConfArray[0].GetOptionValue(0);
					if(b==2) CS.wHITsuu = 3 * attackMethodConfArray[0].GetOptionValue(0);
				}
				CS.Last_DMG_A[b] = ROUNDDOWN(w_DMG[b] * CS.wHITsuu);
				// TODO: 四次データ形式変更対応
				// w_DMG[b] = Last_DMG_A[b];
			}

		}
		// 分割ＨＩＴの場合
		else{
			var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
			if(n_A_ActiveSkill==518 && subnumvalue >= 1 && mobData[20] == 0){
				for(var b=0;b<=2;b++){
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100) / CS.wHITsuu);
					var KoteiDMG = 400 * subnumvalue;
					KoteiDMG = KoteiDMG * ROUNDDOWN((100 + 40 * UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) / 100);
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu + KoteiDMG;
					// TODO: 四次データ形式変更対応
					// w_DMG[b] *= wHITsuu;
				}
			}else{
				for(var b=0;b<=2;b++){
					// TODO: 2020年スキル修正に伴う変更（元からこの計算式だったかは不明）
					// w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100) / wHITsuu);
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * Math.floor(CS.wbairitu / CS.wHITsuu) * CS.wHITsuu / 100) / CS.wHITsuu);
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu;
					// TODO: 四次データ形式変更対応
					// w_DMG[b] *= wHITsuu;
				}
			}
		}
		if(CS.n_AS_MODE){
			CS.SG_Special_HITnum = 0;
			return w_DMG;
		}
		CS.w_HIT_HYOUJI = 100;
		AS_PLUS();
		BuildCastAndDelayHtml(mobData);
		BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
		return w_DMG;
}
