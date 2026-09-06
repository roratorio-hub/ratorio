import { g_constDataManager } from "../runtime/global.js";

/**
 * 職業選択セレクトボックスの選択肢を構築する。
 * option の value は mig ID の数値文字列で、JS エンジン側は parseInt して利用する。
 * @param {HTMLSelectElement} selectJobElem
 */
export function BuildJobSelectOptions(selectJobElem) {
    const jobManager = g_constDataManager?.jobDataManager;
    const sourceArray = jobManager?.sourceArray;
    if (!Array.isArray(sourceArray)) {
        return;
    }
    for (let migId = 0; migId < sourceArray.length; migId++) {
        if (!sourceArray[migId]) {
            continue; // 欠番はskip
        }
        const jobName = jobManager.GetName(migId);
        if (!jobName) {
            continue; // 名称がない場合はskip
        }
        const option = document.createElement("option");
        option.text = jobName;
        option.value = String(migId);
        selectJobElem.appendChild(option);
    }
}
