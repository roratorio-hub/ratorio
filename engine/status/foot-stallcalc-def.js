/**
 * StAllCalc「除算Ｄｅｆ算出」「減算Ｄｅｆ算出」セクションの分割（Phase 2b）。
 * 経緯は foot-stallcalc-atk-base.js の JSDoc を参照。本文はバイト単位で不変。
 */
import { n_A_PassSkill4, UsedSkillSearch, n_A_PassSkill8 } from "../skill/skillstate.js";
import { g_confDataDebuff, g_confDataIchizi, g_confDataNizi } from "../runtime/global.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CCharaConfIchizi } from "../chara/CCharaConfIchizi.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CExtraInfoAreaComponentManager } from "../ui/CExtraInfoAreaComponentManager.js";
import {
    EXBUF_ID_HOM_S_PAINKILLER, EXBUF_ID_HOM_S_PAINKILLER_HOM_LEVEL, ExBuffNumSearch, GetStatusModifyDefDivPlus,
    GetStatusModifyDefDivUp, TimeItemNumSearch
} from "../chara/chara.js";
import { CHARA_DATA_INDEX_DEF_DIV, CHARA_DATA_INDEX_DEF_MINUS } from "../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_HEAD_TOP } from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_POWER } from "../const/EnumItemDataIndex.js";
import { ITEM_SP_DEF_DIVIDE_PENARTY, ITEM_SP_DEF_PLUS, ITEM_SP_DEF_UP } from "../const/EnumItemSpId.js";
import { ItemObjNew } from "../item.dat.js";
import {
    n_A_AGI, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_SHOULDER_DEF_PLUS, n_A_VIT
} from "../runtime/roro-state.js";
import {
    SKILL_ID_AUTO_BERSERK, SKILL_ID_BERSERK, SKILL_ID_CONCENTRATION, SKILL_ID_SERE_SUPPORT_SKILL,
    SKILL_ID_TENKETSU_KATSU
} from "../skill/skill.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";

