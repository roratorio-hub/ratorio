import { Zstd } from "@hpcc-js/wasm-zstd";

// ファイル読み込み
export async function loadFileAsUint8Array(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
}

// zstdで展開
export async function zstdDecompress(compressed: Uint8Array): Promise<string | null> {
    const zstd = await Zstd.load();
    try {
        // zstd.decompress() で zstd データを展開
        const decompressedData = await zstd.decompress(compressed);
        return new TextDecoder('utf-8').decode(decompressedData);
    } catch (err) {
        console.error("展開エラー:", err);
        return null;
    }
}

// zstdで圧縮
export async function zstdCompress(text: string): Promise<Uint8Array | null> {
    const zstd = await Zstd.load();
    try {
        // 文字列をUTF-8のUint8Arrayに変換
        const input = new TextEncoder().encode(text);
        // zstd.compress() でzstd圧縮
        return await zstd.compress(input, 22);
    } catch (err) {
        console.error("圧縮エラー:", err);
        return null;
    }
}
