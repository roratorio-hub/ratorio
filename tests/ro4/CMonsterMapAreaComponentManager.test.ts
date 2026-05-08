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
    describe('エクスポート確認', () => {
        it('CMonsterMapAreaComponentManager が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager).toBe('function');
        });
        it('RebuildControls が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.RebuildControls).toBe('function');
        });
        it('OnClickExtractSwitch が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.OnClickExtractSwitch).toBe('function');
        });
        it('GetCategoryId が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.GetCategoryId).toBe('function');
        });
        it('GetMapId が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.GetMapId).toBe('function');
        });
        it('GetMonsterId が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.GetMonsterId).toBe('function');
        });
        it('ChangeSelect が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.ChangeSelect).toBe('function');
        });
        it('ResetSelect が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.ResetSelect).toBe('function');
        });
        it('SetDispObject が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.SetDispObject).toBe('function');
        });
        it('RefreshtDispObject が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.RefreshtDispObject).toBe('function');
        });
        it('updateMonsterSuggest が関数', () => {
            expect(typeof CMonsterMapAreaComponentManager.updateMonsterSuggest).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CMonsterMapAreaComponentManager が設定されている', () => {
            expect((window as any).CMonsterMapAreaComponentManager).toBe(CMonsterMapAreaComponentManager);
        });
    });
});
