/**
 * StAllCalc セクション分割: 属性耐性・属性モンスター耐性・サイズ耐性・遠距離攻撃耐性。
 *
 * stallcalc.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { UsedSkillSearch } from "../skill/skillstate.js";
import {
    GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_ARCHER, JOB_SERIES_ID_SWORDMAN
} from "../data/mig.job.h.js";
import { g_objCharaConfCustomDef } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomDef } from "../chara/CCharaConfCustomDef.js";
import {
    CARD_ID_COVOTE, CARD_ID_DAICHORO_AIRIN, CARD_ID_DARK_FACEWORM, CARD_ID_ECO_SALAMANDER_ARMA, CARD_ID_HORN,
    CARD_ID_STING
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch } from "../chara/chara.js";
import {
    ITEM_SP_PHYSICAL_RESIST_SIZE_LARGE, ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL, ITEM_SP_RESIST_LONGRANGE,
    ITEM_SP_RESIST_MONSTER_ELM_UNDEAD, ITEM_SP_RESIST_MONSTER_ELM_VANITY, ITEM_SP_RESIST_SIZE_LARGE,
    ITEM_SP_RESIST_SIZE_MEDIUM, ITEM_SP_RESIST_SIZE_SMALL
} from "../const/EnumItemSpId.js";
import { JOB_ID_GILOTINCROSS, JOB_ID_KAGERO, JOB_ID_OBORO, JOB_ID_RANGER } from "../const/EnumJobId.js";
import { ApplyAdditionalResistElement } from "./resist-heal.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import {
    ITEM_ID_DORAM_SHIELD, ITEM_ID_FUSHOHENO_HOTAI, ITEM_ID_ILLUSION_MUFFLER, ITEM_ID_ILLUSION_SURVIVAL_STUFF,
    ITEM_ID_IMUKENO_OSODE, ITEM_ID_KIROI_SCARF, ITEM_ID_KORYUNO_TENYOKU, ITEM_ID_SHIKKOSHANO_MANT,
    ITEM_ID_SHINKUNO_BARA, ITEM_ID_SNIPING_VEIL, ITEM_ID_STINGNO_SILKRIBBON, ITEM_ID_YOICHINO_KATAKAE,
    ITEM_ID_YOZINBONO_SCARF, ITEM_SET_ID_GIGANT_BOOTS_GIGANT_SHIELD, ITEM_SET_ID_GOFUSEKI_PEORTH_MANT,
    ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_KACCHU
} from "../equip/item.dat.js";
import {
    n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import { SKILL_ID_ADJUSTMENT } from "../skill/skill.dat.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";


export function ApplyElementResist() {
//==== 属性耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================
		ApplyAdditionalResistElement();

//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyMonsterElementResist() {
    let idx = 0;

//==== 属性モンスター耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_MONSTER_ELM_VANITY; idx <= ITEM_SP_RESIST_MONSTER_ELM_UNDEAD; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(n_tok[271] != 0){
			for(var i=330;i<=339;i++) n_tok[i] += n_tok[271];
		}

//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplySizeResist() {
    let confval = 0, itemCount = 0, idx = 0, i = 0;

//==== サイズ耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_SIZE_SMALL; idx <= ITEM_SP_RESIST_SIZE_LARGE; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		if(EquipNumSearch(624)) n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += n_A_Weapon_ATKplus;
		if(n_A_SHIELD_DEF_PLUS >= 9 && EquipNumSearch(1685)) n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 5;
		if(n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(2120)){
			n_tok[ITEM_SP_RESIST_SIZE_SMALL] += n_A_HEAD_DEF_PLUS - 5;
			n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += n_A_HEAD_DEF_PLUS - 5;
			n_tok[ITEM_SP_RESIST_SIZE_LARGE] += n_A_HEAD_DEF_PLUS - 5;
			if(n_A_HEAD_DEF_PLUS >= 10){
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 5;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 5;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 5;
			}
		}
		if(EquipNumSearch(2336)) n_tok[192] += 2 * n_A_SHIELD_DEF_PLUS;
		if(n_A_SHIELD_DEF_PLUS >= 9 && EquipNumSearch(2454)){
			n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 20;
			n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 20;
			n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 20;
		}
		if(EquipNumSearch(2456)) n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += n_A_Weapon_ATKplus;

		//----------------------------------------------------------------
		// 「スティングのシルクリボン」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_STINGNO_SILKRIBBON)){

			if(n_A_HEAD_DEF_PLUS >= 5){
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 2;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 2;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 2;
			}

			if(n_A_HEAD_DEF_PLUS >= 7){
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 3;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 3;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 3;
			}

			if(EquipNumSearch(ITEM_ID_SHINKUNO_BARA)){
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 5;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 5;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 5;
			}

			if(CardNumSearch(CARD_ID_STING)){
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 10;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 10;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「ギガントブーツ　シールドセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_SHIELD)) {
			if (n_A_SHIELD_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 2;
			if (n_A_SHIELD_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 3;
		}

		//----------------------------------------------------------------
		// 「皇竜の天翼」の、職業による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
			if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_SWORDMAN) {
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 3;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 5;
			}
		}

		//----------------------------------------------------------------
		// 「大長老アイリンカード」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_DAICHORO_AIRIN)) {
			if (n_A_SHIELD_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 10;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 10;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「ドラムシールド」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_DORAM_SHIELD)) {
			if (n_A_SHIELD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 10;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 10;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンサバイバルスタッフ」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SURVIVAL_STUFF)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_SIZE_SMALL] += 10 * itemCount;
				n_tok[ITEM_SP_RESIST_SIZE_MEDIUM] += 10 * itemCount;
				n_tok[ITEM_SP_RESIST_SIZE_LARGE] += 10 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_SIZE);
		if (confval != 0) {
			for (i = ITEM_SP_RESIST_SIZE_SMALL; i <= ITEM_SP_RESIST_SIZE_LARGE; i++) {
				n_tok[i] += confval;
			}
		}


		// TODO: 四次対応

		// サイズ物理耐性
		for (i = ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL; i <= ITEM_SP_PHYSICAL_RESIST_SIZE_LARGE; i++) {
			n_tok[i] = ApplySpecModify(i, n_tok[i]);
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyLongRangeResist() {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0;

//==== 遠距離攻撃耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_LONGRANGE; idx <= ITEM_SP_RESIST_LONGRANGE; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if (UsedSkillSearch(SKILL_ID_ADJUSTMENT)) {
			n_tok[ITEM_SP_RESIST_LONGRANGE] += 20;
		}
		if(n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(1898)) {
			n_tok[ITEM_SP_RESIST_LONGRANGE] += n_A_HEAD_DEF_PLUS - 5;
		}
		if(n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(1965)){
			n_tok[ITEM_SP_RESIST_LONGRANGE] += n_A_SHIELD_DEF_PLUS - 5;
			n_tok[196] -= (n_A_SHIELD_DEF_PLUS - 5);
		}
		if(EquipNumSearch(1999)) {
			n_tok[ITEM_SP_RESIST_LONGRANGE] += n_A_SHOULDER_DEF_PLUS;
		}
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(2184)){
			n_tok[ITEM_SP_RESIST_LONGRANGE] += 3;
			if(n_A_HEAD_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_RESIST_LONGRANGE] += 4;
			}
		}

		//----------------------------------------------------------------
		// 「執行者のマント」の、ギロチンクロス装備時の強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {

				// 効果本体
				n_tok[ITEM_SP_RESIST_LONGRANGE] += 20;
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] += 15;
				}

				// 特定装備の効果打消し
				if (EquipNumSearch(ITEM_ID_IMUKENO_OSODE)) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] -= 35;
				}
				if (CardNumSearch(CARD_ID_HORN)) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] -= 35;
				}
			}
		}

		//----------------------------------------------------------------
		// 「与一の肩掛け」の、レンジャー装備時の強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {
			if (IsSameJobClass(JOB_ID_RANGER)) {

				// 効果本体
				n_tok[ITEM_SP_RESIST_LONGRANGE] += 20;
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] += 15;
				}

				// 特定装備の効果打消し
				if (EquipNumSearch(ITEM_ID_IMUKENO_OSODE)) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] -= 35;
				}
				if (CardNumSearch(CARD_ID_HORN)) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] -= 35;
				}
			}
		}

		//----------------------------------------------------------------
		// 「射向の大袖」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_IMUKENO_OSODE)) {
			if (n_A_SHIELD_DEF_PLUS >= 5) n_tok[ITEM_SP_RESIST_LONGRANGE] += 5;
			if (n_A_SHIELD_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_LONGRANGE] += 10;
			if (n_A_SHIELD_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_LONGRANGE] += 15;
		}

		//----------------------------------------------------------------
		// 「皇竜の天翼」の、職業による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
			if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ARCHER) {
				// 黄色いスカーフと同時に装備すると効果なし
				if (EquipNumSearch(ITEM_ID_KIROI_SCARF) == 0) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] += 10;
				}
			}
		}

		//----------------------------------------------------------------
		// 「業風石　ペオースマントセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_PEORTH_MANT)) > 0) {
			vartmp = 0;

			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;

			n_tok[ITEM_SP_RESIST_LONGRANGE] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「スナイピングベール」の、過剰精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_SNIPING_VEIL)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_RESIST_LONGRANGE] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「負傷兵の包帯」の、過剰精錬による強化
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_FUSHOHENO_HOTAI)) {
			n_tok[ITEM_SP_RESIST_LONGRANGE] += 2 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 3);
		}

		//----------------------------------------------------------------
		// 「[ECO] サラマンダー・アルマカード」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_ECO_SALAMANDER_ARMA)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_LONGRANGE] += 10;
		}

		//----------------------------------------------------------------
		// 「コヨーテカード」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_COVOTE)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_LONGRANGE] += 10;
		}

		//----------------------------------------------------------------
		// 「用心棒のスカーフ」の、影狼・朧装備時の強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) {
			if (IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO)) {

				// 効果本体
				n_tok[ITEM_SP_RESIST_LONGRANGE] += 20;
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] += 15;
				}

				// 特定装備の効果打消し
				if (EquipNumSearch(ITEM_ID_IMUKENO_OSODE)) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] -= 35;
				}
				if (CardNumSearch(CARD_ID_HORN)) {
					n_tok[ITEM_SP_RESIST_LONGRANGE] -= 35;
				}
			}
		}

		//----------------------------------------------------------------
		// 「ダークフェイスワームカード」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_ID_DARK_FACEWORM)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_LONGRANGE] += 10;
		}

		//----------------------------------------------------------------
		// 「イリュージョンマフラー」の、ベースレベルによる強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MUFFLER)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_RESIST_LONGRANGE] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「剛勇無双の神輿　剛勇無双の甲胄　セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_KACCHU)) > 0) {
			n_tok[ITEM_SP_RESIST_LONGRANGE] += 5 * Math.floor(n_A_BODY_DEF_PLUS / 3) * itemCount;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_LONGRANGE);
		if (confval != 0) {
			n_tok[ITEM_SP_RESIST_LONGRANGE] += confval;
		}


}
