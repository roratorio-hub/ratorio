import { describe, it, expect, vi, beforeAll } from 'vitest';

describe('calchistory', () => {
    beforeAll(() => {
        // jQuery モック: $(fn) は ready コールバック登録、$(sel) は chainable を返す
        window.$ = vi.fn((arg) => {
            if (typeof arg === 'function') return undefined;
            return { click: vi.fn(), on: vi.fn(), after: vi.fn(), text: vi.fn() };
        });
        window.Chart = vi.fn().mockReturnValue({ data: { datasets: [] }, update: vi.fn(), destroy: vi.fn() });
    });

    it('jQuery 環境でエラーなく import できる（副作用モジュール）', async () => {
        await import('../../ro4/m/js/calchistory.js');
        expect(true).toBe(true);
    });

    it('window.g_Chart が null で初期化される', async () => {
        // ESM モジュールスコープの var は window に昇格しない。
        // window.g_Chart = null; への修正が有効かを確認する。
        await import('../../ro4/m/js/calchistory.js');
        expect('g_Chart' in window).toBe(true);
        // 初期値は null（Chart インスタンスがない状態）
        expect(window.g_Chart).toBeNull();
    });
});

describe('CSaveController (source checks)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../ro4/m/js/CSaveController.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('g_Chart は window.g_Chart として参照される（bare 参照の回帰確認）', () => {
        // ESM strict mode では宣言のない bare g_Chart 参照が ReferenceError になる。
        // 全参照が window.g_Chart に変換されていることを確認する。
        expect(src).not.toMatch(/(?<![.\w])g_Chart(?!\s*[=:])/);
    });

    it('window.g_Chart への代入が存在する', () => {
        expect(src).toContain('window.g_Chart =');
    });
});
