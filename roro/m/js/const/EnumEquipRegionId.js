/**
 * EnumEquipRegionId の定数定義.
 *
 * !!! 自動生成ファイル。手で編集しない !!!
 * 生成: node util/enum/gen-const-modules.mjs
 * 値の一次情報: util/enum/enum-values.snapshot.json
 *
 * 値は旧 CGlobalConstManager.DefineEnum が実行時に採番していたものを凍結したもの。
 * **値を変えるとセーブデータとアイテムデータの解釈が壊れる**ため、
 * 変更時は必ず node util/enum/verify-enum-values.mjs を通すこと。
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
export const EnumEquipRegionId = createEnum('EnumEquipRegionId', [
    ['EQUIP_REGION_ID_ARMS', 0],
    ['EQUIP_REGION_ID_ARMS_LEFT', 1],
    ['EQUIP_REGION_ID_HEAD_TOP', 2],
    ['EQUIP_REGION_ID_HEAD_MID', 3],
    ['EQUIP_REGION_ID_HEAD_UNDER', 4],
    ['EQUIP_REGION_ID_SHIELD', 5],
    ['EQUIP_REGION_ID_BODY', 6],
    ['EQUIP_REGION_ID_SHOULDER', 7],
    ['EQUIP_REGION_ID_SHOES', 8],
    ['EQUIP_REGION_ID_ACCESSORY_1', 9],
    ['EQUIP_REGION_ID_ACCESSORY_2', 10],
    ['EQUIP_REGION_ID_COSTUME_HEAD_TOP', 11],
    ['EQUIP_REGION_ID_COSTUME_HEAD_MID', 12],
    ['EQUIP_REGION_ID_COSTUME_HEAD_UNDER', 13],
    ['EQUIP_REGION_ID_SHADOW_ARMS_RIGHT', 14],
    ['EQUIP_REGION_ID_SHADOW_ARMS_LEFT', 15],
    ['EQUIP_REGION_ID_SHADOW_HEAD_TOP', 16],
    ['EQUIP_REGION_ID_SHADOW_HEAD_MID', 17],
    ['EQUIP_REGION_ID_SHADOW_HEAD_UNDER', 18],
    ['EQUIP_REGION_ID_SHADOW_BODY', 19],
    ['EQUIP_REGION_ID_SHADOW_SHOULDER', 20],
    ['EQUIP_REGION_ID_SHADOW_FOOT', 21],
    ['EQUIP_REGION_ID_SHADOW_ACCESSORY_1', 22],
    ['EQUIP_REGION_ID_SHADOW_ACCESSORY_2', 23],
], [
]);
