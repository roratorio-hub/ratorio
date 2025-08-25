import { Zstd } from "@hpcc-js/wasm-zstd";
const zstd = await Zstd.load();

// ファイル読み込み
export async function loadFileAsUint8Array(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
}

// Zstandard圧縮データの解凍
export async function zstdDecompress(compressed: Uint8Array): Promise<Uint8Array> {
    return await zstd.decompress(compressed);
}
