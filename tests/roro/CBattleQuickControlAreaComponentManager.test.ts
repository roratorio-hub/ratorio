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
});

vi.mock('../../roro/common/js/util.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, HtmlRemoveAllChild: () => {} };
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
});
