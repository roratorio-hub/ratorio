import { vi, describe, it, expect } from 'vitest';

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
    StoreBasicStatusBonusAll, GetBasicStatusBonus, GetPureStatus, GetSpecStatusBonus, GetStatusPointRemain,
} from '@ro4/hmjob.js';
import { MIG_PARAM_ID_CON, MIG_PARAM_ID_CRT, MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL, MIG_PARAM_ID_STA, MIG_PARAM_ID_WIS, MIG_PARAM_ID_STR } from '@roro/const/EnumMigItemParamId.js';

describe('hmjob.js', () => {
    // 3e-3: window compat 除去（window.CalcStatusPoint の state テストは削除）。
    // CalcStatusPoint は engine-registry 経由（registryGet('CalcStatusPoint')）で公開される
    // （動作は呼び出し側の bridge テストでカバー）

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

        // MIG_PARAM_ID_* は enum const 化（2026-08-01）以降、実体は EnumMigItemParamId.js の
        // export const（POW=6 / STA=7 / WIS=8 / SPL=9 / CON=10 / CRT=11）。import 済みの値が
        // そのまま使えるため、旧 DefineEnum 時代のグローバル再代入モックは不要（読み取り専用
        // バインディングの再代入は TypeError になる）。
        // GetTStatusPoint のような「scope-audit 偽陰性」バグを検出するための重要なテスト
        describe('MIG_PARAM_ID モック使用', () => {
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

        // リファクタリング計画 Phase 12: saveimage.js がDOMスクレイプせずに参照するための
        // 新規アクセサ（動作テスト。StoreSpecStatusBonusAll と対称の構造なので同じ形で検証する）
        describe('Phase 12: classic 6ステータスボーナス・ステータスポイント保存', () => {
            it('StoreBasicStatusBonusAll で保存した値を GetBasicStatusBonus で取得できる', () => {
                StoreBasicStatusBonusAll(1, 2, 3, 4, 5, 6);
                expect(GetBasicStatusBonus(MIG_PARAM_ID_STR)).toBe(1);
            });
            it('GetPureStatus / GetSpecStatusBonus が呼び出し可能', () => {
                expect(() => GetPureStatus(MIG_PARAM_ID_POW)).not.toThrow();
                expect(() => GetSpecStatusBonus(MIG_PARAM_ID_POW)).not.toThrow();
            });
            it('GetStatusPointRemain が呼び出し可能', () => {
                expect(() => GetStatusPointRemain()).not.toThrow();
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
