import { describe, it, expect } from 'vitest';
import {
    NormalizeCycleCount, GetJoinDmgText, GetJoinDmgText2, GetSumDmgText,
} from '@engine/battle/damage-summary-text.js';

// 整形なしの数値整形スタブ（数値の正しさだけを検証する）
const raw = (v: number) => v;

describe('NormalizeCycleCount', () => {
    it('有限かつ1以上の値をそのまま返す', () => {
        expect(NormalizeCycleCount(10)).toBe(10);
    });

    it.each([undefined, NaN, 0, Infinity, -1])('%s を 1 に丸める', (v) => {
        expect(NormalizeCycleCount(v as number)).toBe(1);
    });
});

describe('GetJoinDmgText2（1サイクルダメージ・詳細表示セル）', () => {
    it('分割ヒット数と多段ヒット数の両方が>1のとき、両方を掛け戻してからサイクル数を掛ける（天星の実測ケース）', () => {
        // [分割後ダメージ, 分割ヒット数, 多段ヒット数]。天星: 4383 × 3分割 × 2Hit(全弾命中) を10サイクル
        const result = GetJoinDmgText2([[4383, 3, 2]], raw, 0, 10);
        expect(result).toBe('262980');
    });

    it('多段ヒット数が1（半分命中）のときは分割数だけ掛け戻す', () => {
        const result = GetJoinDmgText2([[4383, 3, 1]], raw, 0, 10);
        expect(result).toBe('131490');
    });

    it('分割なし（分割ヒット数1）のときは従来どおり多段ヒット数のみ掛ける', () => {
        const result = GetJoinDmgText2([[4383, 1, 2]], raw, 0, 10);
        expect(result).toBe('87660');
    });

    it('counts を省略すると通常の合計ダメージと一致する（非設置スキル）', () => {
        const result = GetJoinDmgText2([[4383, 3, 2]], raw, 0);
        expect(result).toBe('26298');
    });

    it.each([0, NaN, Infinity])('counts が %s のときは 1 サイクル分として扱う', (counts) => {
        const result = GetJoinDmgText2([[4383, 3, 2]], raw, 0, counts as number);
        expect(result).toBe('26298');
    });

    it('追撃がある場合は " + " で連結する', () => {
        const result = GetJoinDmgText2([[100, 3, 2], [50, 1, 1]], raw, 0, 10);
        expect(result).toBe('6000 + 500');
    });
});

describe('GetSumDmgText（1サイクルダメージ・合計表示セル）', () => {
    it('counts を渡すとサイクル数まで掛けた合計を返す（詳細表示OFF時のセルも同値になる）', () => {
        const result = GetSumDmgText([[4383, 3, 2]], raw, 0, 10);
        expect(result).toBe(262980);
    });

    it('counts を省略すると従来どおり通常の合計ダメージを返す', () => {
        const result = GetSumDmgText([[4383, 3, 2]], raw, 0);
        expect(result).toBe(26298);
    });

    it('追撃がある場合は要素ごとの実ダメージを加算する', () => {
        const result = GetSumDmgText([[100, 3, 2], [50, 1, 1]], raw, 0, 10);
        expect(result).toBe(6500);
    });
});

describe('GetJoinDmgText（通常(1Hit)欄・内訳表示）', () => {
    it('分割ヒット数と多段ヒット数の内訳を " × N hits × M Hits" で表示する', () => {
        const result = GetJoinDmgText([[4383, 3, 2]], raw, 0);
        expect(result).toBe('4383 × 3 hits × 2 Hits');
    });

    it('分割ヒット数が1のときは hits 表記を出さない', () => {
        const result = GetJoinDmgText([[4383, 1, 2]], raw, 0);
        expect(result).toBe('4383 × 2 Hits');
    });

    it('追撃がある場合は " + " で連結する', () => {
        const result = GetJoinDmgText([[100, 1, 1], [50, 1, 1]], raw, 0);
        expect(result).toBe('100 + 50');
    });
});
