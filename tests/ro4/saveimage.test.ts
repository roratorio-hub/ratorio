import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockJQuery: any = (fn: any) => {
        if (typeof fn === 'function') fn();
        return mockJQuery;
    };
    mockJQuery.click = () => mockJQuery;
    (globalThis as any).$ = mockJQuery;
});

import { generateImage } from '@ro4/saveimage.js';

describe('saveimage.js', () => {
    describe('エクスポート確認', () => {
        it('generateImage が関数', () => {
            expect(typeof generateImage).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.generateImage が設定されている', () => {
            expect((window as any).generateImage).toBe(generateImage);
        });
    });
});
