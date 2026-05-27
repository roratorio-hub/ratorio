import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import {
    CConfBaseSelectData, CConfBaseConfData,
    CConfBaseRegisterParam, CConfBaseManagementParam,
    CConfBase2,
} from '@roro/CConfBase2.js';

describe('CConfBase2.js', () => {
    describe('エクスポート確認', () => {
        it('CConfBaseSelectData が関数', () => { expect(typeof CConfBaseSelectData).toBe('function'); });
        it('CConfBaseConfData が関数', () => { expect(typeof CConfBaseConfData).toBe('function'); });
        it('CConfBaseRegisterParam が関数', () => { expect(typeof CConfBaseRegisterParam).toBe('function'); });
        it('CConfBaseManagementParam が関数', () => { expect(typeof CConfBaseManagementParam).toBe('function'); });
        it('CConfBase2 が関数', () => { expect(typeof CConfBase2).toBe('function'); });
    });

    describe('CConfBaseSelectData インスタンス', () => {
        const s = new CConfBaseSelectData();
        it('value が 0', () => { expect(s.value).toBe(0); });
        it('text が ""', () => { expect(s.text).toBe(''); });
        it('SetValue が関数', () => { expect(typeof s.SetValue).toBe('function'); });
        it('SetText が関数', () => { expect(typeof s.SetText).toBe('function'); });
        it('SetValue がチェーン可能', () => { expect(s.SetValue(5)).toBe(s); });
    });

    describe('CConfBaseConfData インスタンス', () => {
        const d = new CConfBaseConfData();
        it('id が 0', () => { expect(d.id).toBe(0); });
        it('mappedIndex が -1', () => { expect(d.mappedIndex).toBe(-1); });
        it('defaultValue が 0', () => { expect(d.defaultValue).toBe(0); });
        it('selectDataArray が配列', () => { expect(Array.isArray(d.selectDataArray)).toBe(true); });
        it('SetId が関数', () => { expect(typeof d.SetId).toBe('function'); });
        it('SetText が関数', () => { expect(typeof d.SetText).toBe('function'); });
        it('SetControlType が関数', () => { expect(typeof d.SetControlType).toBe('function'); });
        it('SetDefaultValue が関数', () => { expect(typeof d.SetDefaultValue).toBe('function'); });
        it('SetMinValue が関数', () => { expect(typeof d.SetMinValue).toBe('function'); });
        it('SetMaxValue が関数', () => { expect(typeof d.SetMaxValue).toBe('function'); });
        it('SetFuncInputModify が関数', () => { expect(typeof d.SetFuncInputModify).toBe('function'); });
        it('SetNotice が関数', () => { expect(typeof d.SetNotice).toBe('function'); });
        it('SetFuncOnChange が関数', () => { expect(typeof d.SetFuncOnChange).toBe('function'); });
        it('SetFuncTextButton が関数', () => { expect(typeof d.SetFuncTextButton).toBe('function'); });
        it('SetSelectDataArray が関数', () => { expect(typeof d.SetSelectDataArray).toBe('function'); });
        it('SetMappedIndex が関数', () => { expect(typeof d.SetMappedIndex).toBe('function'); });
    });

    describe('CConfBaseManagementParam インスタンス', () => {
        const p = new CConfBaseManagementParam();
        it('activeIndex が 0', () => { expect(p.activeIndex).toBe(0); });
        it('confDataArray が配列', () => { expect(Array.isArray(p.confDataArray)).toBe(true); });
        it('GetActiveConfData が関数', () => { expect(typeof p.GetActiveConfData).toBe('function'); });
        it('SetActiveConfData が関数', () => { expect(typeof p.SetActiveConfData).toBe('function'); });
        it('GetConfData が関数', () => { expect(typeof p.GetConfData).toBe('function'); });
        it('SetConfData が関数', () => { expect(typeof p.SetConfData).toBe('function'); });
        it('GetDataCount が関数', () => { expect(typeof p.GetDataCount).toBe('function'); });
        it('ResetDataAll が関数', () => { expect(typeof p.ResetDataAll).toBe('function'); });
    });

    describe('CConfBase2 インスタンス生成', () => {
        const inst = new CConfBase2(null);

        it('confCountLimit が 0', () => { expect(inst.confCountLimit).toBe(0); });
        it('itemInRow が 1', () => { expect(inst.itemInRow).toBe(1); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が 不明な設定', () => { expect(inst.confLabel).toBe('不明な設定'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的メソッド（コンストラクタ実行後に設定）', () => {
            it('ValueRangeModify が関数', () => { expect(typeof CConfBase2.ValueRangeModify).toBe('function'); });
            it('InputModifyTextCommon が関数', () => { expect(typeof CConfBase2.InputModifyTextCommon).toBe('function'); });
            it('InputModifyNumberCommon が関数', () => { expect(typeof CConfBase2.InputModifyNumberCommon).toBe('function'); });
            it('OnClickSwitchHandler が関数', () => { expect(typeof CConfBase2.OnClickSwitchHandler).toBe('function'); });
            it('OnClickTextButtonHandler が関数', () => { expect(typeof CConfBase2.OnClickTextButtonHandler).toBe('function'); });
            it('OnChangeValueHandler が関数', () => { expect(typeof CConfBase2.OnChangeValueHandler).toBe('function'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
            it('GetSwitchIdString が関数', () => { expect(typeof inst.GetSwitchIdString).toBe('function'); });
            it('GetControlIdString が関数', () => { expect(typeof inst.GetControlIdString).toBe('function'); });
            it('GetSortedConfIndex が関数', () => { expect(typeof inst.GetSortedConfIndex).toBe('function'); });
            it('BuildUpSelectArea が関数', () => { expect(typeof inst.BuildUpSelectArea).toBe('function'); });
            it('BuildUpSelectAreaSubHeader が関数', () => { expect(typeof inst.BuildUpSelectAreaSubHeader).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('BuildUpSelectAreaSubFooter が関数', () => { expect(typeof inst.BuildUpSelectAreaSubFooter).toBe('function'); });
            it('SyncronizeSettingsVarToCtrl が関数', () => { expect(typeof inst.SyncronizeSettingsVarToCtrl).toBe('function'); });
            it('SyncronizeSettingsCtrlToVar が関数', () => { expect(typeof inst.SyncronizeSettingsCtrlToVar).toBe('function'); });
            it('OnClickSwitch が関数', () => { expect(typeof inst.OnClickSwitch).toBe('function'); });
            it('OnClickTextButton が関数', () => { expect(typeof inst.OnClickTextButton).toBe('function'); });
            it('OnChangeValue が関数', () => { expect(typeof inst.OnChangeValue).toBe('function'); });
            it('ApplyValueChanged が関数', () => { expect(typeof inst.ApplyValueChanged).toBe('function'); });
            it('RefreshSelectAreaHeader が関数', () => { expect(typeof inst.RefreshSelectAreaHeader).toBe('function'); });
            it('RefreshControlCSS が関数', () => { expect(typeof inst.RefreshControlCSS).toBe('function'); });
        });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(2)).toBe('OBJID_CONTROL_CONF2_2_HEADER');
            });
        });

        describe('GetSwitchIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetSwitchIdString(0)).toBe('OBJID_CONTROL_CONF2_0_SWITCH');
            });
        });
    });

    describe('window グローバル登録', () => {
        // onClick="CConfBase2.OnClickSwitchHandler(...)" 形式のインライン文字列ハンドラは
        // グローバルスコープで評価されるため window.CConfBase2 が必須。
        // compat ブロックが誤って除去された場合に検出するためのリグレッションテスト。
        it('window.CConfBase2 が登録されている', () => {
            expect((globalThis as any).CConfBase2).toBe(CConfBase2);
        });
    });
});
