import { describe, it, expect } from 'vitest';
import { PET_ID_NONE, PET_ID_ALICE, PET_OBJ } from '@roro/pet.dat.js';

describe('pet.dat.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('PET_ID_NONE が 0', () => {
            expect(PET_ID_NONE).toBe(0);
        });
        it('PET_ID_ALICE が 1', () => {
            expect(PET_ID_ALICE).toBe(1);
        });
    });

    describe('エクスポート確認（データ）', () => {
        it('PET_OBJ が配列', () => {
            expect(Array.isArray(PET_OBJ)).toBe(true);
        });
        it('PET_OBJ が 112 件', () => {
            expect(PET_OBJ).toHaveLength(112);
        });
    });

    describe('window互換確認', () => {
        it('window.PET_ID_NONE が設定されている', () => {
            expect((window as any).PET_ID_NONE).toBe(PET_ID_NONE);
        });
        it('window.PET_ID_ALICE が設定されている', () => {
            expect((window as any).PET_ID_ALICE).toBe(PET_ID_ALICE);
        });
        it('window.PET_OBJ が設定されている', () => {
            expect((window as any).PET_OBJ).toBe(PET_OBJ);
        });
    });
});
