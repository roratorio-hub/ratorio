import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import {
    MOB_CONF_PLAYER_LIMIT,
    n_B_TAISEI,
    MobConfPlayerOBJ,
    MOB_CONF_PLAYER_DATA_INDEX_ID,
    MOB_CONF_PLAYER_DATA_INDEX_TEXT,
    MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE,
    MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE,
    MOB_CONF_PLAYER_DATA_INDEX_MIN_VALUE,
    MOB_CONF_PLAYER_DATA_INDEX_MAX_VALUE,
    MOB_CONF_PLAYER_ID_MAXHP,
    MOB_CONF_PLAYER_ID_DEF_DIV,
    MOB_CONF_PLAYER_ID_DEF_MINUS,
    MOB_CONF_PLAYER_ID_MDEF_DIV,
    MOB_CONF_PLAYER_ID_MDEF_MINUS,
    MOB_CONF_PLAYER_ID_FLEE,
    MOB_CONF_PLAYER_ID_LUCKY,
    MOB_CONF_PLAYER_ID_ZOKUSEI,
    MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI,
    MOB_CONF_PLAYER_ID_CHUGATA_TAISEI,
    MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI,
    MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI,
    MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI,
    MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI,
    MOB_CONF_PLAYER_ID_BUTSURI_TAISEI,
    MOB_CONF_PLAYER_ID_MAHOU_TAISEI,
    MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI,
    MOB_CONF_PLAYER_ID_ENERGY_COAT,
    MOB_CONF_PLAYER_ID_HANSHA_1,
    MOB_CONF_PLAYER_ID_HANSHA_2,
    MOB_CONF_PLAYER_ID_BASE_LV,
    MOB_CONF_PLAYER_ID_STR,
    MOB_CONF_PLAYER_ID_AGI,
    MOB_CONF_PLAYER_ID_VIT,
    MOB_CONF_PLAYER_ID_INT,
    MOB_CONF_PLAYER_ID_DEX,
    MOB_CONF_PLAYER_ID_LUK,
    MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI,
    MOB_CONF_PLAYER_ID_SHOZIZYURYO_SAIDAI,
    MOB_CONF_PLAYER_ID_SENTO_AREA_NONE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_GVG,
    MOB_CONF_PLAYER_ID_SENTO_AREA_PVP,
    MOB_CONF_PLAYER_ID_SENTO_AREA_URDR,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_MH,
    MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO,
    MOB_CONF_PLAYER_ID_SENTO_AREA,
    MOB_CONF_PLAYER_ID_KOGATA_TAISEI,
    MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN,
    MOB_CONF_PLAYER_ID_SHUZOKU_DORAM,
    MOB_CONF_PLAYER_ID_SHUZOKU,
    MOB_CONF_PLAYER_ID_RES,
    MOB_CONF_PLAYER_ID_MRES,
    BuildUpMobConfPlayerSelectArea,
    SyncronizeMobConfPlayerSettingsVarToCtrl,
    SyncronizeMobConfPlayerSettingsCtrlToVar,
    OnClickMobConfPlayerSwitch,
    OnChangeMobConfPlayer,
    RefreshMobConfPlayerSelectAreaHeader,
    RefreshMobConfPlayerControlCSS,
} from '@roro/mobconfplayer.js';

