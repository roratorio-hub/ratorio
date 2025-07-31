import { ZSTDDecoder } from 'zstddec'
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
