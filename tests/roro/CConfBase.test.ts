import { describe, it, expect } from 'vitest';
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

    describe('window グローバル登録', () => {
        // onClick="CConfBase.OnClickSwitchHandler(...)" 形式のインライン文字列ハンドラは
        // グローバルスコープで評価されるため window.CConfBase が必須。
        // compat ブロックが誤って除去された場合に検出するためのリグレッションテスト。
        it('window.CConfBase が登録されている', () => {
            expect((globalThis as any).CConfBase).toBe(CConfBase);
        });
    });

});
