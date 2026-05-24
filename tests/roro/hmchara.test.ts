import { describe, it, expect } from 'vitest';
import { IsUnconfirmedHP, IsUnconfirmedSP, UpdateCharaDataHtml } from '@roro/hmchara.js';
import '@ro4/data/mig.job.dat.js';

describe('hmchara.js', () => {
    describe('エクスポート確認', () => {
        it('IsUnconfirmedHP がエクスポートされている', () => {
            expect(typeof IsUnconfirmedHP).toBe('function');
        });

        it('IsUnconfirmedSP がエクスポートされている', () => {
            expect(typeof IsUnconfirmedSP).toBe('function');
        });

        it('UpdateCharaDataHtml がエクスポートされている', () => {
            expect(typeof UpdateCharaDataHtml).toBe('function');
        });
    });

    // JOB_ID_GILOTINCROSS = 47: HP/SP未確認レベル [186,187,188,189,191,193,195,196,197,198]
    // JOB_ID_NOVICE = 0: エントリなし（undefined）
    describe('IsUnconfirmedHP', () => {
        it('jobId が配列長以上なら true を返す', () => {
            expect(IsUnconfirmedHP(9999, 1)).toBe(true);
        });

        it('hpspArray[jobId] が配列でなければ false を返す', () => {
            expect(IsUnconfirmedHP(0, 50)).toBe(false);
        });

        it('level が HP 配列内にあれば true を返す', () => {
            expect(IsUnconfirmedHP(47, 186)).toBe(true);
        });

        it('level が HP 配列にない場合は false を返す', () => {
            expect(IsUnconfirmedHP(47, 1)).toBe(false);
        });
    });

    describe('IsUnconfirmedSP', () => {
        it('jobId が配列長以上なら true を返す', () => {
            expect(IsUnconfirmedSP(9999, 1)).toBe(true);
        });

        it('hpspArray[jobId] が配列でなければ false を返す', () => {
            expect(IsUnconfirmedSP(0, 10)).toBe(false);
        });

        it('level が SP 配列内にあれば true を返す', () => {
            expect(IsUnconfirmedSP(47, 186)).toBe(true);
        });

        it('level が SP 配列にない場合は false を返す', () => {
            expect(IsUnconfirmedSP(47, 1)).toBe(false);
        });
    });
});
