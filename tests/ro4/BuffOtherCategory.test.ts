import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    // Phase 3b で BuffOtherCategory.js が CAttackMethodAreaComponentManager を import するようになり
    // 連鎖的に calchistory.js の $(function(){...}) と CShadowEquipController.initializeHTML() が呼ばれる
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
        value: 0,
    };
    (document as any).getElementById = () => mockEl;
});
import {
    BUFF_CONF_OTHER_LIMIT,
    n_A_PassSkill8,
    n_Skill8SW,
    Click_Skill8SW,
    Click_A8,
    OnChangePetSelect,
    RefreshPetExplain,
} from '@ro4/BuffOtherCategory.js';

describe('BuffOtherCategory.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_OTHER_LIMIT がエクスポートされている', () => {
            expect(BUFF_CONF_OTHER_LIMIT).toBe(28);
        });
    });

    // 3e-3: skillstate.js の window compat 除去（window.n_A_PassSkill8 の state テストは削除）。
    // n_A_PassSkill8 は skillstate.js の export let を import 参照する（動作は skillstate 側でカバー）
});
