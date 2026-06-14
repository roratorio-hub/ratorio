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
    });

    describe('window互換確認', () => {
        it('window.n_A_PassSkill3 が設定されている', () => {
            expect((window as any).n_A_PassSkill3).toBe(n_A_PassSkill3);
        });

    });
});
