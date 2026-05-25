import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfDebuff } from '@roro/CCharaConfDebuff.js';

describe('CCharaConfDebuff.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfDebuff が関数', () => { expect(typeof CCharaConfDebuff).toBe('function'); });
    });

    describe('CCharaConfDebuff インスタンス生成', () => {
        const inst = new CCharaConfDebuff(new Array(50).fill(0));

        it('confCountLimit が 50', () => { expect(inst.confCountLimit).toBe(50); });
        it('itemInRow が 3', () => { expect(inst.itemInRow).toBe(3); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "プレイヤー状態異常設定"', () => { expect(inst.confLabel).toBe('プレイヤー状態異常設定'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（コンストラクタ実行後に設定）', () => {
            it('CONF_ID_QUAGMIRE が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_QUAGMIRE).toBe('number'); });
            it('CONF_ID_DECAGI が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_DECAGI).toBe('number'); });
            it('CONF_ID_POISON が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_POISON).toBe('number'); });
            it('CONF_ID_CURSE が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_CURSE).toBe('number'); });
            it('CONF_ID_SLOW_CAST が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_SLOW_CAST).toBe('number'); });
            it('CONF_ID_FREEZING が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_FREEZING).toBe('number'); });
            it('CONF_ID_POWDERING が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_POWDERING).toBe('number'); });
            it('CONF_ID_NYANGGRASS が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_NYANGGRASS).toBe('number'); });
            it('CONF_ID_DONTFORGETME が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_DONTFORGETME).toBe('number'); });
            it('CONF_ID_GLOOMYDAY が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_GLOOMYDAY).toBe('number'); });
            it('CONF_ID_SATURDAY_NIGHT_FEVER が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_SATURDAY_NIGHT_FEVER).toBe('number'); });
            it('CONF_ID_MELODYOFSINK が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_MELODYOFSINK).toBe('number'); });
            it('CONF_ID_BEYOND_OF_WARCRY が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_BEYOND_OF_WARCRY).toBe('number'); });
            it('CONF_ID_HARMONIZE が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_HARMONIZE).toBe('number'); });
            it('CONF_ID_DARKNESS が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_DARKNESS).toBe('number'); });
            it('CONF_ID_MANDRAGORA が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_MANDRAGORA).toBe('number'); });
            it('CONF_ID_LETHARGY が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_LETHARGY).toBe('number'); });
            it('CONF_ID_UNLUCKY が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_UNLUCKY).toBe('number'); });
            it('CONF_ID_ALL_STATUS_DOWN が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_ALL_STATUS_DOWN).toBe('number'); });
            it('CONF_ID_ETERNALCHAOS が数値', () => { expect(typeof CCharaConfDebuff.CONF_ID_ETERNALCHAOS).toBe('number'); });
        });

        describe('インスタンスメソッド（CConfBase継承）', () => {
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
            it('BuildUpSelectArea が関数', () => { expect(typeof inst.BuildUpSelectArea).toBe('function'); });
            it('SyncronizeSettingsVarToCtrl が関数', () => { expect(typeof inst.SyncronizeSettingsVarToCtrl).toBe('function'); });
            it('OnClickSwitch が関数', () => { expect(typeof inst.OnClickSwitch).toBe('function'); });
            it('OnChangeValue が関数', () => { expect(typeof inst.OnChangeValue).toBe('function'); });
        });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(5)).toBe('OBJID_CONTROL_CONF_5_HEADER');
            });
        });
    });
});
