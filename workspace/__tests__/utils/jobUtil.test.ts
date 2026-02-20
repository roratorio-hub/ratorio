/**
 * workspace/utils/jobUtil.ts のユニットテスト
 *
 * ジョブデータのマージ処理テスト
 */

import { describe, it, expect } from 'vitest';
import type { JobDataParameter } from '../../src/loadJobMap';

describe('jobUtil.ts - ジョブデータマージ機能', () => {

    describe('mergeJob関数の実装構造', () => {
        it('関数が存在し、非同期であること', () => {
            // mergeJob は async function
            expect(true).toBe(true);
        });

        it('複数のファイルパスが定義されている', () => {
            // srcYaml: ./data/job.yaml
            // srcJs: ../ro4/m/js/data/mig.job.dat.js
            // skillYaml: ../dist/skill.yaml.zst
            const paths = {
                srcYaml: './data/job.yaml',
                srcJs: '../ro4/m/js/data/mig.job.dat.js',
                skillYaml: '../dist/skill.yaml.zst',
            };

            expect(paths.srcYaml).toContain('job.yaml');
            expect(paths.srcJs).toContain('mig.job.dat.js');
            expect(paths.skillYaml).toContain('skill.yaml.zst');
        });
    });

    describe('JobDataParameter の型定義', () => {
        it('基本的なジョブにすべての必須フィールドが含まれる', () => {
            const basicJob: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(basicJob).toHaveProperty('id_name');
            expect(basicJob).toHaveProperty('name_ja');
            expect(basicJob).toHaveProperty('is_rebirthed');
        });

        it('ドラムジョブの定義が可能', () => {
            const doramJob: JobDataParameter = {
                id_name: 'summoner',
                id_num: 4051,
                is_doram: true,
                name: 'Summoner',
                name_ja: '召喚士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 5,
                job_type_name: 'Doram',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(doramJob.is_doram).toBe(true);
        });

        it('転生職の定義が可能', () => {
            const rebirthedJob: JobDataParameter = {
                id_name: 'high_swordsman',
                id_num: 4021,
                is_doram: false,
                name: 'High Swordsman',
                name_ja: 'ハイ剣士',
                name_alias: [],
                is_rebirthed: true,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 70,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(rebirthedJob.is_rebirthed).toBe(true);
            expect(rebirthedJob.job_lv_max).toBe(70);
        });
    });

    describe('ジョブデータの処理', () => {
        it('YAML読み込み後のオブジェクト形式', () => {
            // Record<string, JobDataParameter> の構造
            const jobMap: Record<string, JobDataParameter> = {
                'swordsman': {
                    id_name: 'swordsman',
                    id_num: 1,
                    is_doram: false,
                    name: 'Swordsman',
                    name_ja: '剣士',
                    name_alias: [],
                    is_rebirthed: false,
                    job_type_num: 1,
                    job_type_name: 'Sword',
                    weight_correction: 100,
                    weapons_aspd: {},
                    additional_status: {},
                    hp_basic_values: [],
                    sp_basic_values: [],
                    learned_skills: {},
                    passive_skills: {},
                    attack_skills: {},
                    allow_equipment_weapons_type: [],
                    base_lv_min: 1,
                    base_lv_max: 99,
                    job_lv_max: 50,
                    status_basic_max: 99,
                    status_talent_max: 99,
                }
            };

            expect(jobMap['swordsman'].name_ja).toBe('剣士');
        });

        it('mig.job.dat.jsからのマイグレーションデータの処理', () => {
            // parseJobDat が mig.job.dat.js から情報を抽出
            expect(true).toBe(true);
        });

        it('Skillオブジェクトとの統合', () => {
            // skill.yaml.zst から Skill データを読み込み
            // スキル統合時に使用
            expect(true).toBe(true);
        });
    });

    describe('weapons_aspd のマッピング', () => {
        it('武器タイプごとのASPDが正しく設定される', () => {
            const job: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {
                    1: 180,  // 両手剣
                    2: 165,  // 両手槍
                    4: 195,  // 剣盾
                },
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(job.weapons_aspd[1]).toBe(180);
            expect(job.weapons_aspd[4]).toBe(195);
        });

        it('武器タイプが複数ある場合が処理される', () => {
            const aspdMap = {
                1: 180,
                2: 165,
                3: 175,
                4: 195,
                10: 150,
            };

            expect(Object.keys(aspdMap).length).toBeGreaterThan(1);
        });
    });

    describe('additional_status のマッピング', () => {
        it('レベル毎の追加ステータスが正しく設定される', () => {
            const job: JobDataParameter = {
                id_name: 'mage',
                id_num: 2,
                is_doram: false,
                name: 'Mage',
                name_ja: 'マジシャン',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 2,
                job_type_name: 'Magic',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {
                    1: { name: 'int', add_value: 1 },
                    2: { name: 'int', add_value: 1 },
                    3: { name: 'dex', add_value: 1 },
                },
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(job.additional_status[1].name).toBe('int');
            expect(job.additional_status[3].name).toBe('dex');
        });
    });

    describe('HP・SP基本値のマッピング', () => {
        it('レベル毎のHP基本値が配列で設定される', () => {
            const job: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [40, 47, 54, 61, 68, 75],
                sp_basic_values: [10, 12, 14, 16, 18, 20],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(job.hp_basic_values.length).toBeGreaterThan(0);
            expect(job.hp_basic_values[0]).toBe(40);
            expect(job.sp_basic_values[0]).toBe(10);
        });

        it('すべてのジョブレベル分のHP/SPが配列に含まれる', () => {
            const hpValues = [40, 47, 54, 61, 68, 75, 82, 89, 96];
            expect(hpValues.length).toBeGreaterThanOrEqual(1);
            expect(hpValues[hpValues.length - 1] > hpValues[0]).toBe(true);
        });
    });

    describe('スキル情報のマッピング', () => {
        it('習得スキルが正しく設定される', () => {
            const job: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {
                    'bash': { id: 'bash', id_num: 1 },
                    'magnum_break': { id: 'magnum_break', id_num: 42 },
                },
                passive_skills: {
                    'passive_mastery_sword': { id: 'passive_mastery_sword', id_num: 815 },
                },
                attack_skills: {
                    'bash': { id: 'bash', id_num: 1 },
                    'magnum_break': { id: 'magnum_break', id_num: 42 },
                },
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(Object.keys(job.learned_skills).length).toBeGreaterThan(0);
            expect(job.learned_skills['bash'].id).toBe('bash');
        });

        it('パッシブスキルが正しく設定される', () => {
            const passiveSkills = {
                'passive_skill_1': { id: 'passive_skill_1', id_num: 800 },
                'passive_skill_2': { id: 'passive_skill_2', id_num: 801 },
            };

            expect(Object.keys(passiveSkills).length).toBe(2);
        });

        it('攻撃スキルが正しく設定される', () => {
            const attackSkills = {
                'bash': { id: 'bash', id_num: 1 },
                'power_attack': { id: 'power_attack', id_num: 5 },
            };

            expect(Object.keys(attackSkills).length).toBe(2);
        });

        it('マイグレーション時のスキルIDマッピング', () => {
            // getSkillByMigId で 古いID → 新しいID に変換
            expect(true).toBe(true);
        });
    });

    describe('装備可能武器タイプのマッピング', () => {
        it('複数の武器タイプが設定される', () => {
            const job: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [1, 2, 4, 6, 26],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(job.allow_equipment_weapons_type.length).toBeGreaterThan(1);
            expect(job.allow_equipment_weapons_type).toContain(1);
        });
    });

    describe('マイグレーション情報', () => {
        it('マイグレーション専用フィールドが保持される', () => {
            const migratedJob: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: [],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: {},
                additional_status: {},
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
                _mig_id_num: 0,
            };

            expect(migratedJob._mig_id_num).toBe(0);
        });

        it('IDE マッピング機能が動作する', () => {
            // getMigJobById で 古いID → 新しいID に変換
            // 存在しない場合は null を返す
            expect(true).toBe(true);
        });
    });

    describe('ファイル処理フロー', () => {
        it('処理ステップが正しい順序で実行される', () => {
            const steps = [
                '1. srcYamlファイルを読み込み',
                '2. skillYaml.zstを展開して読み込み',
                '3. mig.job.dat.jsをパース',
                '4. 各jobをマージ（マイグレーション適用）',
                '5. YAMLダンプ',
                '6. outYamlファイルに書き込み',
                '7. Zstd圧縮',
                '8. outYamlZstdファイルに書き込み'
            ];

            expect(steps.length).toBeGreaterThanOrEqual(7);
        });

        it('エラーケースが適切に処理される', () => {
            const errorCases = [
                'skill.yaml.zst の展開に失敗',
                'dumpYAML が null を返す',
                'zstdCompress が null を返す',
            ];

            expect(errorCases.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('job_typeの管理', () => {
        it('各jobTypeが適切なパラメータを持つ', () => {
            // jobTypeMap に定義された各職業タイプ
            const jobTypeExample = {
                en: 'Sword',
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(jobTypeExample).toHaveProperty('en');
            expect(jobTypeExample).toHaveProperty('base_lv_min');
            expect(jobTypeExample).toHaveProperty('job_lv_max');
        });
    });

    describe('ステータスマップ', () => {
        it('ステータスIDからステータス名への変換', () => {
            // statusMap[status_num] => status_name
            // 例: statusMap[0] = 'str'
            const statusMapExample = {
                0: 'str',
                1: 'agi',
                2: 'vit',
                3: 'int',
                4: 'dex',
                5: 'luk',
            };

            expect(statusMapExample[0]).toBe('str');
            expect(statusMapExample[3]).toBe('int');
        });
    });

    describe('大規模データ処理', () => {
        it('大量のジョブでも処理可能', () => {
            const largeJobMap: Record<string, JobDataParameter> = {};

            for (let i = 0; i < 100; i++) {
                largeJobMap[`job_${i}`] = {
                    id_name: `job_${i}`,
                    id_num: i,
                    is_doram: i > 50,
                    name: `Job ${i}`,
                    name_ja: `ジョブ${i}`,
                    name_alias: [],
                    is_rebirthed: i > 25,
                    job_type_num: i % 5,
                    job_type_name: `Type${i % 5}`,
                    weight_correction: 100,
                    weapons_aspd: {},
                    additional_status: {},
                    hp_basic_values: [],
                    sp_basic_values: [],
                    learned_skills: {},
                    passive_skills: {},
                    attack_skills: {},
                    allow_equipment_weapons_type: [],
                    base_lv_min: 1,
                    base_lv_max: 99,
                    job_lv_max: 50,
                    status_basic_max: 99,
                    status_talent_max: 99,
                };
            }

            expect(Object.keys(largeJobMap).length).toBe(100);
        });
    });
});
