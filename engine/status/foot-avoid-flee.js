/**
 * 完全回避・固定詠唱時間短縮率・FLEE の各算出関数。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { n_A_PassSkill4, n_A_PassSkill7, UsedSkillSearch, n_A_PassSkill8 } from "../skill/skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsDoramJob, IsSameJobClass, JOB_SERIES_ID_ASSASIN,
    JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_MONK, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_PRIEST, JOB_SERIES_ID_ROGUE,
    JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_THIEF, JOB_SERIES_ID_WIZARD
} from "../data/mig.job.h.js";
import {
    g_confDataDebuff, g_confDataNizi, g_confDataSanzi, g_objCharaConfCustomStatus
} from "../runtime/global.js";
import { ApplySpecModify, GetTotalPureBasicStatus } from "../chara/hmjob.js";
import {
    n_A_ActiveSkill, n_A_BaseLV, n_A_Kotei_Cast_Keigen, n_tok, set_n_A_Kotei_Cast_Keigen
} from "../runtime/ro4-state.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import {
    CARD_ID_ARFOSIO_BASIL_MVP, CARD_ID_BLOODY_SLASHER, CARD_ID_CAPRICORN, CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI,
    CARD_ID_ENCHANT_ENERGY_IKUSAOTOME, CARD_ID_ENCHANT_KOTEIEISHO_50, CARD_ID_ENCHANT_KOTEIEISHO_70,
    CARD_ID_ENCHANT_MATK_1_CAST_FIXED_1, CARD_ID_ENCHANT_MATK_2_CAST_FIXED_1,
    CARD_ID_ENCHANT_MATK_2_CAST_FIXED_1_BUG, CARD_ID_ENCHANT_MATK_3_CAST_FIXED_1,
    CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_ID_ENCHANT_Q_CAST_FIXED,
    CARD_ID_ENCHANT_WOLF_ORB_CAST_FIXED_50, CARD_ID_ENCHANT_Z_CASTFIXED, CARD_ID_FENRIR, CARD_ID_GENETIC_EMUR_MVP,
    CARD_ID_GESUI_CLAMP, CARD_ID_GOKU, CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP, CARD_ID_HEATER,
    CARD_ID_HENBONO_KHALITZBURG, CARD_ID_HIMITSU_NO_HANE_LEIZI, CARD_ID_KAVAC_ICARUS, CARD_ID_KUMIHO,
    CARD_ID_NYDHOGNO_KAGE, CARD_ID_ORC_BABY, CARD_ID_PRIDE_CROW_BARON, CARD_ID_SAMAYOU_MONO, CARD_ID_SHADIEST,
    CARD_ID_TRENTINI_MVP, CARD_ID_T_W_O, CARD_ID_WILD_ROSE, CARD_SET_ID_ENCHANT_ARCANA_ARCANA_MOON_REVERSE,
    CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_T_W_O, CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FENRIR,
    CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_NYDHOGNO_KAGE, CARD_SET_ID_ENCHANT_SHINREKI_BOSOSHITA_MARYOKU,
    CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_MANT
} from "../card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import {
    CARD_REGION_ID_ACCESSORY_1_ANY, CARD_REGION_ID_ACCESSORY_2_ANY, CARD_REGION_ID_ARMS_LEFT_ANY,
    CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_TOP_ANY,
    CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "../runtime/common.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_SHOULDER
} from "../const/EnumEquipRegionId.js";
import { ITEM_KIND_GATLINGGUN, ITEM_KIND_NONE, ITEM_KIND_SPEAR, ITEM_KIND_SPEAR_2HAND } from "../const/EnumItemKind.js";
import { ITEM_SP_FLEE_PLUS, ITEM_SP_LUCKY_PLUS } from "../const/EnumItemSpId.js";
import {
    JOB_ID_ACOLYTE, JOB_ID_ARCBISHOP, JOB_ID_ARCHER, JOB_ID_GENETIC, JOB_ID_GILOTINCROSS, JOB_ID_MAGICIAN,
    JOB_ID_RUNEKNIGHT, JOB_ID_SHADOWCHASER, JOB_ID_SOUL_REAPER, JOB_ID_STAR_EMPEROR, JOB_ID_SWORDMAN, JOB_ID_TAEGWON,
    JOB_ID_THIEF, JOB_ID_WIZARD
} from "../const/EnumJobId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AEGIR_MANT, ITEM_ID_AEGIS_SYSTEM, ITEM_ID_AMANOZYAKUNO_KIMEN, ITEM_ID_ANSONINO_FUKU,
    ITEM_ID_AVENGER_JAMADHAR, ITEM_ID_BERET_OF_BOSS_REFINE_7, ITEM_ID_BLOODY_ROAR, ITEM_ID_BUKUBUKU_HUNTING_GOOGLE,
    ITEM_ID_CELESTIAL_DIADEM, ITEM_ID_CHINMOKUNO_SHIKKOSHA, ITEM_ID_DAKITSUKI_SYAMNEKO, ITEM_ID_DEATH_BRINGER,
    ITEM_ID_DEUS_EX_MACHINA, ITEM_ID_EIYU_MANT, ITEM_ID_ENRAIMAZYONO_OTSUE, ITEM_ID_EXELION_WING,
    ITEM_ID_EXELION_WING_AT_LV130, ITEM_ID_FAIRLY_CLOTH, ITEM_ID_FUROSHIKI_MANT,
    ITEM_ID_FURUBITA_GESSHOKUNO_SOUSHOKU, ITEM_ID_FURUBITA_MARYOKUSEKI, ITEM_ID_GATE_OF_NEZAR_WORLD,
    ITEM_ID_GATE_OF_NEZAR_WORLD_T1, ITEM_ID_GESSHOKUNO_SOUSHOKU, ITEM_ID_GLACIES_ARANEA,
    ITEM_ID_GLUTTONOUS_ORLEANS_UNIFORM, ITEM_ID_GOYUMUSONO_MIKOSHI, ITEM_ID_GRACE_MENUS_SUIT,
    ITEM_ID_GRACE_RAINSTORM_SUIT, ITEM_ID_GRADENIETZ, ITEM_ID_HEAVENLY_ORDER, ITEM_ID_ILLUSION_EYES,
    ITEM_ID_IMPERIAL_MENUS_SUIT, ITEM_ID_IMPERIAL_RAINSTORM_SUIT, ITEM_ID_ITOSHISA_NO_KAKERA_AND_HEART_WING_HAIRBAND,
    ITEM_ID_KAIKYONO_SAKURA, ITEM_ID_KAMIKURAINO_RYUSO, ITEM_ID_KAZE_NO_SASAYAKI, ITEM_ID_KIRINO_YOTO,
    ITEM_ID_KOKYU_DORAM_CAPE, ITEM_ID_KOKYU_DORAM_SHOES, ITEM_ID_KOKYU_DORAM_SUITS, ITEM_ID_KORYUNO_TENYOKU,
    ITEM_ID_KUROHANO_MANT, ITEM_ID_KUROHANO_MANT_AVOIDANCE_OPTION, ITEM_ID_LAFINE_STUFF, ITEM_ID_LUXURY_MINI_CROWN,
    ITEM_ID_MAGIA_VITA, ITEM_ID_MASSHOSHANO_ROBE, ITEM_ID_MICHINARU_MARYOKUNO_BOOTS, ITEM_ID_MIKAWASHINO_CAPE,
    ITEM_ID_MOKOMOKO_OSAKANA_SHOES, ITEM_ID_MONOKAGE, ITEM_ID_MUBYOSOKUSAINO_OMAMORI, ITEM_ID_MYSTERY_WING,
    ITEM_ID_NABUNO_HOOD, ITEM_ID_OPERA_MASK, ITEM_ID_PISCES_CROWN, ITEM_ID_POLLUX_SHOES, ITEM_ID_PROCYON_SHOES,
    ITEM_ID_PUMPKIN_HAT_2010, ITEM_ID_RAINBOW_STAR, ITEM_ID_RING_OF_VENUS, ITEM_ID_RIOTCHIP, ITEM_ID_ROUJINNO_KAMEN,
    ITEM_ID_RUNE_GREEVE, ITEM_ID_SAMAYOUMONO_NO_KASA, ITEM_ID_SAVE_THE_KING, ITEM_ID_SENTEHISSHONO_OMAMORI,
    ITEM_ID_SEREONO_HOKAN, ITEM_ID_SHADOW_CROWN, ITEM_ID_SHIRAHANO_SUIT, ITEM_ID_SHUNBINNO_GLOVE,
    ITEM_ID_SHUZINNO_FUKU, ITEM_ID_SKIN_OF_VENTUS_REFINE_7, ITEM_ID_SKTOM, ITEM_ID_TAIKYOKUNO_MIMIKAZARI_KIIRO,
    ITEM_ID_TATSUINUNO_UDEWA, ITEM_ID_TENBINKYUNO_SHOES, ITEM_ID_TOKUSEN_DORAM_CAPE, ITEM_ID_TOKUSEN_DORAM_SHOES,
    ITEM_ID_TOKUSEN_DORAM_SUITS, ITEM_ID_TOY_SHIELD, ITEM_ID_TOZOKUNO_YUBIWA, ITEM_ID_TSUIGEKISHANO_SHOES,
    ITEM_ID_UNMEI_NO_SHO, ITEM_ID_VALKIRIE_CAPE, ITEM_ID_VALKYRIE_HAMMER, ITEM_ID_VALKYRIE_MANT,
    ITEM_ID_YOZINBONO_SCARF, ITEM_ID_ZIKEIDANNO_YUMI, ITEM_ID_ZINBAORI, ITEM_ID_ZIRKFREEDNO_KABUTO,
    ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO, ITEM_SET_ID_AQUARIUS_DIADEM_AQUARIUS,
    ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON, ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA,
    ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI, ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS,
    ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_KAKUSEI_ROBE, ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_SARANO_ROBE,
    ITEM_SET_ID_HIGHLEVEL_ORCBABY, ITEM_SET_ID_KONGOSEKINO_TATE_EIKONO_AKASHI,
    ITEM_SET_ID_KONGOSEKINO_TATE_EIKONO_AKASHI_S1, ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO,
    ITEM_SET_ID_KUROHANO_SUIT_ARTIFACT, ITEM_SET_ID_MENTAL_CONDENSER_MAGIC_PROTECTOR_ROBE,
    ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_FUINSARETA_IGNISEM_CENIA_MVP,
    ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_IGNISEM_CENIA_MVP, ITEM_SET_ID_RIOTCHIP_A_FLEE,
    ITEM_SET_ID_ROSARIONO_KUBIKAZARI_CROCE_STUFF, ITEM_SET_ID_ROSARIONO_KUBIKAZARI_SEISHOKUSHANO_KANGOBO,
    ITEM_SET_ID_SETONO_ONCHO_IKYONO_TOKATSUSHA, ITEM_SET_ID_SETSUKA_ARMORS_MAGICAL,
    ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_SHINRINO_KAIHO, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_MANT,
    ITEM_SET_ID_ULTIMATE_MODE_CHANGER_NABUNO_CLOTH, ITEM_SET_ID_WILD_BEAST_WOLF_ORB_CAST_FIXED_50
} from "../item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import { PET_ID_MISTRESS } from "../pet.dat.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_AGI, n_A_BODY_DEF_PLUS, n_A_BODY_DEF_Transcendence, n_A_DEX,
    n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_HEAD_DEF_Transcendence, n_A_JOB, n_A_LUK, n_A_SHIELD_DEF_PLUS,
    n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_WeaponType, n_A_Weapon_ATKplus,
    set_g_lucky_over
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ADJUSTMENT, SKILL_ID_BERSERK, SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_CLOAKING, SKILL_ID_CLOSE_CONFINE,
    SKILL_ID_COMMET, SKILL_ID_CROSS_IMPACT, SKILL_ID_CRYMSON_ROCK, SKILL_ID_DAICHINO_TAMASHI,
    SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER, SKILL_ID_DRAIN_LIFE, SKILL_ID_EARTH_STRAIN,
    SKILL_ID_ENDLESS_HUMMING_VOICE, SKILL_ID_ESCAPE, SKILL_ID_FAINT_BOMB, SKILL_ID_FATAL_MENUS, SKILL_ID_FROST_MISTY,
    SKILL_ID_GATLING_FEVER, SKILL_ID_GROOMING, SKILL_ID_HALLUCINATION_WALK, SKILL_ID_HELL_INFERNO,
    SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_IZAYOI, SKILL_ID_JACK_FROST, SKILL_ID_KAIHIRITSU_ZOKA,
    SKILL_ID_KASUMIGIRI, SKILL_ID_KIHE_SHUREN, SKILL_ID_MIKIRI, SKILL_ID_OVERED_BOOST, SKILL_ID_PHANTOM_SLAST,
    SKILL_ID_PREENING, SKILL_ID_RADIUS, SKILL_ID_SECRAMENT, SKILL_ID_SEIMEINO_CHIKARA, SKILL_ID_SERE_SUPPORT_SKILL,
    SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_SOUL_EXPANSION, SKILL_ID_SPEAR_QUICKEN, SKILL_ID_SUMMON_FIRE_BALL,
    SKILL_ID_SUMMON_LIGHTNING_BALL, SKILL_ID_SUMMON_STONE, SKILL_ID_SUMMON_WATER_BALL,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, SKILL_ID_TENKETSU_HAN, SKILL_ID_TETRA_BOLTEX, SKILL_ID_TSUKINO_ANRAKU,
    SKILL_ID_TSUKINO_HIKARI, SKILL_ID_TSUKINO_KAMAE, SKILL_ID_UNLIMIT, SKILL_ID_WIND_WALK
} from "../skill/skill.dat.js";
import { TIME_ITEM_ID_KOKUYOKUNO_SHITO, TIME_ITEM_ID_RATATOSK_CAD } from "../timeitem.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";

// foot.js 専有のモジュールレベル変数（getFlee 内で書いてから読む。write-before-read 確認済み）
let itemCountRight = 0;
let itemCountLeft = 0;

/**
 * キャラクタの基礎値に加えて
 * 公式サイトで「完全回避 + ◯」と表記される完全回避の増加効果を適用した
 * 最終的な完全回避の値を取得する
 * @returns {Number}
 */
