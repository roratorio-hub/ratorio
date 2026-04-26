import { describe, it, expect } from 'vitest';
import {
    RebuildStatusSelect,
    CalcStatusPoint,
    GetStatusIncrementCost,
    GetStatusTotalCost,
    GetEarningStatusPoint,
    DisplayStatusBonusAll,
    DisplayReferStatusAll,
    GetTotalPureBasicStatus,
    StoreSpecStatusBonusAll,
    GetTotalSpecStatus,
    GetEarningTSStatusPoint,
    GetTStatusPoint,
    ApplySpecStatusModifications,
    ApplySpecStatusModifyMATK,
    GetPAtk,
    GetSMatk,
    GetCRate,
    GetRes,
    GetMres,
    GetHPlus,
    GetMobRes,
    GetMobMres,
    ApplyPAtkAmplify,
    ApplySMatkAmplify,
    ApplyCRateAmplify,
    ApplyResResist,
    ApplyMresResist,
    ApplyPAtkLeftHandPenalty,
    ApplySpecModify,
    migrateOtherJob,
} from '../../ro4/m/js/hmjob.js';

describe('hmjob', () => {
    it('全関数を export する', () => {
        expect(typeof RebuildStatusSelect).toBe('function');
        expect(typeof CalcStatusPoint).toBe('function');
        expect(typeof GetStatusIncrementCost).toBe('function');
        expect(typeof GetStatusTotalCost).toBe('function');
        expect(typeof GetEarningStatusPoint).toBe('function');
        expect(typeof DisplayStatusBonusAll).toBe('function');
        expect(typeof GetTotalPureBasicStatus).toBe('function');
        expect(typeof GetPAtk).toBe('function');
        expect(typeof GetSMatk).toBe('function');
        expect(typeof GetCRate).toBe('function');
        expect(typeof GetMobRes).toBe('function');
        expect(typeof GetMobMres).toBe('function');
        expect(typeof ApplySpecModify).toBe('function');
        expect(typeof migrateOtherJob).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.RebuildStatusSelect).toBe(RebuildStatusSelect);
        expect(window.CalcStatusPoint).toBe(CalcStatusPoint);
        expect(window.GetPAtk).toBe(GetPAtk);
        expect(window.GetMobRes).toBe(GetMobRes);
        expect(window.ApplySpecModify).toBe(ApplySpecModify);
    });

    it('window.g_pureStatus が配列として設定される', () => {
        expect(Array.isArray(window.g_pureStatus)).toBe(true);
    });

    it('window.g_bonusStatus が配列として設定される', () => {
        expect(Array.isArray(window.g_bonusStatus)).toBe(true);
    });

    it('window.g_STR が数値として設定される', () => {
        expect(typeof window.g_STR).toBe('number');
    });
});
