/**
 * StAllCalc セクション分割: 獲得経験値＋○○％・近接物理ダメージ反射・武器攻撃力＋○○％・サイズ100%。
 *
 * stallcalc.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 * n_B_HIT/n_B_FLEE はコードベース全体で書き込みのみ・参照箇所なし（確認済み）のため
 * ローカル変数化した（元々 stallcalc.js のモジュールレベル変数だったが未 export・未参照）。
 */
import { UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_ACOLYTE, JOB_SERIES_ID_ARCHER, JOB_SERIES_ID_MERCHANT,
    JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_TAEGKUON, JOB_SERIES_ID_THIEF
} from "../data/mig.job.h.js";
import { g_confDataSanzi, g_objCharaConfCustomAtk } from "../runtime/global.js";
import { n_SP_SKILL } from "../battle/battlecalc.js";
import { ApplySpecModify, ApplySpecStatusModifications, DisplayReferStatusAll } from "../chara/hmjob.js";
import {
    n_A_ActiveSkill, n_A_QUAKE_KIRI, n_tok, n_tok_no_limit, set_n_A_QUAKE_KIRI
} from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CExtraInfoAreaComponentManager } from "../ui/CExtraInfoAreaComponentManager.js";
import {
    CARD_ID_ENCHANT_ENERGY_IKUSAOTOME, CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_MANT, CARD_SET_ID_JOBSET_ACOLYTE,
    CARD_SET_ID_JOBSET_ARCHER
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, TimeItemNumSearch } from "../chara/chara.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_EXP_UP_ALL, ITEM_SP_EXP_UP_RACE_ANGEL, ITEM_SP_EXP_UP_RACE_ANIMAL, ITEM_SP_EXP_UP_RACE_DEMON,
    ITEM_SP_EXP_UP_RACE_DRAGON, ITEM_SP_EXP_UP_RACE_FISH, ITEM_SP_EXP_UP_RACE_HUMAN, ITEM_SP_EXP_UP_RACE_INSECT,
    ITEM_SP_EXP_UP_RACE_PLANT, ITEM_SP_EXP_UP_RACE_SOLID, ITEM_SP_EXP_UP_RACE_UNDEAD, ITEM_SP_IGNORE_DEF_ALL,
    ITEM_SP_IGNORE_DEF_BOSS, ITEM_SP_IGNORE_DEF_NOTBOSS, ITEM_SP_IGNORE_DEF_RACE_ALL, ITEM_SP_IGNORE_DEF_RACE_SOLID,
    ITEM_SP_MRES_PLUS, ITEM_SP_NEVER_CAST_CANCEL, ITEM_SP_NEVER_KNOCK_BACK, ITEM_SP_P_ATK_PLUS,
    ITEM_SP_REFLECT_PHYSICAL_DAMAGE, ITEM_SP_RESIST_BOSS, ITEM_SP_RESIST_ELM_ALL, ITEM_SP_RESIST_ELM_UNDEAD,
    ITEM_SP_RESIST_ELM_VANITY, ITEM_SP_RESIST_LONGRANGE, ITEM_SP_RESIST_MONSTER_ELM_ALL,
    ITEM_SP_RESIST_MONSTER_ELM_UNDEAD, ITEM_SP_RESIST_MONSTER_ELM_VANITY, ITEM_SP_RESIST_NOTBOSS,
    ITEM_SP_RESIST_PLAYER_ALL, ITEM_SP_RESIST_PLAYER_DORAM, ITEM_SP_RESIST_PLAYER_HUMAN, ITEM_SP_RESIST_RACE_ALL,
    ITEM_SP_RESIST_RACE_DRAGON, ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER, ITEM_SP_RESIST_RACE_SOLID,
    ITEM_SP_RESIST_SIZE_LARGE, ITEM_SP_RESIST_SIZE_SMALL, ITEM_SP_SIZE_PERFECTION, ITEM_SP_WEAPON_ATK_UP
} from "../const/EnumItemSpId.js";
import { JOB_ID_RUNEKNIGHT, JOB_ID_STAR_EMPEROR } from "../const/EnumJobId.js";
import { MONSTER_BOSSTYPE_NONE } from "../const/EnumMonsterBossType.js";
import {
    MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX, MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN, MONSTER_DATA_EXTRA_INDEX_FLEE,
    MONSTER_DATA_EXTRA_INDEX_HIT, MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS, MONSTER_DATA_INDEX_BOSS_TYPE,
    MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF, MONSTER_DATA_INDEX_RACE
} from "../const/EnumMonsterDataIndex.js";
import { UpdateCharaDataHtml } from "../chara/hmchara.js";
import { UpdateMobDataHtml } from "../monster/hmmob.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AEGIR_MANT, ITEM_ID_ANSATSUSHANO_KUTSU, ITEM_ID_CHUNG_EAHNO_REI, ITEM_ID_DATENSHINO_KUTSU,
    ITEM_ID_FAFNIR_HELM, ITEM_ID_FURUBITA_MEISAIUSAGI, ITEM_ID_GLUTTONY_STICK, ITEM_ID_GRACE_GATLING_SUIT,
    ITEM_ID_GRACE_HOLY_ROBE, ITEM_ID_GRACE_TENCHI_SUIT, ITEM_ID_HAKAMORINO_KUTSU, ITEM_ID_IMPERIAL_GATLING_SUIT,
    ITEM_ID_IMPERIAL_HOLY_ROBE, ITEM_ID_IMPERIAL_TENCHI_SUIT, ITEM_ID_KARYUDONO_KUTSU, ITEM_ID_KIKOSHINO_KUTSU,
    ITEM_ID_KONCHUSAISHUUKANO_KUTSU, ITEM_ID_KOONO_SOZIN, ITEM_ID_LOLANO_PLATEMAIL, ITEM_ID_MOKOMOKO_OSAKANA_SHOES,
    ITEM_ID_NIWASHINO_KUTSU, ITEM_ID_POWERED_WING, ITEM_ID_RUNE_HELM, ITEM_ID_RYOUSHINO_KUTSU, ITEM_ID_SLOTH_TEXT,
    ITEM_ID_TAIMANO_KUTSU, ITEM_ID_TENBINKYUNO_DIADEM, ITEM_ID_TORYUUNO_KUTSU, ITEM_ID_VALKIRIE_CAPE,
    ITEM_ID_VALKYRIE_MANT, ITEM_ID_YOMANO_SASAYAKI, ITEM_ID_YUSHANO_MAGIC_COAT, ITEM_ID_ZYASPER_CIRCLET,
    ITEM_SET_ID_KOFUKUNO_TATE_ANUBIS_CARD, ITEM_SET_ID_KOFUKUNO_TATE_ARNORDY_CARD,
    ITEM_SET_ID_KOFUKUNO_TATE_BEARDOLL_CARD, ITEM_SET_ID_KOFUKUNO_TATE_BIGFOOT_CARD,
    ITEM_SET_ID_KOFUKUNO_TATE_CARITZBURG_CARD, ITEM_SET_ID_KOFUKUNO_TATE_ORC_WARRIOR_CARD,
    ITEM_SET_ID_KOFUKUNO_TATE_PHENOMENA_CARD, ITEM_SET_ID_KOFUKUNO_TATE_RAFLECIA_CARD,
    ITEM_SET_ID_KOFUKUNO_TATE_SKY_PTITE_CARD, ITEM_SET_ID_KOFUKUNO_TATE_TARAFROG_CARD,
    ITEM_SET_ID_SOIGANO_SHO_ARMAIA_DUNZE_CARD, ITEM_SET_ID_SOIGANO_SHO_DRAGONNO_TAMAGO_CARD,
    ITEM_SET_ID_SOIGANO_SHO_GREEN_IGUANA_CARD, ITEM_SET_ID_SOIGANO_SHO_ORC_ARCHER_CARD,
    ITEM_SET_ID_SOIGANO_SHO_RAYDRIC_ARCHER_CARD, ITEM_SET_ID_SOIGANO_SHO_SIKKOSURUMONO_CARD,
    ITEM_SET_ID_SOIGANO_SHO_STEM_WORM_CARD, ITEM_SET_ID_SOIGANO_SHO_TENZYA_SENNIN_CARD,
    ITEM_SET_ID_SOIGANO_SHO_VIRUS_CARD, ITEM_SET_ID_SOIGANO_SHO_WRAITH_CARD
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import { GetMobDataParameters } from "../monster/mob.js";
import {
    n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS,
    n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus, n_B_DEF2, set_n_B_DEF2, set_n_B_MDEF2
} from "../runtime/roro-state.js";
import {
    SKILL_ID_COUNTER_SLASH, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_EXPIATIO, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_GROOMING,
    SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_SECRAMENT, SKILL_ID_SENRYU_SHOTEN,
    SKILL_ID_STONE_HARD_SKIN, SKILL_ID_TAIYONO_KAMAE
} from "../skill/skill.dat.js";
import { NumSearch, ROUNDDOWN } from "../bridge/stallcalc-bridge.js";


