import { describe, it, expect, beforeEach } from 'vitest';
import { CInstanceManager } from '../../roro/m/js/CInstanceManager.js';

describe('CInstanceManager', () => {
    let manager;

    beforeEach(() => {
        manager = new CInstanceManager();
    });

    it('新規インスタンス登録で ID 1 を返す', () => {
        const id = manager.registerInstance({});
        expect(id).toBe(1);
    });

    it('同じインスタンスを再登録すると同じ ID を返す', () => {
        const obj = {};
        const id1 = manager.registerInstance(obj);
        const id2 = manager.registerInstance(obj);
        expect(id1).toBe(id2);
    });

    it('異なるインスタンスには異なる ID が割り当てられる', () => {
        const id1 = manager.registerInstance({});
        const id2 = manager.registerInstance({});
        expect(id1).not.toBe(id2);
    });

    it('searchInstanceById で登録済みインスタンスを取得できる', () => {
        const obj = { value: 42 };
        const id = manager.registerInstance(obj);
        expect(manager.searchInstanceById(id)).toBe(obj);
    });

    it('未登録の ID には null を返す', () => {
        expect(manager.searchInstanceById(999)).toBeNull();
    });

    it('getInstanceList で全登録インスタンスを返す', () => {
        const obj1 = {};
        const obj2 = {};
        manager.registerInstance(obj1);
        manager.registerInstance(obj2);
        const list = manager.getInstanceList();
        expect(list).toHaveLength(2);
        expect(list).toContain(obj1);
        expect(list).toContain(obj2);
    });

    it('window 互換ブロックで window.CInstanceManager が設定される', () => {
        expect(window.CInstanceManager).toBe(CInstanceManager);
    });
});
