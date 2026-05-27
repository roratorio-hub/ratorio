import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CConfBase, CTargetData } from '@roro/CConfBase.js';

describe('CConfBase.js', () => {
    describe('エクスポート確認', () => {
        it('CConfBase が関数', () => { expect(typeof CConfBase).toBe('function'); });
        it('CTargetData が関数', () => { expect(typeof CTargetData).toBe('function'); });
    });

    describe('インスタンス生成', () => {
        const inst = new CConfBase([]);

        it('confCountLimit が 0', () => { expect(inst.confCountLimit).toBe(0); });
        it('itemInRow が 2', () => { expect(inst.itemInRow).toBe(2); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が 不明な設定', () => { expect(inst.confLabel).toBe('不明な設定'); });
        it('confArray が []', () => { expect(Array.isArray(inst.confArray)).toBe(true); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（コンストラクタ実行後に設定）', () => {
            it('CONF_DATA_INDEX_ID が 0', () => { expect(CConfBase.CONF_DATA_INDEX_ID).toBe(0); });
            it('CONF_DATA_INDEX_TEXT が 1', () => { expect(CConfBase.CONF_DATA_INDEX_TEXT).toBe(1); });
            it('CONF_DATA_INDEX_CONTROL_TYPE が 2', () => { expect(CConfBase.CONF_DATA_INDEX_CONTROL_TYPE).toBe(2); });
            it('CONF_DATA_INDEX_DEFAULT_VALUE が 3', () => { expect(CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE).toBe(3); });
            it('CONF_DATA_INDEX_MIN_VALUE が 4', () => { expect(CConfBase.CONF_DATA_INDEX_MIN_VALUE).toBe(4); });
            it('CONF_DATA_INDEX_MAX_VALUE が 5', () => { expect(CConfBase.CONF_DATA_INDEX_MAX_VALUE).toBe(5); });
            it('CONF_DATA_INDEX_TOOL_TIP が 6', () => { expect(CConfBase.CONF_DATA_INDEX_TOOL_TIP).toBe(6); });
            it('ConfText が関数', () => { expect(typeof CConfBase.ConfText).toBe('function'); });
            it('ConfControlType が関数', () => { expect(typeof CConfBase.ConfControlType).toBe('function'); });
            it('ConfDefaultValue が関数', () => { expect(typeof CConfBase.ConfDefaultValue).toBe('function'); });
            it('ConfMinValue が関数', () => { expect(typeof CConfBase.ConfMinValue).toBe('function'); });
            it('ConfMaxValue が関数', () => { expect(typeof CConfBase.ConfMaxValue).toBe('function'); });
            it('OnClickSwitchHandler が関数', () => { expect(typeof CConfBase.OnClickSwitchHandler).toBe('function'); });
            it('OnChangeValueHandler が関数', () => { expect(typeof CConfBase.OnChangeValueHandler).toBe('function'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
            it('GetSwitchIdString が関数', () => { expect(typeof inst.GetSwitchIdString).toBe('function'); });
            it('GetControlIdString が関数', () => { expect(typeof inst.GetControlIdString).toBe('function'); });
            it('BuildUpSelectArea が関数', () => { expect(typeof inst.BuildUpSelectArea).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('SyncronizeSettingsVarToCtrl が関数', () => { expect(typeof inst.SyncronizeSettingsVarToCtrl).toBe('function'); });
            it('SyncronizeSettingsCtrlToVar が関数', () => { expect(typeof inst.SyncronizeSettingsCtrlToVar).toBe('function'); });
            it('OnClickSwitch が関数', () => { expect(typeof inst.OnClickSwitch).toBe('function'); });
            it('OnChangeValue が関数', () => { expect(typeof inst.OnChangeValue).toBe('function'); });
            it('RefreshSelectAreaHeader が関数', () => { expect(typeof inst.RefreshSelectAreaHeader).toBe('function'); });
            it('RefreshControlCSS が関数', () => { expect(typeof inst.RefreshControlCSS).toBe('function'); });
            it('OnSaveDataLoaded が関数', () => { expect(typeof inst.OnSaveDataLoaded).toBe('function'); });
        });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(3)).toBe('OBJID_CONTROL_CONF_3_HEADER');
            });
        });
    });

    describe('window互換確認', () => {
        it('window.CConfBase が設定されている', () => {
            expect((window as any).CConfBase).toBe(CConfBase);
        });
        it('window.CTargetData が設定されている', () => {
            expect((window as any).CTargetData).toBe(CTargetData);
        });
    });
});
