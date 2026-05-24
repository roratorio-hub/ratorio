import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
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
import '@roro/CAttackMethodConf.js';
import { CAttackMethodAreaComponentManager } from '@ro4/CAttackMethodAreaComponentManager.js';

describe('CAttackMethodAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('CAttackMethodAreaComponentManager が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager).toBe('function');
        });

        it('attackMethodDataArray が配列', () => {
            expect(Array.isArray(CAttackMethodAreaComponentManager.attackMethodDataArray)).toBe(true);
        });
        it('labelObjectArray が配列', () => {
            expect(Array.isArray(CAttackMethodAreaComponentManager.labelObjectArray)).toBe(true);
        });
        it('selectObjectArray が配列', () => {
            expect(Array.isArray(CAttackMethodAreaComponentManager.selectObjectArray)).toBe(true);
        });

        it('RebuildControls が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildControls).toBe('function');
        });
        it('RefreshControls が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RefreshControls).toBe('function');
        });
        it('RebuildAttackMethodSelect が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildAttackMethodSelect).toBe('function');
        });
        it('RebuildAttackMethodSelectSubMethod が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubMethod).toBe('function');
        });
        it('RebuildAttackMethodSelectSubCreateMethodSelect が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubCreateMethodSelect).toBe('function');
        });
        it('RebuildAttackMethodSelectSubOption が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption).toBe('function');
        });
        it('RebuildAttackMethodSelectSubOptionSubCreate が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOptionSubCreate).toBe('function');
        });
        it('RebuildSettingArea が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.RebuildSettingArea).toBe('function');
        });
        it('OnChangeAttackMethod が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeAttackMethod).toBe('function');
        });
        it('OnChangeAttackMethodOption が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeAttackMethodOption).toBe('function');
        });
        it('OnChangeAutoCalc が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeAutoCalc).toBe('function');
        });
        it('OnChangeDigit3 が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeDigit3).toBe('function');
        });
        it('OnChangePointCap が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangePointCap).toBe('function');
        });
        it('OnChangeDpsActual が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeDpsActual).toBe('function');
        });
        it('OnChangeAttackInterval が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeAttackInterval).toBe('function');
        });
        it('OnChangeCastSimInterval が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.OnChangeCastSimInterval).toBe('function');
        });
        it('SetAttackMethodConf が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.SetAttackMethodConf).toBe('function');
        });
        it('GetSelectedValueArray が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.GetSelectedValueArray).toBe('function');
        });
        it('GetAttackMethodConf が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.GetAttackMethodConf).toBe('function');
        });
        it('GetAttackMethodData が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.GetAttackMethodData).toBe('function');
        });
        it('GetEffectiveAttackMethodDataArray が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArray).toBe('function');
        });
        it('GetEffectiveAttackMethodDataArraySubDistinctData が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArraySubDistinctData).toBe('function');
        });
        it('GetEffectiveAttackMethodDataArraySubExtractOptions が関数', () => {
            expect(typeof CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArraySubExtractOptions).toBe('function');
        });
        it('CreateNoticeBlock が関数（DOM依存のため呼び出し不可）', () => {
            expect(typeof CAttackMethodAreaComponentManager.CreateNoticeBlock).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CAttackMethodAreaComponentManager が設定されている', () => {
            expect((window as any).CAttackMethodAreaComponentManager).toBe(CAttackMethodAreaComponentManager);
        });
    });
});
