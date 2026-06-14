import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/rndopt.h.js';

describe('rndopt.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('RND_OPT_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).RND_OPT_DATA_INDEX_ID).toBe(0);
        });
        it('RND_OPT_DATA_INDEX_SPID が 1 に定義される', () => {
            expect((globalThis as any).RND_OPT_DATA_INDEX_SPID).toBe(1);
        });
        it('RND_OPT_DATA_INDEX_SPECIAL_FLAG が 5 に定義される', () => {
            expect((globalThis as any).RND_OPT_DATA_INDEX_SPECIAL_FLAG).toBe(5);
        });
        it('RND_OPT_SPECIAL_FLAG_NONE が 0 に定義される', () => {
            expect((globalThis as any).RND_OPT_SPECIAL_FLAG_NONE).toBe(0);
        });
        it('RND_OPT_SPECIAL_FLAG_ONOFF が 1 に定義される', () => {
            expect((globalThis as any).RND_OPT_SPECIAL_FLAG_ONOFF).toBe(1);
        });
    });

});
