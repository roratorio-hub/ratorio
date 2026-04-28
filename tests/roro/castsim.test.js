import { describe, it, expect } from 'vitest';
import {
    BuildUpCastSimSimulateArea,
    SprintfTimeStrCastSim,
    OnClickCastSimSwitch,
    OnClickCastSimRefresh,
    OnChangeSkillCastSim,
    OnChangeSkillLvCastSim,
    RefreshCastSimSimulateArea,
    OnClickCastSimSimulateStart,
    OnClickCastSimSimulateStartDelay,
    OnClickCastSimSimulateStop,
} from '../../roro/m/js/castsim.js';

describe('castsim', () => {
    it('全関数を export する', () => {
        expect(typeof BuildUpCastSimSimulateArea).toBe('function');
        expect(typeof SprintfTimeStrCastSim).toBe('function');
        expect(typeof OnClickCastSimSwitch).toBe('function');
        expect(typeof OnClickCastSimRefresh).toBe('function');
        expect(typeof OnChangeSkillCastSim).toBe('function');
        expect(typeof OnChangeSkillLvCastSim).toBe('function');
        expect(typeof RefreshCastSimSimulateArea).toBe('function');
        expect(typeof OnClickCastSimSimulateStart).toBe('function');
        expect(typeof OnClickCastSimSimulateStartDelay).toBe('function');
        expect(typeof OnClickCastSimSimulateStop).toBe('function');
    });

    it('window compat ブロックで全関数が window に設定される', () => {
        expect(window.BuildUpCastSimSimulateArea).toBe(BuildUpCastSimSimulateArea);
        expect(window.SprintfTimeStrCastSim).toBe(SprintfTimeStrCastSim);
        expect(window.OnClickCastSimSwitch).toBe(OnClickCastSimSwitch);
        expect(window.RefreshCastSimSimulateArea).toBe(RefreshCastSimSimulateArea);
    });

    it('SprintfTimeStrCastSim: 3210ms → "3.21"', () => {
        expect(SprintfTimeStrCastSim(3210)).toBe('3.21');
    });

    it('SprintfTimeStrCastSim: 1500ms → "1.50"', () => {
        expect(SprintfTimeStrCastSim(1500)).toBe('1.50');
    });

    it('SprintfTimeStrCastSim: 500ms → "0.50"', () => {
        expect(SprintfTimeStrCastSim(500)).toBe('0.50');
    });

    it('RefreshCastSimSimulateArea: lv / objOption 宣言漏れの回帰確認', () => {
        const src = RefreshCastSimSimulateArea.toString();
        expect(src).toContain('var lv');
        expect(src).toContain('var objOption');
    });
});
