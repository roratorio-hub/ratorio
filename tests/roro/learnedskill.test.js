import { describe, it, expect, beforeEach } from 'vitest';
import {
    LearnedSkillSearch,
    OnClickSkillSWLearned,
    IsLearnedSkillTarget,
    UpdateLearnedSkillSettingColoring,
    RefreshSkillColumnHeaderLearned,
} from '../../roro/m/js/learnedskill.js';

describe('learnedskill', () => {
    it('全関数を export する', () => {
        expect(typeof LearnedSkillSearch).toBe('function');
        expect(typeof OnClickSkillSWLearned).toBe('function');
        expect(typeof IsLearnedSkillTarget).toBe('function');
        expect(typeof UpdateLearnedSkillSettingColoring).toBe('function');
        expect(typeof RefreshSkillColumnHeaderLearned).toBe('function');
    });

    it('window compat ブロックで全関数が window に設定される', () => {
        expect(window.LearnedSkillSearch).toBe(LearnedSkillSearch);
        expect(window.OnClickSkillSWLearned).toBe(OnClickSkillSWLearned);
        expect(window.IsLearnedSkillTarget).toBe(IsLearnedSkillTarget);
    });

    it('window.LEARNED_SKILL_MAX_COUNT が 200 に設定される', () => {
        expect(window.LEARNED_SKILL_MAX_COUNT).toBe(200);
    });

    it('window.n_A_LearnedSkill が初期化済み配列として設定される', () => {
        expect(Array.isArray(window.n_A_LearnedSkill)).toBe(true);
        expect(window.n_A_LearnedSkill.length).toBe(200);
    });

    it('LearnedSkillSearch: 学習していないスキルは 0 を返す', () => {
        window.g_constDataManager = {
            GetDataObject: () => ({ GetLearnSkillIdArray: () => [10, 20, 30] }),
        };
        window.CONST_DATA_KIND_JOB = 'JOB';
        window.n_A_JOB = 0;
        window.n_A_LearnedSkill = [0, 0, 0];
        expect(LearnedSkillSearch(10)).toBe(0);
    });
});
