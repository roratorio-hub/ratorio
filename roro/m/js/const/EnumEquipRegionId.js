/**
 * EnumEquipRegionId の定数定義.
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
import { createEnum } from './createEnum.js';

// ---- 列挙定数 ----
export const EQUIP_REGION_ID_ARMS               = 0;
export const EQUIP_REGION_ID_ARMS_LEFT          = 1;
export const EQUIP_REGION_ID_HEAD_TOP           = 2;
export const EQUIP_REGION_ID_HEAD_MID           = 3;
export const EQUIP_REGION_ID_HEAD_UNDER         = 4;
export const EQUIP_REGION_ID_SHIELD             = 5;
export const EQUIP_REGION_ID_BODY               = 6;
export const EQUIP_REGION_ID_SHOULDER           = 7;
export const EQUIP_REGION_ID_SHOES              = 8;
export const EQUIP_REGION_ID_ACCESSORY_1        = 9;
export const EQUIP_REGION_ID_ACCESSORY_2        = 10;
export const EQUIP_REGION_ID_COSTUME_HEAD_TOP   = 11;
export const EQUIP_REGION_ID_COSTUME_HEAD_MID   = 12;
export const EQUIP_REGION_ID_COSTUME_HEAD_UNDER = 13;
export const EQUIP_REGION_ID_SHADOW_ARMS_RIGHT  = 14;
export const EQUIP_REGION_ID_SHADOW_ARMS_LEFT   = 15;
export const EQUIP_REGION_ID_SHADOW_HEAD_TOP    = 16;
export const EQUIP_REGION_ID_SHADOW_HEAD_MID    = 17;
export const EQUIP_REGION_ID_SHADOW_HEAD_UNDER  = 18;
export const EQUIP_REGION_ID_SHADOW_BODY        = 19;
export const EQUIP_REGION_ID_SHADOW_SHOULDER    = 20;
export const EQUIP_REGION_ID_SHADOW_FOOT        = 21;
export const EQUIP_REGION_ID_SHADOW_ACCESSORY_1 = 22;
export const EQUIP_REGION_ID_SHADOW_ACCESSORY_2 = 23;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumEquipRegionId = createEnum('EnumEquipRegionId', {
    EQUIP_REGION_ID_ARMS,
    EQUIP_REGION_ID_ARMS_LEFT,
    EQUIP_REGION_ID_HEAD_TOP,
    EQUIP_REGION_ID_HEAD_MID,
    EQUIP_REGION_ID_HEAD_UNDER,
    EQUIP_REGION_ID_SHIELD,
    EQUIP_REGION_ID_BODY,
    EQUIP_REGION_ID_SHOULDER,
    EQUIP_REGION_ID_SHOES,
    EQUIP_REGION_ID_ACCESSORY_1,
    EQUIP_REGION_ID_ACCESSORY_2,
    EQUIP_REGION_ID_COSTUME_HEAD_TOP,
    EQUIP_REGION_ID_COSTUME_HEAD_MID,
    EQUIP_REGION_ID_COSTUME_HEAD_UNDER,
    EQUIP_REGION_ID_SHADOW_ARMS_RIGHT,
    EQUIP_REGION_ID_SHADOW_ARMS_LEFT,
    EQUIP_REGION_ID_SHADOW_HEAD_TOP,
    EQUIP_REGION_ID_SHADOW_HEAD_MID,
    EQUIP_REGION_ID_SHADOW_HEAD_UNDER,
    EQUIP_REGION_ID_SHADOW_BODY,
    EQUIP_REGION_ID_SHADOW_SHOULDER,
    EQUIP_REGION_ID_SHADOW_FOOT,
    EQUIP_REGION_ID_SHADOW_ACCESSORY_1,
    EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
}, {
});
