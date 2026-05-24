import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import {
    MOB_CONF_BUF_LIMIT,
    n_B_KYOUKA,
    MobConfBufOBJ,
    MOB_CONF_BUF_DATA_INDEX_ID,
    MOB_CONF_BUF_DATA_INDEX_TEXT,
    MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE,
    MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE,
    MOB_CONF_BUF_DATA_INDEX_MIN_VALUE,
    MOB_CONF_BUF_DATA_INDEX_MAX_VALUE,
    MOB_CONF_BUF_ID_SOKUDO_ZOKA,
    MOB_CONF_BUF_ID_ASSUMPTIO,
    MOB_CONF_BUF_ID_ADRENALINE_RUSH,
    MOB_CONF_BUF_ID_MAXIMIZE_POWER,
    MOB_CONF_BUF_ID_RUSH_ATTACK,
    MOB_CONF_BUF_ID_SOKUDO_KYOKA,
    MOB_CONF_BUF_ID_ZOKUSEI_HENKA,
    MOB_CONF_BUF_ID_STONE_SKIN,
    MOB_CONF_BUF_ID_ANTI_MAGIC,
    MOB_CONF_BUF_ID_KEEPING,
    MOB_CONF_BUF_ID_DEFENDER,
    MOB_CONF_BUF_ID_REBIRTH,
    MOB_CONF_BUF_ID_DAMAGE_DIVIDE,
    MOB_CONF_BUF_ID_MAX_PAIN,
    BuildUpMobConfBufSelectArea,
    SyncronizeMobConfBufSettingsVarToCtrl,
    SyncronizeMobConfBufSettingsCtrlToVar,
    OnClickMobConfBufSwitch,
    OnChangeMobConfBuf,
    RefreshMobConfBufSelectAreaHeader,
    RefreshMobConfBufControlCSS,
} from '@roro/mobconfbuf.js';

describe('mobconfbuf.js', () => {
    describe('エクスポート確認', () => {
        it('MOB_CONF_BUF_LIMIT が 80', () => { expect(MOB_CONF_BUF_LIMIT).toBe(80); });
        it('n_B_KYOUKA が配列', () => { expect(Array.isArray(n_B_KYOUKA)).toBe(true); });
        it('MobConfBufOBJ が配列', () => { expect(Array.isArray(MobConfBufOBJ)).toBe(true); });
        it('MOB_CONF_BUF_DATA_INDEX_ID が 0', () => { expect(MOB_CONF_BUF_DATA_INDEX_ID).toBe(0); });
        it('MOB_CONF_BUF_DATA_INDEX_TEXT が 1', () => { expect(MOB_CONF_BUF_DATA_INDEX_TEXT).toBe(1); });
        it('MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE が 2', () => { expect(MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE).toBe(2); });
        it('MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE が 3', () => { expect(MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE).toBe(3); });
        it('MOB_CONF_BUF_DATA_INDEX_MIN_VALUE が 4', () => { expect(MOB_CONF_BUF_DATA_INDEX_MIN_VALUE).toBe(4); });
        it('MOB_CONF_BUF_DATA_INDEX_MAX_VALUE が 5', () => { expect(MOB_CONF_BUF_DATA_INDEX_MAX_VALUE).toBe(5); });
        it('MOB_CONF_BUF_ID_SOKUDO_ZOKA が 0', () => { expect(MOB_CONF_BUF_ID_SOKUDO_ZOKA).toBe(0); });
        it('MOB_CONF_BUF_ID_ASSUMPTIO が 1', () => { expect(MOB_CONF_BUF_ID_ASSUMPTIO).toBe(1); });
        it('MOB_CONF_BUF_ID_ADRENALINE_RUSH が 2', () => { expect(MOB_CONF_BUF_ID_ADRENALINE_RUSH).toBe(2); });
        it('MOB_CONF_BUF_ID_MAXIMIZE_POWER が 3', () => { expect(MOB_CONF_BUF_ID_MAXIMIZE_POWER).toBe(3); });
        it('MOB_CONF_BUF_ID_RUSH_ATTACK が 4', () => { expect(MOB_CONF_BUF_ID_RUSH_ATTACK).toBe(4); });
        it('MOB_CONF_BUF_ID_SOKUDO_KYOKA が 5', () => { expect(MOB_CONF_BUF_ID_SOKUDO_KYOKA).toBe(5); });
        it('MOB_CONF_BUF_ID_ZOKUSEI_HENKA が 6', () => { expect(MOB_CONF_BUF_ID_ZOKUSEI_HENKA).toBe(6); });
        it('MOB_CONF_BUF_ID_STONE_SKIN が 7', () => { expect(MOB_CONF_BUF_ID_STONE_SKIN).toBe(7); });
        it('MOB_CONF_BUF_ID_ANTI_MAGIC が 8', () => { expect(MOB_CONF_BUF_ID_ANTI_MAGIC).toBe(8); });
        it('MOB_CONF_BUF_ID_KEEPING が 9', () => { expect(MOB_CONF_BUF_ID_KEEPING).toBe(9); });
        it('MOB_CONF_BUF_ID_DEFENDER が 10', () => { expect(MOB_CONF_BUF_ID_DEFENDER).toBe(10); });
        it('MOB_CONF_BUF_ID_REBIRTH が 11', () => { expect(MOB_CONF_BUF_ID_REBIRTH).toBe(11); });
        it('MOB_CONF_BUF_ID_DAMAGE_DIVIDE が 12', () => { expect(MOB_CONF_BUF_ID_DAMAGE_DIVIDE).toBe(12); });
        it('MOB_CONF_BUF_ID_MAX_PAIN が 13', () => { expect(MOB_CONF_BUF_ID_MAX_PAIN).toBe(13); });
        it('BuildUpMobConfBufSelectArea が関数', () => { expect(typeof BuildUpMobConfBufSelectArea).toBe('function'); });
        it('SyncronizeMobConfBufSettingsVarToCtrl が関数', () => { expect(typeof SyncronizeMobConfBufSettingsVarToCtrl).toBe('function'); });
        it('SyncronizeMobConfBufSettingsCtrlToVar が関数', () => { expect(typeof SyncronizeMobConfBufSettingsCtrlToVar).toBe('function'); });
        it('OnClickMobConfBufSwitch が関数', () => { expect(typeof OnClickMobConfBufSwitch).toBe('function'); });
        it('OnChangeMobConfBuf が関数', () => { expect(typeof OnChangeMobConfBuf).toBe('function'); });
        it('RefreshMobConfBufSelectAreaHeader が関数', () => { expect(typeof RefreshMobConfBufSelectAreaHeader).toBe('function'); });
        it('RefreshMobConfBufControlCSS が関数', () => { expect(typeof RefreshMobConfBufControlCSS).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.n_B_KYOUKA が設定されている', () => { expect(Array.isArray((window as any).n_B_KYOUKA)).toBe(true); });
        it('window.MOB_CONF_BUF_ID_SOKUDO_ZOKA が設定されている', () => { expect((window as any).MOB_CONF_BUF_ID_SOKUDO_ZOKA).toBe(0); });
    });

    describe('MobConfBufOBJ 初期化確認', () => {
        it('MobConfBufOBJ が 14 件', () => { expect(MobConfBufOBJ.length).toBe(14); });
        it('n_B_KYOUKA が長さ MOB_CONF_BUF_LIMIT の配列', () => { expect(n_B_KYOUKA.length).toBe(MOB_CONF_BUF_LIMIT); });
    });
});
