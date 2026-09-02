import { describe, it, expect, afterEach } from 'vitest';
import { showLoadingIndicator, hideLoadingIndicator } from '@engine/ui/loading-indicator.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';

describe('loading-indicator.js', () => {
    afterEach(() => {
        hideLoadingIndicator();
        document.head.innerHTML = '';
    });

    it('showLoadingIndicator でプログレスバー要素が document.body に追加される', () => {
        showLoadingIndicator();
        const bar = document.querySelector('[role="progressbar"]');
        expect(bar).not.toBeNull();
    });

    it('hideLoadingIndicator で要素が除去される', () => {
        showLoadingIndicator();
        hideLoadingIndicator();
        expect(document.querySelector('[role="progressbar"]')).toBeNull();
    });

    it('表示中は document.body に aria-busy="true" が付与される', () => {
        showLoadingIndicator();
        expect(document.body.getAttribute('aria-busy')).toBe('true');
    });

    it('非表示にすると aria-busy 属性が外れる', () => {
        showLoadingIndicator();
        hideLoadingIndicator();
        expect(document.body.hasAttribute('aria-busy')).toBe(false);
    });

    it('複数回 show を呼んでも要素が重複しない', () => {
        showLoadingIndicator();
        showLoadingIndicator();
        expect(document.querySelectorAll('[role="progressbar"]').length).toBe(1);
    });

    it('要素が無い状態で hide を呼んでも例外を投げない', () => {
        expect(() => hideLoadingIndicator()).not.toThrow();
    });

    it('engine-registry に showLoadingIndicator / hideLoadingIndicator が登録される', () => {
        expect(registryGet('showLoadingIndicator')).toBe(showLoadingIndicator);
        expect(registryGet('hideLoadingIndicator')).toBe(hideLoadingIndicator);
    });
});
