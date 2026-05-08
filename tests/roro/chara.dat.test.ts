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

    describe('window互換確認', () => {
        it('window.g_hpBaseTable が設定されている', () => {
            expect((window as any).g_hpBaseTable).toBe(g_hpBaseTable);
        });
        it('window.g_spBaseTable が設定されている', () => {
            expect((window as any).g_spBaseTable).toBe(g_spBaseTable);
        });
    });
});
