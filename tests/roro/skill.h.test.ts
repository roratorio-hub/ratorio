import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import {
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_0,
} from '@roro/skill.h.js';

describe('skill.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('SKILL_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).SKILL_DATA_INDEX_ID).toBe(0);
        });
        it('SKILL_DATA_INDEX_MAXLV が 1 に定義される', () => {
            expect((globalThis as any).SKILL_DATA_INDEX_MAXLV).toBe(1);
        });
        it('SKILL_DATA_INDEX_NAME が 2 に定義される', () => {
            expect((globalThis as any).SKILL_DATA_INDEX_NAME).toBe(2);
        });
        it('SKILL_DATA_INDEX_REFID が 3 に定義される', () => {
            expect((globalThis as any).SKILL_DATA_INDEX_REFID).toBe(3);
        });
    });

    describe('エクスポート確認', () => {
        it('SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100 が 4', () => {
            expect(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100).toBe(4);
        });
        it('SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81 が 3', () => {
            expect(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81).toBe(3);
        });
        it('SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51 が 2', () => {
            expect(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51).toBe(2);
        });
        it('SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10 が 1', () => {
            expect(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10).toBe(1);
        });
        it('SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_0 が 0', () => {
            expect(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_0).toBe(0);
        });
    });
});
