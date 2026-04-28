import { describe, it, expect } from 'vitest';
// CSaveDataUnitBase の依存グローバルを確立する
import '../../../roro/common/js/util.js';
import '../../../roro/m/js/CSaveDataConverter.js';
import '../../../ro4/m/js/savedata/SKeyMap.js';
import '../../../ro4/m/js/savedata/CSingletonMapper.js';
import '../../../ro4/m/js/savedata/CMultiValueMapper.js';
import '../../../ro4/m/js/savedata/CSaveDataConst.js';
import '../../../ro4/m/js/savedata/CSaveDataPropInfo.js';
import { CSaveDataUnitBase } from '../../../ro4/m/js/savedata/CSaveDataUnitBase.js';

describe('ro4/m/js/savedata/CSaveDataUnitBase.js', () => {
    it('CSaveDataUnitBase を export する', () => {
        expect(typeof CSaveDataUnitBase).toBe('function');
    });

    it('window compat ブロックが設定される', () => {
        expect(window.CSaveDataUnitBase).toBe(CSaveDataUnitBase);
    });

    it('isEmptyUnit はデフォルトで true を返す', () => {
        const unit = new CSaveDataUnitBase();
        expect(unit.isEmptyUnit()).toBe(true);
    });

    it('letterBits は正の整数', () => {
        const unit = new CSaveDataUnitBase();
        expect(unit.letterBits).toBeGreaterThan(0);
    });

    it('clear 後に parsedMap がリセットされる', () => {
        const unit = new CSaveDataUnitBase();
        unit.clear();
        expect(unit.parsedMap).toBeTruthy();
    });
});
