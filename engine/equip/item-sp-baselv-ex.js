/**
 * ＳＰ定義ＩＤの 10^19 の位に置く「BaseLvが N 以上の時」条件（Lv上限の拡張で増える条件専用）.
 *
 * 条件を増やすときは、EnumItemSpId.js に ITEM_SP_BASE_LV_OVER_N_OFFSET を足し、
 * 下の表に1行足し、util/item-card-enchant/craft_util.py の AT_BASE_LV_EX_CODE にも足す。
 */

import { ITEM_SP_BASE_LV_OVER_285_OFFSET } from "../const/EnumItemSpId.js";
import { toNumberIfSafe } from "../runtime/util.js";

/** 10^19 の位の 1 あたりの値. */
export const ITEM_SP_BASE_LV_OVER_EX_UNIT = 10000000000000000000n;

/** [条件の値, 必要なBaseLv] */
const BASE_LV_OVER_EX_TABLE = [
    [ITEM_SP_BASE_LV_OVER_285_OFFSET, 285],
];

/**
 * ＳＰ定義ＩＤから「BaseLvが N 以上の時」条件の桁を取り除く.
 * @param {number|bigint} spId フラグ付きアイテムSP
 * @returns {{requiredBaseLv: number, rest: number|bigint}|null} 条件が無ければ null.
 *   表に無い値のとき requiredBaseLv は Infinity（どのBaseLvでも成立しない）.
 *   rest は条件の桁を除いた値で、安全な整数の範囲なら Number
 */
export function SplitBaseLvOverEx(spId) {
    if (spId < ITEM_SP_BASE_LV_OVER_EX_UNIT) {
        return null;
    }

    const value = BigInt(spId);
    const flag = value - (value % ITEM_SP_BASE_LV_OVER_EX_UNIT);
    const entry = BASE_LV_OVER_EX_TABLE.find(([offset]) => offset === flag);

    return {
        requiredBaseLv: entry ? entry[1] : Infinity,
        rest: toNumberIfSafe(value % ITEM_SP_BASE_LV_OVER_EX_UNIT),
    };
}
