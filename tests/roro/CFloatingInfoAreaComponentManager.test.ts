import { vi, describe, it, expect } from 'vitest';

// vi.hoisted でモジュールロード前に DOM を準備する（静的インポート時に RebuildControls が実行されるため）
vi.hoisted(() => {
    // Phase 3b 以降、import チェーンが CShadowEquipController.initializeHTML() に到達する。
    // OBJID_SHADOW_EQUIPS_MIG 要素が DOM にないと querySelectorAll で失敗するため追加。
    // また calchistory.js の $(function(){...}) もモックが必要。
    (globalThis as any).$ = (_fn: any) => {};
    document.body.innerHTML = '<div id="ID_FLOATING_INFO_AREA"></div><div id="OBJID_SHADOW_EQUIPS_MIG"></div><div id="ID_TIME_ITEM_AREA"></div><div id="ID_BATTLE_QUICK_CONTROL_AREA"></div>';
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
    it.todo('動作テストを追加する');
});

