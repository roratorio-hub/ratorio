import { describe, it, expect } from 'vitest';
import { CItemInfoManager } from '@roro/CItemInfoManager.js';

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
});
