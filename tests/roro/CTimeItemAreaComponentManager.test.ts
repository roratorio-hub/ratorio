import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockEl = {
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        getAttribute: () => null,
        style: { whiteSpace: '' },
        focus: () => {},
    };
    (document as any).getElementById = () => mockEl;
    (globalThis as any).HtmlRemoveAllChild = () => {};
    (globalThis as any).HtmlCreateElement = () => mockEl;
    (globalThis as any).HtmlCreateTextNode = () => {};
    (globalThis as any).HtmlCreateElementOption = () => {};
    (globalThis as any).HtmlSetObjectValueById = () => {};
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 0;
    (globalThis as any).AutoCalc = () => {};
    (globalThis as any).CustomizeSelect2Specify = () => {};
    (globalThis as any).g_timeItemConf = [];
    (globalThis as any).g_timeItemConfEffective = [];
    (globalThis as any).ITEM_SP_TIME_OBJ_SORT = [];
    (globalThis as any).ITEM_SP_TIME_OBJ = [];
    (globalThis as any).CBattleQuickControlAreaComponentManager = { RebuildControls: () => {} };
    (globalThis as any).$ = () => ({ hasClass: () => false, select2: () => {}, addClass: () => {}, removeClass: () => {} });
});

import { CTimeItemAreaComponentManager } from '@roro/CTimeItemAreaComponentManager.js';

describe('CTimeItemAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('CTimeItemAreaComponentManager が関数', () => {
            expect(typeof CTimeItemAreaComponentManager).toBe('function');
        });
        it('RebuildControls が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.RebuildControls).toBe('function');
        });
        it('OnClickExtractSwitch が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.OnClickExtractSwitch).toBe('function');
        });
        it('OnChangeConf が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.OnChangeConf).toBe('function');
        });
        it('RefreshTimeItemAreaHeader が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.RefreshTimeItemAreaHeader).toBe('function');
        });
        it('RefreshControlCSS が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.RefreshControlCSS).toBe('function');
        });
        it('OpenArea が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.OpenArea).toBe('function');
        });
        it('CloseArea が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.CloseArea).toBe('function');
        });
        it('FocusArea が関数', () => {
            expect(typeof CTimeItemAreaComponentManager.FocusArea).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CTimeItemAreaComponentManager が設定されている', () => {
            expect((window as any).CTimeItemAreaComponentManager).toBe(CTimeItemAreaComponentManager);
        });
    });
});
