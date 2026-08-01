/**
 * EnumRaceId の定数定義.
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
export const RACE_ID_SOLID  = 0;
export const RACE_ID_UNDEAD = 1;
export const RACE_ID_ANIMAL = 2;
export const RACE_ID_PLANT  = 3;
export const RACE_ID_INSECT = 4;
export const RACE_ID_FISH   = 5;
export const RACE_ID_DEMON  = 6;
export const RACE_ID_HUMAN  = 7;
export const RACE_ID_ANGEL  = 8;
export const RACE_ID_DRAGON = 9;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const RACE_ID_COUNT  = 10;
export const RACE_ID_ANY    = 11;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumRaceId = createEnum('EnumRaceId', [
    ['RACE_ID_SOLID', 0],
    ['RACE_ID_UNDEAD', 1],
    ['RACE_ID_ANIMAL', 2],
    ['RACE_ID_PLANT', 3],
    ['RACE_ID_INSECT', 4],
    ['RACE_ID_FISH', 5],
    ['RACE_ID_DEMON', 6],
    ['RACE_ID_HUMAN', 7],
    ['RACE_ID_ANGEL', 8],
    ['RACE_ID_DRAGON', 9],
], [
    ['RACE_ID_COUNT', 10],
    ['RACE_ID_ANY', 11],
]);
