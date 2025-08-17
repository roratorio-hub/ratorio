import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";
import { load as loadYAML } from "js-yaml"

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
        let compressed = await loadFileAsUint8Array('../../dist/skill.yaml.zst');
        let decompressed = await zstdDecompress(compressed);
        let skillLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            // YAMLとしてロード
            this.skillMap = loadYAML(skillLines) as Record<string, SkillData>;
        } catch (err) {
            console.error('YAML load error:', err);
        }
    }

    /** ロード完了か確認 **/
    static async isLoaded(): Promise<boolean> {
        return Object.keys(this.skillMap).length > 0;
    }
}

(window as any).SkillMap = SkillMap; // グローバルに登録
