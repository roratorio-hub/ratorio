/**
 * スキルディレイ軽減率・変動詠唱時間の割合軽減率を取得する。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_MONK,
    JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_PRIEST, JOB_SERIES_ID_SWORDMAN
} from "../data/mig.job.h.js";
import { g_confDataNizi, g_confDataSanzi, g_objCharaConfCustomStatus } from "../runtime/global.js";
import { CAST_PARAM_BORDER } from "../battle/head.js";
import { GetTotalPureBasicStatus } from "../chara/hmjob.js";
import { n_A_BaseLV, n_tok, set_delayDownForDisp } from "../runtime/ro4-state.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import {
    CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_ID_ENCHANT_SOUGYOKYU,
    CARD_ID_ENKONNO_KHALITZBURG, CARD_ID_GOKU, CARD_ID_KATRINN, CARD_ID_LOVA_BAHAMUT, CARD_ID_LOVA_SHINKA_BAHAMUT,
    CARD_ID_SCORPIO, CARD_ID_SERPENTARIUS, CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_INISHIENO_WOOTANG_GUARD,
    CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_INISHIENO_WOOTANG_GUARD, CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_SHOES,
    CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_MANT, CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_CROWN,
    CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_SHOES, CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_CROWN,
    CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_MANT, CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_SHOES,
    CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_MANT, CARD_SET_ID_JOBSET_MAGICIAN, CARD_SET_ID_JOBSET_SAGE
} from "../equip/card.dat.js";
import { CardNumSearch, CostumeNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "../runtime/common.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from "../const/EnumEquipRegionId.js";
import { ITEM_SP_SKILL_CAST_TIME, ITEM_SP_SKILL_DELAY_DOWN } from "../const/EnumItemSpId.js";
import {
    JOB_ID_GILOTINCROSS, JOB_ID_MECHANIC, JOB_ID_ROYALGUARD, JOB_ID_RUNEKNIGHT, JOB_ID_SORCERER, JOB_ID_SOUL_REAPER,
    JOB_ID_SUMMONER, JOB_ID_WARLOCK
} from "../const/EnumJobId.js";
import { COSTUME_ID_BEGINNER_BO } from "../equip/costume.dat.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI, ITEM_ID_AMANOZYAKUNO_KIMEN, ITEM_ID_ANEMOS_SHIELD, ITEM_ID_ANULUS_IRA,
    ITEM_ID_AORINGOBO, ITEM_ID_AZI_DAHAKANO_KAWA, ITEM_ID_BALLOON_HAT, ITEM_ID_BOINO_MUFFLER, ITEM_ID_CARDYUINO_MIMI,
    ITEM_ID_CHIKAKU_ZOFUKU_RING, ITEM_ID_DAKITSUKI_SYAMNEKO, ITEM_ID_DARK_RING, ITEM_ID_DATENSHISAINO_ANKOUGAITO,
    ITEM_ID_FAFNIR_HELM, ITEM_ID_FAFNIR_SCALE, ITEM_ID_FURUBITA_BONECIRCRET, ITEM_ID_FUSHICHONO_KANMURI,
    ITEM_ID_FUSHICHONO_RING, ITEM_ID_GAIA_SHIELD, ITEM_ID_GEFFENIA_KORINO_MADOGU, ITEM_ID_GEFFEN_MAGIC_ROBE,
    ITEM_ID_GENTLEMAN_STUFF_CASTTIME_REDCTION, ITEM_ID_GENZYUNO_MIMI, ITEM_ID_GLORIOUS_ARK_WAND,
    ITEM_ID_GLORIOUS_MOKUSHIROKU, ITEM_ID_GRACE_CULTIVATION_COAT, ITEM_ID_GRACE_PSYCHIC_ROBE,
    ITEM_ID_GUARDIAN_OF_SOUL, ITEM_ID_GWIBERNO_KAWA, ITEM_ID_HANGYAKUNO_KAICHU_DOKEI, ITEM_ID_HANGYAKUSHANO_SCARF,
    ITEM_ID_HEAVENLY_ORDER, ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU, ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI,
    ITEM_ID_HYPPATSUHYAKUCHUNO_OMAMORI, ITEM_ID_IKUSAOTOMENO_HANEMIMI, ITEM_ID_ILLUSION_BARISTA,
    ITEM_ID_ILLUSION_FUMASHURIKEN_FUCHO, ITEM_ID_IMPERIAL_GLORY, ITEM_ID_IMPERIAL_PSYCHIC_ROBE, ITEM_ID_JAGUAR_NOTE,
    ITEM_ID_JEJECAP, ITEM_ID_KAIRYOGATA_POWERED_SUIT, ITEM_ID_KAIRYUNO_YOROI, ITEM_ID_KAMIKURAINO_RYUSO,
    ITEM_ID_KENSENO_OKAN, ITEM_ID_KODAIRYUNO_HOKAN, ITEM_ID_KOKI, ITEM_ID_KOKYU_DORAM_CAPE,
    ITEM_ID_KOKYU_DORAM_SHOES, ITEM_ID_KOKYU_DORAM_SUITS, ITEM_ID_KOREIZYUTSUSHINO_GAITO, ITEM_ID_KYOZYUNO_MINIGLASS,
    ITEM_ID_LAFINE_SHIELD_CASTTIME_REDUCTION, ITEM_ID_LINDWURMNO_KAWA, ITEM_ID_LOUD_PARK, ITEM_ID_MAGIC_COMPRESSION,
    ITEM_ID_MAJO_NO_BOUSHI, ITEM_ID_MANEKI_MOCHIHANA_CASTTIME_REDCTION, ITEM_ID_MARYOKUNO_KUSANO_NECKLACE,
    ITEM_ID_MARYOKUSEKI_NO_BOUSHI, ITEM_ID_MAZYUNO_BOOTS, ITEM_ID_MILITARY_GLOVE, ITEM_ID_MOENTO_HAKUMANO_YUBIWA,
    ITEM_ID_MYSTERY_WING, ITEM_ID_NAGAI_KAIFUKUNO_NEKOZYARASHI, ITEM_ID_NEKOZYARASHINO_MOKEI,
    ITEM_ID_NIZIIRONO_SCARF, ITEM_ID_OKINA_NEKOZYARASHINO_MOKEI, ITEM_ID_OSHABERI_OUMU,
    ITEM_ID_OSUWARI_KYOKO_SHIFUKU, ITEM_ID_PIKAPIKA_NYANNYAN_CROWN, ITEM_ID_POWERED_CHIP, ITEM_ID_POWERED_INCOME,
    ITEM_ID_POWERED_WING, ITEM_ID_PRETTY_URIBO_SHOES, ITEM_ID_RING_OF_CERYNEIA, ITEM_ID_RING_OF_PAZUZU,
    ITEM_ID_RING_OF_VENUS, ITEM_ID_SANGAKU_HELMET, ITEM_ID_SCALL_RING, ITEM_ID_SEIGINO_KANMURI,
    ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, ITEM_ID_SEISHIN_KAKUCHO_RING, ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI,
    ITEM_ID_SEREONO_HOKAN, ITEM_ID_SHIELD_RING, ITEM_ID_SHIKKOSHANO_MANT, ITEM_ID_SHINPANNO_TENBIN,
    ITEM_ID_SHINSHI_FUKU, ITEM_ID_SHITENSHINO_HANAKANMURI, ITEM_ID_SHUKUSEINO_KUTSU, ITEM_ID_SNIPING_SHOES,
    ITEM_ID_STUFF_OF_PIERCING_CASTTIME_REDUCTION, ITEM_ID_SUHAINO_YUBIWA, ITEM_ID_TEGRYONG_S2,
    ITEM_ID_TOKUSEN_DORAM_CAPE, ITEM_ID_TOKUSEN_DORAM_SHOES, ITEM_ID_TOKUSEN_DORAM_SUITS,
    ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, ITEM_ID_TONBOGA_TOMATTA_MYOUNARU_NEKOZYARASHI,
    ITEM_ID_TONBOGA_TOMATTA_NEKOZYARASHI, ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI,
    ITEM_ID_TSUIGEKISHANO_RING, ITEM_ID_TWIN_HEAD_DRAGON_MAIL, ITEM_ID_VALKYRIE_HAMMER, ITEM_ID_WOLF_OFFICER_HAT,
    ITEM_ID_YOMANO_SASAYAKI, ITEM_ID_YOZINBONO_SUITS, ITEM_ID_YUSHANO_MAGIC_COAT, ITEM_ID_YUSHANO_NEPENTES_BOOTS,
    ITEM_ID_ZYUNREISHANO_KUTSU, ITEM_SET_ID_APPLAUSE_SANDAL_CROWN_CASTTIME_REDUCTION,
    ITEM_SET_ID_APPLAUSE_SANDAL_TIARA_CASTTIME_REDUCTION, ITEM_SET_ID_BOTONO_SCARF_GLASS,
    ITEM_SET_ID_BOTONO_SCARF_SUNGLASS, ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO,
    ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_SARANO_ROBE, ITEM_SET_ID_HOROW_SHOES_FUINSARETA_VERSEVV_CARD,
    ITEM_SET_ID_HOROW_SHOES_VERSEVV_CARD, ITEM_SET_ID_ILUSION_WING_1_SUIT_1, ITEM_SET_ID_ILUSION_WING_2_SUIT_2,
    ITEM_SET_ID_KAKUSE_HOROW_SHOES_FUINSARETA_VERSEVV_CARD, ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD,
    ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD_FUINSARETA_VERSEVV_CARD, ITEM_SET_ID_KOKUO_SCHMIDTNO_SEIFUKU_MANT,
    ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO, ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_KORE_ZYUTSUSHINO_GAITO,
    ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND, ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI,
    ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS, ITEM_SET_ID_RUNE_BOOTS_RUNE_STONE,
    ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF, ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI,
    ITEM_SET_ID_SKULL_CAP_AND_WAND, ITEM_SET_ID_SPIRITUAL_RING_AND_STUFF, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET,
    ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT,
    ITEM_SET_ID_YSF01_PLATE_FULLSET
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_GVG, MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_BODY_DEF_PLUS, n_A_DEX, n_A_HEAD_DEF_PLUS, n_A_INT, n_A_JOB,
    n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus,
    n_A_card, set_n_CastCutForDisp
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ARMS_CANNON, SKILL_ID_AURA_BLADE, SKILL_ID_AXE_BOOMERANG, SKILL_ID_CAMOUFLAGE, SKILL_ID_CHATTERING,
    SKILL_ID_CLOUD_KILL, SKILL_ID_CRAZY_WEED, SKILL_ID_CROSS_IMPACT, SKILL_ID_DRAGON_TRAINING, SKILL_ID_DRAIN_LIFE,
    SKILL_ID_EARTH_DRIVE, SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_FATAL_MENUS, SKILL_ID_FAW_SILVER_SNIPER,
    SKILL_ID_FIRE_RAIN, SKILL_ID_HESPERUS_SLIT, SKILL_ID_HOWLING_MINE, SKILL_ID_HOWLING_OF_MANDRAGORA,
    SKILL_ID_INSPIRATION, SKILL_ID_INUHAKKA_METEOR, SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_IZAYOI,
    SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_MATATABI_LANCE, SKILL_ID_MELANCHOLY,
    SKILL_ID_MEMORIZE, SKILL_ID_METEOR_ASSALT, SKILL_ID_MURENO_CHIKARA, SKILL_ID_MYAUMYAU, SKILL_ID_NUTRAL_BARRIER,
    SKILL_ID_NYAN_GRASS, SKILL_ID_OFFERTORIUM, SKILL_ID_ONO_SHUREN, SKILL_ID_ONO_SHUREN_MECHANIC, SKILL_ID_ORATIO,
    SKILL_ID_PILE_BUNKER, SKILL_ID_PLATINUM_ALTER, SKILL_ID_PRAEFATIO, SKILL_ID_PSYCHIC_WAVE,
    SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SOUL_BREAKER, SKILL_ID_SOUL_ENERGY_KENKYU,
    SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TENKETSU_HAN, SKILL_ID_UNLIMIT, SKILL_ID_VACUUM_EXTREME,
    SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WEAPON_BLOCKING, SKILL_ID_WUG_RIDER, SKILL_ID_YARI_SHUREN,
    SKILL_ID_YASURAGINO_KOMORIUTA
} from "../skill/skill.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";

// foot.js 専有のモジュールレベル変数（各関数内で書いてから読む。write-before-read 確認済み）
let itemCountRight = 0;
let itemCountLeft = 0;

/**
 * 公式サイトで「スキルディレイ - ◯%」と表記されるディレイの減少効果を適用した
 * 最終的なディレイ減少率を取得する
 * @returns {Number}
 */
