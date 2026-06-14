import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import '@roro/monstermap.h.js';

describe('monstermap.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('MONSTER_MAP_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).MONSTER_MAP_DATA_INDEX_ID).toBe(0);
        });
        it('MONSTER_MAP_DATA_INDEX_KIND が 1 に定義される', () => {
            expect((globalThis as any).MONSTER_MAP_DATA_INDEX_KIND).toBe(1);
        });
        it('MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY が 2 に定義される', () => {
            expect((globalThis as any).MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY).toBe(2);
        });
        it('MONSTER_MAP_KIND_MAP が 0 に定義される', () => {
            expect((globalThis as any).MONSTER_MAP_KIND_MAP).toBe(0);
        });
        it('MONSTER_MAP_KIND_MEMORIAL_DUNGEON が 1 に定義される', () => {
            expect((globalThis as any).MONSTER_MAP_KIND_MEMORIAL_DUNGEON).toBe(1);
        });
        it('MONSTER_MAP_KIND_CATEGORY が 2 に定義される', () => {
            expect((globalThis as any).MONSTER_MAP_KIND_CATEGORY).toBe(2);
        });
    });

});
