import { describe, it, expect, vi, beforeAll } from 'vitest';

let CShadowEquipController: any;
let g_shadowEquipController: any;

beforeAll(async () => {
    const mockRoot = {
        querySelectorAll: vi.fn().mockReturnValue([]),
        querySelector: vi.fn().mockReturnValue(null),
    };
    vi.spyOn(document, 'getElementById').mockImplementation((id) =>
        id === 'OBJID_SHADOW_EQUIPS_MIG' ? (mockRoot as any) : null
    );
    const mod = await import('@ro4/CShadowEquipController.js');
    CShadowEquipController = mod.CShadowEquipController;
    g_shadowEquipController = mod.g_shadowEquipController;
});

describe('CShadowEquipController.js', () => {
    describe('エクスポート確認', () => {
        it('g_shadowEquipController がインスタンスである', () => {
            expect(g_shadowEquipController).toBeInstanceOf(CShadowEquipController);
        });
    });

    describe('window互換確認', () => {
        it('window.g_shadowEquipController が設定されている', () => {
            expect((window as any).g_shadowEquipController).toBe(g_shadowEquipController);
        });
    });
});
