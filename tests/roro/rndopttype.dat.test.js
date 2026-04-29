import { describe, it, expect, beforeAll } from 'vitest';

describe('rndopttype.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/rndopttype.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('g_rndOptTypeArray への代入が存在する', () => {
        expect(src).toContain('g_rndOptTypeArray = [');
    });
});
