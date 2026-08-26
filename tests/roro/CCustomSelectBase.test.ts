import { describe, it, expect } from 'vitest';
import { CCustomSelectBase } from '@engine/CCustomSelectBase.js';

describe('CCustomSelectBase.js', () => {
    describe('静的プロパティ確認', () => {
        it('instanceMap が Map', () => {
            expect(CCustomSelectBase.instanceMap).toBeInstanceOf(Map);
        });
    });
});
