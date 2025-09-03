// @ts-ignore: suppress missing module types
import * as fs from "fs/promises";
// @ts-ignore: suppress missing module types
import * as vm from "vm";
// @ts-ignore: suppress missing module types
import * as path from "path";
import { load as loadYAML, dump as dumpYAML } from "js-yaml";
import { zstdCompress } from "../src/funcZstd";
import type { SkillDataParameter } from "../src/loadSkillMap";

/**
 * CLI:
 *   npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts
 */
async function main() {
    await mergeSkill();
}

async function mergeSkill(): Promise<void> {
    const srcYaml = path.resolve("./data/skill.yaml");
    const outYaml = path.resolve("../dist/skill.yaml.zst");
    const srcJs = path.resolve("../roro/m/js/skill.dat.js");

    // ファイル読み込み
    const yamlText = new TextDecoder("utf-8").decode(await fs.readFile(srcYaml));

    // YAML -> オブジェクト
    const skillObject = loadYAML(yamlText) as Record<string, SkillDataParameter>;
    //console.log(`Loaded ${Object.keys(skillObject).length} skills`);

    // skill.dat.js オブジェクト
    const migSkill = await parseSkillDat(srcJs);

    let skillMapObject: Record<string, SkillDataParameter> = {};
    Object.entries(skillObject).forEach(([key, value]) => {
        // IDが存在しない場合はyamlのキーをフォールバックとして使う
        const id = value.id ?? key;
        skillMapObject[id] = value;

        if (value.type === "") {
            skillMapObject[id].type = "Normal";
        }

        // need_skill_list をパース（' を " に置換して JSON.parse）
        try {
            const nsRaw = (value as any).need_skill_list;
            if (nsRaw != null) {
                if (Array.isArray(nsRaw)) {
                    // 既に配列であればそのままセット
                    skillMapObject[id].need_skill_list = nsRaw;
                } else {
                    // 文字列等を JSON として解釈（シングルクォートをダブルクォートに置換）
                    const s = String(nsRaw).replace(/'/g, '"');
                    skillMapObject[id].need_skill_list = JSON.parse(s);
                }
            }
        } catch (e: unknown) {
            console.warn(`need_skill_list のパースに失敗: ${(value as any).need_skill_list} (${(e as Error).message})`);
        }

        // sp_amount をパースしてキーを +1 したオブジェクトに変換する
        let parsedSpAmountDict: Record<string, any> | null = null;
        try {
            const spRaw = (value as any).sp_amount;
            if (spRaw != null && typeof spRaw === "string") {
                // 数字キーをダブルクォートで囲む
                const s2 = spRaw.replace(/([{,]\s*)(\d+)(\s*:)/g, '$1"$2"$3');
                const spAmountDict = JSON.parse(s2) as Record<string, any>;
                parsedSpAmountDict = spAmountDict;
                if (Object.keys(spAmountDict).length > 0) {
                    const newObj: Record<number, any> = {};
                    for (const [k, v] of Object.entries(spAmountDict)) {
                        const nk = Number(k) + 1;
                        newObj[nk] = v;
                    }
                    // 0レベルのスキルは存在しないので null を設定
                    newObj[0] = null;
                    skillMapObject[id].sp_amount = newObj;
                }
            }
        } catch (e: unknown) {
            console.warn(`sp_amount のパースに失敗: ${(value as any).sp_amount} (${(e as Error).message})`);
        }

        // attack_range をパースし、無ければ sp_amount を元に同形式で作成する
        try {
            const arRaw = (value as any).attack_range;
            if (arRaw != null && typeof arRaw === "string") {
                // 数字キーをダブルクォートで囲む
                const s2 = arRaw.replace(/([{,]\s*)(\d+)(\s*:)/g, '$1"$2"$3');
                const attackRangeDict = JSON.parse(s2) as Record<string, any>;
                if (Object.keys(attackRangeDict).length > 0) {
                    const newObj: Record<number, any> = {};
                    for (const [k, v] of Object.entries(attackRangeDict)) {
                        const nk = Number(k) + 1;
                        newObj[nk] = v;
                    }
                    newObj[0] = null;
                    skillMapObject[id].attack_range = newObj;
                } else if (parsedSpAmountDict && Object.keys(parsedSpAmountDict).length > 0) {
                    // sp_amount が存在する場合、attack_range を sp_amount と同じ形式に変換（値は null）
                    const newObj: Record<number, any> = {};
                    for (const k of Object.keys(parsedSpAmountDict)) {
                        const nk = Number(k) + 1;
                        newObj[nk] = null;
                    }
                    newObj[0] = null;
                    skillMapObject[id].attack_range = newObj;
                }
            } else if (parsedSpAmountDict && (value as any).attack_range == null) {
                // attack_range が未定義で sp_amount がある場合の補完（値は null）
                const newObj: Record<number, any> = {};
                for (const k of Object.keys(parsedSpAmountDict)) {
                    const nk = Number(k) + 1;
                    newObj[nk] = null;
                }
                newObj[0] = null;
                skillMapObject[id].attack_range = newObj;
            }
        } catch (e: unknown) {
            console.warn(`attack_range のパースに失敗: ${(value as any).attack_range} (${(e as Error).message})`);
        }

        for (const { migIdNum, level, name, code } of migSkill) {
            const migName = name?.replace(/^\(.+?\)/, "").trim();
            if ((code !== null && code == id) || (name == skillMapObject[id].name) || (migName == skillMapObject[id].name)) {
                skillMapObject[id]._mig_id_num = migIdNum;
                skillMapObject[id]._mig_name = name;
                return;
            }
        }
    });

    //await fs.writeFile(outYaml, dumpYAML(skillMapObject));

    const compressed = await zstdCompress(dumpYAML(skillMapObject));
    if (compressed === null) {
        throw new Error("zstdCompress が null を返しました");
    }
    await fs.writeFile(outYaml, compressed);
}

async function parseSkillDat(src: string): Promise<{ migIdNum: number, level: number | null, name: string | null, code: string | null }[]> {
    let code: string;
    try {
        code = await fs.readFile(src, "utf8");
    } catch (e) {
        console.warn(`ファイルが見つかりません: ${src} (${(e as Error).message})`);
        return [];
    }

    // sandbox を作ってファイルを評価（IIFE 内で未宣言代入される SkillObjNew を sandbox に作らせる）
    const sandbox: Record<string, any> = {};
    vm.createContext(sandbox);
    new vm.Script(code, { filename: src }).runInContext(sandbox);

    const arr = sandbox.SkillObjNew;
    if (!Array.isArray(arr)) {
        console.warn(`SkillObjNew が見つかりません`);
        return [];
    }

    // 整形して保存（要素は [migId, level, name, code?] の形）
    const mapped = arr.map((it: any[]) => {
        const [migIdNum, level, name, code] = it;
        return {
            migIdNum: Number(migIdNum),
            level: typeof level === "number" ? level : null,
            name: typeof name === "string" ? name : null,
            code: typeof code === "string" ? code : null
        };
    });

    return mapped;
}

main().catch((e) => {
    console.error(e);
    // @ts-ignore: suppress not found module
    process.exit(1);
});
