import { Zstd } from "@hpcc-js/wasm-zstd";

// Zstd インスタンスのキャッシュ（初期化済みインスタンス）
let zstdInstance: Zstd | null = null;
// 初期化中の Promise をキャッシュ（並列呼び出しでも 1 回だけロード）
let zstdInstancePromise: Promise<Zstd> | null = null;

// Zstdインスタンスの初期化（統一された初期化関数）
export async function initializeZstd(): Promise<Zstd> {
    // 既に初期化済みならそのまま返す
    if (zstdInstance) {
        return zstdInstance;
    }

    if (!zstdInstancePromise) {
        // 初期化中の Promise をキャッシュし、失敗時はキャッシュをリセットして再試行可能にする
        zstdInstancePromise = Zstd.load()
            .then((instance) => {
                zstdInstance = instance;  // 初期化完了後、インスタンスをキャッシュ
                return instance;
            })
            .catch((err) => {
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
export async function zstdDecompressAsync(compressed: Uint8Array): Promise<Uint8Array | null> {
    try {
        const zstd = await initializeZstd();
        // zstd.decompress() で zstd データを展開
        const result = await zstd.decompress(compressed);
        return result;
    } catch (err) {
        console.error("Error decompressing:", err);
        return null;
    }
}

// 文字列をzstdで展開
export async function zstdDecompressString(compressed: Uint8Array): Promise<string | null> {
    const decompressed = await zstdDecompressAsync(compressed);
    if (decompressed) {
        const decoder = new TextDecoder();
        return decoder.decode(decompressed);
    }
    return null;
}

// zstdで圧縮
export async function zstdCompressAsync(inputBytes: Uint8Array, level: number = 22): Promise<Uint8Array | null> {
    try {
        const zstd = await initializeZstd();
        // zstd.compress() でzstd圧縮
        const result = await zstd.compress(inputBytes, level);
        return result;
    } catch (err) {
        console.error("Error compressing:", err);
        throw err; // エラーを呼び出し元に伝播させる
    }
}

// 文字列をzstdで圧縮
export async function zstdCompressString(input: string, level: number = 22): Promise<Uint8Array | null> {
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(input);
    return await zstdCompressAsync(inputBytes, level);
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

/**
 * 同期展開（初期化後のみ使用可）
 */
function zstdDecompressSync(input: Uint8Array): Uint8Array {
    if (!zstdInstance) {
        throw new Error("zstd not initialized: call initZstdOnce()");
    }
    return zstdInstance.decompress(input);
}

/**
 * 同期圧縮（初期化後のみ使用可）
 */
function zstdCompressSync(input: Uint8Array, level: number = 22): Uint8Array {
    if (!zstdInstance) {
        throw new Error("zstd not initialized: call initZstdOnce()");
    }
    return zstdInstance.compress(input, level);
}

// ブラウザ環境でのみ初期化を実行
if (typeof window !== 'undefined') {
    initializeZstd().then(() => {
        console.log('Zstd initialized successfully.');
    }).catch(err => {
        console.error("zstd initialization failed:", err);
    });
    (window as any).zstdDecompressSync = zstdDecompressSync;
    (window as any).zstdCompressSync = zstdCompressSync;
    (window as any).base64ToUint8Array = base64ToUint8Array;
    (window as any).uint8ArrayToBase64 = uint8ArrayToBase64;
}
