import { describe, it, expect, beforeAll } from 'vitest';

describe('skill.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/skill.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC が設定される', () => {
        expect(src).toContain('window.SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC');
    });

    it('window.SKILL_ID_TEIOAPUCHAGI が設定される', () => {
        expect(src).toContain('window.SKILL_ID_TEIOAPUCHAGI =');
    });

    it('window.SKILL_ID_RASETSU_HAOGEKI が設定される', () => {
        expect(src).toContain('window.SKILL_ID_RASETSU_HAOGEKI =');
    });

    it('window.SkillObjNew への代入が存在する', () => {
        expect(src).toContain('window.SkillObjNew = [');
    });
});
