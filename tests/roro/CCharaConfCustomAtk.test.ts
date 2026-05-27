import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfCustomAtk } from '@roro/CCharaConfCustomAtk.js';

(globalThis as any).CUSTOM_CONF_ATK_LIMIT = 30;

describe('CCharaConfCustomAtk.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfCustomAtk が関数', () => { expect(typeof CCharaConfCustomAtk).toBe('function'); });
    });

    describe('CCharaConfCustomAtk インスタンス生成', () => {
        const inst = new CCharaConfCustomAtk(new Array(30).fill(0));

        it('confCountLimit が 30', () => { expect(inst.confCountLimit).toBe(30); });
        it('itemInRow が 1', () => { expect(inst.itemInRow).toBe(1); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "性能カスタマイズ（攻撃関連）"', () => { expect(inst.confLabel).toBe('性能カスタマイズ（攻撃関連）'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_DISABLE_SETTINGS が数値', () => { expect(typeof CCharaConfCustomAtk.CONF_ID_DISABLE_SETTINGS).toBe('number'); });
            it('CONF_ID_WEAPON_ATK が数値', () => { expect(typeof CCharaConfCustomAtk.CONF_ID_WEAPON_ATK).toBe('number'); });
            it('CONF_ID_ATK_PLUS が数値', () => { expect(typeof CCharaConfCustomAtk.CONF_ID_ATK_PLUS).toBe('number'); });
            it('CONF_ID_PHYSICAL_DAMAGE_UP が数値', () => { expect(typeof CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP).toBe('number'); });
            it('CONF_ID_MATK_PLUS が数値', () => { expect(typeof CCharaConfCustomAtk.CONF_ID_MATK_PLUS).toBe('number'); });
            it('CONF_ID_BLANK が数値', () => { expect(typeof CCharaConfCustomAtk.CONF_ID_BLANK).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetConf が関数', () => { expect(typeof inst.GetConf).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });
});
