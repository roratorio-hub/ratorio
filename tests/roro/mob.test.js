import { describe, it, expect } from 'vitest';
import { GetMobDataBasicAttribute, GetMobDataParameters } from '../../roro/m/js/mob.js';

describe('mob', () => {
    it('全関数を export する', () => {
        expect(typeof GetMobDataBasicAttribute).toBe('function');
        expect(typeof GetMobDataParameters).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.GetMobDataBasicAttribute).toBe(GetMobDataBasicAttribute);
        expect(window.GetMobDataParameters).toBe(GetMobDataParameters);
    });
});
