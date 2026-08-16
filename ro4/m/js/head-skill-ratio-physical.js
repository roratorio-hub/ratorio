/**
 * 物理判定攻撃に対するスキル倍率の増減の分割（Phase 3c）。
 *
 * GetPhysicalSkillDamageRatioChange を head.js から移動。本文はバイト単位で不変。
 *
 * itemCountRight / itemCountLeft は元 head.js のモジュールレベル scratch 変数だが、
 * この関数内では「書いてから読む」で完結しており（read-before-write ゼロ件）、
 * head.js 側の GetSizeModify など他の利用箇所とは独立しているため、
 * このファイルのローカル変数として再宣言している（Phase 1 の itemCount 処理と同じ方針）。
 */
import { CCharaConfCustomSkill } from '../../../roro/m/js/CCharaConfCustomSkill.js';
import { CCharaConfSanzi } from '../../../roro/m/js/CCharaConfSanzi.js';
import {
    ARROW_ID_GANSEKINO_YA, ARROW_ID_HONOONO_YA, ARROW_ID_KAZENO_YA, ARROW_ID_SUISHONO_YA
} from '../../../roro/m/js/arrow.dat.js';
import {
    CARD_ID_ARCANA_CHARIOT, CARD_ID_ARCANA_DEATH, CARD_ID_ARCANA_DEVIL, CARD_ID_ARCANA_EMPEROR, CARD_ID_ARCANA_HOUO,
    CARD_ID_ARCANA_JUSTICE, CARD_ID_ARCANA_LOVERS, CARD_ID_ARCANA_POWER, CARD_ID_ARCANA_SESSEI,
    CARD_ID_BILLY_COSRLEASE, CARD_ID_ENCHANT_HANGYAKUSHA, CARD_ID_GOKU, CARD_ID_HEART_HUNTER_BELLARE,
    CARD_ID_HEART_HUNTER_M_BELLARE, CARD_ID_IFODOS, CARD_ID_KORYU_ZIRANT, CARD_ID_YUMEHIME,
    CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_DIADEM, CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MANT,
    CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SHOES, CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MANT,
    CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MANT, CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_SHOES
} from '../../../roro/m/js/card.dat.js';
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from '../../../roro/m/js/chara.js';
import { CARD_REGION_ID_ACCESSORY_1_ANY, CARD_REGION_ID_ACCESSORY_2_ANY } from '../../../roro/m/js/common.js';
import { CHARA_DATA_INDEX_MAXHP } from '../../../roro/m/js/const/EnumCharaDataIndex.js';
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from '../../../roro/m/js/const/EnumEquipRegionId.js';
import {
    ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_RIFLE, ITEM_KIND_SHOTGUN
} from '../../../roro/m/js/const/EnumItemKind.js';
import {
    JOB_ID_GENETIC, JOB_ID_MECHANIC, JOB_ID_RANGER, JOB_ID_REBELLION, JOB_ID_RUNEKNIGHT, JOB_ID_SHADOWCHASER,
    JOB_ID_STAR_EMPEROR
} from '../../../roro/m/js/const/EnumJobId.js';
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, ROUNDDOWN } from '../../../roro/m/js/foot-bridge.js';
import {
    ITEM_ID_AKKI_RASETSUNO_YUBIWA, ITEM_ID_AKUMANO_TE, ITEM_ID_ARKUIENNO_NECKLACE, ITEM_ID_AVARECO,
    ITEM_ID_AVENGER_FUMASHURIKEN, ITEM_ID_AVENGER_HUNTERBOW, ITEM_ID_AVENGER_LANCE, ITEM_ID_AVENGER_TWOHAND_AXE,
    ITEM_ID_BOINO_MUFFLER, ITEM_ID_CHEMICAL_GLOVE, ITEM_ID_DAISHIZENNO_GUITAR, ITEM_ID_DAISHIZENNO_ROPE,
    ITEM_ID_DIVA_BLADEWHIP, ITEM_ID_DIVA_VIOLIN, ITEM_ID_EMERALDEARRING, ITEM_ID_EMERALD_RING,
    ITEM_ID_END_OF_THE_WORLD, ITEM_ID_ERYMANTHNO_KAWA, ITEM_ID_FAFNIR_BREATH, ITEM_ID_FAFNIR_HELM,
    ITEM_ID_FURUBITA_BALLERINA, ITEM_ID_FURUBITA_BLAZINGSOUL, ITEM_ID_FURUBITA_BONECIRCRET,
    ITEM_ID_FURUBITA_DRIVERBAND_AKA, ITEM_ID_FURUBITA_DRIVERBAND_KIRO, ITEM_ID_FURUBITA_MINSTRELSONG,
    ITEM_ID_FURUBITA_RUNECIRCRET, ITEM_ID_FURUBITA_SHUGONOKANNMURI, ITEM_ID_FUSHICHONO_KANMURI,
    ITEM_ID_FUTSUNOMITAMA, ITEM_ID_GLOTONERIA, ITEM_ID_GRACE_ARTIS_SUIT, ITEM_ID_GRACE_CONFIDENCIAL_MAIL,
    ITEM_ID_GRACE_CRUCIFORM_SUIT, ITEM_ID_GRACE_GATLING_SUIT, ITEM_ID_HANGYAKUSHANO_SCARF,
    ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, ITEM_ID_ILLUSION_KAMINO_SHISHA, ITEM_ID_ILLUSION_MEISHASHUNO_RINGO,
    ITEM_ID_ILLUSION_MILITARY_BOOTS, ITEM_ID_ILLUSION_NEKKETSU_HACHIMAKI, ITEM_ID_ILLUSION_POLE_AXE,
    ITEM_ID_ILLUSION_WAR_AXE, ITEM_ID_IMPERIAL_ARTIS_SUIT, ITEM_ID_IMPERIAL_BOOTS,
    ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL, ITEM_ID_IMPERIAL_CRUCIFORM_SUIT, ITEM_ID_IMPERIAL_GATLING_SUIT,
    ITEM_ID_JAGUAR_NOTE, ITEM_ID_KAGAKUSHANO_MANT, ITEM_ID_KIZOKUNO_KAMEN, ITEM_ID_KOINNNO_RUCKSACK, ITEM_ID_KOKI,
    ITEM_ID_KOONO_SOZIN, ITEM_ID_METAL_STICK, ITEM_ID_MH_P89_OS, ITEM_ID_MIRRORAGE_BLADEWHIP,
    ITEM_ID_MIRRORAGE_VIOLIN, ITEM_ID_MONOKAGE, ITEM_ID_NIZIIRONO_SCARF, ITEM_ID_OMOCHANO_YUBIWA,
    ITEM_ID_PARACELSUS_COAT, ITEM_ID_PLATINUM_ARBITRATOR, ITEM_ID_POLLUX_RING, ITEM_ID_POWERED_WING,
    ITEM_ID_RAKUENNO_TORIKAGO_EXSIONNO_HANE_S2, ITEM_ID_RASEN_FUMANO_HOZYU, ITEM_ID_RED_BABY_DRAGON,
    ITEM_ID_REQUIEM_BLADEWHIP, ITEM_ID_REQUIEM_VIOLIN, ITEM_ID_RUNE_GREEVE, ITEM_ID_RUNE_HELM, ITEM_ID_SAPPHIRE_LIST,
    ITEM_ID_SAVE_THE_KING, ITEM_ID_SHADOW_RING, ITEM_ID_SHIKENKAN_BOOTS, ITEM_ID_SHIKENKAN_HAIRBAND,
    ITEM_ID_SHIKKOSHANO_MANT, ITEM_ID_SHIKKOUSHANO_SHOES, ITEM_ID_SHINENNO_ONO_YUBIWA,
    ITEM_ID_SHINMA_BAPHOMETNO_TSUNO, ITEM_ID_SINFUL_OPAL_RING, ITEM_ID_SLOTH_TEXT, ITEM_ID_SNIPING_VEIL,
    ITEM_ID_TENBINKYUNO_DIADEM, ITEM_ID_TENMA_GEDONO_GAITO, ITEM_ID_TOKUSEN_USAGINO_OMAMORI,
    ITEM_ID_TSUIGEKISHANO_RING, ITEM_ID_TSUIGEKISHANO_SHOES, ITEM_ID_TWIN_HEAD_DRAGON_BOOTS,
    ITEM_ID_TWIN_HEAD_DRAGON_MAIL, ITEM_ID_ULTIO_OS, ITEM_ID_VIRTUAL_BOW_OS, ITEM_ID_YOCHIYOCHI_URIBO_SUTAI,
    ITEM_ID_YOGANNO_MANT, ITEM_ID_YOICHINO_KATAKAE, ITEM_ID_YOZINBONO_SCARF, ITEM_ID_ZYASPER_CIRCLET,
    ITEM_SET_ID_BIO_PROTECTOR_KIKAI_SHOKUBUTSU_BO, ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_KEN_YUSHANO_KUTSU,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_S2_YUSHANO_KUTSU,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_YUSHANO_KUTSU,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU, ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE,
    ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI, ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_FALCEN_SHOOTER,
    ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_SHARP_STAR, ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL,
    ITEM_SET_ID_GENSONO_TOWEL_DAICHINO_YUMI, ITEM_SET_ID_GENSONO_TOWEL_HAYATENO_YUMI,
    ITEM_SET_ID_GENSONO_TOWEL_HYOTENNO_YUMI, ITEM_SET_ID_GENSONO_TOWEL_MOERU_YUMI,
    ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE, ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW, ITEM_SET_ID_GIGANT_BOOTS_GIGANT_LANCE,
    ITEM_SET_ID_GOFUSEKI_GERADRIA, ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER, ITEM_SET_ID_GUARDIAN_SET,
    ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS, ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS,
    ITEM_SET_ID_KINGS_GUARD_SAVE_THE_KING, ITEM_SET_ID_KINGS_MAIL_SAVE_THE_KING,
    ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_AXE, ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW,
    ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_LANCE, ITEM_SET_ID_POWERED_SET, ITEM_SET_ID_SCARABA_HIGHHEEL_DULLGER,
    ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW, ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS,
    ITEM_SET_ID_YSF01_PLATE_FULLSET, ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE,
    ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_PLATE, ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_KEN
} from '../../../roro/m/js/item.dat.js';
import { LearnedSkillSearch } from '../../../roro/m/js/learnedskill.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../../../roro/m/js/mobconfplayer.js';
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS,
    n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_WeaponType,
    n_A_Weapon_ATKplus
} from '../../../roro/m/js/roro-state.js';
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_ARMS_CANNON, SKILL_ID_ARRAW_VULKAN, SKILL_ID_ARROW_SHOWER, SKILL_ID_ARROW_STORM,
    SKILL_ID_AURA_BLADE, SKILL_ID_AXE_BOOMERANG, SKILL_ID_AXE_TORNADE, SKILL_ID_BACK_STAB, SKILL_ID_BAKKISANDAN,
    SKILL_ID_BAKURETSU_KUNAI, SKILL_ID_BANISHING_POINT, SKILL_ID_BASH, SKILL_ID_BLITZ_BEAT, SKILL_ID_BOOST_KNUCKLE,
    SKILL_ID_BOWLING_BASH, SKILL_ID_BUNISHING_BASTER, SKILL_ID_CANNON_SPEAR, SKILL_ID_CARROT_BEAT,
    SKILL_ID_CART_CANNON, SKILL_ID_CART_REVOLUTION, SKILL_ID_CART_TERMINATION, SKILL_ID_CART_TORNADO,
    SKILL_ID_CLUSTER_BOMB, SKILL_ID_COLD_THROWER, SKILL_ID_COUNTER_SLASH, SKILL_ID_CRAZY_WEED, SKILL_ID_CROSS_IMPACT,
    SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_DARK_CROSS, SKILL_ID_DEATH_BOUND, SKILL_ID_DOUBLE_STRAFING,
    SKILL_ID_DRAGONIC_AURA_STATE, SKILL_ID_DRAGON_HOWLING, SKILL_ID_DRAGON_TAIL, SKILL_ID_ENCHANT_BLADE,
    SKILL_ID_ENVENOM, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_FAINT_BOMB, SKILL_ID_FATAL_MENUS, SKILL_ID_FIRE_DRAGON_BREATH,
    SKILL_ID_FIRE_EXPANSION, SKILL_ID_FIRE_RAIN, SKILL_ID_FLAME_THROWER, SKILL_ID_FRIGNO_UTA,
    SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_GENZYUTSU_KAGEMUSHA, SKILL_ID_GRAHAM_LIGHT,
    SKILL_ID_GRAND_CROSS, SKILL_ID_GRIM_TOOTH, SKILL_ID_HAMMER_OF_GOD, SKILL_ID_HANDRED_SPEAR, SKILL_ID_HAPPO_KUNAI,
    SKILL_ID_HEAT_BARREL, SKILL_ID_HOLY_CROSS, SKILL_ID_HOSHINO_HIKARI, SKILL_ID_HOWLING_MINE,
    SKILL_ID_HOWLING_MINE_APPEND, SKILL_ID_KAGEKIRI, SKILL_ID_KASUMIGIRI, SKILL_ID_KATAR_SHUREN, SKILL_ID_KEN_SHUREN,
    SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_KIHE_SHUREN, SKILL_ID_MAELSTORM, SKILL_ID_MAGMA_ILLUPTION,
    SKILL_ID_MAMMONITE, SKILL_ID_MANGETSU_KYAKU, SKILL_ID_MASS_SPIRAL, SKILL_ID_METEOR_ASSALT,
    SKILL_ID_MYSTIC_SYMPHONY, SKILL_ID_NUKUMORI, SKILL_ID_NUKUMORI_KABE, SKILL_ID_ONO_SHUREN, SKILL_ID_OVER_BLAND,
    SKILL_ID_PIKKI_TSUKI, SKILL_ID_PILE_BUNKER, SKILL_ID_POISON_REACT, SKILL_ID_POWER_SWING, SKILL_ID_QUICKDRAW_SHOT,
    SKILL_ID_RAIKODAN, SKILL_ID_RAPID_SHOWER, SKILL_ID_RHYTHM_SHOOTING, SKILL_ID_ROLLING_CUTTER,
    SKILL_ID_ROSE_BLOSSOM, SKILL_ID_ROUND_TRIP, SKILL_ID_RYUSE_RAKKA, SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SENDENPO,
    SKILL_ID_SEVERE_RAINSTORM, SKILL_ID_SEVERE_RAINSTORM_EX, SKILL_ID_SHARP_SHOOTING, SKILL_ID_SHIELD_BOOMERANG,
    SKILL_ID_SHIELD_CHAIN, SKILL_ID_SHINDOZANKYO, SKILL_ID_SHURASHINDAN, SKILL_ID_SHUTTER_STORM, SKILL_ID_SISIKO,
    SKILL_ID_SLUG_SHOT, SKILL_ID_SONIC_ACCELERATION, SKILL_ID_SONIC_WAVE, SKILL_ID_SORYUKYAKU, SKILL_ID_SOUL_BREAKER,
    SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_SPIRAL_PIERCE, SKILL_ID_SPORE_EXPLOSION, SKILL_ID_SPREAD_ATTACK,
    SKILL_ID_STEEL_CROW, SKILL_ID_STORM_BLAST, SKILL_ID_TAIYONO_HIKARI, SKILL_ID_TAIYO_BAKUHATSU,
    SKILL_ID_TAROUNO_KIZU, SKILL_ID_TENRACHIMO, SKILL_ID_TRIANGLE_SHOT, SKILL_ID_TSUKINO_HIKARI,
    SKILL_ID_UNTIMATERIAL_BLAST, SKILL_ID_VULCAN_ARM, SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WIND_CUTTER,
    SKILL_ID_WUG_BITE, SKILL_ID_WUG_DASH, SKILL_ID_WUG_STRIKE, SKILL_ID_YOMIGAESHI, SKILL_ID_ZIRAISHIN,
    SKILL_ID_ZYUMONZIGIRI
} from '../../../roro/m/js/skill.dat.js';
import { TIME_ITEM_ID_CHOTOTSU_MOUSHIN, TIME_ITEM_ID_SANGAKU_HELMET } from '../../../roro/m/js/timeitem.dat.js';
import { IsSameJobClass } from './data/mig.job.h.js';
import { g_confDataSanzi, g_objCharaConfCustomSkill } from './global.js';
import { TyouEnkakuSousa3dan, n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_Arrow, n_A_BaseLV } from './ro4-state.js';
import { UsedSkillSearch } from './skillstate.js';
import { ApplyPhysicalSkillDamageRatioChangeSubArcanaCard } from './head-bridge.js';

