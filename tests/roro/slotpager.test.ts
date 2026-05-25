import { describe, it, expect } from 'vitest';
import {
    SLOTPAGER_MODE_CARD, SLOTPAGER_MODE_RNDENCH, SLOTPAGER_MODE_RNDOPT,
    SLOT_INDEX_CARD_MIN, SLOT_INDEX_CARD_MAX,
    SLOT_INDEX_COSTUME_MIN, SLOT_INDEX_COSTUME_MAX,
    SLOT_INDEX_RNDENCH_MIN, SLOT_INDEX_RNDENCH_MAX,
    GetSlotMode, OnClickSlotModeButton,
    SaveSlotStateCardAll, SaveSlotStateCard, __SaveSlotStateCard,
    BreakSlotOfCardAll, BreakSlotOfCard, __BreakSlotOfCard, __BreakSlotOfCardShort,
    RebuildSlotAsCardAll, RebuildSlotAsCard, __RebuildSlotAsCard, __RebuildSlotAsCardShort,
    LoadSlotStateCardAll, LoadSlotStateCard, __LoadSlotStateCard,
    SaveSlotStateCostumeAll, SaveSlotStateCostume, __SaveSlotStateCostume,
    BreakSlotOfCostumeAll, BreakSlotOfCostume, __BreakSlotOfCostume,
    RebuildSlotAsCostumeAll, RebuildSlotAsCostume, __RebuildSlotAsCostume,
    LoadSlotStateCostumeAll, LoadSlotStateCostume, __LoadSlotStateCostume,
    SaveSlotStateRndEnchAll, SaveSlotStateRndEnch,
    BreakSlotOfRndEnchAll, BreakSlotOfRndEnch,
    RebuildSlotAsRndEnchAll, RebuildSlotAsRndEnch, __RebuildSlotAsRndEnch,
    LoadSlotStateRndEnchAll, LoadSlotStateRndEnch,
} from '@roro/slotpager.js';

describe('slotpager.js', () => {
    describe('定数値確認', () => {
        it('SLOTPAGER_MODE_CARD が 0', () => { expect(SLOTPAGER_MODE_CARD).toBe(0); });
        it('SLOTPAGER_MODE_RNDENCH が 1', () => { expect(SLOTPAGER_MODE_RNDENCH).toBe(1); });
        it('SLOTPAGER_MODE_RNDOPT が 1', () => { expect(SLOTPAGER_MODE_RNDOPT).toBe(1); });
        it('SLOT_INDEX_CARD_MIN が 1', () => { expect(SLOT_INDEX_CARD_MIN).toBe(1); });
        it('SLOT_INDEX_CARD_MAX が 4', () => { expect(SLOT_INDEX_CARD_MAX).toBe(4); });
        it('SLOT_INDEX_COSTUME_MIN が 1', () => { expect(SLOT_INDEX_COSTUME_MIN).toBe(1); });
        it('SLOT_INDEX_COSTUME_MAX が 1', () => { expect(SLOT_INDEX_COSTUME_MAX).toBe(1); });
        it('SLOT_INDEX_RNDENCH_MIN が 1', () => { expect(SLOT_INDEX_RNDENCH_MIN).toBe(1); });
        it('SLOT_INDEX_RNDENCH_MAX が 5', () => { expect(SLOT_INDEX_RNDENCH_MAX).toBe(5); });
    });

    describe('エクスポート確認', () => {
        const fns = {
            GetSlotMode, OnClickSlotModeButton,
            SaveSlotStateCardAll, SaveSlotStateCard, __SaveSlotStateCard,
            BreakSlotOfCardAll, BreakSlotOfCard, __BreakSlotOfCard, __BreakSlotOfCardShort,
            RebuildSlotAsCardAll, RebuildSlotAsCard, __RebuildSlotAsCard, __RebuildSlotAsCardShort,
            LoadSlotStateCardAll, LoadSlotStateCard, __LoadSlotStateCard,
            SaveSlotStateCostumeAll, SaveSlotStateCostume, __SaveSlotStateCostume,
            BreakSlotOfCostumeAll, BreakSlotOfCostume, __BreakSlotOfCostume,
            RebuildSlotAsCostumeAll, RebuildSlotAsCostume, __RebuildSlotAsCostume,
            LoadSlotStateCostumeAll, LoadSlotStateCostume, __LoadSlotStateCostume,
            SaveSlotStateRndEnchAll, SaveSlotStateRndEnch,
            BreakSlotOfRndEnchAll, BreakSlotOfRndEnch,
            RebuildSlotAsRndEnchAll, RebuildSlotAsRndEnch, __RebuildSlotAsRndEnch,
            LoadSlotStateRndEnchAll, LoadSlotStateRndEnch,
        };
        for (const [name, fn] of Object.entries(fns)) {
            it(`${name} が関数`, () => {
                expect(typeof fn).toBe('function');
            });
        }
    });

});
