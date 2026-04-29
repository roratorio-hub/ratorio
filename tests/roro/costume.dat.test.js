import { describe, it, expect, beforeAll } from 'vitest';

describe('costume.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/costume.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.COSTUME_ID_HEAD_UNDER_NONE が設定される', () => {
        expect(src).toContain('window.COSTUME_ID_HEAD_UNDER_NONE =');
    });

    it('window.CostumeOBJ への代入が存在する', () => {
        expect(src).toContain('window.CostumeOBJ = [');
    });
});
