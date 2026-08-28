/**
 * lib/tom-select/tom-select.custom.js のユニットテスト（#1496: ↑↓ で Enter 無しに確定する）
 *
 * 本体は ESM ではない classic script（calcx.html に <script defer> で読み込まれる）のため、
 * 実ファイルを読み込んで eval し、内部関数を戻り値として取り出して検証する。
 * TomSelect は本番と同じ base ビルド（プラグイン非バンドル）を使う。
 *
 * 注意: 実行時に読み込まれる本番ビルドは vendored tom-select.min.js（v2.6.1）だが、
 * テスト環境の依存パッケージは v2.6.2。本テストで触るフック点
 * （onKeyDown 系・refreshOptions・getAdjacent・addItem・options/$order）は
 * このスキューで変わっていない（.claude/context/tom-select.md 参照）。
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
// @ts-expect-error -- vendored ビルドに型定義が無い
import TomSelect from 'tom-select/base';

const LIB_DIR = join(__dirname, '../../lib/tom-select');

interface CustomApi {
    LoadTomSelect(): void;
    LoadTomSelectSpecify(select_id: string): void;
    FindTomSelectFromEvent(target: EventTarget | null): any;
}

let dropdownInputLoaded = false;

// tom-select.custom.js は document レベルに keydown/change/mousedown リスナーを
// 直接登録する classic script のため、テストごとに読み込み直すとリスナーが
// 積み上がってしまう（本番では <script defer> で 1 回しか読み込まれないため
// 起きない、テストハーネス特有の問題）。読み込み中の登録を捕捉しておき、
// afterEach で確実に除去する。
let capturedListeners: Array<[string, EventListenerOrEventListenerObject, boolean | AddEventListenerOptions | undefined]> = [];

function LoadCustomScript(): CustomApi {
    if (!dropdownInputLoaded) {
        const dropdownInputSrc = readFileSync(join(LIB_DIR, 'dropdown_input.js'), 'utf-8');
        // eslint-disable-next-line no-new-func -- classic script を検証用に評価する
        new Function(dropdownInputSrc)();
        dropdownInputLoaded = true;
    }
    const customSrc = readFileSync(join(LIB_DIR, 'tom-select.custom.js'), 'utf-8');
    const origAdd = document.addEventListener.bind(document);
    document.addEventListener = ((type: string, listener: any, options?: any) => {
        capturedListeners.push([type, listener, options]);
        return origAdd(type, listener, options);
    }) as typeof document.addEventListener;
    try {
        // eslint-disable-next-line no-new-func
        return new Function(
            'TomSelect', 'window', 'document',
            `${customSrc}\nreturn { LoadTomSelect, LoadTomSelectSpecify, FindTomSelectFromEvent };`,
        )(TomSelect, window, document);
    } finally {
        document.addEventListener = origAdd;
    }
}

function BuildSelect(id: string, values: Array<[string, string]>): HTMLSelectElement {
    const el = document.createElement('select');
    el.id = id;
    for (const [value, text] of values) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.text = text;
        el.appendChild(opt);
    }
    document.body.appendChild(el);
    return el;
}

function DispatchKey(target: EventTarget, keyCode: number, extra: Record<string, unknown> = {}): void {
    const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...extra });
    // happy-dom は KeyboardEvent コンストラクタ引数から keyCode を反映しないため明示的に定義する
    Object.defineProperty(evt, 'keyCode', { get: () => keyCode });
    target.dispatchEvent(evt);
}

type TSInstance = HTMLSelectElement & { tomselect: any };

describe('tom-select.custom.js ↑↓ で即座に確定する（#1496）', () => {
    let api: CustomApi;

    beforeEach(() => {
        api = LoadCustomScript();
    });

    afterEach(() => {
        for (const [type, listener, options] of capturedListeners) {
            document.removeEventListener(type, listener, options);
        }
        capturedListeners = [];
        document.body.innerHTML = '';
        vi.useRealTimers();
    });

    it('閉じた状態で ↓ を押すと次の option が確定し change が 1 回だけ発火する', () => {
        const el = BuildSelect('test-down', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-down');
        const ts = (el as TSInstance).tomselect;

        let changeCount = 0;
        el.addEventListener('change', () => { changeCount++; });

        ts.control.focus();
        expect(ts.isOpen).toBe(false);

        DispatchKey(ts.control, 40); // ArrowDown

        expect(el.value).toBe('2');
        expect(ts.isOpen).toBe(false);
        expect(changeCount).toBe(1);
    });

    it('閉じた状態で ↑ を押すと前の option へ戻る', () => {
        const el = BuildSelect('test-up', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '2';
        api.LoadTomSelectSpecify('#test-up');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 38); // ArrowUp

        expect(el.value).toBe('1');
    });

    it('末尾の option で ↓ を押しても値は変わらない（ラップしない）', () => {
        const el = BuildSelect('test-end', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '3';
        api.LoadTomSelectSpecify('#test-end');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 40);

        expect(el.value).toBe('3');
    });

    it('先頭の option で ↑ を押しても値は変わらない（ラップしない）', () => {
        const el = BuildSelect('test-start', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-start');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 38);

        expect(el.value).toBe('1');
    });

    it('↓ を 3 回押すと 3 つ先の option が選択される', () => {
        const el = BuildSelect('test-triple', [
            ['1', 'あ'], ['2', 'い'], ['3', 'う'], ['4', 'え'], ['5', 'お'],
        ]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-triple');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 40);
        DispatchKey(ts.control, 40);
        DispatchKey(ts.control, 40);

        expect(el.value).toBe('4');
    });

    it('Alt+↓ は確定せずドロップダウンを開くだけ', () => {
        const el = BuildSelect('test-alt-down', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-alt-down');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 40, { altKey: true });

        expect(el.value).toBe('1');
        expect(ts.isOpen).toBe(true);
    });

    it('Alt+↑ でも確定せずドロップダウンを開く（Tom Select 標準の KEY_UP は開かないため明示対応・要修正確認）', () => {
        const el = BuildSelect('test-alt-up', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-alt-up');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 38, { altKey: true });

        expect(el.value).toBe('1');
        expect(ts.isOpen).toBe(true);
    });

    it('Space でドロップダウンが開き、既定のページスクロールが抑止される', () => {
        const el = BuildSelect('test-space', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-space');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true });
        Object.defineProperty(evt, 'keyCode', { get: () => 32 });
        ts.control.dispatchEvent(evt);

        expect(el.value).toBe('1');
        expect(ts.isOpen).toBe(true);
        expect(evt.defaultPrevented).toBe(true);
    });

    it('開いている間の Space は検索欄への入力として扱われ、横取りされない', () => {
        const el = BuildSelect('test-space-open', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-space-open');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        ts.open();
        const evt = new KeyboardEvent('keydown', { bubbles: true, cancelable: true });
        Object.defineProperty(evt, 'keyCode', { get: () => 32 });
        ts.control_input.dispatchEvent(evt);

        expect(evt.defaultPrevented).toBe(false);
    });

    it('IME 変換中（isComposing）の ↓ は確定しない', () => {
        const el = BuildSelect('test-ime', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-ime');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 40, { isComposing: true });

        expect(el.value).toBe('1');
    });

    it('IME 変換中（keyCode 229）の ↓ は確定しない', () => {
        const el = BuildSelect('test-ime229', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-ime229');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 229);

        expect(el.value).toBe('1');
    });

    it('ドロップダウンが開いている間の ↓ は Tom Select 標準どおりハイライト移動のみで確定しない', () => {
        const el = BuildSelect('test-open', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-open');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        ts.open();
        expect(ts.isOpen).toBe(true);

        DispatchKey(ts.control, 40);

        // 確定はしない（値は変わらない）が、ハイライトは Tom Select 標準の処理で移動しうる
        expect(el.value).toBe('1');
    });

    it('disabled な option は ↓ でスキップされる', () => {
        const el = BuildSelect('test-disabled', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        (el.options[1] as HTMLOptionElement).disabled = true; // 'い' を無効化
        el.value = '1';
        api.LoadTomSelectSpecify('#test-disabled');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 40);

        expect(el.value).toBe('3');
    });

    it('optgroup をまたいで ↓ が次の選択肢へ進む（グループ見出しはスキップされる）', () => {
        const el = document.createElement('select');
        el.id = 'test-optgroup';
        const g1 = document.createElement('optgroup');
        g1.label = 'グループ1';
        const o1 = document.createElement('option');
        o1.value = '1';
        o1.text = 'あ';
        g1.appendChild(o1);
        const g2 = document.createElement('optgroup');
        g2.label = 'グループ2';
        const o2 = document.createElement('option');
        o2.value = '2';
        o2.text = 'い';
        g2.appendChild(o2);
        el.appendChild(g1);
        el.appendChild(g2);
        document.body.appendChild(el);
        el.value = '1';

        api.LoadTomSelectSpecify('#test-optgroup');
        const ts = (el as TSInstance).tomselect;

        ts.control.focus();
        DispatchKey(ts.control, 40);

        expect(el.value).toBe('2');
    });

    it('操作中（フォーカス中）の select は LoadTomSelect() で作り直されない', () => {
        const el = BuildSelect('test-busy', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-busy');
        const ts1 = (el as TSInstance).tomselect;

        ts1.control.focus();
        expect(document.activeElement === ts1.control || ts1.wrapper.contains(document.activeElement)).toBe(true);

        // ゲームロジックが LoadTomSelect() 相当の再初期化を呼んだ状況を再現する
        api.LoadTomSelectSpecify('#test-busy');

        expect((el as TSInstance).tomselect).toBe(ts1); // 同一インスタンスのまま
    });

    it('操作していない select は sameSet でも通常どおり再構築される', () => {
        const el = BuildSelect('test-idle', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-idle');
        const ts1 = (el as TSInstance).tomselect;
        (document.activeElement as HTMLElement | null)?.blur?.();

        api.LoadTomSelectSpecify('#test-idle');

        expect((el as TSInstance).tomselect).not.toBe(ts1);
    });

    it('blur すると先送りしていた再初期化が実行される', async () => {
        const el = BuildSelect('test-defer', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-defer');
        const ts1 = (el as TSInstance).tomselect;

        ts1.control.focus();
        api.LoadTomSelectSpecify('#test-defer'); // 先送りされる
        expect((el as TSInstance).tomselect).toBe(ts1);

        ts1.blur();
        await new Promise((r) => setTimeout(r, 0));

        expect((el as TSInstance).tomselect).not.toBe(ts1);
    });

    it('先送り再初期化の後も deleteSelection の無効化パッチが維持される', async () => {
        const el = BuildSelect('test-defer-del', [['1', 'あ'], ['2', 'い'], ['3', 'う']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-defer-del');
        const ts1 = (el as TSInstance).tomselect;

        ts1.control.focus();
        api.LoadTomSelectSpecify('#test-defer-del');
        ts1.blur();
        await new Promise((r) => setTimeout(r, 0));

        expect((el as TSInstance).tomselect.deleteSelection()).toBe(false);
    });

    it('#1482 回帰: 矢印確定を繰り返しても再初期化後に option の DOM 順が 50音順へ戻る', async () => {
        const el = BuildSelect('test-order', [['1', 'あ'], ['2', 'い'], ['3', 'う'], ['4', 'え']]);
        el.value = '1';
        api.LoadTomSelectSpecify('#test-order');
        const ts1 = (el as TSInstance).tomselect;

        ts1.control.focus();
        DispatchKey(ts1.control, 40);
        DispatchKey(ts1.control, 40);
        DispatchKey(ts1.control, 40);
        expect(el.value).toBe('4');

        ts1.blur();
        await new Promise((r) => setTimeout(r, 0));

        const order = Array.from(el.options).map((o) => o.value).filter((v) => v !== '');
        expect(order).toEqual(['1', '2', '3', '4']);
    });

    it('ネイティブ select（.ts-wrapper の外）の ↑↓ は横取りされない', () => {
        const el = document.createElement('select');
        el.id = 'test-native';
        for (const [value, text] of [['1', 'あ'], ['2', 'い']] as Array<[string, string]>) {
            const opt = document.createElement('option');
            opt.value = value;
            opt.text = text;
            el.appendChild(opt);
        }
        document.body.appendChild(el);
        el.value = '1';

        let changeCount = 0;
        el.addEventListener('change', () => { changeCount++; });

        el.focus();
        DispatchKey(el, 40);

        // Tom Select 化されていないので、このリスナーは何もしない
        expect(changeCount).toBe(0);
    });
});
