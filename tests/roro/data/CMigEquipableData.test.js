import { describe, it, expect } from 'vitest';
// CGlobalConstManager を先にインポートして DefineEnum を確立する
import '../../../roro/m/js/CGlobalConstManager.js';
import { CMigEquipableData } from '../../../roro/m/js/data/CMigEquipableData.js';

describe('CMigEquipableData', () => {
    it('CMigEquipableData を export する', () => {
        expect(typeof CMigEquipableData).toBe('function');
    });

    it('window.CMigEquipableData が設定される', () => {
        expect(window.CMigEquipableData).toBe(CMigEquipableData);
    });
});
