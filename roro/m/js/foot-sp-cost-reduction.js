/**
 * 消費SP軽減効果（getSPCostReductionRate）を取得する。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { UsedSkillSearch } from '../../../ro4/m/js/BuffJobSpecificSelf.js';
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_HUNTER, JOB_SERIES_ID_MAGICIAN,
    JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_THIEF
} from '../../../ro4/m/js/data/mig.job.h.js';
import {
    g_confDataDebuff, g_confDataNizi, g_objCharaConfCustomStatus, set_costDownForDisp
} from '../../../ro4/m/js/global.js';
import { n_tok } from '../../../ro4/m/js/ro4-state.js';
import { CCharaConfCustomStatus } from './CCharaConfCustomStatus.js';
import { CCharaConfDebuff } from './CCharaConfDebuff.js';
import { CCharaConfNizi } from './CCharaConfNizi.js';
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from './chara.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from './const/EnumEquipRegionId.js';
import { ITEM_SP_COST_DOWN } from './const/EnumItemSpId.js';
import { JOB_ID_GENETIC, JOB_ID_MECHANIC } from './const/EnumJobId.js';
import { GetRndOptTotalValue } from './hmrndopt.js';
import {
    ITEM_ID_BLACK_FEATHER, ITEM_ID_DOKUSTIANO_TIARA, ITEM_ID_FURUBITA_DRIVERBAND_AKA,
    ITEM_ID_FURUBITA_DRIVERBAND_KIRO, ITEM_ID_GRACE_GATLING_SUIT, ITEM_ID_HEAVENLY_ORDER,
    ITEM_ID_ILLUSION_STUFF_OF_OLDE, ITEM_ID_IMPERIAL_GATLING_SUIT, ITEM_ID_KAIRYUNO_YOROI, ITEM_ID_KENSENO_OKAN,
    ITEM_ID_MAHOSEKINO_ONKE, ITEM_ID_STUFF_OF_ORD, ITEM_ID_SUHAINO_YUBIWA, ITEM_ID_TEGRYONG, ITEM_ID_TEGRYONG_S2,
    ITEM_ID_VALKYRIE_KNIFE, ITEM_ID_YOZINBONO_SUITS, ITEM_ID_YUSHANO_BROACH, ITEM_ID_ZYUNREISHANO_KUTSU,
    ITEM_SET_ID_TORIKAINO_KAGITSUME_TORIKAINO_YUMIKAKE
} from './item.dat.js';
import { LearnedSkillSearch } from './learnedskill.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from './mobconfplayer.js';
import {
    SU_DEX, SU_INT, SU_STR, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHOES_DEF_PLUS,
    n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from './roro-state.js';
import {
    SKILL_ID_BEAST_BANE, SKILL_ID_DRAGONOLOGY, SKILL_ID_FIRE_RAIN, SKILL_ID_MANA_RECHARGE, SKILL_ID_OFFERTORIUM,
    SKILL_ID_ORATIO, SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_REPORDUCE, SKILL_ID_RYOUTKEN_SHUREN
} from './skill.dat.js';
import { ROUNDDOWN } from './foot-bridge.js';

/**
 * 公式サイトで「消費SP - ◯%」と表記される消費SP減少効果を適用した
 * 最終的な消費SP軽減率を取得する
 * @returns {Number}
 */
