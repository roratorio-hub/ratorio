import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfSanzi } from '@roro/CCharaConfSanzi.js';

describe('CCharaConfSanzi.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfSanzi が関数', () => { expect(typeof CCharaConfSanzi).toBe('function'); });
    });

    describe('CCharaConfSanzi インスタンス生成', () => {
        const inst = new CCharaConfSanzi(new Array(100).fill(0));

        it('confCountLimit が 100', () => { expect(inst.confCountLimit).toBe(100); });
        it('itemInRow が 3', () => { expect(inst.itemInRow).toBe(3); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "三次職支援設定"', () => { expect(inst.confLabel).toBe('三次職支援設定'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_GIANT_GLOTH が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_GIANT_GLOTH).toBe('number'); });
            it('CONF_ID_FIGHTING_SPIRIT が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_FIGHTING_SPIRIT).toBe('number'); });
            it('CONF_ID_PIETY が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_PIETY).toBe('number'); });
            it('CONF_ID_STRIKING が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_STRIKING).toBe('number'); });
            it('CONF_ID_STRIKINGYO_FUYOSKILL_LEVEL_GOKEI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_STRIKINGYO_FUYOSKILL_LEVEL_GOKEI).toBe('number'); });
            it('CONF_ID_EXPIATIO が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_EXPIATIO).toBe('number'); });
            it('CONF_ID_ODINNO_CHIKARA が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_ODINNO_CHIKARA).toBe('number'); });
            it('CONF_ID_EPICLESIS が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_EPICLESIS).toBe('number'); });
            it('CONF_ID_SECRAMENT が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_SECRAMENT).toBe('number'); });
            it('CONF_ID_LAUDAAGNUS が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_LAUDAAGNUS).toBe('number'); });
            it('CONF_ID_LAUDARAMUS が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_LAUDARAMUS).toBe('number'); });
            it('CONF_ID_ZYUTSUSHIKI_TENKAI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_ZYUTSUSHIKI_TENKAI).toBe('number'); });
            it('CONF_ID_BUNSHIN が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_BUNSHIN).toBe('number'); });
            it('CONF_ID_PAIN_KILLER が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_PAIN_KILLER).toBe('number'); });
            it('CONF_ID_PAIN_KILLER_BASE_LEVEL が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_PAIN_KILLER_BASE_LEVEL).toBe('number'); });
            it('CONF_ID_EBI_ZANMAI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_EBI_ZANMAI).toBe('number'); });
            it('CONF_ID_GROOMING が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_GROOMING).toBe('number'); });
            it('CONF_ID_EBI_PARTY が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_EBI_PARTY).toBe('number'); });
            it('CONF_ID_EBI_PARTY_TAMASHI_LEVEL が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_EBI_PARTY_TAMASHI_LEVEL).toBe('number'); });
            it('CONF_ID_CHATTERING が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_CHATTERING).toBe('number'); });
            it('CONF_ID_ARCLOUSE_DASH が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_ARCLOUSE_DASH).toBe('number'); });
            it('CONF_ID_KEIKAI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_KEIKAI).toBe('number'); });
            it('CONF_ID_UNLIMIT が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_UNLIMIT).toBe('number'); });
            it('CONF_ID_TAKANO_TAMASHI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_TAKANO_TAMASHI).toBe('number'); });
            it('CONF_ID_YOSENO_TAMASHI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_YOSENO_TAMASHI).toBe('number'); });
            it('CONF_ID_KAGENO_TAMASHI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_KAGENO_TAMASHI).toBe('number'); });
            it('CONF_ID_GOLEMNO_TAMASHI が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_GOLEMNO_TAMASHI).toBe('number'); });
            it('CONF_ID_FRIGGNO_UTA が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_FRIGGNO_UTA).toBe('number'); });
            it('CONF_ID_SYMPHONY_OF_LOVER が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_SYMPHONY_OF_LOVER).toBe('number'); });
            it('CONF_ID_LERADS_DEW が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_LERADS_DEW).toBe('number'); });
            it('CONF_ID_LESSON が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_LESSON).toBe('number'); });
            it('CONF_ID_SWING_DANCE が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_SWING_DANCE).toBe('number'); });
            it('CONF_ID_MOONLIT_SERENADE が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_MOONLIT_SERENADE).toBe('number'); });
            it('CONF_ID_RUSH_WINDMILL が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_RUSH_WINDMILL).toBe('number'); });
            it('CONF_ID_ECHOSONG が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_ECHOSONG).toBe('number'); });
            it('CONF_ID_DANCE_WITH_WUG が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_DANCE_WITH_WUG).toBe('number'); });
            it('CONF_ID_UNLIMITED_HUMMING_VOICE が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_UNLIMITED_HUMMING_VOICE).toBe('number'); });
            it('CONF_ID_DUMMY が数値', () => { expect(typeof CCharaConfSanzi.CONF_ID_DUMMY).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });
});
