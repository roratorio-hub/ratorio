import { describe, it, expect, beforeAll } from 'vitest';
import {
    GetObjectPrefixRndOpt,
    GetObjectIdRndOptKindTD,
    GetObjectIdRndOptKind,
    GetObjectIdRndOptValueTD,
    GetObjectIdRndOptValue,
    RebuildRndOptSelect,
    CreateRndOptKind,
    CreateRndOptValue,
    SetUpRndOptKind,
    SetUpRndOptValue,
    OnChangeRndOptKind,
    ClearRndOptSelectAll,
    ClearRndOptSelect,
    SetRndOptEnablityAll,
    SetRndOptEnablity,
    IsEffectiveRndOptSelect,
    SetObjectUsable,
    GetRndOptTotalValue,
    GetRndOptValue,
} from '@roro/hmrndopt.js';

describe('hmrndopt.js', () => {
    describe('エクスポート確認', () => {
        const functions = {
            GetObjectPrefixRndOpt,
            GetObjectIdRndOptKindTD,
            GetObjectIdRndOptKind,
            GetObjectIdRndOptValueTD,
            GetObjectIdRndOptValue,
            RebuildRndOptSelect,
            CreateRndOptKind,
            CreateRndOptValue,
            SetUpRndOptKind,
            SetUpRndOptValue,
            OnChangeRndOptKind,
            ClearRndOptSelectAll,
            ClearRndOptSelect,
            SetRndOptEnablityAll,
            SetRndOptEnablity,
            IsEffectiveRndOptSelect,
            SetObjectUsable,
            GetRndOptTotalValue,
            GetRndOptValue,
        };
        for (const [name, fn] of Object.entries(functions)) {
            it(`${name} が関数`, () => {
                expect(typeof fn).toBe('function');
            });
        }
    });

    describe('window互換確認', () => {
        const windowNames = [
            'GetObjectIdRndOptKindTD',
            'GetObjectIdRndOptKind',
            'GetObjectIdRndOptValueTD',
            'GetObjectIdRndOptValue',
            'RebuildRndOptSelect',
            'SetUpRndOptValue',
            'SetRndOptEnablityAll',
            'SetRndOptEnablity',
        ];
        for (const name of windowNames) {
            it(`window.${name} が設定されている`, () => {
                expect(typeof (window as any)[name]).toBe('function');
            });
        }
    });

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
});
