import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/costume.h.js';

describe('costume.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('COSTUME_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).COSTUME_DATA_INDEX_ID).toBe(0);
        });
        it('COSTUME_DATA_INDEX_SPBEGIN が 11 に定義される', () => {
            expect((globalThis as any).COSTUME_DATA_INDEX_SPBEGIN).toBe(11);
        });
        it('COSTUME_KIND_NONE が 0 に定義される', () => {
            expect((globalThis as any).COSTUME_KIND_NONE).toBe(0);
        });
        it('COSTUME_KIND_ACCESSORY が 9 に定義される', () => {
            expect((globalThis as any).COSTUME_KIND_ACCESSORY).toBe(9);
        });
    });
});
