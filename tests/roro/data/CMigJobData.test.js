import { describe, it, expect } from 'vitest';
// CGlobalConstManager を先にインポートして DefineEnum を確立する
import '../../../roro/m/js/CGlobalConstManager.js';
import { CMigJobData } from '../../../roro/m/js/data/CMigJobData.js';

describe('CMigJobData', () => {
    it('CMigJobData を export する', () => {
        expect(typeof CMigJobData).toBe('function');
    });

    it('window.CMigJobData が設定される', () => {
        expect(window.CMigJobData).toBe(CMigJobData);
    });
});
