import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    (globalThis as any).HtmlGetObjectValueByIdAsInteger = () => 0;
});

import {
    ITEM_ID_SUDE,
    ITEM_ID_KNIFE,
    ITEM_ID_SWORD,
    ItemObjNew,
} from '@roro/item.dat.js';
import { get as registryGet } from '@ro4/engine-registry.js';

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
});
