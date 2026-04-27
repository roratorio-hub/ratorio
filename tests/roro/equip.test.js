import { describe, it, expect, beforeAll } from 'vitest';

// equip.js は未ESM化のクラシックスクリプトのためインポート不可。
// ソースファイルをフェッチしてリグレッション確認を行う。
describe('equip (source checks)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/equip.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('copyAccs: 全モードでアクセサリ値のコピーが実行される（早期 return ガード削除の確認）', () => {
        // 旧コード: GetSlotMode() != SLOTPAGER_MODE_CARD の場合に即 return していた。
        // 修正後はアクセサリ SELECT のコピーは常に実行し、カードスロットのみ条件付きにする。
        // ガード条件が先頭の return で使われていないことを確認する。
        const copyAccsFn = src.match(/function copyAccs\([\s\S]*?\n\}/)?.[0] ?? '';
        expect(copyAccsFn).toBeTruthy();
        // 先頭 return ガードが消えていること
        expect(copyAccsFn).not.toMatch(/if\s*\(GetSlotMode\(\)\s*!=\s*SLOTPAGER_MODE_CARD\)\s*\{\s*return;/);
    });

    it('copyAccs: カードスロットコピーはカードモード条件付きで残っている', () => {
        const copyAccsFn = src.match(/function copyAccs\([\s\S]*?\n\}/)?.[0] ?? '';
        expect(copyAccsFn).toContain('GetSlotMode() == SLOTPAGER_MODE_CARD');
    });

    it('copyAccs: アクセサリ SELECT のコピーはカードモード条件の外で実行される', () => {
        const copyAccsFn = src.match(/function copyAccs\([\s\S]*?\n\}/)?.[0] ?? '';
        // trigger("select2:select") がソース中に存在する（アクセサリコピーの証拠）
        expect(copyAccsFn).toContain('trigger("select2:select")');
        // アクセサリコピー行がカードモードブロックの前に出てくる
        const triggerIdx = copyAccsFn.indexOf('trigger("select2:select")');
        const cardModeIdx = copyAccsFn.indexOf('GetSlotMode() == SLOTPAGER_MODE_CARD');
        expect(triggerIdx).toBeLessThan(cardModeIdx);
    });
});
