import { describe, it, expect, vi, beforeAll } from 'vitest';
import { CCustomSelectBase } from '../../roro/m/js/CCustomSelectBase.js';

describe('CCustomSelectBase', () => {
    it('CCustomSelectBase を export する', () => {
        expect(typeof CCustomSelectBase).toBe('function');
    });

    it('window compat ブロックで window.CCustomSelectBase が設定される', () => {
        expect(window.CCustomSelectBase).toBe(CCustomSelectBase);
    });

    it('静的メソッドが定義されている', () => {
        expect(typeof CCustomSelectBase.RegisterInstance).toBe('function');
        expect(typeof CCustomSelectBase.OnChangeSelectData).toBe('function');
        expect(typeof CCustomSelectBase.OnClickApplyButton).toBe('function');
        expect(typeof CCustomSelectBase.instanceMap).toBe('object');
    });

    it('OnClickApplyButton: select_id / select2_obj_class 宣言漏れの回帰確認', () => {
        const src = CCustomSelectBase.OnClickApplyButton.toString();
        expect(src).toContain('var select_id');
        expect(src).toContain('var select2_obj_class');
    });
});
