import { describe, it, expect, beforeAll } from 'vitest';

let BuildMelonFes2026MonsterDropEntries: any;
let FilterMelonFes2026MonsterDropEntries: any;
let SortMelonFes2026MonsterDropEntriesByLevel: any;
let MonsterObjNew: any;
let g_MonsterMapDataArray: any;

beforeAll(async () => {
	await import('/workspace/ratorio/roro/m/js/CGlobalConstManager.js');
	await import('/workspace/ratorio/roro/m/js/monster.h.js');
	const monsterDat = await import('/workspace/ratorio/roro/m/js/monster.dat.js');
	MonsterObjNew = monsterDat.MonsterObjNew;
	await import('/workspace/ratorio/roro/m/js/monstermap.h.js');
	const monsterMapDat = await import('/workspace/ratorio/roro/m/js/monstermap.dat.js');
	g_MonsterMapDataArray = monsterMapDat.g_MonsterMapDataArray;

	const mod = await import('/workspace/ratorio/roro/other/js/eventsetup-melonfes2026monsterdrop.js');
	BuildMelonFes2026MonsterDropEntries = mod.BuildMelonFes2026MonsterDropEntries;
	FilterMelonFes2026MonsterDropEntries = mod.FilterMelonFes2026MonsterDropEntries;
	SortMelonFes2026MonsterDropEntriesByLevel = mod.SortMelonFes2026MonsterDropEntriesByLevel;
});

const g = globalThis as any;

describe('eventsetup-melonfes2026monsterdrop', () => {

	describe('BuildMelonFes2026MonsterDropEntries', () => {

		it('エンジン側に存在するモンスター名には Lv と生息マップが付与される', () => {
			const idx = MonsterObjNew.findIndex((m: any) => m[g.MONSTER_DATA_INDEX_NAME] === 'アーチャースケルトン');
			expect(idx).toBeGreaterThanOrEqual(0);
			const monsterData = MonsterObjNew[idx];

			const dropList = [{ name: 'アーチャースケルトン', items: ['濃縮メロンジャム'] }];
			const result = BuildMelonFes2026MonsterDropEntries(dropList, MonsterObjNew, g_MonsterMapDataArray);

			expect(result).toHaveLength(1);
			expect(result[0].level).toBe(monsterData[g.MONSTER_DATA_INDEX_LEVEL]);
			expect(Array.isArray(result[0].mapNames)).toBe(true);
		});

		it('エンジン側に存在しないモンスター名は level: null, mapNames: [] になる（クラッシュしない）', () => {
			const dropList = [{ name: '存在しないモンスター名XYZ', items: ['濃縮メロンジャム'] }];
			const result = BuildMelonFes2026MonsterDropEntries(dropList, MonsterObjNew, g_MonsterMapDataArray);

			expect(result).toHaveLength(1);
			expect(result[0].level).toBeNull();
			expect(result[0].mapNames).toEqual([]);
		});

		it('MONSTER_MAP_ID_MAP_ALL（全マップ）はマップ一覧に含まれない', () => {
			const dropList = [{ name: 'アーチャースケルトン', items: ['濃縮メロンジャム'] }];
			const result = BuildMelonFes2026MonsterDropEntries(dropList, MonsterObjNew, g_MonsterMapDataArray);

			expect(result[0].mapNames).not.toContain('全マップ');
		});
	});

	describe('FilterMelonFes2026MonsterDropEntries', () => {

		const entries = [
			{ name: 'モンスターA', items: ['濃縮メロンジャム', 'スターマッシュルーム'], level: 10, mapNames: ['プロンテラフィールド'] },
			{ name: 'モンスターB', items: ['レアスモールジェム'], level: 20, mapNames: ['ゲフェンフィールド'] },
			{ name: 'モンスターC', items: ['濃縮メロンジャム'], level: 30, mapNames: ['ゲフェン地下ダンジョン'] },
		];

		it('検索文字列が両方空の場合は全件を返す', () => {
			const result = FilterMelonFes2026MonsterDropEntries(entries, '', '');
			expect(result).toHaveLength(3);
		});

		it('アイテム名と部分一致するエントリのみ返す', () => {
			const result = FilterMelonFes2026MonsterDropEntries(entries, 'メロン', '');
			expect(result.map((e: any) => e.name)).toEqual(['モンスターA', 'モンスターC']);
		});

		it('生息マップ名と部分一致するエントリのみ返す（複数マップ所持でも判定できる）', () => {
			const result = FilterMelonFes2026MonsterDropEntries(entries, '', 'ゲフェン');
			expect(result.map((e: any) => e.name)).toEqual(['モンスターB', 'モンスターC']);
		});

		it('アイテム名・生息マップ名の両方を指定すると AND 条件で絞り込む', () => {
			const result = FilterMelonFes2026MonsterDropEntries(entries, 'メロン', 'ゲフェン');
			expect(result.map((e: any) => e.name)).toEqual(['モンスターC']);
		});

		it('一致しない検索文字列の場合は空配列を返す', () => {
			const result = FilterMelonFes2026MonsterDropEntries(entries, '存在しないアイテム', '');
			expect(result).toHaveLength(0);
		});
	});

	describe('SortMelonFes2026MonsterDropEntriesByLevel', () => {

		const entries = [
			{ name: 'モンスターA', items: [], level: 30, mapNames: [] },
			{ name: 'モンスターB', items: [], level: 10, mapNames: [] },
			{ name: 'モンスターC', items: [], level: 20, mapNames: [] },
			{ name: 'モンスター不明', items: [], level: null, mapNames: [] },
		];

		it('デフォルト（昇順）で並べ替える', () => {
			const result = SortMelonFes2026MonsterDropEntriesByLevel(entries, false);
			expect(result.map((e: any) => e.name)).toEqual(['モンスターB', 'モンスターC', 'モンスターA', 'モンスター不明']);
		});

		it('降順で並べ替えても、Lv不明のエントリは末尾になる', () => {
			const result = SortMelonFes2026MonsterDropEntriesByLevel(entries, true);
			expect(result.map((e: any) => e.name)).toEqual(['モンスターA', 'モンスターC', 'モンスターB', 'モンスター不明']);
		});

		it('引数の配列を破壊しない', () => {
			const original = entries.map((e) => e.name);
			SortMelonFes2026MonsterDropEntriesByLevel(entries, false);
			expect(entries.map((e) => e.name)).toEqual(original);
		});
	});
});
