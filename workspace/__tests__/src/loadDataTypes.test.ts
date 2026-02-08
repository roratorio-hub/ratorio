/**
 * workspace/src の Load関数群のユニットテスト
 *
 * loadItemMap.ts, loadJobMap.ts, loadSkillMap.ts の型定義と基本構造のテスト
 */

import { describe, it, expect } from 'vitest';
import type { ItemDataParameter } from '../../src/loadItemMap';
import type { JobDataParameter } from '../../src/loadJobMap';
import type { SkillDataParameter } from '../../src/loadSkillMap';

describe('Load関数群 - 型定義とインターフェイス', () => {

    describe('ItemDataParameter', () => {
        it('基本的なアイテムパラメータオブジェクトが型チェックできる', () => {
            const itemData: ItemDataParameter = {
                id: 1,
                displayname: 'Sample Item',
                description: 'A sample item',
                is_card: false,
                is_enchant: false,
                resname: 'sample_item',
                type: 'weapon',
                slot: undefined,
            };

            expect(itemData.id).toBe(1);
            expect(itemData.displayname).toBe('Sample Item');
            expect(itemData.is_card).toBe(false);
            expect(itemData.is_enchant).toBe(false);
        });

        it('カードのパラメータが正しい型を持つ', () => {
            const cardData: ItemDataParameter = {
                id: 4202,
                displayname: 'Card Name',
                description: 'A card',
                is_card: true,
                is_enchant: false,
                resname: 'card_01',
                type: null,
                slot: undefined,
            };

            expect(cardData.is_card).toBe(true);
            expect(cardData.is_enchant).toBe(false);
        });

        it('エンチャントのパラメータが正しい型を持つ', () => {
            const enchantData: ItemDataParameter = {
                id: 6001,
                displayname: 'Enchant Name',
                description: 'An enchant',
                is_card: false,
                is_enchant: true,
                resname: 'enchant_01',
                type: null,
                slot: undefined,
            };

            expect(enchantData.is_card).toBe(false);
            expect(enchantData.is_enchant).toBe(true);
        });

        it('ボーナス情報を含むアイテムパラメータが型チェックできる', () => {
            const itemWithBonus: ItemDataParameter = {
                id: 2001,
                displayname: 'Equipment',
                description: 'Equipment with bonus',
                is_card: false,
                is_enchant: false,
                resname: 'equipment_01',
                type: 'armor',
                slot: 2,
                def: 10,
                mdef: 5,
                atk: 50,
                required_lv: 50,
                stats: [
                    { stat: 'str', value: 5 },
                    { stat: 'agi', value: 3 },
                ],
            };

            expect(itemWithBonus.def).toBe(10);
            expect(itemWithBonus.stats).toBeDefined();
            expect(itemWithBonus.stats!.length).toBe(2);
        });
    });

    describe('JobDataParameter', () => {
        it('基本的なジョブパラメータオブジェクトが型チェックできる', () => {
            const jobData: JobDataParameter = {
                id_name: 'swordsman',
                id_num: 1,
                is_doram: false,
                name: 'Swordsman',
                name_ja: '剣士',
                name_alias: ['Swordman'],
                is_rebirthed: false,
                job_type_num: 1,
                job_type_name: 'Sword',
                weight_correction: 100,
                weapons_aspd: { 1: 180 },
                additional_status: {},
                hp_basic_values: [40, 47, 54, 61],
                sp_basic_values: [10, 12, 14, 16],
                learned_skills: {},
                passive_skills: {},
                attack_skills: {},
                allow_equipment_weapons_type: [1, 2],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(jobData.id_name).toBe('swordsman');
            expect(jobData.name_ja).toBe('剣士');
            expect(jobData.is_rebirthed).toBe(false);
        });

        it('転生職のパラメータが正しい型を持つ', () => {
            const rebirthedJobData: JobDataParameter = {
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

            expect(rebirthedJobData.is_rebirthed).toBe(true);
        });

        it('ドラムのパラメータが正しい型を持つ', () => {
            const doramData: JobDataParameter = {
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

            expect(doramData.is_doram).toBe(true);
        });

        it('複雑なスキルデータを含むジョブパラメータが型チェックできる', () => {
            const jobWithSkills: JobDataParameter = {
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
                additional_status: { 1: { name: 'str', add_value: 5 } },
                hp_basic_values: [],
                sp_basic_values: [],
                learned_skills: { 1: { id: 'bash', id_num: 1 } },
                passive_skills: { 1: { id: 'passive_skill', id_num: 100 } },
                attack_skills: { 1: { id: 'slash', id_num: 5 } },
                allow_equipment_weapons_type: [],
                base_lv_min: 1,
                base_lv_max: 99,
                job_lv_max: 50,
                status_basic_max: 99,
                status_talent_max: 99,
            };

            expect(jobWithSkills.learned_skills).toBeDefined();
            expect(jobWithSkills.learned_skills[1]).toBeDefined();
            expect(jobWithSkills.passive_skills[1].id).toBe('passive_skill');
        });
    });

    describe('SkillDataParameter', () => {
        it('基本的なスキルパラメータオブジェクトが型チェックできる', () => {
            const skillData: SkillDataParameter = {
                id: 'bash',
                id_num: 1,
                name: 'Bash',
                type: 'attack',
                max_lv: 10,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
            };

            expect(skillData.id).toBe('bash');
            expect(skillData.id_num).toBe(1);
            expect(skillData.max_lv).toBe(10);
            expect(skillData.type).toBe('attack');
        });

        it('スキル依存情報を含むスキルパラメータが型チェックできる', () => {
            const skillWithDependency: SkillDataParameter = {
                id: 'advanced_skill',
                id_num: 100,
                name: 'Advanced Skill',
                type: 'support',
                max_lv: 5,
                attack_range: { 1: 5, 2: 7 },
                sp_amount: { 1: 10, 2: 20, 3: 30 },
                separate_lv: true,
                need_skill_list: [
                    { need_lv: 1, skill_id: 'bash' },
                    { need_lv: 5, skill_id: 'slash' },
                ],
            };

            expect(skillWithDependency.need_skill_list).toBeDefined();
            expect(skillWithDependency.need_skill_list.length).toBe(2);
            expect(skillWithDependency.attack_range![1]).toBe(5);
            expect(skillWithDependency.sp_amount![2]).toBe(20);
        });

        it('nullableフィールドを含むスキルパラメータが型チェックできる', () => {
            const skillWithNulls: SkillDataParameter = {
                id: 'passive_skill',
                id_num: 200,
                name: null,
                type: null,
                max_lv: null,
                attack_range: null,
                sp_amount: null,
                separate_lv: null,
                need_skill_list: [],
            };

            expect(skillWithNulls.name).toBeNull();
            expect(skillWithNulls.type).toBeNull();
            expect(skillWithNulls.max_lv).toBeNull();
        });

        it('拡張フィールドを含むスキルパラメータが型チェックできる', () => {
            const skillWithMigration: SkillDataParameter = {
                id: 'skill_with_mig',
                id_num: 300,
                name: 'Skill',
                type: 'attack',
                max_lv: 10,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
                _mig_id_num: 999,
                _mig_id_name: 'old_skill_name',
                _mig_name: 'Old Name',
            };

            expect(skillWithMigration._mig_id_num).toBe(999);
            expect(skillWithMigration._mig_id_name).toBe('old_skill_name');
        });
    });

    describe('リスト構造', () => {
        it('ItemDataParameterの配列が型チェックできる', () => {
            const items: ItemDataParameter[] = [
                {
                    id: 1,
                    displayname: 'Item 1',
                    description: 'Description 1',
                    is_card: false,
                    is_enchant: false,
                    resname: 'item_1',
                    type: 'weapon',
                    slot: undefined,
                },
                {
                    id: 2,
                    displayname: 'Item 2',
                    description: 'Description 2',
                    is_card: true,
                    is_enchant: false,
                    resname: 'item_2',
                    type: null,
                    slot: undefined,
                },
            ];

            expect(items.length).toBe(2);
            expect(items[0].is_card).toBe(false);
            expect(items[1].is_card).toBe(true);
        });

        it('JobDataParameterの配列が型チェックできる', () => {
            const jobs: JobDataParameter[] = [
                {
                    id_name: 'job1',
                    id_num: 1,
                    is_doram: false,
                    name: 'Job 1',
                    name_ja: 'ジョブ1',
                    name_alias: [],
                    is_rebirthed: false,
                    job_type_num: 1,
                    job_type_name: 'Type1',
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
                },
            ];

            expect(jobs.length).toBe(1);
            expect(jobs[0].name_ja).toBe('ジョブ1');
        });

        it('SkillDataParameterの配列が型チェックできる', () => {
            const skills: SkillDataParameter[] = [
                {
                    id: 'skill1',
                    id_num: 1,
                    name: 'Skill 1',
                    type: 'attack',
                    max_lv: 10,
                    attack_range: null,
                    sp_amount: null,
                    separate_lv: false,
                    need_skill_list: [],
                },
                {
                    id: 'skill2',
                    id_num: 2,
                    name: 'Skill 2',
                    type: 'support',
                    max_lv: 5,
                    attack_range: null,
                    sp_amount: null,
                    separate_lv: false,
                    need_skill_list: [],
                },
            ];

            expect(skills.length).toBe(2);
            expect(skills[0].type).toBe('attack');
            expect(skills[1].type).toBe('support');
        });
    });
});
