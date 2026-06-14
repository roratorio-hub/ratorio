import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfSanzi } from '@roro/CCharaConfSanzi.js';

describe('CCharaConfSanzi.js', () => {
    describe('CCharaConfSanzi インスタンス生成', () => {
        const inst = new CCharaConfSanzi(new Array(100).fill(0));

        it('confCountLimit が 100', () => { expect(inst.confCountLimit).toBe(100); });
        it('itemInRow が 3', () => { expect(inst.itemInRow).toBe(3); });
        it('confLabel が "三次職支援設定"', () => { expect(inst.confLabel).toBe('三次職支援設定'); });
    });
});
