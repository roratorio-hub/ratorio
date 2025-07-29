import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad.js";
export class ItemMap {
    /** 全てのアイテムを取得 */
    static getAll() {
        return Object.entries(this.itemMap).map(([key, value]) => [Number(key), value]);
    }
    /** id から Item を取得 */
    static getById(id) {
        return this.itemMap[id];
    }
    /** displayname から Item を取得 */
    static getByDisplayName(displayName) {
        for (const item of Object.values(this.itemMap)) {
            if (item.displayname === displayName) {
                return item;
            }
        }
        return undefined;
    }
    /** アイテムデータをロード */
    static async load() {
        let compressed = await loadFileAsUint8Array('../../ro4/m/json/item.json.zst');
        let decompressed = await zstdDecompress(compressed);
        let itemLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            this.itemMap = JSON.parse(itemLines);
        }
        catch (err) {
            console.error('JSON parse error:', err);
        }
    }
}
ItemMap.itemMap = {};
// 初期ロード
ItemMap.load();
