import { describe, it, expect } from 'vitest';
import '../../../roro/common/js/util.js';
import '../../../roro/m/js/CSaveDataConverter.js';
import '../../../ro4/m/js/savedata/SKeyMap.js';
import '../../../ro4/m/js/savedata/CSingletonMapper.js';
import '../../../ro4/m/js/savedata/CMultiValueMapper.js';
import '../../../ro4/m/js/savedata/CSaveDataConst.js';
import '../../../ro4/m/js/savedata/CSaveDataPropInfo.js';
import { CSaveDataUnitBase } from '../../../ro4/m/js/savedata/CSaveDataUnitBase.js';
import { CSaveDataUnitVersion } from '../../../ro4/m/js/savedata/CSaveDataUnitVersion.js';

describe('ro4/m/js/savedata/CSaveDataUnitVersion.js', () => {
    it('CSaveDataUnitVersion を export する', () => {
        expect(typeof CSaveDataUnitVersion).toBe('function');
    });

    it('window compat ブロックが設定される', () => {
        expect(window.CSaveDataUnitVersion).toBe(CSaveDataUnitVersion);
    });

    it('CSaveDataUnitBase を継承する', () => {
        const unit = new CSaveDataUnitVersion();
        expect(unit instanceof CSaveDataUnitBase).toBe(true);
    });

    it('type が 801', () => {
        expect(CSaveDataUnitVersion.type).toBe(801);
    });

    it('isEmptyUnit は false を返す（常に存在）', () => {
        const unit = new CSaveDataUnitVersion();
        expect(unit.isEmptyUnit()).toBe(false);
    });
});
