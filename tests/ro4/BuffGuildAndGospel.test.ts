import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { n_A_PassSkill4, Click_A4 } from '@ro4/BuffGuildAndGospel.js';
// dewindow: calc は head-bridge 経由（旧 './head.js' 直接 import → 単体テストが OOM していた）。
import { __registerHeadFunctions } from '@ro4/head-bridge.js';

describe('BuffGuildAndGospel.js', () => {
    // Click_A4 は n_A_PassSkill4 の設定有無で A4TD の背景色と A4used の「使用中」表示を切り替え、
    // recalc=true のときだけ再計算通知（notifyChanged、リファクタリング計画 Phase 9）を呼ぶ。
    // 通知先の実際の再計算（calc）が呼ばれるかで配線を検証する
    // （自動計算ポリシーが常に再計算する flag=3 に設定した状態で確認）。
    describe('Click_A4 の使用中判定と再計算通知の配線', () => {
        let calc: ReturnType<typeof vi.fn>;
        beforeEach(() => {
            calc = vi.fn();
            __registerHeadFunctions({ calc });
            const td = document.createElement('td'); td.id = 'A4TD';
            const used = document.createElement('span'); used.id = 'A4used';
            const autoCalcFlag = document.createElement('input'); autoCalcFlag.id = 'OBJID_INPUT_ATTACK_METHOD_AUTO_CALC';
            autoCalcFlag.value = '3';
            document.body.append(td, used, autoCalcFlag);
            n_A_PassSkill4.fill(0);
        });
        afterEach(() => {
            document.body.innerHTML = '';
            n_A_PassSkill4.fill(0);
        });

        it('全スキル未設定なら未使用表示にし、recalc=false では再計算しない', () => {
            Click_A4(false);
            expect(document.getElementById('A4used')!.innerHTML).toBe('');
            expect(document.getElementById('A4TD')!.style.backgroundColor).toBeTruthy();
            expect(calc).not.toHaveBeenCalled();
        });

        it('いずれか設定済みなら「使用中」表示にし、recalc=true で1回再計算する', () => {
            n_A_PassSkill4[5] = 1;
            Click_A4(true);
            expect(document.getElementById('A4used')!.innerHTML).toContain('使用中');
            expect(document.getElementById('A4TD')!.style.backgroundColor).toBeTruthy();
            expect(calc).toHaveBeenCalledTimes(1);
        });
    });
});
