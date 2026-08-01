/**
 * EnumMigEquipRegionId の定数定義.
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
export const MIG_EQUIP_REGION_ID_ARMS_RIGHT         = 0;
export const MIG_EQUIP_REGION_ID_ARMS_LEFT          = 1;
export const MIG_EQUIP_REGION_ID_HEAD_TOP           = 2;
export const MIG_EQUIP_REGION_ID_HEAD_MID           = 3;
export const MIG_EQUIP_REGION_ID_HEAD_UNDER         = 4;
export const MIG_EQUIP_REGION_ID_SHIELD             = 5;
export const MIG_EQUIP_REGION_ID_BODY               = 6;
export const MIG_EQUIP_REGION_ID_SHOULDER           = 7;
export const MIG_EQUIP_REGION_ID_FOOT               = 8;
export const MIG_EQUIP_REGION_ID_ACCESSORY_1        = 9;
export const MIG_EQUIP_REGION_ID_ACCESSORY_2        = 10;
export const MIG_EQUIP_REGION_ID_ARROW              = 11;
export const MIG_EQUIP_REGION_ID_COSTUME_HEAD_TOP   = 12;
export const MIG_EQUIP_REGION_ID_COSTUME_HEAD_MID   = 13;
export const MIG_EQUIP_REGION_ID_COSTUME_HEAD_UNDER = 14;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const MIG_EQUIP_REGION_ID_COUNT              = 15;
export const MIG_EQUIP_REGION_ID_ANY                = 16;
export const MIG_EQUIP_REGION_ID_ALL                = 17;