export function ApplyExpUpPercent() {
    let vartmp = 0, itemCount = 0, cardCount = 0;

//==== 獲得経験値＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// 「機工士の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KIKOSHINO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_SOLID] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「墓守の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_HAKAMORINO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_UNDEAD] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「狩人の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KARYUDONO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_ANIMAL] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「庭師の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIWASHINO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_PLANT] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「昆虫採集家の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KONCHUSAISHUUKANO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_INSECT] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「漁師の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RYOUSHINO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_FISH] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「退魔の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TAIMANO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_DEMON] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「暗殺者の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ANSATSUSHANO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_HUMAN] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「堕天使の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DATENSHINO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_ANGEL] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「屠龍の靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TORYUUNO_KUTSU)) > 0) {
			n_tok[ITEM_SP_EXP_UP_RACE_DRAGON] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}


		//----------------------------------------------------------------
		// 「職業カードセット　アコライトセット」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_SET_ID_JOBSET_ACOLYTE)) > 0) {
			if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ACOLYTE) {
				n_tok[ITEM_SP_EXP_UP_RACE_UNDEAD] += 5;
				n_tok[ITEM_SP_EXP_UP_RACE_DEMON] += 5;
			}
		}

		//----------------------------------------------------------------
		// 「職業カードセット　アーチャーセット」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_SET_ID_JOBSET_ARCHER)) > 0) {
			if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ARCHER) {
				n_tok[ITEM_SP_EXP_UP_RACE_ANIMAL] += 5;
			}
		}


		//----------------------------------------------------------------
		// 「幸福の盾　アーノルディカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_ARNORDY_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_PLANT] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　アヌビスカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_ANUBIS_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_ANGEL] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　オークウォーリアカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_ORC_WARRIOR_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_ANIMAL] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　カーリッツバーグカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_CARITZBURG_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_DEMON] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　スカイプティットカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_SKY_PTITE_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_DRAGON] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　タラフロッグカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_TARAFROG_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　ビッグフットカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_BIGFOOT_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_INSECT] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　ベアドールカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_BEARDOLL_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_UNDEAD] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　ペノメナカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_PHENOMENA_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_SOLID] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「幸福の盾　ラフレシアカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOFUKUNO_TATE_RAFLECIA_CARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_FISH] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「ソイガの書　アルマイア＝デュンゼカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_ARMAIA_DUNZE_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_FISH] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　ウィレスカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_VIRUS_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_INSECT] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　オークアーチャーカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_ORC_ARCHER_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　グリーンイグアナカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_GREEN_IGUANA_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_SOLID] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　執行する者カードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_SIKKOSURUMONO_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_ANGEL] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　ステムワームカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_STEM_WORM_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_ANIMAL] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　天邪仙人カードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_TENZYA_SENNIN_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_PLANT] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　ドラゴンの卵カードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_DRAGONNO_TAMAGO_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_DRAGON] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　レイスカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_WRAITH_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_UNDEAD] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ソイガの書　レイドリックアーチャーカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOIGANO_SHO_RAYDRIC_ARCHER_CARD)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 5;

			n_tok[ITEM_SP_EXP_UP_RACE_DEMON] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「チュンイーの霊」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_CHUNG_EAHNO_REI)) > 0) {
			if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_TAEGKUON) {
				n_tok[ITEM_SP_EXP_UP_ALL] += 5 * itemCount;
			}
		}


}

