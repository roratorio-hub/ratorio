/**
 * カードスロットの添字範囲（依存ゼロ）.
 *
 * 実体は slotpager.js にあったが、hmcard.js との循環 import（hmcard ↔ slotpager）を
 * 断ち切るため、値のみの定数をこの依存ゼロファイルへ切り出した。slotpager.js は
 * この値を re-export する。
 */

export const SLOT_INDEX_CARD_MIN = 1;
export const SLOT_INDEX_CARD_MAX = 4;
