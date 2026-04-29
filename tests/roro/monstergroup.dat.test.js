import { describe, it, expect, beforeAll } from 'vitest';

describe('monstergroup.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/monstergroup.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.MONSTER_GROUP_ID_MANUKU が設定される', () => {
        expect(src).toContain('window.MONSTER_GROUP_ID_MANUKU =');
    });

    it('window.MONSTER_GROUP_ID_UKNW_RUIN が設定される', () => {
        expect(src).toContain('window.MONSTER_GROUP_ID_UKNW_RUIN =');
    });

    it('window.MonsterGroupObj への代入が存在する', () => {
        expect(src).toContain('window.MonsterGroupObj = [');
    });
});
