import { describe, it, expect, afterEach } from 'vitest';
import { ModalWindow } from '@ro4/CModalWindow.js';

describe('CModalWindow.js', () => {
    describe('エクスポート確認', () => {
        it('ModalWindow がエクスポートされている', () => {
            expect(ModalWindow).toBeDefined();
            expect(typeof ModalWindow).toBe('function');
        });

        it('createModal が静的メソッドとして存在する', () => {
            expect(typeof ModalWindow.createModal).toBe('function');
        });
    });

    describe('createModal の動作', () => {
        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('Promise を返す', () => {
            const result = ModalWindow.createModal({ title: 'T', message: 'M', buttons: [{ label: 'OK', value: 'ok' }] });
            expect(result).toBeInstanceOf(Promise);
        });

        it('モーダルが document.body に追加される', () => {
            ModalWindow.createModal({ title: 'T', message: 'M', buttons: [{ label: 'OK', value: 'ok' }] });
            expect(document.body.children.length).toBeGreaterThan(0);
        });

        it('ボタンクリックで Promise が指定値で解決する', async () => {
            const promise = ModalWindow.createModal({
                title: 'Test',
                message: 'hello',
                buttons: [{ label: 'OK', value: 'resolved_value' }],
            });
            const button = document.querySelector('button') as HTMLButtonElement;
            button.click();
            await expect(promise).resolves.toBe('resolved_value');
        });
    });
});
