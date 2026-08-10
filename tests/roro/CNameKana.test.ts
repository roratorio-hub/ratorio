import { describe, it, expect, beforeAll } from 'vitest';
import { CNameKana } from '@roro/CNameKana.js';

describe('CNameKana.js', () => {

    describe('静的メソッド確認', () => {
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
        it('名称・読み仮名が未指定の場合は空文字', () => {
            const obj = new CNameKana(null, null);
            expect(obj.name).toBe('');
            expect(obj.kana).toBe('');
        });
    });
});
