import { describe, it, expect, beforeAll } from 'vitest';

describe('mig.enchlist.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../roro/m/js/data/mig.enchlist.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.MIG_ENCH_LIST_ID_SHINENNO_KAIRO_UPGRADE が設定される', () => {
        expect(src).toContain('window.MIG_ENCH_LIST_ID_SHINENNO_KAIRO_UPGRADE =');
    });

    it('window.MIG_ENCH_LIST_ID_SHINENTAIBUKI_UPGRADE が設定される', () => {
        expect(src).toContain('window.MIG_ENCH_LIST_ID_SHINENTAIBUKI_UPGRADE =');
    });

    it('g_constDataManager.enchListDataManager.sourceArray への代入が存在する', () => {
        expect(src).toContain('g_constDataManager.enchListDataManager.sourceArray =');
    });
});
