import { describe, it, expect, beforeAll } from 'vitest';

describe('itempack.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/itempack.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.ITEM_PACK_ID_NONE が設定される', () => {
        expect(src).toContain('window.ITEM_PACK_ID_NONE =');
    });

    it('window.ItemPackOBJ への代入が存在する', () => {
        expect(src).toContain('window.ItemPackOBJ = [');
    });
});
