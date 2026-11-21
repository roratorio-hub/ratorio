/**
 * カード・エンチャント欄の選択肢（候補）を、DOM に触れずに求める.
 *
 * 「そのアイテムのスロットに何を付けられるか」の唯一の定義。欄の描画（hmcard.js）、
 * セーブデータのロード時の実在チェック、装備変更時の選択状態の引き継ぎが、すべてここを参照する。
 * データ（card.dat.js / mig.enchlist.dat.js 等）と引数だけで決まる。
 */

import { g_constDataManager } from "../runtime/global.js";
import {
    CARD_ID_ENCHANT_ARMS_ELEMENT_DARK, CARD_ID_ENCHANT_ARMS_ELEMENT_EARTH, CARD_ID_ENCHANT_ARMS_ELEMENT_FIRE,
    CARD_ID_ENCHANT_ARMS_ELEMENT_HOLY, CARD_ID_ENCHANT_ARMS_ELEMENT_POISON, CARD_ID_ENCHANT_ARMS_ELEMENT_PSYCO,
    CARD_ID_ENCHANT_ARMS_ELEMENT_WATER, CARD_ID_ENCHANT_ARMS_ELEMENT_WIND, CARD_ID_ENCHANT_BOSOSHITA_MARYOKU,
    CARD_ID_ENCHANT_DELAY_DOWN_15, CARD_ID_ENCHANT_GOKETSU, CARD_ID_ENCHANT_HAO, CARD_ID_ENCHANT_KOGEKISOKUDO_4,
    CARD_ID_ENCHANT_KOSOKU, CARD_ID_ENCHANT_KUMANO_CHIKARA, CARD_ID_ENCHANT_KYOGEKI_4, CARD_ID_ENCHANT_KYOGEKI_5,
    CARD_ID_ENCHANT_MARYOKU_4, CARD_ID_ENCHANT_MDEF_10, CARD_ID_ENCHANT_MEIKYU_4, CARD_ID_ENCHANT_OWASHINO_GANKO,
    CARD_ID_ENCHANT_SATSUINO_ONNEN, CARD_ID_ENCHANT_SHINO_YOKUDO, CARD_ID_ENCHANT_SHINRINO_KAIHO,
    CARD_ID_ENCHANT_SPECIAL_AGI, CARD_ID_ENCHANT_SPECIAL_DEX, CARD_ID_ENCHANT_SPECIAL_INT, CARD_ID_ENCHANT_SPECIAL_LUK,
    CARD_ID_ENCHANT_SPECIAL_STR, CARD_ID_ENCHANT_SPECIAL_VIT, CARD_ID_ENCHANT_TOSHI_10, CARD_ID_ENCHANT_ZOFUKU_4,
    CARD_ID_ENCHANT_ZOFUKU_5, CARD_ID_NONE, CardObjNew, CardSortOBJ,
} from "./card.dat.js";
import { ITEM_ID_ALPHA_CORE_CARD_ENCHANTABLE, ITEM_ID_KAITEI_SHINDENNO_ZAIHO_CARD_ENCHANTABLE, ITEM_ID_RUNE_HELM } from "./item.dat.js";
import { MIG_ENCH_LIST_ID_SHINENNO_KAIRO_UPGRADE, MIG_ENCH_LIST_ID_SHINENTAIBUKI_UPGRADE } from "../data/mig.enchlist.dat.js";
import { MigGetBorderFlagText } from "../data/mig.itemsp.h.js";
import { SLOT_INDEX_CARD_MIN, SLOT_INDEX_CARD_MAX } from "./slotpager-const.js";
import {
    CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ACCESSORY_2, CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2,
    CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4, CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2,
    CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4, CARD_REGION_ID_BODY,
    CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3,
    CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3,
    CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3,
    CARD_REGION_ID_ENCHANT_HEAD_MID_1, CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3,
    CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3,
    CARD_REGION_ID_ENCHANT_HEAD_UNDER_1, CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3,
    CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3,
    CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3,
    CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3,
    CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_UNDER, CARD_REGION_ID_SHIELD,
    CARD_REGION_ID_SHOES, CARD_REGION_ID_SHOULDER,
} from "../runtime/common.js";
import { CARD_DATA_INDEX_NAME } from "../const/EnumCardDataIndex.js";
import {
    CARD_KIND_ACCESSORY, CARD_KIND_ACCESSORY_ON1, CARD_KIND_ACCESSORY_ON2, CARD_KIND_ARMS, CARD_KIND_BODY, CARD_KIND_FOOT,
    CARD_KIND_HEAD, CARD_KIND_MID, CARD_KIND_NONE, CARD_KIND_SHIELD, CARD_KIND_SHOULDER, CARD_KIND_TOP,
} from "../const/EnumCardKind.js";
import { CONST_DATA_KIND_ENCHANT_LIST } from "../const/EnumConstDataKind.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY,
    EQUIP_REGION_ID_HEAD_MID, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES,
    EQUIP_REGION_ID_SHOULDER,
} from "../const/EnumEquipRegionId.js";
import { MIG_BORDER_FLAG_ID_OVER } from "../const/EnumMigBorderFlagId.js";
import {
    MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD,
    MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SLOT, MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_EFFECT_LIST,
    MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_ENCHANT, MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SELECT,
    MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT, MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V2,
    MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V3, MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V4,
    MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_STAGE, MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_STAGE_V2,
    MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION, MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION_V2,
    MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION_V3,
} from "../const/EnumMigEquipableSpId.js";

