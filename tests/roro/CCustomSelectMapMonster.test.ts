import { vi, describe, it, expect, beforeAll } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';
import { CCustomSelectMapMonster } from '@roro/CCustomSelectMapMonster.js';

vi.mock('@roro/monstermap.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return {
        ...actual,
        MONSTER_MAP_ID_MAP_ALL: -1, // GetSelectedDataId()=-1 に合わせる
        get g_MonsterMapDataArray() { return []; },
    };
});

vi.mock('@roro/monster.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get MonsterObjNew() { return []; } };
});

function makeMockMapSelect() {
    return {
        AddOnChangeSelectDataExtraHandller: vi.fn(),
        GetSelectedDataId: vi.fn().mockReturnValue(-1), // MONSTER_MAP_ID_MAP_ALL(-1) と一致させる
    };
}

beforeAll(() => {
    (globalThis as any).TranslateAlias = () => '';
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
