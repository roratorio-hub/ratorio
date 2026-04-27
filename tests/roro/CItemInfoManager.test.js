import { describe, it, expect } from 'vitest';
import '../../roro/m/js/CItemInfoManager.js';

describe('CItemInfoManager', () => {
    it('window.CItemInfoManager が設定される（window compat ブロック）', () => {
        expect(typeof window.CItemInfoManager).toBe('function');
    });

    it('静的メソッドが定義されている', () => {
        expect(typeof window.CItemInfoManager.RebuildControls).toBe('function');
        expect(typeof window.CItemInfoManager.AppendEfficiencyInfoSub).toBe('function');
        expect(typeof window.CItemInfoManager.AppendEfficiencyInfoItem).toBe('function');
    });

    it('AppendEfficiencyInfoSub: sourceText 宣言漏れの回帰確認', () => {
        // ESM strict mode では var 宣言のない変数への代入が即 ReferenceError になる。
        // ソース文字列に var sourceText が含まれることで修正を検証する。
        const src = window.CItemInfoManager.AppendEfficiencyInfoSub.toString();
        expect(src).toContain('var sourceText');
    });

    it('RebuildOfficialTradeInformationAnchor: url 宣言漏れの回帰確認', () => {
        // url 変数が関数内のどこにも宣言されておらずに代入されていた。
        // ESM strict mode では ReferenceError になるため var url = ""; を追加した。
        const src = window.CItemInfoManager.RebuildOfficialTradeInformationAnchor.toString();
        expect(src).toContain('var url');
    });
});