/**
 * 物理判定攻撃に対するスキル倍率の増減を適用する.
 * @param {*} battleCalcInfo 
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 * @returns 適用後のダメージ
 */
export function GetPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData) {
    let itemCountRight = 0, itemCountLeft = 0;
	var cardCount = 0, confval = 0;

//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等の“物理”スキル倍率補正　ここから　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	var itemCount = 0;

	var w1 = 0;

	//----------------------------------------------------------------
	// 「フリーズタートルカード」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 6) {
		if(n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(362)) w1 += 10;
	}

	//----------------------------------------------------------------
	// 「ソードガーディアンカード」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 76) {
		if(n_A_WeaponType==2 || n_A_WeaponType==3) w1 += 25 * CardNumSearch(464);
	}

	//----------------------------------------------------------------
	// 「ボウガーディアンカード」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 41) {
		if(n_A_WeaponType==10) w1 += 50 * CardNumSearch(465);
	}

	//----------------------------------------------------------------
	// 「グロリアスハンターボウ」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 40) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1089)) w1 += 20;
	}

	//----------------------------------------------------------------
	// 「インペリアルリング」の、「グランドクロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 162) {
		if(EquipNumSearch(2495)) w1 += n_A_BaseLV;
	}

	//----------------------------------------------------------------
	// 「グロリアスハンドガン」の、「ラピッドシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 428) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1099)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアスライフル」の、「トラッキング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 430) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1100)) w1 += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアスショットガン」の、「スプレッドアタック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 436) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1102)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアスグレネードガン」の、「グラウンドドリフト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 437) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1103)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアス系銃器」の、「トリプルアクション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 418){
		if(n_A_Weapon_ATKplus >= 7) {
			if(EquipNumSearch(1100) || EquipNumSearch(1101) || EquipNumSearch(1102) || EquipNumSearch(1103)) w1 += 30;
		}
	}

	//----------------------------------------------------------------
	// 「達人の剣」の、「バッシュ」「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 6 || n_A_ActiveSkill == 76) {
		if(n_A_ActiveSkillLV == 10 && EquipNumSearch(1159)) w1 += 50;
	}

	//----------------------------------------------------------------
	// 「ベチェルアックス」の、「メナーナイト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 65) {
		if(SU_LUK >= 90 && SU_DEX >= 90 && EquipNumSearch(1164)) w1 += 15;
	}

	//----------------------------------------------------------------
	// 「チャクラム」の、「メテオアサルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 264) {
		if(EquipNumSearch(1176) && LearnedSkillSearch(SKILL_ID_KATAR_SHUREN) == 10) w1 += 20;
	}

	//----------------------------------------------------------------
	// 「ブラックウィング」の、「フェイタルメナス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 606) {
		if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1337)) w1 += 2 * (n_A_Weapon_ATKplus - 5);
	}

	//----------------------------------------------------------------
	// 「インペリアルスピア」の、「キャノンスピア」「バニシングポイント」強化
	// 「インペリアルセット」の、「キャノンスピア」「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 569 || n_A_ActiveSkill == 570){
		if(EquipNumSearch(1341)) w1 += 3 * ROUNDDOWN(n_A_Weapon_ATKplus / 2);
		if(EquipNumSearch(2493)) w1 += 7 * ROUNDDOWN(n_A_Weapon_ATKplus / 2);
	}

	//----------------------------------------------------------------
	// 「赤いエーテルバッグ」の、「クレイジーウィード」「デモニックファイアー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 732 || n_A_ActiveSkill == 737) {
		if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1343)) w1 += 2 * (n_A_Weapon_ATKplus - 5);
	}

	//----------------------------------------------------------------
	// 「インペリアルガード」の、「シールドプレス」強化
	// 「インペリアルセット」の、「シールドプレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 572){
		if(n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(1348)) w1 += 2 * (n_A_SHIELD_DEF_PLUS - 5);
		if(n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(2494)) w1 += 8 * (n_A_SHIELD_DEF_PLUS - 5);
	}

	//----------------------------------------------------------------
	// 「ウルズセット」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 442) {
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1581)) w1 += 50;
	}

	//----------------------------------------------------------------
	// 「白羽セット」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 498) {
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1601)) w1 += 10;
	}

	//----------------------------------------------------------------
	// 「黒羽セット」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 505) {
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1606)) w1 += 10;
	}

	//----------------------------------------------------------------
	// 「キャノンスピア」の、「キャノンスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 569) {
		if(EquipNumSearch(1696)) w1 += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「カタパルト」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 608) {
		if(EquipNumSearch(1707)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「大型クロスボウ」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 498) {
		if(EquipNumSearch(1708)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「機械植物帽」の、「スポアエクスプロージョン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==736) {
		if(EquipNumSearch(2082)) w1 += 5 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
	}

	//----------------------------------------------------------------
	// 「鳥狩の鉤爪」の、「ブリッツビート」強化
	// 「空飛ぶガラパゴ」の、「ブリッツビート」強化
	// 「楽園の鳥かご」の、「ブリッツビート」強化
	// 「楽園の鳥かごセット」の、「ブリッツビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==118){
		if(EquipNumSearch(2187)) w1 += 10 * LearnedSkillSearch(SKILL_ID_STEEL_CROW) * EquipNumSearch(2187);
		if(EquipNumSearch(2513)) w1 += 40 * LearnedSkillSearch(SKILL_ID_STEEL_CROW);
		if(IsSameJobClass(JOB_ID_RANGER) && EquipNumSearch(2396)) w1 += 5 * n_A_HEAD_DEF_PLUS;
		if(IsSameJobClass(JOB_ID_RANGER) && EquipNumSearch(2398)) w1 += 5 * n_A_Weapon_ATKplus;
		if(IsSameJobClass(JOB_ID_RANGER) && EquipNumSearch(ITEM_ID_RAKUENNO_TORIKAGO_EXSIONNO_HANE_S2)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「古びた楯無の鎧」の、「シールドチェーン」「サクリファイス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==284 || n_A_ActiveSkill==324){
		if(EquipNumSearch(2236)) w1 += 5 * ROUNDDOWN(n_A_BODY_DEF_PLUS / 2);
	}

	//----------------------------------------------------------------
	// 「ギガントアックス」の、「カートターミネーション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==326){
		if(EquipNumSearch(2335)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「ギガントヘルムセット」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==259){
		if(EquipNumSearch(2337)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「法螺貝」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==639 && EquipNumSearch(2430)){
		if(n_A_Weapon_ATKplus >= 5) w1 += 10;
		if(n_A_Weapon_ATKplus >= 7) w1 += 20;
		if(n_A_Weapon_ATKplus >= 9) w1 += 40;
	}

	//----------------------------------------------------------------
	// 「ルーンヘルム」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==452){
		if (EquipNumSearch(ITEM_ID_RUNE_HELM) > 0) {
			w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}
		else if (EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET) > 0) {
			w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}
		else if (EquipNumSearch(ITEM_ID_TENBINKYUNO_DIADEM) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 30;
				if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
				if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
			}
		}
		else if (EquipNumSearch(ITEM_ID_FAFNIR_HELM) > 0) {
			w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}

	}

	//----------------------------------------------------------------
	// 「破戒僧の数珠」の、「双龍脚」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 609){
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSORY_1] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 15) * 2;
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSORY_2] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 15) * 2;
	}

	//----------------------------------------------------------------
	// 「破戒僧の数珠」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 610){
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSORY_1] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 30) * 2;
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSORY_2] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 30) * 2;
	}

	//----------------------------------------------------------------
	// 「破戒僧の数珠」の、「修羅身弾」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 613){
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSORY_1] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 20) * 2;
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSORY_2] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 20) * 2;
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ペオースセット」の、「ウィンドカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 443){
		if(EquipNumSearch(2537)) w1 += 50 * ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 2);
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(2539)) w1 += 100;
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　黒羽セット」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 505 && EquipNumSearch(2544)){
		w1 += SU_INT * 2;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) w1 += SU_INT * 2;
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ナブセット」の、「カウンタースラッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 469 && EquipNumSearch(2569)){
		w1 += n_A_BaseLV;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) w1 += n_A_BaseLV;
	}

	// 三段掌 のダメージUP効果
	// 		5000 ITEM_SP_SKILL_DAMAGE_OFFSET
	// 	 	 187 SKILL_ID_SANDANSHO
	// false がセットされるコードが存在しないようで、到達不可能コードに見える
	if (!TyouEnkakuSousa3dan) {
		w1 += GetEquippedTotalSPEquip(5187) + GetEquippedTotalSPCardAndElse(5187);
	}

	//----------------------------------------------------------------
	// 「ソニックアクセラレーション」の、「ソニックブロー」強化
	//----------------------------------------------------------------
	if((n_A_ActiveSkill==83 || n_A_ActiveSkill==388) 
		&& Math.max(LearnedSkillSearch(SKILL_ID_SONIC_ACCELERATION), UsedSkillSearch(SKILL_ID_SONIC_ACCELERATION)) > 0) {
		w1 += 10;
	}


	//----------------------------------------------------------------
	// 「貴族の仮面」の、「サクリファイス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 284) {
		w1 += 2 * n_A_BaseLV * EquipNumSearch(ITEM_ID_KIZOKUNO_KAMEN);
	}


	//----------------------------------------------------------------
	// 「レクイエムバイオリン」の、「アローバルカン」強化
	// 「レクイエムブレイドウィップ」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 292) {
		if (EquipNumSearch(ITEM_ID_REQUIEM_VIOLIN)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 200;
		}
		if (EquipNumSearch(ITEM_ID_REQUIEM_BLADEWHIP)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 200;
		}
	}


	//----------------------------------------------------------------
	// 「古びたボーンサークレット」の、「クロスインパクト」「ダークイリュージョン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 460 || n_A_ActiveSkill == 461) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BONECIRCRET)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 15;
		}
	}

	//----------------------------------------------------------------
	// 「古びたミンストレルソングの帽子」の、「振動残響」強化
	// 「古びたバレリーナの髪飾り」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 639) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BALLERINA)
			|| EquipNumSearch(ITEM_ID_FURUBITA_MINSTRELSONG)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びたブレイジングソウル」の、「雷光弾」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 623) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BLAZINGSOUL)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びたドライバーバンド」の、「コールドスロワー」「フレイムスロワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 552 || n_A_ActiveSkill == 553) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_DRIVERBAND_KIRO)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
		if(EquipNumSearch(ITEM_ID_FURUBITA_DRIVERBAND_AKA)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びたルーンサークレット」の、「ウィンドカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 443) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_RUNECIRCRET)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 200;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 150;
		}
	}

	//----------------------------------------------------------------
	// 「古びたルーンサークレット」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 452) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_RUNECIRCRET)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 50;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 30;
		}
	}

	//----------------------------------------------------------------
	// 「古びた守護の冠」の、「キャノンスピア」「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 569 || n_A_ActiveSkill == 570) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_SHUGONOKANNMURI)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 15;
		}
	}


	//----------------------------------------------------------------
	// 「サファイアリスト」の、装備効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == 736) {
		w1 += 5 * ROUNDDOWN(n_A_BaseLV / 20) *  EquipNumSearch(ITEM_ID_SAPPHIRE_LIST);
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 292) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「ミュージカルストライク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 199) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「矢撃ち」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 207) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}


	//----------------------------------------------------------------
	// 「元素のタオルセット」の、「アローストーム」「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM || n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM){

		if(n_A_Arrow == ARROW_ID_HONOONO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_MOERU_YUMI)) {
				w1 += 5 * n_A_Weapon_ATKplus;
		}

		if(n_A_Arrow == ARROW_ID_SUISHONO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_HYOTENNO_YUMI)) {
			w1 += 5 * n_A_Weapon_ATKplus;
		}

		if(n_A_Arrow == ARROW_ID_GANSEKINO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_DAICHINO_YUMI)) {
			w1 += 5 * n_A_Weapon_ATKplus;
		}

		if(n_A_Arrow == ARROW_ID_KAZENO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_HAYATENO_YUMI)) {
			w1 += 5 * n_A_Weapon_ATKplus;
		}
	}


	//----------------------------------------------------------------
	// 「アルクイエンのネックレス」の、「カートレボリューション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_REVOLUTION) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_ARKUIENNO_NECKLACE);
	}

	//----------------------------------------------------------------
	// 「アルクイエンのネックレス」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		w1 += ROUNDDOWN(n_A_BaseLV / 3) * EquipNumSearch(ITEM_ID_ARKUIENNO_NECKLACE);
	}

	//----------------------------------------------------------------
	// 「アルクイエンのネックレス」の、「パワースイング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		w1 +=  ROUNDDOWN(n_A_BaseLV / 5) * EquipNumSearch(ITEM_ID_ARKUIENNO_NECKLACE);
	}

	//----------------------------------------------------------------
	// 「レッドベビードラゴン」の、「ウォータードラゴンブレス」「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH || n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {

		if(EquipNumSearch(ITEM_ID_RED_BABY_DRAGON)) {

			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 15;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 15;

		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、「グリムトゥース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_GRIM_TOOTH) {
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_GRIM_TOOTH) >= 5) {
				w1 += 50;
			}

			// 過剰精錬による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += n_A_BaseLV;
			}
		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、「ソウルブレイカー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SOUL_BREAKER) {
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_SOUL_BREAKER) >= 10) {
				w1 += 50;
			}

			// 過剰精錬による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 3);
			}
		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、「クロスインパクト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_IMPACT) {
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) >= 5) {
				w1 += 5;
			}

			// 過剰精錬による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 30);
			}
		}
	}


	//----------------------------------------------------------------
	// 「試験管ヘアバンド」の、「カートキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		if (EquipNumSearch(ITEM_ID_SHIKENKAN_HAIRBAND)) {
			if (n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if (n_A_HEAD_DEF_PLUS >= 8) w1 += 30;
		}
	}

	//----------------------------------------------------------------
	// 「試験管ヘアバンド」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		if (EquipNumSearch(ITEM_ID_SHIKENKAN_HAIRBAND)) {
			if (n_A_HEAD_DEF_PLUS >= 6) w1 += 10;
			if (n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}
	}


	//----------------------------------------------------------------
	// 「ショットガン系統」の、「スラッグショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SLUG_SHOT) {
		if (n_A_WeaponType == ITEM_KIND_SHOTGUN) {
			w1 += 7 * ROUNDDOWN(SU_STR / 10);
			if (SU_STR >= 110) {
				w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ライフル系統」の、「ハンマーオブゴッド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HAMMER_OF_GOD) {
		if (n_A_WeaponType == ITEM_KIND_RIFLE) {
			w1 += 7 * ROUNDDOWN(SU_INT / 10);
			if (SU_INT >= 110) {
				w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガトリングガン系統」の、「ラウンドトリップ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROUND_TRIP) {
		if (n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
			w1 += 7 * ROUNDDOWN(SU_AGI / 10);
			if (SU_AGI >= 110) {
				w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレネードガン系統」の、「ドラゴンテイル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DRAGON_TAIL) {
		if (n_A_WeaponType == ITEM_KIND_GRENADEGUN) {
			w1 += 7 * ROUNDDOWN(SU_LUK / 10);
			if (SU_LUK >= 110) {
				w1 += 30;
			}
		}
	}


	//----------------------------------------------------------------
	// 「布都御魂」の、「黄泉返し」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_YOMIGAESHI) {
		if(n_A_Weapon_ATKplus >= 1 && n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_FUTSUNOMITAMA){
			w1 += 2 * n_A_Weapon_ATKplus;
		}
		if(n_A_Weapon2_ATKplus >= 1 && n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_FUTSUNOMITAMA){
			w1 += 2 * n_A_Weapon2_ATKplus;
		}
	}


	//----------------------------------------------------------------
	// 「与一の肩掛け」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {

			// スキル習得レベルによる効果
			if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
				w1 += 5;
			}

			// 装備の過剰による効果
			if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					w1 += ROUNDDOWN(n_A_BaseLV / 30);
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「与一の肩掛け」の、「シャープシューティング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHARP_SHOOTING) {
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {

			// スキル習得レベルによる効果
			if (LearnedSkillSearch(SKILL_ID_SHARP_SHOOTING) >= 5) {
				w1 += 60;
			}

			// 装備の過剰による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 3);
			}
		}
	}

	//----------------------------------------------------------------
	// 「与一の肩掛け」の、「ブリッツビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BLITZ_BEAT) {
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {

			// スキル習得レベルによる効果
			if (LearnedSkillSearch(SKILL_ID_BLITZ_BEAT) >= 5) {
				w1 += 15;
			}

			// 装備の過剰による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 5);
			}
		}
	}


	//----------------------------------------------------------------
	// 「シャドウリング」の、「バックスタブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BACK_STAB) {
		w1 += 2 * n_A_BaseLV * EquipNumSearch(ITEM_ID_SHADOW_RING);
	}

	//----------------------------------------------------------------
	// 「シャドウリング」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		if (TimeItemNumSearch(98)) {
			// 当強化効果はバフとしてかかるらしいので、複数装備しても効果は増えない
			w1 += ROUNDDOWN(n_A_BaseLV / 3) * 1;
		}
	}


	//----------------------------------------------------------------
	// 「パワードセット」の、「アームズキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARMS_CANNON) {
		if (EquipNumSearch(ITEM_SET_ID_POWERED_SET)) {
			w1 += 50;
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードセット」の、「フレイムスロワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FLAME_THROWER) {
		if (EquipNumSearch(ITEM_SET_ID_POWERED_SET)) {
			w1 += 50;
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードセット」の、「コールドスロワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_COLD_THROWER) {
		if (EquipNumSearch(ITEM_SET_ID_POWERED_SET)) {
			w1 += 50;
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンセット」の、「バルカンアーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_VULCAN_ARM) {
		if (EquipNumSearch(ITEM_SET_ID_GUARDIAN_SET)) {
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンセット」の、「ブーストナックル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOOST_KNUCKLE) {
		if (EquipNumSearch(ITEM_SET_ID_GUARDIAN_SET)) {
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}


	//----------------------------------------------------------------
	// 「バイオプロテクターセット」の、「スポアエクスプロージョン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPORE_EXPLOSION) {
		if (EquipNumSearch(ITEM_SET_ID_BIO_PROTECTOR_KIKAI_SHOKUBUTSU_BO)) {
			w1 += 5 * n_A_HEAD_DEF_PLUS;
		}
	}


	//----------------------------------------------------------------
	// 「古王の双刃」の、「クロスインパクト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_IMPACT) {
		if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			w1 += 3 * n_A_Weapon_ATKplus;
		}
	}
	//----------------------------------------------------------------
	// 「古王の双刃」の、「クロスリッパーラッシャー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_RIPPER_SLASHER) {
		if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			w1 += 2 * n_A_Weapon_ATKplus;
		}
	}
	//----------------------------------------------------------------
	// 「古王の双刃」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			w1 += 1 * n_A_Weapon_ATKplus;
		}
	}


	//----------------------------------------------------------------
	// 「アヴェンジャーランス」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		if (EquipNumSearch(ITEM_ID_AVENGER_LANCE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}
	//----------------------------------------------------------------
	// 「アヴェンジャーランス」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		if (EquipNumSearch(ITEM_ID_AVENGER_LANCE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャーツーハンドアックス」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if (EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}
	//----------------------------------------------------------------
	// 「アヴェンジャーツーハンドアックス」の、「パワースイング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		if (EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャーハンターボウ」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		if (EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}
	//----------------------------------------------------------------
	// 「アヴェンジャーハンターボウ」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		if (EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャー風魔手裏剣」の、「風魔手裏剣-乱華」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_RANKA) {
		if (EquipNumSearch(ITEM_ID_AVENGER_FUMASHURIKEN)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ギガントブーツ　アックスセット」の、「カートターミネーション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TERMINATION) {
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) w1 += 8;
				if (n_A_Weapon_ATKplus >= 9) w1 += 12;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ギガントブーツ　ボウセット」の、「アローストーム」強化
	// 「ギガントブーツ　ボウセット」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM
		|| n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) w1 += 20;
				if (n_A_Weapon_ATKplus >= 9) w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ギガントブーツ　ランスセット」の、「スパイラルピアース」強化
	// 「ギガントブーツ　ランスセット」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE
		|| n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_LANCE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 20;
			if (n_A_Weapon_ATKplus >= 9) w1 += 30;
		}
	}


	//----------------------------------------------------------------
	// 「セイヴザキング」の、騎兵修練【未習得】時における、「グランドクロス」強化
	// 「セイヴザキング」の、騎兵修練【未習得】時における、「バッシュ」強化
	// 「セイヴザキング」の、騎兵修練【未習得】時における、「ホーリークロス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_GRAND_CROSS
		|| n_A_ActiveSkill == SKILL_ID_BASH
		|| n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {

		if (LearnedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
			if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) {
				w1 += n_A_Weapon_ATKplus * 20;
			}
		}

	}


	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「クイックドローショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_QUICKDRAW_SHOT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 5 * LearnedSkillSearch(SKILL_ID_ETERNAL_CHAIN) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「シャッターストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHUTTER_STORM) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_SHUTTER_STORM) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 5 * LearnedSkillSearch(SKILL_ID_FIRE_RAIN) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「マススパイラル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MASS_SPIRAL) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 5 * LearnedSkillSearch(SKILL_ID_MASS_SPIRAL) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「神魔バフォメットの角」の、「デュプレライト（物理）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_GRAHAM_LIGHT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINMA_BAPHOMETNO_TSUNO)) > 0) {
			w1 += 10 * n_A_HEAD_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「神魔バフォメットの角　ブラッディクロスセット」の、「ダーククロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DARK_CROSS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS)) > 0) {
			w1 += 10 * n_A_Weapon_ATKplus * itemCount;

			if (n_A_Weapon_ATKplus >= 10) {
				w1 += 100;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ガーディアンプロセッサ　パイルバンカーセット」の、「バルカンアーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_VULCAN_ARM) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンプロセッサ　パイルバンカーセット」の、「ブーストナックル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOOST_KNUCKLE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 30;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 30;
			}
		}
	}


	//----------------------------------------------------------------
	// 「勇者の靴　達人の剣　セット」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_KEN)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_ENCHANT_BLADE) * itemCount;
			w1 += 10 * LearnedSkillSearch(SKILL_ID_AURA_BLADE) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「勇者の靴　達人の剣　セット」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_KEN)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_ENCHANT_BLADE) * itemCount;
			w1 += 10 * LearnedSkillSearch(SKILL_ID_AURA_BLADE) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「業風石　ゲラドリア　セット」の、「ウィンドカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WIND_CUTTER) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_GERADRIA)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 30 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ディーヴァバイオリン」の、「アローバルカン」強化
	// 「ディーヴァブレイドウィップ」の、「アローバルカン」強化
	// 「ミラージュバイオリン」の、「アローバルカン」強化
	// 「ミラージュブレイドウィップ」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARRAW_VULKAN) {
		if (EquipNumSearch(ITEM_ID_DIVA_VIOLIN)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_DIVA_BLADEWHIP)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_MIRRORAGE_VIOLIN)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_MIRRORAGE_BLADEWHIP)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
	}


	//----------------------------------------------------------------
	// 「執行者のシューズ」の、「メテオアサルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_METEOR_ASSALT) {
		if (EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_POISON_REACT) > 0) {
				w1 += 30 * LearnedSkillSearch(SKILL_ID_POISON_REACT);
			}

			// 過剰精錬による効果
			if (n_A_SHOES_DEF_PLUS >= 5) {
				w1 += n_A_BaseLV;
			}
			if (n_A_SHOES_DEF_PLUS >= 7) {
				w1 += n_A_BaseLV;
			}
		}
	}


	//----------------------------------------------------------------
	// 「獄エンチャント」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_STORM_BLAST) {
		if (CardNumSearch(CARD_ID_GOKU)) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 100;
			}
		}
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の、「ウォーグストライク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WUG_STRIKE) {
		if (CardNumSearch(CARD_ID_GOKU)) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_RANGER)) {
				w1 += 30;
			}
		}
	}


	//----------------------------------------------------------------
	// 「巨人の加護　アックスセット」の、「カートターミネーション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TERMINATION) {
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_AXE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 5;
			if (n_A_Weapon_ATKplus >= 9) w1 += 10;
		}
	}

	//----------------------------------------------------------------
	// 「巨人の加護　ボウセット」の、「アローストーム」強化
	// 「巨人の加護　ボウセット」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM
		|| n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 5;
			if (n_A_Weapon_ATKplus >= 9) w1 += 10;
		}
	}

	//----------------------------------------------------------------
	// 「巨人の加護　ランスセット」の、「スパイラルピアース」強化
	// 「巨人の加護　ランスセット」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE
		|| n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_LANCE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 5;
			if (n_A_Weapon_ATKplus >= 9) w1 += 10;
		}
	}


	//----------------------------------------------------------------
	// 「深淵の王の指輪」の、「クロスリッパースラッシャー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_RIPPER_SLASHER) {
		w1 += 1 * ROUNDDOWN(n_A_BaseLV / 3) * EquipNumSearch(ITEM_ID_SHINENNO_ONO_YUBIWA);
	}

	//----------------------------------------------------------------
	// 「深淵の王の指輪」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		w1 += 1 * ROUNDDOWN(n_A_BaseLV / 10) * EquipNumSearch(ITEM_ID_SHINENNO_ONO_YUBIWA);
	}

	//----------------------------------------------------------------
	// 「キングスガード　セイヴザキング　セット」の、「グランドクロス」強化
	// 「キングスガード　セイヴザキング　セット」の、「バッシュ」強化
	// 「キングスガード　セイヴザキング　セット」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_GRAND_CROSS
		|| n_A_ActiveSkill == SKILL_ID_BASH
		|| n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {

		if (EquipNumSearch(ITEM_SET_ID_KINGS_GUARD_SAVE_THE_KING)) {
			w1 += n_A_SHIELD_DEF_PLUS * 20;
		}
	}


	//----------------------------------------------------------------
	// 「悪魔のカード」の、「フェイントボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FAINT_BOMB) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_DEVIL);
	}

	//----------------------------------------------------------------
	// 「力のカード」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TENRACHIMO) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_POWER);
	}

	//----------------------------------------------------------------
	// 「正義のカード」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_JUSTICE);
	}

	//----------------------------------------------------------------
	// 「節制のカード」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_SESSEI);
	}

	//----------------------------------------------------------------
	// 「戦車のカード」の、「アームズキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARMS_CANNON) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_CHARIOT);
	}

	//----------------------------------------------------------------
	// 「死神のカード」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_DEATH);
	}

	//----------------------------------------------------------------
	// 「皇帝のカード」の、「オーバーブランド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_OVER_BLAND) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_EMPEROR);
	}

	//----------------------------------------------------------------
	// 「恋人のカード」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_LOVERS);
	}
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_LOVERS);
	}

	//----------------------------------------------------------------
	// 「法王のカード」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_HOUO);
	}


	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、「カートレボリューション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_REVOLUTION) {
		w1 += 1 * ROUNDDOWN(n_A_BaseLV / 1) * EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE);
	}

	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、「カートキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		w1 += 2 * ROUNDDOWN(n_A_BaseLV / 20) * EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE);
	}

	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		w1 += 2 * ROUNDDOWN(n_A_BaseLV / 30) * EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE);
	}


	//----------------------------------------------------------------
	// 「Y.S.F.0.1.セット」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「Y.S.F.0.1.セット」の、「スピアブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPEAR_BOOMERANG) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 200 * itemCount;
			}
			if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「Y.S.F.0.1.セット」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「スナイピングベール」の、「マススパイラル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MASS_SPIRAL) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 1 * ROUNDDOWN(n_A_BaseLV / 3) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の、「アンチマテリアルブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_UNTIMATERIAL_BLAST) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 3 * ROUNDDOWN(n_A_BaseLV / 4) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の、「ハンマーオブゴッド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HAMMER_OF_GOD) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 6 * ROUNDDOWN(n_A_BaseLV / 5) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「英雄の指輪　達人の槌セット」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}
	if(n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「英雄の指輪　達人の剣セット」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_KEN_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「英雄の指輪　達人の剣セット」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_KEN_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「英雄の指輪　達人の斧セット」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 20 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 40 * itemCount;
			}
		}
	}
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_S2_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 20 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 40 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「灰羽のブーツ　黒羽スーツセット」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CLUSTER_BOMB) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS)) > 0) {
			w1 += 30 * ROUNDDOWN(SU_INT / 20) * itemCount;

			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 400 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ　黒羽スーツセット」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 20 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 10 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ　白羽スーツセット」の、「シャープシューティング」による強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHARP_SHOOTING) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 50 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 25 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ　白羽スーツセット」の、「ブリッツビート」による強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BLITZ_BEAT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 40 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 20 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「物影」の、「影斬り」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_KAGEKIRI) {
		if(n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_MONOKAGE){
			w1 += 1 * n_A_BaseLV;
		}
		if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_MONOKAGE){
			w1 += 1 * n_A_BaseLV;
		}
	}

	//----------------------------------------------------------------
	// 「物影」の、「霞斬り」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_KASUMIGIRI) {
		if(n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_MONOKAGE){
			w1 += 3 * n_A_BaseLV;
		}
		if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_MONOKAGE){
			w1 += 3 * n_A_BaseLV;
		}
	}


	//----------------------------------------------------------------
	// 「大自然のギター」の、「アローバルカン」強化
	// 「大自然のロープ」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARRAW_VULKAN) {
		if (EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
	}


	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、「風魔手裏剣投げ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_NAGE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_NAGE) >= 5) {
				w1 += 50 * itemCount;
			}

			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 1 * ROUNDDOWN(n_A_BaseLV / 1) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、「風魔手裏剣-乱華-」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_RANKA) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_RANKA) >= 5) {
				w1 += 30 * itemCount;
			}

			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 1 * ROUNDDOWN(n_A_BaseLV / 3) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「鉱員のリュック」の、「マグマイラプション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MAGMA_ILLUPTION) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KOINNNO_RUCKSACK)) > 0) {
			w1 += 10 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「スカラバハイヒール　エルヴンボウセット」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM || n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if (EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 8) w1 += 8;
				if (n_A_Weapon_ATKplus >= 10) w1 += 12;
			}
		}
	}


	//----------------------------------------------------------------
	// 「スカラバハイヒール　ドゥルガーセット」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_DULLGER)) > 0) {
			let vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7)  vartmp += 8;
			if (n_A_Weapon_ATKplus >= 9)  vartmp += 12;

			w1 += vartmp * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「エメラルドリング」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_SHOWER) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エメラルドリング」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DOUBLE_STRAFING) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エメラルドリング」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM || n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
			w1 += 2 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「悪魔の手」の、「獅子吼」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SISIKO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_AKUMANO_TE)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				w1 += 30 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				w1 += 50 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「不死鳥の冠」の、「オーバーブランド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_OVER_BLAND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				w1 += 15 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				w1 += 25 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「おもちゃの指輪」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_ID_OMOCHANO_YUBIWA)) > 0) {
			w1 += 1 * ROUNDDOWN(n_A_BaseLV / 1) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「おもちゃの指輪」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_ID_OMOCHANO_YUBIWA)) > 0) {
			w1 += 3 * ROUNDDOWN(n_A_BaseLV / 5) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「特選ウサギのお守り」の、「キャロットビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CARROT_BEAT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_USAGINO_OMAMORI)) > 0) {
			w1 += 1 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「虹色のスカーフ」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF)) > 0) {
			w1 += 1 * LearnedSkillSearch(SKILL_ID_AIMED_BOLT) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョン名射手のりんご」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DOUBLE_STRAFING) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_MEISHASHUNO_RINGO)) {
			if (n_A_BaseLV >= 170) {
				w1 += 70;
			}
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョン神の使者」の、「シールドチェーン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHIELD_CHAIN) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_KAMINO_SHISHA)) {
			if (n_A_BaseLV >= 170) {
				w1 += 15;
			}
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョン神の使者」の、「シールドブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHIELD_BOOMERANG) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_KAMINO_SHISHA)) {
			if (n_A_BaseLV >= 170) {
				w1 += 15;
			}
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョンポールアクス」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_POLE_AXE)) {
			if (n_A_BaseLV >= 170) {
				w1 += 15 * n_A_Weapon_ATKplus;
			}
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョンウォーアクス」の、「アックスブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_BOOMERANG) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_WAR_AXE)) {
			if (n_A_BaseLV >= 170) {
				w1 += 10 * n_A_Weapon_ATKplus;
			}
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルブーツ」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_BOOTS)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「地雷震」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ZIRAISHIN) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「双龍脚」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SORYUKYAKU) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TENRACHIMO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のプレートセット」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_PLATE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のプレートセット」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_STORM_BLAST) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_PLATE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「キングスメイル　セイヴザキングセット」の、「グランドクロス」強化
	// 「キングスメイル　セイヴザキングセット」の、「バッシュ」強化
	// 「キングスメイル　セイヴザキングセット」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_GRAND_CROSS
		|| n_A_ActiveSkill == SKILL_ID_BASH
		|| n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {

		if (EquipNumSearch(ITEM_SET_ID_KINGS_MAIL_SAVE_THE_KING)) {
			w1 += 20 * n_A_BODY_DEF_PLUS;
		}

	}


	//----------------------------------------------------------------
	// 「古龍ジラントカード」の、「ウォータードラゴンブレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		if ((itemCount = CardNumSearch(CARD_ID_KORYU_ZIRANT, CARD_REGION_ID_ACCESSORY_1_ANY)) > 0) {
			w1 += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「古龍ジラントカード」の、「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		if ((itemCount = CardNumSearch(CARD_ID_KORYU_ZIRANT, CARD_REGION_ID_ACCESSORY_2_ANY)) > 0) {
			w1 += 50 * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「エンチャント　反逆者」の、「ラウンドトリップ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROUND_TRIP) {
		if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_HANGYAKUSHA)) > 0) {
			if (SU_AGI >= 110) {
				w1 += 30 * ROUNDDOWN((SU_AGI - 110) / 5) * cardCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「エンチャント　反逆者」の、「ドラゴンテイル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DRAGON_TAIL) {
		if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_HANGYAKUSHA)) > 0) {
			if (SU_LUK >= 110) {
				w1 += 30 * ROUNDDOWN((SU_LUK - 110) / 5) * cardCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョン熱血鉢巻き」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TENRACHIMO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_NEKKETSU_HACHIMAKI)) > 0) {
			if (n_A_BaseLV >= 170) {
				w1 += 5 * n_A_HEAD_DEF_PLUS * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、「風魔手裏剣投げ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_NAGE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_GENZYUTSU_KAGEMUSHA) >= 5) {
				w1 += 2 * Math.floor(n_A_BaseLV / 4) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、「風魔手裏剣-乱華-」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_RANKA) {
		if ((itemCount = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_GENZYUTSU_KAGEMUSHA) >= 5) {
				w1 += 1 * Math.floor(n_A_BaseLV / 4) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「フロンティアブーツ　自警団の弓セット」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (SU_INT >= 120) {
					w1 += 50 * itemCount;
				}
			}
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (SU_INT >= 120) {
					w1 += 50 * itemCount;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　自警団の弓セット」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (SU_INT >= 120) {
					w1 += 50 * itemCount;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪鬼羅刹の指輪」の、「獅子吼」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SISIKO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_BAKKISANDAN) >= 5) {
				w1 += 30 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪鬼羅刹の指輪」の、「修羅身弾」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SHURASHINDAN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_BAKKISANDAN) >= 5) {
				w1 += 100 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「バニシングバスター」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BUNISHING_BASTER) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			w1 += 60 * LearnedSkillSearch(SKILL_ID_BUNISHING_BASTER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			w1 += 50 * LearnedSkillSearch(SKILL_ID_FIRE_RAIN) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「ハウリングマイン」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_HOWLING_MINE)
		|| (n_A_ActiveSkill == SKILL_ID_HOWLING_MINE_APPEND)) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			w1 += 40 * LearnedSkillSearch(SKILL_ID_HOWLING_MINE) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ウルティオ-OS」の、「デュプレライト（物理）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_GRAHAM_LIGHT) {
		itemCountRight = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			w1 += 7 * n_A_BaseLV * itemCountRight;
			w1 += 7 * n_A_BaseLV * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「バーチャルボウ-OS」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CLUSTER_BOMB) {
		itemCountRight = EquipNumSearch(ITEM_ID_VIRTUAL_BOW_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_VIRTUAL_BOW_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			w1 += 4 * n_A_BaseLV * itemCountRight;
			w1 += 4 * n_A_BaseLV * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「MH-P89-OS」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHINDOZANKYO) {
		itemCountRight = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCountRight;
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「ハートハンター・ベラレカード」の、「スプレッドアタック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPREAD_ATTACK) {
		if ((itemCount = CardNumSearch(CARD_ID_HEART_HUNTER_BELLARE)) > 0) {
			w1 += 3 * n_A_BaseLV * itemCount;

			if (IsSameJobClass(JOB_ID_REBELLION)) {
				w1 += 2 * n_A_BaseLV * itemCount;

				if (n_A_SHOES_DEF_PLUS >= 9) {
					w1 += 1 * n_A_BaseLV * itemCount;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// 「ハートハンター・Mベラレカード」の、「ラピッドシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_RAPID_SHOWER) {
		if ((itemCount = CardNumSearch(CARD_ID_HEART_HUNTER_M_BELLARE)) > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;

			if (IsSameJobClass(JOB_ID_REBELLION)) {
				w1 += 1 * n_A_BaseLV * itemCount;

				if (n_A_SHOES_DEF_PLUS >= 9) {
					w1 += 1 * n_A_BaseLV * itemCount;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ウィンドゲイル　セット」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_SHOWER) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL);
		if (itemCount > 0) {
			w1 += 4 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ウィンドゲイル　セット」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
		}
	}

	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　シャープスター　セット」の、「シャープシューティング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHARP_SHOOTING) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_SHARP_STAR);
		if (itemCount > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　シャープスター　セット」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DOUBLE_STRAFING) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_SHARP_STAR);
		if (itemCount > 0) {
			w1 += 2 * n_A_BaseLV * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ファルケンシューター　セット」の、「ブリッツビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BLITZ_BEAT) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_FALCEN_SHOOTER);
		if (itemCount > 0) {
			w1 += 2 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ファルケンシューター　セット」の、「ウォーグストライク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WUG_STRIKE) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_FALCEN_SHOOTER);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ビリー・コスルリースカード」の、「インベナム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ENVENOM) {
		cardCount = CardNumSearch(CARD_ID_BILLY_COSRLEASE);
		if (cardCount > 0) {
			w1 += 2 * n_A_BaseLV * cardCount;
		}
	}


	//----------------------------------------------------------------
	// 「イフォドスカード」の、「スピアブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPEAR_BOOMERANG) {
		cardCount = CardNumSearch(CARD_ID_IFODOS);
		if (cardCount > 0) {
			w1 += 4 * n_A_BaseLV * cardCount;
		}
	}


	//----------------------------------------------------------------
	// 「ユメヒメカード」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_SHOWER) {
		cardCount = CardNumSearch(CARD_ID_YUMEHIME);
		if (cardCount > 0) {
			w1 += 2 * n_A_BaseLV * cardCount;
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョンミリタリーブーツ」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS);
		if (itemCount > 0) {
			w1 += 30 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョンミリタリーブーツ」の、「アックスブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_BOOMERANG) {
		itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「暴威のマフラー」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
			w1 += 2 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}
	}
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
			w1 += 2 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「メタルスティック」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		itemCountRight = EquipNumSearch(ITEM_ID_METAL_STICK, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_METAL_STICK, EQUIP_REGION_ID_ARMS_LEFT);

		if ((itemCountRight + itemCountLeft) > 0) {
			w1 += 2 * n_A_BaseLV * (itemCountRight + itemCountLeft);
		}

		if (itemCountRight > 0) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 1 * n_A_BaseLV * itemCountRight;
			}
		}

		if (itemCountLeft > 0) {
			if (n_A_Weapon2_ATKplus >= 9) {
				w1 += 1 * n_A_BaseLV * itemCountLeft;
			}
		}
	}


	//----------------------------------------------------------------
	// 「氷炎悪神の刃鎌」の、「メナーナイト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MAMMONITE) {
		itemCountRight = EquipNumSearch(ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, EQUIP_REGION_ID_ARMS_LEFT);

		if ((itemCountRight + itemCountLeft) > 0) {
			w1 += 10 * n_A_BaseLV * (itemCountRight + itemCountLeft);
		}
	}


	//----------------------------------------------------------------
	// 「追撃者のシューズ」の、「フェイタルメナス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FATAL_MENUS) {
		itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_SHOES);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_KEN_SHUREN) * itemCount;
			w1 += 10 * LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「よちよちウリボウスタイ」の、「アニマル系スキル」短縮
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_PIKKI_TSUKI)
			|| (n_A_ActiveSkill == SKILL_ID_TAROUNO_KIZU)
			|| (n_A_ActiveSkill == SKILL_ID_CARROT_BEAT)
			|| (n_A_ActiveSkill == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI)) > 0) {
			w1 += 15 * LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「試験管ブーツ」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		itemCount = EquipNumSearch(ITEM_ID_SHIKENKAN_BOOTS);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_CRAZY_WEED) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「溶岩のマント」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		itemCount = EquipNumSearch(ITEM_ID_YOGANNO_MANT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「溶岩のマント」の、「パワースイング」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		itemCount = EquipNumSearch(ITEM_ID_YOGANNO_MANT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ファフニールブレス」の、「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_FAFNIR_BREATH);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールブレス」の、「ウォータードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_FAFNIR_BREATH);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「追撃者のリング」の、「フェイタルメナス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FATAL_MENUS) {
		itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_RING);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「天魔外道の外套」の、「獅子吼」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SISIKO) {
		itemCount = EquipNumSearch(ITEM_ID_TENMA_GEDONO_GAITO);
		if (itemCount > 0) {
			w1 += 15 * LearnedSkillSearch(SKILL_ID_BAKKISANDAN) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ルーングリーブ」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE) {
		itemCount = EquipNumSearch(ITEM_ID_RUNE_GREEVE);
		if (itemCount > 0) {
			w1 += 40 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ルーングリーブ」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		itemCount = EquipNumSearch(ITEM_ID_RUNE_GREEVE);
		if (itemCount > 0) {
			w1 += 40 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ポルックスリング」の、「温もり」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_NUKUMORI) || (n_A_ActiveSkill == SKILL_ID_NUKUMORI_KABE)) {
		if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
			itemCount = EquipNumSearch(ITEM_ID_POLLUX_RING);
			if (itemCount > 0) {
				w1 += 100 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「科学者のマント」の、「スポアエクスプロージョン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SPORE_EXPLOSION) {
		itemCount = EquipNumSearch(ITEM_ID_KAGAKUSHANO_MANT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「スローステキスト」の、「温もり」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_NUKUMORI) || (n_A_ActiveSkill == SKILL_ID_NUKUMORI_KABE)) {

		itemCountRight = EquipNumSearch(ITEM_ID_SLOTH_TEXT, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_SLOTH_TEXT, EQUIP_REGION_ID_ARMS_LEFT);

		if (itemCountRight > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50 * itemCountRight;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 50 * itemCountRight;
			}
		}

		if (itemCountLeft > 0) {
			if (n_A_Weapon2_ATKplus >= 7) {
				w1 += 50 * itemCountLeft;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				w1 += 50 * itemCountLeft;
			}
		}
	}


	//----------------------------------------------------------------
	// 「パワードウィング」の、「アームズキャノン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARMS_CANNON) {
		itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING);
		if (itemCount > 0) {
			w1 += 25 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「パワードウィング」の、「コールドスローワー」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COLD_THROWER) {
		itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING);
		if (itemCount > 0) {
			w1 += 25 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「パワードウィング」の、「フレイムスローワー」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FLAME_THROWER) {
		itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING);
		if (itemCount > 0) {
			w1 += 25 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「エリュマントスの皮」の、「アローストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		itemCount = EquipNumSearchMIG(ITEM_ID_ERYMANTHNO_KAWA);
		if (itemCount > 0) {
			w1 += 1 * LearnedSkillSearch(SKILL_ID_AIMED_BOLT) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルガトリングスーツ」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GATLING_SUIT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_HEAT_BARREL) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースガトリングスーツ」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_GATLING_SUIT);
		if (itemCount > 0) {
			w1 += 50 * LearnedSkillSearch(SKILL_ID_HEAT_BARREL) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルクルシフォームスーツ」の、「十文字斬り」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ZYUMONZIGIRI) {
		itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT);
		if (itemCount > 0) {
			w1 += 15 * Math.floor(LearnedSkillSearch(SKILL_ID_ZYUMONZIGIRI) / 5) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースクルシフォームスーツ」の、「十文字斬り」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ZYUMONZIGIRI) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT);
		if (itemCount > 0) {
			w1 += 15 * Math.floor(LearnedSkillSearch(SKILL_ID_ZYUMONZIGIRI) / 2) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「グロトネリーア」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA);
		if (itemCount > 0) {
			w1 += 50 * LearnedSkillSearch(SKILL_ID_MAELSTORM) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「グロトネリーア」の、「フェイントボム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FAINT_BOMB) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA);
		if (itemCount > 0) {
			w1 += 15 * LearnedSkillSearch(SKILL_ID_MAELSTORM) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「山岳ヘルメット」の、「パワースイング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		if (TimeItemNumSearch(TIME_ITEM_ID_SANGAKU_HELMET)) {
			w1 += 1 * SU_VIT;
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルアーティススーツ」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ARTIS_SUIT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_ONO_SHUREN) >= 10) {
				w1 += 2 * Math.floor(n_A_BaseLV / 3) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「グレースアーティススーツ」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ARTIS_SUIT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_ONO_SHUREN) >= 10) {
				w1 += 2 * n_A_BaseLV * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルコンフィデンシャルメイル」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DEATH_BOUND) >= 10) {
				w1 += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「グレースコンフィデンシャルメイル」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DEATH_BOUND) >= 10) {
				w1 += 1 * n_A_BaseLV * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「アヴァレーツォ」の、「カウンタースラッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COUNTER_SLASH) {
		itemCount = EquipNumSearch(ITEM_ID_AVARECO);
		if (itemCount > 0) {
			w1 += 6 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「アヴァレーツォ」の、「クロスインパクト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CROSS_IMPACT) {
		itemCount = EquipNumSearch(ITEM_ID_AVARECO);
		if (itemCount > 0) {
			w1 += 30 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「パラケルススコート」の、「カートキャノン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_COAT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) >= 5) {
				w1 += 2 * n_A_BaseLV * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パラケルススコート」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_COAT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) >= 5) {
				w1 += 1 * n_A_BaseLV * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ドラゴニックオーラ」の「ウォータードラゴンブレス」「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH || n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		// 0 = 未習得, 1 = 未使用, 2 = Lv1使用, ... なので - 1 が必要
		w1 += 15 * Math.max(0, (UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE) - 1));
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンメイル」「ツインヘッド・ドラゴンブーツ」の、「ウォータードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
		}
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンメイル」「ツインヘッド・ドラゴンブーツ」の、「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　巨蟹宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_MECHANIC)) {
				w1 += 10 * n_A_SHOULDER_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　金牛宮のダイアデム」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 5 * n_A_HEAD_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　金牛宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 5 * n_A_SHOULDER_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　金牛宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 15 * n_A_SHOES_DEF_PLUS;
			}
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 10 * n_A_SHOES_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　天秤宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 5 * n_A_SHOES_DEF_PLUS;
			}
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 5 * n_A_SHOES_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　磨羯宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				w1 += 15 * n_A_SHOULDER_DEF_PLUS;
			}
		}
	}


	//----------------------------------------------------------------
	// 「エンドオブザワールド」の、「カウンタースラッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COUNTER_SLASH) {
		itemCount = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD);
		if (itemCount > 0) {
			w1 += 6 * LearnedSkillSearch(SKILL_ID_ROLLING_CUTTER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エンドオブザワールド」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		itemCount = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD);
		if (itemCount > 0) {
			w1 += 100 * LearnedSkillSearch(SKILL_ID_ROLLING_CUTTER) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「シンフルオパールリング」の、「温もり」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_NUKUMORI) || (n_A_ActiveSkill == SKILL_ID_NUKUMORI_KABE)) {
		itemCount = EquipNumSearch(ITEM_ID_SINFUL_OPAL_RING);
		if (itemCount > 0) {
			w1 += 100 * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「光輝」の、「雷光弾」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RAIKODAN) {
		itemCount = EquipNumSearchMIG(ITEM_ID_KOKI);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENDENPO) >= 5) {
				w1 += 2 * n_A_BaseLV * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「プラチナムアビトレイター」の、「キャノンスピア」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CANNON_SPEAR) {
		itemCount = EquipNumSearchMIG(ITEM_ID_PLATINUM_ARBITRATOR);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) >= 5) {
				w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「プラチナムアビトレイター」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		itemCount = EquipNumSearchMIG(ITEM_ID_PLATINUM_ARBITRATOR);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) >= 5) {
				w1 += 2 * Math.floor(n_A_BaseLV / 2) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ゾディアック　特選ドラムケープセット」の、「アニマル系スキル」強化
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_PIKKI_TSUKI)
			|| (n_A_ActiveSkill == SKILL_ID_TAROUNO_KIZU)
			|| (n_A_ActiveSkill == SKILL_ID_CARROT_BEAT)
			|| (n_A_ActiveSkill == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE)) > 0) {
			w1 += 5 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「猪突猛進」の、「アニマル系スキル」強化
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_PIKKI_TSUKI)
			|| (n_A_ActiveSkill == SKILL_ID_TAROUNO_KIZU)
			|| (n_A_ActiveSkill == SKILL_ID_CARROT_BEAT)
			|| (n_A_ActiveSkill == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if (TimeItemNumSearch(TIME_ITEM_ID_CHOTOTSU_MOUSHIN) > 0) {
			w1 += Math.min(100, charaData[CHARA_DATA_INDEX_MAXHP] / 1000);
		}
	}


	//★★★★★★★★★★★★★★★★★★★
	//★★★★ roro 側にも反映のこと ★★★★
	//★★★★★★★★★★★★★★★★★★★


	//----------------------------------------------------------------
	// 「ヘビィメタリンカード」の、「カートレボリューション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_REVOLUTION) {
		w1 += 50 * CardNumSearch(549);
	}


	//----------------------------------------------------------------
	// 「両手槍装備」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==SKILL_ID_HOLY_CROSS && n_A_WeaponType == 5) {
		w1 += 100;
	}


	//----------------------------------------------------------------
	// 「ダンスウィズウォーグ」の、「ウォーグ系スキル」強化
	//----------------------------------------------------------------
	if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG] > 0) {
		if ([SKILL_ID_WUG_BITE, SKILL_ID_WUG_STRIKE, SKILL_ID_WUG_DASH].includes(n_A_ActiveSkill)) {
			// 仕様変更前の「ミンストレルとワンダラーの人数による効果の変化」を常に最大値 7 が出るものと仮定
			// if (n_A_PassSkill3[41] >= 7) w1 += (10 * n_A_PassSkill3[40]) * 7;
			w1 += 10 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG] * 7;
		}
	}

	//----------------------------------------------------------------
	// 「幻術-分身-」の、「体術忍法」強化
	//----------------------------------------------------------------
	switch (n_A_ActiveSkill) {
	case SKILL_ID_BAKURETSU_KUNAI:
	case SKILL_ID_HAPPO_KUNAI:
	case SKILL_ID_ZYUMONZIGIRI:
	case SKILL_ID_FUMASHURIKEN_RANKA:
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_BUNSHIN] > 0) {
			w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「太陽の光」の、「太陽爆発」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TAIYO_BAKUHATSU) {
		if (UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				w1 += 100 + 5 * UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI);
				break;

			default:
				w1 += 25 + 5 * UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI);
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「月の光」の、「満月脚」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MANGETSU_KYAKU) {
		if (UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				w1 += 100 + 5 * UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI);
				break;

			default:
				w1 += 25 + 5 * UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI);
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「星の光」の、「流星落下」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RYUSE_RAKKA) {
		if (UsedSkillSearch(SKILL_ID_HOSHINO_HIKARI) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				w1 += 100 + 5 * UsedSkillSearch(SKILL_ID_HOSHINO_HIKARI);
				break;

			default:
				w1 += 25 + 5 * UsedSkillSearch(SKILL_ID_HOSHINO_HIKARI);
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「ミスティックシンフォニー」の、「ロゼブロッサム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ROSE_BLOSSOM) {
		if (UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY) > 0) {
			w1 += 50;
		}
	}

	//----------------------------------------------------------------
	// 「ミスティックシンフォニー」の、「リズムシューティング」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RHYTHM_SHOOTING) {
		if (UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY) > 0) {
			w1 += 50;
		}
	}


	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、「○○スキルで攻撃時ダメージ上昇」強化
	//----------------------------------------------------------------
	const confBaseLvBy = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY);
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP);
	if (n_A_ActiveSkill != 0) {
		if (confval != 0) {
			if (confBaseLvBy > 0) {
				w1 += confval * Math.floor(n_A_BaseLV / confBaseLvBy);
			}
			else {
				w1 += confval;
			}
		}
	}


	//----------------------------------------------------------------
	// 戦闘計算情報に保持されているダメージ増幅の適用
	//----------------------------------------------------------------
	w1 += battleCalcInfo.dmgAmpRate;


	// 装備自体の当該スキル強化値、カード自体の当該スキル強化値を適用する
	w1 += GetEquippedTotalSPEquip(5000 + n_A_ActiveSkill) + GetEquippedTotalSPCardAndElse(5000 + n_A_ActiveSkill)


//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等のスキル補正　ここまで　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	return w1;
}

