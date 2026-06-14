import { describe, it } from 'vitest';

// card.dat.js（非ESM）がブラウザでは先行ロードするカード定数を事前設定
(globalThis as any).CARD_ID_NONE = 0;
(globalThis as any).CARD_ID_MAX = 9999;
(globalThis as any).CARD_ID_PHYSICAL_RACE_ALL_20UP = 1;
(globalThis as any).CARD_ID_PHYSICAL_MONSTER_ELM_ALL_20UP = 2;
(globalThis as any).CARD_ID_PHYSICAL_SIZE_ALL_15UP = 3;
(globalThis as any).CARD_ID_MAGICAL_RACE_ALL_10UP = 527;
(globalThis as any).CARD_ID_MAGICAL_MONSTER_ELM_ALL_10UP = 1664;
(globalThis as any).CARD_ID_MAGICAL_SIZE_ALL_8UP = 1665;
(globalThis as any).CARD_ID_ARCHER_SKELETON = 107;
(globalThis as any).CARD_ID_POWERFUL_A_SKELETON = 1078;
(globalThis as any).CARD_ID_SHINENNO_KISHI = 31;
(globalThis as any).CARD_ID_OSEN_SARETA_SAMAYOU_MONO = 1595;
(globalThis as any).CARD_ID_GIGANTES = 1526;

describe('hmcard', () => {
    it.todo('動作テストを追加する');
});
