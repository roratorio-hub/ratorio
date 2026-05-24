import { describe, it, expect } from 'vitest';
import { CCalcDataTextCreator } from '@roro/CCalcDataTextCreator.js';

describe('CCalcDataTextCreator.js', () => {
    describe('エクスポート確認', () => {
        it('CCalcDataTextCreator がエクスポートされている', () => {
            expect(CCalcDataTextCreator).toBeDefined();
            expect(typeof CCalcDataTextCreator).toBe('function');
        });

        it('静的プロパティ refCharaData が存在する', () => {
            expect('refCharaData' in CCalcDataTextCreator).toBe(true);
        });

        it('静的プロパティ refSpecData が存在する', () => {
            expect('refSpecData' in CCalcDataTextCreator).toBe(true);
        });

        it('静的プロパティ refMobData が存在する', () => {
            expect('refMobData' in CCalcDataTextCreator).toBe(true);
        });

        it('静的プロパティ refBattleData が存在する', () => {
            expect('refBattleData' in CCalcDataTextCreator).toBe(true);
        });

        it('静的メソッド SetCalcDataTextObjectValue が存在する', () => {
            expect(typeof (CCalcDataTextCreator as any).SetCalcDataTextObjectValue).toBe('function');
        });

        it('静的メソッド GetDataText が存在する', () => {
            expect(typeof (CCalcDataTextCreator as any).GetDataText).toBe('function');
        });
    });

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
