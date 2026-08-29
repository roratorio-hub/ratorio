/**
 * StAllCalc セクション分割: 物理攻撃で与えるダメージ＋○○％（対プレイヤー・対モンスター形）。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetLowerJobSeriesID, IsDoramJob, IsSameJobClass, JOB_SERIES_ID_ACOLYTE, JOB_SERIES_ID_ARCHER,
    JOB_SERIES_ID_GUNSLINGER, JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_SUMMONER,
    JOB_SERIES_ID_SWORDMAN, JOB_SERIES_ID_TAEGKUON
} from "../data/mig.job.h.js";
import { g_objCharaConfCustomAtk } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_A_Arrow, n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import {
    ARROW_ID_CURSE_ARROW, ARROW_ID_FLASH_ARROW, ARROW_ID_SEINARU_YA, ARROW_ID_SILENCE_ARROW, ARROW_ID_SLEEP_ARROW,
    ARROW_ID_YA
} from "../equip/arrow.dat.js";
import { CardNumSearch, EquipNumSearch } from "../chara/chara.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY } from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL, ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM,
    ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD
} from "../const/EnumItemSpId.js";
import {
    JOB_ID_ARCBISHOP, JOB_ID_GENETIC, JOB_ID_MECHANIC, JOB_ID_ROYALGUARD, JOB_ID_RUNEKNIGHT, JOB_ID_SHURA
} from "../const/EnumJobId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_ASSAULT_SUIT, ITEM_ID_AVENGER_BLOODYROAR, ITEM_ID_AVENGER_CLAYMORE, ITEM_ID_AVENGER_FUMASHURIKEN,
    ITEM_ID_AVENGER_GATLINGGUN, ITEM_ID_AVENGER_GRENADEGUN, ITEM_ID_AVENGER_HANDGUN, ITEM_ID_AVENGER_HUNTERBOW,
    ITEM_ID_AVENGER_JAMADHAR, ITEM_ID_AVENGER_LANCE, ITEM_ID_AVENGER_RIFLE, ITEM_ID_AVENGER_SHOTGUN,
    ITEM_ID_AVENGER_TWOHAND_AXE, ITEM_ID_BLUTO_CLEAVER, ITEM_ID_BLUTO_DUMASCUS, ITEM_ID_BLUTO_FUMASHURIKEN,
    ITEM_ID_BLUTO_GATLINGGUN, ITEM_ID_BLUTO_GRENADEGUN, ITEM_ID_BLUTO_GUITAR, ITEM_ID_BLUTO_HANDGUN,
    ITEM_ID_BLUTO_HUNTER_BOW, ITEM_ID_BLUTO_KATAR, ITEM_ID_BLUTO_MORNINGSTAR, ITEM_ID_BLUTO_RARIET,
    ITEM_ID_BLUTO_RIFLE, ITEM_ID_BLUTO_SHOTGUN, ITEM_ID_BLUTO_SPEAR, ITEM_ID_DARK_TRIAD, ITEM_ID_DEATH_BRINGER,
    ITEM_ID_ILLUSION_HUNTER_BOW, ITEM_ID_IPPEKI_KEN, ITEM_ID_IPPEKI_TSUCHI, ITEM_ID_IPPEKI_YARI, ITEM_ID_IPPEKI_YUMI,
    ITEM_ID_IPPEKI_ZYU, ITEM_ID_KINGS_GUARD, ITEM_ID_KIROI_NEKOZYARASHINO_MOKEI, ITEM_ID_KOKI, ITEM_ID_MUSO_KEN,
    ITEM_ID_MUSO_TSUCHI, ITEM_ID_MUSO_YARI, ITEM_ID_MUSO_YUMI, ITEM_ID_MUSO_ZYU, ITEM_ID_PARACELSUS_COAT,
    ITEM_ID_PLATINUM_ARBITRATOR, ITEM_ID_RYORAN_KEN, ITEM_ID_RYORAN_TSUCHI, ITEM_ID_RYORAN_YARI, ITEM_ID_RYORAN_YUMI,
    ITEM_ID_RYORAN_ZYU, ITEM_ID_SHINENNO_DRESS, ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO, ITEM_ID_YUSHANO_BROACH,
    ITEM_ID_ZINRAI_KEN, ITEM_ID_ZINRAI_TSUCHI, ITEM_ID_ZINRAI_YARI, ITEM_ID_ZINRAI_YUMI, ITEM_ID_ZINRAI_ZYU,
    ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI, ITEM_SET_ID_GOFUSEKI_GERADRIA
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_COUNTER_SLASH, SKILL_ID_CRAZY_WEED, SKILL_ID_DRAGONOLOGY, SKILL_ID_PINGPOINT_ATTACK,
    SKILL_ID_RANGER_MAIN, SKILL_ID_SHURASHINDAN, SKILL_ID_TRIANGLE_SHOT
} from "../skill/skill.dat.js";


export function ApplyPhysicalDamageUpVsPlayer() {
    let vartmp = 0, confval = 0, itemCountRight = 0, itemCountLeft = 0, idx = 0;

//==== 物理攻撃時、プレイヤーに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「黄色い猫じゃらしの模型」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_KIROI_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_KIROI_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 7) vartmp += 20;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 30;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 7) vartmp += 20;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 30;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートダマスカス」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートスピア」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートクリーヴァー」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートモーニングスター」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートハンドガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートライフル」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートガトリングガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートショットガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートグレネードガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートハンターボウ」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートギター」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートラリエット」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルート風魔手裏剣」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートカタール」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			vartmp = 0;
			if (n_A_Weapon_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountRight;

			vartmp = 0;
			if (n_A_Weapon2_ATKplus >= 8) vartmp += 35;
			if (n_A_Weapon2_ATKplus >= 9) vartmp += 20;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += vartmp * itemCountLeft;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_DAMAGE_UP_PLAYER);
		if (confval != 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL] += confval;
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyPhysicalDamageUpVsDoramPlayer() {
    let idx = 0;

//==== 物理攻撃時、ドラム形プレイヤーに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 人間種族の種族特性
		//----------------------------------------------------------------
		if (!IsDoramJob(n_A_JOB)) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM] += 10;
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyPhysicalDamageUpVsHumanPlayer() {
    let idx = 0;

//==== 物理攻撃時、人間形プレイヤーに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyPhysicalDamageUpVsMonsterShape() {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0, i = 0;

//==== 物理攻撃時、△△形モンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if (n_A_Arrow == ARROW_ID_SEINARU_YA) {
			n_tok[36] += 5;
		}

		// 「ドラゴノロジー」による「竜形モンスターへの物理攻撃力UP」
		// 2025-03-29 SIAさんによる実測確認済み
		n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON] += Math.max(LearnedSkillSearch(SKILL_ID_DRAGONOLOGY), UsedSkillSearch(SKILL_ID_DRAGONOLOGY)) * 4;

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
		case 1076:
		case 1077:
			if(n_A_Weapon2_ATKplus >= 5) n_tok[37] += 20;
			if(n_A_Weapon2_ATKplus >= 7) n_tok[37] += 20;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1076:
		case 1077:
		case 1086:
		case 1088:
		case 1100:
			if(n_A_Weapon_ATKplus >= 5) n_tok[37] += 20;
			if(n_A_Weapon_ATKplus >= 7) n_tok[37] += 20;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1081:
		case 1096:
		case 1097:
		case 1092:
		case 1093:
		case 1098:
			if(n_A_Weapon_ATKplus >= 5) n_tok[37] += 30;
			if(n_A_Weapon_ATKplus >= 7) n_tok[37] += 30;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1080:
		case 1082:
		case 1087:
		case 1090:
		case 1091:
			if(n_A_Weapon_ATKplus >= 5) n_tok[37] += 20;
			if(n_A_Weapon_ATKplus >= 7) n_tok[37] += 15;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1095:
		case 1094:
			if(n_A_Weapon_ATKplus >= 5) n_tok[37] += 25;
			if(n_A_Weapon_ATKplus >= 7) n_tok[37] += 20;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1089:
		case 1099:
		case 1101:
		case 1102:
			if(n_A_Weapon_ATKplus >= 5) n_tok[37] += 15;
			if(n_A_Weapon_ATKplus >= 7) n_tok[37] += 5;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1103:
			if(n_A_Weapon_ATKplus >= 5) n_tok[37] += 10;
			if(n_A_Weapon_ATKplus >= 7) n_tok[37] += 5;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1076:
		case 1077:
		case 1081:
		case 1082:
		case 1086:
		case 1088:
		case 1089:
		case 1090:
		case 1091:
		case 1092:
		case 1093:
		case 1094:
		case 1096:
		case 1097:
		case 1099:
		case 1100:
		case 1101:
		case 1102:
		case 1103:
			if(n_A_Weapon_ATKplus == 7) n_tok[37] += 9;
			if(n_A_Weapon_ATKplus == 8) n_tok[37] += 16;
			if(n_A_Weapon_ATKplus == 9) n_tok[37] += 25;
			if(n_A_Weapon_ATKplus >= 10) n_tok[37] += 36;
		}
		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1080:
		case 1087:
		case 1098:
			if(n_A_Weapon_ATKplus == 7) n_tok[37] += 16;
			if(n_A_Weapon_ATKplus == 8) n_tok[37] += 25;
			if(n_A_Weapon_ATKplus == 9) n_tok[37] += 36;
			if(n_A_Weapon_ATKplus >= 10) n_tok[37] += 49;
		}

		if(EquipNumSearch(1643) && CardNumSearch(20)){
			if(n_A_Arrow == ARROW_ID_CURSE_ARROW) n_tok[37] += 2 * n_A_Weapon_ATKplus;
			if(n_A_Arrow == ARROW_ID_SILENCE_ARROW) n_tok[32] += 2 * n_A_Weapon_ATKplus;
			if(n_A_Arrow == ARROW_ID_SLEEP_ARROW) n_tok[34] += 2 * n_A_Weapon_ATKplus;
			if(n_A_Arrow == ARROW_ID_FLASH_ARROW) n_tok[33] += 2 * n_A_Weapon_ATKplus;
		}
		if(n_A_PassSkill7[48]){
			n_tok[36] += 10;
			n_tok[176] += 10;
		}
		if(n_A_BODY_DEF_PLUS >= 6 && EquipNumSearch(1901)) n_tok[32] += n_A_BODY_DEF_PLUS - 5;
		if(n_A_BODY_DEF_PLUS >= 6 && 1930 <= n_A_Equip[EQUIP_REGION_ID_BODY] && n_A_Equip[EQUIP_REGION_ID_BODY] <= 1939){
			var w = 30 + (n_A_Equip[EQUIP_REGION_ID_BODY] - 1930);
			n_tok[w] += n_A_BODY_DEF_PLUS - 5;
		}
		if(EquipNumSearch(2117)) n_tok[37] += n_A_SHOES_DEF_PLUS;

		//----------------------------------------------------------------
		// 「迅雷剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_ZINRAI_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_ZINRAI_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 15;
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
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「迅雷弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ZINRAI_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += 15;
		}


		//----------------------------------------------------------------
		// 「無双剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_MUSO_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_MUSO_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 15;
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
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「無双弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_MUSO_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 15;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT] += 15;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャークレイモア」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_CLAYMORE)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 25;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーランス」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_LANCE)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 30;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 30;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーツーハンドアックス」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 15;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーブラッディロア」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_BLOODYROAR)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 15;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャージャマダハル」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_JAMADHAR)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 15;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 10;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーハンターボウ」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーハンドガン」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_HANDGUN)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 20;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーライフル」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_RIFLE)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 35;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 35;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーガトリングガン」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_GATLINGGUN)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 25;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 25;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーショットガン」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_SHOTGUN)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 45;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 45;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーグレネードガン」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_GRENADEGUN)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 30;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 30;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャー風魔手裏剣」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_FUMASHURIKEN)) {
			if (n_A_Weapon_ATKplus >= 5) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 30;
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 30;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャークレイモア」の、「虐殺Ｌｖ２」による効果
		// 「アヴェンジャーツーハンドアックス」の、「虐殺Ｌｖ２」による効果
		// 「アヴェンジャー風魔手裏剣」の、「虐殺Ｌｖ２」による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_CLAYMORE)
			|| EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)
			|| EquipNumSearch(ITEM_ID_AVENGER_FUMASHURIKEN)) {
			if(n_A_Weapon_ATKplus == 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 16;
			if(n_A_Weapon_ATKplus == 8) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 25;
			if(n_A_Weapon_ATKplus == 9) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 36;
			if(n_A_Weapon_ATKplus >= 10) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 49;
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーランス」の、「虐殺Ｌｖ１」による効果
		// 「アヴェンジャーブラッディロア」の、「虐殺Ｌｖ１」による効果
		// 「アヴェンジャージャマダハル」の、「虐殺Ｌｖ１」による効果
		// 「アヴェンジャーハンターボウ」の、「虐殺Ｌｖ１」による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_LANCE)
			|| EquipNumSearch(ITEM_ID_AVENGER_BLOODYROAR)
			|| EquipNumSearch(ITEM_ID_AVENGER_JAMADHAR)
			|| EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
			if(n_A_Weapon_ATKplus == 7) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 9;
			if(n_A_Weapon_ATKplus == 8) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 16;
			if(n_A_Weapon_ATKplus == 9) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 25;
			if(n_A_Weapon_ATKplus >= 10) n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN] += 36;
		}


		//----------------------------------------------------------------
		// 「一碧剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_IPPEKI_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_IPPEKI_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 15;
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
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「一碧弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_IPPEKI_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID] += 15;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += 15;
		}


		//----------------------------------------------------------------
		// 「死霊魔術師のニット帽」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 10;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD] += vartmp * itemCount;
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

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += vartmp * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「深淵のドレス」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINENNO_DRESS)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 5) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD] += vartmp * itemCount;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「猟乱剣」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_RYORAN_KEN) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 15;
			}
		}
		if (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_RYORAN_KEN) {
			if (n_A_Weapon2_ATKplus >= 7) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 10;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 15;
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
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 10;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 15;
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「猟乱弓」の、矢装備による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_RYORAN_YUMI) > 0 && n_A_Arrow == ARROW_ID_YA) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT] += 15;
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER] += 15;
		}


		//----------------------------------------------------------------
		// 「キングスガード」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KINGS_GUARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD] += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「勇者のブローチ」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT) || IsSameJobClass(JOB_ID_ROYALGUARD)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「勇者のブローチ」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP) || IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「勇者のブローチ」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
			if (IsSameJobClass(JOB_ID_MECHANIC) || IsSameJobClass(JOB_ID_GENETIC)) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンハンターボウ」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_HUNTER_BOW)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL] += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「クリスタルブレイドネックレス　エンチャント強撃セット」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI)) > 0) {
			switch (GetLowerJobSeriesID(n_A_JOB)) {
			case JOB_SERIES_ID_NOVICE:
			case JOB_SERIES_ID_SWORDMAN:
			case JOB_SERIES_ID_ARCHER:
			case JOB_SERIES_ID_ACOLYTE:
			case JOB_SERIES_ID_MERCHANT:
			case JOB_SERIES_ID_TAEGKUON:
			case JOB_SERIES_ID_GUNSLINGER:
			case JOB_SERIES_ID_SUMMONER:
				n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「パラケルススコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_COAT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 7 * LearnedSkillSearch(SKILL_ID_CRAZY_WEED) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ダークトライアド」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DARK_TRIAD)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 7 * LearnedSkillSearch(SKILL_ID_TRIANGLE_SHOT) * itemCount;
		}

		//----------------------------------------------------------------
		// 「光輝」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KOKI)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 7 * LearnedSkillSearch(SKILL_ID_SHURASHINDAN) * itemCount;
		}

		//----------------------------------------------------------------
		// 「アサルトスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ASSAULT_SUIT)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 7 * LearnedSkillSearch(SKILL_ID_RANGER_MAIN) * itemCount;
		}

		//----------------------------------------------------------------
		// 「デスブリンガー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DEATH_BRINGER)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 7 * LearnedSkillSearch(SKILL_ID_COUNTER_SLASH) * itemCount;
		}

		//----------------------------------------------------------------
		// 「プラチナムアビトレイター」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_PLATINUM_ARBITRATOR)) > 0) {
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] += 14 * LearnedSkillSearch(SKILL_ID_PINGPOINT_ATTACK) * itemCount;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_RACE);
		if (confval != 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON; i++) {
				n_tok[i] += confval;
			}
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM] += confval;
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}
		for (idx = ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}


		if (n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL] != 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON; i++) {
				n_tok[i] += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL];
			}
			n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM] += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL];
		}


}
