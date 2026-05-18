import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/itempack.h.js';

describe('itempack.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('ITEM_PACK_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_DATA_INDEX_ID).toBe(0);
        });
        it('ITEM_PACK_DATA_INDEX_NAME が 1 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_DATA_INDEX_NAME).toBe(1);
        });
        it('ITEM_PACK_DATA_INDEX_KANA が 2 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_DATA_INDEX_KANA).toBe(2);
        });
        it('ITEM_PACK_DATA_INDEX_DETAIL が 3 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_DATA_INDEX_DETAIL).toBe(3);
        });
        it('ITEM_PACK_DATA_INDEX_ITEMS が 4 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_DATA_INDEX_ITEMS).toBe(4);
        });
        it('ITEM_PACK_ITEMS_KIND_ITEM が 0 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_ITEMS_KIND_ITEM).toBe(0);
        });
        it('ITEM_PACK_ITEMS_KIND_CARD が 1 に定義される', () => {
            expect((globalThis as any).ITEM_PACK_ITEMS_KIND_CARD).toBe(1);
        });
    });
});
