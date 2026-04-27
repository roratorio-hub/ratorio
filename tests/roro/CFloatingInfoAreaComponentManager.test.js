import { describe, it, expect, beforeAll } from 'vitest';
import '../../roro/m/js/CGlobalConstManager.js';

let CFloatingInfoAreaComponentManager;
let GetFloatingInfoText;

beforeAll(async () => {
    window.HtmlRemoveAllChild         = () => {};
    window.HtmlCreateElement          = () => document.createElement('div');
    window.HtmlCreateTextNode         = () => {};
    window.HtmlSetAttribute           = () => {};
    window.HtmlCreateElementOption    = () => {};
    window.CExtraInfoAreaComponentManager = function() {};
    const mod = await import('../../roro/m/js/CFloatingInfoAreaComponentManager.js');
    CFloatingInfoAreaComponentManager = mod.CFloatingInfoAreaComponentManager;
    GetFloatingInfoText = mod.GetFloatingInfoText;
});

describe('CFloatingInfoAreaComponentManager', () => {
    it('CFloatingInfoAreaComponentManager を export する', () => {
        expect(typeof CFloatingInfoAreaComponentManager).toBe('function');
    });

    it('GetFloatingInfoText を export する', () => {
        expect(typeof GetFloatingInfoText).toBe('function');
    });

    it('window compat ブロックで window.CFloatingInfoAreaComponentManager が設定される', () => {
        expect(window.CFloatingInfoAreaComponentManager).toBe(CFloatingInfoAreaComponentManager);
    });

    it('window compat ブロックで window.GetFloatingInfoText が設定される', () => {
        expect(window.GetFloatingInfoText).toBe(GetFloatingInfoText);
    });

    it('static メソッドが定義される', () => {
        expect(typeof CFloatingInfoAreaComponentManager.RebuildControls).toBe('function');
        expect(typeof CFloatingInfoAreaComponentManager.OpenArea).toBe('function');
        expect(typeof CFloatingInfoAreaComponentManager.CloseArea).toBe('function');
    });
});
