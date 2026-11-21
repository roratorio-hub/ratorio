// === AUTO-GENERATED IMPORTS ===
import { n_A_Equip, n_A_card } from "../runtime/roro-state.js";

import { g_attackMethodBridge } from "../battle/CAttackMethodDataBridge.js";

import { CARD_ID_ARCHER_SKELETON, CARD_ID_GIGANTES, CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP, CARD_ID_MAGICAL_RACE_ALL_10UP, CARD_ID_MAGICAL_SIZE_ALL_8UP, CARD_ID_MAX, CARD_ID_NONE, CARD_ID_OSEN_SARETA_SAMAYOU_MONO, CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP, CARD_ID_PHYSICAL_RACE_ALL_20UP, CARD_ID_PHYSICAL_SIZE_ALL_15UP, CARD_ID_POWERFUL_A_SKELETON, CARD_ID_SHINENNO_KISHI } from "./card.dat.js";
import {
         CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ACCESSORY_2,
         CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2,
         CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4,
         CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2,
         CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4, CARD_REGION_ID_BODY,
         CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2,
         CARD_REGION_ID_ENCHANT_ACCESSORY_1_3, CARD_REGION_ID_ENCHANT_ACCESSORY_2_1,
         CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3,
         CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2,
         CARD_REGION_ID_ENCHANT_BODY_3, CARD_REGION_ID_ENCHANT_HEAD_MID_1,
         CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3,
         CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2,
         CARD_REGION_ID_ENCHANT_HEAD_TOP_3, CARD_REGION_ID_ENCHANT_HEAD_UNDER_1,
         CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3,
         CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2,
         CARD_REGION_ID_ENCHANT_SHIELD_3, CARD_REGION_ID_ENCHANT_SHOES_1,
         CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3,
         CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2,
         CARD_REGION_ID_ENCHANT_SHOULDER_3, CARD_REGION_ID_HEAD_MID,
         CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_SHIELD, CARD_REGION_ID_SHOES,
         CARD_REGION_ID_SHOULDER
} from "../runtime/common.js";

import { ItemObjNew } from "./item.dat.js";
import { GetMaxSlot } from "./item.h.js";

import { HtmlGetElementById, HtmlCreateElement, HtmlCreateElementOption, HtmlRemoveAllChild, HtmlGetObjectValueById, HtmlSetObjectValueById } from "../runtime/util.js";

// === END AUTO-GENERATED IMPORTS ===
// C-6: slotpager.js との循環 import 回避のため slotpager-const.js から直接参照
import { SLOT_INDEX_CARD_MIN, SLOT_INDEX_CARD_MAX } from "./slotpager-const.js";

// C-6: equip.js との循環 import 回避のため equip-name.js から直接参照
import { GetFlagAppendedCardName } from "./equip-name.js";

import { setSelectValueSynced } from "./select-sync.js";
// 選択肢の算出（DOM に触れない）
import { GetEquipRegionIdByObjIdPrefix, SetSlotCardId } from "./equip-slot-state.js";
import { CollectCardSlotChoices, GetCardRegionId, ResolveCardSelection, SLOT_CHOICE_ENCHANT, SLOT_CHOICE_CARD } from "./card-slot-choices.js";
// 外部モジュールが hmcard.js 経由で参照しているため再公開する
export { RebuildCardSelectSubCollectEnchListData } from "./card-slot-choices.js";


// C-6: global.js 管理の共有 conf state
import {
         n_Nitou,
} from "../runtime/global.js";

// C-6: stallcalc.js 公開関数（foot-bridge 経由）
import { StAllCalc } from "../bridge/stallcalc-bridge.js";

import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_MID,
    EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_SHOULDER,
} from "../const/EnumEquipRegionId.js";

import { ITEM_DATA_INDEX_SLOT } from "../const/EnumItemDataIndex.js";



