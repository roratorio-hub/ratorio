import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfCustomDef } from '@roro/CCharaConfCustomDef.js';

(globalThis as any).CUSTOM_CONF_DEF_LIMIT = 20;

describe('CCharaConfCustomDef.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfCustomDef が関数', () => { expect(typeof CCharaConfCustomDef).toBe('function'); });
    });

    describe('CCharaConfCustomDef インスタンス生成', () => {
        const inst = new CCharaConfCustomDef(new Array(20).fill(0));

        it('confCountLimit が 20', () => { expect(inst.confCountLimit).toBe(20); });
        it('itemInRow が 1', () => { expect(inst.itemInRow).toBe(1); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "性能カスタマイズ（防御関連）"', () => { expect(inst.confLabel).toBe('性能カスタマイズ（防御関連）'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_DISABLE_SETTINGS が数値', () => { expect(typeof CCharaConfCustomDef.CONF_ID_DISABLE_SETTINGS).toBe('number'); });
            it('CONF_ID_DEF_PLUS が数値', () => { expect(typeof CCharaConfCustomDef.CONF_ID_DEF_PLUS).toBe('number'); });
            it('CONF_ID_MDEF_PLUS が数値', () => { expect(typeof CCharaConfCustomDef.CONF_ID_MDEF_PLUS).toBe('number'); });
            it('CONF_ID_RESIST_RACE が数値', () => { expect(typeof CCharaConfCustomDef.CONF_ID_RESIST_RACE).toBe('number'); });
            it('CONF_ID_RESIST_BOSS が数値', () => { expect(typeof CCharaConfCustomDef.CONF_ID_RESIST_BOSS).toBe('number'); });
            it('CONF_ID_BLANK が数値', () => { expect(typeof CCharaConfCustomDef.CONF_ID_BLANK).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetConf が関数', () => { expect(typeof inst.GetConf).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });

    describe('window互換確認', () => {
        it('window.CCharaConfCustomDef が設定されている', () => {
            expect((window as any).CCharaConfCustomDef).toBe(CCharaConfCustomDef);
        });
    });
});
