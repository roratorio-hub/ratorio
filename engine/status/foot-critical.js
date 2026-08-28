/**
 * クリティカルダメージ増加率・クリティカル率加算値を取得する。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { n_A_PassSkill7, UsedSkillSearch, n_A_PassSkill8 } from "../skill/skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_BARD, JOB_SERIES_ID_DANCER,
    JOB_SERIES_ID_HUNTER, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_THIEF
} from "../data/mig.job.h.js";
import {
    g_confDataDebuff, g_confDataNizi, g_confDataSanzi, g_confDataYozi, g_objCharaConfCustomAtk,
    g_objCharaConfCustomStatus
} from "../runtime/global.js";
import { ApplySpecModify, GetTotalPureBasicStatus } from "../chara/hmjob.js";
import { n_A_Arrow, n_A_BaseLV, n_Enekyori, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CCharaConfYozi } from "../chara/CCharaConfYozi.js";
import { ARROW_ID_SURUDOI_YA } from "../arrow.dat.js";
import {
    CARD_ID_BOW_GUARDIAN, CARD_ID_CHUNGE, CARD_ID_COTNESS, CARD_ID_EFREET, CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI,
    CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_ID_E_EA1L, CARD_ID_FUINSARETA_EFREET, CARD_ID_FUR_SEAL,
    CARD_ID_HEART_HUNTER_AT, CARD_ID_KICK_AND_KICK, CARD_ID_KYODAI_WHISPER, CARD_ID_LOLA, CARD_ID_MOBSTER,
    CARD_ID_POWERFUL_S_SKELETON, CARD_ID_RANGER_CECIL_MVP, CARD_ID_SIDE_RIDER, CARD_ID_SWORD_GUARDIAN,
    CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_EFREET, CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_EFREET
} from "../card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "../runtime/common.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from "../const/EnumEquipRegionId.js";
import {
    ITEM_KIND_BOW, ITEM_KIND_CLUB, ITEM_KIND_FIST, ITEM_KIND_KATAR, ITEM_KIND_SPEAR, ITEM_KIND_SPEAR_2HAND,
    ITEM_KIND_WHIP
} from "../const/EnumItemKind.js";
import {
    ITEM_SP_CRITICAL_DAMAGE_UP, ITEM_SP_CRITICAL_UP_RACE_SOLID, ITEM_SP_CRI_PLUS, ITEM_SP_LONGRANGE_CRI_PLUS
} from "../const/EnumItemSpId.js";
import { JOB_ID_ACOLYTE, JOB_ID_RANGER, JOB_ID_THIEF } from "../const/EnumJobId.js";
import { IsLongRange } from "../equip/equip.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_ANEMOS_SHIELD, ITEM_ID_AOKI_YAKOSEKI, ITEM_ID_AVENGER_HUNTERBOW, ITEM_ID_AVENGER_JAMADHAR,
    ITEM_ID_GAIA_SHIELD, ITEM_ID_HAIHANENO_BOOTS, ITEM_ID_HANGYAKUSHANO_SCARF, ITEM_ID_HEAVENLY_ORDER,
    ITEM_ID_ILLUSION_COUNTER_DAGGER, ITEM_ID_KENSENO_OKAN, ITEM_ID_KOUNNO_ZIKU_BOOTS_S1, ITEM_ID_MARRACONO_KAWA,
    ITEM_ID_MATAGINO_KENNATA, ITEM_ID_MOISURA_OS, ITEM_ID_MONOKAGE, ITEM_ID_MYSTERY_WING, ITEM_ID_RISUMIMI_HOODBO,
    ITEM_ID_SAVE_THE_KING, ITEM_ID_SENSHISHANO_MANT, ITEM_ID_SNIPING_SHOES, ITEM_ID_TATSUZINNO_TSUCHI,
    ITEM_ID_TATSUZINNO_TSUCHI_S2, ITEM_ID_VALKYRIE_KNIFE, ITEM_SET_ID_BOTONO_SCARF_GLASS,
    ITEM_SET_ID_BOTONO_SCARF_SUNGLASS, ITEM_SET_ID_BUKYO_KUTSU_SWORD, ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE,
    ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_LINDY_HOP, ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS,
    ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL, ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS,
    ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO, ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_ASSAULT
} from "../item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_AGI, SU_DEX, SU_LUK, SU_STR, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_JobLV, n_A_LUK,
    n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_WeaponType,
    n_A_Weapon_ATKplus, n_A_card
} from "../runtime/roro-state.js";
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_BAKURETSU_HADO, SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, SKILL_ID_CAMOUFLAGE,
    SKILL_ID_DANCENO_RENSHU, SKILL_ID_DRAGON_TAIL, SKILL_ID_FLIP_FLAP, SKILL_ID_INVISIBILITY, SKILL_ID_KASUMIGIRI,
    SKILL_ID_KATAR_SHUREN, SKILL_ID_MACE_SHUREN, SKILL_ID_SEIMEINO_CHIKARA, SKILL_ID_SENRYU_SHOTEN,
    SKILL_ID_SIXTH_SENSE, SKILL_ID_SOUL_ATTACK, SKILL_ID_SPEAR_QUICKEN, SKILL_ID_TRUE_SIGHT
} from "../skill/skill.dat.js";
import { TIME_ITEM_ID_RING_OF_FLAME_LORD, TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO } from "../timeitem.dat.js";
import { EquipNumSearchFurubitaSet, ROUNDDOWN } from "../bridge/foot-bridge.js";

// foot.js 専有のモジュールレベル変数（各関数内で書いてから読む。write-before-read 確認済み）
let itemCountRight = 0;
let itemCountLeft = 0;

/**
 * 公式サイトで「クリティカル攻撃で与えるダメージ + ◯%」と表記されるダメージの増加率を取得する
 * @returns {Number}
 */
