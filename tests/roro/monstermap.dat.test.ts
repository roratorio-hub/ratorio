import { describe, it, expect } from 'vitest';
import {
    MONSTER_MAP_ID_MAP_ALL,
    MONSTER_MAP_ID_MVP_MONSTER,
    MONSTER_MAP_ID_CATEGORY_ALL,
    MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON,
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

});