export function ApplyMeleePhysicalDamageReflect() {
    let vartmp = 0, itemCount = 0;

//==== 近接物理ダメージ反射　ここから
//====
//================================================================================================================================
//================================================================================================================================


		if(EquipNumSearch(ITEM_ID_VALKYRIE_MANT)
			|| EquipNumSearch(ITEM_ID_AEGIR_MANT)
			|| EquipNumSearch(ITEM_ID_VALKIRIE_CAPE)
			|| CardNumSearch(CARD_ID_ENCHANT_ENERGY_IKUSAOTOME)){
			let wHPVS = GetLowerJobSeriesID(n_A_JOB);
			if ([JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_THIEF, JOB_SERIES_ID_MERCHANT].includes(wHPVS)) {
				n_tok[ITEM_SP_REFLECT_PHYSICAL_DAMAGE] += 5;
				n_tok[ITEM_SP_REFLECT_PHYSICAL_DAMAGE] += n_A_SHOULDER_DEF_PLUS * 2;
			}
		}
		if(TimeItemNumSearch(52)) n_tok[71] += n_A_SHIELD_DEF_PLUS * 3;
		if(EquipNumSearch(1998)) n_tok[71] += 2 * n_A_SHOULDER_DEF_PLUS;
		if(EquipNumSearch(2293)) n_tok[71] += ROUNDDOWN(n_A_SHOES_DEF_PLUS / 2);

		if (UsedSkillSearch(SKILL_ID_STONE_HARD_SKIN) > 0) {
			if (EquipNumSearch(ITEM_ID_RUNE_HELM) > 0) {
				n_tok[71] += 10;
			}
			else if (EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET) > 0) {
				n_tok[71] += 10;
			}
			else if (EquipNumSearch(ITEM_ID_TENBINKYUNO_DIADEM) > 0) {
				if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
					n_tok[71] += 10;
				}
			}
			else if (EquipNumSearch(ITEM_ID_FAFNIR_HELM) > 0) {
				n_tok[71] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「ローラのプレートメイル」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_LOLANO_PLATEMAIL)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 5;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 5;

			n_tok[ITEM_SP_REFLECT_PHYSICAL_DAMAGE] += vartmp * itemCount;
		}


}

