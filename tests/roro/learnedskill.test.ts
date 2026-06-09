import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    n_A_LearnedSkill,
    RefreshSkillColumnHeaderLearned,
} from '@roro/learnedskill.js';

// RefreshSkillColumnHeaderLearned は末尾で header/usedtext 要素を操作するため事前作成が必要
function setupLearnedSkillHeaderDOM() {
    const header = document.createElement('td');
    header.id = 'OBJID_SKILL_COLUMN_HEADER_LEARNED';
    const usedText = document.createElement('span');
    usedText.id = 'OBJID_SKILL_COLUMN_USEDTEXT_LEARNED';
    document.body.appendChild(header);
    document.body.appendChild(usedText);
}

describe('learnedskill.js', () => {
    describe('RefreshSkillColumnHeaderLearned', () => {
        beforeEach(setupLearnedSkillHeaderDOM);
        afterEach(() => { document.body.innerHTML = ''; });

        it('changedIdx のスキルレベルを newValue に更新する', () => {
            const el = document.createElement('select');
            // AutoCalc は window グローバルのため unit test 環境では未定義 → throw するが
            // n_A_LearnedSkill への代入はその前に完了している
            try { RefreshSkillColumnHeaderLearned(el, 3, '7'); } catch {}
            expect(n_A_LearnedSkill[3]).toBe(7);
        });

        it('newValue 非ゼロのとき選択済みクラスを設定する', () => {
            const el = document.createElement('select');
            RefreshSkillColumnHeaderLearned(el, -1, '5');
            expect(el.getAttribute('class')).toBe('CSSCLS_SELECTED_LEARNED_SKILL');
        });

        it('newValue が "0" のとき選択済みクラスをクリアする', () => {
            const el = document.createElement('select');
            el.setAttribute('class', 'CSSCLS_SELECTED_LEARNED_SKILL');
            RefreshSkillColumnHeaderLearned(el, -1, '0');
            expect(el.getAttribute('class')).toBe('');
        });

        // URL一括ロード（OnClickSkillSWLearned の load ハンドラ）の「AutoCalc 1回化」を支える挙動。
        // bSuppressAutoCalc=true のとき、状態は更新するが AutoCalc を呼ばないこと。
        it('bSuppressAutoCalc で AutoCalc 呼び出しが制御され、状態更新は常に行われる', () => {
            const spy = vi.fn();
            (globalThis as any).AutoCalc = spy;
            try {
                const el = document.createElement('select');

                // 通常（第4引数省略）: 状態更新 + AutoCalc 1回
                RefreshSkillColumnHeaderLearned(el, 2, '4');
                expect(n_A_LearnedSkill[2]).toBe(4);
                expect(spy).toHaveBeenCalledTimes(1);

                // 抑止（true）: 状態は更新するが AutoCalc は呼ばない
                spy.mockClear();
                RefreshSkillColumnHeaderLearned(el, 2, '6', true);
                expect(n_A_LearnedSkill[2]).toBe(6);
                expect(spy).not.toHaveBeenCalled();
            } finally {
                delete (globalThis as any).AutoCalc;
            }
        });
    });
});
