/**
 * StAllCalc セクション分割: 魔法攻撃で与えるダメージ＋○○％、および ASPD 基礎計算・固定増加。
 *
 * この2つの「ここから」バナーは元々1つの関数に別々に対応するはずだったが、
 * let aspd がバナー境界をまたいで共有されている（ASPD計算が魔法攻撃セクションの
 * 途中から実質的に始まっている）ため、分離すると ReferenceError になる。
 * 検証済み（.claude/context/remaining-work.md「残作業 1」Phase 2、
 * tests/check-stallcalc-boundaries.mjs 参照）につき1ファイルへ統合した。
 *
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 * n_A_SpeedPOT は foot.js 専有のモジュールレベル変数（未export）のため、
 * import ではなく呼び出し元（StAllCalc）から明示的に引数で渡す。
 */
import { n_A_PassSkill7, UsedSkillSearch, n_A_PassSkill8 } from "./skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass, IsUsableBSPJob, IsUsableHSPJob, JOB_SERIES_ID_WIZARD
} from "./data/mig.job.h.js";
import {
    g_confDataDebuff, g_confDataNizi, g_confDataSanzi, g_constDataManager, g_objCharaConfCustomAtk,
    g_objCharaConfCustomStatus, n_Nitou
} from "./global.js";
import { ApplySpecModify, GetTotalPureBasicStatus } from "./hmjob.js";
import { n_A_ActiveSkill, n_A_Arrow, n_A_BaseLV, n_tok, set_aspdRaw } from "./ro4-state.js";
import { CCharaConfCustomAtk } from "./CCharaConfCustomAtk.js";
import { CCharaConfCustomStatus } from "./CCharaConfCustomStatus.js";
import { CCharaConfDebuff } from "./CCharaConfDebuff.js";
import { CCharaConfNizi } from "./CCharaConfNizi.js";
import { CCharaConfSanzi } from "./CCharaConfSanzi.js";
import { CExtraInfoAreaComponentManager } from "./CExtraInfoAreaComponentManager.js";
import { ARROW_ID_GANSEKINO_YA, ARROW_ID_HONOONO_YA, ARROW_ID_KAZENO_YA, ARROW_ID_SUISHONO_YA } from "./arrow.dat.js";
import {
    CARD_ID_ELITE_RGAN_HEALER, CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_ID_ENCHANT_ZOFUKU_1,
    CARD_ID_ENCHANT_ZOFUKU_2, CARD_ID_ENCHANT_ZOFUKU_3, CARD_ID_ENCHANT_ZOFUKU_4, CARD_ID_ENCHANT_ZOFUKU_5,
    CARD_ID_MAGANNO_AMDARAIS, CARD_ID_POWERFUL_AMDARAIS, CARD_ID_RUNE_KNIGHT_SEIREN_MVP,
    CARD_ID_SHADOW_CHASER_GARTY_MVP, CARD_ID_SHINKAINO_DEVIAS, CARD_ID_SORCERER_CERIA_MVP, CARD_ID_TOP_SIDE_RIDER,
    CARD_ID_WARLOCK_CATHERINE_MVP, CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_NYDHOGNO_KAGE,
    CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_VERSEVV, CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_SHOES, CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_ROBE, CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_MAIL, CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1
} from "./card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "./chara.js";
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "./common.js";
import { CHARA_DATA_INDEX_ASPD } from "./const/EnumCharaDataIndex.js";
import { CONST_DATA_KIND_JOB } from "./const/EnumConstDataKind.js";
import {
    EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_SHIELD
} from "./const/EnumEquipRegionId.js";
import {
    ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND, ITEM_KIND_BOOK, ITEM_KIND_BOW, ITEM_KIND_CLUB, ITEM_KIND_GATLINGGUN,
    ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_MUSICAL, ITEM_KIND_RIFLE, ITEM_KIND_SHIELD, ITEM_KIND_SHOTGUN,
    ITEM_KIND_SPEAR, ITEM_KIND_SPEAR_2HAND, ITEM_KIND_STUFF2HAND, ITEM_KIND_SWORD, ITEM_KIND_SWORD_2HAND,
    ITEM_KIND_WHIP
} from "./const/EnumItemKind.js";
import { ITEM_SP_ASPD_PLUS, ITEM_SP_ASPD_UP, ITEM_SP_STUFF2HAND } from "./const/EnumItemSpId.js";
import {
    JOB_ID_ARCBISHOP, JOB_ID_MINSTREL, JOB_ID_RUNEKNIGHT, JOB_ID_SHADOWCHASER, JOB_ID_SORCERER, JOB_ID_SOUL_REAPER,
    JOB_ID_STARGRADIATOR, JOB_ID_SUMMONER, JOB_ID_WANDERER, JOB_ID_WARLOCK, JOB_ID_WIZARD
} from "./const/EnumJobId.js";
import { GetAdditionalAspdPercent } from "./foot-aspd.js";
import { GetRndOptTotalValue } from "./hmrndopt.js";
import {
    ITEM_ID_AKUMASUHAISHANO_KUTSU, ITEM_ID_ANGELING_SUITS, ITEM_ID_DAISHINKANNO_TEBUKURO, ITEM_ID_DARK_HAND,
    ITEM_ID_DARK_RING, ITEM_ID_DIVA_BOOK, ITEM_ID_DIVA_FOXTAIL, ITEM_ID_DIVA_STUFF, ITEM_ID_DIVA_WAND,
    ITEM_ID_EIKONO_AKASHI, ITEM_ID_FIFTH_ELEMENT, ITEM_ID_FUTTOSURU_KONTONNO_TATE, ITEM_ID_KODAIRYUNO_HOKAN,
    ITEM_ID_KOONO_OKAN, ITEM_ID_KOREIZYUTSUSHINO_GAITO, ITEM_ID_KYUKETSUKINO_SHIMOBE, ITEM_ID_MAHOSEKINO_ONKE,
    ITEM_ID_MARYOKUNO_KUSANO_NECKLACE, ITEM_ID_MASSHOSHANO_ROBE, ITEM_ID_MAZYONO_SAISHIBO, ITEM_ID_MIRRORAGE_BOOK,
    ITEM_ID_MIRRORAGE_FOXTAIL, ITEM_ID_MIRRORAGE_STUFF, ITEM_ID_MIRRORAGE_WAND, ITEM_ID_MYSTERY_WING,
    ITEM_ID_NIEVE_ARCWAND, ITEM_ID_NIEVE_BASTER, ITEM_ID_NIEVE_CRAYMORE, ITEM_ID_NIEVE_CROSS_BOW,
    ITEM_ID_NIEVE_DIVINE_CROSS, ITEM_ID_NIEVE_FUMA_SHURIKEN, ITEM_ID_NIEVE_GRAVE, ITEM_ID_NIEVE_GUILLOTINE,
    ITEM_ID_NIEVE_HOLYSTICK, ITEM_ID_NIEVE_HUNTER_BOW, ITEM_ID_NIEVE_RIFLE, ITEM_ID_NIEVE_THIEF_BOW,
    ITEM_ID_NIEVE_WIZARD_STUFF, ITEM_ID_NIEVE_ZYAMADAHAR, ITEM_ID_NIRONO_RIBBON, ITEM_ID_NIZIIRONO_MUFFLER,
    ITEM_ID_NOEQUIP_SHIELD, ITEM_ID_OSHABERI_OUMU, ITEM_ID_POROROCA_SHOES, ITEM_ID_RING_OF_VENUS,
    ITEM_ID_RISUMIMI_HOODBO, ITEM_ID_RUDONO_KUROI_HANE, ITEM_ID_SABAKINO_KUTSU, ITEM_ID_SENSHISHANO_MANT,
    ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1, ITEM_ID_STUFF_OF_SOUL, ITEM_ID_SURVIVAL_SHOES,
    ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI,
    ITEM_ID_WIZARD_STUFF, ITEM_SET_ID_AEGIR_RING_AEGIR_HELM,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU, ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SHOES,
    ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SUITS, ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL,
    ITEM_SET_ID_GENSONO_TOWEL_DAICHINO_YUMI, ITEM_SET_ID_GENSONO_TOWEL_HAYATENO_YUMI,
    ITEM_SET_ID_GENSONO_TOWEL_HYOTENNO_YUMI, ITEM_SET_ID_GENSONO_TOWEL_MOERU_YUMI,
    ITEM_SET_ID_ILLUSION_SURVIVAL_STUFF_ILLUSION_SURVIVAL_MANT, ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_DRESS,
    ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO, ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_KORE_ZYUTSUSHINO_GAITO,
    ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL, ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO,
    ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA_PET, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX_SURVIVAL_MANT,
    ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT_SURVIVAL_MANT
} from "./item.dat.js";
import { LearnedSkillSearch } from "./learnedskill.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "./mobconfplayer.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, n_A_AGI, n_A_BODY_DEF_PLUS, n_A_DEX, n_A_Equip, n_A_HEAD_DEF_PLUS,
    n_A_JOB, n_A_JobLV, n_A_LUK, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2Type,
    n_A_Weapon2_ATKplus, n_A_WeaponType, n_A_Weapon_ATKplus, n_A_card
} from "./roro-state.js";
import {
    SKILL_ID_ADRENALINE_RUSH, SKILL_ID_ADVANCED_BOOK, SKILL_ID_BERSERK, SKILL_ID_CHATTERING,
    SKILL_ID_CLOAKING_EXCEED, SKILL_ID_DAICHINO_CHIKARA, SKILL_ID_DEFENDER, SKILL_ID_DRAGON_TRAINING,
    SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_FIGHTING_SPIRIT, SKILL_ID_FULL_ADRENALINE_RUSH,
    SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO, SKILL_ID_HEAT_BARREL, SKILL_ID_HOSHINO_ANRAKU,
    SKILL_ID_INUHAKKA_METEOR, SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_KIHE_SHUREN, SKILL_ID_MADNESSS_CANCELER,
    SKILL_ID_MATATABINO_NEKKO, SKILL_ID_MATATABI_LANCE, SKILL_ID_MELANCHOLY, SKILL_ID_MYAUMYAU, SKILL_ID_NYAN_GRASS,
    SKILL_ID_ONEHAND_QUICKEN, SKILL_ID_OVERED_BOOST, SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_RADIUS,
    SKILL_ID_RUNE_MASTERY, SKILL_ID_SACRIFICE, SKILL_ID_SERE, SKILL_ID_SERE_MODE, SKILL_ID_SINGLE_ACTION,
    SKILL_ID_SPEAR_QUICKEN, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI,
    SKILL_ID_TAMASHINO_RENKETSU, SKILL_ID_TUZYO_KOGEKI, SKILL_ID_TWOHAND_QUICKEN
} from "./skill.dat.js";
import { TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_AR, TIME_ITEM_ID_RALF_FONG_TWIEGE_666 } from "./timeitem.dat.js";
import { EquipNumSearchFurubitaSet, ROUNDDOWN } from "./foot-bridge.js";


