import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad.js";
export class JobMap {
    /** 全ての職業を取得 */
    static getAll() {
        return Object.entries(this.jobMap);
    }
    /** id_name(string or number) から Job を取得 */
    static getById(key) {
        if (typeof key === 'string') {
            // 文字列の場合はID Nameを検索
            if (key in this.jobMap) {
                return this.jobMap[key];
            }
        }
        else if (typeof key === 'number') {
            // 数値の場合は_mig_id_numを検索(暫定的対応)
            for (const job of Object.values(this.jobMap)) {
                if (job._mig_id_num === key) {
                    return job;
                }
            }
        }
        return undefined;
    }
    /** id_name から Job を取得 */
    static getByIdName(id_name) {
        return this.jobMap[id_name];
    }
    /** id_num から Job を取得 */
    static getByIdNum(id_num) {
        for (const job of Object.values(this.jobMap)) {
            if (job.id_num === id_num) {
                return job;
            }
        }
        return undefined;
    }
    /** 職業データをロード */
    static async load() {
        let compressed = await loadFileAsUint8Array('../../ro4/m/json/job.json.zst');
        let decompressed = await zstdDecompress(compressed);
        let jobLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            this.jobMap = JSON.parse(jobLines);
        }
        catch (err) {
            console.error('JSON parse error:', err);
        }
    }
}
JobMap.jobMap = {};
// 初期ロード
JobMap.load();
