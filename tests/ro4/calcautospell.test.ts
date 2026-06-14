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
    });
});
