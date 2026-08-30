import { describe, it, expect } from 'vitest';
import { buildSaveDataUnitsFromState, MIGRATED_SAVE_DATA_UNIT_TYPES } from '@engine/savedata/savedata-collect.js';

describe('savedata-collect.js', () => {
    it('Phase 0時点では移植済み型が0件で、組み立て結果も空配列を返す', () => {
        expect(MIGRATED_SAVE_DATA_UNIT_TYPES).toEqual([]);
        expect(buildSaveDataUnitsFromState()).toEqual([]);
    });
});
