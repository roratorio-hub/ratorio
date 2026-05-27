import { describe, it, expect, beforeAll } from 'vitest';

// calchistory.js calls $(function(){...}) at module load — mock $ before importing
// to prevent ReferenceError: $ is not defined
let mod: { g_Chart: any };

beforeAll(async () => {
    (globalThis as any).$ = (fn: any) => {
        // jQuery DOM-ready mock: accept the callback but don't invoke it
    };
    mod = await import('@ro4/calchistory.js');
});

describe('calchistory.js', () => {
    describe('エクスポート確認', () => {
        it('g_Chart がエクスポートされている', () => {
            expect('g_Chart' in mod).toBe(true);
        });

        it('初期値は undefined', () => {
            expect(mod.g_Chart).toBeUndefined();
        });
    });

    // Phase 3-sup で window.g_Chart compat ブロックを削除したため window 互換テスト不要
});
