/**
 * 指定した入力要素に対して
 * - PageUp で max 属性 / data-max を値にセット
 * - PageDown で min 属性 / data-min を値にセット
 * セット後に input と change イベントを dispatch します。
 */
function attachPageKeyListenerToInput(input: HTMLInputElement | null): void {
    if (!input) return;

    input.addEventListener('keydown', (ev: KeyboardEvent) => {
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

/**
 * 一括登録するユーティリティ
 * 例: initializePageKeyListeners()
 */
export function initializePageKeyListeners(): void {
    ATTACH_PAGE_KEY_IDS.forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement | null;
        attachPageKeyListenerToInput(el);
    });
}

// 対象要素のID一覧
const ATTACH_PAGE_KEY_IDS = [
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
    'OBJID_SELECT_STATUS_CON',
    'OBJID_SELECT_STATUS_CRT'
];
