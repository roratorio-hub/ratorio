import { describe, it, expect } from 'vitest';
import { zokusei, weaponsize } from '@roro/etc.js';

describe('etc.js', () => {
    describe('エクスポート確認', () => {
        it('zokusei がエクスポートされている', () => {
            expect(zokusei).toBeDefined();
            expect(Array.isArray(zokusei)).toBe(true);
        });
        it('weaponsize がエクスポートされている', () => {
            expect(weaponsize).toBeDefined();
            expect(Array.isArray(weaponsize)).toBe(true);
        });
    });

    describe('データ確認', () => {
        it('zokusei[11] が水属性データを持つ', () => {
            expect(Array.isArray(zokusei[11])).toBe(true);
        });
        it('weaponsize[0] が [1,1,1]', () => {
            expect(weaponsize[0]).toEqual([1, 1, 1]);
        });
    });
});
