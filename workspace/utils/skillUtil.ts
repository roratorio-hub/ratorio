// @ts-ignore: suppress missing module types
import * as fs from "fs/promises";
// @ts-ignore: suppress missing module types
import * as vm from "vm";
// @ts-ignore: suppress missing module types
import * as path from "path";
import { load as loadYAML, dump as dumpYAML } from "js-yaml";
import { zstdCompress, } from "../src/funcZstd";
import type { SkillDataParameter } from "../src/loadSkillMap";
import { yamlOptions } from "./yamlMergeAndCompress";


export async function mergeSkill(): Promise<void> {
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

        const matchedMig = migSkill.find(({ migIdNum, level, name, code }) => {
            const migName = name?.replace(/^\(.+?\)/, "").trim();
            return (code !== null && code == id) || (name == skillMapObject[id].name) || (migName == skillMapObject[id].name);
        });
        if (matchedMig) {
            skillMapObject[id]._mig_id_num = matchedMig.migIdNum;
            skillMapObject[id]._mig_name = matchedMig.name;
            skillMapObject[id]._mig_id_name = matchedMig.code;
        }
    });

    const compressed = await zstdCompress(dumpYAML(skillMapObject, yamlOptions));
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

// TypeScript definitions for job types and migration job IDs

interface MigJobId {
    id: number;
    correct?: string;
}

const mig_job_id_map: Record<string, MigJobId> = {
    "NOVICE": { id: 0 },
    "SWORDMAN": { id: 1 },
    "THIEF": { id: 2 },
    "ACOLYTE": { id: 3 },
    "ARCHER": { id: 4 },
    "MAGICIAN": { id: 5 },
    "MARCHANT": { id: 6, correct: "MERCHANT" },
    "KNIGHT": { id: 7 },
    "ASSASIN": { id: 8, correct: "ASSASSIN" },
    "PRIEST": { id: 9 },
    "HUNTER": { id: 10 },
    "WIZARD": { id: 11 },
    "BLACKSMITH": { id: 12 },
    "CRUSADER": { id: 13 },
    "ROGUE": { id: 14 },
    "MONK": { id: 15 },
    "BARD": { id: 16 },
    "DANCER": { id: 17 },
    "SAGE": { id: 18 },
    "ALCHEMIST": { id: 19 },
    "SUPERNOVICE": { id: 20 },
    "LORDKNIGHT": { id: 21, correct: "KNIGHT_H" },
    "ASSASINCROSS": { id: 22, correct: "ASSASSIN_H" },
    "HIGHPRIEST": { id: 23, correct: "PRIEST_H" },
    "SNIPER": { id: 24, correct: "HUNTER_H" },
    "HIGHWIZARD": { id: 25, correct: "WIZARD_H" },
    "WHITESMITH": { id: 26, correct: "BLACKSMITH_H" },
    "PALADIN": { id: 27, correct: "CRUSADER_H" },
    "CHASER": { id: 28 },
    "CHAMPION": { id: 29, correct: "MONK_H" },
    "CROWN": { id: 30, correct: "BARD_H" },
    "ZYPSY": { id: 31, correct: "DANCER_H" },
    "PROFESSOR": { id: 32, correct: "SAGE_H" },
    "CREATOR": { id: 33, correct: "ALCHEMIST_H" },
    "HI_NOVICE": { id: 34, correct: "NOVICE_H" },
    "HI_SWORDMAN": { id: 35, correct: "SWORDMAN_H" },
    "HI_THIEF": { id: 36, correct: "THIEF_H" },
    "HI_ACOLYTE": { id: 37, correct: "ACOLYTE_H" },
    "HI_ARCHER": { id: 38, correct: "ARCHER_H" },
    "HI_MAGICIAN": { id: 39, correct: "MAGICIAN_H" },
    "HI_MARCHANT": { id: 40, correct: "MERCHANT_H" },
    "TAEGWON": { id: 41, correct: "TAEKWON" },
    "STARGRADIATOR": { id: 42, correct: "STAR" },
    "SOULLINKER": { id: 43, correct: "LINKER" },
    "NINJA": { id: 44 },
    "GUNSLINGER": { id: 45 },
    "RUNEKNIGHT": { id: 46, correct: "RUNE_KNIGHT" },
    "GILOTINCROSS": { id: 47, correct: "GUILLOTINE_CROSS" },
    "ARCBISHOP": { id: 48, correct: "ARCHBISHOP" },
    "RANGER": { id: 49 },
    "WARLOCK": { id: 50 },
    "MECHANIC": { id: 51 },
    "ROYALGUARD": { id: 52, correct: "ROYAL_GUARD" },
    "SHADOWCHASER": { id: 53, correct: "SHADOW_CHASER" },
    "SHURA": { id: 54, correct: "SURA" },
    "MINSTREL": { id: 55, correct: "MINSTREL" },
    "WANDERER": { id: 56, correct: "WANDERER" },
    "SORCERER": { id: 57, correct: "SORCERER" },
    "GENETIC": { id: 58 },
    "KAGERO": { id: 59, correct: "KAGEROU" },
    "OBORO": { id: 60 },
    "SUPERNOVICE_PLUS": { id: 61, correct: "SUPERNOVICE2" },
    "REBELLION": { id: 62 },
    "SUMMONER": { id: 63 },
    "STAR_EMPEROR": { id: 64 },
    "SOUL_REAPER": { id: 65 },
    "DRAGON_KNIGHT": { id: 66 },
    "SHADOW_CROSS": { id: 67 },
    "CARDINAL": { id: 68 },
    "WIND_HAWK": { id: 69, correct: "WINDHAWK" },
    "ARCH_MAGE": { id: 70 },
    "MEISTER": { id: 71 },
    "IMPERIAL_GUARD": { id: 72 },
    "ABYSS_CHASER": { id: 73 },
    "INQUISITOR": { id: 74 },
    "TROUBADOUR": { id: 75 },
    "TROUVERE": { id: 76 },
    "ELEMENTAL_MASTER": { id: 77 },
    "BIOLO": { id: 78 },
    "SKY_EMPEROR": { id: 79 },
    "SOUL_ASCETIC": { id: 80 },
    "SHINKIROU": { id: 81, correct: "SHINKIRO" },
    "SHIRANUI": { id: 82 },
    "NIGHT_WATCH": { id: 83 },
    "HYPER_NOVICE": { id: 84 },
    "SPIRIT_HANDLER": { id: 85 }
};
