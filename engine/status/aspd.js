/**
 * 攻撃速度（ASPD）の加算効果を取得する（GetAdditionalAspdPercent）。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_BARD, JOB_SERIES_ID_DANCER,
    JOB_SERIES_ID_HUNTER, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_MONK, JOB_SERIES_ID_NOVICE,
    JOB_SERIES_ID_PRIEST, JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_THIEF
} from "../data/mig.job.h.js";
import {
    g_confDataDebuff, g_confDataNizi, g_confDataSanzi, g_objCharaConfCustomStatus
} from "../runtime/global.js";
import { GetTotalPureBasicStatus } from "../chara/hmjob.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import {
    CARD_ID_CARNIVARAUS, CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_ID_GIGANTES, CARD_ID_GOKU,
    CARD_ID_INISHIENO_MEGLIS, CARD_ID_INISHIENO_WOOTANG_SHOOTER, CARD_ID_LIBRA, CARD_ID_MARYOKU_CHUDOKU_PLAGA,
    CARD_ID_NYAISE, CARD_ID_PLASMA_RAT, CARD_ID_ROUND_RIDER, CARD_ID_SHINKAINO_CEDORA, CARD_ID_TOP_SIDE_RIDER,
    CARD_SET_ID_CELINE_KIMI_NOBLE_CROSS, CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_MANT
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "../runtime/common.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from "../const/EnumEquipRegionId.js";
import {
    ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND, ITEM_KIND_FIST, ITEM_KIND_GATLINGGUN, ITEM_KIND_MUSICAL, ITEM_KIND_NONE,
    ITEM_KIND_STUFF, ITEM_KIND_STUFF2HAND, ITEM_KIND_WHIP
} from "../const/EnumItemKind.js";
import { ITEM_SP_ASPD_UP } from "../const/EnumItemSpId.js";
import {
    JOB_ID_ARCBISHOP, JOB_ID_LORDKNIGHT, JOB_ID_MECHANIC, JOB_ID_ROYALGUARD, JOB_ID_RUNEKNIGHT, JOB_ID_SHURA
} from "../const/EnumJobId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AKKI_RASETSUNO_YUBIWA, ITEM_ID_AKUMANO_TE, ITEM_ID_ANEMOS_SHIELD, ITEM_ID_AVENGER_BLOODYROAR,
    ITEM_ID_AZATOI_KEROKERO_KAPPA, ITEM_ID_AZI_DAHAKANO_KAWA, ITEM_ID_CHEMICAL_GLOVE, ITEM_ID_ELEMENTAL_POSSESSION,
    ITEM_ID_FAFNIR_HELM, ITEM_ID_FUMASHURIKEN_HANAFUBUKI, ITEM_ID_FURUBITA_RUNECIRCRET, ITEM_ID_FUSHICHONO_RING,
    ITEM_ID_FUWAFUWA_TANPOPO_SHOES, ITEM_ID_GAIA_SHIELD, ITEM_ID_GRACE_CONFIDENCIAL_MAIL, ITEM_ID_GRACE_TENCHI_SUIT,
    ITEM_ID_GUARDIAN_BOOSTER, ITEM_ID_GUARDIAN_OF_SOUL, ITEM_ID_HAKKEINO_FUZYU, ITEM_ID_HANGYAKUSHANO_SCARF,
    ITEM_ID_HEAVENLY_ORDER, ITEM_ID_HITSUKISHINZI, ITEM_ID_ILLUSION_MILITARY_BOOTS,
    ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL, ITEM_ID_IMPERIAL_TENCHI_SUIT, ITEM_ID_JAGUAR_NOTE, ITEM_ID_KAMIKURAINO_RYUSO,
    ITEM_ID_KIRINNO_TSUNO, ITEM_ID_KIZOKUNO_KAMEN, ITEM_ID_KOKYU_DORAM_CAPE, ITEM_ID_KOKYU_DORAM_SHOES,
    ITEM_ID_KOKYU_DORAM_SUITS, ITEM_ID_KOONO_SOZIN, ITEM_ID_MARRACONO_KAWA, ITEM_ID_MAZYUNO_BOOTS,
    ITEM_ID_METAL_PICK, ITEM_ID_MILITARY_GLOVE, ITEM_ID_MYSTERY_WING, ITEM_ID_NAMONAKI_KENNSHINO_BOOTS,
    ITEM_ID_NIZIIRONO_MUFFLER, ITEM_ID_ONRYO_KAIINO_MIMI, ITEM_ID_PARACELSUS_GLOVE, ITEM_ID_PIKAPIKA_NYANNYAN_CROWN,
    ITEM_ID_PRETTY_URIBO_SHOES, ITEM_ID_RUNE_HELM, ITEM_ID_SAVE_THE_KING, ITEM_ID_SCALL_RING,
    ITEM_ID_SEIGINO_KANMURI, ITEM_ID_SEISHIN_KAKUCHO_RING, ITEM_ID_SHIKENKAN_BOOTS,
    ITEM_ID_SHINSENNA_KUSANO_NECKLACE, ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1, ITEM_ID_SUHAINO_YUBIWA,
    ITEM_ID_TENBINKYUNO_DIADEM, ITEM_ID_TENGUNO_GETA, ITEM_ID_TOKUSEN_DORAM_CAPE, ITEM_ID_TOKUSEN_DORAM_SHOES,
    ITEM_ID_TOKUSEN_DORAM_SUITS, ITEM_ID_TRAVELER_SHOES, ITEM_ID_VALKYRIE_HAMMER, ITEM_ID_VALKYRIE_KNIFE,
    ITEM_ID_WOLF_OFFICER_HAT, ITEM_ID_YOCHIYOCHI_URIBO_SUTAI, ITEM_ID_YOICHINO_KATAKAE, ITEM_ID_YSF01_MANT,
    ITEM_ID_YUSHANO_BROACH, ITEM_ID_ZIKEIDANNO_YUMI, ITEM_ID_ZINBAORI, ITEM_ID_ZYASPER_CIRCLET, ITEM_ID_ZYASPER_RING,
    ITEM_ID_ZYUNREISHANO_KUTSU, ITEM_SET_ID_BOTONO_SCARF_GLASS, ITEM_SET_ID_BOTONO_SCARF_SUNGLASS,
    ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE, ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI,
    ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO, ITEM_SET_ID_FULL_FORCE_DOPPELGANGER_CARD,
    ITEM_SET_ID_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD, ITEM_SET_ID_GOFUSEKI_PEORTH_GREEVE,
    ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_BOOSTER, ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER,
    ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS, ITEM_SET_ID_ILLUSION_TEGRYONG_MAHITSUZINO_HOKO,
    ITEM_SET_ID_KAKUSE_FULL_FORCE_DOPPELGANGER_CARD, ITEM_SET_ID_KAKUSE_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD,
    ITEM_SET_ID_KUROMUZYO_BO_KAKUSEI_ROBE, ITEM_SET_ID_MAHITSUZINO_HOKO_CRESCENT_CIZER,
    ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG, ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG_S2,
    ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS, ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_RAIN_BO, ITEM_SET_ID_RIOTCHIP_S_ATK,
    ITEM_SET_ID_RIOTCHIP_S_AVOID, ITEM_SET_ID_RIOTCHIP_S_CRI, ITEM_SET_ID_RIOTCHIP_S_MATK,
    ITEM_SET_ID_RIOTCHIP_S_MAXHP, ITEM_SET_ID_RIOTCHIP_S_QUICK, ITEM_SET_ID_SHUGOKISHINO_KUBIKAZARI_IMPERIAL_FEATHER,
    ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD, ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD,
    ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD, ITEM_SET_ID_YUSHANOIKARI_ORCISH_AXE_ORCISH_SWORD,
    ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI, ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB,
    n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2Type, n_A_Weapon2_ATKplus,
    n_A_WeaponType, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ADORAMUS, SKILL_ID_AIMED_BOLT, SKILL_ID_ARCLOUSE_DASH, SKILL_ID_AXE_BOOMERANG, SKILL_ID_BEASTY_NOSE,
    SKILL_ID_CANTOCANDIDUS, SKILL_ID_CARROT_BEAT, SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_CART_BOOST_WS,
    SKILL_ID_CART_KAIZO, SKILL_ID_CHATTERING, SKILL_ID_DEBOTION, SKILL_ID_DUPLELIGHT, SKILL_ID_FALLIN_ANGEL,
    SKILL_ID_FAW_MAGIC_DECOY, SKILL_ID_FIGHTING_SPIRIT, SKILL_ID_FORCE_OF_BANGUARD, SKILL_ID_FRIGNO_UTA,
    SKILL_ID_GAKKINO_RENSHU, SKILL_ID_GATLING_FEVER, SKILL_ID_HARMONIZE, SKILL_ID_HELL_INFERNO,
    SKILL_ID_HOSHINO_KAMAE, SKILL_ID_INVISIBILITY, SKILL_ID_KEIKAI, SKILL_ID_KIHE_SHUREN, SKILL_ID_KONGO,
    SKILL_ID_MACE_SHUREN, SKILL_ID_MASS_SPIRAL, SKILL_ID_MURENO_CHIKARA, SKILL_ID_PIKKI_TSUKI, SKILL_ID_RAIKODAN,
    SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SONIC_WAVE, SKILL_ID_SPEAR_QUICKEN, SKILL_ID_SUMMON_AGNI,
    SKILL_ID_SUMMON_AQUA, SKILL_ID_SUMMON_TERA, SKILL_ID_SUMMON_VENTOS, SKILL_ID_TAMASHINO_CHIKUSEKI,
    SKILL_ID_TAROUNO_KIZU, SKILL_ID_TENKETSU_HAN, SKILL_ID_WEREWOLF, SKILL_ID_YASURAGINO_KOMORIUTA
} from "../skill/skill.dat.js";
import { TIME_ITEM_ID_AWL_BARRONNO_MANT } from "../equip/timeitem.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";

/**
 * 公式サイトで「攻撃速度 + ◯%」と表記されるASPDの増加値を取得する
 * @returns {Number} ASPDが増加される％
 */
