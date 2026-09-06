import { describe, it, expect } from 'vitest';
import { generateImage } from '@engine/ui/saveimage.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';

describe('saveimage.js', () => {
    // dewindow: window.generateImage は engine-registry へ移行（旧 window 互換テストを置換）。
    // tests/integration/saveimage-output.test.ts が reg.generateImage() で呼ぶ配線を検証する。
    describe('engine-registry 登録', () => {
        it('generateImage が engine-registry に登録されている', () => {
            expect(registryGet('generateImage')).toBe(generateImage);
        });
    });
});
