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
} from '@ro4/saveload.js';

describe('saveload.js', () => {
    describe('エクスポート確認', () => {
        it('OnClickSaveSaveData が関数', () => {
            expect(typeof OnClickSaveSaveData).toBe('function');
        });
        it('OnClickClipboardSaveData が関数', () => {
            expect(typeof OnClickClipboardSaveData).toBe('function');
        });
        it('OnClickLoadSaveData が関数', () => {
            expect(typeof OnClickLoadSaveData).toBe('function');
        });
        it('OnClickDeleteSaveData が関数', () => {
            expect(typeof OnClickDeleteSaveData).toBe('function');
        });
        it('OnClickUrlOutMIG が関数', () => {
            expect(typeof OnClickUrlOutMIG).toBe('function');
        });
        it('OnClickUrlInMIG が関数', () => {
            expect(typeof OnClickUrlInMIG).toBe('function');
        });
        it('ConvertDataTextMIG が関数', () => {
            expect(typeof ConvertDataTextMIG).toBe('function');
        });
        it('AdaptSaveDataStrSizeMIG が関数', () => {
            expect(typeof AdaptSaveDataStrSizeMIG).toBe('function');
        });
        it('SaveDataChangeMIG が関数', () => {
            expect(typeof SaveDataChangeMIG).toBe('function');
        });
        it('OnClickConfirmDialogSwitch が関数', () => {
            expect(typeof OnClickConfirmDialogSwitch).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.OnClickSaveSaveData が設定されている', () => {
            expect((window as any).OnClickSaveSaveData).toBe(OnClickSaveSaveData);
        });
        it('window.ConvertDataTextMIG が設定されている', () => {
            expect((window as any).ConvertDataTextMIG).toBe(ConvertDataTextMIG);
        });
        it('window.AdaptSaveDataStrSizeMIG が設定されている', () => {
            expect((window as any).AdaptSaveDataStrSizeMIG).toBe(AdaptSaveDataStrSizeMIG);
        });
        it('window.SaveDataChangeMIG が設定されている', () => {
            expect((window as any).SaveDataChangeMIG).toBe(SaveDataChangeMIG);
        });
        it('window.OnClickConfirmDialogSwitch が設定されている', () => {
            expect((window as any).OnClickConfirmDialogSwitch).toBe(OnClickConfirmDialogSwitch);
        });
    });
});
