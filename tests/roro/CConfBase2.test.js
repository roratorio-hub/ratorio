import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/CConfBase.js';
import { describe, it, expect } from 'vitest';
import {
    CConfBaseSelectData,
    CConfBaseConfData,
    CConfBaseRegisterParam,
    CConfBaseManagementParam,
    CConfBase2,
} from '../../roro/m/js/CConfBase2.js';

describe('CConfBase2', () => {
    it('全クラスを function として export する', () => {
        expect(typeof CConfBaseSelectData).toBe('function');
        expect(typeof CConfBaseConfData).toBe('function');
        expect(typeof CConfBaseRegisterParam).toBe('function');
        expect(typeof CConfBaseManagementParam).toBe('function');
        expect(typeof CConfBase2).toBe('function');
    });

    it('window compat ブロックで全クラスが window に設定される', () => {
        expect(window.CConfBaseSelectData).toBe(CConfBaseSelectData);
        expect(window.CConfBaseConfData).toBe(CConfBaseConfData);
        expect(window.CConfBaseRegisterParam).toBe(CConfBaseRegisterParam);
        expect(window.CConfBaseManagementParam).toBe(CConfBaseManagementParam);
        expect(window.CConfBase2).toBe(CConfBase2);
    });

    it('CConfBaseSelectData はメソッドチェーンをサポートする', () => {
        const obj = new CConfBaseSelectData();
        expect(typeof obj.SetText).toBe('function');
        expect(typeof obj.SetValue).toBe('function');
        const result = obj.SetText('test').SetValue(42);
        expect(result).toBe(obj);
    });

    it('CConfBaseManagementParam はデータ配列を持つ', () => {
        const obj = new CConfBaseManagementParam();
        expect(Array.isArray(obj.confDataArray)).toBe(true);
    });
});
