/**
 * EnumSereKind の定数定義.
 *
 * 職固有自己支援「召喚中の精霊」（SKILL_ID_SERE）のドロップダウン値。
 * 値はセーブデータにそのまま保存される（BuffJobSpecificSelf.js の選択肢の並びと一致させること）。
 *
 * このファイルが値の一次情報。直接編集してよい（旧・自動生成方式は廃止）。
 *
 * **既存の定数値を変えるとセーブデータとアイテムデータの解釈が壊れる。**
 * 追加は末尾に足すこと（途中への挿入は後続の値をずらす）。
 * 区切りコメント（列挙定数 / 疑似定数）は検証が種別判定に使うため残すこと。
 *
 * 変更したら node util/enum/verify-enum-values.mjs を通すこと。
 */

// ---- 列挙定数 ----
export const SERE_KIND_OFF         = 0;
// ソーサラー（三次職）の精霊
export const SERE_KIND_AGNI_LV1    = 1;   // 火 アグニ
export const SERE_KIND_AGNI_LV2    = 2;
export const SERE_KIND_AGNI_LV3    = 3;
export const SERE_KIND_AQUA_LV1    = 4;   // 水 アクア
export const SERE_KIND_AQUA_LV2    = 5;
export const SERE_KIND_AQUA_LV3    = 6;
export const SERE_KIND_VENTUS_LV1  = 7;   // 風 ベントス
export const SERE_KIND_VENTUS_LV2  = 8;
export const SERE_KIND_VENTUS_LV3  = 9;
export const SERE_KIND_TERA_LV1    = 10;  // 地 テラ
export const SERE_KIND_TERA_LV2    = 11;
export const SERE_KIND_TERA_LV3    = 12;
// エレメンタルマスター（四次職）の上位精霊
export const SERE_KIND_ALDOR       = 13;  // 火 アルドール
export const SERE_KIND_DILBIO      = 14;  // 水 ディルビオ
export const SERE_KIND_PROCERA     = 15;  // 風 プロセラ
export const SERE_KIND_TELEMOTUS   = 16;  // 地 テレモトゥス
export const SERE_KIND_SERPENSE    = 17;  // 毒 サーペンス
