import '../../roro/m/js/CGlobalConstManager.js';
import { describe, it, expect } from 'vitest';
import { CTargetData, CConfBase } from '../../roro/m/js/CConfBase.js';

describe('CConfBase', () => {
    it('CTargetData を function として export する', () => {
        expect(typeof CTargetData).toBe('function');
    });

    it('CConfBase を function として export する', () => {
        expect(typeof CConfBase).toBe('function');
    });

    it('window.CTargetData が compat ブロックで設定される', () => {
        expect(window.CTargetData).toBe(CTargetData);
    });

    it('window.CConfBase が compat ブロックで設定される', () => {
        expect(window.CConfBase).toBe(CConfBase);
    });

    it('CONTROL_TYPE_DUMMY が window に設定される', () => {
        expect(typeof window.CONTROL_TYPE_DUMMY).toBe('number');
    });
});
