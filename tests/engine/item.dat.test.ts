import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 0;
});

import {
    ITEM_ID_SUDE,
    ITEM_ID_KNIFE,
    ITEM_ID_SWORD,
    ItemObjNew,
} from '@engine/equip/item.dat.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';
import { USABEL_SKILL_ID_HEAL_10 } from '@engine/skill/usableskill.dat.js';
import { ITEM_SP_LEARN_SKILL } from '@engine/const/EnumItemSpId.js';

/** ItemObjNew のレコードから、指定した能力コードの値を返す（効果は index 11 以降に [コード,値] の組で並ぶ）. */
function getSpValue(record: any[], spId: number): number | undefined {
    for (let i = 11; i + 1 < record.length; i += 2) {
        if (record[i] === spId) return record[i + 1];
    }
    return undefined;
}

describe('item.dat.js', () => {
    describe('エクスポート確認', () => {
        it('ITEM_ID_SUDE が 0', () => expect(ITEM_ID_SUDE).toBe(0));
        it('ITEM_ID_KNIFE が 1', () => expect(ITEM_ID_KNIFE).toBe(1));
        it('ITEM_ID_SWORD が 16', () => expect(ITEM_ID_SWORD).toBe(16));
    });

    // dewindow: window.ItemObjNew は engine-registry へ移行（旧 window 互換テストを置換）。
    // calcx-ai.js が registryGet('ItemObjNew') で参照する配線を検証する。
    describe('engine-registry 登録', () => {
        it('ItemObjNew が engine-registry に登録されている', () => {
            expect(registryGet('ItemObjNew')).toBe(ItemObjNew);
        });
    });

    describe('偽りの心臓セット', () => {
        it.each([5574, 5601])('セット効果 %i で使用可能になるスキルはヒールLv10', (setItemId) => {
            expect(getSpValue(ItemObjNew[setItemId], ITEM_SP_LEARN_SKILL)).toBe(USABEL_SKILL_ID_HEAL_10);
        });
    });
});
