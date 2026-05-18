import { describe, it, expect } from 'vitest';
import { CardPrefix } from '@roro/card.prefix.dat.js';

describe('card.prefix.dat.js', () => {
    describe('エクスポート確認', () => {
        it('CardPrefix がエクスポートされている', () => {
            expect(typeof CardPrefix).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CardPrefix が設定されている', () => {
            expect((window as any).CardPrefix).toBe(CardPrefix);
        });
    });

    describe('インスタンス動作', () => {
        it('インスタンスが生成できる', () => {
            expect(() => new CardPrefix()).not.toThrow();
        });

        it('card_prefix が配列である', () => {
            const obj = new CardPrefix();
            expect(Array.isArray(obj.card_prefix)).toBe(true);
        });

        it('card_prefix のエントリ数が 1401 である', () => {
            const obj = new CardPrefix();
            expect(obj.card_prefix).toHaveLength(1401);
        });

        it('各エントリは [名前, prefix, suffix] の形式', () => {
            const obj = new CardPrefix();
            const entry = obj.card_prefix[0];
            expect(Array.isArray(entry)).toBe(true);
            expect(entry).toHaveLength(3);
        });
    });

    describe('メソッド確認', () => {
        it('get_index_by_name が存在する', () => {
            expect(typeof CardPrefix.prototype.get_index_by_name).toBe('function');
        });

        it('get_prefix が存在する', () => {
            expect(typeof CardPrefix.prototype.get_prefix).toBe('function');
        });

        it('get_suffix が存在する', () => {
            expect(typeof CardPrefix.prototype.get_suffix).toBe('function');
        });

        it('get_index_by_name は存在するカード名のインデックスを返す', () => {
            const obj = new CardPrefix();
            const name = obj.card_prefix[0][0];
            expect(obj.get_index_by_name(name)).toBe(0);
        });

        it('get_index_by_name は存在しない名前に -1 を返す', () => {
            const obj = new CardPrefix();
            expect(obj.get_index_by_name('存在しないカード')).toBe(-1);
        });

        it('get_prefix は指定インデックスのprefixを返す', () => {
            const obj = new CardPrefix();
            expect(obj.get_prefix(0)).toBe(obj.card_prefix[0][1]);
        });

        it('get_suffix は指定インデックスのsuffixを返す', () => {
            const obj = new CardPrefix();
            expect(obj.get_suffix(0)).toBe(obj.card_prefix[0][2]);
        });
    });
});
