import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // CAttackMethodAreaComponentManager→CSaveController→calchistory.js の $(function(){...}) をモック
    (globalThis as any).$ = (_fn: any) => {};
    const mockEl = {
        checked: false,
        value: '0',
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        style: { fontSize: '' },
        className: '',
        options: [],
        selectedIndex: 0,
        querySelectorAll: () => [],
        querySelector: () => null,
        addEventListener: () => {},
    };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockEl as any);
    (document as any).createElement = () => mockEl;
    (globalThis as any).HtmlRemoveAllChild = () => {};
    (globalThis as any).HtmlCreateElement = () => mockEl;
    (globalThis as any).HtmlCreateTextNode = () => {};
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 0;
    (globalThis as any).HtmlGetObjectValueById = () => '';
    (globalThis as any).HtmlGetElementById = () => mockEl;
    (globalThis as any).HtmlSetObjectCheckedById = () => {};
    (globalThis as any).HtmlSetObjectValueById = () => {};
    (globalThis as any).HtmlSetObjectDisabledById = () => {};
    (globalThis as any).HtmlSetObjectVisibleById = () => {};
    (globalThis as any).HtmlSetObjectHiddenById = () => {};
    (globalThis as any).StAllCalc = () => {};
    (globalThis as any).AutoCalc = () => {};
    (globalThis as any).g_skillManager = {
        GetSkillName: () => '',
        GetMaxLv: () => 10,
        GetSkillId: () => 0,
    };
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

import '@engine/battle/CAttackMethodConf.js';
import { CAttackMethodAreaComponentManager } from '@engine/battle/CAttackMethodAreaComponentManager.js';

describe('CAttackMethodAreaComponentManager.js', () => {
    it.todo('動作テストを追加する');
});

