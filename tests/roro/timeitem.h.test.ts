import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/timeitem.h.js';

describe('timeitem.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('TIME_ITEM_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).TIME_ITEM_DATA_INDEX_ID).toBe(0);
        });
        it('TIME_ITEM_DATA_INDEX_NAME が 1 に定義される', () => {
            expect((globalThis as any).TIME_ITEM_DATA_INDEX_NAME).toBe(1);
        });
        it('TIME_ITEM_DATA_INDEX_EXPLAIN が 2 に定義される', () => {
            expect((globalThis as any).TIME_ITEM_DATA_INDEX_EXPLAIN).toBe(2);
        });
        it('TIME_ITEM_DATA_INDEX_SRC_INDEX_KIND が 0 に定義される', () => {
            expect((globalThis as any).TIME_ITEM_DATA_INDEX_SRC_INDEX_KIND).toBe(0);
        });
        it('TIME_ITEM_DATA_INDEX_SRC_INDEX_ID が 1 に定義される', () => {
            expect((globalThis as any).TIME_ITEM_DATA_INDEX_SRC_INDEX_ID).toBe(1);
        });
    });


});
