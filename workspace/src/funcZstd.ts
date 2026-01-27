import { Zstd } from "@hpcc-js/wasm-zstd";

// Zstd 初期化中の Promise をキャッシュ（並列呼び出しでも 1 回だけロード）
let zstdInstancePromise: Promise<Zstd> | null = null;

// Zstdインスタンスの初期化
export async function initZstd(): Promise<Zstd> {
    if (!zstdInstancePromise) {
        // 初期化中の Promise をキャッシュし、失敗時はキャッシュをリセットして再試行可能にする
        zstdInstancePromise = Zstd.load().catch((err) => {
            // 初期化に失敗した場合は次回の呼び出しで再試行できるようにリセット
            zstdInstancePromise = null;
            throw err;
        });
    }
    return zstdInstancePromise;
}

// ファイル読み込み
export async function loadFileAsUint8Array(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
}

// zstdで展開
export async function zstdDecompress(compressed: Uint8Array): Promise<Uint8Array | null> {
    try {
        const zstd = await initZstd();
        // zstd.decompress() で zstd データを展開
        return await zstd.decompress(compressed);
    } catch (err) {
        console.error("展開エラー:", err);
        return null;
    }
}

// ブラウザ環境でのみグローバルに登録
if (typeof window !== 'undefined') {
    (window as any).zstdDecompress = zstdDecompress;
}

// zstdで圧縮
export async function zstdCompress(inputBytes: Uint8Array, level: number = 22): Promise<Uint8Array | null> {
    try {
        const zstd = await initZstd();
        // zstd.compress() でzstd圧縮
        return await zstd.compress(inputBytes, level);
    } catch (err) {
        console.error("圧縮エラー:", err);
        return null;
    }
}

// ブラウザ環境でのみグローバルに登録
if (typeof window !== 'undefined') {
    (window as any).zstdCompress = zstdCompress;
}

// 文字列をzstdで展開
export async function zstdDecompressString(compressed: Uint8Array): Promise<string | null> {
    const decompressed = await zstdDecompress(compressed);
    if (decompressed) {
        const decoder = new TextDecoder();
        return decoder.decode(decompressed);
    }
    return null;
}

// 文字列をzstdで圧縮
export async function zstdCompressString(input: string, level: number = 22): Promise<Uint8Array | null> {
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(input);
    return await zstdCompress(inputBytes, level);
}

// Base64 → Uint8Array（URLセーフに対応）
export function base64ToUint8Array(base64: string): Uint8Array {
    // パディングの補完
    let paddedBase = base64.replace(/-/g, '+').replace(/_/g, '/');
    const padding = paddedBase.length % 4;
    if (padding === 2) paddedBase += '==';
    else if (padding === 3) paddedBase += '=';

    const binaryString = atob(paddedBase);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
// ブラウザ環境でのみグローバルに登録
if (typeof window !== 'undefined') {
    (window as any).base64ToUint8Array = base64ToUint8Array;
}

// Uint8Array → Base64（URLセーフ対応）
export function uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    let base64 = btoa(binary);
    // URLセーフ変換
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64;
}
// ブラウザ環境でのみグローバルに登録
if (typeof window !== 'undefined') {
    (window as any).uint8ArrayToBase64 = uint8ArrayToBase64;
}
