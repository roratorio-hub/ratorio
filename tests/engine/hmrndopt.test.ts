import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import {
    GetObjectPrefixRndOpt,
    GetObjectIdRndOptKind,
    GetObjectIdRndOptValue,
    IsEffectiveRndOptSelect,
    SetObjectUsable,
    CreateRndOptKind,
    CreateRndOptValue,
} from '@engine/equip/hmrndopt.js';
// dewindow: AutoCalc/StAllCalc は bare global を廃し head-bridge/foot-bridge 経由になった。
// テストは各 bridge にフェイクを登録して呼び出しを観測する（globalThis スパイは効かない）。
import { __registerHeadFunctions } from '@engine/bridge/battlecalc-bridge.js';
import { __registerFootFunctions } from '@engine/bridge/stallcalc-bridge.js';
// refactor/fix-dependency-loop: OnChangeRandomEnchant は equip.js との循環 import 回避のため
// equip-bridge.js 経由の呼び出しになった。実体を明示的に登録する（equip.js は本番では
// hmrndopt.js と一緒に必ずロードされ自己登録するが、このテストは hmrndopt.js 単体を見るため）。
import { OnChangeRandomEnchant } from '@engine/equip/equip.js';
import { equipBridge } from '@engine/bridge/equip-bridge.js';
// リファクタリング計画 Phase 9 D3: 再計算ポリシーflagの読み出し元は
// CSaveController.getSettingProp（engine-registry 経由）。
import { register as registryRegister } from '@engine/runtime/engine-registry.js';
import { CSaveDataConst } from '@engine/savedata/CSaveDataConst.js';

describe('hmrndopt.js', () => {
    describe('コアロジック確認', () => {
        beforeAll(() => {
            // IsEffectiveRndOptSelect, SetObjectUsable 用の最低限モック不要
            // GetObjectPrefixRndOpt は EnumEquipRegionId を使う（document依存なし）
            (globalThis as any).EnumEquipRegionId = {
                GetDefinedName: (id: number) => `EQUIP_REGION_${id}`,
            };
        });

        it('IsEffectiveRndOptSelect: options が空なら false', () => {
            const mockSelect = { options: [], value: '0' } as any;
            expect(IsEffectiveRndOptSelect(mockSelect)).toBe(false);
        });
        it('IsEffectiveRndOptSelect: options が1件でvalue=0なら false', () => {
            const mockSelect = { options: [{}], value: '0' } as any;
            expect(IsEffectiveRndOptSelect(mockSelect)).toBe(false);
        });
        it('IsEffectiveRndOptSelect: options が複数あれば true', () => {
            const mockSelect = { options: [{}, {}], value: '1' } as any;
            expect(IsEffectiveRndOptSelect(mockSelect)).toBe(true);
        });

        it('SetObjectUsable: null を渡しても throw しない', () => {
            expect(() => SetObjectUsable(null, true)).not.toThrow();
        });

        it('GetObjectPrefixRndOpt が呼び出し可能', () => {
            expect(() => GetObjectPrefixRndOpt(0)).not.toThrow();
        });
        it('GetObjectIdRndOptKind が呼び出し可能', () => {
            expect(() => GetObjectIdRndOptKind(0, 0)).not.toThrow();
        });
        it('GetObjectIdRndOptValue が呼び出し可能', () => {
            expect(() => GetObjectIdRndOptValue(0, 0)).not.toThrow();
        });
    });

    // 3e-1: inline handler → addEventListener 変換の wiring 検証
    describe('addEventListener 変換 (3e-1)', () => {
        beforeAll(() => {
            (globalThis as any).EnumEquipRegionId ??= {
                GetDefinedName: (id: number) => `EQUIP_REGION_${id}`,
            };
        });
        let calc: ReturnType<typeof vi.fn>;
        let stAllCalc: ReturnType<typeof vi.fn>;
        beforeEach(() => {
            calc = vi.fn();
            stAllCalc = vi.fn();
            __registerHeadFunctions({ calc });
            __registerFootFunctions({ StAllCalc: stAllCalc });
            equipBridge.onChangeRandomEnchant = OnChangeRandomEnchant;
            // 再計算ポリシー（リファクタリング計画 Phase 9）: 常に再計算する flag=3 に設定
            registryRegister('CSaveController', {
                // 実際の CSaveController.getSettingProp は BigInt を返す（toSafeBigInt 経由）。
                getSettingProp: (propName: string) =>
                    propName === CSaveDataConst.propNameAttackAutoCalc ? 3n : undefined,
            });
        });
        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('CreateRndOptKind の select 変更で値セレクトが再構築され再計算通知が呼ばれる', () => {
            const root = document.createElement('tr');
            document.body.appendChild(root);

            const kindSel = CreateRndOptKind(root, 0, 0) as HTMLSelectElement;
            const valueSel = CreateRndOptValue(root, 0, 0) as HTMLSelectElement;

            // 種別セレクトに rndOptId=1（0〜200 の値域を持つ）を選択させる
            const opt = document.createElement('option');
            opt.value = '1';
            kindSel.appendChild(opt);
            kindSel.value = '1';

            kindSel.dispatchEvent(new Event('change'));

            // OnChangeRndOptKind → SetUpRndOptValue により値セレクトが再構築される
            expect(valueSel.options.length).toBeGreaterThan(1);
            expect(stAllCalc).toHaveBeenCalled();
            expect(calc).toHaveBeenCalled();
        });

        it('CreateRndOptValue の select 変更で StAllCalc / 再計算通知が呼ばれる', () => {
            const root = document.createElement('tr');
            document.body.appendChild(root);

            const valueSel = CreateRndOptValue(root, 0, 1) as HTMLSelectElement;

            valueSel.dispatchEvent(new Event('change'));

            // OnChangeRandomEnchant → StAllCalc、リスナー末尾で再計算通知
            expect(stAllCalc).toHaveBeenCalled();
            expect(calc).toHaveBeenCalled();
        });
    });
});
