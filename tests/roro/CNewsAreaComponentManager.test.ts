import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockEl = {
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        getAttribute: () => null,
        style: {},
    };
    (document as any).getElementById = () => mockEl;
    (globalThis as any).HtmlRemoveAllChild = () => {};
    (globalThis as any).HtmlCreateElement = () => mockEl;
    (globalThis as any).HtmlCreateTextNode = () => {};
});

import { CNewsAreaComponentManager } from '@roro/CNewsAreaComponentManager.js';

describe('CNewsAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('CNewsAreaComponentManager が関数', () => {
            expect(typeof CNewsAreaComponentManager).toBe('function');
        });
        it('RebuildControls が関数', () => {
            expect(typeof CNewsAreaComponentManager.RebuildControls).toBe('function');
        });
        it('OnClickExtractSwitch が関数', () => {
            expect(typeof CNewsAreaComponentManager.OnClickExtractSwitch).toBe('function');
        });
        it('RefreshBattleQuickControlAreaHeader が関数', () => {
            expect(typeof CNewsAreaComponentManager.RefreshBattleQuickControlAreaHeader).toBe('function');
        });
        it('OpenArea が関数', () => {
            expect(typeof CNewsAreaComponentManager.OpenArea).toBe('function');
        });
        it('CloseArea が関数', () => {
            expect(typeof CNewsAreaComponentManager.CloseArea).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CNewsAreaComponentManager が設定されている', () => {
            expect((window as any).CNewsAreaComponentManager).toBe(CNewsAreaComponentManager);
        });
    });
});
