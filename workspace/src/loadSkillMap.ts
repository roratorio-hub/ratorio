import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";
import { load as loadYAML } from "js-yaml"

interface SkillDataParameter {
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
    }[] | [];
    separate_lv: boolean | null;
    sp_amount: Record<number, number> | null;
    type: string | null;
}

class SkillData {
    parameter: SkillDataParameter;

    constructor(parameter: SkillDataParameter) {
        this.parameter = parameter;
    }
    getId(): string {
        return this.parameter.id;
    }
    getIdNum(): number {
        return this.parameter.id_num;
    }
    getName(): string | null {
        return this.parameter.name;
    }
    getMaxLv(): number | null {
        return this.parameter.max_lv;
    }
    getAttackRange(): Record<number, number> | null {
        return this.parameter.attack_range;
    }
    getSpAmount(): Record<number, number> | null {
        return this.parameter.sp_amount;
    }
    getSeparateLv(): boolean | null {
        return this.parameter.separate_lv;
    }
    getNeedSkillList(): { need_lv: number; skill_id: string; }[] | null {
        return this.parameter.need_skill_list;
    }
    getMigIdNum(): number | null {
        return this.parameter._mig_id_num;
    }
}

export class SkillMap {
    private static skillMap: Record<string, SkillDataParameter> = {};
    private static migIdNumIndex: Record<number, string> = {};

    /** 全てのスキルを取得 */
    static getAll(): [string, SkillDataParameter][] {
        return Object.entries(this.skillMap);
    }

    /** id から Skill を取得 */
    static getById(id: string): SkillData | undefined {
        const skillParam = this.skillMap[id];
        return skillParam !== undefined ? new SkillData(skillParam) : undefined;
    }

    /** id から Skill があるか */
    static existsById(id: string): boolean {
        return this.skillMap[id] !== undefined;
    }

    /** _mig_id_num から Skill を取得 */
    static getByMigIdNum(migIdNum: number): SkillData | undefined {
        const skillId = this.migIdNumIndex[migIdNum];
        return skillId !== undefined ? this.getById(skillId) : undefined;
    }

    static getIdByMigIdNum(migIdNum: number): string | undefined {
        return this.migIdNumIndex[migIdNum];
    }

    /** スキルデータをロード */
    static async load(): Promise<void> {
        let compressed = await loadFileAsUint8Array('../../dist/skill.yaml.zst');
        let decompressed = await zstdDecompress(compressed);
        let skillLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            // YAMLとしてロード
            this.skillMap = loadYAML(skillLines) as Record<string, SkillDataParameter>;

            // インデックスを構築
            this.migIdNumIndex = {};
            for (const skill of Object.values(this.skillMap)) {
                if (skill._mig_id_num !== null && skill._mig_id_num !== undefined) {
                    this.migIdNumIndex[skill._mig_id_num] = skill.id;
                }
            }
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
