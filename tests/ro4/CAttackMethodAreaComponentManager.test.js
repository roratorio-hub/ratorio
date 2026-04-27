import { describe, it, expect } from 'vitest';
import '../../roro/m/js/CGlobalConstManager.js';
import { CAttackMethodAreaComponentManager } from '../../ro4/m/js/CAttackMethodAreaComponentManager.js';

describe('CAttackMethodAreaComponentManager', () => {
    it('CAttackMethodAreaComponentManager を export する', () => {
        expect(typeof CAttackMethodAreaComponentManager).toBe('function');
    });

    it('window compat ブロックで window.CAttackMethodAreaComponentManager が設定される', () => {
        expect(window.CAttackMethodAreaComponentManager).toBe(CAttackMethodAreaComponentManager);
    });

    it('static メソッドが定義される', () => {
        expect(typeof CAttackMethodAreaComponentManager.RebuildControls).toBe('function');
        expect(typeof CAttackMethodAreaComponentManager.OnChangeAttackMethod).toBe('function');
        expect(typeof CAttackMethodAreaComponentManager.OnChangeAutoCalc).toBe('function');
    });
});
