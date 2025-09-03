import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";
import { load as loadYAML } from "js-yaml"

interface JobDataParameter {
    id_name: string, // ID Name
    id_num: number, //ID Num
    is_doram: boolean, //ドラムかどうか
    _mig_id_name: string, //MIG ID Name
    _mig_id_num: number, //MIG ID Num
    name: string, //名前(英語)
    name_ja: string, //名前(日本語)
    name_alias: string[], //名前の別名
    is_rebirthed: boolean, //転生職かどうか
    job_type_num: number, //職業タイプ
    job_type_name: string,  //職業タイプ名
    weight_correction: number, //重量補正
    weapons_aspd: { [key: number]: number }, //武器ASPD
    additional_status: { [key: number]: { name: string, add_value: number } }, //追加ステータス
    hp_basic_values: number[], //基本HP
    sp_basic_values: number[], //基本SP
    learned_skills: { [idx: string]: { id: string, id_num: number } }, //習得スキル
    passive_skills: { [idx: string]: { id: string, id_num: number } }, //パッシブスキル
    attack_skills: { [idx: string]: { id: string, id_num: number } }, //攻撃スキル
    allow_equipment_weapons_type: number[], //装備可能武器タイプ
    base_lv_min: number, //基本最小レベル
    base_lv_max: number, //基本最大レベル
    job_lv_max: number, //最大ジョブレベル
}

class JobData {
    parameter: JobDataParameter;

    constructor(parameter: JobDataParameter) {
        this.parameter = parameter;
    }
    getId(): string {
        return this.parameter.id_name;
    }
    getIdNum(): number {
        return this.parameter.id_num;
    }
    getName(): string {
        return this.parameter.name;
    }
    getNameJa(): string {
        return this.parameter.name_ja;
    }
    getNameAlias(): string[] {
        return this.parameter.name_alias;
    }
    isRebirthed(): boolean {
        return this.parameter.is_rebirthed;
    }
    isDoram(): boolean {
        return this.parameter.is_doram;
    }
    getBaseLvMin(): number {
        return this.parameter.base_lv_min;
    }
    getBaseLvMax(): number {
        return this.parameter.base_lv_max;
    }
    getJobLvMax(): number {
        return this.parameter.job_lv_max;
    }
    getLearnedSkills(): string[] {
        return Object.keys(this.parameter.learned_skills).map(idx => this.parameter.learned_skills[idx].id);
    }
    getPassiveSkills(): string[] {
        return Object.keys(this.parameter.passive_skills).map(idx => this.parameter.passive_skills[idx].id);
    }
    getAttackSkills(): string[] {
        return Object.keys(this.parameter.attack_skills).map(idx => this.parameter.attack_skills[idx].id);
    }
    getMigIdName(): string {
        return this.parameter._mig_id_name;
    }
    getMigIdNum(): number {
        return this.parameter._mig_id_num;
    }

    /*
     * 以下は旧式のCMigJobDataを模したメソッド群
     * これらはJobDataParameterのプロパティを参照する形で実装されています。
     * その為、命名規則についても維持しています。
     */
    GetNameKanaArray(): string[] {
        let array = [this.parameter.name_ja]
        array = array.concat(this.parameter.name_alias);
        return array;
    }
    GetBaseExpTableId(): number {
        return 0; //未実装
    }
    GetJobExpTableId(): number {
        return 0; //未実装
    }
    GetWeightBonus(): number {
        return this.parameter.weight_correction;
    }
    GetWeaponAspd(wpnType: number): number | undefined {
        return this.parameter.weapons_aspd[wpnType];
    }
    GetJobBonus(): number[] {
        return [0]; //未実装
    }
    GetHPBase(): number {
        return this.parameter.hp_basic_values[0];
    }
    GetSPBase(): number {
        return this.parameter.sp_basic_values[0];
    }
    GetLearnSkillIdArray(): number[] {
        return Object.keys(this.parameter.learned_skills).map(id => this.parameter.learned_skills[id].id_num);
    }
    GetPassiveSkillIdArray(): number[] {
        return Object.keys(this.parameter.passive_skills).map(id => this.parameter.passive_skills[id].id_num);
    }
    GetAttackSkillIdArray(): number[] {
        return Object.keys(this.parameter.attack_skills).map(id => this.parameter.attack_skills[id].id_num);
    }
    IsEquipableEquipFlag(eqpFlag: number): boolean {
        return this.parameter.allow_equipment_weapons_type.includes(eqpFlag);
    }
}

export class JobMap {
    private static jobMap: Record<string, JobDataParameter> = {};

    /** 全ての職業を取得 */
    static getAll(): [string, JobDataParameter][] {
        return Object.entries(this.jobMap);
    }

    /** id_name(string or number) から Job を取得 */
    static getById(key: string | number): JobData | undefined {
        if (typeof key === 'string') {
            // 文字列の場合はID Nameを検索
            return this.getByIdName(key);
        } else if (typeof key === 'number') {
            // 数値の場合は_mig_id_numを検索
            return this.getByIdNum(key);
        }
        return undefined;
    }

    /** id_name から Job を取得 */
    static getByIdName(idName: string): JobData | undefined {
        const jobParam = this.jobMap[idName];
        return jobParam !== undefined ? new JobData(jobParam) : undefined;
    }

    /** id_num から Job を取得 */
    static getByIdNum(idNum: number): JobData | undefined {
        for (const job of Object.values(this.jobMap)) {
            if (job.id_num === idNum) {
                return new JobData(job);
            }
        }
        return undefined;
    }

    /** _mig_id_num から Job を取得 */
    static getByMigIdNum(migIdNum: number): JobData | undefined {
        for (const job of Object.values(this.jobMap)) {
            if (job._mig_id_num === migIdNum) {
                return new JobData(job);
            }
        }
        return undefined;
    }

    /** id_name(string or number) から MigIdNum を取得 */
    static getMigIdNumFromById(key: string | number): number | undefined {
        if (typeof key === 'string') {
            // 文字列の場合はID Nameを検索
            return this.getByIdName(key)?.getMigIdNum();
        } else if (typeof key === 'number') {
            // 数値の場合は_mig_id_numを検索
            return this.getByIdNum(key)?.getMigIdNum();
        }
        return undefined;
    }

    /** 職業データをロード */
    static async load(): Promise<void> {
        let compressed = await loadFileAsUint8Array('../../dist/job.yaml.zst');
        let decompressed = await zstdDecompress(compressed);
        let jobLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            // YAMLとしてロード
            this.jobMap = loadYAML(jobLines) as Record<string, JobDataParameter>;
        } catch (err) {
            console.error('YAML load error:', err);
        }
    }

    /** ロード完了か確認 **/
    static async isLoaded(): Promise<boolean> {
        return Object.keys(this.jobMap).length > 0;
    }
}

(window as any).JobMap = JobMap; // グローバルに登録
