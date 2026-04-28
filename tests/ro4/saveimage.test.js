import { describe, it, expect, vi, beforeAll } from 'vitest';

describe('saveimage', () => {
    beforeAll(async () => {
        window.$ = vi.fn((arg) => {
            if (typeof arg === 'function') return undefined;
            return { click: vi.fn(), on: vi.fn(), remove: vi.fn() };
        });
        window.html2canvas = vi.fn().mockResolvedValue({ toDataURL: vi.fn().mockReturnValue('data:image/png;') });
        await import('../../ro4/m/js/saveimage.js');
    });

    it('jQuery 環境でエラーなく import できる（副作用モジュール）', () => {
        expect(true).toBe(true);
    });

    it('window.generateImage が設定される（window compat ブロック）', () => {
        expect(typeof window.generateImage).toBe('function');
    });

    it('generateImage: 関数本体の未宣言変数回帰確認 (regist_elm_vanity / elm_ratio / regist_ratio / idx / tpl / div / dd)', () => {
        const src = window.generateImage.toString();
        expect(src).toContain('var regist_elm_vanity');
        expect(src).toContain('var elm_ratio');
        expect(src).toContain('var regist_ratio');
        expect(src).toContain('var idx');
        expect(src).toContain('var tpl');
        expect(src).toContain('var div');
        expect(src).toContain('var dd');
    });

    it('generateImage: ench_count 内の count / i 未宣言変数回帰確認', () => {
        const src = window.generateImage.toString();
        expect(src).toContain('let count = 0');
        expect(src).toContain('let i = 1');
    });

    it('generateImage: equip 内の enchants 未宣言変数回帰確認', () => {
        const src = window.generateImage.toString();
        expect(src).toContain('let enchants = []');
    });

    it('generateImage: randopt / shadow 内の text / options 未宣言変数回帰確認', () => {
        const src = window.generateImage.toString();
        expect(src).toContain('let text = ""');
        expect(src).toContain('let options = []');
    });
});
