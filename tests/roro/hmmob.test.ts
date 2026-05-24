import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    (document as any).getElementById = () => null;
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
