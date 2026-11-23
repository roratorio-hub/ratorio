/**
 * 本体装備11部位の「スロット状態」（カード・エンチャントの種別・衣装）の正本.
 *
 * カード欄・衣装欄の select は、ランダムオプション表示中は画面に存在しない（表示モードの切替で
 * 破棄・再生成される）。そのため画面（DOM）ではなく、ここが値を持つ。
 * 書き込み経路はすべてここを更新し、画面はここから描画する。
 * （ランダムオプションは別の正本 `g_equipRndOptTable`（rndopttype.h.js）。シャドウ装備は対象外。）
 *
 * スロット番号は 0〜3（画面の `_CARD_1`〜`_CARD_4` に対応）。
 * 武器は4枠ともカード/エンチャント。武器以外は 0 番がカード、1〜3 番が一般エンチャント。
 */

import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY,
    EQUIP_REGION_ID_HEAD_MID, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES,
    EQUIP_REGION_ID_SHOULDER,
} from "../const/EnumEquipRegionId.js";

/** 1部位あたりのカード・エンチャントのスロット数 */
export const EQUIP_SLOT_COUNT = 4;

/** 対象となる本体装備11部位 */
export const MAIN_EQUIP_REGION_ID_ARRAY = Object.freeze([
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_MID, EQUIP_REGION_ID_HEAD_UNDER,
    EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_SHOULDER, EQUIP_REGION_ID_SHOES,
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2,
]);

/** 装備領域ID → 画面部品のIDプリフィックス */
const OBJID_PREFIX_BY_REGION = new Map([
    [EQUIP_REGION_ID_ARMS, "OBJID_ARMS_RIGHT"],
    [EQUIP_REGION_ID_ARMS_LEFT, "OBJID_ARMS_LEFT"],
    [EQUIP_REGION_ID_HEAD_TOP, "OBJID_HEAD_TOP"],
    [EQUIP_REGION_ID_HEAD_MID, "OBJID_HEAD_MID"],
    [EQUIP_REGION_ID_HEAD_UNDER, "OBJID_HEAD_UNDER"],
    [EQUIP_REGION_ID_SHIELD, "OBJID_SHIELD"],
    [EQUIP_REGION_ID_BODY, "OBJID_BODY"],
    [EQUIP_REGION_ID_SHOULDER, "OBJID_SHOULDER"],
    [EQUIP_REGION_ID_SHOES, "OBJID_SHOES"],
    [EQUIP_REGION_ID_ACCESSORY_1, "OBJID_ACCESSORY_1"],
    [EQUIP_REGION_ID_ACCESSORY_2, "OBJID_ACCESSORY_2"],
]);

const REGION_BY_OBJID_PREFIX = new Map([...OBJID_PREFIX_BY_REGION].map(([eqpRgnId, prefix]) => [prefix, eqpRgnId]));

/** 部位ごとの状態 */
const stateByRegion = new Map();

function createRegionState() {
    return {
        cardIds: new Array(EQUIP_SLOT_COUNT).fill(0),
        categoryIds: new Array(EQUIP_SLOT_COUNT).fill(0),
        costumeId: 0,
    };
}

/** すべての部位を初期状態（カード・エンチャント・衣装なし）に戻す. */
export function ResetEquipSlotState() {
    stateByRegion.clear();
    for (const eqpRgnId of MAIN_EQUIP_REGION_ID_ARRAY) {
        stateByRegion.set(eqpRgnId, createRegionState());
    }
}

ResetEquipSlotState();

/**
 * 本体装備11部位のいずれかか.
 * @param {number} eqpRgnId 装備領域ID
 * @returns {boolean}
 */
export function IsMainEquipRegion(eqpRgnId) {
    return stateByRegion.has(eqpRgnId);
}

/**
 * 装備領域IDに対応する、画面部品のIDプリフィックス（例: `OBJID_ARMS_RIGHT`）を返す.
 * @param {number} eqpRgnId 装備領域ID
 * @returns {string|undefined} 本体装備以外なら undefined
 */
export function GetEquipRegionObjIdPrefix(eqpRgnId) {
    return OBJID_PREFIX_BY_REGION.get(eqpRgnId);
}

/**
 * 画面部品のIDプリフィックス（例: `OBJID_ARMS_RIGHT`）に対応する装備領域IDを返す.
 * @param {string} objIdPrefix IDプリフィックス
 * @returns {number|undefined} 本体装備以外なら undefined
 */
export function GetEquipRegionIdByObjIdPrefix(objIdPrefix) {
    return REGION_BY_OBJID_PREFIX.get(objIdPrefix);
}

