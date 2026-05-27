import { describe, it, expect } from 'vitest';
import {
    MONSTER_MAP_ID_MAP_ALL,
    MONSTER_MAP_ID_MVP_MONSTER,
    MONSTER_MAP_ID_CATEGORY_ALL,
    MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON,
    g_MonsterMapDataArray,
    g_MonsterMapCategoryDataArray,
} from '@roro/monstermap.dat.js';

describe('monstermap.dat.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('MONSTER_MAP_ID_MAP_ALL が 0', () => {
            expect(MONSTER_MAP_ID_MAP_ALL).toBe(0);
        });
        it('MONSTER_MAP_ID_MVP_MONSTER が 1', () => {
            expect(MONSTER_MAP_ID_MVP_MONSTER).toBe(1);
        });
        it('MONSTER_MAP_ID_CATEGORY_ALL が 0', () => {
            expect(MONSTER_MAP_ID_CATEGORY_ALL).toBe(0);
        });
        it('MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON が 1', () => {
            expect(MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON).toBe(1);
        });
    });

    describe('エクスポート確認（データ）', () => {
        it('g_MonsterMapDataArray が配列', () => {
            expect(Array.isArray(g_MonsterMapDataArray)).toBe(true);
        });
        it('g_MonsterMapDataArray が 494 件', () => {
            expect(g_MonsterMapDataArray).toHaveLength(494);
        });
        it('g_MonsterMapCategoryDataArray が配列', () => {
            expect(Array.isArray(g_MonsterMapCategoryDataArray)).toBe(true);
        });
        it('g_MonsterMapCategoryDataArray が 97 件', () => {
            expect(g_MonsterMapCategoryDataArray).toHaveLength(97);
        });
    });
});
