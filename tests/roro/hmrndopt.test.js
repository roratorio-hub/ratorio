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

    it('GetRndOptValue: spValToCorrect 未宣言で ReferenceError が発生しない', () => {
        // EQUIP_REGION_ID_* を 1〜13 に割り当て、9999 を渡して default ブランチ
        // (eqpRefined = 0) に落とす → n_A_Weapon_ATKplus 等のグローバルを不要にする
        window.EQUIP_REGION_ID_ARMS             = 1;
        window.EQUIP_REGION_ID_ARMS_LEFT        = 2;
        window.EQUIP_REGION_ID_HEAD_TOP         = 3;
        window.EQUIP_REGION_ID_SHIELD           = 4;
        window.EQUIP_REGION_ID_BODY             = 5;
        window.EQUIP_REGION_ID_SHOULDER         = 6;
        window.EQUIP_REGION_ID_SHOES            = 7;
        window.EQUIP_REGION_ID_SHADOW_ARMS_RIGHT   = 8;
        window.EQUIP_REGION_ID_SHADOW_ARMS_LEFT    = 9;
        window.EQUIP_REGION_ID_SHADOW_BODY         = 10;
        window.EQUIP_REGION_ID_SHADOW_FOOT         = 11;
        window.EQUIP_REGION_ID_SHADOW_ACCESSARY_1  = 12;
        window.EQUIP_REGION_ID_SHADOW_ACCESSARY_2  = 13;

        const SPID = 42;
        window.RND_OPT_SLOT_COUNT          = 1;
        window.GetEquipRndOptTableKind     = () => 1;
        window.GetEquipRndOptTableValue    = () => 5;  // rndOptValue → spDefValue
        window.RND_OPT_DATA_INDEX_SPID     = 0;
        window.g_rndOptArray               = { 1: [SPID] };

        // IsMatchSpDefId: spid が一致したと見なして true を返す
        window.IsMatchSpDefId              = () => true;
        // CheckSpDef* はすべて 0 を返して continue を回避
        window.CheckSpDefFriendlyOver      = () => 0;
        window.CheckSpDefBaseLvOver        = () => 0;
        window.CheckSpDefJobRestrict       = () => 0;
        window.CheckSpDefPureStatus        = () => 0;
        window.CheckSpDefRefineOver        = () => 0;

        // Math.floor(0 / X) に使われる offset 類
        window.ITEM_SP_BASE_LV_BY_1_OFFSET    = 1;
        window.ITEM_SP_PURE_STR_BY_10_OFFSET  = 1;
        window.ITEM_SP_REFINE_BY_1_OFFSET     = 1;

        // pureParamArray の初期化に使われる純粋ステータス
        window.SU_STR = window.SU_AGI = window.SU_VIT =
            window.SU_INT = window.SU_DEX = window.SU_LUK = 0;

        window.n_A_BaseLV = 1;

        // 9999 は switch の default → eqpRefined = 0、n_A_Weapon_ATKplus 不要
        const result = GetRndOptValue(9999, SPID, [], false);
        expect(result).toBe(5);  // spValToCorrect = spDefValue = 5、条件係数すべて 0 → spVal += 5
    });

    it('RebuildRndOptSelect: objRoot 未宣言で ReferenceError が発生しない', () => {
        // objRoot が var 宣言なしだと ESM strict mode で即 ReferenceError になる
        window.HtmlGetElementById          = () => null;
        window.HtmlGetObjectValueByIdAsInteger = () => 0;
        window.ItemObjNew                  = { 0: { [0]: 0 } };
        window.ITEM_DATA_INDEX_WPNLV       = 0;
        window.GetRndOptTypeId             = () => 0;
        window.RND_OPT_SLOT_COUNT          = 4;
        window.g_rndOptTypeArray           = [];
        window.EQUIP_REGION_ID_ARMS        = 1;
        expect(() => RebuildRndOptSelect(1, 0)).not.toThrow();
    });
});
