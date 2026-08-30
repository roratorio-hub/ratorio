/**
 * EnumParamId の定数定義.
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
import { createEnum } from "./createEnum.js";

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
