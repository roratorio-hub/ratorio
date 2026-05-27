import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import { g_rndOptListArray } from '@roro/rndoptlist.dat.js';

describe('rndoptlist.dat.js', () => {
    describe('エクスポート確認', () => {
        it('g_rndOptListArray が配列', () => {
            expect(Array.isArray(g_rndOptListArray)).toBe(true);
        });
        it('g_rndOptListArray が 75 件', () => {
            expect(g_rndOptListArray).toHaveLength(75);
        });
        it('g_rndOptListArray[0] が [0, [0]]', () => {
            expect(g_rndOptListArray[0]).toEqual([0, [0]]);
        });
    });
});
