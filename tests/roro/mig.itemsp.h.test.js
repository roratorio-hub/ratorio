import { describe, it, expect, beforeAll } from 'vitest';

describe('mig.itemsp.h (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/data/mig.itemsp.h.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.MIG_SKILL_ID_ANY が設定される', () => {
        expect(src).toContain('window.MIG_SKILL_ID_ANY =');
    });

    it('window.MIG_ITEM_ID_ANY が設定される', () => {
        expect(src).toContain('window.MIG_ITEM_ID_ANY =');
    });

    it('window.MIG_COSTUME_ID_ANY が設定される', () => {
        expect(src).toContain('window.MIG_COSTUME_ID_ANY =');
    });

    it('window compat ブロックで MigGetItemSpTagArrayByOldSpID が設定される', () => {
        expect(src).toContain('window.MigGetItemSpTagArrayByOldSpID');
    });

    it('window compat ブロックで MigGetEquipRegionByCardKind が設定される', () => {
        expect(src).toContain('window.MigGetEquipRegionByCardKind');
    });
});
