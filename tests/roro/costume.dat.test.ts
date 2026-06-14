import { describe, it, expect } from 'vitest';
import { COSTUME_ID_HEAD_UNDER_NONE, COSTUME_ID_BEGINNER_BO, CostumeOBJ } from '@roro/costume.dat.js';

describe('costume.dat.js', () => {
    describe('エクスポート確認', () => {
        it('COSTUME_ID_HEAD_UNDER_NONE が 0', () => {
            expect(COSTUME_ID_HEAD_UNDER_NONE).toBe(0);
        });
        it('COSTUME_ID_BEGINNER_BO が 1', () => {
            expect(COSTUME_ID_BEGINNER_BO).toBe(1);
        });
        it('CostumeOBJ[0][0] が 0（衣装なし）', () => {
            expect(CostumeOBJ[0][0]).toBe(0);
        });
    });
});