//================================================================================================
// 装備領域とカード領域（n_A_card の添字）の対応
//================================================================================================

/** 選択肢の種類: エンチャント枠 */
export const SLOT_CHOICE_ENCHANT = "enchant";
/** 選択肢の種類: カード枠 */
export const SLOT_CHOICE_CARD = "card";
/** 選択肢の種類: 使用しない枠（「-」のみ） */
export const SLOT_CHOICE_DUMMY = "dummy";

/**
 * 装備領域ごとの、スロット1〜4（添字0〜3）に対応するカード領域ID（n_A_card の添字）.
 * 武器以外は、スロット1がカード、スロット2〜4が一般エンチャント。
 */
const CARD_REGION_IDS_BY_EQUIP_REGION = new Map([
    [EQUIP_REGION_ID_ARMS, [CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2, CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4]],
    [EQUIP_REGION_ID_ARMS_LEFT, [CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2, CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4]],
    [EQUIP_REGION_ID_HEAD_TOP, [CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3]],
    [EQUIP_REGION_ID_HEAD_MID, [CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_ENCHANT_HEAD_MID_1, CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3]],
    [EQUIP_REGION_ID_HEAD_UNDER, [CARD_REGION_ID_HEAD_UNDER, CARD_REGION_ID_ENCHANT_HEAD_UNDER_1, CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3]],
    [EQUIP_REGION_ID_SHIELD, [CARD_REGION_ID_SHIELD, CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3]],
    [EQUIP_REGION_ID_BODY, [CARD_REGION_ID_BODY, CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3]],
    [EQUIP_REGION_ID_SHOULDER, [CARD_REGION_ID_SHOULDER, CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3]],
    [EQUIP_REGION_ID_SHOES, [CARD_REGION_ID_SHOES, CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3]],
    [EQUIP_REGION_ID_ACCESSORY_1, [CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3]],
    [EQUIP_REGION_ID_ACCESSORY_2, [CARD_REGION_ID_ACCESSORY_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3]],
]);

/**
 * 装備領域・スロット番号（0〜3）に対応するカード領域IDを返す.
 * @param {number} eqpRgnId 装備領域ID（本体装備11部位）
 * @param {number} slotIndex スロット番号（0〜3）
 * @returns {number|undefined} カード領域ID（対象外の領域なら undefined）
 */
export function GetCardRegionId(eqpRgnId, slotIndex) {
    return CARD_REGION_IDS_BY_EQUIP_REGION.get(eqpRgnId)?.[slotIndex];
}

//================================================================================================
// 選択肢の算出
//================================================================================================

