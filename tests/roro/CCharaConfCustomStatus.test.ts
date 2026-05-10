import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfCustomStatus } from '@roro/CCharaConfCustomStatus.js';

(globalThis as any).CUSTOM_CONF_STATUS_LIMIT = 30;

describe('CCharaConfCustomStatus.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfCustomStatus が関数', () => { expect(typeof CCharaConfCustomStatus).toBe('function'); });
    });

    describe('CCharaConfCustomStatus インスタンス生成', () => {
        const inst = new CCharaConfCustomStatus(new Array(30).fill(0));

        it('confCountLimit が 30', () => { expect(inst.confCountLimit).toBe(30); });
        it('itemInRow が 1', () => { expect(inst.itemInRow).toBe(1); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "性能カスタマイズ（ステータス関連）"', () => { expect(inst.confLabel).toBe('性能カスタマイズ（ステータス関連）'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_DISABLE_SETTINGS が数値', () => { expect(typeof CCharaConfCustomStatus.CONF_ID_DISABLE_SETTINGS).toBe('number'); });
            it('CONF_ID_MAXHP_UP が数値', () => { expect(typeof CCharaConfCustomStatus.CONF_ID_MAXHP_UP).toBe('number'); });
            it('CONF_ID_STR_PLUS が数値', () => { expect(typeof CCharaConfCustomStatus.CONF_ID_STR_PLUS).toBe('number'); });
            it('CONF_ID_HIT_PLUS が数値', () => { expect(typeof CCharaConfCustomStatus.CONF_ID_HIT_PLUS).toBe('number'); });
            it('CONF_ID_ASPD_UP が数値', () => { expect(typeof CCharaConfCustomStatus.CONF_ID_ASPD_UP).toBe('number'); });
            it('CONF_ID_BLANK が数値', () => { expect(typeof CCharaConfCustomStatus.CONF_ID_BLANK).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetConf が関数', () => { expect(typeof inst.GetConf).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });

    describe('window互換確認', () => {
        it('window.CCharaConfCustomStatus が設定されている', () => {
            expect((window as any).CCharaConfCustomStatus).toBe(CCharaConfCustomStatus);
        });
    });
});
