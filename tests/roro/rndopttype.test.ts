import { vi, describe, it, expect } from 'vitest';

// EQUIP_REGION_ID_COUNT は common.js (未移行) で定義されるため、
// モジュール読み込み前にモックを注入する
vi.hoisted(() => {
    (globalThis as any).EQUIP_REGION_ID_COUNT = 24;
});

import '@roro/CGlobalConstManager.js';
import '@roro/rndopttype.dat.js';
import {
    g_equipRndOptTable,
    SetEquipRndOptTable,
    GetEquipRndOptTableKind,
    GetEquipRndOptTableValue,
} from '@roro/rndopttype.h.js';


describe('rndopttype.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('RND_OPT_TYPE_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).RND_OPT_TYPE_DATA_INDEX_ID).toBe(0);
        });
        it('RND_OPT_TYPE_DATA_INDEX_LIST_ID_ARRAY が 1 に定義される', () => {
            expect((globalThis as any).RND_OPT_TYPE_DATA_INDEX_LIST_ID_ARRAY).toBe(1);
        });
        it('RND_OPT_SLOT_1 が 0 に定義される', () => {
            expect((globalThis as any).RND_OPT_SLOT_1).toBe(0);
        });
        it('RND_OPT_SLOT_5 が 4 に定義される', () => {
            expect((globalThis as any).RND_OPT_SLOT_5).toBe(4);
        });
        it('RND_OPT_SLOT_COUNT が 5 に定義される', () => {
            expect((globalThis as any).RND_OPT_SLOT_COUNT).toBe(5);
        });
    });

    describe('SetEquipRndOptTable ロジック確認', () => {
        it('rndOptId >= 0 のとき [id, value] にセットされる', () => {
            SetEquipRndOptTable(1, 0, 5, 100);
            expect(g_equipRndOptTable[1][0]).toEqual([5, 100]);
        });
        it('rndOptId < 0 のとき value のみ更新される（id は保持）', () => {
            SetEquipRndOptTable(1, 0, 5, 100); // セット
            SetEquipRndOptTable(1, 0, -1, 200); // value のみ更新
            expect(g_equipRndOptTable[1][0]).toEqual([5, 200]);
        });
    });

    describe('GetEquipRndOptTableKind / GetEquipRndOptTableValue ロジック確認', () => {
        it('GetEquipRndOptTableKind が [0] を返す', () => {
            SetEquipRndOptTable(2, 0, 7, 50);
            expect(GetEquipRndOptTableKind(2, 0)).toBe(7);
        });
        it('GetEquipRndOptTableValue が [1] を返す', () => {
            SetEquipRndOptTable(2, 1, 3, 99);
            expect(GetEquipRndOptTableValue(2, 1)).toBe(99);
        });
        it('範囲外インデックスで GetEquipRndOptTableKind は 0 を返す', () => {
            expect(GetEquipRndOptTableKind(999, 0)).toBe(0);
        });
        it('範囲外インデックスで GetEquipRndOptTableValue は 0 を返す', () => {
            expect(GetEquipRndOptTableValue(999, 0)).toBe(0);
        });
    });
});
