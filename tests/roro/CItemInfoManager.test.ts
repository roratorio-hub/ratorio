import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@roro/CTimeItemAreaComponentManager.js', () => ({
    CTimeItemAreaComponentManager: {
        OnChangeConf: vi.fn(),
        FocusArea: vi.fn(),
        RebuildControls: vi.fn(),
    },
}));

import { CItemInfoManager } from '@roro/CItemInfoManager.js';
import { g_timeItemConf } from '@ro4/global.js';
import { CTimeItemAreaComponentManager } from '@roro/CTimeItemAreaComponentManager.js';

describe('CItemInfoManager.js', () => {
    describe('コアロジック', () => {
        it('CreateOptionId はキー種別と番号を "_" で結合して返す', () => {
            expect(CItemInfoManager.CreateOptionId('item', 42)).toBe('item_42');
        });
        it('SplitOptionId は CreateOptionId で生成した ID を元の要素に分解する', () => {
            expect(CItemInfoManager.SplitOptionId('item_42')).toEqual(['item', '42']);
        });
        it('CreateOptionId → SplitOptionId はラウンドトリップできる', () => {
            const id = CItemInfoManager.CreateOptionId('card', 123);
            const [kind, num] = CItemInfoManager.SplitOptionId(id);
            expect(kind).toBe('card');
            expect(num).toBe('123');
        });
    });

    describe('ApplyTimeItem', () => {
        beforeEach(() => {
            vi.clearAllMocks();
            CItemInfoManager.ApplyAutoFocusFlag = false;
        });

        it('timeItemId が g_timeItemConf に存在しない場合、OnChangeConf(-1, timeItemId) を呼ぶ', () => {
            CItemInfoManager.ApplyTimeItem(9999);
            expect(CTimeItemAreaComponentManager.OnChangeConf).toHaveBeenCalledWith(-1, 9999);
        });

        it('timeItemId が g_timeItemConf に存在する場合、OnChangeConf を呼ばない', () => {
            // g_timeItemConf 初期値はすべて 0
            CItemInfoManager.ApplyTimeItem(g_timeItemConf[0]);
            expect(CTimeItemAreaComponentManager.OnChangeConf).not.toHaveBeenCalled();
        });

        it('ApplyAutoFocusFlag が true の場合、FocusArea(index, true) を呼ぶ', () => {
            CItemInfoManager.ApplyAutoFocusFlag = true;
            const timeItemId = g_timeItemConf[0]; // 0, indexOf は 0 を返す
            CItemInfoManager.ApplyTimeItem(timeItemId);
            expect(CTimeItemAreaComponentManager.FocusArea).toHaveBeenCalledWith(0, true);
        });

        it('ApplyAutoFocusFlag が false の場合、FocusArea を呼ばない', () => {
            CItemInfoManager.ApplyTimeItem(g_timeItemConf[0]);
            expect(CTimeItemAreaComponentManager.FocusArea).not.toHaveBeenCalled();
        });
    });
});
