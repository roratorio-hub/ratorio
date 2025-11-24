// @ts-ignore: suppress missing module types
import * as fs from "fs/promises";
// @ts-ignore: suppress missing module types
import * as vm from "vm";
// @ts-ignore: suppress missing module types
import * as path from "path";
import { load as loadYAML, dump as dumpYAML } from "js-yaml";
import { zstdCompress } from "../src/funcZstd";
import type { ItemDataParameter } from "../src/loadItemMap";
import { yamlOptions } from "./yamlMergeAndCompress";


export async function mergeItem(): Promise<void> {
    const srcYaml = path.resolve("./data/item.yaml");
    const outYaml = path.resolve("../dist/item.yaml");
    const outYamlZstd = path.resolve("../dist/item.yaml.zst");

    // ファイル読み込み
    const yamlText = new TextDecoder("utf-8").decode(await fs.readFile(srcYaml));
    const itemObject = loadYAML(yamlText) as Record<number, ItemDataParameter>;


    const yamlString = dumpYAML(itemObject, yamlOptions);
    if (yamlString === null) {
        throw new Error("dumpYAML が null を返しました");
    }
    await fs.writeFile(outYaml, yamlString);

    // zstd 圧縮
    const compressed = await zstdCompress(yamlString);
    if (compressed === null) {
        throw new Error("zstdCompress が null を返しました");
    }
    await fs.writeFile(outYamlZstd, compressed);
}
