import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { CItemInfoManager } from '@roro/CItemInfoManager.js';
import { g_timeItemConf } from '@ro4/global.js';
import { g_timeItemDataBridge } from '@roro/CTimeItemDataBridge.js';

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

    describe('ApplyTimeItem（CTimeItemDataBridge 経由）', () => {
        const onChangeConf = vi.fn();
        const focusArea = vi.fn();

        beforeEach(() => {
            vi.clearAllMocks();
            CItemInfoManager.ApplyAutoFocusFlag = false;
            // calcx.html では CTimeItemAreaComponentManager が登録する部分をモックで代替
            g_timeItemDataBridge.onChangeConf = onChangeConf;
            g_timeItemDataBridge.focusArea = focusArea;
        });

        afterEach(() => {
            g_timeItemDataBridge.onChangeConf = null;
            g_timeItemDataBridge.focusArea = null;
        });

        it('timeItemId が g_timeItemConf に存在しない場合、onChangeConf(-1, timeItemId) を呼ぶ', () => {
            CItemInfoManager.ApplyTimeItem(9999);
            expect(onChangeConf).toHaveBeenCalledWith(-1, 9999);
        });

        it('timeItemId が g_timeItemConf に存在する場合、onChangeConf を呼ばない', () => {
            // g_timeItemConf 初期値はすべて 0
            CItemInfoManager.ApplyTimeItem(g_timeItemConf[0]);
            expect(onChangeConf).not.toHaveBeenCalled();
        });

        it('ApplyAutoFocusFlag が true の場合、focusArea(index, true) を呼ぶ', () => {
            CItemInfoManager.ApplyAutoFocusFlag = true;
            const timeItemId = g_timeItemConf[0]; // 0, indexOf は 0 を返す
            CItemInfoManager.ApplyTimeItem(timeItemId);
            expect(focusArea).toHaveBeenCalledWith(0, true);
        });

        it('ApplyAutoFocusFlag が false の場合、focusArea を呼ばない', () => {
            CItemInfoManager.ApplyTimeItem(g_timeItemConf[0]);
            expect(focusArea).not.toHaveBeenCalled();
        });

        it('未登録（roro/other ページ相当）の場合、例外を投げず no-op になる', () => {
            g_timeItemDataBridge.onChangeConf = null;
            g_timeItemDataBridge.focusArea = null;
            CItemInfoManager.ApplyAutoFocusFlag = true;
            expect(() => CItemInfoManager.ApplyTimeItem(9999)).not.toThrow();
        });
    });
});
