import { describe, it, expect } from 'vitest';
import {
    TIME_ITEM_ID_NONE,
    TIME_ITEM_ID_AICILA_CARD,
    TIME_ITEM_ID_ADD_ELEMENTAL_DARK_ATK_30,
    ITEM_SP_TIME_OBJ,
    ITEM_SP_TIME_OBJ_SORT,
} from '@roro/timeitem.dat.js';

describe('timeitem.dat.js', () => {
    describe('エクスポート確認', () => {
        it('TIME_ITEM_ID_NONE が 0',                     () => expect(TIME_ITEM_ID_NONE).toBe(0));
        it('TIME_ITEM_ID_AICILA_CARD が 1',              () => expect(TIME_ITEM_ID_AICILA_CARD).toBe(1));
        it('TIME_ITEM_ID_ADD_ELEMENTAL_DARK_ATK_30 が 335', () => expect(TIME_ITEM_ID_ADD_ELEMENTAL_DARK_ATK_30).toBe(335));
        it('ITEM_SP_TIME_OBJ が配列',                   () => expect(Array.isArray(ITEM_SP_TIME_OBJ)).toBe(true));
        it('ITEM_SP_TIME_OBJ[0][0] が 0',               () => expect(ITEM_SP_TIME_OBJ[0][0]).toBe(0));
        it('ITEM_SP_TIME_OBJ[1][0] が 1',               () => expect(ITEM_SP_TIME_OBJ[1][0]).toBe(1));
        it('ITEM_SP_TIME_OBJ[336] が定義されている',     () => expect(ITEM_SP_TIME_OBJ[336]).toBeDefined());
        it('ITEM_SP_TIME_OBJ_SORT が配列',              () => expect(Array.isArray(ITEM_SP_TIME_OBJ_SORT)).toBe(true));
        it('ITEM_SP_TIME_OBJ_SORT の先頭が 0',          () => expect(ITEM_SP_TIME_OBJ_SORT[0]).toBe(0));
    });
});
