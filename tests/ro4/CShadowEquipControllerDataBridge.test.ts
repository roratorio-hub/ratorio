import { describe, it, expect, beforeEach, vi } from 'vitest';

// 依存ゼロブリッジ。モジュールレベル state (_ctrl) を各テストで初期化するため
// vi.resetModules() → 動的 re-import で毎回まっさらなインスタンスを得る。
let bridge: typeof import('@ro4/CShadowEquipControllerDataBridge.js');

beforeEach(async () => {
    vi.resetModules();
    bridge = await import('@ro4/CShadowEquipControllerDataBridge.js');
});

describe('CShadowEquipControllerDataBridge.js', () => {
    describe('未登録環境（roro/other・単体テスト）', () => {
        it('isShadowEquipAvailable は false を返す', () => {
            expect(bridge.isShadowEquipAvailable()).toBe(false);
        });
        it('getShadowEquippedID は型整合のデフォルト 0 を返す', () => {
            expect(bridge.getShadowEquippedID('eqprgn-body')).toBe(0);
        });
        it('getShadowRefined は型整合のデフォルト 0 を返す', () => {
            expect(bridge.getShadowRefined('eqprgn-body')).toBe(0);
        });
        it('getShadowRndOptInfoArray は型整合のデフォルト空配列を返す', () => {
            expect(bridge.getShadowRndOptInfoArray('eqprgn-body')).toEqual([]);
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

        it('getShadowEquippedID は selector を実体へ渡し戻り値をそのまま返す', () => {
            const ctrl = { getEquippedID: vi.fn().mockReturnValue(4001) };
            bridge.registerShadowEquipController(ctrl as any);
            expect(bridge.getShadowEquippedID('eqprgn-arms-right')).toBe(4001);
            expect(ctrl.getEquippedID).toHaveBeenCalledWith('eqprgn-arms-right');
        });

        it('getShadowRefined は selector を実体へ渡し戻り値をそのまま返す', () => {
            const ctrl = { getRefined: vi.fn().mockReturnValue(7) };
            bridge.registerShadowEquipController(ctrl as any);
            expect(bridge.getShadowRefined('eqprgn-body')).toBe(7);
            expect(ctrl.getRefined).toHaveBeenCalledWith('eqprgn-body');
        });

        it('getShadowRndOptInfoArray は実体が返す配列をそのまま返す', () => {
            const optArray = [[3, 5], [0, 0]];
            const ctrl = { getRndOptInfoArray: vi.fn().mockReturnValue(optArray) };
            bridge.registerShadowEquipController(ctrl as any);
            expect(bridge.getShadowRndOptInfoArray('eqprgn-foot')).toBe(optArray);
            expect(ctrl.getRndOptInfoArray).toHaveBeenCalledWith('eqprgn-foot');
        });

        it('shadowEquipRebuildAll は実体の rebuildAll を呼ぶ', () => {
            const ctrl = { rebuildAll: vi.fn() };
            bridge.registerShadowEquipController(ctrl as any);
            bridge.shadowEquipRebuildAll();
            expect(ctrl.rebuildAll).toHaveBeenCalledOnce();
        });
    });
});