export function getSPCostReductionRate() {
	var bufLv = 0, itemCount = 0, vartmp = 0;
    let cost_reduction = n_tok[ITEM_SP_COST_DOWN];

    //----------------------------------------------------------------
    // ランダムエンチャント効果
    //----------------------------------------------------------------
    cost_reduction += GetRndOptTotalValue(ITEM_SP_COST_DOWN, null, false);


    if (EquipNumSearch(646)) {
        cost_reduction += (-2 * n_A_Weapon_ATKplus);
    }
    if (EquipNumSearch(765) && SU_DEX >= 70) {
        cost_reduction += 10;
    }
    if (EquipNumSearch(646) && n_A_Weapon_ATKplus >= 9) {
        cost_reduction += 20;
    }
    if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1078 || n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1079) {
        if (n_A_Weapon2_ATKplus >= 5) {
            cost_reduction += 5;
        }
        if (n_A_Weapon2_ATKplus >= 7) {
            cost_reduction += 5;
        }
    }
    if (n_A_Equip[EQUIP_REGION_ID_ARMS] == 1078 || n_A_Equip[EQUIP_REGION_ID_ARMS] == 1079) {
        if (n_A_Weapon_ATKplus >= 5) {
            cost_reduction += 5;
        }
        if (n_A_Weapon_ATKplus >= 7) {
            cost_reduction += 5;
        }
    }
    if (EquipNumSearch(ITEM_ID_STUFF_OF_ORD) && LearnedSkillSearch(SKILL_ID_DRAGONOLOGY) == 5) {
        cost_reduction += 15;
    }
    if (EquipNumSearch(1280) && n_A_HEAD_DEF_PLUS >= 3) {
        cost_reduction += n_A_HEAD_DEF_PLUS - 2;
    }
    if (EquipNumSearch(1414)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            cost_reduction += 1;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            cost_reduction += 1;
        }
    }
    if (EquipNumSearch(1476) && n_A_Weapon_ATKplus >= 6) {
        cost_reduction += n_A_Weapon_ATKplus - 5;
    }
    if (EquipNumSearch(1760) && n_A_HEAD_DEF_PLUS >= 6) {
        cost_reduction += (n_A_HEAD_DEF_PLUS - 5) * 10;
    }
    if (SU_DEX >= 100 && EquipNumSearch(1787)) {
        cost_reduction += 5;
        if (SU_DEX >= 120) {
            cost_reduction += 5;
        }
    }
    if (EquipNumSearch(ITEM_ID_KENSENO_OKAN) && LearnedSkillSearch(SKILL_ID_RYOUTKEN_SHUREN) == 10) {
        cost_reduction += 5;
    }
    if (EquipNumSearch(ITEM_SET_ID_TORIKAINO_KAGITSUME_TORIKAINO_YUMIKAKE)) {
        cost_reduction += 2 * LearnedSkillSearch(SKILL_ID_BEAST_BANE);
    }
    if (EquipNumSearch(2208)) {
        cost_reduction += 2 * n_A_HEAD_DEF_PLUS;
    }
    if (n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(2250)) {
        cost_reduction += 5;
    }
    if (EquipNumSearch(2368) && n_A_SHOES_DEF_PLUS >= 8) {
        cost_reduction += (n_A_SHOES_DEF_PLUS - 7);
    }
    if (CardNumSearch(831)) {
        if (n_A_HEAD_DEF_PLUS >= 7) {
            cost_reduction += 2 * CardNumSearch(831);
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            cost_reduction += 1 * CardNumSearch(831);
        }
    }
    if (SU_STR >= 108 && EquipNumSearch(2427)) {
        cost_reduction += 20;
        if (SU_STR >= 120) {
            cost_reduction += 30;
        }
    }
    if (n_A_SHOULDER_DEF_PLUS >= 3 && EquipNumSearch(2488)) {
        cost_reduction += 2 * ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 3);
    }
    //----------------------------------------------------------------
    // 「ドゥクス・ティアのティアラ」の、過剰精錬による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_DOKUSTIANO_TIARA) && n_A_HEAD_DEF_PLUS >= 5) {
        cost_reduction += 3 * (n_A_HEAD_DEF_PLUS - 4);
    }
    //----------------------------------------------------------------
    // 「魔法石の恩恵」の、過剰精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_MAHOSEKINO_ONKE)) > 0) {
        if (n_A_HEAD_DEF_PLUS >= 5) {
            cost_reduction += 25;
        }
        if (n_A_HEAD_DEF_PLUS >= 7) {
            cost_reduction += 25;
        }
        if (n_A_HEAD_DEF_PLUS >= 9) {
            cost_reduction += 25;
        }
    }
    //----------------------------------------------------------------
    // 「ヴァルキリーナイフ」の、職業による強化
    //----------------------------------------------------------------
    if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
        switch (GetLowerJobSeriesID(n_A_JOB)) {
            case JOB_SERIES_ID_NOVICE:
            case JOB_SERIES_ID_MAGICIAN:
            case JOB_SERIES_ID_THIEF:
                break;
            default:
                if (GetHigherJobSeriesID(n_A_JOB) === JOB_SERIES_ID_HUNTER) {
                    cost_reduction += 5;
                }
        }
    }

    //----------------------------------------------------------------
    // 「テグリョン」の、過剰精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_TEGRYONG)) > 0) {
        if (n_A_Weapon_ATKplus >= 9) {
            cost_reduction += 20;
        }
    }
    if ((itemCount = EquipNumSearch(ITEM_ID_TEGRYONG_S2)) > 0) {
        if (n_A_Weapon_ATKplus >= 9) {
            cost_reduction += 20;
        }
    }

    //----------------------------------------------------------------
    // 「海竜の鎧」の、過剰精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_KAIRYUNO_YOROI)) > 0) {
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) {
            vartmp += 5;
        }
        if (n_A_BODY_DEF_PLUS >= 9) {
            vartmp += 5;
        }
        cost_reduction += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「用心棒のスーツ」の、精錬による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SUITS)) > 0) {
        vartmp = 0;
        if (n_A_BODY_DEF_PLUS >= 7) {
            vartmp += 5;
        }
        if (n_A_BODY_DEF_PLUS >= 9) {
            vartmp += 5;
        }
        cost_reduction += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「巡礼者の靴」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
        vartmp = 0;
        if (n_A_SHOES_DEF_PLUS >= 5) {
            vartmp += 3;
        }
        if (n_A_SHOES_DEF_PLUS >= 7) {
            vartmp += 5;
        }
        cost_reduction += vartmp * itemCount;
    }

    //----------------------------------------------------------------
    // 「古びたドライバーバンド」の、精錬による強化
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_DRIVERBAND_KIRO)) > 0) {
        cost_reduction += 2 * n_A_HEAD_DEF_PLUS * itemCount;
    }
    if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_DRIVERBAND_AKA)) > 0) {
        cost_reduction += 2 * n_A_HEAD_DEF_PLUS * itemCount;
    }

    //----------------------------------------------------------------
    // 「イリュージョンスタッフオブオルド」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_STUFF_OF_OLDE)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_DRAGONOLOGY) >= 5) {
            cost_reduction += 15 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「勇者のブローチ」の、職業による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
        if (IsSameJobClass(JOB_ID_MECHANIC) || IsSameJobClass(JOB_ID_GENETIC)) {
            cost_reduction += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ブラックフェザー」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_BLACK_FEATHER)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_REPORDUCE) >= 10) {
            cost_reduction += 30 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「ヘヴンリーオーダー」の、素ＩＮＴによる効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
        cost_reduction += 2 * Math.floor(SU_INT / 18) * itemCount;
    }

    //----------------------------------------------------------------
    // 「インペリアルガトリングスーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GATLING_SUIT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FIRE_RAIN) >= 5) {
            cost_reduction += 10 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「グレースガトリングスーツ」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_GATLING_SUIT)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_FIRE_RAIN) >= 5) {
            cost_reduction += 20 * itemCount;
        }
    }

    //----------------------------------------------------------------
    // 「崇拝の指輪」の、スキル習得による効果
    //----------------------------------------------------------------
    if ((itemCount = EquipNumSearchMIG(ITEM_ID_SUHAINO_YUBIWA)) > 0) {
        if (LearnedSkillSearch(SKILL_ID_ORATIO) >= 10) {
            cost_reduction += 10 * itemCount;
        }
    }

    if (CardNumSearch(457) && GetHigherJobSeriesID(n_A_JOB) == 14) {
        cost_reduction += 20;
    }
    if (CardNumSearch(458) && GetHigherJobSeriesID(n_A_JOB) == 15) {
        cost_reduction += 10;
    }

	/**
	 * 「ダンサー　サービスフォーユー」の、効果
	 */
	if ((bufLv = g_confDataNizi[CCharaConfNizi.CONF_ID_SERVICEFORYOU]) > 0) {
	    cost_reduction += 10 + 2 * bufLv;
	}
	/**
	 * プレイヤー状態異常「メランコリー」の効果
	 */
	cost_reduction -= 20 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_GLOOMYDAY];

	/**
	 * 「マナリチャージ」の効果
	 */
    cost_reduction += 4 * Math.max(LearnedSkillSearch(SKILL_ID_MANA_RECHARGE), UsedSkillSearch(SKILL_ID_MANA_RECHARGE));

    //----------------------------------------------------------------
    // 「性能カスタマイズ」の、効果
    //----------------------------------------------------------------
    const confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_COST_DOWN);
    if (confval != 0) {
        cost_reduction += confval;
    }

    set_costDownForDisp(cost_reduction);
    cost_reduction = Math.min(100, cost_reduction);
    cost_reduction = 100 - cost_reduction;

    if (UsedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) > 0) {
        cost_reduction = cost_reduction * -1;
    }

    // オフェルトリウム
    if ((bufLv = UsedSkillSearch(SKILL_ID_OFFERTORIUM)) > 0) {
        // 特定の戦闘エリアでの補正
        switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
            case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
                cost_reduction = Math.floor(cost_reduction * (100 + 20 * bufLv) / 10) / 10;
                break;
            default:
                cost_reduction = Math.floor(cost_reduction * (200 + 20 * bufLv) / 10) / 10;
                break;
        }
    }

    return cost_reduction;
}

