/**
 * 魔法判定攻撃に対するスキル倍率の増減の分割（Phase 3c）。
 *
 * GetMagicalSkillDamageRatioChange / ApplyMagicalSkillDamageRatioChange /
 * ApplyMagicalSkillDamageRatioChangeSubArcanaCard / RebuildActiveSkillRatioInfo を
 * head.js から移動。本文はバイト単位で不変。
 *
 * itemCountRight / itemCountLeft は GetMagicalSkillDamageRatioChange 内だけで
 * 「書いてから読む」で完結していたスクラッチ変数（head-skill-ratio-physical.js と
 * 同じ扱い）。
 */
import { CCharaConfCustomSkill } from '../../../roro/m/js/CCharaConfCustomSkill.js';
import { CSkillData } from '../../../roro/m/js/CSkillManager.js';
import {
    CARD_ID_ARCANA_HARMIT, CARD_ID_ARCANA_MOON, CARD_ID_ARCANA_STAR, CARD_ID_DIO_ANEMOS, CARD_ID_MATTER_CHEMERA,
    CARD_ID_SARANO_GENEI, CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_DIADEM,
    CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_SHOES, CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_SHOES
} from '../../../roro/m/js/card.dat.js';
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from '../../../roro/m/js/chara.js';
import {
    CARD_REGION_ID_ACCESSORY_1_ANY, CARD_REGION_ID_ACCESSORY_2_ANY, CARD_REGION_ID_ARMS_LEFT_ANY,
    CARD_REGION_ID_ARMS_RIGHT_ANY, CARD_REGION_ID_BODY_ANY, CARD_REGION_ID_HEAD_MID_ANY, CARD_REGION_ID_HEAD_TOP_ANY,
    CARD_REGION_ID_SHIELD_ANY, CARD_REGION_ID_SHOES_ANY, CARD_REGION_ID_SHOULDER_ANY
} from '../../../roro/m/js/common.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from '../../../roro/m/js/const/EnumEquipRegionId.js';
import { JOB_ID_ARCBISHOP, JOB_ID_SORCERER, JOB_ID_SUMMONER } from '../../../roro/m/js/const/EnumJobId.js';
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, ROUNDDOWN } from '../../../roro/m/js/foot-bridge.js';
import {
    ITEM_ID_AVENGER_WIZARDSTUFF, ITEM_ID_AZATOI_KEROKERO_KAPPA, ITEM_ID_CIRCUIT_BOARD_OS, ITEM_ID_DIA_DE_MUERTOS,
    ITEM_ID_ELVIRA_BOOTS, ITEM_ID_EMERALDEARRING, ITEM_ID_ENRAIMAZYONO_OTSUE, ITEM_ID_FURUBITA_BALLERINA,
    ITEM_ID_FURUBITA_MARYOKUSEKI, ITEM_ID_FURUBITA_MINSTRELSONG, ITEM_ID_FUWAFUWA_TANPOPO_SHOES,
    ITEM_ID_GEFFENIA_KORINO_MADOGU, ITEM_ID_GRACE_PUNISHMENT_ROBE, ITEM_ID_HANRYU_OZYONO_YUBIWA,
    ITEM_ID_IKUSAOTOMENO_SHIZUKU, ITEM_ID_ILLUSION_MOKUSHIROKU, ITEM_ID_ILLUSION_TABLET,
    ITEM_ID_IMPERIAL_PUNISHMENT_ROBE, ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER, ITEM_ID_KODAIRYUNO_HOKAN,
    ITEM_ID_MAGICAL_RING, ITEM_ID_MAGIC_COMPRESSION, ITEM_ID_MH_P89_OS, ITEM_ID_NIZIIRONO_MUFFLER,
    ITEM_ID_POKAPOKA_TANPOPO_CAPE, ITEM_ID_RUTIS_STICK_OS, ITEM_ID_SEIREINO_MANT, ITEM_ID_SEIREINO_ROBE,
    ITEM_ID_SEIREIONO_YUBIWA, ITEM_ID_SHADOW_STUFF, ITEM_ID_SHINMA_BAPHOMETNO_TSUNO, ITEM_ID_STUFF_OF_PUFFY,
    ITEM_ID_TOKUSEN_HANO_OMAMORI, ITEM_ID_TRAVELER_SHOES, ITEM_ID_ULTIO_OS, ITEM_ID_YOZINBONO_SCARF,
    ITEM_ID_ZYONINNO_KOSHIOBI, ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE,
    ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE, ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_BOITATA_CARD,
    ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FUINSARETA_BOITATA, ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_MUTANT_DRAGON_CARD,
    ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN, ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_ENRAI_MAZYONO_OTSUE,
    ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_BLOODY_KNIGHT_CARD,
    ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_FUINSARETA_STORM_KNIGHT, ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_STORM_KNIGHT_CARD,
    ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK, ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK,
    ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT,
    ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD, ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD,
    ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD, ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE
} from '../../../roro/m/js/item.dat.js';
import { LearnedSkillSearch } from '../../../roro/m/js/learnedskill.js';
import { n_B_KYOUKA } from '../../../roro/m/js/mobconfbuf.js';
import { MOB_CONF_DEBUF_ID_REITO, n_B_IJYOU } from '../../../roro/m/js/mobconfdebuf.js';
import {
    SU_INT, n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus, n_B_MDEF2
} from '../../../roro/m/js/roro-state.js';
import {
    SKILL_ID_ADORAMUS, SKILL_ID_ALL_BLOOM, SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_CHATTERING, SKILL_ID_CLEARANCE,
    SKILL_ID_CLIMAX, SKILL_ID_COLD_BOLT, SKILL_ID_COMMET, SKILL_ID_CRYMSON_ROCK, SKILL_ID_CRYSTAL_IMPACT,
    SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_DESTRACTIVE_HURRICANE, SKILL_ID_DIAMOND_DUST, SKILL_ID_DRAIN_LIFE,
    SKILL_ID_EARTH_SPIKE, SKILL_ID_EARTH_STRAIN, SKILL_ID_ELECTRIC_WALK, SKILL_ID_ESFU, SKILL_ID_ESPA,
    SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_WALK, SKILL_ID_FROST_MISTY, SKILL_ID_FUZIN, SKILL_ID_HEAVENS_DRIVE,
    SKILL_ID_HELL_INFERNO, SKILL_ID_HYOSENSO, SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_INUHAKKA_METEOR,
    SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_JACK_FROST, SKILL_ID_JUDEX, SKILL_ID_JUPITER_THUNDER, SKILL_ID_KOUENKA,
    SKILL_ID_LAUDAAGNUS, SKILL_ID_LAUDARAMUS, SKILL_ID_LIGHTNING_BOLT, SKILL_ID_MAGNUS_EXORCISMUS,
    SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_MATATABI_LANCE, SKILL_ID_MELANCHOLY,
    SKILL_ID_METALIC_SOUND, SKILL_ID_METEOR_STORM, SKILL_ID_MIRIAM_LIGHT, SKILL_ID_MYAUMYAU,
    SKILL_ID_MYSTIC_SYMPHONY, SKILL_ID_NAPALM_BEAT, SKILL_ID_NAPALM_VULKAN, SKILL_ID_NYAN_GRASS,
    SKILL_ID_NYAN_TAMASHI, SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_RYUENZIN,
    SKILL_ID_SAKUFU, SKILL_ID_SHINDOZANKYO, SKILL_ID_SOUL_EXPANSION, SKILL_ID_SOUL_STRIKE,
    SKILL_ID_SOUL_VULKUN_STRIKE, SKILL_ID_SOUND_BLEND, SKILL_ID_SPELL_FIST, SKILL_ID_STASIS, SKILL_ID_STORM_GUST,
    SKILL_ID_STRIKING, SKILL_ID_TAMASHINO_SHUKAKU, SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TETRA_BOLTEX,
    SKILL_ID_THUNDER_STORM, SKILL_ID_TSURARAOTOSHI, SKILL_ID_VIOLENT_QUAKE, SKILL_ID_WATER_BALL,
    SKILL_ID_ZYUTSUSHIKI_KAIHO
} from '../../../roro/m/js/skill.dat.js';
import { CBattleCalcInfo } from './CBattleCalcInfo.js';
import { GetLowerJobSeriesID, IsSameJobClass } from './data/mig.job.h.js';
import { g_objCharaConfCustomSkill, g_skillManager } from './global.js';
import { CS } from './head-calc-state.js';
import { ApplyMresResist } from './hmjob.js';
import { n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_A_Weapon_zokusei, n_Enekyori } from './ro4-state.js';
import { UsedSkillSearch } from './skillstate.js';
import { GetPhysicalSkillDamageRatioChange } from './head-skill-ratio-physical.js';
import {
    ApplyAttackDamageAmplify, ApplyElementRatio, ApplyLexAeterna, ApplyRegistPVPEnergyCoat,
    GetElementFieldDamageRatio,
} from './head-bridge.js';

