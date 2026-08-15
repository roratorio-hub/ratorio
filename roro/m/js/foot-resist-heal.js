/**
 * 状態異常耐性・属性耐性・HP回復力の各適用関数。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { n_A_PassSkill7 } from '../../../ro4/m/js/BuffItemAndFood.js';
import { UsedSkillSearch } from '../../../ro4/m/js/BuffJobSpecificSelf.js';
import { n_A_PassSkill8 } from '../../../ro4/m/js/BuffOtherCategory.js';
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_ACOLYTE, JOB_SERIES_ID_ARCHER,
    JOB_SERIES_ID_CRUSADER, JOB_SERIES_ID_GUNSLINGER, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_MERCHANT,
    JOB_SERIES_ID_NINJA, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_TAEGKUON, JOB_SERIES_ID_THIEF
} from '../../../ro4/m/js/data/mig.job.h.js';
import {
    g_confDataNizi, g_confDataSanzi, g_objCharaConfCustomDef, g_objCharaConfCustomSkill
} from '../../../ro4/m/js/global.js';
import { ApplySpecModify } from '../../../ro4/m/js/hmjob.js';
import { n_A_Arrow, n_A_BaseLV, n_tok } from '../../../ro4/m/js/ro4-state.js';
import { CCharaConfCustomDef } from './CCharaConfCustomDef.js';
import { CCharaConfCustomSkill } from './CCharaConfCustomSkill.js';
import { CCharaConfNizi } from './CCharaConfNizi.js';
import { CCharaConfSanzi } from './CCharaConfSanzi.js';
import {
    ARROW_ID_GANSEKINO_YA, ARROW_ID_GINNO_YA, ARROW_ID_HONOONO_YA, ARROW_ID_KAZENO_YA, ARROW_ID_MUKEINO_YA,
    ARROW_ID_SABITA_YA, ARROW_ID_SUISHONO_YA
} from './arrow.dat.js';
import {
    CARD_ID_ARCH_BISHOP_MARGARETTE_MVP, CARD_ID_ASH_HOPPER, CARD_ID_DARK_FACEWORM, CARD_ID_DEAD_SERA,
    CARD_ID_ECO_MINIY_DO_ARMA, CARD_ID_ENCHANT_R_SAINT, CARD_ID_ENCHANT_SACRED, CARD_ID_EXTRA_JORKER,
    CARD_ID_HOSOSARENAKATTA_NINGYO, CARD_ID_ICEBEAR, CARD_ID_ICE_FUNAMUSHI, CARD_ID_INFINITE2_ECLIPSE,
    CARD_ID_JITTER_BUG, CARD_ID_LOOKIE, CARD_ID_MAGANNO_AMDARAIS, CARD_ID_MAYONAKANO_YUMEHIME,
    CARD_ID_MUGENNO_ECLIPSE, CARD_ID_REGINLEIF, CARD_ID_VIRGO, CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_FEAR,
    CARD_SET_ID_PRIDE_THANATOS_HORROR_EIYU, CARD_SET_ID_PRIDE_THANATOS_RESENT_EIYU
} from './card.dat.js';
import { CardNumSearch, CostumeNumSearch, EquipNumSearch, EquipNumSearchMIG } from './chara.js';
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY
} from './common.js';
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from './const/EnumEquipRegionId.js';
import {
    ITEM_SP_HEAL_UP_USED, ITEM_SP_HEAL_UP_USING, ITEM_SP_HEAL_UP_USING_GVGTE, ITEM_SP_HEAL_UP_USING_ONLY_HEAL,
    ITEM_SP_HEAL_UP_USING_ONLY_HEAL_SERIES, ITEM_SP_RESIST_ELM_ALL, ITEM_SP_RESIST_ELM_DARK,
    ITEM_SP_RESIST_ELM_EARTH, ITEM_SP_RESIST_ELM_FIRE, ITEM_SP_RESIST_ELM_HOLY, ITEM_SP_RESIST_ELM_POISON,
    ITEM_SP_RESIST_ELM_PSYCO, ITEM_SP_RESIST_ELM_UNDEAD, ITEM_SP_RESIST_ELM_VANITY, ITEM_SP_RESIST_ELM_WATER,
    ITEM_SP_RESIST_ELM_WIND, ITEM_SP_RESIST_FROZEN_GVGTE, ITEM_SP_RESIST_STATE_BLEEDING, ITEM_SP_RESIST_STATE_BLIND,
    ITEM_SP_RESIST_STATE_CONFUSE, ITEM_SP_RESIST_STATE_CURSED, ITEM_SP_RESIST_STATE_FROZEN,
    ITEM_SP_RESIST_STATE_POISON, ITEM_SP_RESIST_STATE_SILENCE, ITEM_SP_RESIST_STATE_SLEEP,
    ITEM_SP_RESIST_STATE_STONE, ITEM_SP_RESIST_STATE_STUN
} from './const/EnumItemSpId.js';
import { JOB_ID_ARCBISHOP, JOB_ID_MINSTREL, JOB_ID_WANDERER } from './const/EnumJobId.js';
import { COSTUME_ID_BEGINNER_BO } from './costume.dat.js';
import { GetRndOptTotalValue } from './hmrndopt.js';
import {
    ITEM_ID_AMAZING_GRACE, ITEM_ID_ANEMOS_SHIELD, ITEM_ID_AVARECO, ITEM_ID_BLACK_MITHRIL_GUARD,
    ITEM_ID_BOINO_MUFFLER, ITEM_ID_CHAPUCHAPU_NYANPU_HAT, ITEM_ID_DATENSHISAINO_ANKOUGAITO, ITEM_ID_DIVA_BOOK,
    ITEM_ID_DIVA_FOXTAIL, ITEM_ID_DIVA_STUFF, ITEM_ID_DIVA_WAND, ITEM_ID_DIVID_SHIELD, ITEM_ID_EIYU_MANT,
    ITEM_ID_ERYMANTHNO_KAWA, ITEM_ID_FUWAFUWA_TANPOPO_SHOES, ITEM_ID_GAIA_SHIELD, ITEM_ID_GEMINIS58NO_ME,
    ITEM_ID_GEMINIS58NO_ME_AKA, ITEM_ID_GLOTONERIA, ITEM_ID_GODS_ARMOR, ITEM_ID_GODS_HELM, ITEM_ID_GODS_SHIELD,
    ITEM_ID_GOOGLE_HAT, ITEM_ID_GRACE_HOLY_ROBE, ITEM_ID_GUARDIAN_OF_SOUL, ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI,
    ITEM_ID_ILLUSION_KANGOBO, ITEM_ID_ILLUSION_URAGIRIMONO, ITEM_ID_ILUSION_SHIELD_1, ITEM_ID_ILUSION_WING_1,
    ITEM_ID_ILUSION_WING_2, ITEM_ID_IMPERIAL_HOLY_ROBE, ITEM_ID_KAWAII_KUSANO_NECKLACE, ITEM_ID_KINKINO_MADOSHO,
    ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER, ITEM_ID_KOREIZYUTSUSHINO_GAITO, ITEM_ID_KOREZYUTSUSHINO_TEKAGAMI,
    ITEM_ID_KORYUNO_TENYOKU, ITEM_ID_MAD_HATTER, ITEM_ID_MAHOSEKINO_ONKE, ITEM_ID_MARAN_KAIZOKUDANBO,
    ITEM_ID_MAZYUNO_MANT, ITEM_ID_MIKAWASHINO_CAPE, ITEM_ID_MIRRORAGE_BOOK, ITEM_ID_MIRRORAGE_FOXTAIL,
    ITEM_ID_MIRRORAGE_STUFF, ITEM_ID_MIRRORAGE_WAND, ITEM_ID_MOKOMOKO_OSAKANA_SHOES,
    ITEM_ID_NAGAI_KAIFUKUNO_NEKOZYARASHI, ITEM_ID_NIZIIRONO_MUFFLER, ITEM_ID_NIZIIRONO_SCARF,
    ITEM_ID_NIZIIRONO_TSUBASA, ITEM_ID_RING_OF_VENUS, ITEM_ID_RUDONO_ROLLPAPER, ITEM_ID_SAVE_THE_KING,
    ITEM_ID_SEINARU_HAKUI, ITEM_ID_SEKKANO_MANT, ITEM_ID_SEKKANO_MUFFLER, ITEM_ID_SHITENSHINO_HANAKANMURI,
    ITEM_ID_SHUKUSEINO_KUTSU, ITEM_ID_SOHIONNO_HAGOROMO, ITEM_ID_SPUNTA_ARLMATI, ITEM_ID_STICK_CANDY_ROD,
    ITEM_ID_SUHAINO_YUBIWA, ITEM_ID_TATSUZINNO_TSUCHI, ITEM_ID_TATSUZINNO_TSUCHI_S2, ITEM_ID_TAURUS_HAT,
    ITEM_ID_TOKUSEN_AZINO_OMAMORI, ITEM_ID_TONBOGA_TOMATTA_KIROI_NEKOZYARASHI, ITEM_ID_UNICORNNO_KABUTO,
    ITEM_ID_YOGANNO_MANT, ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP, ITEM_ID_ZYUNREISHANO_KUTSU,
    ITEM_SET_ID_AEGIR_RING_AEGIR_ARMOR, ITEM_SET_ID_AEGIR_RING_AEGIR_MANT,
    ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO, ITEM_SET_ID_ANSONINO_FUKU_ANSONI_CARD,
    ITEM_SET_ID_BOTONO_SCARF_GLASS, ITEM_SET_ID_BOTONO_SCARF_SUNGLASS, ITEM_SET_ID_CARDYUINO_HOI_ANGELRING,
    ITEM_SET_ID_DEVILCH_HEADPHONE_PET, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE,
    ITEM_SET_ID_EINHERJERNO_YOROI_EVIL_DRUID_CARD, ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_ENGINE,
    ITEM_SET_ID_GUARDIAN_SET, ITEM_SET_ID_IKOKUNO_DENTO_BOSHI_FUINSARTA_PEKUSOZIN,
    ITEM_SET_ID_IKOKUNO_DENTO_BOSHI_PEKUSOZIN, ITEM_SET_ID_ILUSION_WING_1_SUIT_1, ITEM_SET_ID_ILUSION_WING_2_SUIT_2,
    ITEM_SET_ID_KINGS_MAIL_KINGS_GUARD, ITEM_SET_ID_ROSARIONO_KUBIKAZARI_SEISHOKUSHANO_KANGOBO,
    ITEM_SET_ID_RUDONO_KUROI_HANE_RUDONO_ROLLPAPER, ITEM_SET_ID_RYUGOROSHINO_CHOKEN_RANDGRIS_CARD,
    ITEM_SET_ID_SEINARU_HAKUI_ARGIOPE, ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI,
    ITEM_SET_ID_SOHIONNO_KODACHI_SOHIONNO_HAGOROMO, ITEM_SET_ID_SPIRITUAL_CLOTH_ECLIPSE_CARD,
    ITEM_SET_ID_STRONG_SHIELD_JUSOHOHEI_NO_KABUTO, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_MANT,
    ITEM_SET_ID_YUSHANOIKARI_ORCISH_AXE_ORCISH_SWORD
} from './item.dat.js';
import { LearnedSkillSearch } from './learnedskill.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_GVG, MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, n_B_TAISEI
} from './mobconfplayer.js';
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB,
    n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus,
    n_A_card
} from './roro-state.js';
import {
    SERE_SUPPORT_SKILL_ID_CRYSTAL_ARMOR, SERE_SUPPORT_SKILL_ID_EYES_OF_STORM, SERE_SUPPORT_SKILL_ID_FIRE_CLOAK,
    SERE_SUPPORT_SKILL_ID_FLAME_ARMOR, SERE_SUPPORT_SKILL_ID_POISON_SHIELD, SERE_SUPPORT_SKILL_ID_STONE_SHIELD,
    SERE_SUPPORT_SKILL_ID_STRONG_PROTECTION, SERE_SUPPORT_SKILL_ID_WATER_DROP, SERE_SUPPORT_SKILL_ID_WIND_CURTAIN,
    SKILL_ID_BREAK_THROUGH, SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_EBI_PARTY,
    SKILL_ID_EBI_ZANMAI, SKILL_ID_FAITH, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU, SKILL_ID_GROOMING,
    SKILL_ID_HALLUCINATION_WALK, SKILL_ID_HIGHNESS_HEAL, SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_KIHE_SHUREN,
    SKILL_ID_LAUDAAGNUS, SKILL_ID_LAUDARAMUS, SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_MAGURO_SHIELD, SKILL_ID_MEDITATIO,
    SKILL_ID_NODOWO_NARASU, SKILL_ID_NYAN_GRASS, SKILL_ID_OFFERTORIUM, SKILL_ID_ORATIO, SKILL_ID_OTORO,
    SKILL_ID_PRAEFATIO, SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_SERE_SUPPORT_SKILL,
    SKILL_ID_SHINSENNA_EBI, SKILL_ID_SKIN_TEMPERING, SKILL_ID_SUMMON_AGNI, SKILL_ID_SUMMON_AQUA,
    SKILL_ID_SUMMON_TERA, SKILL_ID_SUMMON_VENTOS, SKILL_ID_TRANSCENDENCE, SKILL_ID_TRIANGLE_SHOT,
    SKILL_ID_UMINO_CHIKARA, SKILL_ID_WUG_RIDER
} from './skill.dat.js';
import { ROUNDDOWN } from './foot-bridge.js';

// foot.js 専有のモジュールレベル変数（各関数内で書いてから読む。write-before-read 確認済み）
let itemCountRight = 0;
let itemCountLeft = 0;

/**
 * 公式サイトで「」と表記される状態異常耐性の増加効果を適用する
 * グローバル変数の n_tok[ITEM_SP_RESIST_STATE_XXX] に直接作用するので戻り値はない
 */
