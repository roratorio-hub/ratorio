/**
 * EnumMigTargetId の定数定義.
 *
 * !!! 自動生成ファイル。手で編集しない !!!
 * 生成: node util/enum/gen-const-modules.mjs
 * 値の一次情報: util/enum/enum-values.snapshot.json
 *
 * 値は旧 CGlobalConstManager.DefineEnum が実行時に採番していたものを凍結したもの。
 * **値を変えるとセーブデータとアイテムデータの解釈が壊れる**ため、
 * 変更時は必ず node util/enum/verify-enum-values.mjs を通すこと。
 */

// ---- 列挙定数 ----
export const MIG_TARGET_ID_ENEMY         = 0;
export const MIG_TARGET_ID_SELF          = 1;
export const MIG_TARGET_ID_ARROUND_ENEMY = 2;
export const MIG_TARGET_ID_ARROUND_SELF  = 3;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const MIG_TARGET_ID_COUNT         = 4;
export const MIG_TARGET_ID_ANY           = 5;