/**
 * 魔法判定攻撃に対するスキル倍率の増減を取得する.
 * MDEFなどの計算後に処理される
 * @param wBMC ダメージ
 * @return 適用後のダメージ
 */
export function GetMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData) {
    let itemCountRight = 0, itemCountLeft = 0;

	var valueWork = 0;
	var itemCount = 0, cardCount = 0, confval = 0;

	var wX = 0;

//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等の“魔法”スキル倍率補正　ここから　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	//----------------------------------------------------------------
	// ファイアーピラー以外の場合、装備固定効果、カード固定効果を適用
	//----------------------------------------------------------------
	if(n_A_ActiveSkill != 122) {
		wX = GetEquippedTotalSPEquip(5000 + n_A_ActiveSkill) + GetEquippedTotalSPCardAndElse(5000 + n_A_ActiveSkill);
	}

	//----------------------------------------------------------------
	// 「バンシーカード」の、「ナパームビート」「ソウルストライク」「ナパームバルカン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 46 || n_A_ActiveSkill == 47 || n_A_ActiveSkill == 277) {
		if(GetLowerJobSeriesID(n_A_JOB)==5) wX += 20 * CardNumSearch(474);
	}

	//----------------------------------------------------------------
	// 「花のカチューシャ」の、「アーススパイク」「ヘヴンズドライブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 132 || n_A_ActiveSkill == 133) {
		if(EquipNumSearch(1146)) wX += n_A_HEAD_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「ラクリマスティック」の、「ストームガスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 131) {
		if(EquipNumSearch(1169)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「ノアの帽子」の、「ホーリーライト」強化
	// 「マジカルフェザー」の、「ホーリーライト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 37 || n_A_ActiveSkill == 387){

		if(GetLowerJobSeriesID(n_A_JOB) == 3 && EquipNumSearch(1247)){
			wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 5;
		}

		if(EquipNumSearch(2394)) {
			wX += 80 * LearnedSkillSearch(SKILL_ID_IMPOSITIO_MANUS);
		}
	}

	//----------------------------------------------------------------
	// 「メンタルスティック」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 662){
		if(EquipNumSearch(1475)){
			if(n_A_Weapon_ATKplus >= 6) wX += (n_A_Weapon_ATKplus - 5) * 2;
		}
	}

	//----------------------------------------------------------------
	// 「審判セット」の、「アドラムス」強化
	// 「審判Ⅱセット」の、「アドラムス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 478){
		if(n_A_Weapon_ATKplus >= 7 && n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7){
			if(EquipNumSearch(1570)) wX += 100;
			if(EquipNumSearch(1572)) wX += 50;
		}
	}

	//----------------------------------------------------------------
	// 「冷気の魔法書」の、「コールドボルト」「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 54 || n_A_ActiveSkill == 667) {
		if(EquipNumSearch(1697)) wX += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「炎神の系譜」の、「ファイアーボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 51) {
		if(EquipNumSearch(1803)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「氷神の系譜」の、「コールドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 54) {
		if(EquipNumSearch(1784)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「雷神の系譜」の、「ライトニングボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 56) {
		if(EquipNumSearch(1744)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「地神の系譜」の、「アーススパイク」「ヘヴンズドライブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 132 || n_A_ActiveSkill == 133) {
		if(EquipNumSearch(1900)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「エレメンタルブーツ」の、「ファイアーボルト」「コールドボルト」「ライトニングボルト」「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 51 || n_A_ActiveSkill == 54 || n_A_ActiveSkill == 56 || n_A_ActiveSkill == 132) {
		if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(1894)) wX += n_A_SHOES_DEF_PLUS - 5;
	}

	//----------------------------------------------------------------
	// 「天体サークル」の、「メテオストーム」「クリムゾンロック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 125 || n_A_ActiveSkill == 527) {
		if(EquipNumSearch(2092)) wX += 5 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 3);
	}

	//----------------------------------------------------------------
	// 「まねき餅花」の、「ファイアーウォール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 53) {
		if(n_A_HEAD_DEF_PLUS >= 1 && EquipNumSearch(2166)) wX += 5 * n_A_HEAD_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「悪魔祓いの書」の、「マグヌスエクソシズム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 104){
		if(EquipNumSearch(2178)){
			var w9 = SU_INT;
			if(w9 > 120) w9 = 120;
			wX += w9;
		}
	}

	//----------------------------------------------------------------
	// 「酸素ボンベ」の、「ファイアーウォール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 53) {
		if(EquipNumSearch(2299)) wX += ROUNDDOWN(n_A_BaseLV / 2);
	}

	//----------------------------------------------------------------
	// 「シャドウスタッフ」の、スキル習得による「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 528){
		if(EquipNumSearch(ITEM_ID_SHADOW_STUFF)){
			if (LearnedSkillSearch(SKILL_ID_HELL_INFERNO) >= 5) {
				wX += 100;
				wX += 10 * n_A_Weapon_ATKplus;
			}
		}
	}

	//----------------------------------------------------------------
	// 「法螺貝」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 639 && EquipNumSearch(2430)){
		if(n_A_Weapon_ATKplus >= 5) wX += 10;
		if(n_A_Weapon_ATKplus >= 7) wX += 20;
		if(n_A_Weapon_ATKplus >= 9) wX += 40;
	}

	//----------------------------------------------------------------
	// 「アルティメット　クリムゾンセット」の、「サモンファイアーボール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 533 && EquipNumSearch(2546)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　アクアセット」の、「サモンウォーターボール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 534 && EquipNumSearch(2551)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　ゴールデンロッドセット」の、「サモンボールライトニング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 535 && EquipNumSearch(2556)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　フォレストセット」の、「サモンストーン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 536 && EquipNumSearch(2561)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　各ウォーロックセット」の、「魔法力増幅」使用後における、
	// 「メテオストーム」、「ストームガスト」、「ロードオブヴァーミリオン」、「ヘヴンズドライブ」強化
	//----------------------------------------------------------------
	if(UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU)){
		if(n_A_ActiveSkill == 125 && EquipNumSearch(2549)) wX += 1 * n_A_BaseLV;
		if(n_A_ActiveSkill == 131 && EquipNumSearch(2554)) wX += ROUNDDOWN(1.5 * n_A_BaseLV);
		if(n_A_ActiveSkill == 127 && EquipNumSearch(2559)) wX += 2 * n_A_BaseLV;
		if(n_A_ActiveSkill == 133 && EquipNumSearch(2564)) wX += ROUNDDOWN(2.5 * n_A_BaseLV);
	}


	//----------------------------------------------------------------
	// 「古びたミンストレルソングの帽子」の、「振動残響」強化
	// 「古びたバレリーナの髪飾り」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 639) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BALLERINA)
			|| EquipNumSearch(ITEM_ID_FURUBITA_MINSTRELSONG)) {
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びた魔力石の帽子」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 527) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_MARYOKUSEKI)) {
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びた魔力石の帽子」の、「コメット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 529) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_MARYOKUSEKI)) {
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 10;
		}
	}


	//----------------------------------------------------------------
	// 「精霊王の指輪」の、「アースグレイヴ」「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == 666 || n_A_ActiveSkill == 667) {
		wX += ROUNDDOWN(n_A_BaseLV / 8) * 1 * EquipNumSearch(ITEM_ID_SEIREIONO_YUBIWA);
	}


	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「メタリックサウンド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 641) {
		wX += ROUNDDOWN(n_A_BaseLV / 5) * 2 * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}


	//----------------------------------------------------------------
	// 「ポロロッカシューズ　ラクリマセット」の、「ウォーターボール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WATER_BALL) {
		if (EquipNumSearch(ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK)) {

			// ウォーターボール習得レベルによる強化
			wX += 30 * LearnedSkillSearch(SKILL_ID_WATER_BALL);

			// ラクリマスティックの精錬による強化
			wX += 20 * n_A_Weapon_ATKplus;
		}
	}


	//----------------------------------------------------------------
	// 「アヴェンジャーウィザードスタッフ」の、「コメット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_COMMET) {
		if (EquipNumSearch(ITEM_ID_AVENGER_WIZARDSTUFF)) {
			if (n_A_Weapon_ATKplus >= 9) {
				wX += 20;
			}
		}
	}


	//----------------------------------------------------------------
	// 「サバイバルオーブ　ロッドセット」の、「アースストレイン」強化
	// 「サバイバルオーブ　ロッドセット」の、「チェーンライトニング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_EARTH_STRAIN
		|| n_A_ActiveSkill == SKILL_ID_CHAIN_LIGHTNING) {

		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX)
			|| EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT)) {
			if (n_A_Weapon_ATKplus >= 10) {
				if (n_A_BaseLV <= 99) {
					wX += 15;
				}
				else {
					wX += 45;
				}
			}
		}
	}
	//----------------------------------------------------------------
	// 「サバイバルオーブ　ロッドセット」の、「ヘヴンズドライブ」強化
	// 「サバイバルオーブ　ロッドセット」の、「ユピテルサンダー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HEAVENS_DRIVE
		|| n_A_ActiveSkill == SKILL_ID_JUPITER_THUNDER) {

		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX)
			|| EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT)) {
			if (n_A_Weapon_ATKplus >= 10) {
				if (n_A_BaseLV <= 99) {
					wX += 70;
				}
				else {
					wX += 210;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// 「マジカルリング」の、「ファイアーボルト」強化
	// 「マジカルリング」の、「コールドボルト」強化
	// 「マジカルリング」の、「ライトニングボルト」強化
	// 「マジカルリング」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {

		if (EquipNumSearch(ITEM_ID_MAGICAL_RING)) {
			wX += 1 * ROUNDDOWN(n_A_BaseLV / 5) * EquipNumSearch(ITEM_ID_MAGICAL_RING);
		}
	}


	//----------------------------------------------------------------
	// 「裁きの靴　ホーリーステッキセット」の、「アドラムス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ADORAMUS) {
		if(EquipNumSearch(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK)) {

			// ラウダアグヌス等の習得レベルによる強化
			var sklLv = 0;
			sklLv += LearnedSkillSearch(SKILL_ID_CLEARANCE);
			sklLv += LearnedSkillSearch(SKILL_ID_LAUDAAGNUS);
			sklLv += LearnedSkillSearch(SKILL_ID_LAUDARAMUS);

			wX += 10 * sklLv;

			// 過剰精錬による強化
			if (n_A_Weapon_ATKplus >= 9) {
				wX += 20;
			}
		}
	}


	//----------------------------------------------------------------
	// 「上忍の腰帯」の、「龍炎陣」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RYUENZIN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_KOUENKA) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「上忍の腰帯」の、「氷柱落とし」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TSURARAOTOSHI) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			wX += 20 * LearnedSkillSearch(SKILL_ID_HYOSENSO) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「上忍の腰帯」の、「龍炎陣」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SAKUFU) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_FUZIN) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「神魔バフォメットの角」の、「デュプレライト（魔法）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MIRIAM_LIGHT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINMA_BAPHOMETNO_TSUNO)) > 0) {
			wX += 10 * n_A_HEAD_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「悪魔崇拝者の靴　堕天司祭の闇光外套　古代樹の杖セット」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE)) > 0) {
			let vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7) vartmp += 100;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 100;

			wX += vartmp * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「炎雷魔女の大杖」の、「ファイアーウォーク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus;

			if (n_A_Weapon_ATKplus >= 9) {
				wX += 100;
			}
		}
	}

	//----------------------------------------------------------------
	// 「炎雷魔女の大杖」の、「エレクトリックーウォーク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ELECTRIC_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus;

			if (n_A_Weapon_ATKplus >= 9) {
				wX += 100;
			}
		}
	}

	//----------------------------------------------------------------
	// 「太極の護符　灼熱の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD)) > 0) {
			wX += 1 * n_A_Weapon_ATKplus * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「太極の護符　浄化の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD)) > 0) {
			wX += 5 * n_A_Weapon_ATKplus * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「太極の護符　奈落の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD)) > 0) {
			wX += 10 * n_A_Weapon_ATKplus * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「星のカード」の、「ソウルエクスパンション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SOUL_EXPANSION) {
		wX += ApplyMagicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_STAR);
	}

	//----------------------------------------------------------------
	// 「隠者のカード」の、「アドラムス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ADORAMUS) {
		wX += ApplyMagicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_HARMIT);
	}

	//----------------------------------------------------------------
	// 「月のカード」の、「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DIAMOND_DUST) {
		wX += ApplyMagicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_MOON);
	}


	//----------------------------------------------------------------
	// 「マッターキメラカード」の、「ファイアーボルト」強化
	// 「マッターキメラカード」の、「ライトニングボルト」強化
	// 「マッターキメラカード」の、「コールドボルト」強化
	// 「マッターキメラカード」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {
		if ((cardCount = CardNumSearch(CARD_ID_MATTER_CHEMERA)) > 0) {
			wX += 7 * n_A_SHOES_DEF_PLUS * cardCount;
		}
	}


	//----------------------------------------------------------------
	// 「戦乙女の雫」の、「マグヌスエクソシズム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MAGNUS_EXORCISMUS) {
		if ((itemCount = EquipNumSearch(ITEM_ID_IKUSAOTOMENO_SHIZUKU)) > 0) {
			wX += 3 * ROUNDDOWN(n_A_BaseLV / 2) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「精霊のローブ」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SEIREINO_ROBE)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 9) {
				wX += 10 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「精霊のマント」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SEIREINO_MANT)) > 0) {
			wX += 3 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「古代龍の宝冠」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KODAIRYUNO_HOKAN)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				wX += 10 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				wX += 10 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「特選葉のお守り」の、「イヌハッカメテオ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_HANO_OMAMORI)) > 0) {
			wX += 1 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、「術式-解放-」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ZYUTSUSHIKI_KAIHO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZYUTSUSHIKI_KAIHO) >= 1) {
				wX += 40 * itemCount;
			}

			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				wX += 3 * ROUNDDOWN(n_A_BaseLV / 2) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「サラの幻影カード」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		let cardCountHeadTop = CardNumSearch(CARD_ID_SARANO_GENEI, CARD_REGION_ID_HEAD_TOP_ANY);
		if (cardCountHeadTop > 0) {
			wX += 10 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
		}
	}


	//----------------------------------------------------------------
	// 「不死の軍団認識票　ひまわり少年セット」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN)) > 0) {
			wX += 1 * n_A_Weapon_ATKplus * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「トラベラーシューズ」の、「メタリックサウンド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_METALIC_SOUND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_SHOES)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「スタッフオブパフィ」の、「ファイアーボルト」強化
	// 「スタッフオブパフィ」の、「コールドボルト」強化
	// 「スタッフオブパフィ」の、「ライトニングボルト」強化
	// 「スタッフオブパフィ」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {

		if ((itemCount = EquipNumSearch(ITEM_ID_STUFF_OF_PUFFY)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SPELL_FIST) >= 5) {
				wX += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョン黙示録」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MOKUSHIROKU)) > 0) {
			if (n_A_BaseLV >= 170) {
				wX += 20 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「アドラムス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ADORAMUS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			wX += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「ジュデックス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			wX += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「降霊術士のドレス　炎雷魔女の大杖セット」の、「エレクトリックウォーク」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ELECTRIC_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_ENRAI_MAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「降霊術士のドレス　炎雷魔女の大杖セット」の、「ファイアウォーク」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_ENRAI_MAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「エルヴィラブーツ」の、「ライトニングボルト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ELVIRA_BOOTS)) > 0) {
			wX += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「虹色のマフラー」の、「メタリックサウンド」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_METALIC_SOUND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_MUFFLER)) > 0) {
			wX += 4 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　ブラッディナイトカードセット」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_BLOODY_KNIGHT_CARD)) > 0) {
			wX += 10 * n_A_Weapon_ATKplus * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　ストームナイトカードセット」の、「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_DIAMOND_DUST) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_STORM_KNIGHT_CARD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「イリュージョンタブレット」の、「ジュデックス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_TABLET)) > 0) {
			if (n_A_BaseLV >= 170) {
				wX += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ふわふわタンポポシューズ」の、「マタタビランス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
				if (LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR) >= 5) {
					wX += 20 * itemCount;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// 「ふわふわタンポポシューズ」の、「イヌハッカメテオ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
			wX += 15 * LearnedSkillSearch(SKILL_ID_MYAUMYAU) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「ストームガスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_STORM_GUST) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			wX += 2 * ROUNDDOWN(n_A_BaseLV / 3) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「コメット」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COMMET) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_JACK_FROST) >= 5) {
				wX += 50 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「フロストミスティ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FROST_MISTY) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STASIS) >= 5) {
				wX += 50 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「ジャックフロスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JACK_FROST) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STASIS) >= 5) {
				wX += 50 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ルティルススティック-OS」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		itemCountRight = EquipNumSearch(ITEM_ID_RUTIS_STICK_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_RUTIS_STICK_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 1 * n_A_BaseLV * itemCountRight;
			wX += 1 * n_A_BaseLV * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「ウルティオ-OS」の、「デュプレライト（魔法）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MIRIAM_LIGHT) {
		itemCountRight = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 7 * n_A_BaseLV * itemCountRight;
			wX += 7 * n_A_BaseLV * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「MH-P89-OS」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHINDOZANKYO) {
		itemCountRight = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 1 * Math.floor(n_A_BaseLV / 2) * itemCountRight;
			wX += 1 * Math.floor(n_A_BaseLV / 2) * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「サーキットボード-OS」の、「ファイアーボルト」強化
	// 「サーキットボード-OS」の、「コールドボルト」強化
	// 「サーキットボード-OS」の、「ライトニングボルト」強化
	// 「サーキットボード-OS」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {

		itemCountRight = EquipNumSearch(ITEM_ID_CIRCUIT_BOARD_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_CIRCUIT_BOARD_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 1 * n_A_BaseLV * itemCountRight;
			wX += 1 * n_A_BaseLV * itemCountLeft;
		}
	}


	//----------------------------------------------------------------
	// 「ディオ・アネモスカード」の、「サンダーストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_THUNDER_STORM) {
		cardCount = CardNumSearch(CARD_ID_DIO_ANEMOS);
		if (cardCount > 0) {
			wX += 2 * Math.floor(n_A_BaseLV / 3) * cardCount;
		}
	}


	//----------------------------------------------------------------
	// 「半龍王女の指輪」の、「テトラボルテックス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TETRA_BOLTEX) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANRYU_OZYONO_YUBIWA)) > 0) {
			wX += 1 * n_A_BaseLV * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「不死鳥のねこじゃらし　ミュータントドラゴンカードセット」の、「メテオストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_METEOR_STORM) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_MUTANT_DRAGON_CARD)) > 0) {
			wX += 10 * n_A_Weapon_ATKplus * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「不死鳥のねこじゃらし　ボイタタカードセット」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_BOITATA_CARD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「あざといケロケロカッパ」の、「イヌハッカメテオ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_AZATOI_KEROKERO_KAPPA)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_MYAUMYAU) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「きらきらニャンニャンチョーカー」の、「マタタビランス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {

				// アイテム効果なので、「習得スキル」欄で設定しても、「パッシブ持続系」で設定してもＯＫとする
				// （大きい方を採用）

				valueWork = 0;

				valueWork += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
				valueWork += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
				valueWork += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
				valueWork += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
				valueWork += LearnedSkillSearch(SKILL_ID_CHATTERING);
				valueWork += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
				valueWork += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

				valueWork = Math.max(valueWork, UsedSkillSearch(SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI));

				wX += 1 * valueWork * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルパニッシュメントローブ」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_PUNISHMENT_ROBE);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAIN_LIFE) >= 5) {
				wX += 1 * Math.floor(n_A_BaseLV / 6) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「グレースパニッシュメントローブ」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		itemCount = EquipNumSearch(ITEM_ID_GRACE_PUNISHMENT_ROBE);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAIN_LIFE) >= 5) {
				wX += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ぽかぽかタンポポケープ」の、スキル習得による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE) {
		itemCount = EquipNumSearch(ITEM_ID_POKAPOKA_TANPOPO_CAPE);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
				let vartmp = 0;
				vartmp += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
				vartmp += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
				vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
				vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
				vartmp += LearnedSkillSearch(SKILL_ID_CHATTERING);
				vartmp += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
				vartmp += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

				wX += 1 * vartmp * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ぽかぽかタンポポケープ」の、スキル習得による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		itemCount = EquipNumSearch(ITEM_ID_POKAPOKA_TANPOPO_CAPE);
		if (itemCount > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_NYAN_GRASS) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ゾディアック　処女宮のダイアデム」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
				wX += 10 * n_A_HEAD_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　処女宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
				wX += 10 * n_A_SHOES_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　双魚宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (
		(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_COLD_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE)
	) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_SORCERER)) {
				wX += 10 * n_A_SHOES_DEF_PLUS;
			}
		}
	}


	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　封印されたストームナイトカードセット」の、「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_DIAMOND_DUST) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_FUINSARETA_STORM_KNIGHT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「不死鳥のねこじゃらし　封印されたボイタタカードセット」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FUINSARETA_BOITATA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ディア・デ・ムエルトス」の、「エスパ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ESPA) {
		if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
			wX += 5 * LearnedSkillSearch(SKILL_ID_TAMASHINO_SHUKAKU) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ディア・デ・ムエルトス」の、「エスフ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ESFU) {
		if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
			wX += 25 * LearnedSkillSearch(SKILL_ID_TAMASHINO_SHUKAKU) * itemCount;
		}
	}


	//----------------------------------------------------------------
	// 「ゾディアック　特選ドラムケープセット」の、「プラント系スキル」強化
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE)
		|| (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR)
	) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				wX += 5 * n_A_SHOULDER_DEF_PLUS * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「マジックコンプレッション」の、「ファイアーボルト」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_FIRE_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_COLD_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE)) {
		if ((itemCount = EquipNumSearch(ITEM_ID_MAGIC_COMPRESSION)) > 0) {
			wX += 20 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミスティックシンフォニー」の、「サウンドブレンド」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SOUND_BLEND) {
		if (UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY) > 0) {
			wX += 50;
		}
	}

	/**
	 * アークメイジ「クライマックス」による四属性魔法強化
	 */
	const climaxLv = UsedSkillSearch(SKILL_ID_CLIMAX);
	if (n_A_ActiveSkill == SKILL_ID_DESTRACTIVE_HURRICANE) {
		if (climaxLv == 3) {
			wX += 100;
		}
		if (climaxLv == 5) {
			wX += 75;
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_VIOLENT_QUAKE) {
		if (climaxLv == 1) {
			wX -= 50;
		}
		if (climaxLv == 3) {
			wX += 50;
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_ALL_BLOOM) {
		if (climaxLv == 2) {
			wX -= 50;
		}
		if (climaxLv == 3) {
			wX += 100;
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_CRYSTAL_IMPACT) {
		if (battleCalcInfo.parentSkillId == undefined && climaxLv == 3) {
			wX += 50;
		}
		if (battleCalcInfo.parentSkillId == SKILL_ID_CRYSTAL_IMPACT && climaxLv == 4) {
			wX += 1000;
		}
	}


	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、「○○スキルで攻撃時ダメージ上昇」強化
	//----------------------------------------------------------------
	const confBaseLvBy = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY);
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP);
	if (n_A_ActiveSkill != 0) {
		if (confval != 0) {
			if (confBaseLvBy > 0) {
				wX += confval * Math.floor(n_A_BaseLV / confBaseLvBy);
			}
			else {
				wX += confval;
			}
		}
	}


	//----------------------------------------------------------------
	// 戦闘計算情報に保持されているダメージ増幅の適用
	//----------------------------------------------------------------
	wX += battleCalcInfo.dmgAmpRate;


//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等の“魔法”スキル倍率補正　ここまで　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	return wX;
}

