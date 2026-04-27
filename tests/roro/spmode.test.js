import { describe, it, expect } from 'vitest';
import { calcSP, OnClickSPMode } from '../../roro/m/js/spmode.js';

describe('spmode', () => {
    it('全関数を export する', () => {
        expect(typeof calcSP).toBe('function');
        expect(typeof OnClickSPMode).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.calcSP).toBe(calcSP);
        expect(window.OnClickSPMode).toBe(OnClickSPMode);
    });

    it('SPMODE_MONSTER_RESULT_INDEX_* 定数が window に設定される', () => {
        expect(typeof window.SPMODE_MONSTER_RESULT_INDEX_MONSTER_INDEX).toBe('number');
        expect(typeof window.SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG).toBe('number');
        expect(typeof window.SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE).toBe('number');
    });

    it('g_SPMODE_* グローバル変数が window に設定される', () => {
        expect(typeof window.g_SPMODE_FLAG).toBe('number');
        expect(Array.isArray(window.g_SPMODE_MONSTER_RESULT)).toBe(true);
    });
});
