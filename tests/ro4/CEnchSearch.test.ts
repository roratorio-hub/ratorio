import { describe, it, expect } from 'vitest';
import { enchSearch } from '@ro4/CEnchSearch.js';

describe('CEnchSearch.js', () => {
    describe('エクスポート確認', () => {
        it('enchSearch がエクスポートされている', () => {
            expect(enchSearch).toBeDefined();
            expect(typeof enchSearch).toBe('function');
        });

        it('主要インスタンスメソッドが存在する', () => {
            expect(typeof enchSearch.prototype.resetEnchSearch).toBe('function');
            expect(typeof enchSearch.prototype.runEnchSearch).toBe('function');
            expect(typeof enchSearch.prototype.createSelect).toBe('function');
            expect(typeof enchSearch.prototype.addEvents).toBe('function');
        });

        it('イベント登録系インスタンスメソッドが存在する', () => {
            expect(typeof enchSearch.prototype.armsTypeRightChange).toBe('function');
            expect(typeof enchSearch.prototype.armsTypeLeftChange).toBe('function');
            expect(typeof enchSearch.prototype.swapArmsChange).toBe('function');
            expect(typeof enchSearch.prototype.selectJobChange).toBe('function');
            expect(typeof enchSearch.prototype.loadSaveDataMigChange).toBe('function');
            expect(typeof enchSearch.prototype.urlInMigChange).toBe('function');
            expect(typeof enchSearch.prototype.quickControlExtractCheckboxChange).toBe('function');
        });
    });
});
