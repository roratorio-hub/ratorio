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
});

vi.mock('../../roro/common/js/util.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, HtmlRemoveAllChild: () => {} };
});

vi.mock('@roro/monstermap.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return {
        ...actual,
        MONSTER_MAP_ID_MAP_ALL: -1,
        get g_MonsterMapDataArray() { return []; },
        get g_MonsterMapCategoryDataArray() { return []; },
    };
});

vi.mock('@roro/monster.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get MonsterObjNew() { return []; } };
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
        it('window.CExtraInfoAreaComponentManager', () => expect((window as any).CExtraInfoAreaComponentManager).toBe(CExtraInfoAreaComponentManager));
    });
});
