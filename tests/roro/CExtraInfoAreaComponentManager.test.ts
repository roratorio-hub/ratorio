import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // Phase 3b 以降、import チェーンが CShadowEquipController.initializeHTML() に到達する。
    // mockEl に querySelectorAll が必要。また calchistory.js の $ もモック。
    (globalThis as any).$ = (_fn: any) => {};
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
        querySelectorAll: () => [],
        querySelector: () => null,
        addEventListener: () => {},
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
        it('dispDataMap が Map', () => expect(CExtraInfoAreaComponentManager.dispDataMap instanceof Map).toBe(true));
    });
});
