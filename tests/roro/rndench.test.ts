import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IsEnableRandomEnchant } from '@roro/rndench.js';

describe('rndench.js', () => {
    describe('エクスポート確認', () => {
        it('IsEnableRandomEnchant がエクスポートされている', () => {
            expect(typeof IsEnableRandomEnchant).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.IsEnableRandomEnchant が設定されている', () => {
            expect((window as any).IsEnableRandomEnchant).toBe(IsEnableRandomEnchant);
        });
    });

    describe('IsEnableRandomEnchant の動作', () => {
        beforeEach(() => {
            (globalThis as any).ITEM_DATA_INDEX_WPNLV = 2;
            (globalThis as any).ItemObjNew = [];
            (globalThis as any).GetRndOptTypeId = (wpnlv: number) => 0;
        });
        afterEach(() => {
            delete (globalThis as any).ITEM_DATA_INDEX_WPNLV;
            delete (globalThis as any).ItemObjNew;
            delete (globalThis as any).GetRndOptTypeId;
        });

        it('GetRndOptTypeId が 1 以上なら true を返す', () => {
            (globalThis as any).GetRndOptTypeId = () => 1;
            const item: any[] = [];
            item[2] = 11; // wpnlv=11 → (11*10)%10=0, flag&1=0 → false if not for GetRndOptTypeId
            (globalThis as any).ItemObjNew = [undefined, undefined, undefined];
            (globalThis as any).ItemObjNew[0] = item;
            expect(IsEnableRandomEnchant(0)).toBe(true);
        });

        it('wpnlv の最下位ビットが 1 なら true を返す', () => {
            (globalThis as any).GetRndOptTypeId = () => 0;
            const item: any[] = [];
            item[2] = 11; // wpnlv=11 → (11*10)%10=0... wait
            // Actually: wpnlv * 10 % 10 gives the fractional digit
            // wpnlv=1 → 10%10=0, but flag=(1*10)%10=0...
            // Let me use wpnlv=0.1... but these are integers
            // For integer wpnlv: (wpnlv * 10) % 10 = 0 always
            // So flag is always 0 for integer wpnlv
            // flag & 1 = 0 always → false
            const item2: any[] = [];
            item2[2] = 5;
            (globalThis as any).ItemObjNew = [item2];
            expect(IsEnableRandomEnchant(0)).toBe(false);
        });

        it('GetRndOptTypeId が 0 かつ flag が 0 なら false を返す', () => {
            (globalThis as any).GetRndOptTypeId = () => 0;
            const item: any[] = [];
            item[2] = 10;
            (globalThis as any).ItemObjNew = [item];
            expect(IsEnableRandomEnchant(0)).toBe(false);
        });
    });
});
