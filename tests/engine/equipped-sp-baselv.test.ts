import { describe, it, expect, afterEach } from 'vitest';
import { CheckSpDefBaseLvOver, CheckSpDefBaseLvOver285 } from '@engine/status/equipped-sp.js';
import { GetItemExplainText } from '@engine/equip/item.h.js';
import {
    ITEM_SP_BASE_LV_OVER_170_OFFSET,
    ITEM_SP_BASE_LV_OVER_285_OFFSET,
    ITEM_SP_PURE_STR_BY_30_OFFSET,
    ITEM_SP_SKILL_FIXED_TIME,
    ITEM_SP_TRANSCENDENCE_2,
} from '@engine/const/EnumItemSpId.js';
import { set_n_A_BaseLV } from '@engine/runtime/ro4-state.js';

// 「BaseLv N 以上」を SPID の 10^15 の位（1桁）で表す条件と、それが要求するBaseLv
const BASE_LV_CONDITIONS: [number, number][] = [
    [1, 170],
    [2, 100],
    [4, 175],
    [5, 250],
    [6, 260],
    [7, 165],
];

describe('CheckSpDefBaseLvOver（BaseLv以上条件）', () => {
    afterEach(() => set_n_A_BaseLV(1));

    it.each(BASE_LV_CONDITIONS)('条件コード %i は BaseLv %i 以上で成立し、残余のSPIDを返す', (code, needLv) => {
        const flag = code * ITEM_SP_BASE_LV_OVER_170_OFFSET + 7;

        set_n_A_BaseLV(needLv - 1);
        expect(CheckSpDefBaseLvOver(flag)).toBe(-1);

        set_n_A_BaseLV(needLv);
        expect(CheckSpDefBaseLvOver(flag)).toBe(7);
    });

    it('条件が指定されていない場合は BaseLv に関係なく spDefRemain をそのまま返す', () => {
        set_n_A_BaseLV(1);
        expect(CheckSpDefBaseLvOver(7)).toBe(7);
    });
});

describe('CheckSpDefBaseLvOver285（BaseLv285以上条件）', () => {
    // SPID 最上位桁の 7 が目印。後ろに能力ID（固定詠唱割合減少）が続く
    const FLAG_285 = ITEM_SP_BASE_LV_OVER_285_OFFSET + BigInt(ITEM_SP_SKILL_FIXED_TIME);

    afterEach(() => set_n_A_BaseLV(1));

    it('BaseLv284 では不成立（-1）、BaseLv285 で成立し目印を除いた能力IDを Number で返す', () => {
        set_n_A_BaseLV(284);
        expect(CheckSpDefBaseLvOver285(FLAG_285)).toBe(-1);

        set_n_A_BaseLV(285);
        expect(CheckSpDefBaseLvOver285(FLAG_285)).toBe(ITEM_SP_SKILL_FIXED_TIME);
    });

    it('超越段階など BigInt の桁が残る場合は、目印だけを除いて BigInt のまま返す', () => {
        set_n_A_BaseLV(285);
        const result = CheckSpDefBaseLvOver285(FLAG_285 + ITEM_SP_TRANSCENDENCE_2);
        expect(result).toBe(ITEM_SP_TRANSCENDENCE_2 + BigInt(ITEM_SP_SKILL_FIXED_TIME));
    });

    it('目印が無い場合は BaseLv に関係なく、そのまま返す', () => {
        set_n_A_BaseLV(1);
        expect(CheckSpDefBaseLvOver285(ITEM_SP_SKILL_FIXED_TIME)).toBe(ITEM_SP_SKILL_FIXED_TIME);
        const withTranscendence = ITEM_SP_TRANSCENDENCE_2 + BigInt(ITEM_SP_SKILL_FIXED_TIME);
        expect(CheckSpDefBaseLvOver285(withTranscendence)).toBe(withTranscendence);
    });

    it('「純粋なステータスが30上がる度」の桁（1〜6）は目印と見なさずそのまま返す', () => {
        set_n_A_BaseLV(1);
        const strBy30 = ITEM_SP_PURE_STR_BY_30_OFFSET + BigInt(ITEM_SP_SKILL_FIXED_TIME);
        expect(CheckSpDefBaseLvOver285(strBy30)).toBe(strBy30);
    });
});

describe('GetItemExplainText（BaseLv以上条件の表示文言）', () => {
    it.each(BASE_LV_CONDITIONS)('条件コード %i を「BaseLvが%i以上の時、追加で」と表示する', (code, needLv) => {
        const spId = code * ITEM_SP_BASE_LV_OVER_170_OFFSET + ITEM_SP_SKILL_FIXED_TIME;
        const condText = GetItemExplainText(spId, 80)[0][1];
        expect(condText).toContain(`BaseLvが${needLv}以上の時、追加で`);
    });

    it('BaseLv285以上の条件を「BaseLvが285以上の時、追加で」と表示し、効果の説明文も出す', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_BASE_LV_OVER_285_OFFSET + BigInt(ITEM_SP_SKILL_FIXED_TIME), 80);
        expect(textInfoArray[0][1]).toBe('BaseLvが285以上の時、追加で');
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 80%');
    });

    it('BaseLv285以上の条件は、超越段階の条件と併記できる', () => {
        const spId = ITEM_SP_BASE_LV_OVER_285_OFFSET + ITEM_SP_TRANSCENDENCE_2 + BigInt(ITEM_SP_SKILL_FIXED_TIME);
        const textInfoArray = GetItemExplainText(spId, 80);
        expect(textInfoArray[0][1]).toBe('超越段階が2以上の時、BaseLvが285以上の時、追加で');
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 80%');
    });

    it('「純粋なステータスが30上がる度」の表示文言は回帰しない', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_PURE_STR_BY_30_OFFSET + BigInt(ITEM_SP_SKILL_FIXED_TIME), 80);
        expect(textInfoArray[0][1]).toBe('純粋なStrが30上がる度に、');
    });
});
