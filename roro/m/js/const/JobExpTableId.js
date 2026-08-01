/**
 * JobExpTableId の定数定義.
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
export const JOB_EXP_TABLE_ID_NOVICE             = 0;
export const JOB_EXP_TABLE_ID_NOVICE_REINCANATED = 1;
export const JOB_EXP_TABLE_ID_1ST                = 2;
export const JOB_EXP_TABLE_ID_1ST_REINCANATED    = 3;
export const JOB_EXP_TABLE_ID_2ND                = 4;
export const JOB_EXP_TABLE_ID_2ND_REINCANATED    = 5;
export const JOB_EXP_TABLE_ID_EXTRA_1ST          = 6;
export const JOB_EXP_TABLE_ID_STAR_GRADIATOR     = 7;
export const JOB_EXP_TABLE_ID_3RD                = 8;
export const JOB_EXP_TABLE_ID_SUPER_NOVICE       = 9;
export const JOB_EXP_TABLE_ID_SUMMONER           = 10;
export const JOB_EXP_TABLE_ID_4TH                = 11;
export const JOB_EXP_TABLE_ID_EXTRA_1ST_UPGRADE  = 12;
