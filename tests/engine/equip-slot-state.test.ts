import { describe, it, expect, beforeEach } from 'vitest';
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY,
    EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHADOW_BODY,
} from '@engine/const/EnumEquipRegionId.js';
import {
    ClearSlotCards, GetCostumeId, GetEquipRegionIdByObjIdPrefix, GetEquipRegionObjIdPrefix, GetSlotCardId, GetSlotCardIds,
    GetSlotCategoryId, GetSlotCategoryIds, IsMainEquipRegion, MAIN_EQUIP_REGION_ID_ARRAY, ResetEquipSlotState, SetCostumeId,
    SetSlotCardId, SetSlotCategoryId, SwapSlotCards,
} from '@engine/equip/equip-slot-state.js';

beforeEach(() => ResetEquipSlotState());

describe('equip-slot-state: カード・エンチャント種別', () => {
    it('初期状態はすべて 0', () => {
        for (const eqpRgnId of MAIN_EQUIP_REGION_ID_ARRAY) {
            expect(GetSlotCardIds(eqpRgnId)).toEqual([0, 0, 0, 0]);
            expect(GetSlotCategoryIds(eqpRgnId)).toEqual([0, 0, 0, 0]);
        }
    });

    it('設定した値は、部位・スロットごとに独立して保持される', () => {
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 0, 4302);
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 2, 2518);
        SetSlotCardId(EQUIP_REGION_ID_BODY, 0, 138);
        SetSlotCategoryId(EQUIP_REGION_ID_ARMS, 2, 7);

        expect(GetSlotCardIds(EQUIP_REGION_ID_ARMS)).toEqual([4302, 0, 2518, 0]);
        expect(GetSlotCardId(EQUIP_REGION_ID_BODY, 0)).toBe(138);
        expect(GetSlotCardId(EQUIP_REGION_ID_ARMS_LEFT, 0)).toBe(0);
        expect(GetSlotCategoryIds(EQUIP_REGION_ID_ARMS)).toEqual([0, 0, 7, 0]);
        expect(GetSlotCategoryId(EQUIP_REGION_ID_BODY, 2)).toBe(0);
    });

    it('カードIDを変えても、エンチャント種別IDは変わらない（別々に更新する）', () => {
        SetSlotCardId(EQUIP_REGION_ID_BODY, 1, 10);
        SetSlotCategoryId(EQUIP_REGION_ID_BODY, 1, 5);
        SetSlotCardId(EQUIP_REGION_ID_BODY, 1, 11);
        expect(GetSlotCategoryId(EQUIP_REGION_ID_BODY, 1)).toBe(5);
    });

    it('取得した配列を書き換えても、保持している値は変わらない', () => {
        SetSlotCardId(EQUIP_REGION_ID_BODY, 0, 138);
        const copy = GetSlotCardIds(EQUIP_REGION_ID_BODY);
        copy[0] = 999;
        expect(GetSlotCardId(EQUIP_REGION_ID_BODY, 0)).toBe(138);
        const categories = GetSlotCategoryIds(EQUIP_REGION_ID_BODY);
        categories[0] = 999;
        expect(GetSlotCategoryId(EQUIP_REGION_ID_BODY, 0)).toBe(0);
    });

    it('ClearSlotCards: 当該部位のカードとエンチャント種別だけをなしにする', () => {
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 1, 5);
        SetSlotCategoryId(EQUIP_REGION_ID_ARMS, 1, 6);
        SetSlotCardId(EQUIP_REGION_ID_BODY, 0, 7);
        ClearSlotCards(EQUIP_REGION_ID_ARMS);
        expect(GetSlotCardIds(EQUIP_REGION_ID_ARMS)).toEqual([0, 0, 0, 0]);
        expect(GetSlotCategoryIds(EQUIP_REGION_ID_ARMS)).toEqual([0, 0, 0, 0]);
        expect(GetSlotCardId(EQUIP_REGION_ID_BODY, 0)).toBe(7);
    });

    it('SwapSlotCards: 2部位のカードとエンチャント種別を入れ替える', () => {
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 0, 1);
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 3, 4);
        SetSlotCategoryId(EQUIP_REGION_ID_ARMS, 3, 40);
        SetSlotCardId(EQUIP_REGION_ID_ARMS_LEFT, 1, 22);
        SwapSlotCards(EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT);
        expect(GetSlotCardIds(EQUIP_REGION_ID_ARMS)).toEqual([0, 22, 0, 0]);
        expect(GetSlotCardIds(EQUIP_REGION_ID_ARMS_LEFT)).toEqual([1, 0, 0, 4]);
        expect(GetSlotCategoryIds(EQUIP_REGION_ID_ARMS_LEFT)).toEqual([0, 0, 0, 40]);
        expect(GetSlotCategoryIds(EQUIP_REGION_ID_ARMS)).toEqual([0, 0, 0, 0]);
    });

    it('ResetEquipSlotState: 全部位を初期状態へ戻す', () => {
        SetSlotCardId(EQUIP_REGION_ID_BODY, 0, 7);
        SetCostumeId(EQUIP_REGION_ID_HEAD_UNDER, 3);
        ResetEquipSlotState();
        expect(GetSlotCardId(EQUIP_REGION_ID_BODY, 0)).toBe(0);
        expect(GetCostumeId(EQUIP_REGION_ID_HEAD_UNDER)).toBe(0);
    });

    it('本体装備以外の領域・範囲外のスロットは、何も書き込まず 0 を返す', () => {
        SetSlotCardId(EQUIP_REGION_ID_SHADOW_BODY, 0, 5);
        SetSlotCardId(EQUIP_REGION_ID_BODY, 4, 5);
        SetSlotCardId(EQUIP_REGION_ID_BODY, -1, 5);
        expect(GetSlotCardId(EQUIP_REGION_ID_SHADOW_BODY, 0)).toBe(0);
        expect(GetSlotCardIds(EQUIP_REGION_ID_SHADOW_BODY)).toEqual([0, 0, 0, 0]);
        expect(GetSlotCardIds(EQUIP_REGION_ID_BODY)).toEqual([0, 0, 0, 0]);
        expect(IsMainEquipRegion(EQUIP_REGION_ID_SHADOW_BODY)).toBe(false);
        expect(IsMainEquipRegion(EQUIP_REGION_ID_BODY)).toBe(true);
    });
});

