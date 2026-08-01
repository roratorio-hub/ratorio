/**
 * EnumMonsterGrassType の定数定義.
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
export const MONSTER_GRASSTYPE_NONE      = 0;
export const MONSTER_GRASSTYPE_GLASS     = 5;
export const MONSTER_GRASSTYPE_EMPERIUM  = 6;
export const MONSTER_GRASSTYPE_GLASS_NEW = 7;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumMonsterGrassType = createEnum('EnumMonsterGrassType', {
    MONSTER_GRASSTYPE_NONE,
    MONSTER_GRASSTYPE_GLASS,
    MONSTER_GRASSTYPE_EMPERIUM,
    MONSTER_GRASSTYPE_GLASS_NEW,
}, {
});
