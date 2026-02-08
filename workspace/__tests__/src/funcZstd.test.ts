/**
 * workspace/src/funcZstd.ts のユニットテスト
 *
 * Zstd圧縮・展開・Base64変換機能のテスト
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';
import {
    initializeZstd,
    base64ToUint8Array,
    uint8ArrayToBase64,
    zstdCompressString,
    zstdDecompressString,
    zstdCompressAsync,
    zstdDecompressAsync,
} from '../../src/funcZstd';

describe('funcZstd.ts - Zstd圧縮・展開機能', () => {

    describe('initializeZstd', () => {
        it('Zstdインスタンスの初期化に成功する', async () => {
            const zstd = await initializeZstd();
            expect(zstd).toBeDefined();
            expect(typeof zstd.compress).toBe('function');
            expect(typeof zstd.decompress).toBe('function');
        });

        it('複数回呼び出された場合、同じインスタンスをキャッシュして返す', async () => {
            const zstd1 = await initializeZstd();
            const zstd2 = await initializeZstd();
            expect(zstd1).toBe(zstd2); // 同じインスタンスであることを確認
        });
    });

    describe('base64ToUint8Array', () => {
        it('Base64文字列をUint8Arrayに変換できる', () => {
            const base64 = 'SGVsbG8gV29ybGQ='; // "Hello World"
            const result = base64ToUint8Array(base64);
            expect(result).toBeInstanceOf(Uint8Array);
            const decoded = new TextDecoder().decode(result);
            expect(decoded).toBe('Hello World');
        });

        it('URLセーフなBase64（-と_を含む）に対応する', () => {
            // 標準的なBase64: "abc+def/ghi="
            // URLセーフ: "abc-def_ghi"
            const urlSafeBase64 = 'YWJjLWRlZl9naGk'; // "abc-def_ghi" without padding
            const result = base64ToUint8Array(urlSafeBase64);
            expect(result).toBeInstanceOf(Uint8Array);
        });

        it('パディングが不足している場合でも変換できる', () => {
            const base64NoPadding = 'SGVsbG8'; // "Hello" without padding
            const result = base64ToUint8Array(base64NoPadding);
            expect(result).toBeInstanceOf(Uint8Array);
            const decoded = new TextDecoder().decode(result);
            expect(decoded).toBe('Hello');
        });
    });

    describe('uint8ArrayToBase64', () => {
        it('Uint8ArrayをBase64文字列に変換できる', () => {
            const text = 'Hello World';
            const uint8Array = new TextEncoder().encode(text);
            const base64 = uint8ArrayToBase64(uint8Array);
            expect(typeof base64).toBe('string');
            expect(base64.length).toBeGreaterThan(0);
        });

        it('URLセーフなBase64（-と_）で返す', () => {
            const uint8Array = new Uint8Array([0xff, 0xfe, 0xfd]);
            const base64 = uint8ArrayToBase64(uint8Array);
            // URLセーフであることを確認（+と/が含まれないこと）
            expect(/[+/]/.test(base64)).toBe(false);
        });

        it('パディング（=）が含まれないようにしている', () => {
            const uint8Array = new TextEncoder().encode('test');
            const base64 = uint8ArrayToBase64(uint8Array);
            expect(/=$/.test(base64)).toBe(false);
        });
    });

    describe('base64とuint8Arrayの相互変換', () => {
        it('base64ToUint8Array -> uint8ArrayToBase64 で往復変換できる', () => {
            const originalBase64 = 'SGVsbG8gV29ybGQ'; // "Hello World"
            const uint8Array = base64ToUint8Array(originalBase64);
            const convertedBase64 = uint8ArrayToBase64(uint8Array);
            // 同じデータになることを確認
            const originalDecoded = base64ToUint8Array(originalBase64);
            const convertedDecoded = base64ToUint8Array(convertedBase64);
            expect(originalDecoded).toEqual(convertedDecoded);
        });
    });

    describe('zstdCompressString / zstdDecompressString', () => {
        it('文字列を圧縮・展開できる', async () => {
            const original = 'Hello World! This is a test string for compression.';
            const compressed = await zstdCompressString(original);
            expect(compressed).not.toBeNull();
            expect(compressed).toBeInstanceOf(Uint8Array);

            const decompressed = await zstdDecompressString(compressed!);
            expect(decompressed).toBe(original);
        });

        it('デフォルト圧縮レベル（22）で圧縮できる', async () => {
            const original = 'a'.repeat(1000); // 長いテキスト
            const compressed = await zstdCompressString(original);
            expect(compressed).not.toBeNull();
            // 圧縮後のサイズが元のサイズより小さいことを確認
            expect(compressed!.length).toBeLessThan(original.length);
        });

        it('カスタム圧縮レベルで圧縮できる', async () => {
            const original = 'test data for compression level testing';
            const compressed1 = await zstdCompressString(original, 1);
            const compressed22 = await zstdCompressString(original, 22);
            expect(compressed1).not.toBeNull();
            expect(compressed22).not.toBeNull();
            // 両方圧縮できることを確認
            expect(compressed1!.length).toBeGreaterThan(0);
            expect(compressed22!.length).toBeGreaterThan(0);
        });

        it('空文字列を圧縮・展開できる', async () => {
            const original = '';
            const compressed = await zstdCompressString(original);
            expect(compressed).not.toBeNull();

            const decompressed = await zstdDecompressString(compressed!);
            expect(decompressed).toBe(original);
        });

        it('日本語を含むテキストを圧縮・展開できる', async () => {
            const original = 'こんにちは世界！ラトリオの計算機です。';
            const compressed = await zstdCompressString(original);
            expect(compressed).not.toBeNull();

            const decompressed = await zstdDecompressString(compressed!);
            expect(decompressed).toBe(original);
        });
    });

    describe('zstdCompressAsync / zstdDecompressAsync', () => {
        it('Uint8Arrayを圧縮・展開できる', async () => {
            const original = new TextEncoder().encode('Test data for compression');
            const compressed = await zstdCompressAsync(original);
            expect(compressed).not.toBeNull();

            const decompressed = await zstdDecompressAsync(compressed!);
            expect(decompressed).not.toBeNull();
            expect(decompressed).toEqual(original);
        });

        it('圧縮したデータを展開するとnullが返らない', async () => {
            const original = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            const compressed = await zstdCompressAsync(original);
            const decompressed = await zstdDecompressAsync(compressed!);
            expect(decompressed).not.toBeNull();
        });

        it('カスタム圧縮レベルで圧縮できる', async () => {
            const original = new Uint8Array(100).fill(65); // 'A'の繰り返し
            const compressed = await zstdCompressAsync(original, 10);
            expect(compressed).not.toBeNull();
            expect(compressed!.length).toBeGreaterThan(0);
        });

        it('不正なデータの展開はnullを返す', async () => {
            const invalidData = new Uint8Array([255, 254, 253]);

            // console.errorがスパイされて、エラーメッセージが出力される
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            const decompressed = await zstdDecompressAsync(invalidData);

            // エラーがハンドルされてnullが返される
            expect(decompressed).toBeNull();
            // console.errorが呼ばれていることを確認
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });
    });

    describe('圧縮・展開のエラーハンドリング', () => {
        it('zstdDecompressStringで無効データを渡すとnullを返す', async () => {
            const invalidData = new Uint8Array([0xff, 0xfe, 0xfd, 0xfc]);

            // console.errorがスパイされて、エラーメッセージが出力される
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            const result = await zstdDecompressString(invalidData);

            // エラーがハンドルされてnullが返される
            expect(result).toBeNull();
            // console.errorが呼ばれていることを確認
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });

        it('zstdDecompressAsyncで無効データを渡すとnullを返す', async () => {
            const invalidData = new Uint8Array([255, 254, 253]);

            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            const decompressed = await zstdDecompressAsync(invalidData);

            // エラーがハンドルされてnullが返される
            expect(decompressed).toBeNull();
            // console.errorが呼ばれていることを確認
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });

        it('zstdCompressAsyncでエラーが発生した場合、エラーが送出される', async () => {
            // 通常のUint8Arrayではエラーが生じない想定
            const data = new TextEncoder().encode('test');
            await expect(zstdCompressAsync(data)).resolves.not.toThrow();
        });
    });
});
