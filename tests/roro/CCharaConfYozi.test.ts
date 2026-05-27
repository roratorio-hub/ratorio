import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfYozi } from '@roro/CCharaConfYozi.js';

describe('CCharaConfYozi.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfYozi が関数', () => { expect(typeof CCharaConfYozi).toBe('function'); });
    });

    describe('CCharaConfYozi インスタンス生成', () => {
        const inst = new CCharaConfYozi(new Array(30).fill(0));

        it('confCountLimit が 30', () => { expect(inst.confCountLimit).toBe(30); });
        it('itemInRow が 2', () => { expect(inst.itemInRow).toBe(2); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "四次職支援設定"', () => { expect(inst.confLabel).toBe('四次職支援設定'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_ARUGUTUS_VITA が数値', () => { expect(typeof CCharaConfYozi.CONF_ID_ARUGUTUS_VITA).toBe('number'); });
            it('CONF_ID_ARUGUTUS_TERUM が数値', () => { expect(typeof CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM).toBe('number'); });
            it('CONF_ID_MUSICAL_PARTNER が数値', () => { expect(typeof CCharaConfYozi.CONF_ID_MUSICAL_PARTNER).toBe('number'); });
            it('CONF_ID_ZEPHYR_LINK が数値', () => { expect(typeof CCharaConfYozi.CONF_ID_ZEPHYR_LINK).toBe('number'); });
            it('CONF_ID_AERO_SYNC が数値', () => { expect(typeof CCharaConfYozi.CONF_ID_AERO_SYNC).toBe('number'); });
            it('CONF_ID_DUMMY が数値', () => { expect(typeof CCharaConfYozi.CONF_ID_DUMMY).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
            it('BuildUpSelectArea が関数', () => { expect(typeof inst.BuildUpSelectArea).toBe('function'); });
        });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(6)).toBe('OBJID_CONTROL_CONF_6_HEADER');
            });
        });
    });
});
