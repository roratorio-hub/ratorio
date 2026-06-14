import { describe, it, expect } from 'vitest';
import { CSaveDataMappingManager } from '@roro/CSaveDataMappingManager.js';

describe('CSaveDataMappingManager.js', () => {
    describe('コアロジック確認', () => {
        it('GetMappingArray(1) の要素数が 0 より大きい', () => {
            expect(CSaveDataMappingManager.GetMappingArray(1).length).toBeGreaterThan(0);
        });
        it('GetMappingArray(54) が GetMappingArray(1) より長い（バージョン別追加分）', () => {
            expect(CSaveDataMappingManager.GetMappingArray(54).length).toBeGreaterThanOrEqual(
                CSaveDataMappingManager.GetMappingArray(1).length
            );
        });
    });
});
