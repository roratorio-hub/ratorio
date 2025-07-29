import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad.js";
export class SkillMap {
    /** 全てのスキルを取得 */
    static getAll() {
        return Object.entries(this.skillMap);
    }
    /** id から Skill を取得 */
    static getById(id) {
        return this.skillMap[id];
    }
    /** id_num から Skill を取得 */
    static getByIdNum(num) {
        for (const skill of Object.values(this.skillMap)) {
            if (skill.id_num === num) {
                return skill;
            }
        }
        return undefined;
    }
    /** _mig_id から Skill を取得 */
    static getByMigId(id) {
        for (const skill of Object.values(this.skillMap)) {
            if (skill._mig_id === id) {
                return skill;
            }
        }
        return undefined;
    }
    /** _mig_id2 から skill.h.jsで定義していた数値を取得 */
    static getMigIdNumByMigId2(id) {
        for (const skill of Object.values(this.skillMap)) {
            if (skill._mig_id2 === id) {
                if (skill._mig_id_num !== null) {
                    return skill._mig_id_num;
                }
                break;
            }
        }
        return -1;
    }
    /** スキルデータをロード */
    static async load() {
        let compressed = await loadFileAsUint8Array('../../ro4/m/json/skill.json.zst');
        let decompressed = await zstdDecompress(compressed);
        let skillLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            this.skillMap = JSON.parse(skillLines);
        }
        catch (err) {
            console.error('JSON parse error:', err);
        }
    }
}
SkillMap.skillMap = {};
// 初期ロード
SkillMap.load();
