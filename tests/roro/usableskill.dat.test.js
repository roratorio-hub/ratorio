import { describe, it, expect, beforeAll } from 'vitest';

describe('usableskill.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/usableskill.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.USABEL_SKILL_ID_NONE が設定される', () => {
        expect(src).toContain('window.USABEL_SKILL_ID_NONE =');
    });

    it('window.InsertSkill が設定される', () => {
        expect(src).toContain('window.InsertSkill =');
    });
});
