import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';

vi.hoisted(() => {
    // Phase 3b で hmjob.js が CAttackMethodAreaComponentManager を import するようになり
    // 連鎖的に calchistory.js の $(function(){...}) と CShadowEquipController.initializeHTML() が呼ばれる
    (globalThis as any).$ = (_fn: any) => {};
    const mockEl = {
        querySelectorAll: () => [],
        querySelector: () => null,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        addEventListener: () => {},
        style: {},
        value: 0,
    };
    (document as any).getElementById = () => mockEl;
});
import {
    g_pureStatus, g_bonusStatus,
    g_STR, g_AGI, g_VIT, g_INT, g_DEX, g_LUK,
    g_POW, g_STA, g_WIS, g_SPL, g_CON, g_CRT,
    RebuildStatusSelect, CalcStatusPoint,
    GetStatusIncrementCost, GetStatusTotalCost,
    GetEarningStatusPoint, DisplayStatusBonusAll,
    DisplayReferStatusAll, GetTotalPureBasicStatus,
    StoreSpecStatusBonusAll, GetTotalSpecStatus,
    GetEarningTSStatusPoint, GetTStatusPoint,
    ApplySpecStatusModifications, ApplySpecStatusModifyMATK,
    GetPAtk, GetSMatk, GetCRate, GetRes, GetMres, GetHPlus,
    GetMobRes, GetMobMres,
    ApplyPAtkAmplify, ApplySMatkAmplify, ApplyCRateAmplify,
    ApplyResResist, ApplyMresResist, ApplyPAtkLeftHandPenalty,
    ApplySpecModify, migrateOtherJob, OnChangeJob,
} from '@ro4/hmjob.js';

