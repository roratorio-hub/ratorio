/**
 * StAllCalc セクション分割: プレイヤー耐性・種族耐性。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetHigherJobSeriesID, GetLowerJobSeriesID, IsDoramJob, JOB_SERIES_ID_BARD, JOB_SERIES_ID_DANCER,
    JOB_SERIES_ID_HUNTER, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_THIEF
} from "../data/mig.job.h.js";
import { g_confDataNizi, g_objCharaConfCustomDef } from "../runtime/global.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomDef } from "../chara/CCharaConfCustomDef.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "../chara/chara.js";
import { CARD_REGION_ID_HEAD_TOP } from "../runtime/common.js";
import {
    EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_TOP
} from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_RESIST_PLAYER_ALL, ITEM_SP_RESIST_PLAYER_DORAM, ITEM_SP_RESIST_PLAYER_HUMAN, ITEM_SP_RESIST_RACE_ALL,
    ITEM_SP_RESIST_RACE_DEMON, ITEM_SP_RESIST_RACE_DRAGON, ITEM_SP_RESIST_RACE_HUMAN,
    ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER, ITEM_SP_RESIST_RACE_SOLID, ITEM_SP_RESIST_RACE_UNDEAD
} from "../const/EnumItemSpId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_ANSONINO_FUKU, ITEM_ID_AVENGER_BLOODYROAR, ITEM_ID_AVENGER_CLAYMORE, ITEM_ID_AVENGER_FUMASHURIKEN,
    ITEM_ID_AVENGER_GATLINGGUN, ITEM_ID_AVENGER_GRENADEGUN, ITEM_ID_AVENGER_HANDGUN, ITEM_ID_AVENGER_HUNTERBOW,
    ITEM_ID_AVENGER_JAMADHAR, ITEM_ID_AVENGER_LANCE, ITEM_ID_AVENGER_RIFLE, ITEM_ID_AVENGER_SHOTGUN,
    ITEM_ID_AVENGER_TWOHAND_AXE, ITEM_ID_AVENGER_WIZARDSTUFF, ITEM_ID_BARREL_HELM, ITEM_ID_CARDYUINO_HOI,
    ITEM_ID_DAISHIZENNO_GUITAR, ITEM_ID_DAISHIZENNO_ROPE, ITEM_ID_DAKITSUKI_SYAMNEKO, ITEM_ID_EINHERJERNO_YOROI,
    ITEM_ID_FUSHICHONO_RING, ITEM_ID_FUSHOHENO_HOTAI, ITEM_ID_GIGANT_BOOTS, ITEM_ID_GODS_ARMOR,
    ITEM_ID_GUARDIAN_PROCESSOR, ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA, ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO,
    ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI, ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI, ITEM_ID_ILLUSION_LONG_MACE,
    ITEM_ID_ILLUSION_YOKAINO_YARI, ITEM_ID_RING_OF_JUPITER, ITEM_ID_SEINARU_HAKUI, ITEM_ID_SENSHISHANO_MANT,
    ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO, ITEM_ID_TENGUNO_GETA, ITEM_ID_VALKYRIE_KNIFE, ITEM_ID_ZYUNREISHANO_KUTSU,
    ITEM_SET_ID_BOTONO_SCARF_GLASS, ITEM_SET_ID_BOTONO_SCARF_SUNGLASS, ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON,
    ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE, ITEM_SET_ID_GOFUSEKI_PEORTH_GREEVE, ITEM_SET_ID_GOFUSEKI_PEORTH_MANT,
    ITEM_SET_ID_GOFUSEKI_PEORTH_PLATE, ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_BOOSTER,
    ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_ENGINE, ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_UNIT,
    ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS, ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS,
    ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL, ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI,
    ITEM_SET_ID_RIOTCHIP_A_TOLERANCE, ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_PLAYER,
    ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI, ITEM_SET_ID_SHUGOKISHINO_KUBIKAZARI_IMPERIAL_FEATHER,
    ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET, ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_MANT
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_VIT, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB,
    n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon_ATKplus, n_A_card
} from "../runtime/roro-state.js";
import {
    SKILL_ID_DRAGONOLOGY, SKILL_ID_KINGS_GRACE, SKILL_ID_SECRAMENT, SKILL_ID_TENKETSU_KATSU
} from "../skill/skill.dat.js";
import { EquipNumSearchFurubitaHead, ROUNDDOWN } from "../bridge/foot-bridge.js";


export function ApplyPlayerResist() {
    let vartmp = 0, confval = 0, sklLv = 0, itemCount = 0, idx = 0;

//==== プレイヤー耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_PLAYER_ALL; idx <= ITEM_SP_RESIST_PLAYER_ALL; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		if(n_A_BODY_DEF_PLUS >= 6 && (EquipNumSearch(2223) || EquipNumSearch(2224))){
			n_tok[243] += 2;
			if(n_A_BODY_DEF_PLUS >= 8) n_tok[243] += 3;
		}
		if(n_A_SHOULDER_DEF_PLUS >= 6 && (EquipNumSearch(2227) || EquipNumSearch(2228))){
			n_tok[243] += 2;
			if(n_A_SHOULDER_DEF_PLUS >= 8) n_tok[243] += 3;
		}
		if(n_A_SHOES_DEF_PLUS >= 6 && (EquipNumSearch(2229) || EquipNumSearch(2230))){
			n_tok[243] += 2;
			if(n_A_SHOES_DEF_PLUS >= 8) n_tok[243] += 3;
		}
		if(SU_VIT >= 108 && EquipNumSearch(2257)) n_tok[243] += 3;

		//----------------------------------------------------------------
		// 「暴徒のスカーフ　グラスセット」の、素ＡＧＩと素ＶＩＴによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
			n_tok[243] += 2 * ROUNDDOWN((SU_AGI + SU_VIT) / 80) * itemCount;
		}

		//----------------------------------------------------------------
		// 「暴徒のスカーフ　サングラスセット」の、素ＡＧＩと素ＶＩＴによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
			n_tok[243] += 2 * ROUNDDOWN((SU_AGI + SU_VIT) / 80) * itemCount;
		}

		//----------------------------------------------------------------
		// 「守護騎士の首飾り　インペリアルセット」の、素ＡＧＩによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHUGOKISHINO_KUBIKAZARI_IMPERIAL_FEATHER)) > 0) {
			vartmp = 0;

			if (SU_AGI >= 108) vartmp += 2;
			if (SU_AGI >= 120) vartmp += 4;

			n_tok[243] += vartmp * itemCount
		}

		//----------------------------------------------------------------
		// 「巨大樹の若葉　カルデュイの耳セット」の、素ＤＥＸによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI)) > 0) {
			if (SU_DEX >= 108) {
				n_tok[243] += 2 * itemCount;
			}
			if (SU_DEX >= 120) {
				n_tok[243] += 4 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「くわえたハートのエース　ギャンブラーシールセット」の、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL)) > 0) {
			if (SU_LUK >= 108) {
				n_tok[243] += 2 * itemCount;
			}
			if (SU_LUK >= 120) {
				n_tok[243] += 4 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「熾天使の羽毛　熾天使の花冠セット」の、素ＩＮＴによる効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI)) {
			vartmp = 0;

			if (SU_INT >= 108) vartmp += 2;
			if (SU_INT >= 120) vartmp += 4;

			n_tok[243] += vartmp;
		}

		//----------------------------------------------------------------
		// 「巡礼者の靴」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
			if (sklLv = LearnedSkillSearch(SKILL_ID_SECRAMENT)) {
				n_tok[243] += 2 * sklLv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「抱きつきシャムネコ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DAKITSUKI_SYAMNEKO)) > 0) {
			n_tok[243] += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「イリュージョンロングメイス」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_LONG_MACE)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[243] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「リングオブジュピター」の、素ＶＩＴによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSORY_2)) > 0) {
			if (SU_VIT >= 125) {
				n_tok[243] += 3 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ランナウェー・アクセラレータ　Q-PLAYERセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_PLAYER)) > 0) {
			n_tok[243] += 1 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「不死鳥のリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_FUSHICHONO_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_KINGS_GRACE) >= 5) {
				n_tok[243] += 3 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_PLAYER);
		if (confval != 0) {
			n_tok[243] += confval;
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyDoramPlayerResist() {
    let itemCount = 0, idx = 0;

//==== ドラム形プレイヤー耐性＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_PLAYER_DORAM; idx <= ITEM_SP_RESIST_PLAYER_DORAM; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの兜」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_PLAYER_DORAM] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの鎧」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_PLAYER_DORAM] += 7 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの肩飾り」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_PLAYER_DORAM] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの軍靴」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_PLAYER_DORAM] += 5 * itemCount;
			}
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyHumanPlayerResist() {
    let idx = 0;

//==== 人間形プレイヤー耐性＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_PLAYER_HUMAN; idx <= ITEM_SP_RESIST_PLAYER_HUMAN; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyRaceResist() {
    let vartmp = 0, confval = 0, sklLv = 0, itemCount = 0, idx = 0;

//==== 種族耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_RACE_SOLID; idx <= ITEM_SP_RESIST_RACE_DRAGON; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}
		n_tok[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER] += GetRndOptTotalValue(ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER, null, false);
		// n_tok[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER] = GetRndEnchValue(ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER);

		//----------------------------------------------------------------
		// ドラム種族の種族特性
		//----------------------------------------------------------------
		if (IsDoramJob(n_A_JOB)) {
			// TODO: 正確には物理ダメージのみだが、計算機での被弾ダメージ計算は物理だけなので、とりあえず
			n_tok[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER] -= 10;
		}


		if(CardNumSearch(452) && GetLowerJobSeriesID(n_A_JOB)==3){
			n_tok[51] += 30;
			n_tok[56] += 30;
		}

		if(g_confDataNizi[CCharaConfNizi.CONF_ID_PROVIDENCE] && GetHigherJobSeriesID(n_A_JOB) != 13) {
			n_tok[56] += g_confDataNizi[CCharaConfNizi.CONF_ID_PROVIDENCE] * 5;
		}

		// 「ドラゴノロジー」による「竜形モンスターから受けるダメージ耐性UP」
		n_tok[ITEM_SP_RESIST_RACE_DRAGON] += Math.max(LearnedSkillSearch(SKILL_ID_DRAGONOLOGY), UsedSkillSearch(SKILL_ID_DRAGONOLOGY)) * 4;

		for(var i=971;i<=977;i++){
			if(EquipNumSearch(i)){
				n_tok[50] -= 200;
				n_tok[51] -= 200;
				n_tok[52] -= 200;
				n_tok[53] -= 200;
				n_tok[54] -= 200;
				n_tok[55] -= 200;
				n_tok[56] -= 200;
				n_tok[58] -= 200;
				n_tok[59] -= 200;
			}
		}
		if(n_A_SHOULDER_DEF_PLUS >= 7 && EquipNumSearch(1110)) n_tok[57] += 3;
		if(n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1107)) n_tok[57] += 3;
		if(n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(1104)) n_tok[57] += 2;
		if(n_A_SHIELD_DEF_PLUS >= 8 && EquipNumSearch(1446)) n_tok[54] += 20;
		if(n_A_SHOULDER_DEF_PLUS >= 1){
			if(EquipNumSearch(2205)) n_tok[50] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1509)) n_tok[52] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1511)) n_tok[58] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1513)) n_tok[56] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1515)) n_tok[55] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1517)) n_tok[51] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1519)) n_tok[53] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1521)) n_tok[57] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(1523)) n_tok[59] += n_A_SHOULDER_DEF_PLUS;
			if(EquipNumSearch(2132)) n_tok[54] += n_A_SHOULDER_DEF_PLUS;
		}
		if(EquipNumSearch(1568)){
			for(var i=0;i<=9;i++) n_tok[50+i] -= 10;
			n_tok[57] += 10;
		}
		if(EquipNumSearch(1573)){
			for(var i=0;i<=9;i++) n_tok[50+i] -= 10;
			n_tok[51] += 10;
			n_tok[56] += 10;
		}
		if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[CARD_REGION_ID_HEAD_TOP]==626) n_tok[54] += 5;
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1814)) n_tok[52] += 5;
		if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1823)) n_tok[57] += (n_A_Weapon_ATKplus - 5);
		if(n_A_BODY_DEF_PLUS >= 3 && EquipNumSearch(1913)) n_tok[51] += Math.floor(n_A_BODY_DEF_PLUS / 3) * 5;
		if(n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(1942)) n_tok[55] += 5;
		if(n_A_HEAD_DEF_PLUS >= 6 && 1954 <= n_A_Equip[EQUIP_REGION_ID_HEAD_TOP] && n_A_Equip[EQUIP_REGION_ID_HEAD_TOP] <= 1963) n_tok[50 + n_A_Equip[EQUIP_REGION_ID_HEAD_TOP] - 1954] += 5;
		if(n_A_HEAD_DEF_PLUS >= 7){
			if(EquipNumSearch(2073) || EquipNumSearch(2074) || EquipNumSearch(2075) || EquipNumSearch(2076)) n_tok[57] += 5;
		}
		if(2212 <= n_A_Equip[EQUIP_REGION_ID_BODY] && n_A_Equip[EQUIP_REGION_ID_BODY] <= 2221) n_tok[50 + (n_A_Equip[EQUIP_REGION_ID_BODY] - 2212)] += n_A_BODY_DEF_PLUS;
		if(EquipNumSearch(2289)) n_tok[54] += n_A_HEAD_DEF_PLUS;

		if(EquipNumSearch(1879)){
			n_tok[ITEM_SP_RESIST_RACE_ALL] += 30;
		}

		//----------------------------------------------------------------
		// 「戦死者のマント」の、精錬値２ごとの、人間種族耐性
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)){
			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 2);
		}

		//----------------------------------------------------------------
		// 「古びた系頭装備」の、過剰精錬による、人間種族耐性
		//----------------------------------------------------------------
		if(EquipNumSearchFurubitaHead()) {
			if(n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5;
			if(n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
		}

		//----------------------------------------------------------------
		// 「A-Tolerance　ライオットチップセット」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_RIOTCHIP_A_TOLERANCE)) {
			n_tok[ITEM_SP_RESIST_RACE_SOLID] += n_A_HEAD_DEF_PLUS;
			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += n_A_HEAD_DEF_PLUS;
		}

		//----------------------------------------------------------------
		// 「カルデュイの法衣」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearchMIG(ITEM_ID_CARDYUINO_HOI)){
			if (n_A_BODY_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
			if (n_A_BODY_DEF_PLUS >= 8) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
			if (n_A_BODY_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
		}

		//----------------------------------------------------------------
		// 「ヴァルキリーナイフ」の、職業による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE)) {
			switch (GetLowerJobSeriesID(n_A_JOB)) {

			// ノービス系
			case JOB_SERIES_ID_NOVICE:
				if (n_A_Weapon_ATKplus >= 7) {
					n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 10 * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
				}
				break;

			// マジシャン系
			case JOB_SERIES_ID_MAGICIAN:
				if (n_A_Weapon_ATKplus >= 7) {
					n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 10 * EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE);
				}
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
		// 「アヴェンジャー系装備」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_CLAYMORE)
			|| EquipNumSearch(ITEM_ID_AVENGER_LANCE)
			|| EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)
			|| EquipNumSearch(ITEM_ID_AVENGER_BLOODYROAR)
			|| EquipNumSearch(ITEM_ID_AVENGER_JAMADHAR)
			|| EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)
			|| EquipNumSearch(ITEM_ID_AVENGER_WIZARDSTUFF)
			|| EquipNumSearch(ITEM_ID_AVENGER_HANDGUN)
			|| EquipNumSearch(ITEM_ID_AVENGER_RIFLE)
			|| EquipNumSearch(ITEM_ID_AVENGER_GATLINGGUN)
			|| EquipNumSearch(ITEM_ID_AVENGER_SHOTGUN)
			|| EquipNumSearch(ITEM_ID_AVENGER_GRENADEGUN)
			|| EquipNumSearch(ITEM_ID_AVENGER_FUMASHURIKEN)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 10;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 10;
		}

		//----------------------------------------------------------------
		// 「サバイバルオーブ　サークレットセット」の、装備効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET)) {
			if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 4;
			if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 4;
		}

		//----------------------------------------------------------------
		// 「サバイバルオーブ　マントセット」の、装備効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_MANT)) {
			if (n_A_SHOULDER_DEF_PLUS >= 5) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
			if (n_A_SHOULDER_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
		}

		//----------------------------------------------------------------
		// 「ギガントブーツ」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_GIGANT_BOOTS)) {
			if (n_A_SHOES_DEF_PLUS >= 5) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
			if (n_A_SHOES_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
		}

		//----------------------------------------------------------------
		// 「ギガントブーツ　アックスセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE)) {
			if (n_A_SHOES_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 30;
		}

		//----------------------------------------------------------------
		// 「アインヘリヤルの鎧」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_EINHERJERNO_YOROI)) {
			if (n_A_BODY_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
			if (n_A_BODY_DEF_PLUS >= 8) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
			if (n_A_BODY_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2;
		}

		//----------------------------------------------------------------
		// 「ガーディアンプロセッサ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_PROCESSOR)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ガーディアンプロセッサ　ガーディアンユニットセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_UNIT)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ガーディアンプロセッサ　ガーディアンエンジンセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_ENGINE)) > 0) {
			vartmp = 0;

			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 1;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ガーディアンプロセッサ　ガーディアンブースターセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_BOOSTER)) > 0) {
			vartmp = 0;

			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 1;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「死霊魔術師のニット帽」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 3;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 5;

			n_tok[ITEM_SP_RESIST_RACE_UNDEAD] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「バレルヘルム」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_BARREL_HELM)){
			if (n_A_HEAD_DEF_PLUS >= 8) n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 10;
		}

		//----------------------------------------------------------------
		// 「業風石　ペオースプレートセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_PEORTH_PLATE)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 2;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「業風石　ペオースマントセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_PEORTH_MANT)) > 0) {
			vartmp = 0;

			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 1;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「業風石　ペオースグリーブセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_PEORTH_GREEVE)) > 0) {
			vartmp = 0;

			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1;
			if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 1;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「セリーヌのブローチ　リボンセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;

			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「聖なる白衣」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_SEINARU_HAKUI) > 0) {
			if (n_A_BODY_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 7;
			}
		}

		//----------------------------------------------------------------
		// 「負傷兵の包帯」の、過剰精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_FUSHOHENO_HOTAI)) {
			n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 2 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 3);
		}

		//----------------------------------------------------------------
		// 「天狗の下駄」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
			if (sklLv = LearnedSkillSearch(SKILL_ID_TENKETSU_KATSU)) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 1 * sklLv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ゴッズアーマー」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_GODS_ARMOR)){
			n_tok[ITEM_SP_RESIST_RACE_UNDEAD] += 1 * n_A_BODY_DEF_PLUS;
		}

		//----------------------------------------------------------------
		// 「灰羽のブーツ　黒羽スーツセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 8 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 4 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「灰羽のブーツ　白羽スーツセット」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 8 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 4 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「アンソニの服」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ANSONINO_FUKU)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 7 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「大自然のギター」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「大自然のロープ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョン妖怪の槍」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_YOKAINO_YARI)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_RACE_UNDEAD] += 20 * itemCount;
				n_tok[ITEM_SP_RESIST_RACE_DEMON] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの兜」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの鎧」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 7 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの肩飾り」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンゴヴニュの軍靴」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_RACE_HUMAN] += 5 * itemCount;
			}
		}


		if (n_tok[ITEM_SP_RESIST_RACE_ALL] != 0) {
			for (i = ITEM_SP_RESIST_RACE_SOLID; i <= ITEM_SP_RESIST_RACE_DRAGON; i++) {
				n_tok[i] += n_tok[ITEM_SP_RESIST_RACE_ALL];
			}
			n_tok[ITEM_SP_RESIST_PLAYER_DORAM] += n_tok[ITEM_SP_RESIST_RACE_ALL];
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_RACE);
		if (confval != 0) {
			for (i = ITEM_SP_RESIST_RACE_SOLID; i <= ITEM_SP_RESIST_RACE_DRAGON; i++) {
				n_tok[i] += confval;
			}
			n_tok[ITEM_SP_RESIST_PLAYER_DORAM] += confval;
		}

}
