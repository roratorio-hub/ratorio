import { describe, it, expect } from 'vitest';
import {
    AS_Calc,
    AS_PLUS,
    OnClickExtractSettingAutoSpell,
    BuildUpSettingHtmlAutoSpell,
    OnChangeSettingAutoSpell,
    OnClickEasySetUpAutoSpell,
} from '../../ro4/m/js/calcautospell.js';

describe('calcautospell', () => {
    it('全関数を export する', () => {
        expect(typeof AS_Calc).toBe('function');
        expect(typeof AS_PLUS).toBe('function');
        expect(typeof OnClickExtractSettingAutoSpell).toBe('function');
        expect(typeof BuildUpSettingHtmlAutoSpell).toBe('function');
        expect(typeof OnChangeSettingAutoSpell).toBe('function');
        expect(typeof OnClickEasySetUpAutoSpell).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.AS_Calc).toBe(AS_Calc);
        expect(window.OnClickExtractSettingAutoSpell).toBe(OnClickExtractSettingAutoSpell);
        expect(window.OnChangeSettingAutoSpell).toBe(OnChangeSettingAutoSpell);
    });

    it('window.AUTO_SPELL_SETTING_COUNT が 20 に設定される', () => {
        expect(window.AUTO_SPELL_SETTING_COUNT).toBe(20);
    });

    it('window.AUTO_SPELL_PROB_ARRAY が配列として設定される', () => {
        expect(Array.isArray(window.AUTO_SPELL_PROB_ARRAY)).toBe(true);
        expect(window.AUTO_SPELL_PROB_ARRAY.length).toBeGreaterThan(0);
    });

    it('window.n_AS_SKILL が配列として設定される', () => {
        expect(Array.isArray(window.n_AS_SKILL)).toBe(true);
    });
});
