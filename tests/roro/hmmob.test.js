import { describe, it, expect } from 'vitest';
import { UpdateMobDataHtml } from '../../roro/m/js/hmmob.js';

describe('hmmob', () => {
    it('UpdateMobDataHtml を export する', () => {
        expect(typeof UpdateMobDataHtml).toBe('function');
    });

    it('window.UpdateMobDataHtml が設定される', () => {
        expect(window.UpdateMobDataHtml).toBe(UpdateMobDataHtml);
    });
});