export function ApplyMagicalDamageUpAndAspdBase(charaData, n_A_SpeedPOT) {
    let vartmp = 0, confval = 0, sklLv = 0, bufLv = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, cardCount = 0, cardcount = 0, cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0, cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0, idx = 0, w = 0;

//==== 魔法攻撃で与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		w = 0;
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(642)) w += 3;
		if(EquipNumSearch(646)) w += Math.floor(n_A_Weapon_ATKplus / 2);
		if(EquipNumSearch(737)) w += n_A_Weapon_ATKplus;
		if(EquipNumSearch(1042)) w += n_A_Weapon_ATKplus;
		if(EquipNumSearch(1029) && n_A_HEAD_DEF_PLUS >= 6) w += n_A_HEAD_DEF_PLUS - 5;

		if(EquipNumSearch(1083)){
			w += n_A_Weapon_ATKplus;
		}
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1084)) w += 5;
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1095)) w += 5;
		if(SU_INT >= 90 && EquipNumSearch(1403)){
			w += 3;
			if(SU_INT >= 120) w += 2;
		}
		if(GetLowerJobSeriesID(n_A_JOB)==5 && CardNumSearch(454)) w +=3;
		if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[CARD_REGION_ID_HEAD_TOP]==177) w += 2;
		if(n_A_Equip[EQUIP_REGION_ID_ARMS]==484 && SU_INT >= 70) w += 5;
		if(EquipNumSearch(1173)) w += Math.floor(n_A_Weapon_ATKplus / 2);
		if(GetHigherJobSeriesID(n_A_JOB)==14) w += 10 * CardNumSearch(479);
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1361)){
			w += 3;
			if(n_A_HEAD_DEF_PLUS >= 7) w += 3;
		}
		if(EquipNumSearch(1411)) w += Math.floor(n_A_SHOES_DEF_PLUS / 2);
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1451)){
			w += 1;
			if(n_A_HEAD_DEF_PLUS >= 7) w += 2;
		}
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1596)) w += 5;
		if(EquipNumSearch(1695)) if(GetLowerJobSeriesID(n_A_JOB)==3 || GetLowerJobSeriesID(n_A_JOB)==5) w += 8;
		if(SU_INT >= 110 && EquipNumSearch(1947)) w += 1 * EquipNumSearch(1947);
		if(SU_INT >= 99 && EquipNumSearch(1976)){
			w += 2;
			if(SU_INT >= 120) w += 3;
		}

		// アイオーンスタッフ特殊効果
		if(TimeItemNumSearch(84)) {
			w += 8 * LearnedSkillSearch(SKILL_ID_RADIUS);
		}

		if(EquipNumSearch(2442)) w += ROUNDDOWN((n_A_SHOES_DEF_PLUS + n_A_HEAD_DEF_PLUS) / 2);
		if(EquipNumSearch(2462)) w += n_A_HEAD_DEF_PLUS;

		//----------------------------------------------------------------
		// 「戦死者のマント」の、純粋なＩＮＴが１３０の時
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)){
			if (SU_INT >= 130) {
				if (EquipNumSearchFurubitaSet() > 0) {
					w += 10;
				} else {
					w += 5;
				}
			}
		}

		//----------------------------------------------------------------
		// 「魔法石の恩恵」の、装備効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_MAHOSEKINO_ONKE)) {
			if (n_A_HEAD_DEF_PLUS >= 5) w += 3;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 5;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 7;
		}

		//----------------------------------------------------------------
		// 「ポロロッカシューズ」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_POROROCA_SHOES)) {
			if (n_A_SHOES_DEF_PLUS >= 5) w += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) w += 5;
		}

		//----------------------------------------------------------------
		// 「おしゃべりオウム」の、効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_OSHABERI_OUMU)) {
			w += ROUNDDOWN(n_A_BaseLV / 50);
		}

		//----------------------------------------------------------------
		// 「古王の王冠」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_KOONO_OKAN)) {
			if (n_A_HEAD_DEF_PLUS >= 6) {
				w += (n_A_HEAD_DEF_PLUS - 5);
			}
		}

		//----------------------------------------------------------------
		// 「サバイバルオーブ　ロッド＆マントセット」の、装備効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX_SURVIVAL_MANT)
			|| EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT_SURVIVAL_MANT)) {
			if (n_A_Weapon_ATKplus >= 5) w += 2;
			if (n_A_Weapon_ATKplus >= 7) w += 2;
		}

		//----------------------------------------------------------------
		// 「裁きの靴」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_SABAKINO_KUTSU)) {
			if (n_A_SHOES_DEF_PLUS >= 5) w += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) w += 5;
		}

		//----------------------------------------------------------------
		// 「大神官の手袋」の、純粋なＩＮＴが１１０の時
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_DAISHINKANNO_TEBUKURO)){
			if (SU_INT >= 110) {
				w += 5 * EquipNumSearch(ITEM_ID_DAISHINKANNO_TEBUKURO);
			}
		}

		//----------------------------------------------------------------
		// 「ダークハンド」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DARK_HAND)) > 0) {
			w += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「魔女の祭祀帽」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MAZYONO_SAISHIBO)) > 0) {
			w += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「栄光の証」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_EIKONO_AKASHI)) > 0) {
			if (n_A_BaseLV >= 150) {
				w += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ディーヴァワンド」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_DIVA_WAND, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_WAND, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ディーヴァスタッフ」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_DIVA_STUFF, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_STUFF, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ディーヴァブック」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_DIVA_BOOK, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_BOOK, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ミラージュワンド」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_WAND, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_WAND, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ミラージュスタッフ」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_STUFF, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_STUFF, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ミラージュブック」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_BOOK, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_BOOK, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「悪魔崇拝者の靴」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AKUMASUHAISHANO_KUTSU)) {
			if (n_A_SHOES_DEF_PLUS >= 5) w += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) w += 5;
		}

		//----------------------------------------------------------------
		// 「エーギルリング　ヘルムセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_HELM)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「降霊術士の外套」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_KOREIZYUTSUSHINO_GAITO)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) w += 5;
			if (n_A_SHOULDER_DEF_PLUS >= 9) w += 5;
		}

		//----------------------------------------------------------------
		// 「ルドの黒い羽」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_RUDONO_KUROI_HANE)) {
			w += 3 * ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 2);
		}

		//----------------------------------------------------------------
		// 「エンジェリングスーツ」の、過剰精錬よる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ANGELING_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴクレイモア」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_CRAYMORE)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴグレイヴ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_GRAVE)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴジャマダハル」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_ZYAMADAHAR)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴウィザードスタッフ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_WIZARD_STUFF)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴアークワンド」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_ARCWAND)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴホーリーステッキ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_HOLYSTICK)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴディバインクロス」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_DIVINE_CROSS)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴギロチン」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_GUILLOTINE)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴバスター」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_BASTER)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴ風魔手裏剣」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_FUMA_SHURIKEN)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴシーフボウ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_THIEF_BOW)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴハンターボウ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_HUNTER_BOW)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴクロスボウ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_CROSS_BOW)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴライフル」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_RIFLE)) > 0) {
			if (n_A_BaseLV >= 175) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「襲撃者のローブ」の、追加発動による効果
		//----------------------------------------------------------------
		if ((bufLv = TimeItemNumSearch(137)) > 0) {
			w += 1 * n_A_BODY_DEF_PLUS * bufLv;
		}

		//----------------------------------------------------------------
		// 「抹消者のローブ」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_MASSHOSHANO_ROBE)) {
			w += 2 * n_A_BODY_DEF_PLUS;
		}

		//----------------------------------------------------------------
		// 「英雄の指輪　達人の槌セット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w += 5 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w += 15 * itemCount;
			}
		}
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w += 5 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「サバイバルシューズ」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_SURVIVAL_SHOES)) {
			if (n_A_SHOES_DEF_PLUS >= 5) w += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) w += 5;
		}

		//----------------------------------------------------------------
		// 「古代龍の宝冠」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KODAIRYUNO_HOKAN)) > 0) {
			w += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「トンボがとまった神妙な猫じゃらし」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 10;
			w += vartmp * itemCountRight;

			vartmp = 0;
			vartmp += 2 * n_A_Weapon2_ATKplus;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 10;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「トンボがとまった魔力の猫じゃらし」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 10;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 20;
			w += vartmp * itemCountRight;

			vartmp = 0;
			vartmp += 2 * n_A_Weapon2_ATKplus;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 10;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 20;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ディーヴァフォックステイル」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ミラージュフォックステイル」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 4;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 4;
			w += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「魔力の草のネックレス」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MARYOKUNO_KUSANO_NECKLACE)) > 0) {

			sklLv = 0;

			sklLv += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
			sklLv += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
			sklLv += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
			sklLv += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
			sklLv += LearnedSkillSearch(SKILL_ID_CHATTERING);
			sklLv += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
			sklLv += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

			w += 2 * ROUNDDOWN(sklLv / 5) * itemCount;
		}

		//----------------------------------------------------------------
		// 「吸血鬼のしもべ」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KYUKETSUKINO_SHIMOBE)) > 0) {
			if (n_A_BaseLV >= 170) {
				w += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「降霊術士のドレス　降霊術士の外套セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_KORE_ZYUTSUSHINO_GAITO)) > 0) {
			w += 2 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「不思議なハト　ヴァルハラアイドルセット」の、素ＳＴＲによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL)) > 0) {
			w += 5 * ROUNDDOWN(SU_STR / 18) * itemCount;
		}

		//----------------------------------------------------------------
		// 「イリュージョンサバイバルセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILLUSION_SURVIVAL_STUFF_ILLUSION_SURVIVAL_MANT)) > 0) {
			w += 3 * n_A_Weapon_ATKplus * itemCount;
		}

		//----------------------------------------------------------------
		// 「虹色のマフラー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_MUFFLER)) > 0) {
			w += 4 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}

		//----------------------------------------------------------------
		// 「降霊術士の手鏡　ドレスセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_DRESS)) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 8) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「降霊術士の手鏡　外套セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO)) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 8) {
				w += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「魔眼のアムダライスカード」の、精錬による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_MAGANNO_AMDARAIS)) > 0) {
			w += n_A_BODY_DEF_PLUS * cardCount;
		}

		//----------------------------------------------------------------
		// 「パワフルアムダライスカード」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_POWERFUL_AMDARAIS)) > 0) {
			w += 1 * ROUNDDOWN(n_A_BaseLV / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「エンチャント　死のニーヴ(知力)」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 1;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 1;
			w += vartmp * cardCountRight

			// 左手武器へのエンチャント
			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 1;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 1;
			w += vartmp * cardCountLeft

			// 頭防具へのエンチャント
			vartmp = 0;
			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 1;
			w += vartmp * cardCountHeadTop

			// 盾防具へのエンチャント
			vartmp = 0;
			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 1;
			w += vartmp * cardCountShield

			// 体防具へのエンチャント
			vartmp = 0;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 1;
			w += vartmp * cardCountBody

			// 肩防具へのエンチャント
			vartmp = 0;
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 1;
			w += vartmp * cardCountShoulder

			// 靴防具へのエンチャント
			vartmp = 0;
			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 1;
			w += vartmp * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「ウォーロックカトリーヌ(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_WARLOCK_CATHERINE_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_WARLOCK)) {
				w += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「シャドウチェイサーガーティ(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_SHADOW_CHASER_GARTY_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				w += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「ソーサラーセリア(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_SORCERER_CERIA_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_SORCERER)) {
				w += 10 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「トップサイドライダーカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (cardcount = CardNumSearch(CARD_ID_TOP_SIDE_RIDER)) {
			if (n_A_Weapon_ATKplus >= 10) {
				w += 5 * cardcount;
			}
		}

		//----------------------------------------------------------------
		// 「エンチャント　増幅1」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_1, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			w += 1 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			w += 1 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			w += 1 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			w += 1 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			w += 1 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			w += 1 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			w += 1 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　増幅2」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_2, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			w += 2 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			w += 2 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			w += 2 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			w += 2 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			w += 2 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			w += 2 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			w += 2 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　増幅3」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_3, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			w += 3 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			w += 3 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			w += 3 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			w += 3 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			w += 3 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			w += 3 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			w += 3 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　増幅4」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_4, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			w += 4 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			w += 4 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			w += 4 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			w += 4 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			w += 4 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			w += 4 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			w += 4 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　増幅5」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ZOFUKU_5, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			w += 5 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			w += 5 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			w += 5 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			w += 5 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			w += 5 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			w += 5 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			w += 5 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「リングオブヴィーナス」の、素ＡＧＩによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_2)) > 0) {
			w += 1 * Math.floor(SU_AGI / 10) * itemCount;
		}

		//----------------------------------------------------------------
		// 「深海のデビアスカード」の、素ＡＧＩ、素ＩＮＴ、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((cardcount = CardNumSearch(CARD_ID_SHINKAINO_DEVIAS)) > 0) {
			w += 2 * ROUNDDOWN((SU_AGI + SU_INT + SU_LUK) / 25) * cardcount;
		}

		//----------------------------------------------------------------
		// 「英雄の凱歌　ニーズヘッグの影カードセット」の、職業による強化
		//----------------------------------------------------------------
		if ((cardcount = CardNumSearch(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_NYDHOGNO_KAGE)) > 0) {
			// ハイウィザード系のみ
			if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_WIZARD) {
				if (n_A_JOB != JOB_ID_WIZARD) {
					w += 3 * n_A_BODY_DEF_PLUS * cardcount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「豊穣の女神　封印されたヴェルゼブブカードセット」の、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((cardcount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_VERSEVV)) > 0) {
			w += 1 * ROUNDDOWN(SU_LUK / 20) * cardcount;
		}

		//----------------------------------------------------------------
		// 「ゾディアック　処女宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
				w += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　双魚宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_SORCERER)) {
				w += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　双児宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
				w += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　プロキオンローブ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_ROBE)) {
			if (IsSameJobClass(JOB_ID_SOUL_REAPER)) {
				w += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　宝瓶宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_WARLOCK)) {
				w += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　宝瓶宮のシューズ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_WARLOCK)) {
				w += 2 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　磨羯宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				w += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ミステリーウィング」の、素ステータスによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
			w += 5 * Math.floor(GetTotalPureBasicStatus() / 100) * itemCount;
		}

		//----------------------------------------------------------------
		// 「フィフスエレメント」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT)) > 0) {
			w += 10 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
		}

		//----------------------------------------------------------------
		// 「増幅された怨望＋思念体武器セット」の、精錬による効果
		//----------------------------------------------------------------
		if (cardcount = CardNumSearch(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1)) {
			w += 5 * n_A_Weapon_ATKplus * cardcount;
		}

		//----------------------------------------------------------------
		// 「特選ドラムスーツ＋ゾディアックセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SUITS)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				w += 3 * n_A_BODY_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「特選ドラムシューズ＋ゾディアックセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SHOES)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				w += 3 * n_A_SHOES_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ヨルムンガンド教団主教」の効果
		//----------------------------------------------------------------
		if ((itemCount = CardNumSearch(CARD_ID_ELITE_RGAN_HEALER)) > 0) {
			if (n_tok[ITEM_SP_STUFF2HAND] === 1) {
				// 両手杖のときカード１枚ごとに2%増加
				w += 2 * itemCount;
				if (n_A_Weapon_ATKplus === 10) {
					// 両手杖かつ精錬値10のときカード１枚ごとに4%増加
					w += 4 * itemCount;
				}
			}
		}


		if(SU_DEX >= 110 && CardNumSearch(709)) w += 7;

		if(CardNumSearch(830)){
			if(n_A_HEAD_DEF_PLUS >= 7) w += 1 * CardNumSearch(830);
			if(n_A_HEAD_DEF_PLUS >= 9) w += 1 * CardNumSearch(830);
		}
		if(n_A_SHOES_DEF_PLUS >= 7 && CardNumSearch(886)){
			w += 3;
			if(n_A_SHOES_DEF_PLUS >= 9) w += 2;
		}
		if(n_A_card[CARD_REGION_ID_HEAD_TOP] == 893) w += ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
		if(CardNumSearch(895)) w -= 10;

		//----------------------------------------------------------------
		// 「サモナー　大地の力」の、習得スキルレベル合計による効果
		//----------------------------------------------------------------
		if (Math.max(LearnedSkillSearch(SKILL_ID_DAICHINO_CHIKARA), UsedSkillSearch(SKILL_ID_DAICHINO_CHIKARA)) > 0) {
			let summoner_skill_plant_sum = 0;
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_CHATTERING);
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
			summoner_skill_plant_sum += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);
			if (Math.max(summoner_skill_plant_sum, UsedSkillSearch(SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI)) >= 20) {
				w += 10;
			}
		}

		//----------------------------------------------------------------
		// 「三次職支援　エビ三昧」の効果
		//----------------------------------------------------------------
		switch (g_confDataSanzi[CCharaConfSanzi.CONF_ID_EBI_ZANMAI]) {
		case 1:
			w += 5;
			break;
		case 2:
			w += 5;
			break;
		case 3:
			w += 10;
			break;
		case 4:
			w += 15;
			break;
		case 5:
			w += 30;
			break;
		}

		if(n_A_PassSkill7[41]){
			if(n_A_PassSkill7[41] == 1) w += 5;
			if(n_A_PassSkill7[41] == 2) w += 10;
		}
		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP);
		if (confval != 0) {
			w += confval;
		}
		n_tok[89] += w;

		/**
		 * 公式サイトで「基本攻撃速度」と表記されるASPD計算式
		 */
		let aspd = 0;
		{
			/** 途中計算用の一時変数 */
			let tmp_aspd = 0;
			let ASPDch = 0;
			let ASPDplusMAX = 0;
			const wAGI = Math.max(1, n_A_AGI);
			const wDEX = Math.max(1, n_A_DEX);
			const jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB);

			// 武器種による基本ASPD判定
			aspd = jobData.GetWeaponAspd(n_A_WeaponType);
			if (n_tok[ITEM_SP_STUFF2HAND]) {
				if(EquipNumSearch(ITEM_ID_STUFF_OF_SOUL) == 0 && EquipNumSearch(ITEM_ID_WIZARD_STUFF) == 0) {
					aspd = jobData.GetWeaponAspd(ITEM_KIND_STUFF2HAND);
				}
			}
			if (aspd >= 145) {
				tmp_aspd = (aspd - 144) / 50;
			}
			if ([ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP, ITEM_KIND_HANDGUN, ITEM_KIND_RIFLE, ITEM_KIND_SHOTGUN, ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN].includes(n_A_WeaponType)) {
				aspd += Math.sqrt(wAGI * (10 - 1 / 400) + wDEX * 9 / 49) * (1 - tmp_aspd);
			} else {
				aspd += Math.sqrt(wAGI * (10 + 10 / 111) + wDEX * 9 / 49) * (1 - tmp_aspd);
			}
			if (n_Nitou) {
				tmp_aspd = jobData.GetWeaponAspd(n_A_WeaponType) + (jobData.GetWeaponAspd(n_A_Weapon2Type) - 194) / 4;
				aspd = tmp_aspd + Math.sqrt(wAGI * (10 - 1 / 400) + wDEX * 9 / 49) * 1.05;
			}
			if(n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
				aspd -= jobData.GetWeaponAspd(ITEM_KIND_SHIELD);
			}

			// クァグマイア または 速度減少 で打ち消されない ASPD 増加計算
			tmp_aspd = 0;
			if (n_A_PassSkill8[22] >= 2) {
				// その他の支援/設定 > OTP が シルバー/ゴールド/レインボー の場合
				tmp_aspd = 10;
				if(n_A_BaseLV >= 40 && IsUsableHSPJob(n_A_JOB)) {
					// Lv40以上でハイスピードポーションが使える職
					tmp_aspd = 15;
				}
				if(n_A_BaseLV >= 85 && IsUsableBSPJob(n_A_JOB)) {
					// Lv85以上でバーサクポーションが使える職
					tmp_aspd = 20;
				}
			} else if(n_A_PassSkill7[35]) {
				// アイテム・食品他 > ガラナキャンディ が使われている場合
				tmp_aspd += 10;
			}
			// OTPとスピードポーションのうち大きい効果を適用
			tmp_aspd = Math.max(tmp_aspd, [0, 10, 15, 20][n_A_SpeedPOT]);
			if (n_A_PassSkill7[47] > 0) {
				// アイテム(食品/他) > 期間限定系 ASPD 増加値 が 設定されている場合
				tmp_aspd = Math.max(tmp_aspd, n_A_PassSkill7[47]);
			}

			// -------------------------------------------
			// 以下のスキルは加算されず最大値だけが適用される
			// -------------------------------------------

			/** 三次職支援設定「スイングダンス」の基本攻撃速度 + 効果 */
			if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_SWING_DANCE] > 0) {
				ASPDch = 5 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_SWING_DANCE];
				ASPDch += g_confDataSanzi[CCharaConfSanzi.CONF_ID_LESSON];
				ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
			}

			/** 三次職支援設定「ダンスウィズウォーグ」の基本攻撃速度 + 効果 */
			if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG] > 0) {
				ASPDch = 5;
				ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
			}

			// クァグマイア または 速度減少 で打ち消される ASPD 増加計算
			if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE] === 0 && g_confDataDebuff[CCharaConfDebuff.CONF_ID_DECAGI] === 0) {
				//----------------------------------------------------------------
				// 「パッシブ持続系　クイッケン系」の効果
				//----------------------------------------------------------------
				switch (n_A_WeaponType) {
					case ITEM_KIND_SWORD:
						if (UsedSkillSearch(SKILL_ID_ONEHAND_QUICKEN) > 0) {
							ASPDch = 30;
						}
						break;
					case ITEM_KIND_SWORD_2HAND:
						if (UsedSkillSearch(SKILL_ID_TWOHAND_QUICKEN) > 0) {
							ASPDch = 30;
						}
						break;
					case ITEM_KIND_SPEAR:
					case ITEM_KIND_SPEAR_2HAND:
						if (UsedSkillSearch(SKILL_ID_SPEAR_QUICKEN) > 0) {
							ASPDch = 30;
						}
						break;
					// アドレナリンラッシュは、自己支援と他人支援で効果が違うので注意. ここで計算するのは自己支援
					case ITEM_KIND_AXE:
					case ITEM_KIND_AXE_2HAND:
					case ITEM_KIND_CLUB:
						if (UsedSkillSearch(SKILL_ID_ADRENALINE_RUSH) > 0) {
							ASPDch = 30;
						}
						break;
				}
				//----------------------------------------------------------------
				// 「二次職支援　フルアドレナリンラッシュ」の効果
				//----------------------------------------------------------------
				if (ASPDch == 0 && UsedSkillSearch(SKILL_ID_FULL_ADRENALINE_RUSH)) {
					ASPDch = 30;
				}
				//----------------------------------------------------------------
				// 「時限アイテム　フルアドレナリンラッシュ」の効果
				// 火雷大神の効果も、実質フルアドレナリンラッシュ？
				//----------------------------------------------------------------
				if (TimeItemNumSearch(5)
					|| TimeItemNumSearch(28)
					|| TimeItemNumSearch(TIME_ITEM_ID_RALF_FONG_TWIEGE_666)
					|| TimeItemNumSearch(TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_AR)) {
					ASPDch = 30;
				}
				ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
			}
			//----------------------------------------------------------------
			// 「ロードナイト　バーサーク」の効果
			//----------------------------------------------------------------
			if (UsedSkillSearch(SKILL_ID_BERSERK)) {
				ASPDch = 30;
				ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
			}
			//----------------------------------------------------------------
			// 「ガンスリンガー　マッドネスキャンセラー」の効果
			//----------------------------------------------------------------
			if (UsedSkillSearch(SKILL_ID_MADNESSS_CANCELER)) {
				ASPDch = 20;
				ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
			}
			//----------------------------------------------------------------
			// 「拳聖　星の安楽」の効果
			// 「拳聖　太陽と月と星の悪魔」の効果
			//----------------------------------------------------------------
			ASPDch = 0;
			if (UsedSkillSearch(SKILL_ID_HOSHINO_ANRAKU) > 0) {
				switch (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI)) {
					case 1:	// 今日の日付
						const today = (new Date()).getDate();
						if (today % 5 == 1)	break; // 星の日ではない
					case 0:	// 無条件発動
					case 4: // 星の日
						ASPDch += Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 10);
				}
			}
			const taiyoto_tsukito_hoshino_akuma = Math.max(LearnedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA), UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA));
			if (taiyoto_tsukito_hoshino_akuma > 0) {
				switch (n_A_JOB) {
					case JOB_ID_STARGRADIATOR:
						// 拳聖 ジョブレベル５０未満では発動しない
						if (n_A_JobLV < 50) {
							break;
						}
					default:
						// 星帝・天帝は制限なし
						ASPDch += 1 + taiyoto_tsukito_hoshino_akuma;
				}
			}
			ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
			//----------------------------------------------------------------
			// 「二次職支援　アドレナリンラッシュ系」の効果
			// TODO: 未解析
			//----------------------------------------------------------------
			if (g_confDataNizi[CCharaConfNizi.CONF_ID_ADRENALINE_RUSH] >= 1) {
				if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE] === 0 && g_confDataDebuff[CCharaConfDebuff.CONF_ID_DECAGI] === 0) {
					// クァグマイア または 速度減少 が掛かっていないとき
					{
						if(g_confDataNizi[CCharaConfNizi.CONF_ID_ADRENALINE_RUSH] == 2){
							if(n_A_WeaponType != 10 && !(17 <= n_A_WeaponType && n_A_WeaponType <= 21)){
								ASPDch = 20;
								if(GetHigherJobSeriesID(n_A_JOB)==12) ASPDch += 10;
								ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
							}
						}
						if(6 <= n_A_WeaponType && n_A_WeaponType <= 8){
							if(g_confDataNizi[CCharaConfNizi.CONF_ID_ADRENALINE_RUSH] == 1){
								ASPDch = 20;
								if(GetHigherJobSeriesID(n_A_JOB)==12) ASPDch += 10;
								ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
							}
						}
					}
					if(6 <= n_A_WeaponType && n_A_WeaponType <= 8){
						if(g_confDataNizi[CCharaConfNizi.CONF_ID_ADRENALINE_RUSH] == 3){
							ASPDch = 30;
							ASPDplusMAX = Math.max(ASPDplusMAX, ASPDch);
						}
					}
				}
			}

			tmp_aspd += ASPDplusMAX;
			// 「ガンスリンガー」スキル「シングルアクション」のASPD増加効果
			tmp_aspd += Math.round(Math.max(LearnedSkillSearch(SKILL_ID_SINGLE_ACTION), UsedSkillSearch(SKILL_ID_SINGLE_ACTION)) / 2);
			// 「プロフェッサー」スキル「アドバンスドブック」のASPD増加効果
			if (n_A_WeaponType == ITEM_KIND_BOOK) {
				const advanced_book_lv = Math.max(LearnedSkillSearch(SKILL_ID_ADVANCED_BOOK), UsedSkillSearch(SKILL_ID_ADVANCED_BOOK));
				tmp_aspd += Math.round(advanced_book_lv / 2);
			}
			aspd += (200 - aspd) * (tmp_aspd / 100);

			if (UsedSkillSearch(SKILL_ID_FIGHTING_SPIRIT)) {
				// ファイティングスピリット が設定されているとき
				const wfsp = [0,0,0,1,1,2,2,2,3,3,4];
				const sklLvRuneMastery = Math.max(LearnedSkillSearch(SKILL_ID_RUNE_MASTERY), UsedSkillSearch(SKILL_ID_RUNE_MASTERY));
				aspd += wfsp[sklLvRuneMastery];
			}
			// 修練未習得でもペコペコ・グリフォンに乗れるので LearnedSkillSearch に置き換えられない
			if (UsedSkillSearch(SKILL_ID_KIHE_SHUREN) > 0) {
				// ペコペコ・グリフォンに搭乗している場合、騎兵修練の習得Lvに応じてASPDペナルティが課せられる
				// UsedSkillSearch の方は'Lv0'の前に'ペコ無し'が挿入されているのでオフセットを合わせている
				if ((n_A_ActiveSkill === SKILL_ID_TUZYO_KOGEKI) || (n_A_ActiveSkill === SKILL_ID_SACRIFICE)) {
					// 攻撃手段が 通常攻撃 または サクリファイス ならば
					aspd -= aspd - aspd * (40 + Math.max(LearnedSkillSearch(SKILL_ID_KIHE_SHUREN), UsedSkillSearch(SKILL_ID_KIHE_SHUREN)) * 10) / 100;
				}
			}
			// トレーニング未習得でもドラゴンに乗れるので LearnedSkillSearch に置き換えられない
			if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) > 0) {
				// ドラゴンに搭乗している場合、ドラゴントレーニングの習得Lvに応じてASPDペナルティが課せられる
				// UsedSkillSearch の方は'Lv0'の前に'未騎乗'が挿入されているのでオフセットを合わせている
				const dragon_training_lv = Math.max(LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING), UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) - 1);
				aspd -= aspd - aspd * (70 + (dragon_training_lv + 1) * 5) / 100;
			}
		}

		let aspd_up_percent = GetAdditionalAspdPercent();
		// 拡張表示用にデータを保存
		CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_ASPD_UP, aspd_up_percent);
		// ASPD計算
		aspd += (200 - aspd) * (aspd_up_percent / 100);

