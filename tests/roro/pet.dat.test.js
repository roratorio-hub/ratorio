import { describe, it, expect, beforeAll } from 'vitest';

describe('pet.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/pet.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.PET_ID_NONE が設定される', () => {
        expect(src).toContain('window.PET_ID_NONE =');
    });

    it('window.PET_ID_PORING が設定される', () => {
        expect(src).toContain('window.PET_ID_PORING =');
    });

    it('window.PET_OBJ への代入が存在する', () => {
        expect(src).toContain('window.PET_OBJ =');
    });
});
