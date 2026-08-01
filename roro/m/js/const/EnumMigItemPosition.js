/**
 * EnumMigItemPosition の定数定義.
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
export const MIG_ITEM_POSITION_NONE          = 0;
export const MIG_ITEM_POSITION_TOP           = 1;
export const MIG_ITEM_POSITION_MID           = 2;
export const MIG_ITEM_POSITION_UNDER         = 3;
export const MIG_ITEM_POSITION_TOP_MID       = 4;
export const MIG_ITEM_POSITION_TOP_UNDER     = 5;
export const MIG_ITEM_POSITION_MID_UNDER     = 6;
export const MIG_ITEM_POSITION_TOP_MID_UNDER = 7;
