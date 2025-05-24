"use strict";
// Base64デコード関数（URLセーフに対応）
function base64ToUint8Array(base64) {
    // パディングの補完
    let paddedBase = base64.replace(/-/g, '+').replace(/_/g, '/');
    const padding = paddedBase.length % 4;
    if (padding === 2)
        paddedBase += '==';
    else if (padding === 3)
        paddedBase += '=';
    const binaryString = atob(paddedBase);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
// zlibで解凍
function zlibDecompress(compressed) {
    try {
        // pako.inflate() で zlib データを解凍
        const decompressedData = pako.inflate(compressed);
        return new TextDecoder('utf-8').decode(decompressedData);
    }
    catch (err) {
        console.error("解凍エラー:", err);
        return null;
    }
}
// Decode => 解凍 => JSON復元
function decodeProcess(encodedData) {
    let jsonObject = null;
    try {
        // デコード => 圧縮データ
        const compressedData = base64ToUint8Array(encodedData);
        // zlibで解凍
        const jsonString = zlibDecompress(compressedData);
        if (jsonString) {
            // JSON文字列 => JavaScriptオブジェクト
            jsonObject = JSON.parse(jsonString);
            //console.debug("Decoded JSON:", jsonObject);
        }
    }
    catch (error) {
        console.error("エラーが発生しました:", error);
    }
    return jsonObject;
}
async function fetchSearchSkill(seachUrls) {
    try {
        // URLごとにリクエストを作成
        const requests = seachUrls.map(url => fetch(url));
        // すべてのリクエストが完了するまで待機
        const responses = await Promise.all(requests);
        // 各レスポンスごとに処理を実行
        const data = await Promise.all(responses.map(async (response, idx) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            // URLごとに異なる処理を追加する場合はここに追加
            //console.debug(`Data from URL ${idx}:`, jsonData);
            const skillLvElement = document.getElementById("OBJID_SELECT_LEARNED_SKILL_LEVEL_" + jsonData.ratorio_skill_num);
            skillLvElement.setAttribute("data-skill-name", jsonData.skill_name);
        }));
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function loadRodbTranslator(fragment) {
    const prefixCheck = /^#rtx(\d+):(.+)$/;
    const matches = prefixCheck.exec(fragment);
    if (!matches) {
        return;
    }
    // Version Check
    if (Number(matches[1]) != 1) {
        alert("RODB Translatorから出力された\nフォーマットバージョンが異なるため中止します\nVersion:" + matches[1]);
        return;
    }
    // フラグメントをデコード
    const decodedData = decodeURIComponent(matches[2]);
    // 中身のデコード、zlib解凍を行う
    const jsonObject = decodeProcess(decodedData);
    if (!jsonObject) {
        alert("URLからのデータロードに失敗しました");
        return;
    }
    // 不具合の暫定対処
    // https://github.com/ragnarok-online-japan/translator/issues/1 
    if (!jsonObject.status.ratorio_job_id_num && jsonObject.status.job_class_localization == "インクイジター") {
        jsonObject.status.ratorio_job_id_num = 74;
        jsonObject.status.job_class = "inquisitor";
    }
    // Set Job
    const jobElement = document.getElementById("OBJID_SELECT_JOB");
    jobElement.value = String(jsonObject.status.ratorio_job_id_num);
    const jobContainer = document.getElementById("select2-OBJID_SELECT_JOB-container");
    if (jobContainer) {
        jobContainer.textContent = jsonObject.status.job_class_localization;
    }
    changeJobSettings(jsonObject.status.ratorio_job_id_num);
    // Set Base Lv
    const baseLvElement = document.getElementById("OBJID_SELECT_BASE_LEVEL");
    baseLvElement.value = String(jsonObject.status.base_lv);
    // Set Job Lv
    const jobLvElement = document.getElementById("OBJID_SELECT_JOB_LEVEL");
    jobLvElement.value = String(jsonObject.status.job_lv);
    // Set status
    const keys = [
        "str", "agi", "vit", "int", "dex", "luk",
        "pow", "sta", "wis", "spl", "con", "crt"
    ];
    for (const key of keys) {
        const statusElement = document.getElementById("OBJID_SELECT_STATUS_" + key.toUpperCase());
        let value = jsonObject.status[key];
        statusElement.value = String(value);
    }
    // Set Skill Lv
    const skillColumnCheckbox = document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX");
    skillColumnCheckbox.checked = true;
    OnClickSkillSWLearned();
    let seachUrls = [];
    const urlPrefix = "https://rodb.aws.0nyx.net/translator/approximate_search/skill";
    let idx = 0;
    while (true) {
        const skillNameElement = document.getElementById("OBJID_TD_LEARNED_SKILL_NAME_" + idx);
        if (!skillNameElement) {
            break;
        }
        const skillName = skillNameElement.textContent?.trim();
        if (skillName) {
            seachUrls.push(`${urlPrefix}?word=${encodeURIComponent(skillName)}&ratorio_skill_num=${idx}`);
        }
        idx++;
    }
    // スキルのSelectBoxにdata-skill-name属性を付与
    await fetchSearchSkill(seachUrls);
    Object.entries(jsonObject.skills).forEach(([skillName, skill]) => {
        const skillLvElement = document.querySelector(`select[data-skill-name=${skillName}]`);
        console.debug(`${skillName}`);
        if (skillLvElement) {
            skillLvElement.value = String(skill.lv);
            console.debug(`${skillName} : ${skillLvElement.value}`);
            const event = new Event('change', { bubbles: true });
            skillLvElement.dispatchEvent(event);
        }
    });
    // 計算
    CalcStatusPoint(true);
    StAllCalc();
    AutoCalc();
}
