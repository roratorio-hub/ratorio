import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { n_A_PassSkill4, Click_A4 } from '@ro4/BuffGuildAndGospel.js';
// dewindow: AutoCalc は head-bridge 経由（旧 './head.js' 直接 import → 単体テストが OOM していた）。
import { __registerHeadFunctions } from '@ro4/head-bridge.js';

describe('BuffGuildAndGospel.js', () => {
    // Click_A4 は n_A_PassSkill4 の設定有無で A4TD の背景色と A4used の「使用中」表示を切り替え、
    // recalc=true のときだけ AutoCalc を呼ぶ。DOM 副作用と AutoCalc 配線を検証する。
    describe('Click_A4 の使用中判定と AutoCalc 配線', () => {
        let autoCalc: ReturnType<typeof vi.fn>;
        beforeEach(() => {
            autoCalc = vi.fn();
            __registerHeadFunctions({ AutoCalc: autoCalc });
            const td = document.createElement('td'); td.id = 'A4TD';
            const used = document.createElement('span'); used.id = 'A4used';
            document.body.append(td, used);
            n_A_PassSkill4.fill(0);
        });
        afterEach(() => {
            document.body.innerHTML = '';
            n_A_PassSkill4.fill(0);
        });

        it('全スキル未設定なら未使用表示にし、recalc=false では AutoCalc を呼ばない', () => {
            Click_A4(false);
            expect(document.getElementById('A4used')!.innerHTML).toBe('');
            expect(document.getElementById('A4TD')!.style.backgroundColor).toBeTruthy();
            expect(autoCalc).not.toHaveBeenCalled();
        });

        it('いずれか設定済みなら「使用中」表示にし、recalc=true で AutoCalc を1回呼ぶ', () => {
            n_A_PassSkill4[5] = 1;
            Click_A4(true);
            expect(document.getElementById('A4used')!.innerHTML).toContain('使用中');
            expect(document.getElementById('A4TD')!.style.backgroundColor).toBeTruthy();
            expect(autoCalc).toHaveBeenCalledTimes(1);
        });
    });
});
