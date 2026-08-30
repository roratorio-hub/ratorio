/**
 * EnumControlType の定数定義.
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
export const CONTROL_TYPE_DUMMY             = 0;
export const CONTROL_TYPE_BLANK             = 1;
export const CONTROL_TYPE_TEXT_NODE         = 2;
export const CONTROL_TYPE_SELECTBOX_NUMBER  = 3;
export const CONTROL_TYPE_SELECTBOX_PERCENT = 4;
export const CONTROL_TYPE_SELECTBOX_SPECIAL = 5;
export const CONTROL_TYPE_CHECKBOX          = 6;
export const CONTROL_TYPE_CHECKBOX_SPECIAL  = 7;
export const CONTROL_TYPE_TEXTBOX_NUMBER    = 8;
export const CONTROL_TYPE_TEXTBOX_SPECIAL   = 9;
export const CONTROL_TYPE_SELECT            = 10;
export const CONTROL_TYPE_TEXT              = 11;
export const CONTROL_TYPE_NUMBER            = 12;
export const CONTROL_TYPE_SPECIAL           = 13;