export function GetAdditionalAspdPercent() {
	var itemCount = 0, cardCount = 0, cardcount = 0;
	/** 最終的に返されるASPD増加率 */
    let tmp_percent = 0;
    let vartmp = 0;
    let sklLv = 0;
    let cardCountRight = 0;
    let cardCountLeft = 0;
    let cardCountHeadTop = 0;
    let cardCountShield = 0;
    let cardCountBody = 0;
    let cardCountShoulder = 0;
    let cardCountShoes = 0;

	let prefetch = 0;

    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (let idx = ITEM_SP_ASPD_UP; idx <= ITEM_SP_ASPD_UP; idx++) {
        n_tok[idx] += GetRndOptTotalValue(idx, null, false);
    }

    tmp_percent += n_tok[ITEM_SP_ASPD_UP];
    if (EquipNumSearch(654)) tmp_percent += Math.floor(SU_AGI / 14);
    if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 484 && SU_STR >= 50) tmp_percent += 5;
    if (EquipNumSearch(624)) tmp_percent += (n_A_Weapon_ATKplus);
    if (EquipNumSearch(641)) tmp_percent += n_A_Weapon_ATKplus;
    if (EquipNumSearch(903) && GetHigherJobSeriesID(n_A_JOB) == 13) tmp_percent += 20;
    if (SU_STR >= 77 && EquipNumSearch(944)) tmp_percent += 4;
    if (n_A_Weapon_ATKplus >= 7 && n_A_Equip[EQUIP_REGION_ID_ARMS] == 1077) tmp_percent += 10;
    if (n_A_Weapon2_ATKplus >= 7 && n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1077) tmp_percent += 10;
    if (n_A_Weapon_ATKplus >= 5 && EquipNumSearch(1081)) {
        tmp_percent += 5;
        if (n_A_Weapon_ATKplus >= 9) tmp_percent += 5;
    }
    if (n_A_Weapon_ATKplus >= 5 && EquipNumSearch(1086)) {
        tmp_percent += 5;
        if (n_A_Weapon_ATKplus >= 9) tmp_percent += 5;
    }
    if (n_A_Weapon_ATKplus >= 5 && EquipNumSearch(1088)) {
        tmp_percent += 5;
        if (n_A_Weapon_ATKplus >= 9) tmp_percent += 5;
    }

    if ((IsSameJobClass(JOB_ID_LORDKNIGHT) || IsSameJobClass(JOB_ID_RUNEKNIGHT)) && EquipNumSearch(855)) {
        tmp_percent -= 5;
    }

    if (EquipNumSearch(1121) && GetLowerJobSeriesID(n_A_JOB) == 2) tmp_percent += 3;
    if (SU_STR >= 95 && EquipNumSearch(1167)) tmp_percent += 3;
    if (n_A_HEAD_DEF_PLUS >= 2 && EquipNumSearch(1462)) tmp_percent += Math.floor(n_A_HEAD_DEF_PLUS / 2);
    if (n_A_BaseLV >= 80 && EquipNumSearch(1485)) {
        tmp_percent += 1;
        if (n_A_BaseLV >= 100) tmp_percent += 1;
        if (n_A_BaseLV >= 150) tmp_percent += 1;
    }
    if (SU_AGI >= 100 && EquipNumSearch(1525)) {
        let wx = EquipNumSearch(1525);
        tmp_percent += 2 * wx;
        if (SU_AGI >= 120) tmp_percent += 2 * wx;
    }
    if (EquipNumSearch(1644)) tmp_percent += n_A_Weapon_ATKplus;
    if (SU_AGI >= 108 && EquipNumSearch(1791)) tmp_percent += 1;
    if (n_A_Weapon_ATKplus >= 2 && EquipNumSearch(1821)) tmp_percent += Math.floor(n_A_Weapon_ATKplus / 2);
    if (n_A_BODY_DEF_PLUS >= 6 && EquipNumSearch(2059)) tmp_percent += n_A_BODY_DEF_PLUS - 5;
    if (EquipNumSearch(2254)) tmp_percent += n_A_Weapon_ATKplus;
    if (SU_VIT >= 108 && EquipNumSearch(2257)) tmp_percent += -5;
    if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(2258)) tmp_percent += 5;
    if (n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(2345)) tmp_percent += 2;
    if (EquipNumSearch(1888) && LearnedSkillSearch(SKILL_ID_MACE_SHUREN) == 10) tmp_percent += 10;

    // 俊敏の時空ブーツ
    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(1919)) {
        tmp_percent += 3 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
    }
    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)) {
        tmp_percent += 3 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
    }

    if (n_A_HEAD_DEF_PLUS >= 1 && EquipNumSearch(2164)) tmp_percent += n_A_HEAD_DEF_PLUS;
    if (CardNumSearch(737)) {
        tmp_percent += 2 * ROUNDDOWN(SU_AGI / 10);
        if (EquipNumSearch(2415)) tmp_percent -= 2 * ROUNDDOWN(SU_AGI / 10);
    }
    if (n_A_SHIELD_DEF_PLUS >= 8 && EquipNumSearch(2241)) tmp_percent += -3;
    if (EquipNumSearch(2294)) tmp_percent += 6 * ROUNDDOWN(n_A_SHIELD_DEF_PLUS / 3);
    if (EquipNumSearch(2298)) tmp_percent += ROUNDDOWN(n_A_BaseLV / 20);
    if (CardNumSearch(825)) {
        if (n_A_HEAD_DEF_PLUS >= 7) tmp_percent += 1 * CardNumSearch(825);
        if (n_A_HEAD_DEF_PLUS >= 9) tmp_percent += 1 * CardNumSearch(825);
    }
    if (n_A_HEAD_DEF_PLUS >= 5 && TimeItemNumSearch(82)) {
        tmp_percent += 5;
        if (n_A_HEAD_DEF_PLUS >= 7) tmp_percent += 10;
        if (n_A_HEAD_DEF_PLUS >= 9) tmp_percent += 40;
    }

    // オウルバロンのマント　時限効果
    if (TimeItemNumSearch(TIME_ITEM_ID_AWL_BARRONNO_MANT)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) tmp_percent += 10;
        if (n_A_SHOULDER_DEF_PLUS >= 9) tmp_percent += 10;
        if (n_A_SHOULDER_DEF_PLUS >= 10) tmp_percent += 20;
    }

    if (n_A_SHOULDER_DEF_PLUS >= 5 && EquipNumSearch(2414)) {
        tmp_percent += 1 * ROUNDDOWN(SU_AGI / 10);
        if (n_A_SHOULDER_DEF_PLUS >= 7) tmp_percent += 1 * ROUNDDOWN(SU_AGI / 10);
    }
    if (EquipNumSearch(2456)) tmp_percent += n_A_Weapon_ATKplus;

    if (UsedSkillSearch(SKILL_ID_FIGHTING_SPIRIT) > 0) {
        if (EquipNumSearch(ITEM_ID_RUNE_HELM) > 0) {
            tmp_percent += 10;
        } else if (EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET) > 0) {
            tmp_percent += 10;
        } else if (EquipNumSearch(ITEM_ID_TENBINKYUNO_DIADEM) > 0) {
            if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
                tmp_percent += 10;
            }
        } else if (EquipNumSearch(ITEM_ID_FAFNIR_HELM) > 0) {
            tmp_percent += 10;
        }
    }

    //----------------------------------------------------------------
    // 「貴族の仮面」の、ベースレベル依存の効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KIZOKUNO_KAMEN)) {
        if (n_A_BaseLV >= 100) {
            tmp_percent += 1;
        }
        if (n_A_BaseLV >= 150) {
            tmp_percent += 1;
        }
    }

    //----------------------------------------------------------------
    // 「ヴァルキリーハンマー」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            // ノービス系
            case JOB_SERIES_ID_NOVICE:
                tmp_percent += 1 * n_A_Weapon_ATKplus;
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
                        tmp_percent += 1 * n_A_Weapon_ATKplus;
                        break;
                        // モンク系
                    case JOB_SERIES_ID_MONK:
                        break;
                }
        }
    }

    //----------------------------------------------------------------
    // 「古びたルーンサークレット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_FURUBITA_RUNECIRCRET)) {
        tmp_percent += 1 * n_A_HEAD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「S-Atk　ライオットチップセット」の、効果
    // 「S-Matk　ライオットチップセット」の、効果
    // 「S-Avoid　ライオットチップセット」の、効果
    // 「S-MaxHP　ライオットチップセット」の、効果
    // 「S-Quick　ライオットチップセット」の、効果
    // 「S-Cri　ライオットチップセット」の、効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_RIOTCHIP_S_ATK) ||
        EquipNumSearch(ITEM_SET_ID_RIOTCHIP_S_MATK) ||
        EquipNumSearch(ITEM_SET_ID_RIOTCHIP_S_AVOID) ||
        EquipNumSearch(ITEM_SET_ID_RIOTCHIP_S_MAXHP) ||
        EquipNumSearch(ITEM_SET_ID_RIOTCHIP_S_QUICK) ||
        EquipNumSearch(ITEM_SET_ID_RIOTCHIP_S_CRI)
    ) {

        // ライオットチップとのセット効果
        tmp_percent += 1 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
    }

    //----------------------------------------------------------------
    // 「セリーヌ・キミカード　ノーブルセット」の、精錬による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_CELINE_KIMI_NOBLE_CROSS)) {
        tmp_percent += 2 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「ヴァルキリーナイフ」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            // ノービス系
            case JOB_SERIES_ID_NOVICE:
                tmp_percent += 10 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
                break;
                // マジシャン系
            case JOB_SERIES_ID_MAGICIAN:
                break;
                // シーフ系
            case JOB_SERIES_ID_THIEF:
                break;
            default:
                switch (GetHigherJobSeriesID(n_A_JOB)) {
                    // ハンター系
                    case JOB_SERIES_ID_HUNTER:
                        break;
                        // バード系、ダンサー系
                    case JOB_SERIES_ID_BARD:
                    case JOB_SERIES_ID_DANCER:
                        tmp_percent += 10 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
                        break;
                }
        }
    }

    //----------------------------------------------------------------
    // 「与一の肩掛け」の、＋７以上精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            tmp_percent += 3;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            tmp_percent += 3;
        }
    }

    //----------------------------------------------------------------
    // 「ガーディアンブースター」の、＋８以上精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GUARDIAN_BOOSTER)) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            tmp_percent += (n_A_SHOES_DEF_PLUS - 7);
        }
    }

    //----------------------------------------------------------------
    // 「勇者の怒りセット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_YUSHANOIKARI_ORCISH_AXE_ORCISH_SWORD)) {
        tmp_percent += 5 * ROUNDDOWN((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 2);
    }

    //----------------------------------------------------------------
    // 「魔羊の咆哮　クレセントサイダーセット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_MAHITSUZINO_HOKO_CRESCENT_CIZER)) {
        tmp_percent += 5 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「魔羊の咆哮　テグリョンセット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG) ||
        EquipNumSearch(ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG_S2)) {
        tmp_percent += 5 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「古王の双刃」の、過剰精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
        if (n_A_Weapon_ATKplus >= 7) {
            tmp_percent += 5;
        }
        if (n_A_Weapon_ATKplus >= 9) {
            tmp_percent += 5;
        }
    }

    //----------------------------------------------------------------
    // 「アヴェンジャーブラッディロア」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AVENGER_BLOODYROAR)) {
        if (n_A_Weapon_ATKplus >= 5) tmp_percent += 5;
        if (n_A_Weapon_ATKplus >= 7) tmp_percent += 5;
    }

    //----------------------------------------------------------------
    // 「セイヴザキング」の、騎兵修練【未習得】時における、「スピアクイッケン」習得による効果
    //----------------------------------------------------------------
    if (LearnedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
        if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) {
            tmp_percent += 3 * LearnedSkillSearch(SKILL_ID_SPEAR_QUICKEN);
        }
    }

    //----------------------------------------------------------------
    // 「魔呪のブーツ」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAZYUNO_BOOTS)) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            tmp_percent += 10;
        }
    }

    //----------------------------------------------------------------
    // 「ガイアシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_AGI >= 90) {
                tmp_percent += 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「反逆者のスカーフ」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
        tmp_percent += 2 * LearnedSkillSearch(SKILL_ID_MASS_SPIRAL) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ガーディアンプロセッサ　パイルバンカーセット」の、過剰精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER)) {
        if (n_A_Weapon_ATKplus >= 7) {
            tmp_percent += 10;
        }
        if (n_A_Weapon_ATKplus >= 9) {
            tmp_percent += 10;
        }
    }

    //----------------------------------------------------------------
    // 「ガーディアンプロセッサ　ガーディアンブースターセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_BOOSTER)) > 0) {
        vartmp = 0;

        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 5;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 5;

        tmp_percent += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「エンチャント　名誉のニーヴ(迅速)」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
    cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_HEAD_TOP_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_SHIELD_ANY);
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_BODY_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU, CARD_REGION_ID_SHOES_ANY);
    if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield +
        cardCountBody + cardCountShoulder + cardCountShoes > 0) {

        // 右手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 3;
        if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountRight

        // 左手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 3;
        if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountLeft

        // 頭防具へのエンチャント
        vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 3;
        if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountHeadTop

        // 盾防具へのエンチャント
        vartmp = 0;
        if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 3;
        if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountShield

        // 体防具へのエンチャント
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 3;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountBody

        // 肩防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 3;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountShoulder

        // 靴防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 3;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
        tmp_percent += vartmp * cardCountShoes

        // アクセサリへのエンチャント
        // 精錬できないので処理不要
    }

    //----------------------------------------------------------------
    // 「麒麟の角」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KIRINNO_TSUNO)) > 0) {
        if (SU_AGI >= 100) {
            tmp_percent += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　グラスセット」の、素ＡＧＩと素ＶＩＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
        tmp_percent += 5 * ROUNDDOWN((SU_AGI + SU_VIT) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　サングラスセット」の、素ＡＧＩと素ＶＩＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
        tmp_percent += 5 * ROUNDDOWN((SU_AGI + SU_VIT) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「勇者の靴　達人の槌　セット」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI)) > 0) {
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_DUPLELIGHT) * itemCount;
    }
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2)) > 0) {
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_DUPLELIGHT) * itemCount;
    }

    //----------------------------------------------------------------
    // 「業風石　ペオースグリーブセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_PEORTH_GREEVE)) > 0) {
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 10;
        tmp_percent += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「アネモスシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_AGI >= 90) {
                tmp_percent += 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「マラクの皮」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MARRACONO_KAWA)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            tmp_percent += 1 * ROUNDDOWN((SU_STR + SU_LUK) / 20) * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「守護騎士の首飾り　インペリアルセット」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHUGOKISHINO_KUBIKAZARI_IMPERIAL_FEATHER)) > 0) {
        vartmp = 0;
        if (SU_AGI >= 108) vartmp += 5;
        if (SU_AGI >= 120) vartmp += 7;
        tmp_percent += vartmp * itemCount
    }

    //----------------------------------------------------------------
    // 「ケミカルグローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE)) > 0) {
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_CART_KAIZO) * itemCount;
    }

    //----------------------------------------------------------------
    // 「陣羽織」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ZINBAORI) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) tmp_percent += 3;
        if (n_A_SHOULDER_DEF_PLUS >= 9) tmp_percent += 3;
    }

    //----------------------------------------------------------------
    // 「Y.S.F.0.1.マント」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YSF01_MANT)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「天狗の下駄」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
        if (sklLv = LearnedSkillSearch(SKILL_ID_TENKETSU_HAN)) {
            tmp_percent += 2 * sklLv * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「獄エンチャント」の、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_GOKU)) {
        // 職業限定の効果
        if (IsSameJobClass(JOB_ID_MECHANIC)) {
            tmp_percent += 20;
        }
    }

    //----------------------------------------------------------------
    // 「太極の護符　灼熱の剣　デイヴィッドシールドセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD)) > 0) {
        tmp_percent += 4 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「太極の護符　浄化の剣　デイヴィッドシールドセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD)) > 0) {
        tmp_percent += 4 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「太極の護符　奈落の剣　デイヴィッドシールドセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD)) > 0) {
        tmp_percent += 4 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「灰羽のブーツ　白羽スーツセット」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            tmp_percent += 8 * itemCount;
        }
        if (n_A_BODY_DEF_PLUS >= 9) {
            tmp_percent += 4 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「トップサイドライダーカード」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (cardcount = CardNumSearch(CARD_ID_TOP_SIDE_RIDER)) {
		if ([ITEM_KIND_STUFF, ITEM_KIND_STUFF2HAND].includes(n_A_WeaponType)) {
                tmp_percent += 1 * n_A_Weapon_ATKplus * cardcount;
		}
    }

	// ニャイズ カード
    if (cardcount = CardNumSearch(CARD_ID_NYAISE)) {
		if ([ITEM_KIND_STUFF, ITEM_KIND_STUFF2HAND].includes(n_A_WeaponType)) {
                tmp_percent += 1 * n_A_Weapon_ATKplus * cardcount;
		}
    }

    //----------------------------------------------------------------
    // 「カニバラウスカード」の、素ＩＮＴによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_CARNIVARAUS)) > 0) {
        tmp_percent += 1 * ROUNDDOWN(SU_INT / 10) * cardCount;
    }

    //----------------------------------------------------------------
    // 「プラズマラットカード」の、素ＳＴＲによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_PLASMA_RAT)) > 0) {
        tmp_percent += 1 * ROUNDDOWN(SU_STR / 10) * cardCount;
    }

    //----------------------------------------------------------------
    // 「ラウンドライダーカード」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ROUND_RIDER)) > 0) {
        if (SU_AGI >= 120) {
            tmp_percent += 3 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「自警団の弓」の、素ＩＮＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZIKEIDANNO_YUMI)) > 0) {
        tmp_percent += 1 * ROUNDDOWN(SU_INT / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「風魔手裏剣・花吹雪」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FUMASHURIKEN_HANAFUBUKI)) > 0) {
        tmp_percent += 1 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「ニーヴバレッタ　ニーヴ武器セット」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
        tmp_percent += 1 * ROUNDDOWN(SU_AGI / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「名も無き剣士のブーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_NAMONAKI_KENNSHINO_BOOTS)) > 0) {
        tmp_percent += 1 * n_A_SHOES_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「神喰らいの龍槍」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAMIKURAINO_RYUSO)) > 0) {
        tmp_percent += 2 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「悪魔の手」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AKUMANO_TE)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            tmp_percent += 5;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            tmp_percent += 5;
        }
    }

    //----------------------------------------------------------------
    // 「日月神示」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HITSUKISHINZI)) > 0) {
        tmp_percent += 1 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「巡礼者の靴」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
        if (sklLv = LearnedSkillSearch(SKILL_ID_CANTOCANDIDUS)) {
            tmp_percent += 4 * sklLv * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「新鮮な草のネックレス」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHINSENNA_KUSANO_NECKLACE)) > 0) {
        sklLv = 0;
        sklLv += LearnedSkillSearch(SKILL_ID_PIKKI_TSUKI);
        sklLv += LearnedSkillSearch(SKILL_ID_ARCLOUSE_DASH);
        sklLv += LearnedSkillSearch(SKILL_ID_TAROUNO_KIZU);
        sklLv += LearnedSkillSearch(SKILL_ID_CARROT_BEAT);
        sklLv += LearnedSkillSearch(SKILL_ID_KEIKAI);
        sklLv += LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA);
        sklLv += LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI);
        tmp_percent += 1 * ROUNDDOWN(sklLv / 5) * itemCount;
    }

    //----------------------------------------------------------------
    // 「高級ドラムスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            tmp_percent += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「高級ドラムケープ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_CAPE)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            tmp_percent += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムケープ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_CAPE)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「高級ドラムシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SHOES)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            tmp_percent += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SHOES)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「トラベラーシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_SHOES)) > 0) {
        tmp_percent += 4 * LearnedSkillSearch(SKILL_ID_HARMONIZE) * itemCount;
    }

    //----------------------------------------------------------------
    // 「リーブラ」の、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_LIBRA, CARD_REGION_ID_HEAD_TOP)) {
        // 職業限定の効果
        if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
            tmp_percent += 1 * n_A_HEAD_DEF_PLUS;
        }
    }

    //----------------------------------------------------------------
    // 「勇者のブローチ」の、職業による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
        if (IsSameJobClass(JOB_ID_ARCBISHOP) || IsSameJobClass(JOB_ID_SHURA)) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「フローズヴィトニルの鎖　ヴァナルガンドの兜セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO)) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 6) {
            tmp_percent += 5 * itemCount;
        }
        if (n_A_HEAD_DEF_PLUS >= 8) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「フルフォース　ドッペルゲンガーカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FULL_FORCE_DOPPELGANGER_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            tmp_percent += 2 * n_A_Weapon_ATKplus * itemCount;
        } else {
            tmp_percent += 5 * n_A_Weapon_ATKplus * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ヘヴンリーオーダー」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
        tmp_percent += 2 * Math.floor(SU_DEX / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「虹色のマフラー」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_MUFFLER)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「虹色のねこじゃらし　レインボウセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_RAIN_BO)) > 0) {
        tmp_percent += 2 * n_A_HEAD_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「古のメガリスカード」の、素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_MEGLIS)) > 0) {
        tmp_percent += 1 * Math.floor(SU_LUK / 10) * cardCount;
    }

    //----------------------------------------------------------------
    // 「古のウータンシューターカード」の、素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_WOOTANG_SHOOTER)) > 0) {
        tmp_percent += 1 * Math.floor(SU_LUK / 10) * cardCount;
    }

    //----------------------------------------------------------------
    // 「八卦の封呪」の、素ＩＮＴと素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HAKKEINO_FUZYU)) > 0) {
        tmp_percent += 2 * ROUNDDOWN((SU_INT + SU_DEX) / 50) * itemCount;
    }

    //----------------------------------------------------------------
    // 「フロンティアブーツ　自警団の弓セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            tmp_percent += 6 * ROUNDDOWN(SU_INT / 40) * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「フロンティアブーツ　物影セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 9) {
            tmp_percent += 20 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ふわふわタンポポシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
        tmp_percent += 5 * LearnedSkillSearch(SKILL_ID_CHATTERING) * itemCount;
    }

    //----------------------------------------------------------------
    // 「悪鬼羅刹の指輪」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「アジダハーカの皮」の、ステータスによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AZI_DAHAKANO_KAWA)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            tmp_percent += 2 * Math.floor((SU_VIT + SU_LUK) / 20) * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ぷりちーウリボウシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_PRETTY_URIBO_SHOES)) > 0) {
        tmp_percent += 5 * LearnedSkillSearch(SKILL_ID_KEIKAI) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ジャガーノート」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FALLIN_ANGEL) >= 1) {
            tmp_percent += 20 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ギガンテスカード」の、斧系統の効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_GIGANTES, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_GIGANTES, CARD_REGION_ID_ARMS_LEFT_ANY);
    if (cardCountRight > 0) {
        if ((n_A_WeaponType == ITEM_KIND_AXE) || (n_A_WeaponType == ITEM_KIND_AXE_2HAND)) {
            tmp_percent += 3 * cardCountRight;
        }
    }
    if (cardCountLeft > 0) {
        if ((n_A_Weapon2Type == ITEM_KIND_AXE) || (n_A_Weapon2Type == ITEM_KIND_AXE_2HAND)) {
            tmp_percent += 3 * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「イリュージョンテグリョン　魔羊の咆哮セット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_ILLUSION_TEGRYONG_MAHITSUZINO_HOKO)) {
        tmp_percent += 5 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「イリュージョンミリタリーブーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FAW_MAGIC_DECOY) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ガーディアンオブソウル」の、素ＡＧＩと素ＶＩＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
        tmp_percent += 2 * Math.floor((SU_AGI + SU_VIT) / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「黒無常帽　覚醒ローブセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUROMUZYO_BO_KAKUSEI_ROBE)) > 0) {
        tmp_percent += 1 * n_A_BODY_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「精神拡張リング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SEISHIN_KAKUCHO_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HELL_INFERNO) >= 5) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ぴかぴかニャンニャンクラウン」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_PIKAPIKA_NYANNYAN_CROWN)) > 0) {
        tmp_percent += 3 * LearnedSkillSearch(SKILL_ID_CHATTERING) * itemCount;
    }

    //----------------------------------------------------------------
    // 「よちよちウリボウスタイ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI)) > 0) {
        tmp_percent += 2 * LearnedSkillSearch(SKILL_ID_KEIKAI) * itemCount;
    }

    //----------------------------------------------------------------
    // 「試験管ブーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHIKENKAN_BOOTS)) > 0) {
        tmp_percent += 4 * LearnedSkillSearch(SKILL_ID_CART_BOOST_WS) * itemCount;
        tmp_percent += 4 * LearnedSkillSearch(SKILL_ID_CART_BOOST_GENETIC) * itemCount;
    }

    //----------------------------------------------------------------
    // 「スカルリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SCALL_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_TAMASHINO_CHIKUSEKI) >= 5) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「不死鳥のリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_FUSHICHONO_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「あざといケロケロカッパ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_AZATOI_KEROKERO_KAPPA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CHATTERING) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ジャスパーリング」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_ZYASPER_RING)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_SONIC_WAVE) >= 10) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「崇拝の指輪」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SUHAINO_YUBIWA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ADORAMUS) >= 10) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「正義の冠」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SEIGINO_KANMURI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_DEBOTION) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「インペリアル天地スーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_TENCHI_SUIT)) > 0) {
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) * itemCount;
    }

    //----------------------------------------------------------------
    // 「グレース天地スーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_TENCHI_SUIT)) > 0) {
        tmp_percent += 2 * LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) * itemCount;
    }

    //----------------------------------------------------------------
    // 「メタルピック」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_METAL_PICK)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_YASURAGINO_KOMORIUTA) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「パラケルススグローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_PARACELSUS_GLOVE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_CART_BOOST_GENETIC) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「深海のセドラカード」の、楽器・鞭系統の効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_SHINKAINO_CEDORA, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_SHINKAINO_CEDORA, CARD_REGION_ID_ARMS_LEFT_ANY);
    if (cardCountRight > 0) {
        if ((n_A_WeaponType == ITEM_KIND_MUSICAL) || (n_A_WeaponType == ITEM_KIND_WHIP)) {
            tmp_percent += 3 * cardCountRight;
        }
    }
    if (cardCountLeft > 0) {
        if ((n_A_Weapon2Type == ITEM_KIND_MUSICAL) || (n_A_Weapon2Type == ITEM_KIND_WHIP)) {
            tmp_percent += 3 * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「インペリアルコンフィデンシャルメイル」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL)) > 0) {
        tmp_percent += 1 * Math.floor(LearnedSkillSearch(SKILL_ID_SONIC_WAVE) / 3) * itemCount;
    }

    //----------------------------------------------------------------
    // 「グレースコンフィデンシャルメイル」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)) > 0) {
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_SONIC_WAVE) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ウルフオフィサーハット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_WOLF_OFFICER_HAT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「覚醒フルフォース　ドッペルゲンガーカードセット」の、ベースレベルと精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_FULL_FORCE_DOPPELGANGER_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            tmp_percent += 2 * n_A_Weapon_ATKplus * itemCount;
        } else {
            tmp_percent += 5 * n_A_Weapon_ATKplus * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「覚醒フルフォース　封印されたドッペルゲンガーカードセット」の、ベースレベルと精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            tmp_percent += 2 * n_A_Weapon_ATKplus * itemCount;
        } else {
            tmp_percent += 5 * n_A_Weapon_ATKplus * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「フルフォース　封印されたドッペルゲンガーカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            tmp_percent += 1 * n_A_Weapon_ATKplus * itemCount;
        } else {
            tmp_percent += 2 * n_A_Weapon_ATKplus * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ミリタリーグローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MILITARY_GLOVE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) >= 5) {
            tmp_percent += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「怨霊怪異の耳」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ONRYO_KAIINO_MIMI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
            tmp_percent += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ゾディアック　白羊宮のマント」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_MANT)) {
        if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
            tmp_percent += 2 * n_A_SHOULDER_DEF_PLUS;
        }
    }

    //----------------------------------------------------------------
    // 「エレメンタルポゼッション」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ELEMENTAL_POSSESSION)) > 0) {
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_SUMMON_AGNI) * itemCount;
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_SUMMON_AQUA) * itemCount;
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_SUMMON_VENTOS) * itemCount;
        tmp_percent += 1 * LearnedSkillSearch(SKILL_ID_SUMMON_TERA) * itemCount;
    }

    //----------------------------------------------------------------
    // 「魔力中毒プラガカード」の、斧系統の効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_MARYOKU_CHUDOKU_PLAGA, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_MARYOKU_CHUDOKU_PLAGA, CARD_REGION_ID_ARMS_LEFT_ANY);
    if (cardCountRight > 0) {
        if (n_A_WeaponType == ITEM_KIND_FIST) {
            tmp_percent += 3 * cardCountRight;
        }
    }
    if (cardCountLeft > 0) {
        if (n_A_Weapon2Type == ITEM_KIND_FIST) {
            tmp_percent += 3 * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「ミステリーウィング」の、素ステータスによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
        if (GetTotalPureBasicStatus() >= 400) {
            tmp_percent += 15 * itemCount;
        }
    }

    if (n_A_PassSkill7[22]) tmp_percent += 10;

	/**
	 * 「バード 楽器の練習」の、効果
	 */
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_GAKKINO_RENSHU), UsedSkillSearch(SKILL_ID_GAKKINO_RENSHU))) > 0) {
		if(n_A_WeaponType === ITEM_KIND_MUSICAL) {
			tmp_percent += Math.round(0.5 * sklLv);
		}
	}

    //----------------------------------------------------------------
    // 「三次職支援　ペインキラー」の効果
    //----------------------------------------------------------------
    tmp_percent -= 10 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_PAIN_KILLER];
	
	/** 二次職支援設定「夕陽のアサシンクロス」の効果 */
	if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_ASSASSINCROSS]) > 0) {
		tmp_percent += 10 + 2 * sklLv;
	}

	/**
	 * プレイヤー状態異常「私を忘れないで…」の効果
	 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_DONTFORGETME] > 0) {
		tmp_percent -= 5 + g_confDataDebuff[CCharaConfDebuff.CONF_ID_DONTFORGETME];
	}
	/**
	 * プレイヤー状態異常「メランコリー」の効果
	 */
	tmp_percent -= 3 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_GLOOMYDAY];

    //----------------------------------------------------------------
    // 「修羅　点穴 -反-」の効果
    //----------------------------------------------------------------
    tmp_percent += Math.floor(SU_AGI * UsedSkillSearch(SKILL_ID_TENKETSU_HAN) / 60);

    //----------------------------------------------------------------
    // 「ガンスリンガー　ガトリングフィーバー」の効果
    //----------------------------------------------------------------
    if (n_A_WeaponType == ITEM_KIND_NONE || n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
        tmp_percent += UsedSkillSearch(SKILL_ID_GATLING_FEVER);
    }

    //----------------------------------------------------------------
    // 「モンク　金剛」のASPDペナルティ効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_KONGO) > 0) {
        tmp_percent -= 25;
    }

    //----------------------------------------------------------------
    // 「シャドウチェイサー　インビジビリティ」の効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_INVISIBILITY) > 0) {
        tmp_percent -= (50 - 10 * UsedSkillSearch(SKILL_ID_INVISIBILITY));
    }

	/** ドルイド「ビースティノーズ」による攻撃速度 + 効果 */
	if (UsedSkillSearch(SKILL_ID_WEREWOLF) == 1) {
		tmp_percent += LearnedSkillSearch(SKILL_ID_BEASTY_NOSE);
	}

    //----------------------------------------------------------------
    // 「星帝　星の構え」の効果
    //----------------------------------------------------------------
    tmp_percent += 5 * UsedSkillSearch(SKILL_ID_HOSHINO_KAMAE);
    if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_FREEZING]) tmp_percent -= 30;

	/**
	 * 幻想叢書カード レハール
	 */
	if (n_A_PassSkill7[52] === 6) {
		tmp_percent += 5;
	}

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
	let confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_ASPD_UP);
    if (confval > 0) {
        tmp_percent += confval;
    }

    return tmp_percent;
}

