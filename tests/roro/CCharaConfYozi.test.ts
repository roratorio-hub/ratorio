import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfYozi } from '@roro/CCharaConfYozi.js';

describe('CCharaConfYozi.js', () => {
    describe('CCharaConfYozi インスタンス生成', () => {
        const inst = new CCharaConfYozi(new Array(30).fill(0));

        it('confCountLimit が 30', () => { expect(inst.confCountLimit).toBe(30); });
        it('itemInRow が 2', () => { expect(inst.itemInRow).toBe(2); });
        it('confLabel が "四次職支援設定"', () => { expect(inst.confLabel).toBe('四次職支援設定'); });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(6)).toBe('OBJID_CONTROL_CONF_6_HEADER');
            });
        });
    });
});
