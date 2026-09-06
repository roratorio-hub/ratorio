import { describe, it, expect } from 'vitest';
import { attachPageKeyListenerToInput } from '@engine/ui/page-key-listener.js';

describe('page-key-listener.js', () => {
    describe('attachPageKeyListenerToInput', () => {
        it('PageUpキーが押された時にmax属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('max', '99');
            input.value = '50';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));

            expect(input.value).toBe('99');
        });

        it('PageUpキーが押された時にdata-max属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.dataset.max = '50';
            input.value = '10';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));

            expect(input.value).toBe('50');
        });

        it('PageUpキーでinputイベントとchangeイベントがdispatchされる', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('max', '100');
            input.value = '50';

            let inputEventFired = false;
            let changeEventFired = false;
            input.addEventListener('input', () => { inputEventFired = true; });
            input.addEventListener('change', () => { changeEventFired = true; });

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));

            expect(inputEventFired).toBe(true);
            expect(changeEventFired).toBe(true);
        });

        it('PageDownキーが押された時にmin属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('min', '1');
            input.value = '50';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));

            expect(input.value).toBe('1');
        });

        it('PageDownキーが押された時にdata-min属性の値が設定される', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.dataset.min = '5';
            input.value = '50';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));

            expect(input.value).toBe('5');
        });

        it('他のキーが押された場合は何もしない', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('max', '99');
            input.value = '50';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            expect(input.value).toBe('50');
        });

        it('max/min属性が両方ない場合は何もしない', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = '50';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));

            expect(input.value).toBe('50');
        });

        it('max属性が数値でない場合は設定しない', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('max', 'invalid');
            input.value = '50';

            attachPageKeyListenerToInput(input);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));

            expect(input.value).toBe('50');
        });

        it('null が渡されても例外を投げない', () => {
            expect(() => attachPageKeyListenerToInput(null)).not.toThrow();
        });
    });
});
