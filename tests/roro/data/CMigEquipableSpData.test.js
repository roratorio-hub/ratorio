import { describe, it, expect, beforeAll } from 'vitest';
import { CMigEquipableSpTag } from '../../../roro/m/js/data/CMigEquipableSpTag.js';
import {
    CMigEquipableSpDataAttributeMatchingCore,
    CMigEquipableSpDataAttributeMatcher,
    CMigEquipableSpData,
} from '../../../roro/m/js/data/CMigEquipableSpData.js';

describe('CMigEquipableSpData', () => {
    beforeAll(() => {
        // mig.itemsp.h.js (non-ESM) の定数をテスト用にスタブする
        window.MIG_VALUE_UNIT_ID_NONE = 0;
    });

    it('CMigEquipableSpDataAttributeMatchingCore を export する', () => {
        expect(typeof CMigEquipableSpDataAttributeMatchingCore).toBe('function');
    });

    it('CMigEquipableSpDataAttributeMatcher を export する', () => {
        expect(typeof CMigEquipableSpDataAttributeMatcher).toBe('function');
    });

    it('CMigEquipableSpData を export する', () => {
        expect(typeof CMigEquipableSpData).toBe('function');
    });

    it('window compat ブロックが設定される', () => {
        expect(window.CMigEquipableSpDataAttributeMatchingCore).toBe(CMigEquipableSpDataAttributeMatchingCore);
        expect(window.CMigEquipableSpDataAttributeMatcher).toBe(CMigEquipableSpDataAttributeMatcher);
        expect(window.CMigEquipableSpData).toBe(CMigEquipableSpData);
    });

    it('CMigEquipableSpData インスタンスを生成できる', () => {
        const inst = new CMigEquipableSpData();
        expect(typeof inst.GetSpId).toBe('function');
        expect(typeof inst.SetValue).toBe('function');
        expect(typeof inst.GetValue).toBe('function');
        expect(typeof inst.AddChild).toBe('function');
        expect(typeof inst.GetChildren).toBe('function');
        expect(typeof inst.Clone).toBe('function');
        expect(typeof inst.ToArrayData).toBe('function');
        expect(typeof inst.HasAttribute).toBe('function');
    });
});