describe('mobconfplayer.js', () => {
    describe('エクスポート確認', () => {
        it('MOB_CONF_PLAYER_LIMIT が 54', () => { expect(MOB_CONF_PLAYER_LIMIT).toBe(54); });
        it('n_B_TAISEI が配列', () => { expect(Array.isArray(n_B_TAISEI)).toBe(true); });
        it('MobConfPlayerOBJ が配列', () => { expect(Array.isArray(MobConfPlayerOBJ)).toBe(true); });
        it('MOB_CONF_PLAYER_DATA_INDEX_ID が 0', () => { expect(MOB_CONF_PLAYER_DATA_INDEX_ID).toBe(0); });
        it('MOB_CONF_PLAYER_DATA_INDEX_TEXT が 1', () => { expect(MOB_CONF_PLAYER_DATA_INDEX_TEXT).toBe(1); });
        it('MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE が 2', () => { expect(MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE).toBe(2); });
        it('MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE が 3', () => { expect(MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE).toBe(3); });
        it('MOB_CONF_PLAYER_DATA_INDEX_MIN_VALUE が 4', () => { expect(MOB_CONF_PLAYER_DATA_INDEX_MIN_VALUE).toBe(4); });
        it('MOB_CONF_PLAYER_DATA_INDEX_MAX_VALUE が 5', () => { expect(MOB_CONF_PLAYER_DATA_INDEX_MAX_VALUE).toBe(5); });
        it('MOB_CONF_PLAYER_ID_MAXHP が 0', () => { expect(MOB_CONF_PLAYER_ID_MAXHP).toBe(0); });
        it('MOB_CONF_PLAYER_ID_DEF_DIV が 1', () => { expect(MOB_CONF_PLAYER_ID_DEF_DIV).toBe(1); });
        it('MOB_CONF_PLAYER_ID_DEF_MINUS が 2', () => { expect(MOB_CONF_PLAYER_ID_DEF_MINUS).toBe(2); });
        it('MOB_CONF_PLAYER_ID_MDEF_DIV が 3', () => { expect(MOB_CONF_PLAYER_ID_MDEF_DIV).toBe(3); });
        it('MOB_CONF_PLAYER_ID_MDEF_MINUS が 4', () => { expect(MOB_CONF_PLAYER_ID_MDEF_MINUS).toBe(4); });
        it('MOB_CONF_PLAYER_ID_FLEE が 5', () => { expect(MOB_CONF_PLAYER_ID_FLEE).toBe(5); });
        it('MOB_CONF_PLAYER_ID_LUCKY が 6', () => { expect(MOB_CONF_PLAYER_ID_LUCKY).toBe(6); });
        it('MOB_CONF_PLAYER_ID_ZOKUSEI が 7', () => { expect(MOB_CONF_PLAYER_ID_ZOKUSEI).toBe(7); });
        it('MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI が 8', () => { expect(MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI).toBe(8); });
        it('MOB_CONF_PLAYER_ID_CHUGATA_TAISEI が 9', () => { expect(MOB_CONF_PLAYER_ID_CHUGATA_TAISEI).toBe(9); });
        it('MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI が 10', () => { expect(MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI).toBe(10); });
        it('MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI が 11', () => { expect(MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI).toBe(11); });
        it('MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI が 12', () => { expect(MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI).toBe(12); });
        it('MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI が 13', () => { expect(MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI).toBe(13); });
        it('MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI が 14', () => { expect(MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI).toBe(14); });
        it('MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI が 15', () => { expect(MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI).toBe(15); });
        it('MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI が 16', () => { expect(MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI).toBe(16); });
        it('MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI が 17', () => { expect(MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI).toBe(17); });
        it('MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI が 18', () => { expect(MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI).toBe(18); });
        it('MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI が 19', () => { expect(MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI).toBe(19); });
        it('MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI が 20', () => { expect(MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI).toBe(20); });
        it('MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI が 21', () => { expect(MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI).toBe(21); });
        it('MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI が 22', () => { expect(MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI).toBe(22); });
        it('MOB_CONF_PLAYER_ID_BUTSURI_TAISEI が 23', () => { expect(MOB_CONF_PLAYER_ID_BUTSURI_TAISEI).toBe(23); });
        it('MOB_CONF_PLAYER_ID_MAHOU_TAISEI が 24', () => { expect(MOB_CONF_PLAYER_ID_MAHOU_TAISEI).toBe(24); });
        it('MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI が 25', () => { expect(MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI).toBe(25); });
        it('MOB_CONF_PLAYER_ID_ENERGY_COAT が 26', () => { expect(MOB_CONF_PLAYER_ID_ENERGY_COAT).toBe(26); });
        it('MOB_CONF_PLAYER_ID_HANSHA_1 が 27', () => { expect(MOB_CONF_PLAYER_ID_HANSHA_1).toBe(27); });
        it('MOB_CONF_PLAYER_ID_HANSHA_2 が 28', () => { expect(MOB_CONF_PLAYER_ID_HANSHA_2).toBe(28); });
        it('MOB_CONF_PLAYER_ID_BASE_LV が 29', () => { expect(MOB_CONF_PLAYER_ID_BASE_LV).toBe(29); });
        it('MOB_CONF_PLAYER_ID_STR が 30', () => { expect(MOB_CONF_PLAYER_ID_STR).toBe(30); });
        it('MOB_CONF_PLAYER_ID_AGI が 31', () => { expect(MOB_CONF_PLAYER_ID_AGI).toBe(31); });
        it('MOB_CONF_PLAYER_ID_VIT が 32', () => { expect(MOB_CONF_PLAYER_ID_VIT).toBe(32); });
        it('MOB_CONF_PLAYER_ID_INT が 33', () => { expect(MOB_CONF_PLAYER_ID_INT).toBe(33); });
        it('MOB_CONF_PLAYER_ID_DEX が 34', () => { expect(MOB_CONF_PLAYER_ID_DEX).toBe(34); });
        it('MOB_CONF_PLAYER_ID_LUK が 35', () => { expect(MOB_CONF_PLAYER_ID_LUK).toBe(35); });
        it('MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI が 36', () => { expect(MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI).toBe(36); });
        it('MOB_CONF_PLAYER_ID_SHOZIZYURYO_SAIDAI が 37', () => { expect(MOB_CONF_PLAYER_ID_SHOZIZYURYO_SAIDAI).toBe(37); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA が 38', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA).toBe(38); });
        it('MOB_CONF_PLAYER_ID_KOGATA_TAISEI が 39', () => { expect(MOB_CONF_PLAYER_ID_KOGATA_TAISEI).toBe(39); });
        it('MOB_CONF_PLAYER_ID_SHUZOKU が 40', () => { expect(MOB_CONF_PLAYER_ID_SHUZOKU).toBe(40); });
        it('MOB_CONF_PLAYER_ID_RES が 41', () => { expect(MOB_CONF_PLAYER_ID_RES).toBe(41); });
        it('MOB_CONF_PLAYER_ID_MRES が 42', () => { expect(MOB_CONF_PLAYER_ID_MRES).toBe(42); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_NONE が 0', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_NONE).toBe(0); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_GVG が 1', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_GVG).toBe(1); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_PVP が 2', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_PVP).toBe(2); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_URDR が 3', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_URDR).toBe(3); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_YE が 4', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_YE).toBe(4); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_MH が 5', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_MH).toBe(5); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE が 6', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE).toBe(6); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE が 7', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE).toBe(7); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM が 8', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM).toBe(8); });
        it('MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO が 9', () => { expect(MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO).toBe(9); });
        it('MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN が 0', () => { expect(MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN).toBe(0); });
        it('MOB_CONF_PLAYER_ID_SHUZOKU_DORAM が 1', () => { expect(MOB_CONF_PLAYER_ID_SHUZOKU_DORAM).toBe(1); });
        it('BuildUpMobConfPlayerSelectArea が関数', () => { expect(typeof BuildUpMobConfPlayerSelectArea).toBe('function'); });
        it('SyncronizeMobConfPlayerSettingsVarToCtrl が関数', () => { expect(typeof SyncronizeMobConfPlayerSettingsVarToCtrl).toBe('function'); });
        it('SyncronizeMobConfPlayerSettingsCtrlToVar が関数', () => { expect(typeof SyncronizeMobConfPlayerSettingsCtrlToVar).toBe('function'); });
        it('OnClickMobConfPlayerSwitch が関数', () => { expect(typeof OnClickMobConfPlayerSwitch).toBe('function'); });
        it('OnChangeMobConfPlayer が関数', () => { expect(typeof OnChangeMobConfPlayer).toBe('function'); });
        it('RefreshMobConfPlayerSelectAreaHeader が関数', () => { expect(typeof RefreshMobConfPlayerSelectAreaHeader).toBe('function'); });
        it('RefreshMobConfPlayerControlCSS が関数', () => { expect(typeof RefreshMobConfPlayerControlCSS).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.MOB_CONF_PLAYER_LIMIT が設定されている', () => { expect((window as any).MOB_CONF_PLAYER_LIMIT).toBe(54); });
        it('window.n_B_TAISEI が設定されている', () => { expect(Array.isArray((window as any).n_B_TAISEI)).toBe(true); });
        it('window.MobConfPlayerOBJ が設定されている', () => { expect(Array.isArray((window as any).MobConfPlayerOBJ)).toBe(true); });
        it('window.MOB_CONF_PLAYER_DATA_INDEX_ID が設定されている', () => { expect((window as any).MOB_CONF_PLAYER_DATA_INDEX_ID).toBe(0); });
        it('window.MOB_CONF_PLAYER_ID_MAXHP が設定されている', () => { expect((window as any).MOB_CONF_PLAYER_ID_MAXHP).toBe(0); });
        it('window.MOB_CONF_PLAYER_ID_MRES が設定されている', () => { expect(typeof (window as any).MOB_CONF_PLAYER_ID_MRES).toBe('number'); });
        it('window.MOB_CONF_PLAYER_ID_SENTO_AREA_NONE が設定されている', () => { expect((window as any).MOB_CONF_PLAYER_ID_SENTO_AREA_NONE).toBe(0); });
        it('window.MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN が設定されている', () => { expect((window as any).MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN).toBe(0); });
        it('window.BuildUpMobConfPlayerSelectArea が設定されている', () => { expect(typeof (window as any).BuildUpMobConfPlayerSelectArea).toBe('function'); });
        it('window.SyncronizeMobConfPlayerSettingsVarToCtrl が設定されている', () => { expect(typeof (window as any).SyncronizeMobConfPlayerSettingsVarToCtrl).toBe('function'); });
        it('window.SyncronizeMobConfPlayerSettingsCtrlToVar が設定されている', () => { expect(typeof (window as any).SyncronizeMobConfPlayerSettingsCtrlToVar).toBe('function'); });
        it('window.OnClickMobConfPlayerSwitch が設定されている', () => { expect(typeof (window as any).OnClickMobConfPlayerSwitch).toBe('function'); });
        it('window.OnChangeMobConfPlayer が設定されている', () => { expect(typeof (window as any).OnChangeMobConfPlayer).toBe('function'); });
        it('window.RefreshMobConfPlayerSelectAreaHeader が設定されている', () => { expect(typeof (window as any).RefreshMobConfPlayerSelectAreaHeader).toBe('function'); });
        it('window.RefreshMobConfPlayerControlCSS が設定されている', () => { expect(typeof (window as any).RefreshMobConfPlayerControlCSS).toBe('function'); });
    });

    describe('MobConfPlayerOBJ 初期化確認', () => {
        it('MobConfPlayerOBJ が 43 件', () => { expect(MobConfPlayerOBJ.length).toBe(43); });
        it('n_B_TAISEI が長さ MOB_CONF_PLAYER_LIMIT の配列', () => { expect(n_B_TAISEI.length).toBe(MOB_CONF_PLAYER_LIMIT); });
    });
});
