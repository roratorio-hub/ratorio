import { load as loadYAML, dump as dumpYAML } from "js-yaml"
import { zstdCompressString, zstdDecompressString } from "./funcZstd";

export const API_VERSION = 2;

export const CONTROL_CONF_LIST = [
    {
        conf_name: 'skill-passive',
        control_switch_element_id: 'OBJID_CHECK_A1_SKILL_SW',
        type: 'support'
    },
    {
        conf_name: 'skill-1st',
        control_switch_element_id: 'OBJID_CONTROL_CONF_0_SWITCH',
        type: 'support'
    },
    {
        conf_name: 'skill-2nd',
        control_switch_element_id: 'OBJID_CONTROL_CONF_1_SWITCH',
        type: 'support'
    },
    {
        conf_name: 'skill-3rd',
        control_switch_element_id: 'OBJID_CONTROL_CONF_2_SWITCH',
        type: 'support'
    },
    {
        conf_name: 'skill-4th',
        control_switch_element_id: 'OBJID_CONTROL_CONF_3_SWITCH',
        type: 'support'
    },
    {
        conf_name: 'debuff',
        control_switch_element_id: 'OBJID_CONTROL_CONF_4_SWITCH',
        type: 'support'
    },
    {
        conf_name: 'status-basic',
        control_switch_element_id: 'OBJID_CONTROL_CONF_5_SWITCH',
        type: 'customize'
    },
    {
        conf_name: 'attack',
        control_switch_element_id: 'OBJID_CONTROL_CONF_6_SWITCH',
        type: 'customize'
    },
    {
        conf_name: 'defense',
        control_switch_element_id: 'OBJID_CONTROL_CONF_7_SWITCH',
        type: 'customize'
    },
    {
        conf_name: 'skill',
        control_switch_element_id: 'OBJID_CONTROL_CONF_8_SWITCH',
        type: 'customize'
    },
    {
        conf_name: 'status-special',
        control_switch_element_id: 'OBJID_CONTROL_CONF_9_SWITCH',
        type: 'customize'
    }
];

// Base64 → Uint8Array（URLセーフに対応）
export function base64ToUint8Array(base64: string): Uint8Array {
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
export function uint8ArrayToBase64(bytes: Uint8Array): string {
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
export async function decodeProcess(encodedData: string): Promise<RtxData | null> {
    let dataObject: RtxData | null = null;
    try {
        // デコード => 圧縮データ
        const compressedData = base64ToUint8Array(encodedData);

        // zstdで展開
        const yamlData = await zstdDecompressString(compressedData);

        if (yamlData) {
            //console.debug(yamlData);
            // YAML文字列 => JavaScriptオブジェクト
            dataObject = loadYAML(yamlData) as RtxData;
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
    return dataObject;
}

// YAML dump => 圧縮 => Encode
export async function encodeProcess(dataObject: RtxData): Promise<string | null> {
    let encodedData: string | null = null;
    try {
        // YAMLオブジェクト => YAML文字列
        const yamlData = dumpYAML(dataObject);

        // zstdで圧縮
        const compressedData = await zstdCompressString(yamlData);

        if (compressedData) {
            // 圧縮データ => 文字列
            encodedData = uint8ArrayToBase64(compressedData);
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
    return encodedData;
}

export interface RtxData {
    api_version: number;
    status: RtxStatus;
    learned_skills: RtxSkills;
    equipments: RtxEquipments;
    shadow_equipments: RtxShadowEquipments;
    supports?: RtxSupportOrCutomizations;
    customize?: RtxSupportOrCutomizations;
    use_items?: RtxUseItems;
    battle_info?: object; // 暫定でobjectにしておく
    monster_buff?: object; // 暫定でobjectにしておく
    monster_debuff?: object; // 暫定でobjectにしておく
    additional_info?: RtxAdditionalInfo;
}

export interface RtxStatus {
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

export interface RtxSkill {
    lv: number;
}

export interface RtxSkills {
    [skillId: string]: RtxSkill;
}

export type RtxEquipmentLocation =
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

export interface RtxEquipments {
    arms_type_right: number;
    arms_type_left?: number | null;
    arrow_type?: number | null;
    arms_right: {
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        element: string | null, // 武器の属性
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        element: string | null, // 武器の属性
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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
        id_num: number | null,
        refine: number | null,
        transcendence: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        slot: {
            [slotId: number]: {
                id_num: number | null,
                name?: string | null,
                _mig_id_num?: number | null // 旧仕様互換用
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

export type RtxShadowEquipmentLocation =
    | "weapon"
    | "shield"
    | "body"
    | "shoes"
    | "accessory1"
    | "accessory2";

export interface RtxShadowEquipments {
    weapon: {
        id_num: number | null,
        refine: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        random_option: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    shield: {
        id_num: number | null,
        refine: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        random_option: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    body: {
        id_num: number | null,
        refine: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        random_option: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    shoes: {
        id_num: number | null,
        refine: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        random_option: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    accessory1: {
        id_num: number | null,
        refine: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        random_option: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    },
    accessory2: {
        id_num: number | null,
        refine: number | null,
        name?: string | null,
        _mig_id_num?: number | null, // 旧仕様互換用
        random_option: {
            [optionId: number]: {
                kind: string | null,
                value: number | null
            }
        }
    }
}

export interface RtxSupportOrCutomizations {
    [stage: string]: {
        [element_id: string]: {
            display_name?: string;
            value: number | string;
        }
    };
}

export interface RtxUseItems {
    speed_up_potion: number;
}

export interface RtxAdditionalInfo {
    hp_base_point?: number;
    sp_base_point?: number;
    character_name?: string;
    world_name?: string;
    comment?: string;
    last_modified?: string; // ISO 8601 形式の日時文字列
}

export interface RtxMetaResult {
    simulator_version: string;
    timestamp: string;     // ISO8601
    input_hash: string;    // sha256など
}

export interface RtxSkillResult {
    id: string;
    level: number;
    damage_avg: number;
    dps: number;
}

export interface RtxResults {
    offense: {
        dps: number;
        hit_rate: number;
        crit_rate: number;
        skills: RtxSkillResult[];
    };
    defense: {
        received_dps: number;
        survival_time_sec: number;
        effective_hp: number;
    };
    summary: {
        scores: {
            power: number;
            durability: number;
            overall: number;
        };
    };
}
