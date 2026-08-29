import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
    AUTO_SPELL_SETTING_COUNT,
    OBJID_OFFSET_AS_SKILL_ID,
    OBJID_OFFSET_AS_SKILL_LV,
    OBJID_OFFSET_AS_SKILL_PROB,
    OnClickEasySetUpAutoSpell,
} from '@engine/skill/calcautospell.js';
import { __registerFootFunctions } from '@engine/bridge/foot-bridge.js';
import { CardObjNew } from '@engine/equip/card.dat.js';
import { CARD_DATA_INDEX_SPBEGIN } from '@engine/const/EnumCardDataIndex.js';
import { n_A_card, set_n_A_card } from '@engine/runtime/roro-state.js';

// カード装備領域（engine/common.js の const_identifier 採番）
const CARD_REGION_ID_ARMS_RIGHT_1 = 0;
const CARD_REGION_ID_ARMS_RIGHT_2 = 1;

// CardObjNew[4420]（ウィンドホークセット効果カード）は ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL(225) で
// オートスペル[ワイルドウォーク]（AutoSpellSkill の AS_ID 249, Lv5）を持つ
const SET_EFFECT_CARD_ID_WILD_WALK = 4420;
const AS_ID_WILD_WALK = 249;
const SKILL_LV_WILD_WALK = 5;

/**
 * GetEquippedSPValueArrayCardAndElse（equipped-sp.js）の簡略フェイク.
 * 本物は BuffOtherCategory.js を import しており、そこから save-data の循環 import
 * （vitest.config.ts の exclude コメント参照: hmjob/BuffOtherCategory/BuffItemAndFood が
 * 起点でワーカーがハングする）に触れてしまうため、単体テストでは import できない。
 * ここで検証したいのは「カード由来のオートスペルが二重登録されないこと」で、
 * このテストに使うデータ（225,249）は精錬値・職業制限等の条件フラグを持たないため、
 * n_A_card を実データ（CardObjNew）に対して完全一致で走査するだけで十分に再現できる。
 */
function fakeGetEquippedSPValueArrayCardAndElse(spid: number): number[] {
    const result: number[] = [];
    for (const cardId of n_A_card) {
        const cardData = (CardObjNew as Record<number, unknown[]>)[cardId];
        if (!cardData) continue;
        for (let i = 0; cardData[CARD_DATA_INDEX_SPBEGIN + i] !== 0; i += 2) {
            if (cardData[CARD_DATA_INDEX_SPBEGIN + i] === spid) {
                result.push(cardData[CARD_DATA_INDEX_SPBEGIN + i + 1] as number);
            }
        }
    }
    return result;
}

/**
 * happy-dom は `select.value = <number>`（数値代入）で一致する option を選択できず
 * 空文字になる（testing.md「happy-dom ユニットテストの実装パターン」に既知の制限として記載。
 * 実ブラウザは toString() で暗黙変換されるため実挙動には影響しない）。
 * OnClickEasySetUpAutoSpell は `objSelect.value = AutoSpellSkill[asId][0];` のように
 * 数値をそのまま代入するため、この select だけ setter を差し替えて実ブラウザ相当に補正する。
 */
function patchNumericValueCoercion(el: HTMLSelectElement) {
    const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')!;
    Object.defineProperty(el, 'value', {
        get() { return desc.get!.call(el); },
        set(v: unknown) { desc.set!.call(el, String(v)); },
        configurable: true,
    });
}

/**
 * OnClickEasySetUpAutoSpell が要求する行（スキルID/Lv/発動率の3セレクト）を必要最小限で構築する.
 * BuildUpSettingHtmlAutoSpell は AutoSpellSkill（約250件）を行ごとに2回ソートして
 * <option> を全件生成するため happy-dom 上では数十秒かかり、テストの実行時間を大きく損なう
 * （testing.md「全スイートは約25秒で完走」を壊さないため、ここでは使わない）。
 * OnClickEasySetUpAutoSpell 自体が必要とするのは「対象の値に一致する <option> を持つ
 * <select> が存在すること」だけなので、本テストで使う値（スキルID 0/249、Lv 0/5、発動率 0）
 * のみを持つ軽量な代替 DOM を用意する。
 */
