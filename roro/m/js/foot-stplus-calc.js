/**
 * ステータス加算効果（Str + ◯ など）を算出する（StPlusCalc）。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { n_A_PassSkill4 } from '../../../ro4/m/js/BuffGuildAndGospel.js';
import { n_A_PassSkill7 } from '../../../ro4/m/js/BuffItemAndFood.js';
import { UsedSkillSearch } from '../../../ro4/m/js/BuffJobSpecificSelf.js';
import { n_A_PassSkill8 } from '../../../ro4/m/js/BuffOtherCategory.js';
import {
    GetHigherJobSeriesID, GetJobBonus, GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_BARD, JOB_SERIES_ID_DANCER,
    JOB_SERIES_ID_HUNTER, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_MONK, JOB_SERIES_ID_NOVICE,
    JOB_SERIES_ID_PRIEST, JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_THIEF
} from '../../../ro4/m/js/data/mig.job.h.js';
import {
    g_confDataDebuff, g_confDataIchizi, g_confDataNizi, g_confDataSanzi, g_confDataYozi,
    g_objCharaConfCustomSpecStatus, g_objCharaConfCustomStatus
} from '../../../ro4/m/js/global.js';
import { DisplayStatusBonusAll, StoreSpecStatusBonusAll, StoreBasicStatusBonusAll } from '../../../ro4/m/js/hmjob.js';
import { n_A_BaseLV, n_tok } from '../../../ro4/m/js/ro4-state.js';
import { CCharaConfCustomSpecStatus } from './CCharaConfCustomSpecStatus.js';
import { CCharaConfCustomStatus } from './CCharaConfCustomStatus.js';
import { CCharaConfDebuff } from './CCharaConfDebuff.js';
import { CCharaConfIchizi } from './CCharaConfIchizi.js';
import { CCharaConfNizi } from './CCharaConfNizi.js';
import { CCharaConfSanzi } from './CCharaConfSanzi.js';
import { CCharaConfYozi } from './CCharaConfYozi.js';
import { CExtraInfoAreaComponentManager } from './CExtraInfoAreaComponentManager.js';
import {
    CARD_ID_ARCH_BISHOP_MARGARETTE_MVP, CARD_ID_BIG_EGGRING, CARD_ID_ECO_MOMO_ARMA,
    CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU,
    CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU,
    CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI, CARD_ID_GENETIC_EMUR_MVP, CARD_ID_GOKU,
    CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP, CARD_ID_MECHANIC_HAWARD_MVP, CARD_ID_MINSTREL_ARFOSIO_MVP, CARD_ID_PISCES,
    CARD_ID_RANGER_CECIL_MVP, CARD_ID_ROYAL_GUARD_RANDEL_MVP, CARD_ID_RUNE_KNIGHT_SEIREN_MVP,
    CARD_ID_SHADOW_CHASER_GARTY_MVP, CARD_ID_SHURA_CHENG_MVP, CARD_ID_SORCERER_CERIA_MVP, CARD_ID_TAUROS,
    CARD_ID_WANDERER_TRENTINI_MVP, CARD_ID_WARLOCK_CATHERINE_MVP, CARD_SET_ID_CELINE_KIMI_NOBLE_CROSS,
    CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_KOKUDAO, CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_KOKUDAO,
    CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MANT
} from './card.dat.js';
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from './chara.js';
import {
    CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_HEAD_TOP_ANY, CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from './common.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from './const/EnumEquipRegionId.js';
import {
    ITEM_SP_AGI_PLUS, ITEM_SP_AGI_PLUS_FOR_SET, ITEM_SP_AGI_PLUS_PLANE, ITEM_SP_ALLSTATUS_PLUS,
    ITEM_SP_ALLSTATUS_PLUS_FOR_SET, ITEM_SP_ALL_SPECS_PLUS, ITEM_SP_CON_PLUS, ITEM_SP_CRT_PLUS, ITEM_SP_DEX_PLUS,
    ITEM_SP_DEX_PLUS_FOR_SET, ITEM_SP_DEX_PLUS_PLANE, ITEM_SP_INT_PLUS, ITEM_SP_INT_PLUS_FOR_SET,
    ITEM_SP_INT_PLUS_PLANE, ITEM_SP_LUK_PLUS, ITEM_SP_LUK_PLUS_FOR_SET, ITEM_SP_LUK_PLUS_PLANE, ITEM_SP_POW_PLUS,
    ITEM_SP_SPL_PLUS, ITEM_SP_STA_PLUS, ITEM_SP_STR_PLUS, ITEM_SP_STR_PLUS_FOR_SET, ITEM_SP_STR_PLUS_PLANE,
    ITEM_SP_VIT_PLUS, ITEM_SP_VIT_PLUS_FOR_SET, ITEM_SP_VIT_PLUS_PLANE, ITEM_SP_WIS_PLUS
} from './const/EnumItemSpId.js';
import {
    JOB_ID_GENETIC, JOB_ID_MINSTREL, JOB_ID_RUNEKNIGHT, JOB_ID_SORCERER, JOB_ID_SUPERNOVICE, JOB_ID_SUPERNOVICE_PLUS,
    JOB_ID_WANDERER
} from './const/EnumJobId.js';
import {
    GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, GetEquippedTotalSPEquipExact
} from './foot-equipped-sp.js';
import { GetRndOptTotalValue } from './hmrndopt.js';
import {
    ITEM_ID_AMANOZYAKUNO_KIMEN, ITEM_ID_AMAZING_GRACE, ITEM_ID_CHOETSUSHANO_ROBE, ITEM_ID_DAISHIZENNO_GUITAR,
    ITEM_ID_DAISHIZENNO_ROPE, ITEM_ID_DARK_RING, ITEM_ID_DARK_TRIAD, ITEM_ID_DIA_DE_MUERTOS, ITEM_ID_EIKONO_AKASHI,
    ITEM_ID_EMERALDEARRING, ITEM_ID_EMERALD_RING, ITEM_ID_FAFNIR_HELM, ITEM_ID_FIFTH_ELEMENT, ITEM_ID_FOUR_OF_A_KIND,
    ITEM_ID_FURUBITA_BALLERINA, ITEM_ID_FURUBITA_MINSTRELSONG, ITEM_ID_FURUBITA_SHADOWCROWN,
    ITEM_ID_GIKONO_ZIKU_BOOTS_S1, ITEM_ID_GRACE_GATLING_SUIT, ITEM_ID_GRACE_MENUS_SUIT, ITEM_ID_GRACE_RAINSTORM_SUIT,
    ITEM_ID_GRACE_SCULL_ROBE, ITEM_ID_GUARDIAN_KNIGHTS_ARCHER_BOW, ITEM_ID_GUARDIAN_KNIGHTS_ARCHER_BOW_T1,
    ITEM_ID_GUARDIAN_UNIT, ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA, ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO,
    ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI, ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI, ITEM_ID_ILLUSION_STUFF_OF_OLDE,
    ITEM_ID_ILUSION_SUIT_1, ITEM_ID_ILUSION_SUIT_2, ITEM_ID_IMPERIAL_GATLING_SUIT, ITEM_ID_IMPERIAL_MENUS_SUIT,
    ITEM_ID_IMPERIAL_RAINSTORM_SUIT, ITEM_ID_IMPERIAL_SCULL_ROBE, ITEM_ID_KINKINO_MADOSHO, ITEM_ID_KODAIRYUNO_HOKAN,
    ITEM_ID_KOINNO_TSURUHASHI, ITEM_ID_LOLANO_PLATEMAIL, ITEM_ID_LOUD_PARK, ITEM_ID_MAGIC_COMPRESSION,
    ITEM_ID_MOFUMOFU_LOVELY_FOX, ITEM_ID_OMOCHANO_YUBIWA, ITEM_ID_POKAPOKA_TANPOPO_CAPE, ITEM_ID_POWERED_CHIP,
    ITEM_ID_RUNE_GREEVE, ITEM_ID_RUNE_HELM, ITEM_ID_SAPPHIRE_LIST, ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI,
    ITEM_ID_SHIELD_RING, ITEM_ID_SNIPING_SHOES, ITEM_ID_STUFF_OF_ORD, ITEM_ID_SUNADOKENO_NECKLACE,
    ITEM_ID_TATSUINUNO_UDEWA, ITEM_ID_TENBINKYUNO_DIADEM, ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI,
    ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN, ITEM_ID_TOZOKUNO_SUSUME_DAINIKAN, ITEM_ID_TRANSCENDENCE_RING,
    ITEM_ID_TRAVELER_SHOES, ITEM_ID_VALKYRIE_HAMMER, ITEM_ID_VALKYRIE_KNIFE, ITEM_ID_ZIKEIDANNO_YUMI,
    ITEM_ID_ZYASPER_CIRCLET, ITEM_SET_ID_AEGIR_RING_AEGIR_HELM, ITEM_SET_ID_APPLAUSE_SANDAL_FUINSARETA_AMON_RA,
    ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON, ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA,
    ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON, ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI,
    ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN, ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_TSURANUKI,
    ITEM_SET_ID_HOSHINO_GANTAI_FUINSARETA_ORC_HERO_CARD, ITEM_SET_ID_HOSHINO_GANTAI_ORC_HERO_CARD,
    ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA_CARD, ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_KOO_GLOZA,
    ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_KOO_GLOZA_OWASHINO_GANKO,
    ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_FUINSARETA_IGNISEM_CENIA_MVP,
    ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_IGNISEM_CENIA_MVP, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET,
    ITEM_SET_ID_TATENASHINO_YOROI_FUINSARETA_RSX_0806, ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_TRADE_MAIL
} from './item.dat.js';
import { LearnedSkillSearch } from './learnedskill.js';
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, n_A_AGI, n_A_BODY_DEF_PLUS, n_A_DEX, n_A_Equip,
    n_A_HEAD_DEF_PLUS, n_A_INT, n_A_JOB, n_A_JobLV, n_A_LUK, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_SHOULDER_DEF_PLUS, n_A_STR, n_A_VIT, n_A_Weapon2_ATKplus, n_A_WeaponType, n_A_Weapon_ATKplus, n_A_card,
    set_n_A_AGI, set_n_A_DEX, set_n_A_INT, set_n_A_LUK, set_n_A_STR, set_n_A_VIT
} from './roro-state.js';
import {
    SKILL_ID_BLOOD_HOWLING, SKILL_ID_CHASEWALK, SKILL_ID_CHATTERING, SKILL_ID_DAICHINO_CHIKARA,
    SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_DEBOTION, SKILL_ID_DEFENCE, SKILL_ID_DOUBLE_STRAFING, SKILL_ID_DRAGONOLOGY,
    SKILL_ID_ELECTRIC_SHOCKER, SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_FAINT_BOMB,
    SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_FRIGNO_UTA, SKILL_ID_FUKURONO_ME, SKILL_ID_FULLSLOT, SKILL_ID_GIANT_GROWTH,
    SKILL_ID_GRAPHITY, SKILL_ID_GRENADE_MASTERY, SKILL_ID_HILT_BINDING, SKILL_ID_HOSHINO_SHUKUFUKU,
    SKILL_ID_INCREASING_ACCURACY, SKILL_ID_INSPIRATION, SKILL_ID_INUHAKKA_METEOR, SKILL_ID_INUHAKKA_SHOWER,
    SKILL_ID_KEIKAI, SKILL_ID_KEN_SHUREN, SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_LESSON, SKILL_ID_LOUD_VOICE,
    SKILL_ID_MAELSTORM, SKILL_ID_MARIAGE_STATUS, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_MATATABI_LANCE,
    SKILL_ID_MYAUMYAU, SKILL_ID_NATURE_SHIELD, SKILL_ID_NEN, SKILL_ID_NYAN_GRASS, SKILL_ID_ORATIO,
    SKILL_ID_PILE_BUNKER, SKILL_ID_PREENING, SKILL_ID_RADIUS, SKILL_ID_REIDOZYUTSU_SHUREN, SKILL_ID_SEVERE_RAINSTORM,
    SKILL_ID_SHIRYO_HYOI, SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_SLIMPOTION_PITCHER, SKILL_ID_SOUL_ENERGY_KENKYU,
    SKILL_ID_SPURT_ZYOTAI, SKILL_ID_SUMMON_AGNI, SKILL_ID_SUMMON_AQUA, SKILL_ID_SUMMON_TERA, SKILL_ID_SUMMON_VENTOS,
    SKILL_ID_SUPER_NOVICE_NODEAD_BONUS, SKILL_ID_SWING_DANCE, SKILL_ID_TAIYONO_SHUKUFUKU,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, SKILL_ID_TENKETSU_HAN, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
    SKILL_ID_TRAP_KENKYU, SKILL_ID_TRUE_SIGHT, SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_UCHUNO_KAMAE,
    SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WEAPON_CRUSH
} from './skill.dat.js';
import {
    TIME_ITEM_ID_BLUE_RIBBON, TIME_ITEM_ID_DEMI_FREYA, TIME_ITEM_ID_GREATER_DRACLE_HORN, TIME_ITEM_ID_KOKKOCHAN,
    TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD, TIME_ITEM_ID_RUDO_MASK, TIME_ITEM_ID_SHISHIONO_KABUTO,
    TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO, TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD
} from './timeitem.dat.js';
import { InitJobInfo, ROUNDDOWN } from './foot-bridge.js';

/**
 * 公式サイトで Str + ◯ などと表記される
 * 基礎ステータス加算効果
 */
