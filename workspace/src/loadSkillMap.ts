import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";
import { parse as JSONCparser } from "jsonc-parser";

// SkillMapの型定義
export interface SkillData {
    _mig_id: string | null;
    _mig_id2: string | null;
    _mig_id_num: number | null;
    _mig_name: string | null;
    attack_range: Record<number, number> | null;
    id: string;
    id_num: number;
    max_lv: number | null;
    name: string | null;
    need_skill_list: {
        need_lv: number;
        skill_id: string;
    }[] | null;
    seperate_lv: boolean | null;
    sp_amount: Record<number, number> | null;
    type: string | null;
}

export class SkillMap {
    private static skillMap: Record<string, SkillData> = {};

    /** 全てのスキルを取得 */
    static getAll(): [string, SkillData][] {
        return Object.entries(this.skillMap);
    }

    /** id から Skill を取得 */
    static getById(id: string): SkillData | undefined {
        return this.skillMap[id];
    }

    /** id_num から Skill を取得 */
    static getByIdNum(num: number): SkillData | undefined {
        for (const skill of Object.values(this.skillMap)) {
            if (skill.id_num === num) {
                return skill;
            }
        }
        return undefined;
    }

    /** _mig_id から Skill を取得 */
    static getByMigId(midId: string): SkillData | undefined {
        for (const skill of Object.values(this.skillMap)) {
            if (skill._mig_id === midId) {
                return skill;
            }
        }
        return undefined;
    }

    /** _mig_id2 から skill.h.jsで定義していた数値を取得 */
    static getMigIdNumByMigId2(migId2: string): number {
        for (const skill of Object.values(this.skillMap)) {
            if (skill._mig_id2 === migId2) {
                if (skill._mig_id_num !== null) {
                    return skill._mig_id_num;
                }
                break;
            }
        }
        return -1;
    }

    /** スキルデータをロード */
    static async load(): Promise<void> {
        let compressed = await loadFileAsUint8Array('../../ro4/m/json/skill.jsonc.zst');
        let decompressed = await zstdDecompress(compressed);
        let skillLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            this.skillMap = JSONCparser(skillLines);
        } catch (err) {
            console.error('JSONC parse error:', err);
        }
    }
}

// 初期ロード
SkillMap.load();