export const CardShortObj =[
	 [
	 	"カードショートカット",
	 	0,
	 	0,
	 	0,
	 	0
	 ],

	 [
	 	"武器カード全解除",
	 	0,
	 	0,
	 	0,
	 	0
	 ],

	 [
	 	"1枚目をコピー 2枚",
	 	CARD_ID_MAX,
	 	CARD_ID_MAX,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"1枚目をコピー 3枚",
	 	CARD_ID_MAX,
	 	CARD_ID_MAX,
	 	CARD_ID_MAX,
	 	CARD_ID_NONE
	 ],

	 [
	 	"1枚目をコピー 4枚",
	 	CARD_ID_MAX,
	 	CARD_ID_MAX,
	 	CARD_ID_MAX,
	 	CARD_ID_MAX
	 ],

	 [
	 	"物理　種族20%　2枚",
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"物理　種族20%　3枚",
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_NONE
	 ],

	 [
	 	"物理　種族20%　4枚",
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP,
	 	CARD_ID_PHYSICAL_RACE_ALL_20UP
	 ],

	 [
	 	"物理　敵属性20%　2枚",
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"物理　敵属性20%　3枚",
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_NONE
	 ],

	 [
	 	"物理　敵属性20%　4枚",
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP,
	 	CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP
	 ],

	 [
	 	"物理　サイズ15%　2枚",
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"物理　サイズ15%　3枚",
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_NONE
	 ],

	 [
	 	"物理　サイズ15%　4枚",
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP,
	 	CARD_ID_PHYSICAL_SIZE_ALL_15UP
	 ],

	 [
	 	"魔法　種族10%　2枚",
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"魔法　種族10%　3枚",
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_NONE
	 ],

	 [
	 	"魔法　種族10%　4枚",
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_MAGICAL_RACE_ALL_10UP,
	 	CARD_ID_MAGICAL_RACE_ALL_10UP
	 ],

	 [
	 	"魔法　敵属性10%　2枚",
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"魔法　敵属性10%　3枚",
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_NONE
	 ],

	 [
	 	"魔法　敵属性10%　4枚",
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP,
	 	CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP
	 ],

	 [
	 	"魔法　サイズ8%　2枚",
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"魔法　サイズ8%　3枚",
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_NONE
	 ],

	 [
	 	"魔法　サイズ8%　4枚",
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP,
	 	CARD_ID_MAGICAL_SIZE_ALL_8UP
	 ],


	 [
	 	"アチャスケ　2枚",
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"アチャスケ　3枚",
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_NONE
	 ],

	 [
	 	"アチャスケ　4枚",
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_ARCHER_SKELETON,
	 	CARD_ID_ARCHER_SKELETON
	 ],

	 [
	 	"パワフルアチャスケ　2枚",
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"パワフルアチャスケ　3枚",
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_NONE
	 ],

	 [
	 	"パワフルアチャスケ　4枚",
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_POWERFUL_A_SKELETON,
	 	CARD_ID_POWERFUL_A_SKELETON
	 ],

	 [
	 	"深淵　2枚",
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"深淵　3枚",
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_NONE
	 ],

	 [
	 	"深淵　4枚",
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_SHINENNO_KISHI,
	 	CARD_ID_SHINENNO_KISHI
	 ],

	 [
	 	"汚染彷徨う者　2枚",
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"汚染彷徨う者　3枚",
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_NONE
	 ],

	 [
	 	"汚染彷徨う者　4枚",
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO,
	 	CARD_ID_OSEN_SARETA_SAMAYOU_MONO
	 ],

	 [
	 	"ギガンテス　2枚",
	 	CARD_ID_GIGANTES,
	 	CARD_ID_GIGANTES,
	 	CARD_ID_NONE,
	 	CARD_ID_NONE
	 ],

	 [
	 	"ギガンテス　3枚",
	 	CARD_ID_GIGANTES,
	 	CARD_ID_GIGANTES,
	 	CARD_ID_GIGANTES,
	 	CARD_ID_NONE
	 ],

	 [
	 	"ギガンテス　4枚",
	 	CARD_ID_GIGANTES,
	 	CARD_ID_GIGANTES,
	 	CARD_ID_GIGANTES,
	 	CARD_ID_GIGANTES
	 ],

];

