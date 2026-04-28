import { describe, it, expect, beforeAll } from 'vitest';

describe('monstermap.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/monstermap.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.MONSTER_MAP_ID_MAP_ALL が設定される', () => {
        expect(src).toContain('window.MONSTER_MAP_ID_MAP_ALL =');
    });

    it('window.MONSTER_MAP_ID_CATEGORY_ALL が設定される', () => {
        expect(src).toContain('window.MONSTER_MAP_ID_CATEGORY_ALL =');
    });

    it('g_MonsterMapDataArray への代入が存在する', () => {
        expect(src).toMatch(/g_MonsterMapDataArray\s*=\s*\[/);
    });
});
