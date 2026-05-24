import { describe, it, expect } from 'vitest';
import {
    SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC,
    SERE_SUPPORT_SKILL_ID_POISON_SHIELD,
    SKILL_ID_TUZYO_KOGEKI,
    SKILL_ID_OKYU_TEATE,
    SKILL_ID_ABYSS_DAGGER_STATE,
    SkillObjNew,
} from '@roro/skill.dat.js';

describe('skill.dat.js', () => {
    describe('エクスポート確認', () => {
        it('SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC が 1',  () => expect(SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC).toBe(1));
        it('SERE_SUPPORT_SKILL_ID_POISON_SHIELD が 50', () => expect(SERE_SUPPORT_SKILL_ID_POISON_SHIELD).toBe(50));
        it('SKILL_ID_TUZYO_KOGEKI が 0',               () => expect(SKILL_ID_TUZYO_KOGEKI).toBe(0));
        it('SKILL_ID_OKYU_TEATE が 1',                 () => expect(SKILL_ID_OKYU_TEATE).toBe(1));
        it('SKILL_ID_ABYSS_DAGGER_STATE が 1273',      () => expect(SKILL_ID_ABYSS_DAGGER_STATE).toBe(1273));
        it('SkillObjNew が配列',                        () => expect(Array.isArray(SkillObjNew)).toBe(true));
        it('SkillObjNew が 1396 件',                    () => expect(SkillObjNew).toHaveLength(1396));
        it('SkillObjNew[0][0] が 0',                   () => expect(SkillObjNew[0][0]).toBe(0));
        it('SkillObjNew[1][0] が 1',                   () => expect(SkillObjNew[1][0]).toBe(1));
    });

    describe('window互換確認', () => {
        it('window.SKILL_ID_TUZYO_KOGEKI',              () => expect((window as any).SKILL_ID_TUZYO_KOGEKI).toBe(SKILL_ID_TUZYO_KOGEKI));
        it('window.SKILL_ID_ABYSS_DAGGER_STATE',        () => expect((window as any).SKILL_ID_ABYSS_DAGGER_STATE).toBe(SKILL_ID_ABYSS_DAGGER_STATE));
    });
});
