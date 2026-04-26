import { describe, it, expect } from 'vitest';
import {
    OnClickBrowserMigrationSwitch,
    RefreshBrowserMigrationHeader,
    OnClickBrowserMigrationRadio,
    OnClickBrowserMigrationCheckLock,
    RefreshBrowserMigrationDisableStates,
    OnClickBrowserMigrationOutputAllData,
    OnClickBrowserMigrationCopyData,
    OnClickBrowserMigrationApplyData,
} from '../../roro/m/js/browsermigration.js';

describe('browsermigration', () => {
    it('全関数を export する', () => {
        expect(typeof OnClickBrowserMigrationSwitch).toBe('function');
        expect(typeof RefreshBrowserMigrationHeader).toBe('function');
        expect(typeof OnClickBrowserMigrationRadio).toBe('function');
        expect(typeof OnClickBrowserMigrationCheckLock).toBe('function');
        expect(typeof RefreshBrowserMigrationDisableStates).toBe('function');
        expect(typeof OnClickBrowserMigrationOutputAllData).toBe('function');
        expect(typeof OnClickBrowserMigrationCopyData).toBe('function');
        expect(typeof OnClickBrowserMigrationApplyData).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.OnClickBrowserMigrationSwitch).toBe(OnClickBrowserMigrationSwitch);
        expect(window.RefreshBrowserMigrationHeader).toBe(RefreshBrowserMigrationHeader);
        expect(window.OnClickBrowserMigrationRadio).toBe(OnClickBrowserMigrationRadio);
        expect(window.OnClickBrowserMigrationCheckLock).toBe(OnClickBrowserMigrationCheckLock);
        expect(window.RefreshBrowserMigrationDisableStates).toBe(RefreshBrowserMigrationDisableStates);
        expect(window.OnClickBrowserMigrationOutputAllData).toBe(OnClickBrowserMigrationOutputAllData);
        expect(window.OnClickBrowserMigrationCopyData).toBe(OnClickBrowserMigrationCopyData);
        expect(window.OnClickBrowserMigrationApplyData).toBe(OnClickBrowserMigrationApplyData);
    });
});
