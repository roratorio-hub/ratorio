import { describe, it, expect } from 'vitest';
import {
    AUTO_SPELL_SETTING_COUNT,
    AUTO_SPELL_SKILL_COUNT_MAX,
    AUTO_SPELL_PROB_ARRAY,
    OBJID_OFFSET_AS_SKILL_ID,
    OBJID_OFFSET_AS_SKILL_LV,
    OBJID_OFFSET_AS_SKILL_PROB,
    n_AS_SKILL,
    n_AS_DMG,
    n_AS_DMG_OverHP,
    AS_Calc,
    AS_PLUS,
    OnClickExtractSettingAutoSpell,
    BuildUpSettingHtmlAutoSpell,
    OnChangeSettingAutoSpell,
    OnClickEasySetUpAutoSpell,
} from '@ro4/calcautospell.js';

describe('calcautospell.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('AUTO_SPELL_SETTING_COUNT が 20', () => {
            expect(AUTO_SPELL_SETTING_COUNT).toBe(20);
        });
        it('AUTO_SPELL_SKILL_COUNT_MAX が 40', () => {
            expect(AUTO_SPELL_SKILL_COUNT_MAX).toBe(40);
        });
        it('AUTO_SPELL_PROB_ARRAY が配列', () => {
            expect(Array.isArray(AUTO_SPELL_PROB_ARRAY)).toBe(true);
        });
        it('AUTO_SPELL_PROB_ARRAY の先頭が 0', () => {
            expect(AUTO_SPELL_PROB_ARRAY[0]).toBe(0);
        });
        it('OBJID_OFFSET_AS_SKILL_ID が 100', () => {
            expect(OBJID_OFFSET_AS_SKILL_ID).toBe(100);
        });
        it('OBJID_OFFSET_AS_SKILL_LV が 200', () => {
            expect(OBJID_OFFSET_AS_SKILL_LV).toBe(200);
        });
        it('OBJID_OFFSET_AS_SKILL_PROB が 300', () => {
            expect(OBJID_OFFSET_AS_SKILL_PROB).toBe(300);
        });
        it('n_AS_SKILL が配列', () => {
            expect(Array.isArray(n_AS_SKILL)).toBe(true);
        });
        it('n_AS_DMG が配列', () => {
            expect(Array.isArray(n_AS_DMG)).toBe(true);
        });
        it('n_AS_DMG_OverHP が配列', () => {
            expect(Array.isArray(n_AS_DMG_OverHP)).toBe(true);
        });
    });

    describe('エクスポート確認（関数）', () => {
        it('AS_Calc が関数', () => { expect(typeof AS_Calc).toBe('function'); });
        it('AS_PLUS が関数', () => { expect(typeof AS_PLUS).toBe('function'); });
        it('OnClickExtractSettingAutoSpell が関数', () => { expect(typeof OnClickExtractSettingAutoSpell).toBe('function'); });
        it('BuildUpSettingHtmlAutoSpell が関数', () => { expect(typeof BuildUpSettingHtmlAutoSpell).toBe('function'); });
        it('OnChangeSettingAutoSpell が関数', () => { expect(typeof OnChangeSettingAutoSpell).toBe('function'); });
        it('OnClickEasySetUpAutoSpell が関数', () => { expect(typeof OnClickEasySetUpAutoSpell).toBe('function'); });
    });
});
