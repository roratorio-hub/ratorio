import { describe, it, expect, beforeAll } from 'vitest';

describe('arrow.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/arrow.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.ARROW_ID_NONE が設定される', () => {
        expect(src).toContain('window.ARROW_ID_NONE =');
    });

    it('window.ARROW_ID_YA が設定される', () => {
        expect(src).toContain('window.ARROW_ID_YA =');
    });
});
