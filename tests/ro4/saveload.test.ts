import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // saveload→CSaveController→calchistory.js の $(function(){...}) をモック
    (globalThis as any).$ = (_fn: any) => {};
    const mockEl = {
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        style: { whiteSpace: '' },
        dispatchEvent: () => {},
        value: 0,
        querySelectorAll: () => [],
        querySelector: () => null,
        addEventListener: () => {},
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

import {
    OnClickSaveSaveData,
    OnClickClipboardSaveData,
    OnClickLoadSaveData,
    OnClickDeleteSaveData,
    OnClickUrlOutMIG,
    OnClickUrlInMIG,
    ConvertDataTextMIG,
    AdaptSaveDataStrSizeMIG,
    SaveDataChangeMIG,
    OnClickConfirmDialogSwitch,
} from '@ro4/saveload.js';

describe('saveload.js', () => {
    describe('window互換確認', () => {
        it('window.ConvertDataTextMIG が設定されている', () => {
            expect((window as any).ConvertDataTextMIG).toBe(ConvertDataTextMIG);
        });
    });
});
