import { describe, it, expect } from 'vitest';
import { CMigEquipableSpTag } from '../../../roro/m/js/data/CMigEquipableSpTag.js';

describe('CMigEquipableSpTag', () => {
    it('CMigEquipableSpTag を export する', () => {
        expect(typeof CMigEquipableSpTag).toBe('function');
    });

    it('window.CMigEquipableSpTag が設定される', () => {
        expect(window.CMigEquipableSpTag).toBe(CMigEquipableSpTag);
    });

    it('インスタンスを生成できる', () => {
        const inst = new CMigEquipableSpTag();
        expect(typeof inst.GetSpId).toBe('function');
        expect(typeof inst.SetSpId).toBe('function');
        expect(typeof inst.GetAttribute).toBe('function');
        expect(typeof inst.SetAttribute).toBe('function');
        expect(typeof inst.Clone).toBe('function');
        expect(typeof inst.ToArrayData).toBe('function');
    });
});
