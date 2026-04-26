// CONTROL_TYPE_* 定数は CConfBase.js の DefineEnum で定義される。mobconfdebuf.js の
// 初期化関数 InitMobConfDebufData() がモジュール評価時に呼ばれるため先にロードが必要。
import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/CConfBase.js';
import { describe, it, expect } from 'vitest';
import {
    MobConfDebufText,
    MobConfDebufControlType,
    MobConfDebufDefaultValue,
    MobConfDebufMinValue,
    MobConfDebufMaxValue,
    InitMobConfDebufData,
    BuildUpMobConfDebufSelectArea,
    SyncronizeMobConfDebufSettingsVarToCtrl,
    SyncronizeMobConfDebufSettingsCtrlToVar,
    OnClickMobConfDebufSwitch,
    OnChangeMobConfDebuf,
    RefreshMobConfDebufSelectAreaHeader,
    RefreshMobConfDebufControlCSS,
} from '../../roro/m/js/mobconfdebuf.js';

describe('mobconfdebuf', () => {
    it('全関数を export する', () => {
        expect(typeof MobConfDebufText).toBe('function');
        expect(typeof MobConfDebufControlType).toBe('function');
        expect(typeof MobConfDebufDefaultValue).toBe('function');
        expect(typeof MobConfDebufMinValue).toBe('function');
        expect(typeof MobConfDebufMaxValue).toBe('function');
        expect(typeof InitMobConfDebufData).toBe('function');
        expect(typeof BuildUpMobConfDebufSelectArea).toBe('function');
        expect(typeof SyncronizeMobConfDebufSettingsVarToCtrl).toBe('function');
        expect(typeof SyncronizeMobConfDebufSettingsCtrlToVar).toBe('function');
        expect(typeof OnClickMobConfDebufSwitch).toBe('function');
        expect(typeof OnChangeMobConfDebuf).toBe('function');
        expect(typeof RefreshMobConfDebufSelectAreaHeader).toBe('function');
        expect(typeof RefreshMobConfDebufControlCSS).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.InitMobConfDebufData).toBe(InitMobConfDebufData);
        expect(window.OnClickMobConfDebufSwitch).toBe(OnClickMobConfDebufSwitch);
        expect(window.OnChangeMobConfDebuf).toBe(OnChangeMobConfDebuf);
        expect(window.SyncronizeMobConfDebufSettingsVarToCtrl).toBe(SyncronizeMobConfDebufSettingsVarToCtrl);
        expect(window.SyncronizeMobConfDebufSettingsCtrlToVar).toBe(SyncronizeMobConfDebufSettingsCtrlToVar);
    });

    it('window.MOB_CONF_DEBUF_LIMIT が 80 に設定される', () => {
        expect(window.MOB_CONF_DEBUF_LIMIT).toBe(80);
    });

    it('window.n_B_IJYOU が配列として設定される', () => {
        expect(Array.isArray(window.n_B_IJYOU)).toBe(true);
    });

    it('window.MobConfDebufOBJ が設定される', () => {
        expect(window.MobConfDebufOBJ).toBeDefined();
    });

    it('MobConfDebufText はラッパー関数（引数をそのまま返す）', () => {
        expect(MobConfDebufText(42)).toBe(42);
    });

    it('MobConfDebufDefaultValue はラッパー関数', () => {
        expect(MobConfDebufDefaultValue(0)).toBe(0);
    });
});