export function ApplyResistBadStatus() {
	var itemCount = 0, cardCount = 0;
    let sklLv = 0;
    if (EquipNumSearch(534) || EquipNumSearch(1646) || EquipNumSearch(1717)) {
        let wSPVS = GetLowerJobSeriesID(n_A_JOB);
        if (wSPVS == 1 || wSPVS == 2 || wSPVS == 6) n_tok[ITEM_SP_RESIST_STATE_STUN] += 50;
        if (wSPVS == 3 || wSPVS == 4 || wSPVS == 5) n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 50;
    }
    if (EquipNumSearch(828)) {
        n_tok[ITEM_SP_RESIST_STATE_STUN] += 2 * n_A_HEAD_DEF_PLUS;
        n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 2 * n_A_HEAD_DEF_PLUS;
        n_tok[ITEM_SP_RESIST_STATE_STONE] += 2 * n_A_HEAD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「マッドハッター」の、職業ごとの効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAD_HATTER)) {
        let stateid = 0;
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            case JOB_SERIES_ID_NOVICE:
                stateid = ITEM_SP_RESIST_STATE_FROZEN;
                break;
            case JOB_SERIES_ID_SWORDMAN:
                stateid = ITEM_SP_RESIST_STATE_CURSED;
                break;
            case JOB_SERIES_ID_THIEF:
                stateid = ITEM_SP_RESIST_STATE_BLIND;
                break;
            case JOB_SERIES_ID_ACOLYTE:
                stateid = ITEM_SP_RESIST_STATE_STONE;
                break;
            case JOB_SERIES_ID_ARCHER:
                stateid = ITEM_SP_RESIST_STATE_SLEEP;
                break;
            case JOB_SERIES_ID_MAGICIAN:
                stateid = ITEM_SP_RESIST_STATE_BLEEDING;
                break;
            case JOB_SERIES_ID_MERCHANT:
                stateid = ITEM_SP_RESIST_STATE_POISON;
                break;
            case JOB_SERIES_ID_TAEGKUON:
                stateid = ITEM_SP_RESIST_STATE_STUN;
                break;
            case JOB_SERIES_ID_NINJA:
                stateid = ITEM_SP_RESIST_STATE_SILENCE;
                break;
            case JOB_SERIES_ID_GUNSLINGER:
                stateid = ITEM_SP_RESIST_STATE_CONFUSE;
                break;
        }

        if (stateid != 0) {
            if (n_A_HEAD_DEF_PLUS < 5) {
                n_tok[stateid] += 20;
            } else if (n_A_HEAD_DEF_PLUS < 7) {
                n_tok[stateid] += 50;
            } else {
                n_tok[stateid] += 100;
            }
        }
    }

    //----------------------------------------------------------------
    // 「ジェミニ-S58の目」の、素ＡＧＩ９０以上の効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GEMINIS58NO_ME)) {
        if (SU_AGI >= 90) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 30;
            n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 30;
        }
    }

    //----------------------------------------------------------------
    // 「勇者の怒りセット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_YUSHANOIKARI_ORCISH_AXE_ORCISH_SWORD)) {
        if (n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus >= 20) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「アインヘリヤルの鎧　イビルドルイドカードセット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_EINHERJERNO_YOROI_EVIL_DRUID_CARD)) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_STATE_CURSED] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「聖なる白衣」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SEINARU_HAKUI) > 0) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_STATE_STONE] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「聖なる白衣　アルギオペカードセット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SEINARU_HAKUI_ARGIOPE)) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「エーギルリング　アーマーセット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_ARMOR)) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 25;
            n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 25;
        }
    }

    //----------------------------------------------------------------
    // 「虹色の翼」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA)) {
        if (n_A_BODY_DEF_PLUS >= 8) {
            n_tok[ITEM_SP_RESIST_STATE_STONE] += 25;
        }
    }

    //----------------------------------------------------------------
    // 「ジェミニ-S58の目」の、素ＶＩＴによる効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GEMINIS58NO_ME_AKA)) {
        if (SU_VIT >= 90) {
            n_tok[ITEM_SP_RESIST_STATE_STONE] += 40;
            n_tok[ITEM_SP_RESIST_STATE_SLEEP] += 40;
        }
    }

    //----------------------------------------------------------------
    // 「ゴッズシールド」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GODS_SHIELD)) {
        if (n_A_SHIELD_DEF_PLUS >= 10) {
            n_tok[ITEM_SP_RESIST_STATE_BLEEDING] += 100;
            n_tok[ITEM_SP_RESIST_STATE_STONE] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「アンソニの服　アンソニカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_ANSONINO_FUKU_ANSONI_CARD)) {
        if (n_A_BODY_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「カルデュイの法衣　エンジェリングカードセット」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearchMIG(ITEM_SET_ID_CARDYUINO_HOI_ANGELRING)) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100;
        }
    }

    /*
    		// 恐怖耐性、計算機未実装
    		//----------------------------------------------------------------
    		// 「古代龍の宝冠」の、精錬による効果
    		//----------------------------------------------------------------
    		if ((itemCount = EquipNumSearch(ITEM_ID_KODAIRYUNO_HOKAN)) > 0) {
    			n_tok[ITEM_SP_RESIST_STATE_FEAR] += 10 * n_A_HEAD_DEF_PLUS * itemCount;
    		}
    */

    //----------------------------------------------------------------
    // 「魔眼のアムダライスカード」の、精錬による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_MAGANNO_AMDARAIS)) > 0) {
        if (n_A_BODY_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「ジターバグカード」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_JITTER_BUG)) > 0) {
        if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「スティックキャンディロッド」の、ベースレベルによる効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_STICK_CANDY_ROD, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_STICK_CANDY_ROD, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_STATE_CONFUSE] += 100 * (itemCountRight + itemCountLeft);
        }
    }

    //----------------------------------------------------------------
    // 「イリュージョン裏切り者」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_URAGIRIMONO)) > 0) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_STATE_SLEEP] += 100 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ディアボロスウィング　アーマーセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR)) > 0) {
        n_tok[ITEM_SP_RESIST_STATE_STUN] += 5 * n_A_BODY_DEF_PLUS * itemCount;
        n_tok[ITEM_SP_RESIST_STATE_STONE] += 5 * n_A_BODY_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「ふわふわタンポポシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
            if (LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER) >= 5) {
                n_tok[ITEM_SP_RESIST_STATE_CURSED] += 100;
            }
        }
    }

    //----------------------------------------------------------------
    // 「竜殺しの長剣　ランドグリスカードセット」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_RYUGOROSHINO_CHOKEN_RANDGRIS_CARD)) > 0) {
        if (n_A_BaseLV <= 99) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 20 * itemCount;
            n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 20 * itemCount;
        } else {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 50 * itemCount;
            n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「リングオブヴィーナス」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_1)) > 0) {
        n_tok[ITEM_SP_RESIST_STATE_STUN] += 3 * Math.floor(SU_DEX / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ちゃぷちゃぷニャンプーハット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_CHAPUCHAPU_NYANPU_HAT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_GROOMING) >= 5) {
            n_tok[ITEM_SP_RESIST_STATE_CONFUSE] += 100 * itemCount;
            n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 100 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「インペリアルホーリーローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_HOLY_ROBE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HIGHNESS_HEAL) >= 5) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「グレースホーリーローブ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_HOLY_ROBE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HIGHNESS_HEAL) >= 5) {
            n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「きらきらニャンニャンチョーカー」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_NYAN_GRASS) >= 5) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 50 * itemCount;
        }
    }

    if (CardNumSearch(176)) {
        if (SU_AGI >= 90) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 30 * CardNumSearch(176);
            n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 30 * CardNumSearch(176);
        }
        if (SU_VIT >= 80) {
            n_tok[ITEM_SP_RESIST_STATE_SLEEP] += 50 * CardNumSearch(176);
            n_tok[ITEM_SP_RESIST_STATE_STONE] += 50 * CardNumSearch(176);
        }
    }

    if (EquipNumSearch(ITEM_SET_ID_DEVILCH_HEADPHONE_PET)) {
        let wDH = GetLowerJobSeriesID(n_A_JOB);
        if (wDH == 3 || wDH == 4 || wDH == 5) {
            n_tok[ITEM_SP_RESIST_STATE_STUN] += 5;
            if (n_A_PassSkill8[17] == 6) n_tok[ITEM_SP_RESIST_STATE_STUN] += 15;
        }
    }

    if (n_A_BODY_DEF_PLUS >= 9 && EquipNumSearch(2455)) n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 100;

    /**
     * 「２次職合奏 不死身のジークフリード」の効果
     */
    if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_SIEGFRIED]) > 0) {
        n_tok[ITEM_SP_RESIST_STATE_BLIND] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_CONFUSE] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_SLEEP] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_STUN] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_STONE] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_SILENCE] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_FROZEN] += 25 + 5 * sklLv;
        n_tok[ITEM_SP_RESIST_STATE_CURSED] += 25 + 5 * sklLv;
    }

    if (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 35) {
        n_tok[ITEM_SP_RESIST_STATE_BLEEDING] += 100;
        n_tok[ITEM_SP_RESIST_STATE_STONE] += 100;
    }

    n_tok[ITEM_SP_RESIST_STATE_FROZEN] += n_tok[ITEM_SP_RESIST_FROZEN_GVGTE];

}

