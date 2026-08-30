/**
 * EnumMigJobDataIndex の定数定義.
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
export const MIG_JOB_DATA_INDEX_ID                         = 0;
export const MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY            = 1;
export const MIG_JOB_DATA_INDEX_BASE_EXP_TABLE_ID          = 2;
export const MIG_JOB_DATA_INDEX_JOB_EXP_TABLE_ID           = 3;
export const MIG_JOB_DATA_INDEX_WEIGHT_BONUS               = 4;
export const MIG_JOB_DATA_INDEX_WEAPON_ASPD_ARRAY          = 5;
export const MIG_JOB_DATA_INDEX_JOB_BONUS_ARRAY            = 6;
export const MIG_JOB_DATA_INDEX_HP_ARRAY                   = 7;
export const MIG_JOB_DATA_INDEX_SP_ARRAY                   = 8;
export const MIG_JOB_DATA_INDEX_LEARN_SKILL_ID_ARRAY       = 9;
export const MIG_JOB_DATA_INDEX_PASSIVE_SKILL_ID_ARRAY     = 10;
export const MIG_JOB_DATA_INDEX_ATTACK_SKILL_ID_ARRAY      = 11;
export const MIG_JOB_DATA_INDEX_EQUIPABLE_EQUIP_FLAG_ARRAY = 12;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumMigJobDataIndex = createEnum('EnumMigJobDataIndex', {
    MIG_JOB_DATA_INDEX_ID,
    MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY,
    MIG_JOB_DATA_INDEX_BASE_EXP_TABLE_ID,
    MIG_JOB_DATA_INDEX_JOB_EXP_TABLE_ID,
    MIG_JOB_DATA_INDEX_WEIGHT_BONUS,
    MIG_JOB_DATA_INDEX_WEAPON_ASPD_ARRAY,
    MIG_JOB_DATA_INDEX_JOB_BONUS_ARRAY,
    MIG_JOB_DATA_INDEX_HP_ARRAY,
    MIG_JOB_DATA_INDEX_SP_ARRAY,
    MIG_JOB_DATA_INDEX_LEARN_SKILL_ID_ARRAY,
    MIG_JOB_DATA_INDEX_PASSIVE_SKILL_ID_ARRAY,
    MIG_JOB_DATA_INDEX_ATTACK_SKILL_ID_ARRAY,
    MIG_JOB_DATA_INDEX_EQUIPABLE_EQUIP_FLAG_ARRAY,
}, {
});
