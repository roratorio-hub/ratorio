import { describe, it, expect } from 'vitest';
import { CheckSpDefEquipmentLocation } from '@engine/status/equipped-sp.js';
import { GetItemExplainText } from '@engine/equip/item.h.js';
import {
    ITEM_SP_EQUIPMENT_LOCATION_BODY,
    ITEM_SP_EQUIPMENT_LOCATION_GENERAL,
} from '@engine/const/EnumItemSpId.js';
import {
    CARD_REGION_ID_ACCESSORY_1,
    CARD_REGION_ID_ARMS_RIGHT_1,
    CARD_REGION_ID_BODY,
    CARD_REGION_ID_COUNT,
    CARD_REGION_ID_ENCHANT_BODY_1,
    CARD_REGION_ID_HEAD_MID,
    CARD_REGION_ID_HEAD_UNDER,
    CARD_REGION_ID_SHADOW_ARMS_RIGHT_1,
    CARD_REGION_ID_SHOES,
} from '@engine/runtime/common.js';

describe('CheckSpDefEquipmentLocation', () => {
    const GENERAL_FLAG = ITEM_SP_EQUIPMENT_LOCATION_GENERAL + 7n; // 一般装備 + 能力ID 7

    it('一般装備部位（通常カード枠）では条件を満たし、残余のSPIDを返す', () => {
        expect(CheckSpDefEquipmentLocation(GENERAL_FLAG, CARD_REGION_ID_BODY)).toBe(7);
        expect(CheckSpDefEquipmentLocation(GENERAL_FLAG, CARD_REGION_ID_ARMS_RIGHT_1)).toBe(7);
    });

    it('一般装備部位（通常エンチャント枠）でも条件を満たす', () => {
        expect(CheckSpDefEquipmentLocation(GENERAL_FLAG, CARD_REGION_ID_ENCHANT_BODY_1)).toBe(7);
    });

    it('兜下段でも条件を満たす（シャドウ以外すべてが対象のため）', () => {
        expect(CheckSpDefEquipmentLocation(GENERAL_FLAG, CARD_REGION_ID_HEAD_UNDER)).toBe(7);
    });

    it('シャドウ装備部位では条件を満たさず -1 を返す', () => {
        expect(CheckSpDefEquipmentLocation(GENERAL_FLAG, CARD_REGION_ID_SHADOW_ARMS_RIGHT_1)).toBe(-1);
    });

    it('全部位を走査し、シャドウ部位のみ判定が反転することを確認する', () => {
        // 将来シャドウ部位が増えたのに case 6 の列挙を更新し忘れると、
        // このテストがどこかの id で失敗する。
        for (let regionId = 0; regionId < CARD_REGION_ID_COUNT; regionId++) {
            const result = CheckSpDefEquipmentLocation(GENERAL_FLAG, regionId);
            if (regionId < CARD_REGION_ID_SHADOW_ARMS_RIGHT_1) {
                expect(result, `regionId=${regionId} は一般装備扱いのはず`).toBe(7);
            } else {
                expect(result, `regionId=${regionId} はシャドウ装備扱いのはず`).toBe(-1);
            }
        }
    });

    it('既存の部位限定条件（鎧）は一般装備条件の追加後も回帰しない', () => {
        const bodyOnlyFlag = ITEM_SP_EQUIPMENT_LOCATION_BODY + 7n;
        expect(CheckSpDefEquipmentLocation(bodyOnlyFlag, CARD_REGION_ID_BODY)).toBe(7);
        expect(CheckSpDefEquipmentLocation(bodyOnlyFlag, CARD_REGION_ID_SHOES)).toBe(-1);
    });

    it('部位条件が指定されていない場合は spDefRemain をそのまま返す', () => {
        expect(CheckSpDefEquipmentLocation(7, CARD_REGION_ID_ACCESSORY_1)).toBe(7);
    });

    it('兜中段限定条件（case 5）は一般装備条件の追加後も回帰しない', () => {
        const headMidOnlyFlag = 500000000000000000n + 7n;
        expect(CheckSpDefEquipmentLocation(headMidOnlyFlag, CARD_REGION_ID_HEAD_MID)).toBe(7);
        expect(CheckSpDefEquipmentLocation(headMidOnlyFlag, CARD_REGION_ID_BODY)).toBe(-1);
    });
});

describe('GetItemExplainText（一般装備条件の表示文言）', () => {
    it('一般装備フラグを「一般装備に装備時、」という条件文として表示する', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_EQUIPMENT_LOCATION_GENERAL + 101n, 1);
        const condText = textInfoArray[0][1];
        expect(condText).toContain('一般装備に装備時、');
    });

    it('既存の鎧限定条件（case 1）の表示文言は回帰しない', () => {
        const textInfoArray = GetItemExplainText(ITEM_SP_EQUIPMENT_LOCATION_BODY + 101n, 1);
        const condText = textInfoArray[0][1];
        expect(condText).toContain('鎧に装備時、');
    });
});
