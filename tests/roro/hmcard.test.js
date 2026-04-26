import { describe, it, expect, beforeAll } from 'vitest';

// CardShortObj 配列は CARD_ID_* 定数をモジュール評価時に参照するため、
// 動的 import の前にモックを設定する。
const CARD_CONST_NAMES = [
    'CARD_ID_MAX', 'CARD_ID_NONE',
    'CARD_ID_PHYSICAL_RACE_ALL_20UP', 'CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP',
    'CARD_ID_PHYSICAL_SIZE_ALL_15UP', 'CARD_ID_MAGICAL_RACE_ALL_10UP',
    'CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP', 'CARD_ID_MAGICAL_SIZE_ALL_8UP',
    'CARD_ID_ARCHER_SKELETON', 'CARD_ID_POWERFUL_A_SKELETON',
    'CARD_ID_SHINENNO_KISHI', 'CARD_ID_OSEN_SARETA_SAMAYOU_MONO',
    'CARD_ID_GIGANTES',
];

let ClearCardSlotAll, ClearCardSlot, RebuildCardSelect;
let RebuildCardSelectSubCollectEnchListData;
let RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo;
let RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki;
let RebuildCardSelectSubSortCollectedEnchListData;
let BuildUpCardSlotsCard, BuildUpCardSlotsEnchant, BuildUpCardSlotsMIG;
let SetCardSlotEnabilityAll, SetCardSlotEnability, ApplyCardShort;

beforeAll(async () => {
    for (const name of CARD_CONST_NAMES) {
        window[name] = 0;
    }
    const mod = await import('../../roro/m/js/hmcard.js');
    ClearCardSlotAll   = mod.ClearCardSlotAll;
    ClearCardSlot      = mod.ClearCardSlot;
    RebuildCardSelect  = mod.RebuildCardSelect;
    RebuildCardSelectSubCollectEnchListData = mod.RebuildCardSelectSubCollectEnchListData;
    RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo = mod.RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo;
    RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki = mod.RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki;
    RebuildCardSelectSubSortCollectedEnchListData = mod.RebuildCardSelectSubSortCollectedEnchListData;
    BuildUpCardSlotsCard     = mod.BuildUpCardSlotsCard;
    BuildUpCardSlotsEnchant  = mod.BuildUpCardSlotsEnchant;
    BuildUpCardSlotsMIG      = mod.BuildUpCardSlotsMIG;
    SetCardSlotEnabilityAll  = mod.SetCardSlotEnabilityAll;
    SetCardSlotEnability     = mod.SetCardSlotEnability;
    ApplyCardShort           = mod.ApplyCardShort;
});

describe('hmcard', () => {
    it('全関数を export する', () => {
        expect(typeof ClearCardSlotAll).toBe('function');
        expect(typeof ClearCardSlot).toBe('function');
        expect(typeof RebuildCardSelect).toBe('function');
        expect(typeof RebuildCardSelectSubCollectEnchListData).toBe('function');
        expect(typeof RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo).toBe('function');
        expect(typeof RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki).toBe('function');
        expect(typeof RebuildCardSelectSubSortCollectedEnchListData).toBe('function');
        expect(typeof BuildUpCardSlotsCard).toBe('function');
        expect(typeof BuildUpCardSlotsEnchant).toBe('function');
        expect(typeof BuildUpCardSlotsMIG).toBe('function');
        expect(typeof SetCardSlotEnabilityAll).toBe('function');
        expect(typeof SetCardSlotEnability).toBe('function');
        expect(typeof ApplyCardShort).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.ClearCardSlotAll).toBe(ClearCardSlotAll);
        expect(window.RebuildCardSelect).toBe(RebuildCardSelect);
        expect(window.RebuildCardSelectSubCollectEnchListData).toBe(RebuildCardSelectSubCollectEnchListData);
        expect(window.SetCardSlotEnabilityAll).toBe(SetCardSlotEnabilityAll);
        expect(window.ApplyCardShort).toBe(ApplyCardShort);
    });

    it('window.CardShortObj が配列として設定される', () => {
        expect(Array.isArray(window.CardShortObj)).toBe(true);
    });
});
