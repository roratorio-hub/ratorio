import { describe, it, expect, vi, beforeAll } from 'vitest';

let CShadowEquipController: any;
let g_shadowEquipController: any;

beforeAll(async () => {
    const mockRoot = {
        querySelectorAll: vi.fn().mockReturnValue([]),
        querySelector: vi.fn().mockReturnValue(null),
    };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockRoot as any);
    const mod = await import('@ro4/CShadowEquipController.js');
    CShadowEquipController = mod.CShadowEquipController;
    g_shadowEquipController = mod.g_shadowEquipController;
});

describe('CShadowEquipController.js', () => {
    describe('エクスポート確認', () => {
        it('CShadowEquipController クラスがエクスポートされている', () => {
            expect(typeof CShadowEquipController).toBe('function');
        });
        it('g_shadowEquipController がインスタンスである', () => {
            expect(g_shadowEquipController).toBeInstanceOf(CShadowEquipController);
        });
    });

    describe('静的 getter 確認', () => {
        it('EQPRGN_NAME_ARMS_RIGHT が文字列', () => {
            expect(typeof CShadowEquipController.EQPRGN_NAME_ARMS_RIGHT).toBe('string');
        });
        it('EQPRGN_NAME_ARMS_LEFT が文字列', () => {
            expect(typeof CShadowEquipController.EQPRGN_NAME_ARMS_LEFT).toBe('string');
        });
        it('EQPRGN_NAME_HEAD_TOP が文字列', () => {
            expect(typeof CShadowEquipController.EQPRGN_NAME_HEAD_TOP).toBe('string');
        });
        it('EQPRGN_NAME_BODY が文字列', () => {
            expect(typeof CShadowEquipController.EQPRGN_NAME_BODY).toBe('string');
        });
    });

    describe('window互換確認', () => {
        it('window.g_shadowEquipController が設定されている', () => {
            expect((window as any).g_shadowEquipController).toBe(g_shadowEquipController);
        });
    });
});
