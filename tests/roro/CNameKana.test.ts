import { describe, it, expect, beforeAll } from 'vitest';
import { CGlobalConstManager } from '@roro/CGlobalConstManager.js';
import { CNameKana } from '@roro/CNameKana.js';

describe('CNameKana.js', () => {
    describe('エクスポート確認', () => {
        it('CNameKana が関数（コンストラクタ）', () => {
            expect(typeof CNameKana).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CNameKana が設定されている', () => {
            expect((window as any).CNameKana).toBe(CNameKana);
        });
    });

    describe('DefineEnum 副作用確認', () => {
        it('KANA_TYPE_NORMAL が定義されている', () => {
            expect((globalThis as any).KANA_TYPE_NORMAL).toBeDefined();
        });
        it('KANA_TYPE_DAKUON が定義されている', () => {
            expect((globalThis as any).KANA_TYPE_DAKUON).toBeDefined();
        });
        it('NAME_KANA_DATA_INDEX_NAME が 0 に定義されている', () => {
            expect((globalThis as any).NAME_KANA_DATA_INDEX_NAME).toBe(0);
        });
        it('NAME_KANA_DATA_INDEX_KANA が 1 に定義されている', () => {
            expect((globalThis as any).NAME_KANA_DATA_INDEX_KANA).toBe(1);
        });
        it('NAME_KANA_DATA_INDEX_SORT が 2 に定義されている', () => {
            expect((globalThis as any).NAME_KANA_DATA_INDEX_SORT).toBe(2);
        });
    });

    describe('静的メソッド確認', () => {
        it('CNameKana.GetKanaCode が関数', () => {
            expect(typeof CNameKana.GetKanaCode).toBe('function');
        });
        it('CNameKana.GetKanaCodeSub が関数', () => {
            expect(typeof CNameKana.GetKanaCodeSub).toBe('function');
        });
        it('CNameKana.GetSortCode が関数', () => {
            expect(typeof CNameKana.GetSortCode).toBe('function');
        });
        it('GetSortCode: "z" を "d" に変換する', () => {
            expect(CNameKana.GetSortCode('zA1')).toBe('DA1');
        });
        it('GetSortCode: "y" を "f" に変換する', () => {
            expect(CNameKana.GetSortCode('yB2')).toBe('FB2');
        });
        it('GetSortCode: "v" を "a" に変換する', () => {
            expect(CNameKana.GetSortCode('vC3')).toBe('AC3');
        });
    });

    describe('インスタンス確認', () => {
        it('name プロパティが設定される', () => {
            const obj = new CNameKana('テスト', 'テスト');
            expect(obj.name).toBe('テスト');
        });
        it('kana プロパティが設定される', () => {
            const obj = new CNameKana('テスト', 'テスト');
            expect(obj.kana).toBe('テスト');
        });
        it('ToDat メソッドが配列を返す', () => {
            const obj = new CNameKana('テスト', 'テスト');
            const dat = obj.ToDat(true);
            expect(Array.isArray(dat)).toBe(true);
        });
        it('名称・読み仮名が未指定の場合は空文字', () => {
            const obj = new CNameKana(null, null);
            expect(obj.name).toBe('');
            expect(obj.kana).toBe('');
        });
    });
});
