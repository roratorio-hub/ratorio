import { describe, it, expect, beforeAll, vi } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';
import { CCustomSelectMapMonster } from '@roro/CCustomSelectMapMonster.js';

function makeMockMapSelect() {
    return {
        AddOnChangeSelectDataExtraHandller: vi.fn(),
        GetSelectedDataId: vi.fn().mockReturnValue(-1), // MONSTER_MAP_ID_MAP_ALL と一致させる
    };
}

beforeAll(() => {
    (globalThis as any).HtmlCreateElement = (tag: string, root: any) => {
        const el = document.createElement(tag);
        if (root) root.appendChild(el);
        return el;
    };
    (globalThis as any).HtmlRemoveOptionAll = () => {};
    (globalThis as any).HtmlCreateElementOption = () => {};
    (globalThis as any).TranslateAlias = () => '';
    (globalThis as any).MONSTER_MAP_ID_MAP_ALL = -1;
    (globalThis as any).MonsterObjNew = [];
    (globalThis as any).MONSTER_DATA_INDEX_KANA = 0;
    (globalThis as any).MONSTER_DATA_INDEX_ELEMENT = 1;
    (globalThis as any).MONSTER_DATA_INDEX_RACE = 2;
    (globalThis as any).MONSTER_DATA_EXTRA_INDEX_100HIT = 3;
    (globalThis as any).MONSTER_DATA_EXTRA_INDEX_95FLEE = 4;
    (globalThis as any).MONSTER_DATA_INDEX_BASE_EXP = 5;
    (globalThis as any).MONSTER_DATA_INDEX_JOB_EXP = 6;
    (globalThis as any).MONSTER_DATA_EXTRA_INDEX_ATK_MAX = 7;
    (globalThis as any).MONSTER_DATA_INDEX_HP = 8;
    (globalThis as any).MONSTER_DATA_INDEX_ID = 9;
    (globalThis as any).MONSTER_DATA_INDEX_NAME = 10;
    (globalThis as any).MONSTER_MAP_DATA_INDEX_DATA_ARRAY = 1;
});

describe('CCustomSelectMapMonster.js', () => {
    describe('エクスポート確認', () => {
        it('CCustomSelectMapMonster が関数（コンストラクタ）', () => {
            expect(typeof CCustomSelectMapMonster).toBe('function');
        });
        it('CCustomSelectBase を継承している', () => {
            expect(CCustomSelectMapMonster.prototype).toBeInstanceOf(CCustomSelectBase);
        });
    });

    describe('window互換確認', () => {
        it('window.CCustomSelectMapMonster が設定されている', () => {
            expect((window as any).CCustomSelectMapMonster).toBe(CCustomSelectMapMonster);
        });
    });

    describe('インスタンスメソッド確認', () => {
        let obj: any;
        beforeAll(() => {
            obj = new CCustomSelectMapMonster('TEST_MONSTER', makeMockMapSelect());
        });

        it('Initialize が関数', () => {
            expect(typeof obj.Initialize).toBe('function');
        });
        it('RebuildSelectDataSub が関数', () => {
            expect(typeof obj.RebuildSelectDataSub).toBe('function');
        });
        it('RebuildSelectDataSubDataFilter が関数', () => {
            expect(typeof obj.RebuildSelectDataSubDataFilter).toBe('function');
        });
        it('OnChangeSelectDataSub が関数', () => {
            expect(typeof obj.OnChangeSelectDataSub).toBe('function');
        });
        it('RebuildHelpAreaSub が関数', () => {
            expect(typeof obj.RebuildHelpAreaSub).toBe('function');
        });
        it('RebuildSelectSortSub が関数', () => {
            expect(typeof obj.RebuildSelectSortSub).toBe('function');
        });
        it('RebuildSearchResultSub が関数', () => {
            expect(typeof obj.RebuildSearchResultSub).toBe('function');
        });
        it('Initialize 後に instanceIdName が設定されている', () => {
            expect(obj.instanceIdName).toBe('TEST_MONSTER');
        });
        it('mapSelect が保持されている', () => {
            expect(obj.mapSelect).not.toBeNull();
        });
        it('bRecalculate が初期化後に true になっている', () => {
            expect(obj.bRecalculate).toBe(true);
        });
        it('RebuildSelectDataSubDataFilter はデフォルトで true を返す', () => {
            expect(obj.RebuildSelectDataSubDataFilter({})).toBe(true);
        });
        it('AddOnChangeSelectDataExtraHandller がモンスター選択変更時に登録されている', () => {
            const mock = makeMockMapSelect();
            new CCustomSelectMapMonster('TEST_MONSTER2', mock);
            expect(mock.AddOnChangeSelectDataExtraHandller).toHaveBeenCalledTimes(2);
        });
    });
});
