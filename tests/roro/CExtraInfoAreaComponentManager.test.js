import { describe, it, expect } from 'vitest';
// CGlobalConstManager.js を先にインポートして DefineEnum を確立する
import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/CInstanceManager.js';
import { GetExtraInfoText, CExtraInfoAreaComponentManager } from '../../roro/m/js/CExtraInfoAreaComponentManager.js';

describe('CExtraInfoAreaComponentManager', () => {
    it('GetExtraInfoText を export する', () => {
        expect(typeof GetExtraInfoText).toBe('function');
    });

    it('CExtraInfoAreaComponentManager を export する', () => {
        expect(typeof CExtraInfoAreaComponentManager).toBe('function');
    });

    it('window compat ブロックで window.GetExtraInfoText が設定される', () => {
        expect(window.GetExtraInfoText).toBe(GetExtraInfoText);
    });

    it('window compat ブロックで window.CExtraInfoAreaComponentManager が設定される', () => {
        expect(window.CExtraInfoAreaComponentManager).toBe(CExtraInfoAreaComponentManager);
    });

    it('RefreshDispAreaHealing: i / ptmCount 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var i');
        expect(src).toContain('var ptmCount');
    });

    it('RefreshDispAreaStatusSum: idxBase / remainPlus / remainMinus / paramArray 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var idxBase');
        expect(src).toContain('var remainPlus');
        expect(src).toContain('var remainMinus');
        expect(src).toContain('var paramArray');
    });

    it('RefreshDispAreaEffectiveSp: confval 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var confval');
    });

    it('RebuildDispAreaCapacity: objSelect 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var objSelect');
    });

    it('RefreshDispAreaEffectiveSp: objSpan 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var objSpan');
    });

    it('RefreshDispAreaCastAndDelay: spanClassName 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var spanClassName');
    });

    it('RefreshDispAreaEffectiveSp: value 宣言漏れの回帰確認', () => {
        const src = CExtraInfoAreaComponentManager.toString();
        expect(src).toContain('var value');
    });
});
