import { describe, it, expect, beforeAll } from 'vitest';

describe('autospell.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/autospell.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.AS_ID_0 が設定される', () => {
        expect(src).toContain('window.AS_ID_0 =');
    });

    it('window.AS_ID_HEAL_1 が設定される', () => {
        expect(src).toContain('window.AS_ID_HEAL_1 =');
    });
});
