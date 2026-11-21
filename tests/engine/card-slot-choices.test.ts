import { describe, it, expect, beforeAll } from 'vitest';
import { ItemObjNew, ITEM_ID_RUNE_HELM } from '@engine/equip/item.dat.js';
import { CardSortOBJ } from '@engine/equip/card.dat.js';
import { CARD_KIND_ARMS, CARD_KIND_BODY, CARD_KIND_NONE } from '@engine/const/EnumCardKind.js';
import { CONST_DATA_KIND_ENCHANT_LIST } from '@engine/const/EnumConstDataKind.js';
import {
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_UNDER,
} from '@engine/const/EnumEquipRegionId.js';
import {
    CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_BODY, CARD_REGION_ID_ENCHANT_BODY_1,
} from '@engine/runtime/common.js';

let mod: typeof import('@engine/equip/card-slot-choices.js');
let g_constDataManager: any;

beforeAll(async () => {
    g_constDataManager = (await import('/workspace/ratorio/engine/runtime/global.js')).g_constDataManager;
    await import('/workspace/ratorio/engine/data/mig.enchlist.dat.js');
    mod = await import('/workspace/ratorio/engine/equip/card-slot-choices.js');
});

const findItemId = (name: string) => (ItemObjNew as any[]).findIndex((row) => row && row[8] === name);

/** エンチャントが一切紐づかないアイテム（最初の1件） */
function findItemWithoutEnchant(): number {
    const manager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
    const id = (ItemObjNew as any[]).findIndex((row, i) => i > 0 && row && manager.GetEnchListIdArrayByItemId(i).length === 0);
    expect(id).toBeGreaterThan(0);
    return id;
}

describe('CollectCardSlotChoices: スロットごとの選択肢', () => {
    it('エンチャントの無い防具: 先頭スロットだけカード、2番目以降は使用しない', () => {
        const choices = mod.CollectCardSlotChoices(EQUIP_REGION_ID_BODY, findItemWithoutEnchant());
        expect(choices.map((c: any) => c.type)).toEqual(['card', 'dummy', 'dummy', 'dummy']);
        expect(choices[0].cardIds).toEqual(CardSortOBJ[CARD_KIND_BODY]);
        expect(choices[0].selectionSlot).toBe(0);
    });

    it('頭下段: エンチャントが無ければすべて使用しない', () => {
        const choices = mod.CollectCardSlotChoices(EQUIP_REGION_ID_HEAD_UNDER, findItemWithoutEnchant());
        expect(choices.map((c: any) => c.type)).toEqual(['dummy', 'dummy', 'dummy', 'dummy']);
    });

    it('エンチャントの無い武器: 全スロットがカード（1枚目は専用の一覧）で、現在値は同じスロットから引き継ぐ', () => {
        const choices = mod.CollectCardSlotChoices(EQUIP_REGION_ID_ARMS, findItemWithoutEnchant());
        expect(choices.map((c: any) => c.type)).toEqual(['card', 'card', 'card', 'card']);
        expect(choices[0].cardIds).toEqual(CardSortOBJ[CARD_KIND_NONE]);
        expect(choices[1].cardIds).toEqual(CardSortOBJ[CARD_KIND_ARMS]);
        expect(choices.map((c: any) => c.selectionSlot)).toEqual([0, 1, 2, 3]);
    });

    it('フロンティア武器: 第2〜4スロットは一般エンチャント。「エンチャントなし」を持ち、種別ごとのグループにまとまる', () => {
        const itemId = findItemId('フロンティアダガー');
        expect(itemId).toBeGreaterThan(0);
        const choices = mod.CollectCardSlotChoices(EQUIP_REGION_ID_ARMS_LEFT, itemId);
        expect(choices[0].type).toBe('card');
        for (const slot of [1, 2, 3]) {
            expect(choices[slot].type).toBe('enchant');
            expect(choices[slot].hasNone).toBe(true);
            expect(choices[slot].groups.length).toBeGreaterThan(0);
            for (const group of choices[slot].groups) {
                expect(typeof group.label).toBe('string');
                expect(group.options.length).toBeGreaterThan(0);
                for (const option of group.options) {
                    expect(option.name.length).toBeGreaterThan(0);
                }
            }
        }
    });

    it('同じ種別内の重複したエンチャントは1つにまとめる', () => {
        const itemId = findItemId('フロンティアダガー');
        const choices = mod.CollectCardSlotChoices(EQUIP_REGION_ID_ARMS, itemId);
        for (const slot of [1, 2, 3]) {
            for (const group of choices[slot].groups) {
                const ids = group.options.map((o: any) => o.cardId);
                expect(new Set(ids).size).toBe(ids.length);
            }
        }
    });

    it('ルーンヘルムの第4スロットは「エンチャントなし」を持たない', () => {
        const choices = mod.CollectCardSlotChoices(EQUIP_REGION_ID_HEAD_TOP, ITEM_ID_RUNE_HELM);
        expect(choices[3].type).toBe('enchant');
        expect(choices[3].hasNone).toBe(false);
    });
});