/**
 * アイテムのスロットに付けられるカード・エンチャントの選択肢を、スロット1〜4（配列の添字0〜3）ごとに返す.
 *
 * 各要素は次のいずれか:
 * - `{ type: "enchant", hasNone, groups }`: 一般エンチャント枠。`hasNone` は「エンチャントなし」を選べるか。
 *   `groups` は `{ enchListId, label, options: [{ cardId, name }] }` の配列（エンチャント種別ごと）。
 * - `{ type: "card", cardIds, selectionSlot }`: カード枠。`cardIds` は選べるカードID。
 *   `selectionSlot` は、装備変更時に現在値を引き継ぐ元のスロット番号（武器は同じスロット、それ以外は先頭スロット）。
 * - `{ type: "dummy" }`: 使用しない枠。
 *
 * @param {number} eqpRgnId 装備領域ID（本体装備11部位）
 * @param {number} itemId アイテムID
 * @returns {Array<object>} 長さ4の配列
 */
export function CollectCardSlotChoices(eqpRgnId, itemId) {
    const enchInfoArrayAllSlots = collectEnchInfoOfItem(itemId);
    const choices = [];
    for (let idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {
        choices.push(buildSlotChoice(eqpRgnId, itemId, idxSlot, enchInfoArrayAllSlots[idxSlot]));
    }
    return choices;
}

/**
 * アイテムに紐づく全エンチャントリストから、スロットごとの候補情報を集める.
 * @param {number} itemId アイテムID
 * @returns {Array<Array>} スロットごとの `[enchListId, cardId, params, order]` の配列
 */
function collectEnchInfoOfItem(itemId) {
    const slotCount = SLOT_INDEX_CARD_MAX - SLOT_INDEX_CARD_MIN + 1;
    const enchListDataManager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
    const enchListIdArray = enchListDataManager.GetEnchListIdArrayByItemId(itemId);

    const result = [];
    for (let idxSlot = 0; idxSlot < slotCount; idxSlot++) {
        result[idxSlot] = [];
    }

    for (const enchListId of enchListIdArray) {
        // 収集済みのデータは、アップグレード系エンチャントの判定に使う
        const collected = RebuildCardSelectSubCollectEnchListData(enchListId, result);
        for (let idxSlot = 0; idxSlot < collected.length; idxSlot++) {
            result[idxSlot] = result[idxSlot].concat(collected[idxSlot]);
        }
    }
    return result;
}

/**
 * 1スロット分の選択肢を求める.
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} itemId アイテムID
 * @param {number} idxSlot スロット番号（0〜3）
 * @param {Array} enchInfoArray このスロットの一般エンチャント候補
 * @returns {object} 選択肢（`CollectCardSlotChoices` 参照）
 */
function buildSlotChoice(eqpRgnId, itemId, idxSlot, enchInfoArray) {

    // 一般エンチャント用のスロット
    if (enchInfoArray.length !== 0) {
        return {
            type: SLOT_CHOICE_ENCHANT,
            // ルーンヘルムの4番目は、ミレニアムシールドのオンオフ機能に使っているため「エンチャントなし」を持たない
            hasNone: !((itemId == ITEM_ID_RUNE_HELM) && (idxSlot === 3)),
            groups: buildEnchantGroups(enchInfoArray),
        };
    }

    // カード効果がエンチャントされるアイテムの4番目は、本来のカード枠として扱う
    const bCardEnchantable = (idxSlot === 3)
        && ((itemId == ITEM_ID_KAITEI_SHINDENNO_ZAIHO_CARD_ENCHANTABLE) || (itemId == ITEM_ID_ALPHA_CORE_CARD_ENCHANTABLE));

    if (!bCardEnchantable) {
        switch (eqpRgnId) {
        case EQUIP_REGION_ID_HEAD_UNDER:
            return { type: SLOT_CHOICE_DUMMY };

        case EQUIP_REGION_ID_ARMS:
        case EQUIP_REGION_ID_ARMS_LEFT:
            break;

        default:
            // 武器以外は、2番目以降のスロットにカードを付けられない
            if (idxSlot >= 1) {
                return { type: SLOT_CHOICE_DUMMY };
            }
        }
    }

    const cardIds = getSelectableCardIds(eqpRgnId, idxSlot);
    if (!cardIds) {
        return { type: SLOT_CHOICE_DUMMY };
    }
    const bArms = (eqpRgnId === EQUIP_REGION_ID_ARMS) || (eqpRgnId === EQUIP_REGION_ID_ARMS_LEFT);
    return { type: SLOT_CHOICE_CARD, cardIds, selectionSlot: bArms ? idxSlot : 0 };
}

/**
 * 一般エンチャントの候補を、エンチャント種別ごとのグループにまとめる.
 * @param {Array} enchInfoArray `[enchListId, cardId, params, order]` の配列
 * @returns {Array<{enchListId: number, label: string, options: Array<{cardId: number, name: string}>}>}
 */
function buildEnchantGroups(enchInfoArray) {
    const groups = [];
    const addedKeys = [];
    let enchListIdLast = -1;
    let group = null;

    for (const enchInfo of enchInfoArray) {

        // エンチャント種別が変わるたびにグループを作る
        if (enchListIdLast != enchInfo[0]) {
            group = {
                enchListId: enchInfo[0],
                label: g_constDataManager.GetName(CONST_DATA_KIND_ENCHANT_LIST, enchInfo[0]),
                options: [],
            };
            groups.push(group);
            enchListIdLast = enchInfo[0];
        }

        const cardId = enchInfo[1];

        // 同じ種別内で既に追加済みの選択肢は追加しない
        const key = enchListIdLast + "-" + cardId;
        if (addedKeys.indexOf(key) >= 0) {
            continue;
        }
        addedKeys.push(key);

        // 精錬条件を名前に付ける
        let name = CardObjNew[cardId][CARD_DATA_INDEX_NAME];
        const params = enchInfo[2];
        if (params.refinedBorderBase && params.refinedBorderFlag) {
            if (!((params.refinedBorderBase == 0) && (params.refinedBorderFlag == MIG_BORDER_FLAG_ID_OVER))) {
                name += " (+" + params.refinedBorderBase + MigGetBorderFlagText(params.refinedBorderFlag, true) + ")";
            }
        }

        group.options.push({ cardId, name });
    }
    return groups;
}

/**
 * 装備領域・スロット番号に応じた、選べるカードIDの一覧を返す.
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} idxSlot スロット番号（0〜3）
 * @returns {number[]|null} カードIDの配列（カードを付けられない領域なら null）
 */
function getSelectableCardIds(eqpRgnId, idxSlot) {
    switch (eqpRgnId) {
    case EQUIP_REGION_ID_ARMS:
    case EQUIP_REGION_ID_ARMS_LEFT:
        return (idxSlot === 0) ? CardSortOBJ[CARD_KIND_NONE] : CardSortOBJ[CARD_KIND_ARMS];

    case EQUIP_REGION_ID_HEAD_TOP:
        return Array.from(new Set(CardSortOBJ[CARD_KIND_HEAD].concat(CardSortOBJ[CARD_KIND_TOP])));

    case EQUIP_REGION_ID_HEAD_MID:
        return Array.from(new Set(CardSortOBJ[CARD_KIND_HEAD].concat(CardSortOBJ[CARD_KIND_MID])));

    case EQUIP_REGION_ID_SHIELD:
        return CardSortOBJ[CARD_KIND_SHIELD];

    case EQUIP_REGION_ID_BODY:
        return CardSortOBJ[CARD_KIND_BODY];

    case EQUIP_REGION_ID_SHOULDER:
        return CardSortOBJ[CARD_KIND_SHOULDER];

    case EQUIP_REGION_ID_SHOES:
        return CardSortOBJ[CARD_KIND_FOOT];

    case EQUIP_REGION_ID_ACCESSORY_1:
        return Array.from(new Set(CardSortOBJ[CARD_KIND_ACCESSORY].concat(CardSortOBJ[CARD_KIND_ACCESSORY_ON1])));

    case EQUIP_REGION_ID_ACCESSORY_2:
        return Array.from(new Set(CardSortOBJ[CARD_KIND_ACCESSORY].concat(CardSortOBJ[CARD_KIND_ACCESSORY_ON2])));
    }
    return null;
}

//================================================================================================
// 選択状態の正規化
//================================================================================================

/**
 * 現在のカードIDが、そのスロットの選択肢として有効なら返し、無ければ「なし」(0) を返す.
 * 装備変更で別のアイテムになったときに、引き継げるカードだけを残すために使う。
 * @param {object} slotChoice 1スロット分の選択肢
 * @param {number} cardId 現在のカードID
 * @returns {number} 引き継ぐカードID
 */
export function ResolveCardSelection(slotChoice, cardId) {
    if (slotChoice.type === SLOT_CHOICE_CARD && slotChoice.cardIds.includes(cardId)) {
        return cardId;
    }
    return CARD_ID_NONE;
}

/**
 * セーブデータ等から得たカードID・エンチャント種別IDを、選択肢に実在する組み合わせへ正規化する.
 *
 * 指定の種別内に無ければ全体から探し、見つかればその種別IDを採用する。
 * どこにも無ければカードIDごと「なし」(0) にする。
 * @param {object} slotChoice 1スロット分の選択肢
 * @param {number} cardId カードID
 * @param {number} enchListId エンチャント種別ID（不明なら 0）
 * @returns {{cardId: number, enchListId: number}}
 */
export function NormalizeCardSelection(slotChoice, cardId, enchListId) {

    // 「なし」にはエンチャント種別を持たせない
    if (cardId === CARD_ID_NONE) {
        return { cardId: CARD_ID_NONE, enchListId: 0 };
    }

    if (slotChoice.type === SLOT_CHOICE_CARD) {
        return slotChoice.cardIds.includes(cardId)
            ? { cardId, enchListId: 0 }
            : { cardId: CARD_ID_NONE, enchListId: 0 };
    }

    if (slotChoice.type === SLOT_CHOICE_ENCHANT) {

        // 1. 指定された種別内にあるか（種別不明=0 ではここではヒットさせない）
        if (enchListId !== 0) {
            const hit = slotChoice.groups.some((g) => g.enchListId == enchListId && g.options.some((o) => o.cardId == cardId));
            if (hit) {
                return { cardId, enchListId };
            }
        }

        // 2. 全体から探し、見つけた種別を採用する
        for (const group of slotChoice.groups) {
            if (group.options.some((o) => o.cardId == cardId)) {
                return { cardId, enchListId: Number(group.enchListId) };
            }
        }
    }

    return { cardId: CARD_ID_NONE, enchListId: 0 };
}

//================================================================================================
// エンチャントリストの収集（旧 hmcard.js。DOM に触れない）
//================================================================================================

/**
 * エンチャントリストデータを収集する
 * @param {*} enchListId 収集対象のエンチャントリストID
 * @param {*} enchInfoArrayAllSlotsBefore これまでに、収集されたデータの配列（アップグレードの判定に使用）
 * @returns 
 */
export function RebuildCardSelectSubCollectEnchListData(enchListId, enchInfoArrayAllSlotsBefore) {
	var idx = 0;
	var idxSlot = 0;
	var idxEnchList = 0;
	var enchListData = null;
	var enchListDataManager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
	var enchInfoArray = null;
	var enchInfoArrayAllSlots = null;

	var funcTargetIdCollector = function (enchListIdF, slotF, spDataF, paramsF) {

		var idxF = 0;
		var slotArrayF = null;
		var childrenF = null;
		var cardIdArrayF = null;
		var resultF = null;


		resultF = [];


		switch (spDataF.GetSpId()) {
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_ENCHANT:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SELECT:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_STAGE:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_STAGE_V2:

			// 対象スロットの配列を取得
			slotArrayF = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SLOT);

			if (!Array.isArray(slotArrayF)) {
				return resultF;
			}

			// 指定のスロットが含まれなければ、処理打ち切り
			if (slotArrayF.indexOf(5 - slotF) < 0) {
				return resultF;
			}

			break;

		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V2:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V3:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V4:

			// 対象スロットの配列を取得
			slotArrayF = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SLOT);

			if (!Array.isArray(slotArrayF)) {
				return resultF;
			}

			// 指定のスロットが含まれなければ、処理打ち切り
			if (slotArrayF.indexOf(slotF) < 0) {
				return resultF;
			}

			break;

		case MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION_V2:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION_V3:
			paramsF = Object.assign({}, paramsF);
			paramsF.refinedBorderBase = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
			paramsF.refinedBorderFlag = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
			break;

		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_EFFECT_LIST:

			// 深淵の回廊アップグレード
			if (enchListIdF == MIG_ENCH_LIST_ID_SHINENNO_KAIRO_UPGRADE) {
				RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo(enchInfoArrayAllSlotsBefore[slotF - 1], resultF, enchListIdF, paramsF);
			}

			// 思念体武器アップグレード
			else if (enchListIdF == MIG_ENCH_LIST_ID_SHINENTAIBUKI_UPGRADE) {
				RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki(enchInfoArrayAllSlotsBefore[slotF - 1], resultF, enchListIdF, paramsF);
			}

			// その他、一般エンチャントの場合
			else {

				// 対象エンチャントの配列を取得して、すべてを追加
				cardIdArrayF = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD);

				for (idxF = 0; idxF < cardIdArrayF.length; idxF++) {
					resultF.push([enchListIdF, cardIdArrayF[idxF], paramsF]);
				}
			}
			break;

		}


		// Collect child data
		childrenF = spDataF.GetChildren();

		if (childrenF) {
			for (idxF = 0; idxF < childrenF.length; idxF++) {
				resultF = resultF.concat(funcTargetIdCollector(enchListIdF, slotF, childrenF[idxF], paramsF));
			}
		}


		return resultF;
	};


	// データ収集用配列用意
	enchInfoArrayAllSlots = [];
	for (idxSlot = 0; idxSlot < (SLOT_INDEX_CARD_MAX - SLOT_INDEX_CARD_MIN + 1); idxSlot++) {
		enchInfoArrayAllSlots[idxSlot] = [];
	}

	// エンチャントリストデータ取得
	enchListData = enchListDataManager.GetDataObject(enchListId);

	// 全SPデータをループ処理
	enchListData.ForEachSpData(
		function (valueF, indexF, arrayF) {

			var idxSlotF = 0;

			// 全スロットをループ処理
			for (idxSlotF = 0; idxSlotF < enchInfoArrayAllSlots.length; idxSlotF++) {
				enchInfoArrayAllSlots[idxSlotF] = enchInfoArrayAllSlots[idxSlotF].concat(funcTargetIdCollector(enchListId, 1 + idxSlotF, valueF, {}));
			}
		}
	);

	// この時点で、当該エンチャントリストのデータは収集が完了している
	// エンチャントの並び順定義に従って、エンチャント効果の順番をソートする
	RebuildCardSelectSubSortCollectedEnchListData(enchInfoArrayAllSlots);


	// 収集したデータを返す
	return enchInfoArrayAllSlots;
}

function RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo(enchInfoArrayBefore, resultArray, enchListId, paramsObject) {

	var idx = 0;

	var funcPushNotExist = function (cardIdF) {

		var idxF = 0;
		for (idxF = 0; idxF < resultArray.length; idxF++) {
			if (resultArray[idxF][1] == cardIdF) {
				return;
			}
		}

		resultArray.push([enchListId, cardIdF, paramsObject]);
	}

	// 処理開始前時点でのエンチャントデータを元に、アップグレード可能なものを特定して追加する
	for (idx = 0; idx < enchInfoArrayBefore.length; idx++) {

		switch (enchInfoArrayBefore[idx][1]) {

		case CARD_ID_ENCHANT_KYOGEKI_4:
			funcPushNotExist(CARD_ID_ENCHANT_KYOGEKI_5);
			break;

		case CARD_ID_ENCHANT_ZOFUKU_4:
			funcPushNotExist(CARD_ID_ENCHANT_ZOFUKU_5);
			break;

		case CARD_ID_ENCHANT_SPECIAL_STR:
			funcPushNotExist(CARD_ID_ENCHANT_TOSHI_10);
			break;

		case CARD_ID_ENCHANT_SPECIAL_AGI:
			funcPushNotExist(CARD_ID_ENCHANT_KOGEKISOKUDO_4);
			break;

		case CARD_ID_ENCHANT_SPECIAL_VIT:
			funcPushNotExist(CARD_ID_ENCHANT_MDEF_10);
			break;

		case CARD_ID_ENCHANT_SPECIAL_INT:
			funcPushNotExist(CARD_ID_ENCHANT_MARYOKU_4);
			break;

		case CARD_ID_ENCHANT_SPECIAL_DEX:
			funcPushNotExist(CARD_ID_ENCHANT_MEIKYU_4);
			break;

		case CARD_ID_ENCHANT_SPECIAL_LUK:
			funcPushNotExist(CARD_ID_ENCHANT_DELAY_DOWN_15);
			break;

		case CARD_ID_ENCHANT_KUMANO_CHIKARA:
			funcPushNotExist(CARD_ID_ENCHANT_HAO);
			break;

		case CARD_ID_ENCHANT_BOSOSHITA_MARYOKU:
			funcPushNotExist(CARD_ID_ENCHANT_SHINRINO_KAIHO);
			break;

		case CARD_ID_ENCHANT_KOSOKU:
			funcPushNotExist(CARD_ID_ENCHANT_SHINO_YOKUDO);
			break;

		case CARD_ID_ENCHANT_OWASHINO_GANKO:
			funcPushNotExist(CARD_ID_ENCHANT_GOKETSU);
			break;

		}
	}
}

function RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki(enchInfoArrayBefore, resultArray, enchListId, paramsObject) {

	var idx = 0;

	var funcPushNotExist = function (cardIdF) {

		var idxF = 0;
		for (idxF = 0; idxF < resultArray.length; idxF++) {
			if (resultArray[idxF][1] == cardIdF) {
				return;
			}
		}

		resultArray.push([enchListId, cardIdF, paramsObject]);
	}

	// 処理開始前時点でのエンチャントデータを元に、アップグレード可能なものを特定して追加する
	for (idx = 0; idx < enchInfoArrayBefore.length; idx++) {

		switch (enchInfoArrayBefore[idx][1]) {

		case CARD_ID_ENCHANT_ARMS_ELEMENT_FIRE:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_WATER:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_WIND:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_EARTH:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_HOLY:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_DARK:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_PSYCO:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_POISON:
			funcPushNotExist(CARD_ID_ENCHANT_SATSUINO_ONNEN);
			break;

		case CARD_ID_ENCHANT_OWASHINO_GANKO:
			funcPushNotExist(CARD_ID_ENCHANT_GOKETSU);
			break;

		case CARD_ID_ENCHANT_KUMANO_CHIKARA:
			funcPushNotExist(CARD_ID_ENCHANT_HAO);
			break;

		case CARD_ID_ENCHANT_BOSOSHITA_MARYOKU:
			funcPushNotExist(CARD_ID_ENCHANT_SHINRINO_KAIHO);
			break;

		}
	}
}


function RebuildCardSelectSubSortCollectedEnchListData(enchInfoArrayAllSlots) {

	var idx = 0;
	var idxSlot = 0;

	var enchInfoArray = null;


	// 全スロットをループ処理
	for (idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {

		// 当該スロットのエンチャント情報配列を取得
		enchInfoArray = enchInfoArrayAllSlots[idxSlot];

		// エンチャント情報配列を全処理
		for (idx = 0; idx < enchInfoArray.length; idx++) {

			// カードIDを元に、順序を特定
			enchInfoArray[idx][3] = g_constDataManager.enchListDataManager.sortedEnchantCardIdArray.indexOf(enchInfoArray[idx][1]);

			// 該当がない場合は、後ろに設定する
			if (enchInfoArray[idx][3] < 0) {

				enchInfoArray[idx][3] = g_constDataManager.enchListDataManager.sortedEnchantCardIdArray.length + idx;
			}
		}

		// 特定した並び順でソート
		enchInfoArray.sort(
			function(a, b) {
				if (a[3] < b[3]) return -1;
				if (a[3] > b[3]) return 1;
				return 0;
			}
		);
	}
}
