import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/card.h.js';

describe('card.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('CARD_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).CARD_DATA_INDEX_ID).toBe(0);
        });
        it('CARD_DATA_INDEX_KIND が 1 に定義される', () => {
            expect((globalThis as any).CARD_DATA_INDEX_KIND).toBe(1);
        });
        it('CARD_DATA_INDEX_NAME が 2 に定義される', () => {
            expect((globalThis as any).CARD_DATA_INDEX_NAME).toBe(2);
        });
        it('CARD_KIND_NONE が 0 に定義される', () => {
            expect((globalThis as any).CARD_KIND_NONE).toBe(0);
        });
        it('CARD_KIND_ARMS が 1 に定義される', () => {
            expect((globalThis as any).CARD_KIND_ARMS).toBe(1);
        });
        it('CARD_KIND_LEARNING が 91 に定義される', () => {
            expect((globalThis as any).CARD_KIND_LEARNING).toBe(91);
        });
        it('CARD_KIND_ENCHANT が 99 に定義される', () => {
            expect((globalThis as any).CARD_KIND_ENCHANT).toBe(99);
        });
        it('CARD_KIND_SET が 100 に定義される', () => {
            expect((globalThis as any).CARD_KIND_SET).toBe(100);
        });
        it('CARD_KIND_ANY が 200 に定義される', () => {
            expect((globalThis as any).CARD_KIND_ANY).toBe(200);
        });
    });
});
