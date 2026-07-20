import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import {
    GetObjectPrefixRndOpt,
    GetObjectIdRndOptKind,
    GetObjectIdRndOptValue,
    IsEffectiveRndOptSelect,
    SetObjectUsable,
    CreateRndOptKind,
    CreateRndOptValue,
} from '@roro/hmrndopt.js';

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
        beforeEach(() => {
            (globalThis as any).AutoCalc = vi.fn();
            (globalThis as any).StAllCalc = vi.fn();
        });
        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('CreateRndOptKind の select 変更で値セレクトが再構築され AutoCalc が呼ばれる', () => {
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
            expect((globalThis as any).StAllCalc).toHaveBeenCalled();
            expect((globalThis as any).AutoCalc).toHaveBeenCalled();
        });

        it('CreateRndOptValue の select 変更で StAllCalc / AutoCalc が呼ばれる', () => {
            const root = document.createElement('tr');
            document.body.appendChild(root);

            const valueSel = CreateRndOptValue(root, 0, 1) as HTMLSelectElement;

            valueSel.dispatchEvent(new Event('change'));

            // OnChangeRandomEnchant → StAllCalc、リスナー末尾で AutoCalc
            expect((globalThis as any).StAllCalc).toHaveBeenCalled();
            expect((globalThis as any).AutoCalc).toHaveBeenCalled();
        });
    });
});
