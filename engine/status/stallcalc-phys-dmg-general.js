/**
 * StAllCalc セクション分割: 物理攻撃で与えるダメージ＋○○％（全般）。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7 } from "../skill/skillstate.js";
import { GetHigherJobSeriesID, GetLowerJobSeriesID, IsSameJobClass } from "../data/mig.job.h.js";
import { g_objCharaConfCustomAtk } from "../runtime/global.js";
import { GetTotalPureBasicStatus } from "../chara/hmjob.js";
import { n_A_Arrow, n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import {
    ARROW_ID_CURSE_ARROW, ARROW_ID_FLASH_ARROW, ARROW_ID_SILENCE_ARROW, ARROW_ID_SLEEP_ARROW
} from "../equip/arrow.dat.js";
import {
    CARD_ID_CHUKYU_RGAN, CARD_ID_CRAP, CARD_ID_ENCHANT_KYOGEKI_1, CARD_ID_ENCHANT_KYOGEKI_2,
    CARD_ID_ENCHANT_KYOGEKI_3, CARD_ID_ENCHANT_KYOGEKI_4, CARD_ID_ENCHANT_KYOGEKI_5,
    CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_ID_ENKONNO_KHALITZBURG, CARD_ID_ENKONNO_SHIRONO_KISHI,
    CARD_ID_GENETIC_EMUR_MVP, CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP, CARD_ID_MAGANNO_AMDARAIS, CARD_ID_MAT_DRAINRIER,
    CARD_ID_MECHANIC_HAWARD_MVP, CARD_ID_POWERFUL_AMDARAIS, CARD_ID_PURPLE_PITAYA, CARD_ID_ROUND_RIDER,
    CARD_ID_ROYAL_GUARD_RANDEL_MVP, CARD_ID_RUNE_KNIGHT_SEIREN_MVP, CARD_ID_SHADOW_CHASER_GARTY_MVP,
    CARD_ID_SHINKAINO_DEVIAS, CARD_ID_SHURA_CHENG_MVP, CARD_ID_TOP_ROUND_RIDER,
    CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_MAIL, CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MAIL, CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_ROBE, CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MAIL, CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_MAIL,
    CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_MAIL, CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "../chara/chara.js";
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "../runtime/common.js";
import {
    EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from "../const/EnumEquipRegionId.js";
import {
    ITEM_KIND_AXE_2HAND, ITEM_KIND_BOW, ITEM_KIND_FUMA, ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN,
    ITEM_KIND_HANDGUN, ITEM_KIND_KATAR, ITEM_KIND_RIFLE, ITEM_KIND_SHOTGUN, ITEM_KIND_SPEAR_2HAND,
    ITEM_KIND_SWORD_2HAND
} from "../const/EnumItemKind.js";
import {
    ITEM_SP_CRITICAL_DAMAGE_UP, ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL, ITEM_SP_PHYSICAL_DAMAGE_UP
} from "../const/EnumItemSpId.js";
import {
    JOB_ID_GENETIC, JOB_ID_GILOTINCROSS, JOB_ID_MECHANIC, JOB_ID_MINSTREL, JOB_ID_RANGER, JOB_ID_ROYALGUARD,
    JOB_ID_RUNEKNIGHT, JOB_ID_SHADOWCHASER, JOB_ID_SHURA, JOB_ID_STAR_EMPEROR, JOB_ID_SUMMONER, JOB_ID_WANDERER
} from "../const/EnumJobId.js";
import { getCriticalDamageRate } from "./critical.js";
import {
    ITEM_ID_DARK_HAND, ITEM_ID_DRAKE_COAT, ITEM_ID_EIKONO_AKASHI, ITEM_ID_END_OF_THE_WORLD, ITEM_ID_GHOSTRING_SUITS,
    ITEM_ID_IMPERIAL_ANIMAL_ROBE, ITEM_ID_IMPERIAL_BOOTS, ITEM_ID_IMPERIAL_CRUCIFORM_SUIT,
    ITEM_ID_IMPERIAL_GATLING_SUIT, ITEM_ID_JAGUAR_NOTE, ITEM_ID_KAMIKURAINO_RYUSO, ITEM_ID_KENTOSHINO_GLOVE,
    ITEM_ID_KYUKETSUKINO_SHIMOBE, ITEM_ID_LINDY_HOP, ITEM_ID_MYSTERY_WING, ITEM_ID_NIEVE_ARCWAND,
    ITEM_ID_NIEVE_BASTER, ITEM_ID_NIEVE_CRAYMORE, ITEM_ID_NIEVE_CROSS_BOW, ITEM_ID_NIEVE_DIVINE_CROSS,
    ITEM_ID_NIEVE_FUMA_SHURIKEN, ITEM_ID_NIEVE_GRAVE, ITEM_ID_NIEVE_GUILLOTINE, ITEM_ID_NIEVE_HOLYSTICK,
    ITEM_ID_NIEVE_HUNTER_BOW, ITEM_ID_NIEVE_RIFLE, ITEM_ID_NIEVE_THIEF_BOW, ITEM_ID_NIEVE_WIZARD_STUFF,
    ITEM_ID_NIEVE_ZYAMADAHAR, ITEM_ID_RING_OF_VENUS, ITEM_ID_RYUGOROSHINO_CHOKEN,
    ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, ITEM_ID_SENSHISHANO_MANT,
    ITEM_ID_SHIKENKAN_BOOTS, ITEM_ID_SHINSENNA_KUSANO_NECKLACE, ITEM_ID_TENGUNO_GETA, ITEM_ID_TSUIGEKISHANO_SHOES,
    ITEM_ID_YSF01_PLATE, ITEM_SET_ID_AEGIR_RING_AEGIR_HELM, ITEM_SET_ID_BOTONO_SCARF_GLASS,
    ITEM_SET_ID_BOTONO_SCARF_SUNGLASS, ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU,
    ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU, ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SHOES,
    ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SUITS, ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE,
    ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO, ITEM_SET_ID_FULL_FORCE_DOPPELGANGER_CARD,
    ITEM_SET_ID_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD, ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_JULIET_DE_RACHEL,
    ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_TSURANUKI,
    ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME,
    ITEM_SET_ID_KAKUSE_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD, ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS,
    ITEM_SET_ID_TENGUNO_MAKIMONO_KARASUTENGU
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_AGI, SU_DEX, SU_LUK, SU_STR, SU_VIT, n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS,
    n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_WeaponType, n_A_Weapon_ATKplus, n_A_card
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ARCLOUSE_DASH, SKILL_ID_CARROT_BEAT, SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_DAITENHOSUI,
    SKILL_ID_DEBOTION, SKILL_ID_FATAL_MENUS, SKILL_ID_FIRE_EXPANSION, SKILL_ID_FIRE_RAIN, SKILL_ID_GOHO,
    SKILL_ID_HAPPO_KUNAI, SKILL_ID_KEIKAI, SKILL_ID_MURENO_CHIKARA, SKILL_ID_PIKKI_TSUKI, SKILL_ID_PLATINUM_ALTER,
    SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SORYUKYAKU, SKILL_ID_TAROUNO_KIZU, SKILL_ID_TENKETSU_MOKU,
    SKILL_ID_TENRACHIMO
} from "../skill/skill.dat.js";
import { EquipNumSearchFurubitaSet, ROUNDDOWN } from "../bridge/foot-bridge.js";


export function ApplyPhysicalDamageUpGeneral() {
    let vartmp = 0, confval = 0, sklLv = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, cardCount = 0, cardcount = 0, cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0, cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;

//==== 物理攻撃で与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		if(GetHigherJobSeriesID(n_A_JOB)==14) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * CardNumSearch(479);
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1101)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += n_A_Weapon_ATKplus;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7){
			if(EquipNumSearch(1585) || EquipNumSearch(1596)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5;
		}

		if(EquipNumSearch(1643)) {
			switch (n_A_Arrow) {
			case ARROW_ID_CURSE_ARROW:
			case ARROW_ID_SILENCE_ARROW:
			case ARROW_ID_SLEEP_ARROW:
			case ARROW_ID_FLASH_ARROW:
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 50;
			}
		}

		if(EquipNumSearch(1695)) if(GetLowerJobSeriesID(n_A_JOB)==1 || GetLowerJobSeriesID(n_A_JOB)==2 || GetLowerJobSeriesID(n_A_JOB)==6) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8;
		if(EquipNumSearch(1741)) if(n_A_SHIELD_DEF_PLUS >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += n_A_SHIELD_DEF_PLUS - 4;
		if(EquipNumSearch(1802)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += n_A_Weapon_ATKplus;
		if(SU_STR >= 110 && EquipNumSearch(1946)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * EquipNumSearch(1946);
		if(SU_AGI >= 110 && CardNumSearch(710)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 7;
		if(CardNumSearch(828)){
			if(n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * CardNumSearch(828);
			if(n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * CardNumSearch(828);
		}
		if(SU_STR >= 108 && EquipNumSearch(2395)){
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1;
			if(SU_STR >= 120) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2;
		}
		if(EquipNumSearch(2441)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += ROUNDDOWN((n_A_SHOES_DEF_PLUS + n_A_HEAD_DEF_PLUS) / 2);
		if(EquipNumSearch(2462)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += n_A_HEAD_DEF_PLUS;
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(2512)){
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2;
			if(n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3;
			if(n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4;
		}
		if(n_A_card[CARD_REGION_ID_HEAD_TOP] == 894) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
		if(EquipNumSearch(2541)) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_BODY_DEF_PLUS;
		if(n_A_PassSkill7[41]){
			if(n_A_PassSkill7[41] == 1) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5;
			if(n_A_PassSkill7[41] == 2) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10;
		}

		//----------------------------------------------------------------
		// 「戦死者のマント」の、純粋なＳＴＲが１３０の時
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)){
			if (SU_STR >= 130) {
				if (EquipNumSearchFurubitaSet() > 0) {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10;
				} else {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5;
				}
			}
		}

		//----------------------------------------------------------------
		// 「天狗の巻物セット」の、強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_SET_ID_TENGUNO_MAKIMONO_KARASUTENGU)) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1;
			if (SU_STR >= 108) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2;
			if (SU_STR >= 120) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3;
		}

		//----------------------------------------------------------------
		// 「拳闘士のグローブ」の、純粋なＳＴＲが１００以上の時
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_KENTOSHINO_GLOVE)){
			if (SU_STR >= 100) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5;
			}
		}

		//----------------------------------------------------------------
		// 「ダークハンド」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DARK_HAND)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「リンディーホップ」の、過剰精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_LINDY_HOP, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_LINDY_HOP, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {

			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 25;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 25;
			}

			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 25;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 25;
			}
		}

		//----------------------------------------------------------------
		// 「暴徒のスカーフ　グラスセット」の、素ＳＴＲと素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * ROUNDDOWN((SU_STR + SU_LUK) / 80) * itemCount;
		}

		//----------------------------------------------------------------
		// 「暴徒のスカーフ　サングラスセット」の、素ＳＴＲと素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * ROUNDDOWN((SU_STR + SU_LUK) / 80) * itemCount;
		}

		//----------------------------------------------------------------
		// 「エーギルリング　ヘルムセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_HELM)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

/*
		//----------------------------------------------------------------
		// 「執行者のシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * itemCount;
		}
*/

		//----------------------------------------------------------------
		// 「ドレイクコート」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DRAKE_COAT)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 3;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 4;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「怨恨の白の騎士カード」の、武器種類による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_ENKONNO_SHIRONO_KISHI)) > 0) {
			if ((n_A_WeaponType == ITEM_KIND_SWORD_2HAND)
				|| (n_A_WeaponType == ITEM_KIND_SPEAR_2HAND)
				|| (n_A_WeaponType == ITEM_KIND_AXE_2HAND)) {

				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardCount;

				if (n_A_Weapon_ATKplus >= 10) {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「魔眼のアムダライスカード」の、精錬による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_MAGANNO_AMDARAIS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += n_A_BODY_DEF_PLUS * cardCount;
		}

		//----------------------------------------------------------------
		// 「怨恨のカーリッツバーグカード」の、精錬による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_ENKONNO_KHALITZBURG, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「パワフルアムダライスカード」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_POWERFUL_AMDARAIS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * ROUNDDOWN(n_A_BaseLV / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「栄光の証」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_EIKONO_AKASHI)) > 0) {
			if (n_A_BaseLV >= 150) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ゴーストリングスーツ」の、過剰精錬よる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GHOSTRING_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴクレイモア」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_CRAYMORE)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴグレイヴ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_GRAVE)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴジャマダハル」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_ZYAMADAHAR)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴウィザードスタッフ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_WIZARD_STUFF)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴアークワンド」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_ARCWAND)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴホーリーステッキ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_HOLYSTICK)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴディバインクロス」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_DIVINE_CROSS)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴギロチン」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_GUILLOTINE)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴバスター」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_BASTER)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴ風魔手裏剣」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_FUMA_SHURIKEN)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴシーフボウ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_THIEF_BOW)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴハンターボウ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_HUNTER_BOW)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴクロスボウ」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_CROSS_BOW)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ニーヴライフル」の、ベースレベルよる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_RIFLE)) > 0) {
			if (n_A_BaseLV >= 175) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「Y.S.F.0.1.プレート」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YSF01_PLATE)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「天狗の下駄」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
			if (sklLv = LearnedSkillSearch(SKILL_ID_TENKETSU_MOKU)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * sklLv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「英雄の指輪　達人の槌セット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * itemCount;
			}
		}
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「ニーヴバレッタ　ニーヴ武器セット」の、素ＳＴＲによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * ROUNDDOWN(SU_STR / 10) * itemCount;
		}

		//----------------------------------------------------------------
		// 「神喰らいの龍槍」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KAMIKURAINO_RYUSO)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_Weapon_ATKplus * itemCount;
		}

		//----------------------------------------------------------------
		// 「繊細な猫じゃらしの模型」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 10;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * itemCountRight;

			vartmp = 0;
			vartmp += 2 * n_A_Weapon2_ATKplus;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 10;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「精巧な猫じゃらしの模型」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 20;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 40;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * itemCountRight;

			vartmp = 0;
			vartmp += 2 * n_A_Weapon2_ATKplus;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 20;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 40;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * itemCountLeft;
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

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * ROUNDDOWN(sklLv / 5) * itemCount;
		}

		//----------------------------------------------------------------
		// 「不死の軍団認識票　ジュリエットディレイチェルセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_JULIET_DE_RACHEL)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * n_A_Weapon_ATKplus * itemCount;
		}

		//----------------------------------------------------------------
		// 「吸血鬼のしもべ」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KYUKETSUKINO_SHIMOBE)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「フローズヴィトニルの鎖　ヴァナルガンドの兜セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルブーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_BOOTS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_DEBOTION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「フルフォース　ドッペルゲンガーカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FULL_FORCE_DOPPELGANGER_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_Weapon_ATKplus * itemCount;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョン熱血連撃セット」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME)) > 0) {

			sklLv = 0;

			sklLv += LearnedSkillSearch(SKILL_ID_GOHO);
			sklLv += LearnedSkillSearch(SKILL_ID_SORYUKYAKU);
			sklLv += LearnedSkillSearch(SKILL_ID_DAITENHOSUI);
			sklLv += LearnedSkillSearch(SKILL_ID_TENRACHIMO);

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * ROUNDDOWN(sklLv / 6) * itemCount;
		}

		//----------------------------------------------------------------
		// 「エンチャント　死のニーヴ(腕力)」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 1;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountRight

			// 左手武器へのエンチャント
			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 1;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountLeft

			// 頭防具へのエンチャント
			vartmp = 0;
			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountHeadTop

			// 盾防具へのエンチャント
			vartmp = 0;
			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountShield

			// 体防具へのエンチャント
			vartmp = 0;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountBody

			// 肩防具へのエンチャント
			vartmp = 0;
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountShoulder

			// 靴防具へのエンチャント
			vartmp = 0;
			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += vartmp * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「ギロチンクロスエレメス(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「メカニックハワード(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_MECHANIC_HAWARD_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_MECHANIC)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「ルーンナイトセイレン(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_RUNE_KNIGHT_SEIREN_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「ジェネティックエミュール(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_GENETIC_EMUR_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「シャドウチェイサーガーティ(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_SHADOW_CHASER_GARTY_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「修羅チェン(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_SHURA_CHENG_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「ロイヤルガードランデル(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_ROYAL_GUARD_RANDEL_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「クラップカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_CRAP)) {
			if (n_A_SHOES_DEF_PLUS >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3;
			if (n_A_SHOES_DEF_PLUS >= 9) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2;
		}

		//----------------------------------------------------------------
		// 「エンチャント　強撃1」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_1, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　強撃1」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_2, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　強撃1」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_3, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 6 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　強撃1」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_4, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 8 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「エンチャント　強撃5」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_KYOGEKI_5, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_Weapon_ATKplus * cardCountRight

			// 左手武器へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_Weapon2_ATKplus * cardCountLeft

			// 頭防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_HEAD_DEF_PLUS * cardCountHeadTop

			// 盾防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_SHIELD_DEF_PLUS * cardCountShield

			// 体防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_BODY_DEF_PLUS * cardCountBody

			// 肩防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder

			// 靴防具へのエンチャント
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_SHOES_DEF_PLUS * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		//----------------------------------------------------------------
		// 「トップラウンドライダーカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (cardcount = CardNumSearch(CARD_ID_TOP_ROUND_RIDER)) {
			switch (n_A_WeaponType) {
			case ITEM_KIND_HANDGUN:
			case ITEM_KIND_RIFLE:
			case ITEM_KIND_GATLINGGUN:
			case ITEM_KIND_SHOTGUN:
			case ITEM_KIND_GRENADEGUN:
				// 銃系統のみの効果
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardcount;
				if (n_A_Weapon_ATKplus >= 10) {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardcount;
				}
				break;
			}
		}

		//----------------------------------------------------------------
		// 「ラウンドライダーカード」の、素ＤＥＸによる効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_ROUND_RIDER)) > 0) {
			if (SU_DEX >= 120) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「マッドドレインリアーカード」の、精錬による効果
		//----------------------------------------------------------------
		if (cardcount = CardNumSearch(CARD_ID_MAT_DRAINRIER)) {
			switch (n_A_WeaponType) {
			case ITEM_KIND_KATAR:
				// カタールのみの効果
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardcount;
				if (n_A_Weapon_ATKplus >= 10) {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardcount;
				}
				break;
			}
		}

		//----------------------------------------------------------------
		// 「フロンティアブーツ　物影セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 30 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ジャガーノート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_RAIN) * itemCount;
		}

		//----------------------------------------------------------------
		// 「竜殺しの長剣」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_RYUGOROSHINO_CHOKEN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_RYUGOROSHINO_CHOKEN, EQUIP_REGION_ID_ARMS_LEFT);
		if (itemCountRight > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_Weapon_ATKplus * itemCountRight;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_Weapon_ATKplus * itemCountRight;
			}
		}
		if (itemCountLeft > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_Weapon2_ATKplus * itemCountLeft;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * n_A_Weapon2_ATKplus * itemCountLeft;
			}
		}

		//----------------------------------------------------------------
		// 「リングオブヴィーナス」の、素ＡＧＩによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_2)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 1 * Math.floor(SU_AGI / 10) * itemCount;
		}

		//----------------------------------------------------------------
		// 「追撃者のシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_SHOES)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * LearnedSkillSearch(SKILL_ID_FATAL_MENUS) * itemCount;
		}

		//----------------------------------------------------------------
		// 「試験管ブーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIKENKAN_BOOTS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「パープルピタヤカード」の、精錬による効果
		//----------------------------------------------------------------
		if (cardcount = CardNumSearch(CARD_ID_PURPLE_PITAYA)) {
			switch (n_A_WeaponType) {
			case ITEM_KIND_FUMA:
				// 風魔手裏剣のみの効果
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardcount;
				if (n_A_Weapon_ATKplus >= 10) {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardcount;
				}
				break;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルアニマルローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ANIMAL_ROBE)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルガトリングスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GATLING_SUIT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルクルシフォームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_HAPPO_KUNAI) * itemCount;
		}

		//----------------------------------------------------------------
		// 「深海のデビアスカード」の、素ＳＴＲ、素ＶＩＴ、素ＤＥＸによる効果
		//----------------------------------------------------------------
		if ((cardcount = CardNumSearch(CARD_ID_SHINKAINO_DEVIAS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * ROUNDDOWN((SU_STR + SU_VIT + SU_DEX) / 25) * cardcount;
		}

		//----------------------------------------------------------------
		// 「覚醒フルフォース　封印されたドッペルゲンガーカードセット」の、ベースレベルと精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD)) > 0) {
			var valWork = 0;

			if (n_A_BaseLV <= 99) {
				valWork = 4 * n_A_Weapon_ATKplus * itemCount;
			}
			else {
				valWork = 10 * n_A_Weapon_ATKplus * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += valWork;
		}

		//----------------------------------------------------------------
		// 「フルフォース　封印されたドッペルゲンガーカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 2 * n_A_Weapon_ATKplus * itemCount;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　巨蟹宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_MECHANIC)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　金牛宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　獅子宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　人馬宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_RANGER)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　双児宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　天蝎宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　白羊宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　ポルックスローブ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_ROBE)) {
			if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　磨羯宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「エンドオブザワールド」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_END_OF_THE_WORLD)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * LearnedSkillSearch(SKILL_ID_CROSS_RIPPER_SLASHER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ミステリーウィング」の、素ステータスによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * Math.floor(GetTotalPureBasicStatus() / 100) * itemCount;
		}

		//----------------------------------------------------------------
		// 「増幅された怨望＋思念体武器セット」の、精錬による効果
		//----------------------------------------------------------------
		if (cardcount = CardNumSearch(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1)) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * n_A_Weapon_ATKplus * cardcount;
		}

		//----------------------------------------------------------------
		// 「剛勇無双の籠手＋剛勇無双の貫セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_TSURANUKI)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 4 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「特選ドラムスーツ＋ゾディアックセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SUITS)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「特選ドラムシューズ＋ゾディアックセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SHOES)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 3 * n_A_SHOES_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「中級ルガンカード」の、武器種類による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_CHUKYU_RGAN)) > 0) {
			if (n_A_WeaponType == ITEM_KIND_BOW) {

				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 5 * cardCount;

				if (n_A_Weapon_ATKplus >= 10) {
					n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += 10 * cardCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP);
		if (confval != 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP] += confval;
		}

		// 命中物理攻撃で与えるダメージ + ◯%
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_DAMAGE_UP_EXCLUDING_CRITICAL);
		if (confval != 0) {
			n_tok[ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL] += confval;
		}
		// クリティカル攻撃で与えるダメージ + ◯% を適用する
		n_tok[ITEM_SP_CRITICAL_DAMAGE_UP] = getCriticalDamageRate();

}
