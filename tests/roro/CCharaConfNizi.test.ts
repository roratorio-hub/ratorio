import { describe, it, expect } from 'vitest';
import { CCharaConfNizi } from '@engine/CCharaConfNizi.js';

describe('CCharaConfNizi.js', () => {
    describe('CCharaConfNizi インスタンス生成', () => {
        const inst = new CCharaConfNizi(new Array(50).fill(0));

        it('confCountLimit が 50', () => { expect(inst.confCountLimit).toBe(50); });
        it('itemInRow が 3', () => { expect(inst.itemInRow).toBe(3); });
        it('confLabel が "二次職支援設定"', () => { expect(inst.confLabel).toBe('二次職支援設定'); });
    });
});
