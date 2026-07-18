import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { __RebuildSlotAsCardShort } from '@roro/slotpager.js';

// 3e-1: inline handler → addEventListener 変換の wiring 検証
describe('slotpager.js', () => {
    describe('addEventListener 変換 (3e-1)', () => {
        beforeEach(() => {
            (globalThis as any).AutoCalc = vi.fn();
            (globalThis as any).StAllCalc = vi.fn();
            (globalThis as any).LoadTomSelect = vi.fn();
            // KEEP クラス（window compat 経由の bare global 参照）は unit 環境では未定義
            (globalThis as any).CAttackMethodAreaComponentManager ??= { RebuildControls: () => {} };
        });
        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('__RebuildSlotAsCardShort が生成した select の変更で ApplyCardShort → AutoCalc が実行される', () => {
            const eqpRgnId = (globalThis as any).EQUIP_REGION_ID_ARMS;
            const prefix = 'TESTPFX';

            // スロット欄ルートと、ApplyCardShort が値を書き込むカード欄セレクトを用意
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

            // リスナー: ApplyCardShort（末尾で StAllCalc / LoadTomSelect）→ AutoCalc
            expect((globalThis as any).StAllCalc).toHaveBeenCalled();
            expect((globalThis as any).LoadTomSelect).toHaveBeenCalled();
            expect((globalThis as any).AutoCalc).toHaveBeenCalled();
        });
    });
});
