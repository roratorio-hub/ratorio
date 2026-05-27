import { describe, it, expect, beforeAll } from 'vitest';

let TIME_ITEM_CONF_COUNT: number;
let g_timeItemConf: any[];
let g_timeItemConfEffective: any[];
let g_timeItemConfAllEffective: number;
let n_Nitou: boolean;
let n_NitouCalc: boolean;
let g_VariableCastTimeRate: number;
let costDownForDisp: number;
let CUSTOM_CONF_STATUS_LIMIT: number;
let g_confDataCustomStatus: number[];
let CUSTOM_CONF_ATK_LIMIT: number;
let g_confDataCustomAtk: number[];
let CUSTOM_CONF_DEF_LIMIT: number;
let g_confDataCustomDef: number[];
let CUSTOM_CONF_SKILL_LIMIT: number;
let g_confDataCustomSkill: number[];
let CUSTOM_CONF_SPEC_LIMIT: number;
let g_confDataCustomSpecStatus: number[];
let g_confDataCustomStatusMIG: number[];
let g_confDataSpecMIG: any;
let g_confDataCustomSkillMIG: number[];
let g_confDataCustomSpecStatusMIG: number[];
let ResetConfDataAllMIG: (bAsOnLoad: boolean) => void;
let __DIG3: (value: any) => string;

beforeAll(async () => {
    (globalThis as any).MallocArray = (size: number, val: any) => Array(size).fill(val);
    (globalThis as any).CSkillManager = class {};
    (globalThis as any).CMigConstDataManager = class {};
    const mod = await import('@ro4/global.js');
    TIME_ITEM_CONF_COUNT = mod.TIME_ITEM_CONF_COUNT;
    g_timeItemConf = mod.g_timeItemConf;
    g_timeItemConfEffective = mod.g_timeItemConfEffective;
    g_timeItemConfAllEffective = mod.g_timeItemConfAllEffective;
    n_Nitou = mod.n_Nitou;
    n_NitouCalc = mod.n_NitouCalc;
    g_VariableCastTimeRate = mod.g_VariableCastTimeRate;
    costDownForDisp = mod.costDownForDisp;
    CUSTOM_CONF_STATUS_LIMIT = mod.CUSTOM_CONF_STATUS_LIMIT;
    g_confDataCustomStatus = mod.g_confDataCustomStatus;
    CUSTOM_CONF_ATK_LIMIT = mod.CUSTOM_CONF_ATK_LIMIT;
    g_confDataCustomAtk = mod.g_confDataCustomAtk;
    CUSTOM_CONF_DEF_LIMIT = mod.CUSTOM_CONF_DEF_LIMIT;
    g_confDataCustomDef = mod.g_confDataCustomDef;
    CUSTOM_CONF_SKILL_LIMIT = mod.CUSTOM_CONF_SKILL_LIMIT;
    g_confDataCustomSkill = mod.g_confDataCustomSkill;
    CUSTOM_CONF_SPEC_LIMIT = mod.CUSTOM_CONF_SPEC_LIMIT;
    g_confDataCustomSpecStatus = mod.g_confDataCustomSpecStatus;
    g_confDataCustomStatusMIG = mod.g_confDataCustomStatusMIG;
    g_confDataSpecMIG = mod.g_confDataSpecMIG;
    g_confDataCustomSkillMIG = mod.g_confDataCustomSkillMIG;
    g_confDataCustomSpecStatusMIG = mod.g_confDataCustomSpecStatusMIG;
    ResetConfDataAllMIG = mod.ResetConfDataAllMIG;
    __DIG3 = mod.__DIG3;
});

describe('global.js', () => {
    describe('エクスポート確認', () => {
        it('TIME_ITEM_CONF_COUNT が 20', () => {
            expect(TIME_ITEM_CONF_COUNT).toBe(20);
        });
        it('g_timeItemConf が長さ 20 の配列', () => {
            expect(Array.isArray(g_timeItemConf)).toBe(true);
            expect(g_timeItemConf.length).toBe(20);
        });
        it('g_timeItemConfEffective が長さ 20 の配列', () => {
            expect(Array.isArray(g_timeItemConfEffective)).toBe(true);
            expect(g_timeItemConfEffective.length).toBe(20);
        });
        it('g_timeItemConfAllEffective が 1', () => {
            expect(g_timeItemConfAllEffective).toBe(1);
        });
        it('n_Nitou が false', () => {
            expect(n_Nitou).toBe(false);
        });
        it('n_NitouCalc が false', () => {
            expect(n_NitouCalc).toBe(false);
        });
        it('g_VariableCastTimeRate が 0', () => {
            expect(g_VariableCastTimeRate).toBe(0);
        });
        it('costDownForDisp が 0', () => {
            expect(costDownForDisp).toBe(0);
        });
        it('CUSTOM_CONF_STATUS_LIMIT が 30', () => {
            expect(CUSTOM_CONF_STATUS_LIMIT).toBe(30);
        });
        it('g_confDataCustomStatus が長さ 30 の配列', () => {
            expect(Array.isArray(g_confDataCustomStatus)).toBe(true);
            expect(g_confDataCustomStatus.length).toBe(30);
        });
        it('CUSTOM_CONF_ATK_LIMIT が 30', () => {
            expect(CUSTOM_CONF_ATK_LIMIT).toBe(30);
        });
        it('CUSTOM_CONF_DEF_LIMIT が 20', () => {
            expect(CUSTOM_CONF_DEF_LIMIT).toBe(20);
        });
        it('CUSTOM_CONF_SKILL_LIMIT が 20', () => {
            expect(CUSTOM_CONF_SKILL_LIMIT).toBe(20);
        });
        it('CUSTOM_CONF_SPEC_LIMIT が 20', () => {
            expect(CUSTOM_CONF_SPEC_LIMIT).toBe(20);
        });
        it('g_confDataCustomStatusMIG が長さ 46 の配列（ResetConfDataAllMIG 後）', () => {
            expect(Array.isArray(g_confDataCustomStatusMIG)).toBe(true);
            expect(g_confDataCustomStatusMIG.length).toBe(46);
        });
        it('g_confDataCustomSkillMIG が長さ 12 の配列（ResetConfDataAllMIG 後）', () => {
            expect(Array.isArray(g_confDataCustomSkillMIG)).toBe(true);
            expect(g_confDataCustomSkillMIG.length).toBe(12);
        });
        it('g_confDataCustomSpecStatusMIG が長さ 12 の配列（ResetConfDataAllMIG 後）', () => {
            expect(Array.isArray(g_confDataCustomSpecStatusMIG)).toBe(true);
            expect(g_confDataCustomSpecStatusMIG.length).toBe(12);
        });
        it('ResetConfDataAllMIG が関数', () => {
            expect(typeof ResetConfDataAllMIG).toBe('function');
        });
        it('__DIG3 が関数', () => {
            expect(typeof __DIG3).toBe('function');
        });
    });

});
