import { describe, it, expect } from 'vitest';
import {
    g_QuickControlSW,
    OnClickQuickControlSW,
    RefreshQuickControlHeaderLearned,
    OnInputQuickControlItemPack,
    OnClickQuickControlSetItemPack,
    OnClickQuickControlSetItemPackSubForItem,
    OnClickQuickControlSetItemPackSubForCard,
    OnClickQuickControlSetItemPackSubForClearShadowEquipAll,
    OnClickQuickControlSetItemPackSubForClearEquipAll,
    OnClickQuickControlSetItemPackSubForClearEquipAllSub,
    OnClickQuickControlSetItemPackSubForClearRefineAll,
    OnClickQuickControlSetItemPackSubForClearCardAll,
    OnClickQuickControlSetItemPackSubForClearCardAllSub,
} from '@roro/quickcontrol.js';

describe('quickcontrol.js', () => {
    describe('エクスポート確認', () => {
        it('g_QuickControlSW が boolean', () => {
            expect(typeof g_QuickControlSW).toBe('boolean');
        });
        it('g_QuickControlSW の初期値が false', () => {
            expect(g_QuickControlSW).toBe(false);
        });

        const functions = {
            OnClickQuickControlSW,
            RefreshQuickControlHeaderLearned,
            OnInputQuickControlItemPack,
            OnClickQuickControlSetItemPack,
            OnClickQuickControlSetItemPackSubForItem,
            OnClickQuickControlSetItemPackSubForCard,
            OnClickQuickControlSetItemPackSubForClearShadowEquipAll,
            OnClickQuickControlSetItemPackSubForClearEquipAll,
            OnClickQuickControlSetItemPackSubForClearEquipAllSub,
            OnClickQuickControlSetItemPackSubForClearRefineAll,
            OnClickQuickControlSetItemPackSubForClearCardAll,
            OnClickQuickControlSetItemPackSubForClearCardAllSub,
        };
        for (const [name, fn] of Object.entries(functions)) {
            it(`${name} が関数`, () => {
                expect(typeof fn).toBe('function');
            });
        }
    });

    describe('window互換確認', () => {
        const windowNames = [
            'OnClickQuickControlSW',
        ];
        for (const name of windowNames) {
            it(`window.${name} が設定されている`, () => {
                expect(typeof (window as any)[name]).toBe('function');
            });
        }
    });
});
