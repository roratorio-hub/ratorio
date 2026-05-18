import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/pet.h.js';

describe('pet.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('PET_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).PET_DATA_INDEX_ID).toBe(0);
        });
        it('PET_DATA_INDEX_NAME が 1 に定義される', () => {
            expect((globalThis as any).PET_DATA_INDEX_NAME).toBe(1);
        });
        it('PET_DATA_INDEX_KANA が 2 に定義される', () => {
            expect((globalThis as any).PET_DATA_INDEX_KANA).toBe(2);
        });
        it('PET_DATA_INDEX_DETAIL が 3 に定義される', () => {
            expect((globalThis as any).PET_DATA_INDEX_DETAIL).toBe(3);
        });
        it('PET_DATA_INDEX_SPBEGIN が 4 に定義される', () => {
            expect((globalThis as any).PET_DATA_INDEX_SPBEGIN).toBe(4);
        });
    });
});