describe('ResolveCardSelection: 装備変更で引き継げるカード', () => {
    const cardChoice = { type: 'card', cardIds: [0, 10, 20], selectionSlot: 0 };

    it('選択肢に有るカードはそのまま引き継ぐ', () => {
        expect(mod.ResolveCardSelection(cardChoice, 20)).toBe(20);
    });
    it('選択肢に無いカードは「なし」(0) にする', () => {
        expect(mod.ResolveCardSelection(cardChoice, 99)).toBe(0);
        expect(mod.ResolveCardSelection(cardChoice, undefined as any)).toBe(0);
    });
    it('エンチャント枠・使用しない枠はカードを引き継がない', () => {
        expect(mod.ResolveCardSelection({ type: 'enchant', hasNone: true, groups: [] }, 10)).toBe(0);
        expect(mod.ResolveCardSelection({ type: 'dummy' }, 10)).toBe(0);
    });
});

describe('NormalizeCardSelection: ロードしたカード・種別の正規化', () => {
    const enchantChoice = {
        type: 'enchant',
        hasNone: true,
        groups: [
            { enchListId: 100, label: 'A', options: [{ cardId: 1, name: 'a1' }, { cardId: 2, name: 'a2' }] },
            { enchListId: 200, label: 'B', options: [{ cardId: 2, name: 'b2' }, { cardId: 3, name: 'b3' }] },
        ],
    };

    it('「なし」はエンチャント種別を持たない', () => {
        expect(mod.NormalizeCardSelection(enchantChoice, 0, 100)).toEqual({ cardId: 0, enchListId: 0 });
    });
    it('指定の種別内に有れば、その種別を採用する（他の種別にも同じカードが有っても）', () => {
        expect(mod.NormalizeCardSelection(enchantChoice, 2, 200)).toEqual({ cardId: 2, enchListId: 200 });
        expect(mod.NormalizeCardSelection(enchantChoice, 2, 100)).toEqual({ cardId: 2, enchListId: 100 });
    });
    it('指定の種別に無ければ、全体から探して見つかった種別を採用する', () => {
        expect(mod.NormalizeCardSelection(enchantChoice, 3, 100)).toEqual({ cardId: 3, enchListId: 200 });
    });
    it('種別が不明(0)でも、全体から探して見つかった種別を採用する', () => {
        expect(mod.NormalizeCardSelection(enchantChoice, 1, 0)).toEqual({ cardId: 1, enchListId: 100 });
    });
    it('どこにも無ければ、カードIDごと「なし」にする', () => {
        expect(mod.NormalizeCardSelection(enchantChoice, 9, 100)).toEqual({ cardId: 0, enchListId: 0 });
        expect(mod.NormalizeCardSelection(enchantChoice, 9, 0)).toEqual({ cardId: 0, enchListId: 0 });
    });
    it('カード枠は種別を持たない。選択肢に無ければ「なし」にする', () => {
        const cardChoice = { type: 'card', cardIds: [0, 10], selectionSlot: 0 };
        expect(mod.NormalizeCardSelection(cardChoice, 10, 5)).toEqual({ cardId: 10, enchListId: 0 });
        expect(mod.NormalizeCardSelection(cardChoice, 11, 5)).toEqual({ cardId: 0, enchListId: 0 });
    });
    it('使用しない枠には何も入れられない', () => {
        expect(mod.NormalizeCardSelection({ type: 'dummy' }, 10, 5)).toEqual({ cardId: 0, enchListId: 0 });
    });
});

describe('GetCardRegionId: 装備領域・スロットに対応するカード領域ID', () => {
    it('武器はスロット番号に連動する', () => {
        expect(mod.GetCardRegionId(EQUIP_REGION_ID_ARMS, 0)).toBe(CARD_REGION_ID_ARMS_RIGHT_1);
        expect(mod.GetCardRegionId(EQUIP_REGION_ID_ARMS_LEFT, 2)).toBe(CARD_REGION_ID_ARMS_LEFT_3);
    });
    it('武器以外は先頭がカード、2番目以降が一般エンチャント', () => {
        expect(mod.GetCardRegionId(EQUIP_REGION_ID_BODY, 0)).toBe(CARD_REGION_ID_BODY);
        expect(mod.GetCardRegionId(EQUIP_REGION_ID_BODY, 1)).toBe(CARD_REGION_ID_ENCHANT_BODY_1);
    });
    it('対象外の領域は undefined', () => {
        expect(mod.GetCardRegionId(-1, 0)).toBeUndefined();
    });
});
