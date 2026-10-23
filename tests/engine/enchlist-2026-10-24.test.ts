import { describe, it, expect, beforeAll } from 'vitest';
import { ItemObjNew } from '@engine/equip/item.dat.js';
import { CardObjNew } from '@engine/equip/card.dat.js';
import { CONST_DATA_KIND_ENCHANT_LIST } from '@engine/const/EnumConstDataKind.js';

let g_constDataManager: any;
let collect: (enchListId: number, before: any[]) => any[][];

beforeAll(async () => {
    g_constDataManager = (await import('/workspace/ratorio/engine/runtime/global.js')).g_constDataManager;
    await import('/workspace/ratorio/engine/data/mig.enchlist.dat.js');
    collect = (await import('/workspace/ratorio/engine/equip/hmcard.js')).RebuildCardSelectSubCollectEnchListData;
});

const findItemId = (name: string) => (ItemObjNew as any[]).findIndex((row) => row && row[8] === name);
const findCardId = (name: string) => {
    const id = (CardObjNew as any[]).findIndex((row) => row && row[2] === name);
    expect(id, `${name} が card.dat.js に登録されている`).toBeGreaterThan(0);
    return id;
};

type Candidate = { cardId: number; refineOver: number };

/** アイテムの第Nスロットに選べるエンチャントを、画面（hmcard.js）と同じ経路で集める. */
function enchantsOf(itemName: string): Record<number, Candidate[]> {
    const itemId = findItemId(itemName);
    expect(itemId, `${itemName} が item.dat.js に登録されている`).toBeGreaterThan(0);
    const manager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
    const slots: Record<number, Candidate[]> = { 1: [], 2: [], 3: [], 4: [] };
    for (const listId of manager.GetEnchListIdArrayByItemId(itemId)) {
        collect(listId, [[], [], [], []]).forEach((entries, idx) => {
            slots[idx + 1] = slots[idx + 1].concat(
                entries.map(([, cardId, params]: any[]) => ({ cardId, refineOver: params.refinedBorderBase })),
            );
        });
    }
    return slots;
}

const cardIds = (candidates: Candidate[]) => candidates.map((c) => c.cardId);
const names = (...list: string[]) => list.map(findCardId);

describe('フロンティア武器のエンチャント枠', () => {
    const FRONTIER = [
        'ウィザードスタッフ', 'ダガー', 'スピア', 'ハンターボウ', 'マジックブック', 'スターダストブック', 'アックス', 'クロー',
        'シャドウカタール', 'フォックステイル', 'ホーリーステッキ', 'ソウルスタッフ', 'ツーハンドソード', 'ライフル', '催眠術師の杖',
        'ホール', 'バイオリン', 'ロープ', 'ツーハンドアックス', '風魔手裏剣',
    ].map((x) => 'フロンティア' + x);

    it.each(FRONTIER)('%s: 第4=属性付与・知識の探求者、第3=潜在解放19種、第2=覇王ほか（第1は無し）', (name) => {
        const slots = enchantsOf(name);
        expect(slots[1]).toEqual([]);
        expect(slots[4]).toHaveLength(21);
        expect(cardIds(slots[4])).toContain(findCardId('知識の探求者'));
        expect(slots[3]).toHaveLength(31);
        expect(slots[2]).toHaveLength(23);
        expect(cardIds(slots[2])).toEqual(expect.arrayContaining(names('覇王', '暴走した魔力', '大鷲の眼光', '豪傑', '真理の解放')));
        // 精錬値の条件は無い
        for (const slot of [2, 3, 4]) {
            expect(new Set(slots[slot].map((c) => c.refineOver))).toEqual(new Set([0]));
        }
    });

    it('第3スロットに新エンチャント 潜在解放(トルバドゥール&トルヴェールXVIII) が含まれる', () => {
        const xviii = findCardId('潜在解放(トルバドゥール&トルヴェールXVIII)');
        for (const name of FRONTIER) {
            expect(cardIds(enchantsOf(name)[3]), name).toContain(xviii);
        }
    });
});

describe('ディメンショナルブーツのエンチャント枠', () => {
    const BOOTS = [
        'ディメンショナルブーツ(集中)', 'ディメンショナルブーツ(創造)', 'ディメンショナルブーツ(魔力)',
        'ディメンショナルブーツ(力)', 'ディメンショナルブーツ',
    ];

    it.each(BOOTS)('%s: 第4=英雄の凱歌ほか、第3=豪傑・真理の解放を含む、第2=黒翼の使徒のみ', (name) => {
        const slots = enchantsOf(name);
        expect(slots[1]).toEqual([]);
        expect(slots[4]).toHaveLength(20);
        expect(cardIds(slots[4])).toEqual(expect.arrayContaining(
            names('英雄の凱歌', '起源の王', '殺意の怨念', '豊穣の女神', '厄災の魔将', '異境の統轄者', '知識の探求者', '最果ての支配者')));
        expect(cardIds(slots[3])).toEqual(expect.arrayContaining(names('豪傑', '真理の解放')));
        expect(cardIds(slots[2])).toEqual(names('黒翼の使徒'));
    });
});

describe('[シャドウ] ディザスターのエンチャント枠', () => {
    it.each(['[シャドウ] ディザスターイヤリング', '[シャドウ] ディザスターシールド'])('%s: 第4スロットは精錬値8以上で Str+3〜Luk+3・厄災の魔将', (name) => {
        const slots = enchantsOf(name);
        expect(slots[1]).toEqual([]);
        expect(slots[2]).toEqual([]);
        expect(slots[3]).toEqual([]);
        expect(slots[4]).toHaveLength(7);
        expect(cardIds(slots[4])).toContain(findCardId('厄災の魔将'));
        expect(new Set(slots[4].map((c) => c.refineOver))).toEqual(new Set([8]));
    });
});

describe('[シャドウ] セレスティアルのエンチャント枠', () => {
    const CELESTIAL = ['アーマー', 'ウェポン', 'シールド', 'シューズ', 'イヤリング', 'ペンダント'].map((x) => `[シャドウ] セレスティアル${x}`);

    it.each(CELESTIAL)('%s: 第4=潜在解放45種、第3=Str+3〜Luk+3', (name) => {
        const slots = enchantsOf(name);
        expect(slots[4]).toHaveLength(45);
        expect(slots[4].every((c) => (CardObjNew as any[])[c.cardId][2].startsWith('潜在解放('))).toBe(true);
        expect(cardIds(slots[3])).toEqual(names('Str+3', 'Agi+3', 'Vit+3', 'Int+3', 'Dex+3', 'Luk+3'));
        expect(slots[2]).toEqual([]);
    });
});

describe('ダークカントリーマントのエンチャント枠', () => {
    it('同系統のマント（オズマグマフード）と同じ候補が選べる', () => {
        const cloak = enchantsOf('ダークカントリーマント');
        const sibling = enchantsOf('オズマグマフード');
        expect(cloak[4].length).toBeGreaterThan(0);
        for (const slot of [2, 3, 4]) {
            expect(cardIds(cloak[slot])).toEqual(cardIds(sibling[slot]));
        }
    });
});
