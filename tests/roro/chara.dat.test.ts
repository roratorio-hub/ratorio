import { describe, it, expect } from 'vitest';
import { g_hpBaseTable, g_spBaseTable } from '@roro/chara.dat.js';

describe('chara.dat.js', () => {
    describe('エクスポート確認', () => {
        it('g_hpBaseTable が配列', () => {
            expect(Array.isArray(g_hpBaseTable)).toBe(true);
        });
        it('g_hpBaseTable が複数行のテーブル', () => {
            expect(g_hpBaseTable.length).toBeGreaterThan(0);
        });
        it('g_hpBaseTable[0][0] が 40（BaseLv1 の HP）', () => {
            expect(g_hpBaseTable[0][0]).toBe(40);
        });
        it('g_spBaseTable が配列', () => {
            expect(Array.isArray(g_spBaseTable)).toBe(true);
        });
        it('g_spBaseTable が複数行のテーブル', () => {
            expect(g_spBaseTable.length).toBeGreaterThan(0);
        });
    });
});
