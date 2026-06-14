import { describe, it, expect } from 'vitest';
import { PET_ID_NONE, PET_ID_ALICE } from '@roro/pet.dat.js';

describe('pet.dat.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('PET_ID_NONE が 0', () => {
            expect(PET_ID_NONE).toBe(0);
        });
        it('PET_ID_ALICE が 1', () => {
            expect(PET_ID_ALICE).toBe(1);
        });
    });

});
