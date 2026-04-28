import { describe, it, expect, beforeAll } from 'vitest';

describe('monster.toughness.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/monster.toughness.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('class MonsterToughness が宣言されている', () => {
        expect(src).toContain('class MonsterToughness');
    });

    it('window.MonsterToughness が compat ブロックで設定される', () => {
        expect(src).toContain('window.MonsterToughness = MonsterToughness');
    });

    it('static DAMPING_NONE が宣言されている', () => {
        expect(src).toContain('static DAMPING_NONE =');
    });
});
