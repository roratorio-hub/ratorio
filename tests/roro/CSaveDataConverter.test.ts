import { describe, it, expect, beforeAll } from 'vitest';
import { CSaveDataConverter } from '@roro/CSaveDataConverter.js';

beforeAll(() => {
    (globalThis as any).toSafeBigInt = (value: unknown): bigint => BigInt(value as any);
    (globalThis as any).floorBigInt32 = (value: bigint): number => Number(BigInt.asIntN(32, value));
});

describe('CSaveDataConverter.js', () => {
    describe('エクスポート確認', () => {
        it('CSaveDataConverter が関数（コンストラクタ）', () => {
            expect(typeof CSaveDataConverter).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CSaveDataConverter が設定されている', () => {
            expect((window as any).CSaveDataConverter).toBe(CSaveDataConverter);
        });
    });

    describe('静的プロパティ確認', () => {
        it('LetterMappingArray が配列', () => {
            expect(Array.isArray(CSaveDataConverter.LetterMappingArray)).toBe(true);
        });
        it('LetterMappingArray の長さが 52', () => {
            expect(CSaveDataConverter.LetterMappingArray.length).toBe(52);
        });
        it('LetterMappingArrayMIG が配列', () => {
            expect(Array.isArray(CSaveDataConverter.LetterMappingArrayMIG)).toBe(true);
        });
        it('LetterMappingArrayMIG の長さが 64', () => {
            expect(CSaveDataConverter.LetterMappingArrayMIG.length).toBe(64);
        });
        it('letterBitsMIG が 6', () => {
            expect(CSaveDataConverter.letterBitsMIG).toBe(6);
        });
    });

    describe('静的メソッド確認', () => {
        it('ConvertNtoS が関数', () => {
            expect(typeof CSaveDataConverter.ConvertNtoS).toBe('function');
        });
        it('ConvertStoN が関数', () => {
            expect(typeof CSaveDataConverter.ConvertStoN).toBe('function');
        });
        it('ConvertNtoSMIG が関数', () => {
            expect(typeof CSaveDataConverter.ConvertNtoSMIG).toBe('function');
        });
        it('ConvertStoNMIG が関数', () => {
            expect(typeof CSaveDataConverter.ConvertStoNMIG).toBe('function');
        });
        it('ConvertSignedNtoS が関数', () => {
            expect(typeof CSaveDataConverter.ConvertSignedNtoS).toBe('function');
        });
        it('ConvertSignedStoN が関数', () => {
            expect(typeof CSaveDataConverter.ConvertSignedStoN).toBe('function');
        });
        it('ConvertSignedToUnsigned が関数', () => {
            expect(typeof CSaveDataConverter.ConvertSignedToUnsigned).toBe('function');
        });
        it('ConvertUnsignedToSigned が関数', () => {
            expect(typeof CSaveDataConverter.ConvertUnsignedToSigned).toBe('function');
        });
        it('CompressDataTextMIG が関数', () => {
            expect(typeof CSaveDataConverter.CompressDataTextMIG).toBe('function');
        });
        it('ExtractDataTextMIG が関数', () => {
            expect(typeof CSaveDataConverter.ExtractDataTextMIG).toBe('function');
        });
    });

    describe('ConvertNtoS / ConvertStoN 往復変換', () => {
        it('0 → 変換 → 0', () => {
            const str = CSaveDataConverter.ConvertNtoS(0, 2);
            const num = CSaveDataConverter.ConvertStoN(str);
            expect(num).toBe(0);
        });
        it('52 → 変換 → 52', () => {
            const str = CSaveDataConverter.ConvertNtoS(52, 2);
            const num = CSaveDataConverter.ConvertStoN(str);
            expect(num).toBe(52);
        });
    });

    describe('CompressDataTextMIG / ExtractDataTextMIG 往復変換', () => {
        it('連続ゼロを圧縮して展開できる', () => {
            const original = 'aaaa0000000000bbbb';
            const compressed = CSaveDataConverter.CompressDataTextMIG(original);
            const extracted = CSaveDataConverter.ExtractDataTextMIG(compressed);
            expect(extracted).toBe(original);
        });
    });
});
