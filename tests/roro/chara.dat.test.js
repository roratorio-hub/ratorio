import { describe, it, expect, beforeAll } from 'vitest';

describe('chara.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/chara.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.g_hpBaseTable が設定される', () => {
        expect(src).toContain('window.g_hpBaseTable =');
    });

    it('window.g_spBaseTable が設定される', () => {
        expect(src).toContain('window.g_spBaseTable =');
    });
});
