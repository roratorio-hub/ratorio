import { describe, it, expect, vi, beforeAll } from 'vitest';

let CShadowEquipController: any;
let g_shadowEquipController: any;
let bridge: typeof import('@engine/equip/CShadowEquipControllerDataBridge.js');

beforeAll(async () => {
    const mockRoot = {
        querySelectorAll: vi.fn().mockReturnValue([]),
        querySelector: vi.fn().mockReturnValue(null),
    };
    vi.spyOn(document, 'getElementById').mockImplementation((id) =>
        id === 'OBJID_SHADOW_EQUIPS_MIG' ? (mockRoot as any) : null
    );
    const mod = await import('@engine/equip/CShadowEquipController.js');
    CShadowEquipController = mod.CShadowEquipController;
    g_shadowEquipController = mod.g_shadowEquipController;
    bridge = await import('@engine/equip/CShadowEquipControllerDataBridge.js');
});

describe('CShadowEquipController.js', () => {
    describe('エクスポート確認', () => {
        it('g_shadowEquipController がインスタンスである', () => {
            expect(g_shadowEquipController).toBeInstanceOf(CShadowEquipController);
        });
    });

    // 旧 window.g_shadowEquipController 互換テストを置換（48b20b91 で window 登録は除去）。
    // モジュール評価時に registerShadowEquipController 経由で DataBridge へ実体が
    // 配線されることを検証する（saveimage.js / equip.js / hmrndopt.js の参照経路）。
    describe('DataBridge への登録（window 除去後の配線）', () => {
        it('ロード後 isShadowEquipAvailable が true を返す', () => {
            expect(bridge.isShadowEquipAvailable()).toBe(true);
        });
    });

    // 仮引数は bDualShadowArms なのに本体が bDualArms を読んでおり、
    // 呼び出すと必ず ReferenceError になっていた（現状は呼び出し元が無く潜伏）。
    describe('getEqprgnNames', () => {
        const EXPECTED = [
            'eqprgn-arms-right', 'eqprgn-arms-left', 'eqprgn-body',
            'eqprgn-foot', 'eqprgn-accessory-1', 'eqprgn-accessory-2',
        ];

        it('二刀流フラグ false で装備箇所名を返す', () => {
            expect(CShadowEquipController.getEqprgnNames(false)).toEqual(EXPECTED);
        });

        // 二刀流は「現状そのような仕様はない」ため、今は同じ配列を返すのが正
        it('二刀流フラグ true でも同じ装備箇所名を返す', () => {
            expect(CShadowEquipController.getEqprgnNames(true)).toEqual(EXPECTED);
        });
    });
});
