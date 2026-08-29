/**
 * StAllCalc セクション分割: 魔法攻撃で与えるダメージ＋○○％（対プレイヤー・対モンスター形）。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import {
    GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_ACOLYTE, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_NOVICE,
    JOB_SERIES_ID_SUMMONER
} from "../data/mig.job.h.js";
import { g_objCharaConfCustomAtk } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "../chara/chara.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY } from "../const/EnumEquipRegionId.js";
import { ITEM_KIND_BOOK, ITEM_KIND_STUFF, ITEM_KIND_STUFF2HAND } from "../const/EnumItemKind.js";
import {
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM,
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD
} from "../const/EnumItemSpId.js";
import { JOB_ID_ARCBISHOP, JOB_ID_SHURA } from "../const/EnumJobId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AMAZING_GRACE, ITEM_ID_AVENGER_WIZARDSTUFF, ITEM_ID_AZATOI_KEROKERO_KAPPA, ITEM_ID_BLUTO_ARCWAND,
    ITEM_ID_ELEMENTAL_POSSESSION, ITEM_ID_FOUR_OF_A_KIND, ITEM_ID_GRACE_PUNISHMENT_ROBE,
    ITEM_ID_IMPERIAL_PUNISHMENT_ROBE, ITEM_ID_IPPEKI_TSUE, ITEM_ID_KINGS_GUARD, ITEM_ID_LOUD_PARK, ITEM_ID_MUSO_TSUE,
    ITEM_ID_RYORAN_TSUE, ITEM_ID_SHINENNO_DRESS, ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO,
    ITEM_ID_TONBOGA_TOMATTA_KIROI_NEKOZYARASHI, ITEM_ID_YUSHANO_BROACH, ITEM_ID_ZINRAI_TSUE,
    ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE,
    ITEM_SET_ID_KYODAIZYUNO_WAKABA_TENDORIRURION_CARD, ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK,
    ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1,
    ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_Weapon2_ATKplus,
    n_A_WeaponType, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_CLEARANCE, SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_MELANCHOLY, SKILL_ID_NYAN_GRASS,
    SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_TETRA_BOLTEX
} from "../skill/skill.dat.js";


export function ApplyMagicalDamageUpVsPlayer() {
    let vartmp = 0, confval = 0, itemCountRight = 0, itemCountLeft = 0, idx = 0;

//==== 魔法攻撃時、プレイヤーに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		if(n_A_WeaponType == 9 || n_A_WeaponType == 12){
			if(EquipNumSearch(2500)) n_tok[242] += 2 * n_A_Weapon_ATKplus;
		}

		//----------------------------------------------------------------
		// 「巨大樹の葉　テンドリルリオンカードセット」の、装備効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_KYODAIZYUNO_WAKABA_TENDORIRURION_CARD)) {
			if ((n_A_WeaponType == ITEM_KIND_BOOK)
				|| (n_A_WeaponType == ITEM_KIND_STUFF)
				|| (n_A_WeaponType == ITEM_KIND_STUFF2HAND)) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL] += 2 * n_A_Weapon_ATKplus;
			}
		}

		//----------------------------------------------------------------
		// 「ブルートアークワンド」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 20;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 10;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 20;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 10;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「トンボがとまった黄色い猫じゃらし」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_KIROI_NEKOZYARASHI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_TONBOGA_TOMATTA_KIROI_NEKOZYARASHI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 15;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 20;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 15;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 20;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_DAMAGE_UP_PLAYER);
		if (confval != 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL] += confval;
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyMagicalDamageUpVsDoramPlayer() {
    let idx = 0;

//==== 魔法攻撃時、ドラム形プレイヤーに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyMagicalDamageUpVsHumanPlayer() {
    let idx = 0;

//==== 魔法攻撃時、人間形プレイヤーに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyMagicalDamageUpVsMonsterShape() {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0, i = 0;

//==== 魔法攻撃時、△△形モンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(EquipNumSearch(1083)){
			if(n_A_Weapon_ATKplus >= 5) n_tok[177] += 5;
			if(n_A_Weapon_ATKplus >= 7) n_tok[177] += 5;
			if(n_A_Weapon_ATKplus >= 7){
				if(n_A_Weapon_ATKplus <= 10){
					n_tok[177] += 2 * (n_A_Weapon_ATKplus - 5);
				}else{
					n_tok[177] += 10;
				}
			}
		}
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1771)) n_tok[177] += 5;
		if(n_A_SHIELD_DEF_PLUS >= 8 && EquipNumSearch(1446)) n_tok[174] += 4;
		if(n_A_BODY_DEF_PLUS >= 6 && EquipNumSearch(1901)) n_tok[172] += n_A_BODY_DEF_PLUS - 5;
		if(n_A_BODY_DEF_PLUS >= 6 && 1930 <= n_A_Equip[EQUIP_REGION_ID_BODY] && n_A_Equip[EQUIP_REGION_ID_BODY] <= 1939){
			var w = 170 + (n_A_Equip[EQUIP_REGION_ID_BODY] - 1930);
			n_tok[w] += n_A_BODY_DEF_PLUS - 5;
		}

		//----------------------------------------------------------------
		// 「迅雷杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_ZINRAI_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「無双杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_MUSO_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL] += 15;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーウィザードスタッフ」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_WIZARDSTUFF)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN] += 10;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN] += 10;

			// 破滅Ｌｖ１
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN] += 2 * (n_A_Weapon_ATKplus - 5);
			}
		}

		//----------------------------------------------------------------
		// 「裁きの靴　ホーリーステッキセット」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD] += 30;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON] += 30;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD] += 20;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON] += 20;
			}
		}

		//----------------------------------------------------------------
		// 「一碧杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_IPPEKI_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID] += 15;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON] += 15;
			}
		}


		//----------------------------------------------------------------
		// 「死霊魔術師のニット帽」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 10;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「深淵のドレス」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINENNO_DRESS)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 5) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「悪魔崇拝者の靴　堕天司祭の闇光外套　古代樹の杖セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7) vartmp += 20;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「猟乱杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_RYORAN_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT] += 15;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 15;
			}
		}


		//----------------------------------------------------------------
		// 「キングスガード」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KINGS_GUARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「サバイバルシューズ　サバイバルロッドセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1)) > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN] += 20 * itemCount;
			}
		}
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1)) > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN] += 20 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「勇者のブローチ」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP) || IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 5 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「ソロモンのペンダント　エンチャント増幅セット」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU)) > 0) {
			switch (GetLowerJobSeriesID(n_A_JOB)) {
			case JOB_SERIES_ID_NOVICE:
			case JOB_SERIES_ID_MAGICIAN:
			case JOB_SERIES_ID_ACOLYTE:
			case JOB_SERIES_ID_SUMMONER:
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 10 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「あざといケロケロカッパ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_AZATOI_KEROKERO_KAPPA)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 8 * LearnedSkillSearch(SKILL_ID_NYAN_GRASS) * itemCount;
		}


		//----------------------------------------------------------------
		// 「インペリアルパニッシュメントローブ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_PUNISHMENT_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 5 * LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースパニッシュメントローブ」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_PUNISHMENT_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 14 * LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) * itemCount;
		}

		//----------------------------------------------------------------
		// 「フォー・オブ・ア・カインド」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FOUR_OF_A_KIND)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 7 * LearnedSkillSearch(SKILL_ID_TETRA_BOLTEX) * itemCount;
		}

		//----------------------------------------------------------------
		// 「エレメンタルポゼッション」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ELEMENTAL_POSSESSION)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 14 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ラウドパーク」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_LOUD_PARK)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 14 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}

		//----------------------------------------------------------------
		// 「アメイジング・グレイス」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_AMAZING_GRACE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] += 14 * LearnedSkillSearch(SKILL_ID_CLEARANCE) * itemCount;
		}

		if(CardNumSearch(895)){
			n_tok[177] -= 50;
			n_tok[178] -= 50;
		}

		if(n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL] != 0){
			for (i = ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID; i <= ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON; i++) {
				n_tok[i] += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL];
			}
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM] += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL];
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_RACE);
		if (confval != 0) {
			for (i = ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID; i <= ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON; i++) {
				n_tok[i] += confval;
			}
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM] += confval;
		}


		// TODO: 四次対応
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}


}
