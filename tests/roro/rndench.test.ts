import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IsEnableRandomEnchant } from '@engine/equip/rndench.js';
import { ITEM_DATA_INDEX_WPNLV } from '@engine/const/EnumItemDataIndex.js';

const mockRefs = vi.hoisted(() => ({
    itemObjNew: [] as any[],
    getRndOptTypeId: (_: number) => 0,
}));

vi.mock('@engine/item.dat.js', () => ({
    get ItemObjNew() { return mockRefs.itemObjNew; },
}));

vi.mock('@engine/item.h.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get GetRndOptTypeId() { return mockRefs.getRndOptTypeId; } };
});

describe('rndench.js', () => {
    describe('IsEnableRandomEnchant の動作', () => {
        // ITEM_DATA_INDEX_WPNLV は const 化され書き換え不能になったため、
        // 偽装をやめて実際の添字をそのまま使う。
        beforeEach(() => {
            mockRefs.getRndOptTypeId = () => 0;
            mockRefs.itemObjNew = [];
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
