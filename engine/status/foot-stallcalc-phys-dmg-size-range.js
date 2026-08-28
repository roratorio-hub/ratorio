/**
 * StAllCalc セクション分割: 物理攻撃で与えるダメージ＋○○％（対サイズモンスター・遠距離）。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "../skill/skillstate.js";
import { GetLowerJobSeriesID, IsSameJobClass } from "../data/mig.job.h.js";
import { g_confDataSanzi, g_confDataYozi, g_objCharaConfCustomAtk } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_A_Arrow, n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CCharaConfYozi } from "../chara/CCharaConfYozi.js";
import {
    ARROW_ID_ELFNO_YA, ARROW_ID_GANSEKINO_YA, ARROW_ID_HONOONO_YA, ARROW_ID_KARYUDONO_YA, ARROW_ID_KAZENO_YA,
    ARROW_ID_KOTETSUNO_YA, ARROW_ID_ORIDEOKONNO_YA, ARROW_ID_SUISHONO_YA
} from "../arrow.dat.js";
import {
    CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_ID_GOKU, CARD_ID_KICK_STEP, CARD_ID_POWERFUL_A_SKELETON,
    CARD_ID_RANGER_CECIL_MVP, CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_DIADEM,
    CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_MAIL
} from "../card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from "../runtime/common.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT
} from "../const/EnumEquipRegionId.js";
import { ITEM_KIND_BOW } from "../const/EnumItemKind.js";
import {
    ITEM_SP_LONGRANGE_DAMAGE_UP, ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW, ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM, ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL
} from "../const/EnumItemSpId.js";
import { JOB_ID_RANGER, JOB_ID_RUNEKNIGHT, JOB_ID_SHURA, JOB_ID_SUMMONER } from "../const/EnumJobId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_ANULUS_IRA, ITEM_ID_BOINO_MUFFLER, ITEM_ID_DAICHINO_YUMI, ITEM_ID_ELVEN_BOW, ITEM_ID_FAFNIR_HELM,
    ITEM_ID_FAFNIR_SCALE, ITEM_ID_FAIRLEAFNO_GIRIKO, ITEM_ID_GENSONO_TOWEL, ITEM_ID_GIKONO_ZIKU_BOOTS_S1,
    ITEM_ID_GLOTONERIA, ITEM_ID_GRACE_ANIMAL_ROBE, ITEM_ID_GRACE_CRUCIFORM_SUIT, ITEM_ID_GRACE_CULTIVATION_COAT,
    ITEM_ID_GRACE_GATLING_SUIT, ITEM_ID_GRACE_RAINSTORM_SUIT, ITEM_ID_GRACE_TENCHI_SUIT, ITEM_ID_HAIHANENO_BOOTS,
    ITEM_ID_HAYATENO_YUMI, ITEM_ID_HUNTER_BOW, ITEM_ID_HYOTENNO_YUMI, ITEM_ID_HYPPATSUHYAKUCHUNO_OMAMORI,
    ITEM_ID_IMPERIAL_CULTIVATION_COAT, ITEM_ID_IMPERIAL_RAINSTORM_SUIT, ITEM_ID_IMPERIAL_TENCHI_SUIT,
    ITEM_ID_KAIRYOGATA_POWERED_SUIT, ITEM_ID_KETAISHIKI_SUPPORT_SYSTEM, ITEM_ID_KIROI_NEKOZYARASHINO_MOKEI,
    ITEM_ID_KYOWAKOKUNO_BOSHI, ITEM_ID_LORD_OF_ROYALS, ITEM_ID_MENBRITZ_MANT, ITEM_ID_MOERU_YUMI,
    ITEM_ID_NIZIIRONO_SCARF, ITEM_ID_ORC_ARCHER_YUMI, ITEM_ID_PARACELSUS_GLOVE, ITEM_ID_POWERED_MAIL,
    ITEM_ID_REIZOKUNO_KUBIWA, ITEM_ID_RING_OF_VENUS, ITEM_ID_RUDRANO_YUMI, ITEM_ID_SANCTUS, ITEM_ID_SENSHISHANO_MANT,
    ITEM_ID_SHIRAHANO_SUIT, ITEM_ID_SNIPER_GOGGLE, ITEM_ID_SNIPING_SHOES, ITEM_ID_SNIPING_VEIL,
    ITEM_ID_TAIKYOKUNO_MIMIKAZARI_KIIRO, ITEM_ID_TATSUINUNO_UDEWA, ITEM_ID_TWIN_HEAD_DRAGON_BOOTS,
    ITEM_ID_TWIN_HEAD_DRAGON_MAIL, ITEM_ID_YOCHIYOCHI_URIBO_SUTAI, ITEM_ID_YUMEMIRU_AKA_HITSUZI,
    ITEM_SET_ID_AWL_BARRONNO_MANT_EXCUTIONER_CARD, ITEM_SET_ID_AWL_BARRONNO_MANT_MISTILTINE_CARD,
    ITEM_SET_ID_AWL_BARRONNO_MANT_ORGE_TOOTH_CARD, ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW,
    ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_KACCHU, ITEM_SET_ID_IMPERIAL_GLOVE_IMPERIAL_FEATHER,
    ITEM_SET_ID_KUROHANO_SUIT_ARTIFACT, ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW,
    ITEM_SET_ID_MENBRITZ_MANT_MENBRITZ_CARD, ITEM_SET_ID_SENCHO_BOUSHI_AND_PIPE, ITEM_SET_ID_SHIRAHANO_SUIT_ARTIFACT,
    ITEM_SET_ID_TENGUNO_MAKIMONO_KARASUTENGU
} from "../item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_MH, MOB_CONF_PLAYER_ID_SENTO_AREA_NONE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS,
    n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_WeaponType, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_ARCLOUSE_DASH, SKILL_ID_AUTO_SHADOW_SPELL,
    SKILL_ID_CALAMITY_GALE, SKILL_ID_CANNON_SPEAR, SKILL_ID_CARROT_BEAT, SKILL_ID_ENRAGE_RAPTOR,
    SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_FIRE_EXPANSION, SKILL_ID_FLIP_FLAP, SKILL_ID_FRIGNO_UTA,
    SKILL_ID_HAPPO_KUNAI, SKILL_ID_KEIKAI, SKILL_ID_MANGETSU_KYAKU, SKILL_ID_MURENO_CHIKARA, SKILL_ID_NUTRAL_BARRIER,
    SKILL_ID_OVER_BLAND, SKILL_ID_PIKKI_TSUKI, SKILL_ID_PLATINUM_ALTER, SKILL_ID_RAPTORIAL_INSTINCT,
    SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SEIMEINO_CHIKARA, SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SHURASHINDAN,
    SKILL_ID_TAROUNO_KIZU, SKILL_ID_UNLIMIT, SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WERERAPTOR, SKILL_ID_WEREWOLF,
    SKILL_ID_WOLF_INSTINCT, SKILL_ID_WUG_RIDER
} from "../skill/skill.dat.js";
import { EquipNumSearchFurubitaSet, ROUNDDOWN } from "../bridge/foot-bridge.js";


export function ApplyPhysicalDamageUpVsMonsterSize() {
    let confval = 0, itemCount = 0, idx = 0, i = 0;

//==== 物理攻撃時、△△サイズのモンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================
	{
		/** アイテム数・スキルLvを格納する一次変数 */
		let prefetch = 0;

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(EquipNumSearch(1644)) n_tok[28] += n_A_Weapon_ATKplus;
		if(n_tok[260] != 0){
			n_tok[27] += n_tok[260];
			n_tok[28] += n_tok[260];
			n_tok[29] += n_tok[260];
		}

		//----------------------------------------------------------------
		// 「スナイピングシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_SHOES)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 5 * LearnedSkillSearch(SKILL_ID_WUG_RIDER) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 5 * LearnedSkillSearch(SKILL_ID_WUG_RIDER) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 5 * LearnedSkillSearch(SKILL_ID_WUG_RIDER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「オウルバロンのマント　エクスキューショナーカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AWL_BARRONNO_MANT_EXCUTIONER_CARD)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「オウルバロンのマント　オーガトゥースカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AWL_BARRONNO_MANT_ORGE_TOOTH_CARD)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「オウルバロンのマント　ミスティルティンカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AWL_BARRONNO_MANT_MISTILTINE_CARD)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「よちよちウリボウスタイ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 2 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 2 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 2 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「隷属の首輪」の、素ＳＴＲと素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_REIZOKUNO_KUBIWA)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 4 * ROUNDDOWN((SU_STR + SU_LUK) / 50) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * ROUNDDOWN((SU_STR + SU_LUK) / 50) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 4 * ROUNDDOWN((SU_STR + SU_LUK) / 50) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースアニマルローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ANIMAL_ROBE)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 7 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 7 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 7 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースガトリングスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_GATLING_SUIT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 7 * LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 7 * LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 7 * LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「太極の耳飾り(黄)」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_TAIKYOKUNO_MIMIKAZARI_KIIRO)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MANGETSU_KYAKU) >= 10) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 15 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 15 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「グロトネリーア」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 1 * LearnedSkillSearch(SKILL_ID_AUTO_SHADOW_SPELL) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 1 * LearnedSkillSearch(SKILL_ID_AUTO_SHADOW_SPELL) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 1 * LearnedSkillSearch(SKILL_ID_AUTO_SHADOW_SPELL) * itemCount;
		}

		//----------------------------------------------------------------
		// 「辰戌の腕輪」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_TATSUINUNO_UDEWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SHURASHINDAN) >= 10) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 10 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 10 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアル天地スーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_TENCHI_SUIT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレース天地スーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_TENCHI_SUIT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ロードオブロイヤルズ」の、素ＳＴＲと素ＩＮＴによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_LORD_OF_ROYALS)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 4 * ROUNDDOWN((SU_STR + SU_INT) / 50) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * ROUNDDOWN((SU_STR + SU_INT) / 50) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 4 * ROUNDDOWN((SU_STR + SU_INT) / 50) * itemCount;
		}

		//----------------------------------------------------------------
		// 「パラケルススグローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_PARACELSUS_GLOVE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) >= 5) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 10 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 10 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルカルティベイションコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CULTIVATION_COAT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースカルティベイションコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 7 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 7 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 7 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「夢見る赤羊」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YUMEMIRU_AKA_HITSUZI)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 5 * LearnedSkillSearch(SKILL_ID_WUG_RIDER) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 5 * LearnedSkillSearch(SKILL_ID_WUG_RIDER) * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 5 * LearnedSkillSearch(SKILL_ID_WUG_RIDER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「サンクトゥス」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SANCTUS)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 15 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 15 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「携帯式サポートシステム」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KETAISHIKI_SUPPORT_SYSTEM)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER) >= 3) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += 15 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += 15 * itemCount;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += 15 * itemCount;
			}
		}

		/** カルノス「ウルフインスティンクト」による 小・中・大型モンスターに与えるダメージ + 効果 */
		if (UsedSkillSearch(SKILL_ID_WEREWOLF) > 0) {
			prefetch = LearnedSkillSearch(SKILL_ID_WOLF_INSTINCT);
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += prefetch;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += prefetch;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += prefetch;
		}

		/** カルノス「ラプトリアルインスティンクト」による 小・中・大型モンスターに与えるダメージ + 効果 */
		if (UsedSkillSearch(SKILL_ID_WERERAPTOR) > 0) {
			prefetch = LearnedSkillSearch(SKILL_ID_RAPTORIAL_INSTINCT);
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL] += prefetch;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM] += prefetch;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE] += prefetch;
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_SIZE);
		if (confval != 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE; i++) {
				n_tok[i] += confval;
			}
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}
	}

