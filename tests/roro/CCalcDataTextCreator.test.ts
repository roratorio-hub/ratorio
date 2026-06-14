import { describe, it, expect } from 'vitest';
import { CCalcDataTextCreator } from '@roro/CCalcDataTextCreator.js';

describe('CCalcDataTextCreator.js', () => {
    describe('GetDataText の動作', () => {
        it('数値はそのまま返す', () => {
            expect((CCalcDataTextCreator as any).GetDataText(42)).toBe(42);
        });

        it('空文字列はダブルクォートで囲む', () => {
            expect((CCalcDataTextCreator as any).GetDataText('')).toBe('""');
        });

        it('文字列はダブルクォートで囲む', () => {
            expect((CCalcDataTextCreator as any).GetDataText('hello')).toBe('"hello"');
        });
    });

    describe('SetCalcDataTextObjectValue の動作', () => {
        it('null を渡しても例外を投げない', () => {
            expect(() => (CCalcDataTextCreator as any).SetCalcDataTextObjectValue(null)).not.toThrow();
        });

        it('undefined を渡しても例外を投げない', () => {
            expect(() => (CCalcDataTextCreator as any).SetCalcDataTextObjectValue(undefined)).not.toThrow();
        });
    });
});
