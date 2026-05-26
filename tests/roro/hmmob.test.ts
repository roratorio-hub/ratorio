import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // Phase 3b で hmjob.js が CAttackMethodAreaComponentManager を import するようになり
    // 連鎖的に CShadowEquipController.initializeHTML() が呼ばれる。
    // getElementById が null を返すと querySelectorAll で失敗するため mockEl を返す。
    // また calchistory.js の $(function(){...}) もモックが必要。
    (globalThis as any).$ = (_fn: any) => {};
    const mockEl = {
        querySelectorAll: () => [],
        querySelector: () => null,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        addEventListener: () => {},
        style: {},
    };
    (document as any).getElementById = () => mockEl;
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

import { UpdateMobDataHtml } from '@roro/hmmob.js';

describe('hmmob.js', () => {
    describe('エクスポート確認', () => {
        it('UpdateMobDataHtml が関数', () => {
            expect(typeof UpdateMobDataHtml).toBe('function');
        });
    });
});
