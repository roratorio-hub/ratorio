import { describe, it, expect, beforeAll } from 'vitest';

// RebuildControls() がモジュール評価時に実行されるため、
// Html* ユーティリティ関数をモックしてから動的 import する。
let CTimeItemAreaComponentManager;

beforeAll(async () => {
    window.HtmlRemoveAllChild    = () => {};
    window.HtmlCreateElement     = () => document.createElement('div');
    window.HtmlCreateTextNode    = () => {};
    window.HtmlSetAttribute      = () => {};
    window.HtmlCreateElementOption = () => {};
    const mod = await import('../../roro/m/js/CTimeItemAreaComponentManager.js');
    CTimeItemAreaComponentManager = mod.CTimeItemAreaComponentManager;
});

describe('CTimeItemAreaComponentManager', () => {
    it('CTimeItemAreaComponentManager を export する', () => {
        expect(typeof CTimeItemAreaComponentManager).toBe('function');
    });

    it('window compat ブロックで window.CTimeItemAreaComponentManager が設定される', () => {
        expect(window.CTimeItemAreaComponentManager).toBe(CTimeItemAreaComponentManager);
    });

    it('static メソッドが定義される', () => {
        expect(typeof CTimeItemAreaComponentManager.RebuildControls).toBe('function');
        expect(typeof CTimeItemAreaComponentManager.OnClickExtractSwitch).toBe('function');
        expect(typeof CTimeItemAreaComponentManager.OpenArea).toBe('function');
    });
});
