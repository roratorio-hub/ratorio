import { load as loadYAML } from "js-yaml"
import { decodeProcess, API_VERSION, RtxData, RtxEquipmentLocation, RtxEquipments, RtxStatus, CONTROL_CONF_LIST } from "./rtxApiCommon";

// LocalFile読み込み
function loadFromLocalFile(): void {
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
                    // 完了を待つように変更
                    await importRtxDataObject(dataObject);
                    console.log(`🐱‍💻データをファイルから読み込みました: ${file.name}`);
                    alert(`🐱‍💻データをファイルから読み込みました: ${file.name}`);
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

// LocalStorage読み込み
async function loadFromLocalStorage(key: string = "SAVEDATA_RTX_DEFAULT"): Promise<void> {
    const yamlData = localStorage.getItem(key);
    if (!yamlData) {
        alert(`LocalStorageにデータがありません: ${key}`);
        throw new Error("No data found in LocalStorage");
    }
    const dataObject = loadYAML(yamlData) as RtxData;
    await importRtxDataObject(dataObject);
    console.log(`🐱‍💻データをLocalStorageから読み込みました: ${key}`);
    alert(`🐱‍💻データをLocalStorageから読み込みました: ${key}`);
}
(window as any).loadFromLocalStorage = loadFromLocalStorage; //グローバルに登録

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

    await importRtxDataObject(dataObject);
}

