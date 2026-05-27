import { describe, it, expect } from 'vitest';
import {
    BUFF_CONF_MUSICAL_LIMIT,
    n_Skill3SW,
    SWs3sw,
    n_A_PassSkill3,
    Click_Skill3SW,
    Skill3SW_2,
    Click_A3,
} from '@ro4/BuffMusicAndDance.js';

describe('BuffMusicAndDance.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_MUSICAL_LIMIT が 47', () => {
            expect(BUFF_CONF_MUSICAL_LIMIT).toBe(47);
        });
        it('n_Skill3SW が false', () => {
            expect(n_Skill3SW).toBe(false);
        });
        it('SWs3sw が長さ12の配列', () => {
            expect(Array.isArray(SWs3sw)).toBe(true);
            expect(SWs3sw.length).toBe(12);
        });
        it('n_A_PassSkill3 が長さ BUFF_CONF_MUSICAL_LIMIT の配列', () => {
            expect(Array.isArray(n_A_PassSkill3)).toBe(true);
            expect(n_A_PassSkill3.length).toBe(BUFF_CONF_MUSICAL_LIMIT);
        });
        it('Click_Skill3SW が関数', () => {
            expect(typeof Click_Skill3SW).toBe('function');
        });
        it('Skill3SW_2 が関数', () => {
            expect(typeof Skill3SW_2).toBe('function');
        });
        it('Click_A3 が関数', () => {
            expect(typeof Click_A3).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.BUFF_CONF_MUSICAL_LIMIT が設定されている', () => {
            expect((window as any).BUFF_CONF_MUSICAL_LIMIT).toBe(47);
        });
        it('window.n_A_PassSkill3 が設定されている', () => {
            expect((window as any).n_A_PassSkill3).toBe(n_A_PassSkill3);
        });
        it('window.Click_Skill3SW が設定されている', () => {
            expect((window as any).Click_Skill3SW).toBe(Click_Skill3SW);
        });
        it('window.Skill3SW_2 が設定されている', () => {
            expect((window as any).Skill3SW_2).toBe(Skill3SW_2);
        });
        it('window.Click_A3 が設定されている', () => {
            expect((window as any).Click_A3).toBe(Click_A3);
        });
    });
});
