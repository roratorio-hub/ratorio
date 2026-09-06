/**
 * 指定した入力要素に対して
 * - PageUp で max 属性 / data-max を値にセット
 * - PageDown で min 属性 / data-min を値にセット
 * セット後に input と change イベントを dispatch する。
 * @param {HTMLInputElement | null} input
 */
export function attachPageKeyListenerToInput(input) {
    if (!input) return;

    input.addEventListener('keydown', (ev) => {
        if (ev.key !== 'PageUp' && ev.key !== 'PageDown') return;

        const rawMax = input.getAttribute('max') ?? input.dataset.max ?? '';
        const rawMin = input.getAttribute('min') ?? input.dataset.min ?? '';

        if (rawMax === '' && rawMin === '') return;

        const max = rawMax !== '' ? Number(rawMax) : NaN;
        const min = rawMin !== '' ? Number(rawMin) : NaN;

        if (ev.key === 'PageUp' && !Number.isNaN(max)) {
            input.value = String(max);
        } else if (ev.key === 'PageDown' && !Number.isNaN(min)) {
            input.value = String(min);
        } else {
            return;
        }

        ev.preventDefault();

        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });
}
