import { describe, it, expect, beforeAll } from 'vitest';

let ITEM_SET_PET_ID_OFFSET: any;
let ITEMSET_ID_LIMIT_WITH_ITEM: any;
let ITEMSET_ID_LIMIT_WITH_CARD: any;
let CheckAndApplyItemSetEquipping: any;

beforeAll(async () => {
	const mod = await import('/workspace/ratorio/roro/m/js/itemset.h.js');
	ITEM_SET_PET_ID_OFFSET = mod.ITEM_SET_PET_ID_OFFSET;
	ITEMSET_ID_LIMIT_WITH_ITEM = mod.ITEMSET_ID_LIMIT_WITH_ITEM;
	ITEMSET_ID_LIMIT_WITH_CARD = mod.ITEMSET_ID_LIMIT_WITH_CARD;
	CheckAndApplyItemSetEquipping = mod.CheckAndApplyItemSetEquipping;
});

describe('itemset.h', () => {

	describe('exports', () => {
		it('ITEM_SET_PET_ID_OFFSET が 100000', () => expect(ITEM_SET_PET_ID_OFFSET).toBe(100000));
		it('ITEMSET_ID_LIMIT_WITH_ITEM が 200', () => expect(ITEMSET_ID_LIMIT_WITH_ITEM).toBe(200));
		it('ITEMSET_ID_LIMIT_WITH_CARD が 200', () => expect(ITEMSET_ID_LIMIT_WITH_CARD).toBe(200));
	});

	describe('CheckAndApplyItemSetEquipping', () => {
		it('空の w_SE でエラーなく完了', () => {
			(globalThis as any).EQUIP_REGION_ID_COUNT = 0;
			(globalThis as any).CARD_REGION_ID_COUNT = 0;
			(globalThis as any).ITEM_ID_NOEQUIP_SET = 0;
			(globalThis as any).CARD_ID_NONE = 0;
			(window as any).w_SE = [];
			(window as any).n_A_Equip = [];
			(window as any).n_A_card = [];
			expect(() => CheckAndApplyItemSetEquipping()).not.toThrow();
		});
	});

});
