import { describe, it, expect } from 'vitest';
import {
    MONSTER_ID_ARCANGELING,
    MONSTER_ID_ARCHER_SKELETON,
    MONSTER_ID_MARYOKUBOSOSHITA_ZYOKYU_RGAN_QUEST,
    MonsterObjNew,
} from '@roro/monster.dat.js';

describe('monster.dat.js', () => {
    describe('エクスポート確認', () => {
        it('MONSTER_ID_ARCANGELING が 0',                              () => expect(MONSTER_ID_ARCANGELING).toBe(0));
        it('MONSTER_ID_ARCHER_SKELETON が 1',                         () => expect(MONSTER_ID_ARCHER_SKELETON).toBe(1));
        it('MONSTER_ID_MARYOKUBOSOSHITA_ZYOKYU_RGAN_QUEST が 1771',   () => expect(MONSTER_ID_MARYOKUBOSOSHITA_ZYOKYU_RGAN_QUEST).toBe(1771));
        it('MonsterObjNew[0][0] が 0',                                () => expect(MonsterObjNew[0][0]).toBe(0));
        it('MonsterObjNew[1][0] が 1',                                () => expect(MonsterObjNew[1][0]).toBe(1));
    });
});
