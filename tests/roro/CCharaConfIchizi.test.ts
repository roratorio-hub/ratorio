import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfIchizi } from '@roro/CCharaConfIchizi.js';

describe('CCharaConfIchizi.js', () => {
    describe('CCharaConfIchizi インスタンス生成', () => {
        const inst = new CCharaConfIchizi(new Array(50).fill(0));

        it('confCountLimit が 50', () => { expect(inst.confCountLimit).toBe(50); });
        it('itemInRow が 2', () => { expect(inst.itemInRow).toBe(2); });
        it('confLabel が "一次職支援設定"', () => { expect(inst.confLabel).toBe('一次職支援設定'); });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(4)).toBe('OBJID_CONTROL_CONF_4_HEADER');
            });
        });
    });
});
