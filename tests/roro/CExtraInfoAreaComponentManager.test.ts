import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockEl = {
        value: '0',
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        style: { fontSize: '' },
        className: '',
        options: [],
        selectedIndex: 0,
        innerHTML: '',
    };
    (document as any).getElementById = () => mockEl;
    (document as any).createElement = () => mockEl;
    (globalThis as any).HtmlRemoveAllChild = () => {};
    (globalThis as any).HtmlCreateElement = () => mockEl;
    (globalThis as any).HtmlCreateTextNode = () => {};
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 0;
    (globalThis as any).HtmlGetObjectValueById = () => '';
    (globalThis as any).HtmlGetElementById = () => mockEl;
    (globalThis as any).HtmlSetObjectValueById = () => {};
    (globalThis as any).HtmlCreateTextSpan = () => {};
});

import '@roro/CGlobalConstManager.js';
import '@roro/CInstanceManager.js';
import {
    GetExtraInfoText,
    CExtraInfoAreaComponentManager,
} from '@roro/CExtraInfoAreaComponentManager.js';

describe('CExtraInfoAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('GetExtraInfoText が関数', () => expect(typeof GetExtraInfoText).toBe('function'));
        it('CExtraInfoAreaComponentManager が関数', () => expect(typeof CExtraInfoAreaComponentManager).toBe('function'));

        it('instanceManager が定義済み', () => expect(CExtraInfoAreaComponentManager.instanceManager).toBeDefined());
        it('fontSizeClassName が文字列', () => expect(typeof CExtraInfoAreaComponentManager.fontSizeClassName).toBe('string'));
        it('dispDataMap が Map', () => expect(CExtraInfoAreaComponentManager.dispDataMap instanceof Map).toBe(true));

        it('setReferData が関数', () => expect(typeof CExtraInfoAreaComponentManager.setReferData).toBe('function'));
        it('OnChangeInfo が関数', () => expect(typeof CExtraInfoAreaComponentManager.OnChangeInfo).toBe('function'));
        it('RebuildDispArea が関数', () => expect(typeof CExtraInfoAreaComponentManager.RebuildDispArea).toBe('function'));
        it('RefreshDispArea が関数', () => expect(typeof CExtraInfoAreaComponentManager.RefreshDispArea).toBe('function'));
        it('RebuildAndRefreshDispArea が関数', () => expect(typeof CExtraInfoAreaComponentManager.RebuildAndRefreshDispArea).toBe('function'));
        it('ClearStoredValueAll が関数', () => expect(typeof CExtraInfoAreaComponentManager.ClearStoredValueAll).toBe('function'));
        it('RebuildDispAreaAll が関数', () => expect(typeof CExtraInfoAreaComponentManager.RebuildDispAreaAll).toBe('function'));
        it('RefreshDispAreaAll が関数', () => expect(typeof CExtraInfoAreaComponentManager.RefreshDispAreaAll).toBe('function'));
    });

    describe('window互換確認', () => {
        it('window.GetExtraInfoText', () => expect((window as any).GetExtraInfoText).toBe(GetExtraInfoText));
        it('window.CExtraInfoAreaComponentManager', () => expect((window as any).CExtraInfoAreaComponentManager).toBe(CExtraInfoAreaComponentManager));
    });
});
