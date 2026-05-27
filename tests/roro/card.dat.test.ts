import { describe, it, expect } from 'vitest';
import {
    CARD_ID_NONE,
    CARD_ID_FABL,
    CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS,
    CARD_ID_MAX,
    CardObjNew,
    CardSortOBJ,
    card_ordered_info,
    ordered_info_for_all,
} from '@roro/card.dat.js';

describe('card.dat.js', () => {
    describe('エクスポート確認', () => {
        it('CARD_ID_NONE が 0',                           () => expect(CARD_ID_NONE).toBe(0));
        it('CARD_ID_FABL が 4',                           () => expect(CARD_ID_FABL).toBe(4));
        it('CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS が 4178',  () => expect(CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS).toBe(4178));
        it('CARD_ID_MAX が CardObjNew.length と一致',     () => expect(CARD_ID_MAX).toBe(CardObjNew.length));
        it('CardObjNew が配列',                           () => expect(Array.isArray(CardObjNew)).toBe(true));
        it('CardObjNew[0][0] が 0',                       () => expect(CardObjNew[0][0]).toBe(0));
        it('CardObjNew[4][0] が 4',                       () => expect(CardObjNew[4][0]).toBe(4));
        it('CardSortOBJ が配列',                          () => expect(Array.isArray(CardSortOBJ)).toBe(true));
        it('CardSortOBJ が 13 件（部位数）',               () => expect(CardSortOBJ).toHaveLength(13));
        it('card_ordered_info が配列',                    () => expect(Array.isArray(card_ordered_info)).toBe(true));
        it('ordered_info_for_all が配列',                 () => expect(Array.isArray(ordered_info_for_all)).toBe(true));
    });

    describe('window互換確認', () => {
        it('window.CARD_ID_NONE',                         () => expect((window as any).CARD_ID_NONE).toBe(CARD_ID_NONE));
        it('window.CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS',   () => expect((window as any).CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS).toBe(CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS));
        it('window.CARD_ID_MAX',                          () => expect((window as any).CARD_ID_MAX).toBe(CARD_ID_MAX));
        it('window.CardObjNew',                           () => expect((window as any).CardObjNew).toBe(CardObjNew));
        it('window.CardSortOBJ',                          () => expect((window as any).CardSortOBJ).toBe(CardSortOBJ));
        it('window.card_ordered_info',                    () => expect((window as any).card_ordered_info).toBe(card_ordered_info));
        it('window.ordered_info_for_all',                 () => expect((window as any).ordered_info_for_all).toBe(ordered_info_for_all));
    });
});