/**
 * 公式サイトで「◯属性攻撃で受けるダメージ - ◯%」と表記される属性ダメージの減少効果を適用する
 * グローバル変数の n_tok[ITEM_SP_RESIST_ELM_XXX] に直接作用するので戻り値はない
 */
export function ApplyAdditionalResistElement() {
	var i, idx, itemCount = 0, cardCount = 0, confval = 0;
	let sklLv = 0;
    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (let idx = ITEM_SP_RESIST_ELM_VANITY; idx <= ITEM_SP_RESIST_ELM_UNDEAD; idx++) {
        n_tok[idx] += GetRndOptTotalValue(idx, null, false);
        // n_tok[idx] += GetRndEnchValue(idx);
    }

    if (EquipNumSearch(737)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += n_A_SHOULDER_DEF_PLUS * 3;
    if (EquipNumSearch(957)) {
        for (let i = 0; i <= 9; i++) n_tok[60 + i] += 30;
    }
    if (n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(403)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5;
    if (n_A_BaseLV <= 79 && EquipNumSearch(1251)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5;
    if (n_A_HEAD_DEF_PLUS >= 8 && EquipNumSearch(1244)) n_tok[ITEM_SP_RESIST_ELM_WATER] += 5;
    if (n_A_HEAD_DEF_PLUS >= 2 && EquipNumSearch(1431)) {
        let w = ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
        n_tok[ITEM_SP_RESIST_ELM_WATER] += w;
        n_tok[ITEM_SP_RESIST_ELM_EARTH] += w;
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += w;
        n_tok[ITEM_SP_RESIST_ELM_WIND] += w;
    }
    if (n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(1455)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += n_A_SHIELD_DEF_PLUS - 5;
    if (n_A_SHOULDER_DEF_PLUS >= 6 && EquipNumSearch(1531)) {
        n_tok[ITEM_SP_RESIST_ELM_VANITY] += 2;
        if (n_A_SHOULDER_DEF_PLUS >= 8) n_tok[ITEM_SP_RESIST_ELM_VANITY] += 3;
    }
    if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1581)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5;
    if (n_A_Weapon_ATKplus >= 7) {
        if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 1616) n_tok[ITEM_SP_RESIST_ELM_WATER] += 3;
        if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 1617) n_tok[ITEM_SP_RESIST_ELM_EARTH] += 3;
        if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 1618) n_tok[ITEM_SP_RESIST_ELM_FIRE] += 3;
        if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 1619) n_tok[ITEM_SP_RESIST_ELM_WIND] += 3;
    }
    if (n_A_Weapon2_ATKplus >= 7) {
        if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1616) n_tok[ITEM_SP_RESIST_ELM_WATER] += 3;
        if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1617) n_tok[ITEM_SP_RESIST_ELM_EARTH] += 3;
        if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1618) n_tok[ITEM_SP_RESIST_ELM_FIRE] += 3;
        if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1619) n_tok[ITEM_SP_RESIST_ELM_WIND] += 3;
    }
    if (EquipNumSearch(1794)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += n_A_HEAD_DEF_PLUS;
    if (EquipNumSearch(1797)) {
        for (let i = 61; i <= 69; i++) n_tok[i] -= 3;
        if (n_A_SHOES_DEF_PLUS >= 6) n_tok[ITEM_SP_RESIST_ELM_VANITY] += (n_A_SHOES_DEF_PLUS - 5);
    }
    if (n_A_HEAD_DEF_PLUS >= 8 && EquipNumSearch(1798)) n_tok[ITEM_SP_RESIST_ELM_WIND] += 5;
    if (n_A_HEAD_DEF_PLUS >= 9 && EquipNumSearch(1815)) n_tok[ITEM_SP_RESIST_ELM_WATER] += 3;
    if (n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(1817)) n_tok[ITEM_SP_RESIST_ELM_FIRE] += 5;
    if (n_A_SHIELD_DEF_PLUS >= 7 && EquipNumSearch(1886)) {
        for (let i = 60; i <= 69; i++) n_tok[i] += (n_A_SHIELD_DEF_PLUS - 6) * 2;
    }
    if (GetLowerJobSeriesID(n_A_JOB) == 3 && EquipNumSearch(1913)) n_tok[ITEM_SP_RESIST_ELM_UNDEAD] += 10;
    if (n_A_SHIELD_DEF_PLUS >= 3 && EquipNumSearch(1914)) n_tok[ITEM_SP_RESIST_ELM_WATER] += Math.floor(n_A_SHIELD_DEF_PLUS / 3) * 5;
    if (n_A_HEAD_DEF_PLUS >= 8 && EquipNumSearch(1915)) n_tok[ITEM_SP_RESIST_ELM_EARTH] += 5;
    if (n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(1943)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += n_A_HEAD_DEF_PLUS - 5;
    if (EquipNumSearch(2104)) {
        if (n_A_SHOULDER_DEF_PLUS >= 6) n_tok[ITEM_SP_RESIST_ELM_VANITY] += (n_A_SHOULDER_DEF_PLUS - 5);
    }
    if (n_A_SHIELD_DEF_PLUS >= 1) {
        for (let i = 2144; i <= 2152; i++) {
            if (EquipNumSearch(i)) n_tok[60 + (i - 2143)] += n_A_SHIELD_DEF_PLUS * 2;
        }
        if (EquipNumSearch(2143)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += n_A_SHIELD_DEF_PLUS;
    }
    if (EquipNumSearch(2209)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += n_A_HEAD_DEF_PLUS;
    if (n_A_Arrow == ARROW_ID_HONOONO_YA && EquipNumSearch(2356)) n_tok[ITEM_SP_RESIST_ELM_FIRE] += -10;
    if (n_A_SHOULDER_DEF_PLUS >= 9 && EquipNumSearch(2452)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += 20;
    if (n_A_SHOULDER_DEF_PLUS >= 9 && EquipNumSearch(2453)) n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5;
    if (EquipNumSearch(2548)) n_tok[ITEM_SP_RESIST_ELM_FIRE] += n_A_SHOES_DEF_PLUS;
    if (EquipNumSearch(2553)) n_tok[ITEM_SP_RESIST_ELM_WATER] += n_A_SHOES_DEF_PLUS;
    if (EquipNumSearch(2558)) n_tok[ITEM_SP_RESIST_ELM_WIND] += n_A_SHOES_DEF_PLUS;
    if (EquipNumSearch(2563)) n_tok[ITEM_SP_RESIST_ELM_EARTH] += n_A_SHOES_DEF_PLUS;

    //----------------------------------------------------------------
    // 「包装されなかった人形カード」の、＋９過剰による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_HOSOSARENAKATTA_NINGYO)) {
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 10;
            n_tok[ITEM_SP_RESIST_ELM_PSYCO] += 10;
        }
    }

    //----------------------------------------------------------------
    // 「マッドハッター」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAD_HATTER)) {
        n_tok[ITEM_SP_RESIST_ELM_DARK] += 5 * n_A_HEAD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「ガーディアンセット」の、＋７過剰による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_GUARDIAN_SET)) {
        if (n_A_BODY_DEF_PLUS >= 7 &&
            n_A_SHOULDER_DEF_PLUS >= 7 &&
            n_A_SHOES_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] += 10;
        }
    }

    //----------------------------------------------------------------
    // 「ルドのロールペーパー」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_RUDONO_ROLLPAPER)) {
        n_tok[ITEM_SP_RESIST_ELM_HOLY] += 2 * n_A_SHIELD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「ユニコーンの兜」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_UNICORNNO_KABUTO)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 2 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「ユニコーンの兜」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_UNICORNNO_KABUTO)) {
        if (n_A_HEAD_DEF_PLUS >= 8) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] += 5;
            n_tok[ITEM_SP_RESIST_ELM_DARK] += 5;
        }
    }

    //----------------------------------------------------------------
    // 「堕天司祭の闇光外套」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_DATENSHISAINO_ANKOUGAITO)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 3 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「堕天司祭の闇光外套」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_DATENSHISAINO_ANKOUGAITO)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] += 20;
            n_tok[ITEM_SP_RESIST_ELM_DARK] += 20;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] += 10;
            n_tok[ITEM_SP_RESIST_ELM_DARK] += 10;
        }
    }

    //----------------------------------------------------------------
    // 「英雄マント」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_EIYU_MANT)) {
        n_tok[ITEM_SP_RESIST_ELM_VANITY] += 3 * ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 3);
        if (n_A_SHOULDER_DEF_PLUS >= 10) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 20;
        }
    }

    //----------------------------------------------------------------
    // 「皇竜の天翼」の、職業による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
        if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MAGICIAN) {
            n_tok[ITEM_SP_RESIST_ELM_ALL] += 5;
        }
    }

    //----------------------------------------------------------------
    // 「魔呪のマント」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAZYUNO_MANT)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 30;
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 30;
        }
    }

    //----------------------------------------------------------------
    // 「ガイアシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 6) {
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 15;
        }
    }

    //----------------------------------------------------------------
    // 「ガーディアンプロセッサ　ガーディアンエンジンセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_ENGINE)) > 0) {
        let vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 15;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 15;
        n_tok[ITEM_SP_RESIST_ELM_HOLY] += vartmp * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_DARK] += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「マラン海賊団帽」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 8) n_tok[ITEM_SP_RESIST_ELM_WIND] += 15;
    }

    //----------------------------------------------------------------
    // 「アネモスシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 6) n_tok[ITEM_SP_RESIST_ELM_WIND] += 15;
    }

    //----------------------------------------------------------------
    // 「エーギルリング　マントセット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_MANT)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 25;
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 25;
        }
    }

    //----------------------------------------------------------------
    // 「エンチャント　セイクレッド」の、スキル習得による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_ENCHANT_SACRED)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 15 * CardNumSearch(CARD_ID_ENCHANT_SACRED);
        }
    }

    //----------------------------------------------------------------
    // 「悪魔崇拝者の靴　堕天司祭の闇光外套セット」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 2 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「降霊術士の外套」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KOREIZYUTSUSHINO_GAITO)) {
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 5 * n_A_SHOULDER_DEF_PLUS;
        n_tok[ITEM_SP_RESIST_ELM_WIND] += 5 * n_A_SHOULDER_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「ルドの黒い羽　ルドのロールペーパーセット」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_RUDONO_KUROI_HANE_RUDONO_ROLLPAPER)) {
        n_tok[ITEM_SP_RESIST_ELM_HOLY] += 3 * n_A_SHIELD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「ディヴィッドシールド」の、スキル習得による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_DIVID_SHIELD)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 2 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「ゴッズヘルム」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GODS_HELM)) > 0) {
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 2 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 1) * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 2 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 1) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ゴッズアーマー」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GODS_ARMOR)) {
        n_tok[ITEM_SP_RESIST_ELM_DARK] += 2 * n_A_BODY_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「禁忌の魔導書」の、スキル習得による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KINKINO_MADOSHO)) {
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 10 * LearnedSkillSearch(SKILL_ID_SUMMON_AGNI);
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 10 * LearnedSkillSearch(SKILL_ID_SUMMON_AQUA);
        n_tok[ITEM_SP_RESIST_ELM_WIND] += 10 * LearnedSkillSearch(SKILL_ID_SUMMON_VENTOS);
        n_tok[ITEM_SP_RESIST_ELM_EARTH] += 10 * LearnedSkillSearch(SKILL_ID_SUMMON_TERA);
    }

    //----------------------------------------------------------------
    // 「サバイバルシューズ　サバイバルマントセット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_MANT)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 15;
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 15;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 15;
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 15;
        }
    }

    //----------------------------------------------------------------
    // 「ゴーグルハット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GOOGLE_HAT)) {
        if (n_A_HEAD_DEF_PLUS >= 8) {
            n_tok[ITEM_SP_RESIST_ELM_POISON] += 15;
        }
    }

    //----------------------------------------------------------------
    // 「タウラスハット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_TAURUS_HAT)) {
        if (n_A_HEAD_DEF_PLUS >= 8) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 15;
        }
    }

    //----------------------------------------------------------------
    // 「実験成体ゴート型キャップ」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP)) {
        if (n_A_HEAD_DEF_PLUS >= 8) {
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 15;
        }
    }

    //----------------------------------------------------------------
    // 「ダークフェイスワームカード」の、スキル習得による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_DARK_FACEWORM)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 20 * CardNumSearch(CARD_ID_DARK_FACEWORM);
        }
    }

    //----------------------------------------------------------------
    // 「虹色のスカーフ」の、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF)) > 0) {
        // 「炎の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_HONOONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 75;
        }
        // 「水晶の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_SUISHONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 75;
        }
        // 「風の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_KAZENO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 75;
        }
        // 「岩石の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_GANSEKINO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 75;
        }
    }

    //----------------------------------------------------------------
    // 「キングスメイル　キングスガードセット」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_KINGS_MAIL_KINGS_GUARD)) {
        n_tok[ITEM_SP_RESIST_ELM_DARK] += 5 * n_A_BODY_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「虹色のマフラー」の、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_MUFFLER)) > 0) {
        // 「炎の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_HONOONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 75;
        }
        // 「水晶の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_SUISHONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 75;
        }
        // 「風の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_KAZENO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 75;
        }
        // 「岩石の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_GANSEKINO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 75;
        }
    }

    //----------------------------------------------------------------
    // 「降霊術士の手鏡」の、スキル習得による効果（ペナルティ）
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KOREZYUTSUSHINO_TEKAGAMI)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 2 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「ディアボロスウィング　マントセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT)) > 0) {
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 3 * n_A_SHOULDER_DEF_PLUS * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 3 * n_A_SHOULDER_DEF_PLUS * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_WIND] += 3 * n_A_SHOULDER_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「スピリチュアルクロース　エクリプスカードセット」の、スキル習得による効果（ペナルティ）
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SPIRITUAL_CLOTH_ECLIPSE_CARD)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 5 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「イルシオンウィングI」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_WING_1)) > 0) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「イルシオンウィングI　スーツIセット」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILUSION_WING_1_SUIT_1)) > 0) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「イルシオンウィングII」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_WING_2)) > 0) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「イルシオンウィングII　スーツIIセット」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILUSION_WING_2_SUIT_2)) > 0) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ガーディアンオブソウル」の、素ステータスによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
        n_tok[ITEM_SP_RESIST_ELM_DARK] += 7 * Math.floor((SU_STR + SU_LUK) / 18) * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_UNDEAD] += 7 * Math.floor((SU_STR + SU_LUK) / 18) * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 7 * Math.floor((SU_AGI + SU_VIT) / 18) * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 7 * Math.floor((SU_AGI + SU_VIT) / 18) * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_WIND] += 7 * Math.floor((SU_INT + SU_DEX) / 18) * itemCount;
        n_tok[ITEM_SP_RESIST_ELM_EARTH] += 7 * Math.floor((SU_INT + SU_DEX) / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「リングオブヴィーナス」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_1)) > 0) {
        if (SU_DEX >= 125) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 5 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 5 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 5 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「暴威のマフラー」の、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
        // 「炎の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_HONOONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 75;
        }
        // 「水晶の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_SUISHONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 75;
        }
        // 「風の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_KAZENO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 75;
        }
        // 「岩石の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_GANSEKINO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 75;
        }
    }

    //----------------------------------------------------------------
    // 「イルシオンシールド」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_ILUSION_SHIELD_1)) > 0) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 5 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「溶岩のマント」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YOGANNO_MANT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) >= 5) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 50 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「エンチャント　R-Saint」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_R_SAINT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FAITH) > 0) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 25 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「身かわしのケープ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MIKAWASHINO_CAPE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_PRAEFATIO) >= 10) {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] += 50 * itemCount;
        }
        if (LearnedSkillSearch(SKILL_ID_HIGHNESS_HEAL) >= 5) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 75 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_PSYCO] += 75 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「エリュマントスの皮」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_ERYMANTHNO_KAWA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_WUG_RIDER) >= 3) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 100 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_PSYCO] += 30 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「グロトネリーア」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_TRIANGLE_SHOT) >= 10) {
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 50 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「アヴァレーツォ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_AVARECO)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_HALLUCINATION_WALK) >= 5) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 100 * itemCount;
            n_tok[ITEM_SP_RESIST_ELM_HOLY] += 30 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「無限のエクリプス」および「超越したエクリプス」の、スキル習得による効果
    //----------------------------------------------------------------
	cardCount = CardNumSearch(CARD_ID_MUGENNO_ECLIPSE) + CardNumSearch(CARD_ID_INFINITE2_ECLIPSE);
    if (cardCount > 0) {
        n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 5 * LearnedSkillSearch(SKILL_ID_FAITH) * cardCount;
    }

    //----------------------------------------------------------------
    // 「エンチャント　Exam　P-Fear　セイクレッド」の、スキル習得による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_FEAR)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 15 * CardNumSearch(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_FEAR);
        }
    }

    //----------------------------------------------------------------
    // 「レギンレイヴカード」の、装備位置による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_REGINLEIF, CARD_REGION_ID_HEAD_MID)) > 0) {
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 10 * cardCount;
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 10 * cardCount;
        n_tok[ITEM_SP_RESIST_ELM_DARK] += 10 * cardCount;
        n_tok[ITEM_SP_RESIST_ELM_UNDEAD] += 10 * cardCount;
    }

    //----------------------------------------------------------------
    // 「ブラックミスリルガード」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_BLACK_MITHRIL_GUARD)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FAITH) >= 1) {
            if (n_A_SHIELD_DEF_PLUS >= 5) {
                n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 20 * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「アッシュホッパー」カードの、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ASH_HOPPER)) > 0) {

        // 「炎の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_HONOONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「真夜中のユメヒメ」カードの、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_MAYONAKANO_YUMEHIME)) > 0) {

        // 「無形の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_MUKEINO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_PSYCO] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「雪花のマント」の、スキル習得による効果（ペナルティ）
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SEKKANO_MANT)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 5 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「雪花のマフラー」の、スキル習得による効果（ペナルティ）
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SEKKANO_MUFFLER)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 5 * LearnedSkillSearch(SKILL_ID_FAITH);
        }
    }

    //----------------------------------------------------------------
    // 「アイスフナムシ」カードの、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ICE_FUNAMUSHI)) > 0) {

        // 「水晶の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_SUISHONO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「エクストラジョーカー」カードの、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_EXTRA_JORKER)) > 0) {

        // 「銀の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_GINNO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「デッドセラ」カードの、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_DEAD_SERA)) > 0) {

        // 「錆びた矢」と同時装備
        if (n_A_Arrow == ARROW_ID_SABITA_YA) {
            n_tok[ITEM_SP_RESIST_ELM_POISON] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「クマムシ」カードの、矢との同時装備による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ICEBEAR)) > 0) {
        // 「岩石の矢」と同時装備
        if (n_A_Arrow == ARROW_ID_GANSEKINO_YA) {
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 50;
        }
    }

    //----------------------------------------------------------------
    // 「スプンタアールマティ」の、スキル習得による効果（ペナルティ）
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SPUNTA_ARLMATI)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            if (n_A_SHIELD_DEF_PLUS >= 5) {
                n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 25 * itemCount;
            }
        }
    }

    //----------------------------------------------------------------
    // 「ルッキー」カードの、スキル習得による効果（ペナルティ）
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_LOOKIE)) {
        if (LearnedSkillSearch(SKILL_ID_FAITH)) {
            n_tok[ITEM_SP_RESIST_ELM_HOLY] -= 30;
        }
    }

    // 「傲慢なタナトスの怨望」カード + 「英雄の凱歌」エンチャントによる、肩の精錬値が1上がるたびに追加される効果
	if (CardNumSearch(CARD_SET_ID_PRIDE_THANATOS_RESENT_EIYU) > 0) {
		n_tok[ITEM_SP_RESIST_ELM_WATER] += 7 * n_A_SHOULDER_DEF_PLUS;
	}
    // 「傲慢なタナトスの恐怖」カード + 「英雄の凱歌」エンチャントによる、肩の精錬値が1上がるたびに追加される効果
	if (CardNumSearch(CARD_SET_ID_PRIDE_THANATOS_HORROR_EIYU) > 0) {
		n_tok[ITEM_SP_RESIST_ELM_POISON] += 7 * n_A_SHOULDER_DEF_PLUS;
	}

    //----------------------------------------------------------------
    // 「ブラックスミス　スキンテンパリング」の効果
    //----------------------------------------------------------------
    n_tok[ITEM_SP_RESIST_ELM_VANITY] += Math.max(LearnedSkillSearch(SKILL_ID_SKIN_TEMPERING), UsedSkillSearch(SKILL_ID_SKIN_TEMPERING));
    n_tok[ITEM_SP_RESIST_ELM_FIRE] += 4 * Math.max(LearnedSkillSearch(SKILL_ID_SKIN_TEMPERING), UsedSkillSearch(SKILL_ID_SKIN_TEMPERING));

    //----------------------------------------------------------------
    // 「クルセイダー　フェイス」の効果
    //----------------------------------------------------------------
    n_tok[ITEM_SP_RESIST_ELM_HOLY] += 5 * Math.max(LearnedSkillSearch(SKILL_ID_FAITH), UsedSkillSearch(SKILL_ID_FAITH));

    //----------------------------------------------------------------
    // 「影狼・朧　符」の効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) != 0) {
        n_tok[ITEM_SP_RESIST_ELM_VANITY + UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)] += 2 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
    }

    //----------------------------------------------------------------
    // 「二次職支援　プロヴィデンス」の効果
    //----------------------------------------------------------------
    if (g_confDataNizi[CCharaConfNizi.CONF_ID_PROVIDENCE] && GetHigherJobSeriesID(n_A_JOB) != JOB_SERIES_ID_CRUSADER) {
        n_tok[ITEM_SP_RESIST_ELM_HOLY] += 5 * g_confDataNizi[CCharaConfNizi.CONF_ID_PROVIDENCE];
    }

    //----------------------------------------------------------------
    // 「ソーサラー　精霊支援スキル」の効果
    //----------------------------------------------------------------
    switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
        case SERE_SUPPORT_SKILL_ID_FIRE_CLOAK:
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 100;
            n_tok[ITEM_SP_RESIST_ELM_WATER] -= 100;
            break;
        case SERE_SUPPORT_SKILL_ID_WATER_DROP:
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 100;
            n_tok[ITEM_SP_RESIST_ELM_WIND] -= 100;
            break;
        case SERE_SUPPORT_SKILL_ID_WIND_CURTAIN:
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 100;
            n_tok[ITEM_SP_RESIST_ELM_EARTH] -= 100;
            break;
        case SERE_SUPPORT_SKILL_ID_STONE_SHIELD:
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 100;
            n_tok[ITEM_SP_RESIST_ELM_FIRE] -= 100;
            break;
    }

    //----------------------------------------------------------------
    // 「四次精霊　ディフェンスモード」の効果
    //----------------------------------------------------------------
    switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
        case SERE_SUPPORT_SKILL_ID_FLAME_ARMOR:
            n_tok[ITEM_SP_RESIST_ELM_FIRE] += 95;
            break;
        case SERE_SUPPORT_SKILL_ID_CRYSTAL_ARMOR:
            n_tok[ITEM_SP_RESIST_ELM_WATER] += 95;
            break;
        case SERE_SUPPORT_SKILL_ID_EYES_OF_STORM:
            n_tok[ITEM_SP_RESIST_ELM_WIND] += 95;
            break;
        case SERE_SUPPORT_SKILL_ID_STRONG_PROTECTION:
            n_tok[ITEM_SP_RESIST_ELM_EARTH] += 95;
            break;
        case SERE_SUPPORT_SKILL_ID_POISON_SHIELD:
            n_tok[ITEM_SP_RESIST_ELM_POISON] += 95;
            break;
    }

	/**
	 * 「２次職合奏 不死身のジークフリード」の効果
	 */
    if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_SIEGFRIED]) > 0) {
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 3 * sklLv;
        n_tok[ITEM_SP_RESIST_ELM_EARTH] += 3 * sklLv;
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 3 * sklLv;
        n_tok[ITEM_SP_RESIST_ELM_WIND] += 3 * sklLv;
    }

	/** 三次職支援設定「恋人たちのためのシンフォニー」の効果 */
	if ((sklLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_SYMPHONY_OF_LOVER]) > 0) {
		n_tok[ITEM_SP_RESIST_ELM_HOLY] += 3 * sklLv;
		n_tok[ITEM_SP_RESIST_ELM_PSYCO] += 3 * sklLv;
	}

    if (n_A_PassSkill7[11]) { // A7_Skill11 : レジストコールドポーション
        n_tok[ITEM_SP_RESIST_ELM_WATER] += 20;
        n_tok[ITEM_SP_RESIST_ELM_WIND] -= 15;
    }
    if (n_A_PassSkill7[12]) { // A7_Skill12 : レジストアースポーション
        n_tok[ITEM_SP_RESIST_ELM_EARTH] += 20;
        n_tok[ITEM_SP_RESIST_ELM_FIRE] -= 15;
    }
    if (n_A_PassSkill7[13]) { // A7_Skill13 : レジストファイアーポーション
        n_tok[ITEM_SP_RESIST_ELM_FIRE] += 20;
        n_tok[ITEM_SP_RESIST_ELM_WATER] -= 15;
    }
    if (n_A_PassSkill7[14]) { // A7_Skill14 : レジストウィンドポーション
        n_tok[ITEM_SP_RESIST_ELM_WIND] += 20;
        n_tok[ITEM_SP_RESIST_ELM_EARTH] -= 15;
    }
    if (n_tok[ITEM_SP_RESIST_ELM_ALL] != 0) {
        for (let i = ITEM_SP_RESIST_ELM_VANITY; i <= ITEM_SP_RESIST_ELM_UNDEAD; i++) n_tok[i] += n_tok[ITEM_SP_RESIST_ELM_ALL];
    }
    if (EquipNumSearch(ITEM_SET_ID_STRONG_SHIELD_JUSOHOHEI_NO_KABUTO)) {
        for (let i = ITEM_SP_RESIST_ELM_VANITY; i <= ITEM_SP_RESIST_ELM_UNDEAD; i++) n_tok[i] += 5;
    }

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_ELM);
    if (confval != 0) {
        for (i = ITEM_SP_RESIST_ELM_VANITY; i <= ITEM_SP_RESIST_ELM_UNDEAD; i++) {
            n_tok[i] += confval;
        }
    }

    // TODO: 四次対応
    for (idx = ITEM_SP_RESIST_ELM_VANITY; idx <= ITEM_SP_RESIST_ELM_UNDEAD; idx++) {
        n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
    }

}

