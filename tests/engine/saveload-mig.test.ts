import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
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
} from '@engine/savedata/saveload-mig.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';

describe('saveload-mig.js', () => {
    // dewindow: window.ConvertDataTextMIG / OnClickUrlOutMIG は engine-registry へ移行（旧 window 互換テストを置換）。
    // TypeScript 層（optInSavedata.ts）が registryGet('OnClickUrlOutMIG') 等で呼ぶ配線を検証する。
    describe('engine-registry 登録', () => {
        it('ConvertDataTextMIG が engine-registry に登録されている', () => {
            expect(registryGet('ConvertDataTextMIG')).toBe(ConvertDataTextMIG);
        });
        it('OnClickUrlOutMIG が engine-registry に登録されている', () => {
            expect(registryGet('OnClickUrlOutMIG')).toBe(OnClickUrlOutMIG);
        });
    });
});
