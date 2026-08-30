/**
 * StAllCalc セクション分割: 物理攻撃クリティカル率(対モンスター形)・MATK+ の各適用処理。
 *
 * stallcalc.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 各セクションの本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsDoramJob, IsSameJobClass, JOB_SERIES_ID_BARD, JOB_SERIES_ID_DANCER,
    JOB_SERIES_ID_HUNTER, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_MONK, JOB_SERIES_ID_NOVICE,
    JOB_SERIES_ID_PRIEST, JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_THIEF
} from "../data/mig.job.h.js";
import { g_confDataSanzi, g_objCharaConfCustomAtk, n_Nitou } from "../runtime/global.js";
import { ApplySpecModify, ApplySpecStatusModifyMATK } from "../chara/hmjob.js";
import { n_A_ActiveSkill, n_A_BaseLV, n_Heal_MATK, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CExtraInfoAreaComponentManager } from "../ui/CExtraInfoAreaComponentManager.js";
import {
    CARD_ID_AQUARIUS, CARD_ID_BLUE_ARIES, CARD_ID_CARNIVARAUS, CARD_ID_ENCHANT_A_INT, CARD_ID_GEMINI,
    CARD_ID_GESUI_CLAMP, CARD_ID_GOKU, CARD_ID_INISHIENO_WOOTANG_SHOOTER, CARD_ID_LOVA_KIMA,
    CARD_ID_LOVA_SHINKA_KIMA, CARD_ID_ROUND_RIDER, CARD_ID_SHOGUN_DAEHYON, CARD_ID_TOP_BLADE_RIDER,
    CARD_SET_ID_CELINE_KIMI_CELINENO_RIBBON
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import { CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_TOP_ANY } from "../runtime/common.js";
import {
    CHARA_DATA_INDEX_CRI, CHARA_DATA_INDEX_STATUS_MATK, CHARA_DATA_INDEX_WEAPON_MATK
} from "../const/EnumCharaDataIndex.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from "../const/EnumEquipRegionId.js";
import { ITEM_KIND_SWORD, ITEM_KIND_SWORD_2HAND } from "../const/EnumItemKind.js";
import {
    ITEM_SP_CRITICAL_UP_RACE_DEMON, ITEM_SP_CRITICAL_UP_RACE_DRAGON, ITEM_SP_CRITICAL_UP_RACE_HUMAN,
    ITEM_SP_CRITICAL_UP_RACE_SOLID, ITEM_SP_CRITICAL_UP_RACE_UNDEAD, ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON,
    ITEM_SP_MATK_PLUS_TYPE_WEAPON
} from "../const/EnumItemSpId.js";
import { JOB_ID_GENETIC, JOB_ID_WANDERER, JOB_ID_WARLOCK } from "../const/EnumJobId.js";
import { GetAdditionalCriticalRate } from "./critical.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AMAZING_GRACE, ITEM_ID_ANEMOS_SHIELD, ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1, ITEM_ID_DORAM_SHOES,
    ITEM_ID_DORAM_SUITS, ITEM_ID_ELDERNO_MITAMA, ITEM_ID_ELEMENTAL_POSSESSION, ITEM_ID_EMERALDEARRING,
    ITEM_ID_EUROPA_ROBE, ITEM_ID_EXELION_SHIELD, ITEM_ID_FOUR_OF_A_KIND, ITEM_ID_FURUBITA_MIDASS,
    ITEM_ID_FUWAFUWA_TANPOPO_SHOES, ITEM_ID_FUYUSURU_ARTIFACT, ITEM_ID_GAIA_SHIELD, ITEM_ID_GRACE_PSYCHIC_ROBE,
    ITEM_ID_GRACE_PUNISHMENT_ROBE, ITEM_ID_GUARDIAN_OF_SOUL, ITEM_ID_HEAVENLY_ORDER, ITEM_ID_HOBINKYUNO_STUFF,
    ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU, ITEM_ID_ILLUSION_BOOTS, ITEM_ID_ILLUSION_GAIKOTSUNO_YUBIWA,
    ITEM_ID_ILLUSION_MUFFLER, ITEM_ID_ILLUSION_SHOES, ITEM_ID_IMPERIAL_PSYCHIC_ROBE,
    ITEM_ID_IMPERIAL_PUNISHMENT_ROBE, ITEM_ID_KOKYU_DORAM_SHOES, ITEM_ID_KOKYU_DORAM_SUITS, ITEM_ID_LOUD_PARK,
    ITEM_ID_MAHOSEKINO_ONKE, ITEM_ID_MAKATSUKYUNO_THIEF_BOW, ITEM_ID_RAIN_BO, ITEM_ID_RING_OF_JUPITER,
    ITEM_ID_SAPPHIRE_LIST, ITEM_ID_SEVEN_ELEVEN_HEADPHONE, ITEM_ID_SHOZYOKYUNO_DEVINE_CROSS,
    ITEM_ID_SOGYOKYUNO_STUFF_OF_SOUL, ITEM_ID_SOZIKYUNO_ROPE, ITEM_ID_SOZIKYUNO_VIOLIN, ITEM_ID_STRAWBERRY_HAT,
    ITEM_ID_TOKUSEN_DORAM_SHOES, ITEM_ID_TOKUSEN_DORAM_SUITS, ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI,
    ITEM_ID_TONBOGA_TOMATTA_MYOUNARU_NEKOZYARASHI, ITEM_ID_TONBOGA_TOMATTA_NEKOZYARASHI,
    ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, ITEM_ID_TUPOONNO_KAWA, ITEM_ID_VALKYRIE_HAMMER,
    ITEM_ID_VALKYRIE_KNIFE, ITEM_ID_ZIKEIDANNNO_SUITS, ITEM_ID_ZYANENNO_BOOK, ITEM_ID_ZYANENNO_ROD,
    ITEM_ID_ZYANENNO_STUFF, ITEM_ID_ZYANENNO_VIOLIN, ITEM_ID_ZYANENNO_WIRE, ITEM_SET_ID_BOTONO_SCARF_GLASS,
    ITEM_SET_ID_BOTONO_SCARF_SUNGLASS, ITEM_SET_ID_BUKYO_KUTSU_SWORD, ITEM_SET_ID_CARDYUINO_HOI_LAFINE_STUFF,
    ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE, ITEM_SET_ID_ELDERNO_MITAMA_KISONSARETA_KOSHO_CARD,
    ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FLAME_BIRD, ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD,
    ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA, ITEM_SET_ID_HOROW_SHOES_FUINSARETA_VERSEVV_CARD,
    ITEM_SET_ID_HOROW_SHOES_VERSEVV_CARD, ITEM_SET_ID_HOSHINO_GANTAI_FUINSARETA_ORC_HERO_CARD,
    ITEM_SET_ID_HOSHINO_GANTAI_ORC_HERO_CARD, ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD,
    ITEM_SET_ID_KAKUSE_HOROW_SHOES_FUINSARETA_VERSEVV_CARD, ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD,
    ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD_FUINSARETA_VERSEVV_CARD, ITEM_SET_ID_KUROMUZYO_BO_KAKUSEI_ROBE,
    ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI, ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS,
    ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_RAIN_BO, ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_MAGIC_BOOST,
    ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS, ITEM_SET_ID_SOHIONNO_KODACHI_SOHIONNO_HAGOROMO,
    ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT,
    ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI, ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import {
    BK_n_A_MATK, SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_BODY_DEF_PLUS, n_A_DEX, n_A_Equip,
    n_A_HEAD_DEF_PLUS, n_A_INT, n_A_JOB, n_A_JobLV, n_A_LUK, n_A_MATK, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_SHOULDER_DEF_PLUS, n_A_Weapon2LV_seirenATK, n_A_Weapon2_ATKplus, n_A_WeaponLV, n_A_WeaponLV_Maxplus,
    n_A_WeaponLV_Minplus, n_A_WeaponLV_seirenATK, n_A_WeaponType, n_A_Weapon_ATKplus, n_A_card, set_BK_n_A_MATK,
    set_n_A_MATK
} from "../runtime/roro-state.js";
import {
    SKILL_ID_COUNT_OF_SOUL_ENERGY, SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO,
    SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS, SKILL_ID_FRIGNO_UTA, SKILL_ID_GENZYUTSU_ZANGETSU,
    SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU, SKILL_ID_IZAYOI, SKILL_ID_LESSON, SKILL_ID_MACE_SHUREN,
    SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_NATURE_LOGIC, SKILL_ID_NYAN_GRASS,
    SKILL_ID_ORATIO, SKILL_ID_RADIUS, SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_SERE, SKILL_ID_SERE_MODE,
    SKILL_ID_SHIRYO_ZYOKA, SKILL_ID_SLIMPOTION_PITCHER, SKILL_ID_SUMMON_AGNI, SKILL_ID_SUMMON_AQUA,
    SKILL_ID_SUMMON_TERA, SKILL_ID_SUMMON_VENTOS, SKILL_ID_TRANSCENDENCE, SKILL_ID_VACUUM_EXTREME
} from "../skill/skill.dat.js";
import {
    TIME_ITEM_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO, TIME_ITEM_ID_IORNE_STUFF,
    TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV2, TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV4,
    TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV6
} from "../equip/timeitem.dat.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";


export function ApplyPlayerCritRateVsMonsterShape(charaData, mobData) {
    let itemCount = 0, idx = 0;

//==== 物理攻撃時、△△形モンスターにクリティカル率＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		// クリティカル率＋○○よりも先に計算すること

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_CRITICAL_UP_RACE_SOLID; idx <= ITEM_SP_CRITICAL_UP_RACE_DRAGON; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		//----------------------------------------------------------------
		// ドラム種族の種族特性
		//----------------------------------------------------------------
		if (IsDoramJob(n_A_JOB)) {
			n_tok[ITEM_SP_CRITICAL_UP_RACE_HUMAN] += 2;
		}

		//----------------------------------------------------------------
		// 「勇者の靴　達人の槌　セット」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI)) > 0) {
			n_tok[ITEM_SP_CRITICAL_UP_RACE_UNDEAD] += 5 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_CRITICAL_UP_RACE_DEMON] += 5 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_CRITICAL_UP_RACE_HUMAN] += 5 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
		}
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2)) > 0) {
			n_tok[ITEM_SP_CRITICAL_UP_RACE_UNDEAD] += 5 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_CRITICAL_UP_RACE_DEMON] += 5 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_CRITICAL_UP_RACE_HUMAN] += 5 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
		}

		// クリティカル率＋○○
		charaData[CHARA_DATA_INDEX_CRI] = GetAdditionalCriticalRate(mobData);
		
//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyMatkPlus(charaData) {
    let vartmp = 0, confval = 0, sklLv = 0, bufLv = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, cardCount = 0, cardCountHeadTop = 0, cardCountBody = 0, idx = 0;

//==== ＭＡＴＫ＋　ここから
//==== 公式サイトで「装備Matk + ◯」と表記される効果もここで計算される
//================================================================================================================================
//================================================================================================================================
	{
	    let w = 0;
	    let statusMatk = 0;
	    let weaponMatk = 0;
		/** アイテム数・スキルLvを格納する一次変数 */
		let prefetch = 0;

	    //----------------------------------------------------------------
	    // ランダムエンチャント効果
	    //----------------------------------------------------------------
	    w += GetRndOptTotalValue(ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON, null, false);
	    // w += GetRndEnchValue(ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON);

	    if (SU_STR >= 120 && EquipNumSearch(1308)) w += 5;
	    if (SU_INT >= 120 && EquipNumSearch(1310)) w += 10;
	    if (SU_DEX >= 120 && EquipNumSearch(1312)) w += 10;
	    if (SU_INT >= 120 && EquipNumSearch(1314)) w += 10;
	    if (SU_INT >= 120 && EquipNumSearch(1319)) w += 10;
	    if (n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1337)) w += 3 * (n_A_Weapon_ATKplus - 5);
	    if (EquipNumSearch(1379)) w += 10 * n_A_Weapon_ATKplus;
	    if (EquipNumSearch(1385)) w += 2 * n_A_SHIELD_DEF_PLUS;
	    if (SU_INT >= 80 && EquipNumSearch(1528)) {
	        var wx = EquipNumSearch(1528);
	        w += 5 * wx;
	        if (SU_INT >= 100) w += 5 * wx;
	        if (SU_INT >= 120) w += 5 * wx;
	    }
	    if (EquipNumSearch(1628)) {
	        w += 15 * n_A_Weapon_ATKplus;
	        if (n_A_Weapon_ATKplus >= 10) w += 50;
	    }
	    if (EquipNumSearch(1629)) {
	        w += 20 * n_A_Weapon_ATKplus;
	        if (n_A_Weapon_ATKplus >= 10) w += 50;
	    }
	    if (EquipNumSearch(1664)) w += 3 * n_A_Weapon_ATKplus;
	    if (SU_INT >= 120 && EquipNumSearch(1686)) w += 10;
	    if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 1742) {
	        if (n_A_Weapon_ATKplus >= 5) w += 30;
	        if (n_A_Weapon_ATKplus >= 7) w += 40;
	        if (n_A_Weapon_ATKplus >= 9) w += 50;
	    }
	    if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1742) {
	        if (n_A_Weapon2_ATKplus >= 5) w += 30;
	        if (n_A_Weapon2_ATKplus >= 7) w += 40;
	        if (n_A_Weapon2_ATKplus >= 9) w += 50;
	    }
	    if (EquipNumSearch(1790)) w += 10 * n_A_Weapon_ATKplus;
	    w += n_tok[245];

	    // 知力の時空ブーツ
	    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(1918)) {
	        w += 10 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
	    }
	    if (SU_INT >= 120 && EquipNumSearch(1918)) {
	        w += 60;
	    }
	    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)) {
	        w += 10 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
	    }
	    if (SU_INT >= 120 && EquipNumSearch(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)) {
	        w += 60;
	    }

	    if (EquipNumSearch(1947)) w += ROUNDDOWN(SU_INT / 10) * EquipNumSearch(1947);
	    if (2039 <= n_A_Equip[EQUIP_REGION_ID_ARMS] && n_A_Equip[EQUIP_REGION_ID_ARMS] <= 2041) {
	        w += 5 * n_A_Weapon_ATKplus;
	        if (n_A_Weapon_ATKplus >= 7) w += 20;
	        if (n_A_Weapon_ATKplus >= 10) w += 30;
	    }
	    if (SU_INT >= 120 && EquipNumSearch(2093)) w += 25;
	    if (EquipNumSearch(2194)) w += 10 * n_A_Weapon_ATKplus;
	    if (EquipNumSearch(2201)) w += 5 * n_A_HEAD_DEF_PLUS;
	    if (EquipNumSearch(2202)) w += 7 * n_A_HEAD_DEF_PLUS;
	    if (CardNumSearch(736)) w += 5 * ROUNDDOWN(SU_INT / 10);
	    if (n_A_WeaponType == 12 && n_A_Weapon_ATKplus >= 10) w += 20 * CardNumSearch(735);
	    if (EquipNumSearch(2242)) w += 2 * ROUNDDOWN(SU_LUK / 10);
	    if (n_A_SHIELD_DEF_PLUS >= 9 && EquipNumSearch(2253)) w += 5;
	    if (n_A_card[CARD_REGION_ID_HEAD_TOP] == 750) w += 5 * n_A_HEAD_DEF_PLUS;
	    if (n_A_SHIELD_DEF_PLUS >= 7 && EquipNumSearchMIG(2322)) {
	        w += 20;
	        if (n_A_SHIELD_DEF_PLUS >= 9 && EquipNumSearch(2323)) {
	            w += 15 * n_A_Weapon_ATKplus;
	            if (n_A_Weapon_ATKplus >= 10) w += 50;
	        }
	    }
	    if (EquipNumSearch(2339)) w += 10 * n_A_Weapon_ATKplus;
	    if (CardNumSearch(821)) {
	        if (n_A_HEAD_DEF_PLUS >= 7) w += 10 * CardNumSearch(821);
	        if (n_A_HEAD_DEF_PLUS >= 9) w += 10 * CardNumSearch(821);
	    }
	    if (EquipNumSearch(2413)) w += 7 * n_A_HEAD_DEF_PLUS;

	    // アイオーンスタッフ特殊効果
	    if (TimeItemNumSearch(84)) {
	        w += 24 * LearnedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU);
	    }

	    if (EquipNumSearch(2439)) w += 10 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3) * EquipNumSearch(2439);

	    if (CardNumSearch(CARD_ID_ENCHANT_A_INT)) {

	        cardCountBody = CardNumSearch(CARD_ID_ENCHANT_A_INT, CARD_REGION_ID_BODY_ANY);

	        w += 1 * Math.floor(SU_INT / 10) * cardCountBody;

	        if (n_A_BODY_DEF_PLUS >= 7) {
	            w += 2 * Math.floor(SU_INT / 10) * cardCountBody;
	        }
	        if (n_A_BODY_DEF_PLUS >= 8) {
	            w += 4 * Math.floor(SU_INT / 10) * cardCountBody;
	        }
	        if (n_A_BODY_DEF_PLUS >= 9) {
	            w += 8 * Math.floor(SU_INT / 10) * cardCountBody;
	        }
	    }

	    if (EquipNumSearchMIG(2499)) {
	        w += 2 * ROUNDDOWN(SU_DEX / 10);
	        if (SU_DEX >= 108) w += 60;
	        if (SU_DEX >= 120) w += 100;
	    }
	    if (EquipNumSearch(2528)) w += 15 * n_A_BODY_DEF_PLUS;

	    //----------------------------------------------------------------
	    // 「ヴァルキリーハンマー」の、職業による強化
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER)) {
	        switch (GetLowerJobSeriesID(n_A_JOB)) {

	            // ノービス系
	            case JOB_SERIES_ID_NOVICE:
	                w += 200;
	                break;

	                // ソードマン系
	            case JOB_SERIES_ID_SWORDMAN:
	                break;

	                // マーチャント系
	            case JOB_SERIES_ID_MERCHANT:
	                break;

	            default:
	                switch (GetHigherJobSeriesID(n_A_JOB)) {

	                    // プリースト系
	                    case JOB_SERIES_ID_PRIEST:
	                        w += 100;
	                        break;

	                        // モンク系
	                    case JOB_SERIES_ID_MONK:
	                        break;
	                }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「古びたミダスのささやき」の、精錬による強化
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_FURUBITA_MIDASS)) {
	        w += 7 * n_A_HEAD_DEF_PLUS;
	    }

	    //----------------------------------------------------------------
	    // 「エメラルドイヤリング」の、装備効果
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_EMERALDEARRING)) {
	        w += ROUNDDOWN(LearnedSkillSearch(SKILL_ID_LESSON) / 2) * 20 * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	    }

	    //----------------------------------------------------------------
	    // 「魔法石の恩恵」の、装備効果
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_MAHOSEKINO_ONKE)) {
	        w += SU_INT;
	    }

	    //----------------------------------------------------------------
	    // 「ヴァルキリーナイフ」の、職業による強化
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
	        switch (GetLowerJobSeriesID(n_A_JOB)) {

	            // ノービス系
	            case JOB_SERIES_ID_NOVICE:
	                w += 150 * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
	                w += 15 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
	                break;

	                // マジシャン系
	            case JOB_SERIES_ID_MAGICIAN:
	                break;

	                // シーフ系
	            case JOB_SERIES_ID_THIEF:
	                w += 150 * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
	                break;

	            default:
	                switch (GetHigherJobSeriesID(n_A_JOB)) {

	                    // ハンター系
	                    case JOB_SERIES_ID_HUNTER:
	                        break;

	                        // バード系、ダンサー系
	                    case JOB_SERIES_ID_BARD:
	                    case JOB_SERIES_ID_DANCER:
	                        break;
	                }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「カルデュイの法衣　ラフィネセット」の、効果
	    //----------------------------------------------------------------
	    if (EquipNumSearchMIG(ITEM_SET_ID_CARDYUINO_HOI_LAFINE_STUFF)) {

	        w += 3 * n_A_Weapon_ATKplus;

	        if (n_A_BODY_DEF_PLUS >= 7) {
	            w += 5 * n_A_Weapon_ATKplus;
	        }

	        if (n_A_BODY_DEF_PLUS >= 8) {
	            w += 7 * n_A_Weapon_ATKplus;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「サバイバルオーブ　ロッドセット」の、装備効果
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX) ||
	        EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT)) {
	        w += 10 * n_A_Weapon_ATKplus;
	    }

	    //----------------------------------------------------------------
	    // 「レインボウ」の、精錬による効果
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_RAIN_BO)) {
	        w += 10 * n_A_HEAD_DEF_PLUS;
	    }

	    //----------------------------------------------------------------
	    // 「ガイアシールド」の、精錬による効果
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
	        if (n_A_SHIELD_DEF_PLUS >= 8) {
	            if (SU_INT >= 90) {
	                w += 30;
	            }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「神魔バフォメットの角　ブラッディクロスセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS)) > 0) {
	        w += 15 * n_A_Weapon_ATKplus * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「サファイアリスト」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_SAPPHIRE_LIST)) > 0) {
	        var upCount = Math.floor(LearnedSkillSearch(SKILL_ID_SLIMPOTION_PITCHER) / 2);
	        w += 20 * upCount * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「エルダーの御霊」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ELDERNO_MITAMA)) > 0) {
	        vartmp = 0;

	        if (n_A_SHOULDER_DEF_PLUS >= 5) vartmp += 5 * ROUNDDOWN(SU_INT / 60);
	        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5 * ROUNDDOWN(SU_INT / 10);

	        w += vartmp * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「エルダーの御霊　毀損された古書カードセット」の、素ＩＮＴによる効果（ペナルティ）
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_ELDERNO_MITAMA_KISONSARETA_KOSHO_CARD)) > 0) {
	        w += -5 * ROUNDDOWN(SU_INT / 10) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「邪念のロッド」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_ROD, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_ROD, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
	        w += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「邪念のスタッフ」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_STUFF, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_STUFF, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
	        w += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「邪念のブック」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_BOOK, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_BOOK, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
	        w += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「邪念のバイオリン」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_VIOLIN, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_VIOLIN, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
	        w += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「邪念のワイヤー」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_WIRE, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_WIRE, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
	        w += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「暴徒のスカーフ　グラスセット」の、素ＩＮＴと素ＤＥＸによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
	        w += 120 * ROUNDDOWN((SU_INT + SU_DEX) / 80) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「暴徒のスカーフ　サングラスセット」の、素ＩＮＴと素ＤＥＸによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
	        w += 120 * ROUNDDOWN((SU_INT + SU_DEX) / 80) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「火雷大神靴」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU)) > 0) {
	        w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「火雷大神靴　月夜花カード　セット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	        } else {
	            w += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「アネモスシールド」の、精錬による効果
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
	        if (n_A_SHIELD_DEF_PLUS >= 8) {
	            if (SU_INT >= 90) {
	                w += 30;
	            }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ソヒョンの小太刀　ソヒョンの羽衣セット」の、精錬による強化
	    //----------------------------------------------------------------
	    if (EquipNumSearch(ITEM_SET_ID_SOHIONNO_KODACHI_SOHIONNO_HAGOROMO)) {
	        w += 5 * n_A_SHOULDER_DEF_PLUS;
	    }

	    //----------------------------------------------------------------
	    // 「[LoVA] キマカード」の、精錬による効果
	    //----------------------------------------------------------------
	    if (CardNumSearch(CARD_ID_LOVA_KIMA) > 0) {
	        if (n_A_SHOES_DEF_PLUS >= 7) {
	            w += 6 * ROUNDDOWN(SU_INT / 30);
	        }
	    }

	    //----------------------------------------------------------------
	    // 「[LoVA] 真化キマカード」の、精錬による効果
	    //----------------------------------------------------------------
	    if (CardNumSearch(CARD_ID_LOVA_SHINKA_KIMA) > 0) {
	        if (n_A_SHOES_DEF_PLUS >= 7) {
	            w += 6 * ROUNDDOWN(SU_INT / 10);
	        }
	    }

	    //----------------------------------------------------------------
	    // 「セリーヌ・キミカード　リボンセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if (CardNumSearch(CARD_SET_ID_CELINE_KIMI_CELINENO_RIBBON)) {
	        w += 7 * n_A_Weapon_ATKplus;
	    }

	    //----------------------------------------------------------------
	    // 「将軍デヒョンカード」の、強化
	    //----------------------------------------------------------------
	    if (CardNumSearch(CARD_ID_SHOGUN_DAEHYON)) {
	        if (n_A_WeaponType == ITEM_KIND_SWORD ||
	            n_A_WeaponType == ITEM_KIND_SWORD_2HAND) {
	            w += 100;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「獄エンチャント」の、職業による効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_GOKU)) > 0) {
	        // 職業限定の効果
	        if (IsSameJobClass(JOB_ID_GENETIC)) {
	            w += 50;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「巨大樹の若葉　カルデュイの耳セット」の、素ＤＥＸによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI)) > 0) {
	        if (SU_DEX >= 108) {
	            w += 20 * itemCount;
	        }
	        if (SU_DEX >= 120) {
	            w += 30 * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「エクセリオンシールド」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_EXELION_SHIELD)) > 0) {
	        w += 30 * ROUNDDOWN(n_A_SHIELD_DEF_PLUS / 3) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「トップブレードライダーカード」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_TOP_BLADE_RIDER)) > 0) {
	        if (n_A_SHOULDER_DEF_PLUS >= 7) {
	            w += 40;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「カニバラウスカード」の、素ＩＮＴによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_CARNIVARAUS)) > 0) {
	        w += 3 * ROUNDDOWN(SU_INT / 10) * cardCount;

	        if (SU_INT >= 130) {
	            w += 50 * cardCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ラウンドライダーカード」の、素ＩＮＴによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_ROUND_RIDER)) > 0) {
	        if (SU_INT >= 120) {
	            w += 30 * cardCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「自警団のスーツ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ZIKEIDANNNO_SUITS)) > 0) {
	        w += 10 * n_A_BODY_DEF_PLUS * itemCount;

	        if (n_A_BODY_DEF_PLUS >= 7) {
	            w += 20 * itemCount;
	        }

	        if (n_A_BODY_DEF_PLUS >= 9) {
	            w += 30 * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ニーヴバレッタ　ニーヴ武器セット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
	        w += 20 * n_A_Weapon_ATKplus * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ニーヴバレッタ　ニーヴ武器セット」の、素ＩＮＴによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
	        w += 20 * ROUNDDOWN(SU_INT / 10) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ジェミニ」の、精錬による効果
	    //----------------------------------------------------------------
	    cardCountHeadTop = CardNumSearch(CARD_ID_GEMINI, CARD_REGION_ID_HEAD_TOP_ANY);
	    if (cardCountHeadTop > 0) {
	        // 職業限定の効果
	        if (IsSameJobClass(JOB_ID_WANDERER)) {
	            w += 5 * n_A_HEAD_DEF_PLUS * cardCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「トンボがとまった猫じゃらし」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        vartmp = 0;
	        vartmp += 2 * n_A_Weapon_ATKplus;
	        if (n_A_Weapon_ATKplus >= 7) vartmp += 15;
	        if (n_A_Weapon_ATKplus >= 8) vartmp += 30;
	        w += vartmp * itemCountRight;

	        vartmp = 0;
	        vartmp += 2 * n_A_Weapon2_ATKplus;
	        if (n_A_Weapon2_ATKplus >= 7) vartmp += 15;
	        if (n_A_Weapon2_ATKplus >= 8) vartmp += 30;
	        w += vartmp * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「トンボがとまった妙なる猫じゃらし」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MYOUNARU_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MYOUNARU_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        vartmp = 0;
	        vartmp += 4 * n_A_Weapon_ATKplus;
	        if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
	        if (n_A_Weapon_ATKplus >= 8) vartmp += 40;
	        w += vartmp * itemCountRight;

	        vartmp = 0;
	        vartmp += 4 * n_A_Weapon2_ATKplus;
	        if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
	        if (n_A_Weapon2_ATKplus >= 8) vartmp += 40;
	        w += vartmp * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「トンボがとまった神妙な猫じゃらし」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 5 * n_A_Weapon_ATKplus * itemCountRight;
	        w += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「トンボがとまった魔力の猫じゃらし」の、精錬による効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 6 * n_A_Weapon_ATKplus * itemCountRight;
	        w += 6 * n_A_Weapon2_ATKplus * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「ストロベリーハット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_STRAWBERRY_HAT)) > 0) {
	        w += 5 * n_A_HEAD_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ドラムスーツ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_DORAM_SUITS)) > 0) {
	        w += 5 * n_A_BODY_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「高級ドラムスーツ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SUITS)) > 0) {
	        w += 10 * n_A_BODY_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「特選ドラムスーツ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SUITS)) > 0) {
	        w += 15 * n_A_BODY_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ドラムシューズ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_DORAM_SHOES)) > 0) {
	        w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「高級ドラムシューズ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SHOES)) > 0) {
	        w += 10 * n_A_SHOES_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「特選ドラムシューズ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SHOES)) > 0) {
	        w += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「アクエリアス」の、職業による効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_AQUARIUS, CARD_REGION_ID_HEAD_TOP)) > 0) {
	        // 職業限定の効果
	        if (IsSameJobClass(JOB_ID_WARLOCK)) {
	            w += 4 * n_A_HEAD_DEF_PLUS * cardCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「イリュージョンマフラー」の、ベースレベルによる強化
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MUFFLER)) > 0) {
	        if (n_A_BaseLV >= 170) {
	            w += 20 * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「イリュージョンシューズ」の、ベースレベルによる強化
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SHOES)) > 0) {
	        if (n_A_BaseLV >= 170) {
	            w += 50 * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「イリュージョン骸骨の指輪」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GAIKOTSUNO_YUBIWA)) > 0) {
	        if (n_A_BaseLV >= 170) {
	            w += 30 * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「星の眼帯　オークヒーローカードセット」の、素ＶＩＴによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHINO_GANTAI_ORC_HERO_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 10 * Math.floor(SU_VIT / 10) * itemCount;
	        } else {
	            w += 30 * Math.floor(SU_VIT / 10) * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ホロウシューズ　ヴェルゼブブカードセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOROW_SHOES_VERSEVV_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	        } else {
	            w += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「武侠靴　剣セット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BUKYO_KUTSU_SWORD)) > 0) {
	        w += 25 * n_A_SHOES_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「血塗られた人形のドレス　セリーヌのリボンセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON)) > 0) {
	        w += 20 * n_A_BODY_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ヘヴンリーオーダー」の、素ＬＵＫによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
	        w += 15 * Math.floor(SU_LUK / 18) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「テュポーンの皮」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_TUPOONNO_KAWA)) > 0) {
	        if (n_A_SHOULDER_DEF_PLUS >= 8) {
	            w += 15 * Math.floor((SU_AGI + SU_VIT) / 20) * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「イリュージョンブーツ」の、ベースレベルによる強化
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_BOOTS)) > 0) {
	        if (n_A_BaseLV >= 170) {
	            w += 50 * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「リングオブジュピター」の、素ＬＵＫによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSORY_1)) > 0) {
	        w += 15 * Math.floor(SU_LUK / 10) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「虹色のねこじゃらし　レインボウセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_RAIN_BO)) > 0) {
	        w += 15 * n_A_HEAD_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「不死鳥の猫じゃらし　フレイムバードセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FLAME_BIRD)) > 0) {
	        w += 15 * n_A_HEAD_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「古のウータンシューターカード」の、素ＶＩＴによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_WOOTANG_SHOOTER)) > 0) {
	        w += 3 * Math.floor(SU_VIT / 10) * cardCount;
	    }

	    //----------------------------------------------------------------
	    // 「古のウータンシューターカード」の、素ＬＵＫによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_WOOTANG_SHOOTER)) > 0) {
	        w += 3 * Math.floor(SU_LUK / 10) * cardCount;
	    }

	    //----------------------------------------------------------------
	    // 「ディアボロスウィング　ローブセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE)) > 0) {
	        w += 15 * n_A_BODY_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ディアボロスウィング　ブーツセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS)) > 0) {
	        w += 20 * n_A_SHOES_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「宝瓶宮のスタッフ」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_HOBINKYUNO_STUFF, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_HOBINKYUNO_STUFF, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 1 * n_A_BaseLV * itemCountRight;
	        w += 1 * n_A_BaseLV * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「ふわふわタンポポシューズ」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
	        if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
	            if (LearnedSkillSearch(SKILL_ID_NYAN_GRASS) >= 5) {
	                w += 50 * itemCount;
	            }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ふわふわタンポポシューズ」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
	        if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
	            if (LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO) >= 5) {
	                w += 50 * itemCount;
	            }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「エウロパローブ」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_EUROPA_ROBE)) > 0) {
	        if (n_A_BODY_DEF_PLUS >= 8) {
	            w += 10 * Math.floor((SU_VIT + SU_LUK) / 10) * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「磨羯宮のシーフボウ」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_MAKATSUKYUNO_THIEF_BOW, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_MAKATSUKYUNO_THIEF_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 1 * n_A_BaseLV * itemCountRight;
	        w += 1 * n_A_BaseLV * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「処女宮のディバインクロス」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_SHOZYOKYUNO_DEVINE_CROSS, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_SHOZYOKYUNO_DEVINE_CROSS, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 1 * n_A_BaseLV * itemCountRight;
	        w += 1 * n_A_BaseLV * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「双児宮のバイオリン」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_SOZIKYUNO_VIOLIN, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_SOZIKYUNO_VIOLIN, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 1 * n_A_BaseLV * itemCountRight;
	        w += 1 * n_A_BaseLV * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「双児宮のロープ」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_SOZIKYUNO_ROPE, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_SOZIKYUNO_ROPE, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 1 * n_A_BaseLV * itemCountRight;
	        w += 1 * n_A_BaseLV * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「宝瓶宮のスタッフ」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    itemCountRight = EquipNumSearch(ITEM_ID_SOGYOKYUNO_STUFF_OF_SOUL, EQUIP_REGION_ID_ARMS);
	    itemCountLeft = EquipNumSearch(ITEM_ID_SOGYOKYUNO_STUFF_OF_SOUL, EQUIP_REGION_ID_ARMS_LEFT);
	    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
	        w += 1 * n_A_BaseLV * itemCountRight;
	        w += 1 * n_A_BaseLV * itemCountLeft;
	    }

	    //----------------------------------------------------------------
	    // 「ガーディアンオブソウル」の、素ＩＮＴと素ＤＥＸによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
	        w += 15 * Math.floor((SU_INT + SU_DEX) / 18) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「覚醒火雷大神靴　封印された月夜花カード　セット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	        } else {
	            w += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「火雷大神靴　封印された月夜花カード　セット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 3 * n_A_SHOES_DEF_PLUS * itemCount;
	        } else {
	            w += 10 * n_A_SHOES_DEF_PLUS * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「黒無常帽　覚醒ローブセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUROMUZYO_BO_KAKUSEI_ROBE)) > 0) {
	        w += 7 * n_A_BODY_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「セブン-イレブンヘッドホン」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_SEVEN_ELEVEN_HEADPHONE)) > 0) {
	        w += 1 * n_A_BaseLV * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ランナウェー・アクセラレータ　T-MagicBoost」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_MAGIC_BOOST)) > 0) {
	        w += 10 * n_A_HEAD_DEF_PLUS * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「下水クランプカード」の、素ＩＮＴによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_GESUI_CLAMP)) > 0) {
	        w += 3 * Math.floor(SU_INT / 10) * cardCount;
	    }

	    //----------------------------------------------------------------
	    // 「下水クランプカード」の、素ＡＧＩによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_GESUI_CLAMP)) > 0) {
	        w += 3 * Math.floor(SU_AGI / 10) * cardCount;
	    }

	    //----------------------------------------------------------------
	    // 「ブルーアリエスカード」の、素ＩＮＴによる効果
	    //----------------------------------------------------------------
	    if ((cardCount = CardNumSearch(CARD_ID_BLUE_ARIES)) > 0) {
	        w += 5 * Math.floor(SU_INT / 10) * cardCount;
	    }

	    //----------------------------------------------------------------
	    // 「浮遊するアーティファクト」の、ベースレベルによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_FUYUSURU_ARTIFACT)) > 0) {
	        w += 1 * n_A_BaseLV * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「インペリアルサイキックローブ」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_PSYCHIC_ROBE)) > 0) {
	        if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
	            w += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「グレースサイキックローブ」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_PSYCHIC_ROBE)) > 0) {
	        if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
	            w += 1 * n_A_BaseLV * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「インペリアルパニッシュメントローブ」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_PUNISHMENT_ROBE)) > 0) {
	        if (LearnedSkillSearch(SKILL_ID_RADIUS) >= 3) {
	            w += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「グレースパニッシュメントローブ」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_PUNISHMENT_ROBE)) > 0) {
	        if (LearnedSkillSearch(SKILL_ID_RADIUS) >= 3) {
	            w += 1 * n_A_BaseLV * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「覚醒ホロウシューズ　ヴェルゼブブカードセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	        } else {
	            w += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「覚醒ホロウシューズ　封印されたヴェルゼブブカードセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HOROW_SHOES_FUINSARETA_VERSEVV_CARD)) > 0) {

	        // 重複セットは発動しない
	        if (EquipNumSearch(ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD_FUINSARETA_VERSEVV_CARD) == 0) {
	            if (n_A_BaseLV <= 99) {
	                w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	            } else {
	                w += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	            }
	        }
	    }

	    //----------------------------------------------------------------
	    // 「星の眼帯　封印されたオークヒーローカードセット」の、素ＶＩＴによる効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHINO_GANTAI_FUINSARETA_ORC_HERO_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 3 * Math.floor(SU_VIT / 10) * itemCount;
	        } else {
	            w += 10 * Math.floor(SU_VIT / 10) * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ホロウシューズ　封印されたヴェルゼブブカードセット」の、精錬による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOROW_SHOES_FUINSARETA_VERSEVV_CARD)) > 0) {
	        if (n_A_BaseLV <= 99) {
	            w += 2 * n_A_SHOES_DEF_PLUS * itemCount;
	        } else {
	            w += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「フォー・オブ・ア・カインド」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_FOUR_OF_A_KIND)) > 0) {
	        w += 50 * LearnedSkillSearch(SKILL_ID_RADIUS) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「エレメンタルポゼッション」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_ELEMENTAL_POSSESSION)) > 0) {
	        w += 15 * LearnedSkillSearch(SKILL_ID_SUMMON_AGNI) * itemCount;
	        w += 15 * LearnedSkillSearch(SKILL_ID_SUMMON_AQUA) * itemCount;
	        w += 15 * LearnedSkillSearch(SKILL_ID_SUMMON_VENTOS) * itemCount;
	        w += 15 * LearnedSkillSearch(SKILL_ID_SUMMON_TERA) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「ラウドパーク」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_LOUD_PARK)) > 0) {
	        w += 30 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
	    }

	    //----------------------------------------------------------------
	    // 「アメイジング・グレイス」の、スキル習得による効果
	    //----------------------------------------------------------------
	    if ((itemCount = EquipNumSearch(ITEM_ID_AMAZING_GRACE)) > 0) {
	        w += 15 * LearnedSkillSearch(SKILL_ID_ORATIO) * itemCount;
	    }

	    /** 三次職支援設定「月明かりのセレナーデ」の装備Matk + 効果 */
		if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_MOONLIT_SERENADE]) > 0) {
			w += -20 + 50 * bufLv;
			// 提供された情報に合わせてありますが風車と同じでLvに依らず lesson * 2 が正しいかもしれない
			const lesson = g_confDataSanzi[CCharaConfSanzi.CONF_ID_LESSON];
			if (lesson === 5) {
				w += lesson * 2;
			} else {
				w += lesson;
			}
		}

	    //----------------------------------------------------------------
	    // 「アークビショップ　オーディンの力」の、効果
	    //----------------------------------------------------------------
	    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_ODINNO_CHIKARA]) > 0) {

	        // 特定の戦闘エリアでの補正
	        switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

	            case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
	                w += 100 + 100 * bufLv;
	                break;

	            default:
	                w += 40 + 30 * bufLv;
	                break;

	        }
	    }

	    //----------------------------------------------------------------
	    // 「影狼・朧　十六夜」の、効果
	    //----------------------------------------------------------------
	    w += ROUNDDOWN(n_A_JobLV / 2) * UsedSkillSearch(SKILL_ID_IZAYOI);

	    //----------------------------------------------------------------
	    // 「影狼・朧　幻術-残月-」の、効果
	    //----------------------------------------------------------------
	    if (UsedSkillSearch(SKILL_ID_GENZYUTSU_ZANGETSU)) {
	        if ((UsedSkillSearch(SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU) == 0) ||
	            (UsedSkillSearch(SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU) == 2)) {
	            w += 20 * UsedSkillSearch(SKILL_ID_GENZYUTSU_ZANGETSU) + ROUNDDOWN(n_A_BaseLV / 3);
	        } else {
	            w -= 30 * UsedSkillSearch(SKILL_ID_GENZYUTSU_ZANGETSU) + ROUNDDOWN(n_A_BaseLV / 3);
	        }
	    }

	    if (UsedSkillSearch(SKILL_ID_SERE_MODE) == 1) {
	        switch (UsedSkillSearch(SKILL_ID_SERE)) {
	            case 4:
	                w += 40;
	                break;
	            case 5:
	                w += 80;
	                break;
	            case 6:
	                w += 120;
	                break;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ソウルリーパー　妖精の魂」の、効果
	    //----------------------------------------------------------------
	    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_YOSENO_TAMASHI]) > 0) {
	        w += 50;
	    }

	    //----------------------------------------------------------------
	    // 「三次職支援　チャタリング/ミャウミャウ」の、効果
	    //----------------------------------------------------------------
	    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_CHATTERING]) > 0) {

	        // 特定の戦闘エリアでの補正
	        switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

	            case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
	                w += 50 + 50 * bufLv;
	                break;

	            default:
	                switch (bufLv) {
	                    case 1:
	                        w += 30;
	                        break;
	                    case 2:
	                        w += 50;
	                        break;
	                    case 3:
	                        w += 70;
	                        break;
	                    case 4:
	                        w += 100;
	                        break;
	                    case 5:
	                        w += 150;
	                        break;
	                }
	                break;

	        }
	    }

	    //----------------------------------------------------------------
	    // 「サモナー　大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)」の、効果
	    //----------------------------------------------------------------
	    if (Math.max(LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI), UsedSkillSearch(SKILL_ID_DAICHINO_TAMASHI)) > 0) {
	        if ((sklLv = UsedSkillSearch(SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO)) > 0) {
	            w += 1 * n_A_BaseLV;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「サモナー　大地の魂効果(ニャングラス使用後のMATK＋)」の、効果
	    //----------------------------------------------------------------
	    if (Math.max(LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI), UsedSkillSearch(SKILL_ID_DAICHINO_TAMASHI)) > 0) {
	        if ((sklLv = UsedSkillSearch(SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS)) > 0) {
	            w += 1 * n_A_BaseLV;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「スーパーノービス＋　トランセンデンス」の、効果
	    //----------------------------------------------------------------
	    if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_TRANSCENDENCE), UsedSkillSearch(SKILL_ID_TRANSCENDENCE))) > 0) {
	        w += 15 * sklLv;

	        if (sklLv >= 5) {
	            w += 25;
	        }
	    }

	    //----------------------------------------------------------------
	    // 「ソウルリーパー　ソウルエナジーの個数」の、効果
	    //----------------------------------------------------------------
	    if (n_A_ActiveSkill != SKILL_ID_SHIRYO_ZYOKA) {
	        // 死霊浄化はソウルエナジー全消費後のMATKを基準にダメージ計算する必要があるため除外する
	        w += 3 * UsedSkillSearch(SKILL_ID_COUNT_OF_SOUL_ENERGY);
	    }

		/** ドルイド「ネイチャーロジック」による装備Matk + 効果 */
		w += 15 * LearnedSkillSearch(SKILL_ID_NATURE_LOGIC)

		// その他 未整理
	    if (TimeItemNumSearch(59)) w += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 3);
	    if (TimeItemNumSearch(85)) w += 7 * n_A_BODY_DEF_PLUS;
	    if (n_A_PassSkill7[49]) w += 30;
	    if (n_A_PassSkill7[51]) w += 25;
	    if (TimeItemNumSearch(79)) w += 24;
	    else if (n_A_PassSkill7[10]) w += 20;
	    else if (n_A_PassSkill7[2]) w += 10;
	    else if (n_A_PassSkill7[26]) w += 5;
	    if (0 < n_A_PassSkill7[43] && n_A_PassSkill7[43] <= 50) w += n_A_PassSkill7[43];

	    //----------------------------------------------------------------
	    // 「性能カスタマイズ」の、効果
	    //----------------------------------------------------------------
	    confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MATK_PLUS);
	    if (confval != 0) {
	        w += confval;
	    }

	    // TODO: 四次対応
	    for (idx = ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON; idx <= ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON; idx++) {
	        w = ApplySpecModify(idx, w);
	    }

	    n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON] += w;

	    // 拡張表示用にデータを保存
	    CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON, n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON]);

	    w = Math.floor(n_A_INT / 7);
	    //		statusMatk = n_A_INT + Math.floor((w * w + n_A_LUK) / 3 + n_A_DEX / 5);
	    statusMatk = n_A_INT + Math.floor((w * w * 5 + n_A_DEX * 3 + n_A_LUK * 5) / 15);
	    let wLEFT = 0;
	    if (n_Nitou) wLEFT = n_A_Weapon2LV_seirenATK;
	    weaponMatk = n_tok[ITEM_SP_MATK_PLUS_TYPE_WEAPON] + n_A_WeaponLV_seirenATK + wLEFT;

	    //----------------------------------------------------------------
	    // 「性能カスタマイズ」の、効果
	    //----------------------------------------------------------------
	    confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_WEAPON_MATK);
	    if (confval != 0) {
	        weaponMatk = confval * 5 + n_A_WeaponLV_seirenATK + wLEFT;
	    }

	    if (n_A_WeaponType == 10 || (17 <= n_A_WeaponType && n_A_WeaponType <= 21)) weaponMatk -= n_A_WeaponLV_seirenATK;
	    if (EquipNumSearch(897) && (GetHigherJobSeriesID(n_A_JOB) == 14 || GetLowerJobSeriesID(n_A_JOB) == 44)) weaponMatk += 90 * EquipNumSearch(897);

	    //----------------------------------------------------------------
	    // 計算した結果をキャラクターデータに保存
	    //----------------------------------------------------------------
	    charaData[CHARA_DATA_INDEX_STATUS_MATK] = statusMatk;
	    charaData[CHARA_DATA_INDEX_WEAPON_MATK] = weaponMatk;

	    set_n_A_MATK([0, 0, 0]);

	    if (charaData[CHARA_DATA_INDEX_WEAPON_MATK] >= 1) {
	        var wPENA = Math.floor(charaData[CHARA_DATA_INDEX_WEAPON_MATK] * 2 / 3) - Math.floor(Math.floor(n_A_INT / 5) * Math.floor(n_A_INT / 5) / n_A_WeaponLV);
	        if (wPENA < 0) wPENA = 0;
	        n_A_MATK[0] = Math.floor((charaData[CHARA_DATA_INDEX_WEAPON_MATK] * 5 + n_A_DEX * (n_A_WeaponLV * 2 + 12)) / 15) - wPENA;
	        n_A_MATK[2] = Math.floor(charaData[CHARA_DATA_INDEX_WEAPON_MATK] * (100 + 10 * n_A_WeaponLV) / 100) - wPENA;
	        if (n_A_MATK[0] > n_A_MATK[2]) n_A_MATK[0] = n_A_MATK[2];

	        // リコグナイズドスペル効果
	        if (UsedSkillSearch(SKILL_ID_RECOGNIZED_SPELL)) {
	            n_A_MATK[0] = n_A_MATK[1] = n_A_MATK[2];
	        } else if (TimeItemNumSearch(TIME_ITEM_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO)) {
	            n_A_MATK[0] = n_A_MATK[1] = n_A_MATK[2];
	        }

	        n_A_MATK[0] += n_A_WeaponLV_Minplus;
	        n_A_MATK[2] += n_A_WeaponLV_Maxplus;
	        if (n_A_WeaponType == 10 || (17 <= n_A_WeaponType && n_A_WeaponType <= 21)) {
	            n_A_MATK[0] -= n_A_WeaponLV_Minplus;
	            n_A_MATK[2] -= n_A_WeaponLV_Maxplus;
	        }
	        if (n_A_MATK[0] < 0) n_A_MATK[0] = 0;
	    }

	    // 特性ステータス対応
	    ApplySpecStatusModifyMATK(charaData, n_tok);

	    n_A_MATK[0] += charaData[CHARA_DATA_INDEX_STATUS_MATK];
	    n_A_MATK[2] += charaData[CHARA_DATA_INDEX_STATUS_MATK];
	    set_BK_n_A_MATK([0, 0, 0]);
	    BK_n_A_MATK[0] = n_A_MATK[0];
	    BK_n_A_MATK[2] = n_A_MATK[2];

	    if (!(533 <= n_A_ActiveSkill && n_A_ActiveSkill <= 536)) {
	        if (TimeItemNumSearch(TIME_ITEM_ID_IORNE_STUFF) == 0) {
	            // 魔法力増幅効果
	            if (UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU)) {
	                n_A_MATK[0] = Math.floor(n_A_MATK[0] * (1 + 0.05 * UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU)));
	                n_A_MATK[2] = Math.floor(n_A_MATK[2] * (1 + 0.05 * UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU)));
	            } else {
	                if (TimeItemNumSearch(TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV6)) {
	                    n_A_MATK[0] = Math.floor(n_A_MATK[0] * 1.3);
	                    n_A_MATK[2] = Math.floor(n_A_MATK[2] * 1.3);
	                } else if (TimeItemNumSearch(TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV4)) {
	                    n_A_MATK[0] = Math.floor(n_A_MATK[0] * 1.2);
	                    n_A_MATK[2] = Math.floor(n_A_MATK[2] * 1.2);
	                } else if (TimeItemNumSearch(TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV2)) {
	                    n_A_MATK[0] = Math.floor(n_A_MATK[0] * 1.1);
	                    n_A_MATK[2] = Math.floor(n_A_MATK[2] * 1.1);
	                }
	            }
	        }
	    }

	    n_Heal_MATK[0] = n_A_MATK[0];
	    n_Heal_MATK[2] = n_A_MATK[2];
	    n_Heal_MATK[1] = Math.floor((n_A_MATK[0] + n_A_MATK[2]) / 2);
	    n_A_MATK[0] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
	    n_A_MATK[2] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
	    BK_n_A_MATK[0] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
	    BK_n_A_MATK[2] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
	    n_A_MATK[1] = Math.floor((n_A_MATK[0] + n_A_MATK[2]) / 2);
	    BK_n_A_MATK[1] = Math.floor((BK_n_A_MATK[0] + BK_n_A_MATK[2]) / 2);
	}

//================================================================================================================================
//================================================================================================================================
//====
}
