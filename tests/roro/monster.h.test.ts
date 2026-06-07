import { describe, it, expect, beforeAll } from 'vitest';
import '@roro/CGlobalConstManager.js';

// ELM_ID constants are defined in common.js (not yet migrated to ESM).
// Pre-define them here so monster.h.js module-level DefineEnum calls succeed.
const ELM_ID_VALUES: Record<string, number> = {
    ELM_ID_VANITY: 0, ELM_ID_WATER: 1, ELM_ID_EARTH: 2, ELM_ID_FIRE: 3,
    ELM_ID_WIND: 4, ELM_ID_POISON: 5, ELM_ID_HOLY: 6, ELM_ID_DARK: 7,
    ELM_ID_PSYCO: 8, ELM_ID_UNDEAD: 9,
};

let GetMonseterElmBasicType: (elm: number) => number;
let GetBossTypeText: (id: number) => string;
let GetGrassTypeText: (id: number) => string;

beforeAll(async () => {
    for (const [key, val] of Object.entries(ELM_ID_VALUES)) {
        (globalThis as any)[key] = val;
    }
    const mod = await import('@roro/monster.h.js');
    GetMonseterElmBasicType = mod.GetMonseterElmBasicType;
    GetBossTypeText = mod.GetBossTypeText;
    GetGrassTypeText = mod.GetGrassTypeText;
});

describe('monster.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('MONSTER_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).MONSTER_DATA_INDEX_ID).toBe(0);
        });
        it('MONSTER_DATA_INDEX_HP が 3 に定義される', () => {
            expect((globalThis as any).MONSTER_DATA_INDEX_HP).toBe(3);
        });
        it('MONSTER_ELM_VANITY_1 が 1 に定義される', () => {
            expect((globalThis as any).MONSTER_ELM_VANITY_1).toBe(1);
        });
        it('MONSTER_ELM_WATER_1 が 11 に定義される', () => {
            expect((globalThis as any).MONSTER_ELM_WATER_1).toBe(11);
        });
        it('MONSTER_BOSSTYPE_NONE が 0 に定義される', () => {
            expect((globalThis as any).MONSTER_BOSSTYPE_NONE).toBe(0);
        });
        it('MONSTER_BOSSTYPE_BOSS が 1 に定義される', () => {
            expect((globalThis as any).MONSTER_BOSSTYPE_BOSS).toBe(1);
        });
        it('MONSTER_GRASSTYPE_NONE が 0 に定義される', () => {
            expect((globalThis as any).MONSTER_GRASSTYPE_NONE).toBe(0);
        });
    });

    describe('エクスポート確認', () => {
        it('GetMonseterElmBasicType が関数', () => {
            expect(typeof GetMonseterElmBasicType).toBe('function');
        });
        it('GetMonseterElmBasicType(11) が 1（水）', () => {
            expect(GetMonseterElmBasicType(11)).toBe(1);
        });
        it('GetMonseterElmBasicType(21) が 2（地）', () => {
            expect(GetMonseterElmBasicType(21)).toBe(2);
        });
        it('GetBossTypeText が関数', () => {
            expect(typeof GetBossTypeText).toBe('function');
        });
        it('GetBossTypeText(0) が一般', () => {
            expect(GetBossTypeText(0)).toBe('一般');
        });
        it('GetBossTypeText(1) が BOSS', () => {
            expect(GetBossTypeText(1)).toBe('BOSS');
        });
        it('GetGrassTypeText が関数', () => {
            expect(typeof GetGrassTypeText).toBe('function');
        });
        it('GetGrassTypeText(0) がなし', () => {
            expect(GetGrassTypeText(0)).toBe('なし');
        });
    });

});
