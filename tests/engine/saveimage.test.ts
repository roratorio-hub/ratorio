import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockJQuery: any = (fn: any) => {
        if (typeof fn === 'function') fn();
        return mockJQuery;
    };
    mockJQuery.click = () => mockJQuery;
    (globalThis as any).$ = mockJQuery;
});

import { generateImage } from '@engine/ui/saveimage.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';

describe('saveimage.js', () => {
    // dewindow: window.generateImage は engine-registry へ移行（旧 window 互換テストを置換）。
    // TypeScript 層（optInSavedata.ts）が registryGet('generateImage') で呼ぶ配線を検証する。
    describe('engine-registry 登録', () => {
        it('generateImage が engine-registry に登録されている', () => {
            expect(registryGet('generateImage')).toBe(generateImage);
        });
    });
});
