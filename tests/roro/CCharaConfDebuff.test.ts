import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfDebuff } from '@roro/CCharaConfDebuff.js';

describe('CCharaConfDebuff.js', () => {
    describe('CCharaConfDebuff インスタンス生成', () => {
        const inst = new CCharaConfDebuff(new Array(50).fill(0));

        it('confCountLimit が 50', () => { expect(inst.confCountLimit).toBe(50); });
        it('itemInRow が 3', () => { expect(inst.itemInRow).toBe(3); });
        it('confLabel が "プレイヤー状態異常設定"', () => { expect(inst.confLabel).toBe('プレイヤー状態異常設定'); });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(5)).toBe('OBJID_CONTROL_CONF_5_HEADER');
            });
        });
    });
});
