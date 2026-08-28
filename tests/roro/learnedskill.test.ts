import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    n_A_LearnedSkill,
    RefreshSkillColumnHeaderLearned,
} from '@engine/skill/learnedskill.js';
// dewindow: AutoCalc は head-bridge 経由になった（旧 bare global）。
// テストは head-bridge にフェイクを登録して呼び出しを観測する。
import { __registerHeadFunctions } from '@engine/bridge/head-bridge.js';
// リファクタリング計画 Phase 9 D3: 再計算ポリシーflagの読み出し元は
// CSaveController.getSettingProp（engine-registry 経由）。
import { register as registryRegister } from '@engine/runtime/engine-registry.js';
import { CSaveDataConst } from '@engine/savedata/CSaveDataConst.js';

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
            // 再計算通知は calc-invalidation.js 経由（calc 未登録なら no-op）。状態代入は通知前に完了する。
            RefreshSkillColumnHeaderLearned(el, 3, '7');
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

        // URL一括ロード（OnClickSkillSWLearned の load ハンドラ）の「再計算通知1回化」を支える挙動。
        // bSuppressAutoCalc=true のとき、状態は更新するが再計算通知しないこと。
        it('bSuppressAutoCalc で再計算通知が制御され、状態更新は常に行われる', () => {
            const calc = vi.fn();
            __registerHeadFunctions({ calc });
            // 再計算ポリシー（リファクタリング計画 Phase 9）: 常に再計算する flag=3 に設定
            registryRegister('CSaveController', {
                // 実際の CSaveController.getSettingProp は BigInt を返す（toSafeBigInt 経由）。
                getSettingProp: (propName: string) =>
                    propName === CSaveDataConst.propNameAttackAutoCalc ? 3n : undefined,
            });
            const el = document.createElement('select');

            // 通常（第4引数省略）: 状態更新 + 再計算通知1回
            RefreshSkillColumnHeaderLearned(el, 2, '4');
            expect(n_A_LearnedSkill[2]).toBe(4);
            expect(calc).toHaveBeenCalledTimes(1);

            // 抑止（true）: 状態は更新するが再計算通知しない
            calc.mockClear();
            RefreshSkillColumnHeaderLearned(el, 2, '6', true);
            expect(n_A_LearnedSkill[2]).toBe(6);
            expect(calc).not.toHaveBeenCalled();
        });
    });
});