describe('equip-slot-state: 衣装', () => {
    it('部位ごとに保持する', () => {
        SetCostumeId(EQUIP_REGION_ID_HEAD_UNDER, 1);
        expect(GetCostumeId(EQUIP_REGION_ID_HEAD_UNDER)).toBe(1);
        expect(GetCostumeId(EQUIP_REGION_ID_BODY)).toBe(0);
    });
});

describe('equip-slot-state: 装備領域とIDプリフィックスの対応', () => {
    it('11部位すべてが往復できる', () => {
        expect(MAIN_EQUIP_REGION_ID_ARRAY.length).toBe(11);
        for (const eqpRgnId of MAIN_EQUIP_REGION_ID_ARRAY) {
            const prefix = GetEquipRegionObjIdPrefix(eqpRgnId)!;
            expect(prefix).toMatch(/^OBJID_/);
            expect(GetEquipRegionIdByObjIdPrefix(prefix)).toBe(eqpRgnId);
        }
    });

    it('右手武器・アクセサリの名前', () => {
        expect(GetEquipRegionObjIdPrefix(EQUIP_REGION_ID_ARMS)).toBe('OBJID_ARMS_RIGHT');
        expect(GetEquipRegionObjIdPrefix(EQUIP_REGION_ID_ACCESSORY_1)).toBe('OBJID_ACCESSORY_1');
    });

    it('本体装備以外は undefined', () => {
        expect(GetEquipRegionObjIdPrefix(EQUIP_REGION_ID_SHADOW_BODY)).toBeUndefined();
        expect(GetEquipRegionIdByObjIdPrefix('OBJID_SHADOW_BODY')).toBeUndefined();
    });
});
