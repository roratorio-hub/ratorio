import { describe, it, expect, beforeAll } from 'vitest';

describe('ro4/m/js/global.js (source checks)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../ro4/m/js/global.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('ResetConfDataAllMIG を export する宣言がある', () => {
        expect(src).toContain('export function ResetConfDataAllMIG');
    });

    it('__DIG3 を export する宣言がある', () => {
        expect(src).toContain('export function __DIG3');
    });

    it('window compat ブロックが存在する', () => {
        expect(src).toContain("window.ResetConfDataAllMIG = ResetConfDataAllMIG");
        expect(src).toContain("window.__DIG3 = __DIG3");
    });

    it('TIME_ITEM_CONF_COUNT は window.* として設定される（モジュールスコープ変数ではない）', () => {
        expect(src).toContain('window.TIME_ITEM_CONF_COUNT =');
        expect(src).not.toMatch(/(?<![.\w])(?:let|const|var)\s+TIME_ITEM_CONF_COUNT/);
    });

    it('g_skillManager は window.* として設定される', () => {
        expect(src).toContain('window.g_skillManager = new CSkillManager()');
    });

    it('g_constDataManager は window.* として設定される', () => {
        expect(src).toContain('window.g_constDataManager = new CMigConstDataManager()');
    });

    it('g_confDataCustomStatusMIG は window.* として設定される（回帰確認）', () => {
        expect(src).toContain('window.g_confDataCustomStatusMIG = null');
    });
});
