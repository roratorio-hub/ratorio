// @ts-ignore
import { ZSTDDecoder } from "https://cdn.skypack.dev/pin/zstddec@v0.1.0-WTastKZ9TFWDpoN47TOq/mode=imports,min/optimized/zstddec.js"
const zstd = new ZSTDDecoder();

// ファイル読み込み
export async function loadFileAsUint8Array(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
}

// Zstandard圧縮データの解凍
export async function zstdDecompress(compressed: Uint8Array): Promise<Uint8Array> {
    await zstd.init();
    return await zstd.decode(compressed);
}
