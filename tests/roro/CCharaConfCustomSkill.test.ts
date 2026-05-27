import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfCustomSkill } from '@roro/CCharaConfCustomSkill.js';

(globalThis as any).CUSTOM_CONF_SKILL_LIMIT = 20;

describe('CCharaConfCustomSkill.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfCustomSkill が関数', () => { expect(typeof CCharaConfCustomSkill).toBe('function'); });
    });

    describe('CCharaConfCustomSkill インスタンス生成', () => {
        const inst = new CCharaConfCustomSkill(new Array(20).fill(0));

        it('confCountLimit が 20', () => { expect(inst.confCountLimit).toBe(20); });
        it('itemInRow が 1', () => { expect(inst.itemInRow).toBe(1); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "性能カスタマイズ（スキル関連）"', () => { expect(inst.confLabel).toBe('性能カスタマイズ（スキル関連）'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_DISABLE_SETTINGS が数値', () => { expect(typeof CCharaConfCustomSkill.CONF_ID_DISABLE_SETTINGS).toBe('number'); });
            it('CONF_ID_SKILL_DAMAGE_UP が数値', () => { expect(typeof CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP).toBe('number'); });
            it('CONF_ID_HEAL_UP_USING が数値', () => { expect(typeof CCharaConfCustomSkill.CONF_ID_HEAL_UP_USING).toBe('number'); });
            it('CONF_ID_SKILL_CAST_DOWN が数値', () => { expect(typeof CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN).toBe('number'); });
            it('CONF_ID_SKILL_COOL_MINUS が数値', () => { expect(typeof CCharaConfCustomSkill.CONF_ID_SKILL_COOL_MINUS).toBe('number'); });
            it('CONF_ID_BLANK が数値', () => { expect(typeof CCharaConfCustomSkill.CONF_ID_BLANK).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetConf が関数', () => { expect(typeof inst.GetConf).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });

    describe('window互換確認', () => {
        it('window.CCharaConfCustomSkill が設定されている', () => {
            expect((window as any).CCharaConfCustomSkill).toBe(CCharaConfCustomSkill);
        });
    });
});
