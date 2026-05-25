import { describe, it, expect } from 'vitest';
import { CItemInfoManager } from '@roro/CItemInfoManager.js';

describe('CItemInfoManager.js', () => {
    describe('エクスポート確認', () => {
        it('CItemInfoManager が関数', () => {
            expect(typeof CItemInfoManager).toBe('function');
        });

        it('OptionIdDummy が getter として定義されている', () => {
            expect(CItemInfoManager.OptionIdDummy).toBe('dmy');
        });
        it('Extracted が false', () => {
            expect(CItemInfoManager.Extracted).toBe(false);
        });
        it('OptionIdLast が "dmy"', () => {
            expect(CItemInfoManager.OptionIdLast).toBe('dmy');
        });
        it('OptionIdLastHandling が "dmy"', () => {
            expect(CItemInfoManager.OptionIdLastHandling).toBe('dmy');
        });
        it('tradeWorld が 13', () => {
            expect(CItemInfoManager.tradeWorld).toBe(13);
        });
        it('AutoFlag が false', () => {
            expect(CItemInfoManager.AutoFlag).toBe(false);
        });
        it('ApplyAutoFocusFlag が true', () => {
            expect(CItemInfoManager.ApplyAutoFocusFlag).toBe(true);
        });

        it('CreateOptionId が関数', () => {
            expect(typeof CItemInfoManager.CreateOptionId).toBe('function');
        });
        it('SplitOptionId が関数', () => {
            expect(typeof CItemInfoManager.SplitOptionId).toBe('function');
        });
        it('RebuildControls が関数', () => {
            expect(typeof CItemInfoManager.RebuildControls).toBe('function');
        });
        it('OnClickExtractSwitch が関数', () => {
            expect(typeof CItemInfoManager.OnClickExtractSwitch).toBe('function');
        });
        it('OnChangeCheckAutoFlag が関数', () => {
            expect(typeof CItemInfoManager.OnChangeCheckAutoFlag).toBe('function');
        });
        it('OnChangeCheckApplyAutoFocusFlag が関数', () => {
            expect(typeof CItemInfoManager.OnChangeCheckApplyAutoFocusFlag).toBe('function');
        });
        it('RefreshItemInfoHeader が関数', () => {
            expect(typeof CItemInfoManager.RefreshItemInfoHeader).toBe('function');
        });
        it('OnChangeEquip が関数', () => {
            expect(typeof CItemInfoManager.OnChangeEquip).toBe('function');
        });
        it('ResetState が関数', () => {
            expect(typeof CItemInfoManager.ResetState).toBe('function');
        });
        it('RefreshItemSelectBox が関数', () => {
            expect(typeof CItemInfoManager.RefreshItemSelectBox).toBe('function');
        });
        it('OnChangeSelectItem が関数', () => {
            expect(typeof CItemInfoManager.OnChangeSelectItem).toBe('function');
        });
        it('OnChangeWorldSelect が関数', () => {
            expect(typeof CItemInfoManager.OnChangeWorldSelect).toBe('function');
        });
        it('RebuildOfficialTradeInformationAnchor が関数', () => {
            expect(typeof CItemInfoManager.RebuildOfficialTradeInformationAnchor).toBe('function');
        });
        it('RebuildInfoTable が関数', () => {
            expect(typeof CItemInfoManager.RebuildInfoTable).toBe('function');
        });
        it('RebuildInfoTableSubItem が関数', () => {
            expect(typeof CItemInfoManager.RebuildInfoTableSubItem).toBe('function');
        });
        it('RebuildInfoTableSubItemDetail が関数', () => {
            expect(typeof CItemInfoManager.RebuildInfoTableSubItemDetail).toBe('function');
        });
        it('RebuildInfoTableSubCard が関数', () => {
            expect(typeof CItemInfoManager.RebuildInfoTableSubCard).toBe('function');
        });
        it('RebuildInfoTableSubCardDetail が関数', () => {
            expect(typeof CItemInfoManager.RebuildInfoTableSubCardDetail).toBe('function');
        });
        it('RebuildInfoTableSubCostume が関数', () => {
            expect(typeof CItemInfoManager.RebuildInfoTableSubCostume).toBe('function');
        });
        it('AppendEfficiencyInfoItem が関数', () => {
            expect(typeof CItemInfoManager.AppendEfficiencyInfoItem).toBe('function');
        });
        it('AppendEfficiencyInfoCard が関数', () => {
            expect(typeof CItemInfoManager.AppendEfficiencyInfoCard).toBe('function');
        });
        it('AppendEfficiencyInfoCostume が関数', () => {
            expect(typeof CItemInfoManager.AppendEfficiencyInfoCostume).toBe('function');
        });
        it('AppendEfficiencyInfoSub が関数', () => {
            expect(typeof CItemInfoManager.AppendEfficiencyInfoSub).toBe('function');
        });
        it('ApplyTimeItem が関数', () => {
            expect(typeof CItemInfoManager.ApplyTimeItem).toBe('function');
        });
        it('LoadFromLocalStorage が関数', () => {
            expect(typeof CItemInfoManager.LoadFromLocalStorage).toBe('function');
        });
        it('AppendSetInfo が関数', () => {
            expect(typeof CItemInfoManager.AppendSetInfo).toBe('function');
        });
    });

    describe('コアロジック確認', () => {
        it('CreateOptionId がキーを結合して返す', () => {
            expect(CItemInfoManager.CreateOptionId('item', 42)).toBe('item_42');
        });
        it('SplitOptionId が配列を返す', () => {
            expect(CItemInfoManager.SplitOptionId('item_42')).toEqual(['item', '42']);
        });
    });
});