describe('hmjob.js', () => {
    describe('エクスポート確認（変数）', () => {
        it('g_pureStatus が配列', () => {
            expect(Array.isArray(g_pureStatus)).toBe(true);
        });
        it('g_bonusStatus が配列', () => {
            expect(Array.isArray(g_bonusStatus)).toBe(true);
        });
        it('g_STR が 0', () => { expect(g_STR).toBe(0); });
        it('g_AGI が 0', () => { expect(g_AGI).toBe(0); });
        it('g_VIT が 0', () => { expect(g_VIT).toBe(0); });
        it('g_INT が 0', () => { expect(g_INT).toBe(0); });
        it('g_DEX が 0', () => { expect(g_DEX).toBe(0); });
        it('g_LUK が 0', () => { expect(g_LUK).toBe(0); });
        it('g_POW が 0', () => { expect(g_POW).toBe(0); });
        it('g_STA が 0', () => { expect(g_STA).toBe(0); });
        it('g_WIS が 0', () => { expect(g_WIS).toBe(0); });
        it('g_SPL が 0', () => { expect(g_SPL).toBe(0); });
        it('g_CON が 0', () => { expect(g_CON).toBe(0); });
        it('g_CRT が 0', () => { expect(g_CRT).toBe(0); });
    });

    describe('エクスポート確認（関数）', () => {
        it('RebuildStatusSelect が関数', () => { expect(typeof RebuildStatusSelect).toBe('function'); });
        it('CalcStatusPoint が関数', () => { expect(typeof CalcStatusPoint).toBe('function'); });
        it('GetStatusIncrementCost が関数', () => { expect(typeof GetStatusIncrementCost).toBe('function'); });
        it('GetStatusTotalCost が関数', () => { expect(typeof GetStatusTotalCost).toBe('function'); });
        it('GetEarningStatusPoint が関数', () => { expect(typeof GetEarningStatusPoint).toBe('function'); });
        it('DisplayStatusBonusAll が関数', () => { expect(typeof DisplayStatusBonusAll).toBe('function'); });
        it('DisplayReferStatusAll が関数', () => { expect(typeof DisplayReferStatusAll).toBe('function'); });
        it('GetTotalPureBasicStatus が関数', () => { expect(typeof GetTotalPureBasicStatus).toBe('function'); });
        it('StoreSpecStatusBonusAll が関数', () => { expect(typeof StoreSpecStatusBonusAll).toBe('function'); });
        it('GetTotalSpecStatus が関数', () => { expect(typeof GetTotalSpecStatus).toBe('function'); });
        it('GetEarningTSStatusPoint が関数', () => { expect(typeof GetEarningTSStatusPoint).toBe('function'); });
        it('GetTStatusPoint が関数', () => { expect(typeof GetTStatusPoint).toBe('function'); });
        it('ApplySpecStatusModifications が関数', () => { expect(typeof ApplySpecStatusModifications).toBe('function'); });
        it('ApplySpecStatusModifyMATK が関数', () => { expect(typeof ApplySpecStatusModifyMATK).toBe('function'); });
        it('GetPAtk が関数', () => { expect(typeof GetPAtk).toBe('function'); });
        it('GetSMatk が関数', () => { expect(typeof GetSMatk).toBe('function'); });
        it('GetCRate が関数', () => { expect(typeof GetCRate).toBe('function'); });
        it('GetRes が関数', () => { expect(typeof GetRes).toBe('function'); });
        it('GetMres が関数', () => { expect(typeof GetMres).toBe('function'); });
        it('GetHPlus が関数', () => { expect(typeof GetHPlus).toBe('function'); });
        it('GetMobRes が関数', () => { expect(typeof GetMobRes).toBe('function'); });
        it('GetMobMres が関数', () => { expect(typeof GetMobMres).toBe('function'); });
        it('ApplyPAtkAmplify が関数', () => { expect(typeof ApplyPAtkAmplify).toBe('function'); });
        it('ApplySMatkAmplify が関数', () => { expect(typeof ApplySMatkAmplify).toBe('function'); });
        it('ApplyCRateAmplify が関数', () => { expect(typeof ApplyCRateAmplify).toBe('function'); });
        it('ApplyResResist が関数', () => { expect(typeof ApplyResResist).toBe('function'); });
        it('ApplyMresResist が関数', () => { expect(typeof ApplyMresResist).toBe('function'); });
        it('ApplyPAtkLeftHandPenalty が関数', () => { expect(typeof ApplyPAtkLeftHandPenalty).toBe('function'); });
        it('ApplySpecModify が関数', () => { expect(typeof ApplySpecModify).toBe('function'); });
        it('migrateOtherJob が関数', () => { expect(typeof migrateOtherJob).toBe('function'); });
        it('OnChangeJob が関数', () => { expect(typeof OnChangeJob).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.CalcStatusPoint が設定されている', () => {
            expect((window as any).CalcStatusPoint).toBe(CalcStatusPoint);
        });
    });

    describe('スモークコール（ReferenceError検出）', () => {
        // 純粋計算関数（グローバル依存なし）
        it('GetStatusIncrementCost が呼び出し可能', () => {
            expect(() => GetStatusIncrementCost(50)).not.toThrow();
        });
        it('GetStatusTotalCost が呼び出し可能', () => {
            expect(() => GetStatusTotalCost(50)).not.toThrow();
        });
        it('GetEarningStatusPoint が呼び出し可能', () => {
            expect(() => GetEarningStatusPoint(100)).not.toThrow();
        });
        it('GetEarningTSStatusPoint が呼び出し可能', () => {
            expect(() => GetEarningTSStatusPoint(200)).not.toThrow();
        });
        it('ApplyPAtkLeftHandPenalty が呼び出し可能', () => {
            // 実装内で return dmg に到達するため即時返却
            expect(() => ApplyPAtkLeftHandPenalty([], [], [], 100)).not.toThrow();
        });

        // MIG_PARAM_ID_* グローバルをモックして呼び出す
        // GetTStatusPoint のような「scope-audit 偽陰性」バグを検出するための重要なテスト
        describe('MIG_PARAM_ID モック使用', () => {
            beforeAll(() => {
                (globalThis as any).MIG_PARAM_ID_POW = 6;
                (globalThis as any).MIG_PARAM_ID_STA = 7;
                (globalThis as any).MIG_PARAM_ID_WIS = 8;
                (globalThis as any).MIG_PARAM_ID_SPL = 9;
                (globalThis as any).MIG_PARAM_ID_CON = 10;
                (globalThis as any).MIG_PARAM_ID_CRT = 11;
            });
            afterAll(() => {
                delete (globalThis as any).MIG_PARAM_ID_POW;
                delete (globalThis as any).MIG_PARAM_ID_STA;
                delete (globalThis as any).MIG_PARAM_ID_WIS;
                delete (globalThis as any).MIG_PARAM_ID_SPL;
                delete (globalThis as any).MIG_PARAM_ID_CON;
                delete (globalThis as any).MIG_PARAM_ID_CRT;
            });
            it('GetTStatusPoint が呼び出し可能', () => {
                expect(() => GetTStatusPoint(200)).not.toThrow();
            });
            it('GetTotalSpecStatus が呼び出し可能', () => {
                expect(() => GetTotalSpecStatus(6)).not.toThrow();
            });
            it('StoreSpecStatusBonusAll が呼び出し可能', () => {
                expect(() => StoreSpecStatusBonusAll(0, 0, 0, 0, 0, 0)).not.toThrow();
            });
        });

        // 以下の関数は document.* または複数グローバルへの依存により呼び出し不可。
        // エクスポート確認（関数）セクションの typeof テストで存在確認済み。
        //   DOM 依存: RebuildStatusSelect, CalcStatusPoint, DisplayStatusBonusAll,
        //             DisplayReferStatusAll, migrateOtherJob, OnChangeJob
        //   グローバル依存: GetTotalPureBasicStatus (SU_STR 等), GetPAtk/GetSMatk/GetCRate/
        //             GetRes/GetMres/GetHPlus (GetEquippedTotalSPEquip 等), GetMobRes/GetMobMres
        //             (MONSTER_DATA_INDEX_*), ApplyPAtkAmplify/ApplySMatkAmplify/ApplyCRateAmplify
        //             (→GetPAtk 等), ApplyResResist/ApplyMresResist (→GetMobRes 等),
        //             ApplySpecStatusModifications/ApplySpecStatusModifyMATK (CHARA_DATA_INDEX_*),
        //             ApplySpecModify (LearnedSkillSearch 等)
    });
});
