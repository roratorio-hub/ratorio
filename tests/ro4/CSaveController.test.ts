import { vi, describe, it, expect } from 'vitest';

vi.hoisted(() => {
    const mockEl = {
        checked: false,
        appendChild: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        getAttribute: () => null,
        style: { whiteSpace: '' },
        dispatchEvent: () => {},
        value: 0,
        querySelectorAll: () => [],
        querySelector: () => null,
        addEventListener: () => {},
    };
    (document as any).getElementById = () => mockEl;
});

vi.mock('../../roro/common/js/util.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, HtmlRemoveAllChild: () => {} };
});

vi.mock('@roro/monstermap.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return {
        ...actual,
        MONSTER_MAP_ID_MAP_ALL: -1,
        get g_MonsterMapDataArray() { return []; },
        get g_MonsterMapCategoryDataArray() { return []; },
    };
});

vi.mock('@roro/monster.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get MonsterObjNew() { return []; } };
});

import { CSaveController } from '@ro4/CSaveController.js';

describe('CSaveController.js', () => {
    describe('エクスポート確認', () => {
        it('CSaveController が関数（クラス）', () => {
            expect(typeof CSaveController).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CSaveController が設定されている', () => {
            expect((window as any).CSaveController).toBe(CSaveController);
        });
    });

    describe('静的ゲッター確認', () => {
        it('STORAGE_TYPE_LOCALSTORAGE が文字列', () => {
            expect(typeof CSaveController.STORAGE_TYPE_LOCALSTORAGE).toBe('string');
        });
        it('STORAGE_NAME_SETTINGS が文字列', () => {
            expect(typeof CSaveController.STORAGE_NAME_SETTINGS).toBe('string');
        });
        it('STORAGE_NAME_CHARA_DATA が文字列', () => {
            expect(typeof CSaveController.STORAGE_NAME_CHARA_DATA).toBe('string');
        });
        it('STORAGE_DATA_DELIMITER_UNIT が文字列', () => {
            expect(typeof CSaveController.STORAGE_DATA_DELIMITER_UNIT).toBe('string');
        });
        it('STORAGE_DATA_DELIMITER_PROP が文字列', () => {
            expect(typeof CSaveController.STORAGE_DATA_DELIMITER_PROP).toBe('string');
        });
        it('CHARA_DATA_COUNT が数値', () => {
            expect(typeof CSaveController.CHARA_DATA_COUNT).toBe('number');
        });
        it('CHARA_DATA_NAME_LENGTH が数値', () => {
            expect(typeof CSaveController.CHARA_DATA_NAME_LENGTH).toBe('number');
        });
        it('CHARA_DATA_NAME_DEFAULT が文字列', () => {
            expect(typeof CSaveController.CHARA_DATA_NAME_DEFAULT).toBe('string');
        });
    });

    describe('静的メソッド確認', () => {
        const methods = ['getDisplayName', 'getSettingProp', 'getSaveData', 'getSaveDataManagerCur'];
        for (const m of methods) {
            it(`${m} が関数`, () => {
                expect(typeof (CSaveController as any)[m]).toBe('function');
            });
        }
    });
});