export function getCriticalDamageRate() {
	var bufLv = 0, itemCount = 0, cardCount = 0, vartmp = 0;
	var cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
    let damage_ratio = n_tok[ITEM_SP_CRITICAL_DAMAGE_UP];

    damage_ratio += GetRndOptTotalValue(ITEM_SP_CRITICAL_DAMAGE_UP, null, false);

    if (EquipNumSearch(1089)) {
        damage_ratio += (2 * n_A_Weapon_ATKplus);
    }
    if (EquipNumSearch(1091)) {
        if (n_A_Weapon_ATKplus >= 5) {
            damage_ratio += 10;
        }
        if (n_A_Weapon_ATKplus >= 7) {
            damage_ratio += 10;
        }
    }
    if (EquipNumSearch(1358)) {
        if (n_A_Arrow == ARROW_ID_SURUDOI_YA) {
            damage_ratio += 5;
            if (n_A_HEAD_DEF_PLUS >= 7) {
                damage_ratio += 5;
            }
        }
    }
    if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1591)) {
        damage_ratio += 15;
    }
    if (EquipNumSearch(1592)) {
        damage_ratio += n_A_SHOULDER_DEF_PLUS;
    }
    if (n_A_SHOULDER_DEF_PLUS >= 5 && EquipNumSearch(1631)) {
        damage_ratio += 3;
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            damage_ratio += 4;
        }
    }
    if (EquipNumSearch(1801)) {
        damage_ratio += 2 * n_A_Weapon_ATKplus;
    }
    if (n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1812)) {
        damage_ratio += 3;
    }

    if (EquipNumSearch(ITEM_ID_KENSENO_OKAN) && LearnedSkillSearch(SKILL_ID_KATAR_SHUREN) == 10) {
        damage_ratio += 20;
    }

    // 幸運の時空ブーツ
    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(1922)) {
        damage_ratio += 2 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
    }
    if (SU_LUK >= 120 && EquipNumSearch(1922)) {
        damage_ratio += 30;
    }
    if (n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)) {
        damage_ratio += 2 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
    }
    if (SU_LUK >= 120 && EquipNumSearch(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)) {
        damage_ratio += 30;
    }

    if (SU_LUK >= 110 && EquipNumSearch(1951)) {
        damage_ratio += 1 * EquipNumSearch(1951);
    }
    if (n_A_BODY_DEF_PLUS >= 5 && EquipNumSearchMIG(2170)) {
        damage_ratio += 4;
        if (n_A_BODY_DEF_PLUS >= 7) {
            damage_ratio += 6;
        }
    }
    if (EquipNumSearch(2242)) {
        if (SU_LUK >= 108) {
            damage_ratio += 10;
        }
        if (SU_LUK >= 120) {
            damage_ratio += 17;
        }
        damage_ratio -= 2 * ROUNDDOWN(SU_DEX / 10);
    }
    if (n_A_SHOULDER_DEF_PLUS >= 5 && EquipNumSearch(2288)) {
        damage_ratio += 3;
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            damage_ratio += 4;
        }
    }
    if (GetLowerJobSeriesID(n_A_JOB) == 4 && EquipNumSearch(2517)) {
        damage_ratio += 15;
    }

    //----------------------------------------------------------------
    // 「戦死者のマント」の、純粋なＬＵＫが１３０の時
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)) {
        if (SU_LUK >= 130) {
            if (EquipNumSearchFurubitaSet() > 0) {
                damage_ratio += 10;
            } else {
                damage_ratio += 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「蒼き夜光石」の、ステによる強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AOKI_YAKOSEKI)) {
        if (SU_LUK >= 100) {
            damage_ratio += 10 * EquipNumSearch(ITEM_ID_AOKI_YAKOSEKI);
        }
    }

    //----------------------------------------------------------------
    // 「ヴァルキリーナイフ」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            // ノービス系
            case JOB_SERIES_ID_NOVICE:
                damage_ratio += 1 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
                break;
                // マジシャン系
            case JOB_SERIES_ID_MAGICIAN:
                break;
                // シーフ系
            case JOB_SERIES_ID_THIEF:
                damage_ratio += 1 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS);
                damage_ratio += 1 * n_A_Weapon2_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
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
    // 「ローラカード」の、強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_LOLA)) {
        if (n_A_WeaponType == ITEM_KIND_CLUB) {
            damage_ratio += (10 + 1 * n_A_Weapon_ATKplus) * CardNumSearch(CARD_ID_LOLA);
        }
    }

    //----------------------------------------------------------------
    // 「アヴェンジャージャマダハル」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AVENGER_JAMADHAR)) {
        if (n_A_Weapon_ATKplus >= 5) {
            damage_ratio += 20;
        }
        if (n_A_Weapon_ATKplus >= 7) {
            damage_ratio += 20;
        }
    }

    //----------------------------------------------------------------
    // 「アヴェンジャーハンターボウ」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
        damage_ratio += 2 * n_A_Weapon_ATKplus;
    }

    //----------------------------------------------------------------
    // 「リス耳フード帽」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_RISUMIMI_HOODBO)) {
        if (n_A_HEAD_DEF_PLUS >= 5) {
            damage_ratio += 2;
        }
        if (n_A_HEAD_DEF_PLUS >= 7) {
            damage_ratio += 6;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            damage_ratio += 12;
        }
    }

    //----------------------------------------------------------------
    // 「ガイアシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_LUK >= 90) {
                damage_ratio += 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「反逆者のスカーフ」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
        damage_ratio += 3 * LearnedSkillSearch(SKILL_ID_DRAGON_TAIL) * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　グラスセット」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
        damage_ratio += 10 * ROUNDDOWN((SU_STR + SU_LUK) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　サングラスセット」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
        damage_ratio += 10 * ROUNDDOWN((SU_STR + SU_LUK) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「アネモスシールド」の、精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
        if (n_A_SHIELD_DEF_PLUS >= 8) {
            if (SU_LUK >= 90) {
                damage_ratio += 5;
            }
        }
    }

    //----------------------------------------------------------------
    // 「マラクの皮」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_MARRACONO_KAWA)) {
        if (n_A_SHOULDER_DEF_PLUS >= 7) {
            damage_ratio += 5;
        }
        if (n_A_SHOULDER_DEF_PLUS >= 9) {
            damage_ratio += 5;
        }
    }

    //----------------------------------------------------------------
    // 「くわえたハートのエース　ギャンブラーシールセット」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL)) > 0) {
        damage_ratio += 2 * ROUNDDOWN(SU_DEX / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「くわえたハートのエース　ギャンブラーシールセット」の、素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL)) > 0) {
        if (SU_LUK >= 108) {
            damage_ratio += 2 * itemCount;
        }
        if (SU_LUK >= 120) {
            damage_ratio += 4 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「灰羽のブーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HAIHANENO_BOOTS)) > 0) {
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 3;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 5;
        damage_ratio += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「灰羽のブーツ　白羽スーツセット」の、素ＬＵＫによる強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
        damage_ratio += 4 * ROUNDDOWN(SU_LUK / 20) * itemCount;
    }

    //----------------------------------------------------------------
    // 「不死の軍団認識票　リンディーホップセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_LINDY_HOP)) > 0) {
        damage_ratio += 3 * n_A_Weapon_ATKplus * itemCount;
    }

    //----------------------------------------------------------------
    // 「イリュージョンカウンターダガー」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_COUNTER_DAGGER)) > 0) {
        if (n_A_BaseLV >= 170) {
            damage_ratio += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「キックアンドキックカード」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_KICK_AND_KICK)) {
        if (n_A_SHOES_DEF_PLUS >= 7) damage_ratio += 3;
        if (n_A_SHOES_DEF_PLUS >= 9) damage_ratio += 2;
    }

    //----------------------------------------------------------------
    // 「死のニーヴ(幸運)」の、精錬による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_ARMS_LEFT_ANY);
    cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_HEAD_TOP_ANY);
    cardCountShield = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_SHIELD_ANY);
    cardCountBody = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_BODY_ANY);
    cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_SHOULDER_ANY);
    cardCountShoes = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN, CARD_REGION_ID_SHOES_ANY);
    if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield +
        cardCountBody + cardCountShoulder + cardCountShoes > 0) {

        // 右手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon_ATKplus >= 7) vartmp += 1;
        if (n_A_Weapon_ATKplus >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountRight

        // 左手武器へのエンチャント
        vartmp = 0;
        if (n_A_Weapon2_ATKplus >= 7) vartmp += 1;
        if (n_A_Weapon2_ATKplus >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountLeft

        // 頭防具へのエンチャント
        vartmp = 0;
        if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 1;
        if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountHeadTop

        // 盾防具へのエンチャント
        vartmp = 0;
        if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 1;
        if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountShield

        // 体防具へのエンチャント
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) vartmp += 1;
        if (n_A_BODY_DEF_PLUS >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountBody

        // 肩防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1;
        if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountShoulder

        // 靴防具へのエンチャント
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1;
        if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 1;
        damage_ratio += vartmp * cardCountShoes

        // アクセサリへのエンチャント
        // 精錬できないので処理不要
    }

    //----------------------------------------------------------------
    // 「サイドライダーカード」の、素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_SIDE_RIDER)) > 0) {
        if (SU_LUK >= 120) {
            damage_ratio += 5 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「フロンティアブーツ　物影セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE)) > 0) {
        if (n_A_SHOES_DEF_PLUS >= 7) {
            damage_ratio += 30 * itemCount;
        }
        if (n_A_SHOES_DEF_PLUS >= 9) {
            damage_ratio += 20 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「スナイピングシューズ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_SHOES)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
            damage_ratio += 25 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「モイスラ-OS」の、ベースレベルによる効果
    //----------------------------------------------------------------
    itemCountRight = EquipNumSearch(ITEM_ID_MOISURA_OS, EQUIP_REGION_ID_ARMS);
    itemCountLeft = EquipNumSearch(ITEM_ID_MOISURA_OS, EQUIP_REGION_ID_ARMS_LEFT);
    if ((itemCountRight > 0) || (itemCountLeft > 0)) {
        damage_ratio += 1 * n_A_BaseLV * itemCountRight;
        damage_ratio += 1 * n_A_BaseLV * itemCountLeft;
    }

    //----------------------------------------------------------------
    // 「E-EA1Lカード」の、武器種別による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_E_EA1L, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_E_EA1L, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        if (n_A_WeaponType == ITEM_KIND_BOW) {
            damage_ratio += 1 * (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
            damage_ratio += 1 * (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「コトネスカード」の、武器種別による効果 クリティカルダメージUP
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_COTNESS, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_COTNESS, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        if (n_A_WeaponType == ITEM_KIND_FIST) {
            damage_ratio += (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
            damage_ratio += (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「ペタルの尻尾　リス耳フード帽セット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO)) {
        if (n_A_HEAD_DEF_PLUS >= 6) damage_ratio += 10;
        if (n_A_HEAD_DEF_PLUS >= 8) damage_ratio += 15;
    }

    //----------------------------------------------------------------
    // 「ミステリーウィング」の、素ステータスによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
        damage_ratio += 5 * Math.floor(GetTotalPureBasicStatus() / 100) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ハートハンターATカード」の、強化
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_HEART_HUNTER_AT, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_HEART_HUNTER_AT, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        if (n_A_WeaponType == ITEM_KIND_KATAR) {
            damage_ratio += (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
            damage_ratio += (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
        }
    }

    if (GetLowerJobSeriesID(n_A_JOB) == 2 && n_A_card[CARD_REGION_ID_HEAD_TOP] == 624) damage_ratio += Math.floor(n_A_HEAD_DEF_PLUS / 2);
    if (CardNumSearch(738)) damage_ratio += 2 * ROUNDDOWN(SU_LUK / 10);
    if (EquipNumSearch(1357)) {
        if (EquipNumSearch(261)) n_tok[45] += 10;
        if (EquipNumSearch(1221)) n_tok[36] += 10;
        if (EquipNumSearch(364)) n_tok[30] += 10;
        if (EquipNumSearch(1023)) n_tok[37] += 10;
        if (EquipNumSearch(382)) n_tok[32] += 10;
    }

	/**
	 * 「ダンサー 幸運のキス」の効果
	 */
    if ((bufLv = g_confDataNizi[CCharaConfNizi.CONF_ID_FORTUNEKISS]) > 0) {
        damage_ratio += 5 + bufLv;
    }	

    /**
     * 「三次職支援　ラウダラムス」の効果
     */
    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_LAUDARAMUS]) > 0) {
        damage_ratio += [0, 6, 9, 12, 15][bufLv];
    }

    // TODO: 四次対応
    damage_ratio = ApplySpecModify(ITEM_SP_CRITICAL_DAMAGE_UP, damage_ratio);

	/**
	 * 幻想叢書カード イーブル
	 */
	if (n_A_PassSkill7[52] === 7) {
		damage_ratio += 10;
	}

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    const confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_CRITICAL_DAMAGE_UP);
    if (confval != 0) {
        damage_ratio += confval;
    }

    return damage_ratio;
}

