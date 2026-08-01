/**
 * EnumSizeId の定数定義.
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
export const SIZE_ID_SMALL  = 0;
export const SIZE_ID_MEDIUM = 1;
export const SIZE_ID_LARGE  = 2;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const SIZE_ID_COUNT  = 3;
export const SIZE_ID_ANY    = 4;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumSizeId = createEnum('EnumSizeId', {
    SIZE_ID_SMALL,
    SIZE_ID_MEDIUM,
    SIZE_ID_LARGE,
}, {
    SIZE_ID_COUNT,
    SIZE_ID_ANY,
});
