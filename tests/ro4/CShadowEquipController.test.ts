import { describe, it, expect } from 'vitest';
import { CShadowEquipController, g_shadowEquipController } from '@ro4/CShadowEquipController.js';

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
        it('window.CShadowEquipController が設定されている', () => {
            expect((window as any).CShadowEquipController).toBe(CShadowEquipController);
        });
        it('window.g_shadowEquipController が設定されている', () => {
            expect((window as any).g_shadowEquipController).toBe(g_shadowEquipController);
        });
    });
});
