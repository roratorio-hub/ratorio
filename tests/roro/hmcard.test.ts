import { describe, it, expect, beforeAll } from 'vitest';

// card.dat.js（非ESM）がブラウザでは先行ロードするカード定数を事前設定
// 動的インポートより前に実行されるため、モジュール初期化時の ReferenceError を防ぐ
const CARD_NONE = 0;
const CARD_MAX_STUB = 9999;
(globalThis as any).CARD_ID_NONE = CARD_NONE;
(globalThis as any).CARD_ID_MAX = CARD_MAX_STUB;
(globalThis as any).CARD_ID_PHYSICAL_RACE_ALL_20UP = 1;
(globalThis as any).CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP = 2;
(globalThis as any).CARD_ID_PHYSICAL_SIZE_ALL_15UP = 3;
(globalThis as any).CARD_ID_MAGICAL_RACE_ALL_10UP = 527;
(globalThis as any).CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP = 1664;
(globalThis as any).CARD_ID_MAGICAL_SIZE_ALL_8UP = 1665;
(globalThis as any).CARD_ID_ARCHER_SKELETON = 107;
(globalThis as any).CARD_ID_POWERFUL_A_SKELETON = 1078;
(globalThis as any).CARD_ID_SHINENNO_KISHI = 31;
(globalThis as any).CARD_ID_OSEN_SARETA_SAMAYOU_MONO = 1595;
(globalThis as any).CARD_ID_GIGANTES = 1526;

describe('hmcard', () => {

	let CardShortObj: any;
	let ClearCardSlotAll: any;
	let ClearCardSlot: any;
	let RebuildCardSelect: any;
	let RebuildCardSelectSubCollectEnchListData: any;
	let SetCardSlotEnabilityAll: any;
	let SetCardSlotEnability: any;
	let ApplyCardShort: any;

	beforeAll(async () => {
		const mod = await import('/workspace/ratorio/roro/m/js/hmcard.js');
		CardShortObj = mod.CardShortObj;
		ClearCardSlotAll = mod.ClearCardSlotAll;
		ClearCardSlot = mod.ClearCardSlot;
		RebuildCardSelect = mod.RebuildCardSelect;
		RebuildCardSelectSubCollectEnchListData = mod.RebuildCardSelectSubCollectEnchListData;
		SetCardSlotEnabilityAll = mod.SetCardSlotEnabilityAll;
		SetCardSlotEnability = mod.SetCardSlotEnability;
		ApplyCardShort = mod.ApplyCardShort;
	});

	describe('exports', () => {
		it('CardShortObj が配列', () => expect(Array.isArray(CardShortObj)).toBe(true));
		it('CardShortObj の要素数が正しい', () => expect(CardShortObj.length).toBeGreaterThan(0));
		it('ClearCardSlotAll が関数', () => expect(typeof ClearCardSlotAll).toBe('function'));
		it('ClearCardSlot が関数', () => expect(typeof ClearCardSlot).toBe('function'));
		it('RebuildCardSelect が関数', () => expect(typeof RebuildCardSelect).toBe('function'));
		it('RebuildCardSelectSubCollectEnchListData が関数', () => expect(typeof RebuildCardSelectSubCollectEnchListData).toBe('function'));
		it('SetCardSlotEnabilityAll が関数', () => expect(typeof SetCardSlotEnabilityAll).toBe('function'));
		it('SetCardSlotEnability が関数', () => expect(typeof SetCardSlotEnability).toBe('function'));
		it('ApplyCardShort が関数', () => expect(typeof ApplyCardShort).toBe('function'));
	});

	describe('window互換', () => {
		it('window.CardShortObj', () => expect((window as any).CardShortObj).toBe(CardShortObj));
		it('window.ClearCardSlot', () => expect((window as any).ClearCardSlot).toBe(ClearCardSlot));
		it('window.RebuildCardSelect', () => expect((window as any).RebuildCardSelect).toBe(RebuildCardSelect));
		it('window.RebuildCardSelectSubCollectEnchListData', () => expect((window as any).RebuildCardSelectSubCollectEnchListData).toBe(RebuildCardSelectSubCollectEnchListData));
		it('window.SetCardSlotEnabilityAll', () => expect((window as any).SetCardSlotEnabilityAll).toBe(SetCardSlotEnabilityAll));
		it('window.SetCardSlotEnability', () => expect((window as any).SetCardSlotEnability).toBe(SetCardSlotEnability));
	});

	describe('CardShortObj 内容確認', () => {
		it('各エントリは配列', () => {
			CardShortObj.forEach((entry: any) => expect(Array.isArray(entry)).toBe(true));
		});
		it('各エントリの先頭は文字列（名称）', () => {
			CardShortObj.forEach((entry: any) => expect(typeof entry[0]).toBe('string'));
		});
	});

});