export function ApplyWeaponAtkUpPercent() {
    let confval = 0, sklLv = 0, itemCount = 0, idx = 0;

//==== 武器攻撃力＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_WEAPON_ATK_UP; idx <= ITEM_SP_WEAPON_ATK_UP; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「ゾディアック　ポルックスマント」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_MANT)) {
			if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
				n_tok[ITEM_SP_WEAPON_ATK_UP] += 1 * n_A_SHOULDER_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「妖魔のささやき」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOMANO_SASAYAKI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_COUNTER_SLASH) >= 10) {
				n_tok[ITEM_SP_WEAPON_ATK_UP] += 25 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「星帝　太陽の構え」の、効果
		//----------------------------------------------------------------
		if ((sklLv = UsedSkillSearch(SKILL_ID_TAIYONO_KAMAE)) > 0) {
			n_tok[ITEM_SP_WEAPON_ATK_UP] += 5 * sklLv;
		}

		//----------------------------------------------------------------
		// 「三次職支援　エビ三昧」の効果
		//----------------------------------------------------------------
		switch (g_confDataSanzi[CCharaConfSanzi.CONF_ID_EBI_ZANMAI]) {
		case 1:
			n_tok[ITEM_SP_WEAPON_ATK_UP] += 5;
			break;
		case 2:
			n_tok[ITEM_SP_WEAPON_ATK_UP] += 5;
			break;
		case 3:
			n_tok[ITEM_SP_WEAPON_ATK_UP] += 10;
			break;
		case 4:
			n_tok[ITEM_SP_WEAPON_ATK_UP] += 15;
			break;
		case 5:
			n_tok[ITEM_SP_WEAPON_ATK_UP] += 30;
			break;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP);
		if (confval != 0) {
			n_tok[ITEM_SP_WEAPON_ATK_UP] += confval;
		}

		// 拡張表示用にデータを保存
		// 土符はグランドクロスに影響を及ぼすが武器攻撃力%UPは影響を及ぼさないので個別に計算している
		const weapon_atk_up = n_tok[ITEM_SP_WEAPON_ATK_UP] + Math.max(0, 10 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU));
		CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_WEAPON_ATK_UP, weapon_atk_up);


