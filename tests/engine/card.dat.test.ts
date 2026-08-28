import { describe, it, expect } from 'vitest';
import {
    CARD_ID_NONE,
    CARD_ID_FABL,
    CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS,
    CARD_ID_MAX,
    CardObjNew,
} from '@engine/card.dat.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';

describe('card.dat.js', () => {
    describe('エクスポート確認', () => {
        it('CARD_ID_NONE が 0',                           () => expect(CARD_ID_NONE).toBe(0));
        it('CARD_ID_FABL が 4',                           () => expect(CARD_ID_FABL).toBe(4));
        it('CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS が 4178',  () => expect(CARD_ID_THE_CHIEF_KNIGHT_OF_ABYSS).toBe(4178));
        it('CARD_ID_MAX が CardObjNew.length と一致',     () => expect(CARD_ID_MAX).toBe(CardObjNew.length));
        it('CardObjNew[0][0] が 0',                       () => expect(CardObjNew[0][0]).toBe(0));
        it('CardObjNew[4][0] が 4',                       () => expect(CardObjNew[4][0]).toBe(4));
    });

    // dewindow: window.CardObjNew は engine-registry へ移行（旧 window 互換テストを置換）。
    // calcx-ai.js が registryGet('CardObjNew') で参照する配線を検証する。
    describe('engine-registry 登録', () => {
        it('CardObjNew が engine-registry に登録されている', () => {
            expect(registryGet('CardObjNew')).toBe(CardObjNew);
        });
    });
});
