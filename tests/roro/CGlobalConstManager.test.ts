import { describe, it, expect } from 'vitest';
import { CGlobalConstManager } from '@roro/CGlobalConstManager.js';

describe('CGlobalConstManager.js', () => {
    describe('エクスポート確認', () => {
        it('CGlobalConstManager がエクスポートされている', () => {
            expect(typeof CGlobalConstManager).toBe('function');
        });

        it('静的プロパティ managementMap が存在する', () => {
            expect('managementMap' in CGlobalConstManager).toBe(true);
            expect(Array.isArray((CGlobalConstManager as any).managementMap)).toBe(true);
        });

        it('静的プロパティ nameMap が存在する', () => {
            expect('nameMap' in CGlobalConstManager).toBe(true);
            expect((CGlobalConstManager as any).nameMap instanceof Map).toBe(true);
        });

        it('静的メソッド DefineEnum が存在する', () => {
            expect(typeof (CGlobalConstManager as any).DefineEnum).toBe('function');
        });

        it('静的メソッド DefinePseudoEnum が存在する', () => {
            expect(typeof (CGlobalConstManager as any).DefinePseudoEnum).toBe('function');
        });

        it('静的メソッド DefineEnumSubCommon が存在する', () => {
            expect(typeof (CGlobalConstManager as any).DefineEnumSubCommon).toBe('function');
        });

        it('静的メソッド RegisterMap が存在する', () => {
            expect(typeof (CGlobalConstManager as any).RegisterMap).toBe('function');
        });

        it('静的メソッド SearchMap が存在する', () => {
            expect(typeof (CGlobalConstManager as any).SearchMap).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CGlobalConstManager が設定されている', () => {
            expect((window as any).CGlobalConstManager).toBe(CGlobalConstManager);
        });
    });

    describe('DefineEnum の動作', () => {
        it('列挙定数を定義できる', () => {
            (CGlobalConstManager as any).DefineEnum('TEST_ENUM_A', ['TEST_A_X', 'TEST_A_Y', 'TEST_A_Z'], 0, 1);
            expect((globalThis as any).TEST_A_X).toBe(0);
            expect((globalThis as any).TEST_A_Y).toBe(1);
            expect((globalThis as any).TEST_A_Z).toBe(2);
        });

        it('firstValue / stepValue を指定して連番を制御できる', () => {
            (CGlobalConstManager as any).DefineEnum('TEST_ENUM_B', ['TEST_B_FIRST', 'TEST_B_SECOND'], 10, 5);
            expect((globalThis as any).TEST_B_FIRST).toBe(10);
            expect((globalThis as any).TEST_B_SECOND).toBe(15);
        });

        it('同じ定数名を二重登録するとエラーになる', () => {
            (CGlobalConstManager as any).DefineEnum('TEST_ENUM_C', ['TEST_C_UNIQUE'], 0, 1);
            expect(() => {
                (CGlobalConstManager as any).DefineEnum('TEST_ENUM_D', ['TEST_C_UNIQUE'], 0, 1);
            }).toThrow();
        });

        it('同じ enumName を再度呼んでも既存インスタンスを使う（二重登録にならない）', () => {
            (CGlobalConstManager as any).DefineEnum('TEST_ENUM_E', ['TEST_E_ONE'], 100, 1);
            expect(() => {
                (CGlobalConstManager as any).DefineEnum('TEST_ENUM_E', ['TEST_E_TWO'], 100, 1);
            }).not.toThrow();
        });
    });

    describe('SearchMap の動作', () => {
        it('未登録の名前に対して null を返す', () => {
            const result = (CGlobalConstManager as any).SearchMap('NONEXISTENT_ENUM_XYZ');
            expect(result).toBeNull();
        });

        it('登録済みの名前に対してユニットを返す', () => {
            (CGlobalConstManager as any).DefineEnum('TEST_ENUM_F', ['TEST_F_VAL'], 42, 1);
            const result = (CGlobalConstManager as any).SearchMap('TEST_ENUM_F');
            expect(result).not.toBeNull();
            expect(result.name).toBe('TEST_ENUM_F');
        });
    });
});
