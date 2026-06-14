import { describe, it, expect, beforeAll } from 'vitest';
import { CSaveDataConverter } from '@roro/CSaveDataConverter.js';

beforeAll(() => {
    (globalThis as any).toSafeBigInt = (value: unknown): bigint => BigInt(value as any);
    (globalThis as any).floorBigInt32 = (value: bigint): number => Number(BigInt.asIntN(32, value));
});

describe('CSaveDataConverter.js', () => {
    describe('静的プロパティ確認', () => {
        it('letterBitsMIG が 6', () => {
            expect(CSaveDataConverter.letterBitsMIG).toBe(6);
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
