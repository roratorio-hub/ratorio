import { describe, it, expect, beforeEach, vi } from 'vitest';

// 依存ゼロブリッジ。モジュールレベル state (_ctrl) を各テストで初期化するため
// vi.resetModules() → 動的 re-import で毎回まっさらなインスタンスを得る。
let bridge: typeof import('@engine/equip/CShadowEquipControllerDataBridge.js');

beforeEach(async () => {
    vi.resetModules();
    bridge = await import('@engine/equip/CShadowEquipControllerDataBridge.js');
});

describe('CShadowEquipControllerDataBridge.js', () => {
    describe('未登録環境（pages/・単体テスト）', () => {
        it('isShadowEquipAvailable は false を返す', () => {
            expect(bridge.isShadowEquipAvailable()).toBe(false);
        });
        it('shadowEquipRebuildAll は例外を投げず no-op で完了する', () => {
            expect(() => bridge.shadowEquipRebuildAll()).not.toThrow();
        });
    });

    describe('登録後は実体へ委譲する', () => {
        it('registerShadowEquipController 後 isShadowEquipAvailable が true になる', () => {
            expect(bridge.isShadowEquipAvailable()).toBe(false);
            bridge.registerShadowEquipController({} as any);
            expect(bridge.isShadowEquipAvailable()).toBe(true);
        });

        it('shadowEquipRebuildAll は実体の rebuildAll を呼ぶ', () => {
            const ctrl = { rebuildAll: vi.fn() };
            bridge.registerShadowEquipController(ctrl as any);
            bridge.shadowEquipRebuildAll();
            expect(ctrl.rebuildAll).toHaveBeenCalledOnce();
        });
    });
});
