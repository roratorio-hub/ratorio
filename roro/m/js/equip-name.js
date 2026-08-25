/**
 * 装備品名・カード名に「習得効果」フラグを付加する関数群.
 *
 * 実体は equip.js にあったが、CItemInfoManager.js / hmcard.js との循環 import
 * （CItemInfoManager → equip / hmcard → equip）を断ち切るため、依存が
 * item.dat.js・card.dat.js・itemset.dat.js・const/*.js のみの葉モジュールへ切り出した。
 * equip.js はこの3関数を re-export する。
 */

import { ItemObjNew } from './item.dat.js';
import { CardObjNew } from './card.dat.js';
import { CardIdToSetIdMap, ItemIdToSetIdMap, w_SE } from './itemset.dat.js';
import { CONST_DATA_KIND_CARD, CONST_DATA_KIND_ITEM } from './const/EnumConstDataKind.js';
import { CARD_DATA_INDEX_NAME, CARD_DATA_INDEX_SPBEGIN } from './const/EnumCardDataIndex.js';
import { ITEM_DATA_INDEX_NAME, ITEM_DATA_INDEX_SPBEGIN } from './const/EnumItemDataIndex.js';
import { ITEM_SP_LEARNED_SKILL_EFFECT } from './const/EnumItemSpId.js';

/**
 * アイテム名に「習得効果」フラグを付加して返す.
 * @param {number} targetId アイテムID
 * @return {string} フラグ付加済みのアイテム名
 */
export function GetFlagAppendedItemName(targetId) {

	var baseName = "";

	baseName = ItemObjNew[targetId][ITEM_DATA_INDEX_NAME];

	return (IsLearnedEffectEquipable(CONST_DATA_KIND_ITEM, targetId)) ? ("【習】" + baseName) : baseName;
}

/**
 * カード名に「習得効果」フラグを付加して返す.
 * @param {number} targetId カードID
 * @return {string} フラグ付加済みのカード名
 */
export function GetFlagAppendedCardName(targetId) {

	var baseName = "";

	baseName = CardObjNew[targetId][CARD_DATA_INDEX_NAME];

	return (IsLearnedEffectEquipable(CONST_DATA_KIND_CARD, targetId)) ? ("【習】" + baseName) : baseName;
}

/**
 * 指定アイテム／カード（単品・セット双方）が習得効果を持つかどうかを判定する.
 * @param {number} dataKind CONST_DATA_KIND_ITEM または CONST_DATA_KIND_CARD
 * @param {number} targetId アイテムIDまたはカードID
 * @return {boolean} 習得効果を持つ場合 true
 */
export function IsLearnedEffectEquipable(dataKind, targetId) {

	var idx = 0;
	var idxSet = 0;
	var setIndexArray; var setIndex; var setDataId;

	// アイテム単品を判定
	if (dataKind == CONST_DATA_KIND_ITEM) {
		for (idx = ITEM_DATA_INDEX_SPBEGIN; idx < ItemObjNew[targetId].length; idx += 2) {
			if (ItemObjNew[targetId][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				return true;
			}
		}
		setIndexArray = ItemIdToSetIdMap[targetId];
	}

	// カード単品を判定
	else {
		for (idx = CARD_DATA_INDEX_SPBEGIN; idx < CardObjNew[targetId].length; idx += 2) {
			if (CardObjNew[targetId][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				return true;
			}
		}
		setIndexArray = CardIdToSetIdMap[targetId];
	}

	// セットでの対象を判定
	if (setIndexArray) {

		for (idxSet = 0; idxSet < setIndexArray.length; idxSet++) {

			setIndex = setIndexArray[idxSet];

			setDataId = w_SE[setIndex][0];

			// セット定義のアイテムを判定
			if (setDataId >= 0) {
				for (idx = ITEM_DATA_INDEX_SPBEGIN; idx < ItemObjNew[setDataId].length; idx += 2) {
					if (ItemObjNew[setDataId][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
						return true;
					}
				}
			}

			// セット定義のカードを判定
			else {
				for (idx = CARD_DATA_INDEX_SPBEGIN; idx < CardObjNew[Math.abs(setDataId)].length; idx += 2) {
					if (CardObjNew[Math.abs(setDataId)][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
						return true;
					}
				}
			}
		}
	}

	return false;
}
