/**
 * EnumCardKind の定数定義.
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
export const CARD_KIND_NONE          = 0;
export const CARD_KIND_ARMS          = 1;
export const CARD_KIND_HEAD          = 2;
export const CARD_KIND_SHIELD        = 3;
export const CARD_KIND_BODY          = 4;
export const CARD_KIND_SHOULDER      = 5;
export const CARD_KIND_FOOT          = 6;
export const CARD_KIND_ACCESSORY     = 7;
export const CARD_KIND_TOP           = 8;
export const CARD_KIND_MID           = 9;
export const CARD_KIND_UNDER         = 10;
export const CARD_KIND_ACCESSORY_ON1 = 11;
export const CARD_KIND_ACCESSORY_ON2 = 12;
export const CARD_KIND_LEARNING      = 91;
export const CARD_KIND_ENCHANT       = 99;
export const CARD_KIND_SET           = 100;
export const CARD_KIND_ANY           = 200;
