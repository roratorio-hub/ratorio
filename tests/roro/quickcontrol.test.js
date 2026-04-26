import { describe, it, expect } from 'vitest';
import {
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
} from '../../roro/m/js/quickcontrol.js';

describe('quickcontrol', () => {
    it('全関数を export する', () => {
        expect(typeof OnClickQuickControlSW).toBe('function');
        expect(typeof RefreshQuickControlHeaderLearned).toBe('function');
        expect(typeof OnInputQuickControlItemPack).toBe('function');
        expect(typeof OnClickQuickControlSetItemPack).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForItem).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForCard).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearShadowEquipAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearEquipAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearEquipAllSub).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearRefineAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearCardAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearCardAllSub).toBe('function');
    });

    it('window compat ブロックで全関数が window に設定される', () => {
        expect(window.OnClickQuickControlSW).toBe(OnClickQuickControlSW);
        expect(window.RefreshQuickControlHeaderLearned).toBe(RefreshQuickControlHeaderLearned);
        expect(window.OnClickQuickControlSetItemPack).toBe(OnClickQuickControlSetItemPack);
    });
});
