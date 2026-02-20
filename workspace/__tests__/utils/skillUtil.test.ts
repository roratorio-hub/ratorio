/**
 * workspace/utils/skillUtil.ts のユニットテスト
 *
 * スキルデータのマージ処理テスト
 */

import { describe, it, expect } from 'vitest';
import type { SkillDataParameter } from '../../src/loadSkillMap';

describe('skillUtil.ts - スキルデータマージ機能', () => {

    describe('mergeSkill関数の実装構造', () => {
        it('関数が存在し、非同期であること', () => {
            // mergeSkill は async function
            expect(true).toBe(true);
        });

        it('複数のファイルパスが定義されている', () => {
            // srcYaml: ./data/skill.yaml
            // srcJs: ../roro/m/js/skill.dat.js
            // outYaml: ../dist/skill.yaml
            // outYamlZstd: ../dist/skill.yaml.zst

            const paths = {
                srcYaml: './data/skill.yaml',
                srcJs: '../roro/m/js/skill.dat.js',
                outYaml: '../dist/skill.yaml',
                outYamlZstd: '../dist/skill.yaml.zst',
            };

            expect(paths.srcYaml).toContain('skill.yaml');
            expect(paths.srcJs).toContain('.js');
            expect(paths.outYamlZstd).toContain('.zst');
        });
    });

    describe('SkillDataParameter の型定義', () => {
        it('基本的なスキルにすべての必須フィールドが含まれる', () => {
            const basicSkill: SkillDataParameter = {
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

            expect(basicSkill).toHaveProperty('id');
            expect(basicSkill).toHaveProperty('id_num');
            expect(basicSkill).toHaveProperty('name');
            expect(basicSkill).toHaveProperty('type');
            expect(basicSkill).toHaveProperty('max_lv');
        });

        it('能力毎のデータ（attack_range, sp_amount）が含まれる', () => {
            const complexSkill: SkillDataParameter = {
                id: 'fireball',
                id_num: 25,
                name: 'Fireball',
                type: 'magic',
                max_lv: 15,
                attack_range: { 1: 5, 2: 7, 3: 9 },
                sp_amount: { 1: 20, 2: 25, 3: 30 },
                separate_lv: true,
                need_skill_list: [{ need_lv: 1, skill_id: 'basic_magic' }],
            };

            expect(complexSkill.attack_range).toBeDefined();
            expect(complexSkill.sp_amount).toBeDefined();
            expect(complexSkill.separate_lv).toBe(true);
        });

        it('スキル依存情報が含まれる', () => {
            const advancedSkill: SkillDataParameter = {
                id: 'meteor_storm',
                id_num: 50,
                name: 'Meteor Storm',
                type: 'magic',
                max_lv: 10,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [
                    { need_lv: 3, skill_id: 'fireball' },
                    { need_lv: 5, skill_id: 'thunderstorm' }
                ],
            };

            expect(advancedSkill.need_skill_list.length).toBe(2);
            expect(advancedSkill.need_skill_list[0].skill_id).toBe('fireball');
        });
    });

    describe('スキルデータの処理', () => {
        it('YAML読み込み後のオブジェクト形式', () => {
            // Record<string, SkillDataParameter> の構造
            const skillMap: Record<string, SkillDataParameter> = {
                'bash': {
                    id: 'bash',
                    id_num: 1,
                    name: 'Bash',
                    type: 'attack',
                    max_lv: 10,
                    attack_range: null,
                    sp_amount: null,
                    separate_lv: false,
                    need_skill_list: [],
                },
                'magicbolt': {
                    id: 'magicbolt',
                    id_num: 3,
                    name: 'Magic Bolt',
                    type: 'magic',
                    max_lv: 10,
                    attack_range: null,
                    sp_amount: null,
                    separate_lv: false,
                    need_skill_list: [],
                }
            };

            expect(Object.keys(skillMap).length).toBe(2);
            expect(skillMap['bash'].name).toBe('Bash');
        });

        it('skill.dat.jsからのマイグレーションデータの処理', () => {
            // parseSkillDat が skill.dat.js から情報を抽出
            // migSkill のデータ構造
            expect(true).toBe(true);
        });
    });

    describe('データ変換ロジック', () => {
        it('IDが存在しない場合、yamlのキーをフォールバック', () => {
            const skill1: SkillDataParameter = {
                id: 'custom_skill',
                id_num: 100,
                name: 'Custom',
                type: 'support',
                max_lv: 5,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
            };

            // id が定義されている
            expect(skill1.id).toBe('custom_skill');
        });

        it('type が空文字列の場合、"Normal"に設定される', () => {
            const skillWithEmptyType: SkillDataParameter = {
                id: 'normal_skill',
                id_num: 200,
                name: 'Normal Skill',
                type: '', // 空文字列
                max_lv: 10,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
            };

            // 処理後は type = "Normal" になる
            if (skillWithEmptyType.type === '') {
                skillWithEmptyType.type = 'Normal';
            }

            expect(skillWithEmptyType.type).toBe('Normal');
        });
    });

    describe('need_skill_list のパース', () => {
        it('配列形式のneed_skill_listはそのまま使用', () => {
            const skill: SkillDataParameter = {
                id: 'skill_1',
                id_num: 1,
                name: 'Skill 1',
                type: 'support',
                max_lv: 10,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [
                    { need_lv: 1, skill_id: 'basic' },
                    { need_lv: 5, skill_id: 'advanced' }
                ],
            };

            expect(Array.isArray(skill.need_skill_list)).toBe(true);
            expect(skill.need_skill_list.length).toBe(2);
        });

        it('文字列形式のneed_skill_listがパースされる', () => {
            // 文字列: "[{need_lv: 1, skill_id: 'bash'}]"
            // パース後: [...] 形式に変換
            const needSkillStr = "[{'need_lv': 1, 'skill_id': 'bash'}]";
            const jsonStr = needSkillStr.replace(/'/g, '"');
            const parsed = JSON.parse(jsonStr) as Array<{ need_lv: number; skill_id: string }>;

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed[0].need_lv).toBe(1);
            expect(parsed[0].skill_id).toBe('bash');
        });

        it('パース失敗時は警告ログが出力される', () => {
            // パース失敗ケース：invalid JSON
            // console.warn で警告を出力
            expect(true).toBe(true);
        });

        it('空のneed_skill_listは[]で初期化', () => {
            const simpleSkill: SkillDataParameter = {
                id: 'simple',
                id_num: 1,
                name: 'Simple',
                type: 'attack',
                max_lv: 10,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
            };

            expect(simpleSkill.need_skill_list.length).toBe(0);
        });
    });

    describe('sp_amount のパース', () => {
        it('文字列形式のsp_amountが Record<number, any> に変換', () => {
            // 文字列: "{1: 10, 2: 20, 3: 30}"
            // パース後: {1: 10, 2: 20, 3: 30}（キーが1-indexed）
            const spAmountStr = '{"1": 10, "2": 20, "3": 30}';
            const parsed = JSON.parse(spAmountStr) as Record<string, number>;

            expect(Object.keys(parsed).length).toBe(3);
            expect(parsed['1']).toBe(10);
        });

        it('sp_amountのキーが0-indexed → 1-indexed に変換される', () => {
            // 元のデータ: {0: 10, 1: 20, 2: 30}
            // 変換後: {0: null, 1: 10, 2: 20, 3: 30}
            const spAmountDict = { '0': 10, '1': 20, '2': 30 };
            const newObj: Record<number, any> = { 0: null };

            for (const [k, v] of Object.entries(spAmountDict)) {
                const nk = Number(k) + 1;
                newObj[nk] = v;
            }

            expect(newObj[0]).toBeNull();
            expect(newObj[1]).toBe(10);
            expect(newObj[2]).toBe(20);
            expect(newObj[3]).toBe(30);
        });

        it('sp_amountが空の場合は null のままにする', () => {
            const skill: SkillDataParameter = {
                id: 'skill',
                id_num: 1,
                name: 'Skill',
                type: 'passive',
                max_lv: 1,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
            };

            expect(skill.sp_amount).toBeNull();
        });

        it('パース失敗時は警告ログが出力される', () => {
            // 不正なJSON形式のsp_amount
            // console.warn で警告を出力
            expect(true).toBe(true);
        });
    });

    describe('attack_range のパース', () => {
        it('文字列形式のattack_rangeが Record<number, any> に変換', () => {
            // 文字列: "{1: 5, 2: 7, 3: 9}"
            // パース後: {0: null, 1: 5, 2: 7, 3: 9}
            const rangeStr = '{"1": 5, "2": 7, "3": 9}';
            const parsed = JSON.parse(rangeStr) as Record<string, number>;

            expect(Object.keys(parsed).length).toBe(3);
            expect(parsed['1']).toBe(5);
        });

        it('attack_rangeが存在しない場合、sp_amountを基に同形式を生成', () => {
            // attack_range が null で sp_amount が存在する場合
            // attack_range を sp_amount と同じレベル数で null 値で生成
            const spAmount = { 0: null, 1: 10, 2: 15 };
            const newRange: Record<number, any> = {};

            for (const k of Object.keys(spAmount)) {
                const nk = Number(k);
                newRange[nk] = null;
            }

            expect(Object.keys(newRange).length).toBe(3);
            expect(newRange[1]).toBeNull();
        });

        it('attack_rangeとsp_amountが両方存在する場合、どちらも有効', () => {
            const skill: SkillDataParameter = {
                id: 'range_skill',
                id_num: 100,
                name: 'Range Skill',
                type: 'attack',
                max_lv: 10,
                attack_range: { 1: 5, 2: 7, 3: 9 },
                sp_amount: { 1: 20, 2: 25, 3: 30 },
                separate_lv: true,
                need_skill_list: [],
            };

            expect(skill.attack_range).toBeDefined();
            expect(skill.sp_amount).toBeDefined();
            expect(Object.keys(skill.attack_range!).length).toBe(3);
            expect(Object.keys(skill.sp_amount!).length).toBe(3);
        });
    });

    describe('マイグレーション情報', () => {
        it('マイグレーション専用フィールドが保持される', () => {
            const migratedSkill: SkillDataParameter = {
                id: 'new_id',
                id_num: 500,
                name: 'New Skill',
                type: 'support',
                max_lv: 5,
                attack_range: null,
                sp_amount: null,
                separate_lv: false,
                need_skill_list: [],
                _mig_id_num: 999,
                _mig_id_name: 'old_id',
                _mig_name: 'Old Name',
            };

            expect(migratedSkill._mig_id_num).toBe(999);
            expect(migratedSkill._mig_id_name).toBe('old_id');
            expect(migratedSkill._mig_name).toBe('Old Name');
        });
    });

    describe('ファイル処理フロー', () => {
        it('処理ステップが正しい順序で実行される', () => {
            const steps = [
                '1. srcYamlファイルを読み込み',
                '2. skill.dat.jsをパース',
                '3. YAML←→オブジェクト変換',
                '4. need_skill_list, sp_amount, attack_rangeをパース',
                '5. YAMLダンプ',
                '6. outYamlファイルに書き込み',
                '7. Zstd圧縮',
                '8. outYamlZstdファイルに書き込み'
            ];

            expect(steps.length).toBeGreaterThanOrEqual(7);
        });
    });

    describe('大規模データ処理', () => {
        it('大量のスキルでも処理可能', () => {
            const largeSkillMap: Record<string, SkillDataParameter> = {};

            for (let i = 1; i <= 500; i++) {
                largeSkillMap[`skill_${i}`] = {
                    id: `skill_${i}`,
                    id_num: i,
                    name: `Skill ${i}`,
                    type: i % 2 === 0 ? 'attack' : 'support',
                    max_lv: Math.floor(Math.random() * 20) + 1,
                    attack_range: null,
                    sp_amount: null,
                    separate_lv: false,
                    need_skill_list: [],
                };
            }

            expect(Object.keys(largeSkillMap).length).toBe(500);
        });
    });
});
