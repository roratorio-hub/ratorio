import { describe, it, expect } from 'vitest';
import { CMigConstDataManagerSubBase } from '../../../roro/m/js/data/CMigConstDataManagerSubBase.js';

describe('CMigConstDataManagerSubBase', () => {
    it('CMigConstDataManagerSubBase を export する', () => {
        expect(typeof CMigConstDataManagerSubBase).toBe('function');
    });

    it('window.CMigConstDataManagerSubBase が設定される', () => {
        expect(window.CMigConstDataManagerSubBase).toBe(CMigConstDataManagerSubBase);
    });

    it('インスタンスメソッドが定義されている', () => {
        const inst = new CMigConstDataManagerSubBase();
        expect(typeof inst.GetDataObject).toBe('function');
        expect(typeof inst.GetIdByName).toBe('function');
        expect(typeof inst.GetRefId).toBe('function');
        expect(typeof inst.GetOfficialId).toBe('function');
        expect(typeof inst.GetName).toBe('function');
        expect(typeof inst.GetFullyName).toBe('function');
        expect(typeof inst.GetKana).toBe('function');
        expect(typeof inst.EnumId).toBe('function');
    });
});
