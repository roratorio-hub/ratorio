import { describe, it, expect } from 'vitest';
import {
    BUFF_CONF_GUILD_LIMIT,
    n_A_PassSkill4,
    n_Skill4SW,
    Click_Skill4SW,
    Click_A4,
} from '@ro4/BuffGuildAndGospel.js';

describe('BuffGuildAndGospel.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_GUILD_LIMIT がエクスポートされている', () => {
            expect(BUFF_CONF_GUILD_LIMIT).toBe(36);
        });

        it('n_A_PassSkill4 がエクスポートされている', () => {
            expect(Array.isArray(n_A_PassSkill4)).toBe(true);
            expect(n_A_PassSkill4).toHaveLength(36);
        });

        it('n_Skill4SW がエクスポートされている', () => {
            expect(typeof n_Skill4SW).toBe('boolean');
        });

        it('Click_Skill4SW がエクスポートされている', () => {
            expect(typeof Click_Skill4SW).toBe('function');
        });

        it('Click_A4 がエクスポートされている', () => {
            expect(typeof Click_A4).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.n_A_PassSkill4 が設定されている', () => {
            expect((window as any).n_A_PassSkill4).toBe(n_A_PassSkill4);
        });
        // n_Skill4SW は Phase 3-sup で compat ブロック除去済み → window への設定なし
    });
});
