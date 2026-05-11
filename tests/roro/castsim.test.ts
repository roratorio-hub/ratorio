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

    describe('window互換確認', () => {
        it('window.g_castsimProgressIntervalArray が設定されている', () => { expect(Array.isArray((window as any).g_castsimProgressIntervalArray)).toBe(true); });
        it('window.g_castsimIntervalFunctionArray が設定されている', () => { expect(Array.isArray((window as any).g_castsimIntervalFunctionArray)).toBe(true); });
        it('window.BuildUpCastSimSimulateArea が設定されている', () => { expect(typeof (window as any).BuildUpCastSimSimulateArea).toBe('function'); });
        it('window.SprintfTimeStrCastSim が設定されている', () => { expect(typeof (window as any).SprintfTimeStrCastSim).toBe('function'); });
        it('window.OnClickCastSimSwitch が設定されている', () => { expect(typeof (window as any).OnClickCastSimSwitch).toBe('function'); });
        it('window.OnClickCastSimRefresh が設定されている', () => { expect(typeof (window as any).OnClickCastSimRefresh).toBe('function'); });
        it('window.OnChangeSkillCastSim が設定されている', () => { expect(typeof (window as any).OnChangeSkillCastSim).toBe('function'); });
        it('window.OnChangeSkillLvCastSim が設定されている', () => { expect(typeof (window as any).OnChangeSkillLvCastSim).toBe('function'); });
        it('window.RefreshCastSimSimulateArea が設定されている', () => { expect(typeof (window as any).RefreshCastSimSimulateArea).toBe('function'); });
        it('window.OnClickCastSimSimulateStart が設定されている', () => { expect(typeof (window as any).OnClickCastSimSimulateStart).toBe('function'); });
        it('window.OnClickCastSimSimulateStartDelay が設定されている', () => { expect(typeof (window as any).OnClickCastSimSimulateStartDelay).toBe('function'); });
        it('window.OnClickCastSimSimulateStop が設定されている', () => { expect(typeof (window as any).OnClickCastSimSimulateStop).toBe('function'); });
    });

    describe('SprintfTimeStrCastSim', () => {
        it('1000ms → "1.00"', () => { expect(SprintfTimeStrCastSim(1000)).toBe('1.00'); });
        it('500ms → "0.50"', () => { expect(SprintfTimeStrCastSim(500)).toBe('0.50'); });
        it('0ms → "0.00"', () => { expect(SprintfTimeStrCastSim(0)).toBe('0.00'); });
        it('1500ms → "1.50"', () => { expect(SprintfTimeStrCastSim(1500)).toBe('1.50'); });
        it('1234ms → "1.23"', () => { expect(SprintfTimeStrCastSim(1234)).toBe('1.23'); });
    });
});
