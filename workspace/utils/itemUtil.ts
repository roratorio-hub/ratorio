// @ts-ignore: suppress missing module types
import * as fs from "fs/promises";
// @ts-ignore: suppress missing module types
import * as vm from "vm";
// @ts-ignore: suppress missing module types
import * as path from "path";
import { zstdCompress } from "../src/funcZstd";


export async function mergeItem(): Promise<void> {
    const srcYaml = path.resolve("./data/item.yaml");
    const outYaml = path.resolve("../dist/item.yaml.zst");

    // ファイル読み込み
    const yamlText = new TextDecoder("utf-8").decode(await fs.readFile(srcYaml));

    /*
    将来的にitem処理をここに追加
    */

    // zstd 圧縮
    const compressed = await zstdCompress(yamlText);
    if (compressed === null) {
        throw new Error("zstdCompress が null を返しました");
    }
    await fs.writeFile(outYaml, compressed);
}
