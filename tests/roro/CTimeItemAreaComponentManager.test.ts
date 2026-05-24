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
});

vi.mock('../../roro/common/js/util.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, HtmlRemoveAllChild: () => {} };
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
});
