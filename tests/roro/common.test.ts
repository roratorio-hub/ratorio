import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import * as common from '@roro/common.js';
import {
    GetConstDataKindText,
    GetParamText,
    GetRaceText,
    GetElementText,
    GetMonsterElementText,
    GetSizeText,
    GetStateText,
    GetFriendlityText,
} from '@roro/common.js';

describe('common.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('EQUIP_REGION_ID_ARMS が 0 に定義される', () => {
            expect((globalThis as any).EQUIP_REGION_ID_ARMS).toBe(0);
        });
        it('EQUIP_REGION_ID_ACCESSARY_2 が 10 に定義される', () => {
            expect((globalThis as any).EQUIP_REGION_ID_ACCESSARY_2).toBe(10);
        });
        it('EnumEquipRegionId が定義される', () => {
            expect(typeof (globalThis as any).EnumEquipRegionId).toBe('object');
        });
        it('PARAM_STR が 0 に定義される', () => {
            expect((globalThis as any).PARAM_STR).toBe(0);
        });
        it('ELM_ID_VANITY が 0 に定義される', () => {
            expect((globalThis as any).ELM_ID_VANITY).toBe(0);
        });
        it('RACE_ID_SOLID が 0 に定義される', () => {
            expect((globalThis as any).RACE_ID_SOLID).toBe(0);
        });
        it('SIZE_ID_SMALL が 0 に定義される', () => {
            expect((globalThis as any).SIZE_ID_SMALL).toBe(0);
        });
        it('FRIENDLITY_ID_AUTO が 0 に定義される', () => {
            expect((globalThis as any).FRIENDLITY_ID_AUTO).toBe(0);
        });
    });

    describe('エクスポート確認: 関数', () => {
        const funcs = {
            GetConstDataKindText,
            GetParamText,
            GetRaceText,
            GetElementText,
            GetMonsterElementText,
            GetSizeText,
            GetStateText,
            GetFriendlityText,
        };
        for (const [name, fn] of Object.entries(funcs)) {
            it(`${name} が関数`, () => {
                expect(typeof fn).toBe('function');
            });
        }
    });

    describe('エクスポート確認: CARD_REGION_ID_*', () => {
        it('CARD_REGION_ID_ARMS_RIGHT_1 が 0', () => {
            expect((common as any).CARD_REGION_ID_ARMS_RIGHT_1).toBe(0);
        });
        it('CARD_REGION_ID_HEAD_UNDER が 16', () => {
            expect((common as any).CARD_REGION_ID_HEAD_UNDER).toBe(16);
        });
        it('CARD_REGION_ID_ENCHANT_HEAD_TOP_1 が 26', () => {
            expect((common as any).CARD_REGION_ID_ENCHANT_HEAD_TOP_1).toBe(26);
        });
        it('CARD_REGION_ID_ENCHANT_HEAD_UNDER_1 が 33', () => {
            expect((common as any).CARD_REGION_ID_ENCHANT_HEAD_UNDER_1).toBe(33);
        });
        it('CARD_REGION_ID_SHADOW_ARMS_RIGHT_1 が 54', () => {
            expect((common as any).CARD_REGION_ID_SHADOW_ARMS_RIGHT_1).toBe(54);
        });
        it('CARD_REGION_ID_COUNT が 72', () => {
            expect((common as any).CARD_REGION_ID_COUNT).toBe(72);
        });
        it('CARD_REGION_ID_ANY が -1', () => {
            expect((common as any).CARD_REGION_ID_ANY).toBe(-1);
        });
        it('CARD_REGION_ID_ACCESSARY_2_ANY が -13', () => {
            expect((common as any).CARD_REGION_ID_ACCESSARY_2_ANY).toBe(-13);
        });
    });

    describe('エクスポート確認: COSTUME_REGION_ID_*', () => {
        it('COSTUME_REGION_ID_ANY が -1', () => {
            expect((common as any).COSTUME_REGION_ID_ANY).toBe(-1);
        });
        it('COSTUME_REGION_ID_ARMS_RIGHT が -2', () => {
            expect((common as any).COSTUME_REGION_ID_ARMS_RIGHT).toBe(-2);
        });
        it('COSTUME_REGION_ID_HEAD_TOP が 0', () => {
            expect((common as any).COSTUME_REGION_ID_HEAD_TOP).toBe(0);
        });
        it('COSTUME_REGION_ID_COUNT が 9', () => {
            expect((common as any).COSTUME_REGION_ID_COUNT).toBe(9);
        });
    });

    describe('エクスポート確認: COLOR_CODE_TABLE_*', () => {
        it('COLOR_CODE_TABLE_HEADER_IS_SET が "#ff7777"', () => {
            expect((common as any).COLOR_CODE_TABLE_HEADER_IS_SET).toBe('#ff7777');
        });
        it('COLOR_CODE_TABLE_HEADER_IS_NOT_SET が "#ddddff"', () => {
            expect((common as any).COLOR_CODE_TABLE_HEADER_IS_NOT_SET).toBe('#ddddff');
        });
    });

    describe('window互換確認', () => {
        // window互換ブロック: 関数8件 + CARD_REGION_ID_* 76件 + COSTUME_REGION_ID_* 13件 + COLOR_CODE_TABLE_* 2件 = 99件
        const functionNames = [
            'GetConstDataKindText', 'GetParamText', 'GetRaceText', 'GetElementText',
            'GetMonsterElementText', 'GetSizeText', 'GetStateText', 'GetFriendlityText',
        ];
        for (const name of functionNames) {
            it(`window.${name} が設定されている`, () => {
                expect(typeof (window as any)[name]).toBe('function');
            });
        }

        const cardRegionIdNames = [
            'CARD_REGION_ID_ARMS_RIGHT_1', 'CARD_REGION_ID_ARMS_RIGHT_2',
            'CARD_REGION_ID_ARMS_RIGHT_3', 'CARD_REGION_ID_ARMS_RIGHT_4',
            'CARD_REGION_ID_ARMS_LEFT_1', 'CARD_REGION_ID_ARMS_LEFT_2',
            'CARD_REGION_ID_ARMS_LEFT_3', 'CARD_REGION_ID_ARMS_LEFT_4',
            'CARD_REGION_ID_HEAD_TOP', 'CARD_REGION_ID_HEAD_MID',
            'CARD_REGION_ID_SHIELD', 'CARD_REGION_ID_BODY',
            'CARD_REGION_ID_SHOULDER', 'CARD_REGION_ID_SHOES',
            'CARD_REGION_ID_ACCESSARY_1', 'CARD_REGION_ID_ACCESSARY_2',
            'CARD_REGION_ID_HEAD_UNDER',
            'CARD_REGION_ID_ENCHANT_HEAD_TOP_1', 'CARD_REGION_ID_ENCHANT_HEAD_TOP_2', 'CARD_REGION_ID_ENCHANT_HEAD_TOP_3',
            'CARD_REGION_ID_ENCHANT_HEAD_MID_1', 'CARD_REGION_ID_ENCHANT_HEAD_MID_2', 'CARD_REGION_ID_ENCHANT_HEAD_MID_3',
            'CARD_REGION_ID_ENCHANT_HEAD_UNDER_1', 'CARD_REGION_ID_ENCHANT_HEAD_UNDER_2', 'CARD_REGION_ID_ENCHANT_HEAD_UNDER_3',
            'CARD_REGION_ID_ENCHANT_SHIELD_1', 'CARD_REGION_ID_ENCHANT_SHIELD_2', 'CARD_REGION_ID_ENCHANT_SHIELD_3',
            'CARD_REGION_ID_ENCHANT_BODY_1', 'CARD_REGION_ID_ENCHANT_BODY_2', 'CARD_REGION_ID_ENCHANT_BODY_3',
            'CARD_REGION_ID_ENCHANT_SHOULDER_1', 'CARD_REGION_ID_ENCHANT_SHOULDER_2', 'CARD_REGION_ID_ENCHANT_SHOULDER_3',
            'CARD_REGION_ID_ENCHANT_SHOES_1', 'CARD_REGION_ID_ENCHANT_SHOES_2', 'CARD_REGION_ID_ENCHANT_SHOES_3',
            'CARD_REGION_ID_ENCHANT_ACCESSARY_1_1', 'CARD_REGION_ID_ENCHANT_ACCESSARY_1_2', 'CARD_REGION_ID_ENCHANT_ACCESSARY_1_3',
            'CARD_REGION_ID_ENCHANT_ACCESSARY_2_1', 'CARD_REGION_ID_ENCHANT_ACCESSARY_2_2', 'CARD_REGION_ID_ENCHANT_ACCESSARY_2_3',
            'CARD_REGION_ID_SHADOW_ARMS_RIGHT_1', 'CARD_REGION_ID_SHADOW_ARMS_RIGHT_2', 'CARD_REGION_ID_SHADOW_ARMS_RIGHT_3',
            'CARD_REGION_ID_SHADOW_SHIELD_1', 'CARD_REGION_ID_SHADOW_SHIELD_2', 'CARD_REGION_ID_SHADOW_SHIELD_3',
            'CARD_REGION_ID_SHADOW_ENCHANT_BODY_1', 'CARD_REGION_ID_SHADOW_ENCHANT_BODY_2', 'CARD_REGION_ID_SHADOW_ENCHANT_BODY_3',
            'CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1', 'CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2', 'CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3',
            'CARD_REGION_ID_SHADOW_ENCHANT_ACCESSARY1_1', 'CARD_REGION_ID_SHADOW_ENCHANT_ACCESSARY1_2', 'CARD_REGION_ID_SHADOW_ENCHANT_ACCESSARY1_3',
            'CARD_REGION_ID_SHADOW_ENCHANT_ACCESSARY2_1', 'CARD_REGION_ID_SHADOW_ENCHANT_ACCESSARY2_2', 'CARD_REGION_ID_SHADOW_ENCHANT_ACCESSARY2_3',
            'CARD_REGION_ID_COUNT',
            'CARD_REGION_ID_ANY',
            'CARD_REGION_ID_ARMS_RIGHT_ANY', 'CARD_REGION_ID_ARMS_LEFT_ANY',
            'CARD_REGION_ID_HEAD_TOP_ANY', 'CARD_REGION_ID_HEAD_MID_ANY', 'CARD_REGION_ID_HEAD_UNDER_ANY',
            'CARD_REGION_ID_SHIELD_ANY', 'CARD_REGION_ID_BODY_ANY', 'CARD_REGION_ID_SHOULDER_ANY',
            'CARD_REGION_ID_SHOES_ANY', 'CARD_REGION_ID_ACCESSARY_ANY',
            'CARD_REGION_ID_ACCESSARY_1_ANY', 'CARD_REGION_ID_ACCESSARY_2_ANY',
        ];
        for (const name of cardRegionIdNames) {
            it(`window.${name} が設定されている`, () => {
                expect((window as any)[name]).toBe((common as any)[name]);
            });
        }

        const costumeRegionIdNames = [
            'COSTUME_REGION_ID_ANY',
            'COSTUME_REGION_ID_ARMS_RIGHT', 'COSTUME_REGION_ID_ARMS_LEFT',
            'COSTUME_REGION_ID_HEAD_TOP', 'COSTUME_REGION_ID_HEAD_MID', 'COSTUME_REGION_ID_HEAD_UNDER',
            'COSTUME_REGION_ID_SHIELD', 'COSTUME_REGION_ID_BODY', 'COSTUME_REGION_ID_SHOULDER',
            'COSTUME_REGION_ID_SHOES', 'COSTUME_REGION_ID_ACCESSARY_1', 'COSTUME_REGION_ID_ACCESSARY_2',
            'COSTUME_REGION_ID_COUNT',
        ];
        for (const name of costumeRegionIdNames) {
            it(`window.${name} が設定されている`, () => {
                expect((window as any)[name]).toBe((common as any)[name]);
            });
        }

        it('window.COLOR_CODE_TABLE_HEADER_IS_SET が設定されている', () => {
            expect((window as any).COLOR_CODE_TABLE_HEADER_IS_SET).toBe(common.COLOR_CODE_TABLE_HEADER_IS_SET);
        });
        it('window.COLOR_CODE_TABLE_HEADER_IS_NOT_SET が設定されている', () => {
            expect((window as any).COLOR_CODE_TABLE_HEADER_IS_NOT_SET).toBe(common.COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
        });
    });

    describe('コアロジック確認', () => {
        it('GetConstDataKindText(1) が "アイテム"', () => {
            expect(GetConstDataKindText((globalThis as any).CONST_DATA_KIND_ITEM)).toBe('アイテム');
        });
        it('GetParamText(0) が "STR"', () => {
            expect(GetParamText(0)).toBe('STR');
        });
        it('GetRaceText(0) が "無形"', () => {
            expect(GetRaceText(0)).toBe('無形');
        });
        it('GetElementText(0) が "無"', () => {
            expect(GetElementText(0)).toBe('無');
        });
        it('GetMonsterElementText(11) が "水1"', () => {
            expect(GetMonsterElementText(11)).toBe('水1');
        });
        it('GetSizeText(0) が "小型"', () => {
            expect(GetSizeText(0)).toBe('小型');
        });
        it('GetStateText(0) が "毒"', () => {
            expect(GetStateText(0)).toBe('毒');
        });
        it('GetFriendlityText(0) が "未設定(親しい扱い)"', () => {
            expect(GetFriendlityText(0)).toBe('未設定(親しい扱い)');
        });
        it('不明な値は "エラー" を返す', () => {
            expect(GetParamText(999)).toBe('エラー');
            expect(GetRaceText(999)).toBe('エラー');
        });
    });
});