/************************************************************************************************
 *
 * カード選択状態をクリアする（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
export function ClearCardSlotAll() {

	// 個別関数を全コール
	ClearCardSlot(EQUIP_REGION_ID_ARMS);
	ClearCardSlot(EQUIP_REGION_ID_ARMS_LEFT);
	ClearCardSlot(EQUIP_REGION_ID_HEAD_TOP);
	ClearCardSlot(EQUIP_REGION_ID_HEAD_MID);
	ClearCardSlot(EQUIP_REGION_ID_HEAD_UNDER);
	ClearCardSlot(EQUIP_REGION_ID_SHIELD);
	ClearCardSlot(EQUIP_REGION_ID_BODY);
	ClearCardSlot(EQUIP_REGION_ID_SHOULDER);
	ClearCardSlot(EQUIP_REGION_ID_SHOES);
	ClearCardSlot(EQUIP_REGION_ID_ACCESSORY_1);
	ClearCardSlot(EQUIP_REGION_ID_ACCESSORY_2);
}

/************************************************************************************************
 *
 * カード選択状態をクリアする.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
export function ClearCardSlot(eqpRgnId) {

	var objidPrifix = "";
	var idxArrayToClear = new Array();

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		objidPrifix = "OBJID_ARMS_RIGHT";
		idxArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_1);
		idxArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_2);
		idxArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_3);
		idxArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_4);
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		objidPrifix = "OBJID_ARMS_LEFT";
		idxArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_1);
		idxArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_2);
		idxArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_3);
		idxArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_4);
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		objidPrifix = "OBJID_HEAD_TOP";
		idxArrayToClear.push(CARD_REGION_ID_HEAD_TOP);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_TOP_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_TOP_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_TOP_3);
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		objidPrifix = "OBJID_HEAD_MID";
		idxArrayToClear.push(CARD_REGION_ID_HEAD_MID);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_MID_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_MID_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_MID_3);
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		objidPrifix = "OBJID_HEAD_UNDER";
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_UNDER_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_UNDER_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_UNDER_3);
		break;

	case EQUIP_REGION_ID_SHIELD:
		objidPrifix = "OBJID_SHIELD";
		idxArrayToClear.push(CARD_REGION_ID_SHIELD);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHIELD_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHIELD_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHIELD_3);
		break;

	case EQUIP_REGION_ID_BODY:
		objidPrifix = "OBJID_BODY";
		idxArrayToClear.push(CARD_REGION_ID_BODY);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_BODY_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_BODY_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_BODY_3);
		break;

	case EQUIP_REGION_ID_SHOULDER:
		objidPrifix = "OBJID_SHOULDER";
		idxArrayToClear.push(CARD_REGION_ID_SHOULDER);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOULDER_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOULDER_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOULDER_3);
		break;

	case EQUIP_REGION_ID_SHOES:
		objidPrifix = "OBJID_SHOES";
		idxArrayToClear.push(CARD_REGION_ID_SHOES);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOES_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOES_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOES_3);
		break;

	case EQUIP_REGION_ID_ACCESSORY_1:
		objidPrifix = "OBJID_ACCESSORY_1";
		idxArrayToClear.push(CARD_REGION_ID_ACCESSORY_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSORY_1_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSORY_1_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSORY_1_3);
		break;

	case EQUIP_REGION_ID_ACCESSORY_2:
		objidPrifix = "OBJID_ACCESSORY_2";
		idxArrayToClear.push(CARD_REGION_ID_ACCESSORY_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSORY_2_1);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSORY_2_2);
		idxArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSORY_2_3);
		break;

	default:
		return;
	}

	__ClearCardSlot(objidPrifix, idxArrayToClear);
}

/************************************************************************************************
 *
 * カード選択状態をクリアする（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param idxArrayToClear 設定をクリアする配列の添字
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __ClearCardSlot(objidPrifix, idxArrayToClear) {

	var idx = 0;
	var strObjId = "";
	var rgnIdx = 0;

	const eqpRgnId = GetEquipRegionIdByObjIdPrefix(objidPrifix);

	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
		strObjId = objidPrifix + "_CARD_" + idx;
		HtmlSetObjectValueById(strObjId, CARD_ID_NONE);
		SetSlotCardId(eqpRgnId, idx - SLOT_INDEX_CARD_MIN, CARD_ID_NONE);
	}

	for (idx = 0; idx < idxArrayToClear.length; idx++) {
		rgnIdx = idxArrayToClear[idx];
		n_A_card[rgnIdx] = CARD_ID_NONE;
	}
}

/************************************************************************************************
 *
 * カード選択セレクト再構築.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 装備領域ＩＤ
 * @param itemId 変更後のアイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 ************************************************************************************************/