//================================================================================================================================
//================================================================================================================================
//====
//==== ＡＳＰＤ固定増加　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_ASPD_PLUS; idx <= ITEM_SP_ASPD_PLUS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		let aspdPlusValue = n_tok[ITEM_SP_ASPD_PLUS];

		if(EquipNumSearch(1339)) aspdPlusValue += ROUNDDOWN(n_A_Weapon_ATKplus / 2);
		if(SU_AGI >= 120 && EquipNumSearch(1311)) aspdPlusValue += 1;
		if(SU_STR >= 120 && EquipNumSearch(1320)) aspdPlusValue += 1;
		if(EquipNumSearch(1353)) aspdPlusValue += 1;
		if(n_A_WeaponType == 3 && n_A_Weapon_ATKplus >= 10) aspdPlusValue += CardNumSearch(530);
		if(n_A_WeaponType == 10 && n_A_Weapon_ATKplus >= 10) aspdPlusValue += CardNumSearch(531);
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1601)) aspdPlusValue += 1;
		if (EquipNumSearch(ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA_PET) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7) {
				aspdPlusValue += 1;
			}
		}
		if(SU_AGI >= 120 && EquipNumSearch(1708)) aspdPlusValue += 1;
		if(SU_AGI >= 108 && EquipNumSearch(1791)) aspdPlusValue += 1;

		// 俊敏の時空ブーツ
		if(SU_AGI >= 120 && EquipNumSearch(1919)) aspdPlusValue += 1;
		if(SU_AGI >= 120 && EquipNumSearch(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)) aspdPlusValue += 1;

		if(SU_AGI >= 120 && EquipNumSearch(2295)) aspdPlusValue += 1;
		if(n_A_Weapon_ATKplus >= 10){
			if(n_A_Arrow == ARROW_ID_HONOONO_YA && EquipNumSearch(2356)) aspdPlusValue += 1;
			if(n_A_Arrow == ARROW_ID_SUISHONO_YA && EquipNumSearch(2357)) aspdPlusValue += 1;
			if(n_A_Arrow == ARROW_ID_GANSEKINO_YA && EquipNumSearch(2358)) aspdPlusValue += 1;
			if(n_A_Arrow == ARROW_ID_KAZENO_YA && EquipNumSearch(2359)) aspdPlusValue += 1;
		}
		if(2504 <= n_A_Equip[EQUIP_REGION_ID_SHIELD] && n_A_Equip[EQUIP_REGION_ID_SHIELD] <= 2507){
			if(n_A_SHIELD_DEF_PLUS >= 5) aspdPlusValue += 1;
			if(n_A_SHIELD_DEF_PLUS >= 7) aspdPlusValue += 1;
		}
		if(n_A_WeaponType == 10 && n_A_Weapon_ATKplus >= 10 && EquipNumSearch(2515)) aspdPlusValue += 1;


		//----------------------------------------------------------------
		// 「戦死者のマント」の、純粋なＡＧＩが１３０の時
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)){
			if (SU_AGI >= 130) {
				if (EquipNumSearchFurubitaSet() > 0) {
					aspdPlusValue += 2;
				} else {
					aspdPlusValue += 1;
				}
			}
		}

		//----------------------------------------------------------------
		// 「元素のタオルセット」の、効果
		//----------------------------------------------------------------
		if(n_A_Weapon_ATKplus >= 10){

			if(n_A_Arrow == ARROW_ID_HONOONO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_MOERU_YUMI)) {
				aspdPlusValue += 1;
			}

			if(n_A_Arrow == ARROW_ID_SUISHONO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_HYOTENNO_YUMI)) {
				aspdPlusValue += 1;
			}

			if(n_A_Arrow == ARROW_ID_GANSEKINO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_DAICHINO_YUMI)) {
				aspdPlusValue += 1;
			}

			if(n_A_Arrow == ARROW_ID_KAZENO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_HAYATENO_YUMI)) {
				aspdPlusValue += 1;
			}
		}

		//----------------------------------------------------------------
		// 「リス耳フード帽」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_RISUMIMI_HOODBO)) {
			if (n_A_HEAD_DEF_PLUS >= 5) aspdPlusValue += 1;
			if (n_A_HEAD_DEF_PLUS >= 7) aspdPlusValue += 1;
			if (n_A_HEAD_DEF_PLUS >= 9) aspdPlusValue += 1;
		}

		//----------------------------------------------------------------
		// 「沸騰する混沌の盾」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_FUTTOSURU_KONTONNO_TATE)) {
			if (n_A_SHIELD_DEF_PLUS >= 5) aspdPlusValue += 1;
			if (n_A_SHIELD_DEF_PLUS >= 7) aspdPlusValue += 1;
		}

		//----------------------------------------------------------------
		// 「くわえたハートのエース　ギャンブラーシールセット」の、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL)) > 0) {
			if (SU_LUK >= 108) {
				aspdPlusValue += 1 * itemCount;
			}
			if (SU_LUK >= 120) {
				aspdPlusValue += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ルーンナイトセイレン(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_RUNE_KNIGHT_SEIREN_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				aspdPlusValue += 2 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「ペタルの尻尾　リス耳フード帽セット」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO)) {
			if (n_A_HEAD_DEF_PLUS >= 6) aspdPlusValue += 1;
			if (n_A_HEAD_DEF_PLUS >= 8) aspdPlusValue += 1;
		}

		//----------------------------------------------------------------
		// 「ダークリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DARK_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CLOAKING_EXCEED) >= 5) {
				aspdPlusValue += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「丹色のリボン」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIRONO_RIBBON)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_TAMASHINO_RENKETSU) >= 7) {
				aspdPlusValue += 2 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_ASPD_PLUS);
		if (confval != 0) {
			aspdPlusValue += confval;
		}


		//----------------------------------------------------------------
		// 「ソーサラー　精霊」の、効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_SERE_MODE) == 1) {
			switch (UsedSkillSearch(SKILL_ID_SERE)) {
			case 7:
			case 8:
			case 9:
				aspdPlusValue += 5;
			}
		}

		//----------------------------------------------------------------
		// 「クルセイダー　ディフェンダー」の、効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_DEFENDER) > 0) {
			aspdPlusValue -= (25 - UsedSkillSearch(SKILL_ID_DEFENDER) * 5);
		}
		else if (g_confDataNizi[CCharaConfNizi.CONF_ID_DEFENDER] > 0) {
			aspdPlusValue -= (25 - g_confDataNizi[CCharaConfNizi.CONF_ID_DEFENDER] * 5);
		}

		//----------------------------------------------------------------
		// 「ギロチンクロス　ハルシネーション効果後のASPD減」の、効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO) > 0) {
			aspdPlusValue -= aspdPlusValue - aspdPlusValue / 2;
		}

		//----------------------------------------------------------------
		// 「リベリオン－ヒートバレル」の、効果
		//----------------------------------------------------------------
		aspdPlusValue += UsedSkillSearch(SKILL_ID_HEAT_BARREL);

		//----------------------------------------------------------------
		// 「ソウルリーパー　影の魂」の、効果
		//----------------------------------------------------------------
		if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_KAGENO_TAMASHI]) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				aspdPlusValue += 2 * bufLv;
				break;

			default:
				aspdPlusValue += Math.floor((bufLv + 1) / 2);
				break;

			}
		}


		// TODO: 四次対応
		for (idx = ITEM_SP_ASPD_PLUS; idx <= ITEM_SP_ASPD_PLUS; idx++) {
			aspdPlusValue = ApplySpecModify(idx, aspdPlusValue);
		}


		// 拡張表示用にデータを保存
		CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_ASPD_PLUS, aspdPlusValue);

		// ASPD計算
		aspd += aspdPlusValue;


		//----------------------------------------------------------------
		// 「ジェネティック　オーバードブースト」の、効果（ASPDを増加ではなく固定する）
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_OVERED_BOOST) > 0) {
			aspd = 179 + 2 * UsedSkillSearch(SKILL_ID_OVERED_BOOST);
		}


		// 範囲外補正
		set_aspdRaw(aspd);
		if(n_A_BaseLV >= 100){
			if(aspd > 193) aspd = 193;
		}else{
			if(aspd > 190) aspd = 190;
		}
		if(aspd <0) aspd = 0;


		//----------------------------------------------------------------
		// 計算した結果をキャラクターデータに保存
		//----------------------------------------------------------------
		charaData[CHARA_DATA_INDEX_ASPD] = aspd;


}
