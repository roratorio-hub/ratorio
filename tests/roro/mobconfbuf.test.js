// CONTROL_TYPE_* 定数は CConfBase.js の DefineEnum で定義される。mobconfbuf.js の
// 初期化関数 InitMobConfBufData() がモジュール評価時に呼ばれるため先にロードが必要。
import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/CConfBase.js';
import { describe, it, expect } from 'vitest';
import {
    MobConfBufText,
    MobConfBufControlType,
    MobConfBufDefaultValue,
    MobConfBufMinValue,
    MobConfBufMaxValue,
    InitMobConfBufData,
    BuildUpMobConfBufSelectArea,
    SyncronizeMobConfBufSettingsVarToCtrl,
    SyncronizeMobConfBufSettingsCtrlToVar,
    OnClickMobConfBufSwitch,
    OnChangeMobConfBuf,
    RefreshMobConfBufSelectAreaHeader,
    RefreshMobConfBufControlCSS,
} from '../../roro/m/js/mobconfbuf.js';

describe('mobconfbuf', () => {
    it('全関数を export する', () => {
        expect(typeof MobConfBufText).toBe('function');
        expect(typeof MobConfBufControlType).toBe('function');
        expect(typeof MobConfBufDefaultValue).toBe('function');
        expect(typeof MobConfBufMinValue).toBe('function');
        expect(typeof MobConfBufMaxValue).toBe('function');
        expect(typeof InitMobConfBufData).toBe('function');
        expect(typeof BuildUpMobConfBufSelectArea).toBe('function');
        expect(typeof SyncronizeMobConfBufSettingsVarToCtrl).toBe('function');
        expect(typeof SyncronizeMobConfBufSettingsCtrlToVar).toBe('function');
        expect(typeof OnClickMobConfBufSwitch).toBe('function');
        expect(typeof OnChangeMobConfBuf).toBe('function');
        expect(typeof RefreshMobConfBufSelectAreaHeader).toBe('function');
        expect(typeof RefreshMobConfBufControlCSS).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.InitMobConfBufData).toBe(InitMobConfBufData);
        expect(window.OnClickMobConfBufSwitch).toBe(OnClickMobConfBufSwitch);
        expect(window.OnChangeMobConfBuf).toBe(OnChangeMobConfBuf);
        expect(window.SyncronizeMobConfBufSettingsVarToCtrl).toBe(SyncronizeMobConfBufSettingsVarToCtrl);
        expect(window.SyncronizeMobConfBufSettingsCtrlToVar).toBe(SyncronizeMobConfBufSettingsCtrlToVar);
    });

    it('window.MOB_CONF_BUF_LIMIT が 80 に設定される', () => {
        expect(window.MOB_CONF_BUF_LIMIT).toBe(80);
    });

    it('window.n_B_KYOUKA が配列として設定される', () => {
        expect(Array.isArray(window.n_B_KYOUKA)).toBe(true);
    });

    it('window.MobConfBufOBJ が設定される', () => {
        expect(window.MobConfBufOBJ).toBeDefined();
    });

    it('MobConfBufText はラッパー関数', () => {
        expect(MobConfBufText(42)).toBe(42);
    });

    it('MobConfBufDefaultValue はラッパー関数', () => {
        expect(MobConfBufDefaultValue(0)).toBe(0);
    });
});
