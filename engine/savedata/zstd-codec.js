import { Zstd } from "../../lib/wasm-zstd/index.js";

// Zstd インスタンスのキャッシュ（初期化済みインスタンス）
let zstdInstance = null;
// 初期化中の Promise をキャッシュ（並列呼び出しでも 1 回だけロード）
let zstdInstancePromise = null;

/**
 * Zstd インスタンスの初期化（統一された初期化関数）。
 * @returns {Promise<Zstd>}
 */
export async function initializeZstd() {
    // 既に初期化済みならそのまま返す
    if (zstdInstance) {
        return zstdInstance;
    }

    if (!zstdInstancePromise) {
        // 初期化中の Promise をキャッシュし、失敗時はキャッシュをリセットして再試行可能にする
        zstdInstancePromise = Zstd.load()
            .then((instance) => {
                zstdInstance = instance; // 初期化完了後、インスタンスをキャッシュ
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

/**
 * zstdで展開する。
 * @param {Uint8Array} compressed
 * @returns {Promise<Uint8Array | null>}
 */
export async function zstdDecompressAsync(compressed) {
    try {
        const zstd = await initializeZstd();
        return zstd.decompress(compressed);
    } catch (err) {
        console.error("Error decompressing:", err);
        return null;
    }
}

/**
 * 文字列をzstdで展開する。
 * @param {Uint8Array} compressed
 * @returns {Promise<string | null>}
 */
export async function zstdDecompressString(compressed) {
    const decompressed = await zstdDecompressAsync(compressed);
    if (decompressed) {
        const decoder = new TextDecoder();
        return decoder.decode(decompressed);
    }
    return null;
}

/**
 * zstdで圧縮する。
 * @param {Uint8Array} inputBytes
 * @param {number} [level=22]
 * @returns {Promise<Uint8Array | null>}
 */
export async function zstdCompressAsync(inputBytes, level = 22) {
    try {
        const zstd = await initializeZstd();
        return zstd.compress(inputBytes, level);
    } catch (err) {
        console.error("Error compressing:", err);
        throw err; // エラーを呼び出し元に伝播させる
    }
}

/**
 * 文字列をzstdで圧縮する。
 * @param {string} input
 * @param {number} [level=22]
 * @returns {Promise<Uint8Array | null>}
 */
export async function zstdCompressString(input, level = 22) {
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(input);
    return await zstdCompressAsync(inputBytes, level);
}

/**
 * Base64 → Uint8Array（URLセーフに対応）。
 * @param {string} base64
 * @returns {Uint8Array}
 */
export function base64ToUint8Array(base64) {
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

/**
 * Uint8Array → Base64（URLセーフ対応）。
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export function uint8ArrayToBase64(bytes) {
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
 * 同期展開（初期化後のみ使用可）。
 * @param {Uint8Array} input
 * @returns {Uint8Array}
 */
export function zstdDecompressSync(input) {
    if (!zstdInstance) {
        throw new Error("zstd not initialized: call initializeZstd() first");
    }
    return zstdInstance.decompress(input);
}

/**
 * 同期圧縮（初期化後のみ使用可）。
 * @param {Uint8Array} input
 * @param {number} [level=22]
 * @returns {Uint8Array}
 */
export function zstdCompressSync(input, level = 22) {
    if (!zstdInstance) {
        throw new Error("zstd not initialized: call initializeZstd() first");
    }
    return zstdInstance.compress(input, level);
}

// モジュール評価時に初期化を開始する。CSaveController.js からの静的 import 経由で
// engine の module graph 読み込み時点から走るため、DOMContentLoaded 時点（セーブURL
// 読み込み等が zstdDecompressSync/zstdCompressSync を呼ぶ最速のタイミング）には
// 初期化が完了している。ブラウザ環境でのみ実行する（vitest 等の node 環境では
// テスト側が必要に応じて initializeZstd() を明示的に呼ぶ）。
if (typeof window !== 'undefined') {
    initializeZstd().catch((err) => {
        console.error("zstd initialization failed:", err);
    });
}
