import { describe, it, expect } from 'vitest';
import { zokusei, weaponsize } from '../../roro/m/js/etc.js';

describe('etc', () => {
    it('zokusei を export する', () => {
        expect(typeof zokusei).toBe('object');
        expect(Array.isArray(zokusei)).toBe(true);
    });

    it('weaponsize を export する', () => {
        expect(typeof weaponsize).toBe('object');
        expect(Array.isArray(weaponsize)).toBe(true);
    });

    it('window.zokusei が compat ブロックで設定される', () => {
        expect(window.zokusei).toBe(zokusei);
    });

    it('window.weaponsize が compat ブロックで設定される', () => {
        expect(window.weaponsize).toBe(weaponsize);
    });

    it('zokusei[11] は水属性1の相性テーブル', () => {
        // 水1 vs 火 = +75 (index 4)
        expect(zokusei[11][4]).toBe(75);
    });

    it('weaponsize 配列の最初の行は [1,1,1]', () => {
        expect(weaponsize[0]).toEqual([1, 1, 1]);
    });
});
