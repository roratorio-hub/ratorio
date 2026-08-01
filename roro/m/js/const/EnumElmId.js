/**
 * EnumElmId の定数定義.
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
export const ELM_ID_VANITY = 0;
export const ELM_ID_WATER  = 1;
export const ELM_ID_EARTH  = 2;
export const ELM_ID_FIRE   = 3;
export const ELM_ID_WIND   = 4;
export const ELM_ID_POISON = 5;
export const ELM_ID_HOLY   = 6;
export const ELM_ID_DARK   = 7;
export const ELM_ID_PSYCO  = 8;
export const ELM_ID_UNDEAD = 9;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const ELM_ID_COUNT  = 10;
export const ELM_ID_ANY    = 11;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumElmId = createEnum('EnumElmId', [
    ['ELM_ID_VANITY', 0],
    ['ELM_ID_WATER', 1],
    ['ELM_ID_EARTH', 2],
    ['ELM_ID_FIRE', 3],
    ['ELM_ID_WIND', 4],
    ['ELM_ID_POISON', 5],
    ['ELM_ID_HOLY', 6],
    ['ELM_ID_DARK', 7],
    ['ELM_ID_PSYCO', 8],
    ['ELM_ID_UNDEAD', 9],
], [
    ['ELM_ID_COUNT', 10],
    ['ELM_ID_ANY', 11],
]);
