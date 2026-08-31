import { describe, it, expect } from 'vitest';
import { HtmlCreateElementOption, HtmlRemoveOptionAll } from '@engine/runtime/util.js';

describe('util.js の option 生成・削除', () => {
    describe('HtmlCreateElementOption', () => {
        it('select の末尾に option を追加し value/text が引ける', () => {
            const select = document.createElement('select');
            const opt = HtmlCreateElementOption(42, '名前42', select);
            expect(select.options.length).toBe(1);
            expect(select.options[0]).toBe(opt);
            expect(opt.value).toBe('42');
            expect(opt.textContent).toBe('名前42');
        });

        it('複数回呼ぶと追加順に末尾へ積まれる', () => {
            const select = document.createElement('select');
            HtmlCreateElementOption(1, 'a', select);
            HtmlCreateElementOption(2, 'b', select);
            HtmlCreateElementOption(3, 'c', select);
            expect(Array.from(select.options).map(o => o.value)).toEqual(['1', '2', '3']);
        });

        it('optgroup に渡すとその子として追加される', () => {
            const select = document.createElement('select');
            const group = document.createElement('optgroup');
            select.appendChild(group);
            const opt = HtmlCreateElementOption(7, '名前7', group);
            expect(group.children.length).toBe(1);
            expect(group.children[0]).toBe(opt);
            expect(select.options.length).toBe(1);
        });

        it('select/optgroup 以外（div）を渡すと何も追加されない', () => {
            const div = document.createElement('div');
            HtmlCreateElementOption(1, 'x', div as unknown as HTMLSelectElement);
            expect(div.children.length).toBe(0);
        });

        it('objSelect が null なら例外を投げず option だけを返す', () => {
            const opt = HtmlCreateElementOption(1, 'x', null as unknown as HTMLSelectElement);
            expect(opt.value).toBe('1');
        });
    });

    describe('HtmlRemoveOptionAll', () => {
        it('select 内の全 option を削除する', () => {
            const select = document.createElement('select');
            HtmlCreateElementOption(1, 'a', select);
            HtmlCreateElementOption(2, 'b', select);
            HtmlRemoveOptionAll(select);
            expect(select.options.length).toBe(0);
        });

        it('objSelect が null なら例外を投げない', () => {
            expect(() => HtmlRemoveOptionAll(null as unknown as HTMLSelectElement)).not.toThrow();
        });
    });

    // 真因の再混入を検出する回帰ガード（残件台帳 B-28）:
    // happy-dom の HTMLOptionsCollection はアクセスのたびに全 option を
    // querySelectorAll で再収集するため、`options.add`/`options.remove(0)` ループは
    // 1操作あたり数百KBをリークし数千件規模で数秒〜OOMに達する。
    // appendChild/replaceChildren に依存する実装であれば同規模でも数秒で完走する。
    // 第3引数の testTimeout は全スイート並列実行時のCPU競合を見込んだ余裕
    // （デフォルトの5000msでは、この計測自体が先にタイムアウトしてしまうため）。
    it('2000件の追加→全削除を10秒以内で完了する（happy-dom options API の遅延・リーク回帰ガード）', () => {
        const select = document.createElement('select');
        const t0 = Date.now();
        for (let i = 0; i < 2000; i++) {
            HtmlCreateElementOption(i, `名前${i}`, select);
        }
        expect(select.options.length).toBe(2000);
        HtmlRemoveOptionAll(select);
        expect(select.options.length).toBe(0);
        expect(Date.now() - t0).toBeLessThan(10000);
    }, 15000);
});