/**
 * 公式サイトで「Cri + ◯」と表記されるクリティカル率の加算値を取得する
 * @param {Array} mobData 対象に応じてクリティカル率が増加する場合に参照される 
 * @returns 最終的に加算されるCRIの値
 */
export function GetAdditionalCriticalRate(mobData) {
	var idx, sklLv = 0, confval = 0, bufLv = 0, itemCount = 0, cardCount = 0, cardCountRight = 0, cardCountLeft = 0;
    /** 最終的に返されるCRIの値 */
    let cri = 0;
    /** 計算途中のCRIの値 */
    let tmp_cri = 0;
	/** アイテム数・スキルLvを格納する一次変数 */
	let prefetch = 0;

    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    for (idx = ITEM_SP_CRI_PLUS; idx <= ITEM_SP_CRI_PLUS; idx++) {
        n_tok[idx] += GetRndOptTotalValue(idx, null, false);
    }

    // TODO: 四次対応
    for (idx = ITEM_SP_CRI_PLUS; idx <= ITEM_SP_CRI_PLUS; idx++) {
        n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
    }

    // CRI増加のアイテムSPを加算する
    tmp_cri += n_tok[ITEM_SP_CRI_PLUS];

    // 特定種族へCRI増加のアイテムSPを加算する
    tmp_cri += n_tok[ITEM_SP_CRITICAL_UP_RACE_SOLID + mobData[19]];

    // カードによるCRI増加能力を加算する
    if (CardNumSearch(CARD_ID_CHUNGE) > 0) tmp_cri += n_A_SHOULDER_DEF_PLUS;
    if (GetLowerJobSeriesID(n_A_JOB) === JOB_ID_THIEF) tmp_cri += 4 * CardNumSearch(CARD_ID_MOBSTER);
    if (GetLowerJobSeriesID(n_A_JOB) === JOB_ID_ACOLYTE) {
        if (mobData[19] === 1 || mobData[19] === 6) tmp_cri += 9 * CardNumSearch(CARD_ID_FUR_SEAL);
    }
    if (SU_LUK >= 80 && CardNumSearch(CARD_ID_KYODAI_WHISPER)) tmp_cri += 3;
    if (n_A_WeaponType === 3 || n_A_WeaponType === 2) tmp_cri += CardNumSearch(CARD_ID_SWORD_GUARDIAN) * 5;
    if (n_A_WeaponType === 10) tmp_cri += CardNumSearch(CARD_ID_BOW_GUARDIAN) * 5;
    if (CardNumSearch(CARD_ID_EFREET)) tmp_cri += Math.floor(n_A_JobLV / 10) * CardNumSearch(CARD_ID_EFREET);

    // 装備によるCRI増加能力を加算する
    if (n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(785)) tmp_cri += (n_A_HEAD_DEF_PLUS - 5);
    if (EquipNumSearch(640)) tmp_cri += Math.floor(SU_LUK / 5);
    if (EquipNumSearch(689)) tmp_cri += Math.floor(SU_LUK / 10);
    if (SU_AGI >= 90 && EquipNumSearch(442)) tmp_cri += 10 * EquipNumSearch(442);
    if (GetLowerJobSeriesID(n_A_JOB) == 41 && EquipNumSearch(675)) tmp_cri += 5;
    if (EquipNumSearch(623)) tmp_cri += n_A_Weapon_ATKplus;
    if (EquipNumSearch(1122) && GetLowerJobSeriesID(n_A_JOB) == 6) tmp_cri += 5;
    if (n_A_Weapon_ATKplus >= 7 && mobData[19] == 7 && EquipNumSearch(1091)) tmp_cri += 5;
    if (EquipNumSearch(ITEM_ID_TATSUZINNO_TSUCHI) || EquipNumSearch(ITEM_ID_TATSUZINNO_TSUCHI_S2)) {
        tmp_cri += (2 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN));
    }
    if (SU_DEX >= 90 && EquipNumSearch(1164)) tmp_cri += 5;
    if (n_A_HEAD_DEF_PLUS >= 7)
        if (EquipNumSearch(1267)) tmp_cri += 5;
    if (SU_STR >= 120 && EquipNumSearch(1313)) tmp_cri += 3;
    if (SU_AGI >= 120 && EquipNumSearch(1200)) tmp_cri += 4 * EquipNumSearch(1200);
    if (EquipNumSearch(1412)) tmp_cri += Math.floor(n_A_SHOES_DEF_PLUS / 2);
    if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1591)) tmp_cri += 8;
    if (EquipNumSearch(1661)) tmp_cri += n_A_Weapon_ATKplus;
    if (n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1812)) tmp_cri += 3;
    if (EquipNumSearch(1951)) tmp_cri += ROUNDDOWN(SU_LUK / 10) * EquipNumSearch(1951);
    if (SU_STR >= 110 && CardNumSearch(707)) tmp_cri += 20;
    if (EquipNumSearch(2242)) {
        tmp_cri += ROUNDDOWN(SU_LUK / 10);
        if (SU_LUK >= 108) tmp_cri += 5;
        if (SU_LUK >= 120) tmp_cri += 10;
    }
    if (n_A_SHIELD_DEF_PLUS >= 7 && EquipNumSearch(2253)) tmp_cri += 2;
    if (n_A_WeaponType == 10 && n_A_Arrow == ARROW_ID_SURUDOI_YA) tmp_cri += 20;

    // ドロセラカード
    // 遠距離限定
    n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += CardNumSearch(462) * 15;

    //----------------------------------------------------------------
    // 「蒼き夜光石」の、ステによる強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_AOKI_YAKOSEKI)) {
        if (SU_LUK >= 100) {
            tmp_cri += 10 * EquipNumSearch(ITEM_ID_AOKI_YAKOSEKI);
        }
    }

    //----------------------------------------------------------------
    // 「ヴァルキリーナイフ」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            // ノービス系
            case JOB_SERIES_ID_NOVICE:
                tmp_cri += 7 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
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
                        break;
                }
        }
    }

    //----------------------------------------------------------------
    // 「リス耳フード帽」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_RISUMIMI_HOODBO)) {
        // 遠距離物理攻撃限定の効果
        n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 5;
        if (n_A_HEAD_DEF_PLUS >= 5) n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 10;
        if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 15;
        if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 20;
    }

    //----------------------------------------------------------------
    // 「セイヴザキング」の、騎兵修練【未習得】時における、「スピアクイッケン」習得による効果
    //----------------------------------------------------------------
    if (LearnedSkillSearch(78) == 0) {
        if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) {
            tmp_cri += 3 * LearnedSkillSearch(SKILL_ID_SPEAR_QUICKEN);
        }
    }

    //----------------------------------------------------------------
    // 「マタギの剣鉈」の、素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MATAGINO_KENNATA)) > 0) {
        // 遠距離物理攻撃限定の効果
        if (SU_LUK >= 100) n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 10 * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　グラスセット」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
        tmp_cri += 5 * ROUNDDOWN((SU_STR + SU_LUK) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「暴徒のスカーフ　サングラスセット」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
        tmp_cri += 5 * ROUNDDOWN((SU_STR + SU_LUK) / 80) * itemCount;
    }

    //----------------------------------------------------------------
    // 「マラクの皮」の、素ＳＴＲと素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MARRACONO_KAWA)) > 0) {
        if (n_A_SHOULDER_DEF_PLUS >= 8) {
            tmp_cri += 1 * ROUNDDOWN((SU_STR + SU_LUK) / 20) * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「物影」の、スキル習得による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MONOKAGE)) > 0) {
        tmp_cri += 5 * LearnedSkillSearch(SKILL_ID_KASUMIGIRI) * itemCount;
    }

    //----------------------------------------------------------------
    // 「ニーヴバレッタ　ニーヴ武器セット」の、素ＬＵＫによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
        tmp_cri += 1 * ROUNDDOWN(SU_LUK / 10) * itemCount;
    }

    //----------------------------------------------------------------
    // 「不死の軍団認識票　リンディーホップセット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_LINDY_HOP)) > 0) {
        if (n_A_Weapon_ATKplus >= 9) {
            tmp_cri += 50 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ローラカード」の、強化
    //----------------------------------------------------------------
    if (CardNumSearch(CARD_ID_LOLA)) {
        if (n_A_WeaponType == ITEM_KIND_CLUB) {
            tmp_cri += (10 + 1 * n_A_Weapon_ATKplus) * CardNumSearch(CARD_ID_LOLA);
        }
    }

    //----------------------------------------------------------------
    // 「エナジー＜致命ノ一撃＞」の、精錬による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI)) > 0) {
        tmp_cri += 1 * Math.max(0, (n_A_SHOULDER_DEF_PLUS - 4)) * cardCount;
    }

    //----------------------------------------------------------------
    // 「パワフルSスケルトンカード」の、ベースレベルによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_POWERFUL_S_SKELETON)) > 0) {
        tmp_cri += 1 * ROUNDDOWN(n_A_BaseLV / 20) * cardCount;
    }

    //----------------------------------------------------------------
    // 「レンジャーセシル(MVP)カード」の、職業による効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_RANGER_CECIL_MVP)) > 0) {
        if (IsSameJobClass(JOB_ID_RANGER)) {
            tmp_cri += 20 * cardCount;
        }
    }

    //----------------------------------------------------------------
    // 「武侠靴　剣セット」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_BUKYO_KUTSU_SWORD)) > 0) {
        tmp_cri += 5 * n_A_SHOES_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「ヘヴンリーオーダー」の、素ＤＥＸによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
        tmp_cri += 2 * Math.floor(SU_DEX / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「E-EA1Lカード」の、武器種別による効果
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_E_EA1L, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_E_EA1L, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        if (n_A_WeaponType == ITEM_KIND_BOW) {
            tmp_cri += 1 * (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
            tmp_cri += 1 * (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「コトネスカード」の、武器種別による効果　Cri+
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_COTNESS, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_COTNESS, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        if ((n_A_WeaponType == ITEM_KIND_FIST)) {
            tmp_cri += (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
            tmp_cri += (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「ペタルの尻尾　リス耳フード帽セット」の、過剰精錬による効果
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO)) {
        // 遠距離物理攻撃限定の効果
        if (n_A_HEAD_DEF_PLUS >= 6) n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 10;
        if (n_A_HEAD_DEF_PLUS >= 8) n_tok[ITEM_SP_LONGRANGE_CRI_PLUS] += 15;
    }

    //----------------------------------------------------------------
    // 「ランナウェー・アクセラレータ　T-Assault」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_ASSAULT)) > 0) {
        tmp_cri += 3 * n_A_HEAD_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「封印されたイフリートカード」の、ジョブレベルによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_EFREET)) > 0) {
        tmp_cri += 1 * Math.floor(n_A_JobLV / 20) * cardCount;
    }

    //----------------------------------------------------------------
    // 「豊穣の女神　イフリートカード」の、ジョブレベルによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_EFREET)) > 0) {
        tmp_cri += 1 * n_A_JobLV * cardCount;
    }

    //----------------------------------------------------------------
    // 「豊穣の女神　封印されたイフリートカード」の、ジョブレベルによる効果
    //----------------------------------------------------------------
    if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_EFREET)) > 0) {
        tmp_cri += 1 * Math.floor(n_A_JobLV / 2) * cardCount;
    }

    //----------------------------------------------------------------
    // 「ハートハンターATカード」の、強化
    //----------------------------------------------------------------
    cardCountRight = CardNumSearch(CARD_ID_HEART_HUNTER_AT, CARD_REGION_ID_ARMS_RIGHT_ANY);
    cardCountLeft = CardNumSearch(CARD_ID_HEART_HUNTER_AT, CARD_REGION_ID_ARMS_LEFT_ANY);
    if ((cardCountRight > 0) || (cardCountLeft > 0)) {
        if (n_A_WeaponType == ITEM_KIND_KATAR) {
            tmp_cri += (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
            tmp_cri += (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
        }
    }

    //----------------------------------------------------------------
    // 「パッシブ持続系　潜龍昇天」の、効果
    // 「パッシブ持続系　爆裂波動」の、効果
    // 「パッシブ持続系　爆裂波動（Sノビ）」の、効果
    // 「時限アイテム　ヴンダーカンマー（爆裂波動）」の、効果
    // 「時限アイテム　リングオブフレームロード（爆裂波動）」の、効果
    //----------------------------------------------------------------
    if ((sklLv = UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN)) > 0) {
        tmp_cri += 20;
    } else if ((sklLv = UsedSkillSearch(SKILL_ID_BAKURETSU_HADO)) > 0) {
        tmp_cri += 7.5 + 2.5 * sklLv;
    } else if ((sklLv = UsedSkillSearch(SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE)) > 0) {
        tmp_cri += 50;
    } else if (TimeItemNumSearch(TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO)) {
        tmp_cri += 15;
    } else if (TimeItemNumSearch(TIME_ITEM_ID_RING_OF_FLAME_LORD)) {
        tmp_cri += 10;
    }

	/**
	 * 「ダンサースキル ダンスの練習」の、効果
	 */
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_DANCENO_RENSHU), UsedSkillSearch(SKILL_ID_DANCENO_RENSHU))) > 0) {
		if(n_A_WeaponType === ITEM_KIND_WHIP) {
			tmp_cri += Math.round(0.5 * sklLv);
		}
	}
	/**
	 * 「ダンサースキル 幸運のキス」の、効果
	 */
	if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_FORTUNEKISS]) > 0) {
        tmp_cri += 20 + 3 * sklLv;
    }

    //----------------------------------------------------------------
    // 「パッシブ持続系　トゥルーサイト」の、効果
    //----------------------------------------------------------------
    if (UsedSkillSearch(SKILL_ID_TRUE_SIGHT) > 0) {
        tmp_cri += UsedSkillSearch(SKILL_ID_TRUE_SIGHT);
    }
    //----------------------------------------------------------------
    // 「二次職支援　トゥルーサイト」の、効果
    //----------------------------------------------------------------
    else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_TRUE_SIGHT]) > 0) {
        tmp_cri += sklLv;
    }

    //----------------------------------------------------------------
    // 「パッシブ持続系　スピアクイッケン」の、効果
    //----------------------------------------------------------------
    if ((n_A_WeaponType == ITEM_KIND_SPEAR) || (n_A_WeaponType == ITEM_KIND_SPEAR_2HAND)) {
        tmp_cri += UsedSkillSearch(SKILL_ID_SPEAR_QUICKEN) * 3;
    }

    //----------------------------------------------------------------
    // 「パッシブ持続系　インビジビリティ」の、効果
    //----------------------------------------------------------------
    tmp_cri += 20 * UsedSkillSearch(SKILL_ID_INVISIBILITY);

    //----------------------------------------------------------------
    // 「パッシブ持続系　カモフラージュ」の、効果
    //----------------------------------------------------------------
    tmp_cri += 10 * UsedSkillSearch(SKILL_ID_CAMOUFLAGE);

    //----------------------------------------------------------------
    // 「三次職支援　ストライキング」の、効果
    //----------------------------------------------------------------
    tmp_cri += g_confDataSanzi[CCharaConfSanzi.CONF_ID_STRIKING];

    //----------------------------------------------------------------
    // 「ソウルリーパー　影の魂」の、効果
    //----------------------------------------------------------------
    if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_KAGENO_TAMASHI]) > 0) {
        tmp_cri += 70;
    }

	/** アリテア「シックスセンス」の Cri + 効果 */
	tmp_cri += 5 * LearnedSkillSearch(SKILL_ID_SIXTH_SENSE);

	/** アリテア「フリップフラップ」「エアロシンク」の Cri + 効果 */
	prefetch = UsedSkillSearch(SKILL_ID_FLIP_FLAP);
	if (prefetch > 0) {
		tmp_cri += 5 * UsedSkillSearch(SKILL_ID_FLIP_FLAP);
	} else {
		// 対象が「フリップフラップ」状態の場合、「エアロシンク」状態にはならない
		tmp_cri += 20 * g_confDataYozi[CCharaConfYozi.CONF_ID_AERO_SYNC];
	}


    //----------------------------------------------------------------
    // 「サモナー　生命の力」の、効果
    //----------------------------------------------------------------
    if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA), UsedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA)) > 0) {
        tmp_cri += 20;
    }

	// 古い歌・踊り支援設定
    if (n_A_PassSkill7[25]) tmp_cri += 7;
    if (n_A_PassSkill7[28]) tmp_cri += 7;
    else if (n_A_PassSkill7[36]) tmp_cri += 7;
    if (0 < n_A_PassSkill7[46] && n_A_PassSkill7[46] <= 50) tmp_cri += n_A_PassSkill7[46];

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_CRI_PLUS);
    if (confval != 0) {
        tmp_cri += confval;
    }

    //----------------------------------------------------------------
    // 遠距離物理攻撃限定の効果
    //----------------------------------------------------------------
    if (n_Enekyori === 1 ||
        IsLongRange(n_A_Equip[EQUIP_REGION_ID_ARMS]) ||
        UsedSkillSearch(SKILL_ID_SOUL_ATTACK) ||
        LearnedSkillSearch(SKILL_ID_SOUL_ATTACK)
    ) {
        tmp_cri += n_tok[ITEM_SP_LONGRANGE_CRI_PLUS];
    }

    //----------------------------------------------------------------
    // 最終クリティカル率の計算
    //----------------------------------------------------------------
    cri = 0;
    // ステータスによるクリティカル率
    cri += 0.3 * n_A_LUK;
    // 装備特性
    cri += tmp_cri;
    // カタール装備時は２倍
    if (n_A_WeaponType == ITEM_KIND_KATAR) {
        cri *= 2;
    }
    // ベースレベルによるクリティカル率
    cri += 0.1 + (n_A_BaseLV / 100);
    // おそらく https://siarodiary.blog.fc2.com/blog-entry-511.html などの検証に基づくもの
    // 実際のクリティカル率を表示しようとする試みだと思われるので
    // ゲーム内のCri表示と計算機の間で誤差がありますが静観しています
    // 条件不問の基礎加算値
    cri += 1;
    // 小数点以下第二位で切り捨て
    cri = Math.floor(cri * 10) / 10;
    // 負数は０に補正
    cri = Math.max(0, cri);

    // その他の支援/設定「クリティカル率を0にする」またはプレイヤー状態異常「無気力」の場合
    if (n_A_PassSkill8[16] || g_confDataDebuff[CCharaConfDebuff.CONF_ID_LETHARGY] > 0) {
        cri = 0;
	}

    return cri;
}

