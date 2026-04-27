import { describe, it, expect, beforeAll } from 'vitest';

let CShadowEquipController;

beforeAll(async () => {
    window.HtmlRemoveAllChild     = () => {};
    window.HtmlCreateElementOption = () => {};
    const mod = await import('../../ro4/m/js/CShadowEquipController.js');
    CShadowEquipController = mod.CShadowEquipController;
});

describe('CShadowEquipController', () => {
    it('CShadowEquipController を export する', () => {
        expect(typeof CShadowEquipController).toBe('function');
    });

    it('window compat ブロックで window.CShadowEquipController が設定される', () => {
        expect(window.CShadowEquipController).toBe(CShadowEquipController);
    });

    it('window.g_shadowEquipController が設定される', () => {
        expect(window.g_shadowEquipController).toBeInstanceOf(CShadowEquipController);
    });

    it('インスタンスメソッドが定義される', () => {
        const ctrl = new CShadowEquipController();
        expect(typeof ctrl.initializeHTML).toBe('function');
        expect(typeof ctrl.rebuildAll).toBe('function');
    });
});
