import { describe, it, expect, beforeAll } from 'vitest';

describe('item.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/item.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.ItemObjNew への代入が存在する', () => {
        expect(src).toContain('window.ItemObjNew = [');
    });

    it('window.g_ItemIdArrayByKind への代入が存在する', () => {
        expect(src).toContain('window.g_ItemIdArrayByKind = []');
    });
});
