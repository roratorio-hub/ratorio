/**
 * EnumBattleDataIndex の定数定義.
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
export const BATTLE_DATA_INDEX_ACTIVE_SKILL                    = 0;
export const BATTLE_DATA_INDEX_ATTACK_ELEMENT                  = 1;
export const BATTLE_DATA_INDEX_RANGE_FLAG                      = 2;
export const BATTLE_DATA_INDEX_STRDEX_BONUS                    = 3;
export const BATTLE_DATA_INDEX_STRDEX_PENARTY                  = 4;
export const BATTLE_DATA_INDEX_SIZE_MODIFY                     = 5;
export const BATTLE_DATA_INDEX_HIT_RATE                        = 6;
export const BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL             = 7;
export const BATTLE_DATA_INDEX_HIT_RATE_DISP                   = 8;
export const BATTLE_DATA_INDEX_CRITICAL_RATE                   = 9;
export const BATTLE_DATA_INDEX_AVOID_RATE                      = 10;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_MIN                 = 11;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_AVE                 = 12;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_MAX                 = 13;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_GX              = 14;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_GX              = 15;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_GX              = 16;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_QUAKE           = 17;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_QUAKE           = 18;
export const BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_QUAKE           = 19;
export const BATTLE_DATA_INDEX_CRITICAL_ATK_MIN                = 20;
export const BATTLE_DATA_INDEX_CRITICAL_ATK_AVE                = 21;
export const BATTLE_DATA_INDEX_CRITICAL_ATK_MAX                = 22;
export const BATTLE_DATA_INDEX_ARMS_ATK_MIN                    = 23;
export const BATTLE_DATA_INDEX_ARMS_ATK_AVE                    = 24;
export const BATTLE_DATA_INDEX_ARMS_ATK_MAX                    = 25;
export const BATTLE_DATA_INDEX_HAND_ATK_PSYCO_FIX              = 26;
export const BATTLE_DATA_INDEX_HAND_ATK                        = 27;
export const BATTLE_DATA_INDEX_GUIDED_DAMAGE                   = 28;
export const BATTLE_DATA_INDEX_ATTACK_COUNT_MIN                = 29;
export const BATTLE_DATA_INDEX_ATTACK_COUNT_AVE                = 30;
export const BATTLE_DATA_INDEX_ATTACK_COUNT_MAX                = 31;
export const BATTLE_DATA_INDEX_DAMAGE_PER_SECOND               = 32;
export const BATTLE_DATA_INDEX_FINAL_DAMAGE_MIN                = 33;
export const BATTLE_DATA_INDEX_FINAL_DAMAGE_AVE                = 34;
export const BATTLE_DATA_INDEX_FINAL_DAMAGE_MAX                = 35;
export const BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MIN              = 36;
export const BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVE              = 37;
export const BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MAX              = 38;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_RS           = 39;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_RS           = 40;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_RS           = 41;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SPEC         = 42;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SPEC         = 43;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SPEC         = 44;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SHIELD_SPELL = 45;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SHIELD_SPELL = 46;
export const BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SHIELD_SPELL = 47;
export const BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVOIDS           = 48;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumBattleDataIndex = createEnum('EnumBattleDataIndex', [
    ['BATTLE_DATA_INDEX_ACTIVE_SKILL', 0],
    ['BATTLE_DATA_INDEX_ATTACK_ELEMENT', 1],
    ['BATTLE_DATA_INDEX_RANGE_FLAG', 2],
    ['BATTLE_DATA_INDEX_STRDEX_BONUS', 3],
    ['BATTLE_DATA_INDEX_STRDEX_PENARTY', 4],
    ['BATTLE_DATA_INDEX_SIZE_MODIFY', 5],
    ['BATTLE_DATA_INDEX_HIT_RATE', 6],
    ['BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL', 7],
    ['BATTLE_DATA_INDEX_HIT_RATE_DISP', 8],
    ['BATTLE_DATA_INDEX_CRITICAL_RATE', 9],
    ['BATTLE_DATA_INDEX_AVOID_RATE', 10],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_MIN', 11],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_AVE', 12],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_MAX', 13],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_GX', 14],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_GX', 15],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_GX', 16],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_QUAKE', 17],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_QUAKE', 18],
    ['BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_QUAKE', 19],
    ['BATTLE_DATA_INDEX_CRITICAL_ATK_MIN', 20],
    ['BATTLE_DATA_INDEX_CRITICAL_ATK_AVE', 21],
    ['BATTLE_DATA_INDEX_CRITICAL_ATK_MAX', 22],
    ['BATTLE_DATA_INDEX_ARMS_ATK_MIN', 23],
    ['BATTLE_DATA_INDEX_ARMS_ATK_AVE', 24],
    ['BATTLE_DATA_INDEX_ARMS_ATK_MAX', 25],
    ['BATTLE_DATA_INDEX_HAND_ATK_PSYCO_FIX', 26],
    ['BATTLE_DATA_INDEX_HAND_ATK', 27],
    ['BATTLE_DATA_INDEX_GUIDED_DAMAGE', 28],
    ['BATTLE_DATA_INDEX_ATTACK_COUNT_MIN', 29],
    ['BATTLE_DATA_INDEX_ATTACK_COUNT_AVE', 30],
    ['BATTLE_DATA_INDEX_ATTACK_COUNT_MAX', 31],
    ['BATTLE_DATA_INDEX_DAMAGE_PER_SECOND', 32],
    ['BATTLE_DATA_INDEX_FINAL_DAMAGE_MIN', 33],
    ['BATTLE_DATA_INDEX_FINAL_DAMAGE_AVE', 34],
    ['BATTLE_DATA_INDEX_FINAL_DAMAGE_MAX', 35],
    ['BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MIN', 36],
    ['BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVE', 37],
    ['BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MAX', 38],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_RS', 39],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_RS', 40],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_RS', 41],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SPEC', 42],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SPEC', 43],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SPEC', 44],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SHIELD_SPELL', 45],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SHIELD_SPELL', 46],
    ['BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SHIELD_SPELL', 47],
    ['BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVOIDS', 48],
], [
]);
