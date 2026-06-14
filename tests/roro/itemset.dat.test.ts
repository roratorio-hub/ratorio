import { describe, it, expect } from 'vitest';
import {
    ItemIdToSetIdMap,
    w_SE,
    CardIdToSetIdMap,
    PetIdToSetIdMap,
} from '@roro/itemset.dat.js';

describe('itemset.dat.js', () => {
    describe('エクスポート確認', () => {
        it('ItemIdToSetIdMap[9][0] が 95',   () => expect(ItemIdToSetIdMap[9][0]).toBe(95));
    });

    describe('window互換確認', () => {
        it('window.ItemIdToSetIdMap',         () => expect((window as any).ItemIdToSetIdMap).toBe(ItemIdToSetIdMap));
        it('window.w_SE',                     () => expect((window as any).w_SE).toBe(w_SE));
        it('window.CardIdToSetIdMap',         () => expect((window as any).CardIdToSetIdMap).toBe(CardIdToSetIdMap));
        it('window.PetIdToSetIdMap',          () => expect((window as any).PetIdToSetIdMap).toBe(PetIdToSetIdMap));
    });
});
