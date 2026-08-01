/**
 * EnumCharaDataIndex の定数定義.
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
export const CHARA_DATA_INDEX_STATUS_ATK                    = 0;
export const CHARA_DATA_INDEX_STATUS_ATK_GX                 = 1;
export const CHARA_DATA_INDEX_WEAPON_ATK                    = 2;
export const CHARA_DATA_INDEX_REFINE_ATK                    = 3;
export const CHARA_DATA_INDEX_LEFT_ATK                      = 4;
export const CHARA_DATA_INDEX_MAXHP                         = 5;
export const CHARA_DATA_INDEX_MAXSP                         = 6;
export const CHARA_DATA_INDEX_DEF_DIV                       = 7;
export const CHARA_DATA_INDEX_DEF_MINUS                     = 8;
export const CHARA_DATA_INDEX_MDEF_DIV                      = 9;
export const CHARA_DATA_INDEX_MDEF_MINUS                    = 10;
export const CHARA_DATA_INDEX_HIT                           = 11;
export const CHARA_DATA_INDEX_FLEE                          = 12;
export const CHARA_DATA_INDEX_LUCKY                         = 13;
export const CHARA_DATA_INDEX_CRI                           = 14;
export const CHARA_DATA_INDEX_STATUS_MATK                   = 15;
export const CHARA_DATA_INDEX_WEAPON_MATK                   = 16;
export const CHARA_DATA_INDEX_ASPD                          = 17;
export const CHARA_DATA_INDEX_HPR                           = 18;
export const CHARA_DATA_INDEX_SPR                           = 19;
export const CHARA_DATA_INDEX_SPR_STOP                      = 20;
export const CHARA_DATA_INDEX_CAST_PARAM                    = 21;
export const CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF          = 22;
export const CHARA_DATA_INDEX_DISP_MAXHP                    = 23;
export const CHARA_DATA_INDEX_DISP_MAXSP                    = 24;
export const CHARA_DATA_INDEX_DISP_ATK_LEFT                 = 25;
export const CHARA_DATA_INDEX_DISP_ATK_RIGHT                = 26;
export const CHARA_DATA_INDEX_DISP_MATK_LEFT                = 27;
export const CHARA_DATA_INDEX_DISP_MATK_RIGHT               = 28;
export const CHARA_DATA_INDEX_DISP_DEF_LEFT                 = 29;
export const CHARA_DATA_INDEX_DISP_DEF_RIGHT                = 30;
export const CHARA_DATA_INDEX_DISP_MDEF_LEFT                = 31;
export const CHARA_DATA_INDEX_DISP_MDEF_RIGHT               = 32;
export const CHARA_DATA_INDEX_DISP_HIT                      = 33;
export const CHARA_DATA_INDEX_DISP_FLEE                     = 34;
export const CHARA_DATA_INDEX_DISP_CRI                      = 35;
export const CHARA_DATA_INDEX_DISP_LUCKY                    = 36;
export const CHARA_DATA_INDEX_DISP_ASPD                     = 37;
export const CHARA_DATA_INDEX_DISP_HPR                      = 38;
export const CHARA_DATA_INDEX_DISP_SPR                      = 39;
export const CHARA_DATA_INDEX_COMBO_PARAM                   = 40;
export const CHARA_DATA_INDEX_FIXED_TIME                    = 41;
export const CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_VARY  = 42;
export const CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_VARY      = 43;
export const CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_FIXED = 44;
export const CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_FIXED     = 45;
export const CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_FORCE = 46;
export const CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_FORCE     = 47;
export const CHARA_DATA_INDEX_SKILL_COOL_TIME_FIX           = 48;
export const CHARA_DATA_INDEX_SKILL_COST_SCALING            = 49;
export const CHARA_DATA_INDEX_SKILL_COST_FIX                = 50;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumCharaDataIndex = createEnum('EnumCharaDataIndex', [
    ['CHARA_DATA_INDEX_STATUS_ATK', 0],
    ['CHARA_DATA_INDEX_STATUS_ATK_GX', 1],
    ['CHARA_DATA_INDEX_WEAPON_ATK', 2],
    ['CHARA_DATA_INDEX_REFINE_ATK', 3],
    ['CHARA_DATA_INDEX_LEFT_ATK', 4],
    ['CHARA_DATA_INDEX_MAXHP', 5],
    ['CHARA_DATA_INDEX_MAXSP', 6],
    ['CHARA_DATA_INDEX_DEF_DIV', 7],
    ['CHARA_DATA_INDEX_DEF_MINUS', 8],
    ['CHARA_DATA_INDEX_MDEF_DIV', 9],
    ['CHARA_DATA_INDEX_MDEF_MINUS', 10],
    ['CHARA_DATA_INDEX_HIT', 11],
    ['CHARA_DATA_INDEX_FLEE', 12],
    ['CHARA_DATA_INDEX_LUCKY', 13],
    ['CHARA_DATA_INDEX_CRI', 14],
    ['CHARA_DATA_INDEX_STATUS_MATK', 15],
    ['CHARA_DATA_INDEX_WEAPON_MATK', 16],
    ['CHARA_DATA_INDEX_ASPD', 17],
    ['CHARA_DATA_INDEX_HPR', 18],
    ['CHARA_DATA_INDEX_SPR', 19],
    ['CHARA_DATA_INDEX_SPR_STOP', 20],
    ['CHARA_DATA_INDEX_CAST_PARAM', 21],
    ['CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF', 22],
    ['CHARA_DATA_INDEX_DISP_MAXHP', 23],
    ['CHARA_DATA_INDEX_DISP_MAXSP', 24],
    ['CHARA_DATA_INDEX_DISP_ATK_LEFT', 25],
    ['CHARA_DATA_INDEX_DISP_ATK_RIGHT', 26],
    ['CHARA_DATA_INDEX_DISP_MATK_LEFT', 27],
    ['CHARA_DATA_INDEX_DISP_MATK_RIGHT', 28],
    ['CHARA_DATA_INDEX_DISP_DEF_LEFT', 29],
    ['CHARA_DATA_INDEX_DISP_DEF_RIGHT', 30],
    ['CHARA_DATA_INDEX_DISP_MDEF_LEFT', 31],
    ['CHARA_DATA_INDEX_DISP_MDEF_RIGHT', 32],
    ['CHARA_DATA_INDEX_DISP_HIT', 33],
    ['CHARA_DATA_INDEX_DISP_FLEE', 34],
    ['CHARA_DATA_INDEX_DISP_CRI', 35],
    ['CHARA_DATA_INDEX_DISP_LUCKY', 36],
    ['CHARA_DATA_INDEX_DISP_ASPD', 37],
    ['CHARA_DATA_INDEX_DISP_HPR', 38],
    ['CHARA_DATA_INDEX_DISP_SPR', 39],
    ['CHARA_DATA_INDEX_COMBO_PARAM', 40],
    ['CHARA_DATA_INDEX_FIXED_TIME', 41],
    ['CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_VARY', 42],
    ['CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_VARY', 43],
    ['CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_FIXED', 44],
    ['CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_FIXED', 45],
    ['CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_FORCE', 46],
    ['CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_FORCE', 47],
    ['CHARA_DATA_INDEX_SKILL_COOL_TIME_FIX', 48],
    ['CHARA_DATA_INDEX_SKILL_COST_SCALING', 49],
    ['CHARA_DATA_INDEX_SKILL_COST_FIX', 50],
], [
]);
