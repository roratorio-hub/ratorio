import { describe, it, expect, vi } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CConfBase, CTargetData } from '@roro/CConfBase.js';

describe('CConfBase.js', () => {
    describe('インスタンス生成', () => {
        const inst = new CConfBase([]);

        describe('静的プロパティ（コンストラクタ実行後に設定）', () => {
            it('CONF_DATA_INDEX_ID が 0', () => { expect(CConfBase.CONF_DATA_INDEX_ID).toBe(0); });
            it('CONF_DATA_INDEX_TEXT が 1', () => { expect(CConfBase.CONF_DATA_INDEX_TEXT).toBe(1); });
            it('CONF_DATA_INDEX_CONTROL_TYPE が 2', () => { expect(CConfBase.CONF_DATA_INDEX_CONTROL_TYPE).toBe(2); });
            it('CONF_DATA_INDEX_DEFAULT_VALUE が 3', () => { expect(CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE).toBe(3); });
            it('CONF_DATA_INDEX_MIN_VALUE が 4', () => { expect(CConfBase.CONF_DATA_INDEX_MIN_VALUE).toBe(4); });
            it('CONF_DATA_INDEX_MAX_VALUE が 5', () => { expect(CConfBase.CONF_DATA_INDEX_MAX_VALUE).toBe(5); });
            it('CONF_DATA_INDEX_TOOL_TIP が 6', () => { expect(CConfBase.CONF_DATA_INDEX_TOOL_TIP).toBe(6); });
        });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(3)).toBe('OBJID_CONTROL_CONF_3_HEADER');
            });
        });

        describe('GetSwitchIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetSwitchIdString(0)).toBe('OBJID_CONTROL_CONF_0_SWITCH');
            });
        });
    });

    // 3f-3: インライン文字列ハンドラ → addEventListener 化に伴い、
    // window 登録のリグレッションテストをリスナー配線の behavior テストに置換
    describe('スイッチの click 配線 (3f-3)', () => {
        it('BuildUpSelectArea が生成したスイッチの click で OnClickSwitchHandler が呼ばれる', () => {
            const inst = new CConfBase([]);
            (CConfBase as any).targetArray ??= [];
            const spy = vi.spyOn(CConfBase as any, 'OnClickSwitchHandler').mockImplementation(() => {});
            const root = document.createElement('div');
            document.body.appendChild(root);
            inst.BuildUpSelectArea(root, false);
            const sw = document.getElementById(
                inst.GetSwitchIdString((inst as any).instanceNo)) as HTMLElement;
            expect(sw).not.toBeNull();
            sw.click();
            expect(spy).toHaveBeenCalledWith((inst as any).instanceNo);
            spy.mockRestore();
            document.body.innerHTML = '';
        });
    });

});
