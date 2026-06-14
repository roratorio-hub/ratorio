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
    describe('window互換確認', () => {
        it('window.generateImage が設定されている', () => {
            expect((window as any).generateImage).toBe(generateImage);
        });
    });
});
