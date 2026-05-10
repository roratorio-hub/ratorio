import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/arrow.h.js';

describe('arrow.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('ARROW_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).ARROW_DATA_INDEX_ID).toBe(0);
        });
        it('ARROW_DATA_INDEX_SPBEGIN が 5 に定義される', () => {
            expect((globalThis as any).ARROW_DATA_INDEX_SPBEGIN).toBe(5);
        });
        it('ARROW_KIND_NONE が 0 に定義される', () => {
            expect((globalThis as any).ARROW_KIND_NONE).toBe(0);
        });
        it('ARROW_KIND_ARROW が 1 に定義される', () => {
            expect((globalThis as any).ARROW_KIND_ARROW).toBe(1);
        });
        it('ARROW_KIND_BULLET が 2 に定義される', () => {
            expect((globalThis as any).ARROW_KIND_BULLET).toBe(2);
        });
    });
});
