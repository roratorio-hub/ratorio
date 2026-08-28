import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as hmcard from '@engine/equip/hmcard.js';
import { __RebuildSlotAsCardShort } from '@engine/equip/slotpager.js';
// dewindow: calc は head-bridge 経由になった（旧 bare global）。
import { __registerHeadFunctions } from '@engine/bridge/head-bridge.js';
import { EQUIP_REGION_ID_ARMS } from '@engine/const/EnumEquipRegionId.js';
// リファクタリング計画 Phase 9 D3: 再計算ポリシーflagの読み出し元は
// CSaveController.getSettingProp（engine-registry 経由）。
import { register as registryRegister } from '@engine/runtime/engine-registry.js';
import { CSaveDataConst } from '@engine/savedata/CSaveDataConst.js';

// 3e-1: inline handler → addEventListener 変換の wiring 検証。
// change イベントで「ApplyCardShort(eqpRgnId, prefix) → 再計算通知」の順に配線されていることを確認する
// （リファクタリング計画 Phase 9。自動計算ポリシーが常に再計算する flag=3 に設定した状態で確認）。
// ApplyCardShort 本体（StAllCalc / LoadTomSelect 等）の内部挙動は hmcard 側の責務なのでここでは mock する。
describe('slotpager.js', () => {
    describe('addEventListener 変換 (3e-1)', () => {
        let applySpy: ReturnType<typeof vi.spyOn>;
        let calc: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            applySpy = vi.spyOn(hmcard, 'ApplyCardShort').mockImplementation(() => {});
            calc = vi.fn();
            __registerHeadFunctions({ calc });
            registryRegister('CSaveController', {
                // 実際の CSaveController.getSettingProp は BigInt を返す（toSafeBigInt 経由）。
                getSettingProp: (propName: string) =>
                    propName === CSaveDataConst.propNameAttackAutoCalc ? 3n : undefined,
            });
        });
        afterEach(() => {
            applySpy.mockRestore();
            document.body.innerHTML = '';
        });

        it('__RebuildSlotAsCardShort が生成した select の変更で ApplyCardShort → 再計算通知が実行される', () => {
            const eqpRgnId = EQUIP_REGION_ID_ARMS;
            const prefix = 'TESTPFX';

            // スロット欄ルートと、カード欄セレクトを用意
            const root = document.createElement('tr');
            root.id = `${prefix}_SLOT_ROOT`;
            document.body.appendChild(root);
            for (let i = 1; i <= 4; i++) {
                const sel = document.createElement('select');
                sel.id = `${prefix}_CARD_${i}`;
                sel.appendChild(Object.assign(document.createElement('option'), { value: '0' }));
                document.body.appendChild(sel);
            }

            // 装備状態: 右手 = 素手（itemId 0）
            const equipArr: number[] = [];
            equipArr[eqpRgnId] = 0;
            (globalThis as any).n_A_Equip = equipArr;

            __RebuildSlotAsCardShort(eqpRgnId, prefix);

            const shortSel = document.getElementById(`${prefix}_CARD_SHORT`) as HTMLSelectElement;
            expect(shortSel).not.toBeNull();
            expect(shortSel.options.length).toBeGreaterThan(0);

            shortSel.dispatchEvent(new Event('change'));

            // リスナー配線: ApplyCardShort(eqpRgnId, prefix) → 再計算通知
            expect(applySpy).toHaveBeenCalledWith(eqpRgnId, prefix);
            expect(calc).toHaveBeenCalled();
        });
    });
});
