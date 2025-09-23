import { load as loadYAML, dump as dumpYAML } from "js-yaml"
import { ItemData, ItemMap } from "./loadItemMap";
import { zstdCompress, zstdDecompress } from "./funcZstd";

const API_VERSION = 2;

function getCalculationResultsInYAML(): string {
    const object = {};
    return dumpYAML(object);
}
(window as any).getCalculationResultsInYAML = getCalculationResultsInYAML; //グローバルに登録

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

// LocalFile読み込み
async function loadFromLocalFile(): Promise<void> {
    try {
        // input 要素を動的に作成してファイル選択ダイアログを表示
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".yaml,.yml,text/yaml";

        input.addEventListener("change", async () => {
            const file = input.files?.[0];
            if (!file) {
                console.warn("ファイルが選択されませんでした");
                return;
            }
            const reader = new FileReader();
            reader.onload = async (ev) => {
                try {
                    const text = ev.target?.result;
                    if (typeof text !== "string") {
                        console.error("ファイル読み込み結果が文字列ではありません");
                        alert("ファイルの読み込みに失敗しました");
                        return;
                    }
                    const dataObject = loadYAML(text) as RtxData;
                    await importRtxDataObject(dataObject);
                    console.log(`🐱‍💻データをファイルから読み込みました: ${file.name}`);
                } catch (err) {
                    console.error("ファイルの読み込みまたはパース中にエラーが発生しました:", err);
                    alert("ファイルの読み込みに失敗しました（内容を確認してください）");
                }
            };
            reader.onerror = (err) => {
                console.error("FileReader エラー:", err);
                alert("ファイルの読み込みに失敗しました");
            };
            reader.readAsText(file, "utf-8");
        });

        // ダイアログを開く
        input.click();
    } catch (ex) {
        console.error("Error occurred while loading RTX data from file:", ex);
        alert("ファイル選択中にエラーが発生しました");
    }
}
(window as any).loadFromLocalFile = loadFromLocalFile; //グローバルに登録

// LocalStorageへ保存
function saveToLocalStorage(key: string = "RTX_DATA_DEFAULT"): void {
    try {
        const dataObject = exportRtxDataObject();
        const yamlData = dumpYAML(dataObject);
        localStorage.setItem(key, yamlData);
        console.log(`🐱‍💻データをLocalStorageに保存しました: ${key}`);
    } catch (ex) {
        console.error("Error occurred while saving LocalStorage RTX data:", ex);
    }
}
(window as any).saveToLocalStorage = saveToLocalStorage; //グローバルに登録

// LocalStorage読み込み
async function loadFromLocalStorage(key: string = "RTX_DATA_DEFAULT"): Promise<void> {
    const yamlData = localStorage.getItem(key);
    if (!yamlData) throw new Error("No data found in LocalStorage");
    const dataObject = loadYAML(yamlData) as RtxData;
    await importRtxDataObject(dataObject);
    console.log(`🐱‍💻データをLocalStorageから読み込みました: ${key}`);
}
(window as any).loadFromLocalStorage = loadFromLocalStorage; //グローバルに登録

async function outputConsoleRtxDataFormat(): Promise<void> {
    try {
        const dataObject = exportRtxDataObject();
        const yamlData = dumpYAML(dataObject);
        const encodedData = await encodeProcess(dataObject);
        console.log("圧縮前:", yamlData.length, "->", "圧縮後:", encodedData?.length);
        console.log("🐱‍💻データをコンソールに出力しました");
    } catch (ex) {
        console.error("Error occurred while outputting console RTX data format:", ex);
    }
}
(window as any).outputConsoleRtxDataFormat = outputConsoleRtxDataFormat; //グローバルに登録

export async function loadFromBase64String(importData: string): Promise<void> {
    const prefixCheck = /^rtx(\d+):(.+)$/;
    const matches = prefixCheck.exec(importData);
    if (!matches) {
        return;
    }

    // Version Check
    if (Number(matches[1]) != API_VERSION) {
        alert("RTX APIバージョンが異なるため中止します\nVersion:" + matches[1]);
        return;
    }
    // フラグメントをデコード
    const decodedData = decodeURIComponent(matches[2]);

    // 中身のデコード、zstd展開を行う
    const dataObject: RtxData | null = await decodeProcess(decodedData)
    if (!dataObject) {
        alert("RTXデータロードに失敗しました");
        return;
    }
    console.debug(dataObject);

    importRtxDataObject(dataObject);
}

