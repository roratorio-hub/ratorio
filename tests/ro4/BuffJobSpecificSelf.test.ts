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
        it('n_A_PassSkill が長さ BUFF_CONF_SELF_LIMIT の配列', () => {
            expect(Array.isArray(n_A_PassSkill)).toBe(true);
            expect(n_A_PassSkill.length).toBe(BUFF_CONF_SELF_LIMIT);
        });
        it('n_Skill1SW が false', () => {
            expect(n_Skill1SW).toBe(false);
        });
        it('Click_PassSkillSW が関数', () => {
            expect(typeof Click_PassSkillSW).toBe('function');
        });
        it('Click_A1 が関数', () => {
            expect(typeof Click_A1).toBe('function');
        });
        it('UsedSkillSearch が関数', () => {
            expect(typeof UsedSkillSearch).toBe('function');
        });
        it('UsedSkillSearchSubUsedOnly が関数', () => {
            expect(typeof UsedSkillSearchSubUsedOnly).toBe('function');
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