export function getCompleteAvoidance() {
    let lucky = 0;
    let vartmp = 0;
    let itemCount = 0;
    let cardCount = 0;
    let cardCountRight = 0;
    let cardCountLeft = 0;
    let cardCountHeadTop = 0;
    let cardCountShield = 0;
    let cardCountBody = 0;
    let cardCountShoulder = 0;
    let cardCountShoes = 0;

    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (let idx = ITEM_SP_LUCKY_PLUS; idx <= ITEM_SP_LUCKY_PLUS; idx++) {
        n_tok[idx] += GetRndOptTotalValue(idx, null, false);
    }

    //----------------------------------------------------------------
    // 種族ごとの基礎値
    //----------------------------------------------------------------
    // ドラムの場合
    if (IsDoramJob(n_A_JOB)) {
        lucky = 1 + SU_LUK * 0.12 + (n_A_LUK - SU_LUK) * 0.1;
    }
    // 人間の場合
    else {
        lucky = 1 + n_A_LUK * 0.1;
    }

    lucky += n_tok[ITEM_SP_LUCKY_PLUS];
    if (GetLowerJobSeriesID(n_A_JOB) === JOB_ID_THIEF) {
		lucky += 5 * CardNumSearch(CARD_ID_WILD_ROSE);
	}
    if (GetLowerJobSeriesID(n_A_JOB) === JOB_ID_SWORDMAN) {
		lucky += 3 * CardNumSearch(CARD_ID_HEATER);
	}
    if (n_A_SHOULDER_DEF_PLUS <= 4 && CardNumSearch(CARD_ID_KAVAC_ICARUS)) {
		lucky += 1;
	}
    if (n_A_Equip[EQUIP_REGION_ID_SHOULDER] === ITEM_ID_VALKYRIE_MANT ||
        EquipNumSearch(ITEM_ID_AEGIR_MANT) ||
        EquipNumSearch(ITEM_ID_VALKIRIE_CAPE) ||
        CardNumSearch(CARD_ID_ENCHANT_ENERGY_IKUSAOTOME)) {
        let wHPVS = GetLowerJobSeriesID(n_A_JOB);
		if ([JOB_ID_ACOLYTE, JOB_ID_ARCHER, JOB_ID_MAGICIAN].includes(wHPVS)) {
            lucky += 5;
            lucky += n_A_SHOULDER_DEF_PLUS * 2;
        }
    }
    if (GetLowerJobSeriesID(n_A_JOB) === JOB_ID_TAEGWON && EquipNumSearch(ITEM_ID_ROUJINNO_KAMEN)) {
		lucky += 2;
	}
    if (n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(ITEM_ID_TOY_SHIELD)) {
		lucky += 3;
	}
    if (SU_AGI >= 120 && EquipNumSearch(ITEM_ID_CHINMOKUNO_SHIKKOSHA)) {
		lucky += 5;
	}
    if (SU_VIT >= 100 && EquipNumSearch(ITEM_ID_MUBYOSOKUSAINO_OMAMORI)) {
        let wx = EquipNumSearch(ITEM_ID_MUBYOSOKUSAINO_OMAMORI);
        lucky += 1 * wx;
        if (SU_VIT >= 120) {
			lucky += 3 * wx;
		}
    }
    if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(ITEM_SET_ID_KUROHANO_SUIT_ARTIFACT)) {
		lucky += 5;
	}
    if (n_A_SHOULDER_DEF_PLUS >= 7 && EquipNumSearch(ITEM_ID_KUROHANO_MANT)) {
		lucky += (n_A_SHOULDER_DEF_PLUS - 6);
	}
    if (n_A_SHOULDER_DEF_PLUS >= 7 && EquipNumSearch(ITEM_ID_SKIN_OF_VENTUS_REFINE_7)) {
		lucky += 2;
	}
    if (n_A_Weapon_ATKplus >= 7 && EquipNumSearch(ITEM_ID_UNMEI_NO_SHO)) {
		lucky += 5;
	}
    if (SU_AGI >= 110 && EquipNumSearch(ITEM_ID_SHUNBINNO_GLOVE)) {
		lucky += 1 * EquipNumSearch(ITEM_ID_SHUNBINNO_GLOVE);
	}
    if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(ITEM_ID_BERET_OF_BOSS_REFINE_7)) {
        lucky += 1;
        if (n_A_HEAD_DEF_PLUS >= 9) {
			lucky += 1;
		}
        if (n_A_HEAD_DEF_PLUS >= 10) {
			lucky += 3;
		}
    }
    if (n_A_BaseLV >= 130 && EquipNumSearch(ITEM_ID_EXELION_WING)) {
        lucky += 2;
        if (EquipNumSearch(ITEM_ID_EXELION_WING_AT_LV130)) {
			lucky += 6;
		}
    }
    if (n_A_SHIELD_DEF_PLUS >= 3 && EquipNumSearch(ITEM_ID_SKTOM)) {
		lucky += 2 * ROUNDDOWN(n_A_SHIELD_DEF_PLUS / 3);
	}
    if (EquipNumSearch(ITEM_ID_KUROHANO_MANT_AVOIDANCE_OPTION)) {
		lucky += 3 * n_A_SHOULDER_DEF_PLUS;
	}

    //----------------------------------------------------------------
    // 「ヴァルキリーハンマー」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            // ノービス系
            case JOB_SERIES_ID_NOVICE:
                lucky += 1 * n_A_Weapon_ATKplus;
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
                        break;
                    // モンク系
                    case JOB_SERIES_ID_MONK:
                        lucky += 1 * n_A_Weapon_ATKplus;
                        break;
                }
        }
    }

    //----------------------------------------------------------------
    // 「ロザリオの首飾り　クローチェセット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_ROSARIONO_KUBIKAZARI_CROCE_STUFF)) {
        lucky += 2 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「ロザリオの首飾り　聖職者の看護帽セット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_ROSARIONO_KUBIKAZARI_SEISHOKUSHANO_KANGOBO)) {
        lucky += 1 * n_A_HEAD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「アヴェンジャージャマダハル」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AVENGER_JAMADHAR)) {
        if (n_A_Weapon_ATKplus >= 5) lucky += 5;
        if (n_A_Weapon_ATKplus >= 7) lucky += 5;
    }

    //----------------------------------------------------------------
    // 「皇竜の天翼」の、職業による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
        if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_THIEF) {
            lucky += 3;
        }
    }

    //----------------------------------------------------------------
    // 「エナジー＜致命ノ一撃＞」の、精錬による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI)) > 0) {
        lucky += 1 * Math.max(0, (n_A_SHOULDER_DEF_PLUS - 4)) * cardCount;
    }

    //----------------------------------------------------------------
    // 「ギロチンクロスエレメス(MVP)カード」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP)) > 0) {
        if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
            lucky += 10 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「ジークフリードの兜」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZIRKFREEDNO_KABUTO)) > 0) {
        let vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 6) {
            vartmp += 5;
        }
        if (n_A_HEAD_DEF_PLUS >= 8) {
            vartmp += 5;
        }
        lucky += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「名誉のニーヴ(幸運)」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_ARMS_LEFT_ANY);
    cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_HEAD_TOP_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_SHIELD_ANY);
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_BODY_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN, CARD_REGION_ID_SHOES_ANY);
    if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield +
        cardCountBody + cardCountShoulder + cardCountShoes > 0) {

        // 右手武器へのエンチャント
        let vartmp = 0;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
        if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
        lucky += vartmp * cardCountRight

        // 左手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
        if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
        lucky += vartmp * cardCountLeft

        // 頭防具へのエンチャント
        vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
        if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
        lucky += vartmp * cardCountHeadTop

        // 盾防具へのエンチャント
        vartmp = 0;
        if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
        if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
        lucky += vartmp * cardCountShield

        // 体防具へのエンチャント
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
        lucky += vartmp * cardCountBody

        // 肩防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
        lucky += vartmp * cardCountShoulder

        // 靴防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
        lucky += vartmp * cardCountShoes

        // アクセサリへのエンチャント
        // 精錬できないので処理不要
    }

    //----------------------------------------------------------------
    // 「天邪鬼の鬼面」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
        lucky += 1 * ROUNDDOWN(SU_AGI / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「灰羽のブーツ　黒羽スーツセット」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            lucky += 6 * itemCount;
        }
        if (n_A_BODY_DEF_PLUS >= 9) {
            lucky += 3 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「アンソニの服」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ANSONINO_FUKU)) > 0) {
        let vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) {
            vartmp += 1;
        }
        if (n_A_BODY_DEF_PLUS >= 8) {
            vartmp += 1;
        }
        if (n_A_BODY_DEF_PLUS >= 9) {
            vartmp += 1;
        }
        lucky += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「フェアリークロース」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FAIRLY_CLOTH)) > 0) {
        let vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 5) {
            vartmp += 10;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            vartmp += 10;
        }
        lucky += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「高級ドラムスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            lucky += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SUITS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            lucky += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「高級ドラムケープ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_CAPE)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            lucky += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムケープ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_CAPE)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            lucky += 20 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「高級ドラムシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SHOES)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 9) {
            lucky += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「特選ドラムシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SHOES)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 9) {
            lucky += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「栄光の証セット」の、重複判定対応
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KONGOSEKINO_TATE_EIKONO_AKASHI)) > 0) {
        if ((itemCount = EquipNumSearch(ITEM_SET_ID_KONGOSEKINO_TATE_EIKONO_AKASHI_S1)) > 0) {
            lucky -= 10;
        }
    }

    //----------------------------------------------------------------
    // 「降霊術士の手鏡　外套セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO)) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            lucky += 20 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「身かわしのケープ」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MIKAWASHINO_CAPE)) > 0) {
        lucky += 5 * LearnedSkillSearch(SKILL_ID_SECRAMENT) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ゾディアック　処女宮のメイル」セットの、職業による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_MANT)) {
        if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
            lucky += 3 * n_A_SHOULDER_DEF_PLUS;
        }
    }

	/** 二次職支援設定「口笛」の効果 */
	if (g_confDataNizi[CCharaConfNizi.CONF_ID_WHISTLE] > 0) {
		lucky += 15 + g_confDataNizi[CCharaConfNizi.CONF_ID_WHISTLE];
	}

    //----------------------------------------------------------------
    // 「三次職支援　警戒」の効果
    //----------------------------------------------------------------
    switch (g_confDataSanzi[CCharaConfSanzi.CONF_ID_KEIKAI]) {
        case 1:
            lucky += 5;
            break;
        case 2:
            lucky += 10;
            break;
        case 3:
            lucky += 15;
            break;
        case 4:
            lucky += 25;
            break;
        case 5:
            lucky += 50;
            break;
    }

    //----------------------------------------------------------------
    // 「サモナー　大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)」の、効果
    //----------------------------------------------------------------
    if (Math.max(LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI), UsedSkillSearch(SKILL_ID_DAICHINO_TAMASHI)) > 0) {
        if (UsedSkillSearch(SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER) > 0) {
            lucky += 1 * ROUNDDOWN(n_A_BaseLV / 7);
        }
    }

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    const confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_LUCKY_PLUS);
    if (confval != 0) {
        lucky += confval;
    }

    lucky = Math.round(lucky * 10) / 10;
    if (lucky < 0) {
        lucky = 0;
    }
    set_g_lucky_over(Math.max(0, Math.round(lucky * 10 - 950) / 10));
    lucky = Math.min(95, lucky);

    return lucky;
}

