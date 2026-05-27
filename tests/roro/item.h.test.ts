import { describe, it, expect, beforeAll } from 'vitest';

// DefinePseudoEnum がモジュール初期化時に toSafeBigInt を使うため、
// dynamic import より前に globalThis に設定する
(globalThis as any).toSafeBigInt = (value: unknown): bigint => BigInt(value as any);

let GetItemKindNameText: any;
let IsDexBasedArms: any;
let IsEffectiveExceededRefinedAtkArms: any;
let IsGunSeriesArms: any;
let GetJobRestrictText: any;
let GetStrPenaltyAvoidStr: any;
let GetEnchantTypeId: any;
let GetRndOptTypeId: any;
let GetSlotText: any;
let GetMaxSlot: any;
let GetItemSP: any;
let GetItemExplainText: any;

beforeAll(async () => {
	await import('/workspace/ratorio/roro/m/js/CGlobalConstManager.js');
	const mod = await import('/workspace/ratorio/roro/m/js/item.h.js');
	GetItemKindNameText = mod.GetItemKindNameText;
	IsDexBasedArms = mod.IsDexBasedArms;
	IsEffectiveExceededRefinedAtkArms = mod.IsEffectiveExceededRefinedAtkArms;
	IsGunSeriesArms = mod.IsGunSeriesArms;
	GetJobRestrictText = mod.GetJobRestrictText;
	GetStrPenaltyAvoidStr = mod.GetStrPenaltyAvoidStr;
	GetEnchantTypeId = mod.GetEnchantTypeId;
	GetRndOptTypeId = mod.GetRndOptTypeId;
	GetSlotText = mod.GetSlotText;
	GetMaxSlot = mod.GetMaxSlot;
	GetItemSP = mod.GetItemSP;
	GetItemExplainText = mod.GetItemExplainText;
});

describe('item.h', () => {

	describe('exports', () => {
		it('GetItemKindNameText が関数', () => expect(typeof GetItemKindNameText).toBe('function'));
		it('IsDexBasedArms が関数', () => expect(typeof IsDexBasedArms).toBe('function'));
		it('IsEffectiveExceededRefinedAtkArms が関数', () => expect(typeof IsEffectiveExceededRefinedAtkArms).toBe('function'));
		it('IsGunSeriesArms が関数', () => expect(typeof IsGunSeriesArms).toBe('function'));
		it('GetJobRestrictText が関数', () => expect(typeof GetJobRestrictText).toBe('function'));
		it('GetStrPenaltyAvoidStr が関数', () => expect(typeof GetStrPenaltyAvoidStr).toBe('function'));
		it('GetEnchantTypeId が関数', () => expect(typeof GetEnchantTypeId).toBe('function'));
		it('GetRndOptTypeId が関数', () => expect(typeof GetRndOptTypeId).toBe('function'));
		it('GetSlotText が関数', () => expect(typeof GetSlotText).toBe('function'));
		it('GetMaxSlot が関数', () => expect(typeof GetMaxSlot).toBe('function'));
		it('GetItemSP が関数', () => expect(typeof GetItemSP).toBe('function'));
		it('GetItemExplainText が関数', () => expect(typeof GetItemExplainText).toBe('function'));
	});

	describe('window互換', () => {
		it('window.GetItemKindNameText', () => expect((window as any).GetItemKindNameText).toBe(GetItemKindNameText));
		it('window.IsDexBasedArms', () => expect((window as any).IsDexBasedArms).toBe(IsDexBasedArms));
		it('window.IsEffectiveExceededRefinedAtkArms', () => expect((window as any).IsEffectiveExceededRefinedAtkArms).toBe(IsEffectiveExceededRefinedAtkArms));
		it('window.IsGunSeriesArms', () => expect((window as any).IsGunSeriesArms).toBe(IsGunSeriesArms));
		it('window.GetJobRestrictText', () => expect((window as any).GetJobRestrictText).toBe(GetJobRestrictText));
		it('window.GetStrPenaltyAvoidStr', () => expect((window as any).GetStrPenaltyAvoidStr).toBe(GetStrPenaltyAvoidStr));
		it('window.GetEnchantTypeId', () => expect((window as any).GetEnchantTypeId).toBe(GetEnchantTypeId));
		it('window.GetRndOptTypeId', () => expect((window as any).GetRndOptTypeId).toBe(GetRndOptTypeId));
		it('window.GetSlotText', () => expect((window as any).GetSlotText).toBe(GetSlotText));
		it('window.GetMaxSlot', () => expect((window as any).GetMaxSlot).toBe(GetMaxSlot));
		it('window.GetItemSP', () => expect((window as any).GetItemSP).toBe(GetItemSP));
		it('window.GetItemExplainText', () => expect((window as any).GetItemExplainText).toBe(GetItemExplainText));
	});

	describe('DefineEnum 副作用確認', () => {
		it('ITEM_DATA_INDEX_ID が 0', () => expect((globalThis as any).ITEM_DATA_INDEX_ID).toBe(0));
		it('ITEM_DATA_INDEX_NAME が 8', () => expect((globalThis as any).ITEM_DATA_INDEX_NAME).toBe(8));
		it('ITEM_KIND_NONE が 0', () => expect((globalThis as any).ITEM_KIND_NONE).toBe(0));
		it('ITEM_KIND_SWORD が 2', () => expect((globalThis as any).ITEM_KIND_SWORD).toBe(2));
		it('ITEM_KIND_BOW が 10', () => expect((globalThis as any).ITEM_KIND_BOW).toBe(10));
	});

	describe('IsDexBasedArms', () => {
		it('弓はDEX依存', () => expect(IsDexBasedArms((globalThis as any).ITEM_KIND_BOW)).toBe(true));
		it('剣はDEX依存でない', () => expect(IsDexBasedArms((globalThis as any).ITEM_KIND_SWORD)).toBe(false));
	});

	describe('IsGunSeriesArms', () => {
		it('ハンドガンは銃シリーズ', () => expect(IsGunSeriesArms((globalThis as any).ITEM_KIND_HANDGUN)).toBe(true));
		it('剣は銃シリーズでない', () => expect(IsGunSeriesArms((globalThis as any).ITEM_KIND_SWORD)).toBe(false));
	});

});
