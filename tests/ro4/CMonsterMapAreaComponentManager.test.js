import { describe, it, expect, beforeAll } from 'vitest';

let CMonsterMapAreaComponentManager;

beforeAll(async () => {
    // CCustomSelectMap* クラスはカテゴリ/マップ/モンスター選択UIを管理する。
    // テスト環境では DOM が存在しないためモックで代替。
    window.CCustomSelectMapCategory = function (name) { this.name = name; };
    window.CCustomSelectMapMap = function (name, cat) { this.name = name; };
    window.CCustomSelectMapMonster = function (name, map) { this.name = name; };
    window.MonsterToughness = {
        getMobName: () => '',
        getToughnessCode: () => null,
        getNotification: () => null,
    };
    const mod = await import('../../ro4/m/js/CMonsterMapAreaComponentManager.js');
    CMonsterMapAreaComponentManager = mod.CMonsterMapAreaComponentManager;
});

describe('CMonsterMapAreaComponentManager', () => {
    it('CMonsterMapAreaComponentManager を export する', () => {
        expect(typeof CMonsterMapAreaComponentManager).toBe('function');
    });

    it('window.CMonsterMapAreaComponentManager が設定される', () => {
        expect(window.CMonsterMapAreaComponentManager).toBe(CMonsterMapAreaComponentManager);
    });

    it('static メソッドが定義される', () => {
        expect(typeof CMonsterMapAreaComponentManager.SetDispObject).toBe('function');
        expect(typeof CMonsterMapAreaComponentManager.RefreshtDispObject).toBe('function');
        expect(typeof CMonsterMapAreaComponentManager.updateMonsterSuggest).toBe('function');
    });

    it('dispObjectMap が Map として初期化される', () => {
        expect(CMonsterMapAreaComponentManager.dispObjectMap).toBeInstanceOf(Map);
    });
});
