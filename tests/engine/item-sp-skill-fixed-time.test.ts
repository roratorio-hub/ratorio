import { describe, it, expect, beforeEach } from 'vitest';
import { GetItemExplainText } from '@engine/equip/item.h.js';
import { CheckAndApplyItemSetEquipping } from '@engine/equip/itemset.h.js';
import { getFixedCastTimeReductionRate } from '@engine/status/avoid-flee.js';
import {
    ITEM_SP_REFINE_OVER_9_OFFSET,
    ITEM_SP_SKILL_FIXED_TIME,
} from '@engine/const/EnumItemSpId.js';
import { EQUIP_REGION_ID_COUNT } from '@engine/const/EnumMigItemParamId.js';
import { EQUIP_REGION_ID_HEAD_TOP } from '@engine/const/EnumEquipRegionId.js';
import { ITEM_ID_AQUARIUS_DIADEM } from '@engine/equip/item.dat.js';
import { CARD_ID_AQUARIUS, CARD_ID_ENCHANT_KOTEIEISHO_70 } from '@engine/equip/card.dat.js';
import { CARD_REGION_ID_COUNT, CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_HEAD_TOP } from '@engine/runtime/common.js';
import { set_n_A_Equip, set_n_A_card } from '@engine/runtime/roro-state.js';
import { set_g_confDataDebuff, set_g_confDataSanzi, set_g_objCharaConfCustomStatus } from '@engine/runtime/global.js';

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

describe('getFixedCastTimeReductionRate（アイテムSPの固定詠唱時間 - ◯%）', () => {
    let equip: number[];
    let cards: number[];

    // セット効果は CheckAndApplyItemSetEquipping() が n_A_Equip / n_A_card へ追加するので、本番と同じ経路で用意する
    function applyEquipping() {
        set_n_A_Equip([...equip]);
        set_n_A_card([...cards]);
        CheckAndApplyItemSetEquipping();
    }

    beforeEach(() => {
        equip = Array(EQUIP_REGION_ID_COUNT).fill(0);
        cards = Array(CARD_REGION_ID_COUNT).fill(0);
        set_g_confDataSanzi([]);
        set_g_confDataDebuff([]);
        set_g_objCharaConfCustomStatus({ GetConf: () => 0 });
    });

    it('固定詠唱の効果が何も無ければ 0', () => {
        applyEquipping();
        expect(getFixedCastTimeReductionRate()).toBe(0);
    });

    it('アクエリアスダイアデムとアクエリアスのセットで 50', () => {
        equip[EQUIP_REGION_ID_HEAD_TOP] = ITEM_ID_AQUARIUS_DIADEM;
        cards[CARD_REGION_ID_HEAD_TOP] = CARD_ID_AQUARIUS;
        applyEquipping();
        expect(getFixedCastTimeReductionRate()).toBe(50);
    });

    it('アクエリアスダイアデムだけではセットが成立せず 0', () => {
        equip[EQUIP_REGION_ID_HEAD_TOP] = ITEM_ID_AQUARIUS_DIADEM;
        applyEquipping();
        expect(getFixedCastTimeReductionRate()).toBe(0);
    });

    it('他の固定詠唱短縮効果と重複しても合算されず、大きい方（70）だけが有効', () => {
        equip[EQUIP_REGION_ID_HEAD_TOP] = ITEM_ID_AQUARIUS_DIADEM;
        cards[CARD_REGION_ID_HEAD_TOP] = CARD_ID_AQUARIUS;
        cards[CARD_REGION_ID_ENCHANT_BODY_1] = CARD_ID_ENCHANT_KOTEIEISHO_70;
        applyEquipping();
        expect(getFixedCastTimeReductionRate()).toBe(70);
    });
});
