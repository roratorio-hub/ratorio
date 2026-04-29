import { describe, it, expect, beforeAll } from 'vitest';

describe('monster.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/monster.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.VIRUS_MD が設定される', () => {
        expect(src).toContain('window.VIRUS_MD =');
    });

    it('window.MonsterObjNew への代入が存在する', () => {
        expect(src).toContain('window.MonsterObjNew = [');
    });
});
