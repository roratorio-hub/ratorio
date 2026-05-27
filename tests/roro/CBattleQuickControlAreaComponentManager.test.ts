import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockEl = {
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        style: { whiteSpace: '' },
        dispatchEvent: () => {},
        value: 0,
    };
    (document as any).getElementById = () => mockEl;
    (globalThis as any).HtmlRemoveAllChild = () => {};
    (globalThis as any).HtmlCreateElement = () => mockEl;
    (globalThis as any).HtmlCreateTextNode = () => {};
    (globalThis as any).HtmlCreateElementOption = () => {};
    (globalThis as any).HtmlSetObjectValueById = () => {};
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 1;
    (globalThis as any).g_timeItemConf = [];
    (globalThis as any).g_timeItemConfEffective = [];
    (globalThis as any).g_timeItemConfAllEffective = 1;
});

import { CBattleQuickControlAreaComponentManager } from '@roro/CBattleQuickControlAreaComponentManager.js';

describe('CBattleQuickControlAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('CBattleQuickControlAreaComponentManager が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager).toBe('function');
        });
        it('RebuildControls が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.RebuildControls).toBe('function');
        });
        it('OnClickExtractSwitch が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.OnClickExtractSwitch).toBe('function');
        });
        it('OnClickFocusTimeItemArea が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.OnClickFocusTimeItemArea).toBe('function');
        });
        it('OnChangeTimeItemEffective が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.OnChangeTimeItemEffective).toBe('function');
        });
        it('RefreshBattleQuickControlAreaHeader が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.RefreshBattleQuickControlAreaHeader).toBe('function');
        });
        it('RefreshControlCSS が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.RefreshControlCSS).toBe('function');
        });
        it('AllSet が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.AllSet).toBe('function');
        });
        it('OpenArea が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.OpenArea).toBe('function');
        });
        it('CloseArea が関数', () => {
            expect(typeof CBattleQuickControlAreaComponentManager.CloseArea).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CBattleQuickControlAreaComponentManager が設定されている', () => {
            expect((window as any).CBattleQuickControlAreaComponentManager).toBe(CBattleQuickControlAreaComponentManager);
        });
    });
});