/**
 * 魔法判定攻撃に対するスキル倍率の増減を適用する.
 * @param wBMC ダメージ
 * @return 適用後のダメージ
 */
export function ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBMC) {

	var w_MDEF = mobData[14];
	var w_MDEF2 = n_B_MDEF2;
	var wBMC2 = Math.floor(wBMC);
	var wX = 0;
	// 属性場のダメージ追加倍率を適用
	wX = GetElementFieldDamageRatio();
	wBMC2 = ROUNDDOWN(wBMC2 * (100 + wX) / 100);
	// 特性ステータス対応
	// MRES減衰の適用
	wBMC2 = ApplyMresResist(mobData, wBMC2);
	// モンスターのＭＤＥＦを適用
	if(CS.directSubtractionMdef) {
		wBMC2 = Math.floor(wBMC2 - CS.B_Total_MDEF);
	}
	else{
		var w = w_MDEF * 4;
		wBMC2 = Math.floor(wBMC2 * (4000 + w) / (4000 + w * 10) - w_MDEF2);
	}
	if(wBMC2 < 1) wBMC2 = 1;

	// マグヌスエクソシズム、かつ、対象外モンスターの場合、ダメージを０に固定
	if(n_A_ActiveSkill == 104){
		if(mobData[19] != 6 && mobData[18] <90){
			wBMC2=0;
		}
	}

	// ルアフ、かつ、敵がハイド中でない場合、ダメージを０に固定
	else if(n_A_ActiveSkill==34){
		if(attackMethodConfArray[0].GetOptionValue(0) == 0) wBMC2=0;
	}

	// ソウルストライク、かつ、不死属性の場合、ダメージ増加を適用
	if(90 <= mobData[18] && n_A_ActiveSkill == 47) {
		wBMC2 = Math.floor(wBMC2 * (1 + 0.05 * n_A_ActiveSkillLV));
	}


	// 特定のスキルを除いて、レックスエーテルナ効果を適用
	switch (n_A_ActiveSkill) {
	case 583:	// レイオブジェネシス
	case 639:	// 振動残響
		// 上記スキルは、レックスエーテルナ対象外
		break;

	default:
		wBMC2 = ApplyLexAeterna(mobData, wBMC2);
		break;
	}

	// 対プレイヤーエナジーコート耐性を適用
	wBMC2 = ApplyRegistPVPEnergyCoat(mobData, wBMC2);


	// 魔法ダメージ倍率強化を取得
	wX = GetMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);


	wBMC2 = ROUNDDOWN(wBMC2 * (100 + wX) / 100);


	// 冷凍状態での、風属性魔法ダメージ増加の適用
	if(n_B_IJYOU[MOB_CONF_DEBUF_ID_REITO] == 1){
		if(n_A_Weapon_zokusei == 4) wBMC2 = Math.floor(wBMC2 * 1.5);
	}

	// テレキネシスインテンス状態での、特定スキルのダメージ増加の適用
	if(UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) {
		switch (n_A_ActiveSkill) {
		case SKILL_ID_NAPALM_BEAT: // ナパームビート
		case SKILL_ID_SOUL_STRIKE: // ソウルストライク
		case SKILL_ID_NAPALM_VULKAN: // ナパームバルカン
		case SKILL_ID_SOUL_EXPANSION: // ソウルエクスパンション
		case SKILL_ID_SOUL_VULKUN_STRIKE: // ソウルバルカンストライク
			wBMC2 = ROUNDDOWN(wBMC2 * (100 + 40 * UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) / 100);
			break;
		}
	}

	// ホワイトインプリズン状態での、ソウルエクスパンションのダメージ増加の適用
	if(n_A_ActiveSkill == 518){
		var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
		if(mobData[20] == 0 && subnumvalue >= 1) wBMC2 = ROUNDDOWN(wBMC2 * 2);
	}


	// 属性倍率を適用
	wBMC2 = ApplyElementRatio(mobData, wBMC2,n_A_Weapon_zokusei);
	wBMC2 = Math.floor(wBMC2);


	// TODO : 謎補正　スペルフィスト？
	if(n_Enekyori == 0){
		if(n_A_ActiveSkill == 51 || n_A_ActiveSkill == 54 || n_A_ActiveSkill == 56) {
			if (n_A_ActiveSkillLV <= 5) {
				wBMC2 = wBMC2 * (attackMethodConfArray[0].GetOptionValue(1) + n_A_ActiveSkillLV);
			}
			else {
				wBMC2 = wBMC2 * (attackMethodConfArray[0].GetOptionValue(1) + (n_A_ActiveSkillLV * 3 - 10));
			}
		}
	}


	// ストーンスキンによる、魔法ダメージ増加効果の適用
	if(n_B_KYOUKA[7] && n_Enekyori == 2) {
		wBMC2 += Math.floor(wBMC2 * (20 * n_B_KYOUKA[7]) / 100);
	}

	// ダメージカット効果の適用
	wBMC2 = ApplyAttackDamageAmplify(mobData, wBMC2);


	// ロードオブヴァーミリオンの多段ＨＩＴ補正（ＭＤＥＦ１０分の１適用？）
	/*
	if(n_A_ActiveSkill == 127) {
		wBMC2 = Math.floor(wBMC2 / 10);
	}
	*/

	return (wBMC2 >= 0) ? wBMC2 : 0;
 }

