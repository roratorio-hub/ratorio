import { describe, it, expect } from 'vitest';
import {
    BUFF_CONF_FOOD_LIMIT,
    n_A_PassSkill7,
    n_Skill7SW,
    ID_BUFF_FOOD_CHAGASHI,
    ID_BUFF_FOOD_AGEGASHI,
    ID_BUFF_FOOD_NIJIOMOCHI,
    ID_BUFF_STATUS_STR,
    ID_BUFF_STATUS_AGI,
    ID_BUFF_STATUS_VIT,
    ID_BUFF_STATUS_INT,
    ID_BUFF_STATUS_DEX,
    ID_BUFF_STATUS_LUK,
    ID_BUFF_BOX_URAMI,
    ID_BUFF_BOX_NEMUI,
    ID_BUFF_POTION_COLD,
    ID_BUFF_POTION_EARTH,
    ID_BUFF_POTION_FIRE,
    ID_BUFF_POTION_WIND,
    ID_BUFF_MAJO_NO_SKILL_CARD,
    ID_BUFF_STATUS_20_STR,
    ID_BUFF_MANUK_ISHI,
    ID_BUFF_VESPER_HONEY,
    ID_BUFF_SOUSHO_CARD,
    Click_Skill7SW,
    Click_A7,
} from '@ro4/BuffItemAndFood.js';

describe('BuffItemAndFood.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_FOOD_LIMIT が 53', () => {
            expect(BUFF_CONF_FOOD_LIMIT).toBe(53);
        });
        it('n_A_PassSkill7 が長さ BUFF_CONF_FOOD_LIMIT の配列', () => {
            expect(Array.isArray(n_A_PassSkill7)).toBe(true);
            expect(n_A_PassSkill7.length).toBe(BUFF_CONF_FOOD_LIMIT);
        });
        it('n_Skill7SW が false', () => {
            expect(n_Skill7SW).toBe(false);
        });
        it('ID_BUFF_FOOD_CHAGASHI が 0', () => {
            expect(ID_BUFF_FOOD_CHAGASHI).toBe(0);
        });
        it('ID_BUFF_FOOD_AGEGASHI が 1', () => {
            expect(ID_BUFF_FOOD_AGEGASHI).toBe(1);
        });
        it('ID_BUFF_FOOD_NIJIOMOCHI が 2', () => {
            expect(ID_BUFF_FOOD_NIJIOMOCHI).toBe(2);
        });
        it('ID_BUFF_STATUS_STR が 3', () => {
            expect(ID_BUFF_STATUS_STR).toBe(3);
        });
        it('ID_BUFF_STATUS_AGI が 4', () => {
            expect(ID_BUFF_STATUS_AGI).toBe(4);
        });
        it('ID_BUFF_STATUS_VIT が 5', () => {
            expect(ID_BUFF_STATUS_VIT).toBe(5);
        });
        it('ID_BUFF_STATUS_INT が 6', () => {
            expect(ID_BUFF_STATUS_INT).toBe(6);
        });
        it('ID_BUFF_STATUS_DEX が 7', () => {
            expect(ID_BUFF_STATUS_DEX).toBe(7);
        });
        it('ID_BUFF_STATUS_LUK が 8', () => {
            expect(ID_BUFF_STATUS_LUK).toBe(8);
        });
        it('ID_BUFF_BOX_URAMI が 9', () => {
            expect(ID_BUFF_BOX_URAMI).toBe(9);
        });
        it('ID_BUFF_BOX_NEMUI が 10', () => {
            expect(ID_BUFF_BOX_NEMUI).toBe(10);
        });
        it('ID_BUFF_POTION_COLD が 11', () => {
            expect(ID_BUFF_POTION_COLD).toBe(11);
        });
        it('ID_BUFF_POTION_EARTH が 12', () => {
            expect(ID_BUFF_POTION_EARTH).toBe(12);
        });
        it('ID_BUFF_POTION_FIRE が 13', () => {
            expect(ID_BUFF_POTION_FIRE).toBe(13);
        });
        it('ID_BUFF_POTION_WIND が 14', () => {
            expect(ID_BUFF_POTION_WIND).toBe(14);
        });
        it('ID_BUFF_MAJO_NO_SKILL_CARD が 15', () => {
            expect(ID_BUFF_MAJO_NO_SKILL_CARD).toBe(15);
        });
        it('ID_BUFF_STATUS_20_STR が 16', () => {
            expect(ID_BUFF_STATUS_20_STR).toBe(16);
        });
        it('ID_BUFF_MANUK_ISHI が 31', () => {
            expect(ID_BUFF_MANUK_ISHI).toBe(31);
        });
        it('ID_BUFF_VESPER_HONEY が 34', () => {
            expect(ID_BUFF_VESPER_HONEY).toBe(34);
        });
        it('ID_BUFF_SOUSHO_CARD が 52', () => {
            expect(ID_BUFF_SOUSHO_CARD).toBe(52);
        });
        it('Click_Skill7SW が関数', () => {
            expect(typeof Click_Skill7SW).toBe('function');
        });
        it('Click_A7 が関数', () => {
            expect(typeof Click_A7).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.n_A_PassSkill7 が設定されている', () => {
            expect((window as any).n_A_PassSkill7).toBe(n_A_PassSkill7);
        });

    });
});
