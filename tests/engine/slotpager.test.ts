import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as hmcard from '@engine/equip/hmcard.js';
import { __RebuildSlotAsCardShort, LoadSlotStateCardAll, SaveSlotStateCardAll } from '@engine/equip/slotpager.js';
import { GetStatefullData, SetStatefullData } from '@engine/runtime/util.js';
// dewindow: calc は head-bridge 経由になった（旧 bare global）。
import { __registerHeadFunctions } from '@engine/bridge/battlecalc-bridge.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_HEAD_TOP } from '@engine/const/EnumEquipRegionId.js';
import {
    GetSlotCardId, GetSlotCategoryId, ResetEquipSlotState, SetSlotCardId,
} from '@engine/equip/equip-slot-state.js';
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

    describe('SaveSlotStateCardAll / LoadSlotStateCardAll: 画面のカード欄と正本の受け渡し', () => {
        beforeEach(() => {
            ResetEquipSlotState();
        });
        afterEach(() => {
            document.body.innerHTML = '';
            ResetEquipSlotState();
        });

        /** カード欄の select を作る（options は value の配列。optgroup を使う場合は groups で指定） */
        function createCardSelect(id: string, values: string[], groups: Array<{ listId: number; values: string[] }> = []) {
            const sel = document.createElement('select');
            sel.id = id;
            for (const v of values) {
                sel.appendChild(Object.assign(document.createElement('option'), { value: v }));
            }
            for (const group of groups) {
                const optgroup = document.createElement('optgroup');
                optgroup.setAttribute('data-ench-list-id', String(group.listId));
                for (const v of group.values) {
                    optgroup.appendChild(Object.assign(document.createElement('option'), { value: v }));
                }
                sel.appendChild(optgroup);
            }
            document.body.appendChild(sel);
            return sel;
        }

        it('カード欄が画面にあるときは、その選択値で正本を更新する', () => {
            const sel = createCardSelect('OBJID_ARMS_RIGHT_CARD_1', ['0', '4302']);
            sel.value = '4302';

            SaveSlotStateCardAll();

            expect(GetSlotCardId(EQUIP_REGION_ID_ARMS, 0)).toBe(4302);
        });

        it('選択中の optgroup のエンチャント種別IDも正本へ保存する（種別の無い選択肢は 0）', () => {
            const enchant = createCardSelect('OBJID_ARMS_RIGHT_CARD_2', ['0'], [{ listId: 77, values: ['1297'] }]);
            enchant.value = '1297';
            const card = createCardSelect('OBJID_ARMS_RIGHT_CARD_1', ['0', '4302']);
            card.value = '4302';

            SaveSlotStateCardAll();

            expect(GetSlotCardId(EQUIP_REGION_ID_ARMS, 1)).toBe(1297);
            expect(GetSlotCategoryId(EQUIP_REGION_ID_ARMS, 1)).toBe(77);
            expect(GetSlotCategoryId(EQUIP_REGION_ID_ARMS, 0)).toBe(0);
        });

        it('カード欄が画面に無いとき（ランダムオプション表示中）は、保持しているカード値を0で上書きしない', () => {
            SetSlotCardId(EQUIP_REGION_ID_ARMS, 0, 4302);
            SetSlotCardId(EQUIP_REGION_ID_HEAD_TOP, 1, 1247);

            SaveSlotStateCardAll();

            expect(GetSlotCardId(EQUIP_REGION_ID_ARMS, 0)).toBe(4302);
            expect(GetSlotCardId(EQUIP_REGION_ID_HEAD_TOP, 1)).toBe(1247);
        });

        it('シャドウ装備のカード欄は、正本ではなく画面外のステートフルデータへ保存する', () => {
            const span = document.createElement('span');
            span.id = 'DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_2';
            document.body.appendChild(span);
            const sel = createCardSelect('OBJID_SHADOW_ARMS_RIGHT_CARD_2', ['0', '840']);
            sel.value = '840';

            SaveSlotStateCardAll();

            expect(Number(GetStatefullData('DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_2', 0))).toBe(840);
            expect(GetSlotCardId(EQUIP_REGION_ID_ARMS, 1)).toBe(0);
        });

        it('LoadSlotStateCardAll: 正本の値をカード欄へ復元する', () => {
            // happy-dom の select は数値の代入で値が空になるため、値の受け渡しだけを見る input で代用する
            const createValueHolder = (id: string) => {
                const input = document.createElement('input');
                input.id = id;
                document.body.appendChild(input);
                return input;
            };
            const sel1 = createValueHolder('OBJID_ARMS_RIGHT_CARD_1');
            const sel3 = createValueHolder('OBJID_HEAD_TOP_CARD_3');
            SetSlotCardId(EQUIP_REGION_ID_ARMS, 0, 4302);
            SetSlotCardId(EQUIP_REGION_ID_HEAD_TOP, 2, 1303);

            LoadSlotStateCardAll();

            expect(sel1.value).toBe('4302');
            expect(sel3.value).toBe('1303');
        });
    });
});
