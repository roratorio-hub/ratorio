import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import { USABLE_SKILL_ID_CUSTOM_BIAS } from '@roro/usableskill.h.js';

describe('usableskill.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('USABLE_SKILL_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).USABLE_SKILL_DATA_INDEX_ID).toBe(0);
        });
        it('USABLE_SKILL_DATA_INDEX_SKILL_LEVEL が 3 に定義される', () => {
            expect((globalThis as any).USABLE_SKILL_DATA_INDEX_SKILL_LEVEL).toBe(3);
        });
        it('USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE が 0 に定義される', () => {
            expect((globalThis as any).USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE).toBe(0);
        });
        it('USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE が 1 に定義される', () => {
            expect((globalThis as any).USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE).toBe(1);
        });
    });

    describe('エクスポート確認', () => {
        it('USABLE_SKILL_ID_CUSTOM_BIAS が 10000 である', () => {
            expect(USABLE_SKILL_ID_CUSTOM_BIAS).toBe(10000);
        });
    });
});
