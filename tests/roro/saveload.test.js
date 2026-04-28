import { describe, it, expect } from 'vitest';
// CGlobalConstManager.js を先にインポートして DefineEnum を確立する
import '../../roro/m/js/CGlobalConstManager.js';
// CConfBase.js が CONTROL_TYPE_* を DefineEnum で設定する (mobconfplayer.js が依存)
import '../../roro/m/js/CConfBase.js';
// mobconfplayer.js が MOB_CONF_PLAYER_ID_* を設定する (saveload.js が依存)
import '../../roro/m/js/mobconfplayer.js';
import '../../roro/m/js/saveload.js';

describe('saveload', () => {
    it('定数 CURRENT_VERSION が window に設定される', () => {
        expect(typeof window.CURRENT_VERSION).toBe('number');
        expect(window.CURRENT_VERSION).toBe(54);
    });

    it('定数 SAVE_DATA_BIAS_CONF_PLAYER_500 が window に設定される', () => {
        expect(window.SAVE_DATA_BIAS_CONF_PLAYER_500).toBe(500);
    });

    it('定数 BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500 が window に設定される', () => {
        expect(Array.isArray(window.BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500)).toBe(true);
        expect(window.BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.length).toBeGreaterThan(0);
    });

    it('関数が window に設定される', () => {
        expect(typeof window.GetSaveDataVersion).toBe('function');
        expect(typeof window.SaveButton).toBe('function');
        expect(typeof window.GetExpireDateString).toBe('function');
        expect(typeof window.GetExpireDateStringToDelete).toBe('function');
        expect(typeof window.GetExpireDateStringSub).toBe('function');
        expect(typeof window.SaveSystem).toBe('function');
        expect(typeof window.VersionModify).toBe('function');
        expect(typeof window.LoadButton).toBe('function');
        expect(typeof window.URLIN).toBe('function');
        expect(typeof window.AdaptSaveDataStrSize).toBe('function');
        expect(typeof window.DecodeUrl).toBe('function');
        expect(typeof window.LoadCookie3).toBe('function');
        expect(typeof window.SaveCookieConf).toBe('function');
        expect(typeof window.LoadCookieConf).toBe('function');
        expect(typeof window.SaveDataChange).toBe('function');
        expect(typeof window.aaa).toBe('function');
        expect(typeof window.NumA).toBe('function');
        expect(typeof window.NtoS2).toBe('function');
        expect(typeof window.StoNx).toBe('function');
        expect(typeof window.StoN2).toBe('function');
        expect(typeof window.OnClickUrlIn).toBe('function');
    });

    it('DecodeUrl: eqpRgn 宣言漏れの回帰確認', () => {
        const src = window.DecodeUrl.toString();
        expect(src).toContain('var eqpRgn');
    });

    it('LoadCookie3: SaveDataAll を window.SaveDataAll で設定する回帰確認', () => {
        const src = window.LoadCookie3.toString();
        expect(src).toContain('window.SaveDataAll');
    });

    it('LoadCookieConf: SaveData / wStr / wLCF / i 宣言漏れの回帰確認', () => {
        const src = window.LoadCookieConf.toString();
        expect(src).toContain('var SaveData');
        expect(src).toContain('var wStr');
        expect(src).toContain('var wLCF');
        expect(src).toContain('var i');
    });

    it('SaveCookieConf: SaveData 宣言漏れの回帰確認', () => {
        const src = window.SaveCookieConf.toString();
        expect(src).toContain('var SaveData');
    });

    it('SaveCookieConf: SaveNameAll を window.SaveNameAll で設定する回帰確認', () => {
        const src = window.SaveCookieConf.toString();
        expect(src).toContain('window.SaveNameAll');
    });

    it('SaveSystem: SaveData 宣言漏れの回帰確認 (OnClickUrlOutMIG 経由で ReferenceError が発生しない)', () => {
        const src = window.SaveSystem.toString();
        expect(src).toContain('var SaveData');
    });
});