export function ApplyPlayerDef(charaData) {
	let sklLv = 0, bufLv = 0, idx = 0;
// 除算Ｄｅｆ算出
//================================================================================================

	//----------------------------------------------------------------
	// 基本除算Ｄｅｆ
	//----------------------------------------------------------------
	var armorDef = 0;

	// 防具の基本Ｄｅｆ

	// 従来の処理
	for (idx = EQUIP_REGION_ID_HEAD_TOP; idx <= EQUIP_REGION_ID_ACCESSORY_2; idx++) {
		armorDef += ItemObjNew[n_A_Equip[idx]][ITEM_DATA_INDEX_POWER];
	}

	//----------------------------------------------------------------
	// 装備、支援等による補正（＋○○）
	//----------------------------------------------------------------
	var defDivPlus = 0;

	// アイテム特性
	defDivPlus += n_tok[ITEM_SP_DEF_PLUS];

	// 装備追加効果、支援効果
	defDivPlus += GetStatusModifyDefDivPlus();

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_DEF_PLUS, defDivPlus);


	//----------------------------------------------------------------
	// 防具の精錬効果
	//----------------------------------------------------------------
	var refineDefTable = [0, 1, 2, 3, 4, 6, 8, 10, 12, 15, 18];
	var defRefined = 0;
	defRefined += refineDefTable[n_A_HEAD_DEF_PLUS];
	defRefined += refineDefTable[n_A_BODY_DEF_PLUS];
	defRefined += refineDefTable[n_A_SHIELD_DEF_PLUS];
	defRefined += refineDefTable[n_A_SHOULDER_DEF_PLUS];
	defRefined += refineDefTable[n_A_SHOES_DEF_PLUS];


	//----------------------------------------------------------------
	// 除算Ｄｅｆの算出
	//----------------------------------------------------------------
	var defDiv = 0;
	defDiv = armorDef + defDivPlus + defRefined;


	//----------------------------------------------------------------
	// 特殊効果の適用（各々乗算扱い）
	//----------------------------------------------------------------

	// アイテム特性　キャラの防御力１／ｎ
	if (n_tok[ITEM_SP_DEF_DIVIDE_PENARTY]) {
		defDiv = Math.floor(defDiv / n_tok[ITEM_SP_DEF_DIVIDE_PENARTY]);
	}

	// ロードナイト　コンセントレイション
	if (sklLv = UsedSkillSearch(SKILL_ID_CONCENTRATION)) {
		defDiv = Math.floor(defDiv * (1 - 0.05 * sklLv));
	}
	// 「二次職支援　コンセントレイション」の、効果
	else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_CONCENTRATION]) > 0) {
		defDiv = Math.floor(defDiv * (1 - 0.05 * sklLv));
	}

	// ロードナイト　バーサーク
	if (UsedSkillSearch(SKILL_ID_BERSERK)) {
		defDiv = 0;
	}

	/* プレイヤー状態異常設定「永遠の混沌」の効果 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_ETERNALCHAOS] > 0) {
		defDiv = 0;
	}

	// 囲まれ補正
	if (n_A_PassSkill8[12] >= 3) {
		defDiv -= Math.floor(defDiv * (n_A_PassSkill8[12] - 2) * 5 / 100);
	}

	//----------------------------------------------------------------
	// 装備、支援等による補正（＋％）
	//----------------------------------------------------------------
	var defDivUp = 0;

	// アイテム特性
	defDivUp += n_tok[ITEM_SP_DEF_UP];

	// 装備追加効果、支援効果
	defDivUp += GetStatusModifyDefDivUp();

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_DEF_UP, defDivUp);

	// 最終的な効果を適用
	defDiv += ROUNDDOWN(defDiv * defDivUp / 100);

	//----------------------------------------------------------------
	// 計算した結果をキャラクターデータに保存
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DEF_DIV] = defDiv;

//================================================================================================
// 減算Ｄｅｆ算出
//================================================================================================

	//----------------------------------------------------------------
	// 基本減算Ｄｅｆ
	//----------------------------------------------------------------

	// プロボック系による倍率補正
	var rateByProvoke = 100;
	// オートバーサーク
	if (UsedSkillSearch(SKILL_ID_AUTO_BERSERK)) {
		rateByProvoke = 45;
	}
	// 「一次職支援　支援プロボック」
	else if (g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE]){
		rateByProvoke = 95 - 5 * g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE];
	}

	// 基本値を算出
	var defMinus = 0;
	defMinus = Math.floor(((n_A_VIT / 2) * rateByProvoke / 100) + n_A_BaseLV / 2 + n_A_AGI / 5);

	//----------------------------------------------------------------
	// 特殊効果の適用
	//----------------------------------------------------------------

	// 「ソーサラー　精霊補助スキル　ソリッドスキン」の、効果
	if (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 29){
		defMinus += defMinus;
	}

	// 「修羅　点穴 -活-」の、効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_TENKETSU_KATSU)) > 0) {
		var valVit = 0;

		// 持ち替え支援の場合、支援欄のステータスを使用
		if(n_A_PassSkill4[11] == 3) {
			valVit = n_A_PassSkill4[32];
		}

		// 持ち替えなしの場合、本人のステータスを使用
		else {
			valVit = n_A_VIT;
		}

		defMinus += Math.floor(valVit / 4) * sklLv;
	}

	// 「一次職支援　エンジェラス」の、効果
	if (g_confDataIchizi[CCharaConfIchizi.CONF_ID_ANGELUS]) {
		defMinus += Math.floor(ROUNDDOWN(n_A_VIT / 2) * (0.05 * g_confDataIchizi[CCharaConfIchizi.CONF_ID_ANGELUS]));
	}

	// 「ミスリルマジックマント　時限効果」の、効果（ペナルティ）
	if (TimeItemNumSearch(33)) {
		defMinus -= Math.floor(defMinus * 20 / 100);
	}

	// 「ロードナイト　バーサーク」の、効果（ペナルティ）
	if (UsedSkillSearch(SKILL_ID_BERSERK)){
		defMinus = 0;
	}

	/* プレイヤー状態異常設定「永遠の混沌」の効果 */
	if (g_confDataDebuff[CCharaConfDebuff.CONF_ID_ETERNALCHAOS] > 0) {
		defMinus = 0;
	}

	// 囲まれ補正
	if (n_A_PassSkill8[12] >= 3) {
		defMinus -= Math.floor(defMinus * (n_A_PassSkill8[12] - 2) * 5 / 100);
	}

	// 「ジェネティック　Ｓホム　ペインキラー」の、効果
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_HOM_S_PAINKILLER)) > 0) {
		var homLv = ExBuffNumSearch(EXBUF_ID_HOM_S_PAINKILLER_HOM_LEVEL);

		defMinus += ROUNDDOWN(100 * bufLv * (132 + homLv) / 100 * n_A_BaseLV / 150);
	}

	//----------------------------------------------------------------
	// 計算した結果をキャラクターデータに保存
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DEF_MINUS] = defMinus;

}
