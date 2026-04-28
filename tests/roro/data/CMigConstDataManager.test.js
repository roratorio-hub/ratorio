import { describe, it, expect } from 'vitest';
// CONST_DATA_KIND_* を確立する
import '../../../roro/m/js/common.js';
// Sub* が参照するデータオブジェクトクラスを window に設定する
import '../../../roro/m/js/data/CMigJobData.js';
import '../../../roro/m/js/data/CMigStateData.js';
import '../../../roro/m/js/data/CMigEquipableData.js';
// Sub* クラスを window に設定する
import '../../../roro/m/js/data/CMigConstDataManagerSubJob.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubState.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubBuff.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubMonster.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubArrow.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubItem.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubCard.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubEnchList.js';
import '../../../roro/m/js/data/CMigConstDataManagerSubRndOpt.js';
import { CMigConstDataManager } from '../../../roro/m/js/data/CMigConstDataManager.js';

describe('CMigConstDataManager', () => {
    it('CMigConstDataManager を export する', () => {
        expect(typeof CMigConstDataManager).toBe('function');
    });

    it('window.CMigConstDataManager が設定される', () => {
        expect(window.CMigConstDataManager).toBe(CMigConstDataManager);
    });

    it('インスタンスメソッドが定義されている', () => {
        const inst = new CMigConstDataManager();
        expect(typeof inst.GetDataManger).toBe('function');
        expect(typeof inst.GetDataObject).toBe('function');
        expect(typeof inst.GetIdByName).toBe('function');
        expect(typeof inst.GetIdByNameSlotted).toBe('function');
        expect(typeof inst.GetRefId).toBe('function');
        expect(typeof inst.GetOfficialId).toBe('function');
        expect(typeof inst.GetName).toBe('function');
        expect(typeof inst.GetFullyName).toBe('function');
        expect(typeof inst.GetKana).toBe('function');
    });
});
