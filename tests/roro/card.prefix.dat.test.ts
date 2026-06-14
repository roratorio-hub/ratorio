import { describe, it, expect } from 'vitest';
import { CardPrefix } from '@roro/card.prefix.dat.js';

describe('card.prefix.dat.js', () => {
    describe('インスタンス動作', () => {
        it('インスタンスが生成できる', () => {
            expect(() => new CardPrefix()).not.toThrow();
        });
    });

    describe('メソッド確認', () => {
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