/**
 * 公式サイトで「ヒール系スキルを受けた時のHP回復量 + ◯%」と表記される回復される量の増加
 * および「ヒール系スキル使用時のHP回復量 + ◯%」と表記される回復する量の増加
 * を適用する
 */
export function ApplyHealRecoveryUp() {
	var idx, sklLv = 0, itemCount = 0, bufLv = 0, cardCount = 0, cardCountRight = 0, cardCountLeft = 0;
	let vartmp = 0;
    // USED : ヒール系スキルを受けた時のHP回復量
    // USING: ヒール系スキルを使った時のHP回復量

    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (idx = ITEM_SP_HEAL_UP_USING; idx <= ITEM_SP_HEAL_UP_USED; idx++) {
        n_tok[idx] += GetRndOptTotalValue(idx, null, false);
    }

    n_tok[ITEM_SP_HEAL_UP_USING] += n_tok[ITEM_SP_HEAL_UP_USING_ONLY_HEAL] + n_tok[ITEM_SP_HEAL_UP_USING_ONLY_HEAL_SERIES];

    n_tok[ITEM_SP_HEAL_UP_USING] += Math.max(LearnedSkillSearch(SKILL_ID_MEDITATIO), UsedSkillSearch(SKILL_ID_MEDITATIO)) * 2;

    // オフェルトリウム
    if ((bufLv = UsedSkillSearch(SKILL_ID_OFFERTORIUM)) > 0) {
        // 特定の戦闘エリアでの補正
        switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
            case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
                n_tok[ITEM_SP_HEAL_UP_USING] += 400 + 200 * bufLv;
                break;
            default:
                n_tok[ITEM_SP_HEAL_UP_USING] += 30 * bufLv;
                break;
        }
    }

    if (EquipNumSearch(644)) n_tok[ITEM_SP_HEAL_UP_USING] += Math.floor(n_A_Weapon_ATKplus * 1.5);
    if (EquipNumSearch(1085)) {
        if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_HEAL_UP_USING] += 5;
        if (n_A_Weapon_ATKplus >= 10) n_tok[ITEM_SP_HEAL_UP_USING] += 10;
        if (n_A_Weapon_ATKplus >= 7) {
            if (n_A_Weapon_ATKplus <= 10) n_tok[ITEM_SP_HEAL_UP_USING] += 2 * (n_A_Weapon_ATKplus - 5);
            else n_tok[ITEM_SP_HEAL_UP_USING] += 10;
        }
    }

    if (EquipNumSearch(ITEM_ID_TATSUZINNO_TSUCHI) || EquipNumSearch(ITEM_ID_TATSUZINNO_TSUCHI_S2)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += LearnedSkillSearch(SKILL_ID_DIVINE_PROTECTION);
    }

    if (EquipNumSearch(1359)) {
        if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_HEAL_UP_USING] += 3;
        if (EquipNumSearch(644)) n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus;
        if (EquipNumSearch(863)) n_tok[ITEM_SP_HEAL_UP_USING] += 3 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「魔法石の恩恵」の、装備効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MAHOSEKINO_ONKE)) {
        if (n_A_HEAD_DEF_PLUS >= 5) n_tok[ITEM_SP_HEAL_UP_USING] += 3;
        if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_HEAL_UP_USING] += 5;
        if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_HEAL_UP_USING] += 7;
    }

    //----------------------------------------------------------------
    // 「ロザリオの首飾り　聖職者の看護帽セット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_ROSARIONO_KUBIKAZARI_SEISHOKUSHANO_KANGOBO)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * n_A_HEAD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「ソヒョンの羽衣」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SOHIONNO_HAGOROMO)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 1 * n_A_SHOULDER_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「熾天使の花冠」の、強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SHITENSHINO_HANAKANMURI)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 1 * ROUNDDOWN(SU_INT / 8);
        if (SU_INT >= 108) n_tok[ITEM_SP_HEAL_UP_USING] += 5;
        if (SU_INT >= 120) n_tok[ITEM_SP_HEAL_UP_USING] += 10;
    }

    //----------------------------------------------------------------
    // 「皇竜の天翼」の、職業による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
        if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ACOLYTE) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 10;
        }
    }

    //----------------------------------------------------------------
    // 「セイヴザキング」の、騎兵修練【未習得】時における、過剰精錬による効果
    //----------------------------------------------------------------
    if (LearnedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
        if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) {
            if (n_A_Weapon_ATKplus >= 6) {
                n_tok[ITEM_SP_HEAL_UP_USING] += 40;
                n_tok[ITEM_SP_HEAL_UP_USED] += 15;
            }
            if (n_A_Weapon_ATKplus >= 8) {
                n_tok[ITEM_SP_HEAL_UP_USING] += 40;
                n_tok[ITEM_SP_HEAL_UP_USED] += 15;
            }
        }
    }

    //----------------------------------------------------------------
    // 「ガイアシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_VIT >= 90) {
                n_tok[ITEM_SP_HEAL_UP_USED] += 10;
            }
        }
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　グラスセット」の、素ＩＮＴと素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 10 * ROUNDDOWN((SU_INT + SU_DEX) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　サングラスセット」の、素ＩＮＴと素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 10 * ROUNDDOWN((SU_INT + SU_DEX) / 80) * itemCount;
    }


    //----------------------------------------------------------------
    // 「ディーヴァワンド」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_DIVA_WAND, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_WAND, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ディーヴァスタッフ」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_DIVA_STUFF, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_STUFF, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ディーヴァブック」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_DIVA_BOOK, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_BOOK, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ミラージュワンド」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_WAND, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_WAND, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ミラージュスタッフ」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_STUFF, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_STUFF, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ミラージュブック」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_BOOK, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_BOOK, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「アネモスシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_VIT >= 90) {
                n_tok[ITEM_SP_HEAL_UP_USED] += 10;
            }
        }
    }

    //----------------------------------------------------------------
    // 「聖なる白衣」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SEINARU_HAKUI) > 0) {
        let vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
        if (n_A_BODY_DEF_PLUS >= 8) vartmp += 3;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 4;
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * vartmp;
        n_tok[ITEM_SP_HEAL_UP_USED] += 1 * vartmp;
    }

    //----------------------------------------------------------------
    // 「ソヒョンの小太刀　ソヒョンの羽衣セット」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SOHIONNO_KODACHI_SOHIONNO_HAGOROMO)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * n_A_SHOULDER_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「ゴッズシールド」の、精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GODS_SHIELD)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 1 * n_A_SHIELD_DEF_PLUS;
    }

    //----------------------------------------------------------------
    // 「熾天使の羽毛　熾天使の花冠セット」の、素ＩＮＴによる効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI)) {
        let vartmp = 0;
        if (SU_INT >= 108) vartmp += 10;
        if (SU_INT >= 120) vartmp += 15;
        n_tok[ITEM_SP_HEAL_UP_USING] += vartmp;
        n_tok[ITEM_SP_HEAL_UP_USED] += vartmp;
    }

    //----------------------------------------------------------------
    // 「巡礼者の靴」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
        if (sklLv = LearnedSkillSearch(SKILL_ID_HIGHNESS_HEAL)) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 5 * sklLv * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「長い回復の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_NAGAI_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_NAGAI_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        let vartmp = 0;
        vartmp += 2 * n_A_Weapon_ATKplus;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 10;
        if (n_A_Weapon_ATKplus >= 8) vartmp += 15;
        n_tok[ITEM_SP_HEAL_UP_USING] += vartmp * itemCountRight;

        vartmp = 0;
        vartmp += 2 * n_A_Weapon2_ATKplus;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 10;
        if (n_A_Weapon2_ATKplus >= 8) vartmp += 15;
        n_tok[ITEM_SP_HEAL_UP_USING] += vartmp * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「豊富な回復の猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_HOUFUNA_KAIFUKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        vartmp = 0;
        vartmp += 5 * n_A_Weapon_ATKplus;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 20;
        if (n_A_Weapon_ATKplus >= 8) vartmp += 30;
        n_tok[ITEM_SP_HEAL_UP_USING] += vartmp * itemCountRight;

        vartmp = 0;
        vartmp += 5 * n_A_Weapon2_ATKplus;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 20;
        if (n_A_Weapon2_ATKplus >= 8) vartmp += 30;
        n_tok[ITEM_SP_HEAL_UP_USING] += vartmp * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「トンボがとまった黄色い猫じゃらし」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_KIROI_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_KIROI_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 10 * n_A_Weapon_ATKplus * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += 10 * n_A_Weapon2_ATKplus * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ディーヴァフォックステイル」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「ミラージュフォックステイル」の、精錬による効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon_ATKplus * 2 * itemCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += n_A_Weapon2_ATKplus * 2 * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「可愛い草のネックレス」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAWAII_KUSANO_NECKLACE)) > 0) {
        let sklLv = 0;
        sklLv += LearnedSkillSearch(SKILL_ID_SHINSENNA_EBI);
        sklLv += LearnedSkillSearch(SKILL_ID_EBI_ZANMAI);
        sklLv += LearnedSkillSearch(SKILL_ID_OTORO);
        sklLv += LearnedSkillSearch(SKILL_ID_MAGURO_SHIELD);
        sklLv += LearnedSkillSearch(SKILL_ID_GROOMING);
        sklLv += LearnedSkillSearch(SKILL_ID_NODOWO_NARASU);
        sklLv += LearnedSkillSearch(SKILL_ID_EBI_PARTY);
        n_tok[ITEM_SP_HEAL_UP_USING] += 4 * ROUNDDOWN(sklLv / 5) * itemCount;
    }

    //----------------------------------------------------------------
    // 「特選アジのお守り」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_AZINO_OMAMORI)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「イリュージョン看護帽」の、ベースレベルによる強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ILLUSION_KANGOBO)) {
        if (n_A_BaseLV >= 170) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 10;
        }
    }

    //----------------------------------------------------------------
    // 「もこもこお魚シューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MOKOMOKO_OSAKANA_SHOES)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 10 * LearnedSkillSearch(SKILL_ID_NODOWO_NARASU) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ディアボロスウィング　ローブセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * n_A_BODY_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「[ECO] ミニー・ドゥ・アルマカード」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ECO_MINIY_DO_ARMA, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ECO_MINIY_DO_ARMA, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 1 * n_A_Weapon_ATKplus * cardCountRight;
        n_tok[ITEM_SP_HEAL_UP_USING] += 1 * n_A_Weapon2_ATKplus * cardCountLeft;
    }

    //----------------------------------------------------------------
    // 「ヴァルゴ」の、精錬による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_VIRGO, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
        // アークビショップ限定の効果
        if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 2 * n_A_HEAD_DEF_PLUS * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「アークビショップマーガレッタ(MVP)カード」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP)) > 0) {
        if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 15 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「ちゃぷちゃぷニャンプーハット」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_CHAPUCHAPU_NYANPU_HAT)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 20 * LearnedSkillSearch(SKILL_ID_NODOWO_NARASU) * itemCount;
    }

    //----------------------------------------------------------------
    // 「崇拝の指輪」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SUHAINO_YUBIWA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ORATIO) >= 10) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 30 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「粛清の靴」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SHUKUSEINO_KUTSU)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 8 * LearnedSkillSearch(SKILL_ID_LAUDAAGNUS) * itemCount;
        n_tok[ITEM_SP_HEAL_UP_USING] += 8 * LearnedSkillSearch(SKILL_ID_LAUDARAMUS) * itemCount;
    }

    //----------------------------------------------------------------
    // 「異国の伝統帽子　ペクソジンカード」セットの、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_IKOKUNO_DENTO_BOSHI_PEKUSOZIN)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 6 * n_A_HEAD_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「異国の伝統帽子　封印されたペクソジンカード」セットの、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_IKOKUNO_DENTO_BOSHI_FUINSARTA_PEKUSOZIN)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * n_A_HEAD_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「アメイジング・グレイス」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_AMAZING_GRACE)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 3 * (LearnedSkillSearch(SKILL_ID_LAUDAAGNUS) + LearnedSkillSearch(SKILL_ID_LAUDARAMUS)) * itemCount;
        n_tok[ITEM_SP_HEAL_UP_USED] += 3 * (LearnedSkillSearch(SKILL_ID_LAUDAAGNUS) + LearnedSkillSearch(SKILL_ID_LAUDARAMUS)) * itemCount;
    }

    if (EquipNumSearch(1469)) {
        if (n_A_BODY_DEF_PLUS >= 5) n_tok[ITEM_SP_HEAL_UP_USING] += Math.floor((n_A_BODY_DEF_PLUS - 5) / 2) * 2 + 2;
        n_tok[ITEM_SP_HEAL_UP_USED] += Math.floor(n_A_BODY_DEF_PLUS / 2);
    }
    if (n_A_BaseLV <= 79 && EquipNumSearch(1533)) n_tok[ITEM_SP_HEAL_UP_USED] += 5;
    if (n_A_Weapon_ATKplus >= 7 && n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
        if (EquipNumSearch(1563) || EquipNumSearch(1565)) n_tok[ITEM_SP_HEAL_UP_USING] += 10;
    }
    if (EquipNumSearch(1695))
        if (GetLowerJobSeriesID(n_A_JOB) == 3 || GetLowerJobSeriesID(n_A_JOB) == 5) n_tok[ITEM_SP_HEAL_UP_USING] += 7;
    if (EquipNumSearch(1752) || EquipNumSearch(1753)) n_tok[ITEM_SP_HEAL_UP_USED] += Math.floor(n_A_SHOULDER_DEF_PLUS / 3);
    if (EquipNumSearch(1698)) n_tok[ITEM_SP_HEAL_UP_USING] += 6 * n_A_Weapon_ATKplus;
    if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1927)) n_tok[ITEM_SP_HEAL_UP_USING] += 10;
    if (EquipNumSearch(2244)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 2 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 2);
        if (EquipNumSearch(2246)) n_tok[ITEM_SP_HEAL_UP_USING] += 3 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
    }
    if (EquipNumSearch(2282)) n_tok[ITEM_SP_HEAL_UP_USING] += 2 * n_A_HEAD_DEF_PLUS;
    if (n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(2519)) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 6;
        if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_HEAL_UP_USING] += 9;
        if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_HEAL_UP_USING] += 12;
    }
    if (n_A_Weapon_ATKplus >= 1 && EquipNumSearch(2520)) n_tok[ITEM_SP_HEAL_UP_USING] += 4 * n_A_Weapon_ATKplus;
    if (GetLowerJobSeriesID(n_A_JOB) == 3 && n_A_card[CARD_REGION_ID_HEAD_TOP] == 623) n_tok[ITEM_SP_HEAL_UP_USING] += Math.floor(n_A_HEAD_DEF_PLUS / 2);
    if (CardNumSearch(826)) {
        if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_HEAL_UP_USING] += 2 * CardNumSearch(826);
        if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_HEAL_UP_USING] += 2 * CardNumSearch(826);
    }

    //----------------------------------------------------------------
    // 「[衣装]ビギナー帽」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = CostumeNumSearch(COSTUME_ID_BEGINNER_BO)) > 0) {
        if (n_A_BaseLV >= 99) {
            n_tok[ITEM_SP_HEAL_UP_USING] -= 150;
        } else {
            switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
                case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
                case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
                    n_tok[ITEM_SP_HEAL_UP_USING] -= 150;
                    break;
                default:
                    n_tok[ITEM_SP_HEAL_UP_USING] -= 10 * ROUNDDOWN(n_A_BaseLV / 10);
                    n_tok[ITEM_SP_HEAL_UP_USED] += 10 * ROUNDDOWN(n_A_BaseLV / 10);
                    break;
            }
        }

    }

    if (CardNumSearch(827)) {
        if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_HEAL_UP_USED] += 1 * CardNumSearch(827);
        if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_HEAL_UP_USED] += 1 * CardNumSearch(827);
    }

    //----------------------------------------------------------------
    // 「サモナー　海の力」の、効果
    //----------------------------------------------------------------
    if (Math.max(LearnedSkillSearch(SKILL_ID_UMINO_CHIKARA), UsedSkillSearch(SKILL_ID_UMINO_CHIKARA)) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 50;
        let summoner_skill_seafood_sum = 0;
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_SHINSENNA_EBI);
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_EBI_ZANMAI);
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_OTORO);
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_MAGURO_SHIELD);
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_GROOMING);
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_NODOWO_NARASU);
        summoner_skill_seafood_sum += LearnedSkillSearch(SKILL_ID_EBI_PARTY);
        if (Math.max(summoner_skill_seafood_sum, UsedSkillSearch(SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI)) >= 20) {
            n_tok[ITEM_SP_HEAL_UP_USING] += 100;
        }
    }

    //----------------------------------------------------------------
    // 「スーパーノービス＋　ブレイクスルー」の、効果
    //----------------------------------------------------------------
    if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_BREAK_THROUGH), UsedSkillSearch(SKILL_ID_BREAK_THROUGH))) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USED] += 2 * sklLv;
    }

	/**
	 * 「バード イドゥンの林檎」の、効果
	 */
    if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_APPLEIDUN]) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USED] += 20 + 3 * sklLv;
    }

    //----------------------------------------------------------------
    // 「スーパーノービス＋　トランセンデンス」の、効果
    //----------------------------------------------------------------
    if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_TRANSCENDENCE), UsedSkillSearch(SKILL_ID_TRANSCENDENCE))) > 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += 3 * sklLv;
    }

	/**
	 * 幻想叢書カード　アグネス　の効果
	 */
	if (n_A_PassSkill7[52] === 1) {
		n_tok[ITEM_SP_HEAL_UP_USING] += 10;
	}

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    let confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_HEAL_UP_USING);
    if (confval != 0) {
        n_tok[ITEM_SP_HEAL_UP_USING] += confval;
    }

    confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_HEAL_UP_USED);
    if (confval != 0) {
        n_tok[ITEM_SP_HEAL_UP_USED] += confval;
    }

    n_tok[ITEM_SP_HEAL_UP_USING] += n_tok[ITEM_SP_HEAL_UP_USING_GVGTE];
}

