import { load as loadYAML, dump as dumpYAML } from "js-yaml"
import { ItemData, ItemMap } from "./loadItemMap";
import { zstdCompress, zstdDecompress } from "./funcZstd";

const RTX_SUPPORT_VERSION = 2;

// Base64 → Uint8Array（URLセーフに対応）
function base64ToUint8Array(base64: string): Uint8Array {
    // パディングの補完
    let paddedBase = base64.replace(/-/g, '+').replace(/_/g, '/');
    const padding = paddedBase.length % 4;
    if (padding === 2) paddedBase += '==';
    else if (padding === 3) paddedBase += '=';

    const binaryString = atob(paddedBase);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Uint8Array → Base64（URLセーフ対応）
function uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    let base64 = btoa(binary);
    // URLセーフ変換
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64;
}

// Decode => 展開 => YAML load
async function decodeProcess(encodedData: string): Promise<RtxDataFormat | null> {
    let dataObject: RtxDataFormat | null = null;
    try {
        // デコード => 圧縮データ
        const compressedData = base64ToUint8Array(encodedData);

        // zstdで展開
        const yamlData = await zstdDecompress(compressedData);

        if (yamlData) {
            //console.debug(yamlData);
            // YAML文字列 => JavaScriptオブジェクト
            dataObject = loadYAML(yamlData) as RtxDataFormat;
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
    return dataObject;
}

// YAML dump => 圧縮 => Encode
async function encodeProcess(dataObject: RtxDataFormat): Promise<string | null> {
    let encodedData: string | null = null;
    try {
        // YAMLオブジェクト => YAML文字列
        const yamlData = dumpYAML(dataObject);

        // zstdで圧縮
        const compressedData = await zstdCompress(yamlData);

        if (compressedData) {
            // 圧縮データ => 文字列
            encodedData = uint8ArrayToBase64(compressedData);
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
    return encodedData;
}


export async function loadRodbTranslator(importData: string): Promise<void> {
    const prefixCheck = /^#rtx(\d+):(.+)$/;
    const matches = prefixCheck.exec(importData);
    if (!matches) {
        return;
    }

    // Version Check
    if (Number(matches[1]) != RTX_SUPPORT_VERSION) {
        alert("RODB Translatorから出力された\nフォーマットバージョンが異なるため中止します\nVersion:" + matches[1]);
        return;
    }
    // フラグメントをデコード
    const decodedData = decodeURIComponent(matches[2]);

    // 中身のデコード、zstd展開を行う
    const dataObject: RtxDataFormat | null = await decodeProcess(decodedData)
    if (!dataObject) {
        alert("URLからのデータロードに失敗しました");
        return;
    }
    console.debug(dataObject);

    importRtxDataFormat(dataObject);
}

async function importRtxDataFormat(dataObject: RtxDataFormat): Promise<void> {
    // ローディングインジケーターを表示
    showLoadingIndicator();

    setTimeout(() => {
        const changeEvent = new Event('change', { bubbles: true });

        // Set Job
        const jobElement = document.getElementById("OBJID_SELECT_JOB") as HTMLSelectElement;
        jobElement.value = dataObject.status.job_id;
        jobElement.dispatchEvent(changeEvent);

        // Set Base Lv
        const baseLvElement = document.getElementById("OBJID_SELECT_BASE_LEVEL") as HTMLInputElement;
        baseLvElement.value = String(dataObject.status.base_lv);

        // Set Job Lv
        const jobLvElement = document.getElementById("OBJID_SELECT_JOB_LEVEL") as HTMLInputElement;
        jobLvElement.value = String(dataObject.status.job_lv);

        // Set status
        const keys: (keyof RtxJobStatus)[] = [
            "str", "agi", "vit", "int", "dex", "luk",
            "pow", "sta", "wis", "spl", "con", "crt"
        ];

        for (const key of keys) {
            const statusElement = document.getElementById("OBJID_SELECT_STATUS_" + key.toUpperCase()) as HTMLInputElement;
            let value = dataObject.status[key];
            statusElement.value = String(value);
        }

        // Set Learned skills
        const skillColumnCheckbox = document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX") as HTMLInputElement;
        skillColumnCheckbox.checked = true;
        OnClickSkillSWLearned();

        Object.entries(dataObject.learned_skills).forEach(([skillId, skill]) => {
            const skillLvElement = document.querySelector(`select[data-learned-skill-id=${skillId}]`) as HTMLSelectElement;
            if (skillLvElement) {
                skillLvElement.value = String(skill.lv);
                //console.debug(`Skill ID: ${skillId}, 習得レベル: ${skillLvElement.value}`)
                skillLvElement.dispatchEvent(changeEvent);
            }
        });

        // 計算
        CalcStatusPoint(true);
        StAllCalc();
        AutoCalc();

        // ローディングインジケーターを非表示
        hideLoadingIndicator();
    }, 0);
}

export async function outputConsoleRtxDataFormat(): Promise<void> {
    try {
        const dataObject = exportRtxDataFormat();
        //console.log(dataObject);
        const yamlData = dumpYAML(dataObject);
        console.log(yamlData);
        const encodedData = await encodeProcess(dataObject);
        console.log("圧縮前:", yamlData.length, "->", "圧縮後:", encodedData?.length);
        //alert("🐱‍💻データをコンソールに出力しました");
    } catch (ex) {
        console.error("Error occurred while outputting console RTX data format:", ex);
    }
}

function exportRtxDataFormat(): RtxDataFormat {
    let dataObject: RtxDataFormat = {
        format_version: RTX_SUPPORT_VERSION,
        overwright: true,
        status: {} as RtxJobStatus,
        learned_skills: {} as RtxSkills,
        equipments: {} as RtxEquipments,
        use_items: {} as RtxUseItems,
        buff: {} as RtxSkills,
        debuff: {} as RtxSkills,
        additional_info: {} as RtxAdditionalInfo,
        battle_info: {}
    };

    // Get Job
    const jobElement = document.getElementById("OBJID_SELECT_JOB") as HTMLSelectElement;
    dataObject.status.job_id = jobElement.value;
    //dataObject.status.job_class_localization = JobMap.getById(jobElement.value)?.getNameJa();

    // Get Base Lv
    const baseLvElement = document.getElementById("OBJID_SELECT_BASE_LEVEL") as HTMLInputElement;
    dataObject.status.base_lv = Number(baseLvElement.value);

    // Get Job Lv
    const jobLvElement = document.getElementById("OBJID_SELECT_JOB_LEVEL") as HTMLInputElement;
    dataObject.status.job_lv = Number(jobLvElement.value);

    // Get status
    const keys = [
        "str", "agi", "vit", "int", "dex", "luk",
        "pow", "sta", "wis", "spl", "con", "crt"
    ] as const;

    type StatusKey = typeof keys[number];
    for (const key of keys as readonly StatusKey[]) {
        const statusElement = document.getElementById("OBJID_SELECT_STATUS_" + key.toUpperCase()) as HTMLSelectElement;
        dataObject.status[key] = Number(statusElement.value);
    }

    // Get Learned skills
    const skillColumnCheckbox = document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX") as HTMLInputElement;
    if (!skillColumnCheckbox.checked) {
        // スキルカラムがチェックされていない場合は、開く
        // そうしないと、スキル学習状況が取得できない
        skillColumnCheckbox.checked = true;
        OnClickSkillSWLearned();
    }
    const learnedSkillElements = document.querySelectorAll(`select[data-learned-skill-id]`) as NodeListOf<HTMLSelectElement>;
    learnedSkillElements.forEach((skillLvElement) => {
        const skillId = skillLvElement.getAttribute("data-learned-skill-id");
        if (skillId) {
            dataObject.learned_skills[skillId] = { lv: Number(skillLvElement.value) };
        }
    });

    // Equipments
    if (dataObject.equipments) {
        // 右腕武器
        dataObject = getRecursiveItemValueById(dataObject, "arms_right" as const, "OBJID_ARMS_RIGHT", "OBJID_EQUIP_REGION_ID_ARMS_RNDOPT");
        // 左腕武器
        dataObject = getRecursiveItemValueById(dataObject, "arms_left" as const, "OBJID_ARMS_LEFT", "OBJID_EQUIP_REGION_ID_ARMS_LNDOPT");
        // 頭上段
        dataObject = getRecursiveItemValueById(dataObject, "head_top" as const, "OBJID_HEAD_TOP", "OBJID_EQUIP_REGION_ID_HEAD_TOP");
        // 頭中段
        dataObject = getRecursiveItemValueById(dataObject, "head_middle" as const, "OBJID_HEAD_MID", "OBJID_EQUIP_REGION_ID_HEAD_MID");
        // 頭下段
        dataObject = getRecursiveItemValueById(dataObject, "head_under" as const, "OBJID_HEAD_UNDER", "OBJID_EQUIP_REGION_ID_HEAD_UNDER");
        // 盾
        dataObject = getRecursiveItemValueById(dataObject, "shield" as const, "OBJID_SHIELD", "OBJID_EQUIP_REGION_ID_SHIELD");
        // 鎧
        dataObject = getRecursiveItemValueById(dataObject, "body" as const, "OBJID_BODY", "OBJID_EQUIP_REGION_ID_BODY");
        // 肩
        dataObject = getRecursiveItemValueById(dataObject, "shoulder" as const, "OBJID_SHOULDER", "OBJID_EQUIP_REGION_ID_SHOULDER");
        // 靴
        dataObject = getRecursiveItemValueById(dataObject, "shoes" as const, "OBJID_SHOES", "OBJID_EQUIP_REGION_ID_SHOES");
        // アクセサリー1
        dataObject = getRecursiveItemValueById(dataObject, "accessory1" as const, "OBJID_ACCESSARY_1", "OBJID_EQUIP_REGION_ID_ACCESSARY_1"); // calcx.htmlでACCESS"A"RY のスペルミスがある
        // アクセサリー2
        dataObject = getRecursiveItemValueById(dataObject, "accessory2" as const, "OBJID_ACCESSARY_2", "OBJID_EQUIP_REGION_ID_ACCESSARY_2"); // calcx.htmlでACCESS"A"RY のスペルミスがある
    }

    // Use Items
    if (dataObject.use_items) {
        // スピードアップポーション
        const speedUpPotionElement = document.getElementById("OBJID_SPEED_POT") as HTMLSelectElement;
        if (speedUpPotionElement) {
            dataObject.use_items.speed_up_potion = parseInt(speedUpPotionElement.value);
        }
    }

    return dataObject;
}

function getRecursiveItemValueById(dataObject: RtxDataFormat, equipmentLocation: RtxEquipmentLocation, objectIdPrefix: string, objectIdRndopt: string, slotMaxNum: number = 4): RtxDataFormat {
    const itemData = getChildItemValueById(`DATA_${objectIdPrefix}`, "item") as ItemData | null | undefined;
    const itemRefine = getItemValueById(`${objectIdPrefix}_REFINE`, "refine") as number | null | undefined;
    const itemTranscendence = getItemValueById(`${objectIdPrefix}_TRANSCENDENCE`, "transcendence") as number | null | undefined;
    if (equipmentLocation === "arms_right" || equipmentLocation === "arms_left") {
        //武器
        dataObject.equipments[equipmentLocation] = {
            refine: itemRefine || 0,
            transcendence: itemTranscendence || null,
            name: itemData?.getDisplayName() || null,
            slot: {},
            element: null,
            random_option: {}
        };
    } else {
        //それ以外
        dataObject.equipments[equipmentLocation] = {
            refine: itemRefine || null,
            transcendence: itemTranscendence || null,
            name: itemData?.getDisplayName() || null,
            slot: {},
            random_option: {}
        };
    }
    // カード、エンチャントスロット
    for (let slotId = 1; slotId <= slotMaxNum; slotId++) {
        const slotName = `DATA_${objectIdPrefix}_CARD_${slotId}`;
        let value;
        if (itemData && itemData.getSlot() !== undefined && itemData.getSlot()! >= slotId) {
            value = getChildItemValueById(slotName, "card") as ItemData | null | undefined;
        } else {
            value = getChildItemValueById(slotName, "enchant") as ItemData | null | undefined;
        }
        if (value === undefined) {
            // 定義がない場合、Null扱いとする
            // こうすることで、未使用のスロットもNull扱いとして上書きできる
            // (ロード時に不整合を防ぐため)
            value = null;
        }
        dataObject.equipments[equipmentLocation].slot[slotId] = {
            name: value?.getDisplayName() || null
        };
    }
    // ランダムオプション
    for (let slotId = 0; slotId <= 5; slotId++) {
        const kindName = `${objectIdRndopt}_KIND_${slotId}`;
        const kindValue = getChildItemValueById(kindName, "random") as ItemData | null | undefined;
        const valueName = `${objectIdRndopt}_VALUE_${slotId}`;
        const value = getChildItemValueById(valueName, "random") as number | null | undefined;
        if (dataObject.equipments[equipmentLocation].random_option) {
            dataObject.equipments[equipmentLocation].random_option[slotId] = {
                kind: kindValue?.getDisplayName() || null,
                value: value || null
            };
        }
    }
    return dataObject;
}


function getItemValueById(elementId: string, objectType: string): ItemData | number | null | undefined {
    const selectElement = document.getElementById(elementId) as HTMLSelectElement;
    if (!selectElement || !selectElement.hasChildNodes()) {
        //console.warn(`Select element not found or has no child nodes for ID: ${elementId}`);
        return undefined;
    }
    const itemValue = selectElement.value;
    if (itemValue !== null && itemValue !== "") {
        const matches = itemValue.match(/(\d+)$/);
        if (!matches) {
            console.warn(`No trailing number found in itemValue for ID: ${elementId}, Value: ${itemValue}`);
            return null;
        }
        const numericValue = parseInt(matches[1], 10);  // 末尾の数値部分をパース
        if (isNaN(numericValue)) {
            console.warn(`Invalid number in itemValue for ID: ${elementId}, Value: ${itemValue}`);
            return null;
        }
        if (objectType === "item") {
            return ItemMap.findItemByMigIdFromItem(numericValue);
        } else if (objectType === "card") {
            return ItemMap.findItemByMigIdFromCardOrEnchant(numericValue, false);
        } else if (objectType === "enchant") {
            return ItemMap.findItemByMigIdFromCardOrEnchant(numericValue, true);
        } else {
            // Refine or Transcendence or Random
            return numericValue;
        }
    }
    return null;
}

function getChildItemValueById(elementId: string, objectType: string): ItemData | number | null | undefined {
    const selectElement = document.getElementById(elementId) as HTMLSelectElement;
    if (!selectElement || !selectElement.hasChildNodes()) {
        //console.warn(`Select element not found or has no child nodes for ID: ${elementId}`);
        return undefined;
    }
    const firstChild = selectElement.firstChild;
    if (!firstChild || firstChild.nodeValue === null || firstChild.nodeValue.length === 0) {
        console.warn(`Select element is empty for ID: ${elementId}`);
        return undefined;
    }
    const itemValue = firstChild.nodeValue;
    if (itemValue !== null && itemValue !== "") {
        const matches = itemValue.match(/(\d+)$/);
        if (!matches) {
            console.warn(`No trailing number found in itemValue for ID: ${elementId}, Value: ${itemValue}`);
            return null;
        }
        const numericValue = parseInt(matches[1], 10);  // 末尾の数値部分をパース
        if (isNaN(numericValue)) {
            console.warn(`Invalid number in itemValue for ID: ${elementId}, Value: ${itemValue}`);
            return null;
        }
        if (objectType === "item") {
            return ItemMap.findItemByMigIdFromItem(numericValue);
        } else if (objectType === "card") {
            return ItemMap.findItemByMigIdFromCardOrEnchant(numericValue, false);
        } else if (objectType === "enchant") {
            return ItemMap.findItemByMigIdFromCardOrEnchant(numericValue, true);
        } else {
            // Refine or Transcendence
            return numericValue;
        }
    }
    return null;
}

interface RtxDataFormat {
    format_version: number;
    overwright: boolean;
    status: RtxJobStatus;
    learned_skills: RtxSkills;
    equipments: RtxEquipments;
    use_items?: RtxUseItems;
    buff?: RtxSkills;
    debuff?: RtxSkills;
    additional_info?: RtxAdditionalInfo;
    battle_info?: object;
}

interface RtxJobStatus {
    job_id: string;
    base_lv: number;
    job_lv: number;
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
    pow: number;
    sta: number;
    wis: number;
    spl: number;
    con: number;
    crt: number;
}

interface RtxSkill {
    lv: number;
}

interface RtxSkills {
    [skillId: string]: RtxSkill;
}

type RtxEquipmentLocation =
    | "arms_right"
    | "arms_left"
    | "head_top"
    | "head_middle"
    | "head_under"
    | "shield"
    | "body"
    | "shoulder"
    | "shoes"
    | "accessory1"
    | "accessory2";

interface RtxEquipments {
    arms_type_right: number;
    arms_right: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        element: string | null, // 武器の属性
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    arms_left?: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        element: string | null, // 武器の属性
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    head_top: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    head_middle: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    head_under: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    shield?: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    body: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    shoulder: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    shoes: {
        refine: number | null,
        transcendence: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    accessory1: {
        refine?: number | null,
        transcendence?: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    accessory2: {
        refine?: number | null,
        transcendence?: number | null,
        name: string | null,
        slot: {
            [slotId: number]: {
                name: string | null
            }
        },
        random_option?: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    }
}

interface RtxUseItems {
    speed_up_potion: number;
}


interface RtxAdditionalInfo {
    hp_base_point?: number;
    sp_base_point?: number;
    character_name?: string;
    world_name?: string;
    comment?: string;
}

(window as any).outputConsoleRtxDataFormat = outputConsoleRtxDataFormat; //グローバルに登録
