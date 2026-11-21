import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { ItemObjNew } from '@engine/equip/item.dat.js';
import { CardSortOBJ } from '@engine/equip/card.dat.js';
import { CARD_KIND_ARMS, CARD_KIND_BODY, CARD_KIND_NONE } from '@engine/const/EnumCardKind.js';
import { CONST_DATA_KIND_ENCHANT_LIST } from '@engine/const/EnumConstDataKind.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_SHADOW_BODY } from '@engine/const/EnumEquipRegionId.js';
import {
    GetSlotCardIds, GetSlotCategoryIds, ResetEquipSlotState, SetSlotCardId, SetSlotCategoryId,
} from '@engine/equip/equip-slot-state.js';
import { GetEquipRndOptTableKind, GetEquipRndOptTableValue, SetEquipRndOptTable } from '@engine/equip/rndopttype.h.js';

let g_constDataManager: any;
let mod: typeof import('@engine/equip/equip.js');
let choicesMod: typeof import('@engine/equip/card-slot-choices.js');

beforeAll(async () => {
    g_constDataManager = (await import('/workspace/ratorio/engine/runtime/global.js')).g_constDataManager;
    await import('/workspace/ratorio/engine/data/mig.enchlist.dat.js');
    choicesMod = await import('/workspace/ratorio/engine/equip/card-slot-choices.js');
    mod = await import('/workspace/ratorio/engine/equip/equip.js');
});

beforeEach(() => {
    ResetEquipSlotState();
    for (let idx = 0; idx < 5; idx++) {
        SetEquipRndOptTable(EQUIP_REGION_ID_ARMS, idx, 0, 0);
        SetEquipRndOptTable(EQUIP_REGION_ID_SHADOW_BODY, idx, 0, 0);
    }
});

const findItemId = (name: string) => (ItemObjNew as any[]).findIndex((row) => row && row[8] === name);
function findItemWithoutEnchant(): number {
    const manager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
    return (ItemObjNew as any[]).findIndex((row, i) => i > 0 && row && manager.GetEnchListIdArrayByItemId(i).length === 0);
}

describe('ResetSlotStateOnChangeEquip: 装備変更時の正本の更新（表示モードに依存しない）', () => {
    it('引き継げるカードは残し、一般エンチャントとその種別は初期化する', () => {
        const itemId = findItemId('フロンティアダガー');
        const card = CardSortOBJ[CARD_KIND_NONE][1];
        const enchant = choicesMod.CollectCardSlotChoices(EQUIP_REGION_ID_ARMS, itemId)[2].groups[0].options[0].cardId;
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 0, card);
        SetSlotCardId(EQUIP_REGION_ID_ARMS, 2, enchant);
        SetSlotCategoryId(EQUIP_REGION_ID_ARMS, 2, 55);

        mod.ResetSlotStateOnChangeEquip(EQUIP_REGION_ID_ARMS, itemId);

        expect(GetSlotCardIds(EQUIP_REGION_ID_ARMS)).toEqual([card, 0, 0, 0]);
        expect(GetSlotCategoryIds(EQUIP_REGION_ID_ARMS)).toEqual([0, 0, 0, 0]);
    });

    it('ランダムオプションはなしに戻す', () => {
        SetEquipRndOptTable(EQUIP_REGION_ID_ARMS, 1, 7, 3);
        mod.ResetSlotStateOnChangeEquip(EQUIP_REGION_ID_ARMS, findItemId('フロンティアダガー'));
        expect(GetEquipRndOptTableKind(EQUIP_REGION_ID_ARMS, 1)).toBe(0);
        expect(GetEquipRndOptTableValue(EQUIP_REGION_ID_ARMS, 1)).toBe(0);
    });

    it('シャドウ装備はカードの正本に触れず、ランダムオプションだけをなしに戻す', () => {
        SetSlotCardId(EQUIP_REGION_ID_BODY, 0, 138);
        SetEquipRndOptTable(EQUIP_REGION_ID_SHADOW_BODY, 0, 7, 3);

        mod.ResetSlotStateOnChangeEquip(EQUIP_REGION_ID_SHADOW_BODY, findItemWithoutEnchant());

        expect(GetSlotCardIds(EQUIP_REGION_ID_BODY)).toEqual([138, 0, 0, 0]);
        expect(GetEquipRndOptTableKind(EQUIP_REGION_ID_SHADOW_BODY, 0)).toBe(0);
    });

    it('新しいアイテムで選べないカードは外れる', () => {
        const armsCard = CardSortOBJ[CARD_KIND_ARMS].find((id: number) => id !== 0 && !CardSortOBJ[CARD_KIND_BODY].includes(id))!;
        SetSlotCardId(EQUIP_REGION_ID_BODY, 0, armsCard);
        mod.ResetSlotStateOnChangeEquip(EQUIP_REGION_ID_BODY, findItemWithoutEnchant());
        expect(GetSlotCardIds(EQUIP_REGION_ID_BODY)).toEqual([0, 0, 0, 0]);
    });
});

describe('RestoreSlotCards: カード・エンチャントを選択肢に合う値で正本へ戻す', () => {
    it('選択肢に有る値は戻り、無い値は「なし」になる', () => {
        const itemId = findItemWithoutEnchant();
        const bodyCard = CardSortOBJ[CARD_KIND_BODY].find((id: number) => id !== 0)!;
        mod.RestoreSlotCards(EQUIP_REGION_ID_BODY, itemId, [bodyCard, 999999, 5, 5], [0, 0, 0, 0]);
        // 先頭はカード枠で有効、2番目以降は使用しない枠
        expect(GetSlotCardIds(EQUIP_REGION_ID_BODY)).toEqual([bodyCard, 0, 0, 0]);
    });

    it('エンチャント枠の種別も戻る', () => {
        const itemId = findItemId('フロンティアダガー');
        const choices = choicesMod.CollectCardSlotChoices(EQUIP_REGION_ID_ARMS, itemId);
        const group = choices[3].groups[0];
        mod.RestoreSlotCards(EQUIP_REGION_ID_ARMS, itemId, [0, 0, 0, group.options[0].cardId], [0, 0, 0, group.enchListId]);
        expect(GetSlotCardIds(EQUIP_REGION_ID_ARMS)[3]).toBe(group.options[0].cardId);
        expect(GetSlotCategoryIds(EQUIP_REGION_ID_ARMS)[3]).toBe(Number(group.enchListId));
    });
});