/**
 * 魔法判定攻撃に対するスキル倍率の増減を適用する（サブ）（アルカナカード系）
 * @param カードID
 * @return 倍率
 */
export function ApplyMagicalSkillDamageRatioChangeSubArcanaCard(cardid) {
	let vartmp = 0;

	let cardCountArmsRight	 = CardNumSearch(cardid, CARD_REGION_ID_ARMS_RIGHT_ANY);
	let cardCountArmsLeft	 = CardNumSearch(cardid, CARD_REGION_ID_ARMS_LEFT_ANY);
	let cardCountHeadTop	 = CardNumSearch(cardid, CARD_REGION_ID_HEAD_TOP_ANY);
	let cardCountHeadMid	 = CardNumSearch(cardid, CARD_REGION_ID_HEAD_MID_ANY);
	let cardCountShield		 = CardNumSearch(cardid, CARD_REGION_ID_SHIELD_ANY);
	let cardCountBody		 = CardNumSearch(cardid, CARD_REGION_ID_BODY_ANY);
	let cardCountShoulder	 = CardNumSearch(cardid, CARD_REGION_ID_SHOULDER_ANY);
	let cardCountShoes		 = CardNumSearch(cardid, CARD_REGION_ID_SHOES_ANY);
	let cardCountAccessory1	 = CardNumSearch(cardid, CARD_REGION_ID_ACCESSORY_1_ANY);
	let cardCountAccessory2	 = CardNumSearch(cardid, CARD_REGION_ID_ACCESSORY_2_ANY);

	vartmp += 1 * n_A_Weapon_ATKplus * cardCountArmsRight;
	vartmp += 1 * n_A_Weapon2_ATKplus * cardCountArmsLeft;
	vartmp += 1 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
	vartmp += 1 * n_A_SHIELD_DEF_PLUS * cardCountShield;
	vartmp += 1 * n_A_BODY_DEF_PLUS * cardCountBody;
	vartmp += 1 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder;
	vartmp += 1 * n_A_SHOES_DEF_PLUS * cardCountShoes;

	if (n_A_Weapon_ATKplus >= 10)		vartmp += 5 * cardCountArmsRight;
	if (n_A_Weapon2_ATKplus >= 10)		vartmp += 5 * cardCountArmsLeft;
	if (n_A_HEAD_DEF_PLUS >= 10)		vartmp += 5 * cardCountHeadTop;
	if (n_A_SHIELD_DEF_PLUS >= 10)		vartmp += 5 * cardCountShield;
	if (n_A_BODY_DEF_PLUS >= 10)		vartmp += 5 * cardCountBody;
	if (n_A_SHOULDER_DEF_PLUS >= 10)	vartmp += 5 * cardCountShoulder;
	if (n_A_SHOES_DEF_PLUS >= 10)		vartmp += 5 * cardCountShoes;

	return vartmp;
}

/**
 * スキルダメージ倍率強化表示欄の再構築.
 * @param {*} battleCalcInfo 
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 */
export function RebuildActiveSkillRatioInfo(battleCalcInfo, charaData, specData, mobData) {

	var ratioPhysical = 0;
	var ratioMagical = 0;

	if (!battleCalcInfo) {
		battleCalcInfo = new CBattleCalcInfo();
		battleCalcInfo.skillId = n_A_ActiveSkill;
		battleCalcInfo.skillLv = n_A_ActiveSkillLV;
	}

	let ratio = 0;
	try{
		if((g_skillManager.GetSkillType(battleCalcInfo.skillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
			// 物理スキル
			ratio = GetPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);
		} else {
			// 魔法スキル
			ratio = GetMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);
		}
	}catch(e){
		console.log(e);
	}
	let html = ""
	if (ratio != 0){
		html = `スキル強化：<span class="CSSCLS_SKILL_RATIO_${ratio>0?"PLUS":"MINUS"}">${ratio}%</span>`;
	}
	$("#OBJID_SPAN_ACTIVE_SKILL_RATIO_CHANGE_PHYSICAL").html(html);
}

