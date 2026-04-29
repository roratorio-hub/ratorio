import { describe, it, expect, beforeAll } from 'vitest';

describe('rndoptlist.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/rndoptlist.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('g_rndOptListArray への代入が存在する', () => {
        expect(src).toContain('g_rndOptListArray = [');
    });
});