/**
 * 公式サイトで「固定詠唱時間 - ◯%」と表記される固定詠唱時間の減少効果を取得する
 * TODO:
 * グローバル変数の n_A_Kotei_Cast_Keigen に格納した値を返しているので改善の余地がある
 * これを直接参照している他のファイルの定義を書き換えたうえでローカル変数を返すようにしたほうが良い
 * @returns {Number}
 */
export function getFixedCastTimeReductionRate() {
    set_n_A_Kotei_Cast_Keigen(0);
    // チェック用変数初期化
    // （固定詠唱短縮効果は、加算等はされず、最大の効果のみが適用される）
    // （なので、ITEM_SP 定義を検索してやる方法では、共通化ができない）
    let chkary = [0];
    let bufLv = 0;
    let itemCount = 0;
    let cardCountBody = 0;
    let cardCountShield = 0;
    let cardCountShoulder = 0;
    let cardCountShoes = 0;
    let cardCountAccessory1 = 0;
    let cardCountAccessory2 = 0;

    // ペット効果用
    const petId = n_A_PassSkill8[0];
    // 「暴食のオルレアンの制服」の
    if (EquipNumSearch(ITEM_ID_GLUTTONOUS_ORLEANS_UNIFORM)) {
		// 精錬値9以上の効果
        if (n_A_BODY_DEF_PLUS >= 9) {
            chkary.push(70);
        }
		// 超越段階が2以上の時、精錬値が10の時の効果
        if (n_A_BODY_DEF_Transcendence >= 2 && n_A_BODY_DEF_PLUS >= 10) {
            chkary.push(80);
        }
    }
    if (EquipNumSearch(ITEM_ID_MAGIA_VITA)) {
        // マギアヴィタを装備している時
        if (n_A_SHOES_DEF_PLUS === 10) {
            // 精錬値が10の時
            chkary.push(80);
        }
    }
    //----------------------------------------------------------------
    // 「ウォーロック　ラディウス」の効果
    //----------------------------------------------------------------
    if ((bufLv = Math.max(LearnedSkillSearch(SKILL_ID_RADIUS), UsedSkillSearch(SKILL_ID_RADIUS))) > 0) {
        switch (n_A_ActiveSkill) {
            case SKILL_ID_SOUL_EXPANSION:
            case SKILL_ID_FROST_MISTY:
            case SKILL_ID_JACK_FROST:
            case SKILL_ID_DRAIN_LIFE:
            case SKILL_ID_CRYMSON_ROCK:
            case SKILL_ID_HELL_INFERNO:
            case SKILL_ID_COMMET:
            case SKILL_ID_CHAIN_LIGHTNING:
            case SKILL_ID_EARTH_STRAIN:
            case SKILL_ID_TETRA_BOLTEX:
            case SKILL_ID_SUMMON_FIRE_BALL:
            case SKILL_ID_SUMMON_WATER_BALL:
            case SKILL_ID_SUMMON_LIGHTNING_BALL:
            case SKILL_ID_SUMMON_STONE:
                chkary.push(5 + 5 * bufLv);
        }
    }
    // ラフィネスタッフの精錬値による効果
    if (EquipNumSearchMIG(ITEM_ID_LAFINE_STUFF)) {
        chkary.push(n_A_Weapon_ATKplus);
    }
    //----------------------------------------------------------------
    // 「三次職支援　サクラメント」の効果
    //----------------------------------------------------------------
    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_SECRAMENT]) > 0) {
        // 特定の戦闘エリアでの補正
        switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
            case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
                chkary.push(65 + 5 * bufLv);
                break;
            default:
                chkary.push(45 + 5 * bufLv);
                break;
        }
    }

	/** 三次職支援設定「スイングダンス」の固定詠唱時間 - 効果 */
	if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_SWING_DANCE]) > 0) {
		// 固定詠唱はレッスンの影響を受けないと仮定した計算
		chkary.push(45 + 5 * bufLv);
	}

	/** 三次職支援設定「ダンスウィズウォーグ」の固定詠唱時間 - 効果 */
	if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG]) > 0) {
		chkary.push(45 + 5 * bufLv);
	}

    if (CardNumSearch(CARD_ID_ENCHANT_MATK_1_CAST_FIXED_1) || 
        CardNumSearch(CARD_ID_ENCHANT_MATK_2_CAST_FIXED_1) || 
        CardNumSearch(CARD_ID_ENCHANT_MATK_3_CAST_FIXED_1) || 
        CardNumSearch(CARD_ID_ENCHANT_MATK_2_CAST_FIXED_1_BUG)) {
        chkary.push(1);
    }

    if (CardNumSearch(CARD_ID_NYDHOGNO_KAGE) > 0) {
        // ハイウィザード系のみ
        if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_WIZARD) {
            if (n_A_JOB != JOB_ID_WIZARD) {
                chkary.push(50);
            }
        }
    }

    if (TimeItemNumSearch(TIME_ITEM_ID_RATATOSK_CAD)) {
        chkary.push(50);
    }

    if (EquipNumSearch(ITEM_ID_ITOSHISA_NO_KAKERA_AND_HEART_WING_HAIRBAND)) {
        chkary.push(10);
    }

    if (EquipNumSearch(ITEM_ID_LUXURY_MINI_CROWN)) {
        chkary.push(3);
    }

    //----------------------------------------------------------------
    // 「影狼・朧　十六夜」の効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_IZAYOI)) {
        chkary.push(100);
    }

    if (CardNumSearch(CARD_ID_FENRIR)) {
        chkary.push(70);
    }

    if (n_A_PassSkill7[51]) {
        chkary.push(50);
    }

    if (EquipNumSearch(ITEM_ID_RIOTCHIP)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「古びた魔力石の帽子」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_FURUBITA_MARYOKUSEKI)) {
        chkary.push(7 * n_A_HEAD_DEF_PLUS);
    }

    //----------------------------------------------------------------
    // 「サラのローブセット」の、＋７精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_SARANO_ROBE)) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「覚醒ローブセット」の、効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_KAKUSEI_ROBE)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「サバイバルオーブ　マントセット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_MANT)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「T_W_O カード」の、装備効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_T_W_O)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「セリーヌのブローチ　セリーヌのリボンセット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「セリーヌのブローチ　瑞々しいバラセット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「獄エンチャント」の、職業限定の効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_GOKU)) {
        if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「悪魔崇拝者の靴　堕天司祭の闇光外套セット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「炎雷魔女の大杖」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE) > 0) {
        if (n_A_Weapon_ATKplus >= 10) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「エンチャント　固定詠唱-50%」の、装備効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_ENCHANT_KOTEIEISHO_50)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「エンチャント　固定詠唱-70%」の、装備効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_ENCHANT_KOTEIEISHO_70)) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「抹消者のローブ」の、効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MASSHOSHANO_ROBE)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「神喰らいの龍槍」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KAMIKURAINO_RYUSO) > 0) {
        if (n_A_Weapon_ATKplus >= 10) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「抱きつきシャムネコ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_DAKITSUKI_SYAMNEKO)) > 0) {
        chkary.push(7 * n_A_HEAD_DEF_PLUS * itemCount);
    }

    //----------------------------------------------------------------
    // 「エンチャント　Z-CastFixed」の、装備効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_ENCHANT_Z_CASTFIXED)) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「アクエリアスダイアデム　アクエリアスセット」の、効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_AQUARIUS_DIADEM_AQUARIUS) > 0) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「古びた月食の装飾」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_FURUBITA_GESSHOKUNO_SOUSHOKU) > 0) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「月食の装飾」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GESSHOKUNO_SOUSHOKU) > 0) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            chkary.push(70);
        } else if (n_A_BODY_DEF_PLUS >= 7) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「イリュージョンアイズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ILLUSION_EYES) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HOWLING_OF_MANDRAGORA) >= 5) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「精霊王の宝冠」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SEREONO_HOKAN)) > 0) {
        chkary.push(7 * n_A_HEAD_DEF_PLUS * itemCount);
    }

    //----------------------------------------------------------------
    // 「グラデニェッツ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GRADENIETZ) > 0) {
        if (n_A_Weapon_ATKplus >= 10) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「もこもこお魚シューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MOKOMOKO_OSAKANA_SHOES) > 0) {
        if (LearnedSkillSearch(SKILL_ID_GROOMING) >= 5) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「パイシーズクラウン」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_PISCES_CROWN) > 0) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「天秤宮のシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_TENBINKYUNO_SHOES) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
                chkary.push(50);
            }
        }
    }

    //----------------------------------------------------------------
    // 「太極の耳飾り(黄)」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_ID_TAIKYOKUNO_MIMIKAZARI_KIIRO) > 0) {
        if (LearnedSkillSearch(SKILL_ID_TSUKINO_HIKARI) >= 5) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「エンチャント　Q-CastFixed」の、精錬による効果
    //----------------------------------------------------------------
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_Q_CAST_FIXED, CARD_REGION_ID_BODY_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_Q_CAST_FIXED, CARD_REGION_ID_SHIELD_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_Q_CAST_FIXED, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_Q_CAST_FIXED, CARD_REGION_ID_SHOES_ANY);
    cardCountAccessory1 = CardNumSearch(CARD_ID_ENCHANT_Q_CAST_FIXED, CARD_REGION_ID_ACCESSORY_1_ANY);
    cardCountAccessory2 = CardNumSearch(CARD_ID_ENCHANT_Q_CAST_FIXED, CARD_REGION_ID_ACCESSORY_2_ANY);

    if (cardCountBody > 0) {
        if (n_A_BODY_DEF_PLUS >= 8) {
            chkary.push(60);
        } else if (n_A_BODY_DEF_PLUS >= 6) {
            chkary.push(40);
        } else {
            chkary.push(20);
        }
    }

    if (cardCountShield > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            chkary.push(60);
        } else if (n_A_SHIELD_DEF_PLUS >= 6) {
            chkary.push(40);
        } else {
            chkary.push(20);
        }
    }

    if (cardCountShoulder > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            chkary.push(60);
        } else if (n_A_SHOULDER_DEF_PLUS >= 6) {
            chkary.push(40);
        } else {
            chkary.push(20);
        }
    }

    if (cardCountShoes > 0) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            chkary.push(60);
        } else if (n_A_SHOES_DEF_PLUS >= 6) {
            chkary.push(40);
        } else {
            chkary.push(20);
        }
    }

    if (cardCountAccessory1 > 0) {
        // 精錬不可なので 20% 一択
        chkary.push(20);
    }

    if (cardCountAccessory2 > 0) {
        // 精錬不可なので 20% 一択
        chkary.push(20);
    }

    //----------------------------------------------------------------
    // 「リングオブヴィーナス」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_1) > 0) {
        if (SU_DEX >= 125) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「森羅万象の指輪　真理の解放セット」の、効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_SHINRINO_KAIHO) > 0) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「新暦　暴走した魔力セット」の、効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_SHINREKI_BOSOSHITA_MARYOKU) > 0) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「レインボースター」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_RAINBOW_STAR) > 0) {
        if (LearnedSkillSearch(SKILL_ID_UNLIMIT) >= 5) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「アルカナ　月のカードセット」の、効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_MOON_REVERSE) > 0) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「デウス・エクス・マキナ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_DEUS_EX_MACHINA) > 0) {
        if (n_A_Weapon_ATKplus >= 10) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「ゲートオブネザーワールド」の、精錬による効果
    //----------------------------------------------------------------
    itemCount = Math.max(
        EquipNumSearch(ITEM_ID_GATE_OF_NEZAR_WORLD),
        EquipNumSearch(ITEM_ID_GATE_OF_NEZAR_WORLD_T1)
    );
    if (itemCount > 0) {
        if (n_A_HEAD_DEF_PLUS >= 9) {
            chkary.push(70);
        } else if (n_A_HEAD_DEF_PLUS >= 7) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「ルーングリーブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_RUNE_GREEVE) > 0) {
        if (LearnedSkillSearch(SKILL_ID_PHANTOM_SLAST) >= 5) {
            chkary.push(50);
        }
    }

    //----------------------------------------------------------------
    // 「ポルックスシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_POLLUX_SHOES) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
                chkary.push(60);
            }
        }
    }

    //----------------------------------------------------------------
    // 「プロキオンシューズ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_PROCYON_SHOES) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 8) {
            if (IsSameJobClass(JOB_ID_SOUL_REAPER)) {
                chkary.push(60);
            }
        }
    }

    //----------------------------------------------------------------
    // 「変貌のカーリッツバーグカード」の、精錬による強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_HENBONO_KHALITZBURG)) {
        chkary.push(50);
    }
    if (CardNumSearch(CARD_ID_HENBONO_KHALITZBURG, CARD_REGION_ID_HEAD_TOP)) {
        if (n_A_HEAD_DEF_PLUS >= 9) {
            chkary.push(60);
        }
    }

    //----------------------------------------------------------------
    // 「ぶくぶくハンティングゴーグル」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_BUKUBUKU_HUNTING_GOOGLE) > 0) {
        if (LearnedSkillSearch(SKILL_ID_GROOMING) >= 5) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「英雄の凱歌　ニーズヘッグの影カードセット」の、職業による強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_NYDHOGNO_KAGE) > 0) {
        // ハイウィザード系のみ
        if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_WIZARD) {
            if (n_A_JOB != JOB_ID_WIZARD) {
                chkary.push(70);
            }
        }
    }

	// 兜中段に装備した「傲慢なクロウバロンカード」による固定詠唱-70%
	if (CardNumSearch(CARD_ID_PRIDE_CROW_BARON, CARD_REGION_ID_HEAD_TOP) > 0) {
        chkary.push(70);
	}

    //----------------------------------------------------------------
    // 「英雄の凱歌　フェンリルカードセット」の、職業による強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FENRIR) > 0) {
        chkary.push(80);
    }

	if (n_A_HEAD_DEF_Transcendence > 0) {
		// ブラッディスラッシャー の超越効果
		if (CardNumSearch(CARD_ID_BLOODY_SLASHER) > 0) {
			chkary.push(70);
		}
		// シャイディエスト の超越効果
		if (CardNumSearch(CARD_ID_SHADIEST) > 0) {
			chkary.push(70);
		}
	}

    //----------------------------------------------------------------
    // 「黒翼の使徒」エンチャントの、時限効果による強化
    //----------------------------------------------------------------
    if (TimeItemNumSearch(TIME_ITEM_ID_KOKUYOKUNO_SHITO)) {
        chkary.push(100);
    }

    //----------------------------------------------------------------
    // 「知識の探求者　T_W_Oカードセット」の、効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_T_W_O) > 0) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「ミステリーウィング」の、素ステータスによる効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_ID_MYSTERY_WING) > 0) {
        if (GetTotalPureBasicStatus() >= 500) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「エンチャント　ウルフオーブ(固定詠唱時間-50%)」の、装備効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_ENCHANT_WOLF_ORB_CAST_FIXED_50)) {
        chkary.push(50);
    }

    /**
     * 「セレスティアルダイアデム」の「固定詠唱時間-50%」効果
     */
    if (EquipNumSearch(ITEM_ID_CELESTIAL_DIADEM) > 0) {
        chkary.push(50);
    }

    //----------------------------------------------------------------
    // 「ワイルドビースト　エンチャント　ウルフオーブ(固定詠唱時間-50%)セット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_CAST_FIXED_50)) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「未知なる魔力のブーツ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MICHINARU_MARYOKUNO_BOOTS) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「メンタルコンデンサー　マジックプロテクターローブセット」の効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_MENTAL_CONDENSER_MAGIC_PROTECTOR_ROBE) > 0) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「雪花防具（魔法）セット」の効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SETSUKA_ARMORS_MAGICAL) > 0) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「セトの恩寵＋異境の統轄者セット」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_SET_ID_SETONO_ONCHO_IKYONO_TOKATSUSHA)) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「ミストレスの卵」の、装備効果
    //----------------------------------------------------------------
    if (petId === PET_ID_MISTRESS) {
        if (n_A_BaseLV >= 100) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「秘密の羽・レイジー」カードの、装備効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_HIMITSU_NO_HANE_LEIZI)) {
        chkary.push(70);
    }

    //----------------------------------------------------------------
    // 「グラキエースアラネア」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_ID_GLACIES_ARANEA)) {
        if (n_A_SHIELD_DEF_PLUS >= 7) {
            chkary.push(70);
        }
    }

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    const confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_CAST_DOWN_FIXED);
    if (confval != 0) {
        chkary.push(confval);
    }


    // 最大値のみ有効
    set_n_A_Kotei_Cast_Keigen(Math.max(...chkary));

    /**
     * プレイヤー状態異常「氷結」の効果
     */
    if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_FREEZING]) {
        set_n_A_Kotei_Cast_Keigen(n_A_Kotei_Cast_Keigen - 50);
    }

    return n_A_Kotei_Cast_Keigen;
}