export function getDelayTimeReductionRate() {
	var sklLv = 0, skllv = 0, itemCount = 0, itemCountAccessory1 = 0, bufLv = 0, cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	let vartmp = 0;

    let delay_time_reduction = 0;
    n_tok[ITEM_SP_SKILL_DELAY_DOWN] += GetRndOptTotalValue(ITEM_SP_SKILL_DELAY_DOWN, null, false);
    delay_time_reduction += n_tok[ITEM_SP_SKILL_DELAY_DOWN];

    if (n_A_Weapon_ATKplus >= 9 && (EquipNumSearch(934) || EquipNumSearch(ITEM_ID_TEGRYONG_S2))) {
        delay_time_reduction += 20;
    }
    if (EquipNumSearch(1036) && n_A_HEAD_DEF_PLUS >= 6) {
        delay_time_reduction += n_A_HEAD_DEF_PLUS - 5;
    }
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1084)) {
        delay_time_reduction += 5;
    }
    if (EquipNumSearch(1085)) {
        if (n_A_Weapon_ATKplus >= 5) {
            delay_time_reduction += 5;
        }
        if (n_A_Weapon_ATKplus >= 7) {
            delay_time_reduction += 5;
        }
    }
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1095)) {
        delay_time_reduction += 5;
    }
    if (EquipNumSearch(936)) {
        delay_time_reduction += Math.floor(n_A_Weapon_ATKplus * 1.5);
    }
    if (n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1279)) {
        delay_time_reduction += (n_A_HEAD_DEF_PLUS - 4);
    }
    if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1459)) {
        delay_time_reduction += 4;
        if (n_A_HEAD_DEF_PLUS >= 9) {
            delay_time_reduction += 5;
        }
    }
    if (SU_INT >= 100 && EquipNumSearch(1528)) {
        let wx = EquipNumSearch(1528);
        delay_time_reduction += 1 * wx;
        if (SU_INT >= 120) {
            delay_time_reduction += 2 * wx;
        }
    }
    if (EquipNumSearch(1629)) {
        if (n_A_Weapon_ATKplus >= 10) {
            delay_time_reduction += 10;
        }
    }
    if (EquipNumSearch(ITEM_ID_KENSENO_OKAN) > 0) {
        if (LearnedSkillSearch(SKILL_ID_YARI_SHUREN) == 10) {
            delay_time_reduction += 10;
        }
    }
    if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1897)) {
        delay_time_reduction += 5;
        if (n_A_HEAD_DEF_PLUS >= 9) {
            delay_time_reduction += 3;
        }
    }
    if (n_A_SHIELD_DEF_PLUS >= 1 && EquipNumSearch(1990)) {
        delay_time_reduction += n_A_SHIELD_DEF_PLUS * 2;
    }
    if (n_A_SHIELD_DEF_PLUS >= 7 && TimeItemNumSearch(66)) {
        delay_time_reduction += (n_A_SHIELD_DEF_PLUS - 6) * 5;
    }
    if (n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(2345)) {
        delay_time_reduction += 2;
    }
    if (EquipNumSearch(2346)) {
        delay_time_reduction += n_A_Weapon_ATKplus;
    }
    if (CardNumSearch(823)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            delay_time_reduction += 1 * CardNumSearch(823);
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            delay_time_reduction += 1 * CardNumSearch(823);
        }
    }
    if (EquipNumSearch(2440)) {
        delay_time_reduction += 2 * n_A_SHOES_DEF_PLUS;
    }
    if (n_A_BaseLV >= 130 && EquipNumSearch(2465)) {
        delay_time_reduction += 10;
    }
    if (EquipNumSearch(2539) && UsedSkillSearch(SKILL_ID_AURA_BLADE)) {
        delay_time_reduction += 70;
    }
    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(2568)) {
        delay_time_reduction += 10 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
    }
    //----------------------------------------------------------------
    // 「古びたボーンサークレット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_FURUBITA_BONECIRCRET)) {
        delay_time_reduction += n_A_HEAD_DEF_PLUS;
    }
    //----------------------------------------------------------------
    // 「執行者のマント」の、＋７以上精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            delay_time_reduction += 3;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            delay_time_reduction += 3;
        }
    }
    //----------------------------------------------------------------
    // 「魔呪のブーツ」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAZYUNO_BOOTS)) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            delay_time_reduction += 10;
        }
    }
    //----------------------------------------------------------------
    // 「[LOVA] バハムートカード」の、＋７以上精錬による強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_LOVA_BAHAMUT) > 0) {
        if (n_A_Weapon_ATKplus >= 7) {
            delay_time_reduction += 1 * CardNumSearch(CARD_ID_LOVA_BAHAMUT);
        }
    }
    //----------------------------------------------------------------
    // 「[LOVA] 真化バハムートカード」の、＋７以上精錬による強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_LOVA_SHINKA_BAHAMUT) > 0) {
        if (n_A_Weapon_ATKplus >= 7) {
            delay_time_reduction += 3 * CardNumSearch(CARD_ID_LOVA_SHINKA_BAHAMUT);
        }
    }
    //----------------------------------------------------------------
    // 「反逆者のスカーフ」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
        delay_time_reduction += 2 * LearnedSkillSearch(SKILL_ID_FIRE_RAIN) * itemCount;
    }
    //----------------------------------------------------------------
    // 「お座り教皇（私服）」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_OSUWARI_KYOKO_SHIFUKU)) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            delay_time_reduction += 10 * itemCount;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「グウィバーの皮」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GWIBERNO_KAWA)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            delay_time_reduction += 1 * ROUNDDOWN((SU_INT + SU_DEX) / 20) * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「Y.S.F.0.1.セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
            delay_time_reduction += 20 * itemCount;
        }
        if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「天邪鬼の鬼面」の、素ＩＮＴよる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
        delay_time_reduction += 1 * ROUNDDOWN(SU_INT / 18) * itemCount;
    }
    //----------------------------------------------------------------
    // 「用心棒のスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            delay_time_reduction += 5 * itemCount;
        }
        if (n_A_BODY_DEF_PLUS >= 9) {
            delay_time_reduction += 5 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「神喰らいの龍槍」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAMIKURAINO_RYUSO)) > 0) {
        delay_time_reduction += 1 * n_A_Weapon_ATKplus * itemCount;
    }
    //----------------------------------------------------------------
    // 「猛炎と白魔の指輪」の、効果
    //----------------------------------------------------------------
    itemCountAccessory1 = EquipNumSearch(ITEM_ID_MOENTO_HAKUMANO_YUBIWA, EQUIP_REGION_ID_ACCESSORY_1);
    if (itemCountAccessory1 > 0) {
        delay_time_reduction += 15 * itemCountAccessory1;
    }
    //----------------------------------------------------------------
    // 「巡礼者の靴」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
        if (sklLv = LearnedSkillSearch(SKILL_ID_PRAEFATIO)) {
            delay_time_reduction += 6 * sklLv * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「精巧な猫じゃらしの模型」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            delay_time_reduction += 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            delay_time_reduction += 10 * itemCountLeft;
        }
    }
    //----------------------------------------------------------------
    // 「豊富な回復の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            delay_time_reduction += 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            delay_time_reduction += 10 * itemCountLeft;
        }
    }
    //----------------------------------------------------------------
    // 「トンボがとまった魔力の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            delay_time_reduction += 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            delay_time_reduction += 10 * itemCountLeft;
        }
    }
    //----------------------------------------------------------------
    // 「抱きつきシャムネコ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_DAKITSUKI_SYAMNEKO)) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 8) {
            delay_time_reduction += 100;
        }
    }
    //----------------------------------------------------------------
    // 「青リンゴ帽」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AORINGOBO)) > 0) {
        delay_time_reduction += 2 * n_A_HEAD_DEF_PLUS * itemCount;
    }
    //----------------------------------------------------------------
    // 「高級ドラムスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 8) {
            delay_time_reduction += 5 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「特選ドラムスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 8) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「パワードチップ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_CHIP)) > 0) {
        if ((sklLv = LearnedSkillSearch(SKILL_ID_ARMS_CANNON)) >= 3) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「虹色のスカーフ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「エンチャント　名誉のニーヴ(熟練)」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_ARMS_LEFT_ANY);
    cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_HEAD_TOP_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_SHIELD_ANY);
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_BODY_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN, CARD_REGION_ID_SHOES_ANY);
    if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield +
        cardCountBody + cardCountShoulder + cardCountShoes > 0) {
        // 右手武器へのエンチャント
        let vartmp = 0;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
        if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountRight
        // 左手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
        if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountLeft
        // 頭防具へのエンチャント
        vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountHeadTop
        // 盾防具へのエンチャント
        vartmp = 0;
        if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountShield
        // 体防具へのエンチャント
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountBody
        // 肩防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountShoulder
        // 靴防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 5;
        delay_time_reduction += vartmp * cardCountShoes
        // アクセサリへのエンチャント
        // 精錬できないので処理不要
    }
    //----------------------------------------------------------------
    // 「獄エンチャント」の、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_GOKU)) {
        // 職業限定の効果
        if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
            delay_time_reduction += 90;
        }
    }
    //----------------------------------------------------------------
    // 「スコーピオ」の、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_SCORPIO, CARD_REGION_ID_HEAD_TOP)) {
        // 職業限定の効果
        if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
            delay_time_reduction += 1 * n_A_HEAD_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「イリュージョンバリスタ」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_BARISTA)) > 0) {
        if (n_A_BaseLV >= 170) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「フローズヴィトニルの鎖　ヴァナルガンドの兜セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO)) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 6) {
            delay_time_reduction += 5 * itemCount;
        }
        if (n_A_HEAD_DEF_PLUS >= 8) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「イリュージョン風魔手裏剣・風鳥」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_FUMASHURIKEN_FUCHO)) > 0) {
        if (n_A_BaseLV >= 170) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ファフニールスケイル」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_SCALE)) > 0) {
        delay_time_reduction += 2 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
    }
    //----------------------------------------------------------------
    // 「ヘヴンリーオーダー」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
        delay_time_reduction += 2 * Math.floor(SU_AGI / 18) * itemCount;
    }
    //----------------------------------------------------------------
    // 「ジェジェキャップ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_JEJECAP)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HOWLING_OF_MANDRAGORA) >= 5) {
            delay_time_reduction += 25 * itemCount;
        }
        delay_time_reduction += 6 * LearnedSkillSearch(SKILL_ID_CRAZY_WEED) * itemCount;
    }
    //----------------------------------------------------------------
    // 「シールドリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHIELD_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_EARTH_DRIVE) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「スナイピングシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_SHOES)) > 0) {
        delay_time_reduction += 8 * LearnedSkillSearch(SKILL_ID_UNLIMIT) * itemCount;
    }
    //----------------------------------------------------------------
    // 「傀儡の腕輪　ダークハンドセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND)) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 6) {
            delay_time_reduction += 5 * itemCount;
        }
        if (n_A_HEAD_DEF_PLUS >= 8) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ぷりちーウリボウシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_PRETTY_URIBO_SHOES)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) >= 5) {
            delay_time_reduction += 50 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ゲフェニア氷の魔道具」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ジャガーノート」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
        delay_time_reduction += 8 * LearnedSkillSearch(SKILL_ID_HOWLING_MINE) * itemCount;
    }
    //----------------------------------------------------------------
    // 「イルシオンウィングII　スーツIIセット」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILUSION_WING_2_SUIT_2)) > 0) {
        if (n_A_BaseLV >= 170) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ガーディアンオブソウル」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
        delay_time_reduction += 1 * Math.floor((SU_STR + SU_LUK) / 18) * itemCount;
    }
    //----------------------------------------------------------------
    // 「ダークリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_DARK_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「知覚増幅リング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_CHIKAKU_ZOFUKU_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「リングオブヴィーナス」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_2)) > 0) {
        if (SU_AGI >= 125) {
            delay_time_reduction += 25 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「暴威のマフラー」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
        if ((skllv = LearnedSkillSearch(SKILL_ID_MELANCHOLY)) >= 5) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「精神拡張リング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SEISHIN_KAKUCHO_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ぴかぴかニャンニャンクラウン」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_PIKAPIKA_NYANNYAN_CROWN)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_NYAN_GRASS) >= 5) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「審判の天秤」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHINPANNO_TENBIN)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HESPERUS_SLIT) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「国王シュミッツセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOKUO_SCHMIDTNO_SEIFUKU_MANT)) > 0) {
        if ((n_A_BODY_DEF_PLUS >= 6) && (n_A_SHOULDER_DEF_PLUS >= 6)) {
            delay_time_reduction += 20 * itemCount;
        }
        if ((n_A_BODY_DEF_PLUS >= 8) && (n_A_SHOULDER_DEF_PLUS >= 8)) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「追撃者のリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FATAL_MENUS) >= 10) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「リングオブパズズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_PAZUZU)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「戦乙女の羽耳」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_IKUSAOTOMENO_HANEMIMI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_PRAEFATIO) >= 10) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「スカルリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SCALL_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_SOUL_ENERGY_KENKYU) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「インペリアルグローリー」の、素ＡＧＩと素ＶＩＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GLORY)) > 0) {
        delay_time_reduction += 3 * Math.floor((SU_AGI + SU_VIT) / 50) * itemCount;
    }
    //----------------------------------------------------------------
    // 「パワードウィング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ARMS_CANNON) >= 5) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「アーヌルス イラ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_ANULUS_IRA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) >= 5) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「山岳ヘルメット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SANGAKU_HELMET)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FAW_SILVER_SNIPER) >= 5) {
            delay_time_reduction += 10 * itemCount;
        }
        if (LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) >= 5) {
            delay_time_reduction += 10 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「正義の冠」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SEIGINO_KANMURI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「教授のミニグラス」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_KYOZYUNO_MINIGLASS)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「リングオブケリュネイア」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_RING_OF_CERYNEIA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_WUG_RIDER) >= 3) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「パワードインカム」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_INCOME)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER) >= 3) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ファフニールヘルム」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) >= 5) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「赤い猫耳魔女帽子」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「粛清の靴」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHUKUSEINO_KUTSU)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ORATIO) >= 10) {
            delay_time_reduction += 50 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「グレースカルティベイションコート」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HOWLING_OF_MANDRAGORA) >= 5) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ウルフオフィサーハット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_WOLF_OFFICER_HAT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_WUG_RIDER) >= 3) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「厄災の魔将　古のウータンガードカードセット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_INISHIENO_WOOTANG_GUARD)) > 0) {
        delay_time_reduction += 1 * LearnedSkillSearch(SKILL_ID_SOUL_BREAKER) * cardCount;
        delay_time_reduction += 1 * LearnedSkillSearch(SKILL_ID_METEOR_ASSALT) * cardCount;
    }
    //----------------------------------------------------------------
    // 「厄災の魔将　封印された古のウータンガードカードセット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_INISHIENO_WOOTANG_GUARD)) > 0) {
        delay_time_reduction += 1 * Math.floor((LearnedSkillSearch(SKILL_ID_SOUL_BREAKER) + LearnedSkillSearch(SKILL_ID_METEOR_ASSALT)) / 3) * cardCount;
    }
    //----------------------------------------------------------------
    // 「ミリタリーグローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MILITARY_GLOVE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) >= 5) {
            delay_time_reduction += 30 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「改良型パワードスーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAIRYOGATA_POWERED_SUIT)) > 0) {
        delay_time_reduction += 10 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
    }
    //----------------------------------------------------------------
    // 「幻獣の耳」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GENZYUNO_MIMI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) >= 5) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ツインヘッド・ドラゴンメイル」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL)) > 0) {
        delay_time_reduction += 6 * LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) * itemCount;
    }
    //----------------------------------------------------------------
    // 「ゾディアック　巨蟹宮のクラウン」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_CROWN)) {
        if (IsSameJobClass(JOB_ID_MECHANIC)) {
            delay_time_reduction += 3 * n_A_HEAD_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　巨蟹宮のシューズ」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_SHOES)) {
        if (IsSameJobClass(JOB_ID_MECHANIC)) {
            delay_time_reduction += 4 * n_A_SHOES_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　天秤宮のマント」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_MANT)) {
        if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
            delay_time_reduction += 2 * n_A_SHOULDER_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　白羊宮のシューズ」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_SHOES)) {
        if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
            delay_time_reduction += 3 * n_A_SHOES_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　プロキオンクラウン」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_CROWN)) {
        if (IsSameJobClass(JOB_ID_SOUL_REAPER)) {
            delay_time_reduction += 3 * n_A_HEAD_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　プロキオンマント」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_MANT)) {
        if (IsSameJobClass(JOB_ID_SOUL_REAPER)) {
            delay_time_reduction += 2 * n_A_SHOULDER_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　プロキオンマント」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_SHOES)) {
        if (IsSameJobClass(JOB_ID_SOUL_REAPER)) {
            delay_time_reduction += 3 * n_A_SHOES_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「ゾディアック　宝瓶宮のマント」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_MANT)) {
        if (IsSameJobClass(JOB_ID_WARLOCK)) {
            delay_time_reduction += 2 * n_A_SHOULDER_DEF_PLUS;
        }
    }
    //----------------------------------------------------------------
    // 「反逆の懐中時計」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUNO_KAICHU_DOKEI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) >= 5) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ミステリーウィング」の、素ステータスによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
        if (GetTotalPureBasicStatus() >= 400) {
            delay_time_reduction += 15 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「ラウドパーク」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_LOUD_PARK)) > 0) {
        delay_time_reduction += 6 * LearnedSkillSearch(SKILL_ID_YASURAGINO_KOMORIUTA) * itemCount;
    }
    //----------------------------------------------------------------
    // 「妖魔のささやき」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YOMANO_SASAYAKI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_WEAPON_BLOCKING) >= 5) {
            delay_time_reduction += 20 * itemCount;
        }
    }
    //----------------------------------------------------------------
    // 「マジックコンプレッション」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MAGIC_COMPRESSION)) > 0) {
        delay_time_reduction += 5 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
    }
    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    const confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_DELAY_DOWN);
    if (confval != 0) {
        delay_time_reduction += confval;
    }
	/**
	 * 「バード ブラギの詩」の効果
	 */
    if ((bufLv = g_confDataNizi[CCharaConfNizi.CONF_ID_POEMBRAGI]) > 0) {
        delay_time_reduction += 10 + 2 * bufLv;
    }
	// 拡張情報 > 詠唱/ディレイ 表示用に確保
	set_delayDownForDisp(delay_time_reduction);

    return Math.min(100, delay_time_reduction);
}

