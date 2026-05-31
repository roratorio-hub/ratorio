import { describe, it, expect } from 'vitest';
import { GetMobDataBasicAttribute, GetMobDataParameters } from '@roro/mob.js';

describe('mob.js', () => {
    describe('エクスポート確認', () => {
        it('GetMobDataBasicAttribute が関数', () => {
            expect(typeof GetMobDataBasicAttribute).toBe('function');
        });
        it('GetMobDataParameters が関数', () => {
            expect(typeof GetMobDataParameters).toBe('function');
        });
    });
});
