/**
 * StAllCalc「除算Mdef算出」「減算Mdef算出」「HIT 算出」セクションの分割（Phase 2b）。
 * 経緯は stallcalc-atk-base.js の JSDoc を参照。本文はバイト単位で不変。
 */
import { n_A_PassSkill4, UsedSkillSearch } from "../skill/skillstate.js";
import { g_confDataDebuff } from "../runtime/global.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CExtraInfoAreaComponentManager } from "../ui/CExtraInfoAreaComponentManager.js";
import {
    EXBUF_ID_HOM_S_PAINKILLER, EXBUF_ID_HOM_S_PAINKILLER_HOM_LEVEL, EquipNumSearch, ExBuffNumSearch,
    GetStatusModifyHitPlus, GetStatusModifyMdefDivPlus, GetStatusModifyMdefDivUp, TimeItemNumSearch
} from "../chara/chara.js";
import {
    CHARA_DATA_INDEX_HIT, CHARA_DATA_INDEX_MDEF_DIV, CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF,
    CHARA_DATA_INDEX_MDEF_MINUS
} from "../const/EnumCharaDataIndex.js";
import { ITEM_SP_HIT_PLUS, ITEM_SP_MDEF_PLUS, ITEM_SP_MDEF_UP } from "../const/EnumItemSpId.js";
import { n_A_DEX, n_A_INT, n_A_LUK, n_A_VIT } from "../runtime/roro-state.js";
import { SKILL_ID_BERSERK, SKILL_ID_TENKETSU_HAN } from "../skill/skill.dat.js";
import { TIME_ITEM_ID_WOLF_HEZIN } from "../equip/timeitem.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";

export function ApplyPlayerMdefHit(charaData) {
	let vartmp = 0, sklLv = 0, bufLv = 0;
/**
 * ==================================================================
 * 除算Mdef算出
 * ================================================================== 
 */

	var mdefDiv = 0;
	var mdefDivIgnoreBuff = 0;

	//----------------------------------------------------------------
	// 装備、支援等による補正（＋○○）
	//----------------------------------------------------------------
	var mdefDivPlus = 0;
	var mdefDivPlusIgnoreBuff = 0;

	// アイテム特性
	mdefDivPlus = n_tok[ITEM_SP_MDEF_PLUS];
	mdefDivPlusIgnoreBuff = mdefDivPlus;

	// 装備追加効果、支援効果
	mdefDivPlus += GetStatusModifyMdefDivPlus(false);
	mdefDivPlusIgnoreBuff += GetStatusModifyMdefDivPlus(true);

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MDEF_PLUS, mdefDivPlus);

	// 最終的な効果を適用
	mdefDiv = mdefDivPlus;
	mdefDivIgnoreBuff = mdefDivPlusIgnoreBuff;

	//----------------------------------------------------------------
	// 特殊効果の適用（各々乗算扱い）
	//----------------------------------------------------------------

	// 「修羅　点穴 -反-」の、効果（ペナルティ）
	if ((sklLv = UsedSkillSearch(SKILL_ID_TENKETSU_HAN)) > 0) {
		var valInt = 0;

		// 持ち替え支援の場合、支援欄のステータスを使用
		if(n_A_PassSkill4[11] == 2) {
			valInt = n_A_PassSkill4[32];
		}

		// 持ち替えなしの場合、本人のステータスを使用
		else {
			valInt = n_A_VIT;
		}

		if (valInt < 1) valInt = 1;

		// このペナルティによって、Ｍｄｅｆがマイナスになることはない（らしい）
		vartmp = 1 * Math.floor(200 / valInt) * sklLv;
		mdefDiv -= Math.min(mdefDiv, vartmp);
	}

	// 「ロードナイト　バーサーク」の、効果（ペナルティ）
	if (UsedSkillSearch(SKILL_ID_BERSERK)){
		mdefDiv = 0;
	}

	//----------------------------------------------------------------
	// 装備、支援等による補正（＋％）
	//----------------------------------------------------------------
	var mdefDivUp = 0;
	var mdefDivUpIgnoreBuff = 0;

	// アイテム特性
	mdefDivUp += n_tok[ITEM_SP_MDEF_UP];
	mdefDivUpIgnoreBuff += n_tok[ITEM_SP_MDEF_UP];

	// 装備追加効果、支援効果
	mdefDivUp += GetStatusModifyMdefDivUp(false);
	mdefDivUpIgnoreBuff += GetStatusModifyMdefDivUp(true);

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MDEF_UP, mdefDivUp);

	// 最終的な効果を適用
	mdefDiv += Math.floor(mdefDiv * mdefDivUp / 100);
	mdefDivIgnoreBuff += Math.floor(mdefDivIgnoreBuff * mdefDivUpIgnoreBuff / 100);

	//----------------------------------------------------------------
	// 計算した結果をキャラクターデータに保存
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_MDEF_DIV] = mdefDiv;
	charaData[CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF] = mdefDivIgnoreBuff;

/**
 * ==================================================================
 * 減算Mdef算出
 * ================================================================== 
 */

	//----------------------------------------------------------------
	// 基本減算Ｍｄｅｆ
	//----------------------------------------------------------------
	var mdefMinus = 0;
	mdefMinus = Math.floor(n_A_INT + n_A_BaseLV / 4 + n_A_VIT / 5 + n_A_DEX / 5);

	//----------------------------------------------------------------
	// 特殊効果の適用（各々乗算扱い）
	//----------------------------------------------------------------

	// ウルフヘジンの時限効果
	if (TimeItemNumSearch(TIME_ITEM_ID_WOLF_HEZIN)) {
		mdefMinus -= Math.floor(mdefMinus * 20 / 100);
	}

	// 「アヌビス帽」の、効果（ペナルティ）
	if (EquipNumSearch(1281)) {
		mdefMinus = Math.floor(mdefMinus / 2);
	}

	// 「ジェネティック　Ｓホム　ペインキラー」の、効果
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_HOM_S_PAINKILLER)) > 0) {
		var homLv = ExBuffNumSearch(EXBUF_ID_HOM_S_PAINKILLER_HOM_LEVEL);

		mdefMinus += ROUNDDOWN(100 * bufLv * (132 + homLv) / 100 * n_A_BaseLV / 150);
	}

	//----------------------------------------------------------------
	// 計算した結果をキャラクターデータに保存
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_MDEF_MINUS] = mdefMinus;

/**
 * ==================================================================
 * HIT 算出
 * ================================================================== 
 */
	{
		let hit = 0;

		//----------------------------------------------------------------
		// 基本ＨＩＴ
		//----------------------------------------------------------------
		hit = 175 + Math.floor(n_A_BaseLV + n_A_DEX + n_A_LUK / 3);

		//----------------------------------------------------------------
		// 装備、支援等による補正（＋○○）
		//----------------------------------------------------------------
		let hitPlus = 0;

		// アイテム特性
		hitPlus += n_tok[ITEM_SP_HIT_PLUS];

		// 装備追加効果、支援効果
		hitPlus += GetStatusModifyHitPlus();

		// 最終的な効果を適用
		hit += hitPlus;

		/**
		 * プレイヤー状態異常「暗黒」の効果
		 */
		if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_DARKNESS] > 0) {
			hit = Math.floor(hit * 0.75);
		}
		/**
		 * プレイヤー状態異常「不幸」の効果
		 */
		if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_UNLUCKY] > 0) {
			hit = 0;
		}

		//----------------------------------------------------------------
		// 計算した結果をキャラクターデータに保存
		//----------------------------------------------------------------
		charaData[CHARA_DATA_INDEX_HIT] = hit;
	}
}
