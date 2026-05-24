import { describe, it, expect } from 'vitest';
import {
    BUFF_CONF_OTHER_LIMIT,
    n_A_PassSkill8,
    n_Skill8SW,
    Click_Skill8SW,
    Click_A8,
    OnChangePetSelect,
    RefreshPetExplain,
} from '@ro4/BuffOtherCategory.js';

describe('BuffOtherCategory.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_OTHER_LIMIT がエクスポートされている', () => {
            expect(BUFF_CONF_OTHER_LIMIT).toBe(28);
        });

        it('n_A_PassSkill8 がエクスポートされている', () => {
            expect(Array.isArray(n_A_PassSkill8)).toBe(true);
            expect(n_A_PassSkill8).toHaveLength(28);
        });

        it('n_Skill8SW がエクスポートされている', () => {
            expect(typeof n_Skill8SW).toBe('boolean');
        });

        it('Click_Skill8SW がエクスポートされている', () => {
            expect(typeof Click_Skill8SW).toBe('function');
        });

        it('Click_A8 がエクスポートされている', () => {
            expect(typeof Click_A8).toBe('function');
        });

        it('OnChangePetSelect がエクスポートされている', () => {
            expect(typeof OnChangePetSelect).toBe('function');
        });

        it('RefreshPetExplain がエクスポートされている', () => {
            expect(typeof RefreshPetExplain).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.n_A_PassSkill8 が設定されている', () => {
            expect((window as any).n_A_PassSkill8).toBe(n_A_PassSkill8);
        });

        it('window.n_Skill8SW が設定されている', () => {
            expect((window as any).n_Skill8SW).toBe(n_Skill8SW);
        });


        it('window.Click_A8 が設定されている', () => {
            expect((window as any).Click_A8).toBe(Click_A8);
        });

    });
});
