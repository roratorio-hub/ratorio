import { describe, it, expect, vi, beforeAll } from 'vitest';

describe('saveimage', () => {
    beforeAll(() => {
        window.$ = vi.fn((arg) => {
            if (typeof arg === 'function') return undefined;
            return { click: vi.fn(), on: vi.fn(), remove: vi.fn() };
        });
        window.html2canvas = vi.fn().mockResolvedValue({ toDataURL: vi.fn().mockReturnValue('data:image/png;') });
    });

    it('jQuery 環境でエラーなく import できる（副作用モジュール）', async () => {
        await import('../../ro4/m/js/saveimage.js');
        expect(true).toBe(true);
    });
});
