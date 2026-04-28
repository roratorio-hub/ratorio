import { describe, it, expect, beforeAll } from 'vitest';

// CMobConfInput.js は IIFE 内で SIZE_ID_SMALL 等の列挙定数を使うため、
// 全データ依存ファイルなしでは import できない。ソーステキスト検証で代替する。
describe('CMobConfInput (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/CMobConfInput.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('export function CMobConfInputData が宣言されている', () => {
        expect(src).toContain('export function CMobConfInputData(');
    });

    it('export function GetMobConfInput が宣言されている', () => {
        expect(src).toContain('export function GetMobConfInput(');
    });

    it('export function SetMobConfInput が宣言されている', () => {
        expect(src).toContain('export function SetMobConfInput(');
    });

    it('export function SetActiveIndexMobConfInput が宣言されている', () => {
        expect(src).toContain('export function SetActiveIndexMobConfInput(');
    });

    it('export function CMobConfInputAreaComponentManager が宣言されている', () => {
        expect(src).toContain('export function CMobConfInputAreaComponentManager(');
    });

    it('window.g_dataManagerMobConfInput が window 経由で設定される', () => {
        expect(src).toContain('window.g_dataManagerMobConfInput = null');
        expect(src).toContain('window.g_dataManagerMobConfInput = new CConfBaseManagementParam()');
    });

    it('compat ブロックが存在する', () => {
        expect(src).toContain('window.CMobConfInputData = CMobConfInputData');
        expect(src).toContain('window.CMobConfInputAreaComponentManager = CMobConfInputAreaComponentManager');
    });
});