export function StPlusCalc() {
	var sklLv = 0, confval = 0, value = 0;
	let idx = 0;
	let jobBonusArray = null;
	let superNoviceBonus = 0;
	let bufLv = 0;
	let vartmp = 0;
	let itemCount = 0;
	let itemCountRight = 0;
	let itemCountLeft = 0;
	let itemCountAccessory1 = 0;
	let itemCountAccessory2 = 0;
	let cardCount = 0;
	let cardCountRight = 0;
	let cardCountLeft = 0;
	let cardCountHeadTop = 0;
	let cardCountHeadMid = 0;
	let cardCountShield = 0;
	let cardCountBody = 0;
	let cardCountShoulder = 0;
	let cardCountShoes = 0;
	let cardCountAccessory1 = 0;
	let cardCountAccessory2 = 0;

	let prefetch = 0;

	// TODO: 将来的に構造の変更が必要
	// 拡張表示用
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_STR_PLUS, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_AGI_PLUS, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_VIT_PLUS, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_INT_PLUS, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_DEX_PLUS, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_LUK_PLUS, 0);

	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_STR_PLUS_PLANE, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_AGI_PLUS_PLANE, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_VIT_PLUS_PLANE, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_INT_PLUS_PLANE, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_DEX_PLUS_PLANE, 0);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_LUK_PLUS_PLANE, 0);

	// ジョブ補正の算出
	InitJobInfo();
	// n_A_JobLV は HydrateFromModel() が calcForm.A_JobLV から既に設定済み（本関数呼び出し前）。
	jobBonusArray = GetJobBonus(n_A_JOB, n_A_JobLV);

	// スーパーノービスの無死亡ボーナス
	if (
		(
			(IsSameJobClass(JOB_ID_SUPERNOVICE) && (n_A_JobLV >= 70))
			||
			IsSameJobClass(JOB_ID_SUPERNOVICE_PLUS)
		)
		&&
		UsedSkillSearch(SKILL_ID_SUPER_NOVICE_NODEAD_BONUS)
	){
		superNoviceBonus = 10;
	}

	//----------------------------------------------------------------
	// 求めた値を基礎値とする
	//----------------------------------------------------------------
	var wSPC_STR = jobBonusArray[0] + superNoviceBonus;
	var wSPC_AGI = jobBonusArray[1] + superNoviceBonus;
	var wSPC_VIT = jobBonusArray[2] + superNoviceBonus;
	var wSPC_INT = jobBonusArray[3] + superNoviceBonus;
	var wSPC_DEX = jobBonusArray[4] + superNoviceBonus;
	var wSPC_LUK = jobBonusArray[5] + superNoviceBonus;
	var wSPC_POW = jobBonusArray[6];
	var wSPC_STA = jobBonusArray[7];
	var wSPC_WIS = jobBonusArray[8];
	var wSPC_SPL = jobBonusArray[9];
	var wSPC_CON = jobBonusArray[10];
	var wSPC_CRT = jobBonusArray[11];
	var wSPCall = 0;

	//----------------------------------------------------------------
	// 装備の加算値、全パラメタ上昇効果の加算値を適用
	//----------------------------------------------------------------
	wSPCall += GetEquippedTotalSPEquipExact(7);
	wSPC_STR += GetEquippedTotalSPEquipExact(1) + wSPCall;
	wSPC_AGI += GetEquippedTotalSPEquipExact(2) + wSPCall;
	wSPC_VIT += GetEquippedTotalSPEquipExact(3) + wSPCall;
	wSPC_INT += GetEquippedTotalSPEquipExact(4) + wSPCall;
	wSPC_DEX += GetEquippedTotalSPEquipExact(5) + wSPCall;
	wSPC_LUK += GetEquippedTotalSPEquipExact(6) + wSPCall;


	//----------------------------------------------------------------
	// 「ふくろうの目」の、ＤＥＸ＋効果
	//----------------------------------------------------------------
	wSPC_DEX += Math.max(LearnedSkillSearch(SKILL_ID_FUKURONO_ME), UsedSkillSearch(SKILL_ID_FUKURONO_ME));

	//----------------------------------------------------------------
	// 「ラウドボイス」の、ＳＴＲ＋効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_LOUD_VOICE)
		|| (g_confDataIchizi[CCharaConfIchizi.CONF_ID_LOUD_VOICE] >= 1)
		|| TimeItemNumSearch(TIME_ITEM_ID_KOKKOCHAN)
		|| TimeItemNumSearch(TIME_ITEM_ID_RUDO_MASK)
		|| TimeItemNumSearch(TIME_ITEM_ID_SHISHIONO_KABUTO)
		|| TimeItemNumSearch(TIME_ITEM_ID_GREATER_DRACLE_HORN)
		) {
		wSPC_STR += 4;
	}

	//----------------------------------------------------------------
	// 「ヒルトバインディング」の、ＳＴＲ＋効果
	//----------------------------------------------------------------

	wSPC_STR += Math.max(LearnedSkillSearch(SKILL_ID_HILT_BINDING), UsedSkillSearch(SKILL_ID_HILT_BINDING));

	//----------------------------------------------------------------
	// 「念」の、ＳＴＲ＋、ＩＮＴ＋効果
	//----------------------------------------------------------------
	wSPC_STR += UsedSkillSearch(SKILL_ID_NEN);
	wSPC_INT += UsedSkillSearch(SKILL_ID_NEN);

	//----------------------------------------------------------------
	// 「ドラゴノロジー」の、ＩＮＴ＋効果
	//----------------------------------------------------------------
	wSPC_INT += Math.round(Math.max(LearnedSkillSearch(SKILL_ID_DRAGONOLOGY), UsedSkillSearch(SKILL_ID_DRAGONOLOGY)) / 2);

	//----------------------------------------------------------------
	// 「トラップ研究」の、ＩＮＴ＋効果
	//----------------------------------------------------------------
	wSPC_INT += Math.max(LearnedSkillSearch(SKILL_ID_TRAP_KENKYU), UsedSkillSearch(SKILL_ID_TRAP_KENKYU));

	//----------------------------------------------------------------
	// 「チェイスウォーク」の、ＳＴＲ＋効果
	//----------------------------------------------------------------
	switch (UsedSkillSearch(SKILL_ID_CHASEWALK)) {
		case 5:
			wSPC_STR += 16;
			break;
		case 4:
			wSPC_STR += 8;
			break;
		case 3:
			wSPC_STR += 4;
			break;
		case 2:
			wSPC_STR += 2;
			break;
		case 1:
			wSPC_STR += 1;
			break;
	}

	if(EquipNumSearch(1305)){
		var w = Math.floor(n_A_JobLV / 5);
		if(w > 6) w = 6;
		wSPC_STR -= w;
		wSPC_AGI -= w;
		wSPC_VIT -= w;
		wSPC_INT -= w;
		wSPC_DEX -= w;
		wSPC_LUK -= w;
	}

	// 拡張表示用のデータを格納
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_STR_PLUS_PLANE, wSPC_STR - jobBonusArray[0]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_AGI_PLUS_PLANE, wSPC_AGI - jobBonusArray[1]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_VIT_PLUS_PLANE, wSPC_VIT - jobBonusArray[2]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_INT_PLUS_PLANE, wSPC_INT - jobBonusArray[3]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_DEX_PLUS_PLANE, wSPC_DEX - jobBonusArray[4]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_LUK_PLUS_PLANE, wSPC_LUK - jobBonusArray[5]);

	//----------------------------------------------------------------
	// 「アーチャー　集中力向上」の効果
	// 「時限アイテム　ヴンダーカンマー（集中力向上）」の効果
	// 「一次職支援　集中力向上」の効果
	// 「時限アイテム　ブルーリボン（集中力向上）」の効果
	//----------------------------------------------------------------
	if((sklLv = UsedSkillSearch(SKILL_ID_SHUCHURYOKU_KOZYO)) > 0) {
		wSPC_DEX = Math.floor((n_A_DEX + wSPC_DEX) * (102 + sklLv) / 100) - n_A_DEX;
		wSPC_AGI = Math.floor((n_A_AGI + wSPC_AGI) * (102 + sklLv) / 100) - n_A_AGI;
	}
	else if (TimeItemNumSearch(TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO) > 0){
		wSPC_DEX = Math.floor((n_A_DEX + wSPC_DEX) * 107 / 100) - n_A_DEX;
		wSPC_AGI = Math.floor((n_A_AGI + wSPC_AGI) * 107 / 100) - n_A_AGI;
	}
	else if ((bufLv = g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO]) > 0) {
		wSPC_DEX = Math.floor((n_A_DEX + wSPC_DEX) * (102 + bufLv) / 100) - n_A_DEX;
		wSPC_AGI = Math.floor((n_A_AGI + wSPC_AGI) * (102 + bufLv) / 100) - n_A_AGI;
	}
	else if (TimeItemNumSearch(TIME_ITEM_ID_BLUE_RIBBON) > 0) {
		wSPC_DEX = Math.floor((n_A_DEX + wSPC_DEX) * 104 / 100) - n_A_DEX;
		wSPC_AGI = Math.floor((n_A_AGI + wSPC_AGI) * 104 / 100) - n_A_AGI;
	}
	else if (TimeItemNumSearch(4) > 0) {
		wSPC_DEX = Math.floor((n_A_DEX + wSPC_DEX) * 103 / 100) - n_A_DEX;
		wSPC_AGI = Math.floor((n_A_AGI + wSPC_AGI) * 103 / 100) - n_A_AGI;
	}

	//----------------------------------------------------------------
	// これ以降は、集中力向上が乗らない効果
	//----------------------------------------------------------------

	//----------------------------------------------------------------
	// 「ガンスリンガー　インクリージングアキュラシー」の効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_INCREASING_ACCURACY) > 0){
		wSPC_DEX += 4;
		wSPC_AGI += 4;
	}

	//----------------------------------------------------------------
	// 「太陽・月・星の祝福」の、＋効果
	//----------------------------------------------------------------
	const taiyono_shukufuku = Math.max(LearnedSkillSearch(SKILL_ID_TAIYONO_SHUKUFUKU), UsedSkillSearch(SKILL_ID_TAIYONO_SHUKUFUKU));
	const tsukino_shukufuku = Math.max(LearnedSkillSearch(SKILL_ID_TSUKUNO_SHUKUFUKU), UsedSkillSearch(SKILL_ID_TSUKUNO_SHUKUFUKU));
	const hoshino_shukufuku = Math.max(LearnedSkillSearch(SKILL_ID_HOSHINO_SHUKUFUKU), UsedSkillSearch(SKILL_ID_HOSHINO_SHUKUFUKU));
	switch (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI)) {
		case 0:	// 無条件で発動
			wSPC_STR += 2 * taiyono_shukufuku;
			wSPC_VIT += 2 * taiyono_shukufuku;
			wSPC_DEX += 2 * taiyono_shukufuku;
			wSPC_AGI += 2 * tsukino_shukufuku;
			wSPC_INT += 2 * tsukino_shukufuku;
			wSPC_LUK += 2 * tsukino_shukufuku;
			wSPC_STR += 2 * hoshino_shukufuku;
			wSPC_AGI += 2 * hoshino_shukufuku;
			wSPC_VIT += 2 * hoshino_shukufuku;
			wSPC_INT += 2 * hoshino_shukufuku;
			wSPC_DEX += 2 * hoshino_shukufuku;
			wSPC_LUK += 2 * hoshino_shukufuku;
			break;
		case 1:	// 今日の日付で発動
			let today = (new Date()).getDate();
			if (today % 5 == 0 && hoshino_shukufuku > 0) { // 5の倍数 ∧ 星を習得済み
				wSPC_STR += 2 * hoshino_shukufuku;
				wSPC_AGI += 2 * hoshino_shukufuku;
				wSPC_VIT += 2 * hoshino_shukufuku;
				wSPC_INT += 2 * hoshino_shukufuku;
				wSPC_DEX += 2 * hoshino_shukufuku;
				wSPC_LUK += 2 * hoshino_shukufuku;
			} else
			if (today % 2 == 0) {	// ( 5の倍数ではない ∨ 5の倍数だが星を未習得 ) ∧ 偶数
				wSPC_STR += 2 * taiyono_shukufuku;
				wSPC_VIT += 2 * taiyono_shukufuku;
				wSPC_DEX += 2 * taiyono_shukufuku;
			} else
			if (today % 2 == 1) {	// ( 5の倍数ではない ∨ 5の倍数だが星を未習得 ) ∧ 奇数
				wSPC_AGI += 2 * tsukino_shukufuku;
				wSPC_INT += 2 * tsukino_shukufuku;
				wSPC_LUK += 2 * tsukino_shukufuku;
			}
			break;
		case 2:	// 太陽の日
			wSPC_STR += 2 * taiyono_shukufuku;
			wSPC_VIT += 2 * taiyono_shukufuku;
			wSPC_DEX += 2 * taiyono_shukufuku;
			break;
		case 3:	// 月の日
			wSPC_AGI += 2 * tsukino_shukufuku;
			wSPC_INT += 2 * tsukino_shukufuku;
			wSPC_LUK += 2 * tsukino_shukufuku;
			break;
		case 4:	// 星の日
			wSPC_STR += 2 * hoshino_shukufuku;
			wSPC_AGI += 2 * hoshino_shukufuku;
			wSPC_VIT += 2 * hoshino_shukufuku;
			wSPC_INT += 2 * hoshino_shukufuku;
			wSPC_DEX += 2 * hoshino_shukufuku;
			wSPC_LUK += 2 * hoshino_shukufuku;
			break;
	}

	//----------------------------------------------------------------
	// 「宇宙の構え」の、＋効果
	//----------------------------------------------------------------
	wSPC_STR += 5 * UsedSkillSearch(SKILL_ID_UCHUNO_KAMAE);
	wSPC_AGI += 5 * UsedSkillSearch(SKILL_ID_UCHUNO_KAMAE);
	wSPC_VIT += 5 * UsedSkillSearch(SKILL_ID_UCHUNO_KAMAE);
	wSPC_INT += 5 * UsedSkillSearch(SKILL_ID_UCHUNO_KAMAE);
	wSPC_DEX += 5 * UsedSkillSearch(SKILL_ID_UCHUNO_KAMAE);
	wSPC_LUK += 5 * UsedSkillSearch(SKILL_ID_UCHUNO_KAMAE);

	if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(672)) wSPC_AGI += 1;
	if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(673)) wSPC_INT += 1;
	if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(675)) wSPC_LUK += 2;
	if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(676)) wSPC_DEX += 2;
	if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(678)) wSPC_LUK += 1;
	if(n_A_SHOES_DEF_PLUS >= 9 && EquipNumSearch(717)) wSPC_AGI += 2;
	if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1069)) wSPC_LUK += (n_A_HEAD_DEF_PLUS - 4);
	if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1168)) wSPC_INT += (n_A_Weapon_ATKplus - 5);
	if(EquipNumSearch(ITEM_ID_STUFF_OF_ORD) && LearnedSkillSearch(SKILL_ID_DRAGONOLOGY) == 5) wSPC_INT += 3;
	if(EquipNumSearch(1172)) wSPC_INT += Math.floor(n_A_Weapon_ATKplus / 2);
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1273)) wSPC_AGI += 2;
	if(EquipNumSearch(348)) wSPC_STR += Math.floor(n_A_BaseLV / 5) * EquipNumSearch(348);
	if(n_A_BODY_DEF_PLUS >= 2 && EquipNumSearch(1493)) wSPC_AGI += Math.floor(n_A_BODY_DEF_PLUS / 2);
	if(SU_STR >= 60 && EquipNumSearch(1524)){
		wSPC_STR += 2 * EquipNumSearch(1524);
		if(SU_STR >= 80) wSPC_STR += 1 * EquipNumSearch(1524);
	}
	if(SU_AGI >= 60 && EquipNumSearch(1525)){
		wSPC_AGI += 2 * EquipNumSearch(1525);
		if(SU_AGI >= 80) wSPC_AGI += 1 * EquipNumSearch(1525);
	}
	if(SU_VIT >= 60 && EquipNumSearch(1526)){
		wSPC_VIT += 2 * EquipNumSearch(1526);
		if(SU_VIT >= 80) wSPC_VIT += 1 * EquipNumSearch(1526);
	}
	if(SU_DEX >= 60 && EquipNumSearch(1527)){
		wSPC_DEX += 2 * EquipNumSearch(1527);
		if(SU_DEX >= 80) wSPC_DEX += 1 * EquipNumSearch(1527);
	}
	if(SU_INT >= 60 && EquipNumSearch(1528)){
		wSPC_INT += 2 * EquipNumSearch(1528);
		if(SU_INT >= 80) wSPC_INT += 1 * EquipNumSearch(1528);
	}
	if(SU_LUK >= 60 && EquipNumSearch(1529)){
		var w = EquipNumSearch(1529);
		wSPC_LUK += 2 * w;
		if(SU_LUK >= 80){
			wSPC_LUK += w;
			wSPC_DEX += w;
		}
		if(SU_LUK >= 100){
			wSPC_INT += w;
			wSPC_DEX += w;
		}
		if(SU_LUK >= 120){
			wSPC_LUK += w;
			wSPC_DEX += w;
			wSPC_INT += 3 * w;
		}
	}
	if(SU_INT >= 120){
		if(EquipNumSearch(1538) || EquipNumSearch(1545) || EquipNumSearch(1552) || EquipNumSearch(1559)) wSPC_INT += 1;
	}
	if(n_A_SHOES_DEF_PLUS >= 8 && EquipNumSearch(1588)) wSPC_AGI += (n_A_SHOES_DEF_PLUS - 7);
	if(n_A_BaseLV >= 150){
		if(EquipNumSearch(1695)){
			wSPC_STR += 2;
			wSPC_AGI += 2;
			wSPC_VIT += 2;
			wSPC_INT += 2;
			wSPC_DEX += 2;
			wSPC_LUK += 2;
		}
	}
	if(EquipNumSearch(1695)) if(GetLowerJobSeriesID(n_A_JOB)==4) wSPC_DEX += 3;
	if(EquipNumSearch(1743)) wSPC_LUK += n_A_BODY_DEF_PLUS;
	if(n_A_Equip[EQUIP_REGION_ID_ARMS]==1078 || n_A_Equip[EQUIP_REGION_ID_ARMS]==1079){
		wSPC_INT += (n_A_Weapon_ATKplus -5);
		if(n_A_Equip[EQUIP_REGION_ID_ARMS]==1078){
			if(n_A_Weapon_ATKplus >= 7) wSPC_INT += 2;
			if(n_A_Weapon_ATKplus >= 9) wSPC_INT += 3;
		}
		if(n_A_Equip[EQUIP_REGION_ID_ARMS]==1079){
			if(n_A_Weapon_ATKplus >= 7) wSPC_INT += 2;
			if(n_A_Weapon_ATKplus >= 9) wSPC_INT += 5;
			if(n_A_Weapon_ATKplus >= 10) wSPC_INT += 3;
		}
	}
	if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]==1078 || n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]==1079){
		wSPC_INT += (n_A_Weapon2_ATKplus -5);
		if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]==1078){
			if(n_A_Weapon2_ATKplus >= 7) wSPC_INT += 2;
			if(n_A_Weapon2_ATKplus >= 9) wSPC_INT += 3;
		}
		if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]==1079){
			if(n_A_Weapon2_ATKplus >= 7) wSPC_INT += 2;
			if(n_A_Weapon2_ATKplus >= 9) wSPC_INT += 5;
			if(n_A_Weapon2_ATKplus >= 10) wSPC_INT += 3;
		}
	}
	if(EquipNumSearch(1766)){
		if(n_A_Weapon_ATKplus >= 1 && n_A_Equip[EQUIP_REGION_ID_ARMS]==1766){
			wSPC_INT += n_A_Weapon_ATKplus;
			wSPC_LUK += n_A_Weapon_ATKplus;
		}
		if(n_A_Weapon2_ATKplus >= 1 && n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]==1766){
			wSPC_INT += n_A_Weapon2_ATKplus;
			wSPC_LUK += n_A_Weapon2_ATKplus;
		}
	}
	if(n_A_SHOULDER_DEF_PLUS >= 6 && EquipNumSearch(1767)) wSPC_AGI += 2 * (n_A_SHOULDER_DEF_PLUS - 5);
	if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(1768)) wSPC_INT += n_A_SHOES_DEF_PLUS - 5;

	// 技巧の時空ブーツ
	if(n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(1921)) {
		wSPC_DEX += 3 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
	}
	if(n_A_SHOES_DEF_PLUS >= 3 && EquipNumSearch(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)) {
		wSPC_DEX += 3 * ROUNDDOWN(n_A_SHOES_DEF_PLUS / 3);
	}

	if(n_A_BODY_DEF_PLUS >= 3 && EquipNumSearch(1992)) wSPC_AGI += ROUNDDOWN(n_A_BODY_DEF_PLUS / 3);
	if(EquipNumSearch(2237)){
		wSPC_VIT += n_A_BODY_DEF_PLUS;
		if(EquipNumSearch(2239)) wSPC_VIT += 5 * n_A_BODY_DEF_PLUS;
	}
	if(EquipNumSearch(2332)){
		if(n_A_BaseLV <= 99) wSPC_DEX += ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
		else wSPC_DEX += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(2334)){
		if(n_A_BaseLV <= 99) wSPC_STR += ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
		else wSPC_STR += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(2338)){
		if(n_A_BaseLV <= 99) wSPC_INT += ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
		else wSPC_INT += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(2365)){
		var tx = ROUNDDOWN(n_A_BODY_DEF_PLUS / 2);
		if(SU_STR >= 90) wSPC_STR += tx;
		if(SU_AGI >= 90) wSPC_AGI += tx;
		if(SU_VIT >= 90) wSPC_VIT += tx;
		if(SU_INT >= 90) wSPC_INT += tx;
		if(SU_DEX >= 90) wSPC_DEX += tx;
		if(SU_LUK >= 90) wSPC_LUK += tx;
	}
	if(EquipNumSearch(2443)){
		var w2443 = 3 * n_A_SHOES_DEF_PLUS;
		wSPC_STR += w2443;
		wSPC_AGI += w2443;
		wSPC_VIT += w2443;
		wSPC_INT += w2443;
		wSPC_DEX += w2443;
		wSPC_LUK += w2443;
	}
	if(CardNumSearch(855)){
		if(n_A_SHOES_DEF_PLUS >= 9 && EquipNumSearch(2451)) wSPC_STR += 8;
		if(n_A_SHOULDER_DEF_PLUS >= 9 && EquipNumSearch(2452)) wSPC_AGI += 8;
		if(n_A_SHOULDER_DEF_PLUS >= 9 && EquipNumSearch(2453)) wSPC_DEX += 10;
		if(n_A_SHIELD_DEF_PLUS >= 9 && EquipNumSearch(2454)) wSPC_LUK += 10;
		if(n_A_BODY_DEF_PLUS >= 9 && EquipNumSearch(2455)) wSPC_VIT += 8;
	}
	if(n_A_BaseLV >= 130 && EquipNumSearch(2463)) wSPC_VIT += 4;
	if(EquipNumSearch(1808)){
		wSPC_STR += 10;
		wSPC_AGI += 10;
		wSPC_VIT += 10;
		wSPC_INT += 10;
		wSPC_DEX += 10;
		wSPC_LUK += 10;
	}
	if(EquipNumSearch(649)) wSPC_DEX -= SU_DEX;
	if(n_A_WeaponType==9) wSPC_INT += CardNumSearch(466);

	if(GetLowerJobSeriesID(n_A_JOB)==3) wSPC_INT += CardNumSearch(383);
	if(CardNumSearch(173))wSPC_INT += n_A_SHIELD_DEF_PLUS;
	if(CardNumSearch(402))wSPC_LUK += n_A_SHOULDER_DEF_PLUS;
	if(CardNumSearch(406))wSPC_AGI += n_A_SHOES_DEF_PLUS;
	if(CardNumSearch(198))wSPC_VIT += n_A_BODY_DEF_PLUS;
	if(n_A_card[CARD_REGION_ID_HEAD_TOP] == 180)wSPC_STR += n_A_HEAD_DEF_PLUS;
	if(CardNumSearch(185))wSPC_VIT += Math.floor(SU_DEX /18);
	if(CardNumSearch(187))wSPC_STR += Math.floor(SU_INT /18);
	if(CardNumSearch(189))wSPC_LUK += Math.floor(SU_AGI /18);
	if(CardNumSearch(191))wSPC_AGI += Math.floor(SU_LUK /18);
	if(CardNumSearch(196))wSPC_INT += Math.floor(SU_STR /18);
	if(CardNumSearch(197))wSPC_DEX += Math.floor(SU_VIT /18);
	if(CardNumSearch(405)){
		if(GetLowerJobSeriesID(n_A_JOB)==1 || GetLowerJobSeriesID(n_A_JOB)==2 || GetLowerJobSeriesID(n_A_JOB)==6){
			wSPC_STR += 2;
			if(EquipNumSearch(2058)) wSPC_STR += 2;
		}
		if(GetLowerJobSeriesID(n_A_JOB)==3 || GetLowerJobSeriesID(n_A_JOB)==4 || GetLowerJobSeriesID(n_A_JOB)==5){
			wSPC_INT += 2;
			if(EquipNumSearch(2058)) wSPC_INT += 2;
		}
	}
	if(GetLowerJobSeriesID(n_A_JOB)==5 && n_A_card[CARD_REGION_ID_HEAD_TOP]==621) wSPC_INT += Math.floor(n_A_HEAD_DEF_PLUS / 3);
	if(GetLowerJobSeriesID(n_A_JOB)==4 && n_A_card[CARD_REGION_ID_HEAD_TOP]==622) wSPC_DEX += Math.floor(n_A_HEAD_DEF_PLUS / 3);
	if(GetLowerJobSeriesID(n_A_JOB)==1 && n_A_card[CARD_REGION_ID_HEAD_TOP]==625) wSPC_STR += Math.floor(n_A_HEAD_DEF_PLUS / 3);
	if(GetLowerJobSeriesID(n_A_JOB)==6 && n_A_card[CARD_REGION_ID_HEAD_TOP]==637) wSPC_LUK += Math.floor(n_A_HEAD_DEF_PLUS / 3);

	if(EquipNumSearch(2348)) wSPC_INT += Math.floor(n_A_BaseLV / 20);
	if(EquipNumSearch(2350)) wSPC_STR += Math.floor(n_A_BaseLV / 20);
	if(EquipNumSearch(2352)) wSPC_AGI += Math.floor(n_A_BaseLV / 20);
	if(EquipNumSearch(2354)) wSPC_DEX += Math.floor(n_A_BaseLV / 20);
	if(EquipNumSearch(2430)){
		wSPC_DEX += n_A_Weapon_ATKplus;
		wSPC_INT += n_A_Weapon_ATKplus;
	}
	if(EquipNumSearch(ITEM_ID_RUNE_HELM)){
		if(n_A_BaseLV <= 99) wSPC_VIT += ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
		else wSPC_VIT += n_A_HEAD_DEF_PLUS;
	}

	if (UsedSkillSearch(SKILL_ID_GIANT_GROWTH) > 0) {
		if (EquipNumSearch(ITEM_ID_RUNE_HELM) > 0) {
			wSPC_STR += 30;
			wSPC_INT -= 30;
		}
		else if (EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET) > 0) {
			wSPC_STR += 30;
			wSPC_INT -= 30;
		}
		else if (EquipNumSearch(ITEM_ID_TENBINKYUNO_DIADEM) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				wSPC_STR += 30;
				wSPC_INT -= 30;
			}
		}
		else if (EquipNumSearch(ITEM_ID_FAFNIR_HELM) > 0) {
			wSPC_STR += 30;
			wSPC_INT -= 30;
		}
	}

	if(EquipNumSearch(2543)) wSPC_VIT += n_A_SHOES_DEF_PLUS;

	/* TODO */
	// 独自実装箇所　ここから

	//----------------------------------------------------------------
	// 「ヴァルキリーハンマー」の、職業による強化
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			wSPC_VIT += 1 * n_A_Weapon_ATKplus;
			break;

		// ソードマン系
		case JOB_SERIES_ID_SWORDMAN:
			wSPC_VIT += 1 * n_A_Weapon_ATKplus;
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
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「古びたバレリーナの髪飾り」の、精錬による強化
	// 「古びたミンストレルソングの帽子」の、精錬による強化
	//----------------------------------------------------------------
	if(EquipNumSearch(ITEM_ID_FURUBITA_BALLERINA)
		|| EquipNumSearch(ITEM_ID_FURUBITA_MINSTRELSONG)) {
		wSPC_STR += n_A_HEAD_DEF_PLUS;
		wSPC_AGI += n_A_HEAD_DEF_PLUS;
		wSPC_VIT += n_A_HEAD_DEF_PLUS;
		wSPC_DEX += n_A_HEAD_DEF_PLUS;
		wSPC_INT += n_A_HEAD_DEF_PLUS;
		wSPC_LUK += n_A_HEAD_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「古びたシャドウクラウン」の、精錬による強化
	//----------------------------------------------------------------
	if(EquipNumSearch(ITEM_ID_FURUBITA_SHADOWCROWN)) {
		wSPC_DEX += 2 * n_A_HEAD_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、スキル習得による強化
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_ID_EMERALDEARRING)) {
		var wEMERALDEARRING = ROUNDDOWN(LearnedSkillSearch(SKILL_ID_LESSON) / 2) * EquipNumSearch(ITEM_ID_EMERALDEARRING);
		wSPC_AGI += wEMERALDEARRING;
		wSPC_INT += wEMERALDEARRING;
		wSPC_DEX += wEMERALDEARRING;
	}

	//----------------------------------------------------------------
	// 「セリーヌ・キミカード　ノーブルセット」の、精錬による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_SET_ID_CELINE_KIMI_NOBLE_CROSS)) {
		wSPC_LUK += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーナイフ」の、職業による強化
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			wSPC_INT += 2 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
			wSPC_DEX += 2 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
			wSPC_DEX -= ROUNDDOWN(SU_DEX / 10) * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
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
				wSPC_INT += 2 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
				wSPC_DEX += 2 * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
				break;

			// バード系、ダンサー系
			case JOB_SERIES_ID_BARD:
			case JOB_SERIES_ID_DANCER:
				wSPC_DEX -= ROUNDDOWN(SU_DEX / 10) * n_A_Weapon_ATKplus * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンユニット」の、精錬による効果
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_ID_GUARDIAN_UNIT)) {
		wSPC_VIT += 1 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「サバイバルオーブ　サークレットセット」の、装備効果
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET)) {
		if (n_A_HEAD_DEF_PLUS >= 7) wSPC_VIT += 4;
		if (n_A_HEAD_DEF_PLUS >= 9) wSPC_VIT += 4;
	}

	//----------------------------------------------------------------
	// 「サファイアリスト」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SAPPHIRE_LIST)) > 0) {
		var upCount = Math.floor(LearnedSkillSearch(SKILL_ID_SLIMPOTION_PITCHER) / 2);
		wSPC_INT += 1 * upCount * itemCount;
		wSPC_DEX += 1 * upCount * itemCount;
		wSPC_LUK += 1 * upCount * itemCount;
	}

	//----------------------------------------------------------------
	// 「[ECO] モーモー・アルマカード」の、精錬による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_ECO_MOMO_ARMA)) {
		wSPC_VIT += 1 * n_A_SHOES_DEF_PLUS;
		wSPC_INT += 1 * n_A_SHOES_DEF_PLUS;

		if (n_A_SHOES_DEF_PLUS >= 9) {
			wSPC_VIT += 5;
			wSPC_INT += 5;
		}
	}

	//----------------------------------------------------------------
	// 「エナジー＜致命ノ一撃＞」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI)) > 0) {
		wSPC_LUK += 3 * n_A_SHOULDER_DEF_PLUS * cardCount;
	}

	//----------------------------------------------------------------
	// 「盗賊のすすめ第一巻」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_GRAPHITY) >= 1) {
			wSPC_STR += 5 * itemCount;
			wSPC_AGI += 5 * itemCount;
			wSPC_INT += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「時魔術師のローブ」の、追加発動による効果
	//----------------------------------------------------------------
	if ((bufLv = TimeItemNumSearch(114)) > 0) {
		wSPC_INT += 3 * n_A_BODY_DEF_PLUS * bufLv;
	}

	//----------------------------------------------------------------
	// 「超越者のローブ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHOETSUSHANO_ROBE)) > 0) {
		wSPC_INT += 3 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「栄光の証」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EIKONO_AKASHI)) > 0) {
		if (n_A_BaseLV >= 150) {
			wSPC_STR += 1 * itemCount;
			wSPC_AGI += 1 * itemCount;
			wSPC_VIT += 1 * itemCount;
			wSPC_INT += 1 * itemCount;
			wSPC_DEX += 1 * itemCount;
			wSPC_LUK += 1 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エンチャント　血のニーヴ(腕力)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
		wSPC_STR += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

	//----------------------------------------------------------------
	// 「エンチャント　血のニーヴ(迅速)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
		wSPC_AGI += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

	//----------------------------------------------------------------
	// 「エンチャント　血のニーヴ(体力)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
		wSPC_VIT += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

	//----------------------------------------------------------------
	// 「エンチャント　血のニーヴ(知力)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
		wSPC_INT += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

	//----------------------------------------------------------------
	// 「エンチャント　血のニーヴ(集中)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
		wSPC_DEX += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

	//----------------------------------------------------------------
	// 「エンチャント　血のニーヴ(幸運)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2;
		wSPC_LUK += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

	//----------------------------------------------------------------
	// 「ルーンナイトセイレン(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_RUNE_KNIGHT_SEIREN_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ルーンナイトセイレン(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_RUNE_KNIGHT_SEIREN_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ウォーロックカトリーヌ(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WARLOCK_CATHERINE_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ウォーロックカトリーヌ(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WARLOCK_CATHERINE_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「レンジャーセシル(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_RANGER_CECIL_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「レンジャーセシル(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_RANGER_CECIL_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「アークビショップマーガレッタ(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「アークビショップマーガレッタ(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ギロチンクロスエレメス(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ギロチンクロスエレメス(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「メカニックハワード(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MECHANIC_HAWARD_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「メカニックハワード(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MECHANIC_HAWARD_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ロイヤルガードランデル(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ROYAL_GUARD_RANDEL_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ロイヤルガードランデル(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ROYAL_GUARD_RANDEL_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ソーサラーセリア(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SORCERER_CERIA_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ソーサラーセリア(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SORCERER_CERIA_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミンストレルバジル(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MINSTREL_ARFOSIO_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミンストレルバジル(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MINSTREL_ARFOSIO_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ワンダラートレンティーニ(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WANDERER_TRENTINI_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ワンダラートレンティーニ(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WANDERER_TRENTINI_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「修羅チェン(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SHURA_CHENG_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「修羅チェン(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SHURA_CHENG_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「シャドウチェイサーガーティ(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SHADOW_CHASER_GARTY_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「シャドウチェイサーガーティ(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SHADOW_CHASER_GARTY_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジェネティックエミュール(MVP)カード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GENETIC_EMUR_MVP)) > 0) {
		if (n_A_BaseLV >= 165) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジェネティックエミュール(MVP)カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GENETIC_EMUR_MVP)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			wSPC_STR += 10 * cardCount;
			wSPC_AGI += 10 * cardCount;
			wSPC_VIT += 10 * cardCount;
			wSPC_INT += 10 * cardCount;
			wSPC_DEX += 10 * cardCount;
			wSPC_LUK += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「セリーヌのブローチ　リボンセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON)) > 0) {
		wSPC_STR += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_AGI += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_VIT += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_INT += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_DEX += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_LUK += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「セリーヌのブローチ　瑞々しいバラセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA)) > 0) {
		wSPC_STR += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_AGI += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_VIT += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_INT += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_DEX += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		wSPC_LUK += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の、職業による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_GOKU)) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
			wSPC_STR += 10;
			wSPC_AGI += 10;
			wSPC_VIT += 10;
			wSPC_INT += 10;
			wSPC_DEX += 10;
			wSPC_LUK += 10;
		}
	}

	//----------------------------------------------------------------
	// 「ローラのプレートメイル」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LOLANO_PLATEMAIL)) > 0) {
		wSPC_VIT += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「タウロス」の、精錬による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_TAUROS)) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_GENETIC)) {
			wSPC_VIT += 1 * n_A_HEAD_DEF_PLUS;
			wSPC_INT += 1 * n_A_HEAD_DEF_PLUS;
		}
	}

	//----------------------------------------------------------------
	// 「禁忌の魔導書」の、スキル習得による強化
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_ID_KINKINO_MADOSHO)) {
		wSPC_INT += 3 * LearnedSkillSearch(SKILL_ID_SUMMON_AGNI);
		wSPC_DEX += 3 * LearnedSkillSearch(SKILL_ID_SUMMON_AQUA);
		wSPC_AGI += 3 * LearnedSkillSearch(SKILL_ID_SUMMON_VENTOS);
		wSPC_VIT += 3 * LearnedSkillSearch(SKILL_ID_SUMMON_TERA);
	}

	//----------------------------------------------------------------
	// 「エーギルリング　ヘルムセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_HELM)) > 0) {
		if (n_A_HEAD_DEF_PLUS >= 7) {
			wSPC_STR += 5 * itemCount;
			wSPC_AGI += 5 * itemCount;
			wSPC_VIT += 5 * itemCount;
			wSPC_INT += 5 * itemCount;
			wSPC_DEX += 5 * itemCount;
			wSPC_LUK += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「天邪鬼の鬼面」の、素ステータスよる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
		wSPC_INT += 3 * ROUNDDOWN(SU_STR / 18) * itemCount;
		wSPC_LUK += 3 * ROUNDDOWN(SU_AGI / 18) * itemCount;
		wSPC_DEX += 3 * ROUNDDOWN(SU_VIT / 18) * itemCount;
		wSPC_STR += 3 * ROUNDDOWN(SU_INT / 18) * itemCount;
		wSPC_VIT += 3 * ROUNDDOWN(SU_DEX / 18) * itemCount;
		wSPC_AGI += 3 * ROUNDDOWN(SU_LUK / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「鉱員のつるはし」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KOINNO_TSURUHASHI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KOINNO_TSURUHASHI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		wSPC_VIT += 1 * n_A_Weapon_ATKplus *  itemCountRight;
		wSPC_VIT += 1 * n_A_Weapon2_ATKplus *  itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「自警団の弓」の、素ＩＮＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZIKEIDANNO_YUMI)) > 0) {
		wSPC_AGI += 1 * ROUNDDOWN(SU_INT / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「大自然のギター」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		wSPC_VIT += 1 * n_A_Weapon_ATKplus *  itemCountRight;
		wSPC_VIT += 1 * n_A_Weapon2_ATKplus *  itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「大自然のロープ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		wSPC_VIT += 1 * n_A_Weapon_ATKplus *  itemCountRight;
		wSPC_VIT += 1 * n_A_Weapon2_ATKplus *  itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「名も無き剣士のブーツ　イグニゼム＝セニア（ＭＶＰ）カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_IGNISEM_CENIA_MVP)) > 0) {
		if (n_A_BaseLV <= 99) {
			wSPC_STR += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		}
		else {
			wSPC_STR += 10 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エメラルドリング」の、スキル習得による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
		wSPC_AGI += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_DOUBLE_STRAFING) / 2) * itemCount;
		wSPC_VIT += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_DOUBLE_STRAFING) / 2) * itemCount;
		wSPC_DEX += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_DOUBLE_STRAFING) / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「古代龍の宝冠」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KODAIRYUNO_HOKAN)) > 0) {
		if (n_A_HEAD_DEF_PLUS >= 10) {
			wSPC_INT += 1 * ROUNDDOWN((SU_INT + SU_DEX) / 10) * itemCount;
			wSPC_DEX += 1 * ROUNDDOWN((SU_INT + SU_DEX) / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「おもちゃの指輪」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_OMOCHANO_YUBIWA)) > 0) {
		wSPC_STR += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		wSPC_STR += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC) / 2) * itemCount;
		wSPC_AGI += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		wSPC_AGI += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC) / 2) * itemCount;
		wSPC_VIT += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		wSPC_VIT += 1 * ROUNDDOWN(LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC) / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「精巧な猫じゃらしの模型」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		wSPC_DEX += 1 * n_A_Weapon_ATKplus * itemCountRight;
		wSPC_DEX += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「トンボがとまった魔力の猫じゃらし」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_MARYOKUNO_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		wSPC_INT += 1 * n_A_Weapon_ATKplus * itemCountRight;
		wSPC_INT += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ビッグエッグリングカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_BIG_EGGRING, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		wSPC_STR += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		wSPC_AGI += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		wSPC_VIT += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		wSPC_INT += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		wSPC_DEX += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		wSPC_LUK += 1 * n_A_HEAD_DEF_PLUS * cardCount;
	}

	//----------------------------------------------------------------
	// 「パワードチップ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_CHIP)) > 0) {
		if ((sklLv = LearnedSkillSearch(SKILL_ID_PILE_BUNKER)) >= 3) {
			wSPC_STR += 5 * itemCount;
			wSPC_VIT += 5 * itemCount;
			wSPC_DEX += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不死の軍団認識票　ひまわり少年セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN)) > 0) {
		wSPC_INT += 2 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンスタッフオブオルド」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_STUFF_OF_OLDE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DRAGONOLOGY) >= 5) {
			wSPC_INT += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「トラベラーシューズ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_SHOES)) > 0) {
		wSPC_STR += 1 * LearnedSkillSearch(SKILL_ID_SWING_DANCE) * itemCount;
		wSPC_AGI += 1 * LearnedSkillSearch(SKILL_ID_SWING_DANCE) * itemCount;
		wSPC_VIT += 1 * LearnedSkillSearch(SKILL_ID_SWING_DANCE) * itemCount;
		wSPC_INT += 1 * LearnedSkillSearch(SKILL_ID_SWING_DANCE) * itemCount;
		wSPC_DEX += 1 * LearnedSkillSearch(SKILL_ID_SWING_DANCE) * itemCount;
		wSPC_LUK += 1 * LearnedSkillSearch(SKILL_ID_SWING_DANCE) * itemCount;
	}

	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のトレードメイルセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_TRADE_MAIL)) > 0) {
		wSPC_STR += 2 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_AGI += 2 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_VIT += 2 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_INT += 2 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_DEX += 2 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_LUK += 2 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「パイシーズ」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_PISCES, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		if (IsSameJobClass(JOB_ID_SORCERER)) {
			wSPC_INT += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「星の眼帯　オークヒーローカードセット」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHINO_GANTAI_ORC_HERO_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			wSPC_VIT += 1 * Math.floor(SU_LUK / 10) * itemCount;
			wSPC_LUK += 1 * Math.floor(SU_LUK / 10) * itemCount;
		}
		else {
			wSPC_VIT += 3 * Math.floor(SU_LUK / 10) * itemCount;
			wSPC_LUK += 3 * Math.floor(SU_LUK / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「血塗られた人形のドレス　セリーヌのリボンセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON)) > 0) {
		wSPC_STR += 1 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_AGI += 1 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_VIT += 1 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_INT += 1 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_DEX += 1 * n_A_BODY_DEF_PLUS * itemCount;
		wSPC_LUK += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの兜」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO)) > 0) {
		if (n_A_BaseLV >= 170) {
			wSPC_VIT += 3 * n_A_HEAD_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの鎧」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI)) > 0) {
		if (n_A_BaseLV >= 170) {
			wSPC_VIT += 3 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの肩飾り」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI)) > 0) {
		if (n_A_BaseLV >= 170) {
			wSPC_VIT += 3 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの軍靴」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA)) > 0) {
		if (n_A_BaseLV >= 170) {
			wSPC_VIT += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「シールドリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIELD_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DEBOTION) >= 5) {
			wSPC_STR += 5 * itemCount;
			wSPC_INT += 5 * itemCount;
			wSPC_DEX += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「盗賊のすすめ第二巻」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOZOKUNO_SUSUME_DAINIKAN)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_GRAPHITY) >= 1) {
			wSPC_VIT += 5 * itemCount;
			wSPC_DEX += 5 * itemCount;
			wSPC_LUK += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　自警団の弓セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			wSPC_AGI += 6 * ROUNDDOWN(SU_INT / 40) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングシューズ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_SHOES)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_ELECTRIC_SHOCKER) >= 5) {
			wSPC_STR += 10 * itemCount;
			wSPC_AGI += 10 * itemCount;
			wSPC_VIT += 10 * itemCount;
			wSPC_INT += 10 * itemCount;
			wSPC_DEX += 10 * itemCount;
			wSPC_LUK += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イルシオンスーツI」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_SUIT_1)) > 0) {
		if (n_A_BaseLV >= 170) {
			wSPC_AGI += 2 * itemCount;
			wSPC_VIT += 2 * itemCount;
			wSPC_LUK += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イルシオンスーツII」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_SUIT_2)) > 0) {
		if (n_A_BaseLV >= 170) {
			wSPC_STR += 2 * itemCount;
			wSPC_INT += 2 * itemCount;
			wSPC_DEX += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ダークリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DARK_RING)) > 0) {
		wSPC_STR += 1 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * itemCount;
		wSPC_AGI += 1 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * itemCount;
		wSPC_DEX += 1 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * itemCount;
	}

	//----------------------------------------------------------------
	// 「覚醒火雷大神靴　月夜花カード　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			wSPC_INT += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		} else {
			wSPC_INT += 10 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ルーングリーブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RUNE_GREEVE)) > 0) {
		wSPC_STR += 3 * Math.floor((LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) + LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH)) / 2) * itemCount;
		wSPC_AGI += 3 * Math.floor((LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) + LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH)) / 2) * itemCount;
		wSPC_VIT += 3 * Math.floor((LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) + LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH)) / 2) * itemCount;
		wSPC_INT += 3 * Math.floor((LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) + LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH)) / 2) * itemCount;
		wSPC_DEX += 3 * Math.floor((LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) + LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH)) / 2) * itemCount;
		wSPC_LUK += 3 * Math.floor((LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) + LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH)) / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルガトリングスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GATLING_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_ETERNAL_CHAIN) >= 10) {
			wSPC_DEX += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースガトリングスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_GATLING_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_ETERNAL_CHAIN) >= 10) {
			wSPC_DEX += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンナイツアーチャーボウ」の、スキル習得による効果
	//----------------------------------------------------------------
	itemCount = Math.max(
		EquipNumSearchMIG(ITEM_ID_GUARDIAN_KNIGHTS_ARCHER_BOW),
		EquipNumSearchMIG(ITEM_ID_GUARDIAN_KNIGHTS_ARCHER_BOW_T1)
		);
	if (itemCount > 0) {
		if (n_A_Weapon_ATKplus >= 9) {
			wSPC_INT += 3 * LearnedSkillSearch(SKILL_ID_TRAP_KENKYU) * itemCount;
			wSPC_DEX += 3 * LearnedSkillSearch(SKILL_ID_TRAP_KENKYU) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「辰戌の腕輪」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_TATSUINUNO_UDEWA)) > 0) {
		wSPC_AGI += 4 * LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルメナススーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MENUS_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FAINT_BOMB) >= 10) {
			wSPC_DEX += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースメナススーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MENUS_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FAINT_BOMB) >= 10) {
			wSPC_DEX += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「覚醒深淵の王の指輪　古王グローザ　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_KOO_GLOZA)) > 0) {
		if (EquipNumSearch(ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_KOO_GLOZA_OWASHINO_GANKO) == 0) {
			wSPC_STR += 10 * n_A_SHOES_DEF_PLUS * itemCount;
			wSPC_VIT += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「剛勇無双の神輿　剛勇無双の貫　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_TSURANUKI)) > 0) {


		wSPC_STR += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
		wSPC_AGI += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
		wSPC_VIT += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
		wSPC_INT += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
		wSPC_DEX += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
		wSPC_LUK += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;

		// 移行チェック用の処理
		n_tok[ITEM_SP_ALLSTATUS_PLUS_FOR_SET] += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルレインストームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_RAINSTORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SEVERE_RAINSTORM) >= 5) {
			wSPC_DEX += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースレインストームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_RAINSTORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SEVERE_RAINSTORM) >= 5) {
			wSPC_DEX += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルスカルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_SCULL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) >= 5) {
			wSPC_INT += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレーススカルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_SCULL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) >= 5) {
			wSPC_INT += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「もふもふラブリーフォックス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MOFUMOFU_LOVELY_FOX)) > 0) {
		wSPC_VIT += 5 * LearnedSkillSearch(SKILL_ID_KEIKAI) * itemCount;
	}

	//----------------------------------------------------------------
	// 「星の眼帯　封印されたオークヒーローカードセット」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHINO_GANTAI_FUINSARETA_ORC_HERO_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			wSPC_VIT += 1 * Math.floor(SU_LUK / 20) * itemCount;
			wSPC_LUK += 1 * Math.floor(SU_LUK / 20) * itemCount;
		}
		else {
			wSPC_VIT += 1 * Math.floor(SU_LUK / 10) * itemCount;
			wSPC_LUK += 1 * Math.floor(SU_LUK / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「名も無き剣士のブーツ　封印されたイグニゼム＝セニア（ＭＶＰ）カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_FUINSARETA_IGNISEM_CENIA_MVP)) > 0) {
		if (n_A_BaseLV <= 99) {
			wSPC_STR += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		}
		else {
			wSPC_STR += 4 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ダークトライアド」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DARK_TRIAD)) > 0) {
		wSPC_AGI += 10 * LearnedSkillSearch(SKILL_ID_MAELSTORM) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ぽかぽかタンポポケープ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POKAPOKA_TANPOPO_CAPE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
			vartmp = 0;
			vartmp += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
			vartmp += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
			vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
			vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
			vartmp += LearnedSkillSearch(SKILL_ID_CHATTERING);
			vartmp += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
			vartmp += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

			wSPC_INT += 1 * vartmp * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　双児宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MANT)) {
		if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
			wSPC_INT += 2 * n_A_SHOULDER_DEF_PLUS;
			wSPC_DEX += 2 * n_A_SHOULDER_DEF_PLUS;
		}
	}

	//----------------------------------------------------------------
	// 「異境の統轄者　黒蛇王カード」セットの、ジョブレベルによる効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_KOKUDAO)) {
		wSPC_INT += 1 * Math.floor(n_A_JobLV / 3);
	}

	//----------------------------------------------------------------
	// 「楯無の鎧　封印されたRSX-0806カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TATENASHINO_YOROI_FUINSARETA_RSX_0806)) > 0) {
		wSPC_VIT += 2 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「アプローズサンダル　封印されたアモンラーカードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_APPLAUSE_SANDAL_FUINSARETA_AMON_RA)) > 0) {
		wSPC_STR += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		wSPC_AGI += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		wSPC_VIT += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		wSPC_INT += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		wSPC_DEX += 1 * n_A_SHOES_DEF_PLUS * itemCount;
		wSPC_LUK += 1 * n_A_SHOES_DEF_PLUS * itemCount;

		// 移行チェック用の処理
		n_tok[ITEM_SP_ALLSTATUS_PLUS_FOR_SET] += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「異境の統轄者　封印された黒蛇王カード」セットの、ジョブレベルによる効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_KOKUDAO)) {
		wSPC_INT += 1 * Math.floor(n_A_JobLV / 10);
	}

	//----------------------------------------------------------------
	// 「フォー・オブ・ア・カインド」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FOUR_OF_A_KIND)) > 0) {
		wSPC_INT += 10 * LearnedSkillSearch(SKILL_ID_RADIUS) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ディア・デ・ムエルトス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
		wSPC_INT += 5 * LearnedSkillSearch(SKILL_ID_SOUL_ENERGY_KENKYU) * itemCount;
	}

	//----------------------------------------------------------------
	// 「トランセンデンスリング」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TRANSCENDENCE_RING)) > 0) {
		if (n_A_BaseLV >= 200) {
			wSPC_STR += 15 * itemCount;
			wSPC_AGI += 15 * itemCount;
			wSPC_VIT += 15 * itemCount;
			wSPC_INT += 15 * itemCount;
			wSPC_DEX += 15 * itemCount;
			wSPC_LUK += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ラウドパーク」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LOUD_PARK)) > 0) {
		wSPC_INT += 6 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
	}

	//----------------------------------------------------------------
	// 「フィフスエレメント」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT)) > 0) {
		vartmp = 0;
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_AGNI);
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_AQUA);
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_VENTOS);
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_TERA);

		wSPC_INT += 5 * vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「マジックコンプレッション」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MAGIC_COMPRESSION)) > 0) {
		wSPC_INT += 5 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
	}

	//----------------------------------------------------------------
	// 「アメイジング・グレイス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AMAZING_GRACE)) > 0) {
		wSPC_INT += 3 * LearnedSkillSearch(SKILL_ID_ORATIO) * itemCount;
	}

	//----------------------------------------------------------------
	// 集中力向上が乗らない効果（セット装備等）
	//----------------------------------------------------------------
	wSPCall = GetEquippedTotalSPEquip(7) - GetEquippedTotalSPEquipExact(7);
	wSPC_STR += GetEquippedTotalSPEquip(1) - GetEquippedTotalSPEquipExact(1) + wSPCall;
	wSPC_AGI += GetEquippedTotalSPEquip(2) - GetEquippedTotalSPEquipExact(2) + wSPCall;
	wSPC_VIT += GetEquippedTotalSPEquip(3) - GetEquippedTotalSPEquipExact(3) + wSPCall;
	wSPC_INT += GetEquippedTotalSPEquip(4) - GetEquippedTotalSPEquipExact(4) + wSPCall;
	wSPC_DEX += GetEquippedTotalSPEquip(5) - GetEquippedTotalSPEquipExact(5) + wSPCall;
	wSPC_LUK += GetEquippedTotalSPEquip(6) - GetEquippedTotalSPEquipExact(6) + wSPCall;

	var wSPCall2 = GetEquippedTotalSPEquip(ITEM_SP_ALLSTATUS_PLUS_FOR_SET);
	wSPC_STR += GetEquippedTotalSPEquip(ITEM_SP_STR_PLUS_FOR_SET) + wSPCall2;
	wSPC_AGI += GetEquippedTotalSPEquip(ITEM_SP_AGI_PLUS_FOR_SET) + wSPCall2;
	wSPC_VIT += GetEquippedTotalSPEquip(ITEM_SP_VIT_PLUS_FOR_SET) + wSPCall2;
	wSPC_INT += GetEquippedTotalSPEquip(ITEM_SP_INT_PLUS_FOR_SET) + wSPCall2;
	wSPC_DEX += GetEquippedTotalSPEquip(ITEM_SP_DEX_PLUS_FOR_SET) + wSPCall2;
	wSPC_LUK += GetEquippedTotalSPEquip(ITEM_SP_LUK_PLUS_FOR_SET) + wSPCall2;

	wSPCall = GetEquippedTotalSPCardAndElse(7);
	wSPC_STR += GetEquippedTotalSPCardAndElse(1) + wSPCall;
	wSPC_AGI += GetEquippedTotalSPCardAndElse(2) + wSPCall;
	wSPC_VIT += GetEquippedTotalSPCardAndElse(3) + wSPCall;
	wSPC_INT += GetEquippedTotalSPCardAndElse(4) + wSPCall;
	wSPC_DEX += GetEquippedTotalSPCardAndElse(5) + wSPCall;
	wSPC_LUK += GetEquippedTotalSPCardAndElse(6) + wSPCall;

	wSPCall2 = GetEquippedTotalSPCardAndElse(ITEM_SP_ALLSTATUS_PLUS_FOR_SET);
	wSPC_STR += GetEquippedTotalSPCardAndElse(ITEM_SP_STR_PLUS_FOR_SET) + wSPCall2;
	wSPC_AGI += GetEquippedTotalSPCardAndElse(ITEM_SP_AGI_PLUS_FOR_SET) + wSPCall2;
	wSPC_VIT += GetEquippedTotalSPCardAndElse(ITEM_SP_VIT_PLUS_FOR_SET) + wSPCall2;
	wSPC_INT += GetEquippedTotalSPCardAndElse(ITEM_SP_INT_PLUS_FOR_SET) + wSPCall2;
	wSPC_DEX += GetEquippedTotalSPCardAndElse(ITEM_SP_DEX_PLUS_FOR_SET) + wSPCall2;
	wSPC_LUK += GetEquippedTotalSPCardAndElse(ITEM_SP_LUK_PLUS_FOR_SET) + wSPCall2;


	//----------------------------------------------------------------
	// ランダムエンチャント効果
	// （集中力向上は乗らないらしいので、たぶんこの位置）
	//----------------------------------------------------------------
	wSPCall = GetRndOptTotalValue(ITEM_SP_ALLSTATUS_PLUS, null, false);
	wSPC_STR += GetRndOptTotalValue(ITEM_SP_STR_PLUS, null, false) + wSPCall;
	wSPC_AGI += GetRndOptTotalValue(ITEM_SP_AGI_PLUS, null, false) + wSPCall;
	wSPC_VIT += GetRndOptTotalValue(ITEM_SP_VIT_PLUS, null, false) + wSPCall;
	wSPC_INT += GetRndOptTotalValue(ITEM_SP_INT_PLUS, null, false) + wSPCall;
	wSPC_DEX += GetRndOptTotalValue(ITEM_SP_DEX_PLUS, null, false) + wSPCall;
	wSPC_LUK += GetRndOptTotalValue(ITEM_SP_LUK_PLUS, null, false) + wSPCall;

	//----------------------------------------------------------------
	// スキル「フルスロットル」による効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_FULLSLOT) > 0) {
		wSPC_STR += ROUNDDOWN(SU_STR * 0.2);
		wSPC_AGI += ROUNDDOWN(SU_AGI * 0.2);
		wSPC_VIT += ROUNDDOWN(SU_VIT * 0.2);
		wSPC_DEX += ROUNDDOWN(SU_DEX * 0.2);
		wSPC_INT += ROUNDDOWN(SU_INT * 0.2);
		wSPC_LUK += ROUNDDOWN(SU_LUK * 0.2);
	}

	//----------------------------------------------------------------
	// 「サモナー　大地の力」による効果
	//----------------------------------------------------------------
	if (Math.max(LearnedSkillSearch(SKILL_ID_DAICHINO_CHIKARA), UsedSkillSearch(SKILL_ID_DAICHINO_CHIKARA)) > 0) {
		wSPC_INT += 7;
	}

	//----------------------------------------------------------------
	// 「一次職支援　ブレッシング」による効果
	//----------------------------------------------------------------
	wSPC_STR += g_confDataIchizi[CCharaConfIchizi.CONF_ID_BLESSING];
	wSPC_INT += g_confDataIchizi[CCharaConfIchizi.CONF_ID_BLESSING];
	wSPC_DEX += g_confDataIchizi[CCharaConfIchizi.CONF_ID_BLESSING];

	//----------------------------------------------------------------
	// 「一次職支援　速度増加」による効果
	//----------------------------------------------------------------
	if(g_confDataIchizi[CCharaConfIchizi.CONF_ID_SOKUDO_ZOKA] > 0 && 
		g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE] == 0 && 
		g_confDataDebuff[CCharaConfDebuff.CONF_ID_DECAGI] == 0) {
		wSPC_AGI += g_confDataIchizi[CCharaConfIchizi.CONF_ID_SOKUDO_ZOKA] + 2;
	}

	//----------------------------------------------------------------
	// 「二次職支援　グロリア」による効果
	//----------------------------------------------------------------
	wSPC_LUK += (g_confDataNizi[CCharaConfNizi.CONF_ID_GLORIA] * 30);

	if (UsedSkillSearch(SKILL_ID_TRUE_SIGHT)) {
		wSPC_STR += 5;
		wSPC_AGI += 5;
		wSPC_VIT += 5;
		wSPC_DEX += 5;
		wSPC_INT += 5;
		wSPC_LUK += 5;
	}
	//----------------------------------------------------------------
	// 「二次職支援　トゥルーサイト」の、効果
	//----------------------------------------------------------------
	else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_TRUE_SIGHT]) > 0) {
		wSPC_STR += 5;
		wSPC_AGI += 5;
		wSPC_VIT += 5;
		wSPC_DEX += 5;
		wSPC_INT += 5;
		wSPC_LUK += 5;
	}

	if (UsedSkillSearch(SKILL_ID_SPURT_ZYOTAI) && n_A_WeaponType==0) {
		wSPC_STR += 10;
	}

	if(UsedSkillSearch(SKILL_ID_GIANT_GROWTH)) {
		wSPC_STR += 30;
	}

	//----------------------------------------------------------------
	// 「三次職支援　ジャイアントグロース」の効果
	//----------------------------------------------------------------
	if(g_confDataSanzi[CCharaConfSanzi.CONF_ID_GIANT_GLOTH]) {
		wSPC_STR += 30;
	}

	if (UsedSkillSearch(SKILL_ID_INSPIRATION)
		|| TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
		|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
		|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
		) {
		var w = ROUNDDOWN(n_A_BaseLV / 10 + n_A_JobLV / 5);
		wSPC_STR += w;
		wSPC_AGI += w;
		wSPC_VIT += w;
		wSPC_DEX += w;
		wSPC_INT += w;
		wSPC_LUK += w;
	}

	if(n_A_PassSkill4[0]){
		wSPC_STR += 5;
		wSPC_DEX += 5;
		wSPC_INT += 5;
	}
	wSPC_STR += n_A_PassSkill4[1];
	wSPC_VIT += n_A_PassSkill4[2];
	wSPC_AGI += n_A_PassSkill4[3];
	wSPC_DEX += n_A_PassSkill4[4];
	if(n_A_PassSkill4[5]){
		wSPC_STR += 20;
		wSPC_AGI += 20;
		wSPC_VIT += 20;
		wSPC_DEX += 20;
		wSPC_INT += 20;
		wSPC_LUK += 20;
	}

	if(n_A_PassSkill8[4]){
		wSPC_STR += 1;
		wSPC_AGI += 1;
		wSPC_VIT += 1;
		wSPC_DEX += 1;
		wSPC_INT += 1;
		wSPC_LUK += 1;
	}
	if (UsedSkillSearch(SKILL_ID_MARIAGE_STATUS)) {
		wSPC_STR -= 1;
		wSPC_AGI -= 1;
		wSPC_VIT -= 1;
		wSPC_DEX -= 1;
		wSPC_INT -= 1;
		wSPC_LUK -= 1;
	}

	//----------------------------------------------------------------
	// 「三次職支援　アクラウスダッシュ」の効果
	//----------------------------------------------------------------
	switch (g_confDataSanzi[CCharaConfSanzi.CONF_ID_ARCLOUSE_DASH]) {
	case 1:
	case 2:
		wSPC_AGI += 3;
		break;
	case 3:
	case 4:
		wSPC_AGI += 9;
		break;
	case 5:
		wSPC_AGI += 15;
		break;
	}

	wSPC_VIT += 5 * UsedSkillSearch(SKILL_ID_DEFENCE);

	/**
	 * プレイヤー状態異常「メロディーオブシンク」の効果
	 */
	wSPC_INT -= 5 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_MELODYOFSINK];

	/**
	 * プレイヤー状態異常「精神衝撃」の効果
	 */
	wSPC_INT -= 4 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_MANDRAGORA];

	/**
	 * プレイヤー状態異常「ビヨンドオブウォークライ」の効果
	 */
	wSPC_STR -= 6 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_BEYOND_OF_WARCRY];

	/**
	 * プレイヤー状態異常「ハーモナイズ」の効果
	 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_HARMONIZE] > 0) {
		const harmonize_val = (5 + 5 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_HARMONIZE]);
		wSPC_STR -= harmonize_val;
		wSPC_AGI -= harmonize_val;
		wSPC_VIT -= harmonize_val;
		wSPC_INT -= harmonize_val;
		wSPC_DEX -= harmonize_val;
		wSPC_LUK -= harmonize_val;
	}

	/**
	 * プレイヤー状態異常「オールステータスダウン」の効果
	 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_ALL_STATUS_DOWN] > 0) {
		wSPC_STR -= 100;
		wSPC_AGI -= 100;
		wSPC_VIT -= 100;
		wSPC_INT -= 100;
		wSPC_DEX -= 100;
		wSPC_LUK -= 100;
	}

	if(n_A_PassSkill7[49]){
		wSPC_STR += 10;
		wSPC_AGI += 10;
		wSPC_VIT += 10;
		wSPC_INT += 10;
		wSPC_DEX += 10;
		wSPC_LUK += 10;
	}else{
		if(n_A_PassSkill7[3]) wSPC_STR += n_A_PassSkill7[3];
		if(n_A_PassSkill7[4]) wSPC_AGI += n_A_PassSkill7[4];
		if(n_A_PassSkill7[5]) wSPC_VIT += n_A_PassSkill7[5];
		if(n_A_PassSkill7[6]) wSPC_INT += n_A_PassSkill7[6];
		if(n_A_PassSkill7[7]) wSPC_DEX += n_A_PassSkill7[7];
		if(n_A_PassSkill7[8]) wSPC_LUK += n_A_PassSkill7[8];
		if(TimeItemNumSearch(79)){
			if(n_A_PassSkill7[3] <6) wSPC_STR += 6 - n_A_PassSkill7[3];
			if(n_A_PassSkill7[4] <6) wSPC_AGI += 6 - n_A_PassSkill7[4];
			if(n_A_PassSkill7[5] <6) wSPC_VIT += 6 - n_A_PassSkill7[5];
			if(n_A_PassSkill7[6] <6) wSPC_INT += 6 - n_A_PassSkill7[6];
			if(n_A_PassSkill7[7] <6) wSPC_DEX += 6 - n_A_PassSkill7[7];
			if(n_A_PassSkill7[8] <6) wSPC_LUK += 6 - n_A_PassSkill7[8];
		}
	}
	if(n_A_PassSkill7[16]) wSPC_STR += 20;
	if(n_A_PassSkill7[17]) wSPC_AGI += 20;
	if(n_A_PassSkill7[18]) wSPC_VIT += 20;
	if(n_A_PassSkill7[19]) wSPC_INT += 20;
	if(n_A_PassSkill7[20]) wSPC_DEX += 20;
	if(n_A_PassSkill7[21]) wSPC_LUK += 20;

	if (UsedSkillSearch(SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI)) {
		if(35<= n_A_JOB && n_A_JOB <= 40 && n_A_BaseLV <70){
			var w=0;
			w = n_A_BaseLV - 10;
			if(w > 50) w = 50;
			if(w <0) w = 0;
			if(n_A_STR + wSPC_STR <= w) wSPC_STR = w - n_A_STR;
			if(n_A_AGI + wSPC_AGI <= w) wSPC_AGI = w - n_A_AGI;
			if(n_A_VIT + wSPC_VIT <= w) wSPC_VIT = w - n_A_VIT;
			if(n_A_INT + wSPC_INT <= w) wSPC_INT = w - n_A_INT;
			if(n_A_DEX + wSPC_DEX <= w) wSPC_DEX = w - n_A_DEX;
			if(n_A_LUK + wSPC_LUK <= w) wSPC_LUK = w - n_A_LUK;
		}
	}


	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_STR_PLUS);
	if (confval != 0) {
		wSPC_STR += confval;
	}

	confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_AGI_PLUS);
	if (confval != 0) {
		wSPC_AGI += confval;
	}

	confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_VIT_PLUS);
	if (confval != 0) {
		wSPC_VIT += confval;
	}

	confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_INT_PLUS);
	if (confval != 0) {
		wSPC_INT += confval;
	}

	confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_DEX_PLUS);
	if (confval != 0) {
		wSPC_DEX += confval;
	}

	confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_LUK_PLUS);
	if (confval != 0) {
		wSPC_LUK += confval;
	}

	if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE]){
		var w1;
		var w2;
		if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE] <= 5){
			w1 = Math.floor((n_A_AGI + wSPC_AGI) / 2);
			w2 = 9999;
		}else{
			w1 = Math.floor((n_A_AGI + wSPC_AGI) / 4);
			w2 = 5 * (g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE] - 5);
		}
		if(w1 > w2) wSPC_AGI -= w2;
		else wSPC_AGI -= w1;
		if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_QUAGMIRE] <= 5) w1 = Math.floor((n_A_DEX + wSPC_DEX) / 2);
		else w1 = Math.floor((n_A_DEX + wSPC_DEX) / 4);
		if(w1 > w2) wSPC_DEX -= w2;
		else wSPC_DEX -= w1;
	}
	if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_DECAGI]) wSPC_AGI -= (g_confDataDebuff[CCharaConfDebuff.CONF_ID_DECAGI] + 2);
	if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_CURSE]) wSPC_LUK = -1 * n_A_LUK;
	set_n_A_STR(n_A_STR + (wSPC_STR));
	set_n_A_AGI(n_A_AGI + (wSPC_AGI));
	set_n_A_VIT(n_A_VIT + (wSPC_VIT));
	set_n_A_INT(n_A_INT + (wSPC_INT));
	set_n_A_DEX(n_A_DEX + (wSPC_DEX));
	set_n_A_LUK(n_A_LUK + (wSPC_LUK));

	// 拡張表示用のデータを格納
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_STR_PLUS, wSPC_STR - jobBonusArray[0]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_AGI_PLUS, wSPC_AGI - jobBonusArray[1]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_VIT_PLUS, wSPC_VIT - jobBonusArray[2]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_INT_PLUS, wSPC_INT - jobBonusArray[3]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_DEX_PLUS, wSPC_DEX - jobBonusArray[4]);
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_LUK_PLUS, wSPC_LUK - jobBonusArray[5]);

	//------------------------------------------------------------------------------------------------
	//
	// 特性ステータス対応
	//
	//------------------------------------------------------------------------------------------------
	var wSPC_SPEC_ALL = GetEquippedTotalSPEquip(ITEM_SP_ALL_SPECS_PLUS);

	wSPC_POW += GetEquippedTotalSPEquip(ITEM_SP_POW_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_POW_PLUS);
	wSPC_STA += GetEquippedTotalSPEquip(ITEM_SP_STA_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_STA_PLUS);
	wSPC_WIS += GetEquippedTotalSPEquip(ITEM_SP_WIS_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_WIS_PLUS);
	wSPC_SPL += GetEquippedTotalSPEquip(ITEM_SP_SPL_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_SPL_PLUS);
	wSPC_CON += GetEquippedTotalSPEquip(ITEM_SP_CON_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_CON_PLUS);
	wSPC_CRT += GetEquippedTotalSPEquip(ITEM_SP_CRT_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_CRT_PLUS);

	// ランダムエンチャント効果
	wSPC_SPEC_ALL += GetRndOptTotalValue(ITEM_SP_ALL_SPECS_PLUS, null, false);

	wSPC_POW += GetRndOptTotalValue(ITEM_SP_POW_PLUS, null, false);
	wSPC_STA += GetRndOptTotalValue(ITEM_SP_STA_PLUS, null, false);
	wSPC_WIS += GetRndOptTotalValue(ITEM_SP_WIS_PLUS, null, false);
	wSPC_SPL += GetRndOptTotalValue(ITEM_SP_SPL_PLUS, null, false);
	wSPC_CON += GetRndOptTotalValue(ITEM_SP_CON_PLUS, null, false);
	wSPC_CRT += GetRndOptTotalValue(ITEM_SP_CRT_PLUS, null, false);

	// 全ステ上昇を分配
	wSPC_POW += wSPC_SPEC_ALL;
	wSPC_STA += wSPC_SPEC_ALL;
	wSPC_WIS += wSPC_SPEC_ALL;
	wSPC_SPL += wSPC_SPEC_ALL;
	wSPC_CON += wSPC_SPEC_ALL;
	wSPC_CRT += wSPC_SPEC_ALL;


	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_POW_PLUS);
	if (confval != 0) {
		wSPC_POW += confval;
	}

	confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_STA_PLUS);
	if (confval != 0) {
		wSPC_STA += confval;
	}

	confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_WIS_PLUS);
	if (confval != 0) {
		wSPC_WIS += confval;
	}

	confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_SPL_PLUS);
	if (confval != 0) {
		wSPC_SPL += confval;
	}

	confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_CON_PLUS);
	if (confval != 0) {
		wSPC_CON += confval;
	}

	confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_CRT_PLUS);
	if (confval != 0) {
		wSPC_CRT += confval;
	}


	// 「砂時計のネックレス」の効果（ペナルティ）
	if ((itemCount = EquipNumSearch(ITEM_ID_SUNADOKENO_NECKLACE)) > 0) {
		confval = Math.min(6, Math.floor(n_A_JobLV / 5)) * itemCount;

		wSPC_POW -= confval;
		wSPC_STA -= confval;
		wSPC_WIS -= confval;
		wSPC_SPL -= confval;
		wSPC_CON -= confval;
		wSPC_CRT -= confval;
	}

	// 「ソウルアセティック」スキル「霊道術修練」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN), UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN))) > 0) {
		wSPC_SPL += sklLv;
	}

	// 四次職支援「レリギオ」による効果
	// 術者側の H.Plus +100 あたり効果量 +2 加算は未実装
	// SKILL_ID_RERIGIO
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_RERIGIO]) > 0) {
		value = 2 * bufLv;
		wSPC_STA += value;
		wSPC_WIS += value;
		wSPC_SPL += value;
	}

	// 四次職支援「ベネディクトゥム」による効果
	// 術者側の H.Plus +100 あたり効果量 +2 加算は未実装
	// SKILL_ID_BENEDICTUM
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BENEDICTUM]) > 0) {

		value = 2 * bufLv;

		wSPC_POW += value;
		wSPC_CON += value;
		wSPC_CRT += value;
	}

	// 四次職支援「サンドフェスティバル」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_SAND_FESTIVAL]) > 0) {
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_RERIGIO] == 0) {
			value = 2 * bufLv;

			wSPC_STA += value;
			wSPC_WIS += value;
			wSPC_SPL += value;
		}
	}

	// 四次職支援「マリンフェスティバル」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_MARIN_FESTIVAL]) > 0) {
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_BENEDICTUM] == 0) {
			value = 2 * bufLv;

			wSPC_POW += value;
			wSPC_CON += value;
			wSPC_CRT += value;	
		}
	}

	// 「ナイトウォッチ」スキル「グレネードマスタリー」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY))) > 0) {
		wSPC_CON += sklLv
	}

	/** ドルイド「ネイチャーシールド」による Vit・Int + 効果 */
	prefetch = UsedSkillSearch(SKILL_ID_NATURE_SHIELD);
	if (prefetch > 0) {
		wSPC_VIT += prefetch;
		wSPC_INT += prefetch;
	}

	/** ドルイド「プリーニング」による Agi・Dex + 効果 */
	prefetch = UsedSkillSearch(SKILL_ID_PREENING);
	if (prefetch > 0) {
		wSPC_AGI += 2 * prefetch;
		wSPC_DEX += 2 * prefetch;
	}

	/** ドルイド「ブラッドハウリング」による Str・Luk + 効果 */
	prefetch = UsedSkillSearch(SKILL_ID_BLOOD_HOWLING);
	if (prefetch > 0) {
		wSPC_STR += 2 * prefetch;
		wSPC_LUK += 2 * prefetch;
	}

	// 特性ステータス補正の保持
	var spc4thArray = StoreSpecStatusBonusAll(wSPC_POW, wSPC_STA, wSPC_WIS, wSPC_SPL, wSPC_CON, wSPC_CRT);

	// classic 6ステータス補正の保持（リファクタリング計画 Phase 12: saveimage.js 等がDOM経由で
	// しか取得できなかった値。DisplayStatusBonusAll に渡す値と同一のものをここで保存する）
	StoreBasicStatusBonusAll(wSPC_STR, wSPC_AGI, wSPC_VIT, wSPC_INT, wSPC_DEX, wSPC_LUK);

	// ステータス補正の画面出力
	DisplayStatusBonusAll(
		n_A_BaseLV,
		wSPC_STR, wSPC_AGI, wSPC_VIT, wSPC_INT, wSPC_DEX, wSPC_LUK,
		spc4thArray[0], spc4thArray[1], spc4thArray[2], spc4thArray[3], spc4thArray[4], spc4thArray[5]
	);

	// 特性データ対応
	// 画面出力
}

