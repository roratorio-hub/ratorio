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
                const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                if (skill_data) {
                    jobMapObject[correctJobIdName].learned_skills[skill_data.id] = {
                        id: skill_data.id,
                        id_num: skill_data.id_num
                    };
                }
            }
        }

        // passive_skills のマッピング（migJob.passiveSkills を基に）
        if (Array.isArray(migJob.passiveSkills)) {
            for (const value of migJob.passiveSkills) {
                const mig_skill_id: number | string | null = value;
                const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                if (mig_skill_id == 814) {
                    //console.log(mig_skill_id, skill_data); // デバッグ用
                }
                if (skill_data) {
                    jobMapObject[correctJobIdName].passive_skills[skill_data.id] = {
                        id: skill_data.id,
                        id_num: skill_data.id_num
                    };
                }
            }
        }

        // attack_skills のマッピング（migJob.attackSkills を基に）
        if (Array.isArray(migJob.attackSkills)) {
            for (const value of migJob.attackSkills) {
                const mig_skill_id: number | string | null = value;
                const skill_data = getSkillByMigId(skillObject, mig_skill_id);
                if (skill_data) {
                    jobMapObject[correctJobIdName].attack_skills[skill_data.id] = {
                        id: skill_data.id,
                        id_num: skill_data.id_num
                    };
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

    // SKILL_ID_* のマップを定義（skill.dat.js に定義されていないものを追加）
    const skillIdMap: Record<string, number> = {
        SKILL_ID_TEIOAPUCHAGI: 339,
        SKILL_ID_RASETSU_HAOGEKI: 617,
        SKILL_ID_TUZYO_KOGEKI: 0,
        SKILL_ID_OKYU_TEATE: 1,
        SKILL_ID_SHINDAFURI: 2,
        SKILL_ID_KEN_SHUREN: 3,
        SKILL_ID_RYOUTKEN_SHUREN: 4,
        SKILL_ID_HP_KAIFUKURYOKU_KOZYO: 5,
        SKILL_ID_BASH: 6,
        SKILL_ID_MAGNUM_BREAK: 7,
        SKILL_ID_PROVOKE: 8,
        SKILL_ID_ENDURE: 9,
        SKILL_ID_IDOZI_HP_KAIFUKU: 10,
        SKILL_ID_KYUSHO_KOGEKI: 11,
        SKILL_ID_AUTO_BERSERK: 12,
        SKILL_ID_DOUBLE_ATTACK: 13,
        SKILL_ID_KAIHIRITSU_ZOKA: 14,
        SKILL_ID_STEAL: 15,
        SKILL_ID_HIDING: 16,
        SKILL_ID_ENVENOM: 17,
        SKILL_ID_GEDOKU: 18,
        SKILL_ID_SUNAMAKI: 19,
        SKILL_ID_BACKSTEP: 20,
        SKILL_ID_ISHIHIROI: 21,
        SKILL_ID_ISHINAGE: 22,
        SKILL_ID_DIVINE_PROTECTION: 23,
        SKILL_ID_DEMON_BANE: 24,
        SKILL_ID_HEAL: 25,
        SKILL_ID_CURE: 26,
        SKILL_ID_SOKUDO_ZOKA: 27,
        SKILL_ID_SOKUDO_GENSHO: 28,
        SKILL_ID_SIGNUM_CRUCIS: 29,
        SKILL_ID_ANGELUS: 30,
        SKILL_ID_BLESSING: 31,
        SKILL_ID_PNEUMA: 32,
        SKILL_ID_AQUA_BENEDICTA: 33,
        SKILL_ID_RUWACH: 34,
        SKILL_ID_TELEPORT: 35,
        SKILL_ID_WARP_PORTAL: 36,
        SKILL_ID_HOLY_LIGHT: 37,
        SKILL_ID_FUKURONO_ME: 38,
        SKILL_ID_WASHINO_ME: 39,
        SKILL_ID_DOUBLE_STRAFING: 40,
        SKILL_ID_ARROW_SHOWER: 41,
        SKILL_ID_SHUCHURYOKU_KOZYO: 42,
        SKILL_ID_YA_SAKUSEI: 43,
        SKILL_ID_CHARGE_ARROW: 44,
        SKILL_ID_SP_KAIFUKURYOKU_KOZYO: 45,
        SKILL_ID_NAPALM_BEAT: 46,
        SKILL_ID_SOUL_STRIKE: 47,
        SKILL_ID_SAFETY_WALL: 48,
        SKILL_ID_STONE_CURSE: 49,
        SKILL_ID_SIGHT: 50,
        SKILL_ID_FIRE_BOLT: 51,
        SKILL_ID_FIRE_BALL: 52,
        SKILL_ID_FIRE_WALL: 53,
        SKILL_ID_COLD_BOLT: 54,
        SKILL_ID_FROST_DIVER: 55,
        SKILL_ID_LIGHTNING_BOLT: 56,
        SKILL_ID_THUNDER_STORM: 57,
        SKILL_ID_ENERGY_COAT: 58,
        SKILL_ID_SHOZIGENKAIRYO_ZOKA: 59,
        SKILL_ID_DISCOUNT: 60,
        SKILL_ID_OVER_CHARGE: 61,
        SKILL_ID_PUSH_CART: 62,
        SKILL_ID_ITEM_KANTE: 63,
        SKILL_ID_ROTEN_KAISETSU: 64,
        SKILL_ID_MAMMONITE: 65,
        SKILL_ID_CART_REVOLUTION: 66,
        SKILL_ID_CHANGE_CART: 67,
        SKILL_ID_LOUD_VOICE: 68,
        SKILL_ID_YARI_SHUREN: 69,
        SKILL_ID_PIERCE: 70,
        SKILL_ID_SPEAR_STUB: 71,
        SKILL_ID_SPEAR_BOOMERANG: 72,
        SKILL_ID_BRANDISH_SPEAR: 73,
        SKILL_ID_TWOHAND_QUICKEN: 74,
        SKILL_ID_AUTO_COUNTER: 75,
        SKILL_ID_BOWLING_BASH: 76,
        SKILL_ID_RIDING: 77,
        SKILL_ID_KIHE_SHUREN: 78,
        SKILL_ID_MIGITE_SHUREN: 79,
        SKILL_ID_HIDARITE_SHUREN: 80,
        SKILL_ID_KATAR_SHUREN: 81,
        SKILL_ID_CLOAKING: 82,
        SKILL_ID_SONIC_BLOW: 83,
        SKILL_ID_GRIM_TOOTH: 84,
        SKILL_ID_ENCHANT_POISON: 85,
        SKILL_ID_POISON_REACT: 86,
        SKILL_ID_VENOM_DUST: 87,
        SKILL_ID_VENOM_SPLASHER: 88,
        SKILL_ID_MACE_SHUREN: 89,
        SKILL_ID_IMPOSITIO_MANUS: 90,
        SKILL_ID_SUFFRAGIUM: 91,
        SKILL_ID_ASPERSIO: 92,
        SKILL_ID_SEITAI_KOFUKU: 93,
        SKILL_ID_SANCTUARY: 94,
        SKILL_ID_RECOVERY: 95,
        SKILL_ID_SLOW_POISON: 96,
        SKILL_ID_RESURRECTION: 97,
        SKILL_ID_KYRIE_ELEISON: 98,
        SKILL_ID_MAGNIFICAT: 99,
        SKILL_ID_GLORIA: 100,
        SKILL_ID_LEX_DIVINA: 101,
        SKILL_ID_TURN_UNDEAD: 102,
        SKILL_ID_LEX_AETERNA: 103,
        SKILL_ID_MAGNUS_EXORCISMUS: 104,
        SKILL_ID_SKID_TRAP: 105,
        SKILL_ID_LAND_MINE: 106,
        SKILL_ID_ANKLESNARE: 107,
        SKILL_ID_FLASHER: 108,
        SKILL_ID_SHOCKWAVE_TRAP: 109,
        SKILL_ID_SANDMAN: 110,
        SKILL_ID_FREEZING_TRAP: 111,
        SKILL_ID_BLAST_MINE: 112,
        SKILL_ID_CLAYMORE_TRAP: 113,
        SKILL_ID_REMOVE_TRAP: 114,
        SKILL_ID_TALKIE_BOX: 115,
        SKILL_ID_BEAST_BANE: 116,
        SKILL_ID_FALCON_MASTERY: 117,
        SKILL_ID_BLITZ_BEAT: 118,
        SKILL_ID_STEEL_CROW: 119,
        SKILL_ID_DETECTING: 120,
        SKILL_ID_SPRING_TRAP: 121,
        SKILL_ID_FIRE_PILLAR: 122,
        SKILL_ID_MONSTER_ZYOHO: 123,
        SKILL_ID_SIGHT_RASHER: 124,
        SKILL_ID_METEOR_STORM: 125,
        SKILL_ID_JUPITER_THUNDER: 126,
        SKILL_ID_LORD_OF_VERMILLION: 127,
        SKILL_ID_WATER_BALL: 128,
        SKILL_ID_ICE_WALL: 129,
        SKILL_ID_FROST_NOVA: 130,
        SKILL_ID_STORM_GUST: 131,
        SKILL_ID_EARTH_SPIKE: 132,
        SKILL_ID_HEAVENS_DRIVE: 133,
        SKILL_ID_QUAGMIRE: 134,
        SKILL_ID_TETSU_SEIZO: 135,
        SKILL_ID_KOTETSU_SEIZO: 136,
        SKILL_ID_ZOKUSEISEKI_SEIZO: 137,
        SKILL_ID_ORIDEOCON_KENKYU: 138,
        SKILL_ID_TANKEN_SEISAKU: 139,
        SKILL_ID_KEN_SEISAKU: 140,
        SKILL_ID_RYOTEKEN_SEISAKU: 141,
        SKILL_ID_ONO_SEISAKU: 142,
        SKILL_ID_MACE_SEISAKU: 143,
        SKILL_ID_KNUCKLE_SEISAKU: 144,
        SKILL_ID_YARI_SEISAKU: 145,
        SKILL_ID_HILT_BINDING: 146,
        SKILL_ID_KOSEKI_HAKKEN: 147,
        SKILL_ID_BUKI_KENKYU: 148,
        SKILL_ID_BUKI_SHURI: 149,
        SKILL_ID_SKIN_TEMPERING: 150,
        SKILL_ID_HAMMER_FALL: 151,
        SKILL_ID_ADRENALINE_RUSH: 152,
        SKILL_ID_WEAPON_PERFECTION: 153,
        SKILL_ID_OVER_TRUST: 154,
        SKILL_ID_MAXIMIZE_POWER: 155,
        SKILL_ID_FAITH: 156,
        SKILL_ID_AUTO_GUARD_OLD: 157,
        SKILL_ID_SHIELD_CHARGE: 158,
        SKILL_ID_SHIELD_BOOMERANG: 159,
        SKILL_ID_REFLECT_SHIELD: 160,
        SKILL_ID_HOLY_CROSS: 161,
        SKILL_ID_GRAND_CROSS: 162,
        SKILL_ID_DEBOTION: 163,
        SKILL_ID_PROVIDENCE: 164,
        SKILL_ID_DEFENDER: 165,
        SKILL_ID_SPEAR_QUICKEN: 166,
        SKILL_ID_SNATCHER: 167,
        SKILL_ID_STEAL_COIN: 168,
        SKILL_ID_BACK_STAB: 169,
        SKILL_ID_TUNNEL_DRIVE: 170,
        SKILL_ID_SURPRISE_ATTACK: 171,
        SKILL_ID_STRIP_WEAPON: 172,
        SKILL_ID_STRIP_SHIELD: 173,
        SKILL_ID_STRIP_ARMER: 174,
        SKILL_ID_STRIP_HELM: 175,
        SKILL_ID_INTIMIDATE: 176,
        SKILL_ID_GRAPHITY: 177,
        SKILL_ID_FLAG_GRAPHITY: 178,
        SKILL_ID_CLEANER: 179,
        SKILL_ID_GANGSTAR_PARADISE: 180,
        SKILL_ID_COMPULSION_DISCOUNT: 181,
        SKILL_ID_CLONE_SKILL: 182,
        SKILL_ID_TEKKEN: 183,
        SKILL_ID_IBUKI: 184,
        SKILL_ID_KIKO: 185,
        SKILL_ID_KIDATSU: 186,
        SKILL_ID_SANDANSHO: 187,
        SKILL_ID_RENDASHO: 188,
        SKILL_ID_MORYUKEN: 189,
        SKILL_ID_ZANEI: 190,
        SKILL_ID_MIKIRI: 191,
        SKILL_ID_SHIDAN: 192,
        SKILL_ID_HAKKEI: 193,
        SKILL_ID_SHIRAHADORI: 194,
        SKILL_ID_BAKURETSU_HADO: 195,
        SKILL_ID_KONGO: 196,
        SKILL_ID_ASHURA_HAOKEN: 197,
        SKILL_ID_GAKKINO_RENSHU: 198,
        SKILL_ID_MUSICAL_STRIKE: 199,
        SKILL_ID_FUKYOWAON: 200,
        SKILL_ID_SAMUI_JOKE: 201,
        SKILL_ID_KUCHIBUE: 202,
        SKILL_ID_YUHINO_ASSASINCROSS: 203,
        SKILL_ID_BRAGINO_UTA: 204,
        SKILL_ID_IDUNNNO_RINGO: 205,
        SKILL_ID_DANCENO_RENSHU: 206,
        SKILL_ID_YAUCHI: 207,
        SKILL_ID_ZIBUNKATTENA_DANCE: 208,
        SKILL_ID_SCREAM: 209,
        SKILL_ID_HUMMING: 210,
        SKILL_ID_WATASHIWO_WASURENAIDE: 211,
        SKILL_ID_KOUNNO_KISS: 212,
        SKILL_ID_SERVICE_FOR_YOU: 213,
        SKILL_ID_ADLIB: 214,
        SKILL_ID_ENCORE: 215,
        SKILL_ID_KOMORIUTA: 216,
        SKILL_ID_NJORDNO_UTAGE: 217,
        SKILL_ID_EIENNO_KONTON: 218,
        SKILL_ID_IKUSADAIKONO_HIBIKI: 219,
        SKILL_ID_NIBELUGENNO_YUBIWA: 220,
        SKILL_ID_LOKINO_SAKEBI: 221,
        SKILL_ID_SHINENNO_NAKANI: 222,
        SKILL_ID_FUZIMINO_SIEGFRIED: 223,
        SKILL_ID_ADVANCED_BOOK: 224,
        SKILL_ID_CAST_CANCEL: 225,
        SKILL_ID_MAGIC_ROD: 226,
        SKILL_ID_SPELL_BREAKER: 227,
        SKILL_ID_FREE_CAST: 228,
        SKILL_ID_AUTO_MAGICIAN_SPELL: 229,
        SKILL_ID_FLAME_LAUNCHER: 230,
        SKILL_ID_FROST_WEAPON: 231,
        SKILL_ID_LIGHTNING_LOADER: 232,
        SKILL_ID_SEISMIC_WEAPON: 233,
        SKILL_ID_DRAGONOLOGY: 234,
        SKILL_ID_VOLCANO: 235,
        SKILL_ID_DELUGE: 236,
        SKILL_ID_VIOLENT_GALE: 237,
        SKILL_ID_LAND_PROTECTOR: 238,
        SKILL_ID_DISPELL: 239,
        SKILL_ID_ABRACADABRA: 240,
        SKILL_ID_ONO_SHUREN: 241,
        SKILL_ID_LEARNING_POTION: 242,
        SKILL_ID_PHARMACY: 243,
        SKILL_ID_ACID_TERROR: 244,
        SKILL_ID_POTION_PITCHER: 245,
        SKILL_ID_BIOPLANT: 246,
        SKILL_ID_SPHERE_MINE: 247,
        SKILL_ID_DEMONSTRATION: 248,
        SKILL_ID_CHEMICAL_WEAPON_CHARGE: 249,
        SKILL_ID_CHEMICAL_SHIELD_CHARGE: 250,
        SKILL_ID_CHEMICAL_ARMER_CHARGE: 251,
        SKILL_ID_CHEMICAL_HELM_CHARGE: 252,
        SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE: 253,
        SKILL_ID_AURA_BLADE: 254,
        SKILL_ID_PARIYING: 255,
        SKILL_ID_CONCENTRATION: 256,
        SKILL_ID_TENTION_RELAX: 257,
        SKILL_ID_BERSERK: 258,
        SKILL_ID_SPIRAL_PIERCE: 259,
        SKILL_ID_HEAD_CRUSH: 260,
        SKILL_ID_JOINT_BEAT: 261,
        SKILL_ID_KATAR_KENKYU: 262,
        SKILL_ID_SOUL_BREAKER: 263,
        SKILL_ID_METEOR_ASSALT: 264,
        SKILL_ID_CREATE_DEADLY_POISON: 265,
        SKILL_ID_ENCHANT_DEADLY_POISON: 266,
        SKILL_ID_ASSUMPTIO: 267,
        SKILL_ID_BASILICA: 268,
        SKILL_ID_MEDITATIO: 269,
        SKILL_ID_TRUE_SIGHT: 270,
        SKILL_ID_FALCON_ASSALT: 271,
        SKILL_ID_SHARP_SHOOTING: 272,
        SKILL_ID_WIND_WALK: 273,
        SKILL_ID_SOUL_DRAIN: 274,
        SKILL_ID_MAGIC_CRUSHER: 275,
        SKILL_ID_MAHORYOKU_ZOFUKU: 276,
        SKILL_ID_NAPALM_VULKAN: 277,
        SKILL_ID_MELTDOWN: 278,
        SKILL_ID_OKANE_SEIZO: 279,
        SKILL_ID_KATAMARI_SEIZO: 280,
        SKILL_ID_CART_BOOST_WS: 281,
        SKILL_ID_UNMEINO_TALOTCARD: 282,
        SKILL_ID_PRESSURE: 283,
        SKILL_ID_SACRIFICE: 284,
        SKILL_ID_GOSPEL: 285,
        SKILL_ID_CHASEWALK: 286,
        SKILL_ID_REJECT_SWORD: 287,
        SKILL_ID_MOKOKOHAZAN: 288,
        SKILL_ID_BUKKOKEN: 289,
        SKILL_ID_RENCHUHOGEKI: 290,
        SKILL_ID_SOUL_COLECT: 291,
        SKILL_ID_ARRAW_VULKAN: 292,
        SKILL_ID_RENKIKO: 293,
        SKILL_ID_MARIONET_CONTROL: 294,
        SKILL_ID_LIFE_CONVERSION: 295,
        SKILL_ID_SOUL_CHANGE: 296,
        SKILL_ID_SOUL_BURN: 297,
        SKILL_ID_MIND_BREAKER: 298,
        SKILL_ID_ALCHEMY: 299,
        SKILL_ID_POTION_SYNAPSE: 300,
        SKILL_ID_SANDAN_DELAY_ZOKA: 301,
        SKILL_ID_TOMAHAWKNAGE: 302,
        SKILL_ID_PULSE_STRIKE: 303,
        SKILL_ID_BERSERK_PITCHER: 304,
        SKILL_ID_TEIOAPUCHAGI_IN_DASH: 305,
        SKILL_ID_VENOM_KNIFE: 306,
        SKILL_ID_FANTASMIC_ARROW: 307,
        SKILL_ID_CHARGE_ATTACK: 308,
        SKILL_ID_SUPER_NOVICE_NODEAD_BONUS: 309,
        SKILL_ID_MARIAGE_STATUS: 310,
        SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER: 311,
        SKILL_ID_DARK_STRIKE: 312,
        SKILL_ID_313: 313,
        SKILL_ID_314: 314,
        SKILL_ID_315: 315,
        SKILL_ID_316: 316,
        SKILL_ID_NUKUMORI: 317,
        SKILL_ID_NUKUMORI_KABE: 318,
        SKILL_ID_HEAVENS_DRIVE_FOR_CLONE: 319,
        SKILL_ID_WATER_BALL_FOR_CLONE: 320,
        SKILL_ID_ASHURA_HAOKEN_SPKOTEI: 321,
        SKILL_ID_MEMORIZE: 322,
        SKILL_ID_323: 323,
        SKILL_ID_SHIELD_CHAIN: 324,
        SKILL_ID_GRAVITATION_FIELD: 325,
        SKILL_ID_CART_TERMINATION: 326,
        SKILL_ID_OVER_TRUST_MAX: 327,
        SKILL_ID_ACID_DEMONSTRATION: 328,
        SKILL_ID_TAIRIGI: 329,
        SKILL_ID_FEORICHAGINO_KAMAE: 330,
        SKILL_ID_FEORICHAGI: 331,
        SKILL_ID_NERYOCHAGINO_KAMAE: 332,
        SKILL_ID_NERYOCHAGI: 333,
        SKILL_ID_TORURYOCHAGINO_KAMAE: 334,
        SKILL_ID_TORURYOCHAGI: 335,
        SKILL_ID_APUCHAORURIGINO_KAMAE: 336,
        SKILL_ID_APUCHAORURIGI: 337,
        SKILL_ID_RAKHO: 338,
        SKILL_ID_ODAYAKANA_KYUSOKU: 340,
        SKILL_ID_TANOSHI_KYUSOKU: 341,
        SKILL_ID_FIGHT: 342,
        SKILL_ID_NOPITIGI: 343,
        SKILL_ID_TAEGWON_MISSION: 344,
        SKILL_ID_TAEGWON_RANKER: 345,
        SKILL_ID_ATATAKAI_KAZE: 346,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO: 347,
        SKILL_ID_TAIYONO_NUKUMORI: 348,
        SKILL_ID_TSUKINO_NUKUMORI: 349,
        SKILL_ID_HOSHINO_NUKUMORI: 350,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI: 351,
        SKILL_ID_TAIYONO_IKARI: 352,
        SKILL_ID_TSUKINO_IKARI: 353,
        SKILL_ID_HOSHINO_IKARI: 354,
        SKILL_ID_TAIYONO_ANRAKU: 355,
        SKILL_ID_TSUKINO_ANRAKU: 356,
        SKILL_ID_HOSHINO_ANRAKU: 357,
        SKILL_ID_TAIYONO_SHUKUFUKU: 358,
        SKILL_ID_TSUKUNO_SHUKUFUKU: 359,
        SKILL_ID_HOSHINO_SHUKUFUKU: 360,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA: 361,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO: 362,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI: 363,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO: 364,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI: 365,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI: 366,
        SKILL_ID_SHUKUFUKU: 367,
        SKILL_ID_KAISEL: 368,
        SKILL_ID_KAAHI: 369,
        SKILL_ID_KAUPU: 370,
        SKILL_ID_KAITO: 371,
        SKILL_ID_KAINA: 372,
        SKILL_ID_ESTIN: 373,
        SKILL_ID_ESTON: 374,
        SKILL_ID_ESMA: 375,
        SKILL_ID_ESU: 376,
        SKILL_ID_ESKA: 377,
        SKILL_ID_ESKU: 378,
        SKILL_ID_SPURT_ZYOTAI: 379,
        SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT: 380,
        SKILL_ID_SONIC_ACCELERATION: 381,
        SKILL_ID_SUNKEI: 382,
        SKILL_ID_CLOSE_CONFINE: 383,
        SKILL_ID_SHIELD_BOOMERANG_TAMASHI: 384,
        SKILL_ID_SUPER_NOVICENO_TAMASHI: 385,
        SKILL_ID_ONEHAND_QUICKEN: 386,
        SKILL_ID_HOLY_LIGHT_TAMASHI: 387,
        SKILL_ID_SONIC_BLOW_TAMASHI: 388,
        SKILL_ID_FULL_ADRENALINE_RUSH: 389,
        SKILL_ID_HUNTERNO_TAMASHI_KOKA: 390,
        SKILL_ID_BEAST_STRAIFING: 391,
        SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI: 392,
        SKILL_ID_TOTEKI_SHUREN: 393,
        SKILL_ID_SHURIKEN_NAGE: 394,
        SKILL_ID_KUNAI_NAGE: 395,
        SKILL_ID_FUMASHURIKEN_NAGE: 396,
        SKILL_ID_ZENI_NAGE: 397,
        SKILL_ID_TATAMI_GAESHI: 398,
        SKILL_ID_KAGETOBI: 399,
        SKILL_ID_KASUMIGIRI: 400,
        SKILL_ID_KAGEKIRI: 401,
        SKILL_ID_UTSUSEMI: 402,
        SKILL_ID_KAGEBUNSHIN: 403,
        SKILL_ID_NEN: 404,
        SKILL_ID_ISSEN: 405,
        SKILL_ID_NINPO_SHUREN: 406,
        SKILL_ID_KOUENKA: 407,
        SKILL_ID_KAENZIN: 408,
        SKILL_ID_RYUENZIN: 409,
        SKILL_ID_HYOSENSO: 410,
        SKILL_ID_SUITON: 411,
        SKILL_ID_TSURARAOTOSHI: 412,
        SKILL_ID_FUZIN: 413,
        SKILL_ID_RAIGEKISAI: 414,
        SKILL_ID_SAKUFU: 415,
        SKILL_ID_COUNT_OF_COIN: 416,
        SKILL_ID_FLYING: 417,
        SKILL_ID_TRIPLE_ACTION: 418,
        SKILL_ID_BULLS_EYE: 419,
        SKILL_ID_MADNESSS_CANCELER: 420,
        SKILL_ID_ADJUSTMENT: 421,
        SKILL_ID_INCREASING_ACCURACY: 422,
        SKILL_ID_MAGICAL_BARRET: 423,
        SKILL_ID_CRACKER: 424,
        SKILL_ID_SINGLE_ACTION: 425,
        SKILL_ID_SNAKE_EYE: 426,
        SKILL_ID_CHAIN_ACTION: 427,
        SKILL_ID_RAPID_SHOWER: 428,
        SKILL_ID_DEATHPERAD: 429,
        SKILL_ID_TRACKING: 430,
        SKILL_ID_DISARM: 431,
        SKILL_ID_PIERCING_SHOT: 432,
        SKILL_ID_GATLING_FEVER: 433,
        SKILL_ID_DUST: 434,
        SKILL_ID_FULL_BASTER: 435,
        SKILL_ID_SPREAD_ATTACK: 436,
        SKILL_ID_GROUND_DRIFT: 437,
        SKILL_ID_ISSEN_MAX: 438,
        SKILL_ID_ENCHANT_BLADE: 439,
        SKILL_ID_SONIC_WAVE: 440,
        SKILL_ID_DEATH_BOUND: 441,
        SKILL_ID_HANDRED_SPEAR: 442,
        SKILL_ID_WIND_CUTTER: 443,
        SKILL_ID_PHANTOM_SLAST: 444,
        SKILL_ID_IGNITION_BREAK: 445,
        SKILL_ID_DRAGON_TRAINING: 446,
        SKILL_ID_FIRE_DRAGON_BREATH: 447,
        SKILL_ID_DRAGON_HOWLING: 448,
        SKILL_ID_RUNE_MASTERY: 449,
        SKILL_ID_GIANT_GROWTH: 450,
        SKILL_ID_VITARITY_ACTIVATION: 451,
        SKILL_ID_STORM_BLAST: 452,
        SKILL_ID_STONE_HARD_SKIN: 453,
        SKILL_ID_FIGHTING_SPIRIT: 454,
        SKILL_ID_AVANDANCE: 455,
        SKILL_ID_CRUSH_STRIKE: 456,
        SKILL_ID_REFRESH: 457,
        SKILL_ID_MILLENNIUM_SHIELD: 458,
        SKILL_ID_VENOM_IMPRESS: 459,
        SKILL_ID_CROSS_IMPACT: 460,
        SKILL_ID_DARK_ILLUSION: 461,
        SKILL_ID_SHINDOKU_KENKYU: 462,
        SKILL_ID_SHINDOKU_SEIZO: 463,
        SKILL_ID_ANTIDOTE: 464,
        SKILL_ID_POISONING_WEAPON: 465,
        SKILL_ID_VENOM_PRESSURE: 466,
        SKILL_ID_POISON_SMOKE: 467,
        SKILL_ID_WEAPON_BLOCKING: 468,
        SKILL_ID_COUNTER_SLASH: 469,
        SKILL_ID_WEAPON_CRUSH: 470,
        SKILL_ID_CLOAKING_EXCEED: 471,
        SKILL_ID_PHANTOM_MENUS: 472,
        SKILL_ID_HALLUCINATION_WALK: 473,
        SKILL_ID_ROLLING_CUTTER: 474,
        SKILL_ID_CROSS_RIPPER_SLASHER: 475,
        SKILL_ID_JUDEX: 476,
        SKILL_ID_ANCILLA: 477,
        SKILL_ID_ADORAMUS: 478,
        SKILL_ID_CLEMENTIA: 479,
        SKILL_ID_CANTOCANDIDUS: 480,
        SKILL_ID_COLUCEO_HEAL: 481,
        SKILL_ID_EPICLESIS: 482,
        SKILL_ID_PRAEFATIO: 483,
        SKILL_ID_ORATIO: 484,
        SKILL_ID_LAUDAAGNUS: 485,
        SKILL_ID_LAUDARAMUS: 486,
        SKILL_ID_EUCHARISTICA: 487,
        SKILL_ID_RENOVATIO: 488,
        SKILL_ID_HIGHNESS_HEAL: 489,
        SKILL_ID_CLEARANCE: 490,
        SKILL_ID_EXPIATIO: 491,
        SKILL_ID_DUPLELIGHT: 492,
        SKILL_ID_SILENTIUM: 493,
        SKILL_ID_SECRAMENT: 494,
        SKILL_ID_RANGER_MAIN: 495,
        SKILL_ID_CAMOUFLAGE: 496,
        SKILL_ID_AIMED_BOLT: 497,
        SKILL_ID_ARROW_STORM: 498,
        SKILL_ID_FEAR_BLEATH: 499,
        SKILL_ID_TRAP_KENKYU: 500,
        SKILL_ID_MAGENTA_TRAP: 501,
        SKILL_ID_COBALT_TRAP: 502,
        SKILL_ID_VERDURE_TRAP: 503,
        SKILL_ID_MAZE_TRAP: 504,
        SKILL_ID_CLUSTER_BOMB: 505,
        SKILL_ID_DETONATOR: 506,
        SKILL_ID_FIRING_TRAP: 507,
        SKILL_ID_ICEBOUND_TRAP: 508,
        SKILL_ID_ELECTRIC_SHOCKER: 509,
        SKILL_ID_WUG_MASTERY: 510,
        SKILL_ID_WUG_BITE: 511,
        SKILL_ID_TOOTH_OF_WUG: 512,
        SKILL_ID_WUG_STRIKE: 513,
        SKILL_ID_EIBINNA_KYUKAKU: 514,
        SKILL_ID_WUG_RIDER: 515,
        SKILL_ID_WUG_DASH: 516,
        SKILL_ID_WHITE_IN_PRISON: 517,
        SKILL_ID_SOUL_EXPANSION: 518,
        SKILL_ID_FROST_MISTY: 519,
        SKILL_ID_JACK_FROST: 520,
        SKILL_ID_MARSH_OF_ABYSS: 521,
        SKILL_ID_RECOGNIZED_SPELL: 522,
        SKILL_ID_SIENNA_EXEXRATE: 523,
        SKILL_ID_RADIUS: 524,
        SKILL_ID_STASIS: 525,
        SKILL_ID_DRAIN_LIFE: 526,
        SKILL_ID_CRYMSON_ROCK: 527,
        SKILL_ID_HELL_INFERNO: 528,
        SKILL_ID_COMMET: 529,
        SKILL_ID_CHAIN_LIGHTNING: 530,
        SKILL_ID_EARTH_STRAIN: 531,
        SKILL_ID_TETRA_BOLTEX: 532,
        SKILL_ID_SUMMON_FIRE_BALL: 533,
        SKILL_ID_SUMMON_WATER_BALL: 534,
        SKILL_ID_SUMMON_LIGHTNING_BALL: 535,
        SKILL_ID_SUMMON_STONE: 536,
        SKILL_ID_RELEASE: 537,
        SKILL_ID_READING_SPELLBOOK: 538,
        SKILL_ID_FREEZING_SPELL: 539,
        SKILL_ID_ONO_SHUREN_MECHANIC: 540,
        SKILL_ID_AXE_TORNADE: 541,
        SKILL_ID_AXE_BOOMERANG: 542,
        SKILL_ID_POWER_SWING: 543,
        SKILL_ID_HITO_DAICHINO_KENKYU: 544,
        SKILL_ID_FAW_SILVER_SNIPER: 545,
        SKILL_ID_FAW_MAGIC_DECOY: 546,
        SKILL_ID_FAW_KAIZYO: 547,
        SKILL_ID_MADOGEAR_LICENSE: 548,
        SKILL_ID_BOOST_KNUCKLE: 549,
        SKILL_ID_PILE_BUNKER: 550,
        SKILL_ID_VULCAN_ARM: 551,
        SKILL_ID_FLAME_THROWER: 552,
        SKILL_ID_COLD_THROWER: 553,
        SKILL_ID_ARMS_CANNON: 554,
        SKILL_ID_ACCELARATION: 555,
        SKILL_ID_HOVERING: 556,
        SKILL_ID_FRONTSIDE_SLIDE: 557,
        SKILL_ID_REARSIDE_SLIDE: 558,
        SKILL_ID_MAINFRAME_KAIZO: 559,
        SKILL_ID_SHAPE_SHIFT: 560,
        SKILL_ID_INFRARED_SCAN: 561,
        SKILL_ID_ANALYZE: 562,
        SKILL_ID_SELF_DESTRUCTION: 563,
        SKILL_ID_EMERGENCY_COOL: 564,
        SKILL_ID_MAGNETIC_FIELD: 565,
        SKILL_ID_NUTRAL_BARRIER: 566,
        SKILL_ID_STEALTH_FIELD: 567,
        SKILL_ID_REPEAR: 568,
        SKILL_ID_CANNON_SPEAR: 569,
        SKILL_ID_BANISHING_POINT: 570,
        SKILL_ID_TRUMPLE: 571,
        SKILL_ID_SHIELD_PRESS: 572,
        SKILL_ID_REFLECT_DAMAGE: 573,
        SKILL_ID_PINGPOINT_ATTACK: 574,
        SKILL_ID_FORCE_OF_BANGUARD: 575,
        SKILL_ID_RAGE_BURST_ATTACK: 576,
        SKILL_ID_SHIELD_SPELL: 577,
        SKILL_ID_EXCEED_BREAK: 578,
        SKILL_ID_OVER_BLAND: 579,
        SKILL_ID_PRESTAGE: 580,
        SKILL_ID_BANDING: 581,
        SKILL_ID_MOON_SLUSHER: 582,
        SKILL_ID_RAY_OF_GENESIS: 583,
        SKILL_ID_PIETY: 584,
        SKILL_ID_EARTH_DRIVE: 585,
        SKILL_ID_HESPERUS_SLIT: 586,
        SKILL_ID_INSPIRATION: 587,
        SKILL_ID_BODY_PAINTING: 588,
        SKILL_ID_MASKARADE_INOVATION: 589,
        SKILL_ID_MASKARADE_GLOOMY: 590,
        SKILL_ID_MASKARADE_IGNORANCE: 591,
        SKILL_ID_MASKARADE_RAGENESS: 592,
        SKILL_ID_MASKARADE_WEEKNESS: 593,
        SKILL_ID_MASKARADE_UNLUCKY: 594,
        SKILL_ID_REPORDUCE: 595,
        SKILL_ID_AUTO_SHADOW_SPELL: 596,
        SKILL_ID_SHADOW_FORM: 597,
        SKILL_ID_DEADLY_INEFFECT: 598,
        SKILL_ID_INVISIBILITY: 599,
        SKILL_ID_MANHOLE: 600,
        SKILL_ID_DEMENSION_DOOR: 601,
        SKILL_ID_BLOODY_LAST: 602,
        SKILL_ID_FAINT_BOMB: 603,
        SKILL_ID_CHAOS_PANIC: 604,
        SKILL_ID_MAELSTORM: 605,
        SKILL_ID_FATAL_MENUS: 606,
        SKILL_ID_STRIP_ACCESSARY: 607,
        SKILL_ID_TRIANGLE_SHOT: 608,
        SKILL_ID_SORYUKYAKU: 609,
        SKILL_ID_TENRACHIMO: 610,
        SKILL_ID_ZIRAISHIN: 611,
        SKILL_ID_BAKKISANDAN: 612,
        SKILL_ID_SHURASHINDAN: 613,
        SKILL_ID_DAITENHOSUI: 614,
        SKILL_ID_GOHO: 615,
        SKILL_ID_RASETSU_HAOGEKI_MAX: 616,
        SKILL_ID_SENPUTAI: 618,
        SKILL_ID_ZYUBAKUZIN: 619,
        SKILL_ID_SENDENPO: 620,
        SKILL_ID_SENRYU_SHOTEN: 621,
        SKILL_ID_SISIKO: 622,
        SKILL_ID_RAIKODAN: 623,
        SKILL_ID_TENKETSU_MOKU: 624,
        SKILL_ID_TENKETSU_KAI: 625,
        SKILL_ID_TENKETSU_KYU: 626,
        SKILL_ID_TENKETSU_HAN: 627,
        SKILL_ID_TENKETSU_KATSU: 628,
        SKILL_ID_KYUKIKO: 629,
        SKILL_ID_HASAICHU: 630,
        SKILL_ID_LESSON: 631,
        SKILL_ID_YASURAGINO_KOMORIUTA: 632,
        SKILL_ID_ZIGOKUNO_UTA: 633,
        SKILL_ID_FUKAKUTEYOSONO_GENGO: 634,
        SKILL_ID_MELANCHOLY: 635,
        SKILL_ID_SIRENNO_KOE: 636,
        SKILL_ID_ZYUNKANSURU_SIZENNO_OTO: 637,
        SKILL_ID_SEISHINO_SAKAIDE: 638,
        SKILL_ID_SHINDOZANKYO: 639,
        SKILL_ID_DOMINION_IMPULSE: 640,
        SKILL_ID_METALIC_SOUND: 641,
        SKILL_ID_SEVERE_RAINSTORM: 642,
        SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI: 643,
        SKILL_ID_ECHONO_UTA: 644,
        SKILL_ID_HARMONIZE: 645,
        SKILL_ID_TSUKIAKARINO_SERENADE: 646,
        SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY: 647,
        SKILL_ID_SWING_DANCE: 648,
        SKILL_ID_LERAORNO_TSUYU: 649,
        SKILL_ID_BEYOND_OF_WARCRY: 650,
        SKILL_ID_MANANO_UTA: 651,
        SKILL_ID_MELODY_OF_THINK: 652,
        SKILL_ID_DANCE_WITH_WUG: 653,
        SKILL_ID_FRIDAY_NIGHT_FEVER: 654,
        SKILL_ID_SOUND_OF_DESTRUCTION: 655,
        SKILL_ID_ENDLESS_HUMMING_VOICE: 656,
        SKILL_ID_GREAT_ECHO: 657,
        SKILL_ID_FIRE_WALK: 658,
        SKILL_ID_ELECTRIC_WALK: 659,
        SKILL_ID_SPELL_FIST: 660,
        SKILL_ID_VACUUM_EXTREME: 661,
        SKILL_ID_PSYCHIC_WAVE: 662,
        SKILL_ID_CLOUD_KILL: 663,
        SKILL_ID_POISON_BUSTER: 664,
        SKILL_ID_STRIKING: 665,
        SKILL_ID_EARTH_GRAVE: 666,
        SKILL_ID_DIAMOND_DUST: 667,
        SKILL_ID_WARMER: 668,
        SKILL_ID_VERATURE_SPEAR: 669,
        SKILL_ID_ARRULLO: 670,
        SKILL_ID_SUMMON_AGNI: 671,
        SKILL_ID_SUMMON_AQUA: 672,
        SKILL_ID_SUMMON_VENTOS: 673,
        SKILL_ID_SUMMON_TERA: 674,
        SKILL_ID_ELEMENTAL_CONTROL: 675,
        SKILL_ID_ELEMENTAL_ACTION: 676,
        SKILL_ID_ELEMENTAL_ANALYSIS: 677,
        SKILL_ID_ELEMENTAL_SYMPASY: 678,
        SKILL_ID_ELEMENTAL_CURE: 679,
        SKILL_ID_FIRE_INSIGNIA: 680,
        SKILL_ID_WATER_INSIGNIA: 681,
        SKILL_ID_WIND_INSIGNIA: 682,
        SKILL_ID_EARTH_INSIGNIA: 683,
        SKILL_ID_PILO_TECHNIC: 684,
        SKILL_ID_CIRCLE_OF_FIRE: 685,
        SKILL_ID_FIRE_ARROW: 686,
        SKILL_ID_HEATER: 687,
        SKILL_ID_FIRE_CLOAK: 688,
        SKILL_ID_FIRE_BOMB: 689,
        SKILL_ID_TOROPIC: 690,
        SKILL_ID_FIRE_MANTLE: 691,
        SKILL_ID_FIRE_WAVE: 692,
        SKILL_ID_AQUA_PLAY: 693,
        SKILL_ID_WATER_SCREEN: 694,
        SKILL_ID_ICE_NEEDLE: 695,
        SKILL_ID_COOLER: 696,
        SKILL_ID_WATER_DROP: 697,
        SKILL_ID_WATER_SCREW: 698,
        SKILL_ID_CHILLY_AIR: 699,
        SKILL_ID_WATER_BARRIER: 700,
        SKILL_ID_TAIDAL_WEAPON: 701,
        SKILL_ID_GAST: 702,
        SKILL_ID_WIND_STEP: 703,
        SKILL_ID_WIND_SLASH: 704,
        SKILL_ID_BLAST: 705,
        SKILL_ID_WIND_CURTAIN: 706,
        SKILL_ID_HURRICANE_RAGE: 707,
        SKILL_ID_WILD_STORM: 708,
        SKILL_ID_XEPHER: 709,
        SKILL_ID_TAYPHOON_MISSILE: 710,
        SKILL_ID_PETROLOGY: 711,
        SKILL_ID_SOLID_SKIN: 712,
        SKILL_ID_STONE_HUMMER: 713,
        SKILL_ID_CURSED_SOIL: 714,
        SKILL_ID_STONE_SHIELD: 715,
        SKILL_ID_ROCK_CRUSHER: 716,
        SKILL_ID_UP_HIEBAL: 717,
        SKILL_ID_POWER_OF_GAIA: 718,
        SKILL_ID_STONE_RAIN: 719,
        SKILL_ID_KEN_SHUREN_GENETIC: 720,
        SKILL_ID_CART_KAIZO: 721,
        SKILL_ID_CART_TORNADO: 722,
        SKILL_ID_CART_CANNON: 723,
        SKILL_ID_CART_BOOST_GENETIC: 724,
        SKILL_ID_CHANGE_MATERIAL: 725,
        SKILL_ID_SLING_ITEM: 726,
        SKILL_ID_SPECIAL_PHARMACY: 727,
        SKILL_ID_MIX_COOKING: 728,
        SKILL_ID_BAKUDAN_SEIZO: 729,
        SKILL_ID_THORN_TRAP: 730,
        SKILL_ID_THORN_WALL: 731,
        SKILL_ID_CRAZY_WEED: 732,
        SKILL_ID_BLOOD_SUCKER: 733,
        SKILL_ID_HELLS_PLANT: 734,
        SKILL_ID_HOWLING_OF_MANDRAGORA: 735,
        SKILL_ID_SPORE_EXPLOSION: 736,
        SKILL_ID_DEMONIC_FIRE: 737,
        SKILL_ID_FIRE_EXPANSION: 738,
        SKILL_ID_MADOGEAR: 739,
        SKILL_ID_SELF_DESTRUCTION_MAX: 740,
        SKILL_ID_GRAHAM_LIGHT: 741,
        SKILL_ID_MIRIAM_LIGHT: 742,
        SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL: 743,
        SKILL_ID_SHIELD_SPELL_ATK_PLUS: 744,
        SKILL_ID_SHIELD_SPELL_DEF_PLUS: 745,
        SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE: 746,
        SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL: 747,
        SKILL_ID_ZENKI_CHUNYU: 748,
        SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL: 749,
        SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO: 750,
        SKILL_ID_AUTO_WUG: 751,
        SKILL_ID_CANCEL_EDP_POISON_ATTACK: 752,
        SKILL_ID_SEVERE_RAINSTORM_EX: 753,
        SKILL_ID_COUNT_OF_RG_FOR_BANDING: 754,
        SKILL_ID_DOUBLE_CASTING: 755,
        SKILL_ID_SHIELD_SPELL_REFLECT: 756,
        SKILL_ID_MANA_RECHARGE: 757,
        SKILL_ID_SHIELD_SPELL_LV_1: 758,
        SKILL_ID_SHIELD_SPELL_LV_2: 759,
        SKILL_ID_CHIMEITEKINA_KIZU: 760,
        SKILL_ID_ATK_FOR_IRON_NAIL: 761,
        SKILL_ID_HELL_JUDGEMENT: 762,
        SKILL_ID_YAMIKUMO: 763,
        SKILL_ID_MIGITE_TANREN: 764,
        SKILL_ID_HIDARITE_TANREN: 765,
        SKILL_ID_ZYUMONZIGIRI: 766,
        SKILL_ID_YOMIGAESHI: 767,
        SKILL_ID_BAKURETSU_KUNAI: 768,
        SKILL_ID_HAPPO_KUNAI: 769,
        SKILL_ID_FUMASHURIKEN_RANKA: 770,
        SKILL_ID_MAKIBISHI: 771,
        SKILL_ID_MUCHANAGE: 772,
        SKILL_ID_MEIKYO_SHISUI: 773,
        SKILL_ID_GENZYUTSU_KAGEMUSHA: 774,
        SKILL_ID_GENZYUTSU_KYOGAKU: 775,
        SKILL_ID_GENZYUTSU_ZYUSATSU: 776,
        SKILL_ID_GENZYUTSU_GENWAKU: 777,
        SKILL_ID_IZAYOI: 778,
        SKILL_ID_HIFU_ENTEN: 779,
        SKILL_ID_HYOFU_FUBUKI: 780,
        SKILL_ID_FUFU_SEIRAN: 781,
        SKILL_ID_DOFU_GOKAI: 782,
        SKILL_ID_ZYUTSUSHIKI_KAIHO: 783,
        SKILL_ID_ZYUTSUSHIKI_TENKAI: 784,
        SKILL_ID_GENZYUTSU_KAGEFUMI: 785,
        SKILL_ID_GENZYUTSU_KYOMUNOKAGE: 786,
        SKILL_ID_GENZYUTSU_BUNSHIN: 787,
        SKILL_ID_GENZYUTSU_ZANGETSU: 788,
        SKILL_ID_GENZYUTSU_KOUGETSU: 789,
        SKILL_ID_GENZYUTSU_OBOROGENSO: 790,
        SKILL_ID_FU_ELEMENT_OF_FU: 791,
        SKILL_ID_FU_COUNT_OF_FU: 792,
        SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU: 793,
        SKILL_ID_WATER_DRAGON_BREATH: 794,
        SKILL_ID_UNLIMIT: 795,
        SKILL_ID_OFFERTORIUM: 796,
        SKILL_ID_DARK_CRAW: 797,
        SKILL_ID_TELECHINESIS_INSTENCE: 798,
        SKILL_ID_SENKO_RENGEKI: 799,
        SKILL_ID_COMBO_SANDAN_MONK: 800,
        SKILL_ID_COMBO_SANDAN_CHAMP: 801,
        SKILL_ID_COMBO_SORYUKYAKU: 802,
        SKILL_ID_COMBO_RESERVED_803: 803,
        SKILL_ID_COMBO_RESERVED_804: 804,
        SKILL_ID_COMBO_RESERVED_805: 805,
        SKILL_ID_COMBO_RESERVED_806: 806,
        SKILL_ID_COMBO_RESERVED_807: 807,
        SKILL_ID_COMBO_RESERVED_808: 808,
        SKILL_ID_COMBO_RESERVED_809: 809,
        SKILL_ID_EARTH_QUAKE: 810,
        SKILL_ID_MAGMA_ILLUPTION: 811,
        SKILL_ID_SERE: 812,
        SKILL_ID_SERE_MODE: 813,
        SKILL_ID_SERE_SUPPORT_SKILL: 814,
        SKILL_ID_HOMLV_FOR_PYROCLASTIC: 815,
        SKILL_ID_PYROCLASTIC: 816,
        SKILL_ID_OVERED_BOOST: 817,
        SKILL_ID_GRANITIC_ARMOR: 818,
        SKILL_ID_PAIN_KILLER: 819,
        SKILL_ID_DEFENCE: 820,
        SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI: 821,
        SKILL_ID_RICHS_COIN: 822,
        SKILL_ID_FALLIN_ANGEL: 823,
        SKILL_ID_SHUTTER_STORM: 824,
        SKILL_ID_MASS_SPIRAL: 825,
        SKILL_ID_ETERNAL_CHAIN: 826,
        SKILL_ID_HOWLING_MINE: 827,
        SKILL_ID_FIRE_RAIN: 828,
        SKILL_ID_FRICKER: 829,
        SKILL_ID_FIRE_DANCE: 830,
        SKILL_ID_BUNISHING_BASTER: 831,
        SKILL_ID_UNTIMATERIAL_BLAST: 832,
        SKILL_ID_QUICKDRAW_SHOT: 833,
        SKILL_ID_DRAGON_TAIL: 834,
        SKILL_ID_ROUND_TRIP: 835,
        SKILL_ID_HEAT_BARREL: 836,
        SKILL_ID_HEAT_BARREL_COIN_COUNT: 837,
        SKILL_ID_SLUG_SHOT: 838,
        SKILL_ID_HAMMER_OF_GOD: 839,
        SKILL_ID_CRYMSON_MARKER: 840,
        SKILL_ID_PLATINUM_ALTER: 841,
        SKILL_ID_PLATINUM_ALTER_COIN_COUNT: 842,
        SKILL_ID_BIND_TRAP: 843,
        SKILL_ID_HOWLING_MINE_APPEND: 844,
        SKILL_ID_AS_QUICKDRAW: 845,
        SKILL_ID_KIHON_SKILL: 846,
        SKILL_ID_REDEMPTIO: 847,
        SKILL_ID_SIGHT_BLASTER: 848,
        SKILL_ID_GREED: 849,
        SKILL_ID_FAKE_ZENY: 850,
        SKILL_ID_AUTO_GUARD: 851,
        SKILL_ID_SHRINK: 852,
        SKILL_ID_KIKO_TENI: 853,
        SKILL_ID_CREATE_CONVERTER: 854,
        SKILL_ID_FIRE_ELEMENTAL_CHANGE: 855,
        SKILL_ID_WATER_ELEMENTAL_CHANGE: 856,
        SKILL_ID_WIND_ELEMENTAL_CHANGE: 857,
        SKILL_ID_EARTH_ELEMENTAL_CHANGE: 858,
        SKILL_ID_SEIMEI_RINRI: 859,
        SKILL_ID_ANSOKU: 860,
        SKILL_ID_CALL_HOMUNCULUS: 861,
        SKILL_ID_RESURRECTION_HOMUNCULUS: 862,
        SKILL_ID_GANBANTEIN: 863,
        SKILL_ID_BUKISEIREN: 864,
        SKILL_ID_PRESSURE_MISS: 865,
        SKILL_ID_FULL_STRIP: 866,
        SKILL_ID_PRESERVE: 867,
        SKILL_ID_WATASHIWO_SHIBARANAIDE: 868,
        SKILL_ID_HELLMODENO_TUE: 869,
        SKILL_ID_TSUKIAKARINO_SHITADE: 870,
        SKILL_ID_SEIMEIRYOKU_HENKAN: 871,
        SKILL_ID_SPIDER_WEB: 872,
        SKILL_ID_WALL_OF_FOG: 873,
        SKILL_ID_SLIMPOTION_PITCHER: 874,
        SKILL_ID_FULL_CHEMICAL_CHARGE: 875,
        SKILL_ID_SHOKUBUTSU_SAIBAI: 876,
        SKILL_ID_KNIGHTNO_TAMASHI: 877,
        SKILL_ID_ASSASINNO_TAMASHI: 878,
        SKILL_ID_PRIESTNO_TAMASHI: 879,
        SKILL_ID_HUNTERNO_TAMASHI: 880,
        SKILL_ID_WIZARDNO_TAMASHI: 881,
        SKILL_ID_BLACKSMITHNO_TAMASHI: 882,
        SKILL_ID_CRUSADERNO_TAMASHI: 883,
        SKILL_ID_ROGUENO_TAMASHI: 884,
        SKILL_ID_MONKNO_TAMASHI: 885,
        SKILL_ID_BARDTO_DANCERNO_TAMASHI: 886,
        SKILL_ID_SAGENO_TAMASHI: 887,
        SKILL_ID_ALCHEMISTNO_TAMASHI: 888,
        SKILL_ID_KENSENO_TAMASHI: 889,
        SKILL_ID_SOULLINKERNO_TAMASHI: 890,
        SKILL_ID_FLIP_THE_COIN: 891,
        SKILL_ID_KINGS_GRACE: 892,
        SKILL_ID_ESCAPE: 893,
        SKILL_ID_FRIGNO_UTA: 894,
        SKILL_ID_ELEMENTAL_SHIELD: 895,
        SKILL_ID_ILLUSION_DOOPING: 896,
        SKILL_ID_DARK_CROSS: 897,
        SKILL_ID_INTIMIDATE_FOR_CLONE: 898,
        SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT: 899,
        SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE: 900,
        SKILL_ID_FULLSLOT: 901,
        SKILL_ID_DORAM_KIHON_SKILL: 902,
        SKILL_ID_KAMITSUKU: 903,
        SKILL_ID_KAKURERU: 904,
        SKILL_ID_HIKKAKU: 905,
        SKILL_ID_UZUKUMARU: 906,
        SKILL_ID_NYAN_JAMP: 907,
        SKILL_ID_NYAN_TAMASHI: 908,
        SKILL_ID_SOUL_ATTACK: 909,
        SKILL_ID_SHINSENNA_EBI: 910,
        SKILL_ID_EBI_ZANMAI: 911,
        SKILL_ID_OTORO: 912,
        SKILL_ID_MAGURO_SHIELD: 913,
        SKILL_ID_UMINO_CHIKARA: 914,
        SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI: 915,
        SKILL_ID_GROOMING: 916,
        SKILL_ID_NODOWO_NARASU: 917,
        SKILL_ID_EBI_PARTY: 918,
        SKILL_ID_UMINO_TAMASHI: 919,
        SKILL_ID_MATATABI_LANCE: 920,
        SKILL_ID_MATATABINO_NEKKO: 921,
        SKILL_ID_INUHAKKA_METEOR: 922,
        SKILL_ID_INUHAKKA_SHOWER: 923,
        SKILL_ID_DAICHINO_CHIKARA: 924,
        SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI: 925,
        SKILL_ID_CHATTERING: 926,
        SKILL_ID_MYAUMYAU: 927,
        SKILL_ID_NYAN_GRASS: 928,
        SKILL_ID_DAICHINO_TAMASHI: 929,
        SKILL_ID_PIKKI_TSUKI: 930,
        SKILL_ID_ARCLOUSE_DASH: 931,
        SKILL_ID_TAROUNO_KIZU: 932,
        SKILL_ID_CARROT_BEAT: 933,
        SKILL_ID_SEIMEINO_CHIKARA: 934,
        SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI: 935,
        SKILL_ID_KEIKAI: 936,
        SKILL_ID_MURENO_CHIKARA: 937,
        SKILL_ID_SAVAGENO_TAMASHI: 938,
        SKILL_ID_SEIMEINO_TAMASHI: 939,
        SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO: 940,
        SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER: 941,
        SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS: 942,
        SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP: 943,
        SKILL_ID_BREAK_THROUGH: 944,
        SKILL_ID_TRANSCENDENCE: 945,
        SKILL_ID_TENSHISAMA_TASUKETE: 946,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU: 947,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA: 948,
        SKILL_ID_TAIYONO_KAMAE: 949,
        SKILL_ID_KOEN_KYAKU: 950,
        SKILL_ID_TAIYO_BAKUHATSU: 951,
        SKILL_ID_TAIYONO_HIKARI: 952,
        SKILL_ID_TSUKINO_KAMAE: 953,
        SKILL_ID_SAKUGETSU_KYAKU: 954,
        SKILL_ID_MANGETSU_KYAKU: 955,
        SKILL_ID_TSUKINO_HIKARI: 956,
        SKILL_ID_HOSHINO_KAMAE: 957,
        SKILL_ID_SENKO_KYAKU: 958,
        SKILL_ID_RYUSE_RAKKA: 959,
        SKILL_ID_HOSHINO_HIKARI: 960,
        SKILL_ID_UCHUNO_KAMAE: 961,
        SKILL_ID_ZYURYOKU_CHOSE: 962,
        SKILL_ID_SHINSE_BAKUHATSU: 963,
        SKILL_ID_SEITE_KORIN: 964,
        SKILL_ID_SOSENO_SHO: 965,
        SKILL_ID_ZIGENNO_SHO: 966,
        SKILL_ID_ESHA: 967,
        SKILL_ID_ESPA: 968,
        SKILL_ID_ESFU: 969,
        SKILL_ID_KAUTO: 970,
        SKILL_ID_TAMASHINO_CHIKUSEKI: 971,
        SKILL_ID_TAMASHINO_SHUKAKU: 972,
        SKILL_ID_TAMASHINO_ZYUNKAN: 973,
        SKILL_ID_TAMASHINO_RENKETSU: 974,
        SKILL_ID_SOUL_ENERGY_KENKYU: 975,
        SKILL_ID_SHIRYO_HYOI: 976,
        SKILL_ID_SHIRYO_BAKUHATSU: 977,
        SKILL_ID_TAMASHINO_BUNRETSU: 978,
        SKILL_ID_TAKANO_TAMASHI: 979,
        SKILL_ID_YOSENO_TAMASHI: 980,
        SKILL_ID_KAGENO_TAMASHI: 981,
        SKILL_ID_GOLEMNO_TAMASHI: 982,
        SKILL_ID_TAMASHINO_HOKAI: 983,
        SKILL_ID_COUNT_OF_SOUL_ENERGY: 984,
        SKILL_ID_RYUSE_RAKKA_MODE: 985,
        SKILL_ID_PEONY_MAMY: 986,
        SKILL_ID_PISHARI_HERB: 987,
        SKILL_ID_SEKAIZYUNO_HOKORI: 988,
        SKILL_ID_SNOW_FLIP: 989,
        SKILL_ID_SHOZIGENKAIRYO_ZOKA_R: 990,
        SKILL_ID_VAMPIRE_GIFT: 991,
        SKILL_ID_MIWAKUNO_WINK: 992,
        SKILL_ID_SERIES_SEA_FOOD: 993,
        SKILL_ID_SERIES_PLANT: 994,
        SKILL_ID_SERIES_ANIMAL: 995,
        SKILL_ID_STONE_SKIN: 996,
        SKILL_ID_CRITICAL_WOUNDS: 997,
        SKILL_ID_ODINNO_CHIKARA: 998,
        SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT: 999,
        SKILL_ID_TUZYO_KOGEKI_CALC_LEFT: 1000,
        SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND: 1001,
        SKILL_ID_SERVANT_WEAPON: 1002,
        SKILL_ID_SERVANT_WEAPON_SIGN: 1003,
        SKILL_ID_SERVANT_WEAPON_PHANTOM: 1004,
        SKILL_ID_SERVANT_WEAPON_DEMOLISION: 1005,
        SKILL_ID_CHARGING_PIERCE: 1006,
        SKILL_ID_TWOHAND_DEFENDING: 1007,
        SKILL_ID_HACK_AND_SLASHER: 1008,
        SKILL_ID_DRAGONIC_AURA: 1009,
        SKILL_ID_MADNESS_CRUSHER: 1010,
        SKILL_ID_VIGOR: 1011,
        SKILL_ID_STORM_SLASH: 1012,
        SKILL_ID_DANCING_KNIFE: 1013,
        SKILL_ID_SAVAGE_IMPACT: 1014,
        SKILL_ID_SHADOW_SENSE: 1015,
        SKILL_ID_ETERNAL_SLASH: 1016,
        SKILL_ID_ENCHANTING_SHADOW: 1017,
        SKILL_ID_POTENT_VENOM: 1018,
        SKILL_ID_SHADOW_EXCEED: 1019,
        SKILL_ID_FATAL_SHADOW_CRAW: 1020,
        SKILL_ID_SHADOW_STAB: 1021,
        SKILL_ID_IMPACT_CRATER: 1022,
        SKILL_ID_REPARATIO: 1023,
        SKILL_ID_MEDIA_REBOTUM: 1024,
        SKILL_ID_DONKI_HON_SHUREN: 1025,
        SKILL_ID_ARUGUTUS_VITA: 1026,
        SKILL_ID_ARUGUTUS_TERUM: 1027,
        SKILL_ID_ARBITRIUM: 1028,
        SKILL_ID_PRESENSE_AKYACE: 1029,
        SKILL_ID_FIDOS_ANIMUS: 1030,
        SKILL_ID_EFIRIGO: 1031,
        SKILL_ID_CONPETENTIA: 1032,
        SKILL_ID_NUMATIC_PROCERA: 1033,
        SKILL_ID_DILECTIO_HEAL: 1034,
        SKILL_ID_RERIGIO: 1035,
        SKILL_ID_BENEDICTUM: 1036,
        SKILL_ID_PETITIO: 1037,
        SKILL_ID_PETITIO_LEARNED: 1038,
        SKILL_ID_PHREMEN: 1039,
        SKILL_ID_ADVANCED_TRAP: 1040,
        SKILL_ID_WIND_SIGN: 1041,
        SKILL_ID_SHIZEN_SHINWA: 1042,
        SKILL_ID_HAWK_RUSH: 1043,
        SKILL_ID_HAWK_MASTERY: 1044,
        SKILL_ID_CALAMITY_GALE: 1045,
        SKILL_ID_HAWK_BOOMERANG: 1046,
        SKILL_ID_GALE_STORM: 1047,
        SKILL_ID_DEEP_BLIND_TRAP: 1048,
        SKILL_ID_SOLID_TRAP: 1049,
        SKILL_ID_SWIFT_TRAP: 1050,
        SKILL_ID_CRESSIVE_VOLT: 1051,
        SKILL_ID_FLAME_TRAP: 1052,
        SKILL_ID_DEADLY_PROJECTION: 1053,
        SKILL_ID_DESTRACTIVE_HURRICANE: 1054,
        SKILL_ID_CLIMAX_HURRICANE_STATE: 1055,
        SKILL_ID_RAIN_OF_CRYSTAL: 1056,
        SKILL_ID_MYSTERY_ILLUSION: 1057,
        SKILL_ID_VIOLENT_QUAKE: 1058,
        SKILL_ID_SOUL_VULKUN_STRIKE: 1059,
        SKILL_ID_STRATUM_TREAMER: 1060,
        SKILL_ID_ALL_BLOOM: 1061,
        SKILL_ID_CRYSTAL_IMPACT: 1062,
        SKILL_ID_TORNADE_STORM: 1063,
        SKILL_ID_FLORAL_FLARE_ROAD: 1064,
        SKILL_ID_CLIMAX: 1065,
        SKILL_ID_ASTRAL_STRIKE: 1066,
        SKILL_ID_ROCK_DOWN: 1067,
        SKILL_ID_STORM_CANNON: 1068,
        SKILL_ID_CRYMSON_ARROW: 1069,
        SKILL_ID_FROZEN_SLASH: 1070,
        SKILL_ID_RYOTETUSE_SHUREN: 1071,
        SKILL_ID_AXE_STOMP: 1072,
        SKILL_ID_RUSH_QUAKE: 1073,
        SKILL_ID_RUSH_STATE: 1074,
        SKILL_ID_SOCHI_SEIZO: 1075,
        SKILL_ID_KOGEKI_SOCHI_YUKOKA: 1076,
        SKILL_ID_BOGYO_SOCHI_YUKOKA: 1077,
        SKILL_ID_TWO_AXE_DEFENDING: 1078,
        SKILL_ID_ABR_MASTERY: 1079,
        SKILL_ID_ABR_BATTLE_WARRIER: 1080,
        SKILL_ID_ABR_DUAL_CANNON: 1081,
        SKILL_ID_ABR_MOTHER_NET: 1082,
        SKILL_ID_ABR_INFINITY: 1083,
        SKILL_ID_GUARD_STANCE: 1084,
        SKILL_ID_GUARDIAN_SHIELD: 1085,
        SKILL_ID_REBOUND_SHIELD: 1086,
        SKILL_ID_TATE_SHUREN: 1087,
        SKILL_ID_YARI_KATATE_KEN_SHUREN: 1088,
        SKILL_ID_ATTACK_STANCE: 1089,
        SKILL_ID_ULTIMATE_SACRIFICE: 1090,
        SKILL_ID_HOLY_SHIELD: 1091,
        SKILL_ID_GRAND_JUDGEMENT: 1092,
        SKILL_ID_JUDGEMENT_CROSS: 1093,
        SKILL_ID_SHIELD_SHOOTING: 1094,
        SKILL_ID_OVER_SLASH: 1095,
        SKILL_ID_CROSS_RAIN: 1096,
        SKILL_ID_TANKEN_YUMI_SHUREN: 1097,
        SKILL_ID_MAHOKEN_SHUREN: 1098,
        SKILL_ID_STRIP_SHADOW: 1099,
        SKILL_ID_ABYSS_DAGGER: 1100,
        SKILL_ID_UNLUCKY_RUSH: 1101,
        SKILL_ID_CHAIN_REACTION_SHOT: 1102,
        SKILL_ID_FROM_THE_ABYSS: 1103,
        SKILL_ID_ABYSS_SLAYER: 1104,
        SKILL_ID_OMEGA_ABYSS_STRIKE: 1105,
        SKILL_ID_DEFT_STAB: 1106,
        SKILL_ID_ABYSS_SQUARE: 1107,
        SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL: 1108,
        SKILL_ID_FLANGE_SHOT: 1109,
        SKILL_ID_KYOZINNA_SHINNEN: 1110,
        SKILL_ID_KENKONA_SHINNEN: 1111,
        SKILL_ID_SHINKONO_ISHI: 1112,
        SKILL_ID_SEYU_SENRE: 1113,
        SKILL_ID_CHUZITSUNA_SHINNEN: 1114,
        SKILL_ID_DAIICHIGEKI_RAKUIN: 1115,
        SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA: 1116,
        SKILL_ID_DAISANGEKI_DANZAI: 1117,
        SKILL_ID_DAISANGEKI_MEKKAGEKI: 1118,
        SKILL_ID_DAISANGEKI_ZYOKA: 1119,
        SKILL_ID_DAINIGEKI_METSUMANO_HI: 1120,
        SKILL_ID_DAINIGEKI_SHINNEN: 1121,
        SKILL_ID_DAINIGEKI_SHINPAN: 1122,
        SKILL_ID_BAKKA_SHINDAN: 1123,
        SKILL_ID_ENKA_METSUMA_SHINDAN: 1124,
        SKILL_ID_DAINISHO_SHIPANSHA: 1125,
        SKILL_ID_SAISHUSHO_METSUMANO_HONO: 1126,
        SKILL_ID_STAGE_MANNER: 1127,
        SKILL_ID_KAISO: 1128,
        SKILL_ID_MYSTIC_SYMPHONY: 1129,
        SKILL_ID_SONATA_OF_KUVASIL: 1130,
        SKILL_ID_ROSE_BLOSSOM: 1131,
        SKILL_ID_RHYTHM_SHOOTING: 1132,
        SKILL_ID_METALIC_FURY: 1133,
        SKILL_ID_SOUND_BLEND: 1134,
        SKILL_ID_GEFFENIA_NOCTURNE: 1135,
        SKILL_ID_LOKINO_KIMAGURE: 1136,
        SKILL_ID_KOINNO_RHAPSODY: 1137,
        SKILL_ID_MUSICAL_INTERLUDE: 1138,
        SKILL_ID_YUYAKENO_SERENADE: 1139,
        SKILL_ID_SHISHATACHIHENO_REQUIEM: 1140,
        SKILL_ID_PRONTERA_MARCH: 1141,
        SKILL_ID_MAHO_HON_SHUREN: 1142,
        SKILL_ID_SPELL_ENCHANTING: 1143,
        SKILL_ID_ACTIVITY_BURN: 1144,
        SKILL_ID_INCREASING_ACTIVITY: 1145,
        SKILL_ID_DIAMOND_STORM: 1146,
        SKILL_ID_LIGHTNING_LAND: 1147,
        SKILL_ID_VENOM_SWAMP: 1148,
        SKILL_ID_CONFLAGRATION: 1149,
        SKILL_ID_TERA_DRIVE: 1150,
        SKILL_ID_ELEMENTAL_SPIRIT_MASTERY: 1151,
        SKILL_ID_SUMMON_ALDOR: 1152,
        SKILL_ID_SUMMON_DILBIO: 1153,
        SKILL_ID_SUMMON_PROCERA: 1154,
        SKILL_ID_SUMMON_TELEMOTUS: 1155,
        SKILL_ID_SUMMON_SERPENSE: 1156,
        SKILL_ID_ELEMENTAL_BASTER: 1157,
        SKILL_ID_ELEMENTAL_VEIL: 1158,
        SKILL_ID_BIONIC_PHARMACY: 1159,
        SKILL_ID_BIONICS_MASTERY: 1160,
        SKILL_ID_HALL_FULL_CHEMICAL_CHARGE: 1161,
        SKILL_ID_FULL_SHADOW_CHARGE: 1162,
        SKILL_ID_ACIDIFIED_ZONE_MIZU: 1163,
        SKILL_ID_ACIDIFIED_ZONE_CHI: 1164,
        SKILL_ID_ACIDIFIED_ZONE_HI: 1165,
        SKILL_ID_ACIDIFIED_ZONE_KAZE: 1166,
        SKILL_ID_CREATE_WOODEN_WARRIER: 1167,
        SKILL_ID_CREATE_WOODEN_FAIRY: 1168,
        SKILL_ID_CREATE_CREAPER: 1169,
        SKILL_ID_RESEARCH_REPORT: 1170,
        SKILL_ID_CREATE_HELL_TREE: 1171,
        SKILL_ID_DRAGONIC_AURA_STATE: 1172,
        SKILL_ID_TENKI_SHUREN: 1173,
        SKILL_ID_HYOHO_SHUREN: 1174,
        SKILL_ID_TENCHI_ICHIYO: 1175,
        SKILL_ID_TAITEN_ICHIYO: 1176,
        SKILL_ID_TENYO: 1177,
        SKILL_ID_TENCHI_ICHIGETSU: 1178,
        SKILL_ID_TAITEN_ICHIGETSU: 1179,
        SKILL_ID_TENGETSU: 1180,
        SKILL_ID_TENCHI_BANSE: 1181,
        SKILL_ID_TENME_RAKUSE: 1182,
        SKILL_ID_TENSE: 1183,
        SKILL_ID_TENRA_BANSHO: 1184,
        SKILL_ID_TENKINO_MI: 1185,
        SKILL_ID_UNKONO_ZYOTAI: 1186,
        SKILL_ID_GOFU_SHUREN: 1187,
        SKILL_ID_REIDOZYUTSU_SHUREN: 1188,
        SKILL_ID_SHUGO_FU: 1189,
        SKILL_ID_BUSHI_FU: 1190,
        SKILL_ID_HOSHI_FU: 1191,
        SKILL_ID_GOKON_ISSHIN: 1192,
        SKILL_ID_ZYOKODO: 1193,
        SKILL_ID_GOGYO_FU: 1194,
        SKILL_ID_REIDO_FU: 1195,
        SKILL_ID_SHIRYO_ZYOKA: 1196,
        SKILL_ID_SEIRYU_FU: 1197,
        SKILL_ID_BYAKKO_FU: 1198,
        SKILL_ID_SUZAKU_FU: 1199,
        SKILL_ID_GENBU_FU: 1200,
        SKILL_ID_SHIHOZIN_FU: 1201,
        SKILL_ID_SHIHO_GOGYO_ZIN: 1202,
        SKILL_ID_TENCHI_SHINRE: 1203,
        SKILL_ID_SHIHO_FU_ZYOTAI: 1204,
        SKILL_ID_SPIRIT_MASTERY: 1205,
        SKILL_ID_SANREI_ITTAI: 1206,
        SKILL_ID_NYAN_BRESSING: 1207,
        SKILL_ID_MARIN_FESTIVAL: 1208,
        SKILL_ID_SAND_FESTIVAL: 1209,
        SKILL_ID_DOKUGAKU_SENTOGAKU: 1210,
        SKILL_ID_DOKUGAKU_MADOGAKU: 1211,
        SKILL_ID_PFI: 1212,
        SKILL_ID_GRENADE_MASTERY: 1213,
        SKILL_ID_INTENSIVE_AIM: 1214,
        SKILL_ID_HIDDEN_CARD: 1215,
        SKILL_ID_ONLY_ONE_BULLET: 1216,
        SKILL_ID_SPIRAL_SHOOTING: 1217,
        SKILL_ID_MAGAZIN_FOR_ONE: 1218,
        SKILL_ID_VIGILANT_AT_NIGHT: 1219,
        SKILL_ID_WILD_FIRE: 1220,
        SKILL_ID_TIGER_SLASH: 1221,
        SKILL_ID_TIGER_HOWLING: 1222,
        SKILL_ID_TIGER_STRIKE: 1223,
        SKILL_ID_NYANTOMO_TEKKO: 1224,
        SKILL_ID_KAGE_NO_MAI: 1225,
        SKILL_ID_KAGE_ISSEN: 1226,
        SKILL_ID_KAGE_GARI: 1227,
        SKILL_ID_GENJUTSU_KAGE_NUI: 1228,
        SKILL_ID_FUMASHURIKEN_SHOUAKU: 1229,
        SKILL_ID_FUMASHURIKEN_KOUCHIKU: 1230,
        SKILL_ID_JUPITER_THUNDER_STORM: 1231,
        SKILL_ID_HELLS_DRIVE: 1232,
        SKILL_ID_NAPALM_VULKAN_STRIKE: 1233,
        SKILL_ID_METEOR_STORM_BUSTER: 1234,
        SKILL_ID_DOUBLE_BOWLING_BASH: 1235,
        SKILL_ID_MEGA_SONIC_BLOW: 1236,
        SKILL_ID_SPARK_BLASTER: 1237,
        SKILL_ID_TRIPLE_LASER: 1238,
        SKILL_ID_EXPLOSIVE_POWDER: 1239,
        SKILL_ID_MEYHEMIC_THORNS: 1240,
        SKILL_ID_DRAGONIC_BREATH: 1241,
        SKILL_ID_MIGHTY_SMASH: 1242,
        SKILL_ID_AXE_STOMP_STATUS: 1243,
        SKILL_ID_SHIELD_SHOOTING_STATE: 1244,
        SKILL_ID_GRAND_JUDGEMENT_STATE: 1245,
        SKILL_ID_NYANTOMO_KENROKU: 1246,
        SKILL_ID_DEER_CANON: 1247,
        SKILL_ID_DEER_BREEZE: 1248,
        SKILL_ID_BASIC_GRENADE: 1249,
        SKILL_ID_HASTY_FIRE_IN_THE_HOLE: 1250,
        SKILL_ID_GRENADES_DROPPING: 1251,
        SKILL_ID_MISSION_BOMBARD: 1252,
        SKILL_ID_SEKIEN_HOU: 1253,
        SKILL_ID_REIKETSU_HOU: 1254,
        SKILL_ID_RAIDEN_HOU: 1255,
        SKILL_ID_KINNRYUU_HOU: 1256,
        SKILL_ID_ANTEN_HOU: 1257,
        SKILL_ID_GENZYUTSU_ANKOKURYUU: 1258,
        SKILL_ID_ANTEN_HOU_LEARNED_LEVEL: 1259,
        SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI: 1260,	// 今日の日付（太陽の日、月の日、星の日の判定用）
        SKILL_ID_KAGEMOGURI: 1261,
        SKILL_ID_KAGETOKI: 1262,
        SKILL_ID_KUNAI_WAIKYOKU: 1263,
        SKILL_ID_KUNAI_KAITEN: 1264,
        SKILL_ID_KUNAI_KUSSETSU: 1265,
        SKILL_ID_GENJUTSU_KUNAI: 1266,
        SKILL_ID_SHIELD_CHAIN_RUSH: 1267,
        SKILL_ID_SPIRAL_PIERCE_MAX: 1268,
        SKILL_ID_JACK_FROST_NOVA: 1269,
        SKILL_ID_GROUND_GRAVITATION: 1270,
        SKILL_ID_BREAKING_LIMIT_STATE: 1271,
        SKILL_ID_RULE_BREAK_STATE: 1272,
        SKILL_ID_ABYSS_DAGGER_STATE: 1273,
    };

    // sandbox を作ってファイルを評価
    const sandboxBase: Record<string, any> = {
        ...skillIdMap,  // SKILL_ID_* を sandboxBase に追加
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
            // SKILL_ID_ で始まるプロパティは、定義されていればそのまま使用（未定義の場合は undefined）
            if (typeof prop === 'string' && prop.startsWith('SKILL_ID_')) {
                return target[prop];  // 定義されていれば値、未定義なら undefined
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

    // mig.job.dat.js を評価
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
        job_lv_max: 99,
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
