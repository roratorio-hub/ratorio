import { describe, it, expect, beforeAll } from 'vitest';

let CBattleQuickControlAreaComponentManager;

beforeAll(async () => {
    window.HtmlRemoveAllChild     = () => {};
    window.HtmlCreateElement      = () => document.createElement('div');
    window.HtmlCreateTextNode     = () => {};
    window.HtmlSetAttribute       = () => {};
    window.HtmlCreateElementOption = () => {};
    const mod = await import('../../roro/m/js/CBattleQuickControlAreaComponentManager.js');
    CBattleQuickControlAreaComponentManager = mod.CBattleQuickControlAreaComponentManager;
});

describe('CBattleQuickControlAreaComponentManager', () => {
    it('CBattleQuickControlAreaComponentManager を export する', () => {
        expect(typeof CBattleQuickControlAreaComponentManager).toBe('function');
    });

    it('window compat ブロックで window.CBattleQuickControlAreaComponentManager が設定される', () => {
        expect(window.CBattleQuickControlAreaComponentManager).toBe(CBattleQuickControlAreaComponentManager);
    });

    it('static メソッドが定義される', () => {
        expect(typeof CBattleQuickControlAreaComponentManager.RebuildControls).toBe('function');
        expect(typeof CBattleQuickControlAreaComponentManager.OnClickExtractSwitch).toBe('function');
        expect(typeof CBattleQuickControlAreaComponentManager.OpenArea).toBe('function');
        expect(typeof CBattleQuickControlAreaComponentManager.CloseArea).toBe('function');
        expect(typeof CBattleQuickControlAreaComponentManager.AllSet).toBe('function');
    });
});
