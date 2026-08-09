import { describe, it, expect, beforeAll } from 'vitest';
import { ITEM_KIND_BOW, ITEM_KIND_HANDGUN, ITEM_KIND_SWORD } from '@roro/const/EnumItemKind.js';

// DefinePseudoEnum がモジュール初期化時に toSafeBigInt を使うため、
// dynamic import より前に globalThis に設定する
(globalThis as any).toSafeBigInt = (value: unknown): bigint => BigInt(value as any);

let IsDexBasedArms: any;
let IsGunSeriesArms: any;

beforeAll(async () => {
	const mod = await import('/workspace/ratorio/roro/m/js/item.h.js');
	IsDexBasedArms = mod.IsDexBasedArms;
	IsGunSeriesArms = mod.IsGunSeriesArms;
});

describe('item.h', () => {

	describe('IsDexBasedArms', () => {
		it('弓はDEX依存', () => expect(IsDexBasedArms(ITEM_KIND_BOW)).toBe(true));
		it('剣はDEX依存でない', () => expect(IsDexBasedArms(ITEM_KIND_SWORD)).toBe(false));
	});

	describe('IsGunSeriesArms', () => {
		it('ハンドガンは銃シリーズ', () => expect(IsGunSeriesArms(ITEM_KIND_HANDGUN)).toBe(true));
		it('剣は銃シリーズでない', () => expect(IsGunSeriesArms(ITEM_KIND_SWORD)).toBe(false));
	});

});
