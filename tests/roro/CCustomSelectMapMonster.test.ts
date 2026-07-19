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

        it('Initialize 後に instanceIdName が設定されている', () => {
            expect(obj.instanceIdName).toBe('TEST_MONSTER');
        });
        it('mapSelect が保持されている', () => {
            expect(obj.mapSelect).not.toBeNull();
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

    // 3f-1: window.CMonsterMapAreaComponentManager 経由の直接呼び出しをコールバックに置換
    describe('onMonsterSelected コールバック (3f-1)', () => {
        beforeAll(() => {
            // calc は head.js の bare global（C-6 まで window 経由）— unit 環境ではモック
            (globalThis as any).calc = vi.fn();
        });
        it('OnChangeSelectDataSub が選択中モンスターIDでコールバックを呼ぶ', () => {
            const obj: any = new CCustomSelectMapMonster('TEST_MONSTER3', makeMockMapSelect());
            const cb = vi.fn();
            obj.onMonsterSelected = cb;
            obj.GetSelectedDataId = () => 1002;
            vi.spyOn(CCustomSelectMapMonster.prototype, 'OnChangeSelectDataSub' as any)
                .mockImplementation(() => {});
            obj.OnChangeSelectDataSub();
            expect(cb).toHaveBeenCalledWith(1002);
        });

        it('コールバック未登録（roro/other 相当）でも OnChangeSelectDataSub が throw しない', () => {
            const obj: any = new CCustomSelectMapMonster('TEST_MONSTER4', makeMockMapSelect());
            obj.GetSelectedDataId = () => 1002;
            vi.spyOn(CCustomSelectMapMonster.prototype, 'OnChangeSelectDataSub' as any)
                .mockImplementation(() => {});
            expect(() => obj.OnChangeSelectDataSub()).not.toThrow();
        });
    });
});
