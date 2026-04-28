import { describe, it, expect, beforeAll } from 'vitest';

describe('alias.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/alias.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('g_AliasDataArray への代入が存在する', () => {
        expect(src).toMatch(/g_AliasDataArray\s*=\s*\[/);
    });
});