async function importRtxDataObject(dataObject: RtxData): Promise<void> {
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

        // ---------- ここから装備／カード／オプションの適用 ----------
        // 補助: セレクト要素を表示名で選択するユーティリティ
        const setSelectByOptionText = function (selectId: string, idNum: number | null, displayName: string | null, migIdNum: number | null = null) {
            if (!selectId) return;
            const selectElement = document.getElementById(selectId) as HTMLSelectElement | null;
            if (!selectElement) return;

            if (migIdNum !== null) {
                // MIG IDが指定されている場合はこちらを優先して選択(旧互換用)
                selectElement.value = String(migIdNum);
            } else if (idNum !== null && idNum > 0) {
                // IDが指定されている場合はIDで選択
                selectElement.value = String(idNum);
            } else if (displayName) {
                // DisplayNameで検索して選択
                for (let idx = 0; idx < selectElement.options.length; idx++) {
                    const opt = selectElement.options[idx];
                    const txt = (opt.textContent || opt.innerText || "").trim();
                    if (txt === displayName) {
                        selectElement.selectedIndex = idx;
                        break;
                    }
                }
            } else {
                return; // 何も指定されていない場合はスキップ
            }
            console.debug(`Setting select ${selectId} to ID: ${idNum}, Display Name: ${displayName}, MIG ID: ${migIdNum}`);
            selectElement.dispatchEvent(changeEvent); // 変更イベントを発火
        };

        // 装備位置ごとのUI IDマッピング（calcx.htmlのIDに合わせる）
        const equipMappings: { [key in RtxEquipmentLocation]: { prefix: string, rndopt: string } } = {
            arms_right: { prefix: "OBJID_ARMS_RIGHT", rndopt: "OBJID_EQUIP_REGION_ID_ARMS_RNDOPT" },
            arms_left: { prefix: "OBJID_ARMS_LEFT", rndopt: "OBJID_EQUIP_REGION_ID_ARMS_LNDOPT" }, // NOTE: left rndopt name used in export
            head_top: { prefix: "OBJID_HEAD_TOP", rndopt: "OBJID_EQUIP_REGION_ID_HEAD_TOP" },
            head_middle: { prefix: "OBJID_HEAD_MID", rndopt: "OBJID_EQUIP_REGION_ID_HEAD_MID" },
            head_under: { prefix: "OBJID_HEAD_UNDER", rndopt: "OBJID_EQUIP_REGION_ID_HEAD_UNDER" },
            shield: { prefix: "OBJID_SHIELD", rndopt: "OBJID_EQUIP_REGION_ID_SHIELD" },
            body: { prefix: "OBJID_BODY", rndopt: "OBJID_EQUIP_REGION_ID_BODY" },
            shoulder: { prefix: "OBJID_SHOULDER", rndopt: "OBJID_EQUIP_REGION_ID_SHOULDER" },
            shoes: { prefix: "OBJID_SHOES", rndopt: "OBJID_EQUIP_REGION_ID_SHOES" },
            accessory1: { prefix: "OBJID_ACCESSARY_1", rndopt: "OBJID_EQUIP_REGION_ID_ACCESSARY_1" }, // calcx.html の綴りに合わせる
            accessory2: { prefix: "OBJID_ACCESSARY_2", rndopt: "OBJID_EQUIP_REGION_ID_ACCESSARY_2" }  // calcx.html の綴りに合わせる
        };

        // arms_type_right 反映
        try {
            const armsTypeRightElement = document.getElementById("OBJID_ARMS_TYPE_RIGHT") as HTMLSelectElement | null;
            if (armsTypeRightElement && (dataObject.equipments as RtxEquipments).arms_type_right !== undefined) {
                armsTypeRightElement.value = String((dataObject.equipments as RtxEquipments).arms_type_right);
                armsTypeRightElement.dispatchEvent(changeEvent);
            }
        } catch (ex) {
            console.warn("arms_type_right の適用に失敗しました", ex);
        }

        // arms_type_left 反映 (存在する場合のみ)
        try {
            const armsTypeLeftElement = document.getElementById("OBJID_ARMS_TYPE_LEFT") as HTMLSelectElement | null;
            if (armsTypeLeftElement && (dataObject.equipments as RtxEquipments).arms_type_left !== undefined && (dataObject.equipments as RtxEquipments).arms_type_left !== null) {
                armsTypeLeftElement.value = String((dataObject.equipments as RtxEquipments).arms_type_left);
                armsTypeLeftElement.dispatchEvent(changeEvent);
            }
        } catch (ex) {
            console.warn("arms_type_left の適用に失敗しました", ex);
        }

        // 各装備について適用処理
        if (dataObject.equipments) {
            (Object.keys(equipMappings) as RtxEquipmentLocation[]).forEach((location) => {
                const mapping = equipMappings[location];
                const equipment = (dataObject.equipments as RtxEquipments)[location];
                if (!equipment) return;

                // 装備本体
                console.debug(`Applying equipment for ${location}: ${equipment.name} (ID: ${equipment.id_num}, MIG ID: ${equipment._mig_id_num})`);
                setSelectByOptionText(mapping.prefix, equipment.id_num, equipment.name || null, equipment._mig_id_num || null);

                // 強化値 / 超越値
                const refineElement = document.getElementById(`${mapping.prefix}_REFINE`) as HTMLInputElement | HTMLSelectElement | null;
                if (refineElement && equipment.refine !== undefined && equipment.refine !== null) {
                    refineElement.value = String(equipment.refine);
                    refineElement.dispatchEvent(changeEvent);
                }
                const transcElement = document.getElementById(`${mapping.prefix}_TRANSCENDENCE`) as HTMLInputElement | HTMLSelectElement | null;
                if (transcElement && equipment.transcendence !== undefined && equipment.transcendence !== null) {
                    transcElement.value = String(equipment.transcendence);
                    transcElement.dispatchEvent(changeEvent);
                }

                // スロット（カード/エンチャント）は ${prefix}_CARD_${slotId}
                if (equipment.slot) {
                    Object.keys(equipment.slot).forEach((slotIdStr) => {
                        const slotId = Number(slotIdStr);
                        if (isNaN(slotId)) return;
                        // まずカードセレクトとして適用
                        const slotSelectId = `${mapping.prefix}_CARD_${slotId}`;
                        setSelectByOptionText(slotSelectId, equipment.slot[slotId]?.id_num, equipment.slot[slotId]?.name || null, equipment.slot[slotId]?._mig_id_num || null); // 型チェックを無効化するので注意

                        // もし別のUIがある場合は追加のIDにも対応させたい場合ここに追記
                    });
                }

                // ランダムオプション（kind と value）
                if (equipment.random_option && mapping.rndopt) {
                    // ランダムオプション欄を表示
                    OnClickSlotModeButton();

                    for (let rndidx = 0; rndidx <= 5; rndidx++) {
                        const kindId = `${mapping.rndopt}_KIND_${rndidx}`;
                        const valueId = `${mapping.rndopt}_VALUE_${rndidx}`;

                        const kindName = equipment.random_option[rndidx]?.kind || null;
                        const kindElement = document.getElementById(kindId) as HTMLSelectElement | null;
                        if (kindElement && kindName) {
                            // kind は表示名でマッチさせる
                            for (let idx = 0; idx < kindElement.options.length; idx++) {
                                const opt = kindElement.options[idx];
                                const txt = (opt.textContent || opt.innerText || "").trim();
                                if (txt === kindName || txt.indexOf(kindName) !== -1) {
                                    kindElement.selectedIndex = idx;
                                    kindElement.dispatchEvent(changeEvent);
                                    break;
                                }
                            }
                        }

                        const val = equipment.random_option[rndidx]?.value;
                        const valElement = document.getElementById(valueId) as HTMLInputElement | HTMLSelectElement | null;
                        if (valElement && (val !== undefined && val !== null)) {
                            valElement.value = String(val);
                            valElement.dispatchEvent(changeEvent);
                        }
                    }
                    // ランダムオプション欄を閉じる
                    OnClickSlotModeButton();
                }
            });
        }
        // ---------- 装備適用ここまで ----------

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

function exportRtxDataObject(): RtxData {
    let dataObject: RtxData = {
        api_version: API_VERSION,
        status: {} as RtxJobStatus,
        learned_skills: {} as RtxSkills,
        equipments: {} as RtxEquipments,
        use_items: {} as RtxUseItems,
        buff_skills: {} as RtxSkills,
        debuff: {} as RtxSkills,
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
        const armsTypeRightElement = document.getElementById("OBJID_ARMS_TYPE_RIGHT") as HTMLSelectElement | null;
        dataObject.equipments.arms_type_right = Number(armsTypeRightElement?.value);
        const armsTypeLeftElement = document.getElementById("OBJID_ARMS_TYPE_LEFT") as HTMLSelectElement | null;
        if (armsTypeLeftElement) {
            dataObject.equipments.arms_type_left = Number(armsTypeLeftElement?.value);
        } else {
            dataObject.equipments.arms_type_left = null;
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
async function decodeProcess(encodedData: string): Promise<RtxData | null> {
    let dataObject: RtxData | null = null;
    try {
        // デコード => 圧縮データ
        const compressedData = base64ToUint8Array(encodedData);

        // zstdで展開
        const yamlData = await zstdDecompress(compressedData);

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
async function encodeProcess(dataObject: RtxData): Promise<string | null> {
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

interface RtxData {
    api_version: number;
    status: RtxJobStatus;
    learned_skills: RtxSkills;
    equipments: RtxEquipments;
    use_items?: RtxUseItems;
    buff_skills?: RtxSkills;
    debuff?: object; // 暫定でobjectにしておく
    battle_info?: object; // 暫定でobjectにしておく
    monster_buff?: object; // 暫定でobjectにしておく
    monster_debuff?: object; // 暫定でobjectにしておく
    additional_info?: RtxAdditionalInfo;
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
    arms_type_left: number | null;
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

interface RtxUseItems {
    speed_up_potion: number;
}


interface RtxAdditionalInfo {
    hp_base_point?: number;
    sp_base_point?: number;
    character_name?: string;
    world_name?: string;
    comment?: string;
    last_modified?: string; // ISO 8601 形式の日時文字列
}
