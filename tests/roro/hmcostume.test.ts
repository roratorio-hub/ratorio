import { describe, it, expect } from 'vitest';
import {
    ClearCostumeSlotAll, ClearCostumeSlot, __ClearCostumeSlot,
    RebuildCostumeSelect, BuildUpCostumeSlotsCostume,
    SetCostumeSlotEnabilityAll, SetCostumeSlotEnability, __SetCostumeSlotEnability,
} from '@roro/hmcostume.js';

describe('hmcostume.js', () => {
    describe('エクスポート確認', () => {
        const exports = {
            ClearCostumeSlotAll, ClearCostumeSlot, __ClearCostumeSlot,
            RebuildCostumeSelect, BuildUpCostumeSlotsCostume,
            SetCostumeSlotEnabilityAll, SetCostumeSlotEnability, __SetCostumeSlotEnability,
        };
        for (const [name, fn] of Object.entries(exports)) {
            it(`${name} が関数`, () => {
                expect(typeof fn).toBe('function');
            });
        }
    });

    describe('window互換確認', () => {
        const names = [
            'ClearCostumeSlotAll', 'ClearCostumeSlot', '__ClearCostumeSlot',
            'RebuildCostumeSelect', 'BuildUpCostumeSlotsCostume',
            'SetCostumeSlotEnabilityAll', 'SetCostumeSlotEnability', '__SetCostumeSlotEnability',
        ];
        for (const name of names) {
            it(`window.${name} が設定されている`, () => {
                expect(typeof (window as any)[name]).toBe('function');
            });
        }
    });
});
