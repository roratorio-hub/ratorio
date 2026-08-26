/**
 * EnumMigItemParamId の定数定義.
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
export const MIG_PARAM_ID_STR             = 0;
export const MIG_PARAM_ID_AGI             = 1;
export const MIG_PARAM_ID_VIT             = 2;
export const MIG_PARAM_ID_INT             = 3;
export const MIG_PARAM_ID_DEX             = 4;
export const MIG_PARAM_ID_LUK             = 5;
export const MIG_PARAM_ID_POW             = 6;
export const MIG_PARAM_ID_STA             = 7;
export const MIG_PARAM_ID_WIS             = 8;
export const MIG_PARAM_ID_SPL             = 9;
export const MIG_PARAM_ID_CON             = 10;
export const MIG_PARAM_ID_CRT             = 11;
export const MIG_PARAM_ID_BASE_LV         = 12;
export const MIG_PARAM_ID_JOB_LV          = 13;
export const MIG_PARAM_ID_ALL_STATUS      = 14;
export const MIG_PARAM_ID_ALL_SPEC_STATUS = 15;
export const MIG_PARAM_ID_HIT             = 16;
export const MIG_PARAM_ID_FLEE            = 17;
export const MIG_PARAM_ID_CRI             = 18;
export const MIG_PARAM_ID_LUCKY           = 19;
export const MIG_PARAM_ID_ASPD            = 20;
export const MIG_PARAM_ID_MAXHP           = 21;
export const MIG_PARAM_ID_MAXSP           = 22;
export const MIG_PARAM_ID_NOWHP           = 23;
export const MIG_PARAM_ID_NOWSP           = 24;
export const MIG_PARAM_ID_ATK             = 25;
export const MIG_PARAM_ID_MATK            = 26;
export const MIG_PARAM_ID_DEF             = 27;
export const MIG_PARAM_ID_MDEF            = 28;
export const MIG_PARAM_ID_HPR             = 29;
export const MIG_PARAM_ID_SPR             = 30;
export const MIG_PARAM_ID_GUIDED          = 31;
export const MIG_PARAM_ID_WEAPON_ATK      = 32;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const EQUIP_REGION_ID_COUNT        = 24;
export const EQUIP_REGION_ID_ANY          = -1;
export const MIG_PARAM_ID_COUNT           = 33;
export const MIG_PARAM_ID_ANY             = 34;
