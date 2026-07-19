import { describe, it, expect } from 'vitest';
import {
    ItemIdToSetIdMap,
    w_SE,
} from '@roro/itemset.dat.js';

describe('itemset.dat.js', () => {
    it('ItemIdToSetIdMap のセットIDが w_SE の該当セット定義を指す', () => {
        const setId = ItemIdToSetIdMap[9][0];
        expect(setId).toBe(95);
        // w_SE[setId] はセット定義（先頭がセット定義ID、以降がメンバーID）
        expect(Array.isArray(w_SE[setId])).toBe(true);
        expect(w_SE[setId].length).toBeGreaterThan(1);
    });
});
