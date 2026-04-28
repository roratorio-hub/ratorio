import { describe, it, expect } from 'vitest';
import '../../../roro/common/js/util.js';
import '../../../roro/m/js/CSaveDataConverter.js';
import '../../../ro4/m/js/savedata/SKeyMap.js';
import '../../../ro4/m/js/savedata/CSingletonMapper.js';
import '../../../ro4/m/js/savedata/CMultiValueMapper.js';
import '../../../ro4/m/js/savedata/CSaveDataConst.js';
import '../../../ro4/m/js/savedata/CSaveDataPropInfo.js';
import { CSaveDataUnitBase } from '../../../ro4/m/js/savedata/CSaveDataUnitBase.js';
import { CSaveDataUnitParse } from '../../../ro4/m/js/savedata/CSaveDataUnitParse.js';

describe('ro4/m/js/savedata/CSaveDataUnitParse.js', () => {
    it('CSaveDataUnitParse を export する', () => {
        expect(typeof CSaveDataUnitParse).toBe('function');
    });

    it('window compat ブロックが設定される', () => {
        expect(window.CSaveDataUnitParse).toBe(CSaveDataUnitParse);
    });

    it('CSaveDataUnitBase を継承する', () => {
        const unit = new CSaveDataUnitParse();
        expect(unit instanceof CSaveDataUnitBase).toBe(true);
    });

    it('saveDataUnitArray が初期状態で空配列', () => {
        const unit = new CSaveDataUnitParse();
        expect(Array.isArray(unit.saveDataUnitArray)).toBe(true);
        expect(unit.saveDataUnitArray.length).toBe(0);
    });
});
