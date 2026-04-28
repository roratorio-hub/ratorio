import { describe, it, expect } from 'vitest';
// CGlobalConstManager.js を先にインポートして DefineEnum を確立する
import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/common.js';
import '../../roro/m/js/slotpager.js';

describe('slotpager', () => {
    it('定数が window に設定される', () => {
        expect(window.SLOTPAGER_MODE_CARD).toBe(0);
        expect(window.SLOTPAGER_MODE_RNDENCH).toBe(1);
        expect(typeof window.SLOT_INDEX_CARD_MIN).toBe('number');
        expect(typeof window.SLOT_INDEX_CARD_MAX).toBe('number');
        expect(typeof window.SLOT_INDEX_COSTUME_MIN).toBe('number');
        expect(typeof window.SLOT_INDEX_RNDENCH_MIN).toBe('number');
        expect(typeof window.SLOT_INDEX_RNDENCH_MAX).toBe('number');
    });

    it('関数が window に設定される', () => {
        expect(typeof window.GetSlotMode).toBe('function');
        expect(typeof window.OnClickSlotModeButton).toBe('function');
        expect(typeof window.SaveSlotStateCardAll).toBe('function');
        expect(typeof window.BreakSlotOfCardAll).toBe('function');
        expect(typeof window.RebuildSlotAsCardAll).toBe('function');
        expect(typeof window.LoadSlotStateCardAll).toBe('function');
        expect(typeof window.SaveSlotStateCostumeAll).toBe('function');
        expect(typeof window.BreakSlotOfCostumeAll).toBe('function');
        expect(typeof window.RebuildSlotAsCostumeAll).toBe('function');
        expect(typeof window.LoadSlotStateCostumeAll).toBe('function');
        expect(typeof window.SaveSlotStateRndEnchAll).toBe('function');
        expect(typeof window.BreakSlotOfRndEnchAll).toBe('function');
        expect(typeof window.RebuildSlotAsRndEnchAll).toBe('function');
        expect(typeof window.LoadSlotStateRndEnchAll).toBe('function');
    });
});
