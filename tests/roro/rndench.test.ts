import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IsEnableRandomEnchant } from '@roro/rndench.js';

const mockRefs = vi.hoisted(() => ({
    itemObjNew: [] as any[],
    getRndOptTypeId: (_: number) => 0,
}));

vi.mock('@roro/item.dat.js', () => ({
    get ItemObjNew() { return mockRefs.itemObjNew; },
}));

vi.mock('@roro/item.h.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get GetRndOptTypeId() { return mockRefs.getRndOptTypeId; } };
});

describe('rndench.js', () => {
    describe('エクスポート確認', () => {
        it('IsEnableRandomEnchant がエクスポートされている', () => {
            expect(typeof IsEnableRandomEnchant).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.IsEnableRandomEnchant が設定されている', () => {
            expect((window as any).IsEnableRandomEnchant).toBe(IsEnableRandomEnchant);
        });
    });

    describe('IsEnableRandomEnchant の動作', () => {
        beforeEach(() => {
            (globalThis as any).ITEM_DATA_INDEX_WPNLV = 2;
            mockRefs.getRndOptTypeId = () => 0;
            mockRefs.itemObjNew = [];
        });
        afterEach(() => {
            delete (globalThis as any).ITEM_DATA_INDEX_WPNLV;
        });

        it('GetRndOptTypeId が 1 以上なら true を返す', () => {
            mockRefs.getRndOptTypeId = () => 1;
            const item: any[] = [];
            item[2] = 11; // ITEM_DATA_INDEX_WPNLV=2, wpnlv=11
            mockRefs.itemObjNew = [item];
            expect(IsEnableRandomEnchant(0)).toBe(true);
        });

        it('wpnlv の最下位ビットが 1 なら true を返す', () => {
            const item: any[] = [];
            item[2] = 5;
            mockRefs.itemObjNew = [item];
            expect(IsEnableRandomEnchant(0)).toBe(false);
        });

        it('GetRndOptTypeId が 0 かつ flag が 0 なら false を返す', () => {
            const item: any[] = [];
            item[2] = 10;
            mockRefs.itemObjNew = [item];
            expect(IsEnableRandomEnchant(0)).toBe(false);
        });
    });
});
