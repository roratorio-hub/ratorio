import { describe, it, expect } from 'vitest';
import { weaponsize } from '@roro/etc.js';

describe('etc.js', () => {
    describe('データ確認', () => {
        it('weaponsize[0] が [1,1,1]', () => {
            expect(weaponsize[0]).toEqual([1, 1, 1]);
        });
    });
});
