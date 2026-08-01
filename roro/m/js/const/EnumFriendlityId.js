/**
 * EnumFriendlityId の定数定義.
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
export const FRIENDLITY_ID_AUTO    = 0;
export const FRIENDLITY_ID_RUNAWAY = 1;
export const FRIENDLITY_ID_LOWEST  = 2;
export const FRIENDLITY_ID_LOW     = 3;
export const FRIENDLITY_ID_NORMAL  = 4;
export const FRIENDLITY_ID_HIGH    = 5;
export const FRIENDLITY_ID_HIGHEST = 6;
export const FRIENDLITY_ID_COUNT   = 7;
