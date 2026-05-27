import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 0;
});

import {
    ITEM_ID_SUDE,
    ITEM_ID_KNIFE,
    ITEM_ID_SWORD,
    ItemObjNew,
} from '@roro/item.dat.js';

describe('item.dat.js', () => {
    describe('エクスポート確認', () => {
        it('ITEM_ID_SUDE が 0', () => expect(ITEM_ID_SUDE).toBe(0));
        it('ITEM_ID_KNIFE が 1', () => expect(ITEM_ID_KNIFE).toBe(1));
        it('ITEM_ID_SWORD が 16', () => expect(ITEM_ID_SWORD).toBe(16));
        it('ItemObjNew が配列', () => expect(Array.isArray(ItemObjNew)).toBe(true));
        it('ItemObjNew の長さが正しい', () => expect(ItemObjNew.length).toBeGreaterThan(0));
    });

    describe('window互換確認', () => {
        it('window.ITEM_ID_SUDE', () => expect((window as any).ITEM_ID_SUDE).toBe(ITEM_ID_SUDE));
        it('window.ITEM_ID_KNIFE', () => expect((window as any).ITEM_ID_KNIFE).toBe(ITEM_ID_KNIFE));
        it('window.ItemObjNew', () => expect((window as any).ItemObjNew).toBe(ItemObjNew));
    });
});