/**
 * キャラクタの基礎値に加えて
 * 公式サイトで「詠唱時間短縮 ◯%」と表記される変動詠唱時間の減少効果を適用した
 * 最終的な変動詠唱時間の割合を取得する
 * @returns {Number}
 */
export function getVariableCastTimeRate() {
	var idx, sklLv = 0, itemCount = 0, itemCountAccessory2 = 0, bufLv = 0, cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	let vartmp = 0;
    // 詠唱ステータスから残余詠唱時間の割合を計算する
	const casting_status = Math.max(0, n_A_DEX) + Math.max(0, n_A_INT) / 2;
    let cast_common = 1 - Math.sqrt(casting_status / CAST_PARAM_BORDER);
    cast_common = Math.max(0, cast_common);

    /* 詠唱時間の軽減率 */
    let reduction_rate = 100;

	//----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (idx = ITEM_SP_SKILL_CAST_TIME; idx <= ITEM_SP_SKILL_CAST_TIME; idx++) {
        n_tok[idx] -= GetRndOptTotalValue(idx, null, false);
    }
    reduction_rate += n_tok[ITEM_SP_SKILL_CAST_TIME];

    if (GetLowerJobSeriesID(n_A_JOB) == 5 && CardNumSearch(CARD_SET_ID_JOBSET_MAGICIAN)) {
        reduction_rate -= 15;
    }
    if (GetHigherJobSeriesID(n_A_JOB) == 18 && CardNumSearch(CARD_SET_ID_JOBSET_SAGE)) {
        reduction_rate -= 15;
    }
    if (EquipNumSearch(ITEM_SET_ID_SPIRITUAL_RING_AND_STUFF)) {
        reduction_rate -= n_A_Weapon_ATKplus;
    }
    if (n_A_card[CARD_REGION_ID_HEAD_TOP] === CARD_ID_KATRINN) {
        reduction_rate -= n_A_HEAD_DEF_PLUS;
    }
    if (EquipNumSearch(ITEM_ID_BALLOON_HAT)) {
        reduction_rate -= n_A_HEAD_DEF_PLUS;
    }
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(ITEM_ID_GLORIOUS_ARK_WAND)) {
        reduction_rate -= 5;
    }
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(ITEM_ID_GLORIOUS_MOKUSHIROKU)) {
        reduction_rate -= 5;
    }
    if (SU_DEX >= 120 && EquipNumSearch(ITEM_ID_MARYOKUSEKI_NO_BOUSHI)) {
        reduction_rate -= 2;
    }
    if (n_A_Weapon_ATKplus >= 10 && EquipNumSearch(ITEM_SET_ID_SKULL_CAP_AND_WAND)) {
        reduction_rate -= 10;
    }
    if (EquipNumSearch(ITEM_SET_ID_RUNE_BOOTS_RUNE_STONE)) {
        reduction_rate -= Math.floor(n_A_SHOES_DEF_PLUS / 2);
    }
    if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(ITEM_ID_MAJO_NO_BOUSHI)) {
        reduction_rate -= 5;
    }
    if (SU_DEX >= 80 && EquipNumSearch(ITEM_ID_HYPPATSUHYAKUCHUNO_OMAMORI)) {
        let wx = EquipNumSearch(ITEM_ID_HYPPATSUHYAKUCHUNO_OMAMORI);
        reduction_rate -= 1 * wx;
        if (SU_DEX >= 100) {
            reduction_rate -= 2 * wx;
        }
    }
    if (EquipNumSearch(ITEM_ID_STUFF_OF_PIERCING_CASTTIME_REDUCTION)) {
        if (n_A_Weapon_ATKplus >= 10) {
            reduction_rate -= 10;
        }
    }
    if (EquipNumSearch(ITEM_ID_KENSENO_OKAN) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ONO_SHUREN) == 10 ||
            LearnedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC) == 10) {
            reduction_rate -= 15;
        }
    }
    if (n_A_Weapon_ATKplus >= 10 && EquipNumSearch(ITEM_ID_GENTLEMAN_STUFF_CASTTIME_REDCTION)) {
        reduction_rate -= 20;
    }
    if (n_A_HEAD_DEF_PLUS >= 1 && EquipNumSearch(ITEM_ID_MANEKI_MOCHIHANA_CASTTIME_REDCTION)) {
        reduction_rate += -2 * n_A_HEAD_DEF_PLUS;
    }
    if (n_A_BODY_DEF_PLUS >= 9 && EquipNumSearch(ITEM_ID_GEFFEN_MAGIC_ROBE)) {
        reduction_rate += -5;
    }
    if (n_A_SHIELD_DEF_PLUS >= 9 && EquipNumSearch(ITEM_ID_LAFINE_SHIELD_CASTTIME_REDUCTION)) {
        if (n_A_Weapon_ATKplus >= 10) {
            reduction_rate += -10;
        }
    }
    if (n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(ITEM_ID_SHINSHI_FUKU)) {
        reduction_rate += -2;
    }
    if (EquipNumSearch(ITEM_ID_YUSHANO_MAGIC_COAT)) {
        if (n_A_BODY_DEF_PLUS % 2 === 0) {
            reduction_rate += (-1 * ROUNDDOWN(n_A_BODY_DEF_PLUS / 2));
        } else {
            reduction_rate += 20;
        }
    }
    if (EquipNumSearch(ITEM_ID_YUSHANO_NEPENTES_BOOTS)) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            reduction_rate += -5;
        }
        if (n_A_SHOES_DEF_PLUS >= 9) {
            reduction_rate += (-1 * (n_A_SHOES_DEF_PLUS - 8));
        }
    }
    if (CardNumSearch(CARD_ID_ENCHANT_SOUGYOKYU)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            reduction_rate += -1 * CardNumSearch(CARD_ID_ENCHANT_SOUGYOKYU);
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            reduction_rate += -1 * CardNumSearch(CARD_ID_ENCHANT_SOUGYOKYU);
        }
    }
    if (EquipNumSearch(ITEM_SET_ID_APPLAUSE_SANDAL_CROWN_CASTTIME_REDUCTION) || EquipNumSearch(ITEM_SET_ID_APPLAUSE_SANDAL_TIARA_CASTTIME_REDUCTION)) {
        reduction_rate += -1 * ROUNDDOWN((n_A_SHOES_DEF_PLUS + n_A_HEAD_DEF_PLUS) / 2);
    }

    //----------------------------------------------------------------
    // 「[衣装]ビギナー帽」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = CostumeNumSearch(COSTUME_ID_BEGINNER_BO)) > 0) {
        if (n_A_BaseLV >= 99) {
            reduction_rate += 10;
        } else {
            switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
                case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
                    reduction_rate += 10;
                    break;
                default:
                    reduction_rate += ROUNDDOWN(n_A_BaseLV / 10);
                    break;
            }
        }

    }
    if (EquipNumSearchMIG(ITEM_ID_CARDYUINO_MIMI)) {
        if (SU_DEX >= 108) {
            reduction_rate += -10;
        }
        if (SU_DEX >= 120) {
            reduction_rate += -5;
        }
    }

    //----------------------------------------------------------------
    // 「ヴァルキリーハンマー」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            // ノービス系
            case JOB_SERIES_ID_NOVICE:
                reduction_rate -= 1 * ROUNDDOWN(n_A_Weapon_ATKplus / 2);
                break;
                // ソードマン系
            case JOB_SERIES_ID_SWORDMAN:
                break;
                // マーチャント系
            case JOB_SERIES_ID_MERCHANT:
                reduction_rate -= 1 * ROUNDDOWN(n_A_Weapon_ATKplus / 2);
                break;
            default:
                switch (GetHigherJobSeriesID(n_A_JOB)) {
                    // プリースト系
                    case JOB_SERIES_ID_PRIEST:
                        break;
                        // モンク系
                    case JOB_SERIES_ID_MONK:
                        break;
                }
        }
    }

    //----------------------------------------------------------------
    // 「サラのローブセット」の、＋７精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_SARANO_ROBE)) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            reduction_rate -= 10;
        }
    }

    //----------------------------------------------------------------
    // 「おしゃべりオウム」の、効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_OSHABERI_OUMU)) {
        reduction_rate -= ROUNDDOWN(SU_INT / 30);
    }

    //----------------------------------------------------------------
    // 「熾天使の花冠」の、強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SHITENSHINO_HANAKANMURI)) {
        reduction_rate += 1 * ROUNDDOWN(SU_INT / 8);
        if (SU_INT >= 108) {
            reduction_rate += 4;
        }
        if (SU_INT >= 120) {
            reduction_rate += 6;
        }
    }

    //----------------------------------------------------------------
    // 「サバイバルオーブ　ロッドセット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX) ||
        EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT)) {
        if (n_A_Weapon_ATKplus >= 10) {
            if (n_A_BaseLV <= 99) {
                reduction_rate -= 3;
            } else {
                reduction_rate -= 9;
            }
        }
    }

    //----------------------------------------------------------------
    // 「サバイバルオーブ　サークレットセット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            reduction_rate -= 6;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            reduction_rate -= 6;
        }
    }

    //----------------------------------------------------------------
    // 「堕天司祭の闇光外套」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_DATENSHISAINO_ANKOUGAITO)) {
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            reduction_rate -= 5;
        }
    }

    //----------------------------------------------------------------
    // 「魔呪のブーツ」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAZYUNO_BOOTS)) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            reduction_rate -= 10;
        }
    }

    //----------------------------------------------------------------
    // 「ガイアシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_DEX >= 90) {
                reduction_rate -= 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　グラスセット」の、素ＩＮＴと素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
        reduction_rate -= 3 * ROUNDDOWN((SU_INT + SU_DEX) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　サングラスセット」の、素ＩＮＴと素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
        reduction_rate -= 3 * ROUNDDOWN((SU_INT + SU_DEX) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「リンドブルムの皮」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_LINDWURMNO_KAWA)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            reduction_rate -= 2 * ROUNDDOWN((SU_AGI + SU_VIT) / 20) * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「火雷大神靴」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU)) > 0) {
        reduction_rate -= 1 * n_A_SHOES_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「海竜の鎧」の、過剰精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAIRYUNO_YOROI)) > 0) {
        let vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 5;
        reduction_rate -= vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「アネモスシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_DEX >= 90) {
                reduction_rate -= 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「降霊術士の外套」の、過剰精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KOREIZYUTSUSHINO_GAITO)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            reduction_rate -= 5;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            reduction_rate -= 5;
        }
    }

    //----------------------------------------------------------------
    // 「怨恨のカーリッツバーグカード」の、精錬による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ENKONNO_KHALITZBURG, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
        reduction_rate -= n_A_HEAD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「巨大樹の若葉　カルデュイの耳セット」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI)) > 0) {
        if (SU_DEX >= 108) {
            reduction_rate += -3 * itemCount;
        }
        if (SU_DEX >= 120) {
            reduction_rate += -5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「天邪鬼の鬼面」の、素ＶＩＴよる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
        reduction_rate += -1 * ROUNDDOWN(SU_VIT / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ニーヴバレッタ　ニーヴ武器セット」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
        reduction_rate -= 1 * ROUNDDOWN(SU_DEX / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「スカラバハイヒール　ラフィネスタッフセット」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            reduction_rate -= 20;
        }
    }

    //----------------------------------------------------------------
    // 「熾天使の羽毛　熾天使の花冠セット」の、素ＩＮＴによる効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI)) {
        reduction_rate -= 1 * ROUNDDOWN(SU_INT / 8);
        if (SU_INT >= 108) {
            reduction_rate -= 4;
        }
        if (SU_INT >= 120) {
            reduction_rate -= 6;
        }
    }

    //----------------------------------------------------------------
    // 「古代龍の宝冠」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KODAIRYUNO_HOKAN)) > 0) {
        reduction_rate -= 1 * n_A_HEAD_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「猛炎と白魔の指輪」の、効果
    //----------------------------------------------------------------
    itemCountAccessory2 = EquipNumSearch(ITEM_ID_MOENTO_HAKUMANO_YUBIWA, EQUIP_REGION_ID_ACCESSORY_2);
    if (itemCountAccessory2 > 0) {
        reduction_rate -= 15 * itemCountAccessory2;
    }

    //----------------------------------------------------------------
    // 「不死鳥の冠」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            reduction_rate -= 5;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            reduction_rate -= 5;
        }
    }

    //----------------------------------------------------------------
    // 「猫じゃらしの模型」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「繊細な猫じゃらしの模型」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「大きな猫じゃらしの模型」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_OKINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_OKINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「精巧な猫じゃらしの模型」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「長い回復の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_NAGAI_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_NAGAI_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「豊富な回復の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「トンボがとまった猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「トンボがとまった妙なる猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MYOUNARU_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MYOUNARU_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 5 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「トンボがとまった神妙な猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_SHINMYOUNA_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「トンボがとまった魔力の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_Weapon_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountRight;
        }
        if (n_A_Weapon2_ATKplus >= 8) {
            reduction_rate -= 10 * itemCountLeft;
        }
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
        reduction_rate += -1 * ROUNDDOWN(sklLv / 5) * itemCount;
    }

    //----------------------------------------------------------------
    // 「高級ドラムケープ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_CAPE)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            reduction_rate -= 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムケープ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_CAPE)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            reduction_rate -= 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「高級ドラムシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SHOES)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            reduction_rate -= 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SHOES)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            reduction_rate -= 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「精霊王の宝冠」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SEREONO_HOKAN)) > 0) {
        reduction_rate -= 6 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
    }

    //----------------------------------------------------------------
    // 「降霊術士のドレス　降霊術士の外套セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_KORE_ZYUTSUSHINO_GAITO)) > 0) {
        reduction_rate -= 2 * n_A_SHOULDER_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「ヘヴンリーオーダー」の、素ＶＩＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
        reduction_rate -= 2 * Math.floor(SU_VIT / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「降霊術士の手鏡　外套セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO)) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            reduction_rate -= 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「エンチャント　名誉のニーヴ(集中)」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_ARMS_LEFT_ANY);
    cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_HEAD_TOP_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_SHIELD_ANY);
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_BODY_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU, CARD_REGION_ID_SHOES_ANY);
    if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield +
        cardCountBody + cardCountShoulder + cardCountShoes > 0) {
        // 右手武器へのエンチャント
        let vartmp = 0;
        if (n_A_Weapon_ATKplus >= 7) vartmp -= 5;
        if (n_A_Weapon_ATKplus >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountRight
        // 左手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon2_ATKplus >= 7) vartmp -= 5;
        if (n_A_Weapon2_ATKplus >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountLeft
        // 頭防具へのエンチャント
        vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 7) vartmp -= 5;
        if (n_A_HEAD_DEF_PLUS >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountHeadTop
        // 盾防具へのエンチャント
        vartmp = 0;
        if (n_A_SHIELD_DEF_PLUS >= 7) vartmp -= 5;
        if (n_A_SHIELD_DEF_PLUS >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountShield
        // 体防具へのエンチャント
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp -= 5;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountBody
        // 肩防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp -= 5;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountShoulder
        // 靴防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp -= 5;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp -= 5;
        reduction_rate += vartmp * cardCountShoes
        // アクセサリへのエンチャント
        // 精錬できないので処理不要
    }

    //----------------------------------------------------------------
    // 「獄エンチャント」の、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_GOKU)) {
        // 職業限定の効果
        if (IsSameJobClass(JOB_ID_SORCERER)) {
            reduction_rate -= 15;
        }
    }

    //----------------------------------------------------------------
    // 「サーペンタリウス」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_SERPENTARIUS, CARD_REGION_ID_HEAD_TOP)) > 0) {
        // 職業限定の効果
        if (IsSameJobClass(JOB_ID_SUMMONER)) {
            reduction_rate -= 1 * n_A_HEAD_DEF_PLUS * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「ホロウシューズ　ヴェルゼブブカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOROW_SHOES_VERSEVV_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            reduction_rate -= 2 * n_A_SHOES_DEF_PLUS * itemCount;
        } else {
            reduction_rate -= 7 * n_A_SHOES_DEF_PLUS * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「アジダハーカの皮」の、ステータスによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AZI_DAHAKANO_KAWA)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            reduction_rate -= 2 * Math.floor((SU_VIT + SU_LUK) / 20) * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「イルシオンウィングI　スーツⅠセット」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILUSION_WING_1_SUIT_1)) > 0) {
        if (n_A_BaseLV >= 170) {
            reduction_rate -= 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ガーディアンオブソウル」の、素ＩＮＴと素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
        reduction_rate -= 1 * Math.floor((SU_INT + SU_DEX) / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「知覚増幅リング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_CHIKAKU_ZOFUKU_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CLOUD_KILL) >= 5) {
            reduction_rate -= 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「リングオブパズズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_PAZUZU)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_DRAIN_LIFE) >= 5) {
            reduction_rate -= 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「不死鳥のリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_FUSHICHONO_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
            reduction_rate -= 30 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「崇拝の指輪」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SUHAINO_YUBIWA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_OFFERTORIUM) >= 5) {
            reduction_rate -= 30 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「インペリアルサイキックローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_PSYCHIC_ROBE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CLOUD_KILL) >= 5) {
            reduction_rate -= 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「グレースサイキックローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_PSYCHIC_ROBE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CLOUD_KILL) >= 5) {
            reduction_rate -= 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「粛清の靴」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHUKUSEINO_KUTSU)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ORATIO) >= 10) {
            reduction_rate -= 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「覚醒ホロウシューズ　ヴェルゼブブカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            reduction_rate -= 2 * n_A_SHOES_DEF_PLUS * itemCount;
        } else {
            reduction_rate -= 7 * n_A_SHOES_DEF_PLUS * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「覚醒ホロウシューズ　封印されたヴェルゼブブカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HOROW_SHOES_FUINSARETA_VERSEVV_CARD)) > 0) {
        // 重複セットは発動しない
        if (EquipNumSearch(ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD_FUINSARETA_VERSEVV_CARD) == 0) {
            if (n_A_BaseLV <= 99) {
                reduction_rate -= 2 * n_A_SHOES_DEF_PLUS * itemCount;
            } else {
                reduction_rate -= 7 * n_A_SHOES_DEF_PLUS * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「ホロウシューズ　封印されたヴェルゼブブカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOROW_SHOES_FUINSARETA_VERSEVV_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            reduction_rate -= 1 * n_A_SHOES_DEF_PLUS * itemCount;
        } else {
            reduction_rate -= 2 * n_A_SHOES_DEF_PLUS * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「光輝」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
            reduction_rate -= 15 * itemCount;
        }
    }

	/**
	 * 「バード ブラギの詩」の効果
	 */
    if ((bufLv = g_confDataNizi[CCharaConfNizi.CONF_ID_POEMBRAGI]) > 0) {
        reduction_rate -= 10 + 2 * bufLv;
    }

    if (TimeItemNumSearch(1)) {
        reduction_rate -= 50;
    }

    //----------------------------------------------------------------
    // 「ウォーロック　テレキネシスインテンス」の効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) > 0) {
        reduction_rate -= 10;
    }

    //----------------------------------------------------------------
    // 「ソウルリーパー　妖精の魂」の、効果
    //----------------------------------------------------------------
    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_YOSENO_TAMASHI]) > 0) {
        reduction_rate -= 25 + 5 * bufLv;
    }

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    const confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_CAST_DOWN);
    if (confval != 0) {
        reduction_rate += -1 * confval;
    }

    // 表示用変数に退避
    set_n_CastCutForDisp(reduction_rate);

    // ステータスによる詠唱時間軽減率に、装備・ステータスによる軽減率を適用する
    reduction_rate = Math.max(0, reduction_rate);
    cast_common *= reduction_rate / 100;

    /**
     * サフラギウムの効果
     */
    if (g_confDataNizi[CCharaConfNizi.CONF_ID_SUFFRAGIUM]) {
        cast_common *= (100 - 15 * g_confDataNizi[CCharaConfNizi.CONF_ID_SUFFRAGIUM]) / 100;
    }

    //----------------------------------------------------------------
    // 「プロフェッサー　メモライズ」の効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_MEMORIZE) > 0) {
        cast_common = cast_common / 2;
    }

    //----------------------------------------------------------------
    // 「影狼・朧　十六夜」の効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_IZAYOI) > 0) {
        cast_common = cast_common / 2;
    }

    return cast_common;
}

