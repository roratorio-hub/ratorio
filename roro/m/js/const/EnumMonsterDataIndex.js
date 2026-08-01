/**
 * EnumMonsterDataIndex の定数定義.
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
export const MONSTER_DATA_INDEX_ID                   = 0;
export const MONSTER_DATA_INDEX_NAME                 = 1;
export const MONSTER_DATA_INDEX_LEVEL                = 2;
export const MONSTER_DATA_INDEX_HP                   = 3;
export const MONSTER_DATA_INDEX_STR                  = 4;
export const MONSTER_DATA_INDEX_INT                  = 5;
export const MONSTER_DATA_INDEX_VIT                  = 6;
export const MONSTER_DATA_INDEX_DEX                  = 7;
export const MONSTER_DATA_INDEX_AGI                  = 8;
export const MONSTER_DATA_INDEX_LUK                  = 9;
export const MONSTER_DATA_INDEX_ATK                  = 10;
export const MONSTER_DATA_INDEX_MATK                 = 11;
export const MONSTER_DATA_INDEX_RANGE                = 12;
export const MONSTER_DATA_INDEX_DEF_DIV              = 13;
export const MONSTER_DATA_INDEX_MDEF_DIV             = 14;
export const MONSTER_DATA_INDEX_BASE_EXP             = 15;
export const MONSTER_DATA_INDEX_JOB_EXP              = 16;
export const MONSTER_DATA_INDEX_SIZE                 = 17;
export const MONSTER_DATA_INDEX_ELEMENT              = 18;
export const MONSTER_DATA_INDEX_RACE                 = 19;
export const MONSTER_DATA_INDEX_BOSS_TYPE            = 20;
export const MONSTER_DATA_INDEX_GRASS_TYPE           = 21;
export const MONSTER_DATA_INDEX_QUALIFIED            = 22;
export const MONSTER_DATA_INDEX_KANA                 = 23;
export const MONSTER_DATA_INDEX_RES                  = 24;
export const MONSTER_DATA_INDEX_MRES                 = 25;
export const MONSTER_DATA_INDEX_COUNT                = 26;
export const MONSTER_DATA_EXTRA_INDEX_HIT            = 26;
export const MONSTER_DATA_EXTRA_INDEX_FLEE           = 27;
export const MONSTER_DATA_EXTRA_INDEX_ATK_MIN        = 30;
export const MONSTER_DATA_EXTRA_INDEX_ATK_MAX        = 31;
export const MONSTER_DATA_EXTRA_INDEX_100HIT         = 32;
export const MONSTER_DATA_EXTRA_INDEX_95FLEE         = 33;
export const MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN  = 34;
export const MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX  = 35;
export const MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS     = 36;
export const MONSTER_DATA_EXTRA_INDEX_MATK_MIN       = 37;
export const MONSTER_DATA_EXTRA_INDEX_MATK_MAX       = 38;
export const MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF  = 39;
export const MONSTER_DATA_INDEX_MDEF_DIV_IGNORE_BUFF = 40;
export const MONSTER_DATA_EXTRA_INDEX_100CRI         = 41;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumMonsterDataIndex = createEnum('EnumMonsterDataIndex', [
    ['MONSTER_DATA_INDEX_ID', 0],
    ['MONSTER_DATA_INDEX_NAME', 1],
    ['MONSTER_DATA_INDEX_LEVEL', 2],
    ['MONSTER_DATA_INDEX_HP', 3],
    ['MONSTER_DATA_INDEX_STR', 4],
    ['MONSTER_DATA_INDEX_INT', 5],
    ['MONSTER_DATA_INDEX_VIT', 6],
    ['MONSTER_DATA_INDEX_DEX', 7],
    ['MONSTER_DATA_INDEX_AGI', 8],
    ['MONSTER_DATA_INDEX_LUK', 9],
    ['MONSTER_DATA_INDEX_ATK', 10],
    ['MONSTER_DATA_INDEX_MATK', 11],
    ['MONSTER_DATA_INDEX_RANGE', 12],
    ['MONSTER_DATA_INDEX_DEF_DIV', 13],
    ['MONSTER_DATA_INDEX_MDEF_DIV', 14],
    ['MONSTER_DATA_INDEX_BASE_EXP', 15],
    ['MONSTER_DATA_INDEX_JOB_EXP', 16],
    ['MONSTER_DATA_INDEX_SIZE', 17],
    ['MONSTER_DATA_INDEX_ELEMENT', 18],
    ['MONSTER_DATA_INDEX_RACE', 19],
    ['MONSTER_DATA_INDEX_BOSS_TYPE', 20],
    ['MONSTER_DATA_INDEX_GRASS_TYPE', 21],
    ['MONSTER_DATA_INDEX_QUALIFIED', 22],
    ['MONSTER_DATA_INDEX_KANA', 23],
    ['MONSTER_DATA_INDEX_RES', 24],
    ['MONSTER_DATA_INDEX_MRES', 25],
    ['MONSTER_DATA_INDEX_COUNT', 26],
    ['MONSTER_DATA_EXTRA_INDEX_HIT', 26],
    ['MONSTER_DATA_EXTRA_INDEX_FLEE', 27],
    ['MONSTER_DATA_EXTRA_INDEX_ATK_MIN', 30],
    ['MONSTER_DATA_EXTRA_INDEX_ATK_MAX', 31],
    ['MONSTER_DATA_EXTRA_INDEX_100HIT', 32],
    ['MONSTER_DATA_EXTRA_INDEX_95FLEE', 33],
    ['MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN', 34],
    ['MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX', 35],
    ['MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS', 36],
    ['MONSTER_DATA_EXTRA_INDEX_MATK_MIN', 37],
    ['MONSTER_DATA_EXTRA_INDEX_MATK_MAX', 38],
    ['MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF', 39],
    ['MONSTER_DATA_INDEX_MDEF_DIV_IGNORE_BUFF', 40],
    ['MONSTER_DATA_EXTRA_INDEX_100CRI', 41],
], [
]);
