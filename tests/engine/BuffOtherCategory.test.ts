import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // Phase 3b で BuffOtherCategory.js が CAttackMethodAreaComponentManager を import するようになり
    // 連鎖的に CShadowEquipController.initializeHTML() が呼ばれる
    const mockEl = {
        querySelectorAll: () => [],
        querySelector: () => null,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        addEventListener: () => {},
        style: {},
        value: 0,
    };
    // BuffOtherCategory.js は CTimeItemAreaComponentManager を import しており、その連鎖で
    // CBattleQuickControlAreaComponentManager が評価時に自己初期化(RebuildControls)される。
    // どちらも "このページに設定欄が無ければ何もしない" ガード（document.getElementById(...) が
    // null なら早期 return）を持つので、対応するルート要素IDは null を返す（実ページの pages/
    // と同じ状態）。それ以外は既存の汎用 mockEl を返す。
    const rootIdsWithoutArea = new Set(['ID_BATTLE_QUICK_CONTROL_AREA', 'ID_TIME_ITEM_AREA']);
    (document as any).getElementById = (id: string) => (rootIdsWithoutArea.has(id) ? null : mockEl);
});
import { BUFF_CONF_OTHER_LIMIT } from '@engine/skill/skillstate.js';
import {
    n_A_PassSkill8,
    n_Skill8SW,
    Click_Skill8SW,
    Click_A8,
    OnChangePetSelect,
    RefreshPetExplain,
} from '@engine/ui/BuffOtherCategory.js';

describe('BuffOtherCategory.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_OTHER_LIMIT がエクスポートされている', () => {
            expect(BUFF_CONF_OTHER_LIMIT).toBe(28);
        });
    });

    // 3e-3: skillstate.js の window compat 除去（window.n_A_PassSkill8 の state テストは削除）。
    // n_A_PassSkill8 は skillstate.js の export let を import 参照する（動作は skillstate 側でカバー）
});
