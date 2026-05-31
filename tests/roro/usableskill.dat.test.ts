import { describe, it, expect } from 'vitest';
import {
    USABEL_SKILL_ID_NONE,
    USABEL_SKILL_ID_COLD_BOLT_3,
    USABEL_SKILL_ID_GLORIA_5,
    InsertSkill,
} from '@roro/usableskill.dat.js';

describe('usableskill.dat.js', () => {
    describe('エクスポート確認', () => {
        it('USABEL_SKILL_ID_NONE が 0',       () => expect(USABEL_SKILL_ID_NONE).toBe(0));
        it('USABEL_SKILL_ID_COLD_BOLT_3 が 1', () => expect(USABEL_SKILL_ID_COLD_BOLT_3).toBe(1));
        it('USABEL_SKILL_ID_GLORIA_5 が 201',  () => expect(USABEL_SKILL_ID_GLORIA_5).toBe(201));
        it('InsertSkill が配列',               () => expect(Array.isArray(InsertSkill)).toBe(true));
        it('InsertSkill が 215 件',            () => expect(InsertSkill).toHaveLength(216));
        it('InsertSkill[0][0] が 0',           () => expect(InsertSkill[0][0]).toBe(0));
        it('InsertSkill[1][0] が 1',           () => expect(InsertSkill[1][0]).toBe(1));
        it('InsertSkill[214][0] が 214（最後）', () => expect(InsertSkill[214][0]).toBe(214));
    });
});
