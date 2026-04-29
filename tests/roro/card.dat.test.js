import { describe, it, expect, beforeAll } from 'vitest';

describe('card.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/card.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.CardObjNew への代入が存在する', () => {
        expect(src).toContain('window.CardObjNew = [');
    });

    it('window.CardSortOBJ への代入が存在する', () => {
        expect(src).toContain('window.CardSortOBJ = []');
    });

    it('card_ordered_info が var 宣言されている', () => {
        expect(src).toContain('var card_ordered_info = [');
    });

    it('sorted_card が var 宣言されている', () => {
        expect(src).toContain('var sorted_card;');
    });

    it('for ループの i が var 宣言されている', () => {
        expect(src).toContain('for (var i = 0;');
    });
});
