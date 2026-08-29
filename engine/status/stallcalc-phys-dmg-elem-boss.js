/**
 * StAllCalc セクション分割: 物理攻撃で与えるダメージ＋○○％（対属性・ボス・一般モンスター）。
 *
 * stallcalc.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { UsedSkillSearch } from "../skill/skillstate.js";
import { g_objCharaConfCustomAtk } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_A_Arrow, n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { ARROW_ID_YA } from "../equip/arrow.dat.js";
import {
    CARD_ID_FUINSARETA_GOPINICH, CARD_ID_FUINSARETA_OSEN_SARETA_DARK_LORD, CARD_ID_GOPINICH,
    CARD_ID_OSEN_SARETA_DARK_LORD, CARD_ID_PRIDE_RUNAWAY_THANATOS, CARD_ID_RED_PEPPER_LAMBDA,
    CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_OSEN_SARETA_DARK_LORD
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "../chara/chara.js";
import { ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_WATER, ELM_ID_WIND } from "../const/EnumElmId.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND,
    ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS
} from "../const/EnumItemSpId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AKUMANO_TE, ITEM_ID_ANEMOS_SHIELD, ITEM_ID_BLACK_FEATHER, ITEM_ID_BRUNHILDNO_DIADEM,
    ITEM_ID_ENRYUNO_YOROI, ITEM_ID_FUSHICHONO_RING, ITEM_ID_GAIA_SHIELD, ITEM_ID_GRACE_ARTIS_SUIT,
    ITEM_ID_GRACE_CONFIDENCIAL_MAIL, ITEM_ID_GRACE_MENUS_SUIT, ITEM_ID_IMPERIAL_ARTIS_SUIT,
    ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL, ITEM_ID_IMPERIAL_MENUS_SUIT, ITEM_ID_IPPEKI_KEN, ITEM_ID_IPPEKI_TSUCHI,
    ITEM_ID_IPPEKI_YARI, ITEM_ID_IPPEKI_YUMI, ITEM_ID_IPPEKI_ZYU, ITEM_ID_JEJECAP, ITEM_ID_KINGS_GUARD,
    ITEM_ID_KISHINNO_MEIYU, ITEM_ID_KOINNNO_VEST, ITEM_ID_MILITARY_GLOVE, ITEM_ID_MUSO_KEN, ITEM_ID_MUSO_TSUCHI,
    ITEM_ID_MUSO_YARI, ITEM_ID_MUSO_YUMI, ITEM_ID_MUSO_ZYU, ITEM_ID_POISON_SPEAR, ITEM_ID_RING_OF_CERYNEIA,
    ITEM_ID_RING_OF_JUPITER, ITEM_ID_RYORAN_KEN, ITEM_ID_RYORAN_TSUCHI, ITEM_ID_RYORAN_YARI, ITEM_ID_RYORAN_YUMI,
    ITEM_ID_RYORAN_ZYU, ITEM_ID_SHINENNO_DRESS, ITEM_ID_TRAVELER_RING, ITEM_ID_WOLF_OFFICER_HAT, ITEM_ID_WORK_CAP,
    ITEM_ID_YOMANO_SASAYAKI, ITEM_ID_ZINRAI_KEN, ITEM_ID_ZINRAI_TSUCHI, ITEM_ID_ZINRAI_YARI, ITEM_ID_ZINRAI_YUMI,
    ITEM_ID_ZINRAI_ZYU, ITEM_ID_ZYASPER_CIRCLET, ITEM_ID_ZYASPER_RING,
    ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_LINDY_HOP, ITEM_SET_ID_GESSHOKUNO_SOUSHOKU_FUINSARETA_HATI,
    ITEM_SET_ID_GESSHOKUNO_SOUSHOKU_HATI_CARD, ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE,
    ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW, ITEM_SET_ID_GOFUSEKI_GERADRIA,
    ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX,
    ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_KTULLANUX, ITEM_SET_ID_KAKUSE_FULL_FORCE_DOPPELGANGER_CARD,
    ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD, ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_ORCLORD_CARD,
    ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_AXE, ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW,
    ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_LANCE, ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX,
    ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_KTULLANUX, ITEM_SET_ID_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD,
    ITEM_SET_ID_ORCLORDNO_YOROI_ORCLORD_CARD, ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO,
    ITEM_SET_ID_SCARABA_HIGHHEEL_CARGA_MACE, ITEM_SET_ID_SCARABA_HIGHHEEL_DULLGER,
    ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_DEX, SU_INT, SU_LUK, SU_STR, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_SHIELD_DEF_PLUS,
    n_A_SHOES_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_BAKKISANDAN, SKILL_ID_BUKI_KENKYU, SKILL_ID_FAW_MAGIC_DECOY,
    SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FIRE_EXPANSION, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU,
    SKILL_ID_IGNITION_BREAK, SKILL_ID_INVISIBILITY, SKILL_ID_KEN_SHUREN, SKILL_ID_MOON_SLUSHER, SKILL_ID_RANGER_MAIN,
    SKILL_ID_SEVERE_RAINSTORM, SKILL_ID_SHURASHINDAN, SKILL_ID_WEAPON_CRUSH, SKILL_ID_WIND_CUTTER
} from "../skill/skill.dat.js";


export function ApplyPhysicalDamageUpVsMonsterElement() {
    let vartmp = 0, confval = 0, itemCount = 0, cardCount = 0, idx = 0;

//==== 物理攻撃時、△△属性モンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(n_A_SHIELD_DEF_PLUS >= 1){
			if(EquipNumSearch(2205)) n_tok[40] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1509)) n_tok[41] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1511)) n_tok[48] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1513)) n_tok[43] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1515)) n_tok[42] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1517)) n_tok[47] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1519)) n_tok[45] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1521)) n_tok[49] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(1523)) n_tok[46] += n_A_SHIELD_DEF_PLUS;
			if(EquipNumSearch(2132)) n_tok[44] += n_A_SHIELD_DEF_PLUS;
		}
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1815)) n_tok[41] += 3;
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1978)){
			n_tok[43] += 10;
			if(n_A_HEAD_DEF_PLUS >= 9) n_tok[43] += 5;
		}
		if(n_A_BODY_DEF_PLUS >= 5){
			for(var i=0;i<=3;i++) if(EquipNumSearch(2328 + i)) n_tok[41 + i] += (n_A_BODY_DEF_PLUS - 4);
		}
		if(n_A_SHOES_DEF_PLUS >= 5 && EquipNumSearch(2503)){
			for(var i=40;i<=44;i++) n_tok[i] += 5;
			if(n_A_SHOES_DEF_PLUS >= 7){
				for(var i=40;i<=44;i++) n_tok[i] += 10;
			}
		}

		// 全属性合算は、この位置から動かしてはダメ
		// （データ移行関連で、CalcData 出力の整合性をとるために、後から設定しているので、重複加算になってしまう）
		if(n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] != 0){
			for(var i=40;i<=49;i++) n_tok[i] += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL];
		}

		//----------------------------------------------------------------
		// 「迅雷剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_ZINRAI_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_ZINRAI_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「迅雷槍」の、過剰精錬による強化
		// 「迅雷鎚」の、過剰精錬による強化
		// 「迅雷弓」の、過剰精錬による強化
		// 「迅雷銃」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ZINRAI_YARI) > 0
			|| EquipNumSearch(ITEM_ID_ZINRAI_TSUCHI) > 0
			|| EquipNumSearch(ITEM_ID_ZINRAI_YUMI) > 0
			|| EquipNumSearch(ITEM_ID_ZINRAI_ZYU) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「迅雷弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ZINRAI_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
		}

		//----------------------------------------------------------------
		// 「無双剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_MUSO_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_MUSO_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「無双槍」の、過剰精錬による強化
		// 「無双鎚」の、過剰精錬による強化
		// 「無双弓」の、過剰精錬による強化
		// 「無双銃」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_MUSO_YARI) > 0
			|| EquipNumSearch(ITEM_ID_MUSO_TSUCHI) > 0
			|| EquipNumSearch(ITEM_ID_MUSO_YUMI) > 0
			|| EquipNumSearch(ITEM_ID_MUSO_ZYU) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「無双弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_MUSO_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 15;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
		}

		//----------------------------------------------------------------
		// 「ガイアシールド」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「一碧剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_IPPEKI_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_IPPEKI_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「一碧槍」の、過剰精錬による強化
		// 「一碧鎚」の、過剰精錬による強化
		// 「一碧弓」の、過剰精錬による強化
		// 「一碧銃」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_IPPEKI_YARI) > 0
			|| EquipNumSearch(ITEM_ID_IPPEKI_TSUCHI) > 0
			|| EquipNumSearch(ITEM_ID_IPPEKI_YUMI) > 0
			|| EquipNumSearch(ITEM_ID_IPPEKI_ZYU) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「一碧弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_IPPEKI_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 15;
		}

		//----------------------------------------------------------------
		// 「業風石　ゲラドリア　セット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_GERADRIA)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7) {
				vartmp += 30;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				vartmp += 20;
			}

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += vartmp * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「アネモスシールド」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「深淵のドレス」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINENNO_DRESS)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 5) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += vartmp * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「猟乱剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_RYORAN_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_RYORAN_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「猟乱槍」の、過剰精錬による強化
		// 「猟乱鎚」の、過剰精錬による強化
		// 「猟乱弓」の、過剰精錬による強化
		// 「猟乱銃」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_RYORAN_YARI) > 0
			|| EquipNumSearch(ITEM_ID_RYORAN_TSUCHI) > 0
			|| EquipNumSearch(ITEM_ID_RYORAN_YUMI) > 0
			|| EquipNumSearch(ITEM_ID_RYORAN_ZYU) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「猟乱弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_RYORAN_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
		}

		//----------------------------------------------------------------
		// 「キングスガード」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KINGS_GUARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ポイズンスピア」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_POISON_SPEAR) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 8 * n_A_Weapon_ATKplus;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 8 * n_A_Weapon_ATKplus;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 8 * n_A_Weapon_ATKplus;
		}

		//----------------------------------------------------------------
		// 「鉱員のベスト」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KOINNNO_VEST)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「月食の装束　ハティーカードセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GESSHOKUNO_SOUSHOKU_HATI_CARD)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「淤加美神の羽衣　クトルラナックスカードセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_KTULLANUX)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「ゴピニクカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_GOPINICH)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}
		// 「傲慢な暴走したタナトス」カードの強化
		if (CardNumSearch(CARD_ID_PRIDE_RUNAWAY_THANATOS) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10);
		}

		//----------------------------------------------------------------
		// 「オークロードの鎧　オークロードカードセット」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ORCLORDNO_YOROI_ORCLORD_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 3 * n_A_BODY_DEF_PLUS * itemCount;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 10 * n_A_BODY_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「汚染されたダークロードカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_OSEN_SARETA_DARK_LORD)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}

		//----------------------------------------------------------------
		// 「淤加美神の羽衣　封印されたクトルラナックスカードセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 3 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「覚醒淤加美神の羽衣　クトルラナックスカードセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_KTULLANUX)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 8 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「覚醒淤加美神の羽衣　封印されたクトルラナックスカードセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルアーティススーツ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ARTIS_SUIT)) > 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += 2 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU) * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 2 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースアーティススーツ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ARTIS_SUIT)) > 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += 4 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU) * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 4 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルメナススーツ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MENUS_SUIT)) > 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースメナススーツ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MENUS_SUIT)) > 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルコンフィデンシャルメイル」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL)) > 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += 4 * LearnedSkillSearch(SKILL_ID_WIND_CUTTER) * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 4 * LearnedSkillSearch(SKILL_ID_WIND_CUTTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースコンフィデンシャルメイル」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)) > 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += 7 * LearnedSkillSearch(SKILL_ID_WIND_CUTTER) * itemCount;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 7 * LearnedSkillSearch(SKILL_ID_WIND_CUTTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ウルフオフィサーハット」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_WOLF_OFFICER_HAT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_RANGER_MAIN) >= 10) {
				for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
					n_tok[i] += 25 * itemCount;
				}

				// 全属性は先に合算しているので、CalcData 出力のためだけの設定
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「覚醒フルフォース　ドッペルゲンガーカードセット」の、ベースレベルと精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_FULL_FORCE_DOPPELGANGER_CARD)) > 0) {
			var valWork = 0;

			if (n_A_BaseLV <= 99) {
				valWork = 4 * n_A_Weapon_ATKplus * itemCount;
			}
			else {
				valWork = 10 * n_A_Weapon_ATKplus * itemCount;
			}

			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += valWork;
			}

			// 全属性は先に合算しているので、CalcData 出力のためだけの設定
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += valWork;
		}

		//----------------------------------------------------------------
		// 「覚醒オークロードの鎧　オークロードカードセット」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_ORCLORD_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 5 * n_A_BODY_DEF_PLUS * itemCount;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 13 * n_A_BODY_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「覚醒オークロードの鎧　封印されたオークロードカードセット」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 3 * n_A_BODY_DEF_PLUS * itemCount;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 10 * n_A_BODY_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「封印された汚染されたダークロードカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_OSEN_SARETA_DARK_LORD)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 1 * Math.floor((SU_STR + SU_INT + SU_DEX) / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「オークロードの鎧　封印されたオークロードカードセット」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 1 * n_A_BODY_DEF_PLUS * itemCount;
			}
			else {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 3 * n_A_BODY_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「英雄の凱歌　封印された汚染されたダークロードカードセット」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_OSEN_SARETA_DARK_LORD)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 1 * Math.floor((SU_STR + SU_INT + SU_DEX) / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「ミリタリーグローブ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MILITARY_GLOVE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FAW_SILVER_SNIPER) >= 5) {
				var valWork = 10 * itemCount;

				for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
					n_tok[i] += valWork;
				}

				// 全属性は先に合算しているので、CalcData 出力のためだけの設定
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += valWork;
			}
		}

		//----------------------------------------------------------------
		// 「鬼神の盟友」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KISHINNO_MEIYU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SHURASHINDAN) >= 10) {
				var valWork = 25 * itemCount;

				for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
					n_tok[i] += valWork;
				}

				// 全属性は先に合算しているので、CalcData 出力のためだけの設定
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += valWork;
			}
		}

		//----------------------------------------------------------------
		// 「封印されたゴピニクカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_GOPINICH)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 1 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}

		//----------------------------------------------------------------
		// 「月食の装束　封印されたハティーカードセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GESSHOKUNO_SOUSHOKU_FUINSARETA_HATI)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 2 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「レッドペッパーラムダカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_RED_PEPPER_LAMBDA)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}

		//----------------------------------------------------------------
		// 「妖魔のささやき」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOMANO_SASAYAKI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) >= 5) {
				var valWork = 25 * itemCount;

				for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
					n_tok[i] += valWork;
				}

				// 全属性は先に合算しているので、CalcData 出力のためだけの設定
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL] += valWork;
			}
		}

		//----------------------------------------------------------------
		// 影狼・朧スキル「符」の効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU) >= 10) {
			switch (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)) {
			case ELM_ID_WATER:
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 30;
				break;
			case ELM_ID_EARTH:
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 30;
				break;
			case ELM_ID_FIRE:
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 30;
				break;
			case ELM_ID_WIND:
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 30;
				break;
			}
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM);
		if (confval != 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += confval;
			}
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}		


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyPhysicalDamageUpVsBoss() {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0;

//==== 物理攻撃時、ボスモンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(SU_STR >= 120 && EquipNumSearch(348)) n_tok[26] += 10 * EquipNumSearch(348);
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1402)) n_tok[26] += (n_A_HEAD_DEF_PLUS - 4);
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1409)) n_tok[26] += 5;
		if(n_A_BaseLV >= 100 && EquipNumSearch(1762)) n_tok[26] += 1;

		//----------------------------------------------------------------
		// 「ギガントブーツ　アックスセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) n_tok[26] += 20;
				if (n_A_Weapon_ATKplus >= 9) n_tok[26] += 30;
			}
		}

		//----------------------------------------------------------------
		// 「ギガントブーツ　ボウセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) n_tok[26] += 20;
				if (n_A_Weapon_ATKplus >= 9) n_tok[26] += 30;
			}
		}

		//----------------------------------------------------------------
		// 「炎竜の鎧」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ENRYUNO_YOROI)) {
			if (n_A_BODY_DEF_PLUS >= 7) n_tok[26] += 10;
			if (n_A_BODY_DEF_PLUS >= 9) n_tok[26] += 10;
		}

		//----------------------------------------------------------------
		// 「業風石　ゲラドリア　セット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_GERADRIA)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7) {
				vartmp += 30;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				vartmp += 20;
			}

			n_tok[26] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ブリュンヒルデのダイアデム」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_BRUNHILDNO_DIADEM)) {
			if (n_A_HEAD_DEF_PLUS >= 6) n_tok[26] += 15;
			if (n_A_HEAD_DEF_PLUS >= 8) n_tok[26] += 15;
		}

		//----------------------------------------------------------------
		// 「巨人の加護　ギガントアックスセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_AXE)) {
			if (n_A_Weapon_ATKplus >= 7) n_tok[26] += 5;
			if (n_A_Weapon_ATKplus >= 9) n_tok[26] += 10;
		}

		//----------------------------------------------------------------
		// 「巨人の加護　ギガントボウセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW)) {
			if (n_A_Weapon_ATKplus >= 7) n_tok[26] += 5;
			if (n_A_Weapon_ATKplus >= 9) n_tok[26] += 10;
		}

		//----------------------------------------------------------------
		// 「巨人の加護　ギガントランスセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_LANCE)) {
			if (n_A_Weapon_ATKplus >= 7) n_tok[26] += 5;
			if (n_A_Weapon_ATKplus >= 9) n_tok[26] += 10;
		}

		//----------------------------------------------------------------
		// 「スカラバハイヒール　エルヴンボウセット」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 8) n_tok[26] += 20;
				if (n_A_Weapon_ATKplus >= 10) n_tok[26] += 30;
			}
		}

		//----------------------------------------------------------------
		// 「スカラバハイヒール　カルガメイスセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_CARGA_MACE)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7)  vartmp += 20;
			if (n_A_Weapon_ATKplus >= 9)  vartmp += 30;

			n_tok[26] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「スカラバハイヒール　ドゥルガーセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_DULLGER)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7)  vartmp += 20;
			if (n_A_Weapon_ATKplus >= 9)  vartmp += 30;

			n_tok[26] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「悪魔の手」の、スキル習得による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AKUMANO_TE)) {
			if (LearnedSkillSearch(SKILL_ID_BAKKISANDAN) >= 5) {
				n_tok[26] += 50;
			}
		}

		//----------------------------------------------------------------
		// 「不死の軍団認識票　リンディーホップセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_LINDY_HOP)) > 0) {
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[26] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ワークキャップ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_WORK_CAP)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FAW_MAGIC_DECOY) >= 5) {
				n_tok[26] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ブラックフェザー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_BLACK_FEATHER)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_INVISIBILITY) >= 5) {
				n_tok[26] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ジェジェキャップ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_JEJECAP)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) >= 5) {
				n_tok[26] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「リングオブジュピター」の、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSORY_1)) > 0) {
			if (SU_LUK >= 125) {
				n_tok[26] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ペタルの尻尾　リス耳フード帽セット」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO)) {
			if (n_A_HEAD_DEF_PLUS >= 6) n_tok[26] += 10;
			if (n_A_HEAD_DEF_PLUS >= 8) n_tok[26] += 15;
		}

		//----------------------------------------------------------------
		// 「ジャスパーサークレット」の、スキル習得による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET)) {
			if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
				n_tok[26] += 50;
			}
		}

		//----------------------------------------------------------------
		// 「不死鳥のリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_FUSHICHONO_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MOON_SLUSHER) >= 5) {
				n_tok[26] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ジャスパーリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_ZYASPER_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_WIND_CUTTER) >= 5) {
				n_tok[26] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「リングオブケリュネイア」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_RING_OF_CERYNEIA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
				n_tok[26] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「トラベラーリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SEVERE_RAINSTORM) >= 5) {
				n_tok[26] += 15 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS);
		if (confval != 0) {
			n_tok[26] += confval;
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyPhysicalDamageUpVsNormalMonster() {
    let confval = 0, idx = 0;

//==== 物理攻撃時、一般モンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS);
		if (confval != 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS] += confval;
		}


}
