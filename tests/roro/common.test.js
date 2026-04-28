import { describe, it, expect } from 'vitest';
// CGlobalConstManager.js を先にインポートして window.CGlobalConstManager を確立する
import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/common.js';

describe('common', () => {
    it('Get*Text 関数が window に設定される', () => {
        expect(typeof window.GetConstDataKindText).toBe('function');
        expect(typeof window.GetParamText).toBe('function');
        expect(typeof window.GetRaceText).toBe('function');
        expect(typeof window.GetElementText).toBe('function');
        expect(typeof window.GetMonsterElementText).toBe('function');
        expect(typeof window.GetSizeText).toBe('function');
        expect(typeof window.GetStateText).toBe('function');
        expect(typeof window.GetFriendlityText).toBe('function');
    });

    it('DefineEnum で定義された定数が window に設定される', () => {
        expect(typeof window.PARAM_STR).toBe('number');
        expect(typeof window.RACE_ID_HUMAN).toBe('number');
        expect(typeof window.ELM_ID_FIRE).toBe('number');
        expect(typeof window.SIZE_ID_SMALL).toBe('number');
    });

    it('CARD_REGION_ID_* 定数が window に設定される', () => {
        expect(typeof window.CARD_REGION_ID_ARMS_RIGHT_1).toBe('number');
        expect(typeof window.CARD_REGION_ID_COUNT).toBe('number');
        expect(typeof window.CARD_REGION_ID_ANY).toBe('number');
    });

    it('COSTUME_REGION_ID_* 定数が window に設定される', () => {
        expect(typeof window.COSTUME_REGION_ID_ANY).toBe('number');
        expect(typeof window.COSTUME_REGION_ID_COUNT).toBe('number');
    });

    it('COLOR_CODE_TABLE_HEADER_* 定数が window に設定される', () => {
        expect(window.COLOR_CODE_TABLE_HEADER_IS_SET).toBe('#ff7777');
        expect(window.COLOR_CODE_TABLE_HEADER_IS_NOT_SET).toBe('#ddddff');
    });
});
