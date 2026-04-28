import { describe, it, expect, beforeAll } from 'vitest';

describe('timeitem.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/timeitem.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.TIME_ITEM_ID_NONE が設定される', () => {
        expect(src).toContain('window.TIME_ITEM_ID_NONE =');
    });

    it('window.TIME_ITEM_ID_AICILA_CARD が設定される', () => {
        expect(src).toContain('window.TIME_ITEM_ID_AICILA_CARD =');
    });

    it('ITEM_SP_TIME_OBJ への代入が存在する', () => {
        expect(src).toMatch(/ITEM_SP_TIME_OBJ\s*=\s*\[/);
    });
});
