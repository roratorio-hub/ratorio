import { describe, it, expect } from 'vitest';
import {
    EquipNumSearch,
    EquipNumSearchMIG,
    CardNumSearch,
    CostumeNumSearch,
    ExBuffNumSearch,
    TimeItemNumSearch,
    GetStatusModifyBodyElement,
    GetStatusModifyAtkPlus,
    GetStatusModifyMaxHpPlus,
    GetStatusModifyMaxHpUp,
    GetStatusModifyMaxSpPlus,
    GetStatusModifyMaxSpUp,
    GetStatusModifyDefDivPlus,
    GetStatusModifyDefDivUp,
    GetStatusModifyMdefDivPlus,
    GetStatusModifyMdefDivUp,
    GetStatusModifyHitPlus,
    GetStatusModifyTEMPPlus,
} from '@roro/chara.js';

const exportedFunctions = [
    ['EquipNumSearch', EquipNumSearch],
    ['EquipNumSearchMIG', EquipNumSearchMIG],
    ['CardNumSearch', CardNumSearch],
    ['CostumeNumSearch', CostumeNumSearch],
    ['ExBuffNumSearch', ExBuffNumSearch],
    ['TimeItemNumSearch', TimeItemNumSearch],
    ['GetStatusModifyBodyElement', GetStatusModifyBodyElement],
    ['GetStatusModifyAtkPlus', GetStatusModifyAtkPlus],
    ['GetStatusModifyMaxHpPlus', GetStatusModifyMaxHpPlus],
    ['GetStatusModifyMaxHpUp', GetStatusModifyMaxHpUp],
    ['GetStatusModifyMaxSpPlus', GetStatusModifyMaxSpPlus],
    ['GetStatusModifyMaxSpUp', GetStatusModifyMaxSpUp],
    ['GetStatusModifyDefDivPlus', GetStatusModifyDefDivPlus],
    ['GetStatusModifyDefDivUp', GetStatusModifyDefDivUp],
    ['GetStatusModifyMdefDivPlus', GetStatusModifyMdefDivPlus],
    ['GetStatusModifyMdefDivUp', GetStatusModifyMdefDivUp],
    ['GetStatusModifyHitPlus', GetStatusModifyHitPlus],
    ['GetStatusModifyTEMPPlus', GetStatusModifyTEMPPlus],
] as const;

describe('chara.js', () => {
    describe('エクスポート確認', () => {
        it.each(exportedFunctions)('%s がエクスポートされている', (_name, fn) => {
            expect(typeof fn).toBe('function');
        });
    });

});
