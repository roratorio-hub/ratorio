import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as hmcard from '@engine/equip/hmcard.js';
import { __RebuildSlotAsCardShort, SaveSlotStateCardAll } from '@engine/equip/slotpager.js';
import { GetStatefullData, SetStatefullData } from '@engine/runtime/util.js';
// dewindow: calc は head-bridge 経由になった（旧 bare global）。
import { __registerHeadFunctions } from '@engine/bridge/battlecalc-bridge.js';
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

    describe('SaveSlotStateCardAll: 画面のカード欄をステートフルデータへ保存する', () => {
        afterEach(() => {
            document.body.innerHTML = '';
        });

        /** 保持値（ステートフルデータ）の要素を作る */
        function createStatefullData(id: string, value: number) {
            const span = document.createElement('span');
            span.id = id;
            document.body.appendChild(span);
            SetStatefullData(id, value);
        }

        it('カード欄が画面にあるときは、その選択値でステートフルデータを更新する', () => {
            createStatefullData('DATA_OBJID_ARMS_RIGHT_CARD_1', 0);
            const sel = document.createElement('select');
            sel.id = 'OBJID_ARMS_RIGHT_CARD_1';
            sel.appendChild(Object.assign(document.createElement('option'), { value: '0' }));
            sel.appendChild(Object.assign(document.createElement('option'), { value: '4302' }));
            document.body.appendChild(sel);
            sel.value = '4302';

            SaveSlotStateCardAll();

            expect(Number(GetStatefullData('DATA_OBJID_ARMS_RIGHT_CARD_1', 0))).toBe(4302);
        });

        it('カード欄が画面に無いとき（ランダムオプション表示中）は、保持しているカード値を0で上書きしない', () => {
            createStatefullData('DATA_OBJID_ARMS_RIGHT_CARD_1', 4302);
            createStatefullData('DATA_OBJID_HEAD_TOP_CARD_2', 1247);

            SaveSlotStateCardAll();

            expect(Number(GetStatefullData('DATA_OBJID_ARMS_RIGHT_CARD_1', 0))).toBe(4302);
            expect(Number(GetStatefullData('DATA_OBJID_HEAD_TOP_CARD_2', 0))).toBe(1247);
        });
    });
});