/**
 * 有効なスロット番号か.
 * @param {number} slotIndex スロット番号
 * @returns {boolean}
 */
function isValidSlotIndex(slotIndex) {
    return Number.isInteger(slotIndex) && slotIndex >= 0 && slotIndex < EQUIP_SLOT_COUNT;
}

/**
 * 指定スロットのカード（一般エンチャント枠ではエンチャント）のIDを返す.
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} slotIndex スロット番号（0〜3）
 * @returns {number} カードID（未設定・対象外なら 0）
 */
export function GetSlotCardId(eqpRgnId, slotIndex) {
    return stateByRegion.get(eqpRgnId)?.cardIds[slotIndex] ?? 0;
}

/**
 * 指定スロットのカードIDを設定する.
 * 本体装備以外の領域・範囲外のスロットは何もしない。
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} slotIndex スロット番号（0〜3）
 * @param {number} cardId カードID
 */
export function SetSlotCardId(eqpRgnId, slotIndex, cardId) {
    const state = stateByRegion.get(eqpRgnId);
    if (state && isValidSlotIndex(slotIndex)) {
        state.cardIds[slotIndex] = cardId;
    }
}

/**
 * 指定スロットのエンチャント種別IDを返す（カード枠・未設定は 0）.
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} slotIndex スロット番号（0〜3）
 * @returns {number}
 */
export function GetSlotCategoryId(eqpRgnId, slotIndex) {
    return stateByRegion.get(eqpRgnId)?.categoryIds[slotIndex] ?? 0;
}

/**
 * 指定スロットのエンチャント種別IDを設定する.
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} slotIndex スロット番号（0〜3）
 * @param {number} categoryId エンチャント種別ID
 */
export function SetSlotCategoryId(eqpRgnId, slotIndex, categoryId) {
    const state = stateByRegion.get(eqpRgnId);
    if (state && isValidSlotIndex(slotIndex)) {
        state.categoryIds[slotIndex] = categoryId;
    }
}

/**
 * 部位の全スロットのカードIDを返す（コピー）.
 * @param {number} eqpRgnId 装備領域ID
 * @returns {number[]} 長さ4の配列（対象外の領域は全て 0）
 */
export function GetSlotCardIds(eqpRgnId) {
    return (stateByRegion.get(eqpRgnId)?.cardIds ?? new Array(EQUIP_SLOT_COUNT).fill(0)).slice();
}

/**
 * 部位の全スロットのエンチャント種別IDを返す（コピー）.
 * @param {number} eqpRgnId 装備領域ID
 * @returns {number[]} 長さ4の配列（対象外の領域は全て 0）
 */
export function GetSlotCategoryIds(eqpRgnId) {
    return (stateByRegion.get(eqpRgnId)?.categoryIds ?? new Array(EQUIP_SLOT_COUNT).fill(0)).slice();
}

/**
 * 部位の全スロットのカード・エンチャント種別をなしにする.
 * @param {number} eqpRgnId 装備領域ID
 */
export function ClearSlotCards(eqpRgnId) {
    const state = stateByRegion.get(eqpRgnId);
    if (state) {
        state.cardIds.fill(0);
        state.categoryIds.fill(0);
    }
}

/**
 * 2つの部位のカード・エンチャント種別を入れ替える.
 * @param {number} eqpRgnIdA 装備領域ID
 * @param {number} eqpRgnIdB 装備領域ID
 */
export function SwapSlotCards(eqpRgnIdA, eqpRgnIdB) {
    const a = stateByRegion.get(eqpRgnIdA);
    const b = stateByRegion.get(eqpRgnIdB);
    if (!a || !b) {
        return;
    }
    [a.cardIds, b.cardIds] = [b.cardIds, a.cardIds];
    [a.categoryIds, b.categoryIds] = [b.categoryIds, a.categoryIds];
}

/**
 * 部位の衣装IDを返す.
 * @param {number} eqpRgnId 装備領域ID
 * @returns {number} 衣装ID（未設定・対象外なら 0）
 */
export function GetCostumeId(eqpRgnId) {
    return stateByRegion.get(eqpRgnId)?.costumeId ?? 0;
}

/**
 * 部位の衣装IDを設定する.
 * @param {number} eqpRgnId 装備領域ID
 * @param {number} costumeId 衣装ID
 */
export function SetCostumeId(eqpRgnId, costumeId) {
    const state = stateByRegion.get(eqpRgnId);
    if (state) {
        state.costumeId = costumeId;
    }
}
