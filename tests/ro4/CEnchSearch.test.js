import { describe, it, expect } from 'vitest';
import { enchSearch } from '../../ro4/m/js/CEnchSearch.js';

describe('CEnchSearch', () => {
    it('enchSearch クラスを export する', () => {
        expect(typeof enchSearch).toBe('function');
    });

    it('window.enchSearch が設定される', () => {
        expect(window.enchSearch).toBe(enchSearch);
    });
});
