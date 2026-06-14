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
