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
});
