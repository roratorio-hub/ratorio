import { describe, it, expect, beforeEach } from 'vitest';
import {
    CGlobalConstManager,
    CGlobalEnumManager,
    CConstVarManagementUnit,
} from '../../roro/m/js/CGlobalConstManager.js';

describe('CGlobalConstManager', () => {
    beforeEach(() => {
        // テスト間の静的状態を分離する
        CGlobalConstManager.managementMap = [];
        CGlobalConstManager.nameMap = new Map();
    });

    it('window 互換ブロックで 3 シンボルがグローバルに登録される', () => {
        expect(window.CGlobalConstManager).toBe(CGlobalConstManager);
        expect(window.CGlobalEnumManager).toBe(CGlobalEnumManager);
        expect(window.CConstVarManagementUnit).toBe(CConstVarManagementUnit);
    });

    describe('DefineEnum', () => {
        it('firstValue/stepValue に基づいて整数定数をグローバルに定義する', () => {
            CGlobalConstManager.DefineEnum('E_TEST_BASIC', ['V0', 'V1', 'V2'], 10, 1);
            expect(globalThis.V0).toBe(10);
            expect(globalThis.V1).toBe(11);
            expect(globalThis.V2).toBe(12);
        });

        it('enumName と同名のグローバル変数に CGlobalEnumManager インスタンスを割り当てる', () => {
            CGlobalConstManager.DefineEnum('E_TEST_MGR', ['M0', 'M1'], 0, 1);
            expect(globalThis.E_TEST_MGR).toBeInstanceOf(CGlobalEnumManager);
        });

        it('最後に定義された定数値を返す', () => {
            const last = CGlobalConstManager.DefineEnum('E_TEST_RET', ['R0', 'R1', 'R2'], 5, 5);
            expect(last).toBe(15); // 5 + 5*2
        });

        it('定数名の二重登録で例外をスローする', () => {
            CGlobalConstManager.DefineEnum('E_TEST_DUP1', ['DUP_CONST'], 0, 1);
            expect(() => {
                CGlobalConstManager.DefineEnum('E_TEST_DUP2', ['DUP_CONST'], 0, 1);
            }).toThrow('定数名二重登録');
        });

        it('同じ列挙名を再度呼ぶと既存マネージャに定数を追加できる', () => {
            // DefineEnum は同名列挙の再呼び出しをエラーにしない。
            // 既存の CGlobalEnumManager インスタンスに定数を追加する仕様。
            // 2回目は firstValue を省略することで enumArray.length ベースの連番になる。
            CGlobalConstManager.DefineEnum('E_TEST_EXTEND', ['EXT0'], 0, 1);
            CGlobalConstManager.DefineEnum('E_TEST_EXTEND', ['EXT1']); // firstValue 省略 → 自動採番
            expect(globalThis.E_TEST_EXTEND.Count).toBe(2);
            expect(globalThis.E_TEST_EXTEND.GetDefinedName(0)).toBe('EXT0');
            expect(globalThis.E_TEST_EXTEND.GetDefinedName(1)).toBe('EXT1');
        });
    });

    describe('CGlobalEnumManager', () => {
        it('GetDefinedName で値から定数名を取得できる', () => {
            CGlobalConstManager.DefineEnum('E_TEST_NAME', ['NA', 'NB', 'NC'], 0, 1);
            const mgr = globalThis.E_TEST_NAME;
            expect(mgr.GetDefinedName(0)).toBe('NA');
            expect(mgr.GetDefinedName(1)).toBe('NB');
            expect(mgr.GetDefinedName(2)).toBe('NC');
        });

        it('未登録値には空文字列を返す', () => {
            CGlobalConstManager.DefineEnum('E_TEST_EMPTY', ['EA'], 0, 1);
            expect(globalThis.E_TEST_EMPTY.GetDefinedName(999)).toBe('');
        });

        it('Count getter で登録済み定数の数を返す', () => {
            CGlobalConstManager.DefineEnum('E_TEST_COUNT', ['CA', 'CB', 'CC', 'CD'], 0, 1);
            expect(globalThis.E_TEST_COUNT.Count).toBe(4);
        });
    });

    describe('CConstVarManagementUnit', () => {
        it('Clone で独立したコピーを生成する', () => {
            const unit = new CConstVarManagementUnit();
            unit.name = 'FOO';
            unit.value = 42;
            const clone = unit.Clone();
            expect(clone.name).toBe('FOO');
            expect(clone.value).toBe(42);
            clone.value = 99;
            expect(unit.value).toBe(42);
        });
    });
});
