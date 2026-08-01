/**
 * EnumItemKind の定数定義.
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
export const ITEM_KIND_NONE                 = 0;
export const ITEM_KIND_KNIFE                = 1;
export const ITEM_KIND_SWORD                = 2;
export const ITEM_KIND_SWORD_2HAND          = 3;
export const ITEM_KIND_SPEAR                = 4;
export const ITEM_KIND_SPEAR_2HAND          = 5;
export const ITEM_KIND_AXE                  = 6;
export const ITEM_KIND_AXE_2HAND            = 7;
export const ITEM_KIND_CLUB                 = 8;
export const ITEM_KIND_STUFF                = 9;
export const ITEM_KIND_BOW                  = 10;
export const ITEM_KIND_KATAR                = 11;
export const ITEM_KIND_BOOK                 = 12;
export const ITEM_KIND_FIST                 = 13;
export const ITEM_KIND_MUSICAL              = 14;
export const ITEM_KIND_WHIP                 = 15;
export const ITEM_KIND_FUMA                 = 16;
export const ITEM_KIND_HANDGUN              = 17;
export const ITEM_KIND_RIFLE                = 18;
export const ITEM_KIND_SHOTGUN              = 19;
export const ITEM_KIND_GATLINGGUN           = 20;
export const ITEM_KIND_GRENADEGUN           = 21;
export const ITEM_KIND_STUFF2HAND           = 22;
export const ITEM_KIND_HEAD_TOP             = 50;
export const ITEM_KIND_HEAD_MID             = 51;
export const ITEM_KIND_HEAD_UNDER           = 52;
export const ITEM_KIND_BODY                 = 60;
export const ITEM_KIND_SHIELD               = 61;
export const ITEM_KIND_SHOULDER             = 62;
export const ITEM_KIND_FOOT                 = 63;
export const ITEM_KIND_ACCESSORY            = 64;
export const ITEM_KIND_ACCESSORY_ON1        = 65;
export const ITEM_KIND_ACCESSORY_ON2        = 66;
export const ITEM_KIND_SHADOW_ARMS_1HAND    = 70;
export const ITEM_KIND_SHADOW_ARMS_2HAND    = 71;
export const ITEM_KIND_SHADOW_ARMS_RIGHT    = 72;
export const ITEM_KIND_SHADOW_ARMS_LEFT     = 73;
export const ITEM_KIND_SHADOW_HEAD_TOP      = 74;
export const ITEM_KIND_SHADOW_HEAD_MID      = 75;
export const ITEM_KIND_SHADOW_HEAD_UNDER    = 76;
export const ITEM_KIND_SHADOW_BODY          = 77;
export const ITEM_KIND_SHADOW_SHIELD        = 78;
export const ITEM_KIND_SHADOW_SHOULDER      = 79;
export const ITEM_KIND_SHADOW_FOOT          = 80;
export const ITEM_KIND_SHADOW_ACCESSORY     = 81;
export const ITEM_KIND_SHADOW_ACCESSORY_ON1 = 82;
export const ITEM_KIND_SHADOW_ACCESSORY_ON2 = 83;
export const ITEM_KIND_COSTUME              = 92;
export const ITEM_KIND_ARROW                = 93;
export const ITEM_KIND_BULLET               = 94;
export const ITEM_KIND_SET                  = 100;
export const ITEM_KIND_UNKNOWN              = 999;
