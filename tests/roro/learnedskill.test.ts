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
        const names = [
            'LEARNED_SKILL_MAX_COUNT', 'n_A_LearnedSkill',
            'LearnedSkillSearch', 'OnClickSkillSWLearned',
            'UpdateLearnedSkillSettingColoring',
        ];
        for (const name of names) {
            it(`window.${name} が設定されている`, () => {
                expect((window as any)[name]).not.toBeUndefined();
            });
        }
    });

    // Pattern B 検出テスト:
    // 非ESMスクリプト（equip.js等）が `n_A_LearnedSkill = new Array()` で配列ごと差し替えると
    // ESMバインディングと window.n_A_LearnedSkill が乖離し、learnedskill.js 側が常に0を読む。
    describe('Pattern B: ESMバインディングとwindow参照の同一性', () => {
        it('n_A_LearnedSkill と window.n_A_LearnedSkill は同一オブジェクト', () => {
            // この等価性が壊れると equip.js 等の書き込みが learnedskill.js に届かない
            expect(n_A_LearnedSkill).toBe((window as any).n_A_LearnedSkill);
        });

        it('window.n_A_LearnedSkill への要素書き込みがESMバインディング側に反映される', () => {
            const arr: number[] = (window as any).n_A_LearnedSkill;
            const original = arr[0];
            arr[0] = 999;
            expect(n_A_LearnedSkill[0]).toBe(999);
            arr[0] = original;
        });
    });
});
