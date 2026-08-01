/**
 * EnumMigItemKind の定数定義.
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
export const MIG_ITEM_KIND_NONE           = 0;
export const MIG_ITEM_KIND_KNIFE          = 1;
export const MIG_ITEM_KIND_SWORD          = 2;
export const MIG_ITEM_KIND_SWORD_2HAND    = 3;
export const MIG_ITEM_KIND_SPEAR          = 4;
export const MIG_ITEM_KIND_SPEAR_2HAND    = 5;
export const MIG_ITEM_KIND_AXE            = 6;
export const MIG_ITEM_KIND_AXE_2HAND      = 7;
export const MIG_ITEM_KIND_MACE           = 8;
export const MIG_ITEM_KIND_STUFF          = 9;
export const MIG_ITEM_KIND_STUFF_2HAND    = 10;
export const MIG_ITEM_KIND_BOW            = 11;
export const MIG_ITEM_KIND_KATAR          = 12;
export const MIG_ITEM_KIND_BOOK           = 13;
export const MIG_ITEM_KIND_FIST           = 14;
export const MIG_ITEM_KIND_MUSICAL        = 15;
export const MIG_ITEM_KIND_WHIP           = 16;
export const MIG_ITEM_KIND_FUMA           = 17;
export const MIG_ITEM_KIND_HANDGUN        = 18;
export const MIG_ITEM_KIND_RIFLE          = 19;
export const MIG_ITEM_KIND_SHOTGUN        = 20;
export const MIG_ITEM_KIND_GATLINGGUN     = 21;
export const MIG_ITEM_KIND_GRENADEGUN     = 22;
export const MIG_ITEM_KIND_HEAD_TOP       = 23;
export const MIG_ITEM_KIND_HEAD_MID       = 24;
export const MIG_ITEM_KIND_HEAD_UNDER     = 25;
export const MIG_ITEM_KIND_HEAD_TOP_MID   = 26;
export const MIG_ITEM_KIND_HEAD_TOP_UNDER = 27;
export const MIG_ITEM_KIND_HEAD_MID_UNDER = 28;
export const MIG_ITEM_KIND_HEAD_ALL       = 29;
export const MIG_ITEM_KIND_BODY           = 30;
export const MIG_ITEM_KIND_SHIELD         = 31;
export const MIG_ITEM_KIND_SHOULDER       = 32;
export const MIG_ITEM_KIND_FOOT           = 33;
export const MIG_ITEM_KIND_ACCESSORY      = 34;
export const MIG_ITEM_KIND_ACCESSORY_ON1  = 35;
export const MIG_ITEM_KIND_ACCESSORY_ON2  = 36;
