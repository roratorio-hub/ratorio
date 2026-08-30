import { vi, describe, it, expect } from 'vitest';

const mockEquip = vi.hoisted(() => ({
    itemObjNew: null as any,
    cardObjNew: null as any,
    constDataManager: null as any,
}));

vi.mock('@engine/equip/item.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get ItemObjNew() { return mockEquip.itemObjNew ?? actual.ItemObjNew; } };
});

vi.mock('@engine/equip/card.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get CardObjNew() { return mockEquip.cardObjNew ?? actual.CardObjNew; } };
});

vi.mock('@engine/runtime/global.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get g_constDataManager() { return mockEquip.constDataManager ?? actual.g_constDataManager; } };
});
import {
    UpdateLearnedSkillNotice,
    sort,
} from '@engine/equip/equip.js';
import { CARD_DATA_INDEX_SPBEGIN } from '@engine/const/EnumCardDataIndex.js';
import { CONST_DATA_KIND_JOB } from '@engine/const/EnumConstDataKind.js';
import { ITEM_DATA_INDEX_KANA } from '@engine/const/EnumItemDataIndex.js';
import { ITEM_SP_END, ITEM_SP_LEARNED_SKILL_EFFECT } from '@engine/const/EnumItemSpId.js';

describe('equip.js', () => {
    describe('呼び出しテスト', () => {
        // sort: ItemObjNew の KANA フィールドで挿入ソートする純粋関数に近い処理
        it('sort がカナ順に配列を並べ替える', () => {
            // 旧テストは window.ITEM_DATA_INDEX_KANA を 0 に差し替えてモックを単純化していたが、
            // const 化で定数は import 束縛になり書き換え不能。実際の添字にカナを置いて組む。
            const row = (kana: string) => { const a: string[] = []; a[ITEM_DATA_INDEX_KANA] = kana; return a; };
            mockEquip.itemObjNew = { 0: row(''), 1: row('あ'), 2: row('う'), 3: row('い') };
            const work: (number | string)[] = [2, 3, 1, 'EOF'];
            sort(work as any);
            expect(work[0]).toBe(1); // 'あ'
            expect(work[1]).toBe(3); // 'い'
            expect(work[2]).toBe(2); // 'う'
            mockEquip.itemObjNew = null;
        });

        // UpdateLearnedSkillNotice: n_A_card ループ内に let 宣言漏れがあると ReferenceError になる
        // このテストは cardId が未宣言だった equip.js:1053 の再発を検出するためのもの
        it('UpdateLearnedSkillNotice が n_A_card ループパスでエラーにならない', () => {
            // 旧テストは定数をグローバルに差し替えていたが、const 化で import 束縛になり
            // 書き換えられない。実際の定数値どおりにモックデータを組む。
            const cardArr: any[] = [];
            const row: any[] = [];
            row[CARD_DATA_INDEX_SPBEGIN] = ITEM_SP_END; // while ループを即座に抜ける
            cardArr[0] = row;
            mockEquip.cardObjNew = cardArr;
            (window as any).n_A_Equip = [];  // 装備ループをスキップ
            (window as any).n_A_card = [0];  // カードループを1回実行
            (window as any).n_A_JOB = 0;
            mockEquip.constDataManager = {
                GetDataObject: () => ({ GetLearnSkillIdArray: () => [] }),
            };
            document.body.innerHTML = '<span id="ID_SKILL_LEARNED_NOTICE"></span>';
            expect(() => UpdateLearnedSkillNotice()).not.toThrow();
            mockEquip.cardObjNew = null;
            mockEquip.constDataManager = null;
        });
    });
});
