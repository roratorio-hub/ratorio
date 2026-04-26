import { describe, it, expect, beforeEach } from 'vitest';
import { IsEnableRandomEnchant } from '../../roro/m/js/rndench.js';

describe('rndench', () => {
    beforeEach(() => {
        window.ITEM_DATA_INDEX_WPNLV = 0;
        window.ItemObjNew = {};
        window.GetRndOptTypeId = () => 0;
    });

    it('IsEnableRandomEnchant を関数として export する', () => {
        expect(typeof IsEnableRandomEnchant).toBe('function');
    });

    it('window.IsEnableRandomEnchant が compat ブロックで設定される', () => {
        expect(window.IsEnableRandomEnchant).toBe(IsEnableRandomEnchant);
    });

    it('wpnlv の小数部が奇数ならランダムエンチャント対応', () => {
        // wpnlv = 3.1 → flag = (3.1 * 10) % 10 = 1 (odd) → true
        window.ItemObjNew = { 100: [3.1] };
        expect(IsEnableRandomEnchant(100)).toBe(true);
    });

    it('wpnlv の小数部が 0 (偶数) なら非対応', () => {
        // wpnlv = 3.0 → flag = 0 → false
        window.ItemObjNew = { 100: [3.0] };
        expect(IsEnableRandomEnchant(100)).toBe(false);
    });

    it('GetRndOptTypeId > 0 ならフラグによらず対応', () => {
        // flag = 0 でも GetRndOptTypeId が 1 なら true
        window.ItemObjNew = { 100: [3.0] };
        window.GetRndOptTypeId = () => 1;
        expect(IsEnableRandomEnchant(100)).toBe(true);
    });
});