//================================================================================================================================
//================================================================================================================================
//====
//==== 公式サイトで「遠距離物理攻撃 + ◯%」と表記される
}

export function ApplyPhysicalDamageUpLongRange() {
    let vartmp = 0, confval = 0, sklLv = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, cardCount = 0, cardCountRight = 0, cardCountLeft = 0, cardCountHeadTop = 0, cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0, idx = 0;

//==== 遠距離物理攻撃で与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================
	{
		/** アイテム数・スキルLvを格納する一次変数 */
		let prefetch = 0;

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_LONGRANGE_DAMAGE_UP; idx <= ITEM_SP_LONGRANGE_DAMAGE_UP; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		// 弓装備時、遠距離物理攻撃で与えるダメージ増加
		if (n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW] > 0) {
			if (n_A_WeaponType == ITEM_KIND_BOW) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW];
			}
		}

		if(EquipNumSearch(ITEM_ID_DAICHINO_YUMI) && n_A_Arrow == ARROW_ID_GANSEKINO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 25;
		if(EquipNumSearch(ITEM_ID_MOERU_YUMI) && n_A_Arrow == ARROW_ID_HONOONO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 25;
		if(EquipNumSearch(ITEM_ID_HYOTENNO_YUMI) && n_A_Arrow == ARROW_ID_SUISHONO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 25;
		if(EquipNumSearch(ITEM_ID_HAYATENO_YUMI) && n_A_Arrow == ARROW_ID_KAZENO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 25;
		if(EquipNumSearch(ITEM_ID_ORC_ARCHER_YUMI) && n_A_Arrow == ARROW_ID_KOTETSUNO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50;
		if(EquipNumSearch(ITEM_SET_ID_SENCHO_BOUSHI_AND_PIPE)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += n_A_HEAD_DEF_PLUS;
		if(EquipNumSearch(ITEM_ID_SNIPER_GOGGLE) && SU_AGI >= 120) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 4;
		if(EquipNumSearch(ITEM_ID_HUNTER_BOW) && n_A_Arrow == ARROW_ID_KARYUDONO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50;
		if(EquipNumSearch(ITEM_ID_ELVEN_BOW) && n_A_Arrow == ARROW_ID_ELFNO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50;
		if(EquipNumSearch(ITEM_ID_RUDRANO_YUMI) && n_A_Arrow == ARROW_ID_ORIDEOKONNO_YA) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50;
		if(EquipNumSearch(ITEM_ID_HYPPATSUHYAKUCHUNO_OMAMORI) && SU_DEX >= 100){
			var wx = EquipNumSearch(ITEM_ID_HYPPATSUHYAKUCHUNO_OMAMORI);
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1 * wx;
			if(SU_DEX >= 120) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * wx;
		}
		if(EquipNumSearch(ITEM_ID_SHIRAHANO_SUIT)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += n_A_BODY_DEF_PLUS * 2;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(ITEM_SET_ID_SHIRAHANO_SUIT_ARTIFACT)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 15;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(ITEM_SET_ID_KUROHANO_SUIT_ARTIFACT)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] -= 10;
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1634)){
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
			if(n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
		}
		if(EquipNumSearch(1695)) if(GetLowerJobSeriesID(n_A_JOB)==4) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 10;
		if(n_A_BaseLV >= 100 && EquipNumSearch(1764)){
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1;
			if(n_A_BaseLV >= 150) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1;
		}

		// 技巧の時空ブーツ
		if(SU_DEX >= 120 && EquipNumSearch(1921)) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
		}
		if(SU_DEX >= 120 && EquipNumSearch(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
		}

		if(SU_DEX >= 110 && EquipNumSearch(1950)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1 * EquipNumSearch(1950);
		if(n_A_Weapon_ATKplus >= 7 && EquipNumSearch(2024)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
		if(n_A_HEAD_DEF_PLUS >= 6 && TimeItemNumSearch(64) && EquipNumSearch(2085)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += (n_A_HEAD_DEF_PLUS - 5);
		if(CardNumSearch(739)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1 * ROUNDDOWN(SU_DEX / 10);
		if(EquipNumSearch(2355)){
			if(n_A_BODY_DEF_PLUS >= 8) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2;
			if(n_A_BODY_DEF_PLUS >= 9) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
			if(n_A_Arrow == ARROW_ID_HONOONO_YA && EquipNumSearch(2356)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 20;
			if(n_A_Arrow == ARROW_ID_SUISHONO_YA && EquipNumSearch(2357)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 20;
			if(n_A_Arrow == ARROW_ID_GANSEKINO_YA && EquipNumSearch(2358)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 20;
			if(n_A_Arrow == ARROW_ID_KAZENO_YA && EquipNumSearch(2359)) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 20;
		}
		if(EquipNumSearch(2367)){
			if(n_A_SHOES_DEF_PLUS >= 8) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += (n_A_SHOES_DEF_PLUS - 7);
		}

		//----------------------------------------------------------------
		// 「戦死者のマント」の、純粋なＤＥＸが１３０の時
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)){
			if (SU_DEX >= 130) {
				if (EquipNumSearchFurubitaSet() > 0) {
					n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 10;
				} else {
					n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
				}
			}
		}

		//----------------------------------------------------------------
		// 「天狗の巻物セット」の、強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_SET_ID_TENGUNO_MAKIMONO_KARASUTENGU)) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1;
			if (SU_STR >= 108) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1;
			if (SU_STR >= 120) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1;
		}

		//----------------------------------------------------------------
		// 「元素のタオル」の、＋８以上精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_GENSONO_TOWEL)) {
			if(n_A_SHOULDER_DEF_PLUS >= 8) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2;
			if(n_A_SHOULDER_DEF_PLUS >= 9) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
		}

		//----------------------------------------------------------------
		// 「パワードメイル」の、過剰精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_POWERED_MAIL)) {
			if(n_A_BODY_DEF_PLUS >= 5) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * (n_A_BODY_DEF_PLUS - 4);
		}

		//----------------------------------------------------------------
		// 「ギガントブーツ　ボウセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3 * ROUNDDOWN(SU_STR / 10);
			}
		}

		//----------------------------------------------------------------
		// 「フェアリーフのギリ粉」の、素ＤＥＸによる強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_FAIRLEAFNO_GIRIKO)) {
			if (SU_DEX >= 100) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
			}
		}


		//----------------------------------------------------------------
		// 「巨人の加護　ギガントボウセット」の、素ＳＴＲによる強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW)) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * ROUNDDOWN(SU_STR / 10);
		}

		//----------------------------------------------------------------
		// 「スナイピングベール」の、過剰精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SNIPING_VEIL)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
			}
			if (n_A_SHOULDER_DEF_PLUS >= 9) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
			}
		}

		//----------------------------------------------------------------
		// 「共和国の帽子」の、過剰精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_KYOWAKOKUNO_BOSHI)) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 4 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 3);
		}

		//----------------------------------------------------------------
		// 「メンブリッツマント」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MENBRITZ_MANT)) > 0) {
			vartmp = 0;

			if (n_A_SHOULDER_DEF_PLUS >= 5) vartmp += 1 * ROUNDDOWN(SU_DEX / 60);
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1 * ROUNDDOWN(SU_DEX / 10);

			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「メンブリッツマント　メンブリッツカードセット」の、素ＤＥＸによる効果（ペナルティ）
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_MENBRITZ_MANT_MENBRITZ_CARD)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += -1 * ROUNDDOWN(SU_DEX / 10) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルグローブ　インペリアルフェザーセット」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_IMPERIAL_GLOVE_IMPERIAL_FEATHER)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * LearnedSkillSearch(SKILL_ID_OVER_BLAND) * itemCount;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) * itemCount;
		}

		//----------------------------------------------------------------
		// 「灰羽のブーツ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_HAIHANENO_BOOTS)) > 0) {
			vartmp = 0;

			if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 5;

			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「黄色い猫じゃらしの模型」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_KIROI_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_KIROI_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「虹色のスカーフ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * LearnedSkillSearch(SKILL_ID_AIMED_BOLT) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ファフニールスケイル」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_SCALE)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}

		//----------------------------------------------------------------
		// 「パワフルAスケルトンカード」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_POWERFUL_A_SKELETON)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1 * ROUNDDOWN(n_A_BaseLV / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「レンジャーセシル(MVP)カード」の、職業による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_RANGER_CECIL_MVP)) > 0) {
			if (IsSameJobClass(JOB_ID_RANGER)) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 15 * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「キックステップカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_KICK_STEP)) {
			if (n_A_SHOES_DEF_PLUS >= 7) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
			if (n_A_SHOES_DEF_PLUS >= 9) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2;
		}

		//----------------------------------------------------------------
		// 「獄エンチャント」の、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_GOKU)) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「死のニーヴ(技巧)」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_ARMS_LEFT_ANY);
		cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_HEAD_TOP_ANY);
		cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_SHIELD_ANY);
		cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_BODY_ANY);
		cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_SHOULDER_ANY);
		cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO, CARD_REGION_ID_SHOES_ANY);
		if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
			+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

			// 右手武器へのエンチャント
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 1;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountRight

			// 左手武器へのエンチャント
			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 1;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountLeft

			// 頭防具へのエンチャント
			vartmp = 0;
			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountHeadTop

			// 盾防具へのエンチャント
			vartmp = 0;
			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountShield

			// 体防具へのエンチャント
			vartmp = 0;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountBody

			// 肩防具へのエンチャント
			vartmp = 0;
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountShoulder

			// 靴防具へのエンチャント
			vartmp = 0;
			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 1;
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += vartmp * cardCountShoes

			// アクセサリへのエンチャント
			// 精錬できないので処理不要
		}

		if(CardNumSearch(829)){
			if(n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * CardNumSearch(829);
			if(n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1 * CardNumSearch(829);
		}
		if(SU_STR >= 108 && EquipNumSearch(2395)){
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2;
			if(SU_STR >= 120) n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3;
		}

		//----------------------------------------------------------------
		// 「リングオブヴィーナス」の、素ＤＥＸによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_VENUS, EQUIP_REGION_ID_ACCESSORY_1)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 1 * Math.floor(SU_DEX / 10) * itemCount;
		}

		//----------------------------------------------------------------
		// 「暴威のマフラー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「アーヌルス イラ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_ANULUS_IRA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SHURASHINDAN) >= 10) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「グレースクルシフォームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 12 * LearnedSkillSearch(SKILL_ID_HAPPO_KUNAI) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルレインストームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_RAINSTORM_SUIT)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースレインストームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_RAINSTORM_SUIT)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 12 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ファフニールヘルム」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) >= 10) {
				if (LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) >= 10) {
					n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50 * itemCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「改良型パワードスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KAIRYOGATA_POWERED_SUIT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER) >= 3) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 70 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ツインヘッド・ドラゴンメイル」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 7 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ツインヘッド・ドラゴンブーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ゾディアック　天秤宮のダイアデム」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　天秤宮のメイル」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_MAIL)) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3 * n_A_BODY_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「剛勇無双の籠手＋剛勇無双の貫セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_KACCHU)) > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// レンジャー　アンリミット
		// PvP, GvG 等では効果を発揮しない（YEは使用可能の模様）
		//----------------------------------------------------------------
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
		case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_MH:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:

			// カラミティゲイル状態では無い場合のみ処理する
			if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) == 0) {
				sklLv = UsedSkillSearch(SKILL_ID_UNLIMIT);
				if (sklLv > 0) {
					// 特定の戦闘エリアでの補正
					switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
						case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
							n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 250 + 20 * sklLv;
							break;
						default:
							n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50 * sklLv;
							break;
					}
				}
			}
		}

		//----------------------------------------------------------------
		// ウィンドホーク　カラミティゲイル
		// PvP, GvG 等では効果を発揮しない（YEは使用可能の模様）
		//----------------------------------------------------------------
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
			case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_MH:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
	
				sklLv = UsedSkillSearch(SKILL_ID_CALAMITY_GALE);
				if (sklLv > 0) {
	
					// 特定の戦闘エリアでの補正
					switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
	
					case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
						//n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 250 + 20 * 5;//アンリミットLV.5発動状態にする。
						break;
	
					default:
						n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 50 * 5;//アンリミットLV.5発動状態にする。
						break;
	
					}
				}
			}

		/** 三次職支援設定「ダンスウィズウォーグ」の遠距離物理攻撃 + 効果 */
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG] > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG];
		}

		//----------------------------------------------------------------
		// 「三次職支援　アクラウスダッシュ」の効果（サモナー限定）
		//----------------------------------------------------------------
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			switch (g_confDataSanzi[CCharaConfSanzi.CONF_ID_ARCLOUSE_DASH]) {
			case 1:
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
				break;
			case 2:
			case 3:
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 10;
				break;
			case 4:
			case 5:
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 15;
				break;
			}
		}

		//----------------------------------------------------------------
		// 「サモナー　生命の力」の、スキル習得数による効果
		//----------------------------------------------------------------
		if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA), UsedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA)) > 0) {
			let summoner_skill_animal_sum = 0;
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_CARROT_BEAT);
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_TAROUNO_KIZU);
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_ARCLOUSE_DASH);
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_PIKKI_TSUKI);
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_KEIKAI);
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA);
			summoner_skill_animal_sum += LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI);
			if (Math.max(summoner_skill_animal_sum, UsedSkillSearch(SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI)) >= 20) {
				n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 10;
			}
		}

		/** 四次職支援 アリテア「ゼファーリンク」の遠距離物理攻撃で与えるダメージ + 効果  */
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_ZEPHYR_LINK]) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 15;
		}

		/** アリテア「フリップフラップ」「エアロシンク」の遠距離物理攻撃で与えるダメージ + 効果  */
		prefetch = UsedSkillSearch(SKILL_ID_FLIP_FLAP);
		if (prefetch > 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 3 * prefetch;
		} else {
			// 対象が「フリップフラップ」状態の場合、「エアロシンク」状態にはならない
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5 * g_confDataYozi[CCharaConfYozi.CONF_ID_AERO_SYNC];
		}

		/** ドルイド「エンレイジラプター」の遠距離物理攻撃で与えるダメージ + 効果 */
		n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 2 * UsedSkillSearch(SKILL_ID_ENRAGE_RAPTOR);

		/**
		 * 幻想叢書カード エレナ
		 */
		if (n_A_PassSkill7[52] === 3) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += 5;
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_LONGRANGE_DAMAGE_UP);
		if (confval != 0) {
			n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP] += confval;
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_LONGRANGE_DAMAGE_UP; idx <= ITEM_SP_LONGRANGE_DAMAGE_UP; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}
	}

}
