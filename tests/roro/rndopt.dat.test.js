import { describe, it, expect, beforeAll } from 'vitest';

describe('rndopt.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/rndopt.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('g_rndOptArray への代入が存在する', () => {
        expect(src).toMatch(/g_rndOptArray\s*=\s*\[/);
    });
});
