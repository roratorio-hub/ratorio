import { describe, it, expect, vi } from 'vitest';
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

    // 3f-3: インライン文字列ハンドラ → addEventListener 化に伴い、
    // window 登録のリグレッションテストをリスナー配線の behavior テストに置換
    describe('スイッチの click 配線 (3f-3)', () => {
        it('BuildUpSelectArea が生成したスイッチの click で OnClickSwitchHandler が呼ばれる', () => {
            const mngParam = new CConfBaseManagementParam();
            // ヘッダ更新（RefreshSelectAreaHeader）が参照するアクティブ設定データのスタブ
            mngParam.SetActiveConfData({ IsDefaultValues: () => true });
            const inst: any = new CConfBase2(mngParam);
            inst.InitData();
            const spy = vi.spyOn(CConfBase2 as any, 'OnClickSwitchHandler').mockImplementation(() => {});
            const root = document.createElement('div');
            document.body.appendChild(root);
            inst.BuildUpSelectArea(root, false);
            const sw = document.getElementById(inst.GetSwitchIdString(inst.instanceNo)) as HTMLElement;
            expect(sw).not.toBeNull();
            sw.click();
            expect(spy).toHaveBeenCalledWith(inst.instanceNo);
            spy.mockRestore();
            document.body.innerHTML = '';
        });
    });
});
