import { describe, it, expect, beforeAll } from 'vitest';

describe('itemset.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/itemset.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('ItemIdToSetIdMap への代入が存在する', () => {
        expect(src).toContain('ItemIdToSetIdMap = new Array()');
    });

    it('w_SE への代入が存在する', () => {
        expect(src).toContain('w_SE = [');
    });
});
