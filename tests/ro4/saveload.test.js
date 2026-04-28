import { describe, it, expect } from 'vitest';
import {
    OnClickSaveSaveData,
    OnClickClipboardSaveData,
    OnClickLoadSaveData,
    OnClickDeleteSaveData,
    OnClickUrlOutMIG,
    OnClickUrlInMIG,
    ConvertDataTextMIG,
    AdaptSaveDataStrSizeMIG,
    SaveDataChangeMIG,
    OnClickConfirmDialogSwitch,
} from '../../ro4/m/js/saveload.js';

describe('ro4/m/js/saveload.js', () => {
    it('全関数を export する', () => {
        expect(typeof OnClickSaveSaveData).toBe('function');
        expect(typeof OnClickClipboardSaveData).toBe('function');
        expect(typeof OnClickLoadSaveData).toBe('function');
        expect(typeof OnClickDeleteSaveData).toBe('function');
        expect(typeof OnClickUrlOutMIG).toBe('function');
        expect(typeof OnClickUrlInMIG).toBe('function');
        expect(typeof ConvertDataTextMIG).toBe('function');
        expect(typeof AdaptSaveDataStrSizeMIG).toBe('function');
        expect(typeof SaveDataChangeMIG).toBe('function');
        expect(typeof OnClickConfirmDialogSwitch).toBe('function');
    });

    it('window compat ブロックが設定される', () => {
        expect(window.OnClickSaveSaveData).toBe(OnClickSaveSaveData);
        expect(window.OnClickClipboardSaveData).toBe(OnClickClipboardSaveData);
        expect(window.OnClickLoadSaveData).toBe(OnClickLoadSaveData);
        expect(window.OnClickDeleteSaveData).toBe(OnClickDeleteSaveData);
        expect(window.OnClickUrlOutMIG).toBe(OnClickUrlOutMIG);
        expect(window.OnClickUrlInMIG).toBe(OnClickUrlInMIG);
        expect(window.ConvertDataTextMIG).toBe(ConvertDataTextMIG);
        expect(window.AdaptSaveDataStrSizeMIG).toBe(AdaptSaveDataStrSizeMIG);
        expect(window.SaveDataChangeMIG).toBe(SaveDataChangeMIG);
        expect(window.OnClickConfirmDialogSwitch).toBe(OnClickConfirmDialogSwitch);
    });

    it('ConvertDataTextMIG: saveDataMappingArrayCurrent 宣言漏れの回帰確認', () => {
        expect(ConvertDataTextMIG.toString()).toContain('saveDataMappingArrayCurrent');
    });

    it('SaveDataChangeMIG: 圧縮された数値を展開する', () => {
        expect(SaveDataChangeMIG('3')).toBe('aaa');
        expect(SaveDataChangeMIG('a2b')).toBe('aaab');
        expect(SaveDataChangeMIG('abc')).toBe('abc');
        expect(SaveDataChangeMIG('2a2')).toBe('aaaaa');
    });
});
