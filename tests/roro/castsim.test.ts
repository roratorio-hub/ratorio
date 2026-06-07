import { describe, it, expect } from 'vitest';
import {
    g_castsimProgressIntervalArray,
    g_castsimIntervalFunctionArray,
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
} from '@roro/castsim.js';

describe('castsim.js', () => {
    describe('エクスポート確認', () => {
        it('g_castsimProgressIntervalArray が配列', () => { expect(Array.isArray(g_castsimProgressIntervalArray)).toBe(true); });
        it('g_castsimIntervalFunctionArray が配列', () => { expect(Array.isArray(g_castsimIntervalFunctionArray)).toBe(true); });
        it('BuildUpCastSimSimulateArea が関数', () => { expect(typeof BuildUpCastSimSimulateArea).toBe('function'); });
        it('SprintfTimeStrCastSim が関数', () => { expect(typeof SprintfTimeStrCastSim).toBe('function'); });
        it('OnClickCastSimSwitch が関数', () => { expect(typeof OnClickCastSimSwitch).toBe('function'); });
        it('OnClickCastSimRefresh が関数', () => { expect(typeof OnClickCastSimRefresh).toBe('function'); });
        it('OnChangeSkillCastSim が関数', () => { expect(typeof OnChangeSkillCastSim).toBe('function'); });
        it('OnChangeSkillLvCastSim が関数', () => { expect(typeof OnChangeSkillLvCastSim).toBe('function'); });
        it('RefreshCastSimSimulateArea が関数', () => { expect(typeof RefreshCastSimSimulateArea).toBe('function'); });
        it('OnClickCastSimSimulateStart が関数', () => { expect(typeof OnClickCastSimSimulateStart).toBe('function'); });
        it('OnClickCastSimSimulateStartDelay が関数', () => { expect(typeof OnClickCastSimSimulateStartDelay).toBe('function'); });
        it('OnClickCastSimSimulateStop が関数', () => { expect(typeof OnClickCastSimSimulateStop).toBe('function'); });
    });

    describe('SprintfTimeStrCastSim', () => {
        it('1000ms → "1.00"', () => { expect(SprintfTimeStrCastSim(1000)).toBe('1.00'); });
        it('500ms → "0.50"', () => { expect(SprintfTimeStrCastSim(500)).toBe('0.50'); });
        it('0ms → "0.00"', () => { expect(SprintfTimeStrCastSim(0)).toBe('0.00'); });
        it('1500ms → "1.50"', () => { expect(SprintfTimeStrCastSim(1500)).toBe('1.50'); });
        it('1234ms → "1.23"', () => { expect(SprintfTimeStrCastSim(1234)).toBe('1.23'); });
    });
});
