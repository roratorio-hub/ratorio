/**
 * EnumMonsterGrassType の定数定義.
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
import { createEnum } from "./createEnum.js";

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
