import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IsUnconfirmedHP, IsUnconfirmedSP, UpdateCharaDataHtml } from '@roro/hmchara.js';

describe('hmchara.js', () => {
    describe('エクスポート確認', () => {
        it('IsUnconfirmedHP がエクスポートされている', () => {
            expect(typeof IsUnconfirmedHP).toBe('function');
        });

        it('IsUnconfirmedSP がエクスポートされている', () => {
            expect(typeof IsUnconfirmedSP).toBe('function');
        });

        it('UpdateCharaDataHtml がエクスポートされている', () => {
            expect(typeof UpdateCharaDataHtml).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.IsUnconfirmedHP が設定されている', () => {
            expect((window as any).IsUnconfirmedHP).toBe(IsUnconfirmedHP);
        });

        it('window.IsUnconfirmedSP が設定されている', () => {
            expect((window as any).IsUnconfirmedSP).toBe(IsUnconfirmedSP);
        });

        it('window.UpdateCharaDataHtml が設定されている', () => {
            expect((window as any).UpdateCharaDataHtml).toBe(UpdateCharaDataHtml);
        });
    });

    // IsUnconfirmedHP / IsUnconfirmedSP は GetUnconfirmedHPSPArray() グローバルに依存する。
    // テスト用モック: index 0 = undefined（配列でない）、index 1 = HP[50,99] / SP[10,20]
    describe('IsUnconfirmedHP', () => {
        beforeEach(() => {
            (globalThis as any).GetUnconfirmedHPSPArray = () => [
                undefined,
                [[50, 99], [10, 20]],
            ];
        });
        afterEach(() => {
            delete (globalThis as any).GetUnconfirmedHPSPArray;
        });

        it('jobId が配列長以上なら true を返す', () => {
            expect(IsUnconfirmedHP(99, 1)).toBe(true);
        });

        it('hpspArray[jobId] が配列でなければ false を返す', () => {
            expect(IsUnconfirmedHP(0, 50)).toBe(false);
        });

        it('level が HP 配列内にあれば true を返す', () => {
            expect(IsUnconfirmedHP(1, 50)).toBe(true);
        });

        it('level が HP 配列にない場合は false を返す', () => {
            expect(IsUnconfirmedHP(1, 1)).toBe(false);
        });
    });

    describe('IsUnconfirmedSP', () => {
        beforeEach(() => {
            (globalThis as any).GetUnconfirmedHPSPArray = () => [
                undefined,
                [[50, 99], [10, 20]],
            ];
        });
        afterEach(() => {
            delete (globalThis as any).GetUnconfirmedHPSPArray;
        });

        it('jobId が配列長以上なら true を返す', () => {
            expect(IsUnconfirmedSP(99, 1)).toBe(true);
        });

        it('hpspArray[jobId] が配列でなければ false を返す', () => {
            expect(IsUnconfirmedSP(0, 10)).toBe(false);
        });

        it('level が SP 配列内にあれば true を返す', () => {
            expect(IsUnconfirmedSP(1, 10)).toBe(true);
        });

        it('level が SP 配列にない場合は false を返す', () => {
            expect(IsUnconfirmedSP(1, 99)).toBe(false);
        });
    });
});
