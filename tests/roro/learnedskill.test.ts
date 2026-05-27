import { describe, it, expect } from 'vitest';
import {
    n_SkillSWLearned, LEARNED_SKILL_MAX_COUNT, n_A_LearnedSkill,
    LearnedSkillSearch, OnClickSkillSWLearned, IsLearnedSkillTarget,
    UpdateLearnedSkillSettingColoring, RefreshSkillColumnHeaderLearned,
} from '@roro/learnedskill.js';

describe('learnedskill.js', () => {
    describe('エクスポート確認', () => {
        it('n_SkillSWLearned が boolean', () => {
            expect(typeof n_SkillSWLearned).toBe('boolean');
        });
        it('n_SkillSWLearned の初期値が false', () => {
            expect(n_SkillSWLearned).toBe(false);
        });
        it('LEARNED_SKILL_MAX_COUNT が 200', () => {
            expect(LEARNED_SKILL_MAX_COUNT).toBe(200);
        });
        it('n_A_LearnedSkill が配列', () => {
            expect(Array.isArray(n_A_LearnedSkill)).toBe(true);
        });
        it('n_A_LearnedSkill の長さが LEARNED_SKILL_MAX_COUNT', () => {
            expect(n_A_LearnedSkill.length).toBe(LEARNED_SKILL_MAX_COUNT);
        });

        const fns = {
            LearnedSkillSearch, OnClickSkillSWLearned, IsLearnedSkillTarget,
            UpdateLearnedSkillSettingColoring, RefreshSkillColumnHeaderLearned,
        };
        for (const [name, fn] of Object.entries(fns)) {
            it(`${name} が関数`, () => {
                expect(typeof fn).toBe('function');
            });
        }
    });

    describe('window互換確認', () => {
        it('window.LearnedSkillSearch が設定されている', () => {
            expect((window as any).LearnedSkillSearch).toBe(LearnedSkillSearch);
        });
    });
});
