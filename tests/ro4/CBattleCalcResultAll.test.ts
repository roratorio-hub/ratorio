import { describe, it, expect } from 'vitest';
import { CBattleCalcResultAll } from '@ro4/CBattleCalcResultAll.js';

describe('CBattleCalcResultAll.js', () => {
    describe('エクスポート確認', () => {
        it('CBattleCalcResultAll が関数', () => {
            expect(typeof CBattleCalcResultAll).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CBattleCalcResultAll が設定されている', () => {
            expect((window as any).CBattleCalcResultAll).toBe(CBattleCalcResultAll);
        });
    });
});
