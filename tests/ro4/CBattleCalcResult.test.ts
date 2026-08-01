import { describe, it, expect, beforeEach } from 'vitest';
import { CBattleCalcResult } from '@ro4/CBattleCalcResult.js';

/**
 * ダメージ計算に必要な配列を埋めた結果インスタンスを作る.
 * dmg: 1ヒットあたりのダメージ（通常・クリティカル共通）
 */
function makeResult(dmg: number, props: Record<string, any> = {}): any {
    const obj: any = new CBattleCalcResult();
    obj.dmgUnitArray = [[dmg, dmg, dmg], [dmg, dmg, dmg]];
    obj.hitCountArray = [[1, 1, 1], [1, 1, 1]];
    obj.dividedHitCountArray = [[1, 1, 1], [1, 1, 1]];
    obj.dmgPerfectArray = [0, 0];
    obj.hitRate = 100;
    obj.criRate = 0;
    obj.actRate = 100;
    Object.assign(obj, props);
    return obj;
}

describe('CBattleCalcResult.js', () => {
    let obj: any;
    beforeEach(() => { obj = new CBattleCalcResult(); });

    it('Clone は元と別の独立したインスタンスを返す', () => {
        obj.skillId = 42;
        const clone = obj.Clone();
        expect(clone).not.toBe(obj);
        expect(clone).toBeInstanceOf(CBattleCalcResult);
        expect(clone.skillId).toBe(42);
        // 独立性: clone を変更しても元に影響しない
        clone.skillId = 99;
        expect(obj.skillId).toBe(42);
    });

    it('Clone は bGroundInstallation を引き継ぐ', () => {
        // AddChild / ダブルアタックが Clone 経由なので、引き継がないと設置判定が落ちる
        obj.bGroundInstallation = true;
        expect(obj.Clone().bGroundInstallation).toBe(true);
    });

    describe('_getHitsPerSecondActual（重ね置きDPS）', () => {

        it('非設置スキルは追撃の子要素があっても 1/(詠唱+攻撃間隔) を返す', () => {
            // 雷電砲（蜃気楼分身あり）の回帰テスト。
            // 子要素の有無で重ね置き判定に入ると、objectLifeTime=0 のため hit/sec が 0 になっていた。
            const raiden = makeResult(1000, {
                bGroundInstallation: false,
                objectLifeTime: 0,
                delaySkill: 4.0,
                coolTime: 0.5,
            });

            const hits = raiden._getHitsPerSecondActual(1.3, 0.5, 4.0, true);

            expect(hits.ave).toBeCloseTo(1 / 5.8, 10);
            expect(hits.min).toBeCloseTo(1 / 5.8, 10);
            expect(hits.max).toBeCloseTo(1 / 5.8, 10);
        });

        it('非設置スキルの hit/sec は子要素の有無で変わらない', () => {
            const base = {
                bGroundInstallation: false,
                objectLifeTime: 0,
                delaySkill: 4.0,
                coolTime: 0.5,
            };
            const withChild = makeResult(1000, base)._getHitsPerSecondActual(1.3, 0.5, 4.0, true);
            const noChild = makeResult(1000, base)._getHitsPerSecondActual(1.3, 0.5, 4.0, false);

            expect(withChild).toEqual(noChild);
        });

        it('設置スキルは追撃の子要素があっても重ね置きを計算する', () => {
            // メテオストーム・バスター（設置スキル＋追撃あり）の回帰テスト
            const msb = makeResult(1000, {
                bGroundInstallation: true,
                objectLifeTime: 4000,   // ms
                delaySkill: 1.0,
                coolTime: 0,
            });

            const hits = msb._getHitsPerSecondActual(0.5, 0.5, 0.5, true);

            // 重ね置きにより、単発計算 1/(0.5+0.5+0.5) よりはるかに多く当たる
            expect(hits.ave).toBeGreaterThan(1 / 1.5);
            // 設置1個あたり 1/interval = 2 hit/sec が下限、重ね置きでそれを超える
            expect(hits.max).toBeGreaterThan(2);
        });

        it('設置スキルでも持続時間が取れない場合は通常スキルと同じ計算にフォールバックする', () => {
            // instobject の maxhit = floor(lifetime/interval) が 0 になり
            // DPS が無言で 0 になるのを防ぐガード
            const broken = makeResult(1000, {
                bGroundInstallation: true,
                objectLifeTime: 0,
                delaySkill: 1.0,
                coolTime: 0,
            });

            const hits = broken._getHitsPerSecondActual(0.5, 0.5, 1.0, false);

            expect(hits.ave).toBeCloseTo(1 / 2.0, 10);
        });

        it('設置スキルでも攻撃間隔が 0 の場合はフォールバックする', () => {
            const broken = makeResult(1000, {
                bGroundInstallation: true,
                objectLifeTime: 5000,
                delaySkill: 1.0,
                coolTime: 0,
            });

            const hits = broken._getHitsPerSecondActual(0.5, 0.5, 0, false);

            expect(hits.ave).toBeCloseTo(1 / 1.0, 10);
        });
    });

    describe('GetDamageSummaryAvePerSecActual（実ダメージDPS）', () => {

        it('非設置スキルは追撃があっても本体のDPSが 0 にならない', () => {
            // 雷電砲＋蜃気楼分身: 本体DPSが 0 になり分身の分しか出ない不具合の回帰テスト
            const raiden = makeResult(10000, {
                skillId: 1255,
                bGroundInstallation: false,
                objectLifeTime: 0,
                delaySkill: 4.0,
                coolTime: 0.5,
            });
            raiden.AddChild(makeResult(3000, {
                skillId: 1255,
                bGroundInstallation: false,
                objectLifeTime: 0,
            }));

            const dmgArray = raiden.GetDamageSummaryAvePerSecActual(1.3, 0.5, 4.0, true);

            // 先頭が本体、以降が子要素
            expect(dmgArray[0]).toBe(Math.floor(10000 / 5.8));
            expect(dmgArray[1]).toBe(Math.floor(3000 / 5.8));
        });

        it('追撃の有無で本体のDPSは変わらない', () => {
            const base = {
                bGroundInstallation: false,
                objectLifeTime: 0,
                delaySkill: 4.0,
                coolTime: 0.5,
            };
            const withChild = makeResult(10000, base);
            withChild.AddChild(makeResult(3000, base));
            const noChild = makeResult(10000, base);

            const dmgWith = withChild.GetDamageSummaryAvePerSecActual(1.3, 0.5, 4.0, true);
            const dmgNo = noChild.GetDamageSummaryAvePerSecActual(1.3, 0.5, 4.0, false);

            expect(dmgWith[0]).toBe(dmgNo[0]);
        });
    });
});
