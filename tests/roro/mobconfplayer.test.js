// CONTROL_TYPE_* 定数は CConfBase.js の DefineEnum で定義される。mobconfplayer.js の
// 初期化関数 InitMobConfPlayerData() がモジュール評価時に呼ばれるため先にロードが必要。
import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/CConfBase.js';
import { describe, it, expect } from 'vitest';
import {
    MobConfPlayerText,
    MobConfPlayerControlType,
    MobConfPlayerDefaultValue,
    MobConfPlayerMinValue,
    MobConfPlayerMaxValue,
    InitMobConfPlayerData,
    BuildUpMobConfPlayerSelectArea,
    SyncronizeMobConfPlayerSettingsVarToCtrl,
    SyncronizeMobConfPlayerSettingsCtrlToVar,
    OnClickMobConfPlayerSwitch,
    OnChangeMobConfPlayer,
    RefreshMobConfPlayerSelectAreaHeader,
    RefreshMobConfPlayerControlCSS,
} from '../../roro/m/js/mobconfplayer.js';

describe('mobconfplayer', () => {
    it('全関数を export する', () => {
        expect(typeof MobConfPlayerText).toBe('function');
        expect(typeof MobConfPlayerControlType).toBe('function');
        expect(typeof MobConfPlayerDefaultValue).toBe('function');
        expect(typeof MobConfPlayerMinValue).toBe('function');
        expect(typeof MobConfPlayerMaxValue).toBe('function');
        expect(typeof InitMobConfPlayerData).toBe('function');
        expect(typeof BuildUpMobConfPlayerSelectArea).toBe('function');
        expect(typeof SyncronizeMobConfPlayerSettingsVarToCtrl).toBe('function');
        expect(typeof SyncronizeMobConfPlayerSettingsCtrlToVar).toBe('function');
        expect(typeof OnClickMobConfPlayerSwitch).toBe('function');
        expect(typeof OnChangeMobConfPlayer).toBe('function');
        expect(typeof RefreshMobConfPlayerSelectAreaHeader).toBe('function');
        expect(typeof RefreshMobConfPlayerControlCSS).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.InitMobConfPlayerData).toBe(InitMobConfPlayerData);
        expect(window.OnClickMobConfPlayerSwitch).toBe(OnClickMobConfPlayerSwitch);
        expect(window.OnChangeMobConfPlayer).toBe(OnChangeMobConfPlayer);
        expect(window.SyncronizeMobConfPlayerSettingsVarToCtrl).toBe(SyncronizeMobConfPlayerSettingsVarToCtrl);
        expect(window.SyncronizeMobConfPlayerSettingsCtrlToVar).toBe(SyncronizeMobConfPlayerSettingsCtrlToVar);
    });

    it('window.MOB_CONF_PLAYER_LIMIT が 54 に設定される', () => {
        expect(window.MOB_CONF_PLAYER_LIMIT).toBe(54);
    });

    it('window.n_B_TAISEI が配列として設定される', () => {
        expect(Array.isArray(window.n_B_TAISEI)).toBe(true);
    });

    it('window.MobConfPlayerOBJ が設定される', () => {
        expect(window.MobConfPlayerOBJ).toBeDefined();
    });

    it('MobConfPlayerText はラッパー関数', () => {
        expect(MobConfPlayerText(42)).toBe(42);
    });

    it('MobConfPlayerDefaultValue はラッパー関数', () => {
        expect(MobConfPlayerDefaultValue(0)).toBe(0);
    });
});