export function RebuildCardSelect(eqpRgnId, itemId) {

	var objidPrifix = "";
	var objSelect = null;
	var idx = 0;
	var objArySlots = new Array();


	// 装備か所ごとに対応するオブジェクトを取得
	switch (eqpRgnId) {

	case EQUIP_REGION_ID_ARMS:
		objidPrifix = "OBJID_ARMS_RIGHT";
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		objidPrifix = "OBJID_ARMS_LEFT";
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		objidPrifix = "OBJID_HEAD_TOP";
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		objidPrifix = "OBJID_HEAD_MID";
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		objidPrifix = "OBJID_HEAD_UNDER";
		break;

	case EQUIP_REGION_ID_SHIELD:
		objidPrifix = "OBJID_SHIELD";
		break;

	case EQUIP_REGION_ID_BODY:
		objidPrifix = "OBJID_BODY";
		break;

	case EQUIP_REGION_ID_SHOULDER:
		objidPrifix = "OBJID_SHOULDER";
		break;

	case EQUIP_REGION_ID_SHOES:
		objidPrifix = "OBJID_SHOES";
		break;

	case EQUIP_REGION_ID_ACCESSORY_1:
		objidPrifix = "OBJID_ACCESSORY_1";
		break;

	case EQUIP_REGION_ID_ACCESSORY_2:
		objidPrifix = "OBJID_ACCESSORY_2";
		break;
	}
	objSelect = HtmlGetElementById(objidPrifix);
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
		objArySlots.push(HtmlGetElementById(objidPrifix + "_CARD_" + idx));
	}


	//----------------------------------------------------------------
	// カード欄の再構築
	//----------------------------------------------------------------

	// 項目の全削除
	for (idx = 0; idx < objArySlots.length; idx++) {
		if (objArySlots[idx] == null) {
			continue;
		}

		HtmlRemoveAllChild(objArySlots[idx]);

		// エンチャント検索ショートカットボタンの削除
		var enchSearchBtn = objArySlots[idx].parentNode.querySelector('.ench-search-shortcut-btn');
		if (enchSearchBtn) enchSearchBtn.remove();
	}


	// 選択肢を求めて、欄を構築する
	BuildUpCardSlots(eqpRgnId, CollectCardSlotChoices(eqpRgnId, itemId), objArySlots);

}

/**
 * カードスロットの再構築
 * @param {number} eqpRgnId 装備部位ID
 * @param {Array<object>} choices スロットごとの選択肢（CollectCardSlotChoices の戻り値）
 * @param {Array<HTMLSelectElement|null>} objArySlots Selectオブジェクトの配列（画面に無い欄は null）
 */
function BuildUpCardSlots(eqpRgnId, choices, objArySlots) {

	for (let idxSlot = 0; idxSlot < objArySlots.length; idxSlot++) {

		const objSelect = objArySlots[idxSlot];
		if (!objSelect) {
			continue;
		}

		const choice = choices[idxSlot];

		switch (choice.type) {
		case SLOT_CHOICE_ENCHANT:
			BuildUpEnchantSelect(objSelect, choice);
			break;

		case SLOT_CHOICE_CARD:
			BuildUpCardSelect(eqpRgnId, objSelect, choice);
			break;

		default:
			HtmlCreateElementOption(CARD_ID_NONE, "-", objSelect);
			break;
		}
	}
}

/**
 * 一般エンチャント枠のセレクトボックスを構築する.
 * @param {HTMLSelectElement} objSelect 対象のセレクトボックス
 * @param {object} choice 一般エンチャント枠の選択肢
 */
