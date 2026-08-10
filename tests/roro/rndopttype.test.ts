import { vi, describe, it, expect } from 'vitest';

// EQUIP_REGION_ID_COUNT は const 化され import で解決できるようになったため、
// 旧来のグローバル注入（vi.hoisted で 24 を代入）は不要になった。
import '@roro/rndopttype.dat.js';
import {
    g_equipRndOptTable,
    SetEquipRndOptTable,
    GetEquipRndOptTableKind,
    GetEquipRndOptTableValue,
} from '@roro/rndopttype.h.js';
import { EQUIP_REGION_ID_COUNT } from '@roro/const/EnumMigItemParamId.js';

describe('rndopttype.h.js', () => {

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