function buildMinimalAutoSpellRows() {
    for (let idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
        const skillSelect = document.createElement('select');
        skillSelect.id = `OBJID_AS_SKILL_ID_${OBJID_OFFSET_AS_SKILL_ID + idx}`;
        for (const v of [0, AS_ID_WILD_WALK]) {
            skillSelect.appendChild(Object.assign(document.createElement('option'), { value: String(v) }));
        }
        patchNumericValueCoercion(skillSelect);

        const lvSelect = document.createElement('select');
        lvSelect.id = `OBJID_AS_SKILL_LV_${OBJID_OFFSET_AS_SKILL_LV + idx}`;
        for (let lv = 0; lv <= 10; lv++) {
            lvSelect.appendChild(Object.assign(document.createElement('option'), { value: String(lv) }));
        }
        patchNumericValueCoercion(lvSelect);

        const probSelect = document.createElement('select');
        probSelect.id = `OBJID_AS_SKILL_PROB_${OBJID_OFFSET_AS_SKILL_PROB + idx}`;
        probSelect.appendChild(Object.assign(document.createElement('option'), { value: '0' }));
        patchNumericValueCoercion(probSelect);

        document.body.append(skillSelect, lvSelect, probSelect);
    }
}

describe('calcautospell.js', () => {
    // OnClickEasySetUpAutoSpell はカード由来のオートスペルを GetEquippedSPValueArrayCardAndElse
    // （装備・カード・ペット・時限効果を横断してＳＰ定義を走査する関数）経由で拾う。
    // 旧実装はこれとは別に n_A_card を生ループで再走査しており、同じASが二重登録されていた。
    describe('OnClickEasySetUpAutoSpell（簡易設定・カード由来オートスペル）', () => {
        beforeEach(() => {
            __registerFootFunctions({
                GetEquippedSPValueArrayEquip: () => [],
                GetEquippedSPValueArrayCardAndElse: fakeGetEquippedSPValueArrayCardAndElse,
            });

            buildMinimalAutoSpellRows();

            // OnChangeSettingAutoSpell（OnClickEasySetUpAutoSpell 末尾で呼ばれる）が参照する要素
            const td = document.createElement('td');
            td.id = 'OBJID_TD_AUTO_SPELL_SETTING';
            const marker = document.createElement('span');
            marker.id = 'OBJID_USED_MARKER_AUTO_SPELL';
            document.body.append(td, marker);

            set_n_A_card(new Array(CARD_REGION_ID_ARMS_RIGHT_2 + 1).fill(0));
        });

        afterEach(() => {
            document.body.innerHTML = '';
            set_n_A_card([]);
        });

        function skillIdSelect(rowIdx: number) {
            return document.getElementById(`OBJID_AS_SKILL_ID_${OBJID_OFFSET_AS_SKILL_ID + rowIdx}`) as HTMLSelectElement;
        }
        function skillLvSelect(rowIdx: number) {
            return document.getElementById(`OBJID_AS_SKILL_LV_${OBJID_OFFSET_AS_SKILL_LV + rowIdx}`) as HTMLSelectElement;
        }

        it('セット効果カード（ワイルドウォーク付与）を装備すると1行目にワイルドウォークが設定される', () => {
            const cards = n_A_card.slice();
            cards[CARD_REGION_ID_ARMS_RIGHT_1] = SET_EFFECT_CARD_ID_WILD_WALK;
            set_n_A_card(cards);

            OnClickEasySetUpAutoSpell();

            expect(skillIdSelect(0).value).toBe(String(AS_ID_WILD_WALK));
            expect(skillLvSelect(0).value).toBe(String(SKILL_LV_WILD_WALK));
        });

        it('カード由来のオートスペルは二重登録されない（1枚装備なら1行しか設定されない）', () => {
            const cards = n_A_card.slice();
            cards[CARD_REGION_ID_ARMS_RIGHT_1] = SET_EFFECT_CARD_ID_WILD_WALK;
            set_n_A_card(cards);

            OnClickEasySetUpAutoSpell();

            // 2行目は「(なし)」のまま
            expect(skillIdSelect(1).value).toBe('0');
        });

        it('同じオートスペルカードを2枠に装備すると2行設定される（多重度は保持される）', () => {
            const cards = n_A_card.slice();
            cards[CARD_REGION_ID_ARMS_RIGHT_1] = SET_EFFECT_CARD_ID_WILD_WALK;
            cards[CARD_REGION_ID_ARMS_RIGHT_2] = SET_EFFECT_CARD_ID_WILD_WALK;
            set_n_A_card(cards);

            OnClickEasySetUpAutoSpell();

            expect(skillIdSelect(0).value).toBe(String(AS_ID_WILD_WALK));
            expect(skillIdSelect(1).value).toBe(String(AS_ID_WILD_WALK));
        });

        it('該当カードが無ければ何も設定しない', () => {
            OnClickEasySetUpAutoSpell();

            expect(skillIdSelect(0).value).toBe('0');
        });
    });
});
