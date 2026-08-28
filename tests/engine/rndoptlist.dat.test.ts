import { describe, it, expect } from 'vitest';
import { g_rndOptListArray } from '@engine/rndoptlist.dat.js';

describe('rndoptlist.dat.js', () => {
    describe('エクスポート確認', () => {
        it('g_rndOptListArray[0] が [0, [0]]', () => {
            expect(g_rndOptListArray[0]).toEqual([0, [0]]);
        });
    });
});
