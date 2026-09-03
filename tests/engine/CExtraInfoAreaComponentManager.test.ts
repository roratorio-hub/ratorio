import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // Phase 3b 以降、import チェーンが CShadowEquipController.initializeHTML() に到達する。
    // mockEl に querySelectorAll が必要。
    const mockEl = {
        value: '0',
        checked: false,
        appendChild: () => {},
        replaceChildren: () => {},
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

vi.mock('../../engine/runtime/util.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, HtmlRemoveAllChild: () => {} };
});

vi.mock('@engine/monster/monstermap.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return {
        ...actual,
        MONSTER_MAP_ID_MAP_ALL: -1,
        get g_MonsterMapDataArray() { return []; },
        get g_MonsterMapCategoryDataArray() { return []; },
    };
});

vi.mock('@engine/monster/monster.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get MonsterObjNew() { return []; } };
});

import '@engine/runtime/CInstanceManager.js';
import {
    GetExtraInfoText,
    CExtraInfoAreaComponentManager,
} from '@engine/ui/CExtraInfoAreaComponentManager.js';
import { DISP_DATA_KEY_STRDEX_BONUS, g_extraInfoDataBridge } from '@engine/ui/CExtraInfoDataBridge.js';

describe('CExtraInfoAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('dispDataMap が Map', () => expect(CExtraInfoAreaComponentManager.dispDataMap instanceof Map).toBe(true));
    });

    describe('STRボーナス（dispDataMap 連携）', () => {
        it('g_extraInfoDataBridge.setDispDataValue は battlecalc.js 等から dispDataMap への書き込みを中継する', () => {
            g_extraInfoDataBridge.setDispDataValue(DISP_DATA_KEY_STRDEX_BONUS, 42);
            expect(CExtraInfoAreaComponentManager.dispDataMap.get(DISP_DATA_KEY_STRDEX_BONUS)).toBe(42);
        });
    });
});
