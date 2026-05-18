import { describe, it, expect } from 'vitest';
import {
    ItemIdToSetIdMap,
    w_SE,
    CardIdToSetIdMap,
    PetIdToSetIdMap,
} from '@roro/itemset.dat.js';

describe('itemset.dat.js', () => {
    describe('エクスポート確認', () => {
        it('ItemIdToSetIdMap が配列',         () => expect(Array.isArray(ItemIdToSetIdMap)).toBe(true));
        it('ItemIdToSetIdMap[9] が定義済み',  () => expect(ItemIdToSetIdMap[9]).toBeDefined());
        it('ItemIdToSetIdMap[9][0] が 95',   () => expect(ItemIdToSetIdMap[9][0]).toBe(95));
        it('w_SE が配列',                     () => expect(Array.isArray(w_SE)).toBe(true));
        it('w_SE[0] が空配列',                () => expect(w_SE[0]).toEqual([]));
        it('w_SE[1] が定義済み',              () => expect(w_SE[1]).toBeDefined());
        it('CardIdToSetIdMap が配列',         () => expect(Array.isArray(CardIdToSetIdMap)).toBe(true));
        it('PetIdToSetIdMap が配列',          () => expect(Array.isArray(PetIdToSetIdMap)).toBe(true));
    });

    describe('window互換確認', () => {
        it('window.ItemIdToSetIdMap',         () => expect((window as any).ItemIdToSetIdMap).toBe(ItemIdToSetIdMap));
        it('window.w_SE',                     () => expect((window as any).w_SE).toBe(w_SE));
        it('window.CardIdToSetIdMap',         () => expect((window as any).CardIdToSetIdMap).toBe(CardIdToSetIdMap));
        it('window.PetIdToSetIdMap',          () => expect((window as any).PetIdToSetIdMap).toBe(PetIdToSetIdMap));
    });
});
