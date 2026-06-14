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
        it('EQUIP_REGION_ID_ACCESSORY_2 が 10 に定義される', () => {
            expect((globalThis as any).EQUIP_REGION_ID_ACCESSORY_2).toBe(10);
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
        it('CARD_REGION_ID_ACCESSORY_2_ANY が -13', () => {
            expect((common as any).CARD_REGION_ID_ACCESSORY_2_ANY).toBe(-13);
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
