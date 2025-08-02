import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";

export interface JobData {
    id_name: string, // ID Name
    id_num: number, //ID Num
    is_doram: boolean, //ドラムかどうか
    _mig_id_name: string, //MIG ID Name
    _mig_id_num: number, //MIG ID Num
    name: string, //名前(英語)
    name_ja: string, //名前(日本語)
    name_ja_alias: string[], //名前(日本語)の別名
    is_rebirthed: boolean, //転生職かどうか
    job_type_num: number, //職業タイプ
    job_type_name: string,  //職業タイプ名
    weight_correction: number, //重量補正
    weapons_aspd: {}, //武器ASPD
    additional_status: {}, //追加ステータス
    hp_basic_values: number[], //基本HP
    sp_basic_values: number[], //基本SP
    learned_skills: number[], //習得スキル
    passive_skills: number[], //パッシブスキル
    attack_skills: number[],  //攻撃スキル
    allow_equipment_weapons_type: number[], //装備可能武器タイプ
    base_lv_min: number, //基本最小レベル
    base_lv_max: number, //基本最大レベル
    job_lv_max: number, //基本最大ジョブレベル
}

export class JobMap {
    private static jobMap: Record<string, JobData> = {};

    /** 全ての職業を取得 */
    static getAll(): [string, JobData][] {
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
    static getByIdName(id_name: string): JobData | undefined {
        return this.jobMap[id_name];
    }

    /** id_num から Job を取得 */
    static getByIdNum(id_num: number): JobData | undefined {
        for (const job of Object.values(this.jobMap)) {
            if (job.id_num === id_num) {
                return job;
            }
        }
        return undefined;
    }

    /** 職業データをロード */
    static async load(): Promise<void> {
        let compressed = await loadFileAsUint8Array('../../ro4/m/json/job.json.zst');
        let decompressed = await zstdDecompress(compressed);
        let jobLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            this.jobMap = JSON.parse(jobLines);
        } catch (err) {
            console.error('JSON parse error:', err);
        }
    }
}

// 初期ロード
JobMap.load();
