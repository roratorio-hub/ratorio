import { describe, it, expect } from 'vitest';
import {
    TIME_ITEM_ID_NONE,
    TIME_ITEM_ID_AICILA_CARD,
    TIME_ITEM_ID_ADD_ELEMENTAL_DARK_ATK_30,
    ITEM_SP_TIME_OBJ,
    ITEM_SP_TIME_OBJ_SORT,
} from '@engine/equip/timeitem.dat.js';
import { ItemObjNew } from '@engine/equip/item.dat.js';
import { CardObjNew } from '@engine/equip/card.dat.js';
import { ITEM_DATA_INDEX_DETAIL } from '@engine/const/EnumItemDataIndex.js';
import { CARD_DATA_INDEX_DETAIL } from '@engine/const/EnumCardDataIndex.js';

describe('timeitem.dat.js', () => {
    describe('エクスポート確認', () => {
        it('TIME_ITEM_ID_NONE が 0',                     () => expect(TIME_ITEM_ID_NONE).toBe(0));
        it('TIME_ITEM_ID_AICILA_CARD が 1',              () => expect(TIME_ITEM_ID_AICILA_CARD).toBe(1));
        it('TIME_ITEM_ID_ADD_ELEMENTAL_DARK_ATK_30 が 335', () => expect(TIME_ITEM_ID_ADD_ELEMENTAL_DARK_ATK_30).toBe(335));
        it('ITEM_SP_TIME_OBJ[0][0] が 0',               () => expect(ITEM_SP_TIME_OBJ[0][0]).toBe(0));
        it('ITEM_SP_TIME_OBJ[1][0] が 1',               () => expect(ITEM_SP_TIME_OBJ[1][0]).toBe(1));
        it('ITEM_SP_TIME_OBJ_SORT の先頭が 0',          () => expect(ITEM_SP_TIME_OBJ_SORT[0]).toBe(0));
    });

    describe('時限効果の元データ登録', () => {
        // アイテム/カードの説明に「一定確率でN秒間、[神力]状態になる」とあるのに時限効果「神力」の元データへ登録し忘れると、
        // 説明欄に「神力 を設定する」ボタンが出ない
        const SRC_KIND_ITEM = 1;
        const SRC_KIND_CARD = 2;
        const shinryoku: any[] = ITEM_SP_TIME_OBJ.find((t: any[]) => t && t[1] === '神力' && t[3].length > 0);
        const sources: number[][] = shinryoku[3];
        // 「…になる確率が上昇」は発動確率の補正であり、発動元ではない
        const procsShinryoku = (detail: unknown) => typeof detail === 'string' && /一定確率で\d+秒間、\[神力\]状態になる/.test(detail);

        it('説明に「一定確率でN秒間、[神力]状態になる」があるアイテムは、神力の時限効果の元データに登録されている', () => {
            const missing: string[] = [];
            ItemObjNew.forEach((row: any[], id: number) => {
                if (!procsShinryoku(row[ITEM_DATA_INDEX_DETAIL])) return;
                if (!sources.some(([kind, srcId]) => kind === SRC_KIND_ITEM && srcId === id)) missing.push(`ItemObjNew[${id}]`);
            });
            expect(missing).toEqual([]);
        });

        it('説明に「一定確率でN秒間、[神力]状態になる」があるカードは、神力の時限効果の元データに登録されている', () => {
            const missing: string[] = [];
            CardObjNew.forEach((row: any[], id: number) => {
                if (!procsShinryoku(row[CARD_DATA_INDEX_DETAIL])) return;
                if (!sources.some(([kind, srcId]) => kind === SRC_KIND_CARD && srcId === id)) missing.push(`CardObjNew[${id}]`);
            });
            expect(missing).toEqual([]);
        });
    });
});
