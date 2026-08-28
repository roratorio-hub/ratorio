import { describe, it, expect } from 'vitest';
import { CBattleCalcResultAll, instobject, createInstObjContext } from '@engine/battle/CBattleCalcResultAll.js';

describe('CBattleCalcResultAll.js', () => {
    it.todo('CBattleCalcResultAll 本体の動作テストを追加する');

    describe('instobject: 設置スキル計算オブジェクト（残件台帳 B-08: 再入可能化）', () => {
        it('getHitCount はヒット間隔から経過ヒット数を返す（ctx を使わないため引数省略可）', () => {
            const obj = new instobject();
            obj.init(0, 999999, 0, 0, 0, 0, 10, 5);
            expect(obj.getHitCount(0)).toBe(0);
            expect(obj.getHitCount(5)).toBe(1);
            expect(obj.getHitCount(10)).toBe(2);
        });

        // cooltime を lifetime より大きくして skillinterval を大きくし、
        // maxhit 回のループ内では新規オブジェクトが生成されない（再帰なし）
        // シンプルな条件にする。cooltime=0 だと skillinterval=0 になり
        // 初回から再帰生成が始まってしまうため。
        it('exec は maxcount 到達時刻を ctx.finalTime へ書き込む', () => {
            const ctx = createInstObjContext();
            const obj = new instobject(ctx);
            obj.init(0, /* maxcount */ 1, /* starttime */ 0, /* casttime */ 0, /* delay */ 0, /* cooltime */ 100, /* lifetime */ 10, /* interval */ 5);
            ctx.array.push(obj);
            expect(obj.exec()).toBe(true);
            expect(ctx.finalTime).toBe(5);
            expect(ctx.isApproximate).toBe(false);
        });

        it('2つの ctx は互いに独立している（同時に使っても混線しない）', () => {
            const ctxA = createInstObjContext();
            const objA = new instobject(ctxA);
            objA.init(0, 1, /* starttime */ 0, 0, 0, 100, 10, 5);
            ctxA.array.push(objA);

            const ctxB = createInstObjContext();
            const objB = new instobject(ctxB);
            objB.init(0, 1, /* starttime */ 100, 0, 0, 100, 10, 2);
            ctxB.array.push(objB);

            // A・B を「交互に」進めても、互いの array/finalTime に影響しないこと。
            expect(objB.exec()).toBe(true);
            expect(objA.exec()).toBe(true);

            expect(ctxA.finalTime).toBe(5);   // starttime(0) + interval(5)*1
            expect(ctxB.finalTime).toBe(102); // starttime(100) + interval(2)*1
            expect(ctxA.array).not.toBe(ctxB.array);
        });
    });
});
