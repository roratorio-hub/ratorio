import { describe, it, expect, beforeAll } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';

// CFloatingInfoAreaComponentManager.js はモジュールロード時に以下を実行する:
//   1. new CFloatingInfoAreaInfoUnit() × 7 → new CExtraInfoAreaComponentManager()
//   2. CFloatingInfoAreaComponentManager.RebuildControls() → DOM 構築 + Html* ユーティリティ呼び出し
// これらが動く状態にしてから動的インポートする。

// CExtraInfoAreaComponentManager は未移行ファイルのため globalThis にモックを注入
;(globalThis as any).CExtraInfoAreaComponentManager = function () {};
;(globalThis as any).CExtraInfoAreaComponentManager.setReferData = () => {};
;(globalThis as any).CExtraInfoAreaComponentManager.fontSizeClassName = '';

// Html ユーティリティ（common.js 等）のモック
// 実 DOM 要素を生成・追加するシンプル実装なので getElementById で後から参照できる
;(globalThis as any).HtmlRemoveAllChild = (obj: Element | null) => {
    if (!obj) return;
    while (obj.firstChild) obj.removeChild(obj.firstChild);
};
;(globalThis as any).HtmlCreateElement = (tag: string, parent: Element | null) => {
    const el = document.createElement(tag);
    if (parent) parent.appendChild(el);
    return el;
};
;(globalThis as any).HtmlCreateTextSpan = (text: string, parent: Element | null, _cls?: string) => {
    const span = document.createElement('span');
    if (parent) parent.appendChild(span);
    return span;
};
;(globalThis as any).HtmlCreateElementOption = (value: any, _text: any, parent: Element | null) => {
    const opt = document.createElement('option');
    opt.value = String(value);
    if (parent) parent.appendChild(opt);
    return opt;
};
;(globalThis as any).HtmlCreateTextNode = () => {};

// RebuildControls が getElementById("ID_FLOATING_INFO_AREA") を参照する
document.body.innerHTML = '<div id="ID_FLOATING_INFO_AREA"></div>';

let GetFloatingInfoText: any;
let CFloatingInfoAreaInfoUnit: any;
let CFloatingInfoAreaComponentManager: any;

beforeAll(async () => {
    const mod = await import('@roro/CFloatingInfoAreaComponentManager.js');
    GetFloatingInfoText = mod.GetFloatingInfoText;
    CFloatingInfoAreaInfoUnit = mod.CFloatingInfoAreaInfoUnit;
    CFloatingInfoAreaComponentManager = mod.CFloatingInfoAreaComponentManager;
});

describe('CFloatingInfoAreaComponentManager.js', () => {
    describe('エクスポート確認', () => {
        it('GetFloatingInfoText が関数', () => { expect(typeof GetFloatingInfoText).toBe('function'); });
        it('CFloatingInfoAreaInfoUnit が関数', () => { expect(typeof CFloatingInfoAreaInfoUnit).toBe('function'); });
        it('CFloatingInfoAreaComponentManager が関数', () => { expect(typeof CFloatingInfoAreaComponentManager).toBe('function'); });
    });

    describe('定数確認', () => {
        it('FLOATING_INFO_ID_NONE が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_NONE).toBe('number'); });
        it('FLOATING_INFO_ID_STATUS が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_STATUS).toBe('number'); });
        it('FLOATING_INFO_ID_EXTRA_INFO が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_EXTRA_INFO).toBe('number'); });
        it('FLOATING_INFO_ID_NOTICE が定義されている', () => { expect(typeof (globalThis as any).FLOATING_INFO_ID_NOTICE).toBe('number'); });
    });

    describe('静的プロパティ確認', () => {
        it('areaCount が数値', () => { expect(typeof CFloatingInfoAreaComponentManager.areaCount).toBe('number'); });
        it('areaCountMax が数値', () => { expect(typeof CFloatingInfoAreaComponentManager.areaCountMax).toBe('number'); });
        it('infoUnitArray が配列', () => { expect(Array.isArray(CFloatingInfoAreaComponentManager.infoUnitArray)).toBe(true); });
        it('setReferData が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.setReferData).toBe('function'); });
        it('RebuildControls が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.RebuildControls).toBe('function'); });
        it('RefreshDispAreaAll が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.RefreshDispAreaAll).toBe('function'); });
        it('LoadFromLocalStorage が関数', () => { expect(typeof CFloatingInfoAreaComponentManager.LoadFromLocalStorage).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.GetFloatingInfoText が設定されている', () => { expect(typeof (window as any).GetFloatingInfoText).toBe('function'); });
        it('window.CFloatingInfoAreaInfoUnit が設定されている', () => { expect(typeof (window as any).CFloatingInfoAreaInfoUnit).toBe('function'); });
        it('window.CFloatingInfoAreaComponentManager が設定されている', () => { expect(typeof (window as any).CFloatingInfoAreaComponentManager).toBe('function'); });
    });
});
