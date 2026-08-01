/**
 * EnumItemDataIndex の定数定義.
 *
 * !!! 自動生成ファイル。手で編集しない !!!
 * 生成: node util/enum/gen-const-modules.mjs
 * 値の一次情報: util/enum/enum-values.snapshot.json
 *
 * 値は旧 CGlobalConstManager.DefineEnum が実行時に採番していたものを凍結したもの。
 * **値を変えるとセーブデータとアイテムデータの解釈が壊れる**ため、
 * 変更時は必ず node util/enum/verify-enum-values.mjs を通すこと。
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
