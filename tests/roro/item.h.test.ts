import { describe, it, expect, beforeAll } from 'vitest';

// DefinePseudoEnum がモジュール初期化時に toSafeBigInt を使うため、
// dynamic import より前に globalThis に設定する
(globalThis as any).toSafeBigInt = (value: unknown): bigint => BigInt(value as any);

let IsDexBasedArms: any;
let IsGunSeriesArms: any;

beforeAll(async () => {
	await import('/workspace/ratorio/roro/m/js/CGlobalConstManager.js');
	const mod = await import('/workspace/ratorio/roro/m/js/item.h.js');
	IsDexBasedArms = mod.IsDexBasedArms;
	IsGunSeriesArms = mod.IsGunSeriesArms;
});

describe('item.h', () => {

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
