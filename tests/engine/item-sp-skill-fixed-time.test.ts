import { describe, it, expect } from 'vitest';
import { GetItemExplainText } from '@engine/equip/item.h.js';
import {
    ITEM_SP_REFINE_OVER_9_OFFSET,
    ITEM_SP_SKILL_FIXED_TIME,
} from '@engine/const/EnumItemSpId.js';

describe('GetItemExplainText（アイテムSP「固定詠唱時間 - ◯%」）', () => {
    it('正の値は「固定詠唱時間 - N%」と表示する', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_SKILL_FIXED_TIME, 50);
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 50%');
    });

    it('負の値は「固定詠唱時間 + N%」と表示する', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_SKILL_FIXED_TIME, -20);
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 + 20%');
    });

    it('精錬値条件が付いても本文は同じで、条件文が別に付く', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_REFINE_OVER_9_OFFSET + ITEM_SP_SKILL_FIXED_TIME, 70);
        expect(textInfoArray[0][1]).toContain('9');
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 70%');
    });
});
