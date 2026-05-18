import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import { CCharaConfIchizi } from '@roro/CCharaConfIchizi.js';

describe('CCharaConfIchizi.js', () => {
    describe('エクスポート確認', () => {
        it('CCharaConfIchizi が関数', () => { expect(typeof CCharaConfIchizi).toBe('function'); });
    });

    describe('CCharaConfIchizi インスタンス生成', () => {
        const inst = new CCharaConfIchizi(new Array(50).fill(0));

        it('confCountLimit が 50', () => { expect(inst.confCountLimit).toBe(50); });
        it('itemInRow が 2', () => { expect(inst.itemInRow).toBe(2); });
        it('instanceNo が -1', () => { expect(inst.instanceNo).toBe(-1); });
        it('confLabel が "一次職支援設定"', () => { expect(inst.confLabel).toBe('一次職支援設定'); });
        it('confDataObj が配列', () => { expect(Array.isArray(inst.confDataObj)).toBe(true); });

        describe('静的プロパティ（InitData 実行後に設定）', () => {
            it('CONF_ID_BLESSING が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_BLESSING).toBe('number'); });
            it('CONF_ID_SOKUDO_ZOKA が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_SOKUDO_ZOKA).toBe('number'); });
            it('CONF_ID_ANGELUS が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_ANGELUS).toBe('number'); });
            it('CONF_ID_MAGNUM_BREAK_ZYOTAI が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_MAGNUM_BREAK_ZYOTAI).toBe('number'); });
            it('CONF_ID_SHIEN_PROVOKE が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE).toBe('number'); });
            it('CONF_ID_SHUCHURYOKU_KOZYO が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO).toBe('number'); });
            it('CONF_ID_LOUD_VOICE が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_LOUD_VOICE).toBe('number'); });
            it('CONF_ID_ENDURE が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_ENDURE).toBe('number'); });
            it('CONF_ID_DUMMY が数値', () => { expect(typeof CCharaConfIchizi.CONF_ID_DUMMY).toBe('number'); });
        });

        describe('インスタンスメソッド', () => {
            it('InitData が関数', () => { expect(typeof inst.InitData).toBe('function'); });
            it('BuildUpSelectAreaSubForSpecial が関数', () => { expect(typeof inst.BuildUpSelectAreaSubForSpecial).toBe('function'); });
            it('GetHeaderIdString が関数', () => { expect(typeof inst.GetHeaderIdString).toBe('function'); });
            it('BuildUpSelectArea が関数', () => { expect(typeof inst.BuildUpSelectArea).toBe('function'); });
        });

        describe('GetHeaderIdString の動作確認', () => {
            it('インスタンス番号を含む文字列を返す', () => {
                expect(inst.GetHeaderIdString(4)).toBe('OBJID_CONTROL_CONF_4_HEADER');
            });
        });
    });

    describe('window互換確認', () => {
        it('window.CCharaConfIchizi が設定されている', () => {
            expect((window as any).CCharaConfIchizi).toBe(CCharaConfIchizi);
        });
    });
});
