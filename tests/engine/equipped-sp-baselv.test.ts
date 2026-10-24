import { describe, it, expect, afterEach } from 'vitest';
import { CheckSpDefBaseLvOver, CheckSpDefBaseLvOverEx } from '@engine/status/equipped-sp.js';
import { GetItemExplainText } from '@engine/equip/item.h.js';
import { ITEM_SP_BASE_LV_OVER_EX_UNIT, SplitBaseLvOverEx } from '@engine/equip/item-sp-baselv-ex.js';
import * as EnumItemSpId from '@engine/const/EnumItemSpId.js';
import {
    ITEM_SP_BASE_LV_OVER_170_OFFSET,
    ITEM_SP_BASE_LV_OVER_285_OFFSET,
    ITEM_SP_PURE_INT_BY_30_OFFSET,
    ITEM_SP_PURE_STR_BY_30_OFFSET,
    ITEM_SP_SKILL_FIXED_TIME,
    ITEM_SP_TRANSCENDENCE_2,
} from '@engine/const/EnumItemSpId.js';
import { set_n_A_BaseLV } from '@engine/runtime/ro4-state.js';

const FIXED_TIME = BigInt(ITEM_SP_SKILL_FIXED_TIME);

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

describe('CheckSpDefBaseLvOverEx（BaseLv以上条件。Lv上限の拡張で増える専用の桁）', () => {
    const FLAG_285 = ITEM_SP_BASE_LV_OVER_285_OFFSET + FIXED_TIME;

    afterEach(() => set_n_A_BaseLV(1));

    it('BaseLv284 では不成立（-1）、BaseLv285 で成立し条件の桁を除いた能力IDを Number で返す', () => {
        set_n_A_BaseLV(284);
        expect(CheckSpDefBaseLvOverEx(FLAG_285)).toBe(-1);

        set_n_A_BaseLV(285);
        expect(CheckSpDefBaseLvOverEx(FLAG_285)).toBe(ITEM_SP_SKILL_FIXED_TIME);
    });

    it('超越段階など BigInt の桁が残る場合は、条件の桁だけを除いて BigInt のまま返す', () => {
        set_n_A_BaseLV(285);
        expect(CheckSpDefBaseLvOverEx(FLAG_285 + ITEM_SP_TRANSCENDENCE_2)).toBe(ITEM_SP_TRANSCENDENCE_2 + FIXED_TIME);
    });

    it('「純粋なステータスが30上がる度」と併記でき、そちらの桁は残る', () => {
        const flag = FLAG_285 + ITEM_SP_PURE_INT_BY_30_OFFSET;

        set_n_A_BaseLV(284);
        expect(CheckSpDefBaseLvOverEx(flag)).toBe(-1);

        set_n_A_BaseLV(285);
        expect(CheckSpDefBaseLvOverEx(flag)).toBe(ITEM_SP_PURE_INT_BY_30_OFFSET + FIXED_TIME);
    });

    it('条件が無い場合は BaseLv に関係なく、そのまま返す', () => {
        set_n_A_BaseLV(1);
        expect(CheckSpDefBaseLvOverEx(ITEM_SP_SKILL_FIXED_TIME)).toBe(ITEM_SP_SKILL_FIXED_TIME);
        const withTranscendence = ITEM_SP_TRANSCENDENCE_2 + FIXED_TIME;
        expect(CheckSpDefBaseLvOverEx(withTranscendence)).toBe(withTranscendence);
        const strBy30 = ITEM_SP_PURE_STR_BY_30_OFFSET + FIXED_TIME;
        expect(CheckSpDefBaseLvOverEx(strBy30)).toBe(strBy30);
    });

    it('表に無い値の条件は、どのBaseLvでも成立しない', () => {
        set_n_A_BaseLV(99999);
        expect(CheckSpDefBaseLvOverEx(ITEM_SP_BASE_LV_OVER_EX_UNIT * 9n + FIXED_TIME)).toBe(-1);
    });
});

describe('SplitBaseLvOverEx（EnumItemSpId.js の定数との一致）', () => {
    // Lv上限の拡張で ITEM_SP_BASE_LV_OVER_N_OFFSET を足したのに、表への追加を忘れたときに検出する
    const exConstants = Object.entries(EnumItemSpId)
        .map(([name, value]) => [/^ITEM_SP_BASE_LV_OVER_(\d+)_OFFSET$/.exec(name), value] as const)
        .filter(([match, value]) => match !== null && typeof value === 'bigint' && value >= ITEM_SP_BASE_LV_OVER_EX_UNIT)
        .map(([match, value]) => [Number(match![1]), value as bigint] as const);

    it('10^19 の位の定数が1つ以上ある', () => {
        expect(exConstants.length).toBeGreaterThan(0);
    });

    it.each(exConstants)('ITEM_SP_BASE_LV_OVER_%i_OFFSET は BaseLv %i 以上の条件として解決される', (lv, offset) => {
        const split = SplitBaseLvOverEx(offset + FIXED_TIME);
        expect(split?.requiredBaseLv).toBe(lv);
        expect(split?.rest).toBe(ITEM_SP_SKILL_FIXED_TIME);
    });

    it('条件の桁が無い値は null を返す', () => {
        expect(SplitBaseLvOverEx(ITEM_SP_SKILL_FIXED_TIME)).toBeNull();
        expect(SplitBaseLvOverEx(ITEM_SP_PURE_INT_BY_30_OFFSET + FIXED_TIME)).toBeNull();
    });
});

describe('GetItemExplainText（BaseLv以上条件の表示文言）', () => {
    it.each(BASE_LV_CONDITIONS)('条件コード %i を「BaseLvが%i以上の時、追加で」と表示する', (code, needLv) => {
        const spId = code * ITEM_SP_BASE_LV_OVER_170_OFFSET + ITEM_SP_SKILL_FIXED_TIME;
        const condText = GetItemExplainText(spId, 80)[0][1];
        expect(condText).toContain(`BaseLvが${needLv}以上の時、追加で`);
    });

    it('BaseLv285以上の条件を「BaseLvが285以上の時、追加で」と表示し、効果の説明文も出す', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_BASE_LV_OVER_285_OFFSET + FIXED_TIME, 80);
        expect(textInfoArray[0][1]).toBe('BaseLvが285以上の時、追加で');
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 80%');
    });

    it('BaseLv285以上の条件は、超越段階の条件と併記できる', () => {
        const spId = ITEM_SP_BASE_LV_OVER_285_OFFSET + ITEM_SP_TRANSCENDENCE_2 + FIXED_TIME;
        const textInfoArray = GetItemExplainText(spId, 80);
        expect(textInfoArray[0][1]).toBe('超越段階が2以上の時、BaseLvが285以上の時、追加で');
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 80%');
    });

    it('BaseLv285以上の条件は、「純粋なステータスが30上がる度」の条件と併記できる', () => {
        const spId = ITEM_SP_BASE_LV_OVER_285_OFFSET + ITEM_SP_PURE_INT_BY_30_OFFSET + FIXED_TIME;
        const textInfoArray = GetItemExplainText(spId, 80);
        expect(textInfoArray[0][1]).toBe('BaseLvが285以上の時、追加で純粋なIntが30上がる度に、');
        expect(textInfoArray[1][1]).toBe('固定詠唱時間 - 80%');
    });

    it('「純粋なステータスが30上がる度」の表示文言は回帰しない', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_PURE_STR_BY_30_OFFSET + FIXED_TIME, 80);
        expect(textInfoArray[0][1]).toBe('純粋なStrが30上がる度に、');
    });
});