/**
 * ===========================================================================================
 * 絶対にノックバックしない
 * ===========================================================================================
 */
		if (EquipNumSearch(ITEM_ID_MOKOMOKO_OSAKANA_SHOES) !== 0){
			// もこもこお魚シューズ を装備していて
			if (LearnedSkillSearch(SKILL_ID_GROOMING) === 5) {
				// グルーミング Lv5 を習得している場合
				n_tok[ITEM_SP_NEVER_KNOCK_BACK] += 1;
			}
		}
		if (EquipNumSearch(ITEM_ID_POWERED_WING) !== 0) {
			// パワードウィング を装備していて
			if (LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU) === 5) {
				// 火と大地の研究 Lv5 を習得している場合
				n_tok[ITEM_SP_NEVER_KNOCK_BACK] += 1;
			}
		}
		if (EquipNumSearch(ITEM_ID_IMPERIAL_GATLING_SUIT) !== 0 || EquipNumSearch(ITEM_ID_GRACE_GATLING_SUIT) !== 0) {
			// インペリアルガトリングスーツ　か　グレースガトリングスーツ を装備していて
			if (LearnedSkillSearch(SKILL_ID_ETERNAL_CHAIN) === 10) {
				// エターナルチェーン Lv10 を習得している場合
				n_tok[ITEM_SP_NEVER_KNOCK_BACK] += 1;
			}
		}
		if (EquipNumSearch(ITEM_ID_IMPERIAL_TENCHI_SUIT) !== 0 || EquipNumSearch(ITEM_ID_GRACE_TENCHI_SUIT) !== 0) {
			// インペリアル天地スーツ　か　グレース天地スーツ を装備していて
			if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) === 10) {
				// 潜龍昇天 Lv10 を習得している場合
				n_tok[ITEM_SP_NEVER_KNOCK_BACK] += 1;
			}
		}
		if (EquipNumSearch(ITEM_ID_IMPERIAL_HOLY_ROBE) !== 0 || EquipNumSearch(ITEM_ID_GRACE_HOLY_ROBE) !== 0) {
			// インペリアルホーリーローブ　か　グレースホーリーローブ を装備していて
			if (LearnedSkillSearch(SKILL_ID_SECRAMENT) === 5) {
				// サクラメント Lv5 を習得している場合
				n_tok[ITEM_SP_NEVER_KNOCK_BACK] += 1;
			}
		}

/**
 * ===========================================================================================
 * 詠唱が中断されない
 * ===========================================================================================
 */
		if (EquipNumSearch(ITEM_ID_YUSHANO_MAGIC_COAT) !== 0) {
			// 勇者のマジックコート を装備していて
			if (n_A_BODY_DEF_PLUS % 2 === 1) {
				// 精錬値が奇数の場合
				n_tok[ITEM_SP_NEVER_CAST_CANCEL] += 1;
			}
		}


}