function BuildUpEnchantSelect(objSelect, choice) {

	if (choice.hasNone) {
		HtmlCreateElementOption(CARD_ID_NONE, "エンチャントなし", objSelect);
	}

	for (const group of choice.groups) {
		const objSelectGroup = HtmlCreateElement("optgroup", objSelect);
		objSelectGroup.setAttribute("label", group.label);
		objSelectGroup.setAttribute("data-ench-list-id", group.enchListId);

		for (const option of group.options) {
			HtmlCreateElementOption(option.cardId, option.name, objSelectGroup);
		}
	}

	// エンチャント検索ショートカットボタン
	(function(selectEl) {
		var parent = selectEl.parentNode;
		parent.style.position = 'relative';
		parent.classList.add('ench-search-shortcut-parent');

		var searchBtn = document.createElement('button');
		searchBtn.type = 'button';
		searchBtn.className = 'ench-search-shortcut-btn';
		searchBtn.title = 'エンチャント検索';
		searchBtn.addEventListener('click', function() {
			var enchId = selectEl.value;
			if (!enchId || enchId == '0') return;
			var enchSearchEl = document.getElementById('ench_search');
			if (!enchSearchEl) return;
			// 同じエンチャントで検索中なら解除、そうでなければ検索
			var newVal = enchSearchEl.value === enchId ? '' : enchId;
			setSelectValueSynced('#ench_search', newVal);
		});
		parent.appendChild(searchBtn);
	})(objSelect);
}

/**
 * カード枠のセレクトボックスを構築する.
 * 選択状態は、現在のカード（n_A_card）が新しい選択肢にも有ればそれを引き継ぐ。
 * @param {number} eqpRgnId 装備部位ID
 * @param {HTMLSelectElement} objSelect 対象のセレクトボックス
 * @param {object} choice カード枠の選択肢
 */
function BuildUpCardSelect(eqpRgnId, objSelect, choice) {

	for (const cardId of choice.cardIds) {
		HtmlCreateElementOption(cardId, GetFlagAppendedCardName(cardId), objSelect);
	}

	// 選択項目の復元
	// （エンチャからカードに変化した場合に存在しないIDを指定してしまう問題の対応として、有効なIDだけを引き継ぐ）
	const cardRegionId = GetCardRegionId(eqpRgnId, choice.selectionSlot);
	objSelect.value = ResolveCardSelection(choice, n_A_card[cardRegionId]);
}

/**
 * カードスロットの使用可否を設定する.
 */
export function SetCardSlotEnabilityAll() {

	// 個別関数を全コール
	SetCardSlotEnability(EQUIP_REGION_ID_ARMS);
	SetCardSlotEnability(EQUIP_REGION_ID_ARMS_LEFT);
	SetCardSlotEnability(EQUIP_REGION_ID_HEAD_TOP);
	SetCardSlotEnability(EQUIP_REGION_ID_HEAD_MID);
	SetCardSlotEnability(EQUIP_REGION_ID_HEAD_UNDER);
	SetCardSlotEnability(EQUIP_REGION_ID_SHIELD);
	SetCardSlotEnability(EQUIP_REGION_ID_BODY);
	SetCardSlotEnability(EQUIP_REGION_ID_SHOULDER);
	SetCardSlotEnability(EQUIP_REGION_ID_SHOES);
	SetCardSlotEnability(EQUIP_REGION_ID_ACCESSORY_1);
	SetCardSlotEnability(EQUIP_REGION_ID_ACCESSORY_2);
}

/**
 * 変更された装備欄に紐づくカードスロットを初期化する。シャドウ装備の場合は何もしない。
 * @param {*} eqpRgnId 
 * @returns 
 */
