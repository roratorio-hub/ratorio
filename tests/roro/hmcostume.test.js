import { describe, it, expect } from 'vitest';
import {
    ClearCostumeSlotAll,
    ClearCostumeSlot,
    RebuildCostumeSelect,
    BuildUpCostumeSlotsCostume,
    SetCostumeSlotEnabilityAll,
    SetCostumeSlotEnability,
} from '../../roro/m/js/hmcostume.js';

describe('hmcostume', () => {
    it('全関数を export する', () => {
        expect(typeof ClearCostumeSlotAll).toBe('function');
        expect(typeof ClearCostumeSlot).toBe('function');
        expect(typeof RebuildCostumeSelect).toBe('function');
        expect(typeof BuildUpCostumeSlotsCostume).toBe('function');
        expect(typeof SetCostumeSlotEnabilityAll).toBe('function');
        expect(typeof SetCostumeSlotEnability).toBe('function');
    });

    it('window compat ブロックで全関数が window に設定される', () => {
        expect(window.ClearCostumeSlotAll).toBe(ClearCostumeSlotAll);
        expect(window.ClearCostumeSlot).toBe(ClearCostumeSlot);
        expect(window.RebuildCostumeSelect).toBe(RebuildCostumeSelect);
        expect(window.BuildUpCostumeSlotsCostume).toBe(BuildUpCostumeSlotsCostume);
        expect(window.SetCostumeSlotEnabilityAll).toBe(SetCostumeSlotEnabilityAll);
        expect(window.SetCostumeSlotEnability).toBe(SetCostumeSlotEnability);
    });
});
