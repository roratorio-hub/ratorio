import { vi, describe, it, expect } from 'vitest';

vi.mock('../../roro/m/js/CCustomSelectMapCategory.js', () => ({
    CCustomSelectMapCategory: function () {
        return {
            GetRootObject: function () { return { style: {}, setAttribute: function(){}, appendChild: function(){} }; },
            GetSelectedDataId: function () { return 0; },
            ChangeSelectedDataId: function () { return 0; },
            ResetSelect: function () {},
        };
    }
}));

vi.mock('../../roro/m/js/CCustomSelectMapMap.js', () => ({
    CCustomSelectMapMap: function () {
        return {
            GetRootObject: function () { return { style: {}, setAttribute: function(){}, appendChild: function(){} }; },
            GetSelectedDataId: function () { return 0; },
            ChangeSelectedDataId: function () { return 0; },
            ResetSelect: function () {},
        };
    }
}));

vi.mock('../../roro/m/js/CCustomSelectMapMonster.js', () => ({
    CCustomSelectMapMonster: function () {
        return {
            GetRootObject: function () { return { style: {}, setAttribute: function(){}, appendChild: function(){} }; },
            GetSelectedDataId: function () { return 0; },
            ChangeSelectedDataId: function () { return 0; },
            ResetSelect: function () {},
        };
    }
}));

vi.hoisted(() => {
    const mockEl = {
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        style: {
            whiteSpace: '',
            padding: '',
            display: '',
            justifyContent: '',
            alignItems: '',
            visibility: '',
            color: '',
        },
        value: 0,
        className: '',
    };
    (document as any).getElementById = () => mockEl;
    (document as any).createElement = () => mockEl;
    (globalThis as any).HtmlRemoveAllChild = () => {};
    (globalThis as any).HtmlCreateElement = () => mockEl;
    (globalThis as any).HtmlCreateTextNode = () => {};
    (globalThis as any).MonsterToughness = {
        getMobName: () => '',
        getToughnessCode: () => null,
        getNotification: () => null,
    };
});

import { CMonsterMapAreaComponentManager } from '@ro4/CMonsterMapAreaComponentManager.js';

describe('CMonsterMapAreaComponentManager.js', () => {
    it.todo('動作テストを追加する');
});

