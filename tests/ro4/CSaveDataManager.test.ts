import { describe, it, expect, vi } from 'vitest';

// CSaveDataManagerの静的フィールド初期化に必要なグローバルをimport前に設定する
vi.hoisted(() => {
    // CSaveDataConstをProxyで全プロパティを文字列で返すようにする
    (globalThis as any).CSaveDataConst = new Proxy({}, { get: (_t, p) => String(p) });

    let counter = 0;
    const globals = [
        // SAVE_DATA_UNIT_TYPE_*
        'SAVE_DATA_UNIT_TYPE_CHARA', 'SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS',
        'SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS', 'SAVE_DATA_UNIT_TYPE_CHARA_BUFF',
        'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF', 'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST',
        'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND', 'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD',
        'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH', 'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC',
        'SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD', 'SAVE_DATA_UNIT_TYPE_ITEM_BUFF',
        'SAVE_DATA_UNIT_TYPE_TIME_BUFF', 'SAVE_DATA_UNIT_TYPE_AUTO_SPELLS',
        'SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF', 'SAVE_DATA_UNIT_TYPE_MOB',
        'SAVE_DATA_UNIT_TYPE_MOB_BUFF', 'SAVE_DATA_UNIT_TYPE_MOB_DEBUFF',
        'SAVE_DATA_UNIT_TYPE_EQUIPABLE', 'SAVE_DATA_UNIT_TYPE_EQUIP_ARROW',
        'SAVE_DATA_UNIT_TYPE_VERSION', 'SAVE_DATA_UNIT_TYPE_ATTACK_CONF',
        'SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT', 'SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER',
        'SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2', 'SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC',
        'SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL', 'SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE',
        'SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC',
        // MOB_CONF_INPUT_DATA_INDEX_*
        'MOB_CONF_INPUT_DATA_INDEX_LV', 'MOB_CONF_INPUT_DATA_INDEX_HP',
        'MOB_CONF_INPUT_DATA_INDEX_STR', 'MOB_CONF_INPUT_DATA_INDEX_AGI',
        'MOB_CONF_INPUT_DATA_INDEX_VIT', 'MOB_CONF_INPUT_DATA_INDEX_INT',
        'MOB_CONF_INPUT_DATA_INDEX_DEX', 'MOB_CONF_INPUT_DATA_INDEX_LUK',
        'MOB_CONF_INPUT_DATA_INDEX_ATK', 'MOB_CONF_INPUT_DATA_INDEX_MATK',
        'MOB_CONF_INPUT_DATA_INDEX_RANGE', 'MOB_CONF_INPUT_DATA_INDEX_DEF',
        'MOB_CONF_INPUT_DATA_INDEX_MDEF', 'MOB_CONF_INPUT_DATA_INDEX_BASE_EXP',
        'MOB_CONF_INPUT_DATA_INDEX_JOB_EXP', 'MOB_CONF_INPUT_DATA_INDEX_SIZE',
        'MOB_CONF_INPUT_DATA_INDEX_ELEMENT', 'MOB_CONF_INPUT_DATA_INDEX_RACE',
        'MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE', 'MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE',
    ];
    for (const name of globals) {
        (globalThis as any)[name] = counter++;
    }
});

import { CSaveDataManager } from '@ro4/CSaveDataManager.js';

describe('CSaveDataManager.js', () => {
    describe('エクスポート確認', () => {
        it('CSaveDataManager が関数（クラス）', () => {
            expect(typeof CSaveDataManager).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CSaveDataManager が設定されている', () => {
            expect((window as any).CSaveDataManager).toBe(CSaveDataManager);
        });
    });
});
