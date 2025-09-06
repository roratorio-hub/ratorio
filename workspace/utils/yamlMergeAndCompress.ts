// @ts-ignore: suppress missing module types
import * as fs from "fs/promises";
// @ts-ignore: suppress missing module types
import * as vm from "vm";
// @ts-ignore: suppress missing module types
import * as path from "path";
import { load as loadYAML, dump as dumpYAML } from "js-yaml";
import { zstdCompress, zstdDecompress } from "../src/funcZstd";
import type { SkillDataParameter } from "../src/loadSkillMap";
import type { JobDataParameter } from "../src/loadJobMap";

/**
 * CLI:
 *   npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts
 */
async function main() {
    await mergeSkill();
    await mergeJob();
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

    //await fs.writeFile(outYaml, dumpYAML(skillMapObject));

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

async function mergeJob(): Promise<void> {
    const srcYaml = path.resolve("./data/job.yaml");
    const outYaml = path.resolve("../dist/job.yaml.zst");
    const srcJs = path.resolve("../ro4/m/js/data/mig.job.dat.js");
    const skillYaml = path.resolve("../dist/skill.yaml.zst");

    // ファイル読み込み
    const yamlText = new TextDecoder("utf-8").decode(await fs.readFile(srcYaml));

    // YAML -> オブジェクト
    const jobObject = loadYAML(yamlText) as { id: string; id_num: number; name: string }[];
    //console.log(`Loaded ${Object.keys(jobObject).length} jobs`);

    // Skill ファイル読み込み
    const skillYamlText = await zstdDecompress(await fs.readFile(skillYaml));
    if (skillYamlText === null) {
        console.error("skill.yaml.zst の展開に失敗しました");
        return;
    }
    const skillObject = loadYAML(skillYamlText) as Record<string, SkillDataParameter>;


    // mig.job.dat.js オブジェクトをパース
    const migJobs = await parseJobDat(srcJs);


    let jobMapObject: Record<string, JobDataParameter> = {};
    migJobs.forEach((migJob) => {
        const migId = migJob.id.toString();

        const [correctJobIdName, beforeJobIdName] = getMigJobById(migJob.id);
        if (correctJobIdName === null) {
            console.warn(`${beforeJobIdName} not found in job_table (invalid job id name)`);
            return;
        }
        if (beforeJobIdName === "HI_NOVICE") {
            //console.warn(`${beforeJobIdName} is HI_NOVICE, skipping`);
            return;
        }

        let job: { id: string; id_num: number; name: string; } | null = null;
        for (let idx = 0; idx < jobObject.length; idx++) {
            if (jobObject[idx].id.endsWith(correctJobIdName)) {
                job = jobObject[idx];
                break;
            }
        }

        if (job === null) {
            console.warn(`${correctJobIdName} not found in job.yaml (invalid job id name)`);
            return;
        }

        //console.log(`${migJob.id} -> ${correctJobIdName} , ${job.id_num} : ${beforeJobIdName}`);

        jobMapObject[correctJobIdName] = {
            id_name: correctJobIdName, // ID Name
            id_num: job.id_num, // ID Num
            is_doram: false, // ドラムかどうか（デフォルト値）
            name: job.name, // 職業名
            name_ja: migJob.name[0] ?? job.name, // 日本語名（mig.job.dat.js の名前を優先）
            name_alias: [migJob.name[1]],
            is_rebirthed: (migJob.isRebirthed == 1), // デフォルト値（必要に応じて調整）
            job_type_num: migJob.class,
            job_type_name: jobTypeMap[migJob.class].en ?? "",
            weight_correction: 0, // デフォルト値
            weapons_aspd: {}, // 武器ごとのASPD
            additional_status: {}, // 追加ステータス
            hp_basic_values: [], // HP基本値
            sp_basic_values: [], // SP基本値
            learned_skills: {}, // 習得スキル
            passive_skills: {}, // パッシブスキル
            attack_skills: {}, // 攻撃スキル
            allow_equipment_weapons_type: [], // 装備可能アイテムタイプ
            base_lv_min: jobTypeMap[migJob.class].base_lv_min,
            base_lv_max: jobTypeMap[migJob.class].base_lv_max,
            job_lv_max: jobTypeMap[migJob.class].job_lv_max,
            status_basic_max: jobTypeMap[migJob.class].status_basic_max,
            status_talent_max: jobTypeMap[migJob.class].status_talent_max,
            _mig_id_num: migJob.id,
        };

        // weapons_aspd のマッピング（migJob.weaponsAspd を基に）
        if (Array.isArray(migJob.weaponsAspd)) {
            for (const value of migJob.weaponsAspd) {
                if (Array.isArray(value) && value.length >= 2) {
                    const weapon_type: number = Number(value[0]);
                    const aspd: number = Number(value[1]);
                    jobMapObject[correctJobIdName].weapons_aspd[weapon_type] = aspd;
                }
            }
        }

        // additional_status のマッピング（migJob.additionalStatusJob を基に）
        if (Array.isArray(migJob.additionalStatusJob)) {
            for (const value of migJob.additionalStatusJob) {
                if (Array.isArray(value) && value.length >= 2) {
                    const lv: number = Number(value[0]);
                    const status_num: number = Number(value[1]);
                    const status_name: string = statusMap[status_num] ?? undefined;
                    const status_add_value: number = 1; // 現状は1pt固定
                    jobMapObject[correctJobIdName].additional_status[lv] = {
                        name: status_name,
                        add_value: status_add_value
                    };
                }
            }
        }

        // hp_basic_values のマッピング（migJob.hp を基に）
        if (Array.isArray(migJob.hp)) {
            for (const value of migJob.hp) {
                jobMapObject[correctJobIdName].hp_basic_values.push(Number(value));
            }
        }

        // sp_basic_values のマッピング（migJob.sp を基に）
        if (Array.isArray(migJob.sp)) {
            for (const value of migJob.sp) {
                jobMapObject[correctJobIdName].sp_basic_values.push(Number(value));
            }
        }

        // learned_skills のマッピング（migJob.lernedSkills を基に）
        if (Array.isArray(migJob.lernedSkills)) {
            for (const value of migJob.lernedSkills) {
                const mig_skill_id: number | string | null = value;
                if (typeof mig_skill_id === 'number') {
                    const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                    if (skill_data) {
                        jobMapObject[correctJobIdName].learned_skills[skill_data.id] = {
                            id: skill_data.id,
                            id_num: skill_data.id_num
                        };
                    }
                } else if (typeof mig_skill_id === 'string') {
                    const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                    if (skill_data) {
                        jobMapObject[correctJobIdName].learned_skills[skill_data.id] = {
                            id: skill_data.id,
                            id_num: skill_data.id_num
                        };
                    }
                }
            }
        }

        // passive_skills のマッピング（migJob.passiveSkills を基に）
        if (Array.isArray(migJob.passiveSkills)) {
            for (const value of migJob.passiveSkills) {
                const mig_skill_id: number | string | null = value;
                if (typeof mig_skill_id === 'number') {
                    const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                    if (skill_data) {
                        jobMapObject[correctJobIdName].passive_skills[skill_data.id] = {
                            id: skill_data.id,
                            id_num: skill_data.id_num
                        };
                    }
                } else if (typeof mig_skill_id === 'string') {
                    const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                    if (skill_data) {
                        jobMapObject[correctJobIdName].passive_skills[skill_data.id] = {
                            id: skill_data.id,
                            id_num: skill_data.id_num
                        };
                    }
                }
            }
        }

        // attack_skills のマッピング（migJob.attackSkills を基に）
        if (Array.isArray(migJob.attackSkills)) {
            for (const value of migJob.attackSkills) {
                const mig_skill_id: number | string | null = value;
                if (typeof mig_skill_id === 'number') {
                    const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                    if (skill_data) {
                        jobMapObject[correctJobIdName].attack_skills[skill_data.id] = {
                            id: skill_data.id,
                            id_num: skill_data.id_num
                        };
                    }
                } else if (typeof mig_skill_id === 'string') {
                    const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                    if (skill_data) {
                        jobMapObject[correctJobIdName].attack_skills[skill_data.id] = {
                            id: skill_data.id,
                            id_num: skill_data.id_num
                        };
                    }
                }
            }
        }

        // allow_equipment_weapons_type のマッピング（migJob.equipCategories を基に）
        if (Array.isArray(migJob.equipCategories)) {
            for (const value of migJob.equipCategories) {
                const allow_equipment_weapon_type: number = Number(value);
                if (!isNaN(allow_equipment_weapon_type)) {
                    jobMapObject[correctJobIdName].allow_equipment_weapons_type.push(allow_equipment_weapon_type);
                }
            }
        }

    });

    // 出力（例: 圧縮して保存）
    const compressedJob = await zstdCompress(dumpYAML(jobMapObject, yamlOptions));
    if (compressedJob === null) {
        throw new Error("zstdCompress が null を返しました");
    }
    await fs.writeFile(outYaml, compressedJob);
}

async function parseJobDat(src: string): Promise<{ id: number; name: string; isRebirthed: number; class: number; weightCorrection: number; weaponsAspd: [number, number][]; additionalStatusJob: number[]; hp: number[]; sp: number[]; lernedSkills: number[]; passiveSkills: number[]; attackSkills: number[]; equipCategories: number[] }[]> {
    let code: string;
    try {
        code = await fs.readFile(src, "utf8");
    } catch (e) {
        console.warn(`ファイルが見つかりません: ${src} (${(e as Error).message})`);
        return [];
    }

    // sandbox を作ってファイルを評価
    const sandboxBase: Record<string, any> = {
        g_constDataManager: {
            jobDataManager: {
                sourceArray: []
            }
        },
        // createArithmeticSequence 関数を定義（等差数列を生成）
        createArithmeticSequence: (start: number, step: number, count: number) => {
            const arr: number[] = [];
            for (let i = 0; i < count; i++) {
                arr.push(start + i * step);
            }
            return arr;
        }
    };
    const sandbox = new Proxy(sandboxBase, {
        get(target, prop) {
            if (typeof prop === 'symbol') {
                return undefined; // symbol型のプロパティは無視
            }
            if (prop in target) {
                return target[prop];
            }
            if (typeof prop === 'string' && prop.startsWith('SKILL_ID_')) {
                return undefined; // SKILL_ID_ で始まる定数を無視（undefinedとして扱う）
            }
            return undefined; // その他の未定義プロパティもundefined
        },
        set(target, prop, value) {
            if (typeof prop === 'symbol') {
                return true; // symbol型のプロパティは無視してセットを許可
            }
            target[prop] = value;
            return true;
        }
    });
    vm.createContext(sandbox);
    try {
        new vm.Script(code, { filename: src }).runInContext(sandbox);
    } catch (e) {
        console.warn(`スクリプト評価エラー: ${(e as Error).message}`);
        return [];
    }

    const arr = sandbox.g_constDataManager?.jobDataManager?.sourceArray;
    if (!Array.isArray(arr)) {
        console.warn(`Job sourceArray が見つかりません`);
        return [];
    }

    // 配列をパースして構造化
    const parsedJobs = arr.map((jobData: any[]) => {
        const [id, nameArray, isRebirthed, classNum, weightCorrection, weaponsAspd, additionalStatusJob, hp, sp, lernedSkills, passiveSkills, attackSkills, equipCategories] = jobData;
        return {
            id: Number(id),
            name: Array.isArray(nameArray) && nameArray[0] ? nameArray[0] : "不明",
            isRebirthed: Number(isRebirthed),
            class: Number(classNum),
            weightCorrection: Number(weightCorrection),
            weaponsAspd: Array.isArray(weaponsAspd) ? weaponsAspd : [],
            additionalStatusJob: Array.isArray(additionalStatusJob) ? additionalStatusJob : [],
            hp: Array.isArray(hp) ? hp : [],
            sp: Array.isArray(sp) ? sp : [],
            lernedSkills: Array.isArray(lernedSkills) ? lernedSkills : [],
            passiveSkills: Array.isArray(passiveSkills) ? passiveSkills : [],
            attackSkills: Array.isArray(attackSkills) ? attackSkills : [],
            equipCategories: Array.isArray(equipCategories) ? equipCategories : []
        };
    });

    return parsedJobs;
}

main().catch((e) => {
    console.error(e);
    // @ts-ignore: suppress not found module
    process.exit(1);
});


// TypeScript definitions for job types and migration job IDs

interface JobType {
    en: string;
    ja: string;
    base_lv_min: number;
    base_lv_max: number;
    job_lv_max: number;
    status_basic_max: number;
    status_talent_max: number;
}

interface MigJobId {
    id: number;
    correct?: string;
}

const jobTypeMap: JobType[] = [
    {
        en: "novice",
        ja: "ノービス",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 10,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "rebirthed_novice",
        ja: "転生ノービス",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 10,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "primary_job",
        ja: "1次職",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 50,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "rebirthed_primary_job",
        ja: "転生1次職",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 50,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "secondary_job",
        ja: "2次職",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 50,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "rebirthed_secondary_job",
        ja: "転生2次職",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 70,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "ninja",
        ja: "忍者",
        base_lv_min: 99,
        base_lv_max: 200,
        job_lv_max: 70,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "kwonsung",
        ja: "拳聖",
        base_lv_min: 99,
        base_lv_max: 200,
        job_lv_max: 70,
        status_basic_max: 99,
        status_talent_max: 0,
    },
    {
        en: "third_job",
        ja: "3次職",
        base_lv_min: 90,
        base_lv_max: 200,
        job_lv_max: 70,
        status_basic_max: 130,
        status_talent_max: 0,
    },
    {
        en: "super_novice",
        ja: "スーパーノービス",
        base_lv_min: 1,
        base_lv_max: 99,
        job_lv_max: 50,
        status_basic_max: 130,
        status_talent_max: 0,
    },
    {
        en: "summoner",
        ja: "サモナー",
        base_lv_min: 1,
        base_lv_max: 200,
        job_lv_max: 60,
        status_basic_max: 130,
        status_talent_max: 0,
    },
    {
        en: "fourth_job",
        ja: "4次職",
        base_lv_min: 200,
        base_lv_max: 275,
        job_lv_max: 60,
        status_basic_max: 130,
        status_talent_max: 110,
    }
];

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
    "HI_NOVICE": { id: 34, correct: "HYPER_NOVICE" },
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

/**
 * IDから職業名を取得する関数
 * @param id 職業ID
 * @returns 職業名 [正しい職業名, 職業名]
 */
function getMigJobById(id: number): [string | null, string | null] {
    for (const [name, value] of Object.entries(mig_job_id_map)) {
        if (value.id === id) {
            if (value.correct) {
                return [value.correct, name];
            }
            return [name, name];
        }
    }
    return [null, null];
}

// 必要な関数とマップを追加（例）
const statusMap: Record<number, string> = {
    0: "str",
    1: "agi",
    2: "vit",
    3: "dex",
    4: "int",
    5: "luk",
    6: "pow",
    7: "sta",
    8: "wis",
    9: "spl",
    10: "con",
    11: "crt",
};

// YAMLオプションを定義（Pythonの represent_str に相当）
const yamlOptions = {
    styles: {
        '!!str': (str: string) => {
            if (str.includes('\n')) {
                return '|'; // 改行を含む文字列を | スタイルでダンプ
            }
            return null; // デフォルトスタイル
        }
    },
    replacer: (key: string, value: any) => {
        if (typeof value === 'string' && value.includes('\n')) {
            // 行末のスペースを削除（Pythonの re.sub(' +\n| +$', '\n', instance) に相当）
            return value.replace(/ +\n/g, '\n').replace(/ +$/g, '\n');
        }
        return value;
    }
};

function getSkillByMigId(skillMap: Record<string, SkillDataParameter>, searchKey: number | string): { id: string; id_num: number } | null {
    for (const [key, skill] of Object.entries(skillMap)) {
        if (typeof searchKey === "number" && skill._mig_id_num === searchKey) {
            return { id: key, id_num: skill.id_num };
        } else if (typeof searchKey === "string" && key === searchKey) {
            return { id: key, id_num: skill.id_num };
        }
    }
    return null;
}
