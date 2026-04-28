import { describe, it, expect } from 'vitest';
import { CMigEquipableStaticData } from '../../../roro/m/js/data/CMigEquipableStaticData.js';

describe('CMigEquipableStaticData', () => {
    it('CMigEquipableStaticData を export する', () => {
        expect(typeof CMigEquipableStaticData).toBe('function');
    });

    it('window.CMigEquipableStaticData が設定される', () => {
        expect(window.CMigEquipableStaticData).toBe(CMigEquipableStaticData);
    });

    it('インスタンスを生成できる', () => {
        const inst = new CMigEquipableStaticData();
        expect(typeof inst.GetAttribute).toBe('function');
    });
});
