// CGlobalConstManager を先にインポートして window.CGlobalConstManager を確立する。
// CNameKana.js はモジュール評価時に CGlobalConstManager.DefineEnum() で
// KANA_TYPE_* 定数をグローバルに定義するため、このインポート順序が必須。
import '../../roro/m/js/CGlobalConstManager.js';
import { describe, it, expect } from 'vitest';
import { CNameKana } from '../../roro/m/js/CNameKana.js';

describe('CNameKana', () => {
    describe('GetKanaCode', () => {
        it('カタカナをカナコードに変換する', () => {
            // ア(0x30A2): letterIndex=0, row=0, col=1 → 'A1'
            expect(CNameKana.GetKanaCode('ア')).toBe('A1');
        });

        it('平仮名はカタカナ相当のカナコードに変換される', () => {
            expect(CNameKana.GetKanaCode('あ')).toBe(CNameKana.GetKanaCode('ア'));
        });

        it('複数文字の変換結果は入力文字数の 2 倍の長さになる', () => {
            const code = CNameKana.GetKanaCode('アイウエオ');
            expect(code.length).toBe(10); // 2 chars per kana
        });

        it('濁音（ガ行など）は清音ベースのカナコードに変換される（小文字プレフィックス）', () => {
            // ガ(0x30AC) → 清音カ(0x30AB): letterIndex=5, row=1, col=1
            // KANA_TYPE_DAKUON なので行レターを小文字に → 'b1'
            expect(CNameKana.GetKanaCode('ガ')).toBe('b1');
        });

        it('半濁音（パ行）は y プレフィックスのカナコードに変換される', () => {
            // パ(0x30D1) → 清音ハ(0x30CF): letterIndex=25, row=5, col=1
            // KANA_TYPE_HANDAKU は 'y' + columnIndex を返す → 'y1'
            // （GetSortCode 後は 'F1' になる）
            expect(CNameKana.GetKanaCode('パ')).toBe('y1');
        });

        it('テーブル外のカタカナは XX を返す', () => {
            // ヵ(0x30F5) はテーブルにない → GetKanaCodeSub 内の else で "XX" を返す
            expect(CNameKana.GetKanaCode('ヵ')).toBe('XX');
        });
    });

    describe('GetSortCode', () => {
        it('カナコードを大文字のソートコードに変換する', () => {
            const kanaCode = CNameKana.GetKanaCode('ア');
            const sortCode = CNameKana.GetSortCode(kanaCode);
            expect(sortCode).toBe(sortCode.toUpperCase());
        });

        it('促音コード z → d に置換される', () => {
            // GetSortCode は z→d, y→f, v→a に置換して大文字化する
            expect(CNameKana.GetSortCode('z1')).toBe('D1');
        });

        it('半濁音コード y → f に置換される', () => {
            expect(CNameKana.GetSortCode('y1')).toBe('F1');
        });
    });

    describe('コンストラクタ', () => {
        it('name と kana を正しく格納し、kanaCode を算出する', () => {
            const nk = new CNameKana('テスト', 'テスト');
            expect(nk.name).toBe('テスト');
            expect(nk.kana).toBe('テスト');
            expect(typeof nk.kanaCode).toBe('string');
            expect(nk.kanaCode.length).toBeGreaterThan(0);
        });

        it('引数を省略すると空文字列で初期化される', () => {
            const nk = new CNameKana();
            expect(nk.name).toBe('');
            expect(nk.kana).toBe('');
        });
    });

    describe('ToDat', () => {
        it('bCreateSortCode=false のとき [name, kanaCode] の 2 要素配列を返す', () => {
            const nk = new CNameKana('テスト', 'テスト');
            const dat = nk.ToDat(false);
            expect(dat).toHaveLength(2);
            expect(dat[0]).toBe('テスト');
            expect(typeof dat[1]).toBe('string');
        });

        it('bCreateSortCode=true のとき [name, kanaCode, sortCode] の 3 要素配列を返す', () => {
            const nk = new CNameKana('テスト', 'テスト');
            const dat = nk.ToDat(true);
            expect(dat).toHaveLength(3);
        });
    });

    it('window 互換ブロックで window.CNameKana が設定される', () => {
        expect(window.CNameKana).toBe(CNameKana);
    });
});
