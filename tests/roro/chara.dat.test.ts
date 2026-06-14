import { describe, it, expect } from 'vitest';
import { g_hpBaseTable } from '@roro/chara.dat.js';

describe('chara.dat.js', () => {
    describe('エクスポート確認', () => {
        it('g_hpBaseTable[0][0] が 40（BaseLv1 の HP）', () => {
            expect(g_hpBaseTable[0][0]).toBe(40);
        });
    });
});
