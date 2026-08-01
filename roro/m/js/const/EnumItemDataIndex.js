/**
 * EnumItemDataIndex の定数定義.
 *
 * このファイルが値の一次情報。直接編集してよい（旧・自動生成方式は廃止）。
 *
 * **既存の定数値を変えるとセーブデータとアイテムデータの解釈が壊れる。**
 * 追加は末尾に足すこと（途中への挿入は後続の値をずらす）。
 * 区切りコメント（列挙定数 / 疑似定数）は検証が種別判定に使うため残すこと。
 * コンテナ併設ファイルでは createEnum の引数にも同じ定数名を追加する。
 *
 * 変更したら node util/enum/verify-enum-values.mjs を通すこと。
 */
import { createEnum } from './createEnum.js';

// ---- 列挙定数 ----
export const ITEM_DATA_INDEX_ID      = 0;
export const ITEM_DATA_INDEX_KIND    = 1;
export const ITEM_DATA_INDEX_EQPFLG  = 2;
export const ITEM_DATA_INDEX_POWER   = 3;
export const ITEM_DATA_INDEX_WPNLV   = 4;
export const ITEM_DATA_INDEX_SLOT    = 5;
export const ITEM_DATA_INDEX_WEIGHT  = 6;
export const ITEM_DATA_INDEX_EQPLV   = 7;
export const ITEM_DATA_INDEX_NAME    = 8;
export const ITEM_DATA_INDEX_KANA    = 9;
export const ITEM_DATA_INDEX_DETAIL  = 10;
export const ITEM_DATA_INDEX_SPBEGIN = 11;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumItemDataIndex = createEnum('EnumItemDataIndex', {
    ITEM_DATA_INDEX_ID,
    ITEM_DATA_INDEX_KIND,
    ITEM_DATA_INDEX_EQPFLG,
    ITEM_DATA_INDEX_POWER,
    ITEM_DATA_INDEX_WPNLV,
    ITEM_DATA_INDEX_SLOT,
    ITEM_DATA_INDEX_WEIGHT,
    ITEM_DATA_INDEX_EQPLV,
    ITEM_DATA_INDEX_NAME,
    ITEM_DATA_INDEX_KANA,
    ITEM_DATA_INDEX_DETAIL,
    ITEM_DATA_INDEX_SPBEGIN,
}, {
});
