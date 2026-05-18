import { dump as dumpYAML } from "js-yaml"
import { ItemData, ItemMap } from "./loadItemMap";
import { encodeProcess, API_VERSION, CONTROL_CONF_LIST, RtxData, RtxStatus, RtxSkills, RtxEquipments, RtxShadowEquipments, RtxUseItems, RtxAdditionalInfo, RtxEquipmentLocation, RtxSupportOrCutomizations } from "./rtxApiCommon";

// シミュレーション結果の出力
function exportSimulationResult(format: string = "yaml"): string {
    const object = {};

    if (format === "yaml") {
        return dumpYAML(object);
    } else if (format === "json") {
        return JSON.stringify(object, null, 2);
    } else {
        return "";
    }
}
(window as any).exportSimulationResult = exportSimulationResult; //グローバルに登録

// LocalFileへ保存
function saveToLocalFile(): void {
    try {
        const dataObject = exportRtxDataObject();
        const yamlData = dumpYAML(dataObject);
        const blob = new Blob([yamlData], { type: "text/yaml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rtx_data.yaml";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("🐱‍💻データをファイルに保存しました");
    } catch (ex) {
        console.error("Error occurred while saving RTX data to file:", ex);
    }
}
(window as any).saveToLocalFile = saveToLocalFile; //グローバルに登録

// LocalStorageへ保存
function saveToLocalStorage(key: string = "SAVEDATA_RTX_DEFAULT"): void {
    try {
        const dataObject = exportRtxDataObject();
        const yamlData = dumpYAML(dataObject);
        localStorage.setItem(key, yamlData);
        console.log(`🐱‍💻データをLocalStorageに保存しました: ${key}`);
        alert(`データをLocalStorageに保存しました: ${key}`);
    } catch (ex) {
        console.error("Error occurred while saving LocalStorage RTX data:", ex);
    }
}
(window as any).saveToLocalStorage = saveToLocalStorage; //グローバルに登録

async function outputConsoleRtxDataFormat(): Promise<void> {
    try {
        const dataObject = exportRtxDataObject();
        const yamlData = dumpYAML(dataObject);
        const encodedData = await encodeProcess(dataObject);
        console.log("圧縮前:", yamlData.length, "->", "圧縮後:", encodedData?.length);
        console.log(`RTX${API_VERSION}:${encodedData}`);
        console.log("🐱‍💻データをコンソールに出力しました");
    } catch (ex) {
        console.error("Error occurred while outputting console RTX data format:", ex);
    }
}
(window as any).outputConsoleRtxDataFormat = outputConsoleRtxDataFormat; //グローバルに登録

function exportRtxDataObject(): RtxData {
    let dataObject: RtxData = {
        api_version: API_VERSION,
        status: {} as RtxStatus,
        learned_skills: {} as RtxSkills,
        equipments: {} as RtxEquipments,
        shadow_equipments: {} as RtxShadowEquipments,
        supports: {} as RtxSupportOrCutomizations,
        customize: {} as RtxSupportOrCutomizations,
        use_items: {} as RtxUseItems,
        additional_info: {} as RtxAdditionalInfo,
        battle_info: {}
    };


    // Get Job
    const jobElement = document.getElementById("OBJID_SELECT_JOB") as HTMLSelectElement;
    dataObject.status.job_id = jobElement.value;

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

    // 武器&防具/カード
    if (dataObject.equipments) {
        const armsTypeRightElement = document.getElementById("OBJID_ARMS_TYPE_RIGHT") as HTMLSelectElement | null;
        dataObject.equipments.arms_type_right = Number(armsTypeRightElement?.value);
        const armsTypeLeftElement = document.getElementById("OBJID_ARMS_TYPE_LEFT") as HTMLSelectElement | null;
        if (armsTypeLeftElement) {
            dataObject.equipments.arms_type_left = Number(armsTypeLeftElement.value);
        } else {
            dataObject.equipments.arms_type_left = null;
        }

        const arrowElement = document.getElementById("OBJID_SELECT_ARROW") as HTMLSelectElement | null;
        if (arrowElement) {
            dataObject.equipments.arrow_type = Number(arrowElement.value);
        } else {
            dataObject.equipments.arrow_type = null;
        }

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
        dataObject = getRecursiveItemValueById(dataObject, "accessory1" as const, "OBJID_ACCESSORY_1", "OBJID_EQUIP_REGION_ID_ACCESSORY_1");
        // アクセサリー2
        dataObject = getRecursiveItemValueById(dataObject, "accessory2" as const, "OBJID_ACCESSORY_2", "OBJID_EQUIP_REGION_ID_ACCESSORY_2");
    }

    // 習得スキル
    const skillColumnCheckbox = document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX") as HTMLInputElement;
    if (!skillColumnCheckbox.checked) {
        // スキルカラムがチェックされていない場合は、開く
        // そうしないと、スキル学習状況が取得できない
        skillColumnCheckbox.click();
    }
    const learnedSkillElements = document.querySelectorAll(`select[data-rtx-learned-skill-id]`) as NodeListOf<HTMLSelectElement>;
    learnedSkillElements.forEach((skillLvElement) => {
        const skillId = skillLvElement.getAttribute("data-rtx-learned-skill-id");
        if (skillId) {
            dataObject.learned_skills[skillId] = { lv: Number(skillLvElement.value) };
        }
    });
    skillColumnCheckbox.click();

    // 支援
    if (dataObject.supports) {
        CONTROL_CONF_LIST.forEach((configDict) => {
            if (configDict['type'] !== 'support') {
                return; // 支援以外はスキップ
            }
            const controlSwitchBox = document.getElementById(configDict['control_switch_element_id']) as HTMLInputElement;
            if (controlSwitchBox === undefined) {
                return;
            }
            if (!controlSwitchBox.checked) {
                // スキルカラムがチェックされていない場合は、開く
                controlSwitchBox.click();
            }
            const confName = configDict['conf_name'];
            // 各ステージのオブジェクトを初期化
            if (!dataObject.supports![confName]) {
                dataObject.supports![confName] = {};
            }
            // 対象となる要素群を取得(select/input 両対応)
            const elements = document.querySelectorAll(`[data-rtx-support-${confName}-element-id]`) as NodeListOf<HTMLSelectElement | HTMLInputElement>;
            elements.forEach((controlElement) => {
                const elementId = controlElement.getAttribute(`data-rtx-support-${confName}-element-id`);
                const idxDisplayName = controlElement.getAttribute(`data-rtx-support-${confName}-displayname`);
                if (!elementId) {
                    return;
                }


                console.debug(`confName: ${confName}, idx: ${elementId}, value: ${controlElement.value}, DisplayName: Name: ${idxDisplayName}, Type: ${controlElement.type}`);
                let rawValue: string | null = null;
                if (controlElement instanceof HTMLSelectElement) {
                    rawValue = controlElement.value;
                } else if (controlElement instanceof HTMLInputElement) {
                    rawValue = controlElement.value;
                }

                let normalizedValue: number | string | null = null;
                if (rawValue === null || rawValue === "") {
                    return; // 空文字列は保存しない
                } else {
                    // 数値形式（整数または小数、符号付き含む）なら Number に変換、それ以外はそのまま文字列
                    const numericMatch = rawValue.trim().match(/^[+-]?\d+(\.\d+)?$/);
                    if (numericMatch) {
                        const n = Number(rawValue);
                        normalizedValue = isNaN(n) ? rawValue : n;
                    } else {
                        normalizedValue = rawValue;
                    }
                }
                dataObject.supports![confName][elementId] = {
                    value: normalizedValue,
                    display_name: idxDisplayName || ''
                };
            });

            if (controlSwitchBox.checked) {
                controlSwitchBox.click();
            }
        });
    }

    // カスタマイズ
    if (dataObject.customize) {
        CONTROL_CONF_LIST.forEach((configDict) => {
            if (configDict['type'] !== 'customize') {
                return; // カスタマイズ以外はスキップ
            }
            const controlSwitchBox = document.getElementById(configDict['control_switch_element_id']) as HTMLInputElement;
            if (controlSwitchBox === undefined) {
                return;
            }
            if (!controlSwitchBox.checked) {
                // スキルカラムがチェックされていない場合は、開く
                controlSwitchBox.click();
            }
            const confName = configDict['conf_name'];
            // 各ステージのオブジェクトを初期化
            if (!dataObject.customize![confName]) {
                dataObject.customize![confName] = {};
            }
            // 対象となる要素群を取得(select/input 両対応)
            const elements = document.querySelectorAll(`[data-rtx-customize-${confName}-element-id]`) as NodeListOf<HTMLSelectElement | HTMLInputElement>;
            elements.forEach((controlElement) => {
                const elementId = controlElement.getAttribute(`data-rtx-customize-${confName}-element-id`);
                const idxDisplayName = controlElement.getAttribute(`data-rtx-customize-${confName}-displayname`);
                if (!elementId) {
                    return;
                }

                console.debug(`confName: ${confName}, idx: ${elementId}, value: ${controlElement.value}, DisplayName: Name: ${idxDisplayName}, Type: ${controlElement.type}`);
                let rawValue: string | null = null;
                if (controlElement instanceof HTMLSelectElement) {
                    rawValue = controlElement.value;
                } else if (controlElement instanceof HTMLInputElement) {
                    rawValue = controlElement.value;
                }

                let normalizedValue: number | string | null = null;
                if (rawValue === null || rawValue === "") {
                    return; // 空文字列は保存しない
                } else {
                    // 数値形式（整数または小数、符号付き含む）なら Number に変換、それ以外はそのまま文字列
                    const numericMatch = rawValue.trim().match(/^[+-]?\d+(\.\d+)?$/);
                    if (numericMatch) {
                        const n = Number(rawValue);
                        normalizedValue = isNaN(n) ? rawValue : n;
                    } else {
                        normalizedValue = rawValue;
                    }
                }
                dataObject.customize![confName][elementId] = {
                    value: normalizedValue,
                    display_name: idxDisplayName || ''
                };
            });

            if (controlSwitchBox.checked) {
                controlSwitchBox.click();
            }
        });
    }

    // Use Items
    if (dataObject.use_items) {
        // スピードアップポーション
        const speedUpPotionElement = document.getElementById("OBJID_SPEED_POT") as HTMLSelectElement;
        if (speedUpPotionElement) {
            dataObject.use_items.speed_up_potion = parseInt(speedUpPotionElement.value);
        }
    }

    if (dataObject.additional_info) {
        // キャラクター名
        const charNameElement = document.getElementById("OBJID_CHARACTER_NAME") as HTMLInputElement;
        if (charNameElement) {
            dataObject.additional_info.character_name = charNameElement.value || undefined;
        }
        // 現在日時
        dataObject.additional_info.last_modified = (new Date()).toISOString();
    }

    return dataObject;
}

function getRecursiveItemValueById(dataObject: RtxData, equipmentLocation: RtxEquipmentLocation, objectIdPrefix: string, objectIdRndopt: string, slotMaxNum: number = 4): RtxData {
    const itemData = getItemValueById(`${objectIdPrefix}`, "item") as ItemData | null | undefined;
    const itemRefine = getItemValueById(`${objectIdPrefix}_REFINE`, "refine") as number | null | undefined;
    const itemTranscendence = getItemValueById(`${objectIdPrefix}_TRANSCENDENCE`, "transcendence") as number | null | undefined;
    const itemSelectElement = document.getElementById(objectIdPrefix) as HTMLSelectElement | null;

    if (equipmentLocation === "arms_right" || equipmentLocation === "arms_left") {
        //武器
        dataObject.equipments[equipmentLocation] = {
            id_num: itemData?.getId() || null,
            refine: itemRefine || 0,
            transcendence: itemTranscendence || null,
            name: itemData?.getDisplayName() || null,
            _mig_id_num: itemSelectElement && itemSelectElement.value != "0" ? Number(itemSelectElement.value) : null, // 旧仕様互換用
            slot: {},
            element: null,
            random_option: {}
        };
    } else {
        //それ以外
        dataObject.equipments[equipmentLocation] = {
            id_num: itemData?.getId() || null,
            refine: itemRefine || null,
            transcendence: itemTranscendence || null,
            name: itemData?.getDisplayName() || null,
            _mig_id_num: itemSelectElement && itemSelectElement.value != "0" ? Number(itemSelectElement.value) : null, // 旧仕様互換用
            slot: {},
            random_option: {}
        };
    }
    // カード、エンチャントスロット
    for (let slotId = 1; slotId <= slotMaxNum; slotId++) {
        const slotName = `${objectIdPrefix}_CARD_${slotId}`;
        const itemSelectElement = document.getElementById(`${objectIdPrefix}_CARD_${slotId}`) as HTMLSelectElement | null;

        let value: ItemData | null | undefined;
        if (itemData && itemData.getSlot() !== undefined && itemData.getSlot()! >= slotId) {
            value = getItemValueById(slotName, "card") as ItemData | null | undefined;
        } else {
            value = getItemValueById(slotName, "enchant") as ItemData | null | undefined;
        }
        if (value === undefined) {
            // 定義がない場合、Null扱いとする
            // こうすることで、未使用のスロットもNull扱いとして上書きできる
            // (ロード時に不整合を防ぐため)
            value = null;
        }
        dataObject.equipments[equipmentLocation].slot[slotId] = {
            name: value?.getDisplayName() || null,
            id_num: value?.getId() || null,
            _mig_id_num: itemSelectElement && itemSelectElement.value != "0" ? Number(itemSelectElement.value) : null
        };
    }
    // ランダムオプション
    for (let slotId = 0; slotId <= 5; slotId++) {
        const kindName = `${objectIdRndopt}_KIND_${slotId}`;
        const kindValue = getItemValueById(kindName, "random") as ItemData | null | undefined;
        const valueName = `${objectIdRndopt}_VALUE_${slotId}`;
        const value = getItemValueById(valueName, "random") as number | null | undefined;
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
