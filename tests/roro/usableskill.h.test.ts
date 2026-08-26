import { describe, it, expect } from 'vitest';
import { USABLE_SKILL_ID_CUSTOM_BIAS } from '@engine/usableskill.h.js';

describe('usableskill.h.js', () => {

    describe('エクスポート確認', () => {
        it('USABLE_SKILL_ID_CUSTOM_BIAS が 10000 である', () => {
            expect(USABLE_SKILL_ID_CUSTOM_BIAS).toBe(10000);
        });
    });
});