export function SetCardSlotEnability(eqpRgnId) {
	var strObjIdPrifix = "";
	var idx = 0;
	var strObjId = "";
	var objSelect = null;
	var usable = false;
	// サブ関数をコール
	switch (eqpRgnId) {
		case EQUIP_REGION_ID_ARMS:
			strObjIdPrifix = "OBJID_ARMS_RIGHT";
			break;
		case EQUIP_REGION_ID_ARMS_LEFT:
			strObjIdPrifix = "OBJID_ARMS_LEFT";
			break;
		case EQUIP_REGION_ID_HEAD_TOP:
			strObjIdPrifix = "OBJID_HEAD_TOP";
			break;
		case EQUIP_REGION_ID_HEAD_MID:
			strObjIdPrifix = "OBJID_HEAD_MID";
			break;
		case EQUIP_REGION_ID_HEAD_UNDER:
			strObjIdPrifix = "OBJID_HEAD_UNDER";
			break;
		case EQUIP_REGION_ID_SHIELD:
			strObjIdPrifix = "OBJID_SHIELD";
			break;
		case EQUIP_REGION_ID_BODY:
			strObjIdPrifix = "OBJID_BODY";
			break;
		case EQUIP_REGION_ID_SHOULDER:
			strObjIdPrifix = "OBJID_SHOULDER";
			break;
		case EQUIP_REGION_ID_SHOES:
			strObjIdPrifix = "OBJID_SHOES";
			break;
		case EQUIP_REGION_ID_ACCESSORY_1:
			strObjIdPrifix = "OBJID_ACCESSORY_1";
			break;
		case EQUIP_REGION_ID_ACCESSORY_2:
			strObjIdPrifix = "OBJID_ACCESSORY_2";
			break;
		default:
			return;
	}
	// 当該プリフィックスを持つ全要素に対して実行
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
		// 対象オブジェクトを特定
		strObjId = strObjIdPrifix + "_CARD_" + idx;
		objSelect = HtmlGetElementById(strObjId);
		// 選択項目がひとつ（カードなし／エンチャントなし）しかない場合、操作不可にする
		usable = objSelect.options.length > 1;
		// 強制条件
		// 左手は二刀流の場合のみ利用可能
		if (eqpRgnId == EQUIP_REGION_ID_ARMS_LEFT) {
			usable = ((usable) & (n_Nitou));
		}
		// 盾は二刀流の場合、利用不可
		if (eqpRgnId == EQUIP_REGION_ID_SHIELD) {
			usable = ((usable) & (!n_Nitou));
		}
		// サブ関数をコール
		__SetCardSlotEnability(objSelect, usable);
	}
}

function __SetCardSlotEnability(objTarget, enabled) {

	if (objTarget == null) {
		return;
	}

	// 使用可否設定
	objTarget.disabled = !enabled;

	// 可視設定
	if (enabled) {
		objTarget.style.visibility = "visible";
	} else {
		objTarget.style.visibility = "hidden";
	}
}

/************************************************************************************************
 *
 * カードのショートカットを適用する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param objidPrifix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
export function ApplyCardShort(eqpRgnId, objidPrifix) {

	var idx = 0;
	var idxOption = 0;

	var cardSCIdx = 0;
	var cardIdToSet = 0;

	var itemId = 0;
	var itemData = null;

	var slotCountMax = 0;
	var slotCountLooped = 0;

	var objSelect = null;
	var objSelect1 = null;
	var objOption = null;

	// 変更後のカードショートカットのインデックスを取得
	cardSCIdx = HtmlGetObjectValueById(objidPrifix + "_CARD_SHORT", 0);

	// 当該装備の情報を取得
	itemId = n_A_Equip[eqpRgnId];
	itemData = ItemObjNew[itemId];

	// 最大スロット数を取得
	slotCountMax = GetMaxSlot(itemData[ITEM_DATA_INDEX_SLOT]);

	// カードスロット数分ループ
	slotCountLooped = 0;
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {

		// TODO: 不要な気がしたので実装先送り
		// 装備のスロット数を越えたら処理終了
		// if (slotCountMax < ++slotCountLooped) {
		// 	break;
		// }

		// 設定対象のセレクトボックスを特定
		objSelect = document.getElementById(objidPrifix + "_CARD_" + idx);
		if (!objSelect) {
			continue;
		}
		// 1枚目のSelectオブジェクトを控える
		if (idx == 1) {
			objSelect1 = objSelect;
		}

		// 設定するＩＤを取得
		cardIdToSet = CardShortObj[cardSCIdx][idx];

		// MAX値を設定している場合は、1枚目からカードIDをコピーする
		if (cardIdToSet == CARD_ID_MAX) {
			cardIdToSet = objSelect1.value;
		}

		// 選択可能であることを確認してからセットする
		for (idxOption = 0; idxOption < objSelect.options.length; idxOption++) {

			objOption = objSelect.options[idxOption];

			if (objOption.value == cardIdToSet) {

				// ショートカットデータから、カードを引き当て
				HtmlSetObjectValueById(objidPrifix + "_CARD_" + idx, cardIdToSet);

				// 正本を更新
				SetSlotCardId(eqpRgnId, idx - SLOT_INDEX_CARD_MIN, Number(cardIdToSet));

				break;
			}
		}
	}

	// ステータス再計算
	StAllCalc();

	// 攻撃手段の更新
	g_attackMethodBridge.rebuildControls?.();

	// 検索可能リスト更新
	LoadTomSelect();
}



