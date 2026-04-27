import { describe, it, expect } from 'vitest';
import { CCalcDataTextCreator } from '../../roro/m/js/CCalcDataTextCreator.js';

describe('CCalcDataTextCreator', () => {
    it('CCalcDataTextCreator を export する', () => {
        expect(typeof CCalcDataTextCreator).toBe('function');
    });

    it('window compat ブロックで window.CCalcDataTextCreator が設定される', () => {
        expect(window.CCalcDataTextCreator).toBe(CCalcDataTextCreator);
    });

    it('static メソッドが定義される', () => {
        expect(typeof CCalcDataTextCreator.SetCalcDataTextObjectValue).toBe('function');
        expect(typeof CCalcDataTextCreator.CreateCalcDataText).toBe('function');
        expect(typeof CCalcDataTextCreator.GetDataText).toBe('function');
    });
});
