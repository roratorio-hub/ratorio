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

    describe('window互換確認', () => {
        it('window.n_A_PassSkill8 が設定されている', () => {
            expect((window as any).n_A_PassSkill8).toBe(n_A_PassSkill8);
        });
        // n_Skill8SW, Click_A8 は Phase 3-sup で compat ブロック除去済み → window への設定なし
    });
});
