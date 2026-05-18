import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/rndoptlist.h.js';

describe('rndoptlist.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('RND_OPT_LIST_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).RND_OPT_LIST_DATA_INDEX_ID).toBe(0);
        });
        it('RND_OPT_LIST_DATA_INDEX_OPT_ID_ARRAY が 1 に定義される', () => {
            expect((globalThis as any).RND_OPT_LIST_DATA_INDEX_OPT_ID_ARRAY).toBe(1);
        });
    });
});
