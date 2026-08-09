/**
 * EnumMigItemType の定数定義.
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
export const MIG_ITEM_TYPE_NONE           = 0;
export const MIG_ITEM_TYPE_KNIFE          = 1;
export const MIG_ITEM_TYPE_SWORD          = 2;
export const MIG_ITEM_TYPE_SWORD_2HAND    = 3;
export const MIG_ITEM_TYPE_SPEAR          = 4;
export const MIG_ITEM_TYPE_SPEAR_2HAND    = 5;
export const MIG_ITEM_TYPE_AXE            = 6;
export const MIG_ITEM_TYPE_AXE_2HAND      = 7;
export const MIG_ITEM_TYPE_MACE           = 8;
export const MIG_ITEM_TYPE_STUFF          = 9;
export const MIG_ITEM_TYPE_STUFF_2HAND    = 10;
export const MIG_ITEM_TYPE_BOW            = 11;
export const MIG_ITEM_TYPE_KATAR          = 12;
export const MIG_ITEM_TYPE_BOOK           = 13;
export const MIG_ITEM_TYPE_FIST           = 14;
export const MIG_ITEM_TYPE_MUSICAL        = 15;
export const MIG_ITEM_TYPE_WHIP           = 16;
export const MIG_ITEM_TYPE_FUMA           = 17;
export const MIG_ITEM_TYPE_HANDGUN        = 18;
export const MIG_ITEM_TYPE_RIFLE          = 19;
export const MIG_ITEM_TYPE_SHOTGUN        = 20;
export const MIG_ITEM_TYPE_GATLINGGUN     = 21;
export const MIG_ITEM_TYPE_GRENADEGUN     = 22;
export const MIG_ITEM_TYPE_HELM           = 23;
export const MIG_ITEM_TYPE_ARMOR          = 24;
export const MIG_ITEM_TYPE_SHIELD         = 25;
export const MIG_ITEM_TYPE_SHOULDER       = 26;
export const MIG_ITEM_TYPE_SHOES          = 27;
export const MIG_ITEM_TYPE_ACCESSORY      = 28;
export const MIG_ITEM_TYPE_ACCESSORY_ON_1 = 29;
export const MIG_ITEM_TYPE_ACCESSORY_ON_2 = 30;
export const MIG_ITEM_TYPE_ARROW          = 31;
export const MIG_ITEM_TYPE_BULLET         = 32;
export const MIG_ITEM_TYPE_ETC            = 33;
