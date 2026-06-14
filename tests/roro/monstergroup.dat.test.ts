import { describe, it, expect } from 'vitest';
import {
    MONSTER_GROUP_ID_MANUKU,
    MONSTER_GROUP_ID_UKNW_RUIN,
} from '@roro/monstergroup.dat.js';

describe('monstergroup.dat.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('MONSTER_GROUP_ID_MANUKU が 0', () => {
            expect(MONSTER_GROUP_ID_MANUKU).toBe(0);
        });
        it('MONSTER_GROUP_ID_UKNW_RUIN が 65', () => {
            expect(MONSTER_GROUP_ID_UKNW_RUIN).toBe(65);
        });
    });

});
