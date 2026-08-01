/**
 * EnumAutoSpellTrigger の定数定義.
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
export const AUTO_SPELL_TRIGGER_UNKNOWN            = 0;
export const AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK    = 1;
export const AUTO_SPELL_TRIGGER_SHORTRANGE_ATTACK  = 2;
export const AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK   = 3;
export const AUTO_SPELL_TRIGGER_ANY_ATTACK         = 4;
export const AUTO_SPELL_TRIGGER_MAGICAL_ATTACK     = 5;
export const AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED   = 6;
export const AUTO_SPELL_TRIGGER_SHORTRANGE_DAMAGED = 7;
export const AUTO_SPELL_TRIGGER_LONGRANGE_DAMAGED  = 8;
export const AUTO_SPELL_TRIGGER_MAGICAL_DAMAGED    = 9;
export const AUTO_SPELL_TRIGGER_ANY_DAMAGED        = 10;
