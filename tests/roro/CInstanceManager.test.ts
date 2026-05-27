import { describe, it, expect } from 'vitest';
import { CInstanceManager } from '@roro/CInstanceManager.js';

describe('CInstanceManager', () => {
    describe('エクスポート確認', () => {
        it('CInstanceManager がエクスポートされている', () => {
            expect(CInstanceManager).toBeDefined();
            expect(typeof CInstanceManager).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.CInstanceManager が設定されている', () => {
            expect((window as any).CInstanceManager).toBeDefined();
            expect((window as any).CInstanceManager).toBe(CInstanceManager);
        });
    });

    describe('registerInstance', () => {
        it('インスタンスを登録して正の数値IDを返す', () => {
            const manager = new (CInstanceManager as any)();
            const id = manager.registerInstance({});
            expect(typeof id).toBe('number');
            expect(id).toBeGreaterThan(0);
        });

        it('同じインスタンスを登録すると同じIDを返す', () => {
            const manager = new (CInstanceManager as any)();
            const obj = {};
            const id1 = manager.registerInstance(obj);
            const id2 = manager.registerInstance(obj);
            expect(id1).toBe(id2);
        });

        it('異なるインスタンスには異なるIDを返す', () => {
            const manager = new (CInstanceManager as any)();
            const id1 = manager.registerInstance({});
            const id2 = manager.registerInstance({});
            expect(id1).not.toBe(id2);
        });
    });

    describe('searchInstanceById', () => {
        it('IDでインスタンスを検索できる', () => {
            const manager = new (CInstanceManager as any)();
            const obj = { name: 'test' };
            const id = manager.registerInstance(obj);
            expect(manager.searchInstanceById(id)).toBe(obj);
        });

        it('存在しないIDにはnullを返す', () => {
            const manager = new (CInstanceManager as any)();
            expect(manager.searchInstanceById(999)).toBeNull();
        });
    });

    describe('getInstanceList', () => {
        it('初期状態では空の配列を返す', () => {
            const manager = new (CInstanceManager as any)();
            expect(manager.getInstanceList()).toEqual([]);
        });

        it('登録済みインスタンスを全件返す', () => {
            const manager = new (CInstanceManager as any)();
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            manager.registerInstance(obj1);
            manager.registerInstance(obj2);
            const list = manager.getInstanceList();
            expect(list).toHaveLength(2);
            expect(list).toContain(obj1);
            expect(list).toContain(obj2);
        });
    });
});
