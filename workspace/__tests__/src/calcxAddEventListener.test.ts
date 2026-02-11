/**
 * workspace/src/calcxAddEventListener.ts のユニットテスト
 *
 * PageUp/PageDownキーのイベントリスナーテスト
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initializePageKeyListeners } from '../../src/calcxAddEventListener';

describe('calcxAddEventListener.ts - ページキーリスナー機能', () => {

    let container: HTMLDivElement;

    beforeEach(() => {
        // テスト用のコンテナを作成
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // テスト後にコンテナを削除
        document.body.removeChild(container);
    });

    describe('initializePageKeyListeners', () => {
        it('関数が存在して呼び出せる', () => {
            expect(typeof initializePageKeyListeners).toBe('function');
            // 対象要素がない場合でもエラーが出ないことを確認
            expect(() => initializePageKeyListeners()).not.toThrow();
        });

        it('存在しない要素IDを指定してもエラーが出ない', () => {
            expect(() => initializePageKeyListeners()).not.toThrow();
        });
    });

    describe('PageUpキーのリスナー', () => {
        it('PageUpキーが押された時にmax属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_BASE_LEVEL';
            input.setAttribute('max', '99');
            input.value = '50';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('99');
        });

        it('PageUpキーが押された時にdata-max属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_JOB_LEVEL';
            input.dataset.max = '50';
            input.value = '10';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('50');
        });

        it('PageUpキーでinputイベントがdispatchされる', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_STATUS_STR';
            input.setAttribute('max', '100');
            input.value = '50';
            container.appendChild(input);

            let inputEventFired = false;
            input.addEventListener('input', () => {
                inputEventFired = true;
            });

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(inputEventFired).toBe(true);
        });

        it('PageUpキーでchangeイベントがdispatchされる', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_STATUS_AGI';
            input.setAttribute('max', '100');
            input.value = '50';
            container.appendChild(input);

            let changeEventFired = false;
            input.addEventListener('change', () => {
                changeEventFired = true;
            });

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(changeEventFired).toBe(true);
        });
    });

    describe('PageDownキーのリスナー', () => {
        it('PageDownキーが押された時にmin属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_STATUS_VIT';
            input.setAttribute('min', '1');
            input.value = '50';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageDown',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('1');
        });

        it('PageDownキーが押された時にdata-min属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_STATUS_INT';
            input.dataset.min = '5';
            input.value = '50';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageDown',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('5');
        });

        it('PageDownキーでinputイベントがdispatchされる', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_STATUS_DEX';
            input.setAttribute('min', '0');
            input.value = '50';
            container.appendChild(input);

            let inputEventFired = false;
            input.addEventListener('input', () => {
                inputEventFired = true;
            });

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageDown',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(inputEventFired).toBe(true);
        });
    });

    describe('使用対象のinput要素IDリスト', () => {
        it('すべての対象IDが登録されている状態をテストできる', () => {
            const targetIds = [
                'OBJID_SELECT_BASE_LEVEL',
                'OBJID_SELECT_JOB_LEVEL',
                'OBJID_SELECT_STATUS_STR',
                'OBJID_SELECT_STATUS_AGI',
                'OBJID_SELECT_STATUS_VIT',
                'OBJID_SELECT_STATUS_INT',
                'OBJID_SELECT_STATUS_DEX',
                'OBJID_SELECT_STATUS_LUK',
                'OBJID_SELECT_STATUS_POW',
                'OBJID_SELECT_STATUS_STA',
                'OBJID_SELECT_STATUS_WIS',
                'OBJID_SELECT_STATUS_SPL',
            ];

            // 各IDで要素を作成してリスナーが正しく設定されることを確認
            targetIds.forEach(id => {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = id;
                input.setAttribute('max', '100');
                input.setAttribute('min', '1');
                input.value = '50';
                container.appendChild(input);
            });

            // エラーが出ないことを確認
            expect(() => initializePageKeyListeners()).not.toThrow();
        });
    });

    describe('エッジケース', () => {
        it('他のキーが押された場合は何もしない', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_BASE_LEVEL';
            input.setAttribute('max', '99');
            input.value = '50';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'Enter',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('50'); // 変わっていない
        });

        it('max/min属性が両方ない場合は何もしない', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_BASE_LEVEL';
            input.value = '50';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('50'); // 変わっていない
        });

        it('max属性が数値でない場合は設定しない', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_BASE_LEVEL';
            input.setAttribute('max', 'invalid');
            input.value = '50';
            container.appendChild(input);

            initializePageKeyListeners();

            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            expect(input.value).toBe('50'); // 変わっていない
        });
    });
});
