/**
 * EnumStateId の定数定義.
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
export const STATE_ID_POISON              = 0;
export const STATE_ID_STUN                = 1;
export const STATE_ID_FROZEN              = 2;
export const STATE_ID_CURSED              = 3;
export const STATE_ID_BLIND               = 4;
export const STATE_ID_SLEEP               = 5;
export const STATE_ID_SILENCE             = 6;
export const STATE_ID_CONFUSE             = 7;
export const STATE_ID_BLEEDING            = 8;
export const STATE_ID_STONE               = 9;
export const STATE_ID_BREAK_WEAPON        = 10;
export const STATE_ID_BREAK_HEAD          = 11;
export const STATE_ID_BREAK_BODY          = 12;
export const STATE_ID_BREAK_SHIELD        = 13;
export const STATE_ID_BREAK_SHOULDER      = 14;
export const STATE_ID_BREAK_FOOT          = 15;
export const STATE_ID_BREAK_ACCESSORY     = 16;
export const STATE_R_ID_CHILLED           = 17;
export const STATE_R_ID_ICED              = 18;
export const STATE_R_ID_IGNITION          = 19;
export const STATE_R_ID_FEAR              = 20;
export const STATE_R_ID_DEEPSLEEP         = 21;
export const STATE_R_ID_CHARMED           = 22;
export const STATE_R_ID_FRENZY            = 23;
export const STATE_R_ID_HOWLING           = 24;
export const STATE_NEW_ID_LETHARGY        = 25;
export const STATE_NEW_ID_JETBLACK        = 26;
export const STATE_NEW_ID_HIGHLYPOISONOUS = 27;
export const STATE_NEW_ID_TORRENT         = 28;
export const STATE_NEW_ID_MELANCHOLY      = 29;
export const STATE_NEW_ID_STILLNESS       = 30;
export const STATE_NEW_ID_CONFLAGRATION   = 31;
export const STATE_NEW_ID_RAPIDCOOLING    = 32;
export const STATE_NEW_ID_CRYSTALLIZATION = 33;
export const STATE_NEW_ID_UNHAPPINESS     = 34;
export const STATE_ID_COUNT               = 35;
