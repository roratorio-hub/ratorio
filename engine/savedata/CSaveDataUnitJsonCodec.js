/**
 * セーブデータユニット配列の JSON シリアライズ.
 * `CSaveDataManager.encodeToJSON()` の実体をここへ抽出したもの（残件台帳 B-11 Phase 0）。
 * 差分オラクル（`savedata-collect.js`）が `CSaveDataManager` の重い import グラフ
 * （equip.js・hmjob.js 等）を経由せずに同じシリアライズ規則を再利用するための分離。
 */

/**
 * セーブデータユニット配列を JSON へ変換する.
 * @param {Array<{parsedMap: Map, propInfoMap: Map}>} saveDataUnitArray
 * @returns {string} JSON文字列（BigInt は文字列化して埋め込む）
 */
export function serializeSaveDataUnitsToJSON(saveDataUnitArray) {

    // 全てのセーブデータユニットを効率的に JSON に変換
    const unitDataArray = saveDataUnitArray.map((unit) => {
        // Map -> Object に変換（JSON 対応）
        const parsedMapObj = {};
        unit.parsedMap.forEach((value, key) => {
            parsedMapObj[key] = value;
        });

        const propInfoMapObj = {};
        unit.propInfoMap.forEach((value, key) => {
            propInfoMapObj[key] = {
                name: value.name,
                bits: value.bits
            };
        });

        return {
            parsedMap: parsedMapObj,
            propInfoMap: propInfoMapObj
        };
    });

    // JSON 文字列に変換して返す（BigInt を文字列に変換）
    return JSON.stringify(unitDataArray, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    });
}