async function importRtxDataObject(dataObject: RtxData): Promise<void> {
    // ローディングインジケーターを表示
    showLoadingIndicator();

    // setTimeout 内の処理が完了するまで待てるよう Promise で包む
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            try {
                const changeEvent = new Event('change', { bubbles: true });

                // --- 既存処理開始 ---
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
                const keys: (keyof RtxStatus)[] = [
                    "str", "agi", "vit", "int", "dex", "luk",
                    "pow", "sta", "wis", "spl", "con", "crt"
                ];

                for (const key of keys) {
                    const statusElement = document.getElementById("OBJID_SELECT_STATUS_" + key.toUpperCase()) as HTMLInputElement;
                    let value = dataObject.status[key];
                    statusElement.value = String(value);
                }

                // ここから装備／カード／オプションの適用
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
                        console.warn(`No valid select ${selectId} to ID: ${idNum}, Display Name: ${displayName}, MIG ID: ${migIdNum}`);
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
                    accessory1: { prefix: "OBJID_ACCESSORY_1", rndopt: "OBJID_EQUIP_REGION_ID_ACCESSORY_1" },
                    accessory2: { prefix: "OBJID_ACCESSORY_2", rndopt: "OBJID_EQUIP_REGION_ID_ACCESSORY_2" }
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

                // arrow_type 反映 (存在する場合のみ)
                try {
                    const arrowElement = document.getElementById("OBJID_SELECT_ARROW") as HTMLSelectElement | null;
                    if (arrowElement && dataObject.equipments.arrow_type !== undefined && dataObject.equipments.arrow_type !== null) {
                        arrowElement.value = String(dataObject.equipments.arrow_type);
                        arrowElement.dispatchEvent(changeEvent);
                    }
                } catch (ex) {
                    console.warn("arrow_type の適用に失敗しました", ex);
                }

                // 各装備について適用処理
                if (dataObject.equipments) {
                    (Object.keys(equipMappings) as RtxEquipmentLocation[]).forEach((location) => {
                        const mapping = equipMappings[location];
                        const equipment = (dataObject.equipments as RtxEquipments)[location];
                        if (!equipment) return;

                        // 安全に _mig_id_num を取得（ユニオン型で存在しない場合の型エラー回避）
                        const migId = (equipment && (equipment as any) && (equipment as any)["_mig_id_num"] !== undefined)
                            ? (equipment as any)["_mig_id_num"]
                            : null;

                        // 装備本体（ログは安全な値を使う）
                        console.debug(`Applying equipment for ${location}: ${equipment.name} (ID: ${equipment.id_num}, MIG ID: ${migId})`);
                        setSelectByOptionText(mapping.prefix, equipment.id_num, equipment.name || null, migId);

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

                                // スロットの _mig_id_num も安全に取得
                                const slotEntry = equipment.slot[slotId];
                                const slotMigId = (slotEntry && (slotEntry as any) && (slotEntry as any)["_mig_id_num"] !== undefined)
                                    ? (slotEntry as any)["_mig_id_num"]
                                    : null;

                                // まずカードセレクトとして適用
                                const slotSelectId = `${mapping.prefix}_CARD_${slotId}`;
                                setSelectByOptionText(slotSelectId, slotEntry?.id_num ?? null, slotEntry?.name || null, slotMigId);

                                // もし別のUIがある場合は追加のIDにも対応させたい場合ここに追記
                            });
                        }

                        // ランダムオプション（kind と value）
                        if (equipment.random_option && mapping.rndopt) {
                            const slotModeButton = document.getElementById("OBJID_SLOT_MODE_BUTTON") as HTMLButtonElement | null;
                            // ランダムオプション欄を表示
                            if (slotModeButton) slotModeButton.click();

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
                            if (slotModeButton) slotModeButton.click();
                        }
                    });
                }

                // 習得スキル
                const skillColumnCheckbox = document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX") as HTMLInputElement;
                if (!skillColumnCheckbox.checked) {
                    skillColumnCheckbox.click();
                }
                Object.entries(dataObject.learned_skills).forEach(([skillId, skill]) => {
                    const skillLvElement = document.querySelector(`select[data-rtx-learned-skill-id=${skillId}]`) as HTMLSelectElement;
                    if (skillLvElement) {
                        skillLvElement.value = String(skill.lv);
                        //console.debug(`Skill ID: ${skillId}, 習得レベル: ${skillLvElement.value}`)
                        skillLvElement.dispatchEvent(changeEvent);
                    }
                });
                skillColumnCheckbox.click();

                // 支援
                if (dataObject.supports) {
                    CONTROL_CONF_LIST.forEach((configDict) => {
                        if (configDict.type !== 'support') return; // 支援のみ
                        const controlSwitchBox = document.getElementById(configDict.control_switch_element_id) as HTMLInputElement | null;
                        if (!controlSwitchBox) return;
                        if (!controlSwitchBox.checked) {
                            controlSwitchBox.click();
                        }
                        const confName = configDict['conf_name'];
                        if (dataObject.supports && dataObject.supports[confName]) {
                            const confObj = dataObject.supports[confName];
                            Object.entries(confObj).forEach(([elementId, entry]) => {
                                const element = document.getElementById(elementId) as HTMLSelectElement | HTMLInputElement | null;
                                if (element) {
                                    if (element.type === "checkbox") {
                                        element.checked = entry.value === 1;
                                        element.dispatchEvent(changeEvent);
                                    } else {
                                        element.value = String(entry.value);
                                        element.dispatchEvent(changeEvent);
                                    }
                                }
                            });
                        }
                        controlSwitchBox.click();
                    });
                }
                if (dataObject.customize) {
                    CONTROL_CONF_LIST.forEach((configDict) => {
                        if (configDict.type !== 'customize') return; // カスタマイズのみ
                        const controlSwitchBox = document.getElementById(configDict.control_switch_element_id) as HTMLInputElement | null;
                        if (!controlSwitchBox) return;
                        if (!controlSwitchBox.checked) {
                            controlSwitchBox.click();
                        }
                        const confName = configDict['conf_name'];
                        if (dataObject.customize && dataObject.customize[confName]) {
                            const confObj = dataObject.customize[confName];
                            Object.entries(confObj).forEach(([elementId, entry]) => {
                                const element = document.getElementById(elementId) as HTMLSelectElement | HTMLInputElement | null;
                                if (element) {
                                    if (element.type === "checkbox") {
                                        element.checked = entry.value === 1;
                                        element.dispatchEvent(changeEvent);
                                    } else {
                                        element.value = String(entry.value);
                                        element.dispatchEvent(changeEvent);
                                    }
                                }
                            });
                        }
                        controlSwitchBox.click();
                    });
                }

                // 計算
                CalcStatusPoint(true);
                StAllCalc();
                AutoCalc();
            } catch (err) {
                console.error("importRtxDataObject 内でエラー:", err);
            } finally {
                // 処理中にエラーが出てもインジケーターを消して resolve する
                try { hideLoadingIndicator(); } catch (e) { /* ignore */ }
                resolve();
            }
        }, 0);
    });
}
