import { vi, describe, it, expect } from 'vitest';

// vi.hoisted でモジュールロード前に DOM を準備する（静的インポート時に RebuildControls が実行されるため）
vi.hoisted(() => {
    document.body.innerHTML = '<div id="ID_FLOATING_INFO_AREA"></div>';
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

import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { GetFloatingInfoText, CFloatingInfoAreaInfoUnit, CFloatingInfoAreaComponentManager } from '@roro/CFloatingInfoAreaComponentManager.js';

describe('CFloatingInfoAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('GetFloatingInfoText が関数', () => { expect(typeof GetFloatingInfoText).toBe('function'); });
        it('CFloatingInfoAreaInfoUnit が関数', () => { expect(typeof CFloatingInfoAreaInfoUnit).toBe('function'); });
        it('CFloatingInfoAreaComponentManager が関数', () => { expect(typeof CFloatingInfoAreaComponentManager).toBe('function'); });
    });

    describe('定数確認', () => {
        it('FLOATING_INFO_ID_NONE が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_NONE).toBe('number'); });
        it('FLOATING_INFO_ID_STATUS が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_STATUS).toBe('number'); });
        it('FLOATING_INFO_ID_EXTRA_INFO が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_EXTRA_INFO).toBe('number'); });
        it('FLOATING_INFO_ID_NOTICE が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_NOTICE).toBe('number'); });
    });

    describe('静的プロパティ確認', () => {
        it('areaCount が数値', () => { expect(typeof CFloatingInfoAreaComponentManager.areaCount).toBe('number'); });
        it('areaCountMax が数値', () => { expect(typeof CFloatingInfoAreaComponentManager.areaCountMax).toBe('number'); });
        it('infoUnitArray が配列', () => { expect(Array.isArray(CFloatingInfoAreaComponentManager.infoUnitArray)).toBe(true); });
        it('setReferData が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.setReferData).toBe('function'); });
        it('RebuildControls が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.RebuildControls).toBe('function'); });
        it('RefreshDispAreaAll が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.RefreshDispAreaAll).toBe('function'); });
        it('LoadFromLocalStorage が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.LoadFromLocalStorage).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.GetFloatingInfoText が設定されている', () => { expect(typeof (window as any).GetFloatingInfoText).toBe('function'); });
        it('window.CFloatingInfoAreaInfoUnit が設定されている', () => { expect(typeof (window as any).CFloatingInfoAreaInfoUnit).toBe('function'); });
        it('window.CFloatingInfoAreaComponentManager が設定されている', () => { expect(typeof (window as any).CFloatingInfoAreaComponentManager).toBe('function'); });
    });
});
