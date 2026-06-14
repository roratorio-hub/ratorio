import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import {
    CConfBaseSelectData, CConfBaseConfData,
    CConfBaseRegisterParam, CConfBaseManagementParam,
    CConfBase2,
} from '@roro/CConfBase2.js';

describe('CConfBase2.js', () => {
    describe('CConfBaseSelectData インスタンス', () => {
        const s = new CConfBaseSelectData();
        it('SetValue がチェーン可能', () => { expect(s.SetValue(5)).toBe(s); });
    });

    describe('CConfBase2 インスタンス生成', () => {
        const inst = new CConfBase2(null);

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(2)).toBe('OBJID_CONTROL_CONF2_2_HEADER');
            });
        });

        describe('GetSwitchIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetSwitchIdString(0)).toBe('OBJID_CONTROL_CONF2_0_SWITCH');
            });
        });
    });

    describe('window グローバル登録', () => {
        // onClick="CConfBase2.OnClickSwitchHandler(...)" 形式のインライン文字列ハンドラは
        // グローバルスコープで評価されるため window.CConfBase2 が必須。
        // compat ブロックが誤って除去された場合に検出するためのリグレッションテスト。
        it('window.CConfBase2 が登録されている', () => {
            expect((globalThis as any).CConfBase2).toBe(CConfBase2);
        });
    });
});
