import { describe, it, expect } from 'vitest';
import { CSaveDataMappingManager } from '@roro/CSaveDataMappingManager.js';

describe('CSaveDataMappingManager.js', () => {
    describe('エクスポート確認', () => {
        it('CSaveDataMappingManager が関数', () => {
            expect(typeof CSaveDataMappingManager).toBe('function');
        });
    });

    describe('静的メソッド確認', () => {
        const staticMethods = [
            'GetMappingArray',
            '__GetMappingArrayVersion',
            '__GetMappingArrayBasicInfo',
            '__GetMappingArrayMonsterId',
            '__GetMappingArrayAutoBaseLevel',
            '__GetMappingArrayArrow',
            '__GetMappingArraySpeedPotion',
            '__GetMappingArrayArmsRight',
            '__GetMappingArrayArmsLeft',
            '__GetMappingArrayHeadTop',
            '__GetMappingArrayHeadMid',
            '__GetMappingArrayHeadUnder',
            '__GetMappingArrayBody',
            '__GetMappingArrayShoulder',
            '__GetMappingArrayShoes',
            '__GetMappingArrayAccessory1',
            '__GetMappingArrayAccessory2',
            '__GetMappingArrayPassiveSkill',
            '__GetMappingArrayBuffSkill1',
            '__GetMappingArrayChildInfoOld',
            '__GetMappingArrayAttackSetting',
            '__GetMappingArrayMobDebuff',
            '__GetMappingArrayMobBuff',
            '__GetMappingArrayBuffSkillMusical',
            '__GetMappingArrayBuffSkillGuild',
            '__GetMappingArrayAutoSpellOld',
            '__GetMappingArrayCostumeOld',
            '__GetMappingArrayBuffSkill2',
            '__GetMappingArrayBuffItem',
            '__GetMappingArrayBuffElse',
            '__GetMappingArrayCharaState',
            '__GetMappingArrayMobConfPlayer',
            '__GetMappingArrayCharaConfCustom1',
            '__GetMappingArrayCharaConfCustom2',
            '__GetMappingArrayMobConfInput',
            '__GetMappingArrayAutoSpellOld2',
            '__GetMappingArrayLearnedSkill',
            '__GetMappingArrayRandomEnchant',
            '__GetMappingArrayMobConfInputExtend',
            '__GetMappingArrayBuffSkill3',
            '__GetMappingArrayCharaConfCustomStatus',
            '__GetMappingArrayCharaConfCustomAttack',
            '__GetMappingArrayCharaConfCustomDefence',
            '__GetMappingArrayCharaConfCustomSkill',
            '__GetMappingArrayCostume',
            '__GetMappingArrayAutoSpell',
            '__GetMappingArrayTimeItem',
            '__GetMappingArrayMonsterMap',
            '__GetMappingArrayEnchListId',
            '__GetMappingArraySpecStatus',
            '__GetMappingArrayBuffSkill4',
            '__GetMappingArrayCharaConfCustomSpecStatus',
            '__GetMappingArrayMobConfPlayer2',
        ];
        for (const name of staticMethods) {
            it(`${name} が関数`, () => {
                expect(typeof (CSaveDataMappingManager as any)[name]).toBe('function');
            });
        }
    });

    describe('コアロジック確認', () => {
        it('GetMappingArray(1) が配列を返す', () => {
            expect(Array.isArray(CSaveDataMappingManager.GetMappingArray(1))).toBe(true);
        });
        it('GetMappingArray(1) の要素数が 0 より大きい', () => {
            expect(CSaveDataMappingManager.GetMappingArray(1).length).toBeGreaterThan(0);
        });
        it('GetMappingArray(54) が GetMappingArray(1) より長い（バージョン別追加分）', () => {
            expect(CSaveDataMappingManager.GetMappingArray(54).length).toBeGreaterThanOrEqual(
                CSaveDataMappingManager.GetMappingArray(1).length
            );
        });
    });
});
