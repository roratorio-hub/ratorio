/**
 * EnumConstDataKind の定数定義.
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

// ---- 列挙定数 ----
export const CONST_DATA_KIND_NONE                = 0;
export const CONST_DATA_KIND_ITEM                = 1;
export const CONST_DATA_KIND_CARD                = 2;
export const CONST_DATA_KIND_COSTUME             = 3;
export const CONST_DATA_KIND_ITEM_SET            = 4;
export const CONST_DATA_KIND_ENCHANT_TYPE        = 5;
export const CONST_DATA_KIND_ENCHANT_LIST        = 6;
export const CONST_DATA_KIND_TIME_ITEM           = 7;
export const CONST_DATA_KIND_ITEM_PACK           = 8;
export const CONST_DATA_KIND_SKILL               = 9;
export const CONST_DATA_KIND_USABLE_SKILL        = 10;
export const CONST_DATA_KIND_AUTO_SPELL          = 11;
export const CONST_DATA_KIND_ARROW               = 12;
export const CONST_DATA_KIND_MONSTER             = 13;
export const CONST_DATA_KIND_MONSTER_GROUP       = 14;
export const CONST_DATA_KIND_MONSTER_MAP         = 15;
export const CONST_DATA_KIND_CARD_SORT_DATA      = 16;
export const CONST_DATA_KIND_TIME_ITEM_SORT_DATA = 17;
export const CONST_DATA_KIND_JOB_SKILL_PASSIVE   = 18;
export const CONST_DATA_KIND_JOB_SKILL_ACTIVE    = 19;
export const CONST_DATA_KIND_JOB_SKILL_LEARNED   = 20;
export const CONST_DATA_KIND_PET                 = 21;
export const CONST_DATA_KIND_RND_OPT_TYPE        = 22;
export const CONST_DATA_KIND_RND_OPT_LIST        = 23;
export const CONST_DATA_KIND_RND_OPT             = 24;
export const CONST_DATA_KIND_CHANGE_LOG          = 25;
export const CONST_DATA_KIND_ALIAS               = 26;
export const CONST_DATA_KIND_STATE               = 27;
export const CONST_DATA_KIND_BUFF                = 28;
export const CONST_DATA_KIND_HPSPBASE            = 29;
export const CONST_DATA_KIND_CHARA               = 30;
export const CONST_DATA_KIND_JOB                 = 31;
