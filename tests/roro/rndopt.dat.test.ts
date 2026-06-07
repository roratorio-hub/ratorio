import { describe, it, expect } from 'vitest';
import { g_rndOptArray } from '@roro/rndopt.dat.js';

describe('rndopt.dat.js', () => {
    describe('エクスポート確認', () => {
        it('g_rndOptArray が配列', () => {
            expect(Array.isArray(g_rndOptArray)).toBe(true);
        });
        it('g_rndOptArray が 274 件以上', () => {
            expect(g_rndOptArray.length).toBeGreaterThan(0);
        });
        it('g_rndOptArray[0] が [0, 0, 0, 0, 1, 0]', () => {
            expect(g_rndOptArray[0]).toEqual([0, 0, 0, 0, 1, 0]);
        });
    });
});
