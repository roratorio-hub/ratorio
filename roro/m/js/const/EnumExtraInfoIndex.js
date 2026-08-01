/**
 * EnumExtraInfoIndex の定数定義.
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

// ---- 列挙定数 ----
export const EXTRA_INFO_ID_NONE                = 0;
export const EXTRA_INFO_ID_HEALING             = 1;
export const EXTRA_INFO_ID_RECOVERY            = 2;
export const EXTRA_INFO_ID_CAPACITY            = 3;
export const EXTRA_INFO_ID_PHYSICAL_SPECIALIZE = 4;
export const EXTRA_INFO_ID_MAGICAL_SPECIALIZE  = 5;
export const EXTRA_INFO_ID_RESIST_ELEMENT      = 6;
export const EXTRA_INFO_ID_RESIST_DAMAGE       = 7;
export const EXTRA_INFO_ID_RESIST_STATE        = 8;
export const EXTRA_INFO_ID_RESIST_STATE_R_NEW  = 9;
export const EXTRA_INFO_ID_CAST_AND_DELAY      = 10;
export const EXTRA_INFO_ID_EXP                 = 11;
export const EXTRA_INFO_ID_STATUS_SUM          = 12;
export const EXTRA_INFO_ID_ALCHEMIST           = 13;
export const EXTRA_INFO_ID_PVP_INFO            = 14;
export const EXTRA_INFO_ID_EFFECTIVE_SP        = 15;
