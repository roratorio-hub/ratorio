import { vi, describe, it, expect } from 'vitest';

const mockEquip = vi.hoisted(() => ({
    itemObjNew: null as any,
    cardObjNew: null as any,
    constDataManager: null as any,
}));

vi.mock('@roro/item.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get ItemObjNew() { return mockEquip.itemObjNew ?? actual.ItemObjNew; } };
});

vi.mock('@roro/card.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get CardObjNew() { return mockEquip.cardObjNew ?? actual.CardObjNew; } };
});

vi.mock('@ro4/global.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get g_constDataManager() { return mockEquip.constDataManager ?? actual.g_constDataManager; } };
});
import {
    UpdateLearnedSkillNotice,
    sort,
} from '@roro/equip.js';

describe('equip.js', () => {
    describe('呼び出しテスト', () => {
        // sort: ItemObjNew の KANA フィールドで挿入ソートする純粋関数に近い処理
        it('sort がカナ順に配列を並べ替える', () => {
            (window as any).ITEM_DATA_INDEX_KANA = 0;
            mockEquip.itemObjNew = { 0: [''], 1: ['あ'], 2: ['う'], 3: ['い'] };
            const work: (number | string)[] = [2, 3, 1, 'EOF'];
            sort(work as any);
            expect(work[0]).toBe(1); // 'あ'
            expect(work[1]).toBe(3); // 'い'
            expect(work[2]).toBe(2); // 'う'
            mockEquip.itemObjNew = null;
            delete (window as any).ITEM_DATA_INDEX_KANA;
        });

        // UpdateLearnedSkillNotice: n_A_card ループ内に let 宣言漏れがあると ReferenceError になる
        // このテストは cardId が未宣言だった equip.js:1053 の再発を検出するためのもの
        it('UpdateLearnedSkillNotice が n_A_card ループパスでエラーにならない', () => {
            const MOCK_SP_END = 9999;
            (window as any).ITEM_SP_END = MOCK_SP_END;
            (window as any).ITEM_SP_LEARNED_SKILL_EFFECT = 1;
            (window as any).CARD_DATA_INDEX_SPBEGIN = 0;
            const cardArr: any[] = [];
            cardArr[0] = [MOCK_SP_END]; // while ループを即座に抜ける
            mockEquip.cardObjNew = cardArr;
            (window as any).n_A_Equip = [];  // 装備ループをスキップ
            (window as any).n_A_card = [0];  // カードループを1回実行
            (window as any).n_A_JOB = 0;
            (window as any).CONST_DATA_KIND_JOB = 0;
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
