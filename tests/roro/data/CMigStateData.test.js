import { describe, it, expect } from 'vitest';
// CGlobalConstManager を先にインポートして DefineEnum を確立する
import '../../../roro/m/js/CGlobalConstManager.js';
import { CMigStateData } from '../../../roro/m/js/data/CMigStateData.js';

describe('CMigStateData', () => {
    it('CMigStateData を export する', () => {
        expect(typeof CMigStateData).toBe('function');
    });

    it('window.CMigStateData が設定される', () => {
        expect(window.CMigStateData).toBe(CMigStateData);
    });
});
