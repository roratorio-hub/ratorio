import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfCustomSpecStatus } from '@roro/CCharaConfCustomSpecStatus.js';

// global.js の window 互換ブロックが設定する定数（MallocArray 依存のため global.js は直接 import 不可）
(globalThis as any).CUSTOM_CONF_SPEC_LIMIT = 20;

describe('CCharaConfCustomSpecStatus.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfCustomSpecStatus が関数', () => { expect(typeof CCharaConfCustomSpecStatus).toBe('function'); });
    });

    describe('CCharaConfCustomSpecStatus インスタンス生成', () => {
        const inst = new CCharaConfCustomSpecStatus(new Array(20).fill(0));

        it('confCountLimit が 20', () => { expect(inst.confCountLimit).toBe(20); });
        it('itemInRow が 1', () => { expect(inst.itemInRow).toBe(1); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "性能カスタマイズ（特性ステータス関連）"', () => { expect(inst.confLabel).toBe('性能カスタマイズ（特性ステータス関連）'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_DISABLE_SETTINGS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_DISABLE_SETTINGS).toBe('number'); });
            it('CONF_ID_POW_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_POW_PLUS).toBe('number'); });
            it('CONF_ID_STA_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_STA_PLUS).toBe('number'); });
            it('CONF_ID_WIS_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_WIS_PLUS).toBe('number'); });
            it('CONF_ID_SPL_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_SPL_PLUS).toBe('number'); });
            it('CONF_ID_CON_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_CON_PLUS).toBe('number'); });
            it('CONF_ID_CRT_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_CRT_PLUS).toBe('number'); });
            it('CONF_ID_P_ATK_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_P_ATK_PLUS).toBe('number'); });
            it('CONF_ID_S_MATK_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_S_MATK_PLUS).toBe('number'); });
            it('CONF_ID_H_PLUS_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_H_PLUS_PLUS).toBe('number'); });
            it('CONF_ID_C_RATE_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_C_RATE_PLUS).toBe('number'); });
            it('CONF_ID_RES_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_RES_PLUS).toBe('number'); });
            it('CONF_ID_MRES_PLUS が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_MRES_PLUS).toBe('number'); });
            it('CONF_ID_BLANK が数値', () => { expect(typeof CCharaConfCustomSpecStatus.CONF_ID_BLANK).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetConf が関数', () => { expect(typeof inst.GetConf).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });

    describe('window互換確認', () => {
        it('window.CCharaConfCustomSpecStatus が設定されている', () => {
            expect((window as any).CCharaConfCustomSpecStatus).toBe(CCharaConfCustomSpecStatus);
        });
    });
});
