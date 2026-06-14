import { describe, it, expect } from 'vitest';
import {
    BUFF_CONF_SELF_LIMIT,
    n_A_PassSkill,
    n_Skill1SW,
    Click_PassSkillSW,
    Click_A1,
    UsedSkillSearch,
    UsedSkillSearchSubUsedOnly,
} from '@ro4/BuffJobSpecificSelf.js';

describe('BuffJobSpecificSelf.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_SELF_LIMIT が 51', () => {
            expect(BUFF_CONF_SELF_LIMIT).toBe(51);
        });
    });

    describe('window互換確認', () => {
        it('window.n_A_PassSkill が設定されている', () => {
            expect((window as any).n_A_PassSkill).toBe(n_A_PassSkill);
        });

        it('window.UsedSkillSearch が設定されている', () => {
            expect((window as any).UsedSkillSearch).toBe(UsedSkillSearch);
        });
    });
});
