import { describe, it, expect, beforeEach } from 'vitest';
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
} from '../../roro/m/js/hmrndopt.js';

describe('hmrndopt', () => {
    beforeEach(() => {
        window.EnumEquipRegionId = { GetDefinedName: (id) => `REGION_${id}` };
    });

    it('全関数を export する', () => {
        expect(typeof GetObjectPrefixRndOpt).toBe('function');
        expect(typeof GetObjectIdRndOptKindTD).toBe('function');
        expect(typeof GetObjectIdRndOptKind).toBe('function');
        expect(typeof GetObjectIdRndOptValueTD).toBe('function');
        expect(typeof GetObjectIdRndOptValue).toBe('function');
        expect(typeof RebuildRndOptSelect).toBe('function');
        expect(typeof CreateRndOptKind).toBe('function');
        expect(typeof CreateRndOptValue).toBe('function');
        expect(typeof SetUpRndOptKind).toBe('function');
        expect(typeof SetUpRndOptValue).toBe('function');
        expect(typeof OnChangeRndOptKind).toBe('function');
        expect(typeof ClearRndOptSelectAll).toBe('function');
        expect(typeof ClearRndOptSelect).toBe('function');
        expect(typeof SetRndOptEnablityAll).toBe('function');
        expect(typeof SetRndOptEnablity).toBe('function');
        expect(typeof IsEffectiveRndOptSelect).toBe('function');
        expect(typeof SetObjectUsable).toBe('function');
        expect(typeof GetRndOptTotalValue).toBe('function');
        expect(typeof GetRndOptValue).toBe('function');
    });

    it('window compat ブロックで全関数が window に設定される', () => {
        expect(window.GetObjectPrefixRndOpt).toBe(GetObjectPrefixRndOpt);
        expect(window.GetObjectIdRndOptKind).toBe(GetObjectIdRndOptKind);
        expect(window.RebuildRndOptSelect).toBe(RebuildRndOptSelect);
        expect(window.GetRndOptTotalValue).toBe(GetRndOptTotalValue);
        expect(window.GetRndOptValue).toBe(GetRndOptValue);
    });

    it('GetObjectPrefixRndOpt は "OBJID_<name>" を返す', () => {
        expect(GetObjectPrefixRndOpt(3)).toBe('OBJID_REGION_3');
    });

    it('GetObjectIdRndOptKind は正しいオブジェクトID文字列を返す', () => {
        expect(GetObjectIdRndOptKind(3, 2)).toBe('OBJID_REGION_3_RNDOPT_KIND_2');
    });

    it('GetObjectIdRndOptKindTD は TD 用オブジェクトID文字列を返す', () => {
        expect(GetObjectIdRndOptKindTD(3, 2)).toBe('OBJID_REGION_3_RNDOPT_KIND_TD_2');
    });

    it('GetObjectIdRndOptValue は VALUE 用オブジェクトID文字列を返す', () => {
        expect(GetObjectIdRndOptValue(3, 2)).toBe('OBJID_REGION_3_RNDOPT_VALUE_2');
    });

    it('GetObjectIdRndOptValueTD は VALUE TD 用オブジェクトID文字列を返す', () => {
        expect(GetObjectIdRndOptValueTD(3, 2)).toBe('OBJID_REGION_3_RNDOPT_VALUE_TD_2');
    });
});
