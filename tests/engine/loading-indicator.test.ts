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

    // 実ブラウザ確認（Firefox）で発覚: prefers-reduced-motion 環境では
    // スイープが animation: none の静止バーになり「読み込み中」に見えないという
    // 報告があった。opacity のパルスアニメーションに差し替えたので、
    // reduced-motion 分岐が再び animation: none に戻っていないことを固定する。
    it('prefers-reduced-motion 環境でも animation: none にはならない（opacityパルスへフォールバック）', () => {
        showLoadingIndicator();
        const styleText = document.getElementById('loadingIndicatorStyle')?.textContent ?? '';
        const reducedMotionBlock = styleText.match(/prefers-reduced-motion[\s\S]*?\}\s*\}/)?.[0] ?? '';
        expect(reducedMotionBlock).not.toContain('animation: none');
        expect(reducedMotionBlock).toContain('loading-indicator-pulse');
    });
});
