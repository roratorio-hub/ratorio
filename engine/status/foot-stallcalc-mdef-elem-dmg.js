/**
 * StAllCalc セクション分割: MDEF無視・属性モンスター被ダメージ軽減・属性物理ダメージ増加。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import {
    GetLowerJobSeriesID, JOB_SERIES_ID_ACOLYTE, JOB_SERIES_ID_MAGICIAN, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_SUMMONER
} from "../data/mig.job.h.js";
import { g_objCharaConfCustomAtk, g_objCharaConfCustomDef } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfCustomDef } from "../chara/CCharaConfCustomDef.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "../chara/chara.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_CRITICAL_DAMAGE_UP, ITEM_SP_IGNORE_MDEF_ALL, ITEM_SP_IGNORE_MDEF_BOSS, ITEM_SP_IGNORE_MDEF_RACE_ALL,
    ITEM_SP_IGNORE_MDEF_RACE_DRAGON, ITEM_SP_IGNORE_MDEF_RACE_HUMAN, ITEM_SP_IGNORE_MDEF_RACE_PLANT,
    ITEM_SP_IGNORE_MDEF_RACE_SOLID, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY,
    ITEM_SP_RESIST_MONSTER_ELM_UNDEAD, ITEM_SP_RESIST_MONSTER_ELM_VANITY
} from "../const/EnumItemSpId.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_AMANOZYAKUNO_KIMEN, ITEM_ID_AVENGER_WIZARDSTUFF, ITEM_ID_BLUTO_ARCWAND, ITEM_ID_ENRAIMAZYONO_OTSUE,
    ITEM_ID_FURUBITA_MITRA, ITEM_ID_FUWAFUWA_TANPOPO_SHOES, ITEM_ID_HIMAWARI_SHONEN, ITEM_ID_ILLUSION_SOSHOKUYO_HANA,
    ITEM_ID_METAL_PICK, ITEM_ID_REQUIEM_WIZARDSTUFF, ITEM_ID_SHADOW_STUFF,
    ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FLAME_BIRD, ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL,
    ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_DRESS, ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND,
    ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK, ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF,
    ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU
} from "../item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_STR, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_WeaponType,
    n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_FRIGNO_UTA, SKILL_ID_FROST_NOVA, SKILL_ID_HELL_INFERNO, SKILL_ID_NYAN_GRASS, SKILL_ID_SIGHT_RASHER
} from "../skill/skill.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";


export function ApplyMdefIgnore(mobData) {
    let confval = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, idx = 0;

//==== ＭＤＥＦ無視　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_IGNORE_MDEF_ALL; idx <= ITEM_SP_IGNORE_MDEF_RACE_ALL; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}
		for (idx = ITEM_SP_IGNORE_MDEF_RACE_SOLID; idx <= ITEM_SP_IGNORE_MDEF_RACE_DRAGON; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(EquipNumSearch(645)) n_tok[295] += 10 + n_A_Weapon_ATKplus;

		//----------------------------------------------------------------
		// 「レクイエムウィザードスタッフ」の、＋６以上の精錬によるＭＤＥＦ無視効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_REQUIEM_WIZARDSTUFF)) {
			if (n_A_Weapon_ATKplus >= 6) n_tok[295] += 10 * (n_A_Weapon_ATKplus - 5);
		}

		//----------------------------------------------------------------
		// 「ポロロッカシューズ　ラクリマセット」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK)) {

			// フロストノヴァ習得レベルによる強化
			n_tok[295] += 5 * LearnedSkillSearch(SKILL_ID_FROST_NOVA);
		}

		//----------------------------------------------------------------
		// 「アヴェンジャーウィザードスタッフ」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AVENGER_WIZARDSTUFF)) {
			n_tok[ITEM_SP_IGNORE_MDEF_RACE_HUMAN] += 5 * n_A_Weapon_ATKplus;
		}

		//----------------------------------------------------------------
		// 「ひまわり少年」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_HIMAWARI_SHONEN)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SIGHT_RASHER) >= 10) {
				n_tok[295] += 5 * n_A_Weapon_ATKplus;
			}
		}

		//----------------------------------------------------------------
		// 「炎雷魔女の大杖」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE)) > 0) {
			n_tok[295] += 5 * n_A_Weapon_ATKplus;
		}

		//----------------------------------------------------------------
		// 「天邪鬼の鬼面」の、素ＳＴＲによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
			n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 15 * ROUNDDOWN(SU_STR / 18) * itemCount;
		}

		//----------------------------------------------------------------
		// 「スカラバハイヒール　ラフィネスタッフセット」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 8) n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 20;
				if (n_A_Weapon_ATKplus >= 10) n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 30;
			}
		}

		//----------------------------------------------------------------
		// 「ブルートアークワンド」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「イリュージョン装飾用花」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SOSHOKUYO_HANA)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_IGNORE_MDEF_RACE_PLANT] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「不思議なハト　ヴァルハラアイドルセット」の、素ＳＴＲによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL)) > 0) {
			n_tok[ITEM_SP_IGNORE_MDEF_ALL] += 5 * ROUNDDOWN(SU_STR / 18) * itemCount;
		}

		//----------------------------------------------------------------
		// 「降霊術士の手鏡　ドレスセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_DRESS)) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_IGNORE_MDEF_BOSS] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ふわふわタンポポシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_GRASS) >= 5) {
				n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 100 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「傀儡の腕輪　ダークハンドセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND)) > 0) {

			if (n_A_HEAD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 25 * itemCount;
			}

			if (n_A_HEAD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 25 * itemCount;
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
				n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 70 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「不死鳥の猫じゃらし　フレイムバードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FLAME_BIRD)) > 0) {
			n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 10 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「メタルピック」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_METAL_PICK)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) >= 5) {
				n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += 50 * itemCount;
			}
		}


		if(n_A_WeaponType==9) n_tok[295] += 2 * CardNumSearch(466);
		if(mobData[20]==1 && CardNumSearch(425)) n_tok[297] += 30 * CardNumSearch(425);
		if(EquipNumSearch(936)) n_tok[295] += (n_A_Weapon_ATKplus * 1);
		if(mobData[20]==1 && EquipNumSearch(1228)){
			if(n_A_HEAD_DEF_PLUS >= 6) n_tok[297] += (n_A_HEAD_DEF_PLUS - 5);
		}

		// 「シャドウスタッフ」の、スキル習得による効果
		if(EquipNumSearch(ITEM_ID_SHADOW_STUFF)){
			if (LearnedSkillSearch(SKILL_ID_HELL_INFERNO) >= 5) {
				n_tok[295] += (n_A_Weapon_ATKplus * 5);
			}
		}


		if(EquipNumSearch(2429)) n_tok[295] += 8 * Math.floor(n_A_Weapon_ATKplus / 3);


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_IGNORE_MDEF_RACE_ALL);
		if (confval != 0) {
			n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL] += confval;
		}


		//if(mobData[20] == 1) n_tok[295] += n_tok[297];
		if(EquipNumSearch(1084) || EquipNumSearch(1095)){
			if(n_A_Weapon_ATKplus >= 5) n_tok[317] += 10;
			if(n_A_Weapon_ATKplus >= 7) n_tok[317] += 20;
		}
		if(EquipNumSearch(1083)){
			if(n_A_Weapon_ATKplus >= 5) n_tok[317] += 10;
			if(n_A_Weapon_ATKplus >= 7) n_tok[317] += 15;
		}
		n_tok[ITEM_SP_CRITICAL_DAMAGE_UP] += n_tok[320+mobData[19]];


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyMonsterElementDamageDownPercent() {
    let confval = 0, i = 0;

//==== 属性モンスターから受けるダメージ－○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

// TODO : ここでいいのか？


		//----------------------------------------------------------------
		// 「古びたミトラ」の、精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_FURUBITA_MITRA)) {
			n_tok[337] += 1 * n_A_HEAD_DEF_PLUS;
			n_tok[339] += 1 * n_A_HEAD_DEF_PLUS;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_MONSTER_ELM);
		if (confval != 0) {
			for (i = ITEM_SP_RESIST_MONSTER_ELM_VANITY; i <= ITEM_SP_RESIST_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += confval;
			}
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyElementalPhysicalDamageUpPercent() {
    let confval = 0, idx = 0, i = 0;

//==== 属性物理攻撃で与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_ELM);
		if (confval != 0) {
			for (i = ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD; i++) {
				n_tok[i] += confval;
			}
		}

		//----------------------------------------------------------------
		// アイテム、バフ、デバフによる個別の効果を呼び出し
		//----------------------------------------------------------------
		for (let idx = ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY; idx <= ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}

		//----------------------------------------------------------------
		// 全属性の設定適用
		//----------------------------------------------------------------
/*
// 現状存在しない
		if(n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_ALL] != 0){
			for (var i = ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY; i <= ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD; i++) {
				n_tok[i] += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_ALL];
			}
		}
*/

}
