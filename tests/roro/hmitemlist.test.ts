import { describe, it, expect, beforeAll } from 'vitest';

// card.h.js がモジュール初期化時に参照するカード定数を事前設定
(globalThis as any).toSafeBigInt = (value: unknown): bigint => BigInt(value as any);
(globalThis as any).CARD_ID_NONE = 0;
(globalThis as any).CARD_ID_MAX = 9999;
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

let getItemList: any;
let IsMatchJobRestrict: any;
let ItemObjNew: any;
let MIG_JOB_ID_SKY_EMPEROR: number; // 天帝 = 79
let MIG_JOB_ID_ALITEA: number;      // アリテア = 88

beforeAll(async () => {
	await import('/workspace/ratorio/roro/m/js/CGlobalConstManager.js');
	await import('/workspace/ratorio/ro4/m/js/global.js');       // g_constDataManager を window にセット
	await import('/workspace/ratorio/ro4/m/js/data/mig.job.dat.js'); // 職業データを g_constDataManager にロード
	await import('/workspace/ratorio/roro/m/js/itemset.dat.js'); // w_SE を window にセット（GetItemExplainText が参照）
	const itemDat = await import('/workspace/ratorio/roro/m/js/item.dat.js');
	ItemObjNew = itemDat.ItemObjNew;
	const hmitemlist = await import('/workspace/ratorio/roro/other/js/hmitemlist.js');
	getItemList = hmitemlist.getItemList;
	const migJobH = await import('/workspace/ratorio/ro4/m/js/data/mig.job.h.js');
	IsMatchJobRestrict = migJobH.IsMatchJobRestrict;
	const migJobId = await import('/workspace/ratorio/ro4/m/js/data/mig.job.id.js');
	MIG_JOB_ID_SKY_EMPEROR = migJobId.MIG_JOB_ID_SKY_EMPEROR;
	MIG_JOB_ID_ALITEA = migJobId.MIG_JOB_ID_ALITEA;
});

const g = globalThis as any;

describe('hmitemlist', () => {

	describe('getItemList 名前検索', () => {
		it('名前が一致するアイテムのみを返す', () => {
			const result = getItemList(ItemObjNew, '暴食のクラウン');
			expect(result.length).toBeGreaterThan(0);
			for (const item of result) {
				expect(String(item[g.ITEM_DATA_INDEX_NAME])).toContain('暴食のクラウン');
			}
		});

		it('複数の職業バリアントをすべて返す', () => {
			const result = getItemList(ItemObjNew, '暴食のクラウン');
			const names = result.map((item: any) => item[g.ITEM_DATA_INDEX_NAME]);
			expect(names).toContain('暴食のクラウン(天帝)');
			expect(names).toContain('暴食のクラウン(アリテア)');
			expect(names).toContain('暴食のクラウン(アークメイジ)');
		});

		it('検索結果のインデックスと ITEM_DATA_INDEX_ID は一致しない（itemId をループカウンタと混同できない）', () => {
			const result = getItemList(ItemObjNew, '暴食のクラウン');
			// 結果は compact array（index 0, 1, 2...）だが、各アイテムの ID は 5000 番台
			// ループカウンタ (0,1,2...) を IsMatchJobRestrict に渡すと素手などを誤って参照する
			expect(result[0][g.ITEM_DATA_INDEX_ID]).not.toBe(0);
			// ItemObjNew[result[0][ITEM_DATA_INDEX_ID]] が result[0] と同一オブジェクトを指す
			expect(ItemObjNew[result[0][g.ITEM_DATA_INDEX_ID]]).toBe(result[0]);
		});
	});

	describe('名前検索 + 職業フィルタ（リグレッション: ITEM_DATA_INDEX_ID の正しい使用）', () => {
		// BuildUpItemList はかつて IsMatchJobRestrict(itemId, condJob) の itemId に
		// itemList のループカウンタを渡していた。getItemList の返す compact array では
		// ループカウンタ≠アイテムID であるため、IsMatchJobRestrict は誤ったアイテムを参照した。
		// 正しくは item[ITEM_DATA_INDEX_ID] を渡す。

		it('天帝 で絞ると 暴食のクラウン(天帝) だけが残る', () => {
			const nameFiltered = getItemList(ItemObjNew, '暴食のクラウン');
			const jobFiltered = nameFiltered.filter(
				(item: any) => IsMatchJobRestrict(item[g.ITEM_DATA_INDEX_ID], MIG_JOB_ID_SKY_EMPEROR)
			);
			expect(jobFiltered).toHaveLength(1);
			expect(jobFiltered[0][g.ITEM_DATA_INDEX_NAME]).toBe('暴食のクラウン(天帝)');
		});

		it('アリテア で絞ると 暴食のクラウン(アリテア) だけが残る', () => {
			const nameFiltered = getItemList(ItemObjNew, '暴食のクラウン');
			const jobFiltered = nameFiltered.filter(
				(item: any) => IsMatchJobRestrict(item[g.ITEM_DATA_INDEX_ID], MIG_JOB_ID_ALITEA)
			);
			expect(jobFiltered).toHaveLength(1);
			expect(jobFiltered[0][g.ITEM_DATA_INDEX_NAME]).toBe('暴食のクラウン(アリテア)');
		});
	});
});
