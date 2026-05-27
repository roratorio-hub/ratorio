import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfNizi } from '@roro/CCharaConfNizi.js';

describe('CCharaConfNizi.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfNizi が関数', () => { expect(typeof CCharaConfNizi).toBe('function'); });
    });

    describe('CCharaConfNizi インスタンス生成', () => {
        const inst = new CCharaConfNizi(new Array(50).fill(0));

        it('confCountLimit が 50', () => { expect(inst.confCountLimit).toBe(50); });
        it('itemInRow が 3', () => { expect(inst.itemInRow).toBe(3); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "二次職支援設定"', () => { expect(inst.confLabel).toBe('二次職支援設定'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_ZOKUSEIBA_SHURUI_VOLCANO が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VOLCANO).toBe('number'); });
            it('CONF_ID_ZOKUSEIBA_SHURUI_DELUGE が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_DELUGE).toBe('number'); });
            it('CONF_ID_ZOKUSEIBA_SHURUI_VIOLENT_GALE が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VIOLENT_GALE).toBe('number'); });
            it('CONF_ID_ZOKUSEIBA_SHURUI が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI).toBe('number'); });
            it('CONF_ID_ZOKUSEIBA_LEVEL が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL).toBe('number'); });
            it('CONF_ID_SHIEN_MIND_BREAKER が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER).toBe('number'); });
            it('CONF_ID_SEITAI_KOFUKU が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_SEITAI_KOFUKU).toBe('number'); });
            it('CONF_ID_KAITO が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_KAITO).toBe('number'); });
            it('CONF_ID_IMPOSITIO_MANUS が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS).toBe('number'); });
            it('CONF_ID_SUFFRAGIUM が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_SUFFRAGIUM).toBe('number'); });
            it('CONF_ID_GLORIA が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_GLORIA).toBe('number'); });
            it('CONF_ID_ASSUMPTIO が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ASSUMPTIO).toBe('number'); });
            it('CONF_ID_ADRENALINE_RUSH が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ADRENALINE_RUSH).toBe('number'); });
            it('CONF_ID_WEAPON_PERFECTION が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_WEAPON_PERFECTION).toBe('number'); });
            it('CONF_ID_OVER_TRUST が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_OVER_TRUST).toBe('number'); });
            it('CONF_ID_WIND_WALK が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_WIND_WALK).toBe('number'); });
            it('CONF_ID_KIKO が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_KIKO).toBe('number'); });
            it('CONF_ID_PROVIDENCE が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_PROVIDENCE).toBe('number'); });
            it('CONF_ID_CONCENTRATION が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_CONCENTRATION).toBe('number'); });
            it('CONF_ID_TRUE_SIGHT が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_TRUE_SIGHT).toBe('number'); });
            it('CONF_ID_MAHORYOKU_ZOFUKU が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU).toBe('number'); });
            it('CONF_ID_DEFENDER が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_DEFENDER).toBe('number'); });
            it('CONF_ID_AUTO_GUARD が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_AUTO_GUARD).toBe('number'); });
            it('CONF_ID_CLOSE_CONFINE が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_CLOSE_CONFINE).toBe('number'); });
            it('CONF_ID_AURA_BLADE が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_AURA_BLADE).toBe('number'); });
            it('CONF_ID_KONGO が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_KONGO).toBe('number'); });
            it('CONF_ID_MAXIMIZE_POWER が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_MAXIMIZE_POWER).toBe('number'); });
            it('CONF_ID_FORTUNEKISS が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_FORTUNEKISS).toBe('number'); });
            it('CONF_ID_HUMMING が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_HUMMING).toBe('number'); });
            it('CONF_ID_SERVICEFORYOU が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_SERVICEFORYOU).toBe('number'); });
            it('CONF_ID_WHISTLE が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_WHISTLE).toBe('number'); });
            it('CONF_ID_ASSASSINCROSS が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_ASSASSINCROSS).toBe('number'); });
            it('CONF_ID_POEMBRAGI が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_POEMBRAGI).toBe('number'); });
            it('CONF_ID_APPLEIDUN が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_APPLEIDUN).toBe('number'); });
            it('CONF_ID_SIEGFRIED が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_SIEGFRIED).toBe('number'); });
            it('CONF_ID_DRUMBATTLEFIELD が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_DRUMBATTLEFIELD).toBe('number'); });
            it('CONF_ID_DUMMY が数値', () => { expect(typeof CCharaConfNizi.CONF_ID_DUMMY).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
        });
    });
});