/**
 * キャラクタの基礎値に加えて
 * 公式サイトで「Flee - ◯」と表記されるFLEEの増加効果を適用した
 * 最終的なFLEEの値を取得する
 * @returns {Number} 
 */
export function getFlee() {
	var idx, sklLv = 0, confval = 0, itemCount = 0, cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	let vartmp = 0;
	let prefetch = 0;
    let flee = 0;

    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (idx = ITEM_SP_FLEE_PLUS; idx <= ITEM_SP_FLEE_PLUS; idx++) {
        n_tok[idx] += GetRndOptTotalValue(idx, null, false);
    }

    // TODO: 四次対応
    for (idx = ITEM_SP_FLEE_PLUS; idx <= ITEM_SP_FLEE_PLUS; idx++) {
        n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
    }

    flee += n_tok[ITEM_SP_FLEE_PLUS];

    if (GetLowerJobSeriesID(n_A_JOB) == 2 && CardNumSearch(CARD_ID_SAMAYOU_MONO)) {
        flee += 20;
    }
    if (n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(CARD_ID_KUMIHO)) {
        flee += 20;
    }
    if (n_A_SHOULDER_DEF_PLUS <= 4 && CardNumSearch(CARD_ID_KAVAC_ICARUS)) {
        flee += 10;
    }
    if (n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(CARD_ID_ORC_BABY)) {
        flee += 5;
    }
    if (SU_STR >= 90 && EquipNumSearch(ITEM_ID_TOZOKUNO_YUBIWA)) {
        flee += 10 * EquipNumSearch(ITEM_ID_TOZOKUNO_YUBIWA);
    }
    if (EquipNumSearch(ITEM_ID_SAMAYOUMONO_NO_KASA)) {
        if (n_A_HEAD_DEF_PLUS >= 5) {
            flee += 5;
        }
        if (n_A_HEAD_DEF_PLUS >= 7) {
            flee += 2;
        }
    }
    if (SU_AGI >= 120 && EquipNumSearch(ITEM_ID_SHADOW_CROWN)) {
        flee += 3;
    }
    if (SU_INT >= 120 && EquipNumSearch(ITEM_ID_KAZE_NO_SASAYAKI)) {
        flee += 3;
    }
    if (EquipNumSearch(ITEM_ID_SHUZINNO_FUKU)) {
        flee += n_A_BODY_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「二次職支援　属性場　バイオレントゲイル」の、効果
    //----------------------------------------------------------------
    if (g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI] == CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VIOLENT_GALE &&
        g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL] >= 1) {
        flee += g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL] * 3;
    }

    if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_BLOODY_ROAR) {
        flee -= (n_A_BaseLV + SU_AGI);
    }
    if (n_A_BaseLV <= 79 && EquipNumSearch(ITEM_ID_TOY_SHIELD)) {
        flee += 5;
    }
    if (SU_AGI >= 80 && EquipNumSearch(ITEM_ID_SENTEHISSHONO_OMAMORI)) {
        let wx = EquipNumSearch(ITEM_ID_SENTEHISSHONO_OMAMORI);
        flee += 4 * wx;
        if (SU_AGI >= 100) {
            flee += 1 * wx;
        }
    }
    if (n_A_SHOULDER_DEF_PLUS >= 6 && EquipNumSearch(ITEM_ID_FUROSHIKI_MANT)) {
        flee += 2;
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            flee += 3;
        }
    }
    if (n_A_SHOULDER_DEF_PLUS >= 1 && EquipNumSearch(ITEM_ID_NABUNO_HOOD)) {
        flee += n_A_SHOULDER_DEF_PLUS * 2;
    }
    if (n_A_BODY_DEF_PLUS >= 1 && EquipNumSearch(ITEM_ID_SHIRAHANO_SUIT)) {
        flee += n_A_BODY_DEF_PLUS;
    }
    if (EquipNumSearch(ITEM_ID_SHUNBINNO_GLOVE)) {
        flee += ROUNDDOWN(SU_AGI / 10) * EquipNumSearch(ITEM_ID_SHUNBINNO_GLOVE);
    }
    if (n_A_SHOULDER_DEF_PLUS >= 9 && EquipNumSearch(ITEM_SET_ID_HIGHLEVEL_ORCBABY)) {
        flee += 5;
    }
    if (SU_VIT >= 110) {
        if (CardNumSearch(CARD_ID_ARFOSIO_BASIL_MVP)) {
            flee += 20;
        }
        if (CardNumSearch(CARD_ID_TRENTINI_MVP)) {
            flee += 20;
        }
    }
    if (EquipNumSearch(ITEM_ID_EXELION_WING)) {
        flee += 2 * n_A_SHOULDER_DEF_PLUS;
    }
    if (n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_NABUNO_CLOTH)) {
        flee += 15;
    }
    if (EquipNumSearch(ITEM_ID_PUMPKIN_HAT_2010)) {
        if (EquipNumSearch(ITEM_ID_OPERA_MASK)) {
            flee += 20;
        }
    }

    //----------------------------------------------------------------
    // 「英雄マント」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_EIYU_MANT)) {
        flee += 3 * ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 3);
        if (n_A_SHOULDER_DEF_PLUS >= 10) {
            flee += 20;
        }
    }

    //----------------------------------------------------------------
    // 「霧の妖刀」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_KIRINO_YOTO, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_KIRINO_YOTO, EQUIP_REGION_ID_ARMS_LEFT);
    if (itemCountRight > 0) {
        if (n_A_Weapon_ATKplus >= 7) {
            flee += 20;
        }
        if (n_A_Weapon_ATKplus >= 9) {
            flee += 20;
        }
    }
    if (itemCountLeft > 0) {
        if (n_A_Weapon2_ATKplus >= 7) {
            flee += 20;
        }
        if (n_A_Weapon2_ATKplus >= 9) {
            flee += 20;
        }
    }

    //----------------------------------------------------------------
    // 「A-FLEE　ライオットチップセット」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_RIOTCHIP_A_FLEE)) {
        flee += 5 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 3);
    }

    //----------------------------------------------------------------
    // 「皇竜の天翼」の、職業による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
        if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_THIEF) {
            flee += 10;
        }
    }

    //----------------------------------------------------------------
    // 「セイヴザキング」の、騎兵修練【未習得】時における、「スピアクイッケン」習得による効果
    //----------------------------------------------------------------
    if (LearnedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
        if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) {
            flee += 2 * LearnedSkillSearch(SKILL_ID_SPEAR_QUICKEN);
        }
    }

    //----------------------------------------------------------------
    // 「陣羽織」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ZINBAORI) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            flee += 10;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            flee += 10;
        }
    }

    //----------------------------------------------------------------
    // 「物影」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MONOKAGE)) > 0) {
        flee += 5 * LearnedSkillSearch(SKILL_ID_KASUMIGIRI) * itemCount;
    }

    //----------------------------------------------------------------
    // 「自警団の弓」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZIKEIDANNO_YUMI)) > 0) {
        if (n_A_Weapon_ATKplus >= 9) {
            flee += 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「用心棒のスカーフ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            flee += 20;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            flee += 20;
        }
    }

    //----------------------------------------------------------------
    // 「名も無き剣士のブーツ　イグニゼム＝セニア（ＭＶＰ）カードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_IGNISEM_CENIA_MVP)) > 0) {
        if (n_A_BaseLV <= 99) {
            flee += 5 * n_A_SHOES_DEF_PLUS * itemCount;
        } else {
            flee += 15 * n_A_SHOES_DEF_PLUS * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ジェネティックエミュール(MVP)カード」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_GENETIC_EMUR_MVP)) > 0) {
        if (IsSameJobClass(JOB_ID_GENETIC)) {
            flee += 20 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「名誉のニーヴ(回避)」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_ARMS_LEFT_ANY);
    cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_HEAD_TOP_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_SHIELD_ANY);
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_BODY_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI, CARD_REGION_ID_SHOES_ANY);
    if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield +
        cardCountBody + cardCountShoulder + cardCountShoes > 0) {

        // 右手武器へのエンチャント
        let vartmp = 0;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 10;
        if (n_A_Weapon_ATKplus >= 9) vartmp += 10;
        flee += vartmp * cardCountRight

        // 左手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 10;
        if (n_A_Weapon2_ATKplus >= 9) vartmp += 10;
        flee += vartmp * cardCountLeft

        // 頭防具へのエンチャント
        vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 10;
        if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 10;
        flee += vartmp * cardCountHeadTop

        // 盾防具へのエンチャント
        vartmp = 0;
        if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 10;
        if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 10;
        flee += vartmp * cardCountShield

        // 体防具へのエンチャント
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 10;
        flee += vartmp * cardCountBody

        // 肩防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 10;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;
        flee += vartmp * cardCountShoulder

        // 靴防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 10;
        flee += vartmp * cardCountShoes

        // アクセサリへのエンチャント
        // 精錬できないので処理不要
    }

    //----------------------------------------------------------------
    // 「カプリコーン」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_CAPRICORN, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
        if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
            flee += 5 * n_A_HEAD_DEF_PLUS * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「ヘヴンリーオーダー」の、素ＡＧＩによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
        flee += 2 * Math.floor(SU_AGI / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「フロンティアブーツ　自警団の弓セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            if (SU_INT >= 120) {
                flee += 100 * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「追撃者のシューズ」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_SHOES)) > 0) {
        flee += 4 * LearnedSkillSearch(SKILL_ID_ESCAPE) * itemCount;
        flee += 4 * LearnedSkillSearch(SKILL_ID_FATAL_MENUS) * itemCount;
        flee += 4 * LearnedSkillSearch(SKILL_ID_FAINT_BOMB) * itemCount;
    }

    //----------------------------------------------------------------
    // 「下水クランプカード」の、素ＩＮＴによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_GESUI_CLAMP)) > 0) {
        flee += 3 * Math.floor(SU_INT / 10) * cardCount;
    }

    //----------------------------------------------------------------
    // 「身かわしのケープ」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MIKAWASHINO_CAPE)) > 0) {
        flee += 10 * LearnedSkillSearch(SKILL_ID_SECRAMENT) * itemCount;
    }

    //----------------------------------------------------------------
    // 「辰戌の腕輪」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_TATSUINUNO_UDEWA)) > 0) {
        flee += 10 * LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) * itemCount;
    }

    //----------------------------------------------------------------
    // 「インペリアルメナススーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MENUS_SUIT)) > 0) {
        flee += 5 * LearnedSkillSearch(SKILL_ID_ESCAPE) * itemCount;
    }

    //----------------------------------------------------------------
    // 「グレースメナススーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MENUS_SUIT)) > 0) {
        flee += 10 * LearnedSkillSearch(SKILL_ID_ESCAPE) * itemCount;
    }

    //----------------------------------------------------------------
    // 「剛勇無双の神輿」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GOYUMUSONO_MIKOSHI)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            if (LearnedSkillSearch(SKILL_ID_SHUCHURYOKU_KOZYO) >= 10) {
                flee += 50 * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「インペリアルレインストームスーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_RAINSTORM_SUIT)) > 0) {
        flee += 3 * LearnedSkillSearch(SKILL_ID_ENDLESS_HUMMING_VOICE) * itemCount;
    }

    //----------------------------------------------------------------
    // 「グレースレインストームスーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_RAINSTORM_SUIT)) > 0) {
        flee += 10 * LearnedSkillSearch(SKILL_ID_ENDLESS_HUMMING_VOICE) * itemCount;
    }

    //----------------------------------------------------------------
    // 「懐郷のサクラ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAIKYONO_SAKURA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_TSUKINO_HIKARI) >= 5) {
            if (LearnedSkillSearch(SKILL_ID_TSUKINO_KAMAE) >= 3) {
                flee += 50 * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「名も無き剣士のブーツ　封印されたイグニゼム＝セニア（ＭＶＰ）カードセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_FUINSARETA_IGNISEM_CENIA_MVP)) > 0) {
        if (n_A_BaseLV <= 99) {
            flee += 2 * n_A_SHOES_DEF_PLUS * itemCount;
        } else {
            flee += 5 * n_A_SHOES_DEF_PLUS * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「イージスシステム」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AEGIS_SYSTEM)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            if (LearnedSkillSearch(SKILL_ID_CLOAKING) >= 3) {
                flee += 100 * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「デスブリンガー」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_DEATH_BRINGER)) > 0) {
        flee += 20 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * itemCount;
    }

    //----------------------------------------------------------------
    // 基礎補正
    //----------------------------------------------------------------
    flee += 100 + n_A_BaseLV + n_A_AGI + Math.floor(n_A_LUK / 5);

	/** 二次職支援設定「口笛」の効果 */
	if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_WHISTLE]) > 0) {
	    flee += 50 + 5 * sklLv;
	}

    //----------------------------------------------------------------
    // 「三次職支援　グルーミング/のどを鳴らす」の効果
    //----------------------------------------------------------------
    flee += 10 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_GROOMING];

    //----------------------------------------------------------------
    // 「サモナー　生命の力」の、効果
    //----------------------------------------------------------------
    if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA), UsedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA)) > 0) {
        flee += 50;
    }

    //----------------------------------------------------------------
    // 「シーフ　回避率増加」の、効果
    //----------------------------------------------------------------
    if ([JOB_SERIES_ID_ASSASIN, JOB_SERIES_ID_ROGUE].indexOf(GetHigherJobSeriesID(n_A_JOB)) >= 0) {
        flee += 4 * Math.max(LearnedSkillSearch(SKILL_ID_KAIHIRITSU_ZOKA), UsedSkillSearch(SKILL_ID_KAIHIRITSU_ZOKA));
    } else {
        flee += 3 * Math.max(LearnedSkillSearch(SKILL_ID_KAIHIRITSU_ZOKA), UsedSkillSearch(SKILL_ID_KAIHIRITSU_ZOKA));
    }

    //----------------------------------------------------------------
    // 「ガンスリンガー　アジャストメント」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_ADJUSTMENT)) > 0) {
        flee += 30;
    }

    //----------------------------------------------------------------
    // 「ガンスリンガー　ガトリングフィーバー」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_GATLING_FEVER)) > 0) {
        if ((n_A_WeaponType == ITEM_KIND_GATLINGGUN) || (n_A_WeaponType == ITEM_KIND_NONE)) {
            flee -= 5 * sklLv;
        }
    }

    //----------------------------------------------------------------
    // 「モンク　見切り」の、効果
    //----------------------------------------------------------------
    if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_MIKIRI), UsedSkillSearch(SKILL_ID_MIKIRI))) > 0) {
        flee += Math.floor(1.5 * sklLv);
    }

    //----------------------------------------------------------------
    // 「スナイパー　ウィンドウォーク」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_WIND_WALK)) > 0) {
        flee += Math.round(sklLv / 2);
    } else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_WIND_WALK]) > 0) {
        flee += Math.round(sklLv / 2);
    }

    //----------------------------------------------------------------
    // 「クルセイダー　スピアクイッケン」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_SPEAR_QUICKEN)) > 0) {
        if ((n_A_WeaponType == ITEM_KIND_SPEAR) || (n_A_WeaponType == ITEM_KIND_SPEAR_2HAND)) {
            flee += sklLv * 2;
        }
    }

    //----------------------------------------------------------------
    // 「ソーサラー　精霊サポートスキル　風１Ｄウィンドステップ」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) == 20) {
        flee += 10;
    }

    //----------------------------------------------------------------
    // 「ソーサラー　精霊サポートスキル　風３Ｄゼファー」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) == 26) {
        flee += 25;
    }

    //----------------------------------------------------------------
    // 「ソーサラー　精霊サポートスキル　水３Ｄウォーターバリア」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) == 17) {
        flee -= 30;
    }

    //----------------------------------------------------------------
    // 「ローグ　クローズコンファイン」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_CLOSE_CONFINE)) > 0) {
        flee += 10;
    } else if (g_confDataNizi[CCharaConfNizi.CONF_ID_CLOSE_CONFINE] > 0) {
        flee += 10;
    }

    //----------------------------------------------------------------
    // 「拳聖　月の安楽」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_TSUKINO_ANRAKU)) > 0) {
        switch (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI)) {
            case 1: // 今日の日付
                let today = (new Date()).getDate();
                if (today % 2 == 0) break; // 月の日ではない（偶数）
            case 0: // 無条件発動
            case 3: // 月の日
                flee += Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 10);
        }
    }

    //----------------------------------------------------------------
    // 「ギロチンクロス　ハルシネーションウォーク」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_HALLUCINATION_WALK)) > 0) {
        flee += 50 * sklLv;
    }

	/** ドルイド「プリーニング」による Flee + 効果 */
	flee += 10 * UsedSkillSearch(SKILL_ID_PREENING);

	// その他未整理
    if (n_A_PassSkill4[9]) flee += 50;

    if (n_A_PassSkill7[1]) flee += 30;
    else if (n_A_PassSkill7[27]) flee += 20;
    else if (n_A_PassSkill7[36]) flee += 10;
    else if (3 <= n_A_PassSkill8[22] && n_A_PassSkill8[22] <= 4) flee += 10;

    if (0 < n_A_PassSkill7[45] && n_A_PassSkill7[45] <= 50) flee += n_A_PassSkill7[45];

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_FLEE_PLUS);
    if (confval != 0) {
        flee += confval;
    }

    //================================
    // 以下、計算順注意
    //================================

    //----------------------------------------------------------------
    // 「ロードナイト　バーサーク」の、効果（ペナルティ）
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_BERSERK)) > 0) {
        flee /= 2;
    }

    //----------------------------------------------------------------
    // 「Ｓホム　オーバードブースト」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_OVERED_BOOST)) > 0) {
        flee = 300 + 40 * sklLv;
    }

    // 囲んでいる敵の数っぽい
    if (n_A_PassSkill8[12] >= 3) {
        var w = n_A_PassSkill8[12] - 2;
        if (w > 10) w = 10;
        flee -= Math.floor(flee * w * 10 / 100);
    }

	/**
	 * プレイヤー状態異常「メランコリー」の効果
	 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_GLOOMYDAY] > 0) {
		flee -= (20 + 30 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_GLOOMYDAY]);
	}

	/**
	 * プレイヤー状態異常「狂乱」の効果（マイナスを許容）
	 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_SATURDAY_NIGHT_FEVER] > 0) {
		flee -= (20 + 30 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_SATURDAY_NIGHT_FEVER]);
	}

	/**
	 * プレイヤー状態異常「暗黒」の効果（固定値ではなく割合減少）
	 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_DARKNESS] > 0) {
		flee = Math.floor(flee * 0.75);
	}

    //----------------------------------------------------------------
    // 計算した結果をキャラクターデータに保存
    //----------------------------------------------------------------
    return Math.max(0, flee);
}

