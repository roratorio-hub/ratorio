import { describe, it, expect } from 'vitest';
import { UpdateMobDataHtml } from '@roro/hmmob.js';

describe('hmmob.js', () => {
    describe('エクスポート確認', () => {
        it('UpdateMobDataHtml が関数', () => {
            expect(typeof UpdateMobDataHtml).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.UpdateMobDataHtml が設定されている', () => {
            expect((window as any).UpdateMobDataHtml).toBe(UpdateMobDataHtml);
        });
    });
});
