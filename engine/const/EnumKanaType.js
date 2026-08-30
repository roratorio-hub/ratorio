/**
 * EnumKanaType の定数定義.
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
export const KANA_TYPE_NORMAL  = 0;
export const KANA_TYPE_DAKUON  = 1;
export const KANA_TYPE_HANDAKU = 2;
export const KANA_TYPE_SMALL   = 3;
export const KANA_TYPE_SOKUON  = 4;
export const KANA_TYPE_UDAKU   = 5;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const KANA_TYPE_COUNT   = 6;
