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
export async function zstdDecompress(compressed: Uint8Array): Promise<string | null> {
    try {
        const zstd = await initZstd();
        // zstd.decompress() で zstd データを展開
        const decompressedData = await zstd.decompress(compressed);
        return new TextDecoder('utf-8').decode(decompressedData);
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
export async function zstdCompress(text: string, level: number = 22): Promise<Uint8Array | null> {
    try {
        const zstd = await initZstd();
        // 文字列をUTF-8のUint8Arrayに変換
        const input = new TextEncoder().encode(text);
        // zstd.compress() でzstd圧縮
        return await zstd.compress(input, level);
    } catch (err) {
        console.error("圧縮エラー:", err);
        return null;
    }
}

// ブラウザ環境でのみグローバルに登録
if (typeof window !== 'undefined') {
    (window as any).zstdCompress = zstdCompress;
}