export function ApplySize100Percent(charaData, mobData, monsterId) {
    let confval = 0, itemCountRight = 0, itemCountLeft = 0, idx = 0, n_B_HIT = 0, n_B_FLEE = 0;

//==== サイズ１００％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_SIZE_PERFECTION; idx <= ITEM_SP_SIZE_PERFECTION; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
/*
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS);
		if (confval != 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS] += confval;
		}
*/

		//----------------------------------------------------------------
		// 四次特性ステータス対応用
		//----------------------------------------------------------------
		ApplySpecStatusModifications(charaData, n_tok);

		//----------------------------------------------------------------
		// キャラクターデータ画面表示更新
		//----------------------------------------------------------------
		UpdateCharaDataHtml(charaData, n_tok);

		//----------------------------------------------------------------
		// モンスターパラメータ取得
		//----------------------------------------------------------------
		GetMobDataParameters(monsterId, mobData);

		//----------------------------------------------------------------
		// モンスターデータ画面表示更新
		//----------------------------------------------------------------
		UpdateMobDataHtml(monsterId, mobData);
		UpdateCharaDataHtml(charaData, n_tok);

//================================================================================================
// グローバル変数の準備
//================================================================================================

	set_n_B_DEF2([0,0,0]);
	n_B_DEF2[2] = mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN];
	n_B_DEF2[0] = mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX];
	n_B_DEF2[1] = Math.floor((n_B_DEF2[2] + n_B_DEF2[0]) /2);
	set_n_B_MDEF2(mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS]);
	n_B_HIT = mobData[MONSTER_DATA_EXTRA_INDEX_HIT];
	n_B_FLEE = mobData[MONSTER_DATA_EXTRA_INDEX_FLEE];

		// 錐効果の計算
		set_n_A_QUAKE_KIRI(0);

		//----------------------------------------------------------------
		// 「古びた迷彩ウサギフード」の、＋１０精錬による、錐効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_FURUBITA_MEISAIUSAGI)) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				n_tok[23] = 1;
			}
		}

		//----------------------------------------------------------------
		// 「古王の双刃」の、＋１０精錬による、錐効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			if (n_A_Weapon_ATKplus >= 10) {
				n_tok[23] = 1;
			}
		}

		//----------------------------------------------------------------
		// 「グラトニースティック」の、＋１０精錬による、錐効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_GLUTTONY_STICK, EQUIP_REGION_ID_ARMS);
		if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
			n_tok[23] = 1;
		}
		itemCountLeft = EquipNumSearch(ITEM_ID_GLUTTONY_STICK, EQUIP_REGION_ID_ARMS_LEFT);
		if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
			n_tok[23] = 1;
		}

		//----------------------------------------------------------------
		// 「スローステキスト」の、＋１０精錬による、錐効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_SLOTH_TEXT, EQUIP_REGION_ID_ARMS);
		if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
			n_tok[23] = 1;
		}
		itemCountLeft = EquipNumSearch(ITEM_ID_SLOTH_TEXT, EQUIP_REGION_ID_ARMS_LEFT);
		if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
			n_tok[23] = 1;
		}


		if((n_tok[23] >= 1 && NumSearch(n_A_ActiveSkill,n_SP_SKILL) == 0)
			|| n_A_ActiveSkill == 193) {

			var ch = 0;

			for(var i=0;i<=9;i++) {
				if(n_tok[180+i] == 1) {
					ch = 1;
				}
			}

			if(mobData[20] == 1){
				if(n_tok[22] >= 10) ch = 1;
			}else if(mobData[20] == 0){
				if(n_tok[22] >= 1) ch = 1;
			}

			if(ch == 0){

				// アイテム特性のＤＥＦ無視効果を計算
				var ignoreDef = 0;

				// 全てのモンスターのＤＥＦ無視
				ignoreDef += n_tok[ITEM_SP_IGNORE_DEF_ALL];

				// 一般／ボスのＤＥＦ無視
				if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
					ignoreDef += n_tok[ITEM_SP_IGNORE_DEF_NOTBOSS];
				}
				else if (mobData[20] == 1) {
					ignoreDef += n_tok[ITEM_SP_IGNORE_DEF_BOSS];
				}

				// 全ての種族のＤＥＦ無視
				ignoreDef += n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL];

				// 特定種族のＤＥＦ無視
				ignoreDef += n_tok[ITEM_SP_IGNORE_DEF_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]];

				// 錐効果値を計算
				set_n_A_QUAKE_KIRI(mobData[MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF] * (100 - ignoreDef) / 100.0 / 2);

				// エクスピアティオの効果で補正する
				if (n_A_QUAKE_KIRI > 0) {
					if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_EXPIATIO] > 0) {
						set_n_A_QUAKE_KIRI(n_A_QUAKE_KIRI - (n_A_QUAKE_KIRI * ((20 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_EXPIATIO]) / 100)));
					}
					else if (UsedSkillSearch(SKILL_ID_EXPIATIO)) {
						set_n_A_QUAKE_KIRI(n_A_QUAKE_KIRI - (n_A_QUAKE_KIRI * ((20 * UsedSkillSearch(SKILL_ID_EXPIATIO)) / 100)));
					}
				}

				// 負数だと、floor 処理での丸め仕様が違うようなので。また、IE では Math.sign() 未サポート
				set_n_A_QUAKE_KIRI((n_A_QUAKE_KIRI >= 0 ? 1 : -1) * Math.floor(Math.abs(n_A_QUAKE_KIRI)));

				n_tok[17] += n_A_QUAKE_KIRI;
			}
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_P_ATK_PLUS; idx <= ITEM_SP_MRES_PLUS; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}

		DisplayReferStatusAll();

		// Lv200解放アップデートでの、上限値新設への対応
		var funcIsLimitSpIDUpTo95 = function (spidF) {

			if ((ITEM_SP_RESIST_ELM_VANITY <= spidF) && (spidF <= ITEM_SP_RESIST_ELM_UNDEAD)) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_ELM_ALL) {
				return true;
			}

			if ((ITEM_SP_RESIST_MONSTER_ELM_VANITY <= spidF) && (spidF <= ITEM_SP_RESIST_MONSTER_ELM_UNDEAD)) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_MONSTER_ELM_ALL) {
				return true;
			}

			if ((ITEM_SP_RESIST_SIZE_SMALL <= spidF) && (spidF <= ITEM_SP_RESIST_SIZE_LARGE)) {
				return true;
			}

			if ((ITEM_SP_RESIST_RACE_SOLID <= spidF) && (spidF <= ITEM_SP_RESIST_RACE_DRAGON)) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_RACE_ALL) {
				return true;
			}

			if (spidF == ITEM_SP_RESIST_PLAYER_HUMAN) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_PLAYER_DORAM) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_PLAYER_ALL) {
				return true;
			}

			if (spidF == ITEM_SP_RESIST_BOSS) {
				return true;
			}
			if (spidF == ITEM_SP_RESIST_NOTBOSS) {
				return true;
			}

			if (spidF == ITEM_SP_RESIST_LONGRANGE) {
				return true;
			}

			// 完全回避は最終結果（変数 lucky）を補正計算済み

			// 上記以外は、対象外
			return false;
		};

		for (idx = 0; idx < n_tok.length; idx++) {
			n_tok_no_limit[idx] = n_tok[idx];

			if (funcIsLimitSpIDUpTo95(idx)) {
				n_tok[idx] = Math.min(95, n_tok[idx]);
			}
		}

		// TODO: 攻撃手段更新、ここにいれられないか

		// ステータス欄注意喚起（集中力向上）は StAllCalc() 側（Shell）で描画する。
		// UsedSkillSearch(SKILL_ID_SHUCHURYOKU_KOZYO) はここでの計算結果に依存しない
		// 独立した判定のため、DOM書き込みをそのまま呼び出し元へ移設した。

}
