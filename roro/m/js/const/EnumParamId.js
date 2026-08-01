/**
 * EnumParamId の定数定義.
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
export const PARAM_STR   = 0;
export const PARAM_AGI   = 1;
export const PARAM_VIT   = 2;
export const PARAM_INT   = 3;
export const PARAM_DEX   = 4;
export const PARAM_LUK   = 5;
export const PARAM_COUNT = 6;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumParamId = createEnum('EnumParamId', {
    PARAM_STR,
    PARAM_AGI,
    PARAM_VIT,
    PARAM_INT,
    PARAM_DEX,
    PARAM_LUK,
    PARAM_COUNT,
}, {
});
